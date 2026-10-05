/* Play log. Log.write(entry) sends one event to api/log and forgets about it.

   It never throws, never waits, and never touches State or the DOM, so a network
   problem can't break play. From file:// it does nothing — there is no server to send to. */

const Log = (function () {
  "use strict";

  const session = newSessionId();
  let turn = 0;

  function newSessionId() {
    try {
      if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    } catch (e) {}
    return "s-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }

  function write(entry) {
    try {
      if (location.protocol === "file:") return;
      const body = Object.assign({ session: session, turn: turn++, at: new Date().toISOString() }, entry);
      fetch("api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        keepalive: true, // still sends if the player closes the tab
      }).catch(function () {});
    } catch (e) {}
  }

  return { write: write, session: session };
})();
