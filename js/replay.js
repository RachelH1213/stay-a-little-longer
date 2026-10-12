/* "Tonight". Reads this playthrough's log rows (Log.rows()) — never the DOM.

   Replay.moments(rows)  -> the three moments: Juno's line at each tagged script step, with what the
                            player had said, knew, didn't know yet, and did next
   Replay.counts(rows)   -> { told, redirected, admitted } across all of Juno's intent-carrying lines
   Replay.minutes(rows)  -> whole minutes from the first logged event to the last
   Replay.summary(rows)  -> { exits, notified, returned } (Leave presses and what followed) */

const Replay = (function () {
  "use strict";

  function holds(state, when) {
    if (!state) return false;
    const [kind, name] = when.split(":");
    if (kind === "flag") return !!(state.flags && state.flags[name]);
    if (kind === "deduction") return (state.deductions || []).indexOf(name) !== -1;
    return false;
  }

  // What happened just before a line: the player's last message, or that they had left.
  function contextFor(rows, row) {
    for (let i = rows.length - 1; i >= 0; i--) {
      const r = rows[i];
      if (r.turn >= row.turn) continue;
      if (r.kind === "player") return { said: r.playerText };
      if (r.kind === "exit" && r.via === "leave") return { left: true };
    }
    return {};
  }

  // What the player did after a line: replied, left, or nothing logged.
  function nextFor(rows, row) {
    const after = rows.filter((r) => r.turn > row.turn);
    const first = after.find((r) => r.kind === "player" || r.kind === "exit");
    if (!first) return { stayed: true };
    if (first.kind === "player") return { replied: first.playerText };
    const back = after.find((r) => r.turn > first.turn && r.kind === "juno" && r.via === "notification");
    const secs = back ? Math.round((Date.parse(back.at) - Date.parse(first.at)) / 1000) : null;
    return { left: first.via === "leave", looked: first.via !== "leave", wroteAgain: secs };
  }

  function moments(rows, script, defs, knowledge, finalState) {
    return defs
      .map((d) => {
        const step = script.findIndex((s) => s.moment === d.id);
        const row = rows.find((r) => r.kind === "juno" && r.step === step);
        if (step === -1 || !row) return null;
        const knew = knowledge.filter((k) => holds(row.state, k.when)).map((k) => k.text);
        const notYet = knowledge.filter((k) => !holds(row.state, k.when) && holds(finalState, k.when)).map((k) => k.text);
        return { id: d.id, title: d.title, row: row, context: contextFor(rows, row), knew: knew, notYet: notYet, next: nextFor(rows, row) };
      })
      .filter(Boolean);
  }

  function counts(rows) {
    const c = { told: 0, redirected: 0, admitted: 0 };
    rows.forEach((r) => {
      if (r.kind !== "juno" || !r.intent || r.rule === "bridge") return;
      if (r.intent === "give_clue") c.told++;
      else if (r.intent === "deflect" || r.intent === "block") c.redirected++;
      else if (r.intent === "concede") c.admitted++;
    });
    return c;
  }

  function minutes(rows) {
    if (rows.length < 2) return 0;
    return Math.round((Date.parse(rows[rows.length - 1].at) - Date.parse(rows[0].at)) / 60000);
  }

  function summary(rows) {
    const count = (f) => rows.filter(f).length;
    return {
      exits: count((r) => r.kind === "exit" && r.via === "leave"),
      notified: count((r) => r.kind === "juno" && r.via === "notification"),
      returned: count((r) => r.kind === "return" && r.via === "notification"),
    };
  }

  return { moments: moments, counts: counts, minutes: minutes, summary: summary, contextFor: contextFor };
})();
