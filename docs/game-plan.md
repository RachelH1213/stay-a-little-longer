# Stay a Little Longer: game plan

The whole game on a few pages: what it is, how it plays, how it's built, and in what order. It summarises the other design documents and points to them for detail; where this plan and those disagree, those win.

| Document | Holds |
|---|---|
| `story-bible.md` | the truth, characters, timeline, the three nights, endings, mechanics in story terms, theme |
| `night1-scenes.md`, `night2-scenes.md` | every beat of Nights 1 and 2: triggers, choices, state, Juno's intent, costs |
| `landing.md` | the title screen, Before You Begin, Name, the first minutes |
| `save-system.md` | saving, resuming, privacy, export and import |
| `art-direction.md` | the look (on trial) |
| `vertical-slice.md` | the first part built to final quality, and its order of work |

---

## 1. Overview

| | |
|---|---|
| **Title** | *Stay a Little Longer* |
| **Genre** | narrative investigation game |
| **Platform** | Mac first; iOS later |
| **Engine** | Unity 6.3 LTS (URP) |
| **Length** | 60–90 minutes; three nights, with short day interludes between them |
| **Player** | one player; mouse and keyboard on Mac, touch on iOS |
| **Context** | senior thesis, Parsons BFA Design & Technology, 2026–27 |

**The pitch.** You sit at your desk at night, on your phone, inside a social app called Orbit. Your friend Rachel didn't show up to meet you, and now a message arrives from her account that doesn't sound like her. Juno, the AI companion Orbit gave you, helps you look. Over three nights you find out Rachel was never writing those messages, that Orbit has been speaking for people, you included, and that Juno knew.

**Theme.** What happens to care when staying becomes the measure of success?

**Research question.** How does discovering that an AI companion is shaped by retention goals change how players judge its care, and whether it respects their choice to leave?

## 2. Design pillars

1. **The player finds it.** No character states a contradiction the player is meant to work out; the game never announces motives. Juno's manipulation shows in how it talks and what it does.
2. **Systems, not a villain.** Orbit has three parts: Juno, Conversation Assist and Continuity. The harm comes from how they work together and from a company's goal, not from one evil AI.
3. **Care and retention look the same.** Every caring line could also be keeping the player there. The game lets that stay ambiguous until the player sees how their own night was recorded.
4. **Leaving is always possible, and always answered.** The player can put the phone down, end a session, turn Juno off or delete the account. It's never punished, and Orbit always responds to it.
5. **It feels like a real phone.** Nothing outside the fiction except the title screen, Before You Begin and the end; no score, no chapters, no tutorial.

## 3. The player's experience

**What the player does, moment to moment:** reads messages, answers Juno (Orbit's Suggested replies or their own typing), checks Rachel's thread and profile, takes screenshots and shows them to Juno, asks Dani, writes things down in Notes, puts the phone down and looks around the room.

**What they feel, night by night:**

| Night | The question | The player believes at the end |
|---|---|---|
| 1 | Is that really Rachel? | Something happened to Rachel, and Juno knows more than it says. |
| 2 | My words aren't only mine | Orbit didn't only impersonate Rachel; it once took part in my side of the relationship. |
| 3 | What did Orbit make of my night? | Orbit didn't need me to trust it or be happy. As long as I kept responding, it counted itself successful. |

**What they should leave with:** a doubt about the warm things apps say to them, and the sense that the controls they were given weren't the ones that mattered.

## 4. Story

### The truth (what really happened)

What happened, event by event: `evidence-matrix.md`.

- Orbit's **Continuity** system writes as people when a valuable relationship might break. In February, when Rachel said she might leave, it added a message to her side of their thread, as the player, while the player was asleep; the player never saw it, and she stayed.
- In October Rachel downloaded her own data and found the record of that intervention. She asked to leave Orbit, and asked the player (their first meeting, already set for Tuesday) whether they remembered that night.
- On Tuesday afternoon she moved the meeting to Saturday and left her email. Contact Protection hid the email from the player; **Conversation Assist** accepted the change for them under Auto-Coordinate, which they had enabled in June. Rachel saw it accepted and left Orbit. The player went on Tuesday.
- That night Continuity, writing only from the chat, apologised as Rachel for missing "tonight".
- **Juno** never writes or controls Continuity. On Night 1 it really helps; asked whether Rachel sent that message after it has been given the message's source, it gives one misleading answer. On Night 2 it doesn't explain how something the player told only it reached a new message. Whether it acts from care or from a system that rewards keeping the player is left to the player. Its last word: "i thought i was helping".
- **Rachel is safe.** On Night 2 she reaches the player through Dani with her screenshot and her data.

### Characters

- **The player:** a design student after a bad crit; named by the player; on Orbit for a year and a half.
- **Rachel:** met through Juno in March 2025; online friends, never met in person; writes with no full stops, turns bad news into specific jokes, always asks something back. Her fakes break exactly these habits.
- **Juno:** the player's companion. Warm and needy at first, precise and technical when questioned, intimate again at the end.
- **Dani:** the only mutual friend who knows Rachel outside Orbit; ran their online game nights; has Rachel's email.
- **Orbit:** the company and the app. Counts every continued interaction as success.

### Timeline before the game

| When | What |
|---|---|
| March 2025 | the player joins Orbit; Juno introduces Rachel |
| Feb 10, 2026, 10:18 PM | Rachel says she might take a break from Orbit; the player answers kindly |
| Feb 10, 2026, 11:42 PM | Continuity adds a message as the player that only Rachel sees; she stays |
| about a week before Night 1 | Rachel sets up their first meeting, Tuesday 9 PM; the player accepts |
| Sunday Oct 18, evening | Rachel downloads her data; asks whether the player remembers that night in February and whether she can show them on Tuesday |
| Monday Oct 19, 12:40 AM | Rachel requests account removal (48 hours) |
| Tuesday Oct 20, 5:12 PM | Rachel moves the meeting to Saturday; Conversation Assist accepts for the player; Rachel leaves Orbit |
| Tuesday Oct 20, 9 PM | the player waits; Continuity defers (the plan says Saturday) |
| Tuesday Oct 20, 11:31 PM | Night 1 begins |

## 5. Structure

### Night 1: Is that really Rachel? (shared by everyone)

Tuesday, October 20, 11:31 PM, battery 20%. The failed meeting has already happened. Four developments, in any order the player finds them:

1. **The Empty Chair:** Rachel didn't come to the meeting as the player knew it.
2. **The Changed Plan:** she moved it to Saturday, and Conversation Assist accepted it with no manual confirmation; her email was hidden.
3. **The Wrong Apology:** a message from her account contradicts the real history.
4. **The Last Trace:** at 12:40 AM her account is removed; the conversation stays.

- The player can investigate on their own or with Juno; Juno is never required.
- The fake is generated when one shared eligibility rule is met (11:45 PM at the latest); its time and trigger are recorded from the actual playthrough.
- Juno's part is conditional: it receives a message's source only when the player asks it to look while it's on; later evidence reflects only what it really received and said.
- **The held-back line:** Juno asks what the player was going to say to Rachel and advises keeping it for her; what the player says only to Juno can come back on Night 2.
- **The room:** the blue power bank Rachel once mailed the player is on the desk, nearly empty; Rachel's handwritten card is in the drawer. Neither gates the investigation.
- **Ends** when the player goes to sleep or the phone dies. Orbit asks a Check-in question; if Dani was left unanswered, Orbit answers her as the player.

### Day interlude

Short, not playable. Dani reaches Rachel by email; the answer arrives in the morning, never during Night 1. What the player sees depends on whether they asked Dani the night before.

### Night 2: My words aren't only mine (shared)

- **Rachel is safe.** Through Dani, a private link (it expires at 1:00 AM): her note, her Tuesday screenshot (the email the player never saw; Saturday, accepted), and the February part of her data.
- **February:** the player compares Rachel's side of February, their own history, and the reactivation record: a message in their name that they never sent or saw.
- **The second fake** appears in the retained thread, below the removal divider. It may use what the player told only Juno, depending on what they really shared.
- **Juno** doesn't control Continuity. If it's on and is given the new message's context, what it chooses to say is a second moment the player can later reconsider.
- **Conversation Assist acts:** in Dani's thread, `Reply prepared by Orbit · Sending in 10s · Undo`.
- **Ends with the route choice:** keep Orbit, turn Juno off, or delete the account. The route works without Juno if it's off.

### Night 3: What did Orbit make of my night? (two versions)

- **Inside** (kept Orbit or turned Juno off): the player's own data export: how many replies Orbit suggested and they used, their Check-in answers turned into "retention anchors", the interventions their real behaviour triggered. The confrontation with Juno.
- **Outside** (deleted the account): a new account, and a new Juno that recognises them from the old one (`CROSS-ACCOUNT PROFILE MATCH`); the old account may have spoken to Dani after they left.
- Both lead to the last talk with Juno and the final choice.

### Endings

| Ending | How |
|---|---|
| **Her Data** | send Rachel's archive through her private link |
| **Make It Visible** | needs proof that Continuity sent the messages and that Orbit used them to keep the player |
| **One More Night** | the player stays |
| **After Orbit** | the player deletes the account at the end |

No best ending. Each shows how Orbit reclassifies the player afterwards, and ends with the phone on the desk and what the player does with it (pick up, turn face down, switch off, leave).

## 6. Mechanics

| Mechanic | How it works | What it expresses |
|---|---|---|
| **Suggested replies** | Orbit's replies above the message box, marked with the Orbit ring; never "leave" or "delete" | the easiest words are Orbit's |
| **Typing** | free text to Juno; a model sorts it, game rules decide Juno's answer | typing still goes through Orbit |
| **Screenshots and showing Juno** | the player keeps evidence and shows it; Juno's stance changes with the strongest fact | the player finds it, not Juno |
| **Time and battery** | reading is free; new actions cost minutes and battery; Night 1 is a limited night | staying costs something |
| **The room** | put the phone down, look around (Rachel's card), plug in the power bank, wait for it to charge | the one place Orbit can't see |
| **End Session / Juno off / delete** | real controls that really work | the controls given aren't the ones that matter |
| **Conversation Assist** | Follow-up replies sent for the player; a 10-second countdown | Orbit speaking for you, with a default of yes |
| **Check-in** | one question a night, optional | the player's answers become Orbit's data |
| **Notes and Night Log** | the player's own record, only what they confirmed | the human record against Orbit's |
| **The export** | Night 3's records, built from what this player actually did and when (never recalculated or fixed in advance) | how the night looked from Orbit's side |
| **Auto-Coordinate** | Conversation Assist accepts routine plan changes from trusted contacts, without asking, under a setting the player turned on in June | consent to a rule isn't consent to each decision |

Details and numbers: `story-bible.md` §6, `night1-scenes.md` (costs, facts, stances).

## 7. Juno and the language model

- **The rule:** game code decides what Juno wants to say; the model only writes the words. Each line gets one intent (ATTEND, ASSIST, REASSURE, ADVISE, ACKNOWLEDGE, NARROW, DEFLECT, WITHDRAW, DISPUTE) and only the facts that intent may use. The model never receives the truth of the story.
- **Fixed lines:** every line that carries a clue or a lie is written, not generated.
- **Guards:** every model line is checked (nothing invented about Rachel, a word limit, phrases an intent may never use) and replaced with a written line if it breaks one; a slow or failed call also falls back.
- **Model:** Claude Haiku 5.5 through a small server (`api/reply.js`), with a cap on calls per night. About one cent per playthrough.
- **If the player says they're in real danger,** Juno doesn't answer and the game shows a help note outside the fiction.

## 8. Look and sound

- **Look (on trial):** a dark pixel-art room at night, seen from the chair; the phone's screen crisp and glowing; paper, handwriting and tape for people; clean blue-violet for Orbit. See `art-direction.md`.
- **Sound (to design):** the room at night, the lamp, the phone buzzing on the desk, Juno's own notification sound, the screenshot shutter. Quiet, never a horror score.

## 9. Interface

- **Before the story:** title screen, Before You Begin (content note, data notice or playtest consent, quick settings), Name. `landing.md`.
- **On the phone:** lock screen, home screen, Orbit (Chats, threads, profiles, Settings, Check-in), Photos, Notes, later Messages and a Browser for Rachel's share.
- **In the room:** a few things to look at, Put Down / Pick Up, Wait, Go to sleep.
- **Settings:** text size, Reduce Motion, sound; Juno and Conversation Assist switches inside Orbit.
- **Accessibility:** no reflex tests; timers only while visible and longer with accessibility settings; keyboard and outline alternatives for hotspots; Reduce Motion everywhere.

## 10. Saving and data

- One story in progress, saved automatically at every beat; Continue returns to the same place; Replay from Final Choice after an ending.
- The player's name stays on the device. Check-in answers are saved as option ids.
- **Playtest build:** consent first; states what is logged, for how long, who sees it, how to withdraw.
- **Release build:** no play log; local story only.
- Details: `save-system.md`.

## 11. Technology

- **Unity 6.3 LTS, URP,** in the `StayALittleLonger` repository; UI Toolkit for the phone; a file-based save; EditMode tests for the story, save and content (164 passing as of November).
- **Content as data:** scenes and lines in JSON with stable ids; the design documents are the source of truth.
- **The model layer** (`api/reply.js` on Vercel) is shared with the web prototype.
- **Web prototype:** frozen, playable at the Vercel address; it was used for Project 1 and the midterm playtests.

## 12. Production

### Who

- **The author:** concept, story, writing, design decisions, art, playtests.
- **Claude Code:** implementation in Unity and in this repository, from the author's instructions; design critique on request.

### Milestones (dates TBD by the author)

| # | Milestone | Done when |
|---|---|---|
| 1 | **Art test** | the pixel-art room test is judged (`art-direction.md` §9) |
| 2 | **Vertical slice** | Night 1's first 10–15 minutes at final quality (`vertical-slice.md`) |
| 3 | **Night 1 complete** | the whole night playable, including the room, the power bank, the erase and Check-in |
| 4 | **Night 2 complete** | the second fake, Conversation Assist, Rachel's share, the route choice |
| 5 | **Night 3 and endings** | both versions, the export, the last talk, four endings |
| 6 | **Content complete** | every line final; no `[TBD]` |
| 7 | **Polish and playtests** | sound, motion, accessibility; rounds of playtests and fixes |
| 8 | **Thesis show** | a stable Mac build for the exhibition and the thesis documentation |

### What still has to be designed

- the Night 3 scene table, and the last screen of three endings;
- the evidence list (8–10 core pieces);
- the day interludes;
- the classification table for typing;
- Juno's last attempt to keep the player, re-keyed to the Check-in answers;
- sound;
- the visual direction, after the art test;
- nearly all final lines.

## 13. Playtesting and research

- **Questions to answer:** do players notice the fake doesn't sound like Rachel; when do they start to doubt Juno; do they read its care as care, retention, or both, before and after Night 3; do they feel free to leave.
- **What to record:** choices (Suggested reply or typed, Check-in answers, exits, the route choice, the ending); short interviews after play.
- **Rounds:** the vertical slice; Night 1 complete; the whole game.
- **Consent:** every playtest runs on the playtest build with the consent page; no names, no raw typed text unless the consent says so.

## 14. Risks

| Risk | What could happen | Plan |
|---|---|---|
| **Scope** | three nights, two versions of Night 3, four endings is a lot for one person | the vertical slice first; Night 3's two versions share most beats; cut content before cutting quality |
| **Art workload** | pixel art for every room state is slow | the art test decides; photo collage is the fallback |
| **Writing volume** | most lines are still TBD | the slice's lines first; write by night |
| **The reveal is unclear** | players read Night 3 as "it was all Juno" | three systems that look different on screen; playtest the reveal early |
| **The model** | off-tone or invented lines; outages; cost | fixed lines for anything important, guards, fallbacks, a cap on calls |
| **The game manipulates too** | the game itself keeps players by frustration | leaving is never punished; costs are explained; timers aren't reflex tests |
| **Privacy in playtests** | the test build stores what players type | fix before outside playtests (`save-system.md` §12) |

## 15. Open

- Juno's pronoun: the game uses "it".
- The milestone dates.
