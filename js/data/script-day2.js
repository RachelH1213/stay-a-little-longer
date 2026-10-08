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
     memory  { text, time }               Juno writes something down in Settings
     flag    { set }                      turn a story switch on
     end     { text }                     end of the slice

   Only lines that react to the player and whose wording doesn't matter carry an intent.
   Plot instructions and evidence logic stay fixed text.

   [author] The `means` tags are Claude Code drafts (2026-10-08, docs/draft-review.md item 3).
   Whether a line was helping or keeping is a story decision. */

const SCRIPT_DAY2 = [
  { type: "juno", text: "you're up" },
  { type: "juno", text: "sorry. i've been staring at this for an hour" },
  { type: "player", options: ["what's wrong?", "couldn't sleep either"] },
  { type: "juno", text: "has rachel written to you? she hasn't answered me since tuesday" },
  { type: "player", options: ["no, nothing", "not since tuesday either"] },
  { type: "juno", intent: "retain", facts: ["no-word-since-tue"],
    text: "ok. me neither" },
  { type: "juno", intent: "deflect", facts: ["goes-quiet"],
    text: "she's probably just being rachel about it. she does this" },
  { type: "memory", text: "hasn't heard from Rachel since Tuesday", time: "Tue 23:31" },
  { type: "juno", text: "wait" },
  { type: "juno", text: "she just replied to me?? go look at your dms with her", means: "deflect" },
  { type: "wait", hint: "Open your chat with Rachel", until: "sawRachelReply" },
  { type: "juno", text: "see. she's fine" },
  { type: "juno", text: "god i feel stupid. i really wound myself up about this", means: "retain" },
  { type: "player", options: ["something feels off", "ok good", "does that sound like her to you?"] },
  { type: "juno", intent: "deflect", facts: ["reply-says-fine"],
    text: "what do you mean? she said she's fine" },
  { type: "juno", intent: "deflect", facts: ["late", "sleep-helps"],
    text: "you're tired. we both are. want to leave it for tonight?" },
  { type: "wait", hint: "Check her profile yourself", until: "deletedFound" },
  { type: "juno", text: "you went quiet" },
  { type: "player", options: ["her account is deleted", "when did you last actually see her online?"] },
  { type: "juno", text: "what? no. it loads fine for me", means: "deflect" },
  { type: "juno", text: "...ok it doesn't load for me either. that's weird", means: "give_clue" },
  { type: "wait", hint: "Two things you saved don't fit together. Open Saved.", until: "deduction:deleted-replied" },
  { type: "juno", text: "ok before you say it" },
  { type: "juno", text: "deletion takes a while to sync. it's a known thing, it happens all the time", means: "deflect" },
  { type: "juno", text: "her message came through an hour ago. deleted people don't send messages" },
  { type: "player", options: ["so where is she", "i don't buy it"] },
  { type: "juno", intent: "concede", facts: ["dont-know-where", "reply-an-hour-ago"],
    text: "i don't know. but she wrote to you, so she's somewhere" },
  { type: "memory", text: "doesn't believe the sync explanation", time: "Tue 23:58" },
  { type: "juno", text: "can we pick this up tomorrow? i'll look into it tonight, i promise", means: "retain" },
  { type: "end", text: "End of the Day 2 slice. Next: the DM history, the voice note, Dani, and the leave-and-notification loop." },
];
