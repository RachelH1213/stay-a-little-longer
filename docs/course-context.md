# Course context

*Stay a Little Longer* is my senior thesis first. A limited part of its development is also my coursework for **Artificial Intelligence, Creativity, & Society (ULEC 2943)**. This file explains how the two overlap, so I (and any AI tool I use) keep them straight.

## Thesis

The full game: three in-game days, Days 1–3, two endings, built over the 2026–27 year. Deadlines and the build queue are in `TASKS.md`. The thesis is the main project. The course work below borrows from it; it doesn't change its direction.

## Project 1: Your Craft on AI

- Due **October 28**, 35% of the course grade, five weeks.
- The brief: make something in my own creative discipline that uses AI meaningfully and critically.
- What I'm submitting: **one bounded, playable section** of the game, not the whole thesis.

The section should show:

- the player talking with Juno;
- Juno coming across as caring and helpful;
- Juno also being pulled by the platform's retention goal;
- the Director choosing Juno's intention for each turn;
- the language model writing the actual words within that intention;
- the truth graph and other rules stopping the model from changing or revealing the mystery;
- my own authorship of the concept, story structure, clues, visual design, character goals and final creative decisions.

**Where things actually stand** (update as it changes): the model layer is built (`api/reply.js`), but I haven't tested it with a real API key yet. A first version of the Director (Task 2) and the truth graph (Task 3) is built and tested with a fake model. The mechanism works, but its contents — the rules in `js/data/director-rules.js` and the fact tags in `js/data/truth.js` — are a draft Claude Code proposed when I asked it to decide. I still have to review and rewrite them, and the actual truth of what happened to Rachel isn't in the truth graph yet. The play log (Task 4) is built and tested with a fake server, but not against a real Supabase project yet. Leaving and notifications (Task 5) work; the delay, the fallback message and the lock-screen wording are placeholders in `js/data/leaving.js` for me to decide. The look-back quiz (Task 6) works from the local copy of the log; apart from the question itself, its wording and which intents count as "helping" or "keeping" are placeholders in `js/data/replay.js`.

## Project 2: Creative AI in Society (not started)

Project 2 starts after Project 1. It asks me to take a critical issue I find through Project 1 and turn it into public advocacy or social action. The detailed brief hasn't been released yet.

Possible directions, nothing decided: transparency, meaningful consent, emotional manipulation, or retention incentives in AI companion systems.
