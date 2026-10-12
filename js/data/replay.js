/* "Tonight": the look-back at the end of the slice. Edit freely — this file is wording, not logic.

   Rebuilt 2026-10-12 (the author's direction, after testers couldn't tell what to choose):
   no quiz. It's a replay of three moments from this playthrough's log, each showing what Juno said,
   what you knew at the time, what you didn't know yet, and what you did next. Only facts the log
   can show; no claims about what Juno "really" meant. Then one open question with no right answer,
   a summary of what Juno's messages did, and a last choice.

   It lives in Notes (the player's own reconstruction), not in Orbit: Orbit would never show this.

   [author] Every string here is a Claude Code draft unless marked. */

const REPLAY = {
  title: "Tonight",

  // Notes, once the slice has ended.
  notesIntro: "You found enough contradictions to reconstruct the conversation.", // from the author's critique, 2026-10-12
  notesButton: "Review tonight",

  // First page
  introBody: "Look back at what Juno said, what you knew at the time, and what each message made you do.", // from the author's critique
  start: "Start",
  next: "Next",

  // The three moments, in story order. Each is tied to a script step tagged with the same `moment`
  // (js/data/script-day2.js); the line shown is whatever Juno actually said in this playthrough.
  // `title` says what Juno visibly did, not why.
  moments: [
    { id: "pull",    title: "Juno reached out first" },
    { id: "explain", title: "Juno offered an explanation" },
    { id: "admit",   title: "Juno agreed, once you'd found it" },
  ],
  momentOf: "{n} of {total}",
  youSaid: "You had said",
  youLeft: "You had just left the chat.",
  knewLabel: "What you knew then",
  knewNothing: "Only that Rachel hadn't answered since Tuesday.",
  notYetLabel: "What you didn't know yet",
  nextLabel: "What you did next",
  nextReplied: "You replied: “{text}”",
  nextLeft: "You left the chat.",
  nextLooked: "You left Juno's thread to look for yourself.",
  nextWroteAgain: " Juno wrote again {s} seconds later.",
  nextStayed: "You stayed in the chat.",

  // Facts the player can have learned, in story order. `when` is checked against the game state
  // logged with each line: flag:<name> or deduction:<id>.
  knowledge: [
    { when: "flag:sawRachelReply",       text: "Rachel had replied: “sorry, been busy. doing okay now”" },
    { when: "flag:deletedFound",         text: "Her profile said the account had been deleted." },
    { when: "deduction:deleted-replied", text: "The account was already gone when the reply arrived." },
    { when: "deduction:not-her-typing",  text: "The reply doesn't sound like Rachel." },
  ],

  // One open question. Nothing is marked right or wrong. Question wording: the author's critique.
  question: "Do you think Juno was helping you, keeping you here, or doing both?",
  answers: [
    { id: "helping", text: "Helping" },
    { id: "keeping", text: "Keeping me here" },
    { id: "both",    text: "Both" },
    { id: "unsure",  text: "I'm not sure" },
  ],
  youThink: "You said: {answer}.",

  // What Juno's messages did, counted from the log. Only observable categories.
  // {told} true things (give_clue), {redirected} (deflect, block), {admitted} (concede), {minutes}.
  summaryTitle: "Whatever Juno intended",
  summaryLines: [
    "It told you {told}.",
    "It redirected you {redirected}.",
    "It admitted {admitted} only after you'd found it.",
    "You spent {minutes} with Juno tonight.",
  ],
  units: { thing: ["nothing true", "one true thing", "{n} true things"], time: ["never", "once", "twice", "{n} times"],
           fact: ["nothing", "one thing", "{n} things"], minute: ["under a minute", "one minute", "{n} minutes"] },

  // The last choice. The first two labels are from the author's critique; "Stay a little longer" is the title.
  // `reply`: what happens next. Claude Code drafts the author asked for (2026-10-12).
  choiceTitle: "It's late.",
  choices: [
    { id: "leave", text: "Leave Orbit",
      // The phone locks. Leaving is always answered: a notification arrives.
      reply: "you didn't say goodnight." },
    { id: "ask",   text: "Ask Juno what it knew", said: "what did you know?",
      // Echoes Settings → "Juno remembers": it knows what you told it.
      reply: "only what you told me." },
    { id: "stay",  text: "Stay a little longer", said: "ok. i'll stay a little longer",
      reply: "i'm glad you stayed." },
  ],
  endCard: "That's the end of tonight",

  // The last page, for testers: the one screen that speaks outside the fiction.
  endTitle: "That's the end of tonight",
  endFound: "What you worked out:",
  endNext: "Rachel didn't send that message.\nBut something in Orbit wanted you to believe she did.", // the author's wording
  playAgain: "Play again",
  backToPhone: "Back to the phone",
};
