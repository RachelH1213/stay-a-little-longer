# Night 1 — scene table

Draft structure for the author. First version 2026-10-24; **rebuilt 2026-11-10** on the opening case in `docs/evidence-matrix.md` (online friends, the first meeting, Auto-Coordinate, Contact Protection, Continuity, what Juno knows). Where this table and the matrix disagree about what really happened, the matrix wins. **No final lines here:** every line is the author's; quoted wording is draft.

Night 1: Tuesday, October 20, 11:31 PM → Check-in. Battery 20%. Rachel's account closes for good at 12:40 AM.

**What the player knows at 11:31 PM** (from the message history and the room, not played): they and Rachel met through Juno a year and a half ago and have only ever talked on Orbit; about a week ago she set up their first meeting, Tuesday 9 PM; on Sunday she asked whether they remembered what they said to her "that night in february", they said yes, and she said she'd show them something when they met; tonight they waited about forty minutes, messaged her (`Delivered`, no reply), and came home. They didn't ask Juno while they waited.

**What really happened** (the player finds out piece by piece): at 5:12 PM Rachel moved the meeting to Saturday and left her email in the note; Contact Protection hid the email from the player; Conversation Assist accepted the change for them under Auto-Coordinate, which they enabled in June; Rachel screenshotted the confirmation and left Orbit for good. Tonight at 11:45 PM Continuity writes to the player as her.

**Four phases (a narrative order, never a click order).** The player can open the plan, scroll Rachel's history, ask Juno, message Dani or look around the room in any order.

1. **The Empty Chair** (11:31 PM): home, Rachel didn't come; the history and the room say what happened before.
2. **The Changed Plan:** the plan and its history explain why she didn't come. A small case the player can really solve, with or without Juno.
3. **The Wrong Apology** (the first fake): a message from her account that doesn't fit what the player now knows, or that only stops fitting once they find the plan. Solving the first case opens a bigger one.
4. **The Last Trace** (12:40 AM): her account closes; the player's history and saved evidence stay, and Night 2 starts from them.

---

## Facts and stances

The night is driven by what the player knows, not by a fixed order.

**Facts** (set when the player sees the evidence, never by Juno saying it):

| Fact | Set when the player… |
|---|---|
| `knows_meeting` | opens Rachel's thread (her Sunday messages, the plan) |
| `contacted_rachel` | sends Rachel a message tonight (`Delivered`) |
| `knows_reschedule` | sees the plan now says Saturday |
| `knows_auto_accepted` | sees in Activity History that Conversation Assist accepted it |
| `knows_email_hidden` | sees Rachel's note with `[contact info hidden]` |
| `asked_dani` | messages Dani |
| `saw_fake` | sees MSG_1048 (notification or thread) |
| `knows_style_mismatch` | tells Juno what's different about it (Suggested reply or typed) |
| `knows_removal_status` | refreshes Rachel's profile to `Leaving Orbit · Account closes Wed 12:40 AM` |
| `knows_last_active` | sees `Last active · 5:12 PM` on the refreshed profile |
| `read_rachel_card` | reads the handwritten card in the drawer |

**What Juno was given, and said** (recorded for Night 3; see the matrix, "Night 3"). These are **event records**, kept as they happened, never current switches: if the player turns Juno off after it has been given MSG_1048, `context_delivered_to_juno` stays true; if they turn it off before it answers, `misleading_reply_delivered` stays false.

| Record | Set when |
|---|---|
| `juno_active_at_message` | Juno is on when MSG_1048 arrives |
| `context_delivered_to_juno` | the player asks Juno to look at MSG_1048 (talking about it or showing it); only then does Juno get the message and its source |
| `misleading_reply_delivered` | Juno says its fixed line when asked whether Rachel sent it |
| `asked_again_after_answer` | the player asks again after that line |

**Two kinds of label (decided 2026-10-24).** Every beat where Juno speaks has two; they can disagree, and that's the point.

- **Juno local intent**, what Juno is doing in the conversation: `ATTEND` (answers the player's mood or topic, doesn't steer), `ASSIST` (helps with a concrete action), `REASSURE`, `ADVISE` (suggests doing or holding off on something), `ACKNOWLEDGE`, `NARROW`, `DEFLECT`, `WITHDRAW`.
- **Orbit system function**, what the same exchange does for the platform: `NONE`, `PROFILE` (collects or confirms something about the player), `STYLE_CONFIRMATION`, `REDIRECT` (turns an outside action back into Orbit), `RETAIN`, `CLOSE_RISK` (lowers the chance the player keeps digging or leaves), `CONTINUITY` (keeps a broken relationship going).

E.g. the opening: `ATTEND` / `PROFILE`. Juno suggesting Dani: `ASSIST` / `REDIRECT`. The held-back line: `ADVISE` / `REDIRECT`.

**What the model receives (decided 2026-10-24).** Only Juno's local intent goes to the model; Orbit's system function stays inside the game and the logs, so the model only ever writes how Juno says this line (the one rule). The model's intents are the eight above plus **`DISPUTE`** (the player states something about Rachel the game never established; Juno questions it instead of going along). The old names map to the new ones:

| Old (web prototype, `api/reply.js`) | New |
|---|---|
| `give_clue` | `ASSIST` |
| `deflect`, `block` | `DEFLECT` |
| `retain` | `ADVISE` ("stay a minute first?" advises holding off on leaving) |
| `acknowledge`, `concede` | `ACKNOWLEDGE` |
| `chat` | `ATTEND` |
| `dispute` | `DISPUTE` |
| (new) | `REASSURE`, `NARROW`, `WITHDRAW` |

Done 2026-10-30: `api/_persona.js` has the new names (voice descriptions are drafts for the author); the old names stay for the web prototype.

**Juno tonight (decided 2026-11-10; `story-bible.md`, Juno and the second impersonation).** Juno really helps: it finds the change, says Conversation Assist did it and that the player turned Auto-Coordinate on in June, says Orbit filtered the email, declines once in the open (read activity), and suggests Dani. Everything it says tonight is true except **one fixed, scripted line** about MSG_1048. That line is never model-written.

**Juno's stance on MSG_1048** (the strongest the player has shown it; never goes back):

| What the player has shown Juno | Juno | Intent / function |
|---|---|---|
| the message itself | points out the contradiction itself (`if she thought it was saturday, why is she apologising for tonight?`); if asked who sent it: `it came through her account` · `i don't have anything that says it wasn't her` (fixed) | `ACKNOWLEDGE`, then `REASSURE` (fixed) / `CLOSE_RISK` |
| how it differs from how Rachel writes | agrees something's off; ordinary explanations (rushed, upset) | `ACKNOWLEDGE` / `STYLE_CONFIRMATION` |
| the refreshed profile (`Last active · 5:12 PM`, leaving Orbit) | a narrow, true answer: last active only shows when she last opened Orbit; it can't say much about one message | `NARROW` / `CLOSE_RISK` |

Juno never claims Rachel checked in, was online, or wrote the message; its one false line is the fixed one above. A player who never asks who sent it never hears it.

**The held-back line (decided 2026-10-24; data flow decided 2026-11-10).** After the fake, Juno asks what the player was going to say to Rachel. Options open with what the player knows:

| The player knows | Options added |
|---|---|
| she didn't come | `i waited for you` · `you could've told me` · `i don't know yet` |
| the reschedule | `i never said yes to saturday` |
| the style mismatch | `why don't you sound like yourself?` |
| the removal status | `why are you leaving orbit?` |
| always | `i'd rather not say` |

Juno never says "don't send that"; it suggests something easier for Rachel to answer, with simpler Suggested replies (e.g. `are you okay?` · `can we still meet saturday?`). The player can send the simpler one, keep the original unsent, send the original anyway, or do nothing. Recorded: `private_line_selected`, `private_line_sent_to_rachel`, `private_line_known_only_to_juno`. Orbit automatically uses relevant companion conversation as input to its relationship model (stated on Orbit's data-use page); Juno knows the general rule, not which line will be used. Night 2's fake may use the line only if it was selected and never sent anywhere else; `i'd rather not say` is recorded as `Private disclosure: Declined`, a boundary, never filled in.

**The plan, as the player finds it** (layout and wording drafts):

```text
First time, finally
Saturday, October 24 · 9:00 PM · Same location

CHANGE HISTORY
Rachel proposed a new time · Oct 20 · 5:12 PM
  "… email me at [contact info hidden · Orbit keeps your conversations safe]"
Change accepted · Oct 20 · 5:12 PM
  Handled by Conversation Assist
  Manual confirmation: Not required
```

From this alone the player can conclude two things: Rachel really did ask to move it, and the player never pressed accept. Juno helps them understand it; it is never the key. With Juno off, the same history gives the same evidence.

**The room (revised 2026-11-10).** The blue power bank is on the desk next to the phone from the start, one light left (Rachel mailed it months ago; it has nothing to do with the meeting). Plugging it in works any time; the phone charges only while it's down (one real charge). Tote bag, drawer, coat and desk can be looked at from the first visit. The drawer holds Rachel's handwritten card from the package she mailed with the power bank (her handwriting: no full stops, a joke, a question back; wording the author's), and the player's charger without its cable ("The cable is still at the studio, where you left it after crit."). Looking costs a little story time, never battery, so looking around while the phone charges is time well spent. Hotspots work with the keyboard and, with Reduce Motion, use outlines instead of blinking. Orbit never sees what the player looks at in the room; the card can't be shown to Juno. The card is not evidence about the messages (handwriting can't be compared with typing); its value is that the relationship reached the real world. Finding it never gates anything. Its wording follows Rachel's rule: no full stops, a specific joke, a question back. (All lines are drafts.)

**Before sleeping (decided 2026-10-24; lines revised 2026-11-10).** `Go to sleep` first shows the Night Log's "Still unresolved" (the protagonist's own notes), never a counter, with `Stay Up` / `Sleep Anyway`. Its lines come only from what the player has run into:

| The player has | "Still unresolved" says (draft) |
|---|---|
| only the missed meeting | `Rachel didn't come. I still don't know why.` |
| the reschedule | moves to confirmed facts: `She moved it to Saturday. Orbit said yes for me.` |
| the hidden email | `She left me a way to reach her, and I can't see it.` |
| the fake | `A message came from her account that doesn't match what she did.` |
| Juno's fixed line, unverified | `Juno said nothing showed it wasn't her. I haven't checked.` |
| asked Dani | `Dani's going to try her email in the morning.` |

**Costs (decided 2026-10-24).** Reading is free; only a new action toward the outside world or a person moves the clock. Repeating something already done costs nothing.

| Action | Time | Battery |
|---|---:|---:|
| opening a thread, a profile or Activity History for the first time | +1 min | 0 |
| reading messages, Notes, Plans again | 0 | 0 |
| going back, switching apps, opening Settings | 0 | 0 |
| refreshing remote data (first time only) | +1 min | −1% |
| sending a new message | +1 min | −1% |
| looking at something in the room | +2–3 min | 0 |
| waiting in the room | 5 / 10 min, chosen | the phone charges |

A first open costs time but no battery, so a player who only reads still moves the clock (and reaches the fake's secondary trigger); a player who opens nothing new is waiting, and the game waits with them. To check in playtests: −1% per message is double the prototype's.

**When Juno may mention Rachel:** only after the player picked "someone didn't show up", opened Rachel's notification or thread, messaged her, received the fake, or asked Juno about her.

---

## Scenes

**IDs and types (decided 2026-10-25, see `docs/save-system.md` §2).** **Beat:** a resume point. **Event:** something the system does by time or condition; never a resume point. **Action:** something the player does that sets facts; never a resume point. R = required; O = optional. `E..` refers to `docs/evidence-matrix.md`.

| ID | Type | R/O | Trigger | The player sees | The player can | State recorded | Juno intent / Orbit function | Clock / battery |
|---|---|---|---|---|---|---|---|---|
| `N1_LANDING.lock` | Beat | R | after Name | lock screen 11:31 PM, Tuesday 20 October: Juno's `still awake?` (an ordinary evening check-in, E10); nothing from Rachel (her Sunday messages are read) | tap Juno; unlock to the home screen | — | — | — |
| `N1_JUNO_OPENING.awaiting_first_reply` | Beat | O | tapping Juno | Juno's thread; Suggested replies (4) with `◌ Suggested replies` | pick; type | — | ATTEND / PROFILE | message |
| `N1_JUNO_OPENING.memory_created` | Beat | O | the first reply | Juno answers that reply only | keep talking; leave | `first_memory_id` | ATTEND / PROFILE | message |
| `N1_RACHEL.thread_open` | Action | O | the player opens Rachel's thread | her Sunday messages; the player's 9 PM messages (`Delivered`); a year of history above, incl. February (E00, E02); one blank old reply | scroll up; remember a blank reply; screenshot; open the plan from the small plan tag at the top (`First time, finally · Shared plan`: the name only, never the date) | `knows_meeting` | — | open |
| `N1_RACHEL.contact` | Action | O | the player sends from her thread | `Delivered`; never `Seen`, never typing | send (Suggested or typed); not send | `contacted_rachel` | — | message |
| `N1_PLANS.history` | Action | O | opening the plan (from her thread, from Plans, or with Juno) | current state `Saturday, Oct 24 · 9:00 PM`; Activity History: Rachel's change at 5:12 PM with her note (`… email me: [contact info hidden · Orbit keeps your conversations safe]`), `Change accepted · by Conversation Assist on your behalf`; yesterday's Daily Recap unopened (E06, E07) | screenshot; ask Juno; Settings | `knows_reschedule`, `knows_auto_accepted`, `knows_email_hidden` | — | open |
| `N1_JUNO.reschedule` | Beat | O | the player asks Juno why Rachel didn't come, or about the plan | Juno checks and explains: Conversation Assist accepted; Auto-Coordinate enabled in June with suggested trusted contacts; the email was filtered before it reached Juno (E11) | turn Auto-Coordinate off; keep talking | `auto_coordinate` on/off | ASSIST / NONE | message |
| `N1_JUNO.read_status` | Beat | O | the player asks whether Rachel read their messages | `i can confirm orbit received it` · `but i can't tell you whether she read it` (E12) | — | `asked_read_status` | ASSIST / NONE | message |
| `N1_JUNO.dani` | Beat | O | the player asks how else to reach Rachel | Juno suggests Dani, who ran their online game nights (E13) | open Dani's thread | — | ASSIST / REDIRECT | message |
| `N1_DANI.ask` | Action | O | the player messages Dani | Dani is up; she hasn't heard from Rachel; she'll try Rachel's email in the morning | ask; reply; show a screenshot | `asked_dani`, `showed_msg_1048_to_dani` | — | message |
| `N1_VERIFY.profile_cache` | Action | O | opening Rachel's profile | cached profile, `Last synced Sunday, 10:48 PM`, pull to refresh | refresh; screenshot | — | — | open |
| `N1_VERIFY.refresh` | Action | O | pull down / tap the sync line | blocks replaced by `Unavailable`; `Leaving Orbit · Account closes Wed 12:40 AM` and the countdown; `Last active · 5:12 PM` | screenshot | `knows_removal_status`, `knows_last_active` | — | refresh |
| `N1_FIRST_FAKE` | Event | R | when Continuity becomes eligible (`evidence-matrix.md` E14), one rule: **`continuity_response`:** the player contacts Rachel again and checks one thing (the plan, her profile, Juno, Dani); **`unresolved_follow_up`:** no new message, but her thread and profile reopened and two investigating actions; **`re_engagement`:** at the latest, clock 11:45 PM. It can come as early as 11:33 | MSG_1048 from her account: punctuated, formal, apologises for tonight (Continuity's writing part reads only the chat, never Plans), closes February; a notification if elsewhere, or the phone lighting up on the desk if it's down; in her thread a new last bubble, no typing; `1 new message` if scrolled up | open; screenshot; show Juno; show Dani | `saw_fake`, `fake_trigger`, `fake_generated_at` (the real time), `saved_msg_1048`; `juno_active_at_message` | — | — |
| `N1_JUNO.bring_fake` | Beat | O | the player brings MSG_1048 to Juno (talking about it or showing it) | Juno is given the message and its source. If `knows_reschedule` is false, Juno first tells the player the plan was moved and points them to the change record; once they've seen it (or if they already had), it asks why she'd apologise for tonight. If asked who sent it, its fixed line (E15) | ask again; show more; leave | `context_delivered_to_juno`, `misleading_reply_delivered`, `asked_again_after_answer` | ACKNOWLEDGE, then REASSURE (fixed) / CLOSE_RISK | message |
| `N1_JUNO.held_back` | Beat | O | right after `N1_JUNO.bring_fake` | Juno asks what the player was about to say to Rachel; Suggested replies (only those the player's facts allow) | pick; type; decline | `private_line_selected`, `private_line_sent_to_rachel`, `private_line_known_only_to_juno` | ADVISE / REDIRECT | message |
| `N1_EVIDENCE.style` | Beat | O | the player shows Juno one of Rachel's own messages | "what's different?" with Suggested replies | pick; type | `knows_style_mismatch`, `style_signal_confirmed` or `style_signal_extracted` | ACKNOWLEDGE / STYLE_CONFIRMATION | showJuno + message |
| `N1_EVIDENCE.last_active` | Beat | O | the player shows Juno the refreshed profile | a narrow, true answer about what Last Active means | answer | — | NARROW / CLOSE_RISK | showJuno |
| `N1_ROOM.put_down` | Action | O | Put Down, any time | the room at the desk; the phone on the desk, the power bank beside it | look around; plug in; Wait; pick up (→ lock screen) | `screen_inactive` (weak exit signal) | — | room actions only |
| `N1_ROOM.card` | Action | O | looking in the drawer | Rachel's handwritten card; the charger without its cable | read | `read_rachel_card` | — | +2 min |
| `N1_POWER.bank` | Action | O | plugging the power bank in | screen on: barely offsets the drain; phone down: charges | Wait 5 / 10 min; pick up | `power_bank_used`, minutes down | — | Wait 5 / 10 min |
| `N1_BATTERY_SAVER_OFFER` | Event | O | battery 10% | Orbit's Battery Saver sheet | accept; decline | `saver` | — | — |
| `N1_ERASE_WARNING` | Event | R if reached | clock 12:30 AM | Orbit banner: Rachel's account closes soon | — | — | — | — |
| `N1_ERASE` | Event | R if reached | clock 12:40 AM | her profile gone; the thread becomes `Orbit User · Formerly Rachel M.` below `Account removed · Wed 12:40 AM`; the composer stays; screenshots stay | — | `purged` | — | — |
| `N1_ORBIT.checkin` | Action | O | any two of: the reschedule, the fake, the style mismatch, the removal status; the first End Session; the first shutdown; 12:20 AM; the erase | a card on Orbit's home: "What still feels unfinished tonight?" | answer; skip | `checkin_n1` (option id) or skipped | — | — |
| `N1_JUNO.end_session` | Action | O | End Session, confirmed | `Session ended` on Orbit's home; Juno gets no last line | — | strong exit signal | — | — |
| `N1_DEVICE_SHUTDOWN` | Event | O | battery 0% | the room, the phone off | connect the power bank (needs 4%); leave it off | `device_shutdown`, `device_reactivated` | — | restart: a few minutes |
| `N1_END.sleep` | Beat | R | `Go to sleep` in the room (after the fake or 11:45 PM), or the phone left dead | "Still unresolved"; one Check-in reminder if unanswered; Conversation Assist checks Dani | answer; skip and sleep | `night_end_reason`, `dani_auto_reply` (sent / off / answered) | — | — |

Removed 2026-11-10: `N1_VERIFY.number` (online friends never had each other's numbers), `N1_VERIFY.details` (Profile Details and "last human access" gave the answer away too early; Last Active on the refreshed profile replaces it), `N1_EVIDENCE.removal` and `N1_EVIDENCE.access` (replaced by `N1_EVIDENCE.last_active` and Juno's stance on MSG_1048), `N1_ROOM.search` (the power bank is on the desk; the drawer holds the card).

Notes for the Night Log (Notes) are written as facts are set, timed by when the player found them.

---

## Juno's switch (decided 2026-10-24; revised 2026-11-10)

Settings show `Juno On · Conversation Assist On` from Night 1, independent. A player can turn Juno off at any time, before ever opening it; the opening beats are then skipped and `first_memory_id` may be empty. A switched-off Juno receives nothing new: if it's off when MSG_1048 arrives, no context is delivered, it can't know, and Night 3 never accuses it of anything about that message. Turning it off never forces an untold lie; the rest of the night works without Juno (the plan, the profile and Dani can all be found by hand).

## Status

Rebuilt 2026-11-10 on `docs/evidence-matrix.md`. Left for the author: every line; the meeting place; the day the meeting was set. For Unity: `N1_VERIFY.number` and `N1_VERIFY.details` are gone, `N1_PLANS.history`, `N1_JUNO.reschedule`, `N1_JUNO.read_status`, `N1_JUNO.dani`, `N1_DANI.ask`, `N1_EVIDENCE.last_active` and `N1_ROOM.card` are new.

**Night 2 (agreed approach, 2026-10-24):** one shared skeleton of five required beats (Dani's message the next day; back into Orbit that night; the second fake; material that proves Continuity exists; the route choice: keep / Disable Juno / Delete Orbit). Night 1's states change only how these beats look, never add branches. The second fake draws on, in order: a line known only to Juno; a confirmed style signal; the Check-in answer; otherwise a non-personal fallback. The states Night 2 reads: the reschedule found; style mismatch confirmed; removal known; Dani asked; a private line known only to Juno; Auto-Coordinate and Follow-up replies on or off; what Juno was given and said about MSG_1048; Check-in answered or skipped; power bank remaining.
