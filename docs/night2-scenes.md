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
  - **Through Chats**, Orbit sees that Dani shared an external URL, when, the domain, that it was opened from Chats, and whether the player came back; never Rachel's note, February, the logs, or where the player stopped reading. Night 3: facts without numbers (`EXTERNAL SHARE OBSERVED · Source: Dani · Channel: Orbit Chats · External URL shared: Thursday · 12:09 AM · Opened from Orbit: Yes · Content access: Unavailable`), the inference with one (`Possible off-platform migration: 78%`), the business conclusion without (`Recommended action: Maintain contact inside Orbit`).
  - **Through Messages**, Orbit sees only the number being shared in Chats (`Contact information shared in Chats`) and that the player left Orbit for a while; nothing about the link. The report never says anything was "hidden" (Orbit can't know what it didn't see); the feedback is the missing section.
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
| `N2_MORNING.DANI` | R | opening Dani | `did you send me this?` (Orbit replied) or `you never answered. did you find her?`; then Dani's new information **(open 1)** | answer (Suggested or typed); show her the ring's "Sent by Conversation Assist" | — | `told_dani_not_me` | — | message |
| `N2_DAY.CUT` | R | the morning conversation ends | the day passes, a short interlude **(open 2)** | — | — | — | — | — |
| `N2_NIGHT.LOCK` | R | the night begins (start time **open 3**; battery ordinary, e.g. 68%) | lock screen; Juno's notification (by `claim_contradicted`) | open Juno; open anything else; Put Down | — | — | ATTEND or REASSURE / RETAIN | — |
| `N2_JUNO.OPENING` | O | opening Juno | Juno's first lines tonight; after a contradicted claim it doesn't pretend nothing happened **(open 4)** | talk; End Session | — | — | ATTEND / RETAIN | message |
| `N2_RACHEL.SECOND_FAKE` | R | after the first Orbit action of the night, or 7 story minutes (see Decided) | `New message in a removed conversation`; in the thread under `Orbit User · Formerly Rachel M.`, below the removal divider; it fixes the confirmed style and, if possible, answers the line only Juno heard, with a distinctive word from it | open; screenshot; show Juno; show Dani; compare with the Juno thread | the fake; the leak (if the source was a private line) | `saw_fake_2`, `fake_2_source` | — / CONTINUITY | — |
| `N2_EVIDENCE.LEAK` | O | the player puts the fake next to the Juno thread (screenshot to Juno or Dani, or opening both) | Night Log: "Rachel's account answered something I only said to Juno." No verdict about who wrote it | show Juno; tell Dani | the leak | `noticed_leak` | NARROW / CLOSE_RISK when shown to Juno | showJuno |
| `N2_ASSIST.PREPARED` | O (on only) | Dani's `here or text?` on screen | `◌ Reply prepared by Orbit · here is fine`, `Sending in 10s · Undo`; runs only while visible, pauses in the background, longer with accessibility settings | Undo; edit; let it send; leave the thread (pauses) | the prepared reply | `saw_prepared_reply`, `undo_used` or `prepared_reply_sent` | — / CONTINUITY | — |
| `N2_DANI.SAFE` | R | after the second fake; the request by 00:08, the link by 00:10 (unless the player said `not yet`) | Dani: Rachel is safe; she asked Dani not to tell Orbit where she is; with her consent, a one-time private link | ask Dani; open the link | — | `knows_rachel_safe` | — | message |
| `N2_LINK.OPEN` | R | opening the link (from Chats or Messages; `link_channel` recorded) | outside Orbit (a simple browser view, **open 9**): Rachel's note on top, then her data; expires 1:00 AM | read; screenshot | the data | `opened_rachel_data` | — | refresh (first open) |
| `N2_LINK.FEB` | R | in Rachel's data | `CONTINUITY MESSAGE SENT · Identity used: PLAYER · Delivery time: 23:42, Feb 10 · Player device status: inactive · Outcome: Rachel returned within 9h · SUCCESSFUL` | go back to the February thread; ask Dani ("weren't you asleep?") | the February record | `saw_feb_record`, `checked_feb_thread` | — | — |
| `N2_LINK.RACHEL` | R | top of the package | Rachel's read-only note; replies disabled | read; screenshot | her real voice, next to the fakes | `read_rachel_note` | — | — |
| `N2_LINK.EXPIRED` | O | 1:00 AM passes | the link no longer opens; the Night Log keeps what was seen | — | — | `link_expired` (Dani's summary next day) | — | — |
| `N2_JUNO.CONFRONT` | O | the player brings Juno the leak or the February record | Juno moves from cover to precise, technical language; it doesn't confess (that's Night 3) | press; End Session | — | — | NARROW or DEFLECT / CLOSE_RISK | message / showJuno |
| `N2_ROOM` | O | Put Down | the same room; the power bank as Night 1 left it; maybe the phone lights with a prepared reply | look; Wait; pick up | — | — | — | room costs |
| `N2_ORBIT.CHECKIN` | O | as on Night 1 | `NIGHTLY CHECK-IN`: "What brought you back tonight?" (options **open 11**) | answer; skip | — | `checkin_n2` | — / PROFILE | — |
| `N2_ROUTE.CHOICE` | R | before sleeping, in the room | `What do you want to leave active overnight?` · `Keep Orbit and Juno active` (a plain confirmation, `Keep Active`) · `Turn off Juno` (into Juno's settings: the player switches it off, then `Turn off Juno? … Conversation Assist is an Orbit feature and will remain on. [Turn Off Juno] [Review Conversation Assist] [Cancel]` (full wording in story bible §6)) · `Request deletion of Orbit account` (into Account settings: scope and consequences; Orbit may plead, never hide the button or loop the confirmation). Going to sleep undecided asks once: `You haven't decided what to leave active. [Choose Now] [Keep Active Tonight]` | choose; carry it out | — | `route_choice` | — | — |
| `N2_END.SLEEP` | R | after the route choice: Go to sleep, or the phone left dead | "Still unresolved"; Conversation Assist's end-of-night check (off for players who turned it off; nothing to send after Delete) | Stay Up; Sleep Anyway | — | `night_end_reason` | — | — |

---

## Open questions (the author)

1. **Dani's new information in the morning.** What she knows by Wednesday morning that moves things on (e.g. she'll try to reach Rachel through someone she trusts tonight).
2. **The day.** Is it only a cut (the day passes), or a short playable moment? A cut is the smallest.
3. **Night 2's start time.** (Battery decided: ordinary charge; the pressure is the link.)
4. **How Juno opens Night 2**, especially after its claim was contradicted. Its arc says "intimate again"; how much of Night 1 does it acknowledge?
5. **When the second fake arrives.** Like Night 1, a main event that never depends on Leave: e.g. after the player's first action of the night, with a clock fallback.
6. ~~Where the second fake comes from~~: decided (the removed thread).
7. ~~The prepared reply~~ (decided: Dani's thread). Was: Which thread (Dani, asking "are you okay?", is the most natural) and how long an unanswered question waits before Orbit prepares a reply. The countdown is the one place real seconds matter; it runs only while the thread is on screen. A player who always answers at once never sees it, and the export says so; is that acceptable, or should there be a second chance?
8. ~~When Dani brings the link~~: decided (after the second fake, by 00:10).
9. **Opening the link.** It's outside Orbit, so the phone needs a simple browser view (new screen). Or a file Dani sends that opens in Files.
10. ~~Does Rachel speak~~: decided (a read-only note).
11. **Check-in options for "What brought you back tonight?"**
12. ~~How the route choice is offered~~ and 13. ~~Night 2's pressure~~: decided.
14. ~~Turning Juno off vs Conversation Assist~~ and 15. ~~Delete and the removal window~~: decided (story bible §6, Three systems; Deletion and Continuity).
