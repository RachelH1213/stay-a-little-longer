/* Wording for the game layer and first-time help. Edit freely — this file is wording, not logic.

   The phone is Orbit and stays real app furniture. The notebook beside it (or sliding over it on
   a phone) is the player's own game layer: clippings, comparing them, what they know, what to do
   next. Game words are allowed there, never inside the phone.

   DRAFT, written by Claude Code (2026-10-08, reworked 2026-10-10 for the notebook layer).
   [author] Every string here is a placeholder for the author's own wording. */

const ONBOARDING = {
  // Inside the phone, first launch only: older notifications under Juno's on the lock screen.
  // `fromHistory` copies a message from rachel-history.js exactly (her punctuation is clue 3).
  lockPast: [
    { from: "rachel", when: "last week", fromHistory: "i might go quiet for a bit" },
  ],

  // The game layer.
  notebook: {
    title: "Notebook",
    next: "Next",
    clippings: "Clippings",
    know: "What I know",
    empty: "Nothing clipped yet.\nTap 📎 on a message or a screen in the phone to keep it here.",
    needTwo: "Clip one more thing, then compare them.",
    pick: "Pick two clippings that don't fit together.",
    picked: "1 of 2 picked",
    compare: "Compare",
    noMatch: "Those two don't say anything together.",
    knowEmpty: "Nothing yet.",
    close: "Back to the phone",
  },

  clip: "📎",
  clipped: "Clipped to your notebook",
  unclipped: "Removed from your notebook",
  coachClip: "Clip this to your notebook",      // first time evidence appears in the phone
  coachCompare: "Two clippings — compare them",  // first time the player has two clippings
};
