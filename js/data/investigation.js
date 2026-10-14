/* Investigating (2026-10-14): screenshots instead of the paperclip, showing them to Juno to catch
   its lies, Notes as the player's own notes, Orbit search and Dani. Edit freely — wording and story
   tables, not logic.

   How it fits together:
   - The player screenshots anything in Orbit (the viewfinder button at the top of a screen, then tap
     a message, a post or her profile). Screenshots go to Photos.
   - In Juno's thread, the photo button sends a screenshot. If it breaks a lie Juno has told
     (LIES[].brokenBy), that lie is exposed (State.deductions, flag exposed_<id>), and the script moves
     on if it was waiting for it. Anything else gets a short reply from WRONG_SHOT.
   - Notes writes down what the player has found (FINDINGS), in their own words, as they find it.
   - The story moves on when the player has SEEN something or SHOWN Juno something, never because
     they kept it in the right place. The to-do only appears after HINT_AFTER_MS without progress.

   [author] Every Juno, Dani and Notes line here is a Claude Code draft (2026-10-14). */

const HINT_AFTER_MS = 35000; // the to-do shows in Notes only after this long without progress

// Named screenshots: the ones the story knows about. Any other message or post can be screenshot too
// (it gets a generic id); it just doesn't break a lie.
const SHOTS = {
  "reply-today":     { from: "Rachel", title: "Rachel · tonight 23:34" },
  "old-dms":         { from: "Rachel", title: "Rachel · February" },
  "profile-deleted": { from: "Orbit",  title: "Rachel's profile · tonight", text: "This account has been deleted.\nRemoved Sep 22" },
  "post-bench":      { from: "Orbit",  title: "Rachel's post · Sep 23" },
  "juno-sunday":     { from: "Juno",   title: "Juno · tonight 23:33" },
  "juno-sick":       { from: "Juno",   title: "Juno · tonight 23:36" },
};

// Juno's lies, in story order. `brokenBy`: screenshot ids, or "rachel-old" for any of Rachel's own
// older messages (her voice). A lie can only be exposed once Juno has said it (script step `lie`).
// `gate`: the script waits for it (a `wait` step on flag exposed_<id>); without it, it's optional and
// Juno answers with `reply` right away.
const LIES = [
  {
    id: "sick",
    brokenBy: ["juno-sunday"],
    reply: [
      { text: "i meant she'd told me before. a while ago.", retype: true },
      { text: "i'm not trying to confuse you, {name}." },
    ],
  },
  { id: "loads", brokenBy: ["profile-deleted"], gate: true },     // the script's next line is Juno's answer
  {
    id: "sync",
    brokenBy: ["old-dms", "rachel-old"],
    gate: true,
    // Before Juno answers, the player says what's different, in their own words (the four options
    // from the old Notes step). The one their answer in Rachel's thread points at comes first.
    observeAsk: "What's different?",
    observe: [
      { id: "details",  text: "she'd tell me what actually happened",   finding: "She always told you what happened. This tells you nothing." },
      { id: "asksback", text: "she always asks something back",          finding: "She always asked something back. This closes the conversation." },
      { id: "punct",    text: "she never uses full stops",               finding: "She never used full stops. This one does." },
    ],
  },
];

// Showing Juno something that doesn't break an open lie.
const WRONG_SHOT = {
  "reply-today": "that's her reply. it came from her account.",
  "juno-sunday": "yeah. i told you that.",
  again: "you already showed me that.",
  other: ["what am i looking at?", "i'm not sure what you want me to see.", "ok. and?"],
};

// What the player writes down in Notes, as they find it. `when`: flag:<name> or deduction:<lie id>.
// `goal` marks the finding that ticks that goal.
const FINDINGS = [
  { when: "flag:sawRachelReply", text: "Rachel replied at 23:34: “sorry, been busy. doing okay now”" },
  { when: "flag:deletedFound",   text: "Her account was deleted on Sep 22. The reply came after that." },
  { when: "deduction:loads",     text: "Juno said her profile loads fine. It doesn't." },
  { when: "flag:sawPostAfter",   text: "Her account posted “quiet” this morning, after it was deleted." },
  { when: "flag:searchedSick",   text: "Rachel never wrote anything about being sick." },
  { when: "flag:daniAsked",      text: "Dani hasn't heard from her since Sunday either." },
  { when: "deduction:sick",      text: "Juno said Rachel hadn't answered since Sunday. Then it said she told it yesterday she was sick." },
  { when: "deduction:sync",      text: "The reply doesn't sound like Rachel." }, // + what the player said was different
];

// Orbit search (Chats). Searches Rachel's messages and posts and Dani's chat.
const SEARCH = {
  placeholder: "Search Orbit",
  none: "No results for “{q}”",
  // Searching one of these words sets flag searchedSick (nothing from Rachel will match).
  sickWords: ["sick", "unwell", "flu", "fever", "doctor", "hospital", "not feeling well"],
};

// Dani's thread: the player can ask two things. Dani's lines follow Rachel's style rules loosely
// (lowercase), but Dani is not Rachel. `flag` is set when the answer arrives.
const DANI = {
  history: [
    { day: "Tuesday", from: "them", text: "ok weird question\nhas juno asked you about rachel" },
    { day: "Tuesday", from: "me", text: "not yet. why" },
    { day: "Tuesday", from: "them", text: "no reason\nnevermind" },
  ],
  asks: [
    { id: "heard", text: "have you heard from rachel?", reply: "no. not since sunday either\nshe was supposed to text me after your 9am thing", flag: "daniAsked" },
    { id: "why",   text: "why did you ask about juno?", reply: "it asked me if rachel had said anything about leaving\ni said no. did she say something to you?", flag: "daniJuno" },
  ],
};

// Wording around screenshots, Photos and showing Juno.
const SHOT_UI = {
  button: "Screenshot",
  capturing: "Tap what you want to keep",
  nothing: "Tap a message, a post or her profile",
  saved: "Screenshot saved to Photos",
  already: "Already in Photos",
  coach: "Screenshot it: tap the viewfinder, then tap what you want to keep",
  photos: "Photos",
  photosEmpty: "No screenshots yet.\nIn Orbit, tap the viewfinder at the top, then tap what you want to keep.",
  attach: "Show Juno a screenshot",
  attachEmpty: "No screenshots yet",
  attachCoach: "Show Juno what you found",
};
