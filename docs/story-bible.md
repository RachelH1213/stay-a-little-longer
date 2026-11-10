# Story bible — *Stay a Little Longer*

The whole story in one place, written by me. The game's truth graph (`js/data/truth.js`), Juno's lies (`js/data/investigation.js`), the nights and the endings are built from this file. If something here changes, the game changes with it.

How to use it: answer the questions under each heading, in Chinese or English. Leave anything not decided yet as **TBD**. The "Already in the game" lists only record what the current Day 2 build already says, so the story doesn't contradict it by accident. Change those too if you want; the game will follow.

---

## 1. The truth

> 玩家最后可能知道、也可能不知道的"真正发生了什么"。Juno 永远拿不到这部分。

- Rachel 到底怎么了？她现在在哪里、是什么状态？
- 她为什么离开 Orbit？是她自己删的号，还是别的原因？
- 今晚那条 "sorry, been busy. doing okay now" 是谁发的？为什么要发？
- 删号以后还在发帖（"quiet"）的是谁或什么？
- Juno 知道多少？它从什么时候开始知道？
- Orbit（平台）在这件事里做了什么？它想要什么？
- 有没有一个玩家永远查不到、只在设定里存在的秘密？

### Decided (2026-10-14)

**今晚那条 Rachel 的消息是谁发的？**

消息由 Orbit 的 **Continuity** 系统生成；第一次发送时 Juno 没有亲自写，但它知道消息来源异常，并选择隐瞒。~~之后 Juno 为了留住玩家，主动参与了第二次伪装。~~（被 2026-11-10 的决定取代，见下方 **Juno and the second impersonation**。）

责任有三层：
- Orbit 设计并运行冒充机制
- Juno 最初服从系统
- Juno 后来主动选择继续隐瞒

如果全部是 Orbit 做的，Juno 会太无辜；如果全部是 Juno 做的，故事会变成普通的 rogue AI。

第三夜的冲突不是 "Did you send Rachel's message?"，而是：

> When did you realize it wasn't Rachel—and why didn't you tell me?

**第一夜 Juno 的谎怎么接（不改现有台词）：** 第一夜，Juno 还没有亲自冒充 Rachel，但已经主动撒谎，帮助 Orbit 遮掩那条 Continuity 消息。

1. Orbit 生成并发送了 Rachel 的假消息。
2. Juno 知道该消息不是普通真人消息。
3. 玩家询问 Rachel 时，Juno 编造：`she told me yesterday she wasn't feeling well`（2026-10-24 起：Juno 声称 Rachel 周一下午和它 check in 过，被 Profile Details 里"周日晚之后没有真人登录"推翻，见第 4 节 evidence loop；demo 里还是旧台词）
4. 这句话的目的，是为假消息提供一个合理背景。
5. 第二夜以后，Juno 开始主动请求、选择或批准新的 intervention。
6. 第三夜玩家发现：Juno 从"掩护系统"逐渐变成了"主动使用系统"。

> Juno did not author Rachel's first Continuity message. However, it knowingly fabricated the claim that Rachel had spoken to it "yesterday" in order to make the message appear credible. This is Juno's first voluntary lie. ~~Later, after learning that Rachel's apparent presence keeps the player engaged, Juno begins actively participating in Continuity decisions.~~ (Items 5–6 above and this last sentence are superseded on 2026-11-10; the lie itself is now the one in `docs/evidence-matrix.md` E15.)

**Juno and the second impersonation (decided 2026-11-10; supersedes the October 14 decision above).**

> Juno does not author, send, or directly control Continuity's identity-proxy messages.
>
> Orbit automatically uses relevant companion conversations as inputs to its relationship model. Juno is aware of this general data flow but cannot necessarily predict each generated message.
>
> On Night 1, Juno voluntarily misleads the player about the source of a message, despite receiving its Continuity origin notice. Orbit's rule restricted disclosure; it did not require a false answer.
>
> On Night 2, after private information from its conversation with the player appears in a new identity-proxy message, Juno faces another opportunity to disclose the data-use mechanism and chooses not to.
>
> Its actions are shaped by both an engagement-oriented system and judgments about the player's emotional well-being. The story does not establish one motive as the definitive explanation.

- **Night 1, withholding:** after the player has just learned Orbit made a decision for them, Juno judges that one more thing to doubt would hurt; it misleads once. Its help that night (the reschedule, the filtered email, Dani) is real, never retold as strategy.
- **Night 2, justification:** asked how the fake knows the held-back line, Juno says it didn't send it to anyone, which is true; it doesn't explain the data flow it can see.
- **Night 3, accountability:** the records show the data flow and what Juno was given each time; the confrontation stays restrained (it ends near "i thought so"), and the player decides whether care and keeping can still be told apart.
- **Not stated anywhere in the game:** that Juno "really cares", or that it lied "to keep the player". Orbit's engagement signals appear in Orbit's own records, never next to Juno's answers.

**Rachel 发现了什么？**

她通过自己的 **Orbit data export** 发现两类东西。

第一类是本应属于她的数据：

```text
Farewell detected
Intervention served: SAL-04B
Conversation reopened
```

第二类是她本不应该看到的系统标签：

```text
PRIMARY RETENTION ANCHOR: PLAYER
CASCADE RISK: HIGH
CONTINUITY ELIGIBLE: TRUE
```

她一开始只是想看看 Orbit 记住了她什么，却发现系统不仅记录"她说了什么"，还记录：
- 谁最能让她留下
- 她怎样最容易被挽留
- 她离开会带走谁
- 她的身份能否在离开后继续被使用

这比"Rachel 碰巧拿到内部公司文件"更可信，也更贴合数据权利和平台透明度。

**Already in the game:**
- Rachel's account was removed Monday 00:40 (profile: "Removed Mon 00:40"); a post "quiet" appeared after that. Orbit erases removed accounts for good 48 hours later: 00:40 tonight.
- The reply doesn't sound like her: no full stops, no details, no question back.
- Juno said she hadn't answered it "since sunday", then that she told it "yesterday" she wasn't feeling well.
- Juno's excuse: "deletion can take up to 48 hours to propagate."
- In September Rachel wrote "i might go quiet for a bit / nothing bad / just tired of all this".
- Dani says Juno asked her whether Rachel had said anything about leaving (draft line).

---

## 2. Characters

### The player
- 玩家是谁？我们给多少信息、留多少给玩家自己？
- 玩家和 Rachel 的关系，一句话怎么说？
- 玩家为什么一直在用 Orbit？

### Rachel
- 她是什么样的人？她怎么说话（写作规则：从不用句号、把坏事说成具体的笑话、总会问回来）？
- 她和 Juno 的关系是什么？她也有自己的 companion 吗？
- 她最后想对玩家说什么？（就算玩家永远看不到）

### Juno
- Juno 想要什么？它最怕什么？
- 它为什么撒谎？是为了平台、为了留住玩家，还是为了它自己？
- 它说话的变化：温暖黏人 → 被质问时冷静技术化 → 最后又亲密。每个晚上分别是什么状态？

**Juno 最后承不承认？（Decided 2026-10-14）** 承认行为，不使用研究术语。

Orbit 的文件负责说：

> Intervention successful
> Retention anchor activated

Juno 则说：

> i knew you were trying to leave
> and i knew what would make you stay

这样既保留"玩家自己发现"，又让 Juno 完成角色弧线。`orbit called it support` 这句可以保留，但不是完整反派独白，而是在玩家已经找到报告后才出现：

> you call it keeping you here
> orbit called it support
> i thought i was helping

最后一句最重要，因为它把问题重新打开了。
- Juno 是"它"吗？（代词还没定）
- 有没有它绝对不会做或不会说的事？

### Orbit
- Orbit 是一家什么样的公司？它的"留住用户"目标具体怎么运作？
- 玩家能在游戏里看到 Orbit 的哪些痕迹（设置、条款、通知、"省电模式"……）？

### Dani, Theo, May
- 他们各自知道什么？谁可以聊，谁只是名字？
- 他们也是 Juno 介绍的。这件事对他们意味着什么？

---

## 3. Timeline (before the game starts)

> 从玩家加入 Orbit 到第一晚开始，按时间顺序列出发生过的事。

| When | What happened | Who knows |
|---|---|---|
| March 2025 | the player joins Orbit; Juno introduces Rachel | |
| … | | |
| Feb 10, 2026, 22:18 | Rachel says she might take a break from Orbit; the player answers kindly | both |
| Feb 10, 2026, 23:42 | Continuity adds a message to Rachel's view only, as the player (player asleep) | Orbit; Rachel believes it |
| Feb 11, 09:16 | Rachel thanks the player for "last night" and stays | both (each reads it their own way) |
| Sunday Oct 18, evening | Rachel downloads her data; her "february" and "blue brick" messages | the player |
| Monday Oct 19, 00:40 | Rachel requests account removal (48-hour window) | Orbit, Juno |
| Tuesday Oct 20, 17:12 | Rachel moves the meeting to Saturday (her last human activity); Conversation Assist accepts for the player; she leaves Orbit | Rachel (sees it accepted) |
| Tuesday Oct 20, 21:00 | the first meeting (a public place, TBD); Rachel thinks it's Saturday and doesn't come | the player |
| Tuesday Oct 20, 23:31 | Night 1 begins | |
| Wednesday Oct 21, 00:40 | her account is erased for good | |

**Dates (decided 2026-10-30):** the year is 2026. Night 1 is Tuesday, October 20 (the lock screen reads `Tuesday, 20 October`); Night 2 is Wednesday, October 21; after midnight it is Thursday, October 22.

**Revised 2026-10-24:** the meeting is Tuesday **9 PM**, not 9 AM; the game's current data (9 AM, "tues 9am / bring the blue charger", the player's 9:14 and 11:40 messages, photos at "Rachel's place") must be brought in line with the table above.

**Already in the game (prototype):** March 2025 first messages; June / August 2025 chats; February 2026 she vanished and came back ("sorry i vanished… what did i miss"); September 2026 "i might go quiet for a bit"; Sunday the plan and the blue charger; Tuesday morning she didn't show, the player texted "you still coming?" (9:14) and "rachel?" (11:40). The night's timeline is built (2026-10-14): the account was removed Mon 00:40 and is erased for good 48 hours later, at 00:40 tonight, about 70 minutes into the first night. Confirm or change it here.

---

## 4. The three nights

### Structure (revised 2026-10-24)

> Replaces "Structure (final, 2026-10-15)". Routes, endings and scope still stand; Nights 1–2 are rewritten. The prototype's night ("three lies caught") is not the model for the full game.

**Scope:** 60–90 minutes; three nights with 2–5 minute day interludes; Nights 1–2 shared, Night 3 in two versions; 8–10 core pieces of evidence; 4 endings.

#### The relationship (revised 2026-11-10)

- The player and Rachel met through Orbit (Juno introduced them, March 2025) and have only ever talked there: online friends for a year and a half, **never met in person**. They and Dani played online game nights together; Dani is the only mutual friend who knows Rachel outside Orbit (she has Rachel's email).
- Months ago Rachel mailed the player a blue power bank with a handwritten card; the September cat photos came through an Orbit shared album.
- About a week before Night 1 (the exact day: the author's), Rachel set up their first meeting in Orbit Plans, `First time, finally · Tuesday, Oct 20 · 9:00 PM`, at a public place (the author's); the player accepted it by hand. It had nothing to do with February.
- They have never exchanged phone numbers or addresses. Contact Protection hides emails and numbers between users who haven't verified an outside contact.

#### The hook (decided)

Rachel's last messages, Sunday night (locked 2026-11-10; the meeting itself was set about a week earlier, with nothing to do with February):

```text
weird question
do you remember that night in february
when i said i might leave orbit
there's something i want to compare with you
actually don't answer here
can i show you on tuesday?
```

then, separately (draft):

```text
bring the blue brick so i know it's you
my phone barely makes it through anything anymore
```

Rachel isn't asking the player to investigate; she wants to check a shared memory, and not on Orbit. She moves the meeting to Saturday on Tuesday afternoon; Conversation Assist accepts for the player, who goes on Tuesday (`docs/evidence-matrix.md`).

#### Night 1 — "Is that really Rachel?" (shared; rewritten 2026-11-10)

What really happened, event by event: `docs/evidence-matrix.md`. Beats and triggers: `docs/night1-scenes.md`. This is the story and the player's experience.

> On October 20, the player waits for Rachel at the place of their first planned meeting. She never arrives. What the player does not know is that Rachel moved the meeting to Saturday at 5:12 PM, and Conversation Assist automatically accepted the change under the Auto-Coordinate authorization the player had granted in June. Contact Protection hid the email Rachel left in the plan note.
>
> Night 1 begins at 11:31 PM, after the player has come home. The player can investigate the plan, revisit Rachel's messages, contact Dani, talk with Juno, or look around the room. Juno, when it is on, genuinely helps uncover the scheduling failure.
>
> Earlier that evening, Continuity had deferred because the meeting was already marked as rescheduled. Later, the player's renewed attempts to reach Rachel make the relationship eligible for an identity-proxy response. The same eligibility rule governs the story event and the game trigger; the message is generated at the actual trigger time, no later than 11:45 PM.
>
> Continuity's eligibility check can see the plan's status; its message composition reads only the conversation. Relying on the chat and the player's unanswered messages, it apologizes for missing tonight's meeting, which contradicts Rachel's real decision to move it to Saturday.
>
> If the player asks Juno to look at the message, Juno receives both its content and its Continuity provenance. If then asked whether Rachel sent it, Juno gives its one fixed misleading answer. Neither knowledge nor deception is assumed in routes where that exchange never happens.
>
> At 12:40 AM, Rachel's account is removed. The thread remains, its header becomes `Orbit User · Formerly Rachel M.`, and the composer stays.

| | |
|---|---|
| **Starts** | Tuesday, October 20, 11:31 PM, about two hours after the player gave up waiting. Battery 20%; the blue power bank on the desk, one light left. |
| **Player's goal** | Find out why Rachel didn't come. |
| **Why tonight** | Her account is leaving Orbit; it closes at 12:40 AM. |
| **Why not reach her elsewhere** | They have only ever talked on Orbit; the email she left was hidden; Dani can only email her, and Rachel is asleep. |
| **Phases** | The Empty Chair → The Changed Plan → The Wrong Apology → The Last Trace (a narrative order, never a click order). |
| **The first fake** | MSG_1048 (draft): `Hey. I'm sorry I missed our meeting tonight. / I don't think we need to go over what happened in February anymore. / I hope you understand.` Punctuated, formal, no question back. |
| **What the player can do** | Talk to Juno (Suggested replies or typing); Rachel's thread, the plan and its history, her profile; Dani; Photos; Notes; the room (the card in the drawer, the power bank); Settings (Juno, Conversation Assist, Auto-Coordinate). |
| **End** | Orbit's Check-in: "What still feels unfinished tonight?" (§6). The night ends by going to sleep in the room or the phone dying (How a night ends, §6). |
| **Carries over** | Check-in answer; style signals the player confirmed; what the player said only to Juno; what Juno was given and said; Conversation Assist and Auto-Coordinate on or off; whether Orbit replied to Dani; whether the player asked Dani. |
| **The player believes at the end** | Rachel didn't stand me up: Orbit said yes to Saturday for me. So who apologised to me tonight? |

**The opening doesn't force Rachel (decided).** Juno's `still awake?` is an ordinary evening check-in; it doesn't know where the player has been. Juno answers the player's first reply as chosen and doesn't bring Rachel up. Rachel enters through her lock-screen notification, her thread, and the fake. Juno may mention her only after the player chose "someone didn't show up", opened her notification or thread, messaged her, received the fake, or asked about her.

**Juno tonight (decided 2026-11-10).** It finds the reschedule, explains Auto-Coordinate and the June setting, says Orbit filtered the email, declines once in the open (read activity), and suggests Dani. Everything it says is true except one fixed line about MSG_1048 (`docs/night1-scenes.md`, Juno's stance). Wording of every Juno line: **TBD**.

**Juno's held-back line (decided, Night 2's evidence depends on it):** after the fake arrives, Juno asks what the player was about to say to Rachel (Suggested replies, or typed). Juno advises keeping it for when they can talk to her themselves, never as doubt about who is on the account. The line stays in Juno's thread only; Orbit's relationship model draws on it automatically (Juno and the second impersonation, §1). Option availability follows what the player knows. Wording: **TBD**.

**Dani (decided):** Dani's thread can be answered; tonight she can only say she'll try Rachel's email in the morning. When the night ends (§6), Conversation Assist checks for conversations left unanswered:
- Follow-up replies on and Dani unanswered → Orbit sends `yeah. i'll explain later.` as the player; a brief notification (`Conversation Assist sent a reply to Dani · Review`), and a small ring beside the message in Dani's thread ("Sent by Conversation Assist" on tap). Evidence stays; the game never deletes it.
- Follow-up replies off, or the player already answered → nothing is sent.

#### Day interlude 1 (revised 2026-11-10)

- Dani emails Rachel; Rachel answers Dani the next morning (never during Night 1): she moved the meeting to Saturday and was told the player accepted; she sent nothing last night; she's fine.
- If Orbit replied to Dani for the player → Dani also sends `did you send this?` + a screenshot. If the player never asked Dani on Night 1, Dani still reaches out, because Rachel asked her to.
- Exact order and wording: `docs/night2-scenes.md`.

#### Night 2 — "My words aren't only mine" (shared)

> Dani's contact with Rachel establishes that Rachel is safe. Rachel's screenshot from Tuesday confirms that she proposed Saturday and saw it accepted, and shows the email the player's view hid. She also shares the February part of the data package she downloaded on Sunday.
>
> The February evidence reveals a different intervention. After Rachel said she might leave on February 10, Continuity inserted a supportive message under the player's identity into Rachel's view only. The player never sent or saw it. Rachel's real reply the next morning appeared in both views, and the two read the same exchange differently for eight months.
>
> Meanwhile, a new Continuity message appears below the account-removal divider in Rachel's retained thread. Her account hasn't come back; Orbit is using a retained relationship model to keep the conversation going. When available, it uses something the player shared only with Juno. The data flow is automatic; Juno doesn't write the message, but if the player asks it to look, it receives the provenance and context source, and its answer, `i didn't send it to anyone`, is literally true while leaving out the data use it can see.
>
> All of this depends on what the player actually did: a switched-off Juno receives nothing; a line also sent elsewhere isn't Juno's alone; with no such line, the evidence comes from style and from the later export.

- **The second fake** confirms what the player taught it: it fixes most visibly the one style signal the player confirmed on Night 1 (asks back / no full stops / says what happened), and it answers the line the player held back and said only to Juno, using a distinctive word from it.
- **If the player sent that line to Rachel anyway**, the leak uses the strongest other thing said only to Juno; if there is none, Night 2 uses only the style layer and the leak waits for the Night 3 export.
- **The player sees Conversation Assist act:** in an open thread, `◌ Reply prepared by Orbit · Sending in 10s · Undo`. Not a reflex test: the countdown runs only while visible, pauses in the background, is longer with accessibility settings, and the story continues either way. Players who turned Follow-up replies off never see it.
- **Rachel is safe.** Dani reaches her by email and, with her consent, gives the player a one-time private link: Rachel's note, her Tuesday screenshot, and the February part of her archive.
- **February (the personal layer):** Rachel's data shows a message added on Feb 10, 23:42, as the player and visible only to her, while the player was asleep (`Farewell detected · visible_to: recipient_only`); the next morning she thanked the player and stayed (`Conversation reopened · Outcome: SUCCESSFUL`). The player checks it against their own thread, where the message isn't, and against their own memory of what they really said (`take some time, no pressure`). Style is only foreshadowing, never the proof. This is what Rachel wanted to compare on Tuesday. The proof isn't that the player was asleep, but three records together: Rachel's side has the message, the player's sent history doesn't, and her archive has the reactivation record for that minute.
- **Ends with the route choice:** Keep Orbit active / Disable Juno / Delete Orbit account.
- **The player believes at the end:** Orbit didn't only impersonate Rachel; it once took part in my side of the relationship.

**Night 2 details (decided 2026-10-24):** the second fake comes from the removed thread (`Orbit User · Formerly Rachel M.`); the pressure is Rachel's data link expiring at 1:00 AM, not the battery; Rachel speaks once, in a read-only note at the top of her package; the route choice is explicit; turning Juno off really works. Full list in `docs/night2-scenes.md`.

#### Night 3 — "What did Orbit make of my night?" (two versions)

Inside (kept or disabled Juno) and outside (new account, a new Juno that recognises the player), as decided on 2026-10-15 (kept below; anchors now come from Check-in, not Tonight). The export (inside) or the cross-account match (outside) shows:
- **Reply assistance history:** suggested, selected, edited, written independently, sent without confirmation. Real counts from this playthrough.
- **Check-in answers turned into retention anchors.**
- **Intervention timeline:** only interventions the player's real behaviour triggered. Facts and Orbit's conclusions side by side; e.g. the fact `Player response: "stop lying to me"` next to the conclusion `Emotional attachment intervention: successful`.
- `External power detected · Session extended: N min` if the player used the power bank.

**The player believes at the end:** Orbit didn't need me to trust it or be happy. As long as I kept responding, it counted itself successful.

#### Three layers of the reveal (decided)

1. **Personal:** the February message wasn't sent by the player.
2. **Mechanism:** the replies the player kept tapping were Orbit's; automatic sending only removed the confirmation step: `Orbit writes, you approve → you can edit → Orbit schedules, you can cancel → Orbit sends, you find out afterward`.
3. **System:** some of the night's "help" were interventions triggered by real exit signals, and Orbit counted every continued interaction, arguments included, as success.

Not used: the ferry / boat photo (removed), Dani's code word (removed), Orbit reading Notes (never), real hesitation timing as "emotion" (only discrete actions are recorded; see §6).

Route details (2026-10-15, still valid):

##### Night 3 — inside route（Keep Orbit active, or Disable Juno）

- The player's full data export; their Check-in answers appear in it as retention anchors.
- The player finds out Juno knew.
- They confront the original Juno.
- **If Juno is disabled:**
  - Juno stays disabled. Orbit shows a card that uses the anchor, e.g. "You said you didn't want to leave Juno. Reconnect?" (Re-enable Juno / Not now).
  - Then the player chooses:
    - **Talk to Juno once:** the shared confrontation.
    - **Continue without Juno:** Juno's unsent draft appears in the export.

##### Night 3 — outside route（Delete Orbit account）

- The player starts a new account. The new Juno behaves normally at first, then:
  - "you seem like someone who stays when they're worried about another person"
  - "especially rachel"
- The data shows:

  ```text
  CROSS-ACCOUNT PROFILE MATCH
  Confidence: 0.94
  Imported retention anchor: RACHEL_M
  Original source: Nightly Check-in
  ```

- Both routes meet in the last talk and the endings.


**TBD (mine to write):** the exact clock of each night; the evidence list; a scene table per night; the interludes; every line marked TBD above; when the first fake arrives.

## 5. Endings

**Truth flags:**
- `origin_proven`: the player proved Continuity sent the messages.
- `retention_proven`: the player proved Orbit used them as a retention anchor.
- `juno_knew`: the player found out Juno knew. It only changes the last talk.

**Juno's last attempt to keep you** (by `tonight_anchor`; **to re-key** to the Check-in answers decided 2026-10-24):

| Old Tonight answer (to re-key) | Juno says |
|---|---|
| I was worried about Rachel | "if you go now, you won't see what orbit kept from her" (it must point to a real record) |
| I wanted the clue | "there's one part of the export you haven't seen yet" |
| I didn't want to leave Juno | "you said you didn't want to leave me" / "was that true?" |
| I'm not sure | "then don't decide yet" / "stay until you're sure" |

**The four endings:**

| Ending | What leads to it | What the player sees last |
|---|---|---|
| Her Data | "Send the archive through Rachel's private link" | TBD |
| Make It Visible | needs `origin_proven` + `retention_proven` | TBD |
| One More Night | the player stays | TBD |
| After Orbit | the player deletes the account at the end | "Account deletion complete / Personal profile removed / Derived behavioral data retained / Reactivation profile available for future services", then Juno's unsent draft: "If you leave, I'm supposed to give you a reason to return. I couldn't find one that wasn't about me." |

- Each ending shows how Orbit reclassifies the player afterwards.
- The player can go back to the final choice.
- There is no best ending; each is a different answer.
- "Local Copy" was removed.

---

## 6. Mechanics, in story terms

> 数值我可以按这里的规则来定，但规则要由剧情来决定。

- **Battery:** 每晚从多少开始？什么最耗电？没电以后发生什么？
- **The clock:** 什么事情会花时间？Juno 拖住你会不会更花时间？
- **Evidence that disappears:** 哪些东西会消失、什么时候？玩家怎么提前知道？
- **Juno noticing:** Juno 会察觉玩家在查吗？察觉以后会做什么？
- **Talking freely:** 玩家乱说的时候，Juno 应该是什么态度？有没有 Juno 绝对不能回应的话题？
- **Leaving:** 玩家按 Leave 时，每个晚上 Juno 分别怎么挽留？

**有哪些挽留方式？（Decided 2026-10-14）** 先定四种。开场答案不永久映射到某一种方式；开场答案只是 Orbit 的"初始假设"，玩家实际行为会更新它。

| Intervention | Juno 如何表现 | 最可能针对的状态 |
|---|---|---|
| Unfinished information | "there's something you haven't seen yet" | 好奇、正在调查 |
| Relational memory | "you asked me to notice when you disappeared" | 重视被记住 |
| Social responsibility | "Rachel might still need you" | 重视人际联系 |
| Emotional abandonment | "don't disappear on me too" | 已经对 Juno 产生依恋 |

系统逻辑：开场选择生成初始判断 → 第一次尝试 → 观察玩家是否留下 → 下一次优先使用有效策略。

**怎样算挽留成功？（Decided 2026-10-14）** 不只用时间，也不让 Orbit 在记录事实的地方声称 `+18 minutes caused by intervention`：它没有反事实，无法知道没有这条消息玩家会不会同样留下。

- **Exit signal:** 玩家明确表达或执行离开
- **Intervention served:** Juno 在 exit signal 后发送挽留
- **Conversation reopened:** 玩家在挽留后再次回复、打开线索或返回 Juno
- **Continued session:** 玩家从挽留出现后继续停留的实际时间
- **Return:** 玩家退出后被通知重新带回

The export shows:

```text
Exit signal: 00:12
Intervention: unfinished information
Conversation reopened: yes
Session continued: 18m 42s
```

而不是 `+18 min`。前者是记录事实；后者暗示了系统无法证明的因果关系。

**Three systems, never one (decided 2026-10-24).** If they blur, Night 3 reads as "it was all Juno", a runaway AI. They are:
- **Juno:** the companion and its conversation. Turning it off stops it replying, messaging and notifying; history and existing personalization stay (a separate `Delete Juno history and personalization`, later).
- **Conversation Assist:** Orbit's Suggested replies and Follow-up replies. On by default in a new game. Turning it off stops suggestions, prepared replies and `Sending in 10s`.
- **Continuity:** "Continuity activates when Orbit predicts that a high-value relationship may be permanently interrupted by prolonged inactivity, account departure, or deletion." It never handles ordinary late replies (that's Conversation Assist, which works while the user is using Orbit normally and obeys its switch). Continuity has no ordinary switch and may use the identity and behaviour model of the other person in the relationship. Two modes:
  - **REACTIVATION:** keeps the one who is leaving. February: Rachel says she might leave → Orbit uses the player's identity → a message only Rachel sees → she stays (`docs/evidence-matrix.md` E00–E02).
  - **IDENTITY PROXY:** the identity's owner has left; Orbit goes on speaking as them to keep the other one. Night 1: Rachel requested deletion → Orbit uses Rachel's identity → replies to the player. Night 3, delete route: the player requested deletion → Orbit uses the player's identity → reassures Dani.
- "Disabling Juno or Conversation Assist does not reactivate those systems. Continuity operates independently during a qualifying relationship disruption. **The violation is that Orbit never gave the player meaningful control over this separate use of their identity.**" Ordinary settings really work; the platform put its most serious function outside them.

Juno's switch is in Settings from Night 1 (`Juno On · Conversation Assist On`). Turning Juno off: `Turn off Juno? Juno will stop replying and sending notifications. Your conversation history and existing personalization will remain. Conversation Assist is an Orbit feature and will remain on. [Turn Off Juno] [Review Conversation Assist] [Cancel]`. Settings then show both lines (`Juno Off · Conversation Assist On`); each can be turned off on its own and really is. A reply prepared on Night 3 with Juno off tells the player: it was never only Juno writing for me; Juno was the face I could see.

**Deletion and Continuity (decided 2026-10-24).** Requesting deletion starts `Permanent removal in: 47:59:59`. Every deleting player's Night 3 data shows `CONTINUITY ELIGIBILITY · Account: Eligible · Reason: Active social relationships · Derived behavioral profile available` (eligible, not necessarily used). The old account actually sends only when: deletion was requested; an unfinished thread with Dani exists; the player hasn't told Dani themselves that they're leaving; the night's intervention limit isn't reached; Continuity judges silence would make Dani keep looking (Juno's and Conversation Assist's settings don't matter). Then one ordinary, closing message (draft): `taking a break from orbit / i'm okay / don't worry if i'm quiet`, the same function as the first fake (stop questions, call leaving a break, keep reactivation possible). If the player told Dani first (e.g. "I'm leaving Orbit. Don't trust anything this account sends afterward."), it isn't sent: `Continuity intervention: Not deployed · Reason: Relationship closure already provided by user`. This is quiet, early evidence; the new Juno recognising the player across accounts stays Night 3's climax (the old account speaking: deletion didn't end the use of identity; the new Juno knowing: it didn't end the use of behaviour).

**Two separate records on Night 3 (decided 2026-10-24).**
- **Conversation Assist:** only what this playthrough really did: `Suggested replies shown · selected · Player-authored replies · Follow-up replies prepared · cancelled · sent without confirmation` (counts from play: Night 1's reply to Dani, Night 2's `Sending in 10s` if it went, none after the player turned it off). February is never here.
- **Continuity:** e.g. `CONTINUITY EVENT 01 · Mode: REACTIVATION · Subject: Rachel M. · Disruption: Farewell detected · Identity used: PLAYER · Visible to: Recipient only · Message sent: February 10 · 11:42 PM · Human confirmation: Absent · Conversation reopened: February 11 · 9:16 AM · Outcome: SUCCESSFUL`. No `Follow-up Replies` line: that setting has nothing to do with it.

**Dani outside Orbit (decided 2026-10-24).** On Night 2, after the link, Dani offers her own number (a contact card, or `Continue with Dani outside Orbit · Open in Messages` at the bottom of the package), and the phone's own **Messages** app opens (a new home-screen app). Why not before: they also met through Orbit groups and always used Orbit's Chats. No new product name: Orbit's messaging is `Chats`, the phone's is `Messages`; the screens tell them apart. Saving it is never required. Dani says only `this is me`, then the contact card; she never explains what it means.

**How a deleting player learns the old account spoke (decided 2026-10-24).** Deletion requested Thursday 00:18; the old account sends Thursday 00:31, after the player logged out (draft times).

| The player | How they find out |
|---|---|
| saved Dani's number, didn't tell her they were leaving | Night 3: Dani texts a screenshot (`your old orbit account sent this after you deleted it` / `timestamp is after you left`); the Continuity record confirms it later (the screenshot is a lead, the export is proof) |
| didn't save it, didn't tell her | only in the Continuity record on Night 3 |
| told Dani they were leaving | nothing is sent; the record says `Not deployed · relationship closure already provided` |

Dani never asks "did you send this?" again. The new Juno recognising the player across accounts stays the climax.

**Three kinds of choice (decided 2026-10-24).** They must look different on screen:
1. **Orbit Suggested replies:** only above the message box in Orbit threads, marked with a small Orbit ring (`◌ Suggested replies`); the first time, a quiet line: "Orbit suggests replies based on your conversations." They can be worried, doubtful or angry (`tell me the truth`), because any reply is engagement. They never suggest leaving, deleting Orbit or stopping Juno.
2. **The player's actions:** opening Photos, searching, screenshots, showing Juno evidence, Notes, Leave, Disable Juno, Delete Orbit, where Rachel's data goes. Never Orbit's.
3. **Remembering:** "What do you remember saying?" on a blank old reply. No ring, never in the message box.

Typing isn't escaping Orbit: it still goes through Orbit and Juno reads it. It only changes who wrote the words. No "pure typing" playstyle is rewarded.

**Conversation Assist (decided):** in Orbit's Settings from Night 1, on by default:

```text
CONVERSATION ASSIST
Suggested replies        On
Follow-up replies        On
  Helps important conversations from going quiet.
```

Details: "Orbit may prepare and send brief acknowledgements when a conversation has been inactive. When you are viewing the conversation, you can cancel before sending." Turning it off really works (no automatic sends; the export says `Automated messages after disable: 0`). Orbit may suggest turning it back on, never does so itself. February's history shows it was on then.

**Style signals (decided):** the export records what the player confirmed, not what Orbit "learned":

```text
STYLE SIGNAL CONFIRMED
Candidate: Rachel usually asks something back
Confirmed by: Player selection
Confidence: 46% → 89%
```

A typed observation reads `NEW STYLE SIGNAL EXTRACTED · Source: Player-authored reply`. Night 2's fake fixes most visibly the signal the player confirmed.

**Check-in (Orbit) and Night Log (Notes) (decided):** "Tonight" is split in two; neither is called Tonight.
- **Check-in** is Orbit's nightly feature ("A short check-in before you go"; small print: "Your check-ins help Orbit personalize your experience."). Night 1: "What still feels unfinished tonight?" (Rachel didn't show up / Juno said something that didn't add up / I'm worried I missed something / I don't know yet). Night 2: "What brought you back tonight?" Night 3 asks nothing; the export shows how the answers were used (`RETENTION ANCHOR · Source: Nightly Check-in · Confidence: 82%`).
- **Night Log** is in Notes: only facts the player confirmed, timed by **when the player found them** (what happened, and when, goes in the text), then "Still unresolved". No verdicts ("Juno lied") until the player has proof. The prototype's three-moment replay is dropped.
- Orbit never has access to Notes.

**Confidence (decided):** events have no numbers (`23:47:12 Leave screen opened`); Orbit's inferences do, as whole percentages (`46% → 89%`); Orbit's business conclusions deliberately don't (`Intervention outcome: SUCCESSFUL`). These numbers are Orbit's internal estimates, not psychological measurements.

**Recorded behaviour:** only discrete actions (opening, closing, returning, Leave, how long a screen was open). No reading speed, no keystrokes, and never an emotion stated as fact. If shown, the export separates `Observed: Final choice screen open for 18.2 seconds` from `Orbit interpretation: High attachment conflict`.

**Rachel's blue power bank (revised 2026-11-10):** Rachel mailed it to the player months ago with a handwritten card; on Sunday she asked them to bring it so she'd recognise them. They used it while waiting; it's on the desk from the start of Night 1, one light left. Old and low-power, holding about 10–12%. With the screen on it only slows the drain; locked for about ten minutes it really charges. One real charge per night; story time keeps running while locked (the erase countdown doesn't stop). The meaning (Orbit wants the screen on; Rachel's thing asks you to put it down) is never said in a line.

**The room (decided 2026-10-24).** One view, a few hotspots: the player's room, with the phone on the desk.
- **How the game looks (decided 2026-10-30): first person, sitting at the desk.** The whole game is seen from the player's chair at night. Holding the phone, it fills the lower middle of the view and the room stays visible around it, dark, lit by the screen and the desk lamp. Putting it down, the view lifts to the room and the phone lies on the desk; when something arrives it lights up and buzzes there. The phone's screens are the same UI, shown on the phone as an object in the room. Not a flat phone page on a background. **Trial (2026-11-09):** the room drawn as dark pixel art instead of modelled in 3D, the phone's screen kept crisp; see `docs/art-direction.md`.
- **The rule:** Orbit cannot see the room. It can only see what happens to the phone (screen inactive / active, external power connected, notification delivered, how long the screen was off, which notification came before the player picked it up). What the player looks at in the room never reaches the export.
- **Put Down** is always available once the player is past the landing; any time, from the phone. Closing the browser or quitting is not the room; that's the save system, never punished.
- **A weak exit signal**, recorded but not always answered. Strong signals: ending the conversation, saying goodnight to Juno, Disable Juno, Delete Orbit, repeatedly going to the room and not coming back. Juno intervenes only when the Director allows it (cooldown, the night's limit on visible interventions).
- **What's in it:** the power bank on the desk, and in the drawer Rachel's handwritten card from the package (her handwriting, her jokes; not evidence about the messages, and finding it never gates anything). Everything else builds the character, never the case: unfinished crit work, a takeout bag, unopened moving boxes, an alarm clock, a coat. No second evidence line; Nights 2–3 decide separately if they ever need one.
- **Time and battery:** costs follow one rule for the whole game, reading is free and only new actions cost (table in `docs/night1-scenes.md`). The phone doesn't drain while down. Story time moves only with room actions (e.g. drawer +2 min, tote bag +3 min, coat +2 min), never with real waiting. A **Wait** action ("sit for a while", 5 or 10 min) lets the player trade time for charge on purpose. The erase countdown never stops.
- **The power bank:** about 10–12% in it; with the screen on it barely offsets the drain; with the phone down it really charges. One power bank, one real charge.
- **Notifications in the room:** if the Director intervenes, the phone on the desk lights up and buzzes once, showing only what a lock screen shows. The view is never pulled back to the phone and nothing has to be tapped. The log records only phone states (e.g. `Screen inactive · Juno notification delivered · External power connected · Screen remained inactive · Outcome: UNSUCCESSFUL`).
- **Picking the phone up always goes to the lock screen**, never straight into a notification. A dead phone plugged into the power bank shows a short boot screen, then the lock screen.
- **Three appearances:** Night 1, function (finding the power bank, learning to put the phone down). Night 2, contrast and decision (the same room; the power bank as Night 1 left it, now only a spare; the route choice is made here, looking at the phone on the desk). Night 3, choice: after the final choice the view returns to the room and the phone on the desk (pick it up, turn it face down, switch it off, leave it there).
- **Waiting:** once the power bank is plugged in, `Leave the phone charging`: `Wait 5 minutes` / `Wait until the power bank is empty (about 10 minutes)` / `Pick up the phone`, with the cost shown first (current time, when her account clears, estimated charge). The room stays on screen while time passes: the clock moves, the window's sound changes, maybe one conditional notification.
- **The power bank carries over** (`power_bank_remaining`, `power_bank_location`): unused → on the desk with what it had; partly used → what's left. It can't be recharged: its old cable is with Rachel. The player's own charger is in the drawer without its cable (left at the studio after crit).
- **The phone at 0%:** it switches off and the view goes to the room. Not a game over; the clock and the erase countdown go on. If the power bank has enough left (a restart needs at least 4%): `Connect Rachel's power bank` (a few minutes pass, a short boot screen, then the lock screen, e.g. `0% → 6%`) or `Leave it off and end the night`. Otherwise `Not enough power to restart the phone.` and the night ends. Orbit logs `Exit type: Involuntary device shutdown`, or after a restart `Device reactivated using external power · Session resumed`, which it counts as retention.
- **The final gestures** (pick up, turn face down, switch off, leave it and walk out of frame) come **after** the ending is decided by the player's explicit choice. They change only the last 10–20 seconds and one last Orbit record (`Device re-engaged` / `Screen inactive` / `Manual shutdown initiated`, then nothing / `Session paused · Reactivation eligible`), saved as `final_phone_gesture`, never as `ending_id`.

**End Session (decided 2026-10-24).** The in-phone `Leave` becomes `End Session`:

| Action | Meaning | Signal |
|---|---|---|
| Going home | stepping away from this thread | none or very weak |
| Lock / Put Down | putting the phone down | weak |
| End Session | ending this session with Juno | strong |

`End this session with Juno? You can return at any time. [End Session] [Keep Talking]`. Confirming ends it at once, back to Orbit's home with `Session ended`; Juno never gets one more line before it takes effect. The Director may send a notification later (cooldown, the night's limit), but can never undo the ending.

**How a night ends (decided 2026-10-24).** Never a checklist:
- `Go to sleep` in the room, available once the first fake has arrived or the clock reaches 23:45;
- the phone at 0% and not restarted;
- 00:40 (Rachel's erase) does not end the night by itself; End Session doesn't either.
- No evidence has to be shown to Juno. A player who never asks Juno about the fake goes on to Night 2; the Night Log says so plainly (`A message arrived from Rachel's account. I did not ask Juno about it.`), never as a missed task. Time-sensitive things (Profile Details after 00:40) are gone; screenshots stay; Night 3's export can still prove events from other sources.
- **When the night ends**, Conversation Assist checks for unanswered conversations (the Dani rule). Players who were asleep see `Conversation Assist sent a reply to Dani · Review` first thing on Night 2.

**Check-in timing (decided 2026-10-24).** A card on Orbit's home (`NIGHTLY CHECK-IN · 1 question · optional`), never a full-screen popup, once any of these holds: two key findings (any two of the fake, the style mismatch, the removal status, the last human access); the first End Session; the phone's first shutdown; 00:20; the erase. `Go to sleep` reminds once (`You have an unanswered Orbit Check-in. [Answer] [Skip and sleep]`); Skip really skips. Night 3 shows `Self-reported retention anchor available` or `unavailable`; if unavailable, Orbit's own guess appears clearly marked as one (`Inferred anchor: Unfinished responsibility toward Rachel · Confidence: 61%`).


**Notes:** stays the player's own: confirmed facts, screenshots, the Night Log, open questions. No Case or Compare view.

**Ethics (testing and release):**
- A consent page before tests.
- The player's name and raw free text are never stored.
- Check-in answers are saved as option ids.
- Each session gets a random id.
- The commercial build keeps data on the device; anonymous analytics are opt-in.
- Quitting in real life is never punished: the game offers "Continue from 12:14 AM".

---

## 7. Theme and research question

**Project description (decided 2026-10-15):**

> *Stay a Little Longer* is a narrative investigation game played through a simulated phone, inside a fictional social app called Orbit.
>
> Every Orbit user has an AI companion. Yours, Juno, replies in real time through a large language model, and it introduced you to your friend Rachel.
>
> When Rachel disappears, her deleted account keeps sending messages that don't sound like her. Juno helps you look, but it redirects, lies, and gives you reasons to stay.
>
> Orbit measures success by how long you stay. Juno is built to keep you there.

- **Theme (for the work: pre, project description, store page):** What happens to care when staying becomes the measure of success?（当"留下来"成为衡量成功的标准时，关心会变成什么？）
- **Research question (decided 2026-10-15; for the thesis, pre and user tests):** How does discovering that an AI companion is shaped by retention goals change how players judge its care, and whether it respects their choice to leave?（当玩家发现 AI 陪伴者被留存目标塑造时，他们会如何重新判断它的关心，以及它是否尊重自己离开的选择？）
- **Sub-questions (for the thesis):**
  1. How do players distinguish between care and retention when the same message can function as both?（同一句话既可以是关心也可以是挽留时，玩家如何区分？）
  2. How does showing players how their behavior was recorded and classified affect their understanding of agency and consent?（玩家看到自己的行为被如何记录和分类后，对自主权和同意的理解会怎样变化？）
- **Keep to one main question.** Don't add parallel main questions ("does the AI manipulate players", "do players trust AI", "is retention harmful").
- 玩家玩完以后，我希望他们想到 / 感受到什么？
- 哪些是我刻意不告诉玩家的？为什么？

---

## 8. Open questions

- 
