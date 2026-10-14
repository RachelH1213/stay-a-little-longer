/* Static app content: contacts, profile, settings. */

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
  avatar: "img/rachel-avatar.jpg",
  // Photos are the author's (2026-10-13). p3 and p4 captions are Claude Code drafts in Rachel's voice
  // (lowercase, no full stops); p3 used to be "week one of keeping this alive" (a plant).
  posts: [
    { id: "p1", caption: "quiet", date: "Sep 23", img: "img/post-quiet.jpg" }, // this morning, the day after the account was deleted
    { id: "p2", caption: "he ate my homework", date: "Sep 4", img: "img/post-cat.jpg" },
    { id: "p3", caption: "golden hour, nobody else up here", date: "Aug 18", img: "img/post-view.jpg" },
    { id: "p4", caption: "lost every match, worth it", date: "Jul 26", img: "img/post-gamenight.jpg" },
  ],
};

/* Evidence used to be cards kept with a paperclip and paired in Notes (PAIRS). Since 2026-10-14
   the player takes screenshots and shows them to Juno instead: js/data/investigation.js. */

/* What Juno has written down about the player. Day 1 left three entries. */
const MEMORIES_DAY1 = [
  { text: "prefers to be called {name}", time: "Mon 23:02" }, // {name}: what the player typed, else "by their first name"
  // the player's own choice on the start page goes here (ONBOARDING.intro.remember), "Tue 22:50"
  { text: "said nobody really reaches out first anymore", time: "Mon 23:40" },
];
