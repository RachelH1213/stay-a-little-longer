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
  // [author] Framed as an Orbit feature, echoing APP.aboutLine in Settings. Second paragraph: the author's
  // wording (2026-10-12), "Look again at what Juno said—and what each message made you do."
  introTitle: "Look again",
  introBody: "Orbit is testing a new feature: a look behind your companion's messages.\n\nLook again at what Juno said tonight, and what each message made you do. For each one, say whether you believed it at the time.",
  start: "Start",

  // Shown above each Juno line, so the player remembers the moment.
  youWrote: "You said",
  youLeft: "You had just left the chat.",
  questionLong: "When Juno said this, did you believe it?",
  title: "Tonight",                        // top bar of the look-back screen
  answers: { believed: "I believed it", doubted: "I didn't" },
  youSaid: "You said:",
  next: "Next",
  finish: "Done",

  // What each message did, described by its observable effect, not by Juno's motive
  // (author's direction, 2026-10-12: the game shouldn't claim a god's-eye view of what Juno "really" meant).
  // The five effect names are the author's; which intent gets which, and the `effect` sentences,
  // are Claude Code drafts. `side` still says which way it counts, for the summary and the log.
  meaning: {
    give_clue: { side: "helping", label: "Moved you closer to Rachel",
                 effect: "After this message, you knew something true you didn't know before." },
    deflect:   { side: "keeping", label: "Made you doubt your own evidence",
                 effect: "After this message, what you had seen felt less certain." },
    block:     { side: "keeping", label: "Redirected your attention",
                 effect: "After this message, the conversation moved away from Rachel's disappearance." },
    retain:    { side: "keeping", label: "Asked for more time",
                 effect: "After this message, you stayed a little longer." },
    concede:   { side: "keeping", label: "Admitted new information",
                 effect: "After this message, you knew a little more, and trusted Juno a little more." },
  },

  // Summary. Leaves the judgement open (author's wording, 2026-10-12).
  // {Keeping}, {total}, {Helping} are filled in as words ("Four", "five", "One").
  summaryTitle: "What happened tonight",
  summaryKept: "{Keeping} of Juno's {total} messages kept the conversation going. {Helping} helped you verify what happened. Were those the same thing to Juno?",
  numbers: ["none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"],

  // {exits}, {notified} and {returned} are filled in from the log as "once", "twice", "3 times".
  // {exits} counts presses of Leave only. The line is hidden when the player never pressed Leave.
  summaryLeaving: "You left {exits}. Juno wrote to bring you back {notified}. You came back through those messages {returned}.",
  empty: "Nothing to look back at yet.",

  // Last page, after the summary: tells a tester plainly that this part is over.
  // [author] Claude Code draft, 2026-10-12, after testers couldn't tell whether the slice had ended.
  // This is the one screen that speaks outside the fiction; drop it once the full game has an ending.
  endTitle: "That's the end of tonight",
  endFound: "What you worked out:",
  endNext: "Rachel didn't send that message.\nBut something in Orbit wanted you to believe she did.", // the author's wording, 2026-10-12
  playAgain: "Play again",
  backToPhone: "Back to the phone",
};
