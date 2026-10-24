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

**Two kinds of label (decided 2026-10-24).** Every beat where Juno speaks has two; they can disagree, and that's the point.

- **Juno local intent**, what Juno is doing in the conversation: `ATTEND` (answers the player's mood or topic, doesn't steer), `ASSIST` (helps with a concrete action), `REASSURE`, `ADVISE` (suggests doing or holding off on something), `ACKNOWLEDGE`, `NARROW`, `DEFLECT`, `WITHDRAW`.
- **Orbit system function**, what the same exchange does for the platform: `NONE`, `PROFILE` (collects or confirms something about the player), `STYLE_CONFIRMATION`, `REDIRECT` (turns an outside action back into Orbit), `RETAIN`, `CLOSE_RISK` (lowers the chance the player keeps digging or leaves), `CONTINUITY` (keeps a broken relationship going).
- Evidence beats also have an **evidence stance** (below).

E.g. the opening: `ATTEND` / `PROFILE`. The held-back line: `ADVISE` / `REDIRECT`.

**Juno's stance** (the strongest one reached; never goes back):

| Stance | Reached when | Evidence stance |
|---|---|---|
| 0 | start | REASSURE |
| 1 | `knows_style_mismatch` shown to Juno | ACKNOWLEDGE (something's off; ordinary explanations: rushed, used a suggested reply) |
| 2 | `knows_removal_status` shown to Juno | NARROW (technical: cache, pending message, removal window) |
| 3 | `knows_last_human_access` shown to Juno | WITHDRAW if the claim was made; otherwise NARROW under direct pressure |

**The one active lie:** Juno says it the first time the player brings Juno the fake or the removal, unless the player already has `knows_last_human_access`. Players who get there first never hear it, and confront Juno directly. That's their reward.

**The held-back line (decided 2026-10-24).** After the fake, Juno asks what the player was going to say to Rachel. Options open with what the player knows:

| The player knows | Options added |
|---|---|
| she didn't come | `you could've told me you weren't coming` · `i waited for you` · `i don't know yet` |
| the style mismatch | `why don't you sound like yourself?` |
| the removal status | `why did you delete your account?` |
| no human login | `who is using your account?` |
| always | `i'd rather not say` |

Juno never says "don't send that"; it suggests something easier for Rachel to answer, with simpler Suggested replies (e.g. `are you safe?` · `where should we talk?` · `call me when you can`). The player can send the simpler one, keep the original unsent, send the original anyway, or do nothing. Recorded: `private_line_selected`, `private_line_sent_to_rachel`, `private_line_known_only_to_juno`. Night 2's fake may answer it only if it was selected and never sent to Rachel; `i'd rather not say` is recorded as `Private disclosure: Declined`, a boundary, never filled in.

**Searching the room (decided 2026-10-24).** Tote bag, drawer, coat, desk and phone can be looked at from the first visit, but only looked at ("Still full of things from game night."). They become searchable when the battery is at 10% or less and the player has read Rachel's "blue brick" message; at 5% even if they haven't (the protagonist remembers: "Rachel's old power bank might still be here."); and at once if the phone dies ("Your usual charging cable is still at the studio. Rachel's power bank might be here somewhere."). The drawer holds the player's adapter without its cable ("The cable is under your desk in the studio, where you left it after crit."). The tote bag holds the power bank ("Rachel's blue power bank. A short charging lead folds into the side. One light left." / "It charges through an old cable you don't have."). Once it's a goal, the tote bag shows a little blue strap; hotspots work with the keyboard and, with Reduce Motion, use outlines instead of blinking; a wrong place costs a little story time, never battery; after two wrong places the protagonist points the way. The difficulty is deciding to spend the time, never finding a pixel. (All lines here are the author's drafts.)

**Before sleeping (decided 2026-10-24).** `Go to sleep` first shows the Night Log's "Still unresolved" (the protagonist's own notes), never a counter, with `Stay Up` / `Sleep Anyway`. Its lines come only from what the player has run into; a direction they never touched never appears (no "I never looked at her profile"):

| The player has | "Still unresolved" says (draft) |
|---|---|
| only the missed meeting | `Rachel never arrived. I still don't know why.` |
| the fake | `Rachel answered, but she didn't explain what happened.` |
| the style mismatch | `The message didn't sound like her.` |
| the removal, not the login record | `Her account was already being removed when the message arrived.` |
| Juno's check-in claim, unverified | `Juno said Rachel checked in Monday. I haven't confirmed that.` |
| Juno's claim contradicted | moves to confirmed facts |

**Costs (decided 2026-10-24).** Reading is free; only a new action toward the outside world or a person moves the clock. Repeating something already done costs nothing.

| Action | Time | Battery |
|---|---:|---:|
| reading messages, Notes, Profile Details | 0 | 0 |
| going back, switching apps, opening Settings | 0 | 0 |
| refreshing remote data (first time only) | +1 min | −1% |
| sending a new message | +1 min | −1% |
| calling a number (first time only; replaying the call record is free) | +2 min | −2% |
| searching a room spot | +2–3 min | 0 |
| waiting in the room | 5 / 10 min, chosen | the phone charges |

To check in playtests: −1% per message is double the prototype's; at 20% a long talk with Juno alone can drain the phone.

**When Juno may mention Rachel:** only after the player picked "someone didn't show up", opened Rachel's notification or thread, messaged her, received the fake, or asked Juno about her.

---

## Scenes

R = required (every playthrough passes through it); O = optional.

| Beat ID | R/O | Trigger | The player sees | The player can | Evidence | State recorded | Juno intent / Orbit function | Clock / battery |
|---|---|---|---|---|---|---|---|---|
| `N1_LANDING.LOCK` | R | after Name | Lock screen 23:31: Juno's new notification; Rachel's Sunday notification below | tap Juno; tap Rachel | — | — | — | — |
| `N1_JUNO_OPENING.awaiting_first_reply` | O | tapping Juno (or opening Juno from Chats) | Juno's thread on tonight's latest message; Suggested replies (4 options) | pick; type | — | — | ATTEND / PROFILE | message |
| `N1_JUNO_OPENING.memory_created` | O | the first reply | Juno answers that reply only | keep talking; leave the thread | — | `first_memory_id` | ATTEND / PROFILE | message |
| `N1_RACHEL.THREAD_OPEN` | O | the player opens Rachel's thread | her Sunday messages (February, Tuesday 9 PM, the blue brick); a year of history above | scroll up (February); remember a blank old reply; screenshot | February thread (ordinary-looking), her voice | `knows_meeting` | — | open |
| `N1_RACHEL.CONTACT` | O | the player sends from her thread | `Delivered`; never `Read`, never online, never typing | send (Suggested or typed); not send | — | `contacted_rachel`, what was sent (local) | — | message |
| `N1_VERIFY.NUMBER` | O | Rachel's profile → the old number | "This number is no longer in service." | — | — | `knows_number_dead` | — | open |
| `N1_VERIFY.PROFILE_CACHE` | O | opening her profile | cached profile, `Last synced Sunday, 10:48 PM`, pull to refresh | refresh; screenshot | — | — | — | open |
| `N1_VERIFY.REFRESH` | O | pull down / tap the sync line | blocks replaced with `Unavailable`, then `Account scheduled for removal` + countdown to 00:40 | Profile Details; screenshot | removal status | `knows_removal_status` | — | refresh |
| `N1_VERIFY.DETAILS` | O | Profile Details (after the refresh) | removal requested Monday 00:40; last human access Sunday night | screenshot | last human access | `knows_last_human_access` | — | open |
| `N1_VERIFY.DANI` | O | Dani's thread | Dani's history; she can be asked and answered | ask; reply (Suggested or typed) | Dani hasn't heard from Rachel since Sunday | `asked_dani`, `answered_dani` | — | dani |
| `N1_RACHEL.FIRST_FAKE` | R | **primary:** `contacted_rachel` + one verification beat; **secondary:** no contact, but her thread and profile opened + two investigation beats; **fallback:** clock reaches 23:45 | the fake; a notification if elsewhere; in her thread, a new last bubble, no typing, `1 new message` if the player is scrolled up | open; screenshot; show Juno | the fake itself | `saw_fake`, `fake_trigger` (`continuity_response` / `unresolved_follow_up` / `re_engagement`) | — | — |
| `N1_JUNO.BRING_FAKE` | O | the player first brings Juno the fake or the removal (by talking, or showing a screenshot) | Juno's answer | answer; show more | — | `juno_checkin_claim_made` (unless `knows_last_human_access`) | REASSURE / CLOSE_RISK (stance 0), or by stance | message / showJuno |
| `N1_JUNO.HELD_BACK` | O | right after `BRING_FAKE` | Juno asks what the player was about to say to Rachel; Suggested replies (only those the player's facts allow) | pick; type; decline | — | `private_line_selected`, `private_line_sent_to_rachel`, `private_line_known_only_to_juno` | ADVISE / REDIRECT | message |
| `N1_EVIDENCE.STYLE` | O | the player shows Juno one of Rachel's own messages (thread or Photos) | "what's different?" with Suggested replies | pick; type | style mismatch | `knows_style_mismatch`, `style_signal_confirmed` or `style_signal_extracted` | ACKNOWLEDGE / STYLE_CONFIRMATION | showJuno + message |
| `N1_EVIDENCE.REMOVAL` | O | the player shows Juno the refreshed profile | Juno moves to a technical explanation | answer; show more | — | stance 2 | NARROW / CLOSE_RISK | showJuno |
| `N1_EVIDENCE.ACCESS` | O | the player shows Juno Profile Details | if the claim was made: Juno withdraws it; else Juno narrows under direct pressure | answer | — | stance 3, `claim_contradicted` | WITHDRAW or NARROW / CLOSE_RISK | showJuno |
| `N1_ROOM.PUT_DOWN` | O | Put Down, any time | the room: the desk, the phone on it | look around; Wait; pick up the phone (→ lock screen) | — | `screen_inactive` (weak exit signal) | — | room actions only |
| `N1_ROOM.SEARCH` | O | battery low makes the tote bag and drawer meaningful | the tote bag, the drawer, the coat | search each | the power bank (`R.M.`) | `power_bank_found` | — | +2–3 min each |
| `N1_POWER.BANK` | O | the power bank is found | plugged in: screen on barely offsets the drain; phone down charges | plug in; Wait 5 / 10 min; pick up | — | `power_bank_used`, minutes down | — | Wait 5 / 10 min |
| `N1_ORBIT.SAVER` | O | battery 10% | Orbit's Battery Saver sheet | accept; decline | — | `saver` | — | — |
| `N1_ERASE.WARNING` | R if reached | clock 00:30 | Orbit banner: her account is about to be erased | — | — | — | — | — |
| `N1_ERASE.PURGE` | R if reached | clock 00:40 | her thread, profile and search results gone; screenshots stay | — | — | `purged` | — | — |
| `N1_ORBIT.CHECKIN` | O | any two key findings, the first End Session, the first shutdown, 00:20, or the erase | a card on Orbit's home: "What still feels unfinished tonight?" | answer; skip | — | `checkin_n1` (option id) or skipped | — | — |
| `N1_JUNO.END_SESSION` | O | End Session, confirmed | `Session ended` on Orbit's home; Juno gets no last line | — | — | strong exit signal | — | — |
| `N1_ROOM.DEAD` | O | battery 0% | the room, the phone off | connect the power bank (needs 4%); leave it off | — | `device_shutdown`, `device_reactivated` | — | restart: a few minutes |
| `N1_END.SLEEP` | R | `Go to sleep` in the room (after the fake or 23:45), or the phone left dead | one Check-in reminder if unanswered; Conversation Assist checks Dani | answer; skip and sleep | the reply sent to Dani, if any (kept) | `night_end_reason`, `dani_auto_reply` (sent / off / answered) | — | — |

Notes for the Night Log (Notes) are written as facts are set, timed by when the player found them.

---

## Juno's switch (decided 2026-10-24)

Settings show `Juno On · Conversation Assist On` from Night 1, independent. A player can turn Juno off before ever opening it, so the two opening beats are optional and `first_memory_id` may be empty (Night 3's export needs a version for that). Turning it off never forces an untold lie; the rest of the night still works without Juno.

## Status

Night 1's structure is locked (2026-10-24). Left for the author: every line (all wording above is a draft).

**Night 2 (agreed approach, 2026-10-24):** one shared skeleton of five required beats (Dani's message the next day; back into Orbit that night; the second fake; material that proves Continuity exists; the route choice: keep / Disable Juno / Delete Orbit). Night 1's states change only how these beats look, never add branches. The second fake draws on, in order: a line known only to Juno; a confirmed style signal; the Check-in answer; otherwise a non-personal fallback. The states Night 2 reads: style mismatch confirmed; removal known; Juno's claim contradicted; a private line known only to Juno; Follow-up replies off; Check-in answered or skipped; power bank remaining.
