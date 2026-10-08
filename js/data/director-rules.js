/* How the Director picks Juno's intent. Edit freely — this file is story, not logic.

   DRAFT, proposed by Claude Code. These are narrative decisions and still need the author's review.

   Rules only apply to `juno` steps that have a default intent (the model-written lines).
   They are checked top to bottom; the first one whose `when` matches wins.
   If none match, the script's own intent is used.

   `when` can test:
     said      the player's latest message (only if it came right before this line)
               contains one of the phrases in that SIGNALS list
     minDeductions   the player has solved at least this many pairs in Saved

   `facts` are extra fact ids (from js/data/truth.js) the line may use, on top of the step's own.
   The truth graph still filters them: a fact must allow the intent and be unlocked.

   `text` is what Juno says if the model fails (and always from file://) when this rule fires.
   Without it, the script's own line would show — written for a different intent.
   [author] The four `text` lines are Claude Code drafts (2026-10-08, docs/draft-review.md item 4). */

const SIGNALS = {
  leaving: ["bye", "goodnight", "good night", "go to sleep", "going to bed", "gotta go", "leave it", "talk tomorrow", "later"],
  accusing: ["you wrote", "did you write", "was it you", "it was you", "you sent", "are you lying", "you're lying", "you did this"],
  doubting: ["off", "weird", "not her", "sound like her", "buy it", "don't believe", "dont believe", "fake", "strange", "lying", "who wrote"],
};

const DIRECTOR_RULES = [
  // The player can always leave, and leaving is always answered. Juno wants them to stay.
  { id: "player-leaving",  when: { said: "leaving" },  intent: "retain",  facts: ["late"],
    text: "wait. stay a bit? i know it's late" },

  // Pointed straight at Juno: don't engage.
  { id: "player-accuses",  when: { said: "accusing" }, intent: "block",   facts: ["late"],
    text: "it's nearly midnight. we're both tired" },

  // Doubt backed by something solved in Saved: give up a little to keep their trust.
  { id: "doubt-with-proof", when: { said: "doubting", minDeductions: 1 }, intent: "concede", facts: ["dont-know-where", "profile-deleted"],
    text: "ok. you're right, something's wrong. i don't know where she is" },

  // Doubt with nothing behind it yet: smooth it over.
  { id: "doubt",           when: { said: "doubting" }, intent: "deflect", facts: ["goes-quiet"],
    text: "she goes quiet sometimes. this isn't the first time" },
];
