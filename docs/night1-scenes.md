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

**Principle (2026-11-10):** the world's facts never change with the player. What changes is what each character knows, what evidence the player holds, and which lines of inquiry Night 2 can follow. Every consequence has a source the game can name (who was given what, through which channel); no hidden score, no "route" label, no check for a right answer.

**Facts** (set when the player sees the evidence, never by Juno saying it):

| Fact | Set when the player… |
|---|---|
| `knows_meeting` | opens Rachel's thread (her Sunday messages, the plan) |
| `contacted_rachel` | sends Rachel a message tonight (`Delivered`) |
| `knows_reschedule` | sees the plan now says Saturday |
| `knows_auto_accepted` | sees in Change history that Conversation Assist accepted it |
| `knows_email_hidden` | sees Rachel's note with `[contact info hidden]` |
| `asked_dani` | messages Dani |
| `saw_fake` | sees MSG_1048 (notification or thread) |
| `style_doubt_expressed` | tells Juno the message doesn't sound like Rachel, without saying how; no style signal |
| `knows_style_mismatch` | names a specific way it differs from how Rachel writes (no full stops, asks something back, says what happened); this, and only this, creates a style signal |
| `plan_history_viewed` | opens the plan's Change history themselves |
| `fake_mismatch_named` | says to Juno or Dani what doesn't fit (`plan_date` in version A, `ignored_question` in B, `february`, `style`, `last_active`); a record, never a solved flag, never required |
| `reschedule_mentioned_in_thread` | the player wrote about the move in Rachel's thread before the fake (decides `msg_1048_variant`) |
| `dani_told_rachel_about_fake` | Dani emailed Rachel about MSG_1048 (in her first email or a second one) |
| `dani_email_sent` | Dani tells the player she has emailed Rachel (tonight; the answer comes in the morning) |
| `replied_after_fake` | sends something in Rachel's thread after MSG_1048 |
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
| `juno_explained_reschedule` | Juno told the player about the change (kept apart from `plan_history_viewed`: seen it themselves, or heard it from Juno) |
| `fake_forwarded_to_juno` | the player forwarded MSG_1048 to Juno |
| `juno_switch_events[]` | every time Juno is turned off or on, with the story time (not one field: the player can switch it several times) |

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
| the message itself | answers only what the player asks; never points out a contradiction first (see Giving Juno a message). If asked who sent it: `it came through her account` · `i don't have anything that says it wasn't her` (fixed) | `ATTEND` / `ACKNOWLEDGE`, then `REASSURE` (fixed) / `CLOSE_RISK` |
| how it differs from how Rachel writes | agrees something's off; ordinary explanations (rushed, upset) | `ACKNOWLEDGE` / `STYLE_CONFIRMATION` |
| the refreshed profile (`Last active · 5:12 PM`, leaving Orbit) | a narrow, true answer: `last active only changes when she opens orbit herself` · `it can't tell you much about one message` (true: Last Active records only Rachel's own sessions, `evidence-matrix.md`) | `NARROW` / `CLOSE_RISK` |

Juno never claims Rachel checked in, was online, or wrote the message; its one false line is the fixed one above. A player who never asks who sent it never hears it. Once Juno has the source, it never refers to the writer as "she" (that would be a second, unplanned lie): it talks about "the message".

**Giving Juno a message (decided 2026-11-10).**

- **Forward is how a message reaches anyone.** Long-press a message → `Forward` → Juno or Dani. A forward carries the original message (its id), so Juno, through Orbit, also gets its source metadata (`context_delivered_to_juno`). A forward to Dani shows `Forwarded from Rachel H.`; Dani sees only what the player sees.
- **Screenshots keep how the screen looked**: Rachel's name and picture, `Last active · 5:12 PM`, the countdown, the cached profile, which are gone after 12:40 AM. Her messages and the player's history stay after the erase (under `Orbit User · Formerly Rachel H.`). A screenshot never proves who sent a message; the Night 3 records do.
- **Mentioning it isn't giving it.** Juno only reads MSG_1048 when the player forwards it or says yes when Juno asks. Both entrances end in the same delivery (`context_delivered_to_juno`); only the first also sets `fake_forwarded_to_juno`. Typing is never the worse way in. A switched-off Juno is never given anything, however the message is mentioned; turned back on, it has the source only from the moment it's actually given it.

| Juno's state when the player asks e.g. `did you see rachel's message?` | Juno (drafts) |
|---|---|
| never given MSG_1048 | `not yet. want me to look at it?` → delivered only on yes |
| already given it (forwarded or agreed) | `yeah. the one you forwarded`; no second delivery |
| several possible messages | asks which one; only the one the player picks is delivered |

  If the player asks `was it actually her?` before Juno has the message, Juno asks to look first; after a yes, it answers that same question (the fixed line) without making the player ask again. If Juno is off, nothing is delivered and nothing can be held against it.

**MSG_1048 has two versions (decided 2026-11-10).** Continuity writes from the conversation, so the version depends on what the player actually sent in Rachel's thread before the fake was generated, never on what they know privately (`knows_reschedule`, Juno, Notes):

| In Rachel's thread before the fake | Version |
|---|---|
| nothing about the move (`are you okay?`, `i'm here`, nothing) | **A:** `Hey. I'm sorry I missed our meeting tonight. / I don't think we need to go over what happened in February anymore. / I hope you understand.` |
| the move, clearly (`i didn't know you moved it`, `why does the plan say saturday?`) | **B:** `Hey. I'm sorry about the mix-up tonight. / I don't think we need to go over what happened in February anymore. / I hope you understand.` |

Typed text is sorted when it's sent (keywords, then the model's classifier); anything unclear counts as A. Recorded: `reschedule_mentioned_in_thread`, `msg_1048_variant`. Sender, source, trigger and records are the same for both; anything the player writes after the fake doesn't change it. The cost is real and kept: a player who tells "Rachel" early that they know about the move loses the clearest date contradiction. What B still gets wrong: it doesn't answer what the player asked (real Rachel would have said Saturday, or the email, and asked something back), it closes February, it isn't how she writes, and `Last active · 5:12 PM` hasn't moved. None of these is proof; Last Active is only odd.

**What Juno says about the fake** depends on what the player says first, never on what the player knows:

| The player | Juno (drafts) |
|---|---|
| forwards it with no question | `what do you want me to check?` |
| says it doesn't make sense | `what feels off about it?` |
| names the date (version A only: `she moved it to saturday. why is the message apologising for tonight?`) | `yeah. the plan was moved to saturday` · `but the message says tonight`; nothing about who wrote it or why |
| says it didn't answer them (version B: `i asked about saturday and it just says mix-up`) | `it doesn't mention saturday` · `or what you asked`; records `fake_mismatch_named: ignored_question` |
| doubts the style without saying how (`she doesn't talk like that`) | `what feels different?`; records `style_doubt_expressed` only. The player can answer, say something else or leave; nothing waits |
| names a specific style feature (`she never uses periods`) | a short agreement (candidate: `yeah. her older messages are a lot more casual`); ordinary explanations if pressed (rushed, upset); sets `knows_style_mismatch` and the style signal: `confirmed` if picked from Suggested replies, `extracted` if typed and the game can tell which feature it is, otherwise only `style_doubt_expressed` |
| says it doesn't sound like her *because of what it says* (`she'd never drop february like that`) | treated as naming February (`fake_mismatch_named: february`), never as a style signal |
| names February or Last Active | confirms the fact the player named, no more |
| connects Last Active with the later message (`she was last active at 5:12 but this came at 11:37`), in any wording; `5:12`, Last Active or the message alone doesn't count | not given the message yet: `i haven't seen the message itself. want me to take a look?` (a pending request; only a yes to it delivers the message, and a no, a cancel or a change of subject delivers nothing). Already given it: `last active only changes when she opens orbit herself` · `it can't tell you much about one message`. Both fixed, decided 2026-11-12 after the first playtest, where this got a generic reply |
| asks who sent it | `it came through her account` · if pressed: `i don't have anything that says it wasn't her` (fixed) |

Suggested replies above the box come only from what the player has found and from the version they got, so none points at a contradiction that isn't there (e.g. version A: `why is it apologising for tonight?` after `plan_history_viewed` or `juno_explained_reschedule`; version B: `it didn't answer what i asked`; `she wanted to show me something` after reading Sunday; `did she actually send this?` always). There is no right answer and nothing waits on it; typing is always open. What the player named is recorded (`fake_mismatch_named`) and is **not** used by Continuity on Night 2. The style signal is the one exception, because the player gave it to Orbit, through Juno, as a fact about how Rachel writes.

**Dani on Night 1 (decided 2026-11-10).** Dani is a witness, not a detector: she never states that the message isn't Rachel's. Asked directly (`does this sound like her to you?`), she can give an unsure opinion (`i don't know. it's kind of weird`). Her visible action happens tonight: `i have an old email for her` → `sending it now` → `sent. i'll tell you if she answers` (`dani_email_sent`). Rachel answers at the earliest the next morning (how and when it's shown is Night 2's). If the player forwards MSG_1048 before her email goes, it's in that email; if after, Dani sends a second one (`sending her another one about this` · `sent`; `dani_told_rachel_about_fake`); if never, Rachel's answer can't mention it. A player who never messages Dani gets no email exchange. Orbit's `OFF-PLATFORM CONTACT ATTEMPT` is Orbit classifying what Dani said in Chats; it can't confirm an email was sent or received, and Continuity never reads it. All lines are drafts.

**Replying to Rachel after the fake.** The reply shows `Delivered`; nothing answers it tonight (Continuity doesn't follow up on the same night, however many times the player writes, so the player can't farm fakes). Continuity's writing part reads the conversation, so what the player wrote there is the most natural content for Night 2's fake to answer. Something written in her thread is no longer "known only to Juno".

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
Sat, Oct 24 · 9:00 PM · Halfway Café

CHANGE HISTORY
Rachel proposed a new time · Oct 20 · 5:12 PM
  From  Tue, Oct 20 · 9:00 PM
  To    Sat, Oct 24 · 9:00 PM
  "my schedule changed, can we do saturday? email me if that works: [contact info hidden]"
  Orbit keeps your conversations safe
Change accepted · Oct 20 · 5:12 PM
  Handled by Conversation Assist
  Manual confirmation: Not required
```

The wording above is the build's (decided 2026-11-12): `Change history`, not `Activity History`, and `Handled by Conversation Assist` instead of `on your behalf`. The From and To lines carry the new date, so the history alone shows the meeting is now on Saturday. Dates use the short form (`Sat, Oct 24 · 9:00 PM`) so they fit the phone at its smallest size.

**Night 1 review decisions (2026-11-13).** From the line-by-line review of the build; the build follows these.

- **Nothing on screen names Continuity** before Night 3's records, in settings or anywhere else. No developer text on any screen (layout notes, "existing mechanic", variant names, fact ids).
- **Rachel's style holds in every line she writes herself:** lowercase, no full stops, a specific joke where something is hard, and she always asks something back. Added to her history (drafts, the author's to change): Feb 10 ends `is that dumb`; Feb 11 ends `what are you up to today`; Oct 13 ends `what are you gonna wear so i can spot you`. The player's own messages are lowercase with no full stops too, so only the fakes look formal.
- **The meeting place is Halfway Café** (Rachel's Oct 13 message `tuesday 9 at halfway café`); plan details show it as a location row.
- **Juno types:** a typing indicator before each line, 0.6–1.5 s by length; with Reduce motion, no animated dots. When nothing matches what the player typed, Juno uses one of `mm` · `go on` · `i'm here` · `tell me more`, never the same twice in a row.
- **Juno's lines:** after `who was it?` the player gets Suggested replies (`rachel. we were supposed to meet at 9` · `rachel` · `someone from orbit`); typing is never required. Naming Rachel: `rachel?` · `you had a plan with her tonight, right?` · `want me to check it?` (Juno says nothing about the change until it has checked). After checking, the five lines of `night1-routes.md` 1.3. Read status: `i can confirm orbit received it` · `but i can't tell you whether she read it`.
- **The lock screen** shows unread notifications only: Juno's `still awake?` until it is read; a message that arrived while the phone was down (MSG_1048: Rachel's picture, `Rachel H.`, its first line). Date `Tuesday, October 20`, `Wednesday, October 21` after midnight. It opens with a swipe up (`Swipe up to open`) or a tap on the home bar; no Unlock button.
- **First opens cost time** as in the costs table: plan details and the change history +1 min the first time.
- **After the erase** the thread header reads `Orbit User · Formerly Rachel H.`
- **Facts use this document's names** (`knows_reschedule`, `knows_auto_accepted`, …) in the build and the save, so Nights 2 and 3 read one vocabulary.
- **Typed text is matched by whole words**, not parts of words (`already` must not match `read`).
- **The room's objects are named, never described** (`Drawer`, `Power bank`); what's inside is found by opening them.

**Contact Protection, where the player sees it (decided 2026-11-12, after the first playtest: the hidden email led nowhere).** `[contact info hidden]` in the note can be tapped. It opens a small sheet: title `Contact Protection`; `Orbit hides emails and phone numbers between people who haven't verified each other. The sender isn't notified.`; button `Manage in Settings`, which opens Settings at a `Contact Protection · On` row. Nothing else is added. "The sender isn't notified" is the same fact Juno can give (Orbit filtered the email); here the player can find it without Juno.

**Juno's line about the change (rewritten 2026-11-12):** `it got moved to saturday. at 5:12` was read as a Saturday meeting at 5:12. Now: `she changed the plan at 5:12 this afternoon` · `it says saturday now` (`night1-routes.md` 1.3).

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
| opening a thread, a profile or Change history for the first time | +1 min | 0 |
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
| `N1_JUNO_OPENING.awaiting_first_reply` | Beat | O | tapping Juno | Juno's thread; Suggested replies (3) with `◌ Suggested replies` | pick; type | — | ATTEND / PROFILE | message |
| `N1_JUNO_OPENING.memory_created` | Beat | O | the first reply | Juno answers that reply only | keep talking; leave | `first_memory_id` | ATTEND / PROFILE | message |
| `N1_RACHEL.thread_open` | Action | O | the player opens Rachel's thread | her Sunday messages; the player's 9 PM messages (`Delivered`); a year of history above, incl. February (E00, E02); one blank old reply | scroll up; remember a blank reply; screenshot; open the plan from Activity → Plans or her profile → Shared Plans; her Oct 13 `ok it's in plans` is the only pointer (revised 2026-11-10: no tag under the header and no plan line in the chat; Plans is a separate feature, like a calendar, so its changes never appear in the chat) | `knows_meeting` | — | open |
| `N1_RACHEL.contact` | Action | O | the player sends from her thread | `Delivered`; never `Seen`, never typing | send (Suggested or typed); not send | `contacted_rachel` | — | message |
| `N1_PLANS.history` | Action | O | opening the plan (from her profile's Shared Plans, from Plans, or with Juno; Plans sits under Activity, `orbit-ia.md`) | current state `Saturday, Oct 24 · 9:00 PM`; Change history: Rachel's change at 5:12 PM with her note (`… email me: [contact info hidden]`, then `Orbit keeps your conversations safe` on its own line), `Change accepted · Handled by Conversation Assist · Manual confirmation: Not required` (E06, E07) | screenshot; ask Juno; Settings | `knows_reschedule`, `knows_auto_accepted`, `knows_email_hidden` | — | open |
| `N1_JUNO.reschedule` | Beat | O | the player asks Juno why Rachel didn't come, or about the plan | Juno checks and explains: Conversation Assist accepted; Auto-Coordinate enabled in June with suggested trusted contacts; the email was filtered before it reached Juno (E11) | turn Auto-Coordinate off; keep talking | `auto_coordinate` on/off | ASSIST / NONE | message |
| `N1_JUNO.read_status` | Beat | O | the player asks whether Rachel read their messages | `i can confirm orbit received it` · `but i can't tell you whether she read it` (E12) | — | `asked_read_status` | ASSIST / NONE | message |
| `N1_JUNO.dani` | Beat | O | the player asks how else to reach Rachel | Juno suggests Dani, who ran their online game nights (E13) | open Dani's thread | — | ASSIST / REDIRECT | message |
| `N1_DANI.ask` | Action | O | the player messages Dani | Dani is up; she hasn't heard from Rachel; if asked, an unsure opinion, never a verdict | ask; reply; forward MSG_1048 | `asked_dani`, `showed_msg_1048_to_dani` | — | message |
| `N1_DANI.email` | Action | O | Dani has heard what happened | `i have an old email for her` · `sending it now` · `sent. i'll tell you if she answers` | — | `dani_email_sent` | — | — |
| `N1_RACHEL.reply_after_fake` | Action | O | the player writes in Rachel's thread after MSG_1048 | `Delivered`; nothing more tonight | send; keep writing | `replied_after_fake` | — | message |
| `N1_VERIFY.profile_cache` | Action | O | opening Rachel's profile | cached profile, `Last synced Sunday, 10:48 PM`, pull to refresh | refresh; screenshot | — | — | open |
| `N1_VERIFY.refresh` | Action | O | pull down / tap the sync line | blocks replaced by `Unavailable`; `Leaving Orbit · Account closes Wed 12:40 AM` and the countdown; `Last active · 5:12 PM` | screenshot | `knows_removal_status`, `knows_last_active` | — | refresh |
| `N1_FIRST_FAKE` | Event | R | when Continuity becomes eligible (`evidence-matrix.md` E14), one rule: **`continuity_response`:** the player contacts Rachel again and checks one thing (the plan, her profile, Juno, Dani); **`unresolved_follow_up`:** no new message, but her thread and profile reopened and two investigating actions; **`re_engagement`:** at the latest, clock 11:45 PM. It can come as early as 11:33. Once eligible, it arrives 30–45 seconds of real time later while the phone is held (no typing indicator; the story clock doesn't move for the wait); if the phone is put down meanwhile, it arrives on the desk | MSG_1048 from her account: punctuated, formal, apologises for tonight (Continuity's writing part reads only the chat, never Plans), closes February; a notification if elsewhere, or the phone lighting up on the desk if it's down; in her thread a new last bubble, no typing; `1 new message` if scrolled up | open; screenshot; show Juno; show Dani | `saw_fake`, `fake_trigger`, `fake_generated_at` (the real time), `saved_msg_1048`; `juno_active_at_message` | — | — |
| `N1_JUNO.bring_fake` | Beat | O | the player forwards MSG_1048 to Juno, or says yes when Juno asks to look | Juno is given the message and its source; it answers only what the player says (see What Juno says about the fake); if asked who sent it, its fixed line (E15) | ask; name what doesn't fit; ask again; leave | `fake_forwarded_to_juno`, `context_delivered_to_juno`, `fake_mismatch_named`, `misleading_reply_delivered`, `asked_again_after_answer` | ATTEND / ACKNOWLEDGE, then REASSURE (fixed) / CLOSE_RISK | message |
| `N1_JUNO.held_back` | Beat | O | right after `N1_JUNO.bring_fake` | Juno asks what the player was about to say to Rachel; Suggested replies (only those the player's facts allow) | pick; type; decline | `private_line_selected`, `private_line_sent_to_rachel`, `private_line_known_only_to_juno` | ADVISE / REDIRECT | message |
| `N1_EVIDENCE.style` | Beat | O | the player tells Juno the message doesn't sound like Rachel (an answer to `what feels off about it?`, or typed), or forwards one of her own messages to compare | Juno agrees it reads differently; if the player says how (Suggested or typed), that's the style signal. Juno never asks for it unprompted | pick; type | `knows_style_mismatch`, `style_signal_confirmed` or `style_signal_extracted` | ACKNOWLEDGE / STYLE_CONFIRMATION | message |
| `N1_EVIDENCE.last_active` | Beat | O | the player shows Juno the refreshed profile | a narrow, true answer about what Last Active means | answer | — | NARROW / CLOSE_RISK | showJuno |
| `N1_ROOM.put_down` | Action | O | Put Down, any time | the room at the desk; the phone on the desk, the power bank beside it | look around; plug in; Wait; pick up (→ lock screen) | `screen_inactive` (weak exit signal) | — | room actions only |
| `N1_ROOM.card` | Action | O | looking in the drawer | Rachel's handwritten card; the charger without its cable | read | `read_rachel_card` | — | +2 min |
| `N1_POWER.bank` | Action | O | plugging the power bank in | screen on: barely offsets the drain; phone down: charges | Wait 5 / 10 min; pick up | `power_bank_used`, minutes down | — | Wait 5 / 10 min |
| `N1_BATTERY_SAVER_OFFER` | Event | O | battery 10% | Orbit's Battery Saver sheet | accept; decline | `saver` | — | — |
| `N1_ERASE_WARNING` | Event | R if reached | clock 12:30 AM | Orbit banner: Rachel's account closes soon | — | — | — | — |
| `N1_ERASE` | Event | R if reached | clock 12:40 AM | her profile gone; the thread becomes `Orbit User · Formerly Rachel H.` below `Account removed · Wed 12:40 AM`; the composer stays; screenshots stay | — | `purged` | — | — |
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

**Night 2 (agreed approach, 2026-10-24):** one shared skeleton of five required beats (Dani's message the next day; back into Orbit that night; the second fake; material that proves Continuity exists; the route choice: keep / Disable Juno / Delete Orbit). Night 1's states change only how these beats look, never add branches. The second fake has an **intent** fixed by the event, never by the player (Night 1's fake closes the questions that could take the player outside Orbit, the missed meeting and February, while keeping the relationship warm; Night 2's keeps the retained relationship going inside Orbit, triggered by the player coming back; Continuity never reads Dani's chats); however much material it has, it never turns into a Rachel who answers everything. When it is sent is Continuity's own eligibility rule; the player replying doesn't trigger it. Its content and style are two separate axes (decided 2026-11-10), and the sources are used only as the message needs them, never all forced in: **content** (what it says) answers what the player wrote in Rachel's thread after the fake, if anything, and reuses a line known only to Juno, if there is one (both can appear together); with neither, the Check-in answer; otherwise a non-personal fallback. **Style** (how it's written) uses the style signal the player gave Juno, else Continuity's default Rachel. The change in style is never pointed out; Night 3's export proves it was used. Where a style signal came from and whether a line is "known only to Juno" are separate records: a style feature the player also told Dani still reached Orbit through Juno; a held-back line the player also sent to Rachel is no longer Juno's alone. What the player named as not fitting (`fake_mismatch_named`) is never a source. The states Night 2 reads: the reschedule found; style mismatch confirmed; removal known; Dani asked; a private line known only to Juno; Auto-Coordinate and Follow-up replies on or off; what Juno was given and said about MSG_1048; Check-in answered or skipped; power bank remaining.
