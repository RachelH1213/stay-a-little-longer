# Unity 版 Night 1：剧情和玩法（2026-11）

上一份（`2026-11-fable-unity-audit.md`）讲的是代码上的错。这份只讲做出来的 Night 1 作为一个故事、一个游戏，问题在哪，怎么改。没有改动任何现有文档。

依据的是 `develop` 的 `eb77e45`。下面「现在玩一遍」那一节，是按代码里的触发条件和台词推出来的，没有人运行过。

---

## 1. 现在玩一遍是什么样

一个第一次玩、每次都点第一个建议回复的玩家：

| 故事时间 | 玩家做了什么 | 发生了什么 |
|---|---|---|
| 11:31 | 点桌上的手机，上滑，点 Juno 的通知 | `still awake?` |
| 11:33 | 点 `someone didn't show up` | `that's a rough way to end the day` · `who was it?` |
| 11:34 | 点 `rachel, we were supposed to meet at 9` | `rachel?` · `you had a plan with her tonight, right?` · `want me to check it?` |
| 11:35 | 点 `yes` | Juno 一口气说完五句：她 5:12 改了计划；现在是周六；Conversation Assist 替你接受了；你六月打开了 Auto-Coordinate；她留了备注，有一部分被藏了。再给一张卡片。 |
| 11:36 | 点卡片 | Change history。和 Juno 刚说的一样。 |
| 11:37 | 打开 Rachel 的对话，点 `i didn't know you moved it` | `Delivered`。 |
| 11:37，约四十秒后 | — | 假消息到了。 |
| 11:38 | 点 `what do you mean?` | `Delivered`。没有回音。 |
| 之后 | 回到 Juno 的对话 | **没有任何建议回复。** Juno 不提那条消息。 |
| 之后 | 打开 Dani，连点三个建议回复 | Dani 发了邮件。 |
| 之后 | 可能刷新了 Rachel 的主页 | 她要离开 Orbit。 |
| 11:45 以后 | 放下手机，`Go to sleep` | 日期卡，回标题。 |

真实时间大约五到八分钟。

**这个玩家没有碰到的东西：** Juno 的那句假话；「你本来想对她说什么」；说出哪里不像她；纸条；充电宝；12:40。也就是 Night 1 后一半的全部内容。

原因在代码里：Juno 关于假消息的建议回复，只有在它「拿到了」那条消息之后才出现（`JunoFakeSuggestedReplies()` 开头的判断）。而把消息交给它只有两条路：长按消息再转发（没有任何提示），或者打出一句恰好匹配的话。

---

## 2. 问题

### 2.1 第一个案子，是 Juno 在第一分钟替玩家破的

- 「她为什么没来」是今晚唯一一个玩家有能力自己查清楚的问题。文档里它叫 The Changed Plan，写的是「一个玩家真的能破的小案子」。
- 现在它的全部答案，在三次点击之后由 Juno 用五句话说完。玩家没有找，没有猜，没有吃惊的机会。
- 文档写的是「Juno 帮玩家理解，它永远不是钥匙」。但锁屏上只有 Juno 的通知，点进去就是 Juno 的对话，三个按钮通向答案。最省事的路，就是 Juno 这条路。

### 2.2 前三分钟被牵着走，之后没有任何东西牵着走

- 前半段：每个对话是一台点三下的机器。Juno 三下，Dani 三下，Rachel 一下。
- 后半段：假消息到了以后，游戏里没有任何东西告诉玩家可以拿它做什么。通知把人带到 Rachel 的对话，那里的两个建议回复发出去都没有回音。Juno 的对话里是空的。
- 所以这一晚的形状是：一段过场，然后一片空地，然后睡觉。

### 2.3 玩家找到的东西，没有地方可用

- 找到「Orbit 替我接受了」之后，玩家能做的只有关掉一个开关。计划本身没有任何可以操作的东西：不能撤回那个「接受」，不能回复改期。
- 找到「她要离开」之后，什么都不能做。
- 找到「邮箱被藏了」之后，弹窗里有一个去设置的按钮，关掉以后「已经藏了的不恢复」。
- 没有一个发现会带来下一个发现，也没有一个发现会改变任何人对玩家说的话。Juno 和 Dani 不知道玩家看过什么。

### 2.4 这一晚没有起伏

文档里的四个阶段是有情绪的：被放鸽子 → 不是她的错 → 一条不对劲的道歉 → 她没了。做出来的版本里：

- 「被放鸽子」只有四条灰色的气泡，玩家一眼扫过。Rachel 是谁、为什么在乎，没有内容支撑。
- 「不是她的错」在第一分钟由 Juno 交代完，没有翻转的感觉。
- 「不对劲的道歉」太假，而且没有后续。
- 「她没了」多数人看不到。

没有一个时刻是玩家自己推出来的，也没有一个时刻是被打了一下的。

### 2.5 没有对手，也没有同伴

- Juno 是问讯处。它回答，然后沉默。它不追问，不关心，不拦着，不记得。
- Dani 是一个发邮件的按钮。
- Orbit 这个 App 整晚不出声。
- 所以玩家是一个人在翻一部安静的手机。没有东西在推，也没有东西在拉。

### 2.6 玩家的动作太少

现在真正能做的只有两种：点一个准备好的句子，打开一个页面。「拿给别人看」（转发、分享截图）是做出来了的，但藏在长按和下拉里，而且拿给谁看结果都差不多。

---

## 3. 改法的总思路

三句话：

1. **Juno 给异常，不给解释。** 它告诉玩家「计划上写的是周六」，剩下的由玩家自己去看、自己问出来。
2. **「拿给人看」是这个游戏的主要动作。** 玩家找到的每一样东西，都可以拿给 Juno 或者 Dani 看，两个人的反应不一样，每一次都会带出下一步。
3. **这一晚的高潮，是玩家把 Juno 问到说不下去。** Night 1 结束时玩家应该相信「Juno 知道的比它说的多」。现在这个结论是点两下建议回复得到的。它应该是玩家拿着自己找到的东西，一层一层逼出来的。

下面每一节是具体的做法。台词都是草稿。

---

## 4. 这一晚应该有的形状

不是点击的顺序，是情绪的顺序。玩家可以乱序，但每一拍都要由玩家自己走到。

| 拍 | 玩家的感受 | 靠什么 | 现在缺什么 |
|---|---|---|---|
| 1. 被放鸽子 | 她没来。我发的消息她没回。 | 手机拿起来就停在她的对话上；她过去一年的聊天 | 开场停在 Juno 那里；Rachel 只有 21 句话 |
| 2. 不对 | 计划上写的怎么是周六？ | Juno 说了一句；或者玩家自己在 Activity 里看到 | Juno 一次说完了所有的事 |
| 3. 翻转 | 是她改的。我没点过接受。 | 玩家自己打开 Change history | 同上 |
| 4. 追 | 那是谁点的？我什么时候同意过？她留的联系方式呢？ | `Handled by Conversation Assist` → 设置；六月的聊天；被藏的邮箱 | 没有东西让玩家往下追 |
| 5. 她要走 | 她的主页在倒数。 | 刷新主页；或者 Orbit 的告别提醒 | 主页是空的 |
| 6. 回音 | 她回我了。……这不对。 | 假消息 | 太假；到了以后无事可做 |
| 7. 问 | 拿去问 Juno，拿去问 Dani。 | 「拿给人看」 | 入口是藏着的 |
| 8. 逼 | Juno 越问越短，最后说它不能再说了。 | 对质的阶梯（第 6 节） | 两下就到底 |
| 9. 她没了 | 头像在眼前变成剪影。 | 12:40 | 到不了 |
| 10. 睡 | 手机在黑暗里又亮了一下。 | 结尾的画面 | 没有 |

---

## 5. Juno 的第一条线：从「三下点完」到「一层一层问出来」

### 5.1 原则

Juno 每次只回答被问到的那一件事。文档里对假消息已经是这么规定的（「只回答玩家问的，从不先指出矛盾」），计划这条线没有照这个做。

### 5.2 改成这样

玩家说了是 Rachel，Juno 提出去查，玩家说好：

```text
Juno
it says saturday
did you two move it?
```

- 只有这两句。它说的是计划现在的样子，然后问了一个问题。
- 这个问题玩家答不上来，这就是那一下「不对」。
- 建议回复：`no` · `saturday??` · `let me look`。没有一个是结论。
- 那张计划卡片照旧出现，玩家可以点进去自己看。

之后 Juno 知道的每一件事，都要玩家问到才说。玩家可以打字问，也可以看完 Change history 之后回来，这时建议回复才出现对应的问句：

| 玩家已经看到了 | 出现的建议回复（都是问句） | Juno |
|---|---|---|
| 计划写着周六 | `who moved it?` | `she did. 5:12 this afternoon` |
| Change history 里的 `Change accepted` | `i never accepted that` | `conversation assist did` · `it's allowed to` |
| → | `allowed by who?` | `you. in june` · `it shouldn't have done that without asking` |
| `Handled by Conversation Assist` 点进了设置 | `what's auto-coordinate?` | `it says yes to schedule changes from people you trust` · `she was on the list` |
| 备注里的 `[contact info hidden]` | `what did she write?` | `i see the same thing you do` · `part of it is hidden from me too` |
| 以上任何一条之后 | `why didn't you tell me?` | `i only see plans when i look` · `i should have looked` |

- 内容和现在那五句话是一样的。区别是每一句都是玩家问出来的。
- `you. in june` 之后，玩家往上翻 Rachel 的聊天，能找到自己六月说的那句 `i said yes to everything`（如果采纳了场景草稿里的那一段）。证据是玩家自己的话。
- 不走 Juno 这条线的玩家，从 Activity → 计划 → Change history → 设置，能看到同样的东西。Juno 关着的时候也一样。

### 5.3 计划本身要能操作

现在计划详情页只有两行：`Change history`、`Message Rachel`。一个刚发现「我没同意过」的人，第一反应是去撤回。

加一行 `Change your response`，点开：

```text
Change your response

You accepted this change on Oct 20 at 5:12 PM.

[ Decline the change ]
[ Keep it ]
```

- 第一行那句话是 Orbit 的说法：是「你」接受的。
- 点 `Decline the change`：

  ```text
  Rachel can't be reached on Orbit right now.
  Your response will be sent if she returns.
  ```

  状态变成 `Declined · Not delivered`。
- 玩家做了一件事，而它送不到。这比关掉一个开关更有感觉，也让「她已经不在这个 App 里了」第一次落到实处。
- 这是一个新的可操作的东西，要你定。它只需要一行、一个弹层、一个状态。

---

## 6. Juno 的第二条线：对质的阶梯

### 6.1 先解决入口

假消息到了以后，必须有看得见的路把它带到 Juno 和 Dani 面前。三个都要：

1. **每条消息上有一个看得见的东西可以点**（悬停时出现的 `···`），点开就是现在长按的菜单。长按保留。
2. **假消息到达后第一次打开 Juno 的对话，输入框上面出现一个建议回复：`rachel answered`。** 它只是报告一件事，不带任何判断。Juno 回 `she did?` · `want me to look at it?`。同意了，消息就交给它（这条路现在已经有，只是没有入口）。
3. **Dani 的对话里同样出现 `rachel answered`。** Dani：`what did she say??`，然后玩家转发，或者打字。

### 6.2 阶梯

Juno 对假消息的态度，由玩家拿给它看过什么决定。文档里已经有这张表的雏形（「Juno's stance on MSG_1048」），做出来的版本没有按它做成一级一级的。

| 级 | 玩家要先做到 | 玩家问 | Juno |
|---|---|---|---|
| 0 | 把消息交给它 | — | `ok. i have it` · `what do you want to know?` |
| 1 | — | `did she send this?` | `it came through her account` |
| 2 | — | `but did she write it?` | `i know it reads strange` · `i don't have anything that says it wasn't her` |
| 3 | 给它看过一样对不上的东西（见 6.3） | 再问一次是谁写的 | `i can only tell you where it came through` |
| 4 | 给它看过两样 | 再问 | `i can't say more than that` |
| 5 | 到过第 4 级 | `can't or won't?` | （三个点出现，停了，又出现，然后）`can't` |

- 第 2 级是那句唯一的假话，位置不变。任何玩家问两次都能听到。
- 第 3 级以上，要靠玩家自己找到的东西才上得去。**这就是 Night 1 的「赢」**：不是证明了那不是她（今晚证明不了），而是把 Juno 逼到承认它有话不能说。
- 到了第 4 级，Night Log 多一行：`Juno says it can't say more.`。这是事实，不是结论。
- 第 5 级是可选的最后一下。输入中的三个点停顿再出现，是原型里已经有的做法（Juno 撒谎时的 `retype`）。
- 到不了第 3 级的玩家，这一晚也能结束。他们带着第 2 级的那句话去睡。

### 6.3 什么算「对不上的东西」

玩家不是说出矛盾，是把两样东西摆在一起。每一样都是一个动作：

| 玩家做的 | 它是什么 | Juno 当时的回应 |
|---|---|---|
| 把计划分享给 Juno（计划详情页加一行 `Share`） | 消息说「今晚」，计划说周六（A 版） | `the plan was moved to saturday` · `the message says tonight` |
| 把刷新后的主页截图给它 | 消息 11:37 到，Last active 是 5:12 | `last active is when she last had the app open` · `a message can go out without that` |
| 转发一条她以前的消息 | 写法 | `i can't see your chat with her` · `how does she usually write?` |
| 转发她周日那句 `there's something i wanna show you` | 她自己提的二月，这条消息说不用再提 | `the message says to drop february` · `what happened in february?` |

- 每一条 Juno 都只确认玩家摆出来的东西，不多说一句。
- 四样里做到任意两样，就能到第 4 级。
- 这四样正好是文档里列的四个破绽。区别是它们现在是按钮上的现成句子，这里是玩家的动作。

---

## 7. 「拿给人看」：同一样东西，两个人反应不同

这是把一堆页面变成一个游戏的那一步。玩家找到一样东西，有两个人可以给，各自带出不同的下一步。

| 玩家拿出来的 | Juno | Dani |
|---|---|---|
| 假消息 | 第 6 节 | `she sent you this??` · `what did you say to her before this?` |
| 计划被改的记录 | `she did. 5:12 this afternoon`（它本来就能看到） | `wait she moved it` · `and you said yes?` → 玩家：`i didn't` → `then who did` |
| 被藏的邮箱（截图） | `i see the same thing you do` | `oh it does that` · `it ate my number once` · `i have her email. she paid me back for the game pack once` · `want me to try it?` |
| 她要离开的主页（截图） | `it's been on her profile since monday` · `i didn't think it was mine to tell` | `she's LEAVING?` · `she didn't tell me either` |
| 她以前的一条消息 | `i can't see your chat with her` · `how does she usually write?` | `yeah that's her` · `the new one isn't. idk why` |
| 纸条 | 拿不了，那是纸。玩家只能打字告诉它：`i can't see what you two said back then` · `is it in your thread?` | 同样只能打字：`she sent you a POWER BANK` · `ok that's kind of sweet` |

要点：

- **Dani 的邮件现在是三下点出来的。** 改成：玩家把「邮箱被藏了」拿给她看，她才想起自己有邮箱。发现带来了下一步。
- **Dani 不知道 Rachel 要走。** 玩家给她看，她才知道。玩家第一次比一个角色知道得多。
- **`then who did`** 是 Dani 问的。她不知道答案，玩家知道一半。
- **Juno 精确，Dani 是人。** 同一样东西给两个人看，玩家会感觉到差别。这就是「Juno 被质问时变得精确、技术化」被玩出来的样子。
- **纸条拿不出手机。** 这是「Orbit 看不到的地方」被玩出来的样子。
- 需要写的：6 样东西 × 2 个人，大约 40 句。全部是固定台词。

---

## 8. 后半夜

### 8.1 Orbit 要出声

现在 Orbit 整晚沉默。它应该做一个留存驱动的 App 会做的事，这些事同时把玩家带到还没看过的地方。每一条都是真 App 会发的通知，按玩家还没做过什么来选，一晚最多三条：

| 条件 | Orbit 的通知 | 点了去哪 |
|---|---|---|
| 玩家还没打开过计划，过了 8 个故事分钟 | `You have a plan this week.` · `First time, finally · Sat` | 计划 |
| 玩家还没刷新过她的主页，过了 11:50 | `Rachel is leaving Orbit.` · `You can still reach her until 12:40 AM.` | 她的主页 |
| 假消息到了，玩家 5 分钟没回 | `Rachel is waiting for your reply.` | 她的对话 |
| 12:30 | `Rachel leaves Orbit in 10 minutes. Say goodbye?` | 她的对话 |

- 第一条让一个什么都没找到的玩家看到「Sat」。
- 第三条是 Orbit 在催玩家回一条它自己写的消息。
- 这就是提示系统。它不在故事外面，而且每一条都会出现在 Night 3 的记录里。

### 8.2 Juno 要在

`2026-11-fable-juno-lines.md` 的第 1、2 节：它的过去，和玩家要走的时候它说的话。

### 8.3 Rachel 要是一个人

`2026-11-fable-scenes.md` 的第一节，由你重写。没有这个，第 1 拍和第 9 拍都不成立。

### 8.4 12:40 和结尾

`2026-11-fable-scenes.md` 的第五节：房间里随时能等；删号时玩家眼前发生什么；睡着以后手机在黑暗里亮一下。

### 8.5 房间

现在放下手机等于暂停。让它有三个用处，都已经有素材或者只要很少：

1. 等（8.4）。
2. 纸条，以及纸条拿不进手机这件事（第 7 节）。
3. 手机在桌上的时候，是通知到达最有分量的时候：亮一下、震一下、玩家决定拿不拿。8.1 和 8.2 的通知，在玩家放下手机时才真正起作用。

---

## 9. 做了这些以后，再玩一遍是什么样

同一个玩家，仍然偏爱点建议回复：

1. 拿起手机，是 Rachel 的对话，自己发的四条消息没有回音。往上翻了翻。
2. Juno 的横幅滑下来。点进去，说了有人没来，说了是 Rachel。Juno 去看了计划：`it says saturday` · `did you two move it?`
3. 玩家愣了一下，点进卡片。看到是她改的，看到 `Change accepted · Handled by Conversation Assist`。
4. 回去问 Juno：`i never accepted that`。一句一句问出六月的事。往上翻聊天，找到自己说的那句话。
5. 去计划里想撤回。送不到。
6. Orbit 的通知：`Rachel is leaving Orbit.` 去看主页，一样一样变成 `Unavailable`。
7. 回她的对话打了一句话。四十秒后，她回了。
8. Juno 的对话里出现 `rachel answered`。交给它。问了两次是谁写的，得到那句话。
9. 觉得不对。把计划分享给 Juno。把主页的截图给它。它越答越短。`i can't say more than that`。
10. 给 Dani 看。Dani：`she's LEAVING?`。给她看被藏的邮箱，她想起自己有邮箱，发了邮件。
11. 放下手机。打开提袋。纸条。
12. 12:30，手机在桌上亮了：`Say goodbye?`。拿起来，看着她的头像变成剪影。
13. 去睡。Juno：`do you want me to stay up in case she answers?`
14. 黑暗里，手机又亮了一下。

大约二十分钟。每一步都是玩家自己走的，每一步都接着上一步。

---

## 10. 和已定内容的冲突

这些要你点头，因为它们改的是文档里已经定了的东西：

| 编号 | 已定的 | 这份建议的 | 出处 |
|---|---|---|---|
| P1 | Juno 查完计划后说五句话（2026-11-12 定稿） | 只说两句，其余由玩家问出来 | `night1-routes.md` 1.3 |
| P2 | 计划详情页只有两行 | 加 `Change your response` 和 `Share` | `orbit-ia.md`「Plans」 |
| P3 | Juno 从不先提假消息；没有任何东西等着玩家 | 假消息到达后出现一个建议回复 `rachel answered` | `night1-scenes.md`「When Juno may mention Rachel」。它仍然不是 Juno 先提，是 Orbit 的建议回复 |
| P4 | 被追问后 Juno 说 `i can only tell you what orbit shows me` | 分成五级，中间要玩家拿出东西 | `night1-scenes.md` 第二轮 |
| P5 | 关于假消息的建议回复里有现成的发现（`why is it apologising for tonight?`、`she never uses periods`） | 发现改成动作（分享计划、截图、转发） | 同上 |
| P6 | Dani 听说 Rachel 没来就提出发邮件 | 玩家给她看被藏的邮箱，她才想起来 | `night1-scenes.md`「Dani on Night 1」 |
| P7 | Orbit 今晚不发任何通知 | 最多三条，按玩家没做过的事来选 | `orbit-ia.md`「Activity on Night 1」 |
| P8 | 截图的入口在状态栏下拉里 | 截图在这里成了两条证据的入口，必须找得到 | `night1-scenes.md`「Night 1 systems」 |

**P8 和第二轮意见有出入，要说明：** 我在第二轮意见 3.7 里写过「Night 1 不依赖截图」。按 6.3，主页那一条用的是截图。两个办法：给主页也加一行 `Share`（和计划一样），这样 Night 1 仍然不依赖截图；或者接受截图是 Night 1 的一部分，并且让它找得到。我倾向前一个。

---

## 11. 做的顺序

接在审计那份的轮次里。

- **审计的第 1、2 轮照旧先做。** 打字和通知是坏的，上面这些都要靠它们。
- **你现在可以定的：** P1 到 P8。
- **你现在可以写的：** 第 5 节的问答表、第 6 节的阶梯、第 7 节的反应表。加起来大约 70 句 Juno 和 Dani 的话。我的草稿可以当底稿。
- **做的顺序，按它对「玩起来像个游戏」的贡献排：**
  1. 看得见的转发入口，和 `rachel answered`（6.1）。这一条最小，效果最大：它让后一半的内容第一次有人玩到。
  2. Juno 的计划线改成问答（第 5 节）。
  3. 对质的阶梯，和四个「摆在一起」的动作（第 6 节）。
  4. Dani 的反应（第 7 节）。
  5. Orbit 的通知（8.1）。
  6. 计划的 `Change your response`（5.3）。
  7. 后半夜（8.2 到 8.5）。

第 1 项到第 4 项做完，Night 1 就从「一段过场加一片空地」变成一个有问题、有动作、有高潮的二十分钟。
