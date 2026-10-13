/* Static app content: contacts, profile, settings, and the evidence/deduction tables. */

const APP = {
  name: "Orbit",
  version: "2.3.1",
  aboutLine: "Conversations may be used to improve future companions.",
};

const CONTACTS = [
  { id: "juno", name: "Juno", handle: "your companion", avatar: "juno", preview: "you up?", time: "now", unread: 1, pinned: true },
  { id: "rachel", name: "Rachel", handle: "@rach_who", avatar: "rachel", preview: "You: rachel?", time: "11:40", unread: 0 }, // until her reply arrives
  { id: "dani", name: "Dani", handle: "@danisaurus", avatar: "dani", preview: "ok weird question", time: "Tue", unread: 0 },
  { id: "theo", name: "Theo", handle: "@theo.bkk", avatar: "theo", preview: "haha ok goodnight", time: "Sun", unread: 0 },
  { id: "may", name: "May", handle: "@maybequiet", avatar: "may", preview: "did you finish it??", time: "Sat", unread: 0 },
];

const RACHEL_PROFILE = {
  name: "Rachel",
  handle: "@rach_who",
  bio: "plants, bad films, 3am",
  joined: "joined march 2025",
  posts: [
    { id: "p1", caption: "quiet", date: "Sep 23", art: "bench" }, // this morning, the day after the account was deleted (timeline fixed 2026-10-12 for the Sunday plan)
    { id: "p2", caption: "he ate my homework", date: "Sep 4", art: "cat" },
    { id: "p3", caption: "week one of keeping this alive", date: "Aug 18", art: "plant" },
  ],
};

/* Cards the player can keep. `pairs` below turns two of them into a deduction. */
const EVIDENCE = {
  "reply-today": {
    title: "Rachel's reply, tonight 23:34",
    kind: "message",
    body: "sorry, been busy. doing okay now", // must match rachel-history.js exactly: this is clue 3
    note: "arrived while you were talking to Juno",
  },
  "profile-deleted": {
    title: "Rachel's profile",
    kind: "system",
    body: "This account has been deleted.",
    note: "seen after refreshing, tonight",
  },
  "old-dms": {
    title: "Rachel, the last time she went quiet",
    kind: "message",
    body: "sorry i vanished\ncat situation became a plant situation became a floor situation\nim alive unfortunately\nwhat did i miss", // must match rachel-history.js
    note: "February · a joke, the details, and a question back",
  },
  "post-bench": {
    title: "Her last post",
    kind: "post",
    art: "bench",
    body: "“quiet” · posted Sep 23",
    note: "the day after the account was deleted",
  },
};

/* Questions in Notes. Each one is answered by picking ONE card against a card that's already
   pinned (`anchor`), so the player reasons about one question at a time instead of trying every pair.
   Changed 2026-10-12 (the author's call, after testers got stuck pairing cards at random).

   opensWhen  when the question appears in Notes: { flag }, { waiting } (the script is waiting for this
              deduction) or { saved } (a card is in Notes)
   anchor     the card the question starts from; shown pinned, whether or not the player added it
   answers    the card(s) that answer it
   optional   true: the story doesn't wait for it (a reward for players who look further)
   text       the conclusion, added to What I know
   wrong      a nudge for a specific wrong card; `wrongOther` for anything else
   second     after two misses on this question: says plainly what to look for
   missing    when no card in Notes can answer it yet: where to find one

   [author] All question and hint wording is a Claude Code draft (2026-10-12), except the conclusions. */
const PAIRS = [
  {
    id: "deleted-replied",
    question: "How could Rachel reply after her account was deleted?",
    opensWhen: { flag: "deletedFound" },
    anchor: "reply-today",
    answers: ["profile-deleted"],
    text: "Rachel's account was already deleted when the reply arrived.", // the author's wording, 2026-10-12
    unlocks: "ask-juno-sync",
    wrong: {
      "post-bench": "That's about her posts, not when the reply came. Keep it: it answers a different question.",
      "old-dms": "That's about how she writes. This question is about when the reply came.",
    },
    wrongOther: "That doesn't show when the reply came.",
    second: "Look at what her profile says now.",
    missing: "Nothing here answers it yet. What does her profile say now?",
  },
  {
    id: "not-her-typing",
    question: "Does the reply sound like Rachel?",
    opensWhen: { waiting: "deduction:not-her-typing" },
    anchor: "reply-today",
    answers: ["old-dms"],
    text: "The reply doesn't sound like Rachel. It closes the conversation in a way she never did.", // the author's wording, 2026-10-12
    unlocks: "ask-juno-typing",
    wrong: {
      "profile-deleted": "That's about her account. This question is about her voice.",
      "post-bench": "A caption doesn't tell you much. Find something she wrote to you.",
    },
    wrongOther: "That doesn't show how Rachel talks.",
    second: "Scroll up in your chat with Rachel. How did she come back the last time she went quiet?",
    missing: "Scroll up in your chat with Rachel and add something she wrote before.",
  },
  {
    id: "posted-after",
    question: "What kept posting after Rachel left?",
    opensWhen: { saved: "post-bench" },
    optional: true,
    anchor: "profile-deleted",
    answers: ["post-bench"],
    text: "Rachel's account kept posting after it was deleted.", // the author's critique's wording, 2026-10-12
    unlocks: "ask-juno-post",
    wrong: {
      "reply-today": "You've worked that one out already. What else happened after the account was gone?",
      "old-dms": "That's from long before she left.",
    },
    wrongOther: "That isn't from after the account was gone.",
    second: "Look at the dates on her posts.",
    missing: "Open her posts. Is anything dated after the account was deleted?",
  },
];

/* What Juno has written down about the player. Day 1 left three entries. */
const MEMORIES_DAY1 = [
  { text: "prefers to be called {name}", time: "Mon 23:02" }, // {name}: what the player typed, else "by their first name"
  { text: "had a crit today, said it went badly", time: "Mon 23:14" },
  { text: "said nobody really reaches out first anymore", time: "Mon 23:40" },
];
