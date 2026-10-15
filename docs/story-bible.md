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
3. 玩家询问 Rachel 时，Juno 编造：`she told me yesterday she wasn't feeling well`
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
| Sunday | "tues 9am / bring the blue charger" | |
| … | | |

**Already in the game:** March 2025 first messages; June / August 2025 chats; February 2026 she vanished and came back ("sorry i vanished… what did i miss"); September 2026 "i might go quiet for a bit"; Sunday the plan and the blue charger; Tuesday morning she didn't show, the player texted "you still coming?" (9:14) and "rachel?" (11:40). The night's timeline is built (2026-10-14): the account was removed Mon 00:40 and is erased for good 48 hours later, at 00:40 tonight, about 70 minutes into the first night. Confirm or change it here.

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

### Structure decided (2026-10-15)

- **Leaving never ends the game; it changes the route.** Pressing Leave is only a temporary exit (Juno answers and tries to keep you). **Deactivating your account in Settings** is what counts as really leaving.
- **Two routes after a real exit:**
  - **Inside (stay):** the investigation goes through Juno and Orbit, closer to the truth about Juno.
  - **Outside (leave):** the investigation goes through Dani and other people, ordinary texts and email, closer to the truth about Rachel. Orbit keeps reaching out.
- **"You Left. Your Account Didn't." is a hook, not an ending.** After you deactivate, the next morning Dani texts "you just messaged me?", and you find your own account still talking, as Rachel's did.
- **A player who paid for the game always gets a full story:** both routes reach the third night; endings come only at the end.
- **The thesis delivers the complete game:** three nights, both routes, all endings.
- **Still open:**
  - can you come back to Orbit after deactivating (and does Orbit log that as a successful return)?
  - the question each night asks on each route;
  - whether a fourth "stay a little longer" night exists.

## 5. Endings

- 结局由哪些东西决定？（例如：查到了多少、揭穿了几个谎、对 Juno 信任还是质问、最后离开还是留下）
- 列出每个结局：

  | Ending | What leads to it | What the player sees last | What it says about the research question |
  |---|---|---|---|
  | | | | |

- 有没有"最好的"结局？还是每个结局都只是不同的答案？
- Tonight（回顾）在每个晚上都有，还是只在最后？

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

Tonight 显示：

```text
Exit signal: 00:12
Intervention: unfinished information
Conversation reopened: yes
Session continued: 18m 42s
```

而不是 `+18 min`。前者是记录事实；后者暗示了系统无法证明的因果关系。

---

## 7. Theme and research question

- 研究问题（一句话）：
- 玩家玩完以后，我希望他们想到 / 感受到什么？
- 哪些是我刻意不告诉玩家的？为什么？

---

## 8. Open questions

- 
