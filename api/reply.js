/* POST /api/reply — turns {persona, intent, allowedFacts, recentTurns} into one line of text.

   The game decides what Juno wants to say. This only writes the words.
   Any failure returns an error status; the client then shows the hardcoded line. */

const { PERSONAS, INTENTS } = require("./_persona");

// Mainland China (open.bigmodel.cn) by default. For an international z.ai key, set
// ZHIPU_API_URL=https://api.z.ai/api/paas/v4/chat/completions — same request format and model.
const DEFAULT_ENDPOINT = "https://open.bigmodel.cn/api/paas/v4/chat/completions";
const MODEL = "glm-4.7-flash";
const UPSTREAM_TIMEOUT_MS = 3500; // under the client's 4s, so we fail before it gives up
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

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const r = await fetch(process.env.ZHIPU_API_URL || DEFAULT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + key },
      body: JSON.stringify({
        model: MODEL,
        messages: buildMessages(body),
        thinking: { type: "disabled" }, // reasoning mode is too slow for a chat beat
        temperature: 0.8,
        max_tokens: 80,
      }),
      signal: ctrl.signal,
    });
    if (!r.ok) return res.status(502).json({ error: "upstream " + r.status, detail: await upstreamDetail(r) });

    const data = await r.json();
    const text = cleanLine(data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content);
    if (!text) return res.status(502).json({ error: "empty" });

    return res.status(200).json({ text: text });
  } catch (e) {
    return res.status(504).json({ error: "timeout or network" });
  } finally {
    clearTimeout(timer);
  }
};

module.exports.buildMessages = buildMessages;
module.exports.cleanLine = cleanLine;
