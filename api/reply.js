/* POST /api/reply — turns {persona, intent, allowedFacts, recentTurns} into one line of text.
   Which model writes it is set in api/_providers.js (JUNO_PROVIDER).

   The game decides what Juno wants to say. This only writes the words.
   Any failure returns an error status; the client then shows the hardcoded line. */

const { PERSONAS, INTENTS, GUARDS } = require("./_persona");

const { pick } = require("./_providers"); // which model writes the words: zhipu | anthropic | openai

const UPSTREAM_TIMEOUT_MS = 7000; // under the client's 8s, so we fail before it gives up
const CLASSIFY_TIMEOUT_MS = 4000; // the client gives up at 5s and sorts the message by keywords
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

  const open = body.openQuestion ? clip(body.openQuestion, MAX_TEXT) : "";
  const brief =
    `What you want to do with this message: ${INTENTS[body.intent]}\n` +
    `Facts you may use:\n${facts.length ? facts.join("\n") : "- none"}` +
    (open ? `\nYour last question to them is still waiting for an answer: "${open}". After replying, you can bring them back to it.` : "");

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

const MAX_WORDS = 25; // Juno texts; a paragraph is the model drifting out of character

// The first rule a line breaks for this intent, or null if it's fine.
function brokenRule(intent, text) {
  const w = words(text);
  if (w.trim().split(" ").length > MAX_WORDS) return "too long";
  for (const g of [GUARDS.all, GUARDS[intent]]) {
    if (!g) continue;
    for (const p of g.never || []) if (w.indexOf(words(p)) !== -1) return "says \"" + p + "\"";
    for (const p of g.neverStart || []) if (w.indexOf(words(p)) === 0) return "starts with \"" + p + "\"";
  }
  return null;
}

// Sorting a typed message (task "classify"): the game needs to know what kind of message it is
// before it decides what Juno wants to do. The model only labels it; it writes nothing the player sees.
const KINDS = ["claim", "rachel", "doubt", "accuse", "leaving", "feelings", "other"];
function classifyMessages(body) {
  const options = (Array.isArray(body.options) ? body.options : []).slice(0, 4).map((o) => clip(o, MAX_TEXT));
  const system =
    "You sort one message a user sent to Juno, their AI companion in a social app, late at night. " +
    "Their friend Rachel has gone quiet, and they are trying to find out what happened.\n" +
    "Reply with exactly one label and nothing else:\n" +
    (options.length ? "answer N - the message answers Juno's last message; N is the closest option below\n" : "") +
    "claim - states something about Rachel as a fact: where she is, that she's hurt, sick, dead, with someone, what happened to her\n" +
    "rachel - asks or talks about Rachel otherwise\n" +
    "doubt - doubts Rachel's reply, Juno, or what Juno is saying\n" +
    "accuse - says or asks whether Juno wrote, sent or did something\n" +
    "leaving - wants to go, sleep or stop talking\n" +
    "feelings - talks about themselves or how they feel\n" +
    "other - anything else";
  const user =
    `Juno's last message: "${clip(body.last, MAX_TEXT)}"\n` +
    (options.length ? "Options:\n" + options.map((o, i) => `${i + 1}. ${o}`).join("\n") + "\n" : "") +
    `The user's message: "${clip(body.text, MAX_TEXT)}"`;
  return { messages: [{ role: "system", content: system }, { role: "user", content: user }], count: options.length };
}

function parseKind(raw, count) {
  const t = String(raw || "").toLowerCase();
  const m = t.match(/answer\s*(\d)/);
  if (m && count && +m[1] >= 1 && +m[1] <= count) return { kind: "answer", option: +m[1] - 1 };
  const k = KINDS.find((x) => new RegExp("\\b" + x + "\\b").test(t));
  return k ? { kind: k } : null;
}

async function classify(body, res) {
  const { name, provider } = pick(body.provider);
  if (!provider.key()) return res.status(500).json({ error: "no key", provider: name });
  const model = provider.models()[0];
  const { messages, count } = classifyMessages(body);
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), CLASSIFY_TIMEOUT_MS);
  try {
    const raw = await provider.write(model, messages, ctrl.signal, CLASSIFY_TIMEOUT_MS);
    const kind = parseKind(raw, count);
    if (!kind) return res.status(502).json({ error: "unclear", raw: clip(raw, 80) });
    return res.status(200).json(Object.assign(kind, { provider: name, model: model }));
  } catch (e) {
    return res.status(502).json({ error: "upstream", detail: e.detail || String(e.message || e).slice(0, 200) });
  } finally {
    clearTimeout(timer);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  if (body && body.task === "classify" && typeof body.text === "string") return classify(body, res);
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
module.exports.parseKind = parseKind;
module.exports.cleanLine = cleanLine;
module.exports.brokenRule = brokenRule;
