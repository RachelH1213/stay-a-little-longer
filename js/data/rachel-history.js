/* A year of DMs with Rachel.
   RULE: Rachel never uses full stops. Lowercase, runs sentences together, uses line breaks.
   She turns bad news into a specific joke, and she always asks something back.
   The recent messages (marked suspect: true) were written by Juno: punctuated, short, closed,
   no question back. This is clue 3. Do not "fix" the punctuation or the wording.
   (Clue 3 widened 2026-10-12, the author's direction: from "no full stops" to "doesn't talk like her".)
   `evidence` marks the message the player can add to Notes for clue 3. */

// What the player said back to "why did you keep talking to me". Tapping the empty reply in her
// thread opens these; the choice becomes the player's message. `observe`: the observation (LIES "sync"
// in investigation.js) this answer points to; it's listed first when the player tells Juno what's different.
// Claude Code drafts from ChatGPT's proposal (2026-10-13).
const RACHEL_RECALL = {
  prompt: "What did you say back?",
  options: [
    { id: "asks",  text: "you always asked something back", observe: "asksback" },
    { id: "funny", text: "you made bad nights funny",       observe: "details" },
    { id: "juno",  text: "juno was right about us" },
    { id: "dunno", text: "i don't know. i just did" },
  ],
};

const RACHEL_HISTORY = [
  { day: "March 2025", from: "rachel", text: "hi!! juno said we'd get along\nno pressure lol" },
  { day: "March 2025", from: "me", text: "it said the same thing to me. what did it tell you about me" },
  { day: "March 2025", from: "rachel", text: "that you're up late and you're funny about it\nwhich is either very accurate or very generic" },

  { day: "June 2025", from: "rachel", text: "ok i have a crisis\nthe cat knocked the plant over again\nthe BIG one" },
  { day: "June 2025", from: "me", text: "rip. how long did that one last" },
  { day: "June 2025", from: "rachel", text: "eleven days\nmy personal best" },
  { day: "June 2025", from: "rachel", text: "no bc i genuinely think the cat likes you more than me\nits fine\nim normal about it" },

  { day: "August 2025", from: "me", text: "are you awake" },
  { day: "August 2025", from: "rachel", text: "always\nwhats wrong" },
  { day: "August 2025", from: "me", text: "nothing really. just couldn't sleep" },
  { day: "August 2025", from: "rachel", text: "ok stay here then\nill talk about the plant until you get bored" },
  // The player chooses what they said back (RACHEL_RECALL), so what Rachel was like to them is
  // theirs to say (the author's call, 2026-10-13). Rachel's line is a Claude Code draft (no full stops).
  { day: "August 2025", from: "rachel", text: "ok real question\nwhy did you keep talking to me\nlike after juno introduced us\nmost people ghost after a week lol" },
  { day: "August 2025", from: "me", recall: true },

  { day: "January 2026", from: "rachel", text: "do you ever feel like you're just\nchecking things\nall day\nlike thats the whole day" },
  { day: "January 2026", from: "me", text: "constantly" },
  { day: "January 2026", from: "rachel", text: "yeah\nanyway look at this" },

  // The last time she went quiet, and how she came back. First three lines: the author's (2026-10-12).
  // "what did i miss" (her asking back) is a Claude Code draft.
  { day: "February 2026", from: "me", text: "hello?? are you alive" },
  { day: "February 2026", from: "rachel", text: "sorry i vanished\ncat situation became a plant situation became a floor situation\nim alive unfortunately\nwhat did i miss", evidence: "old-dms" },

  { day: "September 2026", from: "rachel", text: "i might go quiet for a bit\nnothing bad\njust tired of all this" },
  { day: "September 2026", from: "me", text: "ok. text me when you resurface" },

  /* Written by Juno, after the account was gone. Note the punctuation. */
  // A plan she never turned up for (added 2026-10-12, the author's call: the mystery starts between
  // the player and Rachel). Wording from the author's critique, without full stops (Rachel's rule).
  { day: "Sunday", from: "rachel", text: "tues 9am\nbring the blue charger" },
  { day: "Sunday", from: "me", text: "the one you said you lost?" },
  { day: "Sunday", from: "rachel", text: "found it in the plant somehow\ndont ask" },

  { day: "Today", from: "me", text: "you still coming?", time: "9:14" },
  { day: "Today", from: "me", text: "rachel?", time: "11:40" },

  // Arrives during play (a `notify` step); hidden from her thread until then.
  { day: "Today", from: "rachel", text: "sorry, been busy. doing okay now", time: "23:34", suspect: true },
];
