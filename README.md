# Stay a Little Longer

A detective game that takes place inside a fake social app. Senior thesis, Parsons BFA Design and Technology, 2026–27.

You are looking for a friend who has gone quiet. Your AI companion is helping you look, and is also the reason she is gone.

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

```bash
npm i -g vercel          # once
cp .env.example .env     # then paste your Zhipu key after ZHIPU_API_KEY=
vercel dev               # serves the app and api/reply at http://localhost:3000
```

The browser console logs each model line as `[juno] <intent> · model` or `· fallback`. If the key is missing, the request fails, or it takes longer than 4 seconds, Juno says the scripted line instead. On Vercel itself, set `ZHIPU_API_KEY` under Project → Settings → Environment Variables.

## Play log (Supabase)

Every line Juno shows, everything the player sends, and every time they leave Juno's thread is written to a Supabase table. This only happens through `vercel dev` or on Vercel, never from `file://`. If it isn't set up, or the network fails, play carries on and nothing is logged.

1. Create a Supabase project. In the SQL editor, run `supabase/schema.sql`.
2. In Project Settings → API keys, copy the project URL and a **secret** key (`sb_secret_…`) into `.env` as `SUPABASE_URL` and `SUPABASE_SECRET_KEY`. On Vercel, add the same two as environment variables.
3. Play once, then open the `turns` table. Rows from one playthrough share a `session_id` and are ordered by `turn`.

The secret key only lives on the server (`api/log.js`). The table has row level security on and no policies, so it can't be read or written with the public key.

## What works right now

- Lock screen, chat list, Juno's thread, Rachel's thread with a year of history, her profile, Saved, Settings
- The Day 2 script up to the first deduction
- Saving evidence, and putting two saved cards together to reach a conclusion
- The profile that fails to load until you refresh it yourself

## Try this path

1. Tap the notification on the lock screen.
2. Talk to Juno until it tells you Rachel wrote back.
3. Open Rachel's chat, read the new message, save it with the flag icon.
4. Go back, keep talking, then open her profile from her chat.
5. The profile won't load. Hit **Try again** yourself.
6. Save the deleted-account notice.
7. Open **Saved**, tap both cards, and put them together.
8. Go back to Juno and hear the excuse.

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
js/director.js              picks Juno's intent and allowed facts each turn
api/reply.js                serverless function: one line of Juno from {intent, allowedFacts}
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
