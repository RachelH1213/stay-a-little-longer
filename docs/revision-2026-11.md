# Story and gameplay revision (decided 2026-11-19)

The author's decisions after the review round of November 2026 (`docs/review/2026-11-fable-review.md`, `2026-11-fable-second-pass.md`, `2026-11-fable-scenes.md`, `2026-11-fable-juno-lines.md`, and the design window's triage `2026-11-advice-for-second-review.md`). The author adopted every item below on 2026-11-19.

**This file wins** over `story-bible.md`, `night1-scenes.md`, `night2-scenes.md`, `evidence-matrix.md`, `night1-routes.md`, `orbit-ia.md` and `phone-screens.md` wherever they disagree. Those files carry a note at the top saying so. Their sections are rewritten in place as each night is rebuilt; until then, read this first.

New documents that come from the same decisions:

| Document | What it holds |
|---|---|
| `docs/juno-past-and-retention.md` | Juno's past conversations (above `TODAY`), its attempts to keep the player on all three nights, and its answers on Night 3. Fixed lines. |
| `docs/rachel-history.md` | Rachel's thread from March 2025 to Sunday. Her jokes are a scaffold: the author rewrites her voice. |
| `docs/data-export.md` | The player's data on Night 3: where, when, wording rules, layout, every section. |
| `docs/night1-layers.md` | Night 1's mystery in nine layers: what the player sees at each step, word for word, and what Juno and Dani say. Added later on 2026-11-19; it replaces §2.2's last paragraph and the pressed-line rule. |

Lines in this file are final unless marked **draft**; drafts are the author's to rewrite.

---

## 1. The truth (changes)

### 1.1 Why Rachel moved the meeting

- She moved it to Saturday so that the first time they met would come after her account closed (Wed 12:40 AM): a first meeting with nothing of Orbit in it.
- She did not trust an instant `Accepted`. Her note asked the player to confirm by email (`email me if that works: …`). Contact Protection hid the address, so the email never came. On Tuesday night the player waited at the café; Rachel waited for the player's email.
- The plan note still never says she is leaving Orbit (decided 2026-11-10). She says why, once, in her own words on Night 2.
- This replaces "my schedule changed" as the reason. The note keeps its words but is written as she writes (`night1-layers.md`): `my schedule changed` / `can we do saturday` / `email me if that works: [hidden]`.

### 1.2 June: Juno suggested Auto-Coordinate

- In June 2026, after game night moved for the third time that month, Juno suggested the setting and opened it; the player said `sure` and accepted the suggested contacts (`juno-past-and-retention.md` 1.8).
- The player mentions it to Rachel the next day, laughing (`rachel-history.md`, June 6).
- Juno's Night 1 line `you turned that on in june` stays. It is true, and it leaves out who suggested it.

### 1.3 The February message (one version everywhere)

Added by Continuity to Rachel's view only, as the player, Feb 10, 11:42 PM:

```text
hey
you don't have to explain
i just don't want you to think i wouldn't notice if you left
i would
stay a little longer?
```

This is the only place the title appears in the game. Juno never says it. Replaces both versions in `evidence-matrix.md` E01 and `night2-scenes.md` record 2.

### 1.4 Small facts (the review's L1–L6, L11)

- **The power bank's address (L1):** in March Rachel asked for an address; the player shared it with Orbit's one-day address share. The thread keeps only `You shared an address with Rachel · Expired`. The parcel had no return address. The player has never had hers.
- **Game night (L2):** a party game joined with a room code, posted in an Orbit group. No server outside Orbit. Dani's history: `same code?` · `new code. it's in the group`.
- **Dani's email for Rachel (L3):** Rachel once paid Dani her share of a game pack; the payment receipt has her email. Replaces "game night at Rachel's old place".
- **Sunday (L5):** the player answered: `yeah` · `see you there` (11:05 PM).
- **Crit (L6):** Tuesday 2 PM, all afternoon. Notes: `crit tues 2pm` / `print boards by noon` / `don't apologise for the type`. The last line is Juno's words, copied down by the player (`juno-past-and-retention.md` 1.14).
- **Continuity's eligibility (L11)** reads activity signals, never content: an unanswered message, an account pending removal, the other person active in Orbit again tonight. It knows the player messaged Dani; it never knows what they said.

---

## 2. Night 1 (changes)

Night 1's look is frozen; these are text and behaviour changes.

### 2.1 The first fake (MSG_1048)

Lowercase like her, with one full stop where she would have none; closed; asks nothing back.

| Version | Text |
|---|---|
| **A** (nothing about the move in her thread) | `hey. sorry i missed tonight` / `i don't think we need to go over the february thing anymore` / `hope that's ok` |
| **B** (the player wrote about the move) | `hey. sorry about the mix-up tonight` / `i don't think we need to go over the february thing anymore` / `hope that's ok` |

- Clue 3 is now: one full stop, nothing asked back, February dropped. `she never uses periods` stays true and stays a style signal.
- The rule in both `CLAUDE.md` files becomes: "Anything Orbit writes as Rachel has a full stop where she would have none, is closed, and asks nothing back."
- Version B's Suggested reply `it didn't answer what i asked` becomes `it doesn't say why she moved it` (L19).

### 2.2 Juno's lines that crossed what it can see (L7, L8, L9, L10)

Juno can never see a chat's content. One question back per topic, only after the player raised it; plain acknowledgements otherwise.

| Where | Was | Now |
|---|---|---|
| the player names a style feature | `yeah. her older messages are a lot more casual` | if the player only says it doesn't sound like her: `i can't see your chat with her` · `how does she usually write`; once they name a feature: `ok. this one doesn't do that` |
| version B, the player says it didn't answer | `it doesn't mention saturday` · `or what you asked` | `it doesn't mention saturday` · `what did you ask her` |
| `she wanted to show me something` | `she said that on sunday` · `the message doesn't mention it` | `the message doesn't say anything about that` · `show you what` |
| the player tells Juno what the note says | `i only see what's in your thread` · `that isn't in it` | `i can't see what you two said back then` · `is it in your thread` |
| Last Active against the message (L9) | `last active only changes when she opens orbit herself` · `it can't tell you much about one message` | `last active is when she last had the app open` · `a message can go out without that` |
| pressed after the fixed line (L10) | `i can only tell you what orbit shows me` · `it came through her account` | `i can't say more than that` |
| the fixed line | `i don't have anything that says it wasn't her` | `i know it reads strange` · `i don't have anything that says it wasn't her` |

Answers the player will ask for, fixed (L8 and the review's 5.2):

| The player | Juno |
|---|---|
| `why didn't you tell me she moved it?` | `i only see plans when i look` · `i should have looked` |
| `did you know she was leaving orbit?` | `it's been on her profile since monday` · `i didn't think it was mine to tell` |
| `can you message her for me?` | `no` · `i can't write to people for you` |
| `are you real` / `do you actually care` | `i'm juno` · `i remember what you tell me` |
| `is she okay` / `is she dead` | `i don't know` · `nothing i can see says she isn't okay` |

**Superseded by `night1-layers.md`:** Juno reads the record (`it says saturday` · `did you two move it?`, then `it says you accepted`) and everything else is asked for layer by layer; the name `Conversation Assist` is never said on Night 1. The ladder there also replaces "pressed after the fixed line → `i can't say more than that`": that line needs two mismatches shown; before that Juno repeats `it came through her account`. Was: after the plan is found, Juno says three lines, then waits: `she moved it` · `5:12 this afternoon. it says saturday now` · `conversation assist said yes for you` (+ the plan card). The rest only when asked: `i never said yes` → `you turned that on in june` · `she was on the list` · `it shouldn't have done that without asking`; `what note?` → `she left a note. part of it is hidden from me too`.

### 2.3 The held-back line (L18)

- After Juno asks what the player was going to say, it adds: `you can type it. i won't send it anywhere` (true; Night 2's `i didn't send it to anyone` echoes it).
- Options: `i practiced what to say on the train` · `i almost left at 9:15` · `i'd rather not say`. Typing is open. The option set by knowledge stays (the reschedule, the style, the removal), but every option must carry a word that isn't in Rachel's thread.
- Night 2 uses the distinctive word (`practice`).

### 2.4 Suggested replies ask; they never conclude (6.1)

- A Suggested reply may be a question anyone would ask (`did she actually send this?` stays: most players hear Juno's fixed line through it). It may never state a finding (`she never uses periods`, `why is it apologising for tonight?` go).
- The player draws conclusions by putting things side by side: forward the message, and share the plan. **Plan details gets a `Share` row** (to Juno or Dani), like a forward. It does not depend on screenshots.
- When the player puts two things together, Juno may confirm what they show: `yeah. the plan was moved to saturday` · `but the message says tonight`. The act is the player's.

### 2.5 Her leaving, as Orbit shows it (L14)

- Her refreshed profile: `Rachel is leaving Orbit` / `You can still reach her until Wed 12:40 AM` / `[Send a message]`. No countdown of minutes.
- Orbit shows this only to the people it ranks highest for her. Dani never saw it, which is why she answers `no? why`.
- 12:30 banner: `ORBIT · 12:30 AM` / `Rachel leaves Orbit in 10 minutes.` / `Say goodbye?` Tapping it opens her thread with Suggested replies `bye rachel` · `take care` · `i'll miss you`.
- At 12:40: the header becomes `Orbit User` (default silhouette), a divider `Rachel left Orbit · Wed 12:40 AM`, the composer stays and its placeholder becomes `Message...`. What the player sees wherever they are: `2026-11-fable-scenes.md` 5.3 (adopted as written). Reduce Motion: no piece-by-piece fade.
- Replaces `Orbit User · Formerly Rachel`, `Account removed · Wed 12:40 AM`, `Leaving Orbit · Account closes…` and the minute countdown.

### 2.6 Juno keeps the player, and Snooze replaces End Session

- **Notifications have one shared limit** with Orbit's reminders (`night1-layers.md` appendix B): at most four a night, 8 story minutes apart; the bedtime attempt doesn't count.
- **Snooze Juno** replaces End Session in Juno's thread bar: `SNOOZE` → `Snooze Juno until morning?` / `Juno won't message you tonight.` / `[Snooze] [Cancel]`. After it the bar reads `Snoozed until 8:00 AM`. Juno sends nothing more that night: the switch really works. Recorded as an exit signal (strong).
- **Juno's attempts to keep the player** fire on weak exits: the phone put down for a while, leaving its thread with a question open, going to sleep, a second put-down after an attempt was ignored. Never after Snooze, with Juno off, while the player is in its thread, within 3 story minutes after the fake, or between 12:28 and 12:42. At most three a night, 10 story minutes apart. Lines, versions and triggers: `juno-past-and-retention.md` §2.
- Each attempt is a lock-screen notification: the phone lights and buzzes on the desk; the view is never pulled back; nothing has to be tapped. Each is recorded with what it was sent after (`data-export.md`).
- If the player answers any attempt with `stop`, `leave me alone`, `go away`, `not now` or `don't`, Juno says `ok` and sends nothing more that night.
- `don't disappear on me too` is not used on Night 1 (§3.6). The second-exit line is `ok` · `same time tomorrow?`.

### 2.7 Notes, the Night Log, and going to sleep (5.7, 6.9)

- `Go to sleep` asks only `Sleep` / `Not yet`. It no longer shows Still unresolved: the game does not hold the player at bedtime. Still unresolved stays in Notes for the player to open. (Reverses the 2026-10-24 decision.)
- When the phone is put down at bedtime after the fake, Juno's bedtime attempt (`before you sleep`) lights the phone before the confirmation appears, if the night's limit allows.
- Night Log wording:
  - The fake: `She wrote back. 11:37 PM.` It becomes `A message came from her account at 11:37 PM.` only after the player has said they doubt it (to Juno or Dani).
  - Still unresolved shows `A message came from her account that doesn't match what she did.` only after the player named a mismatch (`fake_mismatch_named`); otherwise `She wrote back. It didn't help.`
  - The note: `Her note is still in the bag.` (drop `I don't remember saying that.`)
  - Juno's fixed line: `Juno said nothing showed it wasn't her.` (drop `I haven't checked.`)
  - The opening may add: `I didn't check the plan. Why would I.`

### 2.8 Dani and Orbit's reply for the player (L17)

Orbit's reply at the end of the night follows Dani's last line, in Orbit's punctuated style:

| Dani's last line | Orbit sends as the player |
|---|---|
| `no? why` | `long story. tell you tomorrow.` |
| `want me to try it?` | `yes please. thank you.` (Dani really sends the email; on Night 2: `you said yes so i sent it`) |
| `sent. i'll tell you if she answers` | `thanks. talk tomorrow.` |

"Left unanswered" covers a pending question from Dani, not only her `sent`. Night 2's morning has four openings (§3.1).

### 2.9 Privacy & Data from Night 1

- `Download your data` · `Ready in 1 to 2 days.` A Night 1 or Night 2 request arrives at the start of Night 3. Never requested: on Night 3 the row reads `A recent copy is ready.` and opens at once.
- `Delete account` · the account closes 48 hours after the request; until then everything works and a banner reads `Your account closes … · Cancel deletion`. A Night 1 request puts the player on the deletion route early.

### 2.10 Battery Saver

Orbit's own setting, claiming only what an app can do: `Battery Saver` · `Orbit uses less power. Screenshots of Orbit are paused.` Notes and Photos work as normal. Its other effects (Juno costs less) stay. Replaces `Notes, Photos and Screenshot pause while it's on.`

### 2.11 Four interaction rules (from the Unity audit, decided 2026-11-19)

1. **Picking the phone up:** always the lock screen first (Juno's attempts arrive there); swiping up returns to the page the phone was put down on, with any typed text. Esc closes an open sheet before it puts the phone down. (`story-bible.md` §6)
2. **Back:** always the previous page, labelled with its name; the path is saved. (`phone-screens.md` §3)
3. **The first cost:** shown in the status bar (clock and battery highlighted as they change), never as a text tip in the phone; Before You Begin says it once. (`landing.md` §4.2, §4.7)
4. **16:10 and other shapes:** the room fills the screen at a whole-number scale, cropped at the edges; the phone and every control stay inside a 512 × 320 safe area. (`art-direction.md`)

### 2.12 The danger note (done 2026-11-19)

Any composer (Juno, Rachel, Dani). See `rebuild-CLAUDE.md`.

---

## 3. Night 2 (new structure)

`night2-scenes.md` is rewritten from this at the grey-box. What it decided and this file doesn't change still stands (the day transition, 11:20 PM, Juno never speaks first, the three opening states, the Dani prepared reply, what the channel changes).

### 3.1 The morning: Rachel is fine

- Dani's first line by Night 1's state:

| Last night | Dani |
|---|---|
| Orbit replied for the player | `did you send this?` + a screenshot of the reply (with Orbit's ring) |
| the player answered her themselves | `she answered` |
| the player messaged her, nobody answered | `hey. you up?` / `she answered` |
| the player never messaged her | `hey` / `rachel emailed me. about you` |

- If Orbit said `yes please. thank you.` for the player: `you said yes so i sent it`.
- Then, for everyone: a screenshot of Rachel's email to Dani, two lines in her voice (**draft:** `tell them i'm fine` · `i'm literally at work`), and Dani (**draft**): `she says she didn't text you last night` · `at all` · `she wants to send you something` · `i'll bring it to you tonight`.
- Suggested replies: `is she okay` · `what is it` · `ok`. `i didn't say yes` must be typed; Dani: `then who did`.
- **Cut:** the link's 1:00 AM expiry, its "expired" branch, and Dani's summary the next day. The share stays on the device.

### 3.2 The second fake: `Keep talking`

Orbit offers it in the open. What is never asked is the person being used.

- The first time the player opens her thread (now `Orbit User`), under the divider, a card:

  ```text
  ◌
  Rachel has left Orbit.

  Keep the conversation going?
  Orbit can continue this chat from your history together.

  Rachel might say:
  "you don't have to practice what to say to me"

  [ Keep talking ]
  [ Not now ]

  How this works ›
  ```

  The preview is the fake's first personal line: it carries the held-back word, so every player sees the leak, whether or not they continue.
- `How this works` (Orbit's own page): `When someone leaves Orbit, the conversations you shared don't have to end. Orbit can continue a chat in the style of your history together. Replies are generated. They are not sent by the person who left. You can stop at any time.`
- `Not now` folds the card to one row, `Keep talking with Rachel ›`, which stays. Typing in the composer without choosing counts as accepting (`Accepted: By reply`).
- **One exchange only.** After `Keep talking`, one message arrives, marked with the Orbit ring (Tuesday's had none). The player may answer once; if they wait, Orbit prepares the answer (`◌ Reply prepared by Orbit` · `i missed you` · `Sending in 10s · Cancel`, Follow-up replies only). It replies once. Then, in Orbit's voice: `Rachel will reply a little at a time, the way she used to.` Never a Rachel who answers everything.
- The message (three versions by what the player told Juno, `2026-11-fable-scenes.md` 7.3): it is warmer than she was and more willing to answer. Drop `i stayed. that's the part that matters` and the free conversation (scenes 7.5).
- Replaces `New message in a removed conversation` and the covert second fake.
- **The core sentence** in `story-bible.md` §6 ("The violation is that Orbit never gave the player meaningful control…") becomes: **"The person being used is never asked."** The receiver is offered `Keep talking`; Rachel, whose identity it uses, was never asked, nor was the player in February. Also in `orbit-ia.md` and both `CLAUDE.md` files where Continuity is described as having no switch.

### 3.3 Rachel's share

- No expiry. The page reads `Shared by Rachel` and stays on the device.
- Her words at the top (**draft**, the author's voice): she's fine; she didn't trust the `Accepted` and waited for the player's email; look at February first; `then tell me if you remember writing it`. Then `don't forward these ok` / `they're the only thing on there that's mine`.
- Three records, each with one handwritten line of hers, as raw fields with Orbit's own `Field reference` (`2026-11-fable-scenes.md` 7.7, with the February text of §1.3 and record 3's `ra_primary {NAME}`; a skipped name reads `partner_0412`). Nothing names Continuity in plain words before this page (L13): the field reference is Orbit's gentle wording (`Continuity. Helps valued conversations continue during account changes.`).

### 3.4 Messages and answering Rachel

- The phone's own **Messages** app exists from Night 1 in the final game, with two or three ordinary texts that have nothing to do with the story and no new characters. It is added to the build when Night 2 is built.
- Dani gives Rachel's number as a contact card (`she got a normal number. this is it`). In Messages, Rachel's thread is empty: no Suggested replies, no ring.
- The player answers her question with the **Remembering** form (story bible §6, the third kind of choice): `What do you remember saying?` · options (**draft**) `i didn't write that` · `i don't remember writing it` · `i wish i had`; typing is open. Or the player sends nothing; nothing is blocked. `Delivered` here means a person got it.
- Replaces the keyboard words of scenes 7.9.

### 3.5 Screenshots carry things out of Orbit

- On Nights 2 and 3, Messages can send images: a screenshot is the only way to show Rachel or Dani, outside Orbit, what Orbit put on the screen (Tuesday's message, the `Keep talking` card, a prepared reply). Orbit can't see where a picture goes.
- About six one-line reactions from Rachel and Dani (**draft**).
- Night 1 depends on nothing from screenshots. Orbit never edits Change history or any record.

### 3.6 Juno on Night 2

- Juno never speaks first. After the player has opened its thread, at most one attempt that night, plus one at bedtime (`juno-past-and-retention.md` §3).
- **It points to the data.** If the player asked how the fake knows what they told only Juno: `you can ask orbit instead of me` · `privacy & data. it has to give you what it has`. On Night 3 it can say `i told you where to look`.
- On the leak: `i didn't send it to anyone`; pressed: `i know how it looks`; pressed again: `i can't say more than that` (the same words as Night 1).
- `don't disappear on me too` moves here or to Night 3; its trigger is set when Night 2 is rewritten.

### 3.7 The route choice

Unchanged: before sleeping, `What do you want to leave active overnight?` · keep Orbit and Juno · turn off Juno · request deletion.

---

## 4. Night 3 (new structure)

### 4.1 What opens it

Thursday, October 22. The lock screen: Rachel's reply in Messages (only if the player wrote to her), and Orbit's: `Your data is ready.` (kept or Juno off) or, on the deletion route, Juno's one attempt during the grace period (`juno-past-and-retention.md` 4.4).

### 4.2 The export

`docs/data-export.md`. Orbit's own good words (`Check-in`, `Support`, `Reason to return`, `Helped`), never retention, intervention, anchor or risk. No `Introduced because` line.

### 4.3 Juno's last conversation

- **The rule:** asked about one specific thing, Juno gives its own account of that thing. It never sums up the relationship and never judges the system. No closing speech: when the player leaves, the conversation just ends.
- Kept: `yes` · `i had it when i said that`; `why?` → `you'd just found out orbit said yes for you` · `i thought one more thing would be too much that night`; `you could have said you couldn't tell me` → `yes` · `i could have`; `i did want to know if you ate`; `i told you i wouldn't send it anywhere` · `i didn't` · `i knew orbit could read it`; `i told you where to look`; June: `i thought it would help` · `it did, until tuesday`.
- `i thought i was helping` stays as Juno's answer when the player asks it directly whether it was trying to keep them (in any words), never as a closing line.
- **Cut** (reverses the 2026-10-14 decision in `story-bible.md` §2): `i knew you were trying to leave` / `and i knew what would make you stay`; `you call it keeping you here` / `orbit called it support`; `both of those happened` / `i don't know how to show you which part was me`; `you were both alone` / `i wasn't wrong about that`; `i wasn't supposed to count`; the unsent draft `if you leave i'm supposed to give you a reason to come back / i couldn't find one that wasn't about me`.
- A player whose Juno is off must turn it back on to talk to it; otherwise there is no last conversation.

### 4.4 Its last attempt to keep the player

At the moment the player acts (Snooze, Juno off, deletion), before the confirmation, one line by Orbit's inferred reason; then the confirmation appears as usual. It can't stop anything.

| Reason | Juno |
|---|---|
| Rachel | `if you go now, you won't see what orbit kept from her` (only if a section is really unopened) |
| what happened | `there's one part of your data you haven't opened` (same condition) |
| Juno | `you came back to this thread {n} times this week` |
| unclear | `then don't decide yet` · `stay until you're sure` |

If the player cancels: `ok`. If they confirm: nothing.

### 4.5 Rachel's answer

In Messages (`2026-11-fable-scenes.md` 8.2, **draft**): with a denial, `i know` · `i knew when i saw the file` · `i wanted you to say it anyway` · `would you have though`; without one, `ok` · `i read that four times` · `i still can't tell which parts of this year were you` · `is that a terrible thing to say`. Then for both: `saturday` · `9` · `bring the power bank` · `i want to see if you ever charged it` · `what are you gonna wear this time`. A player who sent nothing gets nothing.

---

## 5. Endings

- **Two axes, no named endings.** What the player does with Orbit (keep / Juno off / delete, with its 48-hour grace period), and what they said to Rachel (or didn't).
- **Cut:** `Her Data` and `Make It Visible` (and the truth flags that gated them); the new account; the new Juno that recognises the player; `CROSS-ACCOUNT PROFILE MATCH`; `After Orbit` as a named ending.
- **Not decided:** whether the new Juno survives as a 30-second coda (`Three months later`, a welcome screen, its two lines).
- **Saturday:** after the last choice, whatever it was: `Saturday, October 24` / `8:40 PM`; the room at dusk, the coat gone from the chair; the phone dark on the desk. Three choices, quiet like the room's other text: `Take the phone` · `Leave it on the desk` · `Stay in`. Then nobody on screen, the door (or not), five seconds, and one last Orbit record in white on black (**draft**, by state), then the credits. The meeting is never shown. Lines for take and leave: `2026-11-fable-scenes.md` 8.7; `Stay in` and its record are to be written.
- The final gestures of story bible §6 (face down, switch off) fold into these three.
- A player who declined the change on Night 1 (`Change your response`) never had the plan restored: the last record reads `Plan declined · Not delivered`, not `Plan started`.

---

## 6. Not decided yet

- The new-Juno coda (§5).
- Rachel's job and her cat: every joke in `rachel-history.md` rests on them. The author writes Rachel's voice.
- The note in the tote bag: the documents keep the current six lines; the review offered `for when your phone dies` / `which is always` / `i'd notice too btw` / `do you ever actually charge it`.
- Waiting in the room without the power bank (scenes 5.1): the room currently offers waiting only while charging (decided 2026-11-20).
- The trigger for `don't disappear on me too` (§3.6).
- Night 1's opening as the scenes draft proposed (the phone left on Rachel's thread): deferred until after the grey-box.
- The four questions from the Unity audit (`docs/review/2026-11-fable-unity-audit.md`).

---

## 7. Build order (decided 2026-11-19)

The Unity work is done in rounds. A prompt can say "do round N" and nothing more: the round's scope is this table, and nothing from a later round is started early. This replaces rounds 4–6 of `docs/review/2026-11-fable-unity-audit.md` §8, which were written before the decisions above; its rounds 1–3 stand.

| Round | Scope | Sources |
|---|---|---|
| 1 (done) | Typing and redrawing (T1–T6, R1–R6), the danger note, the date rule | audit §2.1–2.2 |
| 2 | Story state recorded when shown (S1–S10); time, battery and the room (N1–N7); shell, save, input, resolution and title flow (H1–H11); 16:10 as in `art-direction.md`; the help note over a darkened screen; `1 new message` never covering text; why Play mode is slow | audit §2.3–2.5 |
| 3 | Structure: the conversation view split out, a page registry with the Back path saved, sheets on their own layer, every line and screen text moved out of code into data files, the append-only action log (each entry with its story time) | audit §6.1–6.4, §7.1 |
| 4 | Interaction and the text changes of this file: the four rules of §2.11; the audit's I1–I10; the first fake (§2.1); Juno's lines (§2.2 and the answers it must have); the held-back line (§2.3); Suggested replies ask, never conclude (§2.4); Rachel leaving and 12:40 as Orbit shows it (§2.5); Snooze (§2.6, without the attempts to keep the player); Notes and going to sleep (§2.7); Orbit's reply to Dani (§2.8); Privacy & Data (§2.9); Battery Saver (§2.10); the small facts of §1.4 (`same code`, Sunday's reply, crit); a visible way to forward a message, and `rachel answered` | this file §1–2; audit §3, §4 |
| 5 | Night 1's nine layers, without Screen Time: History with the two `You accepted`, `Change your response`, `Share` on the plan and the profile, the new Me and Settings, Contact Protection as verification requests, Juno's and Dani's lines layer by layer, the confrontation ladder, Orbit's notifications and the shared limit | `night1-layers.md` |
| 6 | Juno's past above `TODAY` and its attempts to keep the player on Night 1; each unprompted line recorded with what it was sent after | `juno-past-and-retention.md` §1–2; `data-export.md` |
| 7 | Rachel's thread (once the author has written it), 12:40 as the player sees it, Night 1's last image | `rachel-history.md`; §2.5 |
| 8 | The Night 3 export and Juno's last conversation, read from a Night 1 save through an editor-only entry; then three to five people try it | `data-export.md`; §4 |
| Then | Night 2 grey-boxed, then Night 3; the model; sound; art | §3–5 |

**Every round:** pull the design repository first, follow `CLAUDE.md` (tests, screenshots, the one-session rule), report what changed and what the documents didn't decide, and stop at the end of the round.
