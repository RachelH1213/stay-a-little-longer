# AI documentation: *Stay a Little Longer*, playable section

Project 1, ULEC 2943. A summary of `docs/ai-process-log.md` (98 dated entries, 2026-09-24 to 2026-10-25), which is the full record. Compiled by Claude Code from that log; checked and corrected by me before submission.

**The project:** a narrative investigation game played through a simulated phone, inside a fictional social app called Orbit. The player looks for their friend Rachel with the help of Juno, an AI companion whose replies are written live by a language model, and who is built to keep the player there. Playable section: Night 1, https://stay-a-little-longer-zjkv.vercel.app

---

## 1. Tools, models and systems

| Tool / model | Who made it | What it did | When |
|---|---|---|---|
| **Claude Code** (coding agent) | Anthropic | Wrote and debugged the code from my instructions; drafted documentation, design specs and scene tables from decisions I made in discussion; critiqued my design proposals; drafted midterm slides and a speaking script; wrote a Unity room prototype. The exact model id is recorded per session in the log. | 2026-09-24 → 2026-10-25 |
| **Claude Haiku 5.5** (language model, in the game) | Anthropic | Writes some of Juno's lines live, inside an intent and a set of allowed facts chosen by my game code; also sorts what the player types. | in the game since 2026-10-14 |
| **GLM-4.5 Flash / GLM-4.7 Flash** (language models, in the game) | Zhipu (z.ai) | Juno's model before 2026-10-14; also wrote test lines when the guards were built. Replaced after a classroom test (replies off the point, slow). | 2026-09-24 → 2026-10-14 |
| **ChatGPT** | OpenAI | Gave written critiques of my playthroughs and a proposal for the opening, which I combined with Claude Code's (2026-10-12, 10-13). | 2026-10-12 → 10-13 (none outside this repository) |
| **`compare.html`** (my own tool) | me, built with Claude Code | Sends the same seven Day 2 moments to several models side by side, so I could choose Juno's model. | 2026-10-14 |
| *Not AI, but part of the system:* Vercel (hosting the model call), Supabase (play log for tests), Unity 6.3 with its Pipeline command-line package (lets a coding agent compile and run tests). | | | |

Not used: Unity's AI Assistant (turned off when creating the Unity project).

---

## 2. Where AI sits inside the game

The game's rule: **game code decides what Juno wants to say; the model only writes the words.**

1. The player taps a suggested reply or types.
2. If they typed, the model first sorts the message (an answer, a doubt, an accusation, leaving, a claim about Rachel, danger…).
3. My rules (the "Director") choose Juno's intent for this turn (e.g. deflect, retain, concede) and the only facts it may use. The model never receives the truth of the case.
4. The model writes one short line.
5. The game checks it against guards (phrases an intent may never use; never inventing what happened to Rachel; at most 25 words). If it fails, or the model takes over 8 s, a line I wrote is used instead.

Lines that carry a clue or a lie the player can catch are always written by me, never by the model.

**Screenshot 4** (`screens/04-juno-presenter.png`), the game in presenter mode (`?director`): under each Juno line, its intent and its source. `retain · tagged · script` = a fixed line I wrote (with the intent it really serves); `deflect · script · model` = an intent chosen by the script, words written live by Claude Haiku 5.5 ("she's gone quiet before. a few days sometimes, from what you've said. that doesn't mean something's wrong.").

Screenshots 1–3 (`screens/01-start.png`, `02-start-choices.png`, `03-lock.png`): the start page, the player's choices and name (kept on the device, never logged), the lock screen where Juno writes first.

---

## 3. How AI was used, by phase

Each line points to the dated entry in `docs/ai-process-log.md`.

**Building the system (Sept 24 – Oct 8).** Claude Code built the model layer, the Director and truth graph, the play log, leaving and notifications, and the look-back (Tasks 1–6), each planned with me first. A review of draft files followed; for the remaining items I told it to decide, and it changed a clue's wording and the story's timeline itself (2026-10-08, "Remaining review items decided by Claude Code"). First live tests with a real model and guards against invented facts.

**Playtesting and redesign (Oct 8 – Oct 14).** My own playtests, written critiques (some from ChatGPT) and a classroom test drove rebuilds: the opening, the notebook replaced by a phone with Notes, "Tonight" rebuilt as a replay, investigating rebuilt around screenshots, Juno disputing things players invent, a help note when a player says they're in danger. After the classroom test I compared models and switched Juno to Claude Haiku 5.5 (2026-10-14).

**Presentation (Oct 14 – 15).** Claude Code drafted and rebuilt midterm slides and a script. Errors it made and I caught: on "Where this started" it showed Juno's fictional lines from my own design as if real apps had said them (replaced with Figure 2 from De Freitas et al. 2025, checked against the PDF); and it wrongly said the study's "5x longer" figure had no source (it's on p. 43) (2026-10-14, "Slide: 'Where this started' redone" and "Opening slide checked against the paper itself").

**The full game's design (Oct 15 – 25).** Long design discussions: I proposed structures and asked for objective critique, and recorded decisions in `docs/story-bible.md`, landing and save-system specs, and Night 1–2 scene tables. Which ideas came from whom is written in each entry (e.g. the Suggested-replies reveal and the three kinds of choice were mine; the "held back line" and the February message started as Claude Code's suggestions; I rejected its "ferry photo" clue as too flat).

**Engine (Oct 24 – 25).** After my teacher suggested Unity, Claude Code wrote a room prototype and a foundation plan; the full game moved to Unity.

---

## 4. What stayed mine

From my AI consent policy (`docs/course-context.md`): the main idea, research question, story, characters, visual direction, clues and interaction design are mine; Claude Code may write code, explain, implement and compare options, but not replace the concept or make final narrative, visual or ethical decisions. Where that line was crossed or blurred, the log says so (above all 2026-10-08). Each entry's "My decision" field records what I kept, changed or rejected.

---

## 5. Data and ethics notes recorded along the way

- Player names are kept on the device and never logged; Check-in and look-back answers are logged as option ids only.
- Found during the work and not yet fixed in the prototype: the test log stores raw typed text and Juno lines that contain the name, and the name is sent to the model. Recorded as a requirement before any public release (`docs/save-system.md` §12).
- The game shows a help note outside the fiction if a player says they are in real danger (2026-10-14).
- Model cost: about one cent per playthrough with Claude Haiku 5.5, with a cap on model calls per night.
