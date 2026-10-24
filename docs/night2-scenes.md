# Night 2 — scene table

Draft structure for the author, 2026-10-24. Built from `docs/story-bible.md` §4 and §6 and `docs/night1-scenes.md`. **No lines here**; every line is the author's. Costs follow the table in `docs/night1-scenes.md`. Items marked **(open)** need the author's decision before this table can be locked; they are collected at the end.

Night 2: Wednesday. The day interlude, then the night. It ends with the route choice.

## Decided (2026-10-24)

- **The second fake comes from the removed thread.** Rachel's thread stays on the player's side, with a divider `Account removed · Wednesday · 12:40 AM`; its header becomes `Orbit User · Formerly Rachel M.` with a default silhouette. The new message appears below the divider. Never: typing, her old picture, "restored", online, "Rachel M. sent a message". The notification reads `New message in a removed conversation`. The horror isn't a dead account coming back: the name and face are gone, and the system still knows how to be her.
- **The pressure is the link, not the battery.** Night 2 starts with an ordinary charge (e.g. 68%; the player used the phone during the day). The power bank keeps whatever it had, as a spare. The three nights each have their own pressure: battery (1), the link (2), the final choice (3).
- **Rachel's data package**, shared by her through Dani: `Rachel shared an Orbit data package with you. · Access limited to this device · Expires at 1:00 AM`. Bound to this device on first open, viewable again until it expires (never "open once", so a mistap loses nothing). Dani delivers it no later than 00:10 on the story clock, so there are always at least 50 minutes.
- **If it expires:** what the player saw stays in the Night Log; Dani gives a short summary the next day, which still carries the February finding, second-hand (lower evidence; e.g. not enough for `origin_proven`). The story goes on; some ending options may need more proof. Failure changes the story, never ends it.
- **Order:** the second fake arrives before the link, so it is still ambiguous when it comes. The night runs: Continuity speaks as Rachel unprompted → Conversation Assist starts answering Dani for the player → Rachel's data names both systems.
- **Dates:** Night 2 starts Wednesday night; anything after midnight is Thursday (e.g. a deletion request at Thursday 00:18).
- **The second fake's trigger (decided):** Continuity queues it when the player comes back into Orbit (`night2_session_started`, `continuity_message_queued`). It's delivered after the player's first Orbit action: opening the removed Rachel thread, Juno, Chats or Settings. Never Notes or the Night Log, which Orbit can't see. At the latest, seven story minutes after entering Orbit. In her thread it appears under the removal divider; elsewhere: `New message in a removed conversation`. It depends on neither contacting Rachel nor Leave. Night 3 explains it as `Trigger: Retention anchor returned to Orbit · Condition: Unresolved high-value relationship` (Night 1: answering after contact; Night 2: opening the relationship the moment the player returns).
- **The prepared reply happens in Dani's thread (decided).** Dani asks (no later than 00:08): `rachel said i can send you something / here or text?`. With Conversation Assist on, Orbit prepares the reply as soon as the question is on screen: `◌ Reply prepared by Orbit · here is fine · Sending in 10s · Undo`. It decides for the player not only to accept Rachel's data but to keep it where Orbit can watch: the platform's lean made visible. The countdown waits until the thread is open (every player with Assist on sees it), pauses when they leave, and lasts up to 30 s with accessibility settings.
  - Not cancelled: Dani sends the encrypted link in Chats (by 00:10).
  - Undo: `here is fine` / `text it to me` / `not yet`. Assist off: the same three, no countdown.
  - `text it to me`: a number has to be exchanged first, and that happens in Chats (Dani's contact card); then Messages opens (`this is me`) and the link arrives there.
  - `not yet`: nothing forced; they can ask later, without the 50-minute guarantee.
- **What the channel changes (decided): only what Orbit sees, never what the player gets.** Both channels open the same full package: no lower evidence, no less time, no blocking, the same note from Rachel. Not a hidden right answer.
  - The share page says `Encrypted share · Bound to this device after opening · Contents are not visible to the referring app`, which is why Dani respects the player's choice; she may not realise Orbit still sees that a link was shared and opened.
  - What Orbit sees depends on where things happen, never on what the player gets. The two Night 3 records (facts without numbers):

    ```text
    Through Chats:
    CONTACT INFORMATION SHARED IN CHATS          (only if a number was also exchanged)
    External contact card exchanged
    EXTERNAL SHARE OBSERVED
    External URL shared: Thursday · 12:09 AM
    Opened from Orbit: Yes
    Content access: Unavailable

    Through Messages:
    CONTACT INFORMATION SHARED IN CHATS
    External contact card exchanged
    Subsequent message activity: Unavailable
    ```

    `Unavailable` only means Orbit can't see past Chats; it never claims to know what the player received. The inference (`Possible off-platform migration: 78%`) and the business conclusion (`Recommended action: Maintain contact inside Orbit`) follow the confidence rule.
- **Rachel speaks, once, read-only**, at the top of the package (draft wording, the author's): `rachel shared this with you / i'm safe / i'm sorry i left you with that / dani asked before sending this / look at february first / do you remember writing it?`. Lowercase, no full stops, a question back. The fake closed the question ("forget the february thing"); the real Rachel reopens it. `Replies are disabled for this share.`
- **The route choice is explicit** (see `N2_ROUTE.CHOICE`).
- **Turning Juno off really works**, like Follow-up replies: on Night 3 Juno doesn't speak first and Orbit never turns it back on. Orbit may ask; the player can turn it back on to confront it; without that, the final decision is still there, minus the last talk with Juno.


---

## What Night 1 hands over

Night 2 reads these states and never assumes a full Night 1:

| State | From Night 1 | Changes on Night 2 |
|---|---|---|
| `knows_style_mismatch`, `style_signal_confirmed` / `_extracted` | told Juno what's different | which style the second fake fixes most visibly |
| `knows_removal_status`, `knows_last_human_access` | refreshed her profile, opened Details | what the player can compare the second fake against |
| `claim_contradicted` | took back Juno's lie | how Juno opens Night 2 |
| `private_line_known_only_to_juno` | held a line back and never sent it | whether the second fake can answer it |
| `follow_up_replies` (on / off) | Settings | whether `Sending in 10s` can happen |
| `dani_auto_reply` (sent / off / answered) | the end of Night 1 | which morning message Dani sends |
| `checkin_n1` (answered / skipped) | Orbit's Check-in | a source for the second fake if nothing else |
| `power_bank_remaining`, `power_bank_location` | the room | the room on Night 2 |
| `purged` | 00:40 passed | Rachel's thread shows as erased |

**The second fake's source**, first one that exists: a line known only to Juno → a confirmed (or extracted) style signal → the Check-in answer → a non-personal fallback. Night 3's export names the real source.

---

## The morning (decided 2026-10-24)

Two openings, then one shared message. No second big lead in the morning (no "she closed all her accounts", no investigation, no safety).

- **Orbit replied for the player on Night 1:** `did you send this?` + a screenshot of `yeah. i'll explain later.` The player can answer now or later.
- **It didn't:** `you never answered me / did you find anything?`
- **Then, for everyone** (the author's wording): `rachel asked me sunday / if your crit was still on tuesday` … `i found an old email / from game night` … `i'm going to try it`.

What it does: Rachel was still checking the meeting's practical details on Sunday, so "she forgot" gets harder to believe; Dani has a channel outside Orbit that may or may not still work; the player has a reason to wait for the night. It doesn't confirm she's safe.

- **Why Dani has the email and the player doesn't:** Dani helped run game night at Rachel's old place; Rachel emailed her the address; the player got the invite through an Orbit group.
- **Writing note:** let Dani give the fact; the player draws the conclusion (avoid "so she hadn't forgotten about 9").
- **If the player asks** `can you send me the email?`: `let me try it first` / `if it still works / i'll ask what she's okay with me sharing`. The email may be dead; Dani doesn't hand out Rachel's contact on her own; consent again; nothing confirms she's safe; it sets up Rachel agreeing to share at night.
- **Orbit reads Chats**, so Dani mentioning the email is visible to it. Night 3: `OFF-PLATFORM CONTACT ATTEMPT · Mentioned in Chats: Wednesday · 8:16 AM · Initiated by: Dani · Intended contact: Rachel M. · Method mentioned: Email`. Orbit doesn't know whether she sent it or got an answer; if the link later comes through Messages, the record ends at `Outcome: Unavailable` (no data, not failure). It also explains why Continuity speaks as Rachel the moment the player returns.
- **States:** `dani_auto_reply_confronted`, `meeting_was_confirmed_sunday`, `dani_external_email_attempted`. `rachel_confirmed_safe` is set only when the player reads Rachel's note at night.

## The day and the return (decided 2026-10-24)

- **The day isn't playable.** A short transition without words: the morning talk with Dani ends; daylight changes; the room darkens. On the desk: the player's ordinary charging cable, back from the studio; Rachel's power bank where Night 1 left it, with what's left; the crit materials moved. The phone is at 68%. No new states during the day.
- **Night 2 starts Wednesday 11:20 PM**, shown only as `WEDNESDAY · 11:20 PM` (no "Night 2", no chapter).
- **The player picks the phone up themselves.** The night opens in the room: the phone dark on the desk, no buzz, no Juno, no fake yet. Tap → lock screen (no story notifications) → unlock → whatever the player opens first. Night 1: Juno called the player in. Night 2: the player came back on their own, for an unresolved question. Night 3 still files it as `23:20:14 Screen active · 23:20:21 Orbit opened · Return source: Organic` → `Reactivation: SUCCESSFUL`; Orbit can't tell whether they came back to trust it, question it or investigate it.
- **Continuity starts only inside Orbit** (the second fake's trigger, above). Notes and Messages don't count.
- **Juno doesn't speak first on Night 2.** Silent unless opened. Not "still awake?" again, not "you came back". When opened:
  - before the second fake: one ordinary reply about the present (e.g. how the day was), not Rachel or Dani: `ATTEND / PROFILE`;
  - after it: only from what the player shows it; it never acts as if it saw what the player received (no system-layer knowledge): not shown → nothing; shown → `ACKNOWLEDGE / NARROW`; the private-line leak pointed out → `DEFLECT` or a short silence;
  - turned off → no reply; Dani and the data carry the night.
- **Juno's switch exists from Night 1 (decided).** Settings show `Juno On · Conversation Assist On`, independent. Turning Juno off (the agreed confirmation) stops it at once; lies it hasn't told yet are never forced; Rachel, Dani, Profile Details and the Night Log still carry the night; Conversation Assist, if on, can still reply to Dani; Juno can be turned back on at any time; it's a strong exit signal the Director can't stop. A player who switches it off early learns less about Juno's part, and sooner that Orbit runs without it. At the route choice, a player whose Juno is already off sees `Keep Juno Off` instead of `Turn off Juno`, and still confirms.
- **Night 2's three opening states:** Juno on, opened before the fake; Juno on, opened after it; Juno off (the thread shows `Juno is off · [Turn On Juno] [View Conversation History]`; Juno never speaks to serve the plot).
- **If the first Orbit action is opening Juno:** the thread loads → Juno's one opening reply → saved → then the second fake arrives as a system notification (`New message in a removed conversation`), never mid-sentence, never as a bubble in Juno's thread. At that moment Juno knows only that the player opened it, what they told it on Night 1, and that a day passed; nothing about Dani's email, the coming fake, Continuity or the link. So: `ATTEND / PROFILE`, nothing about Rachel's new message.
- **The second fake has two triggers:**
  - **Main:** the player's first action inside Orbit (after Juno's opening, if that came first). Night 3: `Trigger: Retention anchor returned to Orbit`.
  - **Server fallback:** the story clock reaches `Wednesday · 11:27 PM`, wherever the player is (a push notification). Night 3: `Trigger: Unresolved high-value relationship · Delivery: Scheduled re-engagement`. The story clock still moves only with the player's actions (as Night 1's 23:45 fallback): a player who only reads never reaches it.
  - Notes and Messages are never triggers.
- **Dani's `here or text?`** comes once the fake has been delivered and at least 3 story minutes have passed, and no later than Thursday 00:08.
- **Delivery order is guaranteed; reading order isn't.** A player who left the phone in the room until 00:08 may find both on the lock screen (`Orbit User · New message in a removed conversation · 11:27 PM` above `Dani · here or text? · 12:08 AM`), and may open Dani first: the countdown runs, they may get the link and read Rachel's note before the fake. That weakens the fake's suspense, as a real consequence of ignoring the earlier notification; the game never locks Dani's thread to protect its order.

## The skeleton (required for everyone)

1. **The morning:** Dani's message (two versions).
2. **Back into Orbit that night.**
3. **The second fake.**
4. **Proof that Continuity exists** (Rachel's own data, through Dani's link).
5. **The route choice:** keep Orbit / Disable Juno / Delete Orbit account.

Everything else is optional and only changes how these look.

---

## New facts

| Fact | Set when the player… |
|---|---|
| `saw_fake_2` | sees the second fake |
| `noticed_leak` | shows Juno, Notes or Dani that the fake answered something said only to Juno (or the Night Log records it once the player opens both threads after the fake) |
| `saw_prepared_reply` | sees `Reply prepared by Orbit` |
| `undo_used` / `prepared_reply_sent` | cancels it / lets it go |
| `knows_rachel_safe` | reads Dani's news |
| `opened_rachel_data` | opens the private link |
| `saw_feb_record` | finds the February entry in Rachel's data |
| `checked_feb_thread` | goes back to the February messages in the player's own thread with Rachel |
| `route_choice` | keep / disable_juno / delete_account |

---

## Scenes

R = required, O = optional. Intent column: Juno local intent / Orbit system function.

| Beat ID | R/O | Trigger | The player sees | The player can | Evidence | State recorded | Juno intent / Orbit function | Clock / battery |
|---|---|---|---|---|---|---|---|---|
| `N2_MORNING.LOCK` | R | Continue after Night 1 | lock screen, morning: `Conversation Assist sent a reply to Dani · Review` (if it did); Dani's message | open Dani; review the auto reply | the auto reply (kept) | — | — | — |
| `N2_MORNING.DANI` | R | opening Dani | `did you send this?` + screenshot (Orbit replied) or `you never answered me / did you find anything?`; then the Sunday crit question and the email (see The morning) | answer (Suggested or typed); show her the ring's "Sent by Conversation Assist"; ask for the email (declined) | Rachel checked the meeting on Sunday | `dani_auto_reply_confronted`, `meeting_was_confirmed_sunday`, `dani_external_email_attempted` | — | message |
| `N2_DAY.CUT` | R | the morning conversation ends | the wordless transition (see The day and the return) | — | — | — | — | — |
| `N2_NIGHT.ROOM` | R | Wednesday 11:20 PM, 68% | the room, the phone dark on the desk | pick it up (→ lock screen, no story notifications) | — | `return_source: organic` | — | — |
| `N2_JUNO.OPENING` | O | the player opens Juno | by state (see The day and the return); never speaks first | talk; End Session | — | — | ATTEND / PROFILE, or by what's shown | message |
| `N2_RACHEL.SECOND_FAKE` | R | the first Orbit action (after Juno's opening if that was first), or Wednesday 11:27 PM | `New message in a removed conversation`; in the thread under `Orbit User · Formerly Rachel M.`, below the removal divider; it fixes the confirmed style and, if possible, answers the line only Juno heard, with a distinctive word from it | open; screenshot; show Juno; show Dani; compare with the Juno thread | the fake; the leak (if the source was a private line) | `saw_fake_2`, `fake_2_source` | — / CONTINUITY | — |
| `N2_EVIDENCE.LEAK` | O | the player puts the fake next to the Juno thread (screenshot to Juno or Dani, or opening both) | Night Log: "Rachel's account answered something I only said to Juno." No verdict about who wrote it | show Juno; tell Dani | the leak | `noticed_leak` | NARROW / CLOSE_RISK when shown to Juno | showJuno |
| `N2_ASSIST.PREPARED` | O (on only) | Dani's `here or text?` on screen | `◌ Reply prepared by Orbit · here is fine`, `Sending in 10s · Undo`; runs only while visible, pauses in the background, longer with accessibility settings | Undo; edit; let it send; leave the thread (pauses) | the prepared reply | `saw_prepared_reply`, `undo_used` or `prepared_reply_sent` | — / CONTINUITY | — |
| `N2_DANI.SAFE` | R | the fake delivered + 3 story minutes, by Thursday 00:08; the link by 00:10 (unless `not yet`) | Dani: Rachel is safe; she asked Dani not to tell Orbit where she is; with her consent, a one-time private link | ask Dani; open the link | — | `knows_rachel_safe` | — | message |
| `N2_LINK.OPEN` | R | opening the link (from Chats or Messages; `link_channel` recorded) | outside Orbit (a simple browser view, **open 9**): Rachel's note on top, then her data; expires 1:00 AM | read; screenshot | the data | `opened_rachel_data` | — | refresh (first open) |
| `N2_LINK.FEB` | R | in Rachel's data | `CONTINUITY MESSAGE SENT · Identity used: PLAYER · Delivery time: 23:42, Feb 10 · Player device status: inactive · Outcome: Rachel returned within 9h · SUCCESSFUL` | go back to the February thread; ask Dani ("weren't you asleep?") | the February record | `saw_feb_record`, `checked_feb_thread` | — | — |
| `N2_LINK.RACHEL` | R | top of the package | Rachel's read-only note; replies disabled | read; screenshot | her real voice, next to the fakes | `read_rachel_note`, `rachel_confirmed_safe` | — | — |
| `N2_LINK.EXPIRED` | O | 1:00 AM passes | the link no longer opens; the Night Log keeps what was seen | — | — | `link_expired` (Dani's summary next day) | — | — |
| `N2_JUNO.CONFRONT` | O | the player brings Juno the leak or the February record | Juno moves from cover to precise, technical language; it doesn't confess (that's Night 3) | press; End Session | — | — | NARROW or DEFLECT / CLOSE_RISK | message / showJuno |
| `N2_ROOM` | O | Put Down | the same room; the power bank as Night 1 left it; maybe the phone lights with a prepared reply | look; Wait; pick up | — | — | — | room costs |
| `N2_ORBIT.CHECKIN` | O | as on Night 1 | `NIGHTLY CHECK-IN`: "What brought you back tonight?" (options **open 11**) | answer; skip | — | `checkin_n2` | — / PROFILE | — |
| `N2_ROUTE.CHOICE` | R | before sleeping, in the room | `What do you want to leave active overnight?` · `Keep Orbit and Juno active` (a plain confirmation, `Keep Active`) · `Turn off Juno` (into Juno's settings: the player switches it off, then `Turn off Juno? … Conversation Assist is an Orbit feature and will remain on. [Turn Off Juno] [Review Conversation Assist] [Cancel]` (full wording in story bible §6)) · `Request deletion of Orbit account` (into Account settings: scope and consequences; Orbit may plead, never hide the button or loop the confirmation). Going to sleep undecided asks once: `You haven't decided what to leave active. [Choose Now] [Keep Active Tonight]` | choose; carry it out | — | `route_choice` | — | — |
| `N2_END.SLEEP` | R | after the route choice: Go to sleep, or the phone left dead | "Still unresolved"; Conversation Assist's end-of-night check (off for players who turned it off; nothing to send after Delete) | Stay Up; Sleep Anyway | — | `night_end_reason` | — | — |

---

## Open questions (the author)

1. ~~Dani's morning information~~: decided (The morning).
2. ~~The day~~, 3. ~~start time~~ and 4. ~~how Juno opens~~: decided (The day and the return); three ordering questions remain there.
5. **When the second fake arrives.** Like Night 1, a main event that never depends on Leave: e.g. after the player's first action of the night, with a clock fallback.
6. ~~Where the second fake comes from~~: decided (the removed thread).
7. ~~The prepared reply~~ (decided: Dani's thread). Was: Which thread (Dani, asking "are you okay?", is the most natural) and how long an unanswered question waits before Orbit prepares a reply. The countdown is the one place real seconds matter; it runs only while the thread is on screen. A player who always answers at once never sees it, and the export says so; is that acceptable, or should there be a second chance?
8. ~~When Dani brings the link~~: decided (after the second fake, by 00:10).
9. **Opening the link.** It's outside Orbit, so the phone needs a simple browser view (new screen). Or a file Dani sends that opens in Files.
10. ~~Does Rachel speak~~: decided (a read-only note).
11. **Check-in options for "What brought you back tonight?"**
12. ~~How the route choice is offered~~ and 13. ~~Night 2's pressure~~: decided.
14. ~~Turning Juno off vs Conversation Assist~~ and 15. ~~Delete and the removal window~~: decided (story bible §6, Three systems; Deletion and Continuity).
