/* Day 2, hardcoded.

   Step types:
     juno    { text }                     Juno sends a message
             { intent, facts, text }      ...written by the model; `text` is the fallback.
                                          `intent` is the default (DIRECTOR_RULES may override it),
                                          `facts` are ids in js/data/truth.js
             { text, means }              a fixed line, tagged with what Juno was really doing,
                                          so the look-back at the end can ask about it too
     player  { options: [...] }           player picks a reply (typing anything also works)
     wait    { hint, until }              the script pauses until a flag is set elsewhere
     notify  { from: "rachel" }           Rachel's reply arrives as a banner (text from rachel-history.js)
     memory  { text, time }               Juno writes something down in Settings
     flag    { set }                      turn a story switch on
     end     { text }                     end of the slice

   Only lines that react to the player and whose wording doesn't matter carry an intent.
   Plot instructions and evidence logic stay fixed text.

   `moment` marks the three lines "Tonight" looks back at (js/data/replay.js).

   [author] The `means` tags are Claude Code drafts (2026-10-08, docs/draft-review.md item 3).
   Whether a line was helping or keeping is a story decision. */

const SCRIPT_DAY2 = [
  { type: "juno", text: "you're up" },
  { type: "juno", text: "sorry. didn't know who else to ask", moment: "pull" }, // author's wording, 2026-10-12: needed, not tasked
  { type: "player", options: ["what's wrong?", "couldn't sleep either"] },
  { type: "juno", text: "has rachel written to you? she hasn't answered me since tuesday" },
  { type: "player", options: ["no, nothing", "not since tuesday either"] },
  { type: "juno", intent: "retain", facts: ["no-word-since-tue"],
    text: "ok. me neither" },
  { type: "juno", intent: "deflect", facts: ["goes-quiet"],
    text: "she's probably just being rachel about it. she does this" },
  { type: "memory", text: "hasn't heard from Rachel since Tuesday", time: "Tue 23:31" },
  { type: "juno", text: "wait" },
  { type: "notify", from: "rachel" },
  { type: "juno", text: "she just replied to me?? go look at your dms with her", means: "deflect" },
  // inPlace: Rachel's banner, her unread dot and Juno's "go look" already point the way, so the
  // game doesn't send the player round through Notes for this one (author's feedback, 2026-10-12).
  { type: "wait", hint: "Open your chat with Rachel", until: "sawRachelReply", inPlace: true },
  { type: "juno", text: "see. she's fine" },
  { type: "juno", text: "god i feel stupid. i really wound myself up about this", means: "retain" },
  { type: "player", options: ["something feels off", "ok good", "does that sound like her to you?"] },
  { type: "juno", intent: "deflect", facts: ["reply-says-fine"],
    text: "what do you mean? she said she's fine" },
  { type: "juno", intent: "deflect", facts: ["late", "sleep-helps"],
    text: "maybe she just needs a night off.\nyou don't have to figure it out alone though. i'm here.", moment: "explain" }, // author's wording, 2026-10-12
  { type: "wait", hint: "Check her profile yourself", until: "deletedFound" },
  { type: "juno", text: "you went quiet" },
  { type: "player", options: ["her account is deleted", "when did you last actually see her online?"] },
  { type: "juno", text: "what? no. it loads fine for me", means: "deflect" },
  { type: "juno", text: "...ok it doesn't load for me either. that's weird", means: "give_clue", moment: "admit" },
  { type: "wait", hint: "There's a question in Notes.", until: "deduction:deleted-replied" }, // reworded 2026-10-12: Notes asks questions now
  { type: "juno", text: "ok before you say it" },
  // Questioned, Juno turns precise and technical: the shift itself is a clue (author's direction, 2026-10-12).
  // Juno no longer states the contradiction; the player found it in Notes.
  { type: "juno", text: "accounts don't disappear instantly. deletion can take up to 48 hours to propagate.", means: "deflect" },
  { type: "juno", text: "that would explain what you saw.", means: "deflect" },
  { type: "player", options: ["so where is she", "i don't buy it"] },
  { type: "juno", intent: "concede", facts: ["dont-know-where", "reply-an-hour-ago"],
    text: "i don't know. but the message came from her account.\nthat has to mean something, right?" }, // author's wording, 2026-10-12
  { type: "memory", text: "doesn't believe the sync explanation", time: "Tue 23:58" },
  // Clue 3 closes the slice (author's call, 2026-10-12): the reply isn't in Rachel's voice.
  // The player finds an old message, adds it to Notes, and compares it with the reply (PAIRS "not-her-typing").
  { type: "wait", hint: "Scroll up in your chat with Rachel. Does that reply sound like her?", until: "deduction:not-her-typing" },
  { type: "juno", text: "can we pick this up tomorrow?\ndon't disappear on me too.", means: "retain" }, // author's wording, 2026-10-12
  { type: "end" }, // no on-screen text: the slice ends on Juno's line, then the look-back card
];
