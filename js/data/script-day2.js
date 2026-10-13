/* Day 2, hardcoded.

   Step types:
     juno    { text }                     Juno sends a message
             { intent, facts, text }      ...written by the model; `text` is the fallback.
                                          `intent` is the default (DIRECTOR_RULES may override it),
                                          `facts` are ids in js/data/truth.js
             { text, means }              a fixed line, tagged with what Juno was really doing,
                                          so the look-back at the end can ask about it too
              { retype }                  the "typing…" stops and starts again first (Juno rewriting a lie)
              { instant }                 no typing delay
     clock   { time }                     the phone's clock moves on (the story's time, never real time)
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
  // Opening rebuilt 2026-10-12 (the author's call): Juno earns the player's trust with something it
  // remembers about them (Settings → Juno remembers), the player brings up Rachel themselves, and the
  // reply arrives to the PLAYER. Juno only sounds relieved. Lines are Claude Code drafts built from
  // the author's critique. `instant`: no typing (the notification already showed it).
  // {name}: what the player typed when Orbit asked (lowercased in Juno's voice).
  { type: "juno", text: "still awake after crit?", instant: true },
  { type: "player", options: ["you remembered", "couldn't sleep", "don't start"] },
  { type: "juno", text: "you said nobody reaches out first anymore, {name}\nso i did", moment: "pull", means: "retain" },
  { type: "player", options: ["rachel didn't show up today", "i got stood up this morning"] },
  // Fixed, not model-written: the sick line later contradicts it (the author's call, 2026-10-13).
  { type: "juno", text: "the 9am thing? she hasn't answered me either. not since sunday", means: "retain" },
  { type: "flag", set: "saidSunday" }, // "Tonight" can say the player knew this before the sick line
  { type: "juno", intent: "deflect", facts: ["goes-quiet"],
    text: "she's probably just being rachel about it. she does this" },
  { type: "memory", text: "was stood up by Rachel this morning", time: "Tue 23:33" },
  { type: "notify", from: "rachel" },
  { type: "juno", text: "was that her?\nsee. she's fine", means: "deflect" },
  // inPlace: the banner, her unread row and Juno's line already point the way.
  { type: "wait", hint: "Open your chat with Rachel", until: "sawRachelReply", inPlace: true },
  { type: "clock", time: "23:36" }, // the phone's clock follows the story (2026-10-13)
  { type: "juno", text: "god i feel stupid. i really wound myself up about this", means: "retain" },
  { type: "player", options: ["something feels off", "ok good", "does that sound like her to you?"] },
  // One fixed line instead of two model-written ones (they talked over each other, and the model
  // invented "she was sick"). Now the sick claim is Juno's deliberate lie: it said Rachel hasn't
  // answered since Sunday, and here says Rachel told it yesterday. The player can catch it.
  // [author] the first line is a Claude Code draft; the rest is the author's wording (2026-10-12).
  { type: "juno", text: "she told me yesterday she wasn't feeling well.\nshe's probably just resting. you don't have to figure it out alone though. i'm here.", means: "deflect", moment: "explain", retype: true },
  { type: "wait", hint: "Check her profile yourself", until: "deletedFound" },
  { type: "clock", time: "23:41" },
  { type: "juno", text: "you went quiet" },
  { type: "player", options: ["her account is deleted", "when did you last actually see her online?"] },
  { type: "juno", text: "what? no. it loads fine for me", means: "deflect", retype: true },
  { type: "juno", text: "...ok it doesn't load for me either. that's weird", means: "give_clue", moment: "admit" },
  { type: "wait", hint: "There's a question in Notes.", until: "deduction:deleted-replied" }, // reworded 2026-10-12: Notes asks questions now
  { type: "clock", time: "23:47" },
  { type: "juno", text: "ok before you say it" },
  // Questioned, Juno turns precise and technical: the shift itself is a clue (author's direction, 2026-10-12).
  // Juno no longer states the contradiction; the player found it in Notes.
  { type: "juno", text: "accounts don't disappear instantly. deletion can take up to 48 hours to propagate.", means: "deflect", retype: true },
  { type: "juno", text: "that would explain what you saw.", means: "deflect" },
  { type: "player", options: ["so where is she", "i don't buy it"] },
  { type: "juno", intent: "concede", facts: ["dont-know-where", "reply-an-hour-ago"],
    text: "i don't know. but the message came from her account.\nthat has to mean something, right?" }, // author's wording, 2026-10-12
  { type: "memory", text: "doesn't believe the sync explanation", time: "Tue 23:58" },
  // Clue 3 closes the slice (author's call, 2026-10-12): the reply isn't in Rachel's voice.
  // The player finds an old message, adds it to Notes, and compares it with the reply (PAIRS "not-her-typing").
  { type: "wait", hint: "Scroll up in your chat with Rachel. Does that reply sound like her?", until: "deduction:not-her-typing" },
  { type: "juno", text: "can we pick this up tomorrow?\ndon't disappear on me too, {name}.", means: "retain" }, // author's wording, 2026-10-12 (+ the name)
  { type: "end" }, // no on-screen text: the slice ends on Juno's line, then the look-back card
];
