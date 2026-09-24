# Build queue

One task per Claude Code session. Clear the context between tasks. Read `CLAUDE.md` first.

Ask for a plan before any code on tasks 1–3.

## 1. Model layer

Create `api/reply.js`, a serverless function that takes `{persona, intent, allowedFacts, recentTurns}` and returns one line of text. Zhipu GLM-4.7-Flash, key from an env var, never in the code. Wire `js/app.js` so `juno` steps can come from the model, keeping the hardcoded lines as a fallback when the request fails.

## 2. Director

New file `js/director.js`. Reads State and the truth graph, returns `{intent, allowedFacts}` for the turn. Five intents to start: `give_clue`, `deflect`, `block`, `retain`, `concede`. Plain functions, no framework.

## 3. Truth graph

Move case facts out of the script into `js/data/truth.js`: facts, evidence, which are real, which are red herrings, which day each may be revealed. The Director reads it. The model never sees it.

## 4. Logging

`js/log.js` writes every turn to Supabase: timestamp, player message, detected state, chosen intent, reply, exits. Fails silently so a network problem never breaks play.

## 5. Leaving and notifications

Closing Juno's thread shows the lock screen. A notification arrives after a delay. Returning through it is recorded.

## 6. Replay quiz

Built from the log. Pick five of Juno's messages by rule, ask "helping you, or keeping you?" for each, flip to show the real intent, then the summary screen.

## Deadlines

- Interactive Prototype, midterm 10/13–15: tasks 1–4 working end to end for Day 2.
- Proof of Concept, 11/5: tasks 5–6, plus the rest of the Day 2 content.
- Final, 12/10: Days 2 and 3, two endings.

## After each task

Write a short entry in `devlog/` — what you built, what broke, what you changed your mind about. The course requires the blog, and it doubles as material for the final paper.
