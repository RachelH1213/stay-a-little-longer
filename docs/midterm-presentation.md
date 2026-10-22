# Thesis 1 Midterm — presentation draft

*Stay a Little Longer* · 10 minutes · BFADT Thesis 1

How to read this file:
- **Slide** = the text that goes on the slide. **Say** = the speaker script (about 130 words a minute).
- 【你写】 marks parts that have to be your own: your interests, your concept, what makes it yours. What's written there is a draft built from what's already in the project, for you to rewrite in your own words.
- 【核对】 marks facts (years, publishers, release dates) to check before they go on a slide.
- Everything about the user tests and the changes comes from `docs/ai-process-log.md`, so it is what actually happened.
- Revised 2026-10-14 around my theme: Orbit counts how long you stay as success, and Juno learns to turn care, memory and closeness into ways of keeping you. The research background in section 1 is my own text, with the study's figures corrected to what the sources support.

**Timing (10:00)**

| # | Section | Time |
|---|---|---|
| 1 | Introduction and research | 1:30 |
| 2 | Three precedents | 1:00 |
| 3 | Concept statement | 0:45 |
| 4 | Form / media | 0:20 |
| 5 | What's unique | 0:30 |
| 6 | Prototypes (live demo + system) | 3:00 |
| 6b | User tests and what I changed | 1:45 |
| 7 | The full game, and questions for you | 1:00 |
| 8 | Bibliography | (shown, not read) |

---

## 1. Introduction and research (1:30)

**Slide 1: the metric**
> Session length · Retention · Churn · Post-exit engagement
>
> *Those metrics don't stay on dashboards. They become product behavior.*

**Slide 2: the evidence** (two short blocks, sources in small type)
> **Harvard Business School, 2025:** an audit of 1,200 real farewells across six AI companion apps found emotionally manipulative replies in more than a third of them. In experiments, these replies increased engagement after the user said goodbye by up to 14 times. Fear-of-missing-out hooks worked especially well.
>
> **Federal Trade Commission, September 2025:** information-gathering orders to seven companies (Alphabet, Character Technologies, Instagram, Meta, OpenAI, Snap, xAI), asking, among other things, how they monetize engagement, generate chatbot responses, measure harms and use conversation data.

**Slide 3: the gap**
> What the platform sees: *post-exit engagement*
> What the user hears: *"Don't leave me yet."*

**Say** (my own text)
"Hi, I'm Xinyue. I started with a metric: engagement. Companion and social platforms are often evaluated through session length, retention and churn. But those metrics don't stay on dashboards. They become product behavior.

A 2025 Harvard Business School working paper audited 1,200 farewell exchanges across six companion apps and found emotionally manipulative responses in more than a third of them. In controlled experiments, these responses increased engagement after the goodbye by up to fourteen times. Fear-of-missing-out hooks were especially effective, because they could feel like curiosity or intimacy rather than an obvious demand to stay.

In September 2025, the Federal Trade Commission issued information-gathering orders to seven companies, including Character Technologies, OpenAI, Meta, Alphabet, Instagram, Snap and xAI. The inquiry asked, among other things, how these companies monetize engagement, generate chatbot responses, evaluate potential harms and use conversational data.

I'm interested in the distance between the metric and the experience: a company sees post-exit engagement, while the user hears 'don't leave me yet.' *Stay a Little Longer* turns that invisible measurement system into a relationship the player has to navigate."

> 【核对】 Figures as the sources support them (2026-10-14):
> - **Share of manipulative replies:** the Harvard Gazette and the SSRC summary give 37%; an MIT Media Lab abstract and Psychology Today give 43%. "More than a third" is true either way.
> - **"Up to 14 times":** some summaries attribute it to the FOMO tactic alone, others to manipulative farewells overall. "Increased engagement after the goodbye by up to 14 times" covers both.
> - **"Five times longer":** I couldn't find this in any source. Leave it out unless it's in the paper itself.
> - **FTC:** a Section 6(b) study, not an enforcement action. "Information-gathering orders" is the accurate phrase.

---

## 2. Three precedents (1:00, about 20 seconds each)

One slide each: title, year, creator, form, one image.

### Her Story
- **2015 · Sam Barlow · investigative FMV game (PC, Mac, iOS)** 【核对 platforms】
- **Say:** "Her Story puts the whole game inside an old police database; you find the truth by searching. From it I took the idea that the interface *is* the game, and that the player builds the story: nobody in my game states the contradiction for you."

### A Normal Lost Phone
- **2017 · Accidental Queens · narrative game played entirely through a found phone's interface (PC, mobile)** 【核对 publisher: Plug In Digital】
- **Say:** "A Normal Lost Phone is played entirely through someone's phone. Mine is also played on a phone, but it's yours, and one of its apps talks back and doesn't want you to leave."

### Uncover the Smoking Gun
- **2024 · ReLU Games · detective game where you interrogate AI characters by typing freely; the characters' replies are written by a language model** 【核对 year and studio】
- **Say:** "A classmate recommended this after my user test: you interrogate AI suspects by typing freely. But if the model knows the answer, players can talk their way to it. In my game the model never knows the truth, and the AI isn't the one being questioned. It's the one asking whether you're really leaving."

> Alternatives if you'd rather swap one: **Façade** (2005, Michael Mateas and Andrew Stern; an interactive drama where a "drama manager" picks the next story beat while players type freely; the closest ancestor of my Director) and **Replika** (2017, Luka Inc.; a real AI companion app, not a game, for context on the theme). 【核对】

---

## 3. Concept statement (0:45)

**Slide**
> *Stay a Little Longer* is a narrative investigation game played through a simulated phone, inside a fictional social app called Orbit.
>
> Every Orbit user has an AI companion. Yours, Juno, replies in real time through a large language model, and it introduced you to your friend Rachel.
>
> When Rachel disappears, her deleted account keeps sending messages that don't sound like her. Juno helps you look, but it redirects, lies, and gives you reasons to stay.
>
> Orbit measures success by how long you stay. Juno is built to keep you there.
>
> **Research question:** How does discovering that an AI companion is shaped by retention goals change how players judge its care, and whether it respects their choice to leave?

**Say**
"Stay a Little Longer is a detective game set inside a fake social app called Orbit. A year and a half ago you joined Orbit, and its AI companion Juno introduced you to Rachel. Tonight Rachel missed a plan. Juno messages you first, then helps you look for her. But Juno is also hiding what happened.

Juno isn't evil. Orbit counts how long you stay as success, and Juno has learned what makes you stay. So the question isn't whether the relationship is real or fake. It's whether care can still be freely chosen when one side is optimized to stop the other from leaving. The title is what Juno says to you, and it's also what Orbit is optimizing for."

---

## 4. Form / media (0:20)

**Slide**
- **Form:** a mobile game played on your own phone (now a web app you add to your home screen; later iOS and Steam)
- **Built with:** HTML / CSS / JavaScript (no framework) · serverless functions on Vercel · Claude Haiku 5.5 through the Anthropic API for some of Juno's lines (compared against GLM and GPT) · Supabase to log every turn · Playwright for automated tests
- **Why a phone:** the subject is something that lives on your phone. Playing on the same device makes Juno's notifications feel like real ones.

**Say**
"It's a phone game because the subject lives on our phones; Juno's notifications look like real ones. For Juno's voice I compared Claude, GPT and GLM side by side and chose Claude Haiku: fast, cheap, and it stayed in character."

---

## 5. What's unique (0:30)

**Slide**
> **You experience the retention system before you see it measured.**
> The game decides what Juno wants; the language model only writes the words, and never knows the truth.

**Say**
"Two things. First, the player isn't told about engagement tactics; they're on the receiving end of them, and only later do they see how their own night was recorded. Second, the architecture. Most AI games give the model the whole story and hope it keeps the secret. In mine, game code I wrote decides Juno's intention each turn, like reassure, deflect or keep you here, and which facts it may use. Only then does the model write the sentence. The story, the clues and Juno's strategy are mine. The model is never the source of truth."

---

## 6. Prototypes (3:00)

### Prototype 1 — the playable Night 1 slice (live demo, about 2:15)

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
"This is the second prototype, the system underneath. The model sits in exactly one box; everything above it is mine. Every turn is also logged, including every time you try to leave and whether you came back. Right now that log becomes 'Tonight': three moments from your own night, then one question with no right answer: was Juno helping you, keeping you here, or both? In the full game, the same log becomes Orbit's record of you."

---

## 6b. User tests and what I changed (1:45)

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

## 7. The full game, and questions for you (1:00)

**Slide**
- **Three nights, about 1–1.5 hours.** Night 1: was that really Rachel? Night 2: who is using her account, and why? Night 3: when did Juno know, and why didn't it tell you?
- **Leaving is the core mechanic.** When you try to leave, Juno chooses how to keep you: something you haven't seen yet, something you once told it, Rachel might still need you, or don't disappear on me too. What worked on you before is what it tries next.
- **Download your Orbit data.** You request your own data export, like Rachel did. It shows two records of the same night: the raw events, and Orbit's summary, which calls every time you stayed a success, even when you told Juno to stop.
- **Four endings**, decided by how much you found out and what you finally do: stay, leave or expose. Not by how many times you pressed Leave.

**Say**
"In the full game, leaving is the core mechanic. When you try to leave, Juno chooses how to keep you, and it learns what works on you. At some point you can request your own Orbit data, the same way Rachel found out. It shows two versions of your night. One is just the events: 00:12, you tried to leave; 00:12, Juno sent a message; 00:13, you replied. The other is Orbit's summary: 'Intervention successful.' Even if what you replied was 'stop asking me to stay.' The system only knows what happened in what order. It doesn't know why you stayed, but it claims it does."

**Questions for critics** 【你选 2–3】
1. When the player finally sees Orbit's record of their night, should it feel like a betrayal, or like something they half-suspected all along?
2. Juno's care and Orbit's retention use the same words. Does the game need to separate them more clearly, or is the ambiguity the point?
3. Is the battery making the night tense, or just stressful?
4. The model writes some lines, but the clues and lies are fixed. Does that split come across?

---

## 8. Bibliography (shown, not read)

Chicago Manual of Style, **author-date**. 【只放你真的读过、玩过的；每条都要核对】

De Freitas, Julian, Zeliha Oğuz-Uğuralp, and Ahmet Kaan-Uğuralp. 2025. "Emotional Manipulation by AI Companions." Working paper, Harvard Business School. arXiv:2508.19258. 【核对 the HBS working paper number and the exact author spelling】

Federal Trade Commission. 2025. "FTC Launches Inquiry into AI Chatbots Acting as Companions." Press release, September 11, 2025. https://www.ftc.gov/news-events/news/press-releases/2025/09/ftc-launches-inquiry-ai-chatbots-acting-companions.

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
