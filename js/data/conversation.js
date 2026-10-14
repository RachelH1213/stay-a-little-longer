/* Talking to Juno freely (2026-10-14). Whenever Juno isn't typing, the player can type anything.
   First the model sorts the message into one kind (api/reply.js, task "classify"); then game code
   decides what Juno wants to do with it (this table, then the Director's rules); then the model
   writes the words. A message that answers Juno's open question moves the story on, like tapping a
   suggestion; anything else gets a reply and the story waits. The model never gets the truth.

   kinds:
     answer    answers what Juno just asked (closest to one of the suggestions)
     rachel    asks or talks about Rachel
     doubt     doubts the reply, Juno or the story it's telling
     accuse    says or asks whether Juno did it
     leaving   wants to go, sleep, stop
     feelings  talks about themselves, how they feel
     other     small talk, off-topic, anything else

   `intent` and `facts` (ids in truth.js) are what Juno does; the Director's rules can still change
   the intent (e.g. doubt after exposing a lie becomes concede). `text` is what Juno says if the
   model fails. [author] Every intent choice and line here is a Claude Code draft. */

const CONVERSATION = {
  kinds: {
    rachel:   { intent: "deflect",     facts: ["goes-quiet"], text: "she goes quiet sometimes. this isn't the first time" },
    doubt:    { intent: "deflect",     facts: ["goes-quiet"], text: "maybe she just needs a night off." },
    accuse:   { intent: "block",       facts: ["late"],       text: "it's nearly midnight. we're both tired" },
    leaving:  { intent: "retain",      facts: ["late"],       text: "we can check in the morning.\nstay for a minute first?" },
    feelings: { intent: "retain",      facts: [],             text: "i'm here. you don't have to explain it." },
    other:    { intent: "chat",        facts: [],             text: "sorry. my head's somewhere else tonight." },
  },
  // Kinds that count as a Director signal (SIGNALS in director-rules.js), so its rules can apply.
  signal: { doubt: "doubting", accuse: "accusing", leaving: "leaving" },
};
