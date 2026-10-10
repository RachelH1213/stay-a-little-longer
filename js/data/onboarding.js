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
    { from: "rachel", when: "last week", fromHistory: "i might go quiet for a bit" },
  ],

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
    empty: "Nothing here yet.\nTap 📎 on a message or a screen in Orbit to add it.",
    needTwo: "Add one more thing, then compare them.",
    pick: "Pick two that don't fit together.",
    picked: "1 of 2 picked",
    compare: "Compare",
    noMatch: "Those two don't say anything together.",
    knowEmpty: "Nothing yet.",
  },

  clip: "📎",
  clipLabel: "Add to Notes",
  clipped: "Added to Notes",
  unclipped: "Removed from Notes",
  coachClip: "Add this to Notes",               // first time evidence the story needs appears in Orbit
  coachHome: "Swipe up for Home, then open Notes", // when there's something to do in Notes the player hasn't seen
};
