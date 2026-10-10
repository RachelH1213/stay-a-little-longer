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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**: which service I signed up for.

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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**
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
- **My decision:** **[to fill in]**
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
- **My decision:** I chose option B and the three look-back changes. **[to fill in]**: the rest.

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
- **My decision:** I chose option C. **[to fill in]**: the rest.
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
- **My decision:** I asked for both changes. **[to fill in]**: the rest.

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
- **My decision:** I chose A, B and C. **[to fill in]**: the wording.

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
- **My decision:** I chose direction 2 and approved the polish. **[to fill in]**: the notebook's look and wording.

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
- **My decision:** I chose the home screen + another app. **[to fill in]**: the look and the wording.

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
- **My decision:** I chose option A. **[to fill in]**: the wording.
