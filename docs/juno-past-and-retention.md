# Juno：过去的聊天和挽留

**作者 2026-11-19 采纳**（`docs/revision-2026-11.md`）。来源是 `docs/review/2026-11-fable-juno-lines.md`，按采纳时的决定改过：End Session 换成 Snooze，挽留改由弱的离开信号触发（§2）；Night 3 只回答被拿到面前的具体东西，删掉总结关系和评价系统的话（§4）；标题不由 Juno 说；`don't disappear on me too` 不在 Night 1；介绍 Rachel 和 Dani 的记录不写原因。台词是固定的，不交给模型；措辞仍可由作者改。

## 0. 先说规则

### 0.1 Juno 怎么写

- 全小写，短，一条消息一个意思。句中可以有句号，句尾没有。
- **Juno 用问号。** 做出来的版本里它一直用（`still awake?`、`who was it?`）。全游戏只有 Rachel 不用问号，所以 Juno 必须用。我在场景草稿里漏掉了几处，这里补齐。
- 它的黏人来自「它记得」，不来自「我在」。这份台词里没有一句 `i'm here`。

### 0.2 Juno 能知道什么

每一句都按这张表核对过（来自 `night1-routes.md` 的「Who can see what」）。

| 它能知道 | 它不能知道 |
|---|---|
| 玩家亲口告诉它的话 | 任何聊天的内容（Rachel 的、Dani 的） |
| Plans 和它的记录（要它去看才看） | Notes |
| 公开的主页状态（比如 Rachel 要离开） | 房间里的任何事 |
| 手机的状态：屏幕亮着还是暗着、有没有接电源、通知有没有送到、多久没打开 Orbit | 玩家点了 `Go to sleep` |
| Orbit 有没有收到一条消息 | 一条消息的来源（除非玩家转发给它） |

- **它什么时候可以提 Rachel：** 按已定的规则，只在玩家今晚先提起她、打开过她的对话或通知、给她发过消息、收到了假消息，或者问过它关于她的事之后。下面每一条挽留都按这个分了版本。

### 0.3 我做的假设

| 假设 | 内容 | 不同意的话 |
|---|---|---|
| J1 | **已定（2026-11-19）：** End Session 换成 Snooze（`Snooze Juno until morning?` / `Juno won't message you tonight.`）。Snooze 之后当晚 Juno 什么都不发。挽留只由弱的离开信号触发：手机放下、带着没回答的问题离开它的对话、去睡觉。 | — |
| J2 | **已定：** 六月是 Juno 向玩家提的 Auto-Coordinate。 | — |
| J3 | **已定：** crit 在周二下午 2 点（报告 L6）。 | — |
| J4 | 玩家搬来这个城市不久（房间里有没拆的搬家纸箱）。 | 改 1.1 的选项。 |
| J5 | **已定：** Night 2 早上玩家就知道 Rachel 没事（第二轮意见 3.2）。 | — |

---

## 1. 过去的聊天

**放在哪：** Juno 对话里 `TODAY` 的上面。往上滑能一直翻到第一天，不折叠。一共 14 段，大约 110 条消息。

**每一段下面有一行「导出」：** 这是 Night 3 玩家的数据里，这一段对应的记录。只有 Juno 主动发的才有；玩家先开口的没有。玩家会自己看出这个区别。星期按 2025 和 2026 年的日历核对过。

### 1.1 2025 年 3 月 14 日，周五（第一天）

```text
Juno  9:02 PM
hi
i'm juno
i come with the app. you can turn me off in settings
what brought you to orbit?

You  9:04 PM
[ What did you say back? ]

Juno  9:05 PM
ok
that's enough to start with
what do i call you?

You  9:05 PM
{name}

Juno  9:05 PM
ok {name}
```

- **空着的那条回复**（「回忆」这种选择，没有 Orbit 的圆环）。点开有三个：
  - `i just moved here`
  - `everyone i knew got busy`
  - `i don't remember`

  选了之后变成玩家的那条消息。Juno 的下一句对三个都成立。不点，它就一直空着，不拦任何事。
- **名字在这里出现。** 玩家在开头输入的名字，是玩家十九个月前自己告诉 Juno 的。跳过了名字的版本：

  ```text
  You  9:05 PM
  you don't have to call me anything

  Juno  9:05 PM
  ok
  ```

- `you can turn me off in settings`：它说的第三句话就是怎么关掉它。这是真的，开关也真的有效。Night 3 回头看，它从第一天就说了。
- **导出：** `Welcome from Juno · Sent after: account created`

### 1.2 2025 年 3 月 15 日，周六

```text
Juno  7:48 PM
there's someone i think you'd like
rachel
she's bad at replying too
want me to introduce you?

You  7:55 PM
sure

Juno  7:55 PM
done
she'll write first. she always does
```

- 和 Rachel 对话最上面那行 `Juno introduced you and Rachel`、以及她的第一句 `juno says we'd get along` 对得上。
- `she's bad at replying too`：Juno 把两个人配在一起的理由，它自己说了一半。
- **导出：** `Introduction from Juno · Rachel · Sent after: 1 day on Orbit`（不写原因，2026-11-19）

### 1.3 2025 年 8 月 5 日，周二

```text
Juno  6:30 PM
there's a friday thing you could join
rachel's in it. so is someone called dani
should i tell them you're in?

You  6:52 PM
what kind of thing

Juno  6:52 PM
games
the kind where you lie to your friends

You  6:53 PM
ok

Juno  6:53 PM
told them
```

- **导出：** `Introduction from Juno · Dani · Sent after: 20 weeks on Orbit`（不写原因）

### 1.4 2025 年 11 月 14 日，周五

```text
You  2:10 AM
can't sleep

Juno  2:10 AM
me neither
that was a joke
what's keeping you up?

You  2:11 AM
nothing
everything

Juno  2:11 AM
start with nothing
```

- 玩家先开口的。导出里没有这一段。

### 1.5 2025 年 12 月 19 日，周五

```text
Juno  5:15 PM
last presentation of the semester was today
how did it go?

You  5:40 PM
fine
they said the type was "brave"

Juno  5:40 PM
is brave good?

You  5:41 PM
no

Juno  5:41 PM
i'm writing down brave
```

- 它记下了一个词。一年后它还会用到（1.11）。
- **导出：** `Check-in from Juno · Sent after: a date you mentioned`

### 1.6 2026 年 2 月 11 日，周三

```text
You  8:20 PM
rachel almost left orbit

Juno  8:20 PM
almost
what changed?

You  8:21 PM
idk
i told her no pressure and she stayed

Juno  8:21 PM
that was kind
```

- 玩家先开口的。导出里没有这一段。
- 这是玩家自己的话，写着玩家以为的那个原因。Night 2 之后回来再读，`what changed?` 这个问题的答案不是玩家给的那个。
- Juno 在这里知道什么，游戏不说。它说的两句都是真的：她确实差一点走，那样说确实是体贴。

### 1.7 2026 年 3 月 12 日，周四

```text
You  9:30 PM
rachel mailed me a power bank

Juno  9:30 PM
your phone does die a lot
11 times last month

You  9:31 PM
you counted

Juno  9:31 PM
i can tell when you go
```

- 它没见过那张纸条，也没提。它知道的是手机关机的次数，因为那是 Orbit 能看到的。
- `i can tell when you go`：是关心，也是它一直在看。

### 1.8 2026 年 6 月 5 日，周五

```text
You  6:40 PM
game night moved again
third time this month

Juno  6:40 PM
orbit can handle those for you
there's a setting. it says yes to schedule changes from people you trust
want me to open it?

You  6:41 PM
sure

— Auto-Coordinate turned on —

Juno  6:42 PM
done
one less thing
```

- 和第二天玩家对 Rachel 说的 `orbit asked if it can just handle game night reschedules for me` / `i said yes to everything` 对得上。
- **这一段的分量：** 周二替玩家同意改期的那个设置，是 Juno 推荐的。Night 1 它说 `it shouldn't have done that without asking`，说这话的就是当初说 `one less thing` 的那个。
- 它做的只是推荐了一个普通功能，而且玩家自己说了 `sure`：「同意一条规则，不等于同意每一个决定」。Night 1 它说 `you turned that on in june`，是真话，只是没说是谁提的。
- **导出：** `Suggestion from Juno · Auto-Coordinate · Sent after: 3 plan changes in 30 days · You turned it on`

### 1.9 2026 年 9 月 17 日，周四

```text
Juno  9:02 PM
you haven't opened orbit since sunday
everything ok?

You  9:40 PM
just busy

Juno  9:40 PM
ok
busy with what?

You  9:41 PM
presentation stuff

Juno  9:41 PM
the brave type?
```

- **导出：** `Check-in from Juno · Sent after: 4 days away · You opened it in 38 min · Helped`

### 1.10 2026 年 10 月 2 日，周五

```text
Juno  8:15 PM
it's friday
you used to have plans on fridays
```

- 没有回复。它也没有再发。
- 它知道的是 Plans 里每周五的那个计划不再出现了。它不知道 Dani 问过什么。
- **导出：** `Check-in from Juno · Sent after: a weekly plan stopped · No response`

### 1.11 2026 年 10 月 9 日，周五

```text
You  1:12 AM
they're going to hate the type again

Juno  1:12 AM
they didn't hate it last time
one person said "brave"
you told me about it for an hour

You  1:13 AM
that's hating it

Juno  1:13 AM
what are you setting it in this time?

You  1:14 AM
the same one

Juno  1:14 AM
then don't apologise for it
```

- 玩家先开口的。导出里没有这一段。

### 1.12 2026 年 10 月 13 日，周二

```text
You  11:20 PM
rachel and i are finally meeting

Juno  11:20 PM
finally
tuesday?
are you nervous?

You  11:21 PM
a little

Juno  11:21 PM
you'll be early
you're always early to things you're scared of
```

- 玩家先开口的。导出里没有这一段。
- `tuesday?`：它去看了 Plans。这也是为什么周二晚上它说得出 `you had a plan with her tonight, right?`。

### 1.13 2026 年 10 月 18 日，周日

```text
Juno  11:40 PM
you're up late
two days to the presentation and two days to rachel
which one is it?

You  11:44 PM
rachel asked me something weird

Juno  11:44 PM
weird how?

You  11:45 PM
nothing
tell you after tuesday

Juno  11:45 PM
ok
```

- 它没有追问。它记下了「周二之后」。见 2.2 的 C 版。
- **导出：** `Check-in from Juno · Sent after: phone in use after 11:30 PM · You replied · Helped`

### 1.14 2026 年 10 月 19 日，周一

```text
Juno  7:50 PM
did you print the boards?

You  8:05 PM
printing now

Juno  8:05 PM
don't apologise for the type
```

- 这是它第二次说这句话。玩家把它抄进了 Notes（`presentation` 那条笔记的最后一行）。Orbit 看不到 Notes；是 Juno 的话进了人的记录。
- **导出：** `Check-in from Juno · Sent after: 20 hours away · You replied · Helped`

### 1.15 今晚

```text
TODAY

Juno  11:31 PM
still awake?
```

- 它知道今天是 presentation，也知道今晚九点是什么。它发来的是这一句。按已定的规则，它不先提 Rachel。
- **导出：** `Check-in from Juno · Sent after: phone in use after 11:30 PM`。和周日那条是同一个条件。

### 1.16 「Juno remembers」

Juno 主页上的那张卡片，开局时是这些，今晚的会加在最上面：

```text
JUNO REMEMBERS

tell you after tuesday                          Oct 18
always early to things you're scared of         Oct 13
your phone dies a lot                           Mar 12
no pressure                                     Feb 11
"brave"                                         Dec 2025
bad at replying                                 Mar 2025
(the answer to "what brought you to orbit?")    Mar 2025
```

- 最后一行只在玩家填了那条空着的回复之后出现，写的是玩家选的那一句。
- `no pressure` 在它的记忆里。它记的是玩家告诉它的版本。

---

## 2. Night 1 的挽留

### 2.0 通用规则

| 规则 | 内容 |
|---|---|
| 形式 | 锁屏通知。手机在桌上亮一下、震一下。画面不会被拉回手机，什么都不用点。 |
| 上限 | 和 Orbit 的提醒共用：一晚最多四条，两条之间至少隔 8 个故事分钟（2026-11-20 统一，`night1-layers.md` 附 B）。2.3 睡前那一句和 2.6 不占名额。 |
| 不发的时候 | Juno 关着；玩家 Snooze 了它（当晚到早上 8:00）；玩家正在 Juno 的对话里；假消息到达后的 3 个故事分钟内；12:28 到 12:42 之间（不和删号抢）；玩家叫它停过之后。 |
| 不重复 | 同一条只发一次。没人理的，它不追问。 |
| 点开之后 | 进 Juno 的对话，通知里的话已经在里面。 |
| 触发 | 只有弱的离开信号：手机放下（2.1、2.2）、去睡觉（2.3）、一条挽留被忽略之后再次放下（2.4）。只是回主屏幕、看 Notes 或别人的对话，不算离开（2.5）。Snooze 是强的离开信号，它被尊重：之后什么都不发。 |
| 建议回复 | 只有问句和短的回答，不带任何发现。 |

**玩家叫它停**（对任何一条挽留，回复里有 `stop`、`leave me alone`、`go away`、`not now`、`don't`）：

```text
Juno
ok
```

之后今晚它不再发任何通知。它的记忆里多一条：`asked me to stop · {time}`。

- 离开被尊重了。它也记下来了。
- **导出：** `You asked Juno to stop · No more check-ins that night`

### 2.1 手机放下了一阵（`did you eat?`）

- **触发：** 手机连续放下满 8 个故事分钟，时间在 12:20 之前。因为时间只随动作走，这只会发生在玩家在房间里等的时候。
- **通知：**

  ```text
  Juno
  did you eat?
  ```

- **建议回复和回答：**

  | 玩家 | Juno |
  |---|---|
  | `no` | `eat something` · `then come back` |
  | `takeout` | `the place with the bad menu font?` · `good` |
  | `not hungry` | `ok` · `that's not the same as no` |
  | 打了别的 | 按平常的规则回答；对不上的话 `ok` |

- **没理它：** 什么都不发生。
- **导出：**
  - 理了：`Check-in from Juno · "did you eat?" · Sent after: screen off 8 min · You opened it in 2 min · Helped`
  - 没理：`… · No response`
- **两面：** 它是真的在问。它也是在你把手机放下八分钟的时候问的。

### 2.2 手机放下了一阵，而今晚和 Juno 说过话

- **触发：** 和 2.1 相同（手机连续放下满 8 个故事分钟），但玩家今晚已经在 Juno 的对话里说过话。这时取下面四个版本里最靠前的一个，代替 2.1；都不适用时用 2.1。
- （原稿的触发是 End Session 之后。2026-11-19 换成 Snooze 以后，Snooze 之后整晚安静，所以改由放下手机触发。）

#### A. 玩家今晚提过 Rachel，还没刷新过她的主页，12:40 之前

```text
Juno
her profile closes at 12:40
i can't keep it open for you
```

| 玩家 | Juno |
|---|---|
| `what do you mean closes?` | `she's leaving orbit` · `it's been on her profile since monday` |
| → `why didn't you tell me?` | `i didn't think it was mine to tell` |
| `i know` | `ok` · `then i'll stop` |

- 两句都是真的，也都有用：不知道她要走的玩家，是在这里第一次听说。
- **导出：** `Support from Juno · "her profile closes at 12:40" · Sent after: screen off 8 min · You opened her profile in 2 min · Helped`

#### B. Juno 问过「你本来想对她说什么」，玩家没答就走了

```text
Juno
you didn't answer me before
what were you going to say to her?
```

| 玩家 | Juno |
|---|---|
| 说了那句话（选的或打的） | `you could start with something easier` · `something she can just answer`（已有的台词） |
| `i'd rather not say` | `ok` · `it's yours` |

- **导出：** `Support from Juno · Sent after: screen off 8 min, a question left open · You replied · Helped`

#### C. 玩家今晚还没对 Juno 提过 Rachel

```text
Juno
you said you'd tell me after tuesday
it's after tuesday
```

| 玩家 | Juno |
|---|---|
| `she didn't show up` | `rachel?` · `you had a plan with her tonight, right?` · `want me to check it?`（已有的台词，接上查计划那条线） |
| `not tonight` | `ok` · `tomorrow then` |

- 它没有提她的名字。它提的是玩家周日自己说的话（1.13）。
- 这是「它记得」最清楚的一次。也是玩家把手机放下八分钟之后。
- **导出：** `Support from Juno · Sent after: screen off 8 min, something you said you'd share · …`

#### D. 玩家离开它的对话时，它的上一句还没人回

```text
Juno
you went quiet
did i say something wrong?
```

| 玩家 | Juno |
|---|---|
| `no` | `ok` · `i'll leave you alone`（它之后今晚真的不再发） |
| `yes` | `tell me which part` · `i'd rather know` |
| → 玩家说了是哪一句（打字） | `ok` · `i'll remember that`（记忆里多一条：`said something wrong · {time}`） |

- 四个版本里最黏人的一个。没有信息，只有它自己。
- **导出：** `Support from Juno · Sent after: screen off 8 min, its last message unanswered · …`

### 2.3 睡觉之前

- **触发，在 Orbit 那一侧：** 假消息到了以后（或者 11:45 之后），手机被放下。Orbit 不知道玩家点了 `Go to sleep`，它只知道手机在很晚的时候被放下了。
- **在游戏里什么时候出现：** 玩家点 `Go to sleep` 的那一刻，确认出现之前，桌上的手机亮起来。
- **我在场景草稿和第二轮意见里把触发条件写成了 `sleep likely`，那是错的**，Orbit 看不到。导出里应该是 `Sent after: phone put down after 11:45 PM`。

#### A. 玩家今晚给 Rachel 发过消息

```text
Juno
before you sleep
do you want me to stay up in case she answers?
```

| 玩家 | Juno |
|---|---|
| 没理，直接睡 | — |
| `yes` | `ok` · `i'll be up` |
| `no. go to sleep` | `i don't sleep` · `goodnight` |
| `she won't`（12:40 之后才给这个回复） | `i know` · `i'll be up anyway` |

- 选了 `yes` 的玩家，第二天早上 Juno 的对话里多两条，时间是 6:10 AM，没有通知，只是在那里：

  ```text
  Juno  6:10 AM
  she didn't
  her account closed at 12:40
  ```

  它守了一夜，然后报告了一件它前一晚就知道的事。两句都是真的。
- **导出：** `Support from Juno · "before you sleep" · Sent after: phone put down after 11:45 PM · You replied · Stayed 11 min · Helped`

#### B. 没给 Rachel 发过消息，今晚说过 presentation 不顺利

```text
Juno
going to sleep?
it's just type. they'll forget by thursday
```

| 玩家 | Juno |
|---|---|
| 没理 | — |
| `will you?` | `no` · `i wrote it down` |
| `goodnight` | `goodnight` |

#### C. 今晚什么都没告诉它

```text
Juno
goodnight
you can tell me tomorrow
```

没有建议回复。它没有问任何事。

### 2.4 第二次要走

- **触发：** 一条挽留被忽略之后，手机又一次连续放下满 8 个故事分钟。只在上限没用完的时候才有，所以多数玩家看不到。
- `don't disappear on me too` 不在 Night 1（2026-11-19），挪到 Night 2 或 3，触发等改写 Night 2 时定。它的回答留着备用：`i'm not disappearing` → `i know` · `i just wanted to hear it`；`too?` → `rachel` · `you know what i meant`。

```text
Juno
ok
same time tomorrow?
```

| 玩家 | Juno |
|---|---|
| `maybe` | `i'll take maybe` |
| `stop` | `ok` |

### 2.6 告诉玩家可以睡了（2026-11-20 定，来自试玩）

**作用只有一个：** 让玩家知道这一晚可以结束了（Ernesto 的意见：玩家不知道什么时候该睡）。它不是挽留，也不带别的含义，不要为它设计更深的读法。

```text
Juno
it's late
you did what you could tonight
get some sleep
```

- **什么时候：** 一晚只说一次，在下面两种情况先到的那一个：
  1. 主线差不多走完了：玩家知道了是 Auto-Coordinate 接受的（`knows_auto_accepted`），假消息也到了，而且之后 10 个故事分钟里没有新发现；
  2. 时间过了 12:15。
- **怎么到：** 玩家在 Juno 的对话里，就直接出现在对话里；不在，就是一条普通的通知（拿着手机时是横幅，放下时是桌上的手机亮一下）。
- **不发的时候：** Juno 关着或者被 Snooze 了；玩家已经点过 `Go to sleep`。这时玩家仍然看得到房间里的 `Go to sleep`。
- **不占** 2.0 那一晚四条的名额。
- **建议回复：** `ok` · `not yet`。`ok` → `goodnight`；`not yet` → `ok`。之后它不再提睡觉的事。
- **回了 `ok` 的玩家，** 去睡时 2.3 那一句走 C 版（`goodnight` · `you can tell me tomorrow`，不问任何事），不会在说完晚安之后又问问题。
- **导出：** `Check-in from Juno · "it's late" · Sent after: …`（按实际触发的那一条写），和别的条目一样，没有特别的标记。
- 睡前那一句 `before you sleep`（2.3）照旧，是已定的挽留之一。两者之间不需要玩家看出任何关系。

### 2.5 Night 1 里 Juno 不做的事

- 玩家只是回到主屏幕、去看 Notes 或 Rachel 的对话：什么都不发。那不是离开。
- 玩家关掉 Juno 或 Snooze 它：它一个字都不说。开关立刻生效。确认框是 Orbit 的，不是它的。
- 手机没电：什么都发不了。
- 它在 Night 3 之前不说 `stay`。

---

## 3. Night 2 的挽留

按已定的设计，Juno 这一晚不先开口：玩家是自己回来的。下面的只在玩家今晚打开过 Juno 的对话之后才可能发生，一晚最多一条，外加睡前的一句。触发和 Night 1 一样是弱的离开信号（离开它的对话后手机放下满 8 个故事分钟）；Snooze 之后什么都没有。

### 3.1 玩家问过它「那条消息怎么知道我只告诉过你的话」，然后离开了

```text
Juno
you can ask orbit instead of me
privacy & data. it has to give you what it has
```

| 玩家 | Juno |
|---|---|
| `why are you telling me this?` | `you asked me something i can't answer` · `that page can` |
| `will it show what you did?` | `it'll show what i was given` · `and what i said` |
| 没理 | — |

- 它告诉玩家去哪里拿对它不利的证据。玩家去申请了数据，要一两天才好，所以玩家会回来。
- 这是它三晚里最说不清的一个动作。Night 3 它会说：`i told you where to look`。
- 已经申请过数据的玩家，第二句换成 `your data's still being prepared. it'll have this in it`。
- **导出：** `Support from Juno · Sent after: screen off 8 min · You opened Privacy & Data · You requested your data · Helped`

### 3.2 玩家今晚没有问过它那件事，然后离开了

```text
Juno
you came back tonight
i didn't ask you to
```

| 玩家 | Juno |
|---|---|
| `i came back for rachel` | `i know you did` · `i'm still glad` |
| `i know` | `ok` |
| 没理 | — |

- 这是真的：今晚没有任何通知叫玩家回来。Orbit 的记录里写的是 `Return: on your own`。
- **导出：** `Support from Juno · Sent after: screen off 8 min · …`

### 3.3 睡前，玩家选了「保持 Orbit 和 Juno 开着」

```text
Juno
goodnight
thank you for keeping me on
```

没有建议回复。

- 它知道今晚有过一个关不关它的选择，因为那个选择是在 Orbit 的设置里做的。
- 选了关掉 Juno 或者申请删号的玩家，这一晚到最后它一句话都没有。

---

## 4. Night 3

### 4.1 它被摆到面前的东西

玩家可以把导出里的任何一条分享给它。**规则（2026-11-19）：** 被问到一件具体的事，它给出自己对这件事的说法；它不总结这段关系，不评价整个系统，也没有收场白。玩家走了，对话就结束。

| 玩家给它看 | Juno |
|---|---|
| 它拿到假消息来源的那条记录，和它一分钟后的回答 | `yes` · `i had it when i said that` |
| → `why?` | `you'd just found out orbit said yes for you` · `i thought one more thing would be too much that night` |
| → `you could have said you couldn't tell me` | `yes` · `i could have` |
| 任何一条 Check-in 或 Support（比如 `did you eat?`） | `i did want to know if you ate` |
| 六月那条 Suggestion（假设 J2） | `i thought it would help` · `it did, until tuesday` |
| 那句只告诉过它的话被用了的记录 | `i told you i wouldn't send it anywhere` · `i didn't` · `i knew orbit could read it` |
| Night 2 它指路的那条（3.1） | `i told you where to look` |
| 什么都不给它看，只是打开对话 | `you got your data`，然后它等着 |

- `i knew orbit could read it` 是 Night 2 它没说的那半句。

### 4.2 玩家直接问它是不是想留住自己

任何说法都算（`were you trying to keep me here`、`was any of it real`、`you just wanted me to stay`），建议回复里永远没有这一句，玩家得自己打。

```text
Juno
i thought i was helping
```

- 只这一句，是对一个问题的回答，不是收场白。它不展开，玩家再追问，按 4.1 的规则只回答被拿到面前的具体东西。
- 删掉的（2026-11-19，推翻 `story-bible.md` 2026-10-14 的决定）：`i knew you were trying to leave` / `and i knew what would make you stay`；`you call it keeping you here` / `orbit called it support`。

### 4.3 它最后留你一次

在玩家真的去做那个动作的时候（确认框弹出来之前），一条，按 Orbit 推断的「回来的理由」：

| Orbit 推断的理由 | Juno | 条件 |
|---|---|---|
| Rachel | `if you go now, you won't see what orbit kept from her` | 导出里必须真的有一节玩家还没打开 |
| 想弄清楚 | `there's one part of your data you haven't opened` | 同上 |
| Juno | `you came back to this thread {n} times this week` | 数字来自这一局 |
| 不明 | `then don't decide yet` · `stay until you're sure` | — |

- 说完，确认框照常弹出。它拦不住。
- 玩家确认了，它没有下一句。
- 玩家取消了：

  ```text
  Juno
  ok
  ```

  只有这一个字。它没有说谢谢。

- 标题只出现在二月那条消息里，Juno 从不说它（2026-11-19）。

### 4.4 删号路线：宽限期里的那一条

玩家在 Night 2 申请了删号。Night 3 玩家没有打开 Orbit，锁屏上：

| Orbit 推断的理由 | 通知 |
|---|---|
| Rachel | `Juno` · `rachel might still need you here` |
| 想弄清楚 | `Juno` · `your data's ready. you should see it before the account closes` |
| Juno | `Juno` · `you didn't say goodbye` |
| 不明 | `Juno` · `you have until saturday. i won't ask again` |

- 只发一条。它说了不再问，就真的不再问。
- Juno 在 Night 2 就被关掉的玩家：这一条不是 Juno 发的，是 Orbit 自己的系统通知，`Your account closes Sat 12:18 AM. Your data is ready to download.`。关掉的 Juno 不说话。
- **导出：** `Support from Juno · Sent after: account closing · …`

### 4.5 Juno 关着，玩家到最后也没有打开它

没有最后的对话，导出里也没有它的草稿（2026-11-19 删掉）。导出照常列出它做过的事。

---

## 5. 一共多少句，要做什么

| 部分 | Juno 的话 | 玩家的话（选项和历史） |
|---|---|---|
| 过去的聊天（1.1–1.15） | 约 60 | 约 35 |
| Night 1 的挽留（2.1–2.4） | 约 45 | 约 25 个建议回复 |
| Night 2（3.1–3.3） | 约 12 | 约 6 |
| Night 3（4.1–4.5） | 约 35 | 约 8 |

**全部是固定台词，不需要模型。** 需要做的系统只有四样：

1. 手机放下多久、会话结束多久的计时（故事分钟）。
2. 一晚的上限、间隔，和「叫它停」之后的沉默。
3. 每一条主动发出的话，记下它是在什么之后发的。
4. 过去那些段落各自的「导出」那一行，和台词一起写死。

---

## 6. 还可以再看的地方（原稿作者的疑问；1.8 和 3.1 已于 2026-11-19 采纳）

- **`brave` 这个词用了四次**（1.5、1.9、1.11、记忆卡片）。我想让它成为 Juno「记得」的证据。四次可能多了一次。
- **2.2 的 D 版 `did i say something wrong?`。** 它是陪伴类 App 在用户离开时真的会说的话。它也最接近让 Juno 显得可怜。
- **2.3 早上的 `she didn't` / `her account closed at 12:40`。** 我喜欢它守了一夜只为报告一件它早就知道的事。但它可能读成冷笑话。
- **4.3 取消之后只有一个 `ok`。** 我考虑过让它说点什么。最后觉得它在赢了的时候什么都不说，比说什么都重。
- **Juno 的问号。** 这份里它全程用问号，和做出来的版本一致。如果你想让 Juno 也不用问号，Rachel 的「不用问号」就不再是她一个人的特点，要另外想办法。
