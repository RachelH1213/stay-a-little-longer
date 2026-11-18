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
- **Everything is phone furniture.** Nothing on screen speaks outside the fiction except the title screen, Before You Begin and Name. No developer text, ids, layout notes or debug labels on any screen a player can reach.
- **Let the player find it.** No character states a contradiction the player is meant to work out. Nothing points at a clue.
- **Rachel's own messages:** lowercase, no full stops, a joke where something is hard, always a question back. Anything written as her by Orbit is punctuated, closed and asks nothing. Never "fix" either.
- **The player's messages and Suggested replies:** lowercase, no full stops.
- **Nothing tappable does nothing.** Every switch really works when turned off.
- **Time is the story's time.** Fixed strings in the fiction, never the real date.
- Reduce motion turns every animation off.

## How to work

- **Your save:** before any Play run, back up the author's save and PlayerPrefs; restore them afterwards and confirm they match. If the author is in Play mode, ask before stopping it.
- **Tests:** run EditMode and PlayMode after each change. Never skip, delete or loosen a test to make it pass unless the docs changed what it checks; say so when you do.
- **Commits:** one per item, a plain one- or two-sentence message about what changed. No attribution lines. Push `develop` when a round is done.
- **Checking UI:** look at the pixels, not the code. Screenshots at Standard, Large and Extra Large, at 1280 × 720, compared element by element with `phone-screens.md`.
- **Reports:** for each item, what changed and its commit; test counts; where you differ from the docs and why; what the docs didn't decide.
