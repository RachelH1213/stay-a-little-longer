/* The Director. Reads State and the truth graph, returns what Juno wants to do this turn.

   Director.decide(step, State) -> { intent, allowedFacts: [text…], rule }

   The intent comes from DIRECTOR_RULES (or the step's own intent if no rule matches).
   The facts are filtered through TRUTH, so the model only ever gets facts that are
   not secret, already unlocked for this day, unlocked by the player, and allowed for this intent. */

const Director = (function () {
  "use strict";

  const MAX_FACTS = 3;

  // Lowercase, plain apostrophes, punctuation to spaces, padded so phrases match whole words.
  function normalize(s) {
    return " " + s.toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim() + " ";
  }

  // The player's message, but only if it's the last thing in the thread.
  function latestPlayerText(state) {
    const last = state.log[state.log.length - 1];
    return last && last.from === "me" ? normalize(last.text) : "";
  }

  function says(text, signal) {
    return !!text && (SIGNALS[signal] || []).some((p) => text.indexOf(normalize(p)) !== -1);
  }

  function matches(when, state, text) {
    if (when.said && !says(text, when.said)) return false;
    if (when.minDeductions && state.deductions.length < when.minDeductions) return false;
    return true;
  }

  function unlocked(fact, state) {
    const r = fact.requires;
    if (!r) return true;
    if (r.flag) return !!state.flags[r.flag];
    if (r.saved) return state.saved.indexOf(r.saved) !== -1;
    if (r.deduction) return state.deductions.indexOf(r.deduction) !== -1;
    return false;
  }

  function allowedFacts(ids, intent, state) {
    const seen = {};
    return ids
      .filter((id) => {
        const f = TRUTH.facts[id];
        if (!f || seen[id]) return false;
        seen[id] = true;
        return (
          f.kind !== "secret" &&
          f.day <= state.day &&
          f.intents.indexOf(intent) !== -1 &&
          unlocked(f, state)
        );
      })
      .slice(0, MAX_FACTS)
      .map((id) => TRUTH.facts[id].text);
  }

  function decide(step, state) {
    const text = latestPlayerText(state);
    const rule = DIRECTOR_RULES.find((r) => matches(r.when, state, text));
    const intent = rule ? rule.intent : step.intent;
    const ids = (step.facts || []).concat(rule && rule.facts ? rule.facts : []);
    return {
      intent: intent,
      allowedFacts: allowedFacts(ids, intent, state),
      rule: rule ? rule.id : "script",
    };
  }

  return { decide: decide };
})();
