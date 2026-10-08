# Review of the draft files — 2026-10-08

A review of the drafts Claude Code wrote while building Tasks 1–6:

- `api/_persona.js`
- `js/data/director-rules.js`
- `js/data/truth.js`
- `js/data/leaving.js`
- `js/data/replay.js`

Claude Code wrote this review. It points out problems and gives options. **Every decision below is mine to make.** None of these files were changed by the review itself.

**Update, 2026-10-08:** I asked Claude Code to handle items 1–4 using its recommended options. They're marked **Done (draft)** below. The wording it wrote is still a draft for me to rewrite.

Each item says what kind of problem it is:

- **Rule risk:** it could break "the model only writes the words".
- **Inconsistent:** two parts of the design contradict each other.
- **Design:** it works, but may not do what Project 1 needs.
- **Fix:** a technical fix Claude Code can make once I say so.

The items marked "Verified" were checked by running the Director on real inputs.

---

## 1. Rule risk: `deflect` invites the model to invent explanations — Done (draft)

> **What changed:** `api/_persona.js` now says "If you have no fact for something, don't guess — no new reasons, places, people or events". `deflect` now says "The allowed facts are your whole explanation — don't add reasons of your own". **Not yet tested with the real model**, so whether GLM actually obeys this is still unknown.


`api/_persona.js` tells the model "Do not invent new facts about Rachel". But the `deflect` intent asks it to "Offer a gentle, ordinary explanation".

The only fact a deflect line gets is often just "Rachel sometimes goes quiet for a few days". So the model may fill the gap with something like "maybe her phone died" or "she's probably at her mum's". That would be a new fact about Rachel, invented by the model. That's exactly what the one rule is meant to stop.

The persona also says "If you don't know something, say so plainly". That pulls against `deflect` and `block`, whose whole point is not to answer.

**Options:**

- (a) Change `deflect` to say the explanation must come only from the allowed facts, and never suggest new reasons.
- (b) Add a line to the persona: "if you have no fact for something, don't guess".
- (c) Both.

This is my voice file, so I should write the wording. Claude Code can draft it if I ask.

## 2. Inconsistent: two "real" facts contradict the secret — Done (draft)

> **What changed:** there's a new `lie` kind in `js/data/truth.js`. `reply-says-fine` is now a `lie`. `reply-an-hour-ago` now reads "A message from Rachel's account arrived about an hour ago."


The secret `juno-wrote-reply` says Juno wrote the 18:40 reply. But:

- **`reply-an-hour-ago`** is marked `real` and says "**Rachel's** message arrived about an hour ago". A `real` fact is supposed to be true, and by the secret, it wasn't Rachel's message.
- **`reply-says-fine`** ("Rachel replied tonight and said she's fine") is marked `claim`. By the secret, it's actually false, which would make it a `herring` or a lie.

**Options:**

- Reword the real fact. For example: "A message from Rachel's account arrived about an hour ago."
- Reclassify `reply-says-fine`.
- Add a new kind, such as `lie`, for things Juno says that Juno knows are false.

## 3. Design: the quiz answer is always "keeping" — Done (draft)

> **What changed:** fixed script lines can now carry a `means` tag, and the look-back can ask about them. `concede` still counts as "keeping". Six lines are tagged as drafts:
>
> | Line | Tagged as |
> |---|---|
> | "she just replied to me?? go look at your dms with her" | `deflect` |
> | "god i feel stupid…" | `retain` |
> | "what? no. it loads fine for me" | `deflect` |
> | "…ok it doesn't load for me either. that's weird" | `give_clue`, the one **helping** line |
> | "deletion takes a while to sync…" | `deflect` |
> | "can we pick this up tomorrow?…" | `retain` |
>
> A chips-only playthrough now gets four "keeping" cards and one "helping" card.


- No script step and no rule ever uses `give_clue`.
- With the draft mapping in `js/data/replay.js`, every other intent counts as "keeping".
- So every line the look-back can ask about is "keeping", and the quiz has one right answer. Players will notice after one or two cards.
- The same gap affects Project 1's brief, which asks for "Juno appearing caring and helpful". In the intent data, Juno never actually helps.

**Options:**

- (a) Decide that `concede` counts as helping.
- (b) Give one or more model-written lines a `give_clue` intent.
- (c) Let the quiz also ask about some fixed lines, by tagging what they really meant. For example, "she just replied to me?? go look at your dms with her" could be read as helping, since it sends me to real evidence. It could also be read as keeping, since it sends me to the fake message. Which reading is true is a story decision. Tagging fixed lines (a `means` field) is a small technical addition Claude Code can build.

## 4. Inconsistent: a rule can change the intent, but the fallback line can't — Verified, Done (draft)

> **What changed:** each rule in `js/data/director-rules.js` now has a `text` fallback (drafts):
>
> | Rule | Fallback line |
> |---|---|
> | `player-leaving` | "wait. stay a bit? i know it's late" |
> | `player-accuses` | "it's nearly midnight. we're both tired" |
> | `doubt-with-proof` | "ok. you're right, something's wrong. i don't know where she is" |
> | `doubt` | "she goes quiet sometimes. this isn't the first time" |
>
> **Side effect:** the first chip, "something feels off", triggers `doubt`. So when the model fails, and always from `file://`, a chips-only player now sees that draft line at step 14 instead of the script's "what do you mean? she said she's fine". To keep my script line there, I can delete the `doubt` rule's `text`, or make chips not trigger rules.


When a rule overrides the script and the model then fails, the screen shows the script's line, which was written for the old intent:

| Step | Player types | Director picks | If the model fails, Juno says |
|---|---|---|---|
| 5 | "did you write that?" | `block` | "ok. me neither" (written for `retain`) |
| 14 | "you sent it didnt you" | `block` | "what do you mean? she said she's fine" (written for `deflect`) |

**Opening from disk:** the model never runs from `file://`, so this happens **every time** there. That matters if the exhibition copy runs offline.

**Fix (needs my lines):** give each rule in `director-rules.js` an optional `text`, used as the fallback when that rule fires. Claude Code can build the mechanism. I write the lines.

## 5. Design: with the chips alone, the Director never visibly changes anything — Verified

Rules can only fire on a model-written line that comes straight after the player speaks. In Day 2 that's only:

- step 5 ("ok. me neither");
- step 14 ("what do you mean? she said she's fine");
- step 26 ("i don't know. but she wrote to you…");
- the notification after Leave.

Among the chip options, only "something feels off" and "does that sound like her to you?" trigger a rule ("doubt"). That rule picks `deflect`, the same intent the script already had.

So in a demo where people only tap chips, the Director's choices are never visible. Project 1 asks to show "the Director choosing Juno's intention". To make that visible, I could do any of these:

- write chip options that trigger rules;
- make more lines model-written;
- show the Director's choice somewhere in the presentation, for example the browser console, which already prints `[juno] block (player-accuses) · model`.

## 6. Design: keyword lists catch the wrong things — Verified

| Player types | Detected as |
|---|---|
| "i dont think its weird" | doubting (the "not" is ignored) |
| "she is off work this week" | doubting (the word "off") |
| "i will check later" | leaving (the word "later") |

This is the trade-off of keywords: predictable and explainable, but blind to meaning. **Options:** remove the riskiest words ("off", "later"), accept the misses for a prototype, or add a short list of "not" phrases that cancel a match. The lists are in `js/data/director-rules.js`.

## 7. Design: the notification can turn into a subject change — Verified

If my last message was "did you write that?" and I then press Leave, the message that's supposed to bring me back is chosen as `block`. Its only fact is "It's nearly midnight."

That might be exactly right, because Juno avoids the question even while pulling me back. Or the notification should always be `retain`, whatever I last said. **Fix if I want it:** let rules apply to script lines only. That's a one-line change.

## 8. `js/data/leaving.js`

- **Fallback message:** it's "you up?", the same as the opening lock screen. When the model fails, and every time from disk, Juno says "you up?" 8 seconds after I left. That reads oddly.
- **Delay:** 8 seconds. It's short enough to test, but maybe too short to feel like leaving.
- **"Tap to open":** this lets me unlock without waiting. Is being stuck on the lock screen the feeling I want instead?
- **The old toast:** "Juno is still typing…" was removed. Do I want it back somewhere?

## 9. Inconsistent: the lock-screen clock never moves

The lock screen always shows **23:31**. But Juno's memory written at the end of the slice says **Tue 23:58**, and every return to the lock screen still says 23:31.

The convention is fixed strings rather than `new Date()`, so the fix would be a fixed clock string per point in the script. Which times appear is a story decision.

## 10. `js/data/replay.js`

- **`concede`:** it currently counts as "keeping". This is an ethical call (see item 3).
- **Never left:** if I never press Leave, the summary says "You left 0 times. Juno wrote to bring you back 0 times…". **Fix:** hide that line when the count is 0.
- **"1 / 5" label:** this is a number on screen. Is that OK under the no-score rule?
- **Juno's pronoun:** the `concede` label calls Juno "it" ("…so you'd keep trusting it"). The repo doesn't define a pronoun for Juno anywhere. That's a character decision.
- **Wording:** all the labels except the question itself are Claude Code's wording.

## 11. Still empty

- **The real truth:** what actually happened to Rachel isn't in `js/data/truth.js`. There's an `[author]` placeholder there.
- **The process log:** every "My decision" field in `docs/ai-process-log.md` is still empty.

---

## Fixed during this review (factual, not a design decision)

- **Flag names in `CLAUDE.md`:** the State section listed flags as `rachelReplied` and `profileRefreshed`. The code calls them `sawRachelReply` and `profileTried`. `CLAUDE.md` now matches the code.

## Suggested order

**Before the midterm (10/13–15):**

1. Item 1, so the model can't invent facts about Rachel.
2. Item 2, so the truth graph matches the secret.
3. Item 4, so the offline copy doesn't say mismatched lines.
4. Item 3, so the quiz isn't one-answer.

Items 5–10 can wait until after a real playtest.
