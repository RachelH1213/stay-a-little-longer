# Thesis 1 Midterm — presentation draft

*Stay a Little Longer* · 10 minutes · BFADT Thesis 1

How to read this file:
- **Slide** = the text that goes on the slide. **Say** = the speaker script (about 130 words a minute).
- 【你写】 marks parts that have to be your own: your interests, your concept, what makes it yours. What's written there is a draft built from what's already in the project, for you to rewrite in your own words.
- 【核对】 marks facts (years, publishers, release dates) to check before they go on a slide.
- Everything about the user tests and the changes comes from `docs/ai-process-log.md`, so it is what actually happened.

**Timing (10:00)**

| # | Section | Time |
|---|---|---|
| 1 | Introduction | 0:45 |
| 2 | Three precedents | 1:15 |
| 3 | Concept statement | 0:45 |
| 4 | Form / media | 0:30 |
| 5 | What's unique | 0:30 |
| 6 | Prototypes (live demo + system) | 3:30 |
| 6b | User tests and what I changed | 2:00 |
| 7 | Next, and questions for you | 0:45 |
| 8 | Bibliography | (shown, not read) |

---

## 1. Introduction (0:45)

**Slide** 【你写】
> I'm interested in AI companions: apps designed to care about us, and paid to keep us there. I'm asking what happens when the thing helping you is also the thing holding on to you, and whether a game can let players feel that difference instead of being told about it.

**Say**
"Hi, I'm Xinyue. I'm interested in AI companions: chatbots that remember you, check in when you go quiet, and introduce you to people. They're designed to care about us, but they're also products that are measured on whether we stay. My thesis asks what happens when the thing helping you is also the thing holding on to you, and whether a game can make players feel that, rather than explain it to them."

> 【你写】 Add one sentence on what you've been reading or playing (e.g. "I've been reading Sherry Turkle and Shoshana Zuboff on…"). Only name things you have actually read.

---

## 2. Three precedents (1:15, about 25 seconds each)

One slide each: title, year, creator, form, one image.

### Her Story
- **2015 · Sam Barlow · investigative FMV game (PC, Mac, iOS)** 【核对 platforms】
- **Say:** "Her Story puts the whole game inside one old police database. You only learn the truth by searching. I took two things from it: the interface *is* the game, and the player builds the story themselves. That's why my game has no narrator and no character ever states the contradiction for you."

### A Normal Lost Phone
- **2017 · Accidental Queens · narrative game played entirely through a found phone's interface (PC, mobile)** 【核对 publisher: Plug In Digital】
- **Say:** "A Normal Lost Phone is played entirely through someone's phone: messages, photos, apps. My game also lives entirely on a phone, the player's own. It has a home screen, Notes, Photos and a social app called Orbit. The difference is that in my phone, one of the apps is talking back, and it doesn't want you to leave."

### Uncover the Smoking Gun
- **2024 · ReLU Games · detective game where you interrogate AI characters by typing freely; the characters' replies are written by a language model** 【核对 year and studio】
- **Say:** "A classmate recommended this after my user test. You question AI-driven suspects by typing whatever you want. It showed me what free conversation makes possible, and what it costs: if the model knows the answer, players can talk their way to it. My answer is that the model playing Juno never knows the truth."

> Alternatives if you'd rather swap one: **Façade** (2005, Michael Mateas and Andrew Stern; an interactive drama where a "drama manager" picks the next story beat while players type freely; the closest ancestor of my Director) and **Replika** (2017, Luka Inc.; a real AI companion app, not a game, for context on the theme). 【核对】

---

## 3. Concept statement (0:45)

**Slide** 【你写 — the first sentence is already yours, from the README】
> **Stay a Little Longer** is a detective game that takes place inside a fake social app. You're looking for a friend who has gone quiet; your AI companion is helping you look, and is also the reason she's gone. Over three nights on one phone, the game asks players to notice how an AI that cares for them is also designed to keep them, and to decide for themselves whether to stay.

**Say**
"Stay a Little Longer is a detective game set inside a fake social app called Orbit. A year and a half ago you joined Orbit, and its AI companion Juno introduced you to Rachel. Tonight Rachel missed a plan with you. Juno messages you first, then helps you look for her. But Juno is also the one hiding what happened. The game never tells you that. You catch it through evidence on your own phone."

---

## 4. Form / media (0:30)

**Slide**
- **Form:** a mobile game, played on your own phone (now a web app you add to your home screen; later iOS and Steam)
- **Built with:** HTML / CSS / JavaScript (no framework) · serverless functions on Vercel · Claude Haiku 5.5 through the Anthropic API for some of Juno's lines (compared against GLM and GPT) · Supabase to log every turn · Playwright for automated tests
- **Why a phone:** the subject is something that lives on your phone. Playing on the same device makes Juno's notifications feel like real ones.

**Say**
"It's a phone game because the subject lives on our phones. On a desktop it sits in a drawn phone; on a phone, the whole screen is the game, and Juno's notifications look like real ones. For Juno's voice I compared three model providers side by side, Claude, GPT and Zhipu's GLM, and chose Claude Haiku: it's fast and cheap, and its lines stayed in character."

---

## 5. What's unique (0:30)

**Slide** 【你写 — a draft】
> **A detective game where the AI character never knows the truth: the game decides what Juno wants to say, and the language model only writes the words.**

**Say**
"Most AI games give the model the whole story and hope it keeps the secret. Mine doesn't. Every turn, game code I wrote decides Juno's intention, like reassure, deflect or keep you here, and which facts it's allowed to use. Only then does the model write the sentence. This keeps the mystery intact, keeps costs low, and makes my authorship clear: the story, the clues and Juno's strategy are mine. The model is never the source of truth."

---

## 6. Prototypes (3:30)

### Prototype 1 — the playable Night 1 slice (live demo, about 2:30)

Open the preview link on the classroom computer. Have a backup video ready (see the bottom of this file).

**Demo path** (what to click, what to say)

1. **Start page** (0:15) — pick "A critique went badly", "I wanted to stay connected", type a name.
   *"Before it starts, you tell Juno about your day. Juno will use it."*
2. **Lock screen → Juno** (0:20) — the notification says "still awake after crit?".
   *"Juno writes first, and it remembers. Notice the battery: 20%. Everything you do costs battery and time."*
3. **Rachel's reply arrives** (0:20) — tap the banner: "sorry, been busy. doing okay now".
   *"Juno says she's fine. But scroll up: Rachel never uses full stops, and she always asks something back."*
4. **Juno's lie** (0:15) — keep answering Juno until it says "it loads fine for me" about her profile; pick "i'll screenshot it for you". Juno: "then show me."
   *"Juno says her profile works. Now I have to prove it doesn't."*
5. **Her profile, and showing Juno** (0:45) — follow the guide to Profile → pull to refresh → she's erased piece by piece → "This account has been deleted. Removed Mon 00:40 · Erased for good at 00:40 · in N min" → screenshot it → back to Juno → photo button → send it.
   *"Her account was deleted a day before she 'replied', and at 00:40 tonight it's gone for good. I show Juno the screenshot. That's how you catch a lie: with evidence, not by picking the right answer."*
6. **Type something** (0:15) — type freely, e.g. "did you write that?".
   *"You can type anything. A model sorts what you said; my rules decide how Juno reacts."*

Demo URL tricks (just change the address):
- `?director`: every Juno line shows a small tag with the intention and rule the Director picked. Use it to show Prototype 2 live.
- `?clock=00:27`: starts late, so you can show the 00:30 warning and the 00:40 erase.
- `?battery=10.8`: starts low, so you can show Orbit's Battery Saver offer and the phone dying.

### Prototype 2 — the system: who decides what Juno says (about 1:00)

**Slide:** a diagram

```
Player's message
      │
      ▼
Game code sorts it (answer? doubt? accusation? leaving?)
      │
      ▼
Director (my rules) ──► Juno's intention this turn: reassure / deflect / keep you here / concede …
      │
Truth graph (my story) ──► the only facts Juno may use right now (never the secret)
      │
      ▼
Language model writes ONE line, in Juno's voice
      │
      ▼
Guards check it (no invented news about Rachel, max 25 words) → otherwise my written line
      │
      ▼
Every turn is logged → "Tonight", the look-back, reads it back to the player
```

**Say**
"This is the second prototype, the system underneath. The model sits in exactly one box. Everything above it is mine. And because every turn is logged, at the end of the night the game shows you three moments from your own playthrough: what Juno said, what you knew then, and what you didn't know yet. Then it asks one question with no right answer: was Juno helping you, keeping you here, or both?"

---

## 6b. User tests and what I changed (2:00)

**Slide** — a three-column table: *What testers said → What I learned → What I changed*

| What I heard | What I changed |
|---|---|
| **Testing it myself on my phone** (Oct 8): when I typed something the script didn't expect, Juno ignored it. | Juno now answers what you actually type, then steers back. Later the model also sorts each message, so a typed answer moves the story on. |
| **Nobody knew what to do** (Oct 8): no context at the start, and the "save evidence" flag wasn't discoverable. | A start page with the premise; Rachel's last message on the lock screen; later, a home screen and a Notes app instead of a panel beside the phone. |
| **"Helping or keeping?" was unanswerable** (Oct 10–12): even I couldn't answer it, and testers didn't know what to choose, three rounds in a row. | The ending became **Tonight**: a replay of three moments from your own playthrough, then one open question with no right answer. |
| **Written playtest critique** (Oct 12): notifications disappeared too fast; nobody found the swipe home; some things did nothing when tapped. | Notifications stay 9s and can be dismissed; a visible home bar; nothing tappable fails silently. |
| **Classroom user test** (Oct 14): Notes was confusing (too much text, ambiguous questions); the paperclip was awkward; the game was too guided but also easy to get stuck in; too much reading. A classmate recommended *Uncover the Smoking Gun*. | Evidence became **screenshots**: you screenshot anything in Orbit and **show it to Juno** to catch a lie. Notes only lists what you've found. The story moves when you see or show something, never because you filed it correctly. More ways to find things: search, Dani, Photos. |
| **Screenshots weren't obvious; Photos had no reason to exist** (Oct 14) | The first screenshot is taught inside the story ("then show me."); Photos became a real camera roll with a year of your photos, including an old screenshot of Rachel's voice. |
| **Free chat broke the story** (Oct 14): I typed "she's dead" and Juno comforted me as if it were true; a message about being in danger got the same deflection over and over. | Juno now disputes things the game never established, and a message about real danger steps outside the fiction with a help note. |
| **"There's no pressure"** (Oct 14): nothing limited the player. | **The night as a resource:** a phone at 20% battery, every action costs battery and time, and at 00:40 Rachel's account is erased for good. When the phone dies, the night ends; it isn't a game over. |

**Say**
"Each round of testing changed something fundamental. The biggest: in the class test you told me Notes was confusing, the paperclip was awkward, and the game was both too guided and easy to get stuck in. So I removed the paperclip and the questions. Now you screenshot what you find and show it to Juno. That turned collecting evidence into confronting Juno. The latest change is a limit: your phone is at 20%, and at 00:40 Rachel's account is erased for good, so you have to decide what's worth your battery."

> 【你写】 If you have quotes from testers or numbers (how many people, how long they played), add them; that's stronger than my summary.

---

## 7. Next, and questions for you (0:45)

**Slide**
- Write the full story bible: what really happened to Rachel, what Juno knows, three nights
- Three nights, about 1–1.5 hours in total; the story changes with what you caught and whether you stayed
- Several endings; Tonight after each night
- Playtest the night mechanics: battery, the erase, Battery Saver

**Questions for critics** 【你选 2–3】
1. Is the battery making the night tense, or just stressful?
2. How free should talking to Juno be? Is the model replying too much, or too little?
3. Should the player ever be told outright what Juno did, or should it stay theirs to decide?
4. The model writes some lines, but the clues and lies are fixed. Does that split come across?

---

## 8. Bibliography (shown, not read)

Chicago Manual of Style, **author-date**. 【只放你真的读过、玩过的；每条都要核对】

Barlow, Sam. 2015. *Her Story*. Sam Barlow. PC, Mac, iOS.

Accidental Queens. 2017. *A Normal Lost Phone*. Plug In Digital. PC, iOS, Android.

ReLU Games. 2024. *Uncover the Smoking Gun*. KRAFTON. PC.

Mateas, Michael, and Andrew Stern. 2003. "Façade: An Experiment in Building a Fully-Realized Interactive Drama." Paper presented at the Game Developers Conference, San Jose, CA.

Murray, Janet H. 1997. *Hamlet on the Holodeck: The Future of Narrative in Cyberspace*. New York: Free Press.

Turkle, Sherry. 2011. *Alone Together: Why We Expect More from Technology and Less from Each Other*. New York: Basic Books.

Zuboff, Shoshana. 2019. *The Age of Surveillance Capitalism: The Fight for a Human Future at the New Frontier of Power*. New York: PublicAffairs.

Eyal, Nir. 2014. *Hooked: How to Build Habit-Forming Products*. New York: Portfolio/Penguin.

Brignull, Harry. 2023. *Deceptive Patterns: Exposing the Tricks Tech Companies Use to Control You*. Testimonium.

Anthropic. 2026. "Claude API Documentation." Accessed October 14, 2026. https://docs.claude.com.

---

## Before the day

- [ ] Time a full run-through out loud (aim for 9:30).
- [ ] Slides as PDF on a USB drive and on the laptop (the brief asks for this).
- [ ] A backup screen recording of the demo path, in case the internet fails.
- [ ] Open the preview link once beforehand so the first load isn't slow.
- [ ] Upload the slides to the class Google Drive folder.
