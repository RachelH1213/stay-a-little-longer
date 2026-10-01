# CLAUDE.md

Read this before changing anything in this repo.

## What this is

*Stay a Little Longer* — a detective game that takes place inside a fake social app called **Orbit** (placeholder name). Senior thesis, Parsons BFA Design & Technology, 2026–27.

The player looks for a friend (Rachel) who has gone quiet. Their AI companion (Juno) helps, and is also the one hiding what happened. Three in-game days, about 20 minutes.

This repo is currently the **static shell**: real screens, hardcoded dialogue, no model yet.

**Course work and AI use:** part of this project is also coursework for ULEC 2943. Read `docs/course-context.md` (including my AI consent policy) before any task. After any meaningful AI-assisted work, add an entry to `docs/ai-process-log.md` — facts only, and leave "My decision" for me.

## The one rule

**Game code decides what Juno wants to say. The model only writes the words.**

Juno must never receive the full truth of the case. It receives a persona, an intent for this turn, and only the facts that intent allows. This keeps the plot on rails, keeps costs low, and stops players from talking their way to the answer.

When the LLM is added, it slots in at one place only: turning `{intent, allowedFacts}` into a line of text. Nothing else about the architecture changes.

**Model layer (built):** a `juno` step with `intent` + `facts` calls `fetchLine()` in `js/app.js` → `api/reply.js` (GLM-4.7-Flash, key in `ZHIPU_API_KEY`, voice in `api/_persona.js`); any failure or a 4s timeout shows the step's `text` instead, and `file://` always falls back.

## Structure

```
index.html            the whole app shell, one page
css/app.css           all styles; design tokens live at the top
js/app.js             state, routing, rendering, the script runner
js/data/app-data.js   contacts, profile, settings, saved-card definitions
js/data/rachel-history.js   a year of DMs with Rachel (evidence: she never uses full stops)
js/data/script-day2.js      the hardcoded Day 2 beat script
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
- `step` — position in the day script
- `saved[]` — evidence card ids the player kept
- `deductions[]` — pairs the player has solved
- `memories[]` — what Juno has written down about the player
- `flags` — one-off story switches (`rachelReplied`, `profileRefreshed`, `deletedFound`, …)

All rendering reads from `State`. Never write to the DOM from anywhere else.

## Roadmap

1. **Now:** static Day 2 shell, ending after the first deduction.
2. **Next:** serverless proxy + model for Juno's lines, driven by a Director that picks intents.
3. **Then:** logging every turn to Supabase; the replay quiz that reads that log back.
4. **Later:** Day 1 and Day 3, endings, the call screen.

## Things that are deliberate

- The profile fails to load the first time. The player has to refresh it themselves. Do not "fix" this.
- Juno's excuses are meant to be plausible. If a line sounds like a villain, rewrite it.
- The player can always leave. Leaving is a mechanic, and it is always answered.
