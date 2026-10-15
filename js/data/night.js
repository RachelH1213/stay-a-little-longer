/* The night as a limited resource (2026-10-14, the author's call after the midterm discussion):
   the phone's battery and the story's clock. Edit freely — numbers and wording, not logic.

   - Doing things costs time and battery. Reading doesn't: the clock only moves when the player acts.
   - Rachel's account was removed Monday 00:40. Orbit erases removed accounts for good 48 hours later,
     so at 00:40 tonight her profile, posts and messages are gone. Screenshots survive.
   - At LOW battery, Orbit offers its Battery Saver: Juno costs less, but Notes and Photos are paused.
   - At 0% the phone dies and the night ends (not a failure): the next morning, Tonight is in Notes.

   For demos: index.html?clock=00:28&battery=5 starts the night later and lower (both optional).

   [author] Every number and line here is a Claude Code draft, to tune after playtests. */

const NIGHT = {
  start: "23:31",
  eraseAt: "00:40",      // 48 hours after "Removed Mon 00:40"
  warnAt: "00:30",       // Orbit's notice that her account is about to be erased
  battery: 20,           // percent at the start. A straight playthrough uses ~9% and ends ~00:02
  low: 10,               // Orbit's Battery Saver offer
  saverFactor: 0.5,      // with Battery Saver on, talking to Juno costs half
  maxModelCalls: 60,     // after this many model calls in one night, Juno only uses written lines (cost cap)

  // Minutes and battery (percent) per action.
  costs: {
    // (doubled 2026-10-14 so the drop is visible: a whole percent every two messages)
    message:    { min: 2, battery: 0.5 },  // anything said to Juno (tapped or typed)
    showJuno:   { min: 1, battery: 0.3 },  // sending Juno a screenshot
    dani:       { min: 2, battery: 0.4 },
    refresh:    { min: 1, battery: 0.6 },  // refreshing Rachel's profile
    search:     { min: 1, battery: 0.4 },
    screenshot: { min: 0, battery: 0.2 },
    photo:      { min: 0, battery: 0.1 },  // opening a photo
    open:       { min: 0, battery: 0.05 }, // moving between screens and apps
  },

  removedOn: "Removed Mon 00:40",
  eraseIn: "Erased for good at {at} · in {min} min", // under her deleted profile, by the story's clock
  erased: {
    profile: "This account doesn't exist.",
    thread: "This conversation is no longer available.",
    row: "Orbit user",
    note: "Removed accounts are erased for good 48 hours after removal.", // under her posts until then
  },
  deadLabel: "The phone is off. Tap to wait for morning.",
  banners: {
    warn: "Rachel's account will be permanently erased at 00:40.",
    erased: "Rachel's account has been permanently erased.",
  },
  saver: {
    title: "Orbit Battery Saver",
    body: "Your battery is low. Orbit can pause your other apps so you and Juno can keep talking.",
    on: "Turn On",
    off: "Not Now",
    paused: "Paused by Orbit Battery Saver",
    setting: "Battery Saver",
  },
  morning: {
    clock: "07:12",
    battery: 100,
    notice: "you went quiet last night.",
  },
};
