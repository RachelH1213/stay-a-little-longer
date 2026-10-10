/* The look-back at the end of the slice. Edit freely — this file is story, not logic.

   DRAFT, set up by Claude Code. The helping / keeping split comes from the author (TASKS.md: "helping
   you, or keeping you?"). Everything else — the wording, which side each intent counts as, the summary
   lines — still needs the author's review.

   Five of Juno's messages are picked from this playthrough's log (see js/replay.js for the rule).
   For each one the player says whether they believed it, then the card flips to show what Juno was
   actually doing, and whether that was helping or keeping them.

   Changed 2026-10-10 (author's choice, option A): the player used to be asked "helping you, or keeping
   you?" directly. Testing showed nobody could answer it: the slice ends before the truth comes out,
   and some lines are both (they point at real evidence but are lies). Now the player only reports
   their own reaction, which they always know; helping/keeping is shown in the reveal. */

const REPLAY = {
  count: 5,

  entryLabel: "Look back at tonight",      // the card in Juno's thread after the slice ends

  // Intro page before the first card.
  // [author] Claude Code draft: framed as an Orbit feature, echoing APP.aboutLine in Settings.
  introTitle: "Did you believe Juno?",
  introBody: "Orbit is testing a new feature: a look behind your companion's messages.\n\nHere are five moments from tonight. For each one, say whether you believed Juno at the time. Then see what Juno was really doing: helping you find Rachel, or keeping you here.",
  start: "Start",

  // Shown above each Juno line, so the player remembers the moment.
  youWrote: "You said",
  youLeft: "You had just left the chat.",
  questionLong: "When Juno said this, did you believe it?",
  title: "Tonight",                        // top bar of the look-back screen
  answers: { believed: "I believed it", doubted: "I didn't" },
  sides: { helping: "Helping you", keeping: "Keeping you here" }, // the reveal's headline
  revealPrefix: "Juno was",
  youSaid: "You said:",
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
    retain:    { side: "keeping", label: "asking you to stay" },
  },

  // Summary. {believed} of {keeping}: how many of the "keeping" lines the player believed.
  // Hidden when none of the picked lines were keeping.
  summaryBelieved: "Juno was keeping you here {keeping} of {total} times. You believed it {believed} of those.",

  // {exits}, {notified} and {returned} are filled in from the log as "once", "twice", "3 times".
  // {exits} counts presses of Leave only. The line is hidden when the player never pressed Leave.
  summaryTitle: "What happened tonight",
  summaryLeaving: "You left {exits}. Juno wrote to bring you back {notified}. You came back through those messages {returned}.",
  empty: "Nothing to look back at yet.",
};
