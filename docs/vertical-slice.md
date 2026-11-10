# Vertical slice: Night 1, the first 10–15 minutes

The first part of the full game built to final quality in Unity. It answers two questions: does the game feel the way it should, and can it be made to that standard? Everything after it is built to the standard it sets.

The biggest risk it has to settle is the presentation: the game is seen in first person from the desk in the player's room at night, with the phone as an object in that room (story-bible §6, "How the game looks"). The phone's screens alone are not the game.

Revised 2026-10-30: the room and the first-person view moved into the slice and to the front of the work.

Revised 2026-11-10 to the rebuilt Night 1 (the changed plan, forwarding, MSG_1048 A/B, Dani's email). Decided 2026-10-30. Sources: `docs/night1-routes.md`, `docs/landing.md`, `docs/night1-scenes.md`, `docs/story-bible.md` §4 and §6, `docs/save-system.md`. Where this file and those disagree, those win; this file only chooses what is in the slice and what "final" means.

**Deadline:** TBD (the author's; tie it to a thesis review).

---

## 1. What the player plays

From the title screen to the end of the held-back line, about 10–15 minutes:

1. Title → Before You Begin → Name.
2. The room, at the desk, 11:31 PM. The phone on the desk lights up with Juno's notification (`still awake?`), nothing else. The player picks it up (lock screen, Tuesday 20 October).
3. Juno's opening: the first reply, Juno's answer.
4. Rachel's thread: the player's own 9 PM messages (`Delivered`), her Sunday messages, a year of history; a new message to her shows `Delivered`.
5. The plan: the `shared a plan` line in her thread, the Plans tab, or her chat info → Saturday, Change History, the hidden email, `Handled by Conversation Assist` → Settings (Auto-Coordinate). Found alone or with Juno's help.
6. Her profile: the cached version, the refresh that replaces it with `Unavailable`, `Leaving Orbit · Account closes Wed 12:40 AM` and the countdown, `Last active · 5:12 PM`.
7. Dani: she hasn't heard from Rachel; she emails her tonight.
8. The first fake arrives (the one eligibility rule), version A or B by what the player wrote in Rachel's thread.
9. Evidence: the player forwards the fake to Juno (or says yes when Juno asks to look), or to Dani. Juno answers only what the player raises; the one fixed misleading line only if asked who sent it.
10. The held-back line: Juno asks what the player was going to say to Rachel; the player picks, types, declines, sends the simpler one, or sends the original.
11. The slice ends: one screen outside the fiction ("End of the slice"), then the title.

The order between 4 and 10 is free, as in the full game; `docs/night1-routes.md` is the test list. At any point the player can put the phone down, look around the room and pick it up again; if the fake arrives while the phone is down, it lights up on the desk. A player who never talks to Juno about the fake still reaches the end (see §5).

## 2. Beats and systems in the slice

| In | Out (later) |
|---|---|
| `N1_ROOM.put_down` (put down, look around, pick up), `N1_LANDING.lock`, `N1_JUNO_OPENING.*`, `N1_RACHEL.thread_open`, `N1_RACHEL.contact`, `N1_PLANS.history`, `N1_JUNO.reschedule`, `N1_JUNO.read_status`, `N1_JUNO.dani`, `N1_DANI.ask`, `N1_DANI.email`, `N1_VERIFY.profile_cache`, `N1_VERIFY.refresh`, `N1_FIRST_FAKE` (A/B), `N1_RACHEL.reply_after_fake`, `N1_JUNO.bring_fake`, `N1_JUNO.held_back`, `N1_EVIDENCE.style`, `N1_EVIDENCE.last_active`, Auto-Coordinate in Settings | `N1_ROOM.card`, the power bank and Waiting, Battery Saver, the erase warning and the erase, Check-in, End Session, shutdown, `N1_END.sleep`, Settings beyond the quick settings and Auto-Coordinate |

Systems the slice needs: the room (one view at the desk, a few things to look at, the lamp and the screen as light sources, the phone as an object that lights up and buzzes); picking up and putting down; the phone shell (status bar, home screen, Orbit Chats, home bar); Rachel's thread, the plan and its history, her profile, Dani's thread; Forward (long-press) and Juno's look-at-it consent; screenshots to Photos (they keep how a screen looked; they never give Juno a message's source); facts, Juno's knowledge records and the one fixed line; the MSG_1048 A/B rule; time and battery costs; Suggested replies with the Orbit ring (`◌ Suggested replies`) and the first-time line; typing with the classifier; the model through the new intents; autosave and resume at every beat; the quick settings (text size, Reduce Motion, sound).

The 00:40 erase is outside the slice, so the countdown on her profile runs but the slice ends long before it.

## 3. What "final quality" means here

The slice is done when every item below is true. Nothing outside this list needs polishing.

**Look**
- The room is final: the desk, the lamp, the window, the objects, at night; lit by the lamp and the phone's screen.
- The view is first person from the chair: holding the phone, putting it down, picking it up, all final in camera, timing and feel.
- The phone is a real object in the room; its screen shows the game's UI, with the glow and reflection a screen has at night.
- The visual direction is decided (`docs/art-direction.md`, on trial since 2026-11-09): the three layers (phone, humans, Orbit), colours, type, icons, the lock-screen wallpaper, all made to work on the phone in the room.
- Every screen in the slice is final, at 1080p and at the smallest Mac window the game allows; the text on the phone is readable when it is held.

**Motion and sound**
- The room at night: its sound, the lamp, the phone buzzing on the desk.
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
| Lock screen | Juno's notification |
| Juno's opening | the 4 Suggested replies; a fallback for Juno's answer to each |
| Rachel's thread | the year of history (from the prototype, moved to the final timeline: Tuesday 9 PM, February, Sunday); the Suggested replies for messaging her |
| The plan | the card, Change History, Rachel's note |
| Juno on the plan | the explanation, the email, read status, suggesting Dani |
| Dani | her Night 1 conversation and both emails |
| Her profile | cached blocks, `Unavailable`, removal, Last active |
| The first fake | the final wording of versions A and B |
| Juno on the fake | its answer to each thing the player can raise; the consent question; the one fixed line |
| Evidence | the Suggested replies for each version; vague doubt, a specific style feature, content |
| The held-back line | Juno's question; the options; Juno's advice; the simpler Suggested replies |
| Facts for the model | one sentence per fact the model may receive |
| End of the slice | the closing screen |

## 5. When the slice is done

- A first-time player reaches the end of the held-back line in 10–15 minutes without help.
- In playtests, most players notice something wrong with the fake without being told (the date in A, the unanswered question in B, the style, February).
- Every route and cross test in `docs/night1-routes.md` reaches the end, and every key line can be traced to what its speaker had been given.
- A player who skips Juno entirely still reaches the end screen (the fake arrives by 23:45; the slice ends a few minutes after it, when the player leaves Rachel's thread or the clock reaches 23:55).
- The §3 list is all true.

## 6. Order of work (Unity)

1. **The presentation prototype** (now the pixel-art test, `docs/art-direction.md` §9): the room at the desk in first person, the phone as an object with the existing screens (lock screen, Juno's thread) on it, picking up and putting down, the lamp and screen light, the phone lighting up on the desk. The author judges the look here before more screens are built.
2. Visual direction decided (the author) and applied to the room and the existing screens.
3. Home screen, Orbit Chats, Rachel's thread; quick settings stored, text size working.
4. The plan and its history, Settings (Auto-Coordinate); her profile and the refresh; Dani's thread.
5. The first fake, its eligibility rule and versions A/B; the end of the slice and its screen.
6. Forward, Juno's consent, screenshots to Photos; facts, knowledge records and the one fixed line.
7. The model client with fallbacks and the cap (`api/reply.js` already takes the new intents).
8. Typing and the classifier (the classification table comes first, in `night1-scenes.md`).
9. The held-back line.
10. Sound and motion; Reduce Motion.
11. The playtest deployment, then playtests.

Each step ends playable, and the author's lines can arrive in any order: until a line is written, the slice shows `[TBD]` in development builds only.
