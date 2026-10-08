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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**

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
- **My decision:** **[to fill in]**

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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**

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
- **My decision:** **[to fill in]**
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
- **My decision:** chips never trigger rules. **[to fill in]**: anything to add.

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
- **My decision:** **[to fill in]**
