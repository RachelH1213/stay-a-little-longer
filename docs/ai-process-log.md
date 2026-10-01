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
