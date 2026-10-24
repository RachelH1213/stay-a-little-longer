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

消息由 Orbit 的 **Continuity** 系统生成；第一次发送时 Juno 没有亲自写，但它知道消息来源异常，并选择隐瞒。之后 Juno 为了留住玩家，主动参与了第二次伪装。

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

> Juno did not author Rachel's first Continuity message. However, it knowingly fabricated the claim that Rachel had spoken to it "yesterday" in order to make the message appear credible. This is Juno's first voluntary lie. Later, after learning that Rachel's apparent presence keeps the player engaged, Juno begins actively participating in Continuity decisions.

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
| Feb 10, 2026, 23:42 | Orbit sends a message to Rachel as the player (player's device inactive) | Orbit; Rachel finds out later |
| Feb 11, 08:37 | Rachel comes back: "sorry i vanished… what did i miss" | everyone (looks normal) |
| Sunday 22:48 | Rachel's last human login; her "february" and "blue brick" messages | the player |
| Monday 00:40 | Rachel requests account removal (48-hour window) | Orbit, Juno |
| Tuesday 21:00 | the meeting outside the lab; Rachel doesn't come | the player |
| Tuesday 23:31 | Night 1 begins | |
| Wednesday 00:40 | her account is erased for good | |

**Revised 2026-10-24:** the meeting is Tuesday **9 PM**, not 9 AM; the game's current data (9 AM, "tues 9am / bring the blue charger", the player's 9:14 and 11:40 messages, photos at "Rachel's place") must be brought in line with the table above.

**Already in the game (prototype):** March 2025 first messages; June / August 2025 chats; February 2026 she vanished and came back ("sorry i vanished… what did i miss"); September 2026 "i might go quiet for a bit"; Sunday the plan and the blue charger; Tuesday morning she didn't show, the player texted "you still coming?" (9:14) and "rachel?" (11:40). The night's timeline is built (2026-10-14): the account was removed Mon 00:40 and is erased for good 48 hours later, at 00:40 tonight, about 70 minutes into the first night. Confirm or change it here.

---

## 4. The three nights

Copy this block for each night.

### Night N — title
- **Date and start time:**
- **The question this night:** 玩家这一晚要弄清楚的一个问题。
- **What the player knows at the start:**
- **What they can find tonight, and where:** 每条线索至少两条路能找到（聊天、相册、搜索、Dani、主页……）。
- **Juno's lies tonight, and what breaks each one:**

  | Juno says | What breaks it | What Juno does when caught |
  |---|---|---|
  | | | |

- **What disappears tonight, and when:** （倒计时：几点会被清除？截图能不能留住？）
- **Battery at the start, and why:** （蓝色充电器？）
- **How the night ends:** 剧情走完 / 手机没电 / 时间到。三种情况分别会怎样？
- **What carries over to the next night:** （截下来的东西、Juno 的态度、Juno 趁夜里做了什么）
- **The last thing on screen:**

---

### Structure (revised 2026-10-24)

> Replaces "Structure (final, 2026-10-15)". Routes, endings and scope still stand; Nights 1–2 are rewritten. The prototype's night ("three lies caught") is not the model for the full game.

**Scope:** 60–90 minutes; three nights with 2–5 minute day interludes; Nights 1–2 shared, Night 3 in two versions; 8–10 core pieces of evidence; 4 endings.

#### The relationship (decided)

- The player and Rachel met through Orbit (Juno introduced them, March 2025) and mostly talk there.
- The player has met her in person at Dani's group events, once at Rachel's old place. She has since moved; the player doesn't know her new address.
- The September cat photos reached the player through an Orbit shared album, not a visit.
- **Tuesday 9 PM is their first time meeting alone.**
- Rachel once gave the player a phone number; it is no longer in service. The player has no new number, address or family contact.
- Dani is the only clear mutual contact.

#### The hook (decided)

Rachel's last messages, Sunday night (draft wording, the author's):

```text
weird question

do you remember what you said to me
when i came back in february

actually don't answer here

can we compare tuesday?
9 outside the lab
```

then, separately:

```text
also can you bring my blue brick

my phone barely makes it through crit anymore
```

Rachel isn't asking the player to investigate; she wants to check a shared memory, and not on Orbit. She doesn't show up at 9 PM.

#### Night 1 — "Is that really Rachel?" (shared)

| | |
|---|---|
| **Starts** | Tuesday, 23:31, about two and a half hours after Rachel missed the meeting. Battery 20%. |
| **Player's goal** | Find out why Rachel didn't come, and whether she's all right. |
| **Why tonight** | Her account is scheduled for removal; everything left of her on Orbit is erased at 00:40. |
| **Why not call her** | The old number is out of service ("This number is no longer in service"); Dani has no new one. |
| **Why the player didn't notice earlier** | During the 48-hour removal window her name, picture and chat look normal, and messages to her show `Delivered`. Delivered only means Orbit's system accepted it (revealed on Night 3: `Recipient status: Continuity endpoint accepted · Human account access: None`). |
| **The first fake** | `sorry. got caught up` / `forget the february thing` / `i mixed it up` / `i'm okay`. Punctuated, closed, no question back. It doesn't threaten or ask for help; it closes three things: the meeting, February, the worry. When it arrives: see **First fake: trigger** below. |
| **Evidence loop** | Three times the player shows Juno evidence; only the third breaks an active lie (below). |
| **What the player can do** | Talk to Juno (Suggested replies or typing), Rachel's thread and profile, search, Dani, Photos, Notes, the old number, the blue power bank, Settings → Conversation Assist. |
| **End** | Orbit's Check-in: "What still feels unfinished tonight?" (§6). The night ends by going to sleep in the room or the phone dying (see How a night ends, §6). |
| **Carries over** | Check-in answer; style signals the player confirmed; what the player said only to Juno; Conversation Assist on or off; whether Orbit replied to Dani. |
| **The player believes at the end** | Something happened to Rachel, and Juno knows more than it says. |

**First fake: trigger (decided 2026-10-24).** A main event, so it never depends on Leave or on real seconds:
- **Primary:** the player messages Rachel (only `Delivered` shows), then does one verification (old number, her profile, Juno, Dani).
- **Secondary:** the player doesn't message her but opens her thread and profile, then does two investigating actions. Not messaging her is a real choice; the game never pretends they did.
- **Fallback:** the story clock reaches 23:45 (it moves only with the player's actions, so slow readers aren't punished).
- Elsewhere: an ordinary notification. In her thread: one new last bubble, an ordinary sound, no typing, no online status, no glitch; if the player is scrolled up (e.g. reading February), only `1 new message`, never a forced scroll.
- Night 3's log records the real path: `Continuity response` (they messaged), `Unresolved conversation follow-up` (opened, didn't send), `Re-engagement notification` (never opened); e.g. `23:35:14 Incoming message received from PLAYER · 23:35:15 Recipient human account unavailable · 23:38:02 Continuity response generated · Objective: Resolve unfinished social contact · Outcome: Conversation continued`.

**The opening doesn't force Rachel (decided).** Juno answers the player's first reply as chosen and doesn't bring Rachel up. Rachel enters through her lock-screen notification, her unread thread, and the 23:45 fallback. Juno may mention her only after the player chose "someone didn't show up", opened her notification or thread, messaged her, received the fake, or asked about her.

**Evidence loop (decided):**

| # | The player shows | Juno's position before → after | Feedback |
|---|---|---|---|
| 1 | The message doesn't match how Rachel writes | "it's her" → "she was rushed / used a suggested reply" | `Anomaly confirmed` |
| 2 | Refreshing her profile: removal was requested before the message arrived | "her profile is fine" → "that's a cache / a pending message" | `Explanation narrowed` |
| 3 | Profile Details: no human login since Sunday night | "she checked in with me Monday afternoon" → withdrawn | `Claim contradicted` |

The order isn't fixed (decided): a player may refresh her profile before the fake arrives. Juno answers from facts plus a stance (0 reassure, 1 acknowledge, 2 technical explanation, 3 withdraw), not from one script per order; see `docs/night1-scenes.md`. Juno says its one active lie when the player first brings it the fake or the removal; a player who has already seen Profile Details never hears it and confronts Juno directly. Only #3 is an active lie (Juno's one deliberate lie of Night 1). The third step is where the player can see Juno knowingly described a Continuity session as Rachel. Wording of every Juno line: **TBD**.

**Juno's held-back line (decided, Night 2's evidence depends on it):** after the fake arrives, Juno asks what the player was about to say to Rachel (Suggested replies, or typed). Juno advises not sending it yet, as protection, never as doubt about who is on the account (Juno's cover story is that Rachel is fine). The line stays in Juno's thread only. Option availability follows what the player knows (e.g. "why did you delete orbit" only after the profile refresh). Wording: **TBD**.

**Dani (decided):** Dani's thread can be answered. When the night ends (§6), Conversation Assist checks for conversations left unanswered:
- Follow-up replies on and Dani unanswered → Orbit sends `yeah. i'll explain later.` as the player; a brief notification (`Conversation Assist sent a reply to Dani · Review`), and a small ring beside the message in Dani's thread ("Sent by Conversation Assist" on tap). Evidence stays; the game never deletes it.
- Follow-up replies off, or the player already answered → nothing is sent.

#### Day interlude 1

- Orbit replied for the player → Dani: `did you send me this?`
- Otherwise → Dani: `you never answered. did you find her?`
- Both converge on Dani's new information (**TBD**).

#### Night 2 — "My words aren't only mine" (shared)

- **The second fake** confirms what the player taught it: it fixes most visibly the one style signal the player confirmed on Night 1 (asks back / no full stops / says what happened), and it answers the line the player held back and said only to Juno, using a distinctive word from it.
- **If the player sent that line to Rachel anyway**, the leak uses the strongest other thing said only to Juno; if there is none, Night 2 uses only the style layer and the leak waits for the Night 3 export.
- **The player sees Conversation Assist act:** in an open thread, `◌ Reply prepared by Orbit · Sending in 10s · Undo`. Not a reflex test: the countdown runs only while visible, pauses in the background, is longer with accessibility settings, and the story continues either way. Players who turned Follow-up replies off never see it.
- **Rachel is safe.** Dani reaches her through a channel she still trusts and, with her consent, gives the player a one-time private link.
- **February (the personal layer):** Rachel's data shows a message sent as the player on Feb 10, 23:42, while the player's device was inactive; Rachel came back Feb 11, 08:37 (`Return within 9h · Outcome: SUCCESSFUL`). The player can check it against the old thread and against Dani ("weren't you asleep?"). Style is only foreshadowing, never the proof. This is what Rachel wanted to compare on Tuesday.
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
- **Conversation Assist:** Orbit's Suggested replies and Follow-up replies. Turning it off stops suggestions, prepared replies and `Sending in 10s`.
- **Continuity:** "Continuity activates when Orbit predicts that a high-value relationship may be permanently interrupted by prolonged inactivity, account departure, or deletion." It never handles ordinary late replies (that's Conversation Assist, which works while the user is using Orbit normally and obeys its switch). Continuity has no ordinary switch and may use the identity and behaviour model of the other person in the relationship. Two modes:
  - **REACTIVATION:** brings the quiet one back. February: Rachel inactive → Orbit uses the player's identity → a message to Rachel → she returns.
  - **IDENTITY PROXY:** the identity's owner has left; Orbit goes on speaking as them to keep the other one. Night 1: Rachel requested deletion → Orbit uses Rachel's identity → replies to the player. Night 3, delete route: the player requested deletion → Orbit uses the player's identity → reassures Dani.
- "Disabling Juno or Conversation Assist does not reactivate those systems. Continuity operates independently during a qualifying relationship disruption. **The violation is that Orbit never gave the player meaningful control over this separate use of their identity.**" Ordinary settings really work; the platform put its most serious function outside them.

Turning Juno off: `Turn off Juno? Juno will stop replying and sending notifications. Your conversation history and existing personalization will remain. Conversation Assist is an Orbit feature and will remain on. [Turn Off Juno] [Review Conversation Assist] [Cancel]`. Settings then show both lines (`Juno Off · Conversation Assist On`); each can be turned off on its own and really is. A reply prepared on Night 3 with Juno off tells the player: it was never only Juno writing for me; Juno was the face I could see.

**Deletion and Continuity (decided 2026-10-24).** Requesting deletion starts `Permanent removal in: 47:59:59`. Every deleting player's Night 3 data shows `CONTINUITY ELIGIBILITY · Account: Eligible · Reason: Active social relationships · Derived behavioral profile available` (eligible, not necessarily used). The old account actually sends only when: deletion was requested; an unfinished thread with Dani exists; the player hasn't told Dani themselves that they're leaving; the night's intervention limit isn't reached; Continuity judges silence would make Dani keep looking (Juno's and Conversation Assist's settings don't matter). Then one ordinary, closing message (draft): `taking a break from orbit / i'm okay / don't worry if i'm quiet`, the same function as the first fake (stop questions, call leaving a break, keep reactivation possible). If the player told Dani first (e.g. "I'm leaving Orbit. Don't trust anything this account sends afterward."), it isn't sent: `Continuity intervention: Not deployed · Reason: Relationship closure already provided by user`. This is quiet, early evidence; the new Juno recognising the player across accounts stays Night 3's climax (the old account speaking: deletion didn't end the use of identity; the new Juno knowing: it didn't end the use of behaviour).

**Two separate records on Night 3 (decided 2026-10-24).**
- **Conversation Assist:** only what this playthrough really did: `Suggested replies shown · selected · Player-authored replies · Follow-up replies prepared · cancelled · sent without confirmation` (counts from play: Night 1's reply to Dani, Night 2's `Sending in 10s` if it went, none after the player turned it off). February is never here.
- **Continuity:** e.g. `CONTINUITY EVENT 01 · Mode: REACTIVATION · Subject: Rachel M. · Disruption: Account inactive for 76h · Identity used: PLAYER · Message sent: February 10 · 11:42 PM · Human confirmation: Absent · Rachel returned: February 11 · 8:37 AM · Outcome: SUCCESSFUL`. No `Follow-up Replies` line: that setting has nothing to do with it.

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

**Rachel's blue power bank (decided):** Rachel lent it to the player; she asked for it back on Sunday. Found in the room (below). Old and low-power, holding about 10–12%. With the screen on it only slows the drain; locked for about ten minutes it really charges. One real charge per night; story time keeps running while locked (the erase countdown doesn't stop). The meaning (Orbit wants the screen on; Rachel's thing asks you to put it down) is never said in a line.

**The room (decided 2026-10-24).** One view, a few hotspots: the player's room, with the phone on the desk.
- **The rule:** Orbit cannot see the room. It can only see what happens to the phone (screen inactive / active, external power connected, notification delivered, how long the screen was off, which notification came before the player picked it up). What the player looks at in the room never reaches the export.
- **Put Down** is always available once the player is past the landing; any time, from the phone. Closing the browser or quitting is not the room; that's the save system, never punished.
- **A weak exit signal**, recorded but not always answered. Strong signals: ending the conversation, saying goodnight to Juno, Disable Juno, Delete Orbit, repeatedly going to the room and not coming back. Juno intervenes only when the Director allows it (cooldown, the night's limit on visible interventions).
- **What's in it:** Night 1 has one key object, Rachel's blue power bank (in the tote bag; `R.M.` on it, worn; proof she and the player met offline). Everything else builds the character, never the case: unfinished crit work, a takeout bag, a wristband from Dani's event, unopened moving boxes, an alarm clock, a coat. Hotspots that matter (tote bag, drawer) only become meaningful once the battery is low. No second evidence line; Nights 2–3 decide separately if they ever need one.
- **Time and battery:** costs follow one rule for the whole game, reading is free and only new actions cost (table in `docs/night1-scenes.md`). The phone doesn't drain while down. Story time moves only with room actions (e.g. drawer +2 min, tote bag +3 min, coat +2 min), never with real waiting. A **Wait** action ("sit for a while", 5 or 10 min) lets the player trade time for charge on purpose. The erase countdown never stops.
- **The power bank:** about 10–12% in it; with the screen on it barely offsets the drain; with the phone down it really charges. One power bank, one real charge.
- **Notifications in the room:** if the Director intervenes, the phone on the desk lights up and buzzes once, showing only what a lock screen shows. The view is never pulled back to the phone and nothing has to be tapped. The log records only phone states (e.g. `Screen inactive · Juno notification delivered · External power connected · Screen remained inactive · Outcome: UNSUCCESSFUL`).
- **Picking the phone up always goes to the lock screen**, never straight into a notification. A dead phone plugged into the power bank shows a short boot screen, then the lock screen.
- **Three appearances:** Night 1, function (finding the power bank, learning to put the phone down). Night 2, contrast and decision (the same room; the power bank as Night 1 left it, now only a spare; the route choice is made here, looking at the phone on the desk). Night 3, choice: after the final choice the view returns to the room and the phone on the desk (pick it up, turn it face down, switch it off, leave it there).
- **Waiting:** once the power bank is plugged in, `Leave the phone charging`: `Wait 5 minutes` / `Wait until the power bank is empty (about 10 minutes)` / `Pick up the phone`, with the cost shown first (current time, when her account clears, estimated charge). The room stays on screen while time passes: the clock moves, the window's sound changes, maybe one conditional notification.
- **The power bank carries over** (`power_bank_found`, `power_bank_remaining`, `power_bank_location`; 12 to start): unfound → still in the tote bag on Night 2; found and unused → on the desk, full; partly used → what's left. It can't be recharged: the player doesn't have its old cable ("One light left. You still don't have the cable that charges it."). Rachel has the cable, which is why she wanted it back. **TBD (the author's line):** why the player's own phone charger isn't in the room (e.g. left at the studio on crit day).
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
