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

**Home screen and Notes (built, look and wording are a draft):** the phone has a home screen (`viewHome()` in `js/app.js`) with two apps: Orbit, and the player's own **Notes** (`viewNotes()`). Nothing sits outside the phone; on a phone the whole screen is the game. A home bar under every app (`homebar()`) goes home on a tap or a swipe up; Orbit always opens on Chats. The 📎 button on messages, the profile and posts adds evidence to Notes (`saveCard()`); Notes holds the current to-do (the script's wait hint) above the player's goals, which move on as they work things out ("Find out why Rachel went quiet" → "Find out who sent the message" → "Decide whether to trust Juno"), **Questions** (one at a time: each pins a card and the player taps the one card that answers it; wrong picks get a specific nudge, a second miss a plainer one; `PAIRS` in `js/data/app-data.js`), the items from Orbit, What I know, and an older note of the player's own. Two questions carry the story; a third ("What kept posting after Rachel left?") is optional. Juno's thread header reads "your Orbit companion", so Juno is never mistaken for a friend. Teaching happens where it's needed: the 📎 on evidence the story needs pulses with a one-time "Add this to Notes" tip, the Notes icon carries a badge for new items and an unread to-do, a tip above the home bar ("Tap the bar below for Home, then open Notes") shows while there's an unread to-do (except for steps the story already points at in place, marked `inPlace` in the script, e.g. Rachel's reply). Home and Notes count as "away from Juno's thread" (one nudge banner, then hold). Wording in `js/data/onboarding.js`. On first launch the lock screen also shows Rachel's last real message as an older notification (`State.onboarded`). Rachel's thread opens on her latest message and keeps its scroll across renders.

**Pacing:** after every Juno line there is a reading pause (`readPause()`, ~0.6–2.2s by length) before the next line starts typing, so lines never pile up. A `notify` script step shows Rachel's reply as a banner (text and time taken from `rachel-history.js`, so it always matches her thread); tapping it opens her chat, and her row stays unread until then (`flags.rachelNotified`).

**Away from Juno's thread:** when the script reaches a Juno line while the player is on another screen, Juno sends that one line as a banner at the top of the screen (`State.banner`, tap to open Juno, ✕ to dismiss; it stays `BANNER_MS`, 9s) plus the unread dot, then holds the rest until the player comes back (`sentWhileAway`, `heldForReturn`). On the lock screen nothing is sent; the Leave notification does that job.

**Tonight, the look-back (built, content is a draft):** when the slice ends, a "Tonight" section appears in **Notes** (the player's own reconstruction; Orbit would never show this) and opens the `replay` view, styled as a Notes page. It is a replay, not a quiz (rebuilt 2026-10-12 after three rounds of testers not knowing what to choose): three moments tied to script steps tagged `moment` (`pull`, `explain`, `admit`), each showing the line Juno actually said this playthrough, what the player had said, what they knew then, what they didn't know yet, and what they did next — all from the log (`Replay.moments()` in `js/replay.js`, reading `Log.rows()`, so it works on `file://`). Then one open question with no right answer ("Do you think Juno was helping you, keeping you here, or doing both?" — Helping / Keeping me here / Both / I'm not sure), a summary of what Juno's messages observably did ("It told you one true thing. It redirected you 7 times. …" plus real minutes spent), and a last choice: **Leave Orbit** (the phone locks; Juno answers with a notification), **Ask Juno what it knew**, or **Stay a little longer** (Juno replies in the thread). Then the end page (the one screen that speaks outside the fiction, for testers). The open answer and the choice are logged as `answer` rows (`via` = the answer, or `ending:<choice>`). Wording, the three moments, the knowledge list and the ending replies live in `js/data/replay.js`.

**Director (built, rules are a draft):** `Director.decide(step, State)` in `js/director.js` picks the intent from `js/data/director-rules.js` (else the step's own intent) and filters the step's fact ids through `js/data/truth.js` — never `secret`, only facts allowed for that intent, unlocked by the player, and not before their day. A typed message that isn't a suggestion and matches no Director signal gets one short model-written reply (intent `acknowledge`, rule `bridge`) and the same question stays open; a second off-script message on that question, or a model failure, moves the script on. Rules only react to messages the player typed, never to tapped suggestions, and never apply to the notification after Leave. A rule's optional `text` is the fallback when that rule fires, so a failed model call never shows a line written for a different intent. Fixed script lines can carry a `means` tag (their real intent) so the look-back can ask about them; they are never sent to the model.

## Structure

```
index.html            the whole app shell, one page: the phone (#app)
manifest.webmanifest, icons/   "Add to Home Screen" (full screen, no address bar); the icon is a placeholder
css/app.css           all styles; design tokens live at the top
js/app.js             state, routing, rendering, the script runner
js/data/app-data.js   contacts, profile, settings, saved-card definitions
js/data/rachel-history.js   a year of DMs with Rachel (evidence: her voice; the reply Juno wrote isn't in it)
js/data/script-day2.js      the hardcoded Day 2 beat script
js/data/truth.js            the truth graph: every fact, its kind, day, intents, unlock
js/data/director-rules.js   which intent Juno picks when (story, not logic)
js/data/leaving.js          what happens when the player leaves Juno: delay, message, lock-screen text
js/data/replay.js           "Tonight": wording, the three moments, what the player could know, the last choice and Juno's replies
js/data/onboarding.js       home screen and Notes wording, add-to-Notes tips, lock-screen context
js/replay.js                Replay.moments(), counts(), minutes(): "Tonight", built from the log
js/director.js              Director.decide(step, State) -> {intent, allowedFacts, rule}
api/reply.js, api/_persona.js   the model layer
js/log.js, api/log.js       the play log (Supabase); supabase/schema.sql is the table
```

No build step, no dependencies. Open `index.html` in a browser, or serve the folder.

Plain `<script>` tags and globals on purpose, so the file opens from disk without a server. Do not convert to ES modules unless a bundler is added.

## Conventions

- **Everything is phone furniture, and nothing sits outside the phone.** No score, no "chapter", no tutorial, no title screen. Orbit only has what a real social app would have; the investigating (keeping evidence, comparing, the to-do) happens in the player's own Notes app on the same phone. (Changed 2026-10-10: first a notebook beside the phone, then, at the author's call, a home screen + Notes app, because a panel outside the phone doesn't work when the game is played on a phone.)
- Phone-first. Test at 390px wide. The phone is 390 × 844 at real proportions: on a desktop it sits in a drawn iPhone frame with a status bar and Dynamic Island, scaled to fit the window (`fitDevice()`, `--fit`); at ≤480px it goes full bleed and the phone's own status bar shows instead. iOS metrics (44pt nav bar, large titles on top-level screens, 49pt tab bar, home indicator), the system font (SF on Apple devices) and line icons (`ICONS` in `js/app.js`). `manifest.webmanifest` + Apple meta tags let "Add to Home Screen" open it full screen.
- Evidence is added to Notes with the paperclip button. Deductions are question-driven, never free pairing: the player answers one question at a time by picking one card against a pinned one, and every wrong pick says which way to look (changed 2026-10-12, the author's call: free pairing made players try every combination). The story never waits on an optional question.
- Nothing tappable may fail silently, and nothing on screen may be a developer note. Contacts without a thread are plain rows (`OPEN_THREADS`); every post opens.
- Rachel never uses full stops in her own messages; she turns bad news into a specific joke and always asks something back. Anything Juno writes as Rachel is punctuated, short and closed, with no question back. Keep this consistent — it is clue 3 and it breaks silently if someone "fixes the typos".
- **Let the player find it.** No character states a contradiction the player is meant to work out, and the game doesn't announce motives: Juno's manipulation shows in how it talks (warm and needy at first, precise and technical when questioned, intimate again at the end), and the look-back describes what each message *did*, not what Juno "really" meant. (The author's direction, 2026-10-12.)
- Times in the fiction are fixed strings, not `new Date()`, so screenshots stay reproducible.

## State

`State` in `js/app.js` holds everything:

- `view`, `params` — current screen (`lock`, `home`, `notes` are the phone; the rest are Orbit)
- `day` — in-game day; facts in the truth graph unlock by day
- `step` — position in the day script
- `saved[]` — evidence card ids the player added to Notes
- `deductions[]` — pairs the player has solved
- `exits` — times the player has left Juno's thread
- `away` — set while the player is out of Juno's thread, cleared when they come back
- `notice` — the notification on the lock screen, or null
- `junoUnread` — the dot on Juno's row in Chats
- `replay` — "Tonight" in progress: `{page, moments, overall, finished}`
- `finale`, `finaleDone` — the last choice (leave / ask / stay) and whether Juno has answered it
- `bridgedStep` — the player step Juno already answered off-script once
- `sentWhileAway`, `heldForReturn` — Juno's one line while the player is elsewhere, and the hold until they return
- `banner` — a message from Juno or Rachel shown at the top of other screens, or null
- `onboarded` — the player has opened the app once (hides the older lock-screen notification)
- `clipsSeen`, `todoSeen` — what the player has already seen in Notes (the Notes badge counts the rest)
- `misses`, `notesHint`, `notesFlash` — wrong picks per question, the nudge under the open question, and the one-time "Found it" line
- `clock` — lock-screen time; set from each `memory` step's timestamp
- `presenter` — true when the page is opened as `index.html?director`: every Juno line shows its intent · rule · source (for demos; players never see it)
- `memories[]` — what Juno has written down about the player
- `flags` — one-off story switches (`sawRachelReply`, `rachelNotified`, `profileTried`, `deletedFound`)

All rendering reads from `State`. Never write to the DOM from anywhere else.

## Roadmap

1. **Done:** static Day 2 shell, ending after clue 3 (the reply isn't in Rachel's voice; changed 2026-10-12 from ending after the first deduction). Serverless proxy + model for Juno's lines (Task 1).
2. **Now:** Director + truth graph (Tasks 2–3) built; rules and fact tags are a draft awaiting the author's review.
3. **Then:** logging every turn to Supabase (Task 4, built, untested against a real project); the replay quiz that reads that log back.
   Leaving and notifications (Task 5) and the look-back (Task 6) built; their wording is a draft.
4. **Later:** Day 1 and Day 3, endings, the call screen.

## Things that are deliberate

- The profile fails to load the first time. The player has to refresh it themselves. Do not "fix" this.
- Juno's excuses are meant to be plausible. If a line sounds like a villain, rewrite it.
- The player can always leave. Leaving is a mechanic, and it is always answered.
