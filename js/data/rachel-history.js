/* A year of DMs with Rachel.
   RULE: Rachel never uses full stops. Lowercase, runs sentences together, uses line breaks.
   She turns bad news into a specific joke, and she always asks something back.
   The recent messages (marked suspect: true) were written by Juno: punctuated, short, closed,
   no question back. This is clue 3. Do not "fix" the punctuation or the wording.
   (Clue 3 widened 2026-10-12, the author's direction: from "no full stops" to "doesn't talk like her".)
   `evidence` marks the message the player can add to Notes for clue 3. */

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
  { day: "Today", from: "rachel", text: "sorry, been busy. doing okay now", time: "22:40", suspect: true }, // was "Sorry, been busy. I'm fine." (too obviously not her)
];
