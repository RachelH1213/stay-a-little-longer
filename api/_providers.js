/* Which model writes Juno's words. api/reply.js builds the request (persona, intent, allowed facts,
   recent turns); a provider only turns it into one line of text. The underscore keeps Vercel from
   exposing this file as its own endpoint.

   Pick one with JUNO_PROVIDER = anthropic | zhipu | openai (default: anthropic, claude-haiku-5-5, the
   author's pick after comparing on 2026-10-14), and its key:
     anthropic  ANTHROPIC_API_KEY  (+ ANTHROPIC_MODEL, default claude-haiku-5-5)
     zhipu      ZHIPU_API_KEY      (+ ZHIPU_API_URL, ZHIPU_MODEL as before)
     openai     OPENAI_API_KEY     + OPENAI_MODEL (required: copy the model name from OpenAI's dashboard)

   compare.html can ask for another provider/model per request, to compare them side by side. */

const ZHIPU_ENDPOINT = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const ZHIPU_MODELS = "glm-4.5-flash,glm-4.7-flash"; // 4.5 first: in the first live test 4.7 was always overloaded
const OPENAI_ENDPOINT = "https://api.openai.com/v1/chat/completions";
const ANTHROPIC_MODEL = "claude-haiku-5-5"; // the author's pick after comparing (2026-10-14)
// Claude models where a safety decline can be retried server-side on another model (Claude API only).
const SERVER_FALLBACK = /^claude-(opus-5-5|sonnet-5-5)$/;

class UpstreamError extends Error {
  constructor(status, detail, retry) {
    super(detail || "upstream " + status);
    this.status = status;
    this.detail = detail;
    this.retry = retry; // busy or broken: another try (or the next model) may work
  }
}

// The service's own error text, trimmed. Never contains our key.
async function detailOf(r) {
  try {
    return (await r.text()).replace(/\s+/g, " ").slice(0, 300);
  } catch (e) {
    return "";
  }
}

// OpenAI-style chat completions (Zhipu and OpenAI share this shape).
async function chatCompletions(url, key, body, signal) {
  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
    body: JSON.stringify(body),
    signal: signal,
  });
  if (!r.ok) throw new UpstreamError(r.status, await detailOf(r), r.status === 429 || r.status >= 500);
  const data = await r.json();
  return data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
}

const zhipu = {
  key: () => process.env.ZHIPU_API_KEY,
  models: (override) => (override || process.env.ZHIPU_MODEL || ZHIPU_MODELS).split(",").map((m) => m.trim()).filter(Boolean),
  async write(model, messages, signal) {
    return chatCompletions(process.env.ZHIPU_API_URL || ZHIPU_ENDPOINT, this.key(), {
      model: model,
      messages: messages,
      thinking: { type: "disabled" }, // reasoning mode is too slow for a chat beat
      temperature: 0.8,
      max_tokens: 80,
    }, signal);
  },
};

const openai = {
  key: () => process.env.OPENAI_API_KEY,
  models: (override) => [override || process.env.OPENAI_MODEL].filter(Boolean),
  async write(model, messages, signal) {
    // max_completion_tokens leaves room for models that reason before answering; the line itself is short.
    return chatCompletions(OPENAI_ENDPOINT, this.key(), {
      model: model,
      messages: messages,
      max_completion_tokens: 400,
    }, signal);
  },
};

// Claude: the official SDK. The system prompt goes in `system`; the turns must start with the user,
// alternate, and end with the user (no prefill), so Juno's own last line gets a stage direction after it.
let client = null;
function anthropicClient() {
  if (!client) {
    const sdk = require("@anthropic-ai/sdk");
    const Anthropic = sdk.default || sdk;
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 0 });
  }
  return client;
}

const NEXT = "[write your next message]";
function claudeTurns(messages) {
  const turns = [];
  messages.filter((m) => m.role !== "system").forEach((m) => {
    const last = turns[turns.length - 1];
    if (last && last.role === m.role) last.content += "\n" + m.content;
    else turns.push({ role: m.role, content: m.content });
  });
  if (!turns.length || turns[0].role !== "user") turns.unshift({ role: "user", content: NEXT });
  if (turns[turns.length - 1].role !== "user") turns.push({ role: "user", content: NEXT });
  return turns;
}

const anthropic = {
  key: () => process.env.ANTHROPIC_API_KEY,
  models: (override) => [override || process.env.ANTHROPIC_MODEL || ANTHROPIC_MODEL],
  async write(model, messages, signal, timeoutMs) {
    const system = messages.filter((m) => m.role === "system").map((m) => m.content).join("\n\n") +
      "\n\nA user turn in square brackets is a stage direction, not something your user said: don't answer it, just write your next message.";
    const params = {
      model: model,
      max_tokens: 1024, // room for brief thinking; the line itself is one short sentence
      system: system,
      messages: claudeTurns(messages),
      output_config: { effort: "low" }, // a chat beat: fast over thorough
    };
    const opts = { timeout: timeoutMs, signal: signal };
    let response;
    try {
      response = SERVER_FALLBACK.test(model)
        ? await anthropicClient().beta.messages.create(
            Object.assign(params, { betas: ["server-side-fallback-2026-07-01"], fallbacks: "default" }), opts)
        : await anthropicClient().messages.create(params, opts);
    } catch (e) {
      const status = e && e.status ? e.status : 502;
      throw new UpstreamError(status, String((e && e.message) || e).slice(0, 300), status === 429 || status >= 500);
    }
    if (response.stop_reason === "refusal") throw new UpstreamError(200, "refused", false);
    return response.content.filter((b) => b.type === "text").map((b) => b.text).join("\n");
  },
};

const PROVIDERS = { zhipu: zhipu, anthropic: anthropic, openai: openai };

// The provider for this request: compare.html may ask for one; otherwise JUNO_PROVIDER.
function pick(requested) {
  const name = PROVIDERS[requested] ? requested : process.env.JUNO_PROVIDER || "anthropic";
  return { name: name, provider: PROVIDERS[name] };
}

module.exports = { pick, PROVIDERS, UpstreamError, claudeTurns };
