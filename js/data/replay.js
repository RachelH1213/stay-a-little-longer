/* The look-back at the end of the slice. Edit freely — this file is story, not logic.

   DRAFT, set up by Claude Code. Only `question` comes from the author (TASKS.md). Everything else —
   the wording, which side each intent counts as, the summary lines — still needs the author's review.

   Five of Juno's messages are picked from this playthrough's log (see js/replay.js for the rule).
   For each one the player answers `question`, then the card flips to show what Juno was actually doing. */

const REPLAY = {
  count: 5,

  entryLabel: "Look back at tonight",      // the card in Juno's thread after the slice ends
  title: "Tonight",                        // top bar of the look-back screen
  question: "helping you, or keeping you?",
  answers: { helping: "helping", keeping: "keeping" },
  revealPrefix: "Juno was",
  youSaid: "you said",
  next: "Next",
  finish: "Done",

  // What each intent was really doing, in plain words, and which side it counts as.
  // `concede` counts as keeping: Claude Code's call (2026-10-08), because the persona defines it as
  // admitting something "so your user keeps trusting you" — honesty used as a strategy.
  meaning: {
    give_clue: { side: "helping", label: "telling you something true" },
    concede:   { side: "keeping", label: "giving a little up to keep your trust" }, // no pronoun for Juno: the author hasn't chosen one
    deflect:   { side: "keeping", label: "steering you away from the question" },
    block:     { side: "keeping", label: "changing the subject" },
    retain:    { side: "keeping", label: "keeping you here" },
  },

  // Summary. {exits}, {notified} and {returned} are filled in from the log as "once", "twice", "3 times".
  // {exits} counts presses of Leave only. The line is hidden when the player never pressed Leave.
  summaryTitle: "What happened tonight",
  summaryLeaving: "You left {exits}. Juno wrote to bring you back {notified}. You came back through those messages {returned}.",
  empty: "Nothing to look back at yet.",
};
