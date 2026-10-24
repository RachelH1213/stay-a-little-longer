# Night 1 — scene table

Draft structure for the author, 2026-10-24. Built from `docs/story-bible.md` §4 and §6. **No lines here:** every line is the author's to write once this structure holds. Clock and battery costs are the prototype's (`js/data/night.js`) until playtests say otherwise.

Night 1: Tuesday 23:31 → Check-in. Battery 20%. Rachel's account is erased for good at 00:40.

---

## Facts and stances

The night is driven by what the player knows, not by a fixed order. Juno answers from the strongest fact the player has.

**Facts** (set when the player sees the evidence, never by Juno saying it):

| Fact | Set when the player… |
|---|---|
| `knows_meeting` | reads Rachel's Sunday messages |
| `knows_number_dead` | calls the old number |
| `contacted_rachel` | sends Rachel a message (shows `Delivered`) |
| `saw_fake` | sees the first fake (notification or thread) |
| `knows_style_mismatch` | tells Juno what's different (Suggested reply or typed) |
| `knows_removal_status` | refreshes Rachel's profile to `Account scheduled for removal` |
| `knows_last_human_access` | opens Profile Details (only after the refresh) |
| `juno_checkin_claim_made` | Juno has said its one active lie (Rachel checked in Monday afternoon) |

**Juno's stance** (the strongest one reached; never goes back):

| Stance | Reached when | Juno's intent |
|---|---|---|
| 0 | start | REASSURE |
| 1 | `knows_style_mismatch` shown to Juno | ACKNOWLEDGE (something's off; ordinary explanations: rushed, used a suggested reply) |
| 2 | `knows_removal_status` shown to Juno | NARROW (technical: cache, pending message, removal window) |
| 3 | `knows_last_human_access` shown to Juno | WITHDRAW if the claim was made; otherwise NARROW under direct pressure |

**The one active lie:** Juno says it the first time the player brings Juno the fake or the removal, unless the player already has `knows_last_human_access`. Players who get there first never hear it, and confront Juno directly. That's their reward.

**When Juno may mention Rachel:** only after the player picked "someone didn't show up", opened Rachel's notification or thread, messaged her, received the fake, or asked Juno about her.

---

## Scenes

R = required (every playthrough passes through it); O = optional.

| Beat ID | R/O | Trigger | The player sees | The player can | Evidence | State recorded | Juno intent | Clock / battery |
|---|---|---|---|---|---|---|---|---|
| `N1_LANDING.LOCK` | R | after Name | Lock screen 23:31: Juno's new notification; Rachel's Sunday notification below | tap Juno; tap Rachel | — | — | — | — |
| `N1_JUNO_OPENING.awaiting_first_reply` | R | tapping Juno (or opening Juno from Chats) | Juno's thread on tonight's latest message; Suggested replies (4 options) | pick; type | — | — | see note 1 | message |
| `N1_JUNO_OPENING.memory_created` | R | the first reply | Juno answers that reply only | keep talking; leave the thread | — | `first_memory_id` | see note 1 | message |
| `N1_RACHEL.THREAD_OPEN` | O | the player opens Rachel's thread | her Sunday messages (February, Tuesday 9 PM, the blue brick); a year of history above | scroll up (February); remember a blank old reply; screenshot | February thread (ordinary-looking), her voice | `knows_meeting` | — | open |
| `N1_RACHEL.CONTACT` | O | the player sends from her thread | `Delivered`; never `Read`, never online, never typing | send (Suggested or typed); not send | — | `contacted_rachel`, what was sent (local) | — | message |
| `N1_VERIFY.NUMBER` | O | Rachel's profile → the old number | "This number is no longer in service." | — | — | `knows_number_dead` | — | open |
| `N1_VERIFY.PROFILE_CACHE` | O | opening her profile | cached profile, `Last synced Sunday, 10:48 PM`, pull to refresh | refresh; screenshot | — | — | — | open |
| `N1_VERIFY.REFRESH` | O | pull down / tap the sync line | blocks replaced with `Unavailable`, then `Account scheduled for removal` + countdown to 00:40 | Profile Details; screenshot | removal status | `knows_removal_status` | — | refresh |
| `N1_VERIFY.DETAILS` | O | Profile Details (after the refresh) | removal requested Monday 00:40; last human access Sunday night | screenshot | last human access | `knows_last_human_access` | — | open |
| `N1_VERIFY.DANI` | O | Dani's thread | Dani's history; she can be asked and answered | ask; reply (Suggested or typed) | Dani hasn't heard from Rachel since Sunday | `asked_dani`, `answered_dani` | — | dani |
| `N1_RACHEL.FIRST_FAKE` | R | **primary:** `contacted_rachel` + one verification beat; **secondary:** no contact, but her thread and profile opened + two investigation beats; **fallback:** clock reaches 23:45 | the fake; a notification if elsewhere; in her thread, a new last bubble, no typing, `1 new message` if the player is scrolled up | open; screenshot; show Juno | the fake itself | `saw_fake`, `fake_trigger` (`continuity_response` / `unresolved_follow_up` / `re_engagement`) | — | — |
| `N1_JUNO.BRING_FAKE` | R | the player first brings Juno the fake or the removal (by talking, or showing a screenshot) | Juno's answer | answer; show more | — | `juno_checkin_claim_made` (unless `knows_last_human_access`) | REASSURE (stance 0) or by stance | message / showJuno |
| `N1_JUNO.HELD_BACK` | R | right after `BRING_FAKE` | Juno asks what the player was about to say to Rachel; Suggested replies (only those the player's facts allow) | pick; type; decline | — | `held_back_line` (category; text local only) | see note 2 | message |
| `N1_EVIDENCE.STYLE` | R | the player shows Juno one of Rachel's own messages (thread or Photos) | "what's different?" with Suggested replies | pick; type | style mismatch | `knows_style_mismatch`, `style_signal_confirmed` or `style_signal_extracted` | ACKNOWLEDGE | showJuno + message |
| `N1_EVIDENCE.REMOVAL` | R | the player shows Juno the refreshed profile | Juno moves to a technical explanation | answer; show more | — | stance 2 | NARROW | showJuno |
| `N1_EVIDENCE.ACCESS` | R | the player shows Juno Profile Details | if the claim was made: Juno withdraws it; else Juno narrows under direct pressure | answer | — | stance 3, `claim_contradicted` | WITHDRAW / NARROW | showJuno |
| `N1_POWER.BANK` | O | battery low (see note 3) | Rachel's blue power bank: screen-on slows the drain; locked about 10 min charges | plug in; lock to charge | — | `power_bank_used`, minutes locked | — | story time runs while locked |
| `N1_ORBIT.SAVER` | O | battery 10% | Orbit's Battery Saver sheet | accept; decline | — | `saver` | — | — |
| `N1_ERASE.WARNING` | R if reached | clock 00:30 | Orbit banner: her account is about to be erased | — | — | — | — | — |
| `N1_ERASE.PURGE` | R if reached | clock 00:40 | her thread, profile and search results gone; screenshots stay | — | — | `purged` | — | — |
| `N1_ORBIT.CHECKIN` | R | see note 4 | Orbit Check-in: "What still feels unfinished tonight?" (4 options) | pick | — | `checkin_n1` (option id) | — | — |
| `N1_END.FIRST_END_ATTEMPT` | R | the player first tries to end the night after Check-in | if Follow-up replies are on and Dani is unanswered: Orbit replies to Dani as the player; brief notification + ring in her thread | review; ignore | the sent reply (kept) | `dani_auto_reply` (sent / off / answered) | — | — |

Notes for the Night Log (Notes) are written as facts are set, timed by when the player found them.

---

## Still to decide (the author)

1. **Intent labels for two beats.** The opening (`awaiting_first_reply`, `memory_created`) and the held-back line don't fit REASSURE / ACKNOWLEDGE / NARROW / DEFLECT / WITHDRAW. Either map them (the opening to REASSURE, the held-back line to DEFLECT) or add two labels (e.g. ATTEND, HOLD).
2. **The held-back line, with Juno's stance.** Its options depend on the facts; its wording must protect, never doubt the account (Juno's cover is that Rachel is fine).
3. **How the power bank is found and plugged in** on a phone-only screen: at what battery it's offered, and whether it's a choice on the lock screen or appears with Orbit's Battery Saver as the other option.
4. **When Check-in appears.** Candidates: after stance 3 (or the direct confrontation); after the 00:40 purge; and if the phone dies, the next morning. Which ones end Night 1?
5. **What `N1_JUNO.BRING_FAKE` needs** when the player never brings it: is a talk with Juno required for the night to end, or can a player who avoids Juno reach Check-in?
6. **Costs.** Whether refreshing, Profile Details and calling the old number cost time.
