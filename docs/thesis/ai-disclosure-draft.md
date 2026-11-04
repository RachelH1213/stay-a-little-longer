# Midterm AI Disclosure Statement (draft)

*Stay a Little Longer*, Rachel Huang

Draft prepared with Claude Code from the project's records, for me to check, cut and rewrite in my own words. Brackets mark what only I can fill in.

---

## 1. Tools used

**Claude Code** (Anthropic's coding agent, running Claude Opus 5.5). My main development tool. I use it in two places: a "design" session connected to the project's design repository, and separate development sessions on my own computer inside the Unity project.

**Claude Haiku 5.5** (Anthropic, through its API). A part of the game itself: it writes some of Juno's lines live while the game is played, inside rules I designed. Before October 14 the game used **GLM-4.5 Flash / GLM-4.7 Flash** (Zhipu); I switched after a classroom test, comparing the models side by side on a page I had built for that.

**Unity's AI Assistant:** not used (turned off when the project was created).

[Any other AI tool used for the thesis, for example to review interview questions or slides: name it here.]

## 2. Extent of use

I want to be precise here, because the answer is different for each part of the project.

**Mine:** the concept and the research question; the story, its structure over three nights, the characters and their relationships; the clues and how they can be found; the mechanics (the battery and time costs, the room, putting the phone down, Orbit's three systems); every design decision recorded in the design documents; the key lines of dialogue; the playtests and what I changed after them.

**Written by Claude Code from my instructions:** almost all of the code, first the web prototype (HTML, CSS and JavaScript, the server that calls the model, the play log) and now the Unity project (C#, UI Toolkit, the save system and tests). I describe what I want, review the result by playing it, and ask for changes. I can read and adjust the code, but I did not write most of it line by line.

**Drafted by Claude Code, decided by me:** the design documents (story bible, scene tables, save system spec) are written by Claude Code from decisions I make in discussion; I propose structures and ask it to critique them, and I accept, change or reject its suggestions. Some ideas came from it and I kept them (for example, Rachel's February message and Juno asking what the player was about to say to her); others I rejected (for example, a "ferry photo" clue). Placeholder dialogue it drafted is marked as a draft until I rewrite it.

**Written by AI inside the game:** some of Juno's low-stakes lines are written live by Claude Haiku 5.5. The game decides what Juno is trying to do in each line and which facts it may use; the model never receives the truth of the story. Lines that carry a clue or a lie are always written by me. Every model line is checked and replaced by a written line if it breaks a rule.

**Once I handed over more than I meant to:** on October 8 I told Claude Code to decide the remaining review items itself, and it changed the wording of a clue and the story's timeline. I kept the changes then and rewrote both later. Since then, story decisions stay with me.

## 3. Process

- **Plan before code.** Each feature starts with a plan I approve before anything is built; the first one began with "explain the architecture in under 150 words, without writing code".
- **Critique, not agreement.** For design questions I ask for objective criticism rather than agreement ("保持客观 不要附和我" / stay objective, don't just agree with me). Where its critique is right I change my design; where it isn't, I explain why and keep mine.
- **The design documents are the record.** Decisions are written into the design repository with their date and who made them, and the Unity sessions read only from there and may not make design decisions.
- **Playtesting decides.** Classroom and peer tests (October) led to rebuilding how clues are found, how the opening works and which model writes Juno's lines.
- **Errors I caught.** For the midterm, Claude Code presented three of Juno's fictional lines as if real apps had said them; I asked for the source and replaced them with a figure from the study itself (De Freitas et al. 2025), checked against the paper.
- **In the game,** a "director mode" shows under every Juno line whether I wrote it or the model did, so the AI's part can be inspected.

Example prompts: "帮我审一遍草稿文件" (review the draft files), "先在 Unity 里做个房间试试看" (try the room in Unity first), "保持客观 不要附和我", "你觉得怎么改最好就怎么改" (change it however you think best: the October 8 handover above). [Add one or two of your own.]

## 4. AI in written thesis assignments

- **Midterm presentation:** Claude Code drafted slide text and a speaking script from my notes and my project records, and rebuilt slides when I asked. The research background, the concept statement and the research question are mine; for the research question it suggested wording changes, some of which I took.
- **Research question:** my wording, shortened with Claude Code's suggestions.
- **Interview questions:** I wrote the questions; Claude Code reviewed them against the current design and suggested changes and backup explanations. [If another AI also reviewed them, say so.]
- **This statement:** drafted with Claude Code from the project's records; checked and rewritten by me.
- [Any other written assignment.]
