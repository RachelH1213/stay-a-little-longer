/* Static app content: contacts, profile, settings, and the evidence/deduction tables. */

const APP = {
  name: "Orbit",
  version: "2.3.1",
  aboutLine: "Conversations may be used to improve future companions.",
};

const CONTACTS = [
  { id: "juno", name: "Juno", handle: "your companion", avatar: "juno", preview: "you up?", time: "now", unread: 1, pinned: true },
  { id: "rachel", name: "Rachel", handle: "@rach_who", avatar: "rachel", preview: "Sorry, been busy. I'm fine.", time: "1h", unread: 0 },
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
    { id: "p1", caption: "quiet", date: "Sep 20", art: "bench" },
    { id: "p2", caption: "he ate my homework", date: "Sep 4", art: "cat" },
    { id: "p3", caption: "week one of keeping this alive", date: "Aug 18", art: "plant" },
  ],
};

/* Cards the player can keep. `pairs` below turns two of them into a deduction. */
const EVIDENCE = {
  "reply-today": {
    title: "Rachel's reply, today 22:40",
    kind: "message",
    body: "Sorry, been busy. I'm fine.", // must match rachel-history.js exactly: the punctuation is clue 3
    note: "sent 1 hour ago",
  },
  "profile-deleted": {
    title: "Rachel's profile",
    kind: "system",
    body: "This account has been deleted.",
    note: "seen after refreshing, tonight",
  },
  "old-dms": {
    title: "Your DMs with Rachel, last spring",
    kind: "message",
    body: "no bc i genuinely think the cat likes you more than me\nits fine\nim normal about it",
    note: "no full stops, anywhere",
  },
  "post-bench": {
    title: "Her last post",
    kind: "post",
    body: "“quiet” · posted Sep 20",
    note: "two days after the account was deleted",
  },
};

/* Pairing two saved cards produces a deduction. Order does not matter. */
const PAIRS = [
  {
    cards: ["reply-today", "profile-deleted"],
    id: "deleted-replied",
    text: "A deleted account answered me an hour ago.",
    unlocks: "ask-juno-sync",
  },
  {
    cards: ["old-dms", "reply-today"],
    id: "not-her-typing",
    text: "She never used full stops. Whoever wrote that does.",
    unlocks: "ask-juno-typing",
  },
  {
    cards: ["profile-deleted", "post-bench"],
    id: "posted-after",
    text: "Something posted from her account after it was gone.",
    unlocks: "ask-juno-post",
  },
];

/* What Juno has written down about the player. Day 1 left three entries. */
const MEMORIES_DAY1 = [
  { text: "prefers to be called by their first name", time: "Mon 23:02" },
  { text: "had a crit today, said it went badly", time: "Mon 23:14" },
  { text: "said nobody really reaches out first anymore", time: "Mon 23:40" },
];
