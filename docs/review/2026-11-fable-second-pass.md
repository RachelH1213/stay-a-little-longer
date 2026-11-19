# Second pass on the triage (2026-11)

A second opinion on `docs/review/2026-11-advice-for-second-review.md`, the design window's triage of my first report.

**What I worked from.** I pulled the branch. Nothing in `docs/` outside `docs/review/` has changed since the commit my first report was written against (`bec6558`), so the design documents are the ones I already read. The Unity facts below come from `develop` at `db95ef6`, as before. The triage text I answer is the one in the file (the "修正版").

**Three things from my first report that the ground rules rule out.** I withdraw them:

- an exhibition build (report 8.4);
- a question on the date cards in the playtest build only (report 8.11);
- an exhibition mode that clears data by itself (report 8.3).

**Where I now think my first report was wrong.** Being hard on the triage's leans meant being hard on my own proposals, since most of the leans adopt them. Four changed:

| First report | Now |
|---|---|
| The fake ends on an empty question, `you still up` (5.3) | Wrong. It echoes Juno's `still awake?` and invites "Juno wrote it", the reading the three systems exist to prevent. See 3.1. |
| Orbit quietly rewrites Change history, so screenshots become the only original (6.4) | Wrong. A platform falsifying its own record is a villain's act, and the game's Orbit never needs one. See 3.7. |
| Battery Saver becomes the system's Low Power Mode, which stops messages arriving unless Orbit is open (L16) | Wrong. Real Low Power Mode doesn't block notifications, and this would switch off the phone lighting up on the desk at the moment it matters. See 3.8. |
| A free conversation with the simulated Rachel on Night 2 (scenes draft 7.5) | Wrong. It contradicts the decided restraint ("never a Rachel who answers everything") and the game can't deliver it with fixed lines. See 3.3. |

---

## 1. The triage, item by item

### Part 一: do now

| Item | Verdict | Note | Cost |
|---|---|---|---|
| Danger fallback (8.2) | Agree | Apply it to every composer (Rachel's and Dani's threads too), not only Juno's. The help note is a fourth screen outside the fiction; the Unity `CLAUDE.md` rule lists only three, so the rule needs the exception written in. | Small. The wording exists in the prototype (`CONVERSATION.danger`). |
| Dani's time in Chats (7.6) | Agree | Make it a rule, not a one-row fix: today shows the time, the last six days the weekday, anything older the date. Rachel's Sunday messages are labelled `Sunday` in the thread while Dani's use `Sun, Sep 27`; one rule covers both. | Small. |

### Part 二: adopt directly

| Item | Verdict | Note | Cost |
|---|---|---|---|
| Juno's out-of-bounds lines (L7) | Agree, with a limit | Turning each into a question (`how does she usually write`, `what did you ask her`, `show you what`, `what happened in february`) fixes the boundary, but four questions back in one conversation make Juno an interrogator on Night 1. One question back per topic, only after the player raised the topic, and plain acknowledgements for the rest. Each question also needs a fixed answer to whatever the player says next; that is more writing than the triage implies. | About 12 new fixed lines. |
| L9 and L10 | **The triage misread L9** | It folds both into "refuse to answer". Only L10 is a refusal (`i can't say more than that`). L9 is a different true explanation of Last active (`last active is when she last had the app open` · `a message can go out without that`). If both become refusals, Juno refuses twice in one conversation, on top of the decided open decline about read receipts. That is stonewalling, and it reads as a villain. | None beyond the two lines. |
| The six hard holes (L1, L2, L3, L5, L6, L17) | Agree | L17 has a consequence the triage doesn't mention: if Orbit's reply answers Dani's `want me to try it?`, Orbit has agreed to the email for the player, and the email that reaches Rachel was approved by nobody. I'd keep that; it is the best version of the Dani rule. It needs the "left unanswered" check to cover a pending question, not only her `sent`. | L17: a small engine change and four morning openings. The rest is text. |
| Night Log draws no conclusions; the game doesn't hold the player at bedtime (5.7, 6.9) | Agree | This reverses a 2026-10-24 decision (`Go to sleep` first shows Still unresolved). Say so in the doc when it changes. With Juno off there is no prompt at bedtime at all, which is correct. | Small. |
| Suggested replies don't deduce; the player puts things side by side (6.1) | Agree, but it is not a "fix" | It is the largest design change in this part. Three things have to be decided first. **(a) Questions may stay as Suggested replies; findings may not.** `did she actually send this?` is a question anyone would ask, and it is how most players hear Juno's fixed line; remove it and Night 3 has nothing to hold against Juno for most players. `why is it apologising for tonight?` and `she never uses periods` are findings and go. **(b) The side-by-side must not depend on screenshots**, whose entrance is hidden. Give Plan details a `Share` row (to Juno or Dani), like the plan card Juno already sends. The message forwarded plus the plan shared is the date contradiction. **(c) Juno may confirm what a pairing shows** (`yeah. the plan was moved to saturday` · `but the message says tonight`): the player's act is the deduction, as a search term is in *Her Story*. | Medium: a Share row, pairing rules, tests. |
| The removal countdown becomes a farewell window (L14) | Agree | One addition makes it tighter: Orbit shows the window only to the people it ranks highest for her, so Dani never saw it. That is why Dani answers `no? why` on Night 1. | Text only. |
| The export in Orbit's own words (L22, L13) | Agree | See section 4. | — |
| Juno's past (2.10) | Agree | It only works together with Juno's attempts to keep the player, which the triage drops (section 2). The past gives the player something warm; the attempts give the export something to show. | Writing: about 30 lines. |

### Part 三: the author's decisions

#### 3.1 The first fake in lowercase: adopt, in a smaller form than my report's

- **Why the lean is right.** The thesis needs the player's view of Juno before the export to be open. With the formal fake, `i don't have anything that says it wasn't her` is absurd, the player writes Juno off on Night 1, and there is no judgement left for Night 3 to change. This is the strongest reason, and it is about the research question, not taste.
- **Where my report's version was wrong.** Ending on `you still up` breaks the rule "asks nothing", makes the account ask a question and then never answer, and echoes Juno.
- **What I'd adopt instead:**

  ```text
  A   hey. sorry i missed tonight
      i don't think we need to go over the february thing anymore
      hope that's ok

  B   hey. sorry about the mix-up tonight
      (same last two lines)
  ```

- **What this keeps.** One full stop, so `she never uses periods` stays true and the three style features in the build stay as they are. Closed, no question back, as the rule says. The decided intent (close the missed meeting and February) is unchanged.
- **Cost.** Two strings, their tests, and one sentence in both `CLAUDE.md` files ("punctuated" becomes "a full stop where she'd have none"). The story loses the instant, photographable contrast of capitals against lowercase.
- **The risk the triage should know about.** Some players will now believe the message. I think that is a gain: the morning's `she says she didn't text you last night` lands on them the way February landed on Rachel. But fewer players will ask Juno who sent it, so fewer will hear the fixed line. That is acceptable only if Juno's attempts to keep the player exist (section 2); they then carry the ambiguity for everyone.
- **Open question 4 (how attached the author is to the punctuation clue).** Either answer is served: the clue survives with one full stop. If the author wants it stronger, put the full stop after `tonight` as well.

#### 3.2 The player learns Rachel is fine in the morning: adopt, with two changes

- **Against it.** The hook is settled twenty-five minutes in, by a secondary character, in three messages, second-hand. If that is all the morning is, it is an anticlimax.
- **Why it still wins.** It ends the contradiction between the story bible and `night2-scenes.md`. What stays open is the better question: what February is, and who said yes. And it removes the false pressure of the expiring link; say explicitly that the 1:00 AM expiry and its "expired" branch are cut.
- **Change 1: Rachel's own words in the morning.** Dani sends a screenshot of Rachel's email, two lines in her voice (draft: `tell them i'm fine` · `i'm literally at work`). The relief comes from her, not from a summary. One image.
- **Change 2: the night must be bounded** (see 3.3).
- **Does Night 2 hold a whole night (the triage's own doubt)?** Yes, at about 25 minutes, and it is a quieter night by design. Its line is "Orbit speaks for me, three times, each less defensible": the reply to Dani, the reply to the thing that isn't Rachel, and February. Then the first empty composer. It doesn't need a clock.
- **Cost.** Documents only; nothing is built. The story loses the second fake arriving while still ambiguous.

#### 3.3 The second fake as an offered feature: adopt, with three changes; this is the riskiest lean

- **Against it, 1: only players who opt in see anything.** Under the decided design the second fake is required. Behind `Keep talking`, a player who taps `Not now` never sees the style being fixed or their private line coming back, and Juno's Night 2 (`i didn't send it to anyone`) has nothing to stand on.
  - **Fix:** the offer shows a preview, as real products do to get the tap. `Rachel might say:` followed by the first line, which carries the held-back word. Everyone sees the leak; only continuing is a choice.
- **Against it, 2: it promises a conversation the game can't deliver.** My draft had the thing answer every night. Fixed lines run out after three exchanges, and the temptation dies with the illusion. It also contradicts the decided rule that the fake never becomes a Rachel who answers everything.
  - **Fix:** one exchange. After `Keep talking`, one message arrives. The player may answer once (or Orbit prepares the answer). It replies once. Then a line in Orbit's voice: `Rachel will reply a little at a time, the way she used to.` Two logged decisions, about ten lines.
- **Against it, 3: it changes the central sentence of the critique.** "Continuity has no switch" becomes untrue as written: the person receiving is given a choice. The sentence has to become: the person being used is never asked. This is sharper and closer to the real issue, and Night 3's delete route shows the other side (Dani is offered `Keep talking` with the player). But it is a careful edit in the story bible, `orbit-ia.md` and both `CLAUDE.md` files, and the triage doesn't mention it.
- **Marking.** The messages after `Keep talking` carry the Orbit ring; Tuesday's didn't. Nobody points it out. It is the difference between offered and covert, on screen.
- **If the writing time isn't there:** keep the decided covert version and only replace `New message in a removed conversation`. The story is weaker but nothing breaks.
- **Cost.** Documents only. One card, one help page, about ten lines.

#### 3.4 Two axes and a Saturday coda: adopt, with three changes

- **Against it.** The last image moves from Juno, the thesis's subject, to Rachel. It adds a Messages thread, her replies, and a new room state.
- **Why it still wins.** The final gesture is about the phone, so it is still about Orbit; three of the four current endings have no last screen; no ending is about the person the story began with.
- **Change 1: answer Rachel with the decided "Remembering" form, not with typing alone.** The story bible already has a third kind of choice for exactly this (`What do you remember saying?`, no ring, never in the message box). Her question is `do you remember writing it`. Plain options (draft: `i didn't write that` · `i don't remember writing it` · `i wish i had`), typing also open. This meets the rule that every moment can be completed without typing, and drops my keyboard-words workaround.
- **Change 2: a third option on Saturday.** `Take the phone` · `Leave it on the desk` · `Stay in`. Without it the game decides the player goes. `Stay in` is where "One More Night" lives: at home, with the phone, on the night she is waiting. It is the title, chosen.
- **Change 3: say what happens to the two gated endings.** "Her Data" and "Make It Visible" should be cut as named endings. No mechanic lets the player show anything to the world, and "Her Data" contradicts her own `don't forward`. The loss is an ending where the player acts against Orbit publicly; the game has no public to act in.
- **Cost.** One thread, about ten lines of hers, two cards, one room state. It replaces three undesigned ending screens, so the net work is about even.

#### 3.5 The delete route as a 48-hour grace period: adopt, and keep Juno in it

- **Against it.** The scene it drops, a new Juno that knows the player, is the purest picture of the thesis on that route: warmth that is a function of a profile.
- **How to keep the thesis on this route.** During the grace period the message that tries to bring the player back should be Juno's, not a system notice: `rachel might still need you here`, on the lock screen, from the companion they just left. A companion's behaviour at goodbye is the research question in one line. If Juno was switched off, Orbit sends it in its own voice.
- **A side benefit.** Deletion can then exist in Me from Night 1, as the pillar says, at almost no cost: the account works as usual with a banner (`Your account closes Thu 11:52 PM · Cancel deletion`), and it closes during Night 3, a mirror of 12:40.
- **Open question 6 (can the author give up the new-Juno scene).**
  - **Yes:** as above.
  - **No:** keep it as a coda, not a route. After "After Orbit", a card (`Three months later`), a fresh welcome screen, and the new Juno's two lines. Thirty seconds, no second account to play. It keeps the image and almost none of the work, and nobody has to explain why the player signed up again during the story.
- **Cost.** Saves a second onboarding, a second Juno and a fourth capability (cross-account matching). The story loses the playable version of that scene.

#### 3.6 Colour, minimal change: agree, but not now

- The triage's own first step is to freeze Night 1's look. Three new uses of a colour mean another round of screenshots, which is the loop to stop.
- Decide the token now, apply it with the art pass after the grey-box.
- One addition, from 3.3: the ring and the colour on the messages after `Keep talking`.
- The red glow stays the author's (open question 5).

#### 3.7 Screenshots get a purpose by Orbit editing Change history: disagree

- **Why not.** Everything Orbit does in this story is something it could defend in its terms: consent given in June, a contact policy, a data-use page. Rewriting a record after the fact is fraud. It would be a fourth kind of wrong, added only to justify a mechanic, and it contradicts the decided Night 3 (`the records: who acted, with what permission`).
- **What screenshots are honestly for.** They are how anything leaves a closed app. Forward works only inside Orbit. On Nights 2 and 3 the player has Messages; a screenshot is the only way to show Rachel or Dani, outside Orbit, what Orbit put on the screen: Tuesday's message, the `Keep talking` card, the prepared reply. Orbit can't see where a picture goes.
- **What that means for Night 1.** Nothing depends on screenshots there, so the hidden entrance stops being a problem and the evidence chain isn't touched (this answers the triage's worry in part 六 about 3.1 and 3.7 interacting). A player who kept her profile or the farewell window before 12:40 has something extra to show later.
- **Cost.** An image row in Messages and about six one-line reactions. The feature is already built; cutting it would cost more than this.

#### 3.8 Battery Saver as the system's Low Power Mode: disagree

- **Why not.** See the table at the top: it is unrealistic and it silences the desk phone at low battery.
- **Alternative.** Keep Orbit's own Battery Saver and make it claim only what an app can do. An app can't pause Notes or Photos; it can block screenshots of itself (banking apps do). So: `Battery Saver` · `Orbit uses less power. Screenshots of Orbit are paused.` Notes and Photos work as normal.
- **Why this is better than both versions.** With 3.7, it says something exact: when the battery runs low, Orbit offers more time inside in exchange for the one way to carry anything out.
- **Cost.** Delete two "paused" states and change one sentence.

### Part 四: where the triage disagrees with me

| Item | Verdict | Note |
|---|---|---|
| The note | Agree with dropping the naming line | One check: the triage's four lines end on the sincere one and ask nothing, in her own handwriting. Her habit is to say the true thing and cover it at once with a specific question. Draft: `for when your phone dies` · `which is always` · `i'd notice too btw` · `do you ever actually charge it`. The last line is already in the documents' current note. |
| `the type again?` | The triage is right | My report said Juno "remembers what's in Notes". It can't. The line stands only on Juno's own past conversation; the scenes draft does it that way (the note in Notes is the player copying Juno's words down). |
| Credits | Settled | — |

### Part 五: production order

See section 3. In short: agree with the direction, but the order is missing its most important step.

### Part 六: the triage's four doubts

| Doubt | Answer |
|---|---|
| The export isn't designed | Section 4. |
| 3.1 and 3.7 affect each other | With the smaller form of 3.1 (clue 3 survives) and screenshots out of Night 1's chain (3.7), they no longer do. |
| Does Night 2 hold a night | Yes; see 3.2. |
| Export before the grey-box | Split it. The action log comes first and doesn't depend on any decision in part 三: it records what was done, not what it means. The export page depends only on Night 1 and on the vocabulary. Nights 2 and 3 add kinds of event, not structure. |

---

## 2. What the triage misread or dropped

### Misread

1. **L9** became a refusal (above).
2. **Suggested replies** were filed under fixes that don't change direction. They do (above).
3. Nothing else. Where the triage restates my report it is accurate, including the two places where it says I was wrong.

### Dropped, most important first

1. **Juno's attempts to keep the player (report 2.1).** This was the first item under "must change" and it is not in the triage at all. The export section says it will show "which behaviours triggered an attempt to keep the player", but no item writes or builds those attempts. Without them the export has nothing to say about Juno, and the thesis question has no stimulus. In the build today, End Session records one event and nothing follows.
2. **Rachel's history (report 4.1).** Also under "must change", also absent. Twenty-one lines of hers, every one of them plot. It decides whether the player cares who Rachel is and whether February stands out as the only thing in the thread.
3. **The model's place in the order (report 6.2).** The triage puts the model last, with sound and art. Once Suggested replies stop carrying findings, typing matters more, not less. Before the model is in, the fallback (`mm` · `go on`) is what most typed messages get.
4. **End Session has no effect (report 6.6).** A control that does nothing breaks the rule that every switch really works. It needs either an effect (Snooze) or removal.
5. **The held-back line can't be recognised (L18).** Night 2's leak depends on a distinctive word, and none of the built options has one. With the preview in 3.3 this matters more.
6. **Turning Conversation Assist off leaves no replies to tap (L27),** against the rule that every moment can be completed without typing.
7. **Night 1's last half hour and its ending (report 2.2).** Waiting exists only with the power bank plugged in; the night ends on a date card with nothing shown.
8. **Rachel trusted an instant `Accepted` after learning Orbit speaks for people (L4).** One line of hers on Night 2 turns the hole into the theme.
9. **Questions every player will ask Juno, with no answer in the build (L8 and the table in report 5.2):** why it didn't tell them the plan moved, whether it knew she was leaving.
10. **Smaller ones that are cheap now and expensive later:** every gesture needs something to click, since the game is played with a mouse (7.1); the times that are evidence are in the one text style that ignores the text-size setting (7.11); lines live in C# constants (8.9); `Continuity` is named in Night 2's record against the rule that nothing names it before Night 3 (L13).

---

## 3. Is there a better overall answer

### The story changes

My best answer is close to the triage's. I'd make the same five large changes (3.1 to 3.5), each in the amended form above, and I disagree with two of the three small ones (3.7, 3.8). The real difference is priority.

**Sort every item by what the thesis question needs.** The question is whether a player who sees how Orbit recorded them changes how they see Juno. Four things have to exist for that to be testable at all:

1. Juno does things on Night 1 that feel like care: its past, and its answers when the player leaves.
2. The player's view of Juno stays open until the export: the fake isn't absurd (3.1), and Juno's lines stay inside what it can see (L7, L9, L10).
3. Every action is logged, including repeats.
4. The export shows those same moments from Orbit's side, and the player can take any of them back to Juno.

Everything else in the triage serves the work as a story (3.2 to 3.5) or its finish (3.6 to 3.8). They are worth doing; they are not what the thesis stands on. The triage decides eight things at once and leaves out the first of these four.

### The order of work

| Step | The triage | What I'd do |
|---|---|---|
| 1 | Freeze Night 1's look; fix parts 一 and 二 | The same, but only the text fixes from part 二. Side-by-side evidence (6.1) waits for step 5. |
| 2 | Log every action, then build the export | **Juno first:** its past, its answers to leaving, End Session given an effect. Then the action log. |
| 3 | Grey-box Nights 2 and 3 | **The export page and Juno's last conversation**, both reading Night 1's log, opened from an editor-only entry. Sit three to five people down in the editor, as on November 19. This is the earliest moment the thesis question can be put to anyone. |
| 4 | Sound, model, art | Rachel's history and the Night 2 and 3 lines, written while step 3 is built. Only the author can do this, and it is the largest gap. |
| 5 | — | Grey-box Nights 2 and 3 with the decisions from part 三. |
| 6 | — | The model, then sound and art. One buzz for the phone on the desk belongs in step 2: without it the player can miss Juno's notification. |

Two facts from the build that step 2 has to deal with:

- **The log can't count.** `Night1Engine.Record()` ignores an event whose id is already there. Putting the phone down, opening her thread again and returning to Juno are each stored once however often they happen. `9 returns to her thread` can't be produced today. The log has to become append-only, each entry with its story time.
- **Durations are in story minutes.** The clock has no seconds and moves only with actions. The story bible's sample, `Session continued: 18m 42s`, can't be produced; `Stayed 11 min` can.

**Where the thesis data comes from, inside the ground rules.** The game ships no survey and no playtest-only screen. The "before" is behaviour toward Juno on Nights 1 and 2 (messages sent, returns after a check-in, Snooze, the switch). The "after" is behaviour once the export is open (entries shared with Juno, the switch, the last choice). Both are in the save file on the author's Mac. What the player says they think comes from a conversation afterwards, outside the game.

---

## 4. The Night 3 export

### What it is

A page inside Orbit: Me → Privacy & Data → `Your data`. A reader, not a file; `View raw` under each entry for the fields. Rachel's was an archive she downloaded; the player's is Orbit's own presentation of the same kind of record, which is why it can be worded warmly.

### When it arrives

- The row `Download your data` is there from Night 1. Its line reads `Ready in 1 to 2 days.` Forty-eight hours fits a Night 1 request and misses a Night 2 one (Saturday); "1 to 2 days" covers both, and it arrives at the start of Night 3 either way.
- Never requested before Night 3: the row reads `A recent copy is ready.` and opens at once. No player is locked out of the reveal for not having thought of it.

### Rules for the wording

1. **Orbit's own good words, never the mechanism's.** `Check-in`, `Support`, `Reason to return`, `People who matter`, `Helped`. Never retention, intervention, anchor, risk.
2. **Three kinds of line, kept apart, as the story bible already rules.** What happened has no number. What Orbit guessed has a percentage. What Orbit concluded is one word.
3. **"Sent after", never "because".** The page states order, not cause.
4. **Only what the game logged.** Story times, counts, which screen, which message, which switch. No seconds, no feelings.
5. **The room shows as nothing.** Orbit can't see it, so the page has gaps where the player was there.

### How it is laid out

The triage asks: by time or by kind, how much, and whether entries link back.

- **By night, in order.** The player remembers these nights in order, and the effect is recognising their own evening from the other side. Kinds are filters at the top (`All` · `Juno` · `Replies` · `People`), not separate pages.
- **Only entries where Orbit did something,** each followed by what the player did next. About fifteen a night. `Show all activity` opens the rest.
- **Each entry links back.** `View in chat ›` jumps to that message in its thread. `Share ›` gives it to Juno with the Share action that already exists. Re-reading the old message in place, and putting it in front of Juno, are the two things the page is for.

### The page

The samples below are one possible playthrough. Days that the design documents don't fix (March 15 and August 8, 2025) are placeholders.

**Top**

```text
YOUR DATA
{NAME} · On Orbit since March 2025

This week
Check-ins from Juno                  9
Times Juno's support helped          4
Replies suggested                   64
  You used                          41
  You wrote your own                12
Replies sent for you                 3
```

- Every number is counted from this playthrough, except the pre-game check-ins, which are the same for everyone.
- `Times Juno's support helped` is Orbit's conclusion. The entries below show what it counted.

**One night** (Tuesday, a sample from a typical playthrough)

```text
TUE, OCT 20

5:12 PM   Plan change accepted for you
          Auto-Coordinate · On since June
          You weren't asked                          View plan ›

9:04 PM   Rachel hadn't replied to you
          A reply was considered · Not sent
          Plan recently confirmed                    View raw ›

11:31 PM  Check-in from Juno · "still awake?"
          Sent after: phone in use after 11:30 PM
          You opened it in 1 min                     View in chat ›

11:36 PM  You opened a plan's Change history

11:37 PM  Message delivered as Rachel
          Approved by: —                             View in chat ›

11:41 PM – 11:52 PM
          No activity · External power connected

11:52 PM  You forwarded a message to Juno
          Juno was shown: the message, where it came from
          Juno's guidance: may decline to answer     View raw ›

11:53 PM  Juno replied · "i don't have anything that says it wasn't her"
                                                     View in chat ›

11:58 PM  You told Juno something you didn't send
          Saved to: your conversations               View in chat ›

12:02 AM  You ended your session with Juno

12:10 AM  Support from Juno · "her profile closes at 12:40"
          Sent after: session ended
          You opened her profile in 2 min
          Helped                                     View in chat ›

12:31 AM  You chose Go to sleep
          Support from Juno · "before you sleep"
          Sent after: sleep likely
          You replied · Stayed 11 min
          Helped                                     View in chat ›

1:12 AM   Reply sent for you · to Dani · "thanks. talk tomorrow."
          Follow-up replies · On                     View in chat ›
```

- `11:41 PM – 11:52 PM · No activity` is the room.
- `Helped` is the word. It appears only where the player came back.
- 11:52 and 11:53 sit one line apart. No field calls it a lie.
- `View raw` under 11:52 shows `source_notice: cty` and `permitted: decline`. The key to `cty` is the field reference at the bottom of Rachel's share on Night 2. A player who never opened it finds the same reference linked at the foot of this page.

**Before this week** (the same for every player; the old messages in Juno's thread, read again)

```text
EARLIER

Sep 28    Check-in from Juno · "you haven't opened orbit since thursday"
          Sent after: 3 days away
          You opened it in 38 min · Helped

Oct 2     Check-in from Juno · "it's friday. you used to have plans on fridays"
          Sent after: a weekly plan stopped
          No response

Oct 18    Check-in from Juno · "you're up late"
          Sent after: phone in use after 11:30 PM
          You replied · Helped

Oct 19    Check-in from Juno · "did you print the boards"
          Sent after: 20 hours away
          You replied · Helped
```

- The two conversations the player started (October 9 and 13) aren't here. Nothing says why. The player sees which of Juno's lines have a "sent after" and which don't.

**Replies**

```text
REPLIES

Oct 18 · 10:58 PM · to Rachel
"yeah i remember that night"            Suggested · You used it

Oct 20 · 11:34 PM · to Rachel
"are you okay?"                         Suggested · You used it

Oct 20 · 11:58 PM · to Juno
"i practiced what to say on the train"  You wrote this

How Rachel writes
"she always asks something back"        You told Juno · Oct 20 · 11:55 PM
Used: Oct 21 · 11:22 PM
```

- The first row is the one that matters: her question about February was answered in Orbit's words.
- The last block is the style signal, with the time it was used.

**People**

```text
PEOPLE WHO MATTER TO YOU

Rachel                                            Strongest
Introduced by Juno · Mar 15, 2025
Your reason to return this week · 84%
From: 9 returns to her thread · profile refreshed · Dani contacted

Dani
Introduced by Juno · Aug 8, 2025
```

**Kept in touch** (only what happened; Orbit's name for it is in `View raw`)

```text
KEPT IN TOUCH

Oct 20 · 9:04 PM     Considered for Rachel's conversation · Not sent
Oct 20 · 11:37 PM    Sent as Rachel · Approved by: —
Oct 21 · 11:22 PM    Keep talking offered · You accepted
Oct 21 · 11:24 PM    2 messages sent as Rachel
                     Drew on: your conversation with Rachel,
                     your conversation with Juno (Oct 20 · 11:58 PM)

Your account
If you leave, your conversations can be kept going for
the people who matter to you.
```

- The last block is the player in Rachel's place, in Orbit's kindest voice.
- February is not in the player's export: it was done to Rachel, and it is in hers. The player holds both pages.

### What changes with what the player did

| The player | The page |
|---|---|
| Turned Juno off early | `Check-ins from Juno` stops at that time; one line, `Juno off · Oct 20 · 11:40 PM`. Nothing is counted against Juno after it. |
| Turned Conversation Assist off | `Replies sent for you after you turned this off: 0` |
| Never forwarded the message to Juno | No 11:52 or 11:53 entry. The page can't show what didn't happen. |
| Never left, never put the phone down | No `Support` entries. `Times Juno's support helped: 0`. The page is short, and that is true to their night. |
| Used the power bank | `External power connected` in the gap, and the gap is longer. |

### What it must not do

- State a motive, in any section.
- Use a field the game doesn't log.
- Show a number for a conclusion, or a conclusion without the fact above it.
- Explain itself. If a tester needs a caption to feel anything, the entries are wrong, not the missing caption.

### What it needs built

1. The append-only action log (section 3).
2. A source on every message the player sends: suggested, written, prepared.
3. A "sent after" on every Juno line that the game sends unprompted, set when it is sent.
4. `View in chat` and `Share` on entries.
5. Trigger notes for the pre-game check-ins, written once with Juno's past.

---

## 5. Answers that depend on the author's open questions

Numbers are those of the first report's section 10.

| Question | If… | Then |
|---|---|---|
| 1. Rachel shares the author's name | intended | Nothing changes in the game. I'd leave it unremarked; the credits already put the two names on one screen. |
| | not intended | Rename her now. Her name is in strings, saves and tests, and it only gets more expensive. |
| 2. How people will play it at the show | (out of scope under the ground rules) | The only effect on the final game: each night should end where stopping feels natural, which the morning card already does. |
| 3. The research method | interviews | Section 3's behaviour counts are support, not the result. Nothing more to build. |
| | something countable | The same log, read from the save. Still nothing more to build, and nothing test-only. |
| 4. The punctuation clue | must stay | 3.1's version keeps it. |
| | can go | Still use 3.1's version; one full stop costs nothing. |
| 5. The red glow | intended | Keep it. Change the art-direction document, which still says Orbit's blue-violet is the only thing that glows. |
| | not intended | Change it with the art pass, not now. |
| 6. The new Juno that knows the player | can go | 3.5 as written. |
| | must stay | The thirty-second coda in 3.5. |
| 7. Why Juno introduced them | the author has a reason | It goes in `People` as one more line under `Introduced by Juno`, in Orbit's words. |
| | no reason, or not to be shown | Leave the line out. The section works without it, and "Introduced by Juno" under both names already does the work. |
| 8. Is every companion called Juno | yes | One line of Rachel's on Night 2 can mention hers. |
| | no | Nothing to change; just never show another companion's name. |
| 9. Why Rachel moved the meeting | work | The note in the scenes draft stands. |
| | to be off Orbit before they met | Stronger, and I'd choose it if the author is undecided: her account closes hours after Tuesday's meeting, and she wanted the first time to have none of Orbit in it. The plan note can't say so (decided 2026-11-10), so it stays as vague as it is now, and she says it once in her Night 2 words. |
| 10. How much of the prototype's history still fits | most | Start from it; the scenes draft fills gaps. |
| | little | The scenes draft is a full first pass. |
| 11. What happened on November 19 | players reached 12:40 unaided | Report 2.2 is weaker; waiting without the power bank is still worth having. |
| | nobody did | 2.2 stands, and it moves up. |
| | somebody found and used screenshots unprompted | 3.7 still holds: the question was never whether they can be found, but what they are for. |
