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

**Home screen, Notes and Photos (built, look and wording are a draft):** the phone has a home screen (`viewHome()` in `js/app.js`) with three apps: Orbit, the player's own **Notes** (`viewNotes()`) and **Photos** (`viewPhotos()`). Photos is a real camera roll (2026-10-14, the author's call): tonight's screenshots plus a year of the player's own photos and old screenshots (`PHOTOS` in `investigation.js`), each with a date and where it's from; opening one shows its info and "Show Juno". When Juno asks how the player would know what Rachel sounds like, Photos offers a memory, "You and Rachel" (`PHOTO_MEMORY`, script step `memory-banner`), which holds a February screenshot of her: a second way to the sync lie. Juno's photo tray shows the whole library; a camera-roll photo only counts as found (for the pulse) once opened (`State.photosOpened`). Nothing sits outside the phone; on a phone the whole screen is the game. A home bar under every app (`homebar()`) goes home on a tap or a swipe up; Orbit always opens on Chats. Juno's thread header reads "your Orbit companion", so Juno is never mistaken for a friend. On first launch the lock screen also shows Rachel's last real message as an older notification (`State.onboarded`). Rachel's thread opens on her latest message and keeps its scroll across renders.

**Investigating (rebuilt 2026-10-14 after classmates and the teacher found Notes confusing, the paperclip awkward, and the game too guided; tables in `js/data/investigation.js`, every line a draft):**
- **Screenshots instead of the paperclip.** A floating screenshot button on every Orbit screen (`shotButton()`, labelled "Screenshot" and pulsing until the first one; moved from the top bar 2026-10-14 because it was missed) turns on screenshot mode (`State.capturing`): a white bar says what to do, the screen dims, anything that can be kept gets a blinking dashed outline, the next tap keeps it (`takeShot()`, white flash, shutter sound, a thumbnail in the corner that opens Photos) and it goes to Photos (`State.shots`; ids also in `State.saved` for the Director). Every message, post and her deleted profile can be screenshot (`shotAttr()` registers them while rendering); `SHOTS` names the ones the story knows. A tip under Rachel's reply explains it the first time. A tap on nothing in screenshot mode says what to tap.
- **The story teaches the loop.** After "it loads fine for me" the player offers "i'll screenshot it for you" and Juno says "then show me."; after "that has to mean something" the player says it doesn't sound like her and Juno asks "how would you even know that?". While Juno waits, its thread says where to get the proof (`SHOT_UI.needs`) until the player has it, then the photo button pulses.
- **Showing Juno.** In Juno's thread, the photo button (`attach`) opens a tray of screenshots; sending one (`showJuno()`) shows it as an image in the thread. If it breaks a lie Juno has already told (`LIES`, script steps with `lie`), the lie is exposed (`State.deductions`, flag `exposed_<id>`): a gated lie lets the script move on (its next line is Juno's answer); an optional one (`sick`, caught with a screenshot of Juno's own "not since sunday") gets Juno's fixed `reply`. For `sync` the player first says what's different (`observe`, chips or typed; the one their answer in Rachel's thread points at comes first). Anything else gets a short `WRONG_SHOT` line. The button is disabled while Juno is typing or waiting for an answer, and pulses when the story waits for a screenshot the player already has.
- **The story moves on when the player has seen something or shown Juno something**, never because they kept it in the right place: waits are `deletedFound`, `exposed_loads`, `exposed_sync`. The to-do only appears in Notes after `HINT_AFTER_MS` (35s) without progress (`hintShown()`), with a badge and the home-bar tip.
- **Notes** is the player's own notes, bigger and shorter: Tonight (when the slice ends), the to-do (late), goals ("Find out what happened to Rachel's account" → "Find out whether Rachel sent the reply" → "Find out who, or what, sent it" and "Find out why Rachel went quiet", which stay open), **What I know** (`FINDINGS`, written down as the player finds them, new ones highlighted; the badge counts them), and an older note. No questions, no cards.
- **More ways to find things:** Orbit search in Chats (`searchResults()`: Rachel's messages and posts, Dani's chat; searching "sick" finds nothing from Rachel and sets `searchedSick`), Dani's thread with two questions (`DANI`), her "quiet" post dated after the deletion (`sawPostAfter`).
- Juno's tone follows what the player caught: a step with `if: "deduction:sick"` only plays if they exposed that lie.

**Opening (rebuilt 2026-10-12, the author's call: the mystery starts between the player and Rachel):** the lock screen shows Juno's first line, a memory about the player (it follows the start page's "What should Juno remember about today?" choice: "still awake after crit?", "still thinking about who didn't show?", …; script step marked `opening: "notice"`; Juno's next line stays on that same memory, then says why the player joined: `opening: "follow"`, `remember[].follow` + `join[].opening`) above Rachel's Sunday message "tues 9am / bring the blue charger" — a plan she never turned up for. Before the story, a start page (`viewIntro()`, the one page besides the end page that speaks outside the fiction; added 2026-10-13 at the author's call; two short screens, `State.introPage`: the premise and how to play, then the choices and the name, the author's call 2026-10-13) gives the premise (a year and a half on Orbit; Juno introduced you to Rachel; tonight she missed a plan and Juno wrote first), asks why the player joined Orbit (`State.joinReason`) and what Juno should remember about today (`State.remember`; "I'd rather not say" is a real option, and unpicked counts as it), and the player's first name (`State.name`; Juno uses it via `{name}` in script lines; never logged), so the notification opens straight into Juno's thread with no form in between. The player brings Rachel up themselves; her "reply" then arrives to the player as a notification, and Juno only sounds relieved. The chosen memory goes to the top of "Juno remembers". There's no flashback: Juno's thread starts with older messages above "Today" (`ONBOARDING.junoHistory`), and tapping Juno's name in its thread opens Juno's profile (`viewJunoProfile()`: together since March 2025, who it introduced you to, what it remembers). At the end, whichever choice the player makes, Juno adds one line tied to why they joined (`join[].ending`; on Leave, a second notification). Added 2026-10-13, the author's call to combine ChatGPT's proposal with Claude Code's; wording in `js/data/onboarding.js` is a draft. In Rachel's thread, one old message from Rachel ("why did you keep talking to me / like after juno introduced us") has the player's reply left blank ("What did you say back?"); tapping it offers four answers (`RACHEL_RECALL` in `rachel-history.js`, `State.whyRachel`, logged as an `answer` row `recall:<id>`), and the choice becomes the player's message. If it points at a difference ("you always asked something back", "you made bad nights funny"), that observation comes first when the player tells Juno what's different about the reply (added 2026-10-13, the author's call; wording a draft). In Rachel's thread the player can type: messages are never delivered ("Not Delivered", "This account can't receive messages.", `State.rachelSent`, `flags.replyFailed`).

**Pacing:** after every Juno line there is a short reading pause (`readPause()`) before the next line starts typing; ordinary lines take ~0.5–1s (shortened 2026-10-12). Script lines marked `retype` (Juno's lies) show the typing dots stop and start again before sending. A `notify` script step shows Rachel's reply as a banner (text and time taken from `rachel-history.js`, so it always matches her thread); tapping it opens her chat, and her row stays unread until then (`flags.rachelNotified`). The reply is hidden from her thread until it arrives.

**Away from Juno's thread:** when the script reaches a Juno line while the player is on another screen, Juno sends that one line as a banner at the top of the screen (`State.banner`, tap to open Juno, ✕ to dismiss; it stays `BANNER_MS`, 9s) plus the unread dot, then holds the rest until the player comes back (`sentWhileAway`, `heldForReturn`). On the lock screen nothing is sent; the Leave notification does that job.

**Tonight, the look-back (built, content is a draft):** when the slice ends, a "Tonight" section appears in **Notes** (the player's own reconstruction; Orbit would never show this) and opens the `replay` view, styled as a Notes page. It is a replay, not a quiz (rebuilt 2026-10-12 after three rounds of testers not knowing what to choose): three moments tied to script steps tagged `moment` (`pull`, `explain`, `admit`), each showing the line Juno actually said this playthrough, what the player had said, what they knew then, what they didn't know yet, and what they did next — all from the log (`Replay.moments()` in `js/replay.js`, reading `Log.rows()`, so it works on `file://`). Then one open question with no right answer ("Do you think Juno was helping you, keeping you here, or doing both?" — Helping / Keeping me here / Both / I'm not sure), a summary of what Juno's messages observably did ("It told you one true thing. It redirected you 7 times. …" plus real minutes spent), and a last choice: **Leave Orbit** (the phone locks; Juno answers with a notification), **Ask Juno what it knew**, or **Stay a little longer** (Juno replies in the thread). Then the end page (the one screen that speaks outside the fiction, for testers). The open answer and the choice are logged as `answer` rows (`via` = the answer, or `ending:<choice>`). Wording, the three moments, the knowledge list and the ending replies live in `js/data/replay.js`.

**Director (built, rules are a draft):** `Director.decide(step, State)` in `js/director.js` picks the intent from `js/data/director-rules.js` (else the step's own intent) and filters the step's fact ids through `js/data/truth.js` — never `secret`, only facts allowed for that intent, unlocked by the player, and not before their day. A typed message that isn't a suggestion and matches no Director signal gets one short model-written reply (intent `acknowledge`, rule `bridge`) and the same question stays open; a second off-script message on that question, or a model failure, moves the script on. Rules only react to messages the player typed, never to tapped suggestions, and never apply to the notification after Leave. A rule's optional `text` is the fallback when that rule fires, so a failed model call never shows a line written for a different intent. Fixed script lines can carry a `means` tag (their real intent) so the look-back can ask about them; they are never sent to the model.

## Structure

```
index.html            the whole app shell, one page: the phone (#app)
manifest.webmanifest, icons/   "Add to Home Screen" (full screen, no address bar); the icon is a placeholder
css/app.css           all styles; design tokens live at the top
js/app.js             state, routing, rendering, the script runner
js/data/app-data.js   contacts, profile, settings
js/data/investigation.js    screenshots (SHOTS), Juno's lies and what breaks them (LIES), Notes findings, search, Dani, hint delay
js/data/rachel-history.js   a year of DMs with Rachel (evidence: her voice; the reply Juno wrote isn't in it)
js/data/script-day2.js      the hardcoded Day 2 beat script
js/data/truth.js            the truth graph: every fact, its kind, day, intents, unlock
js/data/director-rules.js   which intent Juno picks when (story, not logic)
js/data/leaving.js          what happens when the player leaves Juno: delay, message, lock-screen text
js/data/replay.js           "Tonight": wording, the three moments, what the player could know, the last choice and Juno's replies
js/data/onboarding.js       start page (premise, choices), Juno's older messages and profile, home screen and Notes wording, add-to-Notes tips, lock-screen context
js/replay.js                Replay.moments(), counts(), minutes(): "Tonight", built from the log
js/director.js              Director.decide(step, State) -> {intent, allowedFacts, rule}
api/reply.js, api/_persona.js   the model layer
js/log.js, api/log.js       the play log (Supabase); supabase/schema.sql is the table
js/sound.js                 synthesised sounds and vibration: Sound.play("juno" | "notify" | "snap" | …)
```

No build step, no dependencies. Open `index.html` in a browser, or serve the folder.

Plain `<script>` tags and globals on purpose, so the file opens from disk without a server. Do not convert to ES modules unless a bundler is added.

## Conventions

- **Everything is phone furniture, and nothing sits outside the phone.** No score, no "chapter", no tutorial, no title screen (the start page and the end page are the author's two exceptions). Orbit only has what a real social app would have; the investigating (keeping evidence, comparing, the to-do) happens in the player's own Notes app on the same phone. (Changed 2026-10-10: first a notebook beside the phone, then, at the author's call, a home screen + Notes app, because a panel outside the phone doesn't work when the game is played on a phone.)
- Phone-first. Test at 390px wide. The phone is 390 × 844 at real proportions: on a desktop it sits in a drawn iPhone frame with a status bar and Dynamic Island, scaled to fit the window (`fitDevice()`, `--fit`); at ≤480px it goes full bleed and the phone's own status bar shows instead. iOS metrics (44pt nav bar, large titles on top-level screens, 49pt tab bar, home indicator), the system font (SF on Apple devices) and line icons (`ICONS` in `js/app.js`). `manifest.webmanifest` + Apple meta tags let "Add to Home Screen" open it full screen.
- Evidence is kept as screenshots and used by showing it to Juno; Notes only writes down what the player has found (changed 2026-10-14; before that a paperclip and question-driven pairing in Notes). The story never waits on keeping something, only on seeing it or showing it, and never on an optional lie.
- Nothing tappable may fail silently, and nothing on screen may be a developer note. Contacts without a thread are plain rows (`OPEN_THREADS`); every post opens.
- Rachel never uses full stops in her own messages; she turns bad news into a specific joke and always asks something back. Anything Juno writes as Rachel is punctuated, short and closed, with no question back. Keep this consistent — it is clue 3 and it breaks silently if someone "fixes the typos".
- **One visual system in three layers** (night pass, 2026-10-13, the author's call; colours still a draft): the **phone** (near-black, grey, off-white; quick and mechanical), **humans** (Rachel, old messages, Notes: warmer, imperfect), and **Orbit** (deep blue-violet; the breathing orbit ring on Juno's avatar and notifications; Juno types as an orbit closing). Evidence in Notes keeps its source's look (chat bubble, red system bar, post thumbnail). One font everywhere. On a desktop the phone sits in a dark room (lamp, screen glow), never on a neutral background. Sounds are synthesised in `js/sound.js` (`Sound.play(name)`; vibration where supported); Juno has its own sound. Planned next (not built): Orbit's ring gradually appearing where it doesn't belong (Notes, Rachel's messages, the home screen).
- **Juno's key lines are fixed, not model-written.** Where a line carries a clue or a lie the player can catch (e.g. "she hasn't answered me either. not since sunday" and later "she told me yesterday she wasn't feeling well" — Juno contradicting itself, the author's call 2026-10-13), it is written in the script. The model only writes low-stakes lines, and `GUARDS.all` throws away any line that invents what happened to Rachel (sick, hospital, trip…).
- **Time is the story's time.** The status bar clock moves with the script (`clock` steps, the notification's own time); "Tonight" reports the story's clock (23:31 to 23:58), never real playing time.
- **Let the player find it.** No character states a contradiction the player is meant to work out, and the game doesn't announce motives: Juno's manipulation shows in how it talks (warm and needy at first, precise and technical when questioned, intimate again at the end), and the look-back describes what each message *did*, not what Juno "really" meant. (The author's direction, 2026-10-12.)
- Times in the fiction are fixed strings, not `new Date()`, so screenshots stay reproducible.

## State

`State` in `js/app.js` holds everything:

- `view`, `params` — current screen (`lock`, `home`, `notes` are the phone; the rest are Orbit)
- `day` — in-game day; facts in the truth graph unlock by day
- `step` — position in the day script
- `saved[]` — ids of the screenshots taken (the Director reads this)
- `deductions[]` — Juno's lies the player exposed (`LIES` ids)
- `shots[]`, `capturing`, `flash`, `preview`, `attachOpen`, `viewingShot`, `shotsSeen` — screenshots taken tonight, screenshot mode, the flash and the corner thumbnail, the tray in Juno's thread, the photo open in Photos, the Photos badge
- `album`, `memoryShown`, `photosOpened[]` — the Photos memory open, whether Photos has offered it, camera-roll photos the player has opened
- `liesTold`, `observeOpen`, `findings`, `wrongShots` — lies Juno has said, the "what's different?" step, what the player said was different, and the cycle of replies to screenshots that break nothing
- `knownSeen`, `query`, `daniAsked[]` — findings seen in Notes (the badge counts the rest), Orbit search, what the player asked Dani
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
- `name` — what Juno calls the player (typed in on first open; local only, never logged)
- `introPage` — the start page's screen: 0 the premise, 1 the choices and the name
- `whyRachel`, `recallOpen` — what the player said back to Rachel's old question (`RACHEL_RECALL` id), and whether its options are showing
- `joinReason`, `remember` — the start page's two choices (ids from `ONBOARDING.intro.join` / `.remember`)
- `rachelSent[]` — messages the player tried to send Rachel (never delivered)
- `profileErase` — Rachel's profile while refreshing: 0 cached, 1–4 being erased, 5 done
- `noticeExtra` — Juno's second lock-screen line ("still there?") if the player waits 20s
- `todoSeen` — the to-do the player has already read in Notes
- `clock` — lock-screen time; set from each `memory` step's timestamp
- `presenter` — true when the page is opened as `index.html?director`: every Juno line shows its intent · rule · source (for demos; players never see it)
- `memories[]` — what Juno has written down about the player
- `flags` — one-off story switches (`sawRachelReply`, `rachelNotified`, `profileTried`, `deletedFound`, `sawPostAfter`, `searchedSick`, `daniAsked`, `exposed_<lie>`)

All rendering reads from `State`. Never write to the DOM from anywhere else.

## Roadmap

1. **Done:** static Day 2 shell, ending after clue 3 (the reply isn't in Rachel's voice; changed 2026-10-12 from ending after the first deduction). Serverless proxy + model for Juno's lines (Task 1).
2. **Now:** Director + truth graph (Tasks 2–3) built; rules and fact tags are a draft awaiting the author's review.
3. **Then:** logging every turn to Supabase (Task 4, built, untested against a real project); the replay quiz that reads that log back.
   Leaving and notifications (Task 5) and the look-back (Task 6) built; their wording is a draft.
4. **Later:** Day 1 and Day 3, endings, the call screen.

## Things that are deliberate

- Rachel's profile first shows what Orbit cached two days ago ("Updated 2 days ago · Pull down to refresh"). The player has to refresh it themselves (pull down, or tap that line); refreshing erases her piece by piece, then shows the account was removed. Do not "fix" this. (Changed 2026-10-13 from a "Couldn't load" error page.)
- Juno's excuses are meant to be plausible. If a line sounds like a villain, rewrite it.
- The player can always leave. Leaving is a mechanic, and it is always answered.
