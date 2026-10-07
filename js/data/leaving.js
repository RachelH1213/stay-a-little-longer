/* What happens when the player closes Juno's thread. Edit freely — this file is story, not logic.

   DRAFT, set up by Claude Code. The delay, the message and the lock-screen wording are
   design decisions that still need the author's review.

   Pressing Leave in Juno's thread locks the phone. After `delayMs`, Juno messages the player.
   That message goes through the Director like any other model-written line: `intent` and `facts`
   are the defaults, a rule may override the intent, and `text` is the fallback.
   Leaving is always answered — the message is sent even if the player has already unlocked. */

const LEAVING = {
  delayMs: 8000,

  message: {
    intent: "retain",
    facts: ["late"],
    text: "you up?", // [author] placeholder: reuses the lock-screen line from the start of the slice
  },

  // Shown at the bottom of the lock screen while there's no notification. Tapping it unlocks to Chats.
  unlockLabel: "Tap to open",
};
