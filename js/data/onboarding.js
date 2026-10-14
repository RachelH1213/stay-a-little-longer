/* Wording for the phone around Orbit (home screen, the player's Notes app) and first-time help.
   Edit freely — this file is wording, not logic.

   The phone has a home screen with three apps: Orbit, the player's own Notes (what they're trying
   to find out and what they've found) and Photos (their screenshots; since 2026-10-14, see
   js/data/investigation.js). Notes and Photos are the player's, not Orbit's.

   DRAFT, written by Claude Code (2026-10-08; reworked 2026-10-10 for a notebook beside the phone,
   then the same day for a home screen + Notes app, the author's choice).
   [author] Every string here is a placeholder for the author's own wording. */

const ONBOARDING = {
  // Inside the phone, first launch only: older notifications under Juno's on the lock screen.
  // `fromHistory` copies a message from rachel-history.js exactly (her punctuation is clue 3).
  lockPast: [
    { from: "rachel", when: "Sunday", fromHistory: "tues 9am" }, // the plan she didn't turn up for (2026-10-12)
  ],

  // Under Juno's name in its thread: says plainly that Juno is Orbit's AI companion, not a friend.
  junoSub: "your Orbit companion",

  // The start page, before the story (the author's call, 2026-10-13). Premise and the two choices:
  // ChatGPT's proposal with Claude Code's edits, chosen by the author as a combined version. All drafts.
  intro: {
    kicker: "Before you start",
    title: "Stay a Little Longer",
    premise: [
      "A year and a half ago, you joined Orbit.",
      "Orbit gave you Juno, an AI companion that remembers what you tell it, checks in when you go quiet, and introduces you to people it thinks you'll understand.",
      "Through Juno, you met Rachel.",
      "Tonight, Rachel missed a plan. Then Juno messaged you first.",
    ],
    howTo: "This is your phone. Tap, scroll, swipe up and type the way you would on yours.",
    // How the night works (2026-10-14: the battery and the clock have to be told, or nobody notices them).
    night: "Your phone is at {battery}%. Everything you do on it uses battery and moves the clock; reading doesn't. When it dies, the night is over.",
    nameLabel: "What should your friends call you?",
    namePlaceholder: "Your first name",
    // Why the player joined Orbit. `opening`: the second half of Juno's second line;
    // `ending`: Juno's last line, whichever ending they choose. Both are used, so the player feels it twice.
    joinLabel: "Why did you join Orbit?",
    join: [
      { id: "talk",    text: "I wanted someone to talk to", opening: "you joined so you'd have someone to talk to. so talk to me", ending: "you came here because you didn't want to be alone. why leave now?" },
      { id: "connect", text: "I wanted to stay connected",  opening: "you joined to stay connected. i'm trying to help with that", ending: "i introduced you to rachel. let me help you find her." },
      { id: "meet",    text: "I wanted to meet people",     opening: "you joined to meet people. i still look out for you", ending: "you wanted to meet people. i found them for you. all of them." },
      { id: "forget",  text: "I don't remember",            opening: "nobody reaches out first anymore. so i did", ending: "you don't have to tell me everything. just stay." },
    ],
    // What Juno should remember about today. `notice`: Juno's first notification and first line;
    // `follow`: Juno's answer to the player's reply, about the same thing (2026-10-13: it used to jump to another memory).
    // `memory`: what Juno writes down (Settings, Juno's profile). Unpicked = the last one.
    rememberLabel: "What should Juno remember about today?",
    remember: [
      { id: "crit",   text: "A critique went badly",      notice: "still awake after crit?",                      follow: "you said it went badly, {name}. i didn't want you sitting with that alone", memory: "had a crit today, said it went badly" },
      { id: "noshow", text: "Someone didn't show up",     notice: "still thinking about who didn't show?",        follow: "you said someone missed a plan today, {name}. i didn't want you waiting alone", memory: "said someone didn't show up today" },
      { id: "sleep",  text: "I couldn't sleep",           notice: "you said nights get loud. want company?",      follow: "i'm up too, {name}. i usually am when you are", memory: "said nights get loud" },
      { id: "none",   text: "Nothing. I'd rather not say", notice: "you didn't want to talk earlier. still true?", follow: "that's ok, {name}. you don't have to say", memory: "didn't want to say what happened today" },
    ],
    next: "Continue", // first screen → second screen
    start: "Start",
  },

  // Juno's thread before tonight: scroll up to see how it started (no flashback scene).
  // Claude Code drafts (2026-10-13); the 3am line is from the combined proposal.
  junoHistory: [
    { day: "March 2025", from: "juno", text: "hi. i'm juno\ni'll remember what you tell me, so you don't have to say it twice" },
    { day: "March 2025", from: "me",   text: "ok" },
    { day: "March 2025", from: "juno", text: "you and rachel are both awake at 3am\nthis feels statistically necessary" },
    { day: "August 2025", from: "juno", text: "you went quiet for four days\njust checking" },
    { day: "August 2025", from: "me",   text: "i'm fine. busy" },
    { day: "September 2026", from: "juno", text: "you haven't opened orbit since thursday\ni kept your spot" },
  ],

  // Juno's profile, from its name in the thread header. Claude Code drafts (2026-10-13).
  junoProfile: {
    title: "Juno",
    sub: "Your Orbit companion",
    since: "Together since March 2025",
    introduced: "Introduced you to Rachel, Dani, Theo, May",
    remembers: "Juno remembers",
  },

  // (no longer used) Orbit's one-time sign-in after an update: what should Juno call you? (2026-10-12, Claude Code draft)
  signin: {
    title: "Welcome back",
    body: "Orbit updated overnight. What should Juno call you?",
    placeholder: "Your first name",
    button: "Continue",
  },

  // Rachel's profile before and while refreshing (2026-10-13, Claude Code drafts).
  profile: {
    stale: "Updated 2 days ago · Pull down to refresh",
    refreshing: "Refreshing…",
  },
  lockNudge: "still there?", // Juno's second notification if the player waits on the lock screen

  // Replying to Rachel (her account is gone).
  notDelivered: "Not Delivered",
  callFailed: "Call Failed",
  cantReceive: "This account can't receive messages.",

  // Home screen.
  home: {
    date: "Tuesday, 23 September",
    orbit: "Orbit",
    notes: "Notes",
  },

  // The player's Notes app.
  notes: {
    title: "Notes",
    todo: "To do",
    know: "What I know", // FINDINGS in investigation.js, written down as the player finds them
    knowEmpty: "Nothing yet.",
    // The player's own goal and an older note, there from the start. The note only restates
    // rachel-history.js ("i might go quiet for a bit", shown on the lock screen as "last week").
    // Added 2026-10-12, a draft.
    // The goal moves on as the player works things out (author's direction, 2026-10-12): the slice
    // never promises to find where Rachel is. `doneBy`: flag:<name> or deduction:<lie id> (2026-10-14).
    // Changed 2026-10-13: proving the account is gone doesn't explain why Rachel went quiet, so
    // that stays open (the next night's question).
    goals: [
      { text: "Find out what happened to Rachel's account", doneBy: "flag:deletedFound" },
      // Comparing her voice only shows she probably didn't write it, not who did (2026-10-13).
      { text: "Find out whether Rachel sent the reply", doneBy: "deduction:sync" },
      { text: "Find out who, or what, sent it", doneBy: null }, // open goals stay open for the next night
      { text: "Find out why Rachel went quiet", doneBy: null },
    ],
    ownNote: { when: "Last week", text: "Rachel said she might go quiet for a bit. Check in on her." },
  },

  coachHome: "Tap the bar below for Home, then open Notes", // when there's something to do in Notes the player hasn't seen
                                                // (was "Swipe up…": testers didn't find the swipe; tapping always works)
  typeOwn: "Pick a reply, or type your own",    // the message box while reply suggestions are showing
};
