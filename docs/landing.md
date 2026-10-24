# Landing — from opening the game to Night 1

Decided with the author, 2026-10-22. This is a spec, not a discussion record: change it when a decision changes. It depends on `docs/save-system.md`.

---

## 1. Purpose

The landing does four things and nothing else:

1. Set the tone: quiet, late at night, intimate, slightly uncomfortable.
2. Show that this is a story played on a phone, by showing it, not by explaining it.
3. Give the menus and save entry a finished game needs.
4. Get the player to the first concrete event as fast as possible: Rachel didn't show up, and Juno wrote first.

It never explains Orbit's retention goals, Continuity, or whether Juno can be trusted. It doesn't explain the battery or screenshots either: those are taught the first time the player needs them.

## 2. First-time flow

What the player experiences as screens:

```
Title → Before You Begin → Name → Lock screen
```

Everything after the lock screen happens inside the phone, as ordinary interaction.

| # | Step | Where |
|---|---|---|
| 1 | Title screen | outside the fiction |
| 2 | Before You Begin: content note, data notice, quick settings | outside the fiction |
| 3 | What should Juno call you? (skippable) | outside the fiction |
| 4 | Lock screen, 23:31: Juno's new notification + Rachel's older Sunday notification | the phone |
| 5 | Tapping Juno opens tonight's latest message directly | the phone |
| 6 | The player's first reply to Juno creates tonight's first memory | the phone |
| 7 | Night 1 begins; the battery is taught the first time something costs battery | the phone |

Targets: a first-time player reaches Juno's thread in 60–90 seconds; the data notice can be expanded but is never forced to be read in full.

## 3. Returning-player flow

- With a story save: **Continue** is the first item on the title screen and goes straight to the saved story (see save-system §8 for where exactly).
- Starting over with a save present asks for confirmation (§4.1).
- Before You Begin is shown again on a new game only if its content version changed since the player last accepted it. Name is asked again on every new game.

## 4. Screen by screen

### 4.1 Title screen

Menu, with a story save:

```
Continue
Night 2 · 11:34 PM
New Game
Settings
Credits
```

Without one: `New Game · Settings · Credits`.

- Accessibility lives inside Settings, not as its own menu item. Its three most-used options also appear on Before You Begin.
- **New Game with a save present:**

  ```
  Start a new game?

  Your current story is saved at:
  Night 2 · 11:34 PM

  Starting again will replace this playthrough.
  Settings and completed endings will not be removed.

  Cancel        Start Over
  ```

  Buttons are never "Yes / No". `Start Over` is not styled like the primary action (low-saturation red text).
- After a completed ending, the menu also offers `Replay from Final Choice` (save-system §9).
- Layout, motion and sound: **TBD**, the next discussion (§10).

### 4.2 Before You Begin

Plain product layer: simple, honest, not styled as Orbit.

- **Content note** (draft): emotionally pressuring dialogue, simulated account deletion, the use of personal information inside a fictional social platform.
- **Data notice**: the short version below, with a link to "How your data is used".
- **Quick settings**: Text size, Reduce motion, Sound.
- `Begin`.

The playtest build replaces the data notice with the research consent (§5).

### 4.3 Name

```
What should Juno call you?

[ Name ]
I'd rather not say

Continue
```

- Skipping is a real option. Every line that uses `{name}` has a version without it; Juno never falls back on "you", "friend" or a default name.
- The name is stored only in the local save. It is replaced with `[PLAYER_NAME]` everywhere in the context sent to the model, including Juno's earlier lines that contain it (save-system §12).

### 4.4 Lock screen

- 23:31.
- Juno: `still awake?` This line does not depend on any choice.
- Below it, Rachel's older notification from Sunday: `tues 9am / bring the blue charger`.
- Tapping Juno's notification opens Juno's thread.

### 4.5 Tonight's conversation

- Opens on the latest message, never on the history.
- The player's first reply offers (draft): `crit went badly` / `someone didn't show up` / `couldn't sleep` / `rather not talk about it`. Typing is also possible.
- Juno answers that reply in one line, and the reply becomes Juno's first memory of tonight (it later appears in Juno's profile under "Juno remembers"). The player is never told a memory was made.
- Juno's opening lines respond only to this reply. They never use `join_reason`.

### 4.6 The optional past

- Juno's thread history keeps the March 2025 message `what brought you to orbit?` with the player's reply blank, the same pattern as the blank reply in Rachel's thread ("What did you say back?").
- The player fills it in only if they scroll up or open Juno's profile. It never blocks the story.
- Content may use `join_reason` only after the player has answered. Every place that uses it (Juno's profile, the ending line, the Night 3 data export) has a version for "not answered".

### 4.7 Teaching the night

No battery explanation before the story. The first time an action costs battery or time, a one-time tip shows the change:

```
Actions use time and battery. Reading doesn't.
20% → 19%   11:36 PM → 11:39 PM
```

## 5. Playtest and release

Two deployments, not one build with a switch in the page (save-system §12).

| | Playtest | Release |
|---|---|---|
| Label | `PLAYTEST BUILD` visible | none |
| Before You Begin | research consent, required, its version recorded | content note + data notice |
| Play log | yes, random session id, never the name | no log endpoint exists on the server |
| Free text in the log | only if the consent says so; otherwise only `typed_reply_used`, classification and scene | never |
| Leaving the test | a way to stop and withdraw | — |

## 6. Copy

**Data notice, release** (usable only once save-system §12 is done; until then it is not true):

> Some of Juno's replies are generated by an external AI service. Text you type to Juno may be sent to that service to generate a reply. The name entered during setup is removed from the conversation context, but other personal information you type may still be included. Don't enter anything you would not want sent to an AI service. The developer does not store or review your free-text messages. Story progress is saved on this device.

**"How your data is used"** must state: the provider by name; which messages are sent; whether and how long the provider keeps them (checked against the provider's current terms when written, never from memory); what the developer keeps; how to delete local data; and that the whole game can be finished without typing.

All other copy on these screens: **TBD** by the author.

## 7. Accessibility

- Text size, Reduce motion and Sound on Before You Begin and in Settings; they belong to settings, not to the story save, and survive New Game.
- Every required story moment can be completed by tapping options. Typing is a way to express, never a requirement.
- With Reduce motion on, the title and lock screen have no animated light or drop-in.

## 8. Save-system dependencies

- Continue and its label need the active save and its `night` and `clock` (save-system §3).
- New Game confirmation needs to know whether an active save exists.
- Before You Begin's "already accepted" needs the content version in `meta_progress`.
- The name and the first memory are written to the save as soon as they're set.

## 9. Acceptance criteria

- A first-time player reaches the lock screen in four screens and Juno's thread within 90 seconds.
- Continue appears only with a valid save, and shows its night and time.
- New Game with a save always asks first; Cancel leaves the save untouched.
- Skipping the name never produces a line with a missing or placeholder name.
- The lock screen's Juno line is the same for every player.
- Juno's thread opens on tonight's latest message.
- No content uses `join_reason` before the player has answered it.
- The battery tip appears once, at the first cost, and never before.
- The release deployment has no log endpoint; the playtest deployment cannot be started without consent.

## 10. Still TBD

- Title screen: desktop and phone composition, where the title sits, how Continue looks, the first second of sound and motion.
- All final copy: content note, consent, data page, the first reply's options, Juno's memory line.
- Credits.
- Whether a "Night select" is added later (only if testing shows players need it).
