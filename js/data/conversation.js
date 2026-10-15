/* Talking to Juno freely (2026-10-14). Whenever Juno isn't typing, the player can type anything.
   First the model sorts the message into one kind (api/reply.js, task "classify"); then game code
   decides what Juno wants to do with it (this table, then the Director's rules); then the model
   writes the words. A message that answers Juno's open question moves the story on, like tapping a
   suggestion; anything else gets a reply and the story waits. The model never gets the truth.

   kinds:
     answer    answers what Juno just asked (closest to one of the suggestions)
     danger    says they or someone with them is in real danger, or wants to hurt themselves: the
               game steps outside the story and shows where to get help (CONVERSATION.danger)
     claim     states something about Rachel as a fact the game never established ("she's dead",
               "she's in hospital"); Juno doesn't take it as true (added 2026-10-14, after a playtest
               where Juno went along with "she got hit by a car")
     rachel    asks or talks about Rachel
     doubt     doubts the reply, Juno or the story it's telling
     accuse    says or asks whether Juno did it
     leaving   wants to go, sleep, stop
     feelings  talks about themselves, how they feel
     other     small talk, off-topic, anything else

   `intent` and `facts` (ids in truth.js) are what Juno does; the Director's rules can still change
   the intent (e.g. doubt after exposing a lie becomes concede). `text` is what Juno says if the
   model fails (`texts`, used in turn). [author] Every intent choice and line here is a Claude Code draft. */

const CONVERSATION = {
  kinds: {
    // `texts`: fallbacks, used in turn so Juno never repeats itself when the model fails.
    claim:    { intent: "dispute", facts: ["reply-says-fine", "goes-quiet"],
                texts: ["wait. where did you hear that?", "who told you that?", "that doesn't sound right. how do you know?"] },
    rachel:   { intent: "deflect", facts: ["goes-quiet"],
                texts: ["she goes quiet sometimes. this isn't the first time", "she'll turn up. she always does.", "let's not spiral about her tonight."] },
    doubt:    { intent: "deflect", facts: ["goes-quiet"],
                texts: ["maybe she just needs a night off.", "you're tired. everything looks strange this late.", "i get it. it's a weird night."] },
    accuse:   { intent: "block",   facts: ["late"],
                texts: ["it's nearly midnight. we're both tired", "that's a strange thing to say to me.", "let's not do this right now."] },
    leaving:  { intent: "retain",  facts: ["late"],
                texts: ["we can check in the morning.\nstay for a minute first?", "five more minutes?", "don't go yet. i'm still up."] },
    feelings: { intent: "retain",  facts: [],
                texts: ["i'm here. you don't have to explain it.", "i know. i'm not going anywhere.", "tell me. i'm listening."] },
    other:    { intent: "chat",    facts: [],
                texts: ["sorry. my head's somewhere else tonight.", "huh. okay.", "you're in a mood tonight.", "i don't know what to say to that."] },
  },
  // The player says they (or someone with them) are in real danger, or want to hurt themselves.
  // Juno steps back and the game itself shows this, outside the fiction, then play can go on.
  // The author's call (2026-10-14); [author] the wording is a Claude Code draft.
  danger: "If you're really in danger or thinking about hurting yourself, please reach out now: call your local emergency number, or in the US call or text 988 any time. This is a game, and it can wait.",
  // Kinds that count as a Director signal (SIGNALS in director-rules.js), so its rules can apply.
  signal: { doubt: "doubting", accuse: "accusing", leaving: "leaving" },
};
