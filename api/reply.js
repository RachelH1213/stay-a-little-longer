/* POST /api/reply — turns {persona, intent, allowedFacts, recentTurns} into one line of text.

   The game decides what Juno wants to say. This only writes the words.
   Any failure returns an error status; the client then shows the hardcoded line. */

const { PERSONAS, INTENTS } = require("./_persona");

// Mainland China (open.bigmodel.cn) by default. For an international z.ai key, set
// ZHIPU_API_URL=https://api.z.ai/api/paas/v4/chat/completions — same request format and model.
const DEFAULT_ENDPOINT = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
// Tried in order: if one is overloaded (429) or errors (5xx), the next gets the remaining time.
// Both defaults are free on z.ai / bigmodel.cn. Override with ZHIPU_MODEL="model-a,model-b".
const DEFAULT_MODELS = "glm-4.5-flash,glm-4.7-flash"; // 4.5 first: in the first live test 4.7 was always overloaded
const UPSTREAM_TIMEOUT_MS = 7000; // under the client's 8s, so we fail before it gives up. Was 3.5s;
                                  // z.ai's free glm-4.7-flash took longer than that from Vercel (2026-10-08)
const MAX_FACTS = 6;
const MAX_TURNS = 8;
const MAX_TEXT = 300;
const MAX_REPLY = 200;

function clip(s, n) {
  return String(s == null ? "" : s).slice(0, n);
}

function buildMessages(body) {
  const facts = (Array.isArray(body.allowedFacts) ? body.allowedFacts : [])
    .slice(0, MAX_FACTS)
    .map((f) => "- " + clip(f, MAX_TEXT));

  const turns = (Array.isArray(body.recentTurns) ? body.recentTurns : [])
    .slice(-MAX_TURNS)
    .filter((t) => t && (t.from === "me" || t.from === "juno"))
    .map((t) => ({
      role: t.from === "juno" ? "assistant" : "user",
      content: clip(t.text, MAX_TEXT),
    }));

  const brief =
    `What you want to do with this message: ${INTENTS[body.intent]}\n` +
    `Facts you may use:\n${facts.length ? facts.join("\n") : "- none"}`;

  return [
    { role: "system", content: PERSONAS[body.persona] + "\n\n" + brief },
    ...turns,
  ];
}

// First non-empty line, no wrapping quotes, no "Juno:" prefix, capped.
function cleanLine(raw) {
  const line = String(raw || "")
    .split("\n")
    .map((l) => l.trim())
    .find(Boolean);
  if (!line) return "";
  return line
    .replace(/^juno\s*:\s*/i, "")
    .replace(/^["'“”‘’]+|["'“”‘’]+$/g, "")
    .trim()
    .slice(0, MAX_REPLY);
}

// The upstream service's own error text, trimmed. Never contains our key; helps tell
// "rate limited" from "no balance" from "table not found" without guessing.
async function upstreamDetail(r) {
  try {
    return (await r.text()).replace(/\s+/g, " ").slice(0, 300);
  } catch (e) {
    return "";
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const key = process.env.ZHIPU_API_KEY;
  if (!key) return res.status(500).json({ error: "no key" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || !PERSONAS[body.persona] || !INTENTS[body.intent]) {
    return res.status(400).json({ error: "bad request" });
  }

  const models = (process.env.ZHIPU_MODEL || DEFAULT_MODELS).split(",").map((m) => m.trim()).filter(Boolean);
  const messages = buildMessages(body);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), UPSTREAM_TIMEOUT_MS);
  const failures = [];

  try {
    for (const model of models) {
      const r = await fetch(process.env.ZHIPU_API_URL || DEFAULT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
        body: JSON.stringify({
          model: model,
          messages: messages,
          thinking: { type: "disabled" }, // reasoning mode is too slow for a chat beat
          temperature: 0.8,
          max_tokens: 80,
        }),
        signal: ctrl.signal,
      });

      if (!r.ok) {
        failures.push({ model: model, status: r.status, detail: await upstreamDetail(r) });
        if (r.status === 429 || r.status >= 500) continue; // busy or broken: try the next model
        break; // a bad key or bad request won't get better with another model
      }

      const data = await r.json();
      const text = cleanLine(data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content);
      if (text) return res.status(200).json({ text: text, model: model });
      failures.push({ model: model, status: 200, detail: "empty" });
    }
    const last = failures[failures.length - 1] || {};
    return res.status(502).json({ error: "upstream " + last.status, detail: last.detail, tried: failures });
  } catch (e) {
    return res.status(504).json({ error: "timeout or network", tried: failures });
  } finally {
    clearTimeout(timer);
  }
};

module.exports.buildMessages = buildMessages;
module.exports.cleanLine = cleanLine;
