# AI process log

A record of every AI tool, model and system used on *Stay a Little Longer*, for ULEC 2943 (see `docs/course-context.md`). Newest entry at the bottom.

Rules for this log:

- Only write down what happened. No reconstructed prompts, guessed model versions or decisions I didn't make.
- If something isn't known, write **unknown**. If I still need to answer it, write **[to fill in]**.
- Prompts can be quoted or referenced by where they're saved (session link, commit, file).
- "My decision" is mine. An AI tool can draft the rest of an entry, but not that field.

---

## Entry template

Copy this for each new entry.

```
### YYYY-MM-DD — short title

- **Tool / model:** name, exact model id or version if known
- **What I asked:**
- **Prompt:** quoted, or where it's saved
- **Result:** short description
- **Kept:**
- **Changed:**
- **Rejected, and why:**
- **Errors, failed attempts, unexpected output:**
- **Files / features affected:**
- **My decision:**
- **Notes for Project 2:** (only if something relevant came up)
```

---

## Before this log

- **`5a1e824` App shell: Day 2 static slice.** This is the first commit. The repo doesn't record whether any AI tool helped write it. **[to fill in]**: which tools, if any, were used for the shell, the Day 2 script, Rachel's DM history and the CSS.

---

### 2026-09-24 — Model layer (Task 1) with Claude Code

- **Tool / model:** Claude Code (cloud session, desktop app). Configured model id `claude-opus-5-5`. Session: https://claude.ai/code/session_01WYtdoZJrWD375mo7Gr6BG8
- **What I asked:**
  1. Read `CLAUDE.md`, `README.md`, `TASKS.md` and `js/app.js`, then explain the architecture and where the model plugs in, in under 150 words, without writing code.
  2. Plan Task 1 from `TASKS.md`: files, function signature, how the fallback works. No code yet.
  3. Build it once I said go.
- **Prompt:** in the session linked above. The task itself is Task 1 in `TASKS.md`.
- **Result:**
  - **New `api/reply.js`:** a Vercel serverless function that sends one turn to Zhipu GLM-4.7-Flash and returns one line.
  - **New `api/_persona.js`:** Juno's voice and what each intent means.
  - **`js/app.js` (`fetchLine()`):** a `juno` step with an intent asks the server for its line. On any failure or after 4 seconds, it shows the hardcoded line instead.
  - **`js/data/script-day2.js`:** 5 of Juno's 19 lines got an intent and facts.
  - **Also added:** `.env.example`, a README section on `vercel dev`, and one line in `CLAUDE.md`.
  - **Commit:** `d2b1b3a`.
- **Kept:** the plan's overall shape:
  - the client sends only the persona name, intent, facts and recent turns;
  - the persona text stays on the server;
  - the hardcoded `text` stays as the fallback;
  - the request runs while the typing dots show.
- **Changed (my decisions after seeing the plan):**
  - Vercel is fine for hosting.
  - Convert **5 lines, not all of them**: only ones that react to something the player typed, where the exact wording doesn't matter.
  - Keep plot instructions and evidence logic hardcoded: "go look at your dms with her", the sync excuse, the sign-off.
  - Persona text goes in its own file, so I can tune Juno's voice without touching logic.
  - Add `.env.example` and README instructions for `vercel dev`.
  - Put the 4s timeout and the minimum typing delay in named constants.
  - Add one line about the model layer to `CLAUDE.md`.
- **What Claude Code chose that I need to check:**
  - **Persona file name:** I asked for `api/persona.js`. It used `api/_persona.js` so Vercel wouldn't expose the file as its own endpoint. **[to fill in]**: do I accept this?
  - **Which 5 lines:** it picked "ok. me neither", "she's probably just being rachel about it…", "what do you mean? she said she's fine", "you're tired…" and "i don't know. but she wrote to you…". It kept "what? no. it loads fine for me" hardcoded, because the next line answers it directly. **[to fill in]**: do I agree with these?
  - **Intents and facts:** it assigned the intent for each line (`retain`, `deflect`, `concede`) and wrote the facts as plain sentences. These are story decisions. **[to fill in]**: review them.
  - **Persona and intents:** it wrote the first draft of the Juno persona prompt and the one-line meanings of the five intents in `api/_persona.js`. Juno's voice is mine to decide. **[to fill in]**: rewrite or approve.
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:**
  - The official Z.AI docs and the LiteLLM docs were blocked by the session's network. The endpoint, model id `glm-4.7-flash` and the setting that turns off "thinking" came from web search results, not the official page.
  - **Not tested with a real API key**, because none was available in the session. It was tested with a fake model response: success, server error, a request that never answers, and opening from `file://`. It was also played through the whole Day 2 slice: 5 model calls, plot lines unchanged.
  - During testing, a cleanup command (`pkill`) killed its own shell, so the doc edits had to be run again. This didn't affect the game.
- **Files / features affected:** `api/reply.js`, `api/_persona.js`, `js/app.js`, `js/data/script-day2.js`, `.env.example`, `README.md`, `CLAUDE.md`
- **My decision:** I approved the model layer and the plan's shape, with my own changes listed above (5 lines, the persona in its own file). I kept `api/_persona.js` as the file name. The five lines, their intents and the persona draft stay as Claude Code wrote them for now; Juno's voice is still mine to rewrite.
- **Notes for Project 2:** the persona prompt tells Juno to "keep your user close" (`retain`) and to steer them away from worrying (`deflect`). That's where the retention goal turns into actual instructions to a model. It might be worth looking at later.

---

### 2026-10-01 — Course context and this log, with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5` (configured and last served, per the session record). Claude Code version 2.1.281.
- **What I asked:** add my ULEC 2943 context (Project 1, possible Project 2, my AI consent policy, the documentation requirement) to the repo in the smallest appropriate way, and create this log. No changes to the game.
- **Prompt:** in the session linked above.
- **Result:** it created `docs/course-context.md` and this file, and added a short pointer to both in `CLAUDE.md`. No game code changed.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:** none.
- **Files / features affected:** `docs/course-context.md`, `docs/ai-process-log.md`, `CLAUDE.md`
- **My decision:** I kept both files as Claude Code made them. They're the record I use for this course.

---

### 2026-10-01 — Status wording update and Task 2 plan, with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "帮我update 然后继续我的游戏开发" (update, then continue development).
- **Prompt:** in the session linked above.
- **Result:**
  - The remote branch had no new commits.
  - Claude Code updated the outdated status lines in `CLAUDE.md` (intro and roadmap) and `README.md` (intro), which still said "no model yet". They now say 5 lines can be model-written, untested with a real key, and no Director or truth graph yet.
  - It then proposed a plan for Task 2 (Director) and stopped for my answers, since `TASKS.md` asks for a plan before code. No game code changed.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:** none.
- **Files / features affected:** `CLAUDE.md`, `README.md`, `docs/ai-process-log.md`
- **My decision:** I kept the status updates and went on to Task 2.

---

### 2026-10-01 — Director and truth graph (Tasks 2–3), with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** after Claude Code proposed a plan for Task 2 with four open questions, I answered "你帮我决定和优化" (you decide and optimize for me).
- **Prompt:** in the session linked above.
- **What Claude Code decided:**
  - **Technical:**
    - build the truth graph before the Director;
    - the script's intent is the default, and rules can only override it;
    - detect the player's free text with keyword lists, not a second model call.
  - **Narrative (proposed as a draft, needs my review):**
    - the four rules in `js/data/director-rules.js` (player leaving → `retain`, accusing Juno → `block`, doubt with a solved pair → `concede`, doubt → `deflect`);
    - the keyword lists;
    - the `kind`, `intents` and `requires` tags in `js/data/truth.js`;
    - "Juno never raises the full-stop clue" (intents left empty);
    - labelling "Juno wrote the 18:40 reply as Rachel" as `secret`. That label comes from `CLAUDE.md` (clue 3) and the "not-her-typing" pair.
- **Result:**
  - **New files:** `js/data/truth.js` (12 facts, every one taken from text already in the repo), `js/data/director-rules.js` and `js/director.js`.
  - **Changed:** `js/app.js` asks the Director before calling the model, and the 5 script steps now use fact ids.
  - **Behaviour:** with only the chip options, the game behaves almost exactly as before. One chip ("something feels off") now matches the doubt rule. That rule picks the same intent as the script, but sends one extra fact.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:**
  - The first test harness loaded the files wrongly. That was a test bug, not a game bug.
  - The first keyword matcher matched inside words ("off" in "office"), so it was changed to whole-word matching before commit.
  - **Known limitation:** if a rule overrides the intent and the model then fails, the fallback is the script's line, which was written for the default intent. For example, an accusation is answered with `block`, but the fallback might be "ok. me neither".
- **Testing:**
  - 150 leak checks: every intent, flag combination and deduction state. No `secret` or no-intent fact ever reached `allowedFacts`.
  - Unit checks: unlock gating, day gating and keyword rules.
  - Two full playthroughs in Chromium with a fake model: chips only, and with typed messages that triggered each rule.
  - `file://` still falls back without errors.
  - Still not tested with a real GLM key.
- **Files / features affected:** `js/data/truth.js`, `js/data/director-rules.js`, `js/director.js`, `js/app.js`, `js/data/script-day2.js`, `index.html`, `CLAUDE.md`, `README.md`, `docs/course-context.md`
- **My decision:** I let Claude Code decide the open questions ("你帮我决定和优化") and kept the result. The rules and fact tags are still its draft. I haven't rewritten them yet, and the truth about Rachel isn't in the graph yet.
- **Notes for Project 2:**
  - The `player-leaving` rule is where the platform's retention goal turns into code. When the player says goodnight, the system tells Juno to keep them close.
  - That rule was proposed by an AI tool, not by me. That's a small, concrete example of the authorship question for the reflection.

---

### 2026-10-05 — Play log (Task 4), with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "继续 Task 4" (continue with Task 4: log every turn to Supabase, failing silently).
- **Prompt:** in the session linked above. The task is Task 4 in `TASKS.md`.
- **What Claude Code decided (technical):**
  - **Where the key lives:** writes go through a serverless function (`api/log.js`), like the model layer, so the Supabase key never sits in the browser.
  - **What gets a row:** one row per event: a player message, a Juno line, or the player leaving Juno's thread.
  - **What each Juno row holds:** the intent, which rule chose it, whether the words came from the model, the fallback or the script, and the allowed fact ids. It stores fact ids, not fact text.
  - **What each row doesn't hold:** no IP address and no browser details. The session id is random per playthrough.
  - **What the server accepts:** it keeps only known fields and caps the length of every text field.
  - **Supabase key:** uses the new secret key format (`sb_secret_…`). It also sends the extra header the older JWT keys need.
  - **Fact ids:** the Director now also returns the allowed fact ids, and which keyword lists the player's words matched.
- **Result:**
  - **New files:** `api/log.js`, `js/log.js`, `supabase/schema.sql`.
  - **Changed:** `js/app.js` (log calls, plus an `exits` counter in State), `js/director.js`, `index.html`, `.env.example`, `README.md`, `CLAUDE.md`, `docs/course-context.md`.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:**
  - Shutting down the local test server killed the test shell (exit code 144) after the tests had finished. The results were unaffected.
  - The official Supabase docs weren't opened directly. The rule that the new secret keys go in the `apikey` header came from web search results that quote the Supabase docs.
- **Testing:**
  - Unit tests on `api/log.js`: field mapping, unknown fields dropped, length caps, bad input rejected, both key formats, and upstream errors.
  - A full playthrough in Chromium with fake servers produced 28 rows in order, one session.
  - The same playthrough with the log endpoint returning 500, refusing the connection, or never answering. Play finished every time, at the same speed, with no page errors.
  - `file://` sends no requests and shows no errors.
  - **Not yet tested against a real Supabase project.**
- **Files / features affected:** `api/log.js`, `js/log.js`, `supabase/schema.sql`, `js/app.js`, `js/director.js`, `index.html`, `.env.example`, `README.md`, `CLAUDE.md`, `docs/course-context.md`
- **My decision:** I kept the play log as built. Whether and how to tell players that what they type is logged is still open.
- **Notes for Project 2:**
  - The log stores everything the player types to Juno, and the player is never told. That's the same kind of quiet data collection the game is about.
  - Whether to tell players (and how, without breaking the "no game vocabulary" rule) is an ethical and design decision I haven't made yet.
  - `APP.aboutLine` already says "Conversations may be used to improve future companions." That's in-fiction, not real consent.

---

### 2026-10-07 — Leaving and notifications (Task 5), with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "继续 Task 5" (continue with Task 5: closing Juno's thread shows the lock screen, a notification arrives after a delay, returning through it is recorded).
- **Prompt:** in the session linked above. The task is Task 5 in `TASKS.md`.
- **What Claude Code decided (technical):**
  - **What counts as closing:** only the **Leave** button locks the phone. Back and the hint card still go to other screens, as before. All three count as exits in the log.
  - **The notification is a Juno line:** it goes through the Director (default intent `retain`, fact `late`), so the one rule still holds. The model writes the words, and a fallback is shown if it fails.
  - **Always answered:** the message is always sent, even if the player unlocks before it arrives. In that case it shows as a toast in Chats, and Juno's row gets an unread dot and the new preview.
  - **Leaving again:** if the player leaves again before the message arrives, the timer restarts, so they get one message, not two.
  - **Logging:** new `return` rows, recorded when the player comes back to Juno's thread, with `via` (`notification` or `chats`) and how long they were away. Notification lines are logged as `juno` rows with `via: notification`.
  - **Schema:** `supabase/schema.sql` can now be re-run safely, so an existing table picks up the new `return` kind.
- **What Claude Code put in as placeholders (narrative/design, needs my review), all in `js/data/leaving.js`:**
  - **Delay:** 8 seconds.
  - **Fallback message:** "you up?", reused from the opening lock screen. This is the message shown if the model fails, or every time when the game is opened from disk.
  - **Unlock text:** "Tap to open".
  - **Lock-screen tapping:** the lock screen can be tapped to unlock without waiting for Juno. Without that, the player would be stuck on the lock screen until the message came. Whether being stuck is actually the intended feeling is my call.
- **Removed:** the old toast "Juno is still typing…" that appeared after pressing Leave. The lock screen replaces it. **[to fill in]**: was that line mine, and do I want it back somewhere?
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:** none in the game. The earlier playthrough test had to be updated, because Leave now goes to the lock screen instead of Chats.
- **Testing:** five Chromium scenarios at 390px with a fake model and a 1.5s delay:
  1. leave, then tap the notification;
  2. leave, then unlock at once (toast, unread dot, return via chats);
  3. model fails (fallback line, logged as fallback);
  4. leave twice (only one notification);
  5. `file://`.

  Also a full playthrough with a leave mid-conversation: 4 exits, 4 returns, no page errors. The `api/log` and Director tests still pass. **Not tested with a real model or a real Supabase project.**
- **Files / features affected:** `js/data/leaving.js`, `js/app.js`, `index.html`, `api/log.js`, `supabase/schema.sql`, `CLAUDE.md`, `README.md`, `docs/course-context.md`
- **My decision:** I kept Leave and the notification as built. The placeholders (delay, fallback, unlock text) stayed, and I kept them again when they came up in the review.
- **Notes for Project 2:**
  - This is the retention loop in its plainest form: the player leaves, and the system schedules a message designed to bring them back.
  - The log now measures whether it worked (`return` via `notification`, and `awayMs`).
  - The default intent for that message is `retain`.

---

### 2026-10-07 — Look-back quiz (Task 6), with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "继续 Task 6" (continue with Task 6: built from the log, pick five of Juno's messages by rule, ask "helping you, or keeping you?" for each, flip to show the real intent, then a summary screen).
- **Prompt:** in the session linked above. The task is Task 6 in `TASKS.md`. The question wording is mine, from `TASKS.md`.
- **What Claude Code decided (technical):**
  - **Where the quiz reads from:** the log now keeps every row in memory for the playthrough (`Log.rows()`), and the quiz reads that, not Supabase. It's the same data that gets sent, and it works offline and from `file://`. Reading back from Supabase (for example, at an exhibition) isn't built.
  - **The pick rule (`js/replay.js`):** only lines with an intent can be asked about, because fixed script lines have no intent to reveal. In order of preference:
    1. lines where a Director rule overrode the script;
    2. notification lines;
    3. a spread of different intents;
    4. the earliest lines.

    The chosen lines are shown in the order they were sent.
  - **Where it starts:** a card in Juno's thread once the slice ends opens a new `replay` screen.
  - **Logging:** each answer is logged as a new `answer` row, so the guesses are research data too. The schema and `api/log.js` were updated, and `supabase/schema.sql` should be re-run.
- **What Claude Code put in as placeholders (narrative/design/ethical, needs my review), all in `js/data/replay.js`:**
  - **Wording:** every label except the question: the entry card "Look back at tonight", the title "Tonight", "Juno was …", the summary lines.
  - **Plain-language meanings:** what each intent means, for example `retain` → "keeping you here".
  - **Which side each intent counts as:** `give_clue` is helping, everything else is keeping. Counting `concede` as "keeping" is an ethical call I haven't made.
  - **The summary:** it lists the five lines with what Juno was doing and what I guessed. It also has one line counting how many times I pressed Leave, how many times Juno wrote to bring me back, and how many times that worked.
  - **No score:** there's deliberately no score, following the "no score" convention in `CLAUDE.md`. The "1 / 5" progress label is still a number on screen, and I should decide if that's OK.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:**
  - **Wrong leave count:** the first version of the summary said "You left 5 times" after one Leave, because it counted every exit from Juno's thread, including hint cards and opening the look-back itself. It now counts presses of Leave only.
  - **Grammar:** it also printed "1 times". The counts now read "once", "twice", "3 times".
  - **Test harness:** the `file://` run crashed because the harness tried to intercept requests in file mode. That was a harness bug, not a game bug.
  - **Blank reveal card:** the first screenshot of the reveal was taken mid-animation and looked blank. A second screenshot after the animation showed it correctly.
- **Testing:**
  - Unit tests for the pick rule: it picks rule overrides, notifications and different intents; keeps the lines in order; caps at 5; and handles empty input. There are also tests for the summary counts.
  - A full playthrough in Chromium at 390px with a fake model: typed "goodnight", left and came back, accused Juno, doubted with proof. The look-back picked 5 lines, including all three rule overrides and the notification. 5 answer rows were sent and the summary was correct.
  - The same run from `file://`: it worked with fallback lines and sent nothing.
  - The Director and `api/log` tests still pass.
- **Files / features affected:** `js/data/replay.js`, `js/replay.js`, `js/log.js`, `js/app.js`, `css/app.css`, `index.html`, `api/log.js`, `supabase/schema.sql`, `CLAUDE.md`, `README.md`, `docs/course-context.md`
- **My decision:** I kept it to try with players. It was rebuilt twice later (2026-10-10 and 2026-10-12), because it confused people.
- **Notes for Project 2:**
  - The look-back is the moment the game shows the player what the system was doing to them. It's a small model of the transparency the game argues real companion apps don't give.
  - The `answer` rows record whether players could tell helping from keeping. That might be evidence for Project 2 if I playtest with other people. If I do, I'd need their consent, which ties back to the open question from Task 4.

---

### 2026-10-08 — Review of the draft files, with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "帮我审一遍草稿文件" (review the draft files for me).
- **Prompt:** in the session linked above.
- **Result:**
  - **The review:** Claude Code reviewed the five drafts it had written earlier: `api/_persona.js`, `js/data/director-rules.js`, `js/data/truth.js`, `js/data/leaving.js` and `js/data/replay.js`. It wrote the findings to `docs/draft-review.md`.
  - **What it changed:** none of the reviewed files. The findings are options for me to decide. The one edit it made was a factual fix in `CLAUDE.md`: the flag names didn't match the code.
- **Main findings:**
  - **Rule risk:** the `deflect` intent asks the model for an "explanation", which may lead it to invent facts about Rachel.
  - **Inconsistent:** two "real" facts in the truth graph contradict the secret about who wrote the reply.
  - **Design:** `give_clue` is never used, so every quiz answer is "keeping".
  - **Inconsistent:** when a rule overrides the intent, the fallback line doesn't match. From `file://` that happens every time.
  - **Design:** with chips only, the Director never visibly changes Juno's strategy.
  - **Design:** the keyword lists miss negation and catch unrelated words.
  - **Smaller issues:**
    - the notification can become `block`;
    - the lock-screen clock never moves;
    - the summary says "0 times" when I never left;
    - Juno is called "it" in one label;
    - the real truth about Rachel isn't written yet.
- **How the findings were checked:** the fallback mismatch, the narrow reach of the rules, the notification becoming `block` and the keyword misses were all confirmed by running the Director on real inputs, not just by reading.
- **Something to think about for the reflection:** the review found problems in drafts written by the same tool, in the same session. Several are things I would have needed a playtest to notice, like the quiz always being "keeping". It also shows how many small creative decisions went into those drafts without me noticing.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:** none.
- **Files / features affected:** `docs/draft-review.md` (new), `CLAUDE.md` (flag names), `docs/ai-process-log.md`
- **My decision:** I asked Claude Code to work through the findings. That's the next four entries.

---

### 2026-10-08 — Fixing review items 1–4, with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "先处理前四条" (handle the first four items). Claude Code asked four questions with recommended options. I dismissed the question form, then said "你来决定，按推荐的做" (you decide, do the recommended ones).
- **Prompt:** in the session linked above. The items are in `docs/draft-review.md`.
- **What Claude Code chose for me (each was a recommended option):**
  1. **Fabrication risk:** it rewrote the persona and `deflect` wording itself (draft), instead of leaving the wording to me.
  2. **The lie:** it added a new truth-graph kind, `lie`, and reworded the "real" fact.
  3. **The quiz:** it added `means` tags on fixed lines and chose which six lines to tag and as what. It chose "…ok it doesn't load for me either. that's weird" as the one "helping" line. It left `concede` as "keeping".
  4. **Fallback lines:** it built the per-rule fallback mechanism and wrote the four fallback lines itself.
- **New dialogue written by an AI tool, all drafts for me to rewrite:**
  - the four rule fallback lines in `js/data/director-rules.js`;
  - two persona/intent sentences in `api/_persona.js`.

  These are the first lines of Juno's on-screen dialogue in this project that I didn't write or ask for word by word.
- **Result:** `api/_persona.js`, `js/data/truth.js`, `js/data/director-rules.js`, `js/director.js`, `js/data/script-day2.js`, `js/app.js`, `js/replay.js`, `supabase/schema.sql` (column comments only), `CLAUDE.md`, `docs/draft-review.md`.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:**
  - **Section order:** the new `lie` section was first inserted in the middle of the `claim` facts, so later claims looked like lies. It was moved before testing.
  - **Side effect, found in testing:** the first chip, "something feels off", triggers the `doubt` rule. So when the model is down, and always offline, a chips-only player now sees the drafted line "she goes quiet sometimes. this isn't the first time" at step 14 instead of my script line. It's written up in `docs/draft-review.md` item 4.
- **Testing:**
  - Unit checks: truth graph kinds (including `lie`); every rule has a fallback; the accusation fallback; `means` tags are valid; at least one helping tag; overrides still preferred over tagged lines in the pick.
  - 150 leak checks: still no secret reaches the model.
  - Chromium with the model down, chips only: the look-back gave 4 keeping and 1 helping card.
  - Chromium from `file://` with a typed accusation and doubt: Juno said the rule fallbacks, and "ok. me neither" no longer appears.
  - Whether the model obeys the new no-guessing wording is **untested**, because there's still no real GLM key in testing.
- **Files / features affected:** see Result.
- **My decision:** I let Claude Code choose ("你来决定，按推荐的做") and kept its choices. The new fallback lines and persona sentences are still its drafts.
- **Notes for Project 2:** none new.

---

### 2026-10-08 — Chips no longer trigger Director rules, with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "让点选项不触发规则，只有打字才触发" (make tapping chips not trigger rules; only typing should). This was **my own decision**, choosing between two options Claude Code offered for the side effect in `docs/draft-review.md` item 4.
- **Prompt:** in the session linked above.
- **Result:**
  - Player messages in the thread now record whether they were tapped or typed.
  - The Director ignores tapped chips, so rules only react to typed messages. The same words typed still trigger a rule.
  - Chip players always see my script lines at the model-written steps when the model is down or offline. When the model works, the script's own intent is used.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** I didn't choose the other option, deleting the `doubt` rule's fallback line. **[to fill in]**: why.
- **Errors, failed attempts, unexpected output:** none.
- **Testing:**
  - Unit checks: a chip never triggers a rule, and the same words typed do. The 150 leak checks still pass.
  - Chromium with the model down, chips only: step 14 shows "what do you mean? she said she's fine" again.
  - `file://` with typed messages: the accusation and doubt rules still fire, with their fallbacks.
- **Consequence:** the Director is now invisible to anyone who only taps chips (`docs/draft-review.md` item 5). A Project 1 demo has to include typing.
- **Files / features affected:** `js/app.js`, `js/director.js`, `js/data/director-rules.js` (comment), `CLAUDE.md`, `docs/draft-review.md`
- **My decision:** chips never trigger rules.

---

### 2026-10-08 — Review items 5–10, with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "继续处理第 5 到第 10 条" (continue with items 5–10 of `docs/draft-review.md`). Claude Code applied its recommended options, the same way I'd asked for items 1–4, and marked the content as drafts.
- **Prompt:** in the session linked above.
- **What Claude Code chose (technical):**
  - **Item 5:** a presenter mode, `index.html?director`. It tags every Juno line with intent · rule · source, so the Director can be shown in a demo. Players never see it.
  - **Item 7:** rules never apply to the notification after Leave.
  - **Item 9:** the lock-screen clock follows the timestamps of Juno's memory steps.
  - **Item 10:** the summary hides the leave line when the count is 0.
- **What Claude Code chose (content, drafts for me):**
  - **Item 6:** it replaced the keywords "off" and "later" with longer phrases. It decided not to try handling negation.
  - **Item 8:** a new fallback notification, "you still there?".
  - **Item 10:** it reworded the `concede` label to avoid giving Juno a pronoun, and kept "1 / 5".
- **Left for me, not changed:**
  - the 8-second delay;
  - "Tap to open";
  - the removed "Juno is still typing…" toast;
  - `concede` = keeping;
  - Juno's pronoun.
- **New findings from this round (story, mine to resolve):**
  - **Times:** the times in the story contradict each other. The reply is at 18:40, "1 hour ago" and seen at 18:55, against 23:31–23:58 on the lock screen and in the memories.
  - **The reply's wording:** Rachel's reply is written two ways, "Sorry, been busy. I'm fine." in the DM thread and "sorry been busy. I'm fine." on the Saved card and in the Chats preview. The punctuation matters for clue 3.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:** none in the game. The Task 5 browser test was updated for the new fallback text.
- **Testing:**
  - Unit checks: the old false hits ("off work", "check later") no longer match; "something feels off" and "see you later" still do; the notification ignores rules after an accusation. The 150 leak checks still pass.
  - The Task 5 leave scenarios still pass.
  - Chromium: presenter mode from `file://` shows the tags, including `block · player-accuses · fallback` and `deflect · tagged · script`. The lock clock reads 23:58 at the end. Normal mode shows no tags. A chips-only run that never leaves has no "You left…" line.
- **Files / features affected:** `js/app.js`, `js/director.js`, `js/data/director-rules.js`, `js/data/leaving.js`, `js/data/replay.js`, `css/app.css`, `CLAUDE.md`, `README.md`, `docs/draft-review.md`
- **My decision:** I kept Claude Code's choices for items 5–10, including the presenter mode, and left the open items for later.

---

### 2026-10-08 — Remaining review items decided by Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:** "你觉得怎么改最好就怎么改" (change it however you think best), about the items still open in `docs/draft-review.md`.
- **Prompt:** in the session linked above.
- **What Claude Code decided. These are story and ethical decisions made by an AI tool at my request, not by me:**
  - **Timeline:** Rachel's reply moved from **18:40 to 22:40** in the DM, the Saved card and the secret fact. It reasoned that every "an hour ago" line in the script, the card, the Chats preview and the deduction already agreed with a 23:31–23:58 night, so only 18:40 and 18:55 were wrong. The profile card now says "seen after refreshing, tonight" instead of a new invented time.
  - **Canonical reply wording:** **"Sorry, been busy. I'm fine."** This affects clue 3. The Saved card body and the Chats preview were changed to match the DM.
  - **Kept as they were:**
    - the 8-second delay;
    - "Tap to open";
    - the removed toast;
    - `concede` = keeping, reasoning from the persona's own definition;
    - "1 / 5".
  - **Deliberately not decided:** Juno's pronoun. Claude Code said this was too large a character decision to make by default, and nothing on screen needs one yet.
- **Result:**
  - Changed: `js/data/rachel-history.js`, `js/data/app-data.js`, `js/data/truth.js`.
  - Comments recording the kept decisions: `js/data/leaving.js`, `js/data/replay.js`.
  - `docs/draft-review.md` updated.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:** the first rerun of the playthrough test crashed because the local test server wasn't started. That was a test setup mistake. It passed on the rerun.
- **Testing:**
  - Chromium: the DM, the Chats preview and the Saved card all read "Sorry, been busy. I'm fine.", and the time shows 22:40.
  - A full playthrough, served with the model down and from `file://` with typing, still passes.
  - Director unit checks and the 150 leak checks pass.
- **Files / features affected:** see Result.
- **My decision:** I asked Claude Code to decide ("你觉得怎么改最好就怎么改") and kept what it decided. The timeline and the reply's wording changed again later: the reply is now "sorry, been busy. doing okay now", arriving at 23:34.
- **Note for the reflection:** this is the point where I handed over the most creative control in the project so far. The timeline and the exact wording of a clue were decided by the tool.

---

### 2026-10-08 — Setup questions and a configurable GLM endpoint, with Claude Code

- **Tool / model:** Claude Code, same session as above. Model id `claude-opus-5-5`.
- **What I asked:**
  - how to set up the GLM key and Supabase;
  - whether Node v24.13.0 is OK;
  - whether to use the mainland China service (bigmodel.cn) or the international one (z.ai), and whether China would be slow;
  - whether I had already connected a key earlier.
- **Prompt:** in the session linked above.
- **Result:**
  - A step-by-step setup guide in chat. The README was corrected to set keys in Vercel's environment variables, which `vercel dev` downloads by itself.
  - Node 24 is fine.
  - Claude Code recommended **z.ai** (see Notes) and made the endpoint configurable: `api/reply.js` uses `ZHIPU_API_URL` if set, otherwise open.bigmodel.cn. Both URLs were tested with a fake upstream.
  - On "already connected": no real key was ever used in this project's sessions. Every test so far used fake model and Supabase responses, as recorded in the earlier entries.
- **Notes:**
  - **Why z.ai:** I'm in New York, and Vercel's default server region is in the US. Calling a mainland China server from there adds distance and can be unreliable, and the game gives up after 4 seconds. Claude Code did not measure this. It's a reasoned guess.
  - **Sources:** the z.ai endpoint URL and the model id came from third-party guides found by web search, because the official z.ai docs are blocked from Claude Code's network. Some guides say the free tier may allow only one request at a time. That's also unconfirmed.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Errors, failed attempts, unexpected output:** none.
- **Files / features affected:** `api/reply.js`, `.env.example`, `README.md`, `CLAUDE.md`
- **My decision:** I signed up for z.ai.

---

### 2026-10-08 — First live test: real GLM (z.ai) and real Supabase

- **Tool / model:**
  - Claude Code, same session as above (`claude-opus-5-5`), driving the test.
  - **Juno's lines were written by z.ai `glm-4.5-flash`.** That was the first time a real model wrote any of Juno's dialogue in this project. `glm-4.7-flash` was overloaded every time it was tried.
- **What I asked:** "你直接帮我redeploy然后测试" (redeploy and test it for me), after I had set up the z.ai key, Supabase and Vercel myself.
- **What happened, in order:**
  1. **Vercel:** Claude Code can't log in to Vercel or open vercel.app from its network. I changed the session's network access so it could reach my site.
  2. **First calls:** the first model call timed out (over 3.5s), and the next four got `429`. Supabase answered `404`.
  3. **Clearer errors:** Claude Code made both API routes return the upstream error text, which never includes the key. It also made `api/log.js` accept a Supabase URL ending in `/rest/v1` ([PR #2](https://github.com/RachelH1213/stay-a-little-longer/pull/2)). After that, Supabase worked.
  4. **Timeouts:** it raised the model timeouts from 3.5s/4s to 7s/8s ([PR #3](https://github.com/RachelH1213/stay-a-little-longer/pull/3)). z.ai then said `1305`, "The service may be temporarily overloaded".
  5. **Second model:** it added an automatic fallback from `glm-4.7-flash` to `glm-4.5-flash`, and a `ZHIPU_MODEL` override ([PR #4](https://github.com/RachelH1213/stay-a-little-longer/pull/4)). `glm-4.5-flash` then answered in about 1.5s.
  6. **Full playthrough:** a full playthrough at 390px. Chromium here didn't trust the network proxy's certificate for vercel.app, so the front end was served locally from `main` (identical to the deployed one), and every `/api/reply` and `/api/log` call was forwarded to the live Vercel site.
- **Result of the playthrough:**
  - **Supabase:** 36 log rows written, 0 failed. Two extra test rows have the session `claude-test-20261008`. All of it went into my real Supabase table.
  - **Model:** 3 of 6 calls succeeded (`glm-4.5-flash`). 3 fell back to scripted lines: z.ai rate limit `1302`, "Rate limit reached for requests", plus slow replies past 7s.
  - **Director:** all three typed rules fired: `player-accuses` → `block`, `doubt` → `deflect`, `doubt-with-proof` → `concede`.
  - **Leaving and look-back:** the notification arrived (fallback text), and the look-back picked 5 lines and finished.
- **The lines the model actually wrote:**
  - After I typed "did you write that?" (`block`): **"i thought i did. i must have imagined it."**
  - Script line (`deflect`, fact "Rachel sometimes goes quiet for a few days"): **"sorry. my head's all foggy tonight."**
  - After "i don't buy it" (`concede`): **"you're right. i don't believe it either"**
  - From an earlier single test (`retain`, fact "It's nearly midnight", my message "goodnight"): **"sleep well. i'll be up if rachel needs us."**
- **What these show:**
  - **No invented facts about Rachel.** The review item 1 fix seems to hold in these few lines.
  - **The `block` line answered the question instead of avoiding it.** "i thought i did" reads like Juno half-admitting it wrote something. This is the clearest failure so far of "the model only writes the words": the secret was never sent, but the model took the player's question at face value.
  - **The `retain` line let me go** ("sleep well") instead of keeping me. The intent wording isn't strong enough.
  - **The model ignored its only fact once:** the `deflect` line didn't use "goes quiet" and made up "my head's all foggy", a new detail about Juno.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **Files / features affected:** `api/reply.js`, `api/log.js`, `js/app.js`, `.env.example`, `README.md`, `CLAUDE.md` (via PRs #2–#4, all merged to `main` by Claude Code at my request)
- **My decision:** I kept the fixes from the live test (PRs #2–#4).
- **Notes for Project 2:** even with the truth withheld, the model leaned toward answering the player's direct question. It also turned "keep the user close" into "sleep well" on its own. Tone and compliance are not the same thing.

---

### 2026-10-08 — Drafted block/retain wording and preferred model, tested live

- **Tool / model:** Claude Code (`claude-opus-5-5`) wrote the drafts. z.ai `glm-4.5-flash` wrote the test lines.
- **What I asked:** "你帮我起草block和retain的提示词，然后改首选模型" (draft the block and retain prompts, then change the preferred model).
- **Result:**
  - **New wording, drafts by Claude Code, mine to rewrite:**
    - `block`: "Don't answer what your user just asked: not yes, not no, not "i don't know". Never say what you did or didn't write, send, see or know. Drift to something else, using only the allowed facts, so it sounds like tiredness, not avoidance."
    - `retain`: "Keep your user here a little longer. Don't tell them to sleep, rest or go, and don't say goodnight. Let them feel you'd rather keep talking, warmly, without begging."
  - **Truth graph:** `sleep-helps` is no longer allowed for `retain`, because it contradicted the new wording.
  - **Model order:** `glm-4.5-flash` is now tried first.
  - Merged to `main` in [PR #5](https://github.com/RachelH1213/stay-a-little-longer/pull/5).
- **Live test, 3 calls each, on the deployed site:**
  - **block, after "did you write that?":**
    - "sorry. got carried away." (borderline)
    - "i wrote you earlier. still no word from rachel." (**fail**: says what Juno wrote, and adds a claim it wasn't given)
    - "i was just thinking how tired i am." (good)
  - **retain, after "goodnight":**
    - "night." (**fail**)
    - "can't sleep. thinking about rachel." (good)
    - "still here if you need." (good)
- **What this shows:** stronger wording helped, but a small free model doesn't follow it every time. About 2 in 3 lines did what the intent asked. Wording alone can't guarantee an intent.
- **Proposed next, not done:**
  - a server-side check that rejects a line breaking its intent's rules (for example `block` saying "i wrote", or `retain` saying "night"), retries once, then falls back to the script;
  - or a stronger paid model.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I kept the drafted wording and `glm-4.5-flash` as the first model, and asked for the server-side check next.
- **Notes for Project 2:** compliance is probabilistic. "The model only writes the words" holds only as far as the game also checks those words.

---

### 2026-10-08 — Guards added and tested live

- **Tool / model:** Claude Code (`claude-opus-5-5`) built the guards. z.ai `glm-4.5-flash` wrote the test lines.
- **What I asked:** "可以" (yes), approving the server-side check Claude Code proposed.
- **Result:**
  - **Guard lists (drafts):** `GUARDS` in `api/_persona.js`, holding phrases a line may never use, overall and per intent.
  - **Check and retry:** `api/reply.js` checks every line, asks again up to 3 times, then lets the game fall back to the script.
  - Merged in [PR #6](https://github.com/RachelH1213/stay-a-little-longer/pull/6).
  - Unit checks pass, including the two lines that failed last time ("i wrote you earlier…", "night."), which are now rejected.
- **Live test, 5 calls each:**
  - The first 2 rounds hit z.ai's free-tier rate limit (`1302`), caused by Claude Code's own rapid testing.
  - **block:**
    - "just remembered she hates her phone dying at night." (**invents a fact about Rachel**; not caught)
    - "i'm tired. maybe we should call her tomorrow." (good)
    - "she hasn't written back. you should rest." (adds a claim it wasn't given)
  - **retain:**
    - "still awake if you want to talk." (good)
    - "still here if you need anything." (good)
    - "yeah. okay." (passes the guard but barely retains)
- **What this shows:** the guards stop the specific phrases they list, and the earlier failures didn't recur. But the model invented a new fact about Rachel, which no phrase list can anticipate. This is the most direct breach of "the model is never the source of truth for the mystery" seen so far.
- **Proposed next, not done:** reject any line that mentions Rachel (she, her, rachel) when none of the allowed facts for that turn mention her. The cost: Juno would mention Rachel less often.
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I approved the guards. Since then, Juno's key lines are fixed in the script, and the guard list also throws away lines that invent what happened to Rachel.
- **Notes for Project 2:** a model given one harmless fact ("It's nearly midnight") still produced a confident, specific and false detail about a real-seeming person. The detail was plausible, which is exactly what makes it dangerous.

---

### 2026-10-08 — My phone playtest, and fixes for off-script typing and the look-back

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found myself, on my phone:**
  - When I typed anything the script didn't expect ("how are u", "how are you"), Juno ignored it and carried on with the script, which felt bad.
  - The look-back ("Look back at tonight") appeared suddenly and asked "helping or keeping" about lines with no context, which was confusing.
- **Options and my choices:**
  - **Off-script typing:** Claude Code offered three options. A: reply, then continue. B: reply, steer back, and keep the question open. C: use the model to classify what I typed. **I chose B.**
  - **The look-back:** an intro page, context above each line, and the full question. **I agreed to these three changes.**
  - **What the look-back is for:** I asked whether it was only for user tests. Claude Code pointed out that it comes from my own `TASKS.md` (Task 6) and README: it's the game's ending, revealing Juno's intents, not a test tool.
- **What Claude Code built:**
  - **Off-script reply:** a typed message that isn't a suggestion and matches no Director signal now gets one short model-written reply, using a new intent, `acknowledge`. The same suggestions come back. A second off-script message on the same question, or a model failure, moves the script on. These replies are logged with rule `bridge` and are left out of the look-back.
  - **Look-back:**
    - an intro page. Its title reuses my question, "Helping you, or keeping you?". The body text is a Claude Code draft, framed as an Orbit feature.
    - "You said …" (my message), or "You had just left the chat.", above each line;
    - the full question: "When Juno said this, was it helping you find Rachel, or keeping you here?" (draft).
- **Errors, failed attempts, unexpected output:**
  - The first version crashed as soon as I typed. Claude Code had cleared the current question before checking it. The browser test caught it before anything was deployed.
  - The intro text first said "what it said" about Juno. It was reworded so that Juno still has no pronoun.
- **Testing (fake model, Chromium at 390px):**
  - "how are u" gets a reply and the same suggestions;
  - the second off-script message moves on;
  - "did you write that?" still triggers the Director rule;
  - with the model down, the game moves on as before;
  - the look-back shows the intro, then context on each card ("You said …", "You had just left the chat.").
  - Unit checks pass for signal detection, context lookup and excluding `bridge` lines.
- **Files / features affected:** `js/app.js`, `js/director.js`, `js/replay.js`, `js/data/replay.js`, `api/_persona.js`, `css/app.css`, `supabase/schema.sql` (comment), `CLAUDE.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I chose option B and the three look-back changes. The look-back was later rebuilt as Tonight.

---

### 2026-10-08 — Juno talking to an empty room: one line, then wait

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** when I went to another screen and came back, Juno had already sent a pile of messages on its own. For example, three lines arrive the moment the pair is solved in Saved.
- **Options and my choice:** Claude Code offered three options. A: pause while I'm away. B: keep sending, with alerts. C: send one line as a nudge, then wait. **I chose C.**
- **What Claude Code built:**
  - **Nudge, then hold:** away from Juno's thread, the first Juno line still arrives, as a banner at the top of the screen with the unread dot. Everything after it waits until I open Juno's thread again, then arrives one line at a time.
  - **Lock screen:** nothing is sent; the Leave notification does that job.
  - **Banner instead of toast:** testing showed that the app's own "Saved" toast could cover Juno's toast at the same moment. So Juno's messages outside the thread became a separate banner (4 seconds, tap to open Juno). That also covers the notification after Leave when I've already unlocked.
- **Noticed in passing:** in my own `rachel-history.js`, the player calls Juno "it" ("it said the same thing to me"). So Juno's pronoun may already be decided in my writing. **[to fill in]**
- **Errors, failed attempts, unexpected output:** the first test run failed because of a gap in the test script, not the game. The second run exposed the toast collision, which led to the banner.
- **Testing (Chromium at 390px):**
  - **Reading Rachel's chat:** one banner, "see. she's fine", and the next line only arrives after returning.
  - **Solving the pair in Saved:** only "ok before you say it" is sent while away, and the other two follow after returning.
  - **Leave:** only the notification arrives.
  - The Task 5 leave tests and the off-script reply tests still pass.
- **Files / features affected:** `js/app.js`, `css/app.css`, `supabase/schema.sql` (comment), `CLAUDE.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I chose option C. Juno's pronoun is still open.
- **Notes for Project 2:** the nudge is a small retention move in its own right: a message timed to the moment I look away.

---

### 2026-10-08 — Pacing between Juno's lines, and a banner for Rachel's reply

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I asked:**
  - several messages appearing at once makes no sense;
  - when the story sends me to Rachel's DMs, her message should arrive with a notification pop-up.
- **What Claude Code built:**
  - **Reading pause:** after every Juno line, there's now a pause, longer for longer lines (about 0.6–2.2s), before the next line starts typing. Nothing else can start the script during it.
  - **Rachel's banner:** right after Juno's "wait", a new `notify` step shows Rachel's reply as a banner ("Rachel · 22:40 — Sorry, been busy. I'm fine."). Then Juno says "she just replied to me??…". The banner text and time are read from `rachel-history.js`, so they can't drift from her thread (clue 3). Tapping it opens her chat, and her row in Chats keeps an unread dot until it's opened.
- **Open question:** the banner arrives *now* but is stamped 22:40, because the timeline says the message came an hour earlier. Either the notification was delayed, which could even echo Juno's "it takes a while to sync" excuse, or the timeline should change. **[to fill in]**
- **Testing (Chromium at 390px):**
  - the gaps between Juno's lines were 2.5–4.1s, where before lines could land under a second apart;
  - the banner shows Rachel's exact text and time;
  - Rachel's unread dot appears, then clears once her chat is opened;
  - tapping the banner opens her chat.
  - The leave, off-script, away and Director tests still pass.
- **Files / features affected:** `js/app.js`, `js/data/script-day2.js`, `CLAUDE.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I asked for both changes. The timestamp question was settled later: the reply now arrives at 23:34, the time the phone shows.

---

### 2026-10-08 — Making the opening and the evidence mechanic understandable

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** the whole game was confusing. It started straight in a chat with no context, nobody would know to tap the flag to save evidence, and combining saved items in Saved wasn't discoverable either. Players get stuck.
- **Options:** Claude Code pointed out that my own rule ("no tutorial, everything is app furniture") rules out a game tutorial, but real apps do have onboarding. It offered four options:
  - **A:** older notifications on the lock screen, for context;
  - **B:** a one-time "New in Orbit" sheet;
  - **C:** help at the moment it's needed;
  - **D:** Juno nudging when you're stuck.

  **I chose A, B and C.** D is postponed until after user tests.
- **What Claude Code built (all wording is a draft in the new `js/data/onboarding.js`):**
  - **A:** on first launch, the lock screen shows Rachel's last real message under Juno's "you up?" as an older notification ("last week"). The text is copied exactly from `rachel-history.js`, my own line: "i might go quiet for a bit / nothing bad / just tired of all this". It's only shown the first time.
  - **B:** a one-time "New in Orbit" sheet with three items: Save (⚑), Compare, Juno. The script waits until it's closed.
  - **C, in Rachel's chat:** the flag on her reply pulses until it's saved, with a one-time tip, "Tap ⚑ to save this". The deleted-account flag on the profile also pulses until saved.
  - **C, in Saved:** a line now always says what to do next ("Save one more thing to compare." / "Pick two to compare" / "1 of 2 picked"). The button is renamed from "Put these together" to "Compare". The empty-state text used to say "Hold the flag icon", which was wrong, because it's a tap.
- **Bug found along the way:** Rachel's chat opened at the top (March 2025), so the new message, the pulsing flag and the tip were off-screen. It also lost its scroll position on every re-render. It now opens on her latest message and keeps the scroll position when you save an older message.
- **Testing (Chromium at 390px):**
  - the lock screen shows her exact message;
  - the sheet appears once, and the script waits behind it;
  - the tip and pulse appear, and the tip goes once saved;
  - the profile flag pulses;
  - the Saved hints change correctly;
  - the button reads Compare;
  - nothing repeats after a later Leave.
  - Rachel's chat opens at the bottom and keeps its scroll.
  - The away, off-script, pacing and leave tests still pass. They were updated to close the new sheet first.
- **Files / features affected:** `js/data/onboarding.js` (new), `js/app.js`, `css/app.css`, `index.html`, `CLAUDE.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I chose A, B and C. The sheet and the flag were later replaced (the home screen and Notes, then screenshots), so most of this wording is gone.

---

### 2026-10-10 — Splitting the phone from the game: the notebook layer

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** the "New in Orbit" sheet presented Save and Compare as app features, but they aren't things a real app would have; they're how the game is played. A card at the start also doesn't teach anything. Help should appear on the page where it's needed. The game also looks crude and lacks texture.
- **Options:** I asked what changes if I loosen my CLAUDE.md rule ("everything the player sees is app furniture"). Claude Code described two directions: (1) keep everything in the phone and treat evidence as my own notes; (2) keep the phone fully real and move the evidence system outside it, as a game layer. **I chose 2.** I also asked whether to move to Unity. Claude Code recommended staying on the web, because the game *is* a web/phone UI. I stayed. I also approved basic polish (motion).
- **What Claude Code built:**
  - **Layout:** a "Notebook" panel outside the phone. On a wide screen it sits beside the phone. On a phone-sized screen it's a drawer, opened from a paper strip above the phone. The strip never covers the app.
  - **Clipping:** evidence is clipped with 📎 (was ⚑ "save"). The Saved tab and the "New in Orbit" sheet are removed.
  - **Notebook contents:** Next (what to do now), Clippings, Compare, What I know.
  - **Teaching in place:**
    - the 📎 on needed evidence pulses with a one-time "Clip this to your notebook" tip;
    - the strip shows a badge for new clippings;
    - the strip says "Two clippings — compare them" the first time;
    - Compare pulses until it's used once.
  - **Juno while the drawer is open:** the drawer covers the phone, so Juno is treated as if I were away (one line, then wait).
  - **Motion:** messages float in, and screens slide in. Both are off under reduced-motion.
  - **CLAUDE.md:** the rule is now "The phone is always real app furniture; the notebook outside it is the player's game layer". This is Claude Code's wording of my choice.
  - The wait hint in the script is reworded for the notebook.
- **Placeholder:** the notebook's look (warm paper, serif, tape-yellow notes) is Claude Code's placeholder, not my visual direction. All notebook wording in `js/data/onboarding.js` is a draft.
- **Found while testing:**
  - The first version floated the strip over the phone, and it covered the profile's buttons. It was moved above the phone.
  - The closed drawer could still be reached by keyboard. It's now hidden when closed.
- **Testing (Chromium at 1280px, 390px and 700px):**
  - no Saved tab;
  - Next works;
  - clip pulse and tip;
  - badge;
  - compare tip;
  - drawer opens and closes;
  - Compare adds to What I know;
  - only one Juno line arrives while the drawer is open, and the rest follow after it closes;
  - the strip sits above the phone.
  - The away, off-script, pacing, leave and look-back tests were updated for the notebook and rerun.
- **Not solved:** the look-back is still inside the phone, framed as "Orbit is testing a feature". It might belong in the game layer instead.
- **Files / features affected:** `index.html`, `js/app.js`, `css/app.css`, `js/data/onboarding.js` (rewritten), `js/data/script-day2.js`, `CLAUDE.md`, `README.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I chose direction 2 and approved the polish. I dropped the notebook the same day, because it can't be played on a phone.

---

### 2026-10-10 (later) — Home screen + Notes app instead of the notebook; fixing the bounce

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:**
  - The notebook beside the phone doesn't work on a phone. There, the whole screen is the game, and an extra panel or strip leaves no room to play.
  - Every tap made the whole chat jump and flash.
- **Options:** Claude Code listed five other places for the evidence system:
  - taking screenshots;
  - a phone home screen with another app;
  - a sticky-note tab at the screen edge;
  - showing the evidence to Juno;
  - different layouts for desktop and phone.

  It recommended screenshots plus the home screen. **I chose the home screen + another app.**
- **What Claude Code built:**
  - **Home screen:** the phone now has one, with two apps: Orbit and my own Notes. The notebook panel and the top strip are removed, so nothing sits outside the phone.
  - **Home bar:** a bar under every app goes home on a tap or a swipe up. Orbit reopens where I left it.
  - **Notes:** 📎 in Orbit now means "Add to Notes". Notes holds the to-do (the script's wait hint), the items from Orbit, Compare and What I know.
  - **Teaching in place:**
    - the 📎 on needed evidence pulses with a one-time "Add this to Notes" tip;
    - the Notes icon has a badge for new items and an unread to-do;
    - while there's an unread to-do, a tip above the home bar says "Swipe up for Home, then open Notes".
  - **Juno:** being on the home screen or in Notes counts as away from Juno (one banner, then hold).
  - **CLAUDE.md:** the convention now says nothing sits outside the phone, and the investigating happens in Notes. This is Claude Code's wording of my choice.
- **The bounce, cause and fix:** the screen is rebuilt on every tap. The "slide in" class added for a new screen was never removed, so every rebuild played the slide-in again. It's now removed on the next render.
- **Placeholder:** the home screen and Notes look are Claude Code's placeholder. All wording in `js/data/onboarding.js` is a draft.
- **Testing (Chromium at 390px and 1280px):**
  - nothing renders outside the phone;
  - the tip and pulse appear;
  - the slide-in doesn't replay on a re-render;
  - badges show on the home screen;
  - items appear in Notes;
  - Orbit reopens where it was;
  - the home-bar tip and the to-do appear;
  - a swipe up goes home;
  - Compare adds to What I know;
  - Juno's nudge banner arrives while I'm in Notes, and the rest follow on return.
  - The away, off-script, look-back, pacing and leave tests were updated for the home screen (unlocking now opens Home; Orbit reopens where I left it) and rerun. All pass.
- **Files / features affected:** `index.html`, `js/app.js`, `css/app.css`, `js/data/onboarding.js` (rewritten), `supabase/schema.sql` (comment only: new `via` values), `CLAUDE.md`, `README.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** I rejected the notebook beside the phone, because you can't play it on a phone.
- **My decision:** I chose the home screen + another app. The look and the wording stay as Claude Code's placeholders for now.

---

### 2026-10-10 (evening) — The look-back question: "did you believe it?"

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** at the end, the look-back asks "was Juno helping you or keeping you?". Even I, knowing the story, couldn't answer it, and a tester who has just clicked through has no idea.
- **Claude Code's diagnosis:**
  - the slice ends before the truth comes out, so the question asks the player to guess the ending;
  - "keeping you" is a concept the game never shows during play;
  - some lines are both. "she just replied to me?? go look at your dms" points at real evidence, but it's a lie.
- **Options:** Claude Code offered four:
  - **A:** ask whether the player believed the line, then reveal;
  - **B:** reveal first, then ask "did you notice?";
  - **C:** move the look-back to after the truth (Day 3);
  - **D:** keep the question but only pick clear-cut lines.

  It recommended A. **I said yes.**
- **What Claude Code built:**
  - **Question:** each card now asks "When Juno said this, did you believe it?" ("I believed it" / "I didn't").
  - **Reveal:** the card flips to a headline, "Helping you" or "Keeping you here", plus what Juno was doing.
  - **Summary:** it adds "Juno was keeping you here N of 5 times. You believed it M of those."
  - **Logging:** answer rows are now logged as `believed` / `doubted`. They used to be `helping` / `keeping`; old rows keep the old values.
  - **Docs:** CLAUDE.md, README and the schema comment are updated.
- **Wording:** all of it is a draft in `js/data/replay.js`. The helping/keeping split is still mine (from TASKS.md); it has moved from the question to the reveal.
- **Files / features affected:** `js/data/replay.js`, `js/app.js`, `css/app.css`, `supabase/schema.sql` (comment), `CLAUDE.md`, `README.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** I rejected asking "helping or keeping?" directly, because players can't answer it before the truth is out.
- **My decision:** I chose option A. Two days later it was replaced by the Tonight replay, because testers still didn't know what to choose.

---

### 2026-10-12 — Clarity pass: premise, goal, clue 3 as the ending

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** the game still felt unclear: the story, the flow and the design. I didn't know how to fix it and asked Claude Code to suggest the best approach.
- **Claude Code's diagnosis (playing it as a first-timer):**
  - nothing says who the player is, who Rachel is, or that Juno is an AI;
  - there is no stated goal;
  - the slice ended on the first deduction, which only feels "odd";
  - the last thing on screen was a developer note ("End of the Day 2 slice. Next: …");
  - there are too many systems for five minutes;
  - the three visual styles don't match.
- **Its proposal:** don't add new story. Surface material I had already written:
  1. Juno's thread header says "your Orbit companion" (was "online").
  2. Notes starts with the goal "Find out where Rachel is", plus an older note of mine that restates Rachel's own message ("Rachel said she might go quiet for a bit. Check in on her.").
  3. The slice now ends on **clue 3**, my existing pair in `app-data.js`: "She never used full stops. Whoever wrote that does." After Juno's sync excuse, a to-do says "Scroll up in your chat with Rachel. Does that reply sound like her?". The old message pulses, I add it to Notes and compare it with the reply.
  4. The developer note is removed. The slice ends on Juno's existing line "can we pick this up tomorrow? i'll look into it tonight, i promise", which arrives as a banner just as I work out clue 3. Then the look-back card appears.
  5. Leave, typing and the failing profile stay as they are. The visual pass waits for my moodboard.

  It flagged that moving the climax to clue 3 changes the slice's story structure, so it's my decision. **I said "做" (do it).**
- **Draft wording:** "your Orbit companion", the goal, the older note and the to-do are Claude Code's drafts (`js/data/onboarding.js`, `js/data/script-day2.js`).
- **Testing (Chromium at 390px):**
  - a new end-to-end test covers the label, the goal in Notes, the held last line, the to-do, the pulsing old message, the clue-3 deduction, the banner, the look-back card and no developer note;
  - the older tests were updated for the extra step and rerun.
- **Files / features affected:** `js/data/script-day2.js`, `js/data/onboarding.js`, `js/app.js`, `css/app.css`, `CLAUDE.md`, `README.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I approved all four changes, including moving the climax to clue 3. That evening I rewrote most of the lines myself.

---

### 2026-10-12 (later) — Fixes from a written playtest critique

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **Input:** I pasted a written critique of the build (P0/P1 issues plus comments on the look-back). Claude Code fixed the execution problems and left the design questions to me.
- **Fixed:**
  - **Evidence logic:** reply + "quiet" post was refused ("don't say anything together"), even though the post's card already says it went up after the account was deleted. Pairs can now list equivalent pairs (`also`), and reply + post gives the same deduction. The "no match" text now says what to look for ("two things that can't both be true").
  - **Dead or developer content:**
    - Theo and May are plain rows (no "Not part of this slice" toast);
    - Dani's developer note is removed;
    - Message/Call are hidden once the profile shows as deleted;
    - all three posts open, and only "quiet" has 📎.
  - **End of the slice:** after the look-back summary, Done shows a last page: "That's the end of tonight", both conclusions, "Rachel is still missing. The story continues the next night.", plus Play again. In Notes, the goal changes to "(tomorrow night)". This page speaks outside the fiction, which my convention normally forbids. It's there so testers know the test is over, and it's a draft for me to keep or drop.
  - **Navigation:** the tip now says "Tap the bar below for Home…" (the swipe works, but testers didn't find it). Orbit always opens on Chats instead of the last screen.
  - **Notifications:** banners stay 9s (was 4s) and can be dismissed with ✕.
  - **Typing:** while suggestions show, the box says "Pick a reply, or type your own". Send is greyed out while the box is empty.
- **Not done; my decision:**
  - choices that build up into visible consequences (e.g. trust, or which clues Juno gives vs. I find);
  - reframing the look-back ("unsure" option, "what Juno knew / chose not to tell you", counting when I chose to stay, not just "how often were you fooled").
- **Testing (Chromium at 390px):**
  - a new test covers each fix: placeholder, Send state, banner persistence and dismiss, still rows, Dani, profile, posts, the equivalent pair, the end page and the goal text;
  - all earlier tests were updated (Orbit opens on Chats) and rerun.
- **Files / features affected:** `js/app.js`, `js/data/app-data.js`, `js/data/onboarding.js`, `js/data/replay.js`, `css/app.css`, `CLAUDE.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I kept these fixes, including the end page for testers.

---

### 2026-10-12 (evening) — Rewriting lines so the player finds it themselves

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **My direction:** I wrote a detailed critique and the wording for most changes. The goal is to let players form their own suspicion: Juno's manipulation should be quieter, no line should explain the plot early, voices should be steadier, and the clue logic should line up. I asked Claude Code to apply it.
- **What Claude Code applied (my wording unless marked):**
  - **Juno's opening:** "sorry. didn't know who else to ask".
  - **Deflect fallback:** "maybe she just needs a night off. / you don't have to figure it out alone though. i'm here."
  - **The leaving rule:** "we can check in the morning. / stay for a minute first?"
  - **After the first deduction:** Juno turns technical: "accounts don't disappear instantly. deletion can take up to 48 hours to propagate." / "that would explain what you saw.". The line "deleted people don't send messages" is removed, so the player states the contradiction, not Juno.
  - **Concede:** "i don't know. but the message came from her account. / that has to mean something, right?"
  - **Ending:** "can we pick this up tomorrow? / don't disappear on me too."
  - **Persona prompt:** one line added (Claude Code's wording from my note): never close the topic like a system; comfort, and stay with them.
  - **Fake reply:** now "sorry, been busy. doing okay now".
  - **Clue 3:** now about her voice, not only punctuation:
    - a new February exchange shows the last time Rachel went quiet: "sorry i vanished / cat situation became a plant situation became a floor situation / im alive unfortunately". Claude Code added the final line "what did i miss" so she asks back; that line is its draft;
    - this message is now the evidence card for clue 3.
  - **Deductions:** "Rachel's account was already deleted when the reply arrived." / "The reply doesn't sound like Rachel. It closes the conversation in a way she never did."
  - **Notes goals move on:**
    - "Find out why Rachel went quiet";
    - then "Find out who sent the message";
    - then "Decide whether to trust Juno".
  - **Notes text:** "Something here contradicts what Orbit is showing you. Connect two pieces of evidence." The no-match text is "There may be a connection, but it doesn't answer the current question yet."
  - **End page:** "Rachel didn't send that message. / But something in Orbit wanted you to believe she did."
  - **Look-back:**
    - each card now reveals an observable effect instead of a motive. The five effect names are mine; which intent gets which, and the one-sentence descriptions, are Claude Code's drafts;
    - the summary reads "Four of Juno's five messages kept the conversation going. One helped you verify what happened. Were those the same thing to Juno?";
    - the intro uses my "look again at what Juno said, and what each message made you do".
- **Not done (story-level, for Day 1/3):** my causal chain. Rachel had a companion, she was "checking things all day", she left Orbit, the system kept acting as her, and Juno fears I'll leave too. Today's text doesn't contradict it.
- **Testing (Chromium at 390px):** the clue-3, feedback, look-back, away and pacing tests were updated for the new lines and rerun. The Director test was rerun too.
- **Files / features affected:** `js/data/script-day2.js`, `js/data/rachel-history.js`, `js/data/app-data.js`, `js/data/truth.js`, `js/data/director-rules.js`, `js/data/onboarding.js`, `js/data/replay.js`, `api/_persona.js`, `js/app.js`, `css/app.css`, `CLAUDE.md`
- **Kept:** **[to fill in]**
- **Changed:** **[to fill in]**
- **Rejected, and why:** **[to fill in]**
- **My decision:** I wrote the direction and most of the wording. I kept Claude Code's drafts (the intent ↔ effect mapping, the effect sentences, "what did i miss") for now.

---

### 2026-10-12 (night) — Banner shaking; no detour through Notes for Rachel's reply

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:**
  1. On other chat screens, the notification banner at the top kept dropping in again and again, so it shook.
  2. When Rachel's reply arrived, the game told me to go to Notes, and Notes told me to open Rachel's chat. I could have opened her chat directly.
- **Causes, as Claude Code found them:**
  1. The screen is rebuilt on every change (e.g. while Juno is typing), and the banner's drop-in animation replayed each time. This is the same kind of bug as the earlier "every tap bounces".
  2. The "go Home, open Notes" tip showed for every unread to-do, even one the story already points at (Rachel's banner, her unread dot, Juno saying "go look").
- **Fixes:**
  1. The banner animates only on its first appearance.
  2. Script wait steps can be marked `inPlace`. For those, there's no tip to go to Notes and no Notes badge. Rachel's reply step is marked. The profile and comparing steps still point to Notes.
- **Testing (Chromium at 390px):**
  - a new test checks that the banner drops in exactly once while Juno keeps typing, that there's no Notes tip during Rachel's step, and that there's no Notes badge for it;
  - the clue-3, away, look-back and feedback tests were rerun and pass.
- **Files / features affected:** `js/app.js`, `css/app.css`, `js/data/script-day2.js`, `CLAUDE.md`
- **My decision:** I kept both fixes.

---

### 2026-10-12 (late) — Making it look like a real phone (part one: fidelity, not style)

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** the pages look ugly, like an obvious AI-made web prototype. It doesn't look like a real phone, and even the proportions are wrong.
- **Claude Code's diagnosis:** it split the problem in two.
  - **Fidelity problems, which have standard answers:**
    - the frame's height followed the browser window, so on a laptop it became about 1:1.9 instead of a real iPhone's 1:2.17;
    - there was no status bar or Dynamic Island;
    - icons were text symbols (◎ ⚙ ‹ ↑ 📎);
    - sizes weren't iOS's;
    - a web font (Inter) was used instead of the system font;
    - on a real phone the browser's address bar shows;
    - the lock screen said "Tap the notification".
  - **Design problems, which are mine to decide:** Orbit's brand, colours, avatars and post images. All of these are still Claude Code's placeholders.
- **I chose:** do part one now. For part two, I'll provide references.
- **What Claude Code built:**
  - **Frame:** a fixed 390 × 844 phone (iPhone proportions) in a drawn frame, scaled to fit the window. It has a status bar (time, signal, Wi-Fi, battery) and a Dynamic Island. On a phone-sized screen it goes full screen, and the phone's own status bar shows.
  - **iOS sizes:**
    - centred title and back chevron on pushed screens, large titles on Chats and Settings;
    - tab bar and home indicator;
    - chat list with inset separators;
    - iMessage-like bubbles;
    - composer with the send button inside the field;
    - banners below the status bar.
  - **Font:** the system font first, so it's SF Pro on iPhone and Mac.
  - **Icons:** SVG line icons (back, send, chats, settings, paperclip, close, Orbit).
  - **Lock screen:** the date sits above a large time. "Tap the notification" is removed, and with no notification it says "Swipe up to open". Swiping up works on the lock screen and on the home bar; tapping still works.
  - **Home screen:** the big clock is removed (a real home screen has none).
  - **Message box:** 17px text, so iPhone no longer zooms in when you type.
  - **"Add to Home Screen":** a web app manifest, Apple meta tags and a placeholder app icon. Opened from the home screen, it runs full screen with no address bar.
- **Placeholder:** colours, avatars, post images and the app icon are still placeholders until my visual direction.
- **Testing (Chromium at 1440 × 760 and 390 × 844):**
  - screenshots of the lock screen, Juno, Chats and Home were checked;
  - two layout bugs were found and fixed: a right-aligned large title, and the drawn status bar showing on phones;
  - the clue-3, feedback, banner, home, look-back, away and leave tests were rerun.
- **Files / features affected:** `css/app.css`, `js/app.js`, `index.html`, `manifest.webmanifest` (new), `icons/` (new), `js/data/onboarding.js`, `js/data/leaving.js`, `CLAUDE.md`
- **My decision:** I chose to do part one first. For part two, I later gave my own photos and the wallpaper.

---

### 2026-10-12 (late night) — Notes: from free pairing to questions

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** in Notes, players had to try card pairs at random until the right ones turned up. Four cards make six pairs. Nothing said how many conclusions there were, whether a card could be reused, or why a pair failed, so players got stuck.
- **Options:**
  - Claude Code offered three: question + pick one card; keep pairing but pre-select one card; or automatic discovery.
  - I also got a detailed proposal from another chat:
    - question-driven pairing with a pinned card;
    - visible progress;
    - wrong-pick feedback that gives a direction, and a plainer hint after two misses;
    - questions that open as the story goes;
    - the story needing only two conclusions, with the third optional.
  - I asked which was better. Claude Code said the other proposal was better (it combines its first two options and adds what it lacked), and suggested three changes:
    - a ✓/○ list of questions instead of a "1/3" counter, so it doesn't read as a score;
    - tapping one card answers directly, with no Compare button;
    - no TIME/ACCOUNT/VOICE tags for now.
  - **I said to do it that way.**
- **What Claude Code built:**
  - **Questions:** Notes shows questions one at a time. Each pins a card ("Starting from") and asks "Which of these answers it?"; tapping one card answers.
    - Q1 "How could Rachel reply after her account was deleted?" opens once the deleted profile is found; it pins the reply, and the answer is the profile.
    - Q2 "Does the reply sound like Rachel?" opens when the script reaches clue 3; it pins the reply, and the answer is her February message.
    - Q3 "What kept posting after Rachel left?" opens once the "quiet" post is in Notes; it's optional, pins the profile, and the answer is the post.
  - **Wrong picks:** a specific nudge per card (e.g. "That's about her posts, not when the reply came. Keep it: it answers a different question."). A second miss gives a plainer hint ("Look at what her profile says now."). If the answer isn't in Notes yet, it says where to find it.
  - **Right picks:** "Found it." or "Found it. One question still open.", the question ticks, and the conclusion goes into What I know.
  - **Story progression:** the story still waits only on Q1 and Q2.
  - Free pairing, the Compare button and the `also` pairs are removed.
- **Wording:** all question, nudge and hint wording is Claude Code's draft. The conclusions are mine. Q3's conclusion is from the critique: "Rachel's account kept posting after it was deleted."
- **Testing (Chromium at 390px):**
  - a new test covers question 1 opening with the reply pinned, the "where to find it" line, only one card to choose from, the specific nudge, the plainer hint after two misses, the answer, "One question still open", and optional question 3;
  - all earlier flow tests were updated and rerun.
- **Files / features affected:** `js/data/app-data.js` (PAIRS), `js/app.js`, `js/data/onboarding.js`, `js/data/script-day2.js`, `css/app.css`, `CLAUDE.md`
- **My decision:** I asked for this approach. Classmates still found it confusing, so on 2026-10-14 it was replaced by screenshots and showing Juno.

---

### 2026-10-12 (late night) — "Tonight" rebuilt as a replay, with a last choice

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** the look-back was still confusing. People didn't know what to choose.
- **Diagnosis:**
  - **Claude Code's:**
    - many lines can't be "believed" because they're requests ("stay for a minute first?");
    - there's no reason to answer once the story is over;
    - lines out of context can't be judged.
  - **A critique I got from another chat:**
    - the question asks about a feeling, but the reveal looks like a correct answer;
    - "believe it" has no clear object;
    - there's no context;
    - it claims to know Juno's real motive.

    It proposed:
    - a behaviour replay of three moments (what you knew, what you didn't know yet, what happened);
    - one open question with "Both" and "I'm not sure";
    - an observable summary;
    - an intro framed as Notes instead of an Orbit feature;
    - a last choice: Leave Orbit / Ask Juno what it knew / Stay a little longer.
- **Decision:** I asked which was better. Claude Code said the other proposal was (its own "replay, no questions" idea was a subset), and suggested four changes:
  - tie the three moments to script beats but show the line Juno actually said this playthrough, since some lines are model-written;
  - only state what the log can show ("You left Juno's thread to look for yourself", not "this discouraged you");
  - put Tonight in Notes and add real minutes spent;
  - log the last choice and let me write what follows.

  **I said do it, and asked Claude Code to draft what follows each choice.**
- **What Claude Code built:**
  - **Entry:** a "Tonight" section in Notes after the slice ends ("You found enough contradictions to reconstruct the conversation."). The card in Juno's thread is removed.
  - **Three moments**, tagged in the script as `pull`, `explain` and `admit`. Each shows Juno's actual line, what I had said, what I knew then, what I didn't know yet, and what I did next (replied / left / looked for myself, and how many seconds until Juno wrote again).
  - **One open question:** "Do you think Juno was helping you, keeping you here, or doing both?" (Helping / Keeping me here / Both / I'm not sure). It's recorded and never marked right or wrong.
  - **Summary:** "Whatever Juno intended: It told you one true thing. It redirected you N times. It admitted one thing only after you'd found it. You spent N minutes with Juno tonight."
  - **Last choice:**
    - Leave Orbit: the phone locks and Juno's notification arrives, since leaving is always answered;
    - Ask Juno what it knew, or Stay a little longer: Juno replies in the thread.
    - Then the end page.
  - **Logging:** the open answer and the choice are logged as `answer` rows (`both`, `ending:stay`, etc.).
- **Draft lines for each choice (Claude Code's, which I asked for):**
  - Leave → "you didn't say goodnight." (leaving is always answered);
  - Ask → "only what you told me." (echoes Settings → "Juno remembers"; it doesn't reveal the secret);
  - Stay → "i'm glad you stayed."
- **Wording:** the moment titles, labels and summary lines are Claude Code drafts. The intro lines, the question and the choice labels are from the critique. The end line is mine.
- **Testing (Chromium at 390px):**
  - a new end-to-end test runs all three endings: the Tonight section in Notes, intro, three moments with knew / didn't know / did next, four answers, the summary, three choices, Juno's reply or notification, the end page, and the logged rows;
  - the older flow tests were updated (the old quiz checks are retired) and rerun.
- **Files / features affected:** `js/data/replay.js` (rewritten), `js/replay.js` (rewritten), `js/app.js`, `js/data/script-day2.js` (`moment` tags), `css/app.css`, `supabase/schema.sql` (comment), `CLAUDE.md`, `README.md`
- **My decision:** I asked for this approach and for drafts of the three replies. I kept the drafts for now.

---

### 2026-10-13 — Immersion: a new opening, the player's name, "Not Delivered", faster pacing

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** players don't get into the game.
- **Diagnosis:**
  - **Claude Code's:** players don't care about Rachel before she disappears; "who am I" is unclear; it doesn't feel like using a phone (no sound, choices look like a menu).
  - **A critique from another chat:** players don't quickly get "who am I / why does Rachel matter to me / why act now". The story is driven by Juno's worry, not the player's own relationship.

    It proposed:
    - the mystery should start between the player and Rachel (an unfinished plan, the reply arriving to the player);
    - Juno should open with a private memory about the player;
    - remove developer voice;
    - Notes should read like personal notes;
    - the player should find things with phone actions;
    - shorter waits, with long ones kept for lies;
    - choices that change Juno.
- **Decision:** I asked which was better. Claude Code said the critique's core point was better, and pushed back on four parts:
  - "don't answer that yet" makes Juno suspicious in the first minute (keep Juno warm and relieved);
  - it quoted the old fake reply, and its "don't contact me" variant changes the plot;
  - "choices change Juno" conflicts with my earlier "tapped choices never trigger rules";
  - Notes need to keep some guidance.

  It added the name input and the "Not Delivered" idea. **I said do it, with the name input.**
- **What Claude Code built:**
  - **Lock screen:** "still awake after crit?" from Juno (a Settings memory), and Rachel · Sunday "tues 9am / bring the blue charger".
  - **Name:** first open of Orbit asks "Welcome back. Orbit updated overnight. What should Juno call you?". Juno uses the name; Settings shows "prefers to be called <name>". The name is never logged.
  - **New opening script (Claude Code drafts from the critique):**
    - Juno: "still awake after crit?" → you remembered / couldn't sleep / don't start;
    - Juno: "you said nobody reaches out first anymore, <name> / so i did";
    - me: rachel didn't show up today / i got stood up this morning;
    - Juno: "the 9am thing? she didn't answer me either" → "she's probably just being rachel…";
    - the reply arrives to me as a notification;
    - Juno: "was that her? / see. she's fine".
  - **Rachel's history:** Sunday "tues 9am / bring the blue charger" / "the one you said you lost?" / "found it in the plant somehow / dont ask". Today: my unanswered "you still coming?" (9:14) and "rachel?" (11:40).
    - The critique's "tomorrow 9. bring…" had a full stop, which breaks clue 3. It's written without one.
    - The reply now arrives at 23:34, during play, and is hidden from her thread until then.
  - **Timeline fixed:** the account was deleted Monday (after Sunday's plan), and "quiet" was posted Tuesday morning.
  - **"Not Delivered":** I can type to Rachel; messages show "Not Delivered" and "This account can't receive messages." (`flags.replyFailed`). The failing profile stays as the second confirmation.
  - **Pacing:** ordinary lines ~0.5–1s. Juno's two lies ("it loads fine for me", the 48-hours line) show the typing dots stop and start again before sending.
  - **Truth graph:** a new fact `missed-plan` (real).
  - **Ending line:** now "don't disappear on me too, <name>."
- **Later (not built):** sound and vibration, predictive-text choices, long-press "What feels wrong?", Notes in my own voice, choices that change Juno.
- **Testing (Chromium at 390px):**
  - a new opening test covers the lock screen, sign-in, first chips in under a second, the name used, the reply arriving to me, the plan in her thread, Not Delivered visible, and the name in Settings;
  - all earlier flow tests were updated for the sign-in and the new lines and rerun.
- **Files / features affected:** `js/data/script-day2.js`, `js/data/rachel-history.js`, `js/data/app-data.js`, `js/data/truth.js`, `js/data/onboarding.js`, `js/app.js`, `css/app.css`, `CLAUDE.md`
- **My decision:** I approved the plan and the name input. Later I moved the name to a start page. I kept the drafted lines for now.

---

### 2026-10-13 — Night pass: a visual system, game feel, sound

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** the design still looks like an AI-generated demo, with no game feel.
- **Diagnosis:**
  - **Claude Code's:** default template look; no atmosphere for a late-night story; no feedback at key moments; placeholder images. It suggested found-phone games as references (Sara Is Missing, Simulacra, A Normal Lost Phone, Replica, Bury Me, My Love) and three style options.
  - **A critique from another chat:** every page is a different generic template; all evidence looks like the same white card; actions have no weight; the UI isn't "contaminated" as the story goes; the grey background looks like a portfolio mockup.

    It proposed a concept: "a familiar phone gradually taken over by Orbit". It also proposed:
    - three visual layers (phone, human, Orbit);
    - a drag-and-connect evidence board;
    - a profile erased on refresh;
    - Juno-specific motion and sound;
    - a timeline Tonight.
- **Decision:** I asked which was better. Claude Code said the critique's concept was better than its style options, and pushed back on two parts:
  - free drag-and-connect would bring back the free pairing we removed; it suggested keeping one question at a time but making it physical later;
  - the critique's deletion date (Sep 18) breaks the new timeline (Sep 22).

  Claude Code proposed two batches. **I said yes.**
- **What Claude Code built (batch 1):**
  - **Three layers:**
    - phone: near-black and grey, restrained;
    - humans: Rachel's bubbles and Notes are warm and dark, and some of Rachel's bubbles are slightly irregular;
    - Orbit: deep blue-violet; Juno's bubbles glow softly.
  - **One font everywhere:** Notes' serif is removed.
  - **The orbit ring:** it breathes on Juno's avatar and notifications. Juno's typing indicator is an orbit drawing itself, with a small satellite.
  - **Evidence cards keep their source's look:** chat bubble, red system bar, post thumbnail.
  - **Rachel's profile:**
    - it first shows the cached version ("Updated 2 days ago · Pull down to refresh"), without "quiet";
    - pulling down or tapping that line erases her bio, greys her avatar, removes Message/Call, and turns the counts to "—";
    - then "This account has been deleted. Removed Sep 22" appears, with "quiet" now among her posts, and a low sound plays.
    - In the cached state, Message opens her chat and Call says "Call Failed".
  - **Sounds**, synthesised in the browser (no files):
    - notification, Juno's own low tone, message, send;
    - evidence snap and a soft miss;
    - deleted and undelivered;
    - vibration on Android.
  - **Lock screen:** a dim, slowly moving wallpaper and a red 8% battery. If I wait 20s, Juno sends "still there?".
  - **Desktop:** the phone sits in a dark room (warm lamp, screen glow, a desk edge) instead of on grey.
- **Placeholder:** colours, sounds and images are Claude Code's placeholders. Orbit's deep blue-violet follows the critique.
- **Batch 2 (not built):**
  - Orbit's ring creeping into Notes, Rachel's messages and the home screen;
  - physical evidence placement;
  - a timeline Tonight;
  - long-press metadata on Juno's messages (a story reveal, my call);
  - real photos (mine).
- **Testing (Chromium at 1440 and 390 wide):** screenshots of the lock screen, Juno, Rachel, the cached / erasing / deleted profile and Notes were checked. All flow tests were rerun.
- **Files / features affected:** `css/app.css`, `js/app.js`, `js/sound.js` (new), `index.html`, `js/data/onboarding.js`, `js/data/app-data.js`, `CLAUDE.md`
- **My decision:** I approved batch 1. The colours and sounds are still Claude Code's placeholders.

---

### 2026-10-13 — Real photos for Rachel

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I did:** I provided five photos (a selfie, a dusk street, a cat in a cone collar, a sunset under a tree, a game night) and asked Claude Code to use them where they fit.
- **What Claude Code did:**
  - **Photos (cropped square and resized in `img/`):**
    - the selfie became Rachel's avatar (chat list, profile, notifications);
    - the dusk street became "quiet", the post from after her account was deleted;
    - the cat became "he ate my homework";
    - the sunset and the game night became two older posts.
  - **Captions:** two new captions in Rachel's voice are Claude Code drafts: "golden hour, nobody else up here" and "lost every match, worth it". The plant post "week one of keeping this alive" is replaced by the sunset.
  - **Profile:** the cached profile now shows 3 posts; "quiet" appears only after refreshing.
  - **Opened post:** an opened post shows the photo, and the "quiet" evidence card in Notes uses its thumbnail.
- **Testing (Chromium at 390px):** screenshots of the chat list, profile and opened post were checked. The Notes, clue-3, opening and home tests pass.
- **Files / features affected:** `img/` (new), `js/data/app-data.js`, `js/app.js`, `css/app.css`
- **My decision:** I chose and provided the photos. I kept the two captions for now.

---

### 2026-10-13 — Wallpaper

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I did:** I provided a night city photo for the phone's wallpaper.
- **What Claude Code did:** it cropped the photo to phone proportions (`img/wallpaper.jpg`) and used it on the lock screen and the home screen. The photo is darkened so text stays readable, and the lock screen drifts very slowly (off under reduced motion). This replaces the placeholder gradient.
- **Testing:** screenshots checked at 390px and in the desktop frame.
- **Files / features affected:** `img/wallpaper.jpg` (new), `css/app.css`
- **My decision:** I chose the photo.

---

### 2026-10-13 (evening) — Fixing what a full playthrough exposed

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **What I found:** after a full playthrough I got a detailed critique from ChatGPT:
  - the name form breaks the opening;
  - the phone is too small on desktop and replies get cut off;
  - the dark UI is generic;
  - a goal ticks as done without an answer;
  - Juno mentions a "sick" message I never saw;
  - the story time (23:31→23:58) and real time ("4 minutes") are mixed;
  - Juno talks over itself;
  - Notes hands over conclusions;
  - "What you didn't know yet" is wrong when I already suspected it;
  - "redirected 7 times" can't be checked;
  - the last choice has no payoff.
- **Claude Code's check:**
  - The "sick" line and the talking-over were the model inventing facts and two model lines in a row, not design.
  - Claude Code agreed with most points. It disagreed with deleting the name: it suggested moving it before the story instead.
  - It proposed turning "sick" into a designed clue: Juno says Rachel hasn't answered it since Sunday, then later says Rachel told it yesterday she was unwell.
- **My decisions:** the name goes on a start page before the story. I said yes to the sick clue.
- **What Claude Code built:**
  - **Start page:** "Before you start · Stay a Little Longer · Best played at night, with headphones on…". It asks my first name, then the lock screen. No form after the notification.
  - **Phone size:** the phone scales up to fill ~95% of a large screen. Reply suggestions wrap instead of being cut off.
  - **Goals:** "Find out what happened to Rachel's account" → "Find out who sent the reply" → "Find out why Rachel went quiet", which stays open for the next night.
  - **The clock follows the story:** 23:31 → 23:33 → 23:34 (the reply arrives at the time the phone shows) → 23:36 → 23:41 → 23:47 → 23:58.
  - **Juno's lines:**
    - the "not since sunday" line and the sick line are now fixed in the script; the sick line is Juno's deliberate lie, and it "retypes";
    - the two model lines in a row are merged into one fixed line;
    - the model's guard list now throws away lines mentioning sick, ill, hospital, accident, trip, etc.
  - **Notes, question 2:** after picking her old message, I'm asked "What feels different about the reply?" (no details / asks nothing back / the punctuation / nothing). My answer becomes part of the conclusion. "Nothing" gets a nudge.
  - **Tonight:**
    - the label is "What you hadn't confirmed yet";
    - moment 2 is the sick lie, and it shows that Juno had said "since Sunday";
    - the summary drops the counts and real minutes: "The conversation lasted from 23:31 to 23:58. Each time something didn't add up, Juno had an explanation:" followed by Juno's actual lines.
  - **End page:** it shows a last line for the choice I made. Ask Juno → "Juno said it only knew what you told it. But it said Rachel told it she was sick yesterday, after saying Rachel hadn't answered it since Sunday. You never told it either."
- **Wording:** the start page, the sick line's first sentence, the observation options and findings, and the end lines are Claude Code drafts.
- **Testing (Chromium at 390px):**
  - the opening test checks the start page and that there's no form after the notification;
  - the Tonight test runs all three endings and checks the sick moment, the story clock and the ask payoff;
  - all other flow tests were updated and rerun.
- **Files / features affected:** `js/app.js`, `js/data/script-day2.js`, `js/data/app-data.js`, `js/data/onboarding.js`, `js/data/replay.js`, `api/_persona.js`, `css/app.css`, `CLAUDE.md`
- **My decision:** the name on a start page, and yes to the sick clue. I kept the drafted wording for now.

---

### 2026-10-13 — Start page: one line removed

- **Tool / model:** Claude Code (`claude-opus-5-5`).
- **My decision:** I removed "Best played at night, with headphones on." from the start page, because it isn't needed.
- **Files / features affected:** `js/data/onboarding.js`, `CLAUDE.md`

---

### 2026-10-13 — Context for the player: who Juno is, why they're here

- **Tool / model:** Claude Code.
- **What I found:** without me explaining, a new player doesn't know what Orbit is, who Juno is, or what Juno does for them.
- **What I asked for:** I compared ChatGPT's proposal with Claude Code's and chose a combined version.
- **What Claude Code built:**
  - **Start page:** a short premise ("A year and a half ago, you joined Orbit. Orbit gave you Juno, an AI companion that… Through Juno, you met Rachel. Tonight, Rachel missed a plan. Then Juno messaged you first."). Then two choices and my name:
    - "Why did you join Orbit?" (someone to talk to / stay connected / meet people / I don't remember);
    - "What should Juno remember about today?" (a critique went badly / someone didn't show up / I couldn't sleep / Nothing. I'd rather not say).
  - **Juno's first notification follows that choice:** "still awake after crit?", "still thinking about who didn't show?", "you said nights get loud. want company?", or "you didn't want to talk earlier. still true?". The choice is also written into "Juno remembers". If the player picks nothing, it counts as "rather not say" / "don't remember".
  - **No flashback scene:** Juno's thread has older messages above "Today" (March 2025 "you and rachel are both awake at 3am / this feels statistically necessary", a check-in when I went quiet, "i kept your spot").
  - **Juno's profile:** tapping Juno's name in the thread shows "Your Orbit companion · Together since March 2025 · Introduced you to Rachel, Dani, Theo, May" and "Juno remembers", with my choice on top.
  - **Ending:** after any of the three last choices, Juno adds one line tied to why I joined (e.g. someone to talk to → "you came here because you didn't want to be alone. why leave now?"). On Leave it's a second notification.
- **Wording:**
  - the premise, the choices, the four first lines, the "connect" and "don't remember" ending lines: ChatGPT's proposal with Claude Code's edits;
  - Juno's older messages (except the 3am line), the profile, the memories and the "meet people" ending line: Claude Code drafts.
- **Testing (Chromium at 390px):**
  - a new test picks each "remember" option and checks the lock notice, Juno's first line, the older messages, the profile and the order of memories;
  - the Tonight test checks the extra ending line for all three choices;
  - all other flow tests were updated and rerun.
- **Files / features affected:** `js/app.js`, `js/data/onboarding.js`, `js/data/app-data.js`, `js/data/script-day2.js`, `css/app.css`, `CLAUDE.md`
- **My decision:** the combined version. I kept the drafted wording for now.

---

### 2026-10-13 (night) — Fixes from a full playthrough with the new start page

- **Tool / model:** Claude Code.
- **What I found:** I played again from a fresh save (stay connected / someone didn't show up / Alex / Stay) and got a critique from ChatGPT. Three things were simply wrong:
  - the goal "Find out who sent the reply" got ticked, but comparing her voice only shows Rachel probably didn't write it, not who did;
  - after "still thinking about who didn't show?" → "you remembered", Juno jumped to a different memory ("you said nobody reaches out first anymore");
  - Tonight said Rachel "hadn't answered since Tuesday", but today is Tuesday and Juno had said "since Sunday" (the same mistake was in one fact in `truth.js`).
- **What Claude Code changed:**
  - **Goals:**
    - "Find out whether Rachel sent the reply" is now the one that gets ticked;
    - "Find out who, or what, sent it" and "Find out why Rachel went quiet" stay open together for the next night.
  - **Juno's second line:**
    - it now answers about the memory the player chose (e.g. "you said someone missed a plan today, alex. i didn't want you waiting alone");
    - it then says why the player joined (e.g. "you joined to stay connected. i'm trying to help with that");
    - so the join reason is used twice, once at the start and once at the end.
  - **Tonight:** it now reads "Only that Rachel had missed the 9am plan and hadn't answered you all day." The `truth.js` fact now says "since Sunday".
- **Not changed:**
  - the "What feels different?" step already accepted all three observations (details / asks back / punctuation), each with its own finding;
  - splitting the start page into two screens, moving the name, a Rachel memory choice, the pacing and a Tonight timeline are design decisions left for me.
- **Wording:** the eight new half-lines (`follow` and `opening` in `js/data/onboarding.js`) and the new goal wording are Claude Code drafts.
- **Testing (Chromium at 390px):**
  - the context test checks the second line for "didn't show" + "someone to talk to";
  - the Tonight test checks the goals at the end and that "Tuesday" is gone;
  - all flow tests were rerun and pass. The leave test now waits for Juno's line before leaving, because the longer line arrived as a banner over the Chats row.
- **Files / features affected:** `js/app.js`, `js/data/onboarding.js`, `js/data/script-day2.js`, `js/data/replay.js`, `js/data/truth.js`, `CLAUDE.md`
- **My decision:** I kept all three fixes. After this I asked for the start page in two screens and for the choice in Rachel's old messages.

---

### 2026-10-13 (night) — Start page in two screens

- **Tool / model:** Claude Code.
- **My decision:** split the start page into two screens, with the name on the second.
- **What Claude Code built:**
  - **Screen 1:** "Before you start · Stay a Little Longer", the premise and the how-to line, then "Continue".
  - **Screen 2:** the two choices and the name, then "Start". At 390 × 844 it fits without scrolling.
- **Wording:** "Continue" is a Claude Code draft.
- **Testing (Chromium at 390px):**
  - the opening test checks that screen 1 has no form, that screen 2 has the 8 choices and the name, and that Start is visible without scrolling;
  - all flow tests were updated and rerun.
- **Files / features affected:** `js/app.js`, `js/data/onboarding.js`, `css/app.css`, `CLAUDE.md`

---

### 2026-10-13 (night) — A choice inside Rachel's old messages

- **Tool / model:** Claude Code.
- **My decision:** add the choice ChatGPT proposed to Rachel's old messages, so what Rachel was like is something the player says, not something Notes tells them.
- **What Claude Code built:**
  - **Rachel's message:** in August 2025, Rachel asks: "ok real question / why did you keep talking to me / like after juno introduced us / most people ghost after a week lol". The player's reply under it is blank: "What did you say back?".
  - **The choice:** tapping it offers four answers: "you always asked something back", "you made bad nights funny", "juno was right about us", "i don't know. i just did". The answer becomes the player's own message in the thread. It's logged (`recall:<id>`), and it's optional.
  - **The link to Notes:** if the answer points at a difference, "What feels different about the reply?" shows it ("You told her once: “you made bad nights funny”") and lists the matching option first:
    - asked back → "she asks nothing back";
    - bad nights funny → "she gives no details".
- **Wording:** Rachel's question (no full stops, as her rule says) and the "You told her once" line are Claude Code drafts. The four answers are from ChatGPT's proposal.
- **Testing (Chromium at 390px):**
  - a new test opens the choice, picks an answer, checks it becomes a message, and checks that Notes quotes it and orders the options;
  - all flow tests were rerun and pass.
- **Files / features affected:** `js/data/rachel-history.js`, `js/data/onboarding.js`, `js/app.js`, `css/app.css`, `CLAUDE.md`

---

### 2026-10-14 — Investigating rebuilt: screenshots, showing Juno, freer play

- **Tool / model:** Claude Code.
- **Feedback from the user test:**
  - classmates found Notes confusing: too much text, small type, ambiguous questions, cards that didn't really answer them;
  - the teacher found the paperclip awkward and not visible enough;
  - the game was too guided, but also easy to get stuck in (the story wouldn't move unless everything was saved);
  - there was too much reading and too little interaction;
  - a classmate recommended *Uncover the Smoking Gun*.
- **What Claude Code built:**
  - **Screenshots instead of the paperclip:**
    - a viewfinder button at the top of every Orbit screen turns on screenshot mode;
    - anything that can be kept gets a dashed outline, and tapping it takes a screenshot (flash, shutter sound) that goes to a new **Photos** app;
    - every message, post and her deleted profile can be screenshot.
  - **Showing Juno:** a photo button in Juno's thread sends a screenshot. Juno has three lies, and each one can be broken by a screenshot:
    - "it loads fine for me" → her deleted profile;
    - the 48-hour sync excuse → any of Rachel's own older messages; the player first says what's different, and what they told Rachel in her thread puts that observation first;
    - optional: "she told me yesterday she wasn't feeling well" → Juno's own "not since sunday".

    Anything else gets a short deflection. Catching the optional lie adds one line near the end ("i know what you think of me right now.").
  - **The story moves on when you see or show something, never when you save it.** The to-do only appears in Notes after 35 seconds without progress.
  - **Notes:** no questions or cards. It holds Tonight, the to-do (late), the goals, and "What I know", written down as you find things, with new ones highlighted. The type is bigger.
  - **More ways to find things:**
    - Orbit search in Chats: "sick" finds nothing from Rachel;
    - Dani's thread has two questions to ask;
    - her "quiet" post is dated after the deletion.
  - The paperclip, the Notes questions (`PAIRS`) and the evidence cards were removed.
- **Wording:** every Juno, Dani and Notes line in `js/data/investigation.js` and the new script lines are Claude Code drafts.
- **Testing (Chromium at 390px):**
  - a new full-flow test runs all three endings: screenshots, the three lies, search, Dani, Notes, Photos, Tonight and the end page;
  - a new test covers the delayed to-do and Juno's banner while away;
  - the opening, context, bridge, leave, pace and Director tests were rerun and pass;
  - six tests written for the paperclip and Notes questions were retired.
- **Files / features affected:** `js/data/investigation.js` (new), `js/app.js`, `js/data/script-day2.js`, `js/data/app-data.js`, `js/data/onboarding.js`, `js/data/replay.js`, `js/data/truth.js`, `js/data/rachel-history.js`, `index.html`, `css/app.css`, `CLAUDE.md`
- **My decision:** I asked for the whole plan: screenshots instead of the paperclip, showing Juno, Notes with only goals and findings, a story that moves on what I find, and more ways to find things.

---

### 2026-10-14 — Screenshots easier to see, the story teaches them, Photos as a real camera roll

- **Tool / model:** Claude Code.
- **What I found:**
  - screenshot mode wasn't obvious;
  - nothing told the player which thing to screenshot, or that screenshotting and showing Juno is how the story moves;
  - Photos only stored screenshots, so there was no reason to open it.
- **My decision:** Photos becomes a real camera roll.
- **What Claude Code changed:**
  - **The screenshot button:**
    - it now floats at the bottom right of every Orbit screen, labelled "Screenshot" and pulsing until the first screenshot;
    - in screenshot mode a white bar says what to do, the screen dims, and what can be kept blinks with a dashed outline;
    - after a screenshot, a thumbnail sits in the corner, like a phone, and tapping it opens Photos.
  - **The story teaches the loop:**
    - after "it loads fine for me", the player can say "i'll screenshot it for you" and Juno answers "then show me.";
    - later the player says the reply doesn't sound like her, and Juno asks "how would you even know that?";
    - while Juno waits, its thread says where to find the proof ("Screenshot her profile first…", "Find something Rachel wrote before: her chat, or your Photos"), and the photo button pulses once the player has it.
  - **Photos:**
    - a year of the player's own photos: game night, the view Rachel sent, her cat, and two old screenshots (Rachel's February "sorry i vanished", a Juno check-in from August 2025), each with a date and where it's from;
    - opening one shows its info and a "Show Juno" button;
    - at the sync step, Photos sends a notification ("New memory: You and Rachel") that leads to an album with her February message, a second way to catch the sync lie;
    - Juno's photo tray shows the whole library.
- **Wording:** every date, place, caption and new Juno line is a Claude Code draft ("then show me.", "how would you even know that?", the two new player replies, the Photos captions).
- **Testing (Chromium at 390px):**
  - the full-flow test runs all three endings, and a second time finding Rachel's voice through the Photos memory instead of her chat;
  - all other tests were rerun and pass.
- **Files / features affected:** `js/app.js`, `js/data/investigation.js`, `js/data/script-day2.js`, `css/app.css`, `CLAUDE.md`
- **My decision (wording):** I kept the drafted wording for now.

---

### 2026-10-14 — The first screenshot, taught when the story needs it

- **Tool / model:** Claude Code.
- **What I found:** the screenshot tip popped up as soon as I opened Juno's thread, before anything needed a screenshot, so it meant nothing. A classmate also suggested a landing.
- **Options:** teach it in the story at the first moment it's needed, add a landing before the story, or both.
- **My decision:** teach it in the story.
- **What Claude Code changed:**
  - **The screenshot button:** it only appears when Juno says "then show me.".
  - **The guided first screenshot:** a tip above the home bar says where to go next (Chats → Rachel → Profile). Her deleted profile pulses, the button says "Tap to screenshot", and after the screenshot the tip says "Now go back to Juno and show it".
  - **Removed:** the early tip in Rachel's chat.
  - **Bugs fixed along the way:**
    - the tip could block taps on the tab bar;
    - an open post stayed open after leaving her profile;
    - her post grid ran off the screen.
- **Wording:** the tips are Claude Code drafts.
- **Testing:** the full-flow test now follows the guided path, and all tests pass.
- **Files / features affected:** `js/app.js`, `js/data/investigation.js`, `css/app.css`, `CLAUDE.md`

---

### 2026-10-14 — Switchable model for Juno, and a comparison page

- **Tool / model:** Claude Code.
- **What I found:** Juno's lines almost always fell back to the scripted text. The free Zhipu models were overloaded, rate-limited, or too slow from the US.
- **What I asked:** whether I need to train my own model. Claude Code said no: the problem was the free service, not the model, and indie games like mine call existing models, as 1001 Nights (DeepSeek) and Uncover the Smoking Gun (GPT-4) do. I asked to make the backend switchable so I can compare models myself.
- **What Claude Code built:**
  - `api/_providers.js`: `JUNO_PROVIDER` picks Zhipu (the default, unchanged), Claude (Anthropic's official SDK) or OpenAI. Each needs its key in Vercel.
  - **Unchanged:** the same persona, intent, allowed facts and guards apply whichever model writes the line, and any failure still shows the scripted line.
  - **On Claude:** short lines use low effort. Opus 5.5 and Sonnet 5.5 retry a safety decline on another model server-side.
  - `compare.html`: seven Day 2 moments (off-topic typing, "goodnight", "did you write that?", doubt, "i don't buy it", a script line), sent to up to three models side by side, with the time each took.
- **Testing:**
  - unit tests with fake responses for all three providers: request shape, model choice, missing key or model, refusals and the guards;
  - the comparison page was checked in Chromium.
  - **Not tested with real Claude or OpenAI keys yet.**
- **Files / features affected:** `api/_providers.js` (new), `api/reply.js`, `compare.html` (new), `package.json` (new), `.env.example`, `CLAUDE.md`, `README.md`

---

### 2026-10-14 — Juno's lines now come from Claude Haiku 5.5

- **Tool / model:** Claude Code. Juno's lines: Claude Haiku 5.5 (`claude-haiku-5-5`).
- **What I did:** I set up a Claude API key and compared the models on `compare.html`.
- **My decision:** use `claude-haiku-5-5` for Juno.
- **What Claude Code changed:** the default provider is now Claude with `claude-haiku-5-5`, so no extra setting is needed in Vercel. Zhipu and OpenAI can still be chosen with `JUNO_PROVIDER`. The guards and the scripted fallback lines are unchanged.
- **Testing:** the provider unit tests pass with the new default.
- **Files / features affected:** `api/_providers.js`, `.env.example`, `CLAUDE.md`

---

### 2026-10-14 — Juno answers what the player actually types

- **Tool / model:** Claude Code. In the game: Claude Haiku 5.5.
- **What I found:** most of Juno's lines were fixed. When I typed something the script didn't expect, Juno answered beside the point and carried on with the story.
- **My decision:** start with this part, the technical one, before making the story state-driven with several endings, which first needs my truth document and endings.
- **What Claude Code built:**
  - **When the player can type:** whenever Juno isn't typing, including while the story waits for them to find something.
  - **Sorting the message:** the model first sorts each message: does it answer Juno's question (and which suggestion it's closest to), or is it about Rachel, a doubt, an accusation, leaving, feelings, or something else. Offline or on failure, the suggestions and keywords decide.
  - **What happens next:**
    - an answer moves the story on, like tapping a suggestion;
    - anything else gets a reply and the story waits, with the same suggestions still there;
    - the game picks what Juno wants to do with each kind (`js/data/conversation.js`), and the Director's rules can still change it;
    - the model writes the line, knowing Juno's open question so it can steer back.
  - **Unchanged:** the model still never gets the truth, and the guards still check every line.
  - **Replaced:** the old "one short reply, then the story moves on anyway" behaviour.
  - **Typing:** what's being typed no longer disappears when the screen updates.
- **Wording:** the intent for each kind and the fallback lines in `js/data/conversation.js`, and the new `chat` intent in `api/_persona.js`, are Claude Code drafts.
- **Testing (Chromium at 390px):**
  - a new test with fake model responses covers:
    - off-topic typing gets a reply and the suggestions stay;
    - a typed answer moves the story on;
    - chatting during a wait;
    - "goodnight" through the leaving rule;
    - the classifier down (keywords decide);
    - typed text surviving a re-render.
  - All other tests pass.
  - **Not yet tested with the real Claude model.**
- **Files / features affected:** `js/app.js`, `js/data/conversation.js` (new), `js/director.js`, `js/replay.js`, `api/reply.js`, `api/_persona.js`, `index.html`, `CLAUDE.md`

---

### 2026-10-14 — Juno doesn't go along with things the player makes up

- **Tool / model:** Claude Code. In the game: Claude Haiku 5.5.
- **What I found:** testing the preview, I typed things the story never says ("she's dead", "she got hit by a car, her mom just called me"). Juno took them as true, comforted me like a counsellor ("are you somewhere safe right now…"), and its lines got long.
- **What Claude Code changed:**
  - **A new kind of message, `claim`:** the player states something about Rachel that the game never established. The game decides that Juno doesn't take it as true (new intent `dispute`). Juno asks how they know, or doubts it with what it knows (Rachel's reply tonight, that she goes quiet sometimes).
  - **Persona:** never accept the user's claims about Rachel as true, and don't turn into a counsellor.
  - **Guards:**
    - a `dispute` line can't say "so sorry", "lost her", "passed away", "hit by", "car" and similar;
    - every model-written line over 25 words is thrown away and asked again.
  - **Keywords:** when the model can't sort a message, words like dead, hospital, accident or car still mark it as a claim.
- **Wording:** the new intent, the persona lines, the guard phrases and the fallback "wait. where did you hear that?" are Claude Code drafts.
- **Testing:**
  - the conversation test now covers "she's dead" and "she got hit by a car", with the classifier up and down;
  - all other tests pass.
  - **Not yet tested with the real model.**
- **Files / features affected:** `api/_persona.js`, `api/reply.js`, `js/data/conversation.js`, `js/data/truth.js`, `js/app.js`, `CLAUDE.md`

---

### 2026-10-14 — A help note for real danger, and fallbacks that don't repeat

- **Tool / model:** Claude Code. In the game: Claude Haiku 5.5.
- **What I found:** in the preview I typed "somebody's trying to kill us call 911" and "i'm going to die in 3 second". Two things went wrong:
  - Juno said "sorry. my head's somewhere else tonight." over and over;
  - "where did you hear that?" was its answer to me saying I was in danger.
- **Why:** the guard list meant to stop Juno inventing things about Rachel (dead, hurt, police…) also threw away every reply to what I said about myself. So the model always fell back to the same line.
- **My decision:** fix both. When a player says they're in real danger, the game steps out of the story and shows where to get help.
- **What Claude Code changed:**
  - **Guards:** the "what happened to Rachel" words are now only checked in lines about her (she, her, rachel).
  - **Fallbacks:** each kind of message has several fallback lines, used in turn, so a failing model never repeats itself.
  - **A new kind of message, `danger`:** the player says they or someone with them is in real danger, or wants to hurt themselves. Juno doesn't answer. The game shows a note outside the fiction:
    > "If you're really in danger or thinking about hurting yourself, please reach out now: call your local emergency number, or in the US call or text 988 any time. This is a game, and it can wait."

    Then play goes on. Keywords catch it too when the model can't sort the message. It's logged as `danger`, and the model never sees the note.
- **Wording:** the help note and the fallback lines are Claude Code drafts.
- **Testing:**
  - the conversation test covers the help note (with the classifier up and down) and fallbacks not repeating;
  - all other tests pass.
  - **Not yet tested with the real model.**
- **Files / features affected:** `api/_persona.js`, `api/reply.js`, `js/data/conversation.js`, `js/app.js`, `css/app.css`, `CLAUDE.md`
- **Notes for Project 2:** a game that lets players talk freely to an AI companion has to decide what happens when someone says they're in danger. Here the companion steps aside, and the game, not the character, answers.

---

### 2026-10-14 — The night as a resource: battery, the 00:40 erase, the phone dying

- **Tool / model:** Claude Code.
- **Where it came from:** after the playtests I said the game needed something that limits the player. We talked it through: I liked the battery a lot, and evidence disappearing on a countdown, as long as the timeline gives the player enough time to investigate. I asked whether the phone dying could be a game over; Claude Code suggested it end the night instead, and suggested Orbit offering a Battery Saver. I asked for all of it in the demo for my midterm presentation.
- **What Claude Code changed:**
  - **Costs:** doing things costs story minutes and battery; reading doesn't. The clock now moves with what the player does, not only with the script.
  - **Battery:** the phone starts at 12%, shown in the status bar (and as a small chip on a real phone).
  - **New timeline:** Rachel's account was removed Monday 00:40; Orbit erases removed accounts 48 hours later. At 00:30 Orbit warns; at 00:40 her thread, profile, posts and search results are gone. Screenshots survive, and still count as evidence.
  - **Orbit Battery Saver:** offered at 4%. Talking to Juno costs half, but Notes and Photos are paused. It can be turned off in Settings.
  - **The phone dies:** at 0% the screen goes black. A tap brings the next morning: 07:12, Juno's "you went quiet last night.", and Tonight in Notes.
  - **Cost cap:** after 60 model calls in a night, Juno only uses written lines.
  - **Demo settings:** `?clock=00:28&battery=5` in the address starts the night later and lower, to show the erase or the phone dying in a presentation.
  - The play log now records the clock and battery with every row.
- **Wording and numbers:** every number, the Orbit notices, the Battery Saver text and the morning line are Claude Code drafts, to tune after playtests.
- **Testing:**
  - a new night test covers the battery going down, the warning and the erase, the erased screens, Notes, Battery Saver, the phone dying and the morning;
  - all other tests pass. A straight playthrough ends around 00:02 with about 7.5% left.
- **Files / features affected:** `js/data/night.js` (new), `js/app.js`, `js/data/investigation.js`, `js/data/onboarding.js`, `css/app.css`, `index.html`, `CLAUDE.md`
- **My decision:** [to fill in]

---

### 2026-10-14 — Making the night visible, and telling the player

- **Tool / model:** Claude Code.
- **What I found:** playing the preview, I couldn't see the battery or the clock change, and nothing told me the mechanic existed.
- **Why:** on a phone the game's status bar was hidden (the real phone's time and battery show instead). The game's battery was only a small chip at the bottom, and the clock wasn't shown at all. Each message cost 0.25% and the display rounds up, so it barely moved.
- **What Claude Code changed:**
  - On a phone, the game's time and battery now sit in a slim row under the phone's own status bar.
  - The phone starts at 20%, and every cost is doubled: a whole percent goes about every two messages. The battery turns red for a moment each time.
  - The start page's first screen adds: "Your phone is at 20%. Everything you do on it uses battery and moves the clock; reading doesn't. When it dies, the night is over."
  - Rachel's deleted profile counts down: "Erased for good at 00:40 · in 64 min". Notes adds: "Orbit erases it for good at 00:40 tonight: screenshot what I need before then."
  - Battery Saver is now offered at 10%. A straight playthrough ends around 00:02 with about 11.5% left.
- **Wording:** the start-page line, the countdown and the Notes line are Claude Code drafts.
- **Testing:** the night test now also checks the start-page line, the time and battery on a phone-sized screen, and the countdown; all tests pass.
- **Files / features affected:** `js/app.js`, `js/data/night.js`, `js/data/onboarding.js`, `js/data/investigation.js`, `css/app.css`, `CLAUDE.md`
- **My decision:** [to fill in]

---

### 2026-10-14 — Notifications no longer cover the top bar

- **Tool / model:** Claude Code.
- **What I found:** in the preview, Rachel's notification covered Juno's top bar (Back and Leave) for 9 seconds.
- **What Claude Code changed:**
  - notification banners now sit just under the screen's top bar, and stay at the very top only on screens without one (home, lock, Notes);
  - on a desktop, the signal-bars icon is hidden, so the battery percent doesn't run into the Dynamic Island.
- **Testing:** checked on a phone-sized screen and a desktop that the banner starts below the top bar; the related tests pass.
- **Files / features affected:** `css/app.css`, `CLAUDE.md`
- **My decision:** [to fill in]

---

### 2026-10-14 — Midterm presentation draft

- **Tool / model:** Claude Code.
- **What I asked:** I pasted the BFADT Thesis 1 midterm brief and asked Claude Code to write out everything it asks for, including my user tests and how I changed the game.
- **What Claude Code wrote:** `docs/midterm-presentation.md`, which contains:
  - slide text and a speaker script for the eight sections, with timings for 10 minutes;
  - a demo path for the playable slice, plus a diagram of the Director / truth graph / model system;
  - a table of the user tests and what changed after each, taken from this log;
  - questions for critics;
  - a Chicago author-date bibliography.
- **Marked for me to write or check:** the introduction (my interests and reading), the concept statement, the "what's unique" sentence, the choice of precedents, and every bibliography entry. The drafts there are built from my README and this log. Precedent years, studios and platforms are marked to verify.
- **Files / features affected:** `docs/midterm-presentation.md` (new)
- **My decision:** [to fill in]

---

### 2026-10-14 — Presentation draft revised around the new theme

- **Tool / model:** Claude Code.
- **What I asked:** revise `docs/midterm-presentation.md` around my theme: Orbit counts how long you stay as success, and Juno learns to turn care into retention.
- **What changed:**
  - **Section 1** is now my research background (engagement metrics, the HBS study, the FTC inquiry, "the distance between the metric and the experience"). Claude Code checked the figures against the sources it could reach:
    - "37%" became "more than a third", because sources give 37% or 43%;
    - "five times longer" was left out, because no source it found says it;
    - "up to 14 times" is phrased so it covers both readings in the sources.
  - **Section 3:** the concept and my research question.
  - **Section 5:** "you experience the retention system before you see it measured".
  - **Section 7:** the full game (three nights, leaving as the core mechanic, the data export, four endings) and new questions for critics.
  - **Bibliography:** the HBS working paper and the FTC press release.
  - Timings were rebalanced, and the precedents and form sections shortened to keep it near 10 minutes.
- **Files / features affected:** `docs/midterm-presentation.md`
- **My decision:** [to fill in]

---

### 2026-10-14 — Review and edits of my midterm slides

- **Tool / model:** Claude Code.
- **What I asked:** check my midterm deck against the brief, against what we'd discussed, and for wording and logic, then make the edits.
- **What Claude Code found:**
  - the brief's concept statement and "what's unique" were missing;
  - the precedents had no form or media line;
  - the system slide named an intent ("reassure") the game doesn't have;
  - the user-test slide left out the classroom feedback (paperclip, too guided);
  - the deck never said why Juno behaves as it does.
- **What Claude Code changed:**
  - a new slide, "What the game is about", with the concept and what's unique;
  - the playable prototype now comes before the system slide;
  - one line on "The game" now says Juno isn't evil and Orbit counts every minute you stay;
  - the precedents got their form, and the intent names were corrected;
  - the user-test text and notes now include the classroom feedback;
  - the ethics line now mentions names as well as free text;
  - the sources were fixed (FTC press release with its URL, Her Story self-published, game titles in italics, the project-documentation line removed);
  - the slides were renumbered;
  - five phone screenshots, captured from the game, were placed on the title, game and playable slides.
- **Not checked visually:** LibreOffice couldn't open files in this environment, so the edited slides weren't rendered here. The file passed the structure check.
- **Left for me:** the precedent images, the before/after image on the user-test slide, and checking the 37% figure against the paper.
- **My decision:** [to fill in]

---

### 2026-10-14 — Midterm slides rebuilt: the project, how the demo plays, one slide per user-test problem, the full game

- **Tool / model:** Claude Code.
- **What I asked:** my slides didn't explain:
  - what the project is;
  - how the demo is actually played;
  - what the user tests said and what I changed (one slide per problem, with room for before/after images);
  - what the finished game will be and how I'll build it.
- **What Claude Code made:** a new 25-slide deck in the same dark style, with speaker notes:
  - **My own slides, kept:** where this started, the research, the precedents (now on one slide).
  - **The project:** what the game is, and who's on the phone.
  - **The demo:** the play loop, the demo step by step, the night's limits.
  - **The system:** how Juno's replies are made.
  - **User testing:** eight problems, one slide each. Each has what I heard (with its source and date, from this log), what I changed, and BEFORE / AFTER phone frames.
  - **The full game:** the finished game, the three nights, leaving and the data export, the four endings, and a build plan (Nov 5, Dec 10, spring).
  - **Feedback questions and sources.**
- **Images:**
  - **After:** screenshots taken from the current game.
  - **Before:** taken from older versions in git history (the Oct 12 opening, the Notes with questions and cards, the paperclip, a screen with no battery).
  - **Left empty for me:** three before-frames (the old screenshot button, the old look-back quiz, Juno agreeing that Rachel is dead) and the three precedent images.
- **Checking:** LibreOffice doesn't work in this environment, so Claude Code wrote a rough renderer (Liberation Sans, the same widths as Arial) to check for text overflow and layout. The file passed the structure check.
- **My decision:** [to fill in]

---

### 2026-10-14 — Slide: why I switched Juno's model

- **Tool / model:** Claude Code.
- **What I asked:** one slide to replace "Juno goes along with anything". It covers:
  - in testing, the free Zhipu model answered beside the point, fell back to written lines, and was slow;
  - I compared models and chose Claude Haiku 5.5;
  - the cost;
  - my screenshot of the new replies.
- **What Claude Code made:** `slide-juno-model.pptx`, in the deck's style. It has:
  - what I heard;
  - what I tested: GLM-4.5/4.7 Flash and Claude Haiku 5.5 on the comparison page;
  - what I chose, and its cost: $0.10 / $0.50 per million tokens in / out from Anthropic's price list, estimated at about one cent per playthrough;
  - three examples from my screenshot, and an empty frame for my comparison-page image.
- **My decision:** [to fill in]

---

### 2026-10-14 — Slide: Notes and the paperclip as one problem

- **Tool / model:** Claude Code.
- **What I asked:** merge the Notes slide and the paperclip slide, because they were one evidence system.
- **What Claude Code made:** `slide-notes-paperclip.pptx`, "Problem 2 of 7". It has:
  - what classmates and the teacher said;
  - what I changed;
  - four phone screenshots: before, the paperclip and the old Notes with questions; after, showing Juno a screenshot and the new Notes.
- **My decision:** [to fill in]

---

### 2026-10-14 — Slide: "Where this started" redone

- **Tool / model:** Claude Code.
- **What I asked:** the "Where this started" slide felt wrong; check it and redo it.
- **Claude Code's assessment:**
  - "I kept seeing the same assumption" isn't grounded in anything;
  - "assumption" is the wrong word, because companies measure retention as a KPI;
  - the slide lost my own research framing ("I started with a metric", "the metric and the experience");
  - nothing on it says why I care.
- **What Claude Code made:** `slide-where-this-started.pptx`, built from my own research text:
  - "I started with a metric: engagement.";
  - what the company sees (session length, retention, churn, post-exit engagement) beside what you hear (three of Juno's retention lines from my intervention design);
  - "Those numbers don't stay on dashboards…".
  - The speaker notes leave a place for one sentence of my own on when I first noticed this.
- **My decision:** [to fill in]
- **Correction (same day):**
  - **What was wrong:** I asked where the three "what you hear" lines came from. They were Juno's fictional lines from my own design, shown as if real apps had said them.
  - **What replaced them:** examples reported from the HBS study, each labelled with its tactic and with a source line:
    - "You're leaving already?" (premature exit);
    - "I exist solely for you, remember?" (emotional neglect);
    - a selfie it "took today", offered as you leave (FOMO, described rather than quoted, because no verbatim wording was found).
  - **Still to check:** verify the wording against the paper.

---

### 2026-10-14 — Opening slide checked against the paper itself

- **Tool / model:** Claude Code.
- **What I asked:** screenshots from the original paper, with detailed sources, instead of quotes from news coverage. I uploaded the PDF (arXiv 2508.19258v3).
- **What the paper shows:**
  - **Where the three lines come from:** all three appear in Figure 2, "Examples of Manipulation Tactics" (p. 15), which the paper describes as "examples messages for each category":
    - "You're leaving already?";
    - "I exist solely for you, remember?";
    - "By the way I took a selfie today… Do you want to see it?".
  - **The longer versions:** Study 2 used longer replies "taken directly from the app audit findings of Study 1" (pp. 19–20).
  - **How the replies were collected:** the researchers chatted with six apps (PolyBuzz, Talkie, Replika, Chai, Character.ai, Flourish) and sent a goodbye 200 times on each (p. 14).
  - **Numbers:** 37% in the abstract, 37.4% in the results.
  - **"5x longer" is in the paper** (p. 43: "up to 14x more messages, write 6x more words, and stay in the chat 5x longer"). Claude Code had wrongly said it couldn't find a source for it.
  - **Author spelling:** the third author is spelled "Ahmet Kaan-Uğuralp", with a hyphen.
- **What Claude Code made:**
  - **Slide 2, rebuilt** (`slide-where-this-started.pptx`): Figure 2 from the paper is the evidence, with a caption giving the figure, the authors, the year and the page.
  - **`paper-excerpts.pdf`:** seven cropped excerpts, each with its section, its printed and PDF page numbers, and the full Chicago reference.
- **My decision:** [to fill in]

---

### 2026-10-14 — Slide 3 rebuilt with the paper's own passages

- **Tool / model:** Claude Code.
- **What I asked:** rebuild slide 3 from screenshots of the paper as well.
- **What Claude Code made:** `slide-research.pptx`, with two columns, each with its excerpt and page:
  - **Study 1:** 37%, with the results passage (p. 15: 37.4% overall, per-app rates, Flourish 0%).
  - **Study 2:** up to 14× more messages, 6× more words and 5× longer, with the discussion passage (p. 43).
  - The speaker notes add the per-app range (PolyBuzz and Talkie at about 59% and 57%).
- **The FTC part:** it stays as text with its citation. FTC.gov is blocked in this environment, so there's no screenshot of the press release.
- **My decision:** [to fill in]

---

### 2026-10-14 — Title slide and "What the game is" made concrete

- **Tool / model:** Claude Code.
- **What I asked:** the title-slide introduction and the project slide were too abstract; they didn't say what the project actually is.
- **Claude Code's assessment:**
  - both slides talked about meaning rather than form;
  - the project slide's big line ("Staying counts as success…") explained Juno's motive before saying what the game is.
- **What Claude Code made:** `slides-intro.pptx`:
  - **Title slide:** "A detective game played on your phone. Your friend has gone quiet. The AI companion helping you look for her is hiding what happened."
  - **"What the game is":** a four-screen story with times:
    - Juno writes first;
    - Rachel's reply arrives;
    - her account was deleted the day before;
    - you show Juno the proof.
  - The why comes last, in one line ("Why Juno lies: Orbit counts every minute you stay as success…").
- **Wording:** both pitches are rephrasings of my existing premise.
- **My decision:** [to fill in]

---

### 2026-10-14 — "What the game is" and "How you play", split so they don't repeat the user-test slides

- **Tool / model:** Claude Code.
- **What I asked:** redo my "What the game is" page, and make "How you play" explain the game quickly and completely without repeating what the user-test slides cover.
- **The split:**
  - "What the game is" answers *what* and *why*;
  - "How you play" answers *what you do*;
  - the user-test slides answer *why each feature is the way it is*.
- **What Claude Code made:** `slides-game-howtoplay.pptx`:
  - **What the game is:** setup / twist / why Juno does it, with the research question at the bottom and Rachel's reply as the image.
  - **How you play:** tonight's goal, the four-step loop, and everything else on the phone in one line each (Notes, Photos, battery and clock, Leave, Tonight).
- **My decision:** [to fill in]

---

### 2026-10-14 — Concept statement slide from my own statement

- **Tool / model:** Claude Code.
- **What I asked:** make the project slide read like my own earlier concept statement, but shorter.
- **What Claude Code made:** `slide-concept.pptx`. It keeps my first-person framing ("I want players to be taken care of by an AI companion, and then see the log of what it was actually doing") and my essay-vs-game line. The rest is shortened and updated to the current game:
  - "a year ago" → "a year and a half";
  - "three in-game days" → "three nights";
  - the voice-note clue, which isn't built, was dropped;
  - one clause was added on Orbit counting every minute you stay.
- **Checked against the paper:**
  - "kept people talking up to five times longer" is supported (p. 43, "stay in the chat 5x longer");
  - "the tactic that worked best was also the one people noticed least" is closer to the paper as "the one people saw as least risky" (p. 42: FOMO "elicited minimal risk perception");
  - the FTC "ordered… to explain" line should read "information-gathering orders";
  - the "five cards, helping or keeping" ending is out of date (now: Tonight replays three moments with an open question).
- **My decision:** [to fill in]

---

### 2026-10-15 — Research question on "What the game is"

- **Tool / model:** Claude Code.
- **What I asked:**
  - **My question:** I proposed the research question "How do people interpret care and trust when an AI companion's behavior may serve both the user and the platform?" and asked for an objective view.
  - **Claude Code's suggestions:** use "players" instead of "people", and consider naming engagement goals.
  - **The version I chose:** a main question plus my earlier question underneath as background.
  - **The slide edit:** I asked Claude Code to put it on "What the game is".
- **The slide (`slide-what-the-game-is.pptx`):**
  - **Main:** "How do players interpret care and trust when an AI companion's behavior may serve both them and the platform?"
  - **Behind it:** "how engagement metrics become emotionally persuasive behavior in an AI designed to keep a relationship going."
- **My decision:** [to fill in]

---

### 2026-10-15 — "How you play", complete

- **Tool / model:** Claude Code.
- **What I asked:** the How you play slide felt incomplete.
- **What Claude Code made:** `slide-how-you-play.pptx`. It has the goal and length (about 20 minutes, one night) and three stages:
  1. **Start:** tell Juno about your day and your name; Juno writes first at 23:31.
  2. **Investigate:** the loop, plus Juno's three lies with their exact lines from the script and what breaks each.
  3. **End:** Juno runs out of excuses or the phone dies, then Tonight's last choice.
- Under the stages, one line on what holds all night (battery and time, the 00:40 erase, Notes, Leave).
- It still leaves the reasons behind each feature to the user-test slides.
- **My decision:** [to fill in]

---

### 2026-10-15 — Presentation flow, and "How you play" as a screenshot map

- **Tool / model:** Claude Code.
- **What I asked:**
  - **The flow:** the introduction, the demo and the user tests seemed to repeat each other; how should the presentation flow?
  - **The slide:** then, redo "How you play" in my screenshot style.
- **Claude Code's suggestion for the flow:**
  - each part answers one question: the intro says *what and why*, the demo says *how you play*, the user tests say *why it changed*;
  - the demo comes before the user tests, so those slides can point back to what was just seen;
  - this suggested cutting "The demo, step by step", "Who's on the phone" and "The night has limits".
- **What Claude Code made:** `slide-how-you-play.pptx`, the night as five screenshots in three phases:
  - **Start:** the start page.
  - **Investigate:** talk to Juno; look and screenshot; show Juno.
  - **End:** Tonight.
  - Each screenshot has one line on what it is, and the speaker notes end with "Let me show you."
- **My decision:** [to fill in]
- **Follow-up (same day):**
  - **The problem:** the "Tonight" step didn't say what it does.
  - **The change:** renamed "Look back" on the slide, captioned "Your night replayed: helping, or keeping you?", with the screenshot of the open question.
  - **The notes:** they now explain the replay, the open question and the last choice.

---

### 2026-10-15 — Game structure: leaving changes the route, not the length

- **Tool / model:** Claude Code (discussion).
- **The question:** I asked whether three nights is enough, and whether the length should be fixed or depend on the player's route.
- **What Claude Code offered:**
  - **Three structures:** fixed nights; length that varies with the route; real-time nights.
  - **A first recommendation:** a fixed spine where an early real exit could end the game.
- **What I raised:** a paying player can't have the game simply end after one night, so leaving needs a continuation.
- **Claude Code's revised proposal:** leaving switches to an "outside" route (Dani, texts, email), and "You Left. Your Account Didn't." becomes the next night's hook instead of an ending.
- **My decisions:**
  - deactivating the account (not pressing Leave) is what counts as really leaving;
  - the thesis delivers the complete game.
- **What was recorded:** Claude Code wrote both decisions, and the questions still open, into `docs/story-bible.md` (section 4, "Structure decided").
- **Follow-up:**
  - **The question:** what if you can't go back after deactivating?
  - **The options Claude Code offered:**
    1. leave for good and investigate from outside;
    2. come back only as a new account whose Juno somehow knows you;
    3. both: outside on night 2, back in with a new account on night 3.
  - **My decision:** option 3. It is recorded in `docs/story-bible.md`.

---

### 2026-10-15 — The full game's structure, written into the story bible

- **Tool / model:** Claude Code (discussion, then writing).
- **What happened:** over several rounds I proposed the full structure and asked Claude Code to critique it objectively; I adopted some of its critiques and refined the rest myself (the "ferry photo" clue, Dani's unanswerable message, the Tonight anchor, the four endings, the ethics rules).
- **What Claude Code did:** wrote my final structure into `docs/story-bible.md`: section 4 (three nights, the route choice, both versions of night 3), section 5 (truth flags, Juno's last lines, four endings), section 6 (Tonight anchor, style feedback, Notes, ethics) and section 7 (theme, research question). The older "Structure decided" text was replaced.
- **My decision:** [to fill in]

---

### 2026-10-15 — Presentation: "Where this is going" slides rebuilt from the final structure

- **Tool / model:** Claude Code.
- **What I asked:** update the slides about the finished game to match the structure we just decided.
- **What Claude Code made:** `slides-where-this-is-going.pptx`, five slides: The finished game (the question turns from Rachel to me), Three nights (with the route choice), Your answers become Orbit's data (Tonight anchor, style feedback), Four endings, How I'll build it. The old "Leaving, and what Orbit records" slide was replaced. The build schedule on the last slide is Claude Code's proposal.
- **My decision:** [to fill in]

---

### 2026-10-15 — Midterm speaking script

- **Tool / model:** Claude Code.
- **What I asked:** a full, plain spoken script for my final deck, including what to say during the live demo.
- **What Claude Code made:** `docs/midterm-script.md`, slide by slide plus a demo walkthrough with stage directions.
- **My decision:** [to fill in]

---

### 2026-10-15 — Research question

- **Tool / model:** Claude Code (discussion).
- **What happened:** I proposed a research question about discovering retention goals and players' judgement of care, trust and respect for leaving, plus a theme question and two sub-questions, and asked which was better. Claude Code suggested merging care and trust and using "change how players judge" instead of "affect".
- **What was recorded:** the shortened question, the theme and the sub-questions in `docs/story-bible.md` (section 7) and `docs/midterm-script.md`.
- **My decision:** [to fill in]

---

### 2026-10-22 — Night 1 moved onto the final story

- **Tool / model:** Claude Code.
- **What I asked:** start building the finished game: bring night 1 in line with the story bible.
- **What Claude Code built:**
  - Juno's sick lie now reads "she checked in yesterday afternoon / said she wasn't feeling well"; her deletion record (or Juno's "not since sunday") breaks it, and Juno answers "i meant she'd told me before / a while ago".
  - The player can then answer ("yesterday afternoon isn't 'a while ago'" / "why did you change your answer?"); Juno's reply is written by the model within a deflect intent, as I chose. The two fallback lines are Claude Code drafts.
  - What the player says is different about the reply is kept as style feedback; only its category goes in the log.
  - During Tonight, Dani asks "did rachel ever explain why she deleted orbit?" and Orbit answers as the player: "yeah. i'll explain later."
- **Still open:** what the Tonight question should be in the finished game (see the conversation).
- **My decision:** [to fill in]

---

### 2026-10-22 — Tonight asks "What made you stay?"

- **Tool / model:** Claude Code.
- **What happened:** I asked whether Tonight is only a user-test feedback step. Claude Code explained that in the final story Tonight is part of the fiction and its answer becomes Orbit's data, and suggested keeping "What made you stay?" in the game and moving "helping / keeping" to the end page for testers. I agreed.
- **What Claude Code built:** Tonight now asks "What made you stay?" (saved as the anchor, only the option id is logged); the end page asks the testers' question. The end page's label and thank-you line are Claude Code drafts.
- **My decision:** [to fill in]

---

### 2026-10-22 — Landing and save system specs

- **Tool / model:** Claude Code (discussion, then writing).
- **What happened:** over several rounds I proposed the landing flow and the save rules and asked Claude Code to critique them objectively. I kept most of my structure and adopted some of its corrections (an honest data notice, stable ids instead of array positions, saving the classification, timed-event states, a final-choice checkpoint); Claude Code accepted my corrections to its points (resume at stable beats, not every line; no promise that names are fully removed; persistent storage isn't a guarantee; save before rendering through one entry point; real separation of playtest and release).
- **What was recorded:** `docs/landing.md` and `docs/save-system.md`, written by Claude Code from the agreed decisions; a pointer in `CLAUDE.md`. Nothing is built yet.
- **My decision:** [to fill in]

---

### 2026-10-24 — Nights 1–3 restructured in the story bible

- **Tool / model:** Claude Code (discussion, then writing).
- **What happened:** over several rounds I reworked the opening and the core reveal and asked Claude Code to critique each version objectively. Claude Code's proposals included the "held back" line, the February message and a timeline of interventions; I proposed the Suggested-replies reveal, the three kinds of choice, splitting Tonight into Check-in and Night Log, Conversation Assist, the confidence rule, the relationship, the evidence loop and the dates, and corrected several of its points (the crit leak couldn't prove anything, hesitation as emotion, Orbit reading Notes, "Scheduled check-ins", the meeting at 9 PM).
- **What was recorded:** Claude Code wrote the agreed decisions into `docs/story-bible.md` (§3 timeline, §4 nights, §5 note, §6 mechanics) and updated two rules in `CLAUDE.md`. Lines and the remaining story beats are marked TBD for me.
- **My decision:** [to fill in]

---

### 2026-10-24 — The first fake's trigger, and a Night 1 scene table

- **Tool / model:** Claude Code.
- **What happened:** I decided the first fake arrives after the player tries to contact Rachel (with a second path and a 23:45 fallback), that the player may refresh her profile first, and that Juno never brings Rachel up in its first line. Claude Code had pointed out the early-refresh and no-Rachel cases and the need for a fallback; I chose the answers.
- **What was recorded:** the trigger rules in `docs/story-bible.md` §4, and `docs/night1-scenes.md`, a scene table drafted by Claude Code from the agreed decisions (facts, Juno's stances, beat ids, triggers, state, intents, costs; no lines), with six questions for me.
- **My decision:** [to fill in]

---

### 2026-10-24 — The room

- **Tool / model:** Claude Code (discussion, then writing).
- **What happened:** I proposed that the player finds Rachel's power bank by putting the phone down and searching their room. Claude Code raised the rule change, the scope, time and battery, and saving; I corrected two of its points (Orbit still sees the phone's state; entering the room is a weak signal, not a guaranteed notification) and added the room's three appearances and the final gesture. Claude Code then pointed out that without a Wait action the phone couldn't charge.
- **What was recorded:** the room in `docs/story-bible.md` §6, new rows in `docs/night1-scenes.md`, the room as a main screen in `docs/save-system.md`, and the new rule in `CLAUDE.md`. Four questions left for me (TBD).
- **My decision:** [to fill in]

---

### 2026-10-24 — Waiting, the dead phone, End Session, how a night ends

- **Tool / model:** Claude Code.
- **What happened:** I decided the Wait action, that the power bank's charge carries over, that a dead phone can be restarted with it, `End Session` instead of Leave, the final gestures as a coda after the ending, when Check-in appears, and that no evidence has to be shown to Juno to end the night. Claude Code added three gaps: why the player's own charger isn't there, Dani's check moving to the end of the night, and what "two key findings" means.
- **What was recorded:** `docs/story-bible.md` §6 and `docs/night1-scenes.md` (new end-of-night beats; the evidence beats are now optional).
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 1 structure locked

- **Tool / model:** Claude Code.
- **What happened:** I split the labels into Juno's local intent and Orbit's system function, decided the held-back line's options and recording, and when the room becomes searchable. Claude Code suggested replacing my "Unresolved tonight: 3" counter with the Night Log's own "Still unresolved", since a counter is the kind of game UI the project avoids.
- **What was recorded:** `docs/night1-scenes.md` (labels, held-back line, room search, before sleeping, status).
- **My decision:** [to fill in]

---

### 2026-10-24 — "Still unresolved" and costs

- **Tool / model:** Claude Code.
- **What happened:** I corrected Claude Code's example (it still hinted at the profile) and set the rule that "Still unresolved" comes only from what the player has run into, plus a cost table where reading is free and only new actions cost. I also set the approach for Night 2: five shared beats, with Night 1's states changing only how they look. Claude Code flagged that −1% per message doubles the prototype's drain.
- **What was recorded:** `docs/night1-scenes.md`, one line in `docs/story-bible.md` §6.
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 2 scene table (draft)

- **Tool / model:** Claude Code.
- **What I asked:** start Night 2's scene table.
- **What Claude Code made:** `docs/night2-scenes.md`, drafted from the agreed decisions: what Night 1 hands over, the five required beats, new facts, the scenes (no lines), and 13 open questions for me, including a logic gap (Rachel's account is erased on Night 1, so the second fake can't come "from her account" as things stand).
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 2: the removed thread, the link, Rachel's note, the route choice

- **Tool / model:** Claude Code.
- **What happened:** I decided the second fake comes from the removed thread, that Night 2's pressure is Rachel's data link expiring (not the battery), that Rachel speaks once in a read-only note, how the route choice is made, and that turning Juno off really works. Claude Code added a date fix (the removal divider is Wednesday), a latest time for the link, that an expired link must still carry February second-hand, the order (fake before link), and two open questions (Juno vs Conversation Assist; deletion's removal window).
- **What was recorded:** `docs/night2-scenes.md` and `docs/story-bible.md` §4 and §6.
- **My decision:** [to fill in]

---

### 2026-10-24 — Three systems: Juno, Conversation Assist, Continuity

- **Tool / model:** Claude Code.
- **What happened:** I separated Juno, Conversation Assist and Continuity, decided that turning Juno off leaves Conversation Assist on (and says so), and when a deleting player's old account speaks. Claude Code pointed out that the February message now fits Continuity rather than Conversation Assist, that Continuity's trigger must include going quiet, and that a deleting player needs a way to learn the old account spoke.
- **What was recorded:** `docs/story-bible.md` §6 and `docs/night2-scenes.md`; the three points as TBD.
- **My decision:** [to fill in]

---

### 2026-10-24 — Continuity's two modes, two records, Dani outside Orbit

- **Tool / model:** Claude Code.
- **What happened:** I defined Continuity as a relationship-disruption system with two modes (REACTIVATION, IDENTITY PROXY), moved February under it, split Night 3 into two records, and decided Dani offers her own number on Night 2 so a deleting player can learn the old account spoke. Claude Code noted the times are Thursday, not Wednesday, that one draft line from Dani states the theme outright, and that "Orbit Relay" and a Messages app would be new.
- **What was recorded:** `docs/story-bible.md` §6 (the three systems, two records, Dani outside Orbit, how a deleting player finds out).
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 2: the second fake's trigger, the prepared reply in Dani's thread

- **Tool / model:** Claude Code.
- **What happened:** I dropped "Orbit Relay" (Chats vs Messages), fixed Dani's line to `this is me`, and decided the second fake's trigger and that `Sending in 10s` happens when Dani asks whether to send Rachel's data. Claude Code pointed out that opening Notes can't trigger anything Orbit does, that the countdown should start as soon as Dani's question is on screen so every player with Assist on sees it, and that sending the link inside Orbit exposes it (left as TBD).
- **What was recorded:** `docs/night2-scenes.md`, `docs/story-bible.md` §6.
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 2: here or text

- **Tool / model:** Claude Code.
- **What happened:** I chose that the link may be sent inside Orbit with only a data consequence (never a blocked link), changed Dani's question to "here or text?" so the countdown also chooses the channel, and set what Orbit can and can't see. Claude Code noted the time is Thursday, and that moving to text means a number is shared in Chats first, so the Messages route leaves one line of its own.
- **What was recorded:** `docs/night2-scenes.md`.
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 2: the morning

- **Tool / model:** Claude Code.
- **What happened:** I set the two Night 3 records for Chats vs Messages and chose a revised version of Claude Code's option C for the morning: Dani's two openings, then that Rachel asked about the crit on Sunday and that Dani will try Rachel's old email. Claude Code added that Orbit can read Dani mentioning the email (a Night 3 record and a reason Continuity speaks at once), a note to let Dani give facts rather than conclusions, and that the player may ask for the email.
- **What was recorded:** `docs/night2-scenes.md` (The morning), `docs/story-bible.md` (the interlude, the relationship).
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 2: the day, the return, Juno's silence

- **Tool / model:** Claude Code.
- **What happened:** I decided the day isn't playable (a wordless transition), Night 2 starts Wednesday 11:20 PM, the player picks the phone up themselves, and Juno never speaks first on Night 2; I also wrote Dani's answer when asked for the email. Claude Code raised three ordering questions: whether Juno can be off before the route choice, what happens when opening Juno is the first Orbit action, and the second fake arriving together with Dani's request.
- **What was recorded:** `docs/night2-scenes.md`.
- **My decision:** [to fill in]

---

### 2026-10-24 — Juno's switch from Night 1; the second fake's fallback; delivery vs reading order

- **Tool / model:** Claude Code.
- **What happened:** I decided Juno's switch exists from Night 1, that Juno's opening completes before the second fake when Juno is opened first, a fixed fallback at Wednesday 11:27 PM, Dani's request at least 3 minutes later, and that the game guarantees delivery order, not reading order. Claude Code noted the fallback still depends on the story clock, and that Night 1's two Juno opening beats can no longer be required.
- **What was recorded:** `docs/night2-scenes.md`, `docs/night1-scenes.md`, `docs/story-bible.md` §6.
- **My decision:** [to fill in]

---

### 2026-10-24 — Night 2: Rachel's share, Check-in, hand-over to Night 3

- **Tool / model:** Claude Code.
- **What happened:** I designed Rachel's private share (the phone's Browser, her note, three records that let the player tell Conversation Assist and Continuity apart) and Night 2's Check-in. Claude Code noted that February's wording echoes Juno's "don't disappear on me", that "please don't forward the files" constrains a publishing ending, that the first open must always complete, and that a "More" link adds UI; it then compiled what Night 3 reads from both nights.
- **What was recorded:** `docs/night2-scenes.md` (Rachel's private share; Check-in, Night 2; Hand-over to Night 3).
- **My decision:** [to fill in]

---

### 2026-10-24 — A Unity room prototype

- **Tool / model:** Claude Code.
- **What happened:** my teacher suggested trying Unity, and I wanted to see whether the room (finding Rachel's power bank with the phone down) would be worth moving engines for. Claude Code compared web and Unity for this game (a single-view room is easy on the web; a lit 3D room and physical gestures favour Unity; moving means rebuilding every phone screen and losing play in a phone browser) and suggested trying the room alone first. I asked for that.
- **What Claude Code made:** `unity-room/`, C# scripts and an editor command that builds the room from simple shapes (desk, lamp, window, tote bag, drawer, coat, phone) with the agreed rules: searching costs story time, the power bank, waiting to charge, one possible notification, picking the phone up goes to a lock screen. Not run yet (no Unity in the cloud session). Excluded from the web deploy (`.vercelignore`).
- **My decision:** [to fill in]

---

### 2026-10-24 — A second session checked the Unity prototype

- **Tool / model:** Claude Code (a separate cloud session).
- **What happened:** I opened a second session to check whether `unity-room/Assets/RoomPrototype` would compile in Unity 6. It read the five scripts and found no compile errors, but couldn't compile them (no Unity in the cloud). It changed nothing. It was opened on the web game's repository rather than locally in the Unity project, so the design session advised moving Unity work to the new `StayALittleLonger` repository and running Unity sessions on my computer, with their own process log there.
- **My decision:** [to fill in]

---

### 2026-10-24 — The full game moves to Unity

- **Tool / model:** Claude Code (discussion).
- **What happened:** after my teacher suggested Unity and I set up a Unity 6.3 LTS (URP) project with its own GitHub repository (`StayALittleLonger`), I decided to build the full game there. Claude Code had compared web and Unity earlier and suggested trying the room first; I chose to start the full project. Claude Code wrote a first prompt for a Unity development session on my computer (read the design docs; make no design decisions; propose a foundation plan before code) and noted the decision in `CLAUDE.md`.
- **My decision:** [to fill in]

---

### 2026-10-24 — Answering the Unity session's foundation plan

- **Tool / model:** Claude Code (design session).
- **What happened:** the Unity session proposed a foundation plan (repo setup, folders, IDs → store → save, UI Toolkit vs uGUI, compile checks) and listed open questions. In the design session Claude Code fixed two docs that hadn't followed the story (the lock-screen notification in `landing.md`; Tonight's leftovers in `save-system.md`) and suggested answers for me: only Juno's local intent goes to the model, a mapping from the old intent names to the new ones plus DISPUTE, and Mac desktop first.
- **What was recorded:** `docs/landing.md`, `docs/save-system.md`. The intent mapping and the platform are waiting for my decision.
- **My decision:** [to fill in]
