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

**Look-back (built, content is a draft):** when the slice ends, a card in Juno's thread opens the `replay` view. `Replay.pick()` in `js/replay.js` chooses up to 5 of Juno's intent-carrying lines from this playthrough's log (`Log.rows()`, kept in memory, so it works on `file://`); the player answers "helping you, or keeping you?", the card flips to the real intent, then a summary. Wording and which intent counts as which side live in `js/data/replay.js`. Each answer is logged as an `answer` row.

**Director (built, rules are a draft):** `Director.decide(step, State)` in `js/director.js` picks the intent from `js/data/director-rules.js` (else the step's own intent) and filters the step's fact ids through `js/data/truth.js` — never `secret`, only facts allowed for that intent, unlocked by the player, and not before their day. Rules only react to messages the player typed, never to tapped suggestions, and never apply to the notification after Leave. A rule's optional `text` is the fallback when that rule fires, so a failed model call never shows a line written for a different intent. Fixed script lines can carry a `means` tag (their real intent) so the look-back can ask about them; they are never sent to the model.

## Structure

```
index.html            the whole app shell, one page
css/app.css           all styles; design tokens live at the top
js/app.js             state, routing, rendering, the script runner
js/data/app-data.js   contacts, profile, settings, saved-card definitions
js/data/rachel-history.js   a year of DMs with Rachel (evidence: she never uses full stops)
js/data/script-day2.js      the hardcoded Day 2 beat script
js/data/truth.js            the truth graph: every fact, its kind, day, intents, unlock
js/data/director-rules.js   which intent Juno picks when (story, not logic)
js/data/leaving.js          what happens when the player leaves Juno: delay, message, lock-screen text
js/data/replay.js           the look-back's wording, and which intent counts as helping or keeping
js/replay.js                Replay.pick(rows, n), Replay.summary(rows): the look-back, built from the log
js/director.js              Director.decide(step, State) -> {intent, allowedFacts, rule}
api/reply.js, api/_persona.js   the model layer
js/log.js, api/log.js       the play log (Supabase); supabase/schema.sql is the table
```

No build step, no dependencies. Open `index.html` in a browser, or serve the folder.

Plain `<script>` tags and globals on purpose, so the file opens from disk without a server. Do not convert to ES modules unless a bundler is added.

## Conventions

- **Nothing on screen may use game vocabulary.** No score, no "chapter", no tutorial, no title screen. Everything the player sees is app furniture.
- Phone-first. Test at 390px wide.
- Evidence is saved through a bookmark button, which is the app's **Saved** feature. The case board is Saved, with pairing.
- Rachel never uses full stops in her own messages. Anything written by Juno as Rachel is punctuated. Keep this consistent — it is clue 3 and it breaks silently if someone "fixes the typos".
- Times in the fiction are fixed strings, not `new Date()`, so screenshots stay reproducible.

## State

`State` in `js/app.js` holds everything:

- `view`, `params` — current screen
- `day` — in-game day; facts in the truth graph unlock by day
- `step` — position in the day script
- `saved[]` — evidence card ids the player kept
- `deductions[]` — pairs the player has solved
- `exits` — times the player has left Juno's thread
- `away` — set while the player is out of Juno's thread, cleared when they come back
- `notice` — the notification on the lock screen, or null
- `junoUnread` — the dot on Juno's row in Chats
- `replay` — the look-back in progress: `{items, i, guesses[], done}`
- `clock` — lock-screen time; set from each `memory` step's timestamp
- `presenter` — true when the page is opened as `index.html?director`: every Juno line shows its intent · rule · source (for demos; players never see it)
- `memories[]` — what Juno has written down about the player
- `flags` — one-off story switches (`sawRachelReply`, `profileTried`, `deletedFound`)

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
