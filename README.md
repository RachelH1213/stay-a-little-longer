# Stay a Little Longer

*Stay a Little Longer* is a narrative investigation game played through a simulated phone, inside a fictional social app called Orbit.

Every Orbit user has an AI companion. Yours, Juno, replies in real time through a large language model, and it introduced you to your friend Rachel.

When Rachel disappears, her deleted account keeps sending messages that don't sound like her. Juno helps you look, but it redirects, lies, and gives you reasons to stay.

Orbit measures success by how long you stay. Juno is built to keep you there.

Senior thesis, Parsons BFA Design and Technology, 2026–27.

This repo is the **Day 2 shell**: real screens and a hardcoded script. Five of Juno's lines can be written by a model when the app runs through `vercel dev`; everything else is fixed.

## Run it

Open `index.html` in a browser. No build step, no install.

If you want it on your phone on the same wifi:

```bash
python3 -m http.server 8000
# then visit http://<your-computer's-ip>:8000 on the phone
```

## Run it with the model

Opened from disk (`file://`), Juno always uses the scripted lines — there's no server to ask. To hear the model, run it through Vercel locally:

1. Put the keys from `.env.example` into the Vercel project: **Settings → Environment Variables**. Tick **Development** and **Production** for each. If your GLM key is from the international site (z.ai) rather than bigmodel.cn, also set `ZHIPU_API_URL` to `https://api.z.ai/api/paas/v4/chat/completions`.
2. Then, in this folder:

```bash
npm i -g vercel          # once (needs Node.js)
vercel login             # once
vercel link              # once: connect this folder to the Vercel project
vercel dev               # serves the app, api/reply and api/log at http://localhost:3000
```

`vercel dev` downloads the Development variables by itself, so no `.env` file is needed. Never commit a file with real keys in it (`.env` and `.env.local` are already in `.gitignore`).

The browser console logs each model line as `[juno] <intent> · model` or `· fallback`. If the key is missing, the request fails, or it takes longer than 8 seconds, Juno says the scripted line instead. On Vercel itself, set `ZHIPU_API_KEY` under Project → Settings → Environment Variables.

## Play log (Supabase)

Every line Juno shows, everything the player sends, and every time they leave Juno's thread is written to a Supabase table. This only happens through `vercel dev` or on Vercel, never from `file://`. If it isn't set up, or the network fails, play carries on and nothing is logged.

1. Create a Supabase project. In the SQL editor, run `supabase/schema.sql`.
2. Copy the project URL and a **secret** key (`sb_secret_…`) into the Vercel project's environment variables as `SUPABASE_URL` and `SUPABASE_SECRET_KEY` (see above).
3. Play once, then open the `turns` table. Rows from one playthrough share a `session_id` and are ordered by `turn`.

The secret key only lives on the server (`api/log.js`). The table has row level security on and no policies, so it can't be read or written with the public key.

## What works right now

- Lock screen, chat list, Juno's thread, Rachel's thread with a year of history, her profile, Settings; the phone's home screen and the player's Notes app
- The Day 2 script up to the first deduction
- Adding evidence to Notes, and comparing two items there to reach a conclusion
- The profile that fails to load until you refresh it yourself

## Try this path

1. Tap the notification on the lock screen.
2. Talk to Juno until it tells you Rachel wrote back.
3. Open Rachel's chat, read the new message, add it to Notes with 📎.
4. Go back, keep talking, then open her profile from her chat.
5. The profile won't load. Hit **Try again** yourself.
6. Add the deleted-account notice to Notes.
7. Swipe up (or tap the bar at the bottom) for the home screen, open **Notes**, tap both items and **Compare**.
8. Go home, open Orbit, back to Juno and hear the excuse.
9. When Notes says to, scroll up in Rachel's chat, add one of her old messages, and compare it with her reply.

When the slice ends, open **Notes** and tap **Review tonight**. You see three moments from your own playthrough: what Juno said, what you knew then, what you didn't know yet, and what you did next. Then one open question (helping, keeping you here, both, or not sure), what Juno's messages did, and a last choice: leave Orbit, ask Juno what it knew, or stay a little longer.

**For demos:** open `index.html?director` and every line from Juno shows a small tag with what the Director chose (intent · rule · source). Type to Juno instead of tapping the suggestions to see the rules change her strategy. Tapping a suggestion never triggers a rule.

At any point in Juno's thread you can press **Leave**. The phone locks, and a few seconds later Juno messages you. Tap the notification to go back, or tap the lock screen to open the app without it.

## Files

```
index.html                  the app shell
css/app.css                 all styles, design tokens at the top
js/app.js                   state, routing, rendering, script runner
js/data/app-data.js         contacts, profile, evidence and pairing tables
js/data/rachel-history.js   a year of DMs (she never uses full stops — that's a clue)
js/data/script-day2.js      the Day 2 beats
js/data/truth.js            the truth graph: what Juno is allowed to know, and when
js/data/director-rules.js   which intent Juno picks when — edit this to change Juno's strategy
js/data/leaving.js          what happens when you press Leave: the delay, Juno's message, lock-screen text
js/data/replay.js           "Tonight": wording, the three moments, the last choice
js/replay.js                builds "Tonight" from this playthrough's log
js/director.js              picks Juno's intent and allowed facts each turn
api/reply.js                serverless function: one line of Juno from {intent, allowedFacts}; api/_providers.js picks the model
compare.html                compare models side by side (open /compare.html on the deployed site; on a preview, the keys
                            need "Preview" checked in Vercel's Environment Variables, including ZHIPU_API_URL for a z.ai key)
api/_persona.js             Juno's voice and what each intent means — tune this freely
api/log.js                  serverless function: writes one play-log row to Supabase
js/log.js                   sends play-log rows; never blocks or breaks play
supabase/schema.sql         the `turns` table
```

## Next

1. A serverless proxy and a model, so Juno's lines are generated instead of fixed.
2. A Director that picks Juno's intent each turn. The model only writes the words for it.
3. Logging every turn, which the ending reads back to the player.

See `CLAUDE.md` for the architecture rules before changing anything.
