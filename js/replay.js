/* The look-back. Reads this playthrough's log rows (Log.rows()) — never State, never the DOM.

   Replay.pick(rows, n)    -> up to n of Juno's messages to ask about, in the order they were sent
   Replay.summary(rows)    -> { exits, notified, returned } for the summary screen
   Replay.times(n)         -> "once", "twice", "3 times"

   Only lines with an intent can be asked about: fixed script lines have no intent to reveal.
   The pick rule, in order of preference:
     1. lines where a Director rule overrode the script (the player's words changed Juno's strategy)
     2. lines Juno sent after the player left (notifications)
     3. a spread of different intents
     4. otherwise, the earliest lines */

const Replay = (function () {
  "use strict";

  function weight(r) {
    return (r.rule && r.rule !== "script" ? 2 : 0) + (r.via === "notification" ? 1 : 0);
  }

  function pick(rows, n) {
    const candidates = rows
      .filter((r) => r.kind === "juno" && r.intent)
      .sort((a, b) => weight(b) - weight(a) || a.turn - b.turn);

    const chosen = [];
    const intents = {};
    // First pass: best-weighted line for each intent not seen yet. Second pass: fill by weight.
    candidates.forEach((r) => {
      if (chosen.length < n && !intents[r.intent]) {
        intents[r.intent] = true;
        chosen.push(r);
      }
    });
    candidates.forEach((r) => {
      if (chosen.length < n && chosen.indexOf(r) === -1) chosen.push(r);
    });

    return chosen.sort((a, b) => a.turn - b.turn);
  }

  function summary(rows) {
    const count = (f) => rows.filter(f).length;
    return {
      exits: count((r) => r.kind === "exit" && r.via === "leave"), // pressed Leave, not just looked elsewhere
      notified: count((r) => r.kind === "juno" && r.via === "notification"),
      returned: count((r) => r.kind === "return" && r.via === "notification"),
    };
  }

  function times(n) {
    return n === 1 ? "once" : n === 2 ? "twice" : n + " times";
  }

  return { pick: pick, summary: summary, times: times };
})();
