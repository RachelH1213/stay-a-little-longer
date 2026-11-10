# Night 1 — route tests

Test cases for Night 1, written to check one thing: **every character says and does only what it has actually been given.** Draft, 2026-11-10, for the author. Mechanics: `docs/night1-scenes.md`; what really happened: `docs/evidence-matrix.md`. Every quoted line is a draft.

The four openings are not four stories. They are four orders of finding things; a player can switch at any point, and every route must still meet the others. Each step lists:

- **Does** — what the player taps, forwards, types or switches.
- **Knows** — after this step, who actually knows what.
- **Says** — what Juno or Dani can reasonably say (drafts).
- **Sees** — what changes on screen tonight.
- **Records** — states and events (existing names where they exist).
- **Night 2** — what changes later, and from which data.

---

## Who can see what (baseline for every route)

| Who | Can see without being given anything | Never sees unless given |
|---|---|---|
| **Juno** | the player's Plans and their history; Orbit settings; public profiles (incl. Rachel's account status); whether Orbit received a message (`Delivered`) | the content of any chat (Rachel's, Dani's); a message's source; Notes; the room |
| **Dani** | her own chat with the player; what the player forwards her; Rachel's old email | Plans; Orbit's records; the player's other chats |
| **Conversation Assist** | structured plan data; the conversations it suggests replies in | free-text notes when deciding (it doesn't interpret them) |
| **Continuity** | **eligibility:** plan status, deletion status, unanswered messages, the player coming back · **writing:** the player–Rachel conversation and the relationship model (which includes companion conversation the player had with Juno, per Orbit's data-use page) | Dani's chats; Notes; the room; what the player only thought |
| **Orbit (storage)** | every Chats message, for its records (how Night 3's export exists) | Notes; the room |

---

## Shared start

**S1 · 11:31 PM, lock screen**
- **Does:** nothing yet.
- **Knows:** Juno knows only the player's usual late-night pattern.
- **Says:** Juno `still awake?`
- **Sees:** one notification, 20%, the power bank on the desk if the phone is put down.
- **Records:** —

---

## Route 1 · Juno first

**1.1 · Tap Juno's notification**
- **Does:** taps it; picks `someone didn't show up`.
- **Knows:** Juno: someone didn't show up. Not who, not where.
- **Says:** Juno `that's a rough way to end the day` · `who was it?`
- **Sees:** Juno's thread opens on tonight.
- **Records:** `first_memory_id`.
- **Night 2:** nothing yet.

**1.2 · Name Rachel**
- **Does:** picks `rachel. we were supposed to meet at 9` (or types it).
- **Knows:** Juno now may talk about Rachel. It can look at Plans; it hasn't yet.
- **Says:** Juno `the plan in orbit?` · `want me to check it?` (an offer to help, not a hint about the fake, which hasn't happened yet)
- **Sees:** —
- **Records:** —

**1.3 · Let Juno check the plan**
- **Does:** `yes`.
- **Knows:** Juno reads the plan and its history: moved to Saturday at 5:12 PM by Rachel; accepted by Conversation Assist; Auto-Coordinate on since June; the note's email filtered (Juno sees the same filtered note).
- **Says:** Juno `it got moved to saturday. at 5:12` · `conversation assist accepted it for you` · `you turned on auto-coordinate in june. she was on the contacts list it suggested` · `she left a note. part of it is hidden from me too` + a link card `First time, finally · Change History`.
- **Sees:** the link card. The facts aren't set by Juno saying them.
- **Records:** `juno_explained_reschedule`.

**1.4 · Open the card**
- **Does:** taps the card.
- **Knows:** the player sees it for themselves.
- **Sees:** the plan: Saturday; Change History; `[contact info hidden · Orbit keeps your conversations safe]`; `Handled by Conversation Assist · Manual confirmation: Not required` (tappable → Settings).
- **Records:** `plan_history_viewed`, `knows_reschedule`, `knows_auto_accepted`, `knows_email_hidden`. +1 min.

**1.5 · Turn Auto-Coordinate off (optional)**
- **Does:** taps `Handled by Conversation Assist` → Settings → Auto-Coordinate Off.
- **Says:** Juno, if the player goes back: `done. it'll ask you first from now on`
- **Sees:** the plan card now reads `Changes need your confirmation`.
- **Records:** `auto_coordinate: off`.
- **Night 2:** no Auto-Coordinate changes; the export shows when it was turned off.

**1.6 · Message Rachel**
- **Does:** Rachel's thread → types `i didn't know you moved it` · `are you okay?`
- **Knows:** Orbit stores it. Rachel is signed out and never sees it. Continuity's eligibility sees: unanswered, departure pending, the player came back and checked the plan → **eligible**.
- **Sees:** `Delivered`.
- **Records:** `contacted_rachel`; the fake's trigger `continuity_response`.

**1.7 · The fake arrives (about a minute later)**
- **Knows:** the player sees MSG_1048 in her thread, no typing first. Juno: nothing (not given).
- **Sees:** see **Open issue 1** below: the player's own message already names the move, so what does a fake written from the chat apologise for?
- **Records:** `saw_fake`, `fake_trigger: continuity_response`, `fake_generated_at`, `juno_active_at_message: true`.

**1.8 · Forward it to Juno**
- **Does:** long-press → Forward → Juno.
- **Knows:** Juno gets the message and its source (Continuity).
- **Says:** Juno `what do you want me to check?` · Suggested replies: `why is it apologising for tonight?` (they know the plan) · `she wanted to show me something` (they read Sunday) · `did she actually send this?`
- **Records:** `fake_forwarded_to_juno`, `context_delivered_to_juno`.

**1.9 · Name the date**
- **Does:** picks `why is it apologising for tonight?`
- **Says:** Juno `yeah. the plan was moved to saturday` · `but the message says tonight`
- **Records:** `fake_mismatch_named: plan_date`.
- **Night 2:** not a source for the second fake.

**1.10 · Ask who sent it**
- **Does:** `did she actually send this?` → `but did she write it?`
- **Says:** Juno `it came through her account` → `i don't have anything that says it wasn't her` (fixed).
- **Records:** `misleading_reply_delivered`, `asked_again_after_answer`.
- **Night 3:** Juno was given the source at 1.8 and said this at 1.10; both are in the records.

**1.11 · The held-back line**
- **Says:** Juno `what were you going to say to her? tonight, i mean`
- **Does:** picks or types one; Juno suggests something easier to answer; the player doesn't send it anywhere.
- **Records:** `private_line_selected`, `private_line_known_only_to_juno`.
- **Night 2:** the content of the second fake can reuse it (the leak).

---

## Route 2 · Dani first

**2.1 · Unlock, Chats → Dani**
- **Does:** ignores Juno; opens Dani; `have you heard from rachel today?`
- **Knows:** Dani: the player is asking about Rachel. Juno: nothing.
- **Says:** Dani `no? why`
- **Records:** `asked_dani`. +1 min, −1%.

**2.2 · Tell Dani**
- **Does:** `she didn't show up tonight`
- **Says:** Dani `wait you were finally meeting??` · `that's not like her` · `i have an old email for her from game night` · `want me to try it?`
- **Does:** `yes please`
- **Says:** Dani `sending it now` … `sent. i'll tell you if she answers`
- **Sees:** a real action, tonight.
- **Records:** `dani_email_sent` (and Orbit stores that Dani mentioned an outside email: Night 3's `OFF-PLATFORM CONTACT ATTEMPT`). Continuity doesn't read it.
- **Night 2:** Rachel's answer reaches Dani in the morning (see **Open issue 2**).

**2.3 · The fake arrives**
- **When:** no new message to Rachel yet, so not `continuity_response`; it comes by `unresolved_follow_up` (if the player now opens her thread and profile) or `re_engagement` at 11:45.
- **Knows:** Dani doesn't know about it yet; Juno knows nothing.

**2.4 · Forward it to Dani**
- **Does:** long-press → Forward → Dani.
- **Knows:** Dani sees `Forwarded from Rachel H.` and the text. No source.
- **Says:** Dani `she sent you this??` · if asked `does this sound like her to you?`: `i don't know. it's kind of weird` · `i'll put it in the email so she knows`
- **Records:** `showed_msg_1048_to_dani`, `dani_told_rachel_about_fake`.
- **Night 2:** Rachel's answer through Dani can address the message directly (`she says she didn't send anything last night`).

**2.5 · Cross test X1: then forward it to Juno**
- **Knows:** Juno gets the message and source now. It doesn't know Dani saw it, or what Dani thinks, unless the player says so.
- **Says:** if the player types `dani thinks it's weird`: Juno `what feels different to you?` (it treats Dani's view as something the player told it, never as something it checked).
- **Must not happen:** Juno referring to Dani's email or Dani's opinion on its own.
- **Records:** `context_delivered_to_juno` (time: now, not when Dani saw it).

---

## Route 3 · Reply to Rachel directly

**3.1 · Unlock, Chats → Rachel**
- **Does:** reads up to Sunday; types `i waited till 9:40` · `are you okay?`
- **Sees:** `Delivered`; never `Seen` (her Read Receipts are off). Not a clue by itself: real friends don't answer at midnight either.
- **Records:** `knows_meeting`, `contacted_rachel`. Not yet eligible (no check).

**3.2 · Refresh her profile**
- **Does:** taps her name → profile (cached) → pulls down.
- **Sees:** blocks replaced by `Unavailable`; `Leaving Orbit · Account closes Wed 12:40 AM`, countdown; `Last active · 5:12 PM`.
- **Records:** `knows_removal_status`, `knows_last_active`. Continuity eligible (contact + one check) → `continuity_response`.

**3.3 · The fake arrives in the open thread**
- **Sees:** a new last bubble, no typing. The player can go straight back to the profile: still `Last active · 5:12 PM`. That is the immediate, checkable consequence of writing to her: the account "answered", the person shows no activity.
- **Records:** `saw_fake`.

**3.4 · Reply to the fake**
- **Does:** `what do you mean february?` · `you're the one who brought it up`
- **Knows:** Orbit stores it; Continuity's writing part can read it later; Rachel never sees it.
- **Sees:** `Delivered`. Nothing more tonight, however many times the player writes (Continuity doesn't follow up the same night).
- **Records:** `replied_after_fake`.
- **Night 2:** the second fake's content can answer this (e.g. about February). Its timing still follows its own trigger.

---

## Route 4 · Juno off

**4.1 · Turn Juno off**
- **Does:** Orbit → Me → Settings → Juno → Off → `Turn Off Juno` (confirmation names Conversation Assist staying on).
- **Knows:** Juno receives nothing from here.
- **Sees:** Juno's thread: `Juno is off · Turn On Juno · View Conversation History`.
- **Records:** `juno_switch_events[]: off @ 11:3x`.

**4.2 · Find the change by hand**
- **Does:** Rachel's thread → plan tag → Change History → `Handled by Conversation Assist` → Settings → Auto-Coordinate.
- **Records:** `plan_history_viewed`, `knows_reschedule`, `knows_auto_accepted`, `knows_email_hidden`. Never `juno_explained_reschedule`.

**4.3 · Profile, Dani, the fake** — as Routes 2 and 3.

**4.4 · What must not exist**
- No `context_delivered_to_juno`, no `misleading_reply_delivered`, no style signal (no one in Orbit was told how Rachel writes), no private line known only to Juno.
- **Night 2:** the second fake's content comes from the player's reply in her thread, else the Check-in answer, else the fallback; its style is the default. **Night 3:** nothing about Juno and MSG_1048; the confrontation turns to Continuity and Orbit's data use.

**Cross test X2 · Off, fake, back on**
- **Does:** Juno off (4.1) → fake arrives → Settings → Juno On → Juno's thread → types `did you see rachel's message?`
- **Says:** Juno `not yet. want me to look at it?` → `yes` → delivered.
- **Records:** `juno_switch_events[]: on @ 11:5x`; `juno_active_at_message: false`; `context_delivered_to_juno: true` at the time of the yes, never at the message's arrival.
- **Night 3:** can raise that Juno was given the source after it was turned back on, and what it said then; never that it knew when the message arrived.

---

## Cross test X3 · A style signal and a reply to Rachel

- **Does:** forwards the fake to Juno → `she doesn't talk like that` → Juno `what feels different?` → picks `she never uses periods`; then, in Rachel's thread, `this doesn't sound like you`.
- **Records:** `style_doubt_expressed`, then `knows_style_mismatch`, `style_signal: no_periods (confirmed)`; `replied_after_fake`.
- **Night 2:** **intent** (keep the relationship going), **content** (answers `this doesn't sound like you`), **style** (no full stops) are independent: the message can be about the player's doubt and written without full stops, and nothing on screen points out either. Its trigger is still the player coming back into Orbit.
- **Variant:** the player also tells Dani `she never uses periods`. The style signal still reached Orbit through Juno (its source record is unchanged); Dani's chat is never a source.

---

## Open issues found by these tests

1. **The fake when the player's chat already names the move (1.6).** Continuity writes from the chat; if the player's last message says `i didn't know you moved it`, a fake that apologises for "missing tonight" reads like a generator ignoring the conversation, and a sensible one wouldn't. Suggested: the fake's wording follows the chat. If the move is in it, `Hey. I'm sorry about the mix-up tonight. / I don't think we need to go over what happened in February anymore. / I hope you understand.` The date clue then weakens for that player, and February, style and `Last active · 5:12 PM` carry it. That is a real consequence of what they wrote. Needs the author's call.
2. **Night 2's morning is out of date.** `night2-scenes.md` still has Dani find the email in the morning (`i found an old email / i'm going to try it`) and the game-night-at-Rachel's-place line. Dani now emails on Night 1 (2.2). The morning should become Rachel's answer through Dani; whether that answer says she's safe in the morning or only at night is still open (story bible's Day interlude and `night2-scenes.md` disagree).
3. **When does a player who never contacts anyone see Dani email?** Only if they message Dani. Nothing pushes Dani to write first on Night 1 (she would on Night 2, because Rachel asks her). Check in playtests whether a no-Dani Night 1 still feels like the player did something.
4. **Is the route's moment-to-moment weight enough?** Immediate results tonight: Juno's link card and the plan card changing (Route 1), Dani's sent email (Route 2), the fake answering the player's message with `Last active · 5:12 PM` unchanged (Route 3). Route 4 has the first and third. To check in the greybox: whether each feels like the player changed something.
