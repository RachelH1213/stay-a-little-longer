# CLAUDE.md

Read this before changing anything in this repo.

## What this is

*Stay a Little Longer* — a detective game that takes place inside a fake social app called **Orbit** (placeholder name). Senior thesis, Parsons BFA Design & Technology, 2026–27.

The player looks for a friend (Rachel) who has gone quiet. Their AI companion (Juno) helps, and is also the one hiding what happened. Three in-game days, about 20 minutes.

This repo is currently the **Day 2 shell**: real screens, a hardcoded script, and 5 of Juno's lines written by a model (not yet tested with a real key), with intents picked by a first-draft Director.

**Course work and AI use:** part of this project is also coursework for ULEC 2943. Read `docs/course-context.md` (including my AI consent policy) before any task. After any meaningful AI-assisted work, add an entry to `docs/ai-process-log.md` — facts only, and leave "My decision" for me.

## The one rule

**Game code decides what Juno wants to say. The model only writes the words.**

Juno must never receive the full truth of the case. It receives a persona, an intent for this turn, and only the facts that intent allows. This keeps the plot on rails, keeps costs low, and stops players from talking their way to the answer.

When the LLM is added, it slots in at one place only: turning `{intent, allowedFacts}` into a line of text. Nothing else about the architecture changes.

**Model layer (built):** a `juno` step with `intent` + `facts` calls `fetchLine()` in `js/app.js` → `api/reply.js` (GLM-4.7-Flash, key in `ZHIPU_API_KEY`, endpoint open.bigmodel.cn unless `ZHIPU_API_URL` is set, e.g. to z.ai; tries glm-4.5-flash then glm-4.7-flash when one is overloaded, or the list in `ZHIPU_MODEL`; voice in `api/_persona.js`); every line is checked against `GUARDS` in `api/_persona.js` (phrases an intent may never use) and asked again, up to 3 tries, if it breaks one; any failure or an 8s timeout shows the step's `text` instead, and `file://` always falls back.

**Play log (built):** `Log.write()` in `js/log.js` → `api/log.js` → Supabase table `turns` (`supabase/schema.sql`, keys in `SUPABASE_URL` / `SUPABASE_SECRET_KEY`). One row per player message, Juno line (with intent, rule, source, fact ids) and exit from Juno's thread. Fire-and-forget: never awaited, errors ignored, no-op on `file://`.

**Leaving (built, content is a draft):** Leave in Juno's thread locks the phone (`leaveJuno()` in `js/app.js`). After `LEAVING.delayMs`, Juno sends a message through the Director (`js/data/leaving.js` holds the default intent, facts and fallback); it shows as a lock-screen notification, or a toast if the player already unlocked. Every exit and every return to Juno's thread is logged (`exit` / `return` rows, return `via` notification or chats).

**Notebook, the game layer (built, look and wording are a draft):** the phone is Orbit and stays real app furniture; evidence lives outside it, in the player's notebook (`#notebook` beside the phone, `viewNotebook()` in `js/app.js`, wording in `js/data/onboarding.js`). On a wide screen it sits next to the phone; at ≤860px it is a drawer opened from the `#hud` button above the phone (`viewHud()`), which also carries a badge for new clippings and the "Next" hint. The 📎 button on messages, the profile and posts clips evidence (`saveCard()`); the notebook shows Clippings, Compare (pick two) and What I know, plus Next while the script waits. Teaching happens where it's needed: the 📎 on evidence the story needs pulses with a one-time "Clip this" tip, the HUD says "compare them" the first time there are two clippings, and Compare pulses until first used. While the drawer covers the phone, Juno's lines are held as if the player were away. On first launch the lock screen also shows Rachel's last real message as an older notification (`State.onboarded` = the app has been opened once). Rachel's thread opens on her latest message and keeps its scroll across renders.

**Pacing:** after every Juno line there is a reading pause (`readPause()`, ~0.6–2.2s by length) before the next line starts typing, so lines never pile up. A `notify` script step shows Rachel's reply as a banner (text and time taken from `rachel-history.js`, so it always matches her thread); tapping it opens her chat, and her row stays unread until then (`flags.rachelNotified`).

**Away from Juno's thread:** when the script reaches a Juno line while the player is on another screen, Juno sends that one line as a banner at the top of the screen (`State.banner`, tap to open Juno) plus the unread dot, then holds the rest until the player comes back (`sentWhileAway`, `heldForReturn`). On the lock screen nothing is sent; the Leave notification does that job.

**Look-back (built, content is a draft):** when the slice ends, a card in Juno's thread opens the `replay` view. `Replay.pick()` in `js/replay.js` chooses up to 5 of Juno's intent-carrying lines from this playthrough's log (`Log.rows()`, kept in memory, so it works on `file://`); it opens on an intro page, shows what the player said (or that they had left) above each line, asks whether Juno was helping or keeping them, flips to the real intent, then a summary. Off-script `bridge` replies are never asked about. Wording and which intent counts as which side live in `js/data/replay.js`. Each answer is logged as an `answer` row.

**Director (built, rules are a draft):** `Director.decide(step, State)` in `js/director.js` picks the intent from `js/data/director-rules.js` (else the step's own intent) and filters the step's fact ids through `js/data/truth.js` — never `secret`, only facts allowed for that intent, unlocked by the player, and not before their day. A typed message that isn't a suggestion and matches no Director signal gets one short model-written reply (intent `acknowledge`, rule `bridge`) and the same question stays open; a second off-script message on that question, or a model failure, moves the script on. Rules only react to messages the player typed, never to tapped suggestions, and never apply to the notification after Leave. A rule's optional `text` is the fallback when that rule fires, so a failed model call never shows a line written for a different intent. Fixed script lines can carry a `means` tag (their real intent) so the look-back can ask about them; they are never sent to the model.

## Structure

```
index.html            the whole app shell, one page: the phone (#app), the notebook (#notebook), the phone HUD (#hud)
css/app.css           all styles; design tokens live at the top
js/app.js             state, routing, rendering, the script runner
js/data/app-data.js   contacts, profile, settings, saved-card definitions
js/data/rachel-history.js   a year of DMs with Rachel (evidence: she never uses full stops)
js/data/script-day2.js      the hardcoded Day 2 beat script
js/data/truth.js            the truth graph: every fact, its kind, day, intents, unlock
js/data/director-rules.js   which intent Juno picks when (story, not logic)
js/data/leaving.js          what happens when the player leaves Juno: delay, message, lock-screen text
js/data/replay.js           the look-back's wording, and which intent counts as helping or keeping
js/data/onboarding.js       notebook (game layer) wording, clip tips, lock-screen context
js/replay.js                Replay.pick(rows, n), Replay.summary(rows): the look-back, built from the log
js/director.js              Director.decide(step, State) -> {intent, allowedFacts, rule}
api/reply.js, api/_persona.js   the model layer
js/log.js, api/log.js       the play log (Supabase); supabase/schema.sql is the table
```

No build step, no dependencies. Open `index.html` in a browser, or serve the folder.

Plain `<script>` tags and globals on purpose, so the file opens from disk without a server. Do not convert to ES modules unless a bundler is added.

## Conventions

- **The phone is always real app furniture; the notebook outside it is the player's game layer.** Nothing inside the phone may use game vocabulary (no score, no "chapter", no tutorial, no title screen). Words like "clip", "compare" and "next" belong in the notebook or the HUD only. (Changed 2026-10-10, the author's choice of direction 2.)
- Phone-first. Test at 390px wide.
- Evidence is clipped with the 📎 button into the notebook. The case board is the notebook, with comparing.
- Rachel never uses full stops in her own messages. Anything written by Juno as Rachel is punctuated. Keep this consistent — it is clue 3 and it breaks silently if someone "fixes the typos".
- Times in the fiction are fixed strings, not `new Date()`, so screenshots stay reproducible.

## State

`State` in `js/app.js` holds everything:

- `view`, `params` — current screen
- `day` — in-game day; facts in the truth graph unlock by day
- `step` — position in the day script
- `saved[]` — evidence card ids the player clipped to the notebook
- `deductions[]` — pairs the player has solved
- `exits` — times the player has left Juno's thread
- `away` — set while the player is out of Juno's thread, cleared when they come back
- `notice` — the notification on the lock screen, or null
- `junoUnread` — the dot on Juno's row in Chats
- `replay` — the look-back in progress: `{intro, items, i, guesses[], done}`
- `bridgedStep` — the player step Juno already answered off-script once
- `sentWhileAway`, `heldForReturn` — Juno's one line while the player is elsewhere, and the hold until they return
- `banner` — a message from Juno or Rachel shown at the top of other screens, or null
- `onboarded` — the player has opened the app once (hides the older lock-screen notification)
- `notebookOpen` — the notebook drawer is open (phone widths only)
- `clipsSeen` — clippings the player has already seen in the notebook (the HUD badge counts the rest)
- `comparedOnce` — Compare has been used once, so it stops pulsing
- `clock` — lock-screen time; set from each `memory` step's timestamp
- `presenter` — true when the page is opened as `index.html?director`: every Juno line shows its intent · rule · source (for demos; players never see it)
- `memories[]` — what Juno has written down about the player
- `flags` — one-off story switches (`sawRachelReply`, `rachelNotified`, `profileTried`, `deletedFound`)

All rendering reads from `State`. Never write to the DOM from anywhere else.

## Roadmap

1. **Done:** static Day 2 shell, ending after the first deduction. Serverless proxy + model for Juno's lines (Task 1).
2. **Now:** Director + truth graph (Tasks 2–3) built; rules and fact tags are a draft awaiting the author's review.
3. **Then:** logging every turn to Supabase (Task 4, built, untested against a real project); the replay quiz that reads that log back.
   Leaving and notifications (Task 5) and the look-back (Task 6) built; their wording is a draft.
4. **Later:** Day 1 and Day 3, endings, the call screen.

## Things that are deliberate

- The profile fails to load the first time. The player has to refresh it themselves. Do not "fix" this.
- Juno's excuses are meant to be plausible. If a line sounds like a villain, rewrite it.
- The player can always leave. Leaving is a mechanic, and it is always answered.
