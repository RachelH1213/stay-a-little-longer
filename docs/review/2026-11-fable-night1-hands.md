# 第一晚：读以外的动作，完整设计

按 `2026-11-fable-beyond-reading-reply.md` 的结论写，带上设计窗口提的两处注意：

1. 共同的计划不能是已经停了的那个每周五的 game night，要是一个还在的计划。
2. 玩家先关掉自己的 Auto-Coordinate 再试，结果要不一样。

我对着 `night1-layers.md`（现在的版本）逐层写的。游戏里的字是英文，说明是中文。**新的台词和界面文字都是草稿。** 引用的已定台词标了「已定」。

日历（第 6 节）作者还没定，写成可以整节拿掉的样子。

---

## 0. 这一份加了什么

| # | 加的 | 多大 |
|---|---|---|
| 1 | **试一下：** 玩家自己改一个和 Dani 的计划，从 Rachel 那一边看一次；Dani 改回来，从自己这一边再看一次 | 这一份的主体。一个新计划，Dani 约 14 句，三个弹层 |
| 2 | Screen Time 画成一条 | 一页的版式 |
| 3 | 对一对，第一晚能用的三处 | 在卡片上加，随第二晚一起做也可以 |
| 4 | Juno 替玩家做的事，记下来 | 只加记录，几乎没有新的字 |
| 5 | 走出去的第一步 | 已定的 `Keep on`，不加东西 |
| 6 | 墙上的日历（待定） | 一小块画，一行笔记 |

细化时我改了自己上一份里的一处，先说在这里：

**上一份写的是「Dani 的消息马上就到：`did you just move game night`」和「一条横幅 `Plan updated · Accepted for you`」。这两样都不对。** 已定的是：改期被自动接受时，Orbit 不通知任何人（`orbit-ia.md`：今晚没有关于改期的通知，第二天的回顾里才有）。所以 Dani 不会自己发现，玩家这边也不会有横幅。**没有人被告知，这正是这件事本身。** 下面是按这个写的，而且我认为比上一份更好：玩家得自己去问 Dani，Dani 是被玩家问了才发现的。

---

## 1. 试一下

### 1.1 那个计划从哪来

每周五的 game night 九月底就停了（已定：Dani 9 月 27 日说 `ping me when you're alive again`；Juno 10 月 2 日说 `you used to have plans on fridays`）。

**今晚玩家第一次给 Dani 发消息，就是那一声 ping。** 她借这个把 game night 约回来。

**什么时候：** 玩家今晚给 Dani 发过消息，她第一轮的回答已经出现，之后过了 2 个故事分钟，或者玩家又对她说了一句，先到的那个。只发一次。假消息到达后的 3 个故事分钟内不发；12:30 之后不发。

```text
Dani
also
you pinged me so you're alive again
game night friday?

┌────────────────────────────────────┐
│ Game night                         │
│ Fri, Oct 23 · 9:00 PM · Online     │
│ Dani invited you                   │
│ [ Accept ]            Decline      │
└────────────────────────────────────┘
```

| 玩家 | 发生什么 |
|---|---|
| 点 `Accept` | 卡片上那一行变成 `Accepted by you`。Dani：`good` |
| 点 `Decline` | `Declined`。Dani：`fair` · `next week then`。这个计划没有了，这一节后面的事不会发生。 |
| 不理 | 卡片一直是 `Dani invited you`。Activity 和 Plans 里它写着 `Waiting for you`。 |

- **不理的那一种，本身就是一样证据。** Dani 的邀请一直在等玩家点，而 Rachel 5:12 的改期没有等。两样东西并排在 Plans 列表里。没有任何地方指出这一点。
- 她的消息不占今晚四条通知的名额（已定：Dani 的消息不占）。

**我考虑过、没有用的做法：** 邀请是今天下午发的，开局就在。不行的原因：序幕里 9:27 看锁屏是「没有通知」；已定的 Activity 今晚只有 10 月 13 日那一张邀请卡。

**没给 Dani 发过消息的玩家**不会有这个计划，也就没有这个实验。「是自动的」另外还有四条路（已定，第 5 层），所以不要紧。

### 1.2 多出来的两处界面

**Activity：**

```text
ACTIVITY                               PLANS ›

OCT 20
Dani invited you to a plan
Game night
Waiting for you                             ›

OCT 13
Rachel invited you to a plan
First time, finally
Accepted by you                             ›
```

**Plans 列表：**

```text
‹ ACTIVITY          PLANS

Game night                        WAITING FOR YOU
Fri, Oct 23 · 9:00 PM · Dani                ›

First time, finally                      ACCEPTED
Sat, Oct 24 · 9:00 PM · Rachel              ›
```

接受之后第一行右边是 `ACCEPTED`。

### 1.3 玩家自己接受了一次

点了 `Accept` 之后，这个计划的 History：

```text
‹ PLAN              HISTORY

OCT 20 · 11:44 PM
Dani made this plan                         ›
Fri, Oct 23 · 9:00 PM · Online

OCT 20 · 11:45 PM
You accepted                                ›
```

点那条 `You accepted`：

```text
Accepted
Oct 20 · 11:45 PM

Accepted by you.

[ Close ]
```

- 没有圆环。这是玩家今晚亲手点的。
- 玩家现在知道「自己接受一个计划」是什么样的：要点一下。5:12 那一次，玩家没有点过任何东西。

### 1.4 改时间

计划详情多一行 `Change the time`（每个计划都有，见 1.9）：

```text
‹ PLANS             PLAN

Game night
With Dani
WHEN     Fri, Oct 23 · 9:00 PM
WHERE    Online
STATUS   Accepted

History                                     ›
Change the time                             ›
Change your response                        ›
Share                                       ›
Message Dani                                ›
```

点 `Change the time`：

```text
Change the time

Game night
Fri, Oct 23 · 9:00 PM

[ Fri, Oct 23 · 10:00 PM ]
[ Sun, Oct 25 · 9:00 PM ]
[ Fri, Oct 30 · 9:00 PM ]

Cancel
```

- 三个现成的选项，不做日期选择器。
- 没有周六：周六 9 点是和 Rachel 的那一个。

玩家点了其中一个（下面以周日为例）。弹层关掉，回到计划详情。**它已经是这样了：**

```text
Game night
With Dani
WHEN     Sun, Oct 25 · 9:00 PM
WHERE    Online
STATUS   Accepted · 11:48 PM
```

没有「等待 Dani 确认」的那一刻。玩家松手的同一秒，它就是 `Accepted`。

History 多了两条：

```text
OCT 20 · 11:48 PM
You changed the time                        ›
FROM   Fri, Oct 23 · 9:00 PM
TO     Sun, Oct 25 · 9:00 PM

OCT 20 · 11:48 PM
Dani accepted                               ›
```

点 `Dani accepted`：

```text
Accepted
Oct 20 · 11:48 PM

[ Close ]
```

- **没有 `by` 也没有 `for`。没有圆环。** Orbit 只对你自己的接受说是谁点的；对方的接受，它只说「接受了」。
- 这就是 Rachel 周二下午看到的画面（已定，`evidence-matrix.md`：她那边只有 `Accepted` 和时间，从没说是谁点的）。玩家现在坐在她的位置上。
- 花费：+1 分钟，−0.5%。

### 1.5 没有人告诉 Dani

改完之后，什么都不会发生。Dani 不知道。

Dani 的对话里多一个建议回复：`did you just accept that?`（玩家刚在自己的屏幕上看到了 `Dani accepted`，所以这句是在接屏幕上的东西。）

```text
You
did you just accept that?

Dani
accept what

（输入中。三秒。）

Dani
game night's on sunday??
i didn't touch anything
```

建议回复：`it says you did`

```text
You
it says you did

Dani
well i didn't
```

- `it says you did` 是今晚早些时候 Juno 对玩家说的原话（已定，第 3 层）。现在是玩家对 Dani 说。Dani 的回答，就是玩家当时的回答。
- 玩家没有问她的，她一个字都不会提：她确实不知道。

接着，隔一拍。按她之前说没说过那一句分两种：

| 之前 | Dani |
|---|---|
| 还没说过 `i think mine's on too` | `oh` · `is this the thing from game night` · `i think mine's on` |
| 已经说过了 | `oh` · `ok so mine IS on` |

然后：

```text
Dani
moving it back
```

（真实时间三四秒。）

```text
Dani
there
did it ask you?
```

### 1.6 她改回来：两种结果

**玩家的 Auto-Coordinate 开着。**

没有通知，没有横幅。玩家什么都没碰。打开计划：

```text
WHEN     Fri, Oct 23 · 9:00 PM
STATUS   Accepted
```

History 多了两条：

```text
OCT 20 · 11:50 PM
Dani changed the time                       ›
FROM   Sun, Oct 25 · 9:00 PM
TO     Fri, Oct 23 · 9:00 PM

OCT 20 · 11:50 PM
You accepted  ◌                             ›
```

点它：

```text
Accepted
Oct 20 · 11:50 PM

Accepted for you.
Auto-Coordinate is on for Dani.

[ Close ]
```

建议回复：`no`

```text
You
no

Dani
ok that's creepy
```

**玩家已经关掉了 Auto-Coordinate。**

这一次 Orbit 来问了：

```text
ORBIT · 11:50 PM
Dani changed Game night.
Fri, Oct 23 · 9:00 PM
```

```text
WHEN     Fri, Oct 23 · 9:00 PM
STATUS   Waiting for you

[ Accept the change ]
Decline
```

建议回复：`yes`

```text
You
yes

Dani
it didn't ask me
so that's just mine now
```

- 这是玩家今晚第一次看到 Orbit 在一件改期上停下来等自己。
- **关掉的只是自己这一边。** Dani 的还开着，Rachel 的也从来没有人关过。
- 这一条 Orbit 的通知是对一件事的回应，不占四条的名额。

### 1.7 记下、Night Log、笔记本

| 事实（新） | 什么时候记 |
|---|---|
| `accepted_dani_invite` | 点了 `Accept` |
| `tested_auto_accept` | 改了时间，看到 `Accepted` |
| `saw_other_side` | 点开过 `Dani accepted` 那个弹层，或者 Dani 说了 `i didn't touch anything` |

`knows_auto_accepted`（已有）在下面任何一样发生时记下：Dani 说了 `well i didn't`；或者玩家看到了 game night 上那条带 ◌ 的 `You accepted`。**这是「是自动的」的第五条路。**

Night Log：

```text
11:48 PM
I moved game night. It said Dani accepted. Same second.

11:49 PM
Dani didn't accept anything.

11:50 PM
She moved it back. It said I accepted. I was watching.
```

关着 Auto-Coordinate 的玩家，最后一条是：

```text
11:50 PM
She moved it back. This time it asked me. It never asked her.
```

笔记本上 `who said yes` 这个问题如果还开着，在 `Dani didn't accept anything.` 写下的那一刻被划掉。

### 1.8 Juno

不需要新的台词。

- 做过实验之后，Juno 的对话里出现已定的那个建议回复：`then who accepted it?` → `there's a plans setting` · `it can say yes for you`（已定，第 5 层的表里）。
- Juno 不会主动提这个实验，也不会提 game night 被动过。它只在去看的时候看得到计划（已定：`i only see plans when i look`）。

### 1.9 Rachel 的那个计划上也有 `Change the time`

每个计划的详情页都有这一行，不然两个计划的页面不一样，玩家会觉得 game night 是特地放在那里的。

在 Rachel 的计划上点它，不出选项，直接是：

```text
Rachel can't be reached on Orbit right now.
You can change the time when she returns.

[ OK ]
```

什么都不改，不记进 History。和已定的 `Change your response` 那个弹层是同一种说法。

### 1.10 边上的情况

| 情况 | 怎么处理 |
|---|---|
| 玩家还什么都没发现就改了 game night | 照常。玩家只会觉得「接受得真快」。等看到 Rachel 那条 5:12 的记录，这一下才有意思。不拦。 |
| 玩家改了时间，但不去问 Dani | Dani 什么都不说。计划就停在周日。Night Log 只有第一条。第二晚早上 Dani：`why is game night on sunday`（要随第二晚写）。 |
| 玩家改了两次 | 每次都是一秒接受。Dani 那几句只说一次，之后她只说 `stop moving it`。 |
| Dani 改回来之后，玩家拒绝了（关着的那一种） | `Declined`。Dani：`ok sunday then`。计划留在周日。 |
| 实验做到一半假消息到了 | 横幅照常出现并留在顶上（已定）。Dani 那边的话照常说完。 |
| 12:40 之后 | 不受影响。这是和 Dani 的计划。 |
| Battery Saver 开着 | 不受影响。 |
| Juno 关着 | 不受影响。整个实验不需要 Juno。 |
| 夜晚结束时 Orbit 替玩家回 Dani 的那一句（已定，§2.8） | 那张表是按 Dani 的最后一句选的。她的最后一句现在可能是 `ok that's creepy` 或 `so that's just mine now`。**表里要加一行**，我建议：Orbit 替玩家回 `haha yeah. night.`（草稿）。它用一句轻松的话把这件事盖过去了。 |

### 1.11 第三晚的导出里

按已定的写法（只写顺序，Orbit 的好话）：

```text
11:45 PM  You accepted a plan · Game night

11:48 PM  You changed a plan's time
          Accepted                                   View plan ›

11:50 PM  Plan change accepted for you
          Auto-Coordinate · On since June
          You weren't asked                          View plan ›
```

最后一条的格式，和导出里 5:12 那一条一模一样。

### 1.12 以后可以加的一步（现在不做）

Rachel 改期时留了一句备注，里面的邮箱被藏掉了。如果 `Change the time` 也让玩家写一句备注，玩家可以把自己的邮箱写进去，然后问 Dani 她看到了什么：`[hidden]`。那是从另一边看第 7 层。

它要识别玩家打的字里的邮箱和号码，工作量不小。先不做，记在这里。

---

## 2. Screen Time 画成一条

第 4 层的内容不变，只改它长什么样。

```text
‹ SETTINGS          SCREEN TIME

TODAY · TUE, OCT 20

12AM      6AM       12PM      6PM       12AM
░░░░░░░░░░░░░░░░░░░░░░▓░░░░░░░░░░░░░▓▓░░░▓
                      │             │    │
                      1:48 PM       9:02  11:31

Orbit                                 1h 14m  ›
Notes                                     6m
Photos                                    2m
```

- 一条从半夜到半夜的横条，占满页面的宽度（248 个单位，大约 10 分钟一格）。屏幕亮着的时候是实的。
- 下午 1:52 到晚上 9:02 是一整段空的。**上面没有任何记号在 5:12 的位置。**
- 点 `Orbit` 那一行，展开已定的三行时间（`1:48 PM – 1:52 PM` 等）。
- 11:31 之后那一段跟着今晚的故事时间变长。
- 这一页可以拿出来当卡片。它不是 Orbit 的页面，所以 Battery Saver 开着时也能拿。
- 这条的画法，和第三晚导出里每晚的那一条是同一种。

Juno 和 Dani 对它的反应不变（已定：`that's your phone, not orbit` · `i can't see that` · `but it doesn't match`）。

**电池页：可以不做。** 如果做，只是 Settings 里多一行 `Battery`，点开是今天各 App 的用量，Orbit 在最上面，占大半，不标时间。它只回答「为什么只剩 20%」。

---

## 3. 对一对：第一晚的三处

规则（已定）：只有同一样东西的两个版本才能对。

**怎么做：** 把一张卡片拖到另一张上松手。如果两张是同一样东西（同一种、同一个来源，拿的时间不同），它们上下对齐，贴成一对。不一样的那几行，在两张卡片之间的缝里各有一个小纸条的记号。没有字。把其中一张拖开，就分开了。

如果不是同一样东西，卡片只是叠在上面，和现在一样，什么都不发生。

**怎么让玩家知道：** 同一样东西的两张卡片靠近时，边缘会轻轻吸一下。没有别的提示。

| 第一晚哪两张 | 记号落在哪 | 玩家什么情况下会有这两张 |
|---|---|---|
| 她的主页，刷新前和刷新后 | 没了的那几块；`Last active` 那一行；多出来的 `Rachel is leaving Orbit` | 刷新前拿过一张的玩家 |
| Rachel 的计划，拒绝改期前后 | `STATUS` 那一行 | 用了 `Change your response` 的玩家 |
| Game night，改时间之前和之后 | `WHEN`；`STATUS` 后面多出来的时间 | 做实验之前拿过一张的玩家 |

- 第一晚这三处都不是必经的。它们的作用是让一部分玩家在第一晚碰到这个动作，第二晚对两个二月时已经会了。第二晚 Rachel 的分享本身会让每个人都做一次。
- 对的时候什么都不记，不花时间。和拿卡片一样，这是玩家在想事情。
- 做的时间：在卡片的三轮之后。可以等到做第二晚时一起做。

---

## 4. Juno 替玩家做的事

第一晚已定的有四处，都是它提出来、玩家说好。**加的只是把它们记下来**，每一处记三样：做了什么、玩家当时的原话、时间。

| Juno 说（已定） | 玩家说了 | 记成 |
|---|---|---|
| `want me to check it?` | `yes` | `checked_plan` |
| `want me to look at it?` | `yes` | `looked_at_message` |
| `want me to turn it off?` | `yes` | `turned_off_auto_coordinate`（已有 `auto_coordinate_off_by: juno`，沿用） |
| `do you want me to stay up in case she answers?` | `yes` | `stayed_up` |

玩家自己打字吩咐它时，只认下面三种，别的它做不了：

| 玩家打的（意思是） | 条件 | Juno |
|---|---|---|
| 去看计划（`check the plan`、`look at the plan`） | 玩家今晚说过是 Rachel | 和回答 `yes` 一样（已定的那几句） |
| 关掉它（`turn it off`） | 已经知道是六月开的 | `done. it'll ask you first from now on`（已定） |
| 关掉它 | 还不知道 | `turn what off?` |
| 别的吩咐（`message her for me`、`unhide it`、`change it back`） | — | `i can't do that from here`；`message her for me` → `i won't write to her for you`（已定的界线：它不替玩家说话） |

第三晚导出里的那一段（上一份里的草稿）：

```text
THINGS JUNO DID FOR YOU

Jun 5    Turned on Auto-Coordinate       You said: "sure"
Oct 20   Checked a plan                  You said: "yes"
Oct 20   Turned off Auto-Coordinate      You said: "yes"
Oct 20   Stayed up                       You said: "yes"
```

这一段的细节随第三晚定。第一晚要做的只是记下来。

---

## 5. 走出去的第一步

不加东西。第一晚已经有三处（都是已定的）：

| 玩家要关的 | Orbit 的挽留 |
|---|---|
| Auto-Coordinate | `Keep on` 是主按钮，`Turn off` 是下面一行没有框的字 |
| Juno | 关闭的确认框 |
| 账号（`Delete account`，第一晚就在） | 48 小时 |

这三处到第三晚会变成一步步更长的那几步。第一晚保持现在的样子：玩家第一次碰到「关掉东西要多点一下，而且大的那个按钮不是自己要的那个」，够了。

一处要留意：`Delete account` 第一晚就能点。等第三晚把它做成六步时，第一晚点它的玩家走的也是那六步。

---

## 6. 墙上的日历（作者还没定）

要重画房间的一小块。它是第 2 层唯一一条不经过手机的路。不做的话，整节拿掉，别处不受影响。

**在哪：** 墙上，手机放下时看得到、拿着手机时被深色盖住的地方。

**上面有什么：** 十月。两样手写的东西：

```text
        OCTOBER

   …
   19   20    21   22   23   24   25
       (  )
        2 presentation
        9
```

- 20 号那一格画了一个圈。下面两行小字：`2 presentation`、`9`。
- 9 后面什么都没写。玩家自己知道那是什么。
- 24 号是空的。

**怎么用：**

| | |
|---|---|
| 鼠标移上去 | 角标，和名字 `Calendar` |
| 点 | 在画面中间放大，和提袋里的纸条一样。点任何地方关掉。 |
| 拿着手机时 | 点不了（只有笔记本例外） |
| 花费 | 没有 |
| 记下 | `checked_own_record`（已有，和翻旧笔记是同一个） |
| Night Log | 玩家已经知道周六之后才写：`The calendar says Tuesday.` 已经因为旧笔记写过 `My note says Tuesday.` 的，不再写。 |

它给不了 Juno 和 Dani 看。

---

## 7. 九层逐层：手上在做什么

| 层 | 发现 | 已定的动作 | 这一份加的 |
|---|---|---|---|
| 序幕 | 她没来 | 等 | |
| 1 | 计划上写的是周六 | 点开计划；让 Juno 去看 | Juno 去看这一下记下来（第 4 节） |
| 2 | 我没记错 | 翻旧笔记；翻她的话 | 日历（待定） |
| 3 | 是她改的，记录说我同意了 | 点开 History；`Change your response`；把计划给 Dani 看 | 拒绝前后的两张计划可以对 |
| 4 | 那时候我没开过 Orbit | 打开 Screen Time；截图给人看 | 画成一条，看一眼 |
| 5 | 是自动的 | 点第二条 `You accepted` | **试一下**（第五条路） |
| 6 | 是我自己同意的，在六月 | 找到开关；过 `Keep on`；或者让 Juno 关 | Juno 关这一下记下来；关没关会改变实验的结果 |
| 7 | 她给过我出口，被拿走了 | 点 `[hidden]`；Dani 发邮件 | |
| 8 | 她要走了 | 下拉刷新，看着它一块块没了 | 刷新前后的两张主页可以对 |
| 9 | 那刚才是谁在回我 | 转发；拿东西给 Juno 看 | |

**第 5 层和第 6 层现在是连着的：** 先做实验再关开关的玩家，看到的是「它替我接受了」；先关开关再做实验的玩家，看到的是「这次它问我了，可它没问她」。两种顺序各得到一样不同的东西，没有哪一种是错的。

---

## 8. 一个会去试的玩家，中间那十分钟

只是一种可能的走法，时间是示意。

| 时间 | 手上 | 看到 |
|---|---|---|
| 11:36 | 点开计划 | 周六 |
| 11:38 | 给 Dani 发消息：她没来 | `wait you were finally meeting??` |
| 11:40 | 点开 History | 两条 `You accepted`，一条带环 |
| 11:41 | 把计划分享给 Dani | `and you said yes?` · `then who did` |
| 11:42 | （Dani 的邀请到了）点 `Accept` | `Accepted by you` |
| 11:43 | 点第二条 `You accepted` | `Accepted for you.` |
| 11:45 | 打开 game night，把它拿出来一张；`Change the time`，选周日 | 同一秒：`Accepted · 11:45 PM` |
| 11:45 | 把之前那张叠上去 | `WHEN` 和 `STATUS` 两行有记号 |
| 11:46 | 问 Dani：`did you just accept that?` | `i didn't touch anything` |
| 11:47 | `it says you did` | `well i didn't` · `moving it back` |
| 11:48 | 打开 game night 的 History | `You accepted ◌`，就在刚才，自己什么都没点 |

这十分钟里玩家读的字不到三十行，大部分是 Dani 的短句。其余是点、拖、改、看。

---

## 9. 新的字一共多少

| 类别 | 数量 |
|---|---|
| Dani 的新台词 | 约 16 句（邀请 4，接受或拒绝 3，被问到 5，改回来 4） |
| Juno 的新台词 | 2 句（`turn what off?`、`i can't do that from here`）；别的都是已定的 |
| 建议回复 | 4 个（`did you just accept that?`、`it says you did`、`no`、`yes`） |
| Night Log 的新行 | 4 行，加日历的 1 行 |
| 新的界面 | 邀请卡片；`Change the time` 弹层；`Waiting for you` 的计划详情；`Dani accepted` 的弹层；Rachel 计划上的「联系不上」弹层；Screen Time 的横条 |
| Orbit 的通知 | 1 条（只在关着 Auto-Coordinate 时） |

## 10. 这改了哪些已定的东西

| 已定的 | 这一份 | 出处 |
|---|---|---|
| Plans 列表里只有一个计划 | 和 Dani 说过话之后有两个 | `night1-layers.md` 第 1 层 |
| Activity 今晚只有 10 月 13 日那张邀请 | 多一张 Dani 的 | `orbit-ia.md` |
| 计划详情四行 | 多一行 `Change the time` | 第 1 层 |
| 「是自动的」有四条路 | 五条 | 第 5 层 |
| 夜晚结束时 Orbit 替玩家回 Dani 的那张表 | 加一行 | `revision-2026-11.md` §2.8 |
| Screen Time 是三行时间 | 一条横条，三行时间在点开之后 | 第 4 层 |
| 第二晚早上 Dani 的第一句 | 如果 game night 被留在了别的时间，她会问 | §3.1，随第二晚写 |

没有改的：九层的每一层、每一句已定的台词、假消息什么时候来、通知的上限。

## 11. 放在哪一轮

| 什么 | 建议 |
|---|---|
| 试一下（第 1 节） | 一个单独的小轮，放在卡片第一轮之后。它需要计划页和 Dani 的对话，这两样已经有了；不依赖笔记本。 |
| Screen Time 的横条（第 2 节） | 很小，跟上面同一轮 |
| Juno 做的事记下来（第 4 节） | 跟第 10 轮（对质的阶梯）一起，那一轮本来就在动 Juno 的对话 |
| 对一对（第 3 节） | 卡片三轮之后；或者等第二晚 |
| 日历（第 6 节） | 等作者定，等画 |

## 12. 要你定的

| # | 问题 | 我的建议 |
|---|---|---|
| 1 | 计划由 Dani 今晚约（1.1），不是开局就在 | 是 |
| 2 | 改期被接受时没有人被通知，Dani 要玩家去问才知道（1.5） | 是。这比我上一份写的更对。 |
| 3 | Rachel 的计划上也有 `Change the time`，点了是「联系不上」（1.9） | 是 |
| 4 | Orbit 替玩家回 Dani 的那张表加一行（1.10） | 加，字你来定 |
| 5 | Dani 的十六句 | 都是草稿，请改成她的说法 |
| 6 | 电池页 | 不做 |
| 7 | 日历 | 你定 |

## 13. 我没把握的

1. **玩家会不会想到去改 game night。** 没有任何东西叫玩家这么做，这是对的。但如果十个人里只有一个人去试，这一节的工作量就不值。我认为会有不少人去点 `Change the time`，因为那一行就在计划页上，而且玩家刚被一个「改时间」的事坑过。要试玩才知道。如果很少人试，可以让 Dani 在约 game night 的时候自己先改一次（`wait make it 10`），玩家开着 Auto-Coordinate 的话就当场看到一条带环的 `You accepted`。那样实验变成了 Dani 无意中做的。我没有把它写进正文，因为它把玩家的动作又变回了看。
2. **Dani 半夜约 game night 合不合适。** 玩家刚告诉她 Rachel 没来。我用 `also` 和 `you pinged me so you're alive again` 让它像是她顺口一提、想让玩家好受一点。如果你觉得她这时候说这个不对，可以改成等她发完邮件（`sent. i'll tell you if she answers`）之后再说。
3. **第二个计划会不会分散注意力。** Plans 列表里多了一行。我认为不会：它是在玩家和 Dani 说过话之后才出现的，而且它和 Rachel 的那一个并排放着，本身就在说话。
