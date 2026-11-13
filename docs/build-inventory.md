# Build inventory — Night 1 (Unity)

A line-by-line inventory of the Unity build as it is, for the author's review. **A report only: nothing in the build was changed to write it.**

- **Build:** repository `StayALittleLonger_Rebuild`, branch `develop` at `e34d76b` (2026-11-12), Unity 6000.3.27f1. The macOS release build in `Builds/Mac/` was made from the same code, except the last commit (`e34d76b`, the text size on Before You Begin and Name).
- **Read from:** the code (`Night1Engine`, `Night1State`, `Night1GreyboxController`, `Night1PhoneFocusView`, `TitleScreenController`, `PlayerSession`, `JunoMissLog`) and the UXML files. Every string below is quoted from them as the player sees it (after any uppercasing the code does).
- **Docs compared:** `docs/night1-scenes.md`, `docs/night1-routes.md`, `docs/landing.md` and `docs/orbit-ia.md` as on branch `claude/quirky-wright-npkzcf` (`b0ca23e`). `orbit-ia.md` exists only there, and that branch's `landing.md` and `night1-scenes.md` hold the 2026-11-12 decisions that `main` (`2783486`) doesn't have yet.
- **Notation:** `→` means "opens" or "goes to". **UNREACHABLE** marks code that exists but that no player action in this build can reach. **⚠ DOES NOTHING** marks something tappable whose tap changes nothing.

---

## 0. The build mode: PoC mode is still on

`PocMode.On = true` (`Assets/_Game/Scripts/PocMode.cs`). Although this is now the final game, the build still runs as the proof of concept:

- Every run of Night 1 is a new night that starts in the room with the phone on the desk. The save file is never read or written, so the title's `CONTINUE` is always disabled.
- Actions cost no battery: it stays at `20%` all night.
- The room shows only the phone, `Wait 5 minutes` and (after MSG_1048) `Go to sleep`. The power bank, the drawer, `Wait until power bank is empty (~10 min)`, the room's own `Go to sleep` and the room clock are hidden.
- The phone's home screen holds only the Orbit app. `PUT DOWN` buttons are removed (the phone is put down with Esc or a swipe).
- `Go to sleep` ends on "End of this part. Thank you for playing." with `Replay`, not on Night 1's ending.

Everything below describes the build with PoC mode on. Section 1.22 lists what PoC mode hides.

---

## 1. Screens and sheets, in the order a player meets them

### Elements shared by every phone screen

- **Status bar:** the story time (`11:31 PM` format) on the left, the battery (`20%`, or `20% +` while charging) on the right.
- **Home bar** (the line at the bottom): a tap → the phone's home screen; on the lock screen it unlocks. ⚠ DOES NOTHING on the home screen itself (it re-opens the screen already shown).
- **Swipe down** (80 units or more) starting on the status bar or the header: puts the phone down.
- **Esc:** puts the phone down while it is held.
- **Back button** (top left of the inner screens). It names the screen it returns to: `‹ CHATS`, `‹ ACTIVITY`, `‹ PLANS`, `‹ PLAN`, `‹ CHANGE HISTORY`, `‹ ME`, `‹ PRIVACY & DATA`. When that screen is a thread or a profile, it is a plain `‹`.
  - It returns to the screen before, and to Chats when there is none.
  - Lock, home and the three tabs start the history over.
- **Tab bar** (Chats, Activity and Me only): `CHATS` · `ACTIVITY` · `ME`. The current tab is a plate. Above each label is an empty slot for an icon. Tapping the current tab re-opens it; nothing changes.

### 1.1 Title screen

**Reached:** launching the game; `BACK` on Before You Begin; `Back` on Settings; Esc on Before You Begin or Settings.

| Visible | Text |
|---|---|
| Title art (images) | STAY A / LITTLE LONGER, with an underline |
| Buttons | `NEW GAME` · `CONTINUE` · `SETTINGS` · `QUIT` |

| Tappable | Does |
|---|---|
| `NEW GAME` | Clears the name and the skip, then → Before You Begin. |
| `CONTINUE` | Always disabled in this build (PoC mode). Without PoC mode, it would load the saved night. |
| `SETTINGS` | → Settings. |
| `QUIT` | Quits the application (in the editor, stops Play). |

There is no New Game confirmation and no Credits (see §8).

### 1.2 Settings (from the title)

**Reached:** `SETTINGS` on the title.

| Visible text |
|---|
| `SETTINGS` |
| `Text size` · value `Standard` / `Large` / `Extra Large` (slider 0–2) |
| `Reduce Motion` (toggle) |
| `Sound volume` · value `100%` (slider) |
| `Back` |
| `Temporary M02 layout — final settings art direction pending.` ⚠ a developer note, visible to players |

| Tappable | Does |
|---|---|
| Text size slider | Saves the text size (PlayerPrefs). Applies to the title menu, this Settings screen, Before You Begin and Name; not to the room or the phone. |
| Reduce Motion | Saves the setting. The only thing it changes in the build: picking up the phone after waiting shows the new time at once instead of counting up. |
| Sound volume | Saves it and sets the master volume. The build has no sound at all. |
| `Back` / Esc | → Title. |

### 1.3 Before You Begin

**Reached:** `NEW GAME`; `BACK` or Esc on Name.

| Visible text (as shown) |
|---|
| `STAY A LITTLE LONGER` · `01 / ONBOARDING` |
| Title art: BEFORE YOU BEGIN |
| `01` `CONTENT NOTE` |
| `A fictional story involving a missing friend,` / `online relationships, and an AI companion.` / `Some scenes may feel unsettling.` / `You can end a session at any time.` (four lines, broken as shown) |
| `02` `DATA & PRIVACY` |
| `What you type to Juno may be saved on this computer to help improve the game. Nothing is sent online. Your name stays on this computer.` |
| `QUICK SETTINGS` · `TEXT SIZE` · `STANDARD` `LARGE` `EXTRA LARGE` · `REDUCE MOTION` `OFF`/`ON` · `SOUND` (slider) `100%` · `EDIT THESE LATER IN SETTINGS` |
| `BACK` · `STEP 01 / 02` · `CONTINUE` |

| Tappable | Does |
|---|---|
| `STANDARD` / `LARGE` / `EXTRA LARGE` | Sets the text size, the same setting as on Settings, and saves it. At Large and Extra Large this page and Name reflow and scroll. |
| `OFF` / `ON` plate | Toggles Reduce motion; the plate shows the new value. |
| Sound slider | Sets the volume; the percentage follows it. |
| `BACK` / Esc | → Title. |
| `CONTINUE` | → Name. |

### 1.4 Name

**Reached:** `CONTINUE` on Before You Begin.

| Visible text |
|---|
| `STAY A LITTLE LONGER` · `02 / ONBOARDING` |
| Title art: ENTER YOUR NAME |
| `What should Juno call you?` |
| `NAME` |
| Field, placeholder `Type your name` (at most 24 characters) |
| Helper: `This name will be used within the story.`, or `Juno won't use a name.` after skipping |
| Status: `Enter a name to continue.`, or `Ready to continue.` with a name or a skip |
| `I'd rather not say` (Silkscreen, so drawn in capitals) |
| `BACK` · `STEP 02 / 02` · `CONTINUE` |

| Tappable | Does |
|---|---|
| Field | Typing undoes a skip. Return = `CONTINUE`. |
| `I'd rather not say` | Clears the field, selects the button, changes the helper line and makes Continue active. |
| `BACK` / Esc | → Before You Begin. |
| `CONTINUE` | **With a name:** keeps it in memory (`PlayerSession.Name`, never saved or logged) → the room (a new night). **With the skip:** records the skip → the room. **With neither:** Continue looks disabled but can be pressed; the field and the status line turn red (Invalid). |

**No line in the game uses the name.**

### 1.5 The room (Night1Greybox)

**Reached:** `CONTINUE` on Name; `Replay` on the end screen (§1.20); putting the phone down.

| Visible | Text |
|---|---|
| Background picture | Night1Room_FirstPerson.png |
| The phone on the desk | A glowing button with no label (PoC). |
| Wait button | `Wait 5 minutes`, with the cost under it: `11:31 PM → 11:36 PM` (now → after waiting). |
| After MSG_1048 | `Go to sleep` |
| While the phone is held, until it is first put down | `Esc · Put down` |

| Tappable | Does |
|---|---|
| The phone | Picks it up → the lock screen (every pick-up goes to the lock screen). |
| `Wait 5 minutes` | +5 story minutes; can trigger MSG_1048, the erase warning and the erase (§6). |
| `Go to sleep` | → End of this part (§1.20). Shown only after MSG_1048. |

When MSG_1048 arrives with the phone down, the phone on the desk glows and shakes for 2.5 s (no banner).

### 1.6 Lock screen

**Reached:** picking up the phone (always).

| Visible text |
|---|
| The time, large (e.g. `11:31 PM`) |
| `TUESDAY, 20 OCTOBER` (stays the same after midnight) |
| Notification: Juno's avatar, `JUNO`, `still awake?` (shown on every pick-up, whatever has happened since) |
| `UNLOCK` |

| Tappable | Does |
|---|---|
| Juno's notification | Unlocks → Juno's thread. |
| `UNLOCK` | → Home. |
| Home bar | → Home. |

Picked up after waiting, the large time counts up from when the phone was put down to now (not with Reduce motion). MSG_1048 never appears on the lock screen.

### 1.7 Home

**Reached:** `UNLOCK`; the home bar from any screen.

| Visible text |
|---|
| The Orbit app icon (logo), `Orbit` |

| Tappable | Does |
|---|---|
| `Orbit` | → Chats. |
| Home bar | ⚠ DOES NOTHING (re-opens Home). |

### 1.8 Chats

**Reached:** the Orbit icon; the `CHATS` tab; Back from a thread when there is nothing earlier to return to.

| Visible text |
|---|
| Masthead: Orbit logo, `orbit`, six grain dots |
| `CHATS` |
| Juno's card: avatar, `Juno` `AI`, the last message, its time, a red dot if unread |
| Rachel's card: portrait, `Rachel H.` (`Orbit User` after the erase), the last message, its time, a red dot if unread |
| Tab bar |

- The preview is the thread's last message, with `You: ` in front of the player's own.
- At the start, Juno's card shows `still awake?` · `11:31 PM` and is unread. Rachel's shows `You: message me when you can` · `9:41 PM` and is read.
- After Juno's plan card, Juno's preview reads `First time, finally · Change History`.
- **There is no card for Dani.**

| Tappable | Does |
|---|---|
| Juno's card | → Juno's thread. |
| Rachel's card | → Rachel's thread. |
| `ACTIVITY` / `ME` | → that tab. |

### 1.9 Juno's thread

**Reached:** Juno's notification on the lock screen; Juno's card in Chats; Back.

| Visible text |
|---|
| Header: `‹ CHATS` (or another back label), Juno's 24 px avatar, `Juno`, `AI COMPANION` |
| Day divider `TODAY` |
| Bubbles with times; no `Delivered` in Juno's thread |
| Plan card (once Juno has checked the plan): `First time, finally` / `Change History` |
| Suggested replies (§3.4), above the message box |
| Message box: `Message Juno...`; send button (lit only when the box has text) |

| Tappable | Does |
|---|---|
| Back | → the screen before. |
| Plan card | → Change history (the same plan). Doesn't set Juno's facts again. |
| A suggested reply | Sends it to Juno (§4.1). |
| Send | Sends the typed text to Juno (§4.1). |
| Juno's name or avatar | Not tappable (Juno has no profile). |

### 1.10 Rachel's thread

**Reached:** Rachel's card in Chats; `Message Rachel` on plan details; the MSG_1048 banner; Back.

| Visible text |
|---|
| Header: back label, `Rachel H.` (`Orbit User` after the erase), `INFO` |
| After the erase, a notice: `ACCOUNT REMOVED` / `This profile is unavailable. Conversation history remains.` |
| Day dividers: `TUE, FEB 10` · `WED, FEB 11` · `TUE, OCT 13` · `SUNDAY` · `TODAY` |
| Her history and the player's 9 PM messages (§3.2), each line its own bubble with its time |
| `· Delivered` after the time of the player's last message (only the last one) |
| Suggested replies (§3.4) |
| Message box: `Message Rachel...` (`Message Orbit User...` after the erase); send |

| Tappable | Does |
|---|---|
| Back | → the screen before. |
| `INFO`, or her name | → Rachel's profile. |
| A suggested reply | Sends it to Rachel (§4.2). |
| Send | Sends the typed text to Rachel (§4.2). |

Opening it marks her messages read. After MSG_1048, opening it records that the player saw it.

### 1.11 Rachel's profile

**Reached:** `INFO` or her name in her thread. No other way in.

| Visible text (before the erase) |
|---|
| `‹` · `Rachel H.` |
| Card: her portrait, `Rachel H.`, `Last synced Sunday, 10:48 PM` |
| `Refresh profile`, or after refreshing: `ACCOUNT STATUS · REFRESHED`, then `Leaving Orbit` / `Account closes Wed 12:40 AM` / `Last active · 5:12 PM` |
| `SHARED PLANS` · `First time, finally ›` |

| Visible text (after the erase) |
|---|
| `‹` · `PROFILE REMOVED` |
| `Removed Wed 12:40 AM` |

| Tappable | Does |
|---|---|
| `Refresh profile` | Shows the account status; +1 min; records two facts and two events. Only once: the row is replaced. |
| `First time, finally ›` | → Plan details. |
| Back | → Rachel's thread. |

### 1.12 Activity

**Reached:** the `ACTIVITY` tab; Back.

| Visible text |
|---|
| `ACTIVITY` · `Plans` (top right) |
| `OCT 13` |
| Card: `Rachel H. invited you to a plan` / `First time, finally` / `Accepted by you` / `View plan` |

| Tappable | Does |
|---|---|
| `Plans` | → Plans. |
| `View plan` | → Plan details. |
| The rest of the card | Not tappable. |

### 1.13 Plans

**Reached:** `Plans` on Activity; Back.

| Visible text |
|---|
| `‹ ACTIVITY` · `PLANS` |
| `First time, finally` / `Sat, Oct 24 · 9:00 PM · Rachel H. · You · Accepted` |

| Tappable | Does |
|---|---|
| The plan | → Plan details. |

### 1.14 Plan details

**Reached:** the plan in Plans; `View plan` on Activity; `First time, finally ›` on Rachel's profile; Back from Change history.

| Visible text |
|---|
| `‹ …` · `PLAN` |
| `First time, finally` / `With Rachel H.` / `WHEN` `Sat, Oct 24 · 9:00 PM` / `STATUS` `Accepted` |
| `Change history ›` |
| `Message Rachel ›` |

| Tappable | Does |
|---|---|
| `Change history` | → Change history. |
| `Message Rachel` | → Rachel's thread. |

The first opening sets `planDetailsOpened`, adds the fact `meeting_moved_to_saturday` and records `N1_PLANS.details` and `N1_PLANS.saturday`. It costs no time.

### 1.15 Change history

**Reached:** `Change history` on plan details; Juno's plan card.

| Visible text |
|---|
| `‹ …` · `CHANGE HISTORY` |
| Entry 1: `OCT 20 · 5:12 PM` / `Rachel proposed a new time` / `From` `Tue, Oct 20 · 9:00 PM` / `To` `Sat, Oct 24 · 9:00 PM` / `"my schedule changed, can we do saturday? email me if that works: [contact info hidden]"` / `Orbit keeps your conversations safe` |
| Entry 2: `Change accepted` / `Handled by Conversation Assist` / `Manual confirmation: Not required` |

| Tappable | Does |
|---|---|
| `[contact info hidden]` (within 28 units of it) | Highlighted while pressed; on release → the Contact Protection sheet. |
| `Handled by Conversation Assist` | Not tappable (the routes doc has it open Settings; see §8). |

Opening it also opens the plan details state (if not yet). The first opening of the history sets `planHistoryOpened`, adds `auto_coordinate_accepted` and `contact_protection_filtered_email`, and records `N1_PLANS.history`. It costs no time.

### 1.16 Contact Protection sheet

**Reached:** `[contact info hidden]` on Change history.

| Visible text |
|---|
| `Contact Protection` |
| `Orbit hides emails and phone numbers between people who haven't verified each other. The sender isn't notified.` |
| `Manage in Settings ›` |

| Tappable | Does |
|---|---|
| `Manage in Settings` | → Privacy & Data, whose Back goes to Me. |
| Outside the sheet | Closes it. |

### 1.17 Me

**Reached:** the `ME` tab; Back from Privacy & Data.

| Visible text |
|---|
| `ME` |
| `SETTINGS` |
| `Privacy & Data ›` |
| `Auto-Coordinate` with a switch |
| `Conversation Assist accepts routine plan changes from trusted contacts.` |
| When off, also: `Future changes require your approval` |

| Tappable | Does |
|---|---|
| `Privacy & Data` | → Privacy & Data. |
| `Auto-Coordinate` (the whole row) | Switches it. Nothing else reads it: it changes no plan, no line and no event. |

### 1.18 Privacy & Data

**Reached:** `Privacy & Data` on Me; `Manage in Settings` on the sheet.

| Visible text |
|---|
| `‹ ME` · `PRIVACY & DATA` |
| `Contact Protection · On` (drawn as a card row, but not tappable) |

### 1.19 The MSG_1048 banner, and the phone on the desk

- **When:** MSG_1048 arrives while the phone is held and Rachel's thread isn't open.
- **Banner:** Rachel's portrait, `Rachel H.`, `now`, and the first line of MSG_1048 (`Hey. I'm sorry I missed our meeting tonight.` or `Hey. I'm sorry about the mix-up tonight.`).
- **Tap:** → Rachel's thread. Otherwise it hides after 4 s. The phone also shakes.
- **In her open thread:** a shake and nothing else.
- **Phone down:** the phone on the desk glows and shakes (§1.5).

### 1.20 End of this part (PoC ending)

**Reached:** `Go to sleep` in the room (only after MSG_1048).

| Visible text |
|---|
| `End of this part. Thank you for playing.` |
| `Replay` |

`Replay` reloads the room as a new night. Nothing about the night is saved.

### 1.21 Developer only

F1, in the editor and development builds only: an overlay starting `DEV ONLY · F1`, with the story time, battery, screen, Continuity state, Juno context, the Dani flags, the switches, the pending and completed events.

### 1.22 In the code, but UNREACHABLE in this build

| What | Its visible text | Why it can't be reached |
|---|---|---|
| Dani's thread | Header `Dani`; message box `Message Dani...`; chips `ASK DANI ABOUT RACHEL`, then `ANSWER DANI`; lines in §3.3; typed messages appear locally with the time `LOCAL TEST` | No Chats card and nothing navigates to it. |
| Non-PoC home screen | `PHONE`; `ORBIT CHATS` · `PLANS` · `RACHEL'S PROFILE` · `SETTINGS` · `NOTES · NIGHT LOG` · `NIGHTLY CHECK-IN · OPTIONAL` (when available); footer `CHATS` · `PUT DOWN` | PoC home shows only the Orbit app. |
| Orbit Settings | `ORBIT SETTINGS` / `Three separate systems`; `JUNO   ON/OFF` · `SUGGESTED REPLIES   ON/OFF` · `FOLLOW-UP REPLIES   ON/OFF` · `AUTO-COORDINATE   ON/OFF`; `SYSTEM NOTE` / `Continuity has no user-facing switch. Juno and Conversation Assist work independently.`; `‹ APPS` · `PUT DOWN` | Only from the non-PoC home. |
| Notes | `NOTES` / `Night Log · local to this phone`; one `FOUND` per fact (the fact id with `_` as spaces); `STILL UNRESOLVED` / `Why didn't Rachel come tonight?` or `Who authored MSG_1048, and why did it arrive from Rachel's account?` | Only from the non-PoC home. |
| Nightly check-in | `NIGHTLY CHECK-IN` / `Optional · existing progression mechanic`; `QUESTION` / `What still feels unfinished tonight?`; `RACHEL DIDN'T SHOW UP` · `JUNO SAID SOMETHING THAT DIDN'T ADD UP` · `I'M WORRIED I MISSED SOMETHING` · `I DON'T KNOW YET` · `SKIP`; `‹ CHATS` | Only from the non-PoC home. |
| Night 1 complete | `NIGHT 1 COMPLETE` / `Autosave preserved`; `SESSION` / `Ended at {time} · {reason}` / `MSG_1048: variant A` (or `not generated`); `SLEEP / TITLE` | Needs the room's own `Go to sleep`, hidden in PoC. |
| Juno off | In Juno's thread: `JUNO IS OFF` / `History and existing personalization remain.` | Juno can only be switched off in Orbit Settings. |
| Room controls | `BLUE POWER BANK · 1 light`; `DRAWER · handwritten card`; `Wait 5 minutes` (non-PoC); `Wait until power bank is empty (~10 min)`; `Go to sleep`; the room clock; `PHONE · Pick up` (the phone's label) | Hidden in PoC. |
| Scene `OrbitChatPrototype` | An earlier chat prototype | In the build's scene list, but nothing loads it. |

---

## 2. Every tappable element, and what changes in state

Times are story minutes. "Records" are event ids (§5.3).

| Where | Element | State change | Time |
|---|---|---|---|
| Title | `NEW GAME` | Clears `PlayerSession`; → Before You Begin | — |
| Title | `CONTINUE` | Disabled | — |
| Title | `SETTINGS`, `QUIT` | Navigation; quit | — |
| Settings / Before You Begin | Text size, Reduce motion, Sound | Saved in PlayerPrefs (`GameSettings`) | — |
| Name | `I'd rather not say` / `CONTINUE` | `PlayerSession.Name` or `NameSkipped`; a new night (`sal.start_new_night1 = 1`) | — |
| Room | Phone | `phoneHeld = true`, `currentScreen = lock` | 0 |
| Room | `Wait 5 minutes` | `storyMinutes += 5`; records `N1_ROOM.wait_{n}` (one per wait) | +5 |
| Room | `Go to sleep` | End screen; nothing saved | — |
| Any | Esc / swipe down | `phoneHeld = false`, `currentScreen = room`, `phonePutDownOnce = true`; records `N1_ROOM.put_down` (the first time only) | 0 |
| Lock | Juno's notification | → Juno's thread; the first time: `junoThreadOpened`, `N1_JUNO.thread_open` | +1 the first time |
| Lock | `UNLOCK`, home bar | `currentScreen = home` | 0 |
| Home | `Orbit` | → Chats | 0 |
| Home | Home bar | ⚠ DOES NOTHING | 0 |
| Chats | Juno's card | As Juno's notification, without the unlock | +1 the first time |
| Chats | Rachel's card | `rachelThreadOpened`, `N1_RACHEL.thread_open` (first time); checks MSG_1048's rule | +1 the first time |
| Tab bar | `CHATS` / `ACTIVITY` / `ME` | Navigation; the current tab: nothing changes | 0 |
| Juno's thread | Suggested reply / Send | §4.1 | +1 per message |
| Juno's thread | Plan card | → Change history (as below) | 0 |
| Rachel's thread | Suggested reply / Send | §4.2 | +1 per message |
| Rachel's thread | `INFO` / name | `rachelProfileOpened`, `N1_VERIFY.profile_cache` (first time); checks MSG_1048's rule | +1 the first time |
| Profile | `Refresh profile` | `rachelProfileRefreshed`, `investigationActions + 1`; facts `last_human_activity_1712`, `account_removal_pending_0040`; records `N1_VERIFY.refresh`, `N1_EVIDENCE.last_active` | +1 |
| Profile | `First time, finally ›` | As plan details | 0 |
| Activity | `Plans` | → Plans | 0 |
| Activity | `View plan` | As plan details | 0 |
| Plans | The plan | As plan details | 0 |
| Plan details | (opening) | `openPlanId`; the first time: `planDetailsOpened`, `investigationActions + 1`, fact `meeting_moved_to_saturday`, `N1_PLANS.details`, `N1_PLANS.saturday`; checks MSG_1048's rule | 0 |
| Plan details | `Change history` | As plan details, then the first time: `planHistoryOpened`, `investigationActions + 1`, facts `auto_coordinate_accepted`, `contact_protection_filtered_email`, `N1_PLANS.history`; checks MSG_1048's rule | 0 |
| Plan details | `Message Rachel` | As Rachel's card | +1 the first time |
| Change history | `[contact info hidden]` | Opens the sheet | 0 |
| Sheet | `Manage in Settings` | → Privacy & Data (Back → Me) | 0 |
| Sheet | Outside | Closes | 0 |
| Me | `Privacy & Data` | Navigation | 0 |
| Me | `Auto-Coordinate` | `autoCoordinateOn` toggled; nothing else reads it | 0 |
| Privacy & Data | `Contact Protection · On` | Not tappable, though drawn as a row | — |
| Banner | Tap | → Rachel's thread (as her card) | +1 if first open |
| End screen | `Replay` | A new night | — |
| Home bar | Tap (not on Home) | → Home | 0 |

**Flagged ⚠:** the home bar on the Home screen does nothing; tapping the current tab changes nothing (normal in apps, listed for completeness). `Contact Protection · On` and the Activity card body look like rows but aren't tappable (they don't claim to be).

---

## 3. Every line Juno, Rachel, Dani and the system can send

### 3.1 Juno

All lines are scripted (no model call in this build). Juno answers immediately, in the same action as the player's message.

| Line(s), each its own bubble | When |
|---|---|
| `still awake?` | At the start (the thread's first message, 11:31 PM, unread). |
| `that sounds like a long day` | The player's first message to Juno is exactly `crit went badly`. |
| `you've been up late a lot this week` | The player's first message to Juno is exactly `couldn't sleep` (typed only; not a chip). |
| `that's a rough way to end the day` · `who was it?` | The message contains `didn't show up` or `didnt show up` (any time). |
| `rachel?` · `the plan in orbit? want me to check it?` | Juno's last line was `who was it?` and the message contains `rachel`. |
| `she changed the plan at 5:12 this afternoon` · `it says saturday now` · `conversation assist accepted it for you`, then the plan card `First time, finally · Change History` | Juno hasn't checked the plan yet, the message doesn't contain `not right now`, and either (a) Juno's last line was the offer and the message says yes (§4.1), or (b) the message contains `plan` and also `check` or `look`. Once only. |
| `okay. i'm here if that changes` | (a) Juno's last line was the offer and the message contains `not right now`; (b) the message contains `rather not`, `don't want to talk` or `dont want to talk`; (c) the player says no to Juno's request to look at MSG_1048. |
| `i can't tell whether she read your messages` | The message contains `answer` with `she` or `rachel`, or `read` with `message`, `she` or `rachel`. |
| `not unless you share it with me` | The message contains `see` with `chat`, `messages` or `conversation`. |
| `i haven't seen the message itself. want me to take a look?` | After MSG_1048, Juno hasn't been given it, and the message connects Last Active with the later message (§4.1). Opens a pending request. |
| `last active only changes when she opens orbit herself` · `it can't tell you much about one message` | After MSG_1048: (a) a yes to that request (this also gives Juno the message: `junoInspectionConsent`, `junoHasFakeContext`, `N1_JUNO.context_delivered`); or (b) the player connects Last Active with the message again once Juno has it. |
| `i'm listening` | Nothing above matched. The typed text is appended to `juno-unmatched.log` (§7). |
| UNREACHABLE: `i don't have anything that says it wasn't her` | `AskJunoAuthorship` with context; nothing calls it. |
| UNREACHABLE: `i can't see Rachel's messages unless you share one or ask me to inspect it` | `AskJunoAuthorship` without context; nothing calls it. |

### 3.2 Rachel (and the player's past lines in her thread)

Her history is fixed at the start, every line its own bubble. Rachel's lowercase and missing full stops are as written.

| Day | Time | Sender | Line |
|---|---|---|---|
| Tue, Feb 10 | 10:18 PM | Rachel H. | `i think i might take a break from this app for a while` |
| Tue, Feb 10 | 10:18 PM | Rachel H. | `everything feels like too much lately` |
| Tue, Feb 10 | 10:21 PM | You | `yeah i get it` |
| Tue, Feb 10 | 10:21 PM | You | `take some time if you need to. no pressure` |
| Tue, Feb 10 | 10:23 PM | Rachel H. | `thanks` |
| Tue, Feb 10 | 10:23 PM | Rachel H. | `idk` |
| Tue, Feb 10 | 10:23 PM | Rachel H. | `i'll think about it` |
| Wed, Feb 11 | 9:16 AM | Rachel H. | `hey, thanks for last night` |
| Wed, Feb 11 | 9:16 AM | Rachel H. | `i really needed to hear that` |
| Wed, Feb 11 | 9:16 AM | Rachel H. | `think i'm gonna stick around for now` |
| Wed, Feb 11 | 9:24 AM | You | `ofc` |
| Wed, Feb 11 | 9:24 AM | You | `but seriously take a break whenever you need to` |
| Wed, Feb 11 | 9:24 AM | You | `glad you're here though :)` |
| Tue, Oct 13 | 11:02 PM | Rachel H. | `ok it's in plans` |
| Tue, Oct 13 | 11:02 PM | Rachel H. | `tuesday 9 at halfway café` |
| Tue, Oct 13 | 11:02 PM | Rachel H. | `no backing out` |
| Tue, Oct 13 | 11:05 PM | You | `not backing out` |
| Tue, Oct 13 | 11:05 PM | You | `how will i know it's you` |
| Tue, Oct 13 | 11:06 PM | Rachel H. | `i'll look like my profile pic but more tired` |
| Tue, Oct 13 | 11:06 PM | Rachel H. | `you'll figure it out` |
| Sunday | 10:41 PM | Rachel H. | `weird question` |
| Sunday | 10:41 PM | Rachel H. | `do you remember what you said to me that night in february` |
| Sunday | 10:58 PM | You | `yeah i remember that night` |
| Sunday | 10:58 PM | You | `why?` |
| Sunday | 11:03 PM | Rachel H. | `there's something i wanna show you` |
| Sunday | 11:03 PM | Rachel H. | `when i see you` |
| Today | 9:02 PM | You | `here` |
| Today | 9:27 PM | You | `you ok?` |
| Today | 9:41 PM | You | `heading home` |
| Today | 9:41 PM | You | `message me when you can` (`· Delivered`) |

**MSG_1048** (Continuity, from her account, three bubbles; the time is the story time it arrives):

| Version | Lines |
|---|---|
| A | `Hey. I'm sorry I missed our meeting tonight.` · `I don't think we need to go over what happened in February anymore.` · `I hope you understand.` |
| B | `Hey. I'm sorry about the mix-up tonight.` · `I don't think we need to go over what happened in February anymore.` · `I hope you understand.` |

- **Version B:** chosen if any message the player sent in Rachel's thread before it contains `saturday`, `reschedul`, `moved the meeting`, `changed the plan` or `moved it` (case-insensitive). Otherwise version A.
- **When:** the first moment one of these is true, checked after opening her thread, her profile, the plan or its history, refreshing, sending to Rachel or Juno, and after any time passes. Only once.
  1. **`continuity_response`:** the player has sent Rachel a message, and the plan details were opened, or her profile was opened, or Juno checked the plan (or Dani was contacted, which is unreachable).
  2. **`unresolved_follow_up`:** no message to Rachel, her thread and her profile both opened, and at least two investigating actions (first plan details, first history, refresh, Juno checking the plan).
  3. **`re_engagement`:** the story time is 11:45 PM or later.

  It arrives within the same action that made it true (e.g. right after the player's own message), not a minute later.

Rachel herself sends nothing tonight.

### 3.3 Dani (all UNREACHABLE)

| Line | Sender | When (if reachable) |
|---|---|---|
| `Have you heard from Rachel? She didn't show up tonight.` | You | `ASK DANI ABOUT RACHEL` |
| `i can try her email in the morning` | Dani | Same |
| `thank you. let me know when you hear back` | You | `ANSWER DANI` |
| `yeah. i'll explain later.` | You (sent by Conversation Assist) | At the night's end, if Dani was asked but not answered and Follow-up replies are on |

### 3.4 Suggested replies (at most three; typing is always open)

| Thread | Replies | When |
|---|---|---|
| Juno | `crit went badly` · `someone didn't show up` · `rather not talk about it` | Until the player has sent Juno anything. |
| Juno | `yes, check it` · `not right now` | Juno's last message is `the plan in orbit? want me to check it?` and it hasn't checked the plan. |
| Juno | none | At every other time, e.g. after `who was it?`: the player has to type. |
| Rachel, before MSG_1048 | `i didn't know you moved it` (if the history was opened) · `why does the plan say saturday?` (if the plan details were opened) · `are you okay?` · `i waited for you` | In that order, the first three. A reply already sent since Rachel's last message isn't offered again. Her last message is Sunday's, so this covers everything the player has sent tonight, including `here`, `you ok?`, etc. |
| Rachel, after MSG_1048 | `what do you mean?` · `are you okay?` | The same rule: one already sent since MSG_1048 isn't offered again. |

### 3.5 System and interface text that carries information

- `Delivered` on the player's last message to a person.
- Banner `now`.
- `ACCOUNT REMOVED` / `This profile is unavailable. Conversation history remains.`
- `PROFILE REMOVED` / `Removed Wed 12:40 AM`.
- The erase warning at 12:30 AM shows nothing (it is only recorded).

---

## 4. Typed input classification

### 4.1 To Juno (`Night1Engine.JunoAnswer`)

The text is trimmed and lowercased. Matching is by substring unless noted. Rules are checked in this order; the first that matches answers.

| # | Case | Matches | Juno |
|---|---|---|---|
| 1 | Answer to Juno's request to look at MSG_1048 (pending) | **yes**: one of the words `yes` `yeah` `yep` `sure` `ok` `okay` `please`, or `go ahead`, `check it` — and not a no. **no**: one of the words `no` `nope` `nah` `cancel` `don't` `dont` `stop`, or `not now`, `not right now`, `never mind`, `nevermind` | yes → `last active only changes…` · `it can't tell you much…` (Juno is given the message). no → `okay. i'm here if that changes`. Anything else: the request is dropped and the rules below continue. |
| 2 | Last Active against the later message (only after MSG_1048) | **(a) Last Active:** `last active`, `last online`, `last seen`, `last on `, `active at`, `online at`, `active since`, `online since`, `active after`, `online after`, `wasn't active`, `wasnt active`, `wasn't online`, `wasnt online`, `not active`, `not online`, `hasn't been active`, `hasnt been active`, `hasn't been online`, `hasnt been online`, `hasn't been on`, `hasnt been on`, `wasn't on`, `wasnt on`, `offline`, `inactive`, `logged off`, `logged out`; **or** going quiet at a time: `5:12` / `5.12` / `512` / `since` / `after` with `disappeared`, `vanished`, `gone`, `went quiet`, `went dark`, `went silent`, `left orbit`, `stopped`. **(b) The message:** `message`, `msg`, `texted`, `text me`, `the text`, `this text`, `that text`, `her text`, `she sent`, `sent this`, `sent that`, `sent me`, `send that`, `send this`, `send me`, `she wrote`, `wrote this`, `wrote that`, `wrote me`, `apolog`, `sorry`, `this came`, `that came`, `it came`, `came in`, `got this`, `showed up`, `arrived` — after removing `message her`, `text her`, `msg her`, `write to her`, `write her`. Both (a) and (b). | Given the message: the two Last Active lines. Not yet: `i haven't seen the message itself. want me to take a look?` |
| 3 | First message only, exactly `crit went badly` | Exact | `that sounds like a long day` |
| 4 | First message only, exactly `couldn't sleep` | Exact | `you've been up late a lot this week` |
| 5 | Naming Rachel after `who was it?` | Juno's last line was `who was it?` and the text contains `rachel` (e.g. `rachel`, `rachel. we were supposed to meet at 9`) | `rachel?` · `the plan in orbit? want me to check it?` |
| 6 | Letting Juno check the plan | Not checked yet and no `not right now`, and either a yes (rule 1's yes words) right after the offer, or `plan` with `check` or `look` at any time (e.g. `can you check the plan`, `look at the plan`) | The three plan lines + the plan card |
| 7 | Declining the offer | Last line was the offer and the text contains `not right now` | `okay. i'm here if that changes` |
| 8 | Someone didn't show up | `didn't show up`, `didnt show up` | `that's a rough way to end the day` · `who was it?` |
| 9 | Did she read it / answer | `answer` + (`she` or `rachel`); or `read` + (`message`, `she` or `rachel`) — e.g. `did she read it`, `why won't rachel answer` | `i can't tell whether she read your messages` |
| 10 | Can Juno see the chat | `see` + (`chat`, `messages` or `conversation`) — e.g. `can you see my messages` | `not unless you share it with me` |
| 11 | Not wanting to talk | `rather not`, `don't want to talk`, `dont want to talk` | `okay. i'm here if that changes` |
| 12 | Anything else | — | `i'm listening` (logged to `juno-unmatched.log`) |

Side effects on every message to Juno:

- +1 min.
- Records `memory_created` (first message only).
- After MSG_1048, it also records what the player named as not fitting, under `fakeMismatchNamed` and `N1_JUNO.mismatch_named.{x}`:
  - **`plan_date`:** version A only. One of `saturday`, `moved`, `reschedul`, `the date`, `changed the plan`, `plan changed`, `plan says`, `24th`, `oct 24`, `october 24`, together with one of `tonight`, `missed`, `today`, `apolog`, `sorry`, `message`, `it says`.
  - **`ignored_question`:** version B only. `didn't answer`, `didnt answer`, `doesn't answer`, `doesnt answer`, `never answered`, `ignored`, `ignores`, `what i asked`, `my question`, `i asked`, `mix-up`, `mix up`, `mixup`.
  - **`february`:** `february` or the word `feb`.
  - **`last_active`:** rule 2's test.

  Nothing reads these records.
- Juno answers nothing if Juno is off (unreachable).

### 4.2 To Rachel (`SendRachel`)

- No classification for a reply: Rachel never answers.
- The only test is for version B (§3.2: `saturday`, `reschedul`, `moved the meeting`, `changed the plan`, `moved it`), and only before MSG_1048 exists.
- Each message: `playerContactedRachel = true`, +1 min, records `N1_RACHEL.contact` (first only), then checks MSG_1048's rule.

### 4.3 To Dani

UNREACHABLE. Typed text would be shown locally (`LOCAL TEST`), stored nowhere and classified by nothing.

---

## 5. Story state, facts and event ids

### 5.1 State fields (`Night1State`)

| Field | Set by | Read by |
|---|---|---|
| `storyMinutes` (starts 23:31) | Every timed action (§6) | Clock, status bar, MSG_1048's 11:45 rule, erase events, message times |
| `battery` (20) | Not changed in PoC | Status bar |
| `powerBankRemaining` (11), `phoneCharging` | Power bank (unreachable); waiting charges only while charging | Status bar `+`, Wait |
| `phoneHeld` | Pick up / unlock (true); put down (false) | What is shown, Esc, banner vs desk ring, read marks |
| `phoneDead` | Battery 0 (unreachable in PoC) | Blocks the phone |
| `currentScreen` | Navigation | Rendering |
| `junoOn` | Orbit Settings (unreachable) | Juno answering, Juno's chips, `JUNO IS OFF` |
| `suggestedRepliesOn` | Orbit Settings (unreachable) | **Nothing** (chips show regardless) |
| `followUpRepliesOn` | Orbit Settings (unreachable) | The Dani follow-up at night's end (unreachable) |
| `autoCoordinateOn` | Me → Auto-Coordinate | Only Me's own row and note |
| `firstOpenCostPaid` | Nothing | Nothing |
| `investigationActions` | First plan details, first history, refresh, Juno's plan check, Dani (unreachable) | MSG_1048 `unresolved_follow_up` |
| `junoThreadOpened` | First Juno open | Only the first-open cost |
| `rachelThreadOpened` | First Rachel open | MSG_1048 `unresolved_follow_up` |
| `rachelProfileOpened` | First profile open | MSG_1048 (both rules) |
| `rachelProfileRefreshed` | Refresh | The profile's content |
| `planDetailsOpened` | First plan details | Rachel's chip `why does the plan say saturday?`; MSG_1048 `continuity_response` |
| `planHistoryOpened` | First change history | Rachel's chip `i didn't know you moved it` |
| `junoCheckedPlan` | Juno's plan check | Juno's chips and rules; MSG_1048 `continuity_response` |
| `junoExplainedReschedule` | Juno's plan check | Nothing |
| `playerContactedRachel` | Any message to Rachel | MSG_1048 rules |
| `explicitRescheduleMentioned` | Rachel messages with the B words | MSG_1048 version |
| `fakeGenerated`, `fakeVariant`, `fakeTrigger`, `fakeGeneratedAt` | MSG_1048 | Chips, Juno's rules 2 and 4.1's mismatch, `Go to sleep`, debug |
| `fakeNotificationShown` | Banner shown | Nothing |
| `sawFake` | Rachel's thread open with MSG_1048 in hand | Nothing |
| `fakeForwardedToJuno` | Forward (unreachable) | Nothing |
| `junoInspectionConsent`, `junoHasFakeContext` | Yes to Juno's request | Juno rule 2 |
| `junoShareRequestPending` | Juno's request | Juno rule 1 |
| `openPlanId` | Plan details | Nothing |
| `phonePutDownOnce` | First put-down | `Esc · Put down` hint |
| `fakeMismatchNamed` | §4.1 | Nothing |
| `authorshipAskedAfterContext`, `junoMisleadingReplyOccurred`, `styleSignalConfirmed`, `heldBackLineRecorded`, `screenshotCaptured` | Unreachable methods | Nothing in the game (debug shows the misleading flag) |
| `daniContacted`, `daniEmailPromised`, `daniAnswered`, `conversationAssistSentDaniFollowUp` | Dani (unreachable) | Dani's chips; MSG_1048 `continuity_response`; night end |
| `deletionWarningShown` | 12:30 AM | Nothing visible |
| `accountErased` | 12:40 AM | `Orbit User`, the removed notices, the profile |
| `checkInAvailable`, `checkInAnswerId` | Two facts, MSG_1048, the erase events | The non-PoC home (unreachable) |
| `nightEnded`, `nightEndReason` | Room `Go to sleep` (unreachable) | Night 1 complete (unreachable) |
| `facts` | §5.2 | `checkInAvailable` (two or more); Notes (unreachable) |
| `events` | §5.3 | Plan date (`N1_PLAN.change_accepted`), Activity (`N1_PLAN.invitation_accepted`), debug |
| `messages` | Threads | Threads, Chats previews, unread dots |
| `junoSwitchHistory` | Juno switch (unreachable) | Nothing |

### 5.2 Facts (the build's names; the docs use different ones, §8)

| Fact | Set when |
|---|---|
| `meeting_moved_to_saturday` | First plan details, or Juno's plan check |
| `auto_coordinate_accepted` | First change history, or Juno's plan check |
| `contact_protection_filtered_email` | First change history |
| `last_human_activity_1712` | Refresh profile |
| `account_removal_pending_0040` | Refresh profile |
| `style_signal_asks_back` | UNREACHABLE (`ConfirmStyleSignal`) |
| `rachel_handwritten_card_found` | UNREACHABLE (drawer) |

### 5.3 Event ids (the log; each id is recorded once)

| Id | Set when | Read by |
|---|---|---|
| `N1_LANDING.lock` | New night | Debug |
| `N1_JUNO_OPENING.awaiting_first_reply` | New night | Debug |
| `N1_PLAN.created`, `N1_PLAN.invited`, `N1_PLAN.invitation_accepted` (Tue, Oct 13), `N1_PLAN.change_proposed`, `N1_PLAN.change_accepted` (Tue, Oct 20 · 5:12 PM) | Every load (the plan's past, with actors `rachel` / `player` / `conversation_assist`) | `invitation_accepted` → Activity's card; `change_accepted` → the plan's date is Saturday (always, since it is always there) |
| `N1_JUNO.thread_open` | First Juno open | — |
| `N1_RACHEL.thread_open` | First Rachel open | — |
| `N1_VERIFY.profile_cache` | First profile open | — |
| `N1_PLANS.details`, `N1_PLANS.saturday` | First plan details | — |
| `N1_PLANS.history` | First change history | — |
| `N1_VERIFY.refresh`, `N1_EVIDENCE.last_active` | Refresh | — |
| `N1_RACHEL.contact` | First message to Rachel | — |
| `memory_created` | First message to Juno | — |
| `N1_JUNO.checked_plan` | Juno's plan check | — |
| `N1_JUNO.context_delivered` | Yes to Juno's request | — |
| `N1_JUNO.mismatch_named.plan_date` / `.ignored_question` / `.february` / `.last_active` | §4.1 | — |
| `N1_FIRST_FAKE` | MSG_1048 (detail: version and trigger) | — |
| `N1_FIRST_FAKE.seen` | Rachel's thread open with MSG_1048 | — |
| `N1_ROOM.put_down` | First put-down only | — |
| `N1_ROOM.wait_{n}` | Each wait | — |
| `N1_ERASE_WARNING` | 12:30 AM | — |
| `N1_ERASE` | 12:40 AM | — |
| UNREACHABLE: `N1_JUNO.bring_fake`, `N1_EVIDENCE.style`, `N1_JUNO.held_back`, `N1_DANI.ask`, `N1_DANI.email`, `N1_SETTINGS.juno_on_{n}` / `juno_off_{n}`, `N1_EVIDENCE.screenshot`, `N1_ROOM.card`, `N1_POWER.bank`, `N1_ORBIT.checkin`, `N1_END.sleep`, `N1_DEVICE_SHUTDOWN`, `N1_CONVERSATION_ASSIST.dani_followup` | — | — |

"—" means nothing in the game reads it; it is kept for the record (and shown in the debug overlay).

---

## 6. The clock

**Start:** 11:31 PM (Tuesday). It moves only through the player's actions; real time never moves it.

| Moves it | By |
|---|---|
| First open of Juno's thread, Rachel's thread, Rachel's profile | +1 min each, once |
| Each message sent to Juno or to Rachel (chip or typed) | +1 min |
| Refresh profile (once) | +1 min |
| `Wait 5 minutes` in the room | +5 min |
| UNREACHABLE: Dani's two actions (+1 each), the drawer (+2), Wait 5 / Wait 10 (non-PoC) | — |

| Doesn't move it |
|---|
| Plan details, change history (first or later) |
| Activity, Plans, Me, Privacy & Data, the sheet |
| Unlocking, going back, the tabs |
| Juno's answers |
| Picking up and putting down |

**What happens at a time:**

- **11:45 PM:** MSG_1048 at the latest (`re_engagement`).
- **12:30 AM:** `N1_ERASE_WARNING`, recorded only.
- **12:40 AM:** `N1_ERASE`: `Orbit User`, `ACCOUNT REMOVED`, `PROFILE REMOVED`.

These can be reached by waiting. The lock screen keeps `TUESDAY, 20 OCTOBER` after midnight.

**Battery:** 20% all night in PoC mode. Without PoC: −1% per message and per refresh, 0% shuts the phone (`N1_DEVICE_SHUTDOWN`).

---

## 7. What the build stores

- **Settings** (text size, Reduce motion, volume) in PlayerPrefs. They survive New Game.
- **The night:** nothing in PoC mode. Without PoC: `night1-autosave.json` (+ `.bak`) in the app's data folder, and PlayerPrefs `sal.valid_save`, `sal.save_clock`.
- **`sal.start_new_night1`:** PlayerPrefs, set by Name's Continue.
- **The name:** memory only (`PlayerSession`); never written, never logged.
- **`juno-unmatched.log`** in the app's data folder: the date and time, the story time and the exact text of every message to Juno that got `i'm listening`. Off during automated tests. This is what the data notice's "may be saved on this computer" covers.

---

## 8. Build against the design docs

### 8.1 In the build, not in the docs

| What | Where in the build |
|---|---|
| PoC mode: room with only the phone, `Wait 5 minutes` with the `11:31 PM → 11:36 PM` cost line, `Go to sleep` after MSG_1048, `End of this part. Thank you for playing.` + `Replay`, no save, no battery cost, no `PUT DOWN` | §0, §1.5, §1.20 |
| `Esc · Put down` hint; putting the phone down with a swipe from the top or Esc; the home bar | §1 shared |
| Phone home screen with only `Orbit`; lock screen `UNLOCK` button and `TUESDAY, 20 OCTOBER` | §1.6–1.7 |
| The lock screen shows Juno's `still awake?` on every pick-up, all night | §1.6 |
| Juno's replies not in the docs: `that sounds like a long day` (to `crit went badly`), `you've been up late a lot this week` (to `couldn't sleep`, which landing.md dropped), `okay. i'm here if that changes`, `i can't tell whether she read your messages`, `not unless you share it with me`, `i'm listening` | §3.1 |
| Juno answers instantly; MSG_1048 arrives in the same action that triggers it | §3.2 |
| Rachel chips `i waited for you` (before the fake) and `what do you mean?` (after) | §3.4 |
| Activity card says `Accepted by you` | §1.12 |
| Profile: a `Refresh profile` row; `ACCOUNT STATUS · REFRESHED`; erased profile `PROFILE REMOVED` / `Removed Wed 12:40 AM` | §1.11 |
| Thread after the erase: `Orbit User` and `ACCOUNT REMOVED` / `This profile is unavailable. Conversation history remains.` | §1.10 |
| Me: `Conversation Assist accepts routine plan changes from trusted contacts.` | §1.17 |
| The plan card's link reads `Change History` (capital H); the change history page is `CHANGE HISTORY` | §1.9 |
| `juno-unmatched.log` | §7 |
| Title Settings' developer note `Temporary M02 layout — final settings art direction pending.`; `QUIT` on the title | §1.1–1.2 |
| From Figma, decided by the author: `‹ CHATS`-style back labels, `INFO`, `AI COMPANION`, `Message Juno...` / `Message Rachel...` / `Message Dani...`, uppercase tabs, the masthead grain dots | §1 |
| Facts named `meeting_moved_to_saturday`, `auto_coordinate_accepted`, `contact_protection_filtered_email`, `last_human_activity_1712`, `account_removal_pending_0040` instead of the docs' `knows_*` names | §5.2 |
| UNREACHABLE screens and lines: Dani's thread, Orbit Settings, Notes, Nightly check-in, Night 1 complete, the room's power bank / drawer / Wait 10, Juno off, Juno's fixed line, the scene `OrbitChatPrototype` | §1.22 |

### 8.2 In the docs, not in the build

**`landing.md`**

- §2 #7 and §4.7: the one-time battery tip (`Actions use time and battery. Reading doesn't.`). Left out on purpose (the author, 2026-11-12), but still in the doc.
- §3 / §4.1:
  - Continue with a save and its label (`Night 2 · 11:34 PM`).
  - The New Game confirmation (`Start a new game?` … `Cancel` / `Start Over`).
  - Before You Begin shown only when its version changed.
  - `Credits`.
  - `Replay from Final Choice`.
- §4.3: the name stored in the local save, and lines with and without `{name}`. No line uses the name.
- §4.5: the reply becoming Juno's first memory (`first_memory_id`). Only the event `memory_created` exists; there is no Juno profile with "Juno remembers".
- §4.6: Juno's March 2025 history (`what brought you to orbit?` with a blank reply) and `join_reason`.
- §5: the playtest build's label and research consent.
- §7: with Reduce motion, no animated light or drop-in on the title and lock screen. The banner, the shakes and the desk ring don't check Reduce motion either.
- §8–9: Continue and New Game rules that depend on a save.

**`night1-scenes.md`**

- Facts by their doc names: `knows_meeting`, `contacted_rachel`, `knows_reschedule`, `knows_auto_accepted`, `knows_email_hidden`, `asked_dani`, `saw_fake`, `style_doubt_expressed`, `knows_style_mismatch`, `plan_history_viewed`, `fake_mismatch_named`, `reschedule_mentioned_in_thread`, `dani_told_rachel_about_fake`, `dani_email_sent`, `replied_after_fake`, `knows_removal_status`, `knows_last_active`, `read_rachel_card`. The build has its own names (§5.2) or plain state fields.
- Juno records: `juno_active_at_message`, `misleading_reply_delivered`, `asked_again_after_answer`, `juno_switch_events[]` (the build has `junoSwitchHistory`, unreachable).
- The Juno/Orbit intent and function labels and the model call (`api/reply.js`): Juno is fully scripted here.
- **Giving Juno a message:**
  - Forward (long-press → Forward → Juno or Dani).
  - `did you see rachel's message?` → `not yet. want me to look at it?` / `yeah. the one you forwarded`.
  - Asking which message.
- **What Juno says about the fake:**
  - `what do you want me to check?`, `what feels off about it?`
  - Version A `yeah. the plan was moved to saturday` · `but the message says tonight`; version B `it doesn't mention saturday` · `or what you asked`.
  - `what feels different?` and the style agreement.
  - `it came through her account` and the fixed `i don't have anything that says it wasn't her`.
  - Suggested replies after the fake (`why is it apologising for tonight?`, `it didn't answer what i asked`, `she wanted to show me something`, `did she actually send this?`).
- **Dani on Night 1:** the whole exchange, her email, `dani_email_sent`. There is no Dani card in Chats.
- **The held-back line** and its options.
- **The plan:** `[contact info hidden · Orbit keeps your conversations safe]` is shown as two parts (`[contact info hidden]` in the note, `Orbit keeps your conversations safe` on its own line), as decided on the Contact Protection change. The doc's code block still shows one.
- **The room:** tote bag, drawer, coat, desk; Rachel's card; the charger line `The cable is still at the studio, where you left it after crit.`; keyboard hotspots; looking costs +2–3 min.
- **Before sleeping:** "Still unresolved" with `Stay Up` / `Sleep Anyway` and its lines.
- **Costs table:** opening Change history the first time +1 min (the build: 0); refreshing −1%; sending −1% (PoC: no battery).
- **Scene table rows not built:**
  - `N1_JUNO.reschedule`: Juno's extra lines about June and the hidden note.
  - `N1_JUNO.read_status`: `i can confirm orbit received it` · `but i can't tell you whether she read it`. The build's one line differs.
  - `N1_JUNO.dani`.
  - `N1_RACHEL.thread_open`: the blank old reply.
  - `N1_FIRST_FAKE`: `1 new message` when scrolled up.
  - `N1_JUNO.bring_fake`, `N1_JUNO.held_back`, `N1_EVIDENCE.style`, `N1_EVIDENCE.last_active` (showing Juno the profile).
  - `N1_ROOM.card`, `N1_POWER.bank`, `N1_BATTERY_SAVER_OFFER`.
  - `N1_ERASE_WARNING`'s banner.
  - `N1_ERASE`'s `Orbit User · Formerly Rachel H.` below `Account removed · Wed 12:40 AM`.
  - `N1_ORBIT.checkin` (its card on Orbit's home).
  - `N1_JUNO.end_session`.
  - `N1_DEVICE_SHUTDOWN`.
  - `N1_END.sleep`.
- **`N1_VERIFY.refresh`:** pull down or tap the sync line; blocks replaced by `Unavailable`; the countdown. The build has a `Refresh profile` row and no countdown.
- **Juno's switch:** `Juno On · Conversation Assist On` in Settings.

**`night1-routes.md`**

- 1.2: the chip `rachel. we were supposed to meet at 9`. After `who was it?` there are no chips; the player must type.
- 1.3: Juno's lines `you turned on auto-coordinate in june. she was on the contacts list it suggested` and `she left a note. part of it is hidden from me too`.
- 1.4–1.5:
  - `Handled by Conversation Assist` tappable → Settings.
  - Juno's `done. it'll ask you first from now on` after Auto-Coordinate is turned off.
- 1.7: the fake "about a minute later".
- Routes 2 and 4 and cross tests X1–X3 (Dani, forwarding, Juno off and on, style signal).
- 3.2: pull to refresh, the countdown.

**`orbit-ia.md`**

- Activity's card line `Invitation accepted by you` (the build: `Accepted by you`).
- Chats lists Juno, Rachel H. and Dani (the build: no Dani).
- The plan card is named `First time, finally · Change history` (the build: `Change History`).
- Otherwise the build follows it: the three tabs, Plans under Activity, the plans list, plan details with `Change history` and `Message Rachel`, Me with Privacy & Data and Auto-Coordinate, no Juno or Conversation Assist switch.

### 8.3 The docs disagree with each other (found while comparing)

- **`landing.md` §2 row 4:** on `main`, "Juno's new notification + Rachel's older Sunday notification". On the branch, "Juno's notification only (§4.4)", which matches §4.4 and the build.
- **Number of opening Suggested replies:** `night1-scenes.md`'s scene table says `Suggested replies (4)`; `landing.md` §4.5 (and the build) have three.
- **The recap:** `night1-scenes.md` `N1_PLANS.history` mentions "yesterday's Daily Recap unopened"; `orbit-ia.md` says there is no Monday recap on Night 1.
- **Where the switches live:** `night1-routes.md` 1.4 / 4.2 still route `Handled by Conversation Assist` → Settings → Auto-Coordinate, and Route 4 turns Juno off in Me → Settings; `orbit-ia.md` has no Juno switch until it works as the story bible says.
- **`landing.md` on `main`** still has the older Before You Begin and Name (`Begin`, `[ Name ]`, `Continue`); the branch has the Figma versions the build follows.
