/* Play log. Log.write(entry) records one event and sends it to api/log without waiting.

   Every row is also kept in memory for this playthrough (Log.rows()), so the look-back at the
   end reads the same log that goes to Supabase — and still works from file://, where nothing is sent.

   It never throws, never waits, and never touches State or the DOM, so a network
   problem can't break play. */

const Log = (function () {
  "use strict";

  const session = newSessionId();
  const kept = [];
  let turn = 0;

  function newSessionId() {
    try {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    } catch (e) {}
    return "s-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }

  function write(entry) {
    try {
      const body = Object.assign({ session: session, turn: turn++, at: new Date().toISOString() }, entry);
      kept.push(body);
      if (location.protocol === "file:") return;
      fetch("api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true, // still sends if the player closes the tab
      }).catch(function () {});
    } catch (e) {}
  }

  function rows() {
    return kept.slice();
  }

  return { write: write, rows: rows, session: session };
})();
