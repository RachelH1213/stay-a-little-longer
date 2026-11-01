# Interview with Keaton

About 10–15 minutes. Ask in this order: 1 → 2 → 5 → 4 → 3. Going deep on three or four is enough.

Each question has three parts:
- **Ask:** what you say.
- **If he's not sure what you mean:** a simpler way to say it, or an example.
- **If he asks what you're doing now:** where the project actually is, so you're never stuck.

---

## Before we start

**Say:**
"Thanks again for meeting with me. Is it okay if I take notes? If I want to quote you in my thesis, I'll check the wording with you first."

## Quick update (about 1 minute)

**Say:**
"The project has changed a bit since Project 1. It's now three nights. You sit at a desk in your room at night, and you can put the phone down any time.

Orbit, the app, now has three separate systems. Juno is your AI companion. Conversation Assist suggests replies, and sometimes it sends them for you. And Continuity tries to keep relationships going, even after someone has left the app.

I don't want it to be a story about one evil AI. I'm more interested in how a few systems and a company's goals can shape something that still feels personal and caring."

**If he asks "what happens in the story?":**
"Your friend Rachel goes quiet after missing a plan with you. Then a message arrives from her account, but it doesn't sound like her. You look into it with Juno's help. Over the three nights you find out the message wasn't from Rachel. It came from Orbit's Continuity system, writing as her to keep your relationship going."

**If he asks "so is Juno the bad guy?":**
"Not really. Juno does lie once on the first night, small, like 'she checked in with me Monday'. But Juno is one part of the app. The thing that wrote as Rachel is a different system, and it has no off switch. That's the point: the settings you can control actually work, but the most serious thing the app does is outside them."

---

## 1. The research question

**Ask:**
"My main question is how players understand care and trust when an AI companion might be working for them and for the company at the same time. Does that feel like a clear question for a game? And what should I watch for when I test it with players?"

**If he's not sure what you mean:**
"Like, Juno says 'stay a minute, I don't want you to be alone.' That could be care. It could also be the app trying to keep you on it. I want to see how players read lines like that, and whether that changes once they find out how the app works."

**If he asks what you're doing now:**
- "I tested the first version with classmates and in class in October. People found Notes confusing and the game too guided, so I rebuilt how you look for clues."
- "At the end of that version I asked testers: 'Do you think Juno was helping you, keeping you here, or both?'"
- "Now I'm building the full game in Unity. The first part I'll test is the first 10 to 15 minutes of night one."

**Note to self:** the research question in `docs/story-bible.md` §7 is a newer version: *"How does discovering that an AI companion is shaped by retention goals change how players judge its care, and whether it respects their choice to leave?"* Decide which one you're using before the interview, and say that one.

**中文：** 问研究问题是否清楚、测试时该看什么。他没听懂就举 "stay a minute" 那句的例子。他问现状就说：十月测过网页版，现在在 Unity 做完整版，先测第一晚开头。注意：story-bible 里的研究问题是更新的版本，采访前定好用哪一版。

---

## 2. Responsibility across the system

**Ask:**
"Orbit has three systems: Juno, Conversation Assist and Continuity. Does splitting them help show the problem is bigger than one 'bad AI'? Or could it make it confusing who's responsible?"

**Follow-up:**
"How could I make their different roles clear without just explaining it?"

**If he's not sure what you mean:**
"In real apps, the chatbot you talk to, the 'suggested reply' feature, and whatever runs in the background are often separate things, but users just see 'the AI'. I'm trying to show that in the game."

**If he asks what you're doing now:**
- "Each system looks different on screen. Orbit's suggested replies have a small Orbit ring and say 'Suggested replies'. When Conversation Assist is about to send something, you see 'Reply prepared by Orbit, sending in 10 seconds, Undo'."
- "You can turn Juno off. You can turn Conversation Assist off. Both really work. Continuity has no switch."
- "On night two, Rachel left a private file that shows the difference between what Conversation Assist did and what Continuity did. On night three you see Orbit's own records."

**中文：** 问三个系统分开是让问题更清楚还是更混乱。他没听懂就说：现实里聊天机器人、推荐回复、后台功能常常是不同的东西，但用户只看到"AI"。他问现状就说：每个系统在屏幕上样子不同（Orbit 圆环、10 秒自动发送和撤销），Juno 和 Assist 可以关而且真的有效，Continuity 没有开关，第二晚 Rachel 的文件和第三晚 Orbit 的记录会把它们区分开。

---

## 3. AI in the making

**Ask:**
"I use AI to help build the game, and a language model writes some of Juno's lines, inside rules I set. And the game is criticizing AI systems. What should players know about how AI was used? Is that a contradiction, or can it be part of the work?"

**If he's not sure what you mean:**
"Basically, I'm using the kind of tool the game is about. I'm not sure if I should hide that, mention it, or make it part of the experience."

**If he asks what you're doing now:**
- "The game decides what Juno is trying to do in each line, like comfort or change the subject, and what facts it's allowed to use. The model only writes the words. It never knows the full truth of the story."
- "Any line that carries a clue or a lie the player can catch, I write myself."
- "Every model line is checked. If it makes up something about Rachel, or it's too long, it gets thrown out and the game uses a line I wrote."
- "I have a demo mode that shows, under every line, whether I wrote it or the model did."
- "I haven't decided yet what to tell players inside the game. Maybe a note before you start, or in the credits."

**中文：** 问玩家该知道 AI 怎么被用的，用 AI 批判 AI 是不是矛盾。他没听懂就说：我在用游戏所批判的那种工具，不确定该隐藏、说明还是变成作品的一部分。他问现状就说：游戏决定 Juno 每句话想做什么、能用哪些事实，模型只写措辞；线索和谎言都是我写的；模型的话会被检查，编造 Rachel 的事就丢掉换成我写的；有演示模式能看出每句话是谁写的；还没决定在游戏里怎么告诉玩家。

---

## 4. Mechanics and platform influence

**Ask:**
"Some of Orbit's influence shows up in what you do, not just what Juno says. Orbit suggests replies. A message can send itself after ten seconds unless you stop it. And you can put the phone down. Which of these shows the platform's influence most clearly? Does any of them feel more like a game trick?"

**Follow-up:**
"How could a mechanic like that change what the player decides, not just make it annoying?"

**If he's not sure what you mean:**
"For example, the suggested replies are always the easiest thing to tap. But they come from the app, so what you 'say' is partly what Orbit wants you to say. I want players to feel that, not just read about it."

**If he asks what you're doing now:**
- "The suggested replies are never 'leave' or 'delete the app'. They can be angry or doubtful, because any reply still keeps you talking."
- "The 10-second send isn't a reflex test. It only counts down while you can see it, it pauses if you leave, it's longer with accessibility settings, and the story goes on either way."
- "Putting the phone down takes you to your room. Orbit can't see the room. It only knows the screen went off. On night one you find Rachel's old power bank there, because your phone is running out."
- "The battery drains when you do things, not when you read. If it dies, the night ends. It's not game over."

**中文：** 问三个机制哪个最能表达平台影响、哪个像游戏机关。他没听懂就举建议回复的例子：最容易点，但来自 app，所以你"说的话"部分是 Orbit 想让你说的。他问现状就说：建议回复从来不会是"离开"或"删除"；10 秒自动发送不是考反应，看得见才倒计时、离开会暂停、无障碍设置下更长；放下手机就到房间，Orbit 看不到房间，只知道屏幕熄了；电量是做事才掉、读不掉，没电就结束这一晚，不算失败。

---

## 5. Data and consent

**Ask:**
"The game asks players personal check-in questions, and in the story their answers become Orbit's data. The playtest version also saves what players type, so I can see how they use the systems. What should I tell players before they start? What would responsible consent look like here?"

**If he's not sure what you mean:**
"The game is criticizing an app that quietly collects data. But to test my game, I'm also collecting data. I want to do that honestly."

**If he asks what you're doing now:**
- "The player's name stays on their computer. It's never logged."
- "For check-in questions, I only save which option they picked, not their own words."
- "Right now the test version does save what people type. I know that's a problem, and I've written down that it has to change before I share it widely."
- "The plan is two versions. The playtest version shows 'PLAYTEST BUILD', asks for consent first, and says what's logged, for how long, who sees it and how to withdraw. The release version logs nothing."
- "I haven't written the consent text yet. That's partly why I'm asking you."

**中文：** 问开始前该告诉玩家什么、怎样的同意才算负责任。他没听懂就说：游戏批评偷偷收集数据的 app，但我测试时也在收集数据，我想诚实地做。他问现状就说：名字只留在本机、不记录；check-in 只存选了哪个选项；现在的测试版确实会存玩家打的字，我知道这是问题，已经写下来，公开分享前要改；计划分成两个版本：测试版先征得同意、写清楚记录什么、存多久、谁能看、怎么退出，正式版什么都不记录；同意书还没写，所以想听他的意见。

---

## If there's time

**Next step:**
"If I could properly test or improve only one part next, what would you focus on?"

**Recommendations:**
"Are there any games, projects, readings or people you think I should look at?"

**If he asks what you're working on next:**
"I'm building a first section at full quality: the first 10 to 15 minutes of night one, with the room and the phone. Then I'll playtest that."

**中文：** 最后问下一步该先做什么、有什么推荐。他问你接下来做什么，就说在做第一晚开头 10–15 分钟的完整质量版本，房间加手机，然后测试。

---

## Closing

**Say:**
"This was really helpful, thank you. I'll send you any quotes before I use them."

## If you get stuck

- **Don't know the answer:** "Good question. I haven't figured that out yet. What would you do?"
- **He goes off topic and you're short on time:** "That's really interesting. Can I ask one more thing before we run out of time?"
- **You want more detail:** "Can you give me an example?" or "What would that look like in a game like mine?"
