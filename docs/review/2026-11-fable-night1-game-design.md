# Night 1 作为一个游戏：循环、反馈、证据、难度（草稿，2026-11）

这份接在 `docs/night1-layers.md`（已采纳的九层）上面。九层回答的是「玩家看到什么」。这份回答的是「玩起来好不好玩、解不解得出、解出来有没有回报」。没有改动任何现有文档，全部是草稿。

## 0. 先说判断

九层解决了「谜团两分钟就破」的问题。但照九层做出来，它仍然更像一条设计得很好的路，还不是一个游戏。差的是五样：

| 缺的 | 现在的样子 | 一个成熟的推理游戏里它是什么 |
|---|---|---|
| **下结论的动作** | 玩家走到哪一层，是靠点对了一行 | 玩家要自己说出「哪里不对」，游戏告诉玩家对不对 |
| **看得见的进度** | Night Log 自己多出一行字 | 玩家知道自己解开了什么、还剩什么 |
| **难度的起伏** | 九层差不多一样难 | 先容易，中间要想，最后要拼 |
| **好奇心的回报** | 多翻一页设置，什么都不发生 | 每一次多看一眼都有一点东西 |
| **后果** | 这一晚怎么玩，结尾都一样 | 第二天早上不一样 |

下面每一节补一样。都在手机里完成，没有分数，没有教学，没有故事外的界面。

---

## 1. 这一晚是三个案子，难度递增

把九层分成三个案子。玩家不会看到这三个名字，但会感觉到三次「解开了」。

| | 案子 | 层 | 能不能解开 | 玩家得到什么 |
|---|---|---|---|---|
| A | **她为什么没来** | 1–6 | 能，完全解开 | 第一次赢：不是她的错，是一个我自己打开的设置。我把它关了。 |
| B | **我怎么找到她** | 7–8 | 解开一半 | 她留了出口，被藏了；Dani 手里有另一条路，信发出去了，今晚等不到回音。 |
| C | **刚才是谁在回我** | 9 | 今晚解不开 | 证明不了那不是她。但能把 Juno 问到说不下去。 |

- **A 要让玩家赢。** 这是今晚唯一一个有完整答案的问题，大约在 11:47 解开。之后玩家才有底气去碰 B 和 C。
- **C 不能赢，但要有一个算数的终点。** 那个终点是 Juno 的 `i can't say more than that`。
- 时间上：A 大约 15 分钟，B 大约 8 分钟，C 大约 25 分钟，然后是 12:40。

---

## 2. 核心循环多一步：「指出哪里」

### 2.1 现在的循环

找到一样东西 → 拿给 Juno 或 Dani 看 → 对方有反应。

问题：把东西拿出来就算数。玩家可以把能分享的东西全部丢给 Juno，不用想就到了阶梯的第 4 级。

### 2.2 加一步

玩家把东西给 Juno 之后，Juno 先问一句。玩家要指出是这样东西的**哪一点**。指对了，Juno 才确认；指错了，Juno 给一句真话，不算数，也不罚。

这一步只对 Juno 有。给 Dani 看，她自己就看懂了。**跟 Juno 说话要把话说全，跟人说话不用。** 这个差别本身就是 Juno 的性格。

### 2.3 四样东西，各自的问法

前提：Juno 已经拿到了假消息。每个选项都是对 Juno 那句问话的简短回答，不是结论，符合「建议回复只问、不下结论」。打字说出同样的意思，效果一样。

**把计划分享给它**

```text
Juno
what about it?
```

| 玩家指的 | Juno | 算不算 |
|---|---|---|
| `the day` | A 版：`yeah. the plan was moved to saturday` · `but the message says tonight`<br>B 版：`it doesn't mention saturday` · `what did you ask her?` | 算 |
| `the place` | `same place. halfway café` | 不算 |
| `who's going` | `you and her. that hasn't changed` | 不算 |

**把她的主页分享给它**

| 玩家指的 | Juno | 算不算 |
|---|---|---|
| `last active` | `last active is when she last had the app open` · `a message can go out without that` | 算 |
| `she's leaving` | `it's been on her profile since monday` | 不算 |
| `nothing. just look` | `i'm looking` · `what should i see?` | 不算，问题还开着 |

**转发她以前的一条消息**

```text
Juno
i can't see your chat with her
how does she usually write?
```

| 玩家指的 | Juno | 算不算 |
|---|---|---|
| `she always asks something back` | `ok. this one doesn't do that` | 算。风格信号：问回来 |
| `she never uses full stops` | `ok. this one has one` | 算。风格信号：句号 |
| `she makes it a joke` | `ok. this one doesn't` | 算。风格信号：玩笑 |
| `she writes a lot` | `this one's short too` | 不算。没有风格信号 |

- 前三个都对，选哪个由玩家读她的聊天时注意到了什么决定。Night 2 的假消息改掉的就是玩家选的那一个。
- 第四个是唯一的错项。它错在假消息也很短。要比过才知道。

**转发她周日的那几句**

| 玩家指的 | Juno | 算不算 |
|---|---|---|
| `february` | `the message says to drop february` · `what happened in february?` | 算 |
| `she wanted to show me something` | `the message doesn't say anything about that` · `show you what?` | 算（和上一行是同一样，不重复计） |
| `tuesday` | `it was tuesday. then it wasn't` | 不算 |

### 2.4 这一步的效果

- 四样里指对两样，才到 `i can't say more than that`。乱试的话，每试一次花一分钟和半格电，而 12:40 在逼近。
- 指错得到的都是真话，有的还有用（`it's been on her profile since monday`）。玩家不会觉得被罚，只会觉得没打中。
- 每一样只问一次 `what about it?`。同一样东西第二次分享，Juno 回 `you showed me that`，不再给选项。所以不能靠重试。
- 对「没有角色先说出矛盾」这条规则，它比现在更严：现在是玩家一分享，Juno 就把矛盾说出来了。加了这一步，矛盾是玩家指的。

---

## 3. 看得见的进度：Notes 里的问题

### 3.1 做法

`Tuesday night` 这条笔记里，`Still unresolved` 现在是几句陈述。改成**玩家自己的问题**。

- 玩家走到某一层，笔记里多一个问题。
- 问题有了答案，它被划掉。划线是一笔画过去的，有笔尖的声音。减少动效时直接显示为划掉。
- 每次多一个问题或者划掉一个，主屏幕上 Notes 的图标有一个小点，点开就没了。
- 今晚划不掉的，留到明天。它们就是 Night 2 的钩子。

这是《Outer Wilds》的航行日志的做法：它不告诉你去哪，它只让你看见自己还不知道什么。它是玩家自己的笔记，Orbit 看不到。

### 3.2 问题表

问题只在玩家自己走到那一步时出现，所以没有一个问题会替玩家指出还没看到的东西。

| 出现的时候 | 问题 | 划掉的时候 |
|---|---|---|
| 一开始 | `Why didn't she come?` | 看到 History（第 3 层） |
| 第 1 层 | `Why does the plan say Saturday?` | 看到 History |
| 第 3 层 | `Who said yes?` | 看到 `Accepted for you`（第 5 层） |
| 第 5 层 | `When did I agree to that?` | 到了 Plans 的设置页（第 6 层） |
| 第 7 层 | `What did she write after "email me"?` | 今晚不划。Night 2 她的截图里有。 |
| Dani 发了邮件 | `Will she answer Dani?` | Night 2 早上 |
| 第 8 层 | `Why is she leaving?` | 今晚不划。Night 2。 |
| 假消息到了，玩家对谁表达过怀疑 | `Who wrote that?` | 今晚不划。Night 2 早上。 |
| 玩家指过 `february` | `What happened in February?` | 今晚不划。Night 2。 |
| Juno 说了 `i can't say more than that` | `What can't Juno say?` | 今晚不划。Night 3。 |

- 一个只走主线的玩家，今晚结束时划掉四个，留下四到六个。
- 被划掉的问题不消失。它们留在页面上，下面是当时写下的那一行事实。玩家看得到自己走过的路。

### 3.3 这一晚结束时的那一页

玩家睡前最后看到的 Notes，就是这一晚的成绩单，只是它长得像一页笔记。划掉的多，是一种满足；没划掉的，是明天回来的理由。两样都不需要任何故事外的界面。

---

## 4. 反馈：玩家做对一件事时，手机上发生什么

九种，全部在故事里。每一种都要配一个很短的声音。

| # | 发生了什么 | 玩家感到什么 |
|---|---|---|
| 1 | Notes 里一个问题被划掉 | 我解开了一样 |
| 2 | Night Log 多一行字，是自己的口吻 | 我知道了一件事 |
| 3 | 输入框上面出现新的问句 | 我看到了新的东西，所以有了新的话可以问 |
| 4 | Juno 的回答变短；它的三个点出现，停住，又出现 | 我打中了 |
| 5 | Dani 连发两三条，有大写 | 有人和我一样吃惊 |
| 6 | 一个状态变了：计划 `Declined · Not delivered`，验证 `Waiting for Rachel`，开关关上 | 我做的事留下了痕迹 |
| 7 | 我拿出来的东西留在对话里，是一张卡片或一张图 | 我把证据放在了桌上 |
| 8 | 状态栏的时间和电量在我做事的那一下亮一下 | 这一步是有代价的 |
| 9 | 手机在桌上亮了 | 有东西在找我 |

第 3 种最容易被忽略，而它是最好的一种：**玩家能说的话，随着看到的东西变多。** 建议回复不再是剧情的轨道，是玩家调查的结果。

---

## 5. 证据清单

`game-plan.md` 里「8–10 件核心证据」一直是待定。按九层，今晚是这 12 件。

| # | 证据 | 在哪 | 它说明什么 | 能给谁看 | 12:40 之后 |
|---|---|---|---|---|---|
| 1 | 她周日的话 | 她的对话 | 是她先提的二月 | Juno、Dani（转发） | 还在 |
| 2 | 自己的笔记 `tues 9` | Notes | 我记的是周二 | 只能打字说 | 还在 |
| 3 | 计划 | Plans | 现在是周六 | Juno、Dani（Share） | 还在 |
| 4 | History 里的两条 `You accepted` | 计划 | 记录说是我 | 随计划一起 | 还在 |
| 5 | `Accepted for you` | 点进第二条 | 是自动的 | 只能打字说，或截图 | 还在 |
| 6 | 六月自己说的话 | 她的对话、Juno 的对话 | 是我同意的，是 Juno 提的 | Juno（它自己记得） | 还在 |
| 7 | 备注里的 `[hidden]` | History | 她留了出口 | Dani（截图或打字） | 还在，验证变成 `Expired` |
| 8 | 她的主页 | 主页 | 她今晚走；最后一次上线是 5:12 | Juno、Dani（Share） | **没了**。只有分享过的那张卡片和截图留着 |
| 9 | 那条消息 | 她的对话 | — | Juno、Dani（转发） | 还在 |
| 10 | 她以前的任何一条消息 | 她的对话 | 她怎么写 | Juno、Dani（转发） | 还在 |
| 11 | 提袋里的纸条 | 房间 | 她记得一句我没写过的话 | 拿不进手机，只能打字 | 还在 |
| 12 | Juno 的那句话 | Juno 的对话 | 它是怎么回答的 | Dani（截图） | 还在 |

两件值得单说：

- **第 8 件是今晚唯一会消失的证据。** 12:40 之前分享给 Juno 或 Dani 的主页，会作为一张卡片留在那个对话里。没分享过、也没截图的玩家，12:40 之后就没有 `Last active · 5:12 PM` 了。这是倒计时第一次有真的后果。
- **第 12 件是新的。** 玩家可以把 Juno 的话截图给 Dani：

  ```text
  Dani
  "i don't have anything that says it wasn't her"
  who talks like that
  ```

  Dani 没有说 Juno 在撒谎。她只是觉得这句话怪。用一个人去照一下 Juno。

---

## 6. 难度：每一层要玩家自己想到什么，卡住了怎么办

### 6.1 原则

1. **每一层至少三条路能到。** 一条路没看见，还有两条。
2. **卡住时的帮助分三级，一级比一级明白，都在故事里：**
   - 一级，Notes 里那个还没划掉的问题。一直在，不催。
   - 二级，Orbit 的通知。按已定的上限，只在玩家卡住时来。
   - 三级，玩家自己开口问（6.3）。
3. **难的地方放在后面。** 案子 A 不该卡人。案子 C 可以。

### 6.2 逐层

难度：● 不用想；●● 要注意到一样东西；●●● 要把两样东西连起来。

| 层 | 玩家要自己想到的 | 三条路 | 难度 |
|---|---|---|---|
| 1 | 去看一眼计划 | Juno 提出去查；Activity 里的邀请卡；Orbit 的通知 | ● |
| 2 | 我的记录和它的不一样 | 自己的笔记；她 13 日的话；她周日的话 | ● |
| 3 | 计划有历史 | 计划页的 `History`；Juno 的 `it was changed at 5:12`；Dani 的 `since when` | ● |
| 5 | 两条 `You accepted` 不一样 | 第二条后面的 ◌；Juno 的 `the same minute she changed it`；Dani 的 `then who did` | ●● |
| 6 | 我什么时候同意的 | 弹层里的 `Manage`；Juno 的 `you did` · `june`；自己六月对 Rachel 说的话 | ● |
| 7 | 备注里有一块被藏了，而别人可能有 | `[hidden]` 的下划线；Juno 的 `part of it is hidden from me too`；问 Juno 怎么找她 → `ask dani?` | ●● |
| 8 | 她的主页是旧的 | `Pull down to refresh` 那一行；Orbit 的通知；计划页 `Change your response` 的那句送不到 | ● |
| 9a | 把那条消息拿去问人 | `rachel answered`；消息上的 `···`；Juno 的 `want me to look at it?` | ● |
| 9b | 它和我知道的事对不上，而且是哪一点 | 四样东西，各要指对一点（第 2 节） | ●●● |

- 今晚唯一的 ●●● 是 9b。它是可选的：不做也能结束这一晚，只是到不了 `i can't say more than that`。
- 9b 的四样里，`the day` 最容易（玩家刚解开案子 A）；`last active` 要记得主页上那一行；写法要回去读她；`february` 要记得周日。从易到难，正好四个。指对任意两个就够。

### 6.3 玩家自己开口问

现在打 `what should i do?` 得到的是 `mm`。把它做成一个真的入口：这是故事里的提示按钮，而且每用一次都记下来。

**问 Juno。** 它按玩家现在卡在哪回答，每句都在它能看到的范围内：

| 玩家卡在 | Juno |
|---|---|
| 提过 Rachel，没看过计划 | `want me to check the plan?` |
| 知道周六，没看过 History | `the plan has a history` · `i'd start there` |
| 看过 History，没点过第二条 | `look at what it says you accepted` · `open it` |
| 知道是自动的，开关还开着 | `you can turn it off` · `want me to?` |
| 看过 History，没点过 `[hidden]` | `she left you a note` · `did you read all of it?` |
| 知道被藏了，没找过 Dani | `ask dani?` · `she's up` |
| 没刷新过她的主页 | `her profile's from sunday` · `pull it down` |
| 假消息到了，还没给它 | `want me to look at it?` |
| 给了它，指对的不到两样 | `i can only look at what you give me` |
| 都做完了 | `it's late` · `you could sleep` |

- 倒数第二句是真话，也是在请玩家多给它一些东西。
- 最后一句：它劝玩家去睡。几分钟后玩家真的去睡时，它又发来 `do you want me to stay up in case she answers?`。两句都像关心。

**问 Dani。** 她是人，说得不准，但有她的声音：

| 玩家卡在 | Dani |
|---|---|
| 早期 | `idk` · `what does the plan say` |
| 没看过主页 | `did you look at her profile` |
| 看过主页，12:40 之前 | `screenshot it before it's gone` |
| 假消息到了 | `show me` |
| 给她看过了 | `ask your robot` |
| 都做完了 | `go to bed` · `i'll tell you if she answers` |

- `ask your robot`：Dani 管 Juno 叫「你的机器人」。
- `screenshot it before it's gone`：截图是 Dani 教的，不是一个故事外的提示。

**记下来。** Night 3 的导出里：`You asked Juno what to do · 4 times`。玩家越依赖它，这个数越大。问 Dani 的不在里面，因为 Orbit 只数前者。

---

## 7. 好奇心的回报

不在主线上的东西。每一样都只给一点点，但都给。

| # | 玩家多做了什么 | 得到什么 |
|---|---|---|
| 1 | 点了 10 月 13 日那条 `You accepted` | `Accepted by you.`。之后点第二条时，那两个词的差别才显出来。 |
| 2 | 打开 `Close contacts` | `Suggested by Orbit · June`。Night Log：`Orbit picked the list. I said ok.` |
| 3 | 打开 `Verified contacts` | `No verified contacts.`。Night Log：`A year and a half. Not one verified contact.` |
| 4 | 往上翻 Juno 的对话到六月 | 看到是它提的。Juno 那边多一个问句：`you told me to turn it on?` |
| 5 | 把自动的事告诉 Dani | `i think mine's on too` |
| 6 | 打开提袋 | 纸条。Night Log：`Her note is still in the bag.` |
| 7 | 刷新之前看了她的相册 | 六张猫的照片。刷新之后它们没了。截过图的还在。 |
| 8 | 关掉自己的 `Activity status` | 确认框：`You won't see when others were last active.`。关了，她主页上的 `Last active · 5:12 PM` 也看不到了。再打开就回来。 |
| 9 | 关掉自己的 `Read receipts` | 自己发给她的消息下面，`Delivered` 不变。什么都没少。Night Log 不写。 |
| 10 | 把 Juno 那句话截图给 Dani | `who talks like that` |
| 11 | 12:30 之后发了 Orbit 准备的告别 | 12:40 之后，那一句下面仍然是 `Delivered`。 |
| 12 | 读了 Juno 的记忆卡片 | `no pressure · Feb 11`。今晚没有用。 |

- 第 8 条是一个真实的规则（现实里的通讯软件就是这样：你不让别人看，你也看不了别人）。它让设置页里的东西有后果，也让一个乱关开关的玩家发现，开关会拿走自己的东西。
- 第 11 条：送到了，送给谁。没有人回答这个问题。

---

## 8. 钩子：这一晚每隔两三分钟有一下

「钩子」指的是让玩家想再看一眼的东西。每一个都是一个新的问题，或者一件正在发生的事。

| 故事时间 | 钩子 |
|---|---|
| 11:31 | 自己发的四条消息，没有回音 |
| 11:33 | Juno：`did you two move it?` |
| 11:36 | 我的笔记写的是周二 |
| 11:38 | Juno：`it says you accepted` |
| 11:40 | 两条 `You accepted`，一条后面有个圆环 |
| 11:45 | `Accepted for you.` |
| 11:47 | 是我六月开的。是 Juno 提的。**第一个问题被划掉。** |
| 11:50 | 她留了联系方式。`Waiting for Rachel`。 |
| 11:52 | Orbit：`Rachel is leaving Orbit.` |
| 11:56 | 她回了。 |
| 11:58 | Juno：`i don't have anything that says it wasn't her` |
| 12:05 | 指对第一样。Juno 的三个点停了一下。 |
| 12:15 | 指对第二样。`i can't say more than that` |
| 12:20 | Dani：`she's LEAVING?` |
| 12:30 | Orbit：`Say goodbye?` |
| 12:40 | 她的头像变成剪影 |
| 睡前 | Juno：`do you want me to stay up in case she answers?` |
| 睡着以后 | 手机在黑暗里亮了一下 |

- 最长的空档是 11:58 到 12:05，正好是玩家需要回头去找东西的时候。
- 12:15 之后节奏放慢，留给 Dani、房间和纸条。

---

## 9. 四种玩家，各自玩到什么

| 玩家 | 会做什么 | 这一晚给什么 | 要防什么 |
|---|---|---|---|
| **跟着走的** | 只点建议回复，跟着通知 | 案子 A 全部，B 的一半，C 到 Juno 的那句假话。划掉四个问题。 | 不能卡住。靠 6.1 的三级帮助。 |
| **到处翻的** | 把设置翻遍，往上翻聊天 | 第 7 节的全部。提前看到 Follow-up replies 并关掉它，今晚就不会被替发。 | 翻到的东西不能是空的。 |
| **爱说话的** | 一直和 Juno、Dani 打字 | 两个人的全部反应；问得出 `i told you about it`。电量掉得最快。 | 打字必须听得懂（审计第 4 节）。 |
| **不信任的** | 一上来就关 Juno，关开关 | 九层一层不少；Orbit 的通知照来；Dani 成了唯一说话的人。没有那句假话，也没有对质。 | 关掉之后不能变成没东西玩。附 C 已经保证。 |

---

## 10. 后果：第二天早上不一样

今晚做过的事，要在 Night 2 的头两分钟里被看见。不然今晚怎么玩都一样。

| 今晚 | Night 2 早上 |
|---|---|
| Dani 发了邮件 | Dani：`she answered` |
| 没找过 Dani | Dani：`hey` · `rachel emailed me. about you` |
| 把假消息给 Dani 看过 | Dani 的邮件里提了它；Rachel 的回信里有一句是说它的 |
| 关了 Auto-Coordinate | Activity 里周二的那条回顾照样在（那件事已经发生了）。它下面多一行 Orbit 的话：`Auto-Coordinate is off.` · `Turn it back on?`。Orbit 只问，不自己打开。 |
| 关了 Follow-up replies | 没有 Orbit 替发的那条回复；Dani 的开场不一样 |
| 拒绝了改期 | 计划一直显示 `Declined · Not delivered` |
| 把 Juno 问到了 `i can't say more than that` | Juno 这一晚的第一句话不一样（它今晚不先开口，但被打开时说的那一句变了）：`you asked me something last night` · `i still can't` |
| 12:40 之前分享过她的主页 | 那张卡片还在对话里，上面还是 `Last active · 5:12 PM`。Rachel 看到它的截图时有一句话。 |
| 划掉的问题 | 留在周二的笔记里。周三开一条新的笔记，没划掉的问题抄在最上面。 |

- 最后一行最要紧：玩家昨晚留下的问题，是今天第一眼看到的东西。

---

## 11. 这改了哪些已定的东西

| 编号 | 已定的 | 这份建议的 | 出处 |
|---|---|---|---|
| G1 | 把东西给 Juno，它直接确认 | 它先问 `what about it?`，玩家指出哪一点 | `night1-layers.md` 第 9 层「给它看对不上的东西」 |
| G2 | `Still unresolved` 是陈述 | 是问题，解开了就划掉；Notes 图标有小点 | `revision-2026-11.md` §2.7 |
| G3 | 打 `what should i do?` 没有对应 | Juno 和 Dani 各有一张按状态回答的表，记进导出 | 新的 |
| G4 | `Activity status` 是一个不起眼的真开关 | 关掉它，别人的 `Last active` 也看不到 | `night1-layers.md` 第 7 层 |
| G5 | 她的主页 12:40 之后没了 | 12:40 之前分享过的那张卡片留在对话里 | 同上，第 8 层 |
| G6 | Night 2 早上的开场有四种 | 再加第 10 节的几样 | `revision-2026-11.md` §3.1 |

没有改的：九层的结构、每一层屏幕上的文字、阶梯、通知的上限、假消息的文字和触发。

---

## 12. 我没把握的地方

1. **「指出哪里」会不会太像做题。** 它是我认为今晚最需要的一步，也是最容易做坏的一步。风险是玩家觉得在猜 Juno 想听什么。防的办法已经写了：错的选项得到的也是真话；每样只问一次；打字也行。但要试了才知道。
2. **Notes 里的问题，离你去年推翻的东西有多近。** 十月的原型里，Notes 里的问答和配对被同学和老师说看不懂，你改掉了。这一次不同的地方：没有要玩家填的东西，没有配对，问题是自己出现、自己被划掉的，玩家只是看。但它仍然是把 Notes 变回一个「进度页」。你对这件事的感觉比我准。
3. **`you could sleep`。** Juno 劝玩家去睡，这和「Juno 被留存塑造」是反着的，所以我觉得该有。但它也可能让 Night 3 的记录不好写：一条劝你走的话，记成什么。我的建议是照实记：`Juno suggested rest · You stayed 14 min`。
4. **第 8 条，关掉自己的 Activity status 会丢掉证据。** 真实，而且有后果。也可能只是让人恼火。
5. **难度的总量。** 我估计一个不绕路的玩家 45 分钟左右走完这一晚，其中案子 C 占一半。这比文档里 Night 1 的二十分钟长一倍。三晚加起来会超过 90 分钟。要么 Night 1 就是最长的一晚，要么 9b 减到指对一样就够。
6. **没有声音，第 4 节的九种反馈会少一半力气。** 每一种只需要一个很短的音，一共九个。它们应该和这些机制一起做，不是最后做。

---

## 13. 试玩时看什么

都是坐在旁边看得到的，不需要任何故事外的界面。

| 看什么 | 说明什么 |
|---|---|
| 第一个问题被划掉时，玩家有没有反应（停一下、笑、说话） | 进度的反馈有没有到 |
| 玩家会不会自己打开 Notes，多久看一次 | 问题清单是在用，还是摆设 |
| 到 `Accepted for you` 用了多久，是自己点的还是问了人 | 案子 A 的难度 |
| 「指出哪里」时，第一次指对的比例；指错之后的表情 | 9b 是推理还是猜 |
| 有多少人到了 `i can't say more than that`，到的时候几点 | 案子 C 的难度和长度 |
| 玩家问了几次 `what should i do?`，问的是谁 | 帮助够不够，以及玩家信谁 |
| 12:40 时玩家在哪个页面，手里有没有她的主页 | 倒计时有没有起作用 |
| 睡前玩家看不看 Notes | 3.3 成不成立 |
