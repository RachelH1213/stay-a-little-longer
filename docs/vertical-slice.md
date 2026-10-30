# Vertical slice: Night 1, the first 10–15 minutes

The first part of the full game built to final quality in Unity. It answers two questions: does the game feel the way it should, and can it be made to that standard? Everything after it is built to the standard it sets.

Decided 2026-10-30. Sources: `docs/landing.md`, `docs/night1-scenes.md`, `docs/story-bible.md` §4 and §6, `docs/save-system.md`. Where this file and those disagree, those win; this file only chooses what is in the slice and what "final" means.

**Deadline:** TBD (the author's; tie it to a thesis review).

---

## 1. What the player plays

From the title screen to the end of the held-back line, about 10–15 minutes:

1. Title → Before You Begin → Name.
2. Lock screen, Tuesday 20 October, 11:31 PM: Juno's notification above Rachel's Sunday messages.
3. Juno's opening: `still awake?`, the first reply, Juno's answer.
4. Rachel's thread: her Sunday messages, a year of history, a message to her that shows `Delivered`.
5. Her profile: the cached version, the refresh that replaces it with `Unavailable`, `Account scheduled for removal` and the countdown, then Profile Details.
6. The first fake arrives (any of its three triggers).
7. Evidence: a screenshot, shown to Juno. Juno answers from the player's facts and its stance; the one active lie is told or skipped as the scene table says.
8. The held-back line: Juno asks what the player was going to say to Rachel; the player picks, types, declines, sends the simpler one, or sends the original.
9. The slice ends: one screen outside the fiction ("End of the slice"), then the title.

The order between 4, 5 and 6 is free, as in the full game. A player who never talks to Juno about the fake still reaches the end (see §5).

## 2. Beats and systems in the slice

| In | Out (later) |
|---|---|
| `N1_LANDING.lock`, `N1_JUNO_OPENING.*`, `N1_RACHEL.thread_open`, `N1_RACHEL.contact`, `N1_VERIFY.number`, `N1_VERIFY.profile_cache`, `N1_VERIFY.refresh`, `N1_VERIFY.details`, `N1_FIRST_FAKE`, `N1_JUNO.bring_fake`, `N1_JUNO.held_back`, `N1_EVIDENCE.style`, `N1_EVIDENCE.removal`, `N1_EVIDENCE.access` | `N1_VERIFY.dani`, the room and the power bank, Battery Saver, the erase warning and the erase, Check-in, End Session, shutdown, `N1_END.sleep`, Settings beyond the quick settings |

Systems the slice needs: the phone shell (status bar, home screen, Orbit Chats, home bar); Rachel's thread and profile; screenshots and the tray in Juno's thread (Photos only as far as the tray needs it); facts, Juno's stances and the one lie; time and battery costs; Suggested replies with the Orbit ring (`◌ Suggested replies`) and the first-time line; typing with the classifier; the model through the new intents; autosave and resume at every beat; the quick settings (text size, Reduce Motion, sound).

The 00:40 erase is outside the slice, so the countdown on her profile runs but the slice ends long before it.

## 3. What "final quality" means here

The slice is done when every item below is true. Nothing outside this list needs polishing.

**Look**
- The visual direction is decided (landing §10): the three layers (phone, humans, Orbit), colours, type, icons, the lock-screen wallpaper.
- Every screen in the slice is final, at 1080p and at the smallest Mac window the game allows.
- On the desktop, the phone sits in its dark room (lamp, screen glow), not on a flat background.

**Motion and sound**
- Juno's typing, the notification arrival, the profile being replaced block by block, the screenshot flash, the Orbit ring.
- Juno's own sound, the notification sound, the shutter. Reduce Motion replaces every animation with a fade or nothing.

**Writing**
- Every line in the slice is the author's final line: no `[TBD]`, no draft marked as a draft. The list is §4.
- Rachel's style rule holds in every message she writes; the fake breaks it the way the story bible says.

**Juno and the model**
- Model-written lines go through the new intents (`api/reply.js` takes them, old names kept as aliases).
- Every model line has a written fallback; a failed or slow call (8 s) shows it, and the player can't tell from the timing alone.
- Guards hold: nothing invented about Rachel, the word limit, no line that says what the player is meant to find.
- A cap on model calls per night.

**Systems**
- Saving and resuming land on the same beat from every point in the slice; nothing repeats, nothing is lost.
- Costs follow the table in `night1-scenes.md`; the first cost is taught once (landing §4.7).
- Nothing tappable fails silently; nothing on screen is a developer note (the debug panel only in development builds).

**Players**
- A playtest deployment with rate limiting or authentication before anyone outside the author plays it (save-system §12), and a consent text for playtesters in Before You Begin.

## 4. Lines the author writes

| Where | What |
|---|---|
| Before You Begin | the playtest consent and data notice |
| Lock screen | Juno's notification; Rachel's Sunday messages (the drafts in the story bible) |
| Juno's opening | the 4 Suggested replies; a fallback for Juno's answer to each |
| Rachel's thread | the year of history (from the prototype, moved to the final timeline: Tuesday 9 PM, the blue power bank); the Suggested replies for messaging her |
| Her profile | cached blocks, `Unavailable`, removal, Profile Details |
| The old number | the call record |
| The first fake | the final wording |
| Juno on the fake | the answer at each stance; the one lie; the withdrawal |
| Evidence | "what's different?" and its Suggested replies; Juno's answer to each stance |
| The held-back line | Juno's question; the options; Juno's advice; the simpler Suggested replies |
| Facts for the model | one sentence per fact the model may receive |
| End of the slice | the closing screen |

## 5. When the slice is done

- A first-time player reaches the end of the held-back line in 10–15 minutes without help.
- In playtests, most players notice the fake doesn't sound like Rachel without being told.
- A player who skips Juno entirely still reaches the end screen (the fake arrives by 23:45; the slice ends a few minutes after it, when the player leaves Rachel's thread or the clock reaches 23:55).
- The §3 list is all true.

## 6. Order of work (Unity)

1. Visual direction decided (the author) and applied to the existing screens.
2. Home screen, Orbit Chats, Rachel's thread.
3. Her profile, the refresh, Profile Details, the old number.
4. The first fake and its triggers.
5. Screenshots, the tray, showing Juno; facts and stances; the one lie.
6. `api/reply.js` with the new intents (this repository); the model client with fallbacks and the cap.
7. Typing and the classifier.
8. The held-back line.
9. Sound and motion.
10. The playtest deployment, then playtests.

Each step ends playable, and the author's lines can arrive in any order: until a line is written, the slice shows `[TBD]` in development builds only.
