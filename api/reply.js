/* POST /api/reply — turns {persona, intent, allowedFacts, recentTurns} into one line of text.
   Which model writes it is set in api/_providers.js (JUNO_PROVIDER).

   The game decides what Juno wants to say. This only writes the words.
   Any failure returns an error status; the client then shows the hardcoded line. */

const { PERSONAS, INTENTS, GUARDS } = require("./_persona");

const { pick } = require("./_providers"); // which model writes the words: zhipu | anthropic | openai

const UPSTREAM_TIMEOUT_MS = 7000; // under the client's 8s, so we fail before it gives up
const MAX_FACTS = 6;
const MAX_TURNS = 8;
const MAX_TEXT = 300;
const MAX_REPLY = 200;
const MAX_ATTEMPTS = 3; // across all models, within UPSTREAM_TIMEOUT_MS

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

// Lowercase, plain apostrophes, punctuation to spaces, padded so phrases match whole words.
function words(s) {
  return " " + String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim() + " ";
}

// The first rule a line breaks for this intent, or null if it's fine.
function brokenRule(intent, text) {
  const w = words(text);
  for (const g of [GUARDS.all, GUARDS[intent]]) {
    if (!g) continue;
    for (const p of g.never || []) if (w.indexOf(words(p)) !== -1) return "says \"" + p + "\"";
    for (const p of g.neverStart || []) if (w.indexOf(words(p)) === 0) return "starts with \"" + p + "\"";
  }
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (!body || !PERSONAS[body.persona] || !INTENTS[body.intent]) {
    return res.status(400).json({ error: "bad request" });
  }

  // compare.html may ask for a provider and model; the game never does (JUNO_PROVIDER decides).
  const { name, provider } = pick(body.provider);
  if (!provider.key()) return res.status(500).json({ error: "no key", provider: name });
  const asked = typeof body.model === "string" && /^[a-z0-9][a-z0-9.,:_-]{1,60}$/i.test(body.model) ? body.model : null;
  const models = provider.models(asked);
  if (!models.length) return res.status(500).json({ error: "no model", provider: name });

  const messages = buildMessages(body);
  const ctrl = new AbortController();
  const started = Date.now();
  const timer = setTimeout(() => ctrl.abort(), UPSTREAM_TIMEOUT_MS);
  const failures = [];

  try {
    for (let i = 0; i < MAX_ATTEMPTS; i++) {
      const model = models[i % models.length];
      let raw;
      try {
        raw = await provider.write(model, messages, ctrl.signal, Math.max(500, UPSTREAM_TIMEOUT_MS - (Date.now() - started)));
      } catch (e) {
        if (ctrl.signal.aborted) throw e;
        failures.push({ model: model, status: e.status || 502, detail: e.detail || String(e.message || e).slice(0, 300) });
        if (e.retry) continue; // busy or broken: try again / the next model
        break; // a bad key or bad request won't get better
      }
      const text = cleanLine(raw);
      if (!text) {
        failures.push({ model: model, status: 200, detail: "empty" });
        continue;
      }
      const broken = brokenRule(body.intent, text);
      if (!broken) return res.status(200).json({ text: text, provider: name, model: model, attempts: i + 1, ms: Date.now() - started });
      failures.push({ model: model, status: 200, detail: "rejected, " + broken + ": " + text });
    }
    const last = failures[failures.length - 1] || {};
    const error = last.status === 200 ? "rejected" : "upstream " + last.status; // 200 = the model answered, but badly
    return res.status(502).json({ error: error, provider: name, detail: last.detail, tried: failures });
  } catch (e) {
    return res.status(504).json({ error: "timeout or network", provider: name, tried: failures });
  } finally {
    clearTimeout(timer);
  }
};

module.exports.buildMessages = buildMessages;
module.exports.cleanLine = cleanLine;
module.exports.brokenRule = brokenRule;
