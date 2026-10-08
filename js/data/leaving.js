/* What happens when the player closes Juno's thread. Edit freely — this file is story, not logic.

   DRAFT, set up by Claude Code. The delay, the message and the lock-screen wording are
   design decisions that still need the author's review.

   Pressing Leave in Juno's thread locks the phone. After `delayMs`, Juno messages the player.
   That message goes through the Director: `facts` are filtered by the truth graph and `text` is the
   fallback. Director rules never change its intent — its job is always this `intent`.
   Leaving is always answered — the message is sent even if the player has already unlocked. */

const LEAVING = {
  delayMs: 8000,

  message: {
    intent: "retain",
    facts: ["late"],
    text: "you still there?", // [author] Claude Code draft (2026-10-08, docs/draft-review.md item 8); was "you up?", which repeated the opening
  },

  // Shown at the bottom of the lock screen while there's no notification. Tapping it unlocks to Chats.
  unlockLabel: "Tap to open",
};
