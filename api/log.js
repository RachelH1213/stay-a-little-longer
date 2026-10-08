/* POST /api/log — writes one row to the Supabase `turns` table.

   The Supabase key stays on the server. This function also decides what is allowed
   to be stored: known fields only, capped lengths, no IP address or browser details.
   The client never waits for it and ignores every error. */

const TABLE = "turns";
const UPSTREAM_TIMEOUT_MS = 3000;
const KINDS = ["player", "juno", "exit", "return", "answer"];
const MAX_TEXT = 500;
const MAX_JSON = 4000;

function str(v, n) {
  return typeof v === "string" ? v.slice(0, n) : null;
}

function int(v) {
  return Number.isInteger(v) && v >= 0 && v < 100000 ? v : null;
}

// Small JSON values only; anything too big is dropped rather than truncated into invalid JSON.
function json(v) {
  if (v == null) return null;
  try {
    const s = JSON.stringify(v);
    return s.length <= MAX_JSON ? JSON.parse(s) : null;
  } catch (e) {
    return null;
  }
}

// Map the client's entry onto the table's columns. Unknown fields are ignored.
function toRow(b) {
  if (!b || KINDS.indexOf(b.kind) === -1) return null;
  if (typeof b.session !== "string" || !/^[a-z0-9-]{8,64}$/i.test(b.session)) return null;
  return {
    session_id: b.session,
    turn: int(b.turn),
    kind: b.kind,
    client_at: str(b.at, 40),
    step: int(b.step),
    player_text: str(b.playerText, MAX_TEXT),
    via: str(b.via, 20),
    reply: str(b.reply, MAX_TEXT),
    intent: str(b.intent, 20),
    rule: str(b.rule, 40),
    source: str(b.source, 20),
    fact_ids: json(b.factIds),
    state: json(b.state),
  };
}

function headers(key) {
  const h = { "Content-Type": "application/json", apikey: key, Prefer: "return=minimal" };
  if (key.indexOf("eyJ") === 0) h.Authorization = "Bearer " + key; // legacy JWT keys also need this
  return h;
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

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY;
  if (!url || !key) return res.status(500).json({ error: "not configured" });

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch (e) { body = null; }
  }
  const row = toRow(body);
  if (!row) return res.status(400).json({ error: "bad request" });

  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), UPSTREAM_TIMEOUT_MS);
  try {
    // Accept the project URL with or without a trailing slash or /rest/v1.
    const base = url.trim().replace(/\/+$/, "").replace(/\/rest\/v1$/, "");
    const r = await fetch(base + "/rest/v1/" + TABLE, {
      method: "POST",
      headers: headers(key),
      body: JSON.stringify(row),
      signal: ctrl.signal,
    });
    if (!r.ok) return res.status(502).json({ error: "upstream " + r.status, detail: await upstreamDetail(r) });
    return res.status(204).end();
  } catch (e) {
    return res.status(504).json({ error: "timeout or network" });
  } finally {
    clearTimeout(timer);
  }
};

module.exports.toRow = toRow;
