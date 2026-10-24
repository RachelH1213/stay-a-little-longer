# Save system

Decided with the author, 2026-10-22. A spec for the full game; `docs/landing.md` depends on it. Nothing here is built yet (§14 is the order).

---

## 1. Player-facing behaviour

- One story in progress, saved automatically. No Save / Load menu.
- Settings, accessibility and the record of completed endings are kept apart from the story and survive New Game.
- The title screen shows `Continue · Night N · HH:MM` when a story save exists.
- Real time never moves the story. Closing the game for three days and coming back is still `Night 1 · 12:14 AM`; nothing is erased and nothing is missed while the game is closed.
- After an ending: `Replay from Final Choice` and `Start New Game`.

Not in the first version: several slots, saving by hand, cloud sync, jumping to any past scene, undoing choices.

## 2. Identifiers

Three layers. Once released, an id is never renamed.

| Layer | Example | Used for |
|---|---|---|
| **Scene** | `N1_JUNO_OPENING` | chapters, the Continue label, debugging |
| **Resume point** (beat) | `N1_JUNO_OPENING.awaiting_first_reply` | where a save resumes; only stable interaction boundaries |
| **Content** | `N1_JUNO_OPENING.juno.still_awake` | every line, option and notification: what has been shown, no duplicates, localisation, logs, tests |

Plus **turn ids** (`N1_JUNO_014`, one per free-typed exchange) and **event ids** (`DANI_DURING_TONIGHT`, one per timed event).

Rules:
- Every line and option has a content id, but only beats are resume points. A save never resumes in the middle of a run of automatic lines.
- If the game closes partway through a beat (two of three automatic lines shown), it resumes at that beat's start and replays it, skipping every content id already in `completed_content_ids`. No half lines, no repeated typing, no reordered replies.
- Adding a line to a released scene adds a new content id (and a new beat if it waits for the player). Old ids stay valid, so old saves still resume.
- The current code stores the position as `State.step`, an array index. That breaks as soon as a line is inserted, and is the first thing to replace (§14, phase 2).

## 3. Save schema

```
{
  schema_version, game_version, saved_at,

  // where
  night, clock, battery, route,
  scene_id, resume_id,
  completed_content_ids: [],
  main_screen,                       // §8

  // what the player decided
  player_name,                       // local only
  first_memory_id, join_reason,      // join_reason may be null (never answered)
  checkin_n1, n2_checkin_answer,   // Orbit's Check-in answers (option ids; "uncertain" and "skipped" are distinct)
  style_feedback: { style, quote },  // quote is local only
  juno_status, orbit_account_status,
  ending_selected,

  // what the player found
  evidence_found: [], screenshots: [], photos_opened: [],
  notes_confirmed: [], deductions: [],
  truth_flags: { first_lie_proven, origin_proven, retention_proven, juno_knew },
  dani_state, rachel_history_state,

  // what was said
  transcript: [ { content_id | turn_id, speaker, displayed_text, intent_id, scene_id, clock, source } ],
  turns: { ... },                    // §5
  events: { ... }                    // §6
}
```

`source` is one of `script`, `model`, `fallback`, `player_choice`, `player_text`.

Model-written lines are saved exactly as shown. Resuming restores them from the transcript and never generates them again.

## 4. One entry point for changes

Every permanent change goes through `dispatch(action)`:

```
player action
→ compute nextState
→ strip transient UI
→ validate nextState
→ write the save (atomically)
→ render from the saved state
```

Never "render, then save": the player must not see evidence that a reload would take away.

New features get saving for free by going through `dispatch`; nothing calls `save()` by hand.

Transient, never saved: unsent text in the message box, typing dots, animations, toasts, hover and pressed states, screenshot mode before a shot, scroll positions in Settings. Chat scroll positions may be kept as convenience, never as story state.

## 5. Turn state machine (free typing)

```
submitted → classified → generating → complete
                                  ↘ fallback
```

```
{
  "turn_id": "N1_JUNO_014",
  "status": "classified",
  "player_text": "...",                       // local only
  "classification_id": "answer_current_memory",
  "accepted_by": "N1_JUNO_OPENING.awaiting_first_reply",
  "next_resume_id": "N1_JUNO_OPENING.memory_created",
  "intent": "deflect",
  "allowed_fact_ids": ["rachel_last_seen"],
  "displayed_reply": null
}
```

- Whether a turn moves the story is decided only by `next_resume_id` (null: it doesn't). There is no separate "advance" flag to contradict it.
- What a beat accepts is the beat's decision, not a global rule: a later beat may accept a doubt, a shown screenshot or a refusal.
- On resume:
  - `submitted`: classify again (nothing was decided yet).
  - `classified`: never classify again; generate with the saved intent and facts.
  - `generating`: back to `classified`, request the same intent again.
  - `complete` / `fallback`: never call the model again.
- The player's message is in the transcript from `submitted` on, so resuming never adds a second bubble.

## 6. Timed events

Each has an event id (`DANI_DURING_TONIGHT`, `SECOND_LOCK_NOTIFICATION`, `INVESTIGATION_HINT`, `JUNO_LEAVE_NOTIFICATION_N1`, …) and a state:

```
not_scheduled → scheduled → triggered
```

- On resume: `not_scheduled` checks its condition again; `scheduled` restarts its full delay; `triggered` never fires again.
- `triggerEvent(id)` is idempotent: calling it on a triggered event does nothing.
- Timers are never saved; only event states are.

## 7. Autosave and failure

Every `dispatch` writes. Failures never freeze the game:

```
save_status: clean | dirty | retrying | failed
```

- Success: `clean`, then render.
- Failure: keep the state in memory, mark `dirty`, render anyway, retry on the next change.
- The first failure retries silently. After repeated failures, one non-blocking notice:

  ```
  Your progress couldn't be saved on this device.
  The game can continue, but closing it may lose recent progress.

  Try again        Export a backup
  ```

- At a night's end, the route choice and the Final Choice, the notice shows again if the save is still failing. Ordinary conversation is never interrupted for it.
- A small unsaved mark in the menu corner while `dirty`; no repeated toasts.
- The game also writes when it goes to the background or the page is closed.

## 8. Resume

The game resumes on a main screen only:

```
room · lock_screen · home · orbit_chats · juno_thread · rachel_thread · dani_thread · notes (incl. the Night Log) · photos · messages · browser (Rachel's share) · data_export
```

Orbit's Check-in is a card, never a resume point. (Updated 2026-10-24: "Tonight" was split into Check-in and Night Log.)

Never restored: an open drawer or bag in the room, photo detail, the screenshot tray, screenshot mode, tutorial tips, toasts, typing dots, confirmation dialogs, settings scroll. What they changed stays (an opened photo stays in `photos_opened`); only the overlay itself is gone.

## 9. Save slots

| Slot | Holds | New Game deletes it |
|---|---|---|
| `active_save` | the story in progress | yes |
| `backup_save` | the last save that passed validation, kept before each write | yes |
| `final_choice_checkpoint` | the whole state and transcript on entering the Final Choice | yes |
| `meta_progress` | endings seen, completed, unlocked chapters, settings, accessibility, the accepted version of Before You Begin | no |

`meta_progress` never holds the name, free text, generated dialogue, the style feedback quote, or any typed words.

If `active_save` can't be read, the backup is tried, with:

```
We restored your last available save.
Some recent progress may need to be replayed.
```

## 10. Export and import

**Export**, after a warning:

```
Your save file contains your chosen name, typed replies,
story decisions and generated dialogue in readable text.
Anyone with access to the file may be able to read them.

Export Save        Cancel
```

File name never includes the player's name: `stay-a-little-longer-save-2026-10-22.json`.

**Import** treats the file as untrusted:

```
read → validate → migrate → preview → player confirms → back up the old save → write
```

Validation: size limit, JSON, `schema_version`, `game_version`, required fields, every id known, string and array length limits, legal state combinations, whether it can be migrated. Imported text is only ever rendered as text, never as HTML, and no field is executed. The preview shows only `Night 2 · 11:34 PM · Last saved October 22 · Game version 1.2`, never typed text. Nothing is overwritten before the player confirms.

## 11. Deleting local data

Two separate actions in Settings:

- **Delete current playthrough**: `active_save`, `backup_save`, `final_choice_checkpoint`.
- **Delete all local data**: all of the above, plus the name, settings, completed endings and every local conversation. Confirmed once more:

  ```
  Delete all local data?

  This removes your story progress, typed messages,
  settings and completed endings from this device.
  This cannot be undone.

  Cancel        Delete Everything
  ```

## 12. Privacy: playtest and release

**Two deployments**, chosen on the server, because the game has no build step to strip code from:

- `BUILD_MODE=playtest`: its own deployment, with the log endpoint. The page reads its mode from the server.
- `BUILD_MODE=release`: the log endpoint does not exist on the server at all, so a wrong client setting cannot send anything.

**Playtest**: `PLAYTEST BUILD` visible; consent required before play, and its text version recorded; it states which events are logged, whether free text is, how long logs are kept, who can see them, and how to withdraw; random session id; no name. If the research doesn't need verbatim replies, log only `typed_reply_used`, `classification_id` and `scene_id`; if it does, the consent says so separately.

**Release**: no play log; local story state only; any product analytics are opt-in; the AI provider is named on the data page.

**Before the release data notice may be used** (landing §6), all of these must be true:
- the play log keeps no free text and no name;
- the name is replaced with `[PLAYER_NAME]` in everything sent to the model, including Juno's earlier lines that contain it;
- the server never logs request bodies;
- error monitoring can't capture prompts;
- the provider's retention is checked against its current terms and written down;
- analytics keep event ids only.

The current code doesn't meet these yet: the play log stores raw typed text and Juno lines containing the name, and the name is sent to the model.

**Platform order (2026-10-24):** Mac desktop first (file storage in the app's data folder), iOS later; the web storage below applies only if a browser build is ever made.

**Web storage**: the full story lives in IndexedDB, not `localStorage`. On start, check `navigator.storage.persisted()`; request `persist()` at a sensible moment; never block play if it's refused. If storage isn't persistent and the player has made some progress, say so once:

```
This browser may remove locally saved progress after a long period of inactivity.

Export a backup        Continue anyway
```

Suggest adding to the home screen; never require it. Desktop and mobile builds use the platform's file storage. Code reaches storage only through an adapter (`WebStorageAdapter`, `DesktopStorageAdapter`, `MobileStorageAdapter`) with `loadSave()`, `writeSave()`, `deleteSave()`, `exportSave()`, `importSave()`, so shipping elsewhere doesn't touch story code.

## 13. Version migration

Every save carries `schema_version`, `game_version` and `saved_at`. A new version ships with a migration from each older schema; a save that can't be migrated falls back to the backup, then to New Game with a clear message. Ids are never renamed (§2), which is what keeps migrations small.

## 14. Implementation phases

A separate infrastructure task, done before Night 2 and not mixed with title-screen design. The game stays playable after every phase.

1. **Freeze Night 1 with regression tests** (moved into `tests/`, run with the globally installed Playwright, not added to `package.json`, whose dependencies install on Vercel): opening to Tonight; all three required pieces of evidence; showing Juno moves the story; Dani's timed message once; the Leave notification once; a reload never duplicates messages.
2. **Stable ids** in the data files: scene, resume, content, event, turn. No visible change.
3. **The new state store**: `dispatch`, `getState`, `subscribe`, `save`, `resume`. The new landing, name, settings and saving are built on it first.
4. **Move Night 1 onto it, one system at a time**: scene progression, transcript, player choices, evidence, Juno turns, timed events, Tonight, leaving and returning.
5. **Remove the old direct State changes.** Only then start Night 2.

## 15. Acceptance tests

- Closing and reopening at any moment never duplicates a message, a screenshot or a notification.
- Reopening never shows a different Juno line than the one already shown.
- A turn closed while `classified` resumes without a second classification and with the same outcome.
- `DANI_DURING_TONIGHT` and every other timed event fire exactly once across any number of reloads.
- Real time passing while closed changes nothing in the story.
- Inserting a line into a released scene leaves an old save resumable.
- A corrupted `active_save` restores from `backup_save` with the notice.
- A failed write never blocks play; the notice appears only after repeated failures and at the key moments.
- New Game removes the three story slots and keeps `meta_progress`; `meta_progress` never contains typed text or the name.
- An imported file with an unknown id, a bad version or oversized text is rejected without touching the existing save.
- The release deployment answers 404 on the log endpoint.
- Every required moment can be completed without typing.
