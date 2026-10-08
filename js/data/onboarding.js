/* How a first-time player learns where they are and how the app works — all as app furniture,
   never as a game tutorial. Edit freely — this file is wording, not logic.

   DRAFT, written by Claude Code (2026-10-08) after the author found the opening confusing.
   [author] Every string here is a placeholder for the author's own wording. */

const ONBOARDING = {
  // A: older notifications under Juno's on the lock screen, so the player starts with context.
  // `fromHistory` copies a message from rachel-history.js exactly (her punctuation is clue 3).
  lockPast: [
    { from: "rachel", when: "last week", fromHistory: "i might go quiet for a bit" },
  ],

  // B: shown once, the first time the player opens the app, like a real app's "what's new" sheet.
  whatsNew: {
    title: "New in Orbit",
    items: [
      { icon: "⚑", head: "Save", body: "Tap the flag on a message or a screen to keep it in Saved." },
      { icon: "⇄", head: "Compare", body: "In Saved, pick two things to see how they fit together." },
      { icon: "J", head: "Juno", body: "Your companion is here whenever you want to talk." },
    ],
    button: "Got it",
  },

  // C: help at the moment it's needed.
  coachSave: "Tap ⚑ to save this",
  saved: {
    empty: "Nothing saved yet.\nTap ⚑ on a message or a screen to keep it here.",
    needTwo: "Save one more thing to compare.",
    pick: "Pick two to compare",
    picked: "1 of 2 picked",
    compare: "Compare",
  },
};
