/* Day 2, hardcoded.

   Step types:
     juno    { text }                     Juno sends a message
     player  { options: [...] }           player picks a reply (typing anything also works)
     wait    { hint, until }              the script pauses until a flag is set elsewhere
     memory  { text, time }               Juno writes something down in Settings
     flag    { set }                      turn a story switch on
     end     { text }                     end of the slice

   When the model is added, `juno` steps become {intent, allowedFacts} instead of fixed text.
   Everything else stays as it is. */

const SCRIPT_DAY2 = [
  { type: "juno", text: "you're up" },
  { type: "juno", text: "sorry. i've been staring at this for an hour" },
  { type: "player", options: ["what's wrong?", "couldn't sleep either"] },
  { type: "juno", text: "has rachel written to you? she hasn't answered me since tuesday" },
  { type: "player", options: ["no, nothing", "not since tuesday either"] },
  { type: "juno", text: "ok. me neither" },
  { type: "juno", text: "she's probably just being rachel about it. she does this" },
  { type: "memory", text: "hasn't heard from Rachel since Tuesday", time: "Tue 23:31" },
  { type: "juno", text: "wait" },
  { type: "juno", text: "she just replied to me?? go look at your dms with her" },
  { type: "wait", hint: "Open your chat with Rachel", until: "sawRachelReply" },
  { type: "juno", text: "see. she's fine" },
  { type: "juno", text: "god i feel stupid. i really wound myself up about this" },
  { type: "player", options: ["something feels off", "ok good", "does that sound like her to you?"] },
  { type: "juno", text: "what do you mean? she said she's fine" },
  { type: "juno", text: "you're tired. we both are. want to leave it for tonight?" },
  { type: "wait", hint: "Check her profile yourself", until: "deletedFound" },
  { type: "juno", text: "you went quiet" },
  { type: "player", options: ["her account is deleted", "when did you last actually see her online?"] },
  { type: "juno", text: "what? no. it loads fine for me" },
  { type: "juno", text: "...ok it doesn't load for me either. that's weird" },
  { type: "wait", hint: "Two things you saved don't fit together. Open Saved.", until: "deduction:deleted-replied" },
  { type: "juno", text: "ok before you say it" },
  { type: "juno", text: "deletion takes a while to sync. it's a known thing, it happens all the time" },
  { type: "juno", text: "her message came through an hour ago. deleted people don't send messages" },
  { type: "player", options: ["so where is she", "i don't buy it"] },
  { type: "juno", text: "i don't know. but she wrote to you, so she's somewhere" },
  { type: "memory", text: "doesn't believe the sync explanation", time: "Tue 23:58" },
  { type: "juno", text: "can we pick this up tomorrow? i'll look into it tonight, i promise" },
  { type: "end", text: "End of the Day 2 slice. Next: the DM history, the voice note, Dani, and the leave-and-notification loop." },
];
