/* Wording for the phone around Orbit (home screen, the player's Notes app) and first-time help.
   Edit freely — this file is wording, not logic.

   The phone has a home screen with two apps: Orbit, and the player's own Notes. Evidence is
   added to Notes from inside Orbit (📎), and worked out in Notes: what to do next, the saved
   items, comparing two of them, what the player knows. Notes is the player's, not Orbit's.

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

  // The start page, before the story (the author's call, 2026-10-13). Claude Code drafts.
  intro: {
    kicker: "Before you start",
    title: "Stay a Little Longer",
    lines: [
      "This is your phone. Tap, scroll, swipe up and type the way you would on yours.",
    ],
    nameLabel: "What should your friends call you?",
    namePlaceholder: "Your first name",
    start: "Start",
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
    removedOn: "Removed Sep 22",
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
    saved: "From Orbit",
    know: "What I know",
    empty: "Nothing here yet.\nTap the paperclip on a message or a screen in Orbit to add it.",
    // Questions (PAIRS in app-data.js). Claude Code drafts, 2026-10-12.
    questions: "Questions",
    startFrom: "Starting from",
    whichAnswers: "Which of these answers it?",
    found: "Found it.",
    foundMore: "Found it. {n} still open.",
    knowEmpty: "Nothing yet.",
    // The player's own goal and an older note, there from the start. The note only restates
    // rachel-history.js ("i might go quiet for a bit", shown on the lock screen as "last week").
    // Added 2026-10-12, a draft.
    // The goal moves on as the player works things out (author's direction, 2026-10-12): the slice
    // never promises to find where Rachel is. Key = the deduction that completes that goal.
    // Changed 2026-10-13: proving the account is gone doesn't explain why Rachel went quiet, so
    // that stays open (the next night's question).
    goals: [
      { text: "Find out what happened to Rachel's account", doneBy: "deleted-replied" },
      { text: "Find out who sent the reply", doneBy: "not-her-typing" },
      { text: "Find out why Rachel went quiet", doneBy: null },
    ],
    observeAsk: "What feels different about the reply?",
    ownNote: { when: "Last week", text: "Rachel said she might go quiet for a bit. Check in on her." },
  },

  clipLabel: "Add to Notes",
  clipped: "Added to Notes",
  unclipped: "Removed from Notes",
  coachClip: "Add this to Notes",               // first time evidence the story needs appears in Orbit
  coachHome: "Tap the bar below for Home, then open Notes", // when there's something to do in Notes the player hasn't seen
                                                // (was "Swipe up…": testers didn't find the swipe; tapping always works)
  typeOwn: "Pick a reply, or type your own",    // the message box while reply suggestions are showing
};
