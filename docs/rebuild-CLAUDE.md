# CLAUDE.md

Read this before changing anything in this repository.

## What this is

*Stay a Little Longer*, the author's senior thesis game (Parsons BFA Design & Technology, 2026–27): a 2D pixel-art detective game played on a phone inside a fake social app, Orbit. This repository, `StayALittleLonger_Rebuild`, is the Unity project and the finished game, not a proof of concept. The earlier 3D attempt (`StayALittleLonger`) is abandoned: never read from it, write to it or copy from it.

- Unity 6.3 LTS (6000.3.27f1), 2D, UI Toolkit for the phone, the new Input System.
- Work on `develop`. Never commit to or merge into `main` unless the author asks.
- The game starts from `Assets/_Game/Scenes/MainMenu/TitleScreen.unity`; Night 1 is `Night1Greybox`.

## The design lives in the other repository

All design decisions are in `RachelH1213/stay-a-little-longer`, cloned next to this one (`../stay-a-little-longer`), in `docs/`. The working branch is `claude/quirky-wright-npkzcf` unless a prompt names another. **Before every task, pull it** (`git -C ../stay-a-little-longer pull`) and read the documents the task touches. The docs win over this code and over your own judgement.

| Document | What it decides |
|---|---|
| `docs/revision-2026-11.md` | **the decisions of 2026-11-19; wins over every document below where they disagree.** Read it first. §7 is the build order: a prompt that says "do round N" means that row |
| `docs/night1-layers.md` | Night 1's mystery, layer by layer: every screen, Juno's and Dani's lines, notifications, the new Settings pages |
| `docs/juno-past-and-retention.md` | Juno's past conversations, its attempts to keep the player, its Night 3 answers (fixed lines) |
| `docs/rachel-history.md` | Rachel's thread from March 2025 to Sunday |
| `docs/data-export.md` | the player's data on Night 3 |
| `docs/phone-screens.md` | every phone screen: the seven text styles, colours, spacing, each element. The only source for phone layout |
| `docs/night1-scenes.md`, `docs/night1-routes.md` | Night 1: events, lines, flags, costs, Notes |
| `docs/landing.md` | title, Before You Begin, Name, the lock screen, Juno's openings |
| `docs/orbit-ia.md` | Orbit's navigation and what each tab does |
| `docs/story-bible.md` | the story, the systems, the endings |
| `docs/save-system.md` | saving, Continue, deleting local data |
| `docs/art-direction.md` | the look outside the phone, art still to make |
| `docs/evidence-matrix.md` | who knew what, when |

If the docs don't decide something, don't invent it: build the smallest neutral version and list it under "not decided" in your report. Never write to the design repository.

## Rules that never change

- **Game code decides what Juno says; the model only writes the words.** Juno never receives the whole truth: only a persona, an intent and the facts that intent allows. Key lines (clues, lies, the fixed line about MSG_1048) are written in the docs, word for word, never model-written.
- **Everything is phone furniture.** Nothing on screen speaks outside the fiction except the title screen, Before You Begin, Name, and the help note shown when a player writes that they are in danger or want to hurt themselves (any composer; Juno doesn't answer that message). No developer text, ids, layout notes or debug labels on any screen a player can reach.
- **Let the player find it.** No character states a contradiction the player is meant to work out. Nothing points at a clue.
- **Rachel's own messages:** lowercase, no full stops, a joke where something is hard, always a question back. Anything Orbit writes as her has a full stop where she would have none, is closed and asks nothing. Never "fix" either.
- **The player's messages and Suggested replies:** lowercase, no full stops.
- **Nothing tappable does nothing.** Every switch really works when turned off.
- **Time is the story's time.** Fixed strings in the fiction, never the real date.
- Reduce motion turns every animation off.

## How to work

- **One session at a time.** Only one Claude session may work in this checkout and drive the Unity editor at a time; the author queues the rest. Before starting, and again before any Play run, test run, compile or commit, check for signs of another session: files changed that you didn't change, a `_Backup/save` or `Evidence/` folder newer than your own, Play mode you didn't start, the editor busy without you. If you see any, stop and ask the author; don't stop someone else's Play mode, overwrite their backup or commit their files.

- **Your save:** before any Play run, back up the author's save and PlayerPrefs; restore them afterwards and confirm they match. If the author is in Play mode, ask before stopping it.
- **Tests:** while working on an item, run only the tests for that item, plus EditMode (it is fast). Run the full EditMode and PlayMode suites once, before pushing a round; if something fails there, fix it before the push. Never skip, delete or loosen a test to make it pass unless the docs changed what it checks; say so when you do.
- **Commits:** one per item, a plain one- or two-sentence message about what changed. No attribution lines. Push `develop` when a round is done.
- **Checking UI:** look at the pixels, not the code, compared element by element with `phone-screens.md`. Take screenshots only of what this round changed on screen and only where the author has to look; behaviour that tests already prove needs none. One capture pass at the end of the round, not after each item. Standard at 1280 × 720 by default; add Extra Large only when the change involves text that could wrap or overflow, and 2880 × 1800 only when the change involves the room or the phone's placement. Never all sizes by habit.
- **Screenshots for review:** the design reviewer works in a cloud session and can't see this Mac. After a round whose changes the author must check by eye, publish those screenshots to the branch `review` of this repository: an orphan branch holding only images, never code. Put each round in its own folder, `review/<yyyy-mm-dd>-<topic>/`, with the full-size PNGs and the overview sheets, plus a short `README.md` listing what each file shows and at which size. No overview sheets unless there are more than about ten shots. A round with nothing to check by eye publishes nothing and says so in the report. Keep `Evidence/` ignored on `develop`. Commit to `review` with a plain message, push it, and name the folder in your report. Never put the author's save, PlayerPrefs or anything from `_Backup/` there.
- **Reports:** for each item, what changed and its commit; test counts; where you differ from the docs and why; what the docs didn't decide.
