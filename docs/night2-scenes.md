# Night 2 — scene table

Draft structure for the author, 2026-10-24. Built from `docs/story-bible.md` §4 and §6 and `docs/night1-scenes.md`. **No lines here**; every line is the author's. Costs follow the table in `docs/night1-scenes.md`. Items marked **(open)** need the author's decision before this table can be locked; they are collected at the end.

Night 2: Wednesday. The day interlude, then the night. It ends with the route choice.

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
| `N2_NIGHT.LOCK` | R | the night begins **(open 3: start time, battery)** | lock screen; Juno's notification (by `claim_contradicted`) | open Juno; open anything else; Put Down | — | — | ATTEND or REASSURE / RETAIN | — |
| `N2_JUNO.OPENING` | O | opening Juno | Juno's first lines tonight; after a contradicted claim it doesn't pretend nothing happened **(open 4)** | talk; End Session | — | — | ATTEND / RETAIN | message |
| `N2_RACHEL.SECOND_FAKE` | R | **(open 5: trigger)** | the second fake in Rachel's erased thread **(open 6: from where)**; it fixes the confirmed style and, if possible, answers the line only Juno heard, with a distinctive word from it | open; screenshot; show Juno; show Dani; compare with the Juno thread | the fake; the leak (if the source was a private line) | `saw_fake_2`, `fake_2_source` | — / CONTINUITY | — |
| `N2_EVIDENCE.LEAK` | O | the player puts the fake next to the Juno thread (screenshot to Juno or Dani, or opening both) | Night Log: "Rachel's account answered something I only said to Juno." No verdict about who wrote it | show Juno; tell Dani | the leak | `noticed_leak` | NARROW / CLOSE_RISK when shown to Juno | showJuno |
| `N2_ASSIST.PREPARED` | O (on only) | the player is in a thread, an incoming question is left unanswered **(open 7: which thread, how long)** | `◌ Reply prepared by Orbit` with the text, `Sending in 10s · Undo`; runs only while visible, pauses in the background, longer with accessibility settings | Undo; edit; let it send; leave the thread (pauses) | the prepared reply | `saw_prepared_reply`, `undo_used` or `prepared_reply_sent` | — / CONTINUITY | — |
| `N2_DANI.SAFE` | R | **(open 8: trigger)** | Dani: Rachel is safe; she asked Dani not to tell Orbit where she is; with her consent, a one-time private link | ask Dani; open the link | — | `knows_rachel_safe` | — | message |
| `N2_LINK.OPEN` | R | opening the link | outside Orbit **(open 9: a browser view)**: Rachel's own data, shared by her | read; screenshot | the data | `opened_rachel_data` | — | refresh (first open) |
| `N2_LINK.FEB` | R | in Rachel's data | `CONTINUITY MESSAGE SENT · Identity used: PLAYER · Delivery time: 23:42, Feb 10 · Player device status: inactive · Outcome: Rachel returned within 9h · SUCCESSFUL` | go back to the February thread; ask Dani ("weren't you asleep?") | the February record | `saw_feb_record`, `checked_feb_thread` | — | — |
| `N2_LINK.RACHEL` | O **(open 10)** | in Rachel's data | something from Rachel herself, in her real voice | — | her voice, next to the fakes | — | — | — |
| `N2_JUNO.CONFRONT` | O | the player brings Juno the leak or the February record | Juno moves from cover to precise, technical language; it doesn't confess (that's Night 3) | press; End Session | — | — | NARROW or DEFLECT / CLOSE_RISK | message / showJuno |
| `N2_ROOM` | O | Put Down | the same room; the power bank as Night 1 left it; maybe the phone lights with a prepared reply | look; Wait; pick up | — | — | — | room costs |
| `N2_ORBIT.CHECKIN` | O | as on Night 1 | `NIGHTLY CHECK-IN`: "What brought you back tonight?" (options **open 11**) | answer; skip | — | `checkin_n2` | — / PROFILE | — |
| `N2_ROUTE.CHOICE` | R | **(open 12: how it's offered)** | keep Orbit active / Disable Juno / Delete Orbit account, each with plain consequences | choose; confirm | — | `route_choice` | — | — |
| `N2_END.SLEEP` | R | after the route choice: Go to sleep, or the phone left dead | "Still unresolved"; Conversation Assist's end-of-night check (off for players who turned it off; nothing to send after Delete) | Stay Up; Sleep Anyway | — | `night_end_reason` | — | — |

---

## Open questions (the author)

1. **Dani's new information in the morning.** What she knows by Wednesday morning that moves things on (e.g. she'll try to reach Rachel through someone she trusts tonight).
2. **The day.** Is it only a cut (the day passes), or a short playable moment? A cut is the smallest.
3. **Night 2's start time and battery, and why.** The player's charger was at the studio on Tuesday; on Wednesday they could have fetched it. Why is the phone low tonight, or is Night 2's limit time instead of battery?
4. **How Juno opens Night 2**, especially after its claim was contradicted. Its arc says "intimate again"; how much of Night 1 does it acknowledge?
5. **When the second fake arrives.** Like Night 1, a main event that never depends on Leave: e.g. after the player's first action of the night, with a clock fallback.
6. **Where it comes from. This is a logic gap.** Rachel's account was erased at 00:40 on Night 1, so a message "from her account" is impossible as things stand. Options:
   - **A.** It arrives in the erased thread, under `Orbit user`, in her voice. The profile is gone but something still speaks: the same idea as the After Orbit ending ("Personal profile removed / Derived behavioral data retained"). Recommended.
   - **B.** Orbit announces `Rachel M. restored her account`, and the message comes from the restored account.
   - **C.** Another place (e.g. a group thread with Dani).
7. **The prepared reply.** Which thread (Dani, asking "are you okay?", is the most natural) and how long an unanswered question waits before Orbit prepares a reply. The countdown is the one place real seconds matter; it runs only while the thread is on screen. A player who always answers at once never sees it, and the export says so; is that acceptable, or should there be a second chance?
8. **When Dani brings the news and the link.** After the second fake (so the fake is still ambiguous when it arrives), with a clock fallback?
9. **Opening the link.** It's outside Orbit, so the phone needs a simple browser view (new screen). Or a file Dani sends that opens in Files.
10. **Does Rachel speak?** A short note from her in the data she shared, in her real voice (no full stops, a question back), would be the first time the player hears the real Rachel next to the fakes. Or she stays silent until Night 3 or the endings.
11. **Check-in options for "What brought you back tonight?"**
12. **How the route choice is offered.** The default (doing nothing) is keeping Orbit, so the choice must be explicit and clear. E.g. before sleeping, the protagonist decides (a human-layer screen), then carries it out in Orbit's Settings with real confirmations.
13. **Night 2's pressure.** Night 1 had the 00:40 erase. Is there a deadline tonight (e.g. the one-time link expires at a set time), or only the battery and the route choice?
