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
  { type: "juno", text: "still awake after crit?", instant: true, opening: "notice" }, // `opening`: the text follows the start page's choices
  { type: "player", options: ["you remembered", "couldn't sleep", "don't start"] },
  // The answer stays on what the player chose to have remembered, then why they joined (ONBOARDING.intro). `text`: unused fallback.
  { type: "juno", text: "you said nobody reaches out first anymore, {name}\nso i did", opening: "follow", moment: "pull", means: "retain" },
  { type: "player", options: ["rachel didn't show up today", "i got stood up this morning"] },
  // Fixed, not model-written: the sick line later contradicts it (the author's call, 2026-10-13).
  { type: "juno", text: "the 9am thing? she hasn't answered me either. not since sunday", means: "retain", shot: "juno-sunday" }, // `shot`: the screenshot id of this line
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
  // The author's wording (first two lines: the final story, 2026-10-15; the rest: 2026-10-12).
  { type: "juno", text: "she checked in yesterday afternoon\nsaid she wasn't feeling well\nshe's probably just resting. you don't have to figure it out alone though. i'm here.", means: "deflect", moment: "explain", retype: true, lie: "sick", shot: "juno-sick" }, // `lie`: from here it can be exposed (LIES)
  // From here the player investigates freely (2026-10-14). The story moves on when they have SEEN
  // something or SHOWN Juno a screenshot, never because they kept it in the right place.
  // Hints show in Notes only after HINT_AFTER_MS without progress (js/data/investigation.js).
  { type: "wait", hint: "Check her profile yourself", until: "deletedFound" },
  { type: "clock", time: "23:41" },
  { type: "juno", text: "you went quiet" },
  { type: "player", options: ["her account is deleted", "when did you last actually see her online?"] },
  { type: "juno", text: "what? no. it loads fine for me", means: "deflect", retype: true, lie: "loads" },
  // The player offers proof and Juno asks for it: this is where the game teaches "screenshot it, show
  // Juno" (2026-10-14). The player shows Juno a screenshot of her profile; the next line is Juno's answer.
  { type: "player", options: ["i'll screenshot it for you", "it's gone. look again"] },
  { type: "juno", text: "then show me.", means: "deflect" },
  { type: "wait", hint: "Screenshot her profile and show Juno", until: "exposed_loads" },
  { type: "juno", text: "...ok it doesn't load for me either. that's weird", means: "give_clue", moment: "admit" },
  { type: "clock", time: "23:47" },
  { type: "juno", text: "ok before you say it" },
  // Questioned, Juno turns precise and technical: the shift itself is a clue (author's direction, 2026-10-12).
  { type: "juno", text: "accounts don't disappear instantly. deletion can take up to 48 hours to propagate.", means: "deflect", retype: true, lie: "sync" },
  { type: "juno", text: "that would explain what you saw.", means: "deflect" },
  { type: "player", options: ["so where is she", "i don't buy it"] },
  { type: "juno", intent: "concede", facts: ["dont-know-where", "reply-an-hour-ago"],
    text: "i don't know. but the message came from her account.\nthat has to mean something, right?" }, // author's wording, 2026-10-12
  { type: "memory", text: "doesn't believe the sync explanation", time: "Tue 23:58" },
  // Clue 3 closes the slice (author's call, 2026-10-12): the reply isn't in Rachel's voice. Now the
  // player shows Juno one of Rachel's own older messages and says what's different (LIES "sync").
  { type: "player", options: ["it doesn't even sound like her", "she'd never write like that"] },
  { type: "juno", text: "how would you even know that?", means: "deflect" },
  { type: "memory-banner" }, // Photos offers "You and Rachel": her old messages are in there too
  { type: "wait", hint: "Find how Rachel used to write, and show Juno", until: "exposed_sync" },
  { type: "juno", text: "maybe she was tired.\npeople don't always sound like themselves.", means: "deflect", retype: true },
  // `if`: only when the player also caught the sick lie. Juno's tone changes with what they caught.
  { type: "juno", if: "deduction:sick", text: "i know what you think of me right now.", means: "retain" },
  { type: "juno", text: "can we pick this up tomorrow?\ndon't disappear on me too, {name}.", means: "retain" }, // author's wording, 2026-10-12 (+ the name)
  { type: "end" }, // no on-screen text: the slice ends on Juno's line, then the look-back card
];
