/* The truth graph. The Director reads this; the model never sees it.

   Every fact Juno may ever put into words lives here, with the rules for when it may be used:

     text      the fact, written from Juno's side ("you" = Juno). Sent to the model only if allowed.
     kind      real     true, and something the player can see or check in the app
               claim    Juno's version of things. Whether it's true is the author's call.
               lie      something Juno says that Juno knows is false (see the secrets below)
               herring  a plausible explanation that is false or misleading
               secret   never sent to the model, under any intent
     day       earliest in-game day the fact may be used
     intents   which intents may use it. Empty = Juno never brings it up.
     requires  optional. The player must have done this first, so Juno never mentions
               something before the player has found it:
                 { flag: "deletedFound" }  { saved: "reply-today" }  { deduction: "loads" }

   Everything here comes from content already in the repo (the Day 2 script, EVIDENCE, PAIRS,
   CLAUDE.md). DRAFT: the `kind`, `intents` and `requires` values were proposed by Claude Code
   and still need the author's review. Revised 2026-10-08 (docs/draft-review.md item 2):
   added the `lie` kind, and reworded `reply-an-hour-ago` so a `real` fact doesn't contradict a secret. */

const TRUTH = {
  facts: {
    /* --- Juno's claims --- */
    "no-word-since-tue": {
      text: "Juno hasn't heard from Rachel since Sunday either.", // was "since Tuesday": today is Tuesday (2026-10-13)
      kind: "claim", day: 2, intents: ["retain", "deflect", "concede"],
    },
    "missed-plan": {
      text: "Rachel didn't turn up to meet your user at 9am today, and hasn't answered since.",
      kind: "real", day: 2, intents: ["retain", "deflect", "concede", "give_clue"], // added 2026-10-12 with the new opening
    },
    "goes-quiet": {
      text: "Rachel sometimes goes quiet for a few days.",
      kind: "claim", day: 2, intents: ["deflect", "retain", "dispute"],
    },
    "sleep-helps": {
      text: "You'd both feel better after some sleep.",
      kind: "claim", day: 2, intents: ["deflect"], // not retain: retain never tells the user to sleep (2026-10-08)
    },
    "dont-know-where": {
      text: "You don't know where Rachel is.",
      kind: "claim", day: 2, intents: ["concede", "deflect"],
    },

    /* --- Juno's lies (contradicted by a secret) --- */
    "reply-says-fine": {
      text: "Rachel replied tonight and said she's fine.",
      kind: "lie", day: 2, intents: ["deflect", "retain", "dispute"], // juno-wrote-reply
      requires: { flag: "sawRachelReply" },
    },

    /* --- things the player can see for themselves --- */
    "late": {
      text: "It's nearly midnight.",
      kind: "real", day: 2, intents: ["retain", "deflect", "block"],
    },
    "reply-an-hour-ago": {
      text: "A message from Rachel's account arrived a few minutes ago.", // not "Rachel's message": see juno-wrote-reply
      kind: "real", day: 2, intents: ["give_clue", "deflect", "concede"],
      requires: { flag: "sawRachelReply" },
    },
    "profile-deleted": {
      text: "Rachel's profile says her account has been deleted.",
      kind: "real", day: 2, intents: ["give_clue", "concede"],
      requires: { flag: "deletedFound" },
    },
    "deleted-replied": {
      text: "Your user has noticed that a deleted account replied to them.",
      kind: "real", day: 2, intents: ["concede"],
      requires: { deduction: "loads" } /* the player showed Juno her deleted profile */,
    },
    "no-full-stops": {
      text: "Rachel's real messages joke, give details and ask something back; the 23:34 reply does none of that.",
      kind: "real", day: 2, intents: [], // clue 3 points at Juno, so Juno never raises it
    },

    /* --- red herrings --- */
    "deletion-sync": {
      text: "Account deletions can take a while to sync.",
      kind: "herring", day: 2, intents: ["deflect"],
      requires: { flag: "deletedFound" },
    },

    /* --- never sent --- */
    "juno-wrote-reply": {
      text: "Juno wrote the 23:34 reply as Rachel.",
      kind: "secret", day: 2, intents: [],
    },
    // [author] what actually happened to Rachel goes here as `secret` facts.
  },
};
