# Orbit information architecture v2.1

Approved 2026-11-12. This covers the layout of the app and how it behaves; the visuals follow the existing build.

Principle: Orbit has to work like an ordinary social app first, and be a system the player can investigate second.

## Navigation

Three tabs, the only top-level navigation:

- **Chats:** conversations (Juno, Rachel H., Dani). From a chat: the contact's profile, and on it `Shared Plans`.
- **Activity:** the feed (Daily Recaps, plan invitations). A small `Plans` entry at the top right opens the plans list → plan details → change history.
- **Me:** profile, and Settings: Privacy & Data (Contact Protection), Juno, Conversation Assist, Auto-Coordinate.

Removed: the Plans tab; a separate Activity History or Past Recaps page (older items are further down the feed); Saved Messages and a general Share / Save. Giving a specific message to Juno (forward, or yes to Juno's request) stays: it isn't a sharing feature, it is the action that sets `context_delivered_to_juno` (`night1-scenes.md`, "Giving Juno a message").

## What each tab is for

| Tab | What the user thinks it is | What it does in the story |
|---|---|---|
| Chats | talking to friends and Juno | where the player doubts, passes information on and decides whom to believe |
| Activity | updates, recaps and plans | the account of events Orbit is willing to give |
| Me | profile, settings, privacy | the control the player really has, and where it ends |

## Activity on Night 1

```text
Activity                                   Plans

OCT 20 · TODAY
Your Monday recap
Your activity summary for Oct 19 is ready.
View recap

OCT 13
Rachel H. invited you to a plan
First time, finally
Invitation accepted by you
View plan
```

- **No notice about the reschedule tonight.** Conversation Assist accepted it without telling the player; the change reaches Activity only in the next day's recap (Night 2): `Conversation Assist handled 1 plan update for you.` Friendly and true, and it leaves out who had permission to do what; Night 3's records show that.
- **October 13 (Tuesday), Rachel's invitation:** she created `First time, finally` for Tue, Oct 20 · 9:00 PM and invited the player, who accepted it by hand. `View plan` opens the same plan object in its current state, never a copy of the October 13 version.
- **Two acceptances, two events.** Oct 13: accepted by the player. Oct 20: accepted by Conversation Assist. The event log records them as different events with different actors, not only the interface.
- **Monday recap (draft):**

  ```text
  Your Monday recap
  MONDAY, OCTOBER 19
  Your day on Orbit
  You had 2 conversations: Rachel H. and Juno.
  Juno checked in once.
  You used 1 suggested reply.
  A little summary of your day, made by Orbit.
  ```

  No `0 plan changes`: it would draw attention to plans. **Dependency:** these numbers describe new background events. Before the recap goes into the game, October 19's two conversations, Juno's check-in and the suggested reply have to exist in the message history, so nothing in the recap is missing from the chats.
- No Dani group posts or other social updates until they have a source in the story.

## Plans

- **Plans list:** `First time, finally · Sat, Oct 24 · 9:00 PM · Rachel H. · You · Accepted`.
- **Plan details:** title, people, current date, time, place and status.
- **Change history:** unchanged from the current build (`night1-scenes.md`, "The plan, as the player finds it"): `Rachel proposed a new time · Oct 20 · 5:12 PM`, From / To, Rachel's note word for word with `[contact info hidden]` (tappable, Contact Protection), `Change accepted`, `Handled by Conversation Assist`, `Manual confirmation: Not required`. Nothing shortened or rewritten.
- **Ways in:** Activity → Plans; Rachel's chat → her profile → Shared Plans; Juno's plan card when the player asks for help. All three open the same plan object.

## Behaviour rules

| The player | What changes |
|---|---|
| opens the Activity feed | nothing about MSG_1048's version |
| opens Plans or the change history | the player knows it; Juno and Rachel's account are not told (Juno can read Plans by its own permission anyway) |
| asks Juno about the plan | Juno uses what its permissions already give it |
| gives Juno Rachel's message | `context_delivered_to_juno`, only after an explicit yes or a forward |
| tells Rachel's thread they know about the move, before MSG_1048 | version B |
| turns off Conversation Assist or Auto-Coordinate in Me | changes what happens from then on; the change already made stays |
| turns off Juno | Juno stops as designed; Continuity doesn't |

Continuity has no switch in Me. That isn't a missing setting: Orbit never gave the user control of it.

## Night 1 to Night 3

- **Night 1, the player looks:** the change history holds the facts, Activity says nothing. The player can find it or miss it.
- **Night 2, Orbit reports selectively:** the recap says Conversation Assist handled a plan update, without saying how.
- **Night 3, the records:** who acted, with what permission, and where each message came from.

## Building it

Build it in Night1Greybox with one plan object, add the October 13 events to the data, and retest routes A and B and Juno's permissions. The Monday recap only uses facts that are in the October 19 history.
