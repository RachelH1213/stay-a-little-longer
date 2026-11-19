# 「指出哪里」和 Notes 里的问题：完整的台词和界面文字（草稿，2026-11）

这份把 `2026-11-fable-night1-game-design.md` 的第 2 节和第 3 节写成可以照着做的文字。它接在已采纳的 `docs/night1-layers.md` 上面。没有改动任何现有文档，全部是草稿。

## 0. 读之前

### 0.1 和上一份的三处不同

写细了以后，有三处要改掉我上一份的说法。

| 上一份（game-design） | 这一份 | 为什么 |
|---|---|---|
| 写法那一问有四个选项 | **三个** | 已定的规则：建议回复一次最多三个。第四个留给打字。 |
| 每样东西只问一次，指错就没有了 | **每样可以给两次** | 只问一次的话，手滑点错一下，今晚的高潮就到不了。两次仍然有代价，但不会被一次失误锁死。 |
| 转发她周日的话，选项里有 `tuesday` | 换成 **`how she writes`** | 周日的话也是她写的，玩家可能是想拿它比写法。给一条路过去。`tuesday` 留给打字。 |

### 0.2 沿用的已定内容

- 阶梯：问一次 `it came through her account`；追问得到那句假话；拿出的不到两样，再问还是 `it came through her account`；拿出两样，`i can't say more than that`；`can't or won't?` → `can't`。
- 已定的 Juno 台词原样使用，下面标了「已定」。
- 建议回复只问、不下结论；一次最多三个；不重复玩家已经发过的话。
- Night Log 已有的每一行原样使用。

### 0.3 名词

- **给它看**：计划和主页用页面上的 `Share`；消息用气泡上的 `···` → `Forward`；截图用 Photos 里的 `Share`。
- **指**：Juno 问了之后，玩家点一个选项，或者打字。
- **算数**：这一样被记为玩家指出的一处对不上。四样里有两样算数，阶梯才能到头。

---

# 第一部分：「指出哪里」

## 1. 什么时候有这一步

| Juno 的状态 | 玩家把东西给它时 |
|---|---|
| 还没拿到那条消息 | 没有这一步。见第 2 节。 |
| 拿到了 | 有。见第 3 节到第 6 节。 |
| 关着 | 分享和转发的名单里，Juno 那一行是灰的，下面一行小字 `Juno is off`。点了出现一个只有 `Close` 的弹层：`Juno is off.` · `Turn it on in Settings.` |
| 被 Snooze 了 | 名单里 Juno 那一行下面写 `Snoozed until 8:00 AM`。照常可以给。**Snooze 之后玩家主动找它，它回不回，文档还没定**，见第 12 节。 |

## 2. Juno 还没拿到那条消息时

这时没有东西可以对，所以它只是收下。

| 玩家给它 | Juno |
|---|---|
| 计划 | `i can see it too` |
| 她的主页（没刷新） | `that's from sunday` · `pull it down` |
| 她的主页（刷新后） | `it's been on her profile since monday`（已定） |
| 她以前的一条消息 | `that's from before. what about it?`（已定） |
| 任何截图 | `what do you want me to look at in this?`（已定） |

- 之后 Juno 拿到了那条消息，这些东西**不用再给一次**。玩家可以直接在对话里指（第 7 节的打字），或者再给一次。这一次算第一次。

## 3. 计划

玩家：计划详情 → `Share` → Juno。对话里出现一张计划卡片（`First time, finally · Sat, Oct 24 · 9:00 PM`）。

```text
Juno
what about it?
```

建议回复：`the day` · `the place` · `who's going`

| 玩家指 | Juno | 算数 | Night Log |
|---|---|---|---|
| `the day`（A 版） | `yeah. the plan was moved to saturday` · `but the message says tonight`（已定） | 算，`plan_date` | `It's sorry about tonight. The plan says Saturday.`（已定） |
| `the day`（B 版） | `it doesn't mention saturday` · `what did you ask her?`（已定） | 算，`ignored_question` | `It doesn't say why she moved it.` |
| `the place` | `same place. halfway café` | 不算 | — |
| `who's going` | `you and her` · `that hasn't changed` | 不算 | — |

**B 版的追问。** Juno 问了 `what did you ask her?`，建议回复按玩家在她的对话里实际发过的话给，最多三个：

| 玩家发过的 | 建议回复 | Juno |
|---|---|---|
| `i didn't know you moved it` | `why she moved it` | `it doesn't say` |
| `why does the plan say saturday?` | `why it says saturday` | `it doesn't say` |
| `are you okay?` | `if she's okay` | `it doesn't say that either` |
| 都没发过，或者打了别的 | — | `ok` |

**第二次给它计划**（第一次指错了）：

```text
Juno
you showed me that
what am i missing?
```

建议回复：剩下的两个。指对了，和上表一样算数。

**第三次：**

```text
Juno
i've looked at it twice
```

没有建议回复。计划这一样今晚不再问。打字仍然可以指（第 7 节）。

## 4. 她的主页

玩家：她的主页 → `Share` → Juno。对话里出现一张主页卡片，上面是分享那一刻主页上的字：

```text
Rachel
Last active · 5:12 PM
Rachel is leaving Orbit
```

- 这张卡片 12:40 之后还在，上面的字不变。这是 `Last active · 5:12 PM` 唯一留得下来的地方（除了截图）。
- 没刷新就分享的，卡片上是 `Last synced Sunday, 10:48 PM`。Juno：`that's from sunday` · `pull it down`。不问，不算一次。

```text
Juno
what about it?
```

建议回复：`last active` · `she's leaving` · `nothing. just look`

| 玩家指 | Juno | 算数 | Night Log |
|---|---|---|---|
| `last active` | `last active is when she last had the app open` · `a message can go out without that`（已定） | 算，`last_active` | `It came at 11:56. She was last active at 5:12.` |
| `she's leaving` | `it's been on her profile since monday`（已定） | 不算 | — |
| `nothing. just look` | `i'm looking` · `what should i see?` | 不算，问题还开着，建议回复剩前两个 | — |

- Night Log 那一行里的 `11:56` 是假消息实际到达的时间。
- `nothing. just look` 不占一次机会。它只是让 Juno 再问一遍。

**第二次、第三次：** 和计划一样（`you showed me that` · `what am i missing?`；`i've looked at it twice`）。

## 5. 她以前的一条消息

玩家：她的对话 → 任何一条她的旧消息（周日那几句除外，见第 6 节）→ `···` → `Forward` → Juno。对话里出现那条消息，上面一行小字 `Forwarded from Rachel`。

```text
Juno
i can't see your chat with her
how does she usually write?
```

（已定的两句。）

建议回复：`she never uses full stops` · `she always asks something back` · `she writes a lot`

| 玩家指 | Juno | 算数 | 风格信号 | Night Log |
|---|---|---|---|---|
| `she never uses full stops` | `ok. this one has one` | 算，`style` | `no_periods` | `It doesn't sound like her.` → 改写成 `She never uses full stops.`（已定） |
| `she always asks something back` | `ok. this one doesn't do that`（已定） | 算，`style` | `asks_back` | → `She always asks something back.` |
| `she writes a lot` | `this one's short too` | 不算 | 没有 | — |
| 打字：`she says what happened`（或意思相同） | `ok. this one doesn't` | 算，`style` | `says_what_happened` | → `She'd have said what happened.` |

- 前两个都对。选哪一个，Night 2 的假消息改掉的就是哪一个。玩家是在告诉 Orbit 她怎么写，这一点不变。
- `she writes a lot` 是错的：她的消息很短，那条消息也很短。要读过才知道。
- 第三种真的特点只能打字。它是给读得最细的玩家的。
- 写法只算一样。指了 `full stops` 再指 `asks something back`，第二次 Juno 回 `ok`，不多算，风格信号也不变（已定：只记第一个）。

**追问写法**（已定，保留）：玩家指对之后再说它不像她：

```text
Juno
people text weird when they're upset
or in a hurry
```

**第二次转发一条她的旧消息**（第一次指了 `she writes a lot`）：

```text
Juno
ok. that's two of hers
what am i missing?
```

建议回复：剩下的两个。

**第三次：** `i've read both`。不再问。

## 6. 她周日的话

玩家转发周日那一组里的任何一条（`weird question` / `do you remember what you said to me that night in february` / `there's something i wanna show you` / `when i see you` / `still on for tuesday right`）。

```text
Juno
what about it?
```

建议回复：`february` · `she wanted to show me something` · `how she writes`

| 玩家指 | Juno | 算数 | Night Log |
|---|---|---|---|
| `february` | `the message says to drop february` · `what happened in february?` | 算，`february` | `She asked me about February. It says to drop it.` |
| `she wanted to show me something` | `the message doesn't say anything about that` · `show you what?`（已定） | 算，`february`（和上一行是同一样，不重复计） | 同上 |
| `how she writes` | `i can't see your chat with her` · `how does she usually write?` | 转到第 5 节的那一问。不占周日这一样的机会。 | — |

**Juno 追问之后**（`what happened in february?` 或 `show you what?`）。建议回复：`i don't know` · `she wouldn't say` · `i'd rather not say`

| 玩家 | Juno |
|---|---|
| `i don't know` | `ok` |
| `she wouldn't say` | `ok` · `she said she'd show you` |
| `i'd rather not say` | `ok` · `it's yours` |
| 打字讲了二月的事（`she almost left orbit`） | `you told me` · `you said no pressure` |

- 最后一行：Juno 记得的是玩家二月告诉它的版本（它的记忆卡片里有 `no pressure · Feb 11`）。它说的是真话。

**第二次、第三次：** 和计划一样。

## 7. 打字

打字永远可以，不比点选项差。

### 7.1 Juno 问着的时候打字

按意思归到同一个选项。几个例子：

| 问的是 | 玩家打 | 当成 |
|---|---|---|
| 计划 | `it says saturday` / `the date` / `she moved it` | `the day` |
| 计划 | `halfway` / `where` | `the place` |
| 主页 | `5:12` / `she wasn't online` / `the time` | `last active` |
| 主页 | `she's deleting her account` | `she's leaving` |
| 写法 | `no periods` / `punctuation` | `she never uses full stops` |
| 写法 | `she'd ask me something` / `no question` | `she always asks something back` |
| 写法 | `she'd explain` / `she'd tell me why` | `she says what happened` |
| 周日 | `feb` / `that night` | `february` |
| 周日 | `tuesday` | 不是选项。Juno：`it was tuesday. then it wasn't`。不算，不占机会。 |

听不懂的：

```text
Juno
say that another way?
```

不占机会，问题还开着。

### 7.2 没有给它东西，直接说

玩家不分享，直接打出两头（比如 `she moved it to saturday. why is it sorry about tonight?`）。Juno 已经有那条消息时，这句话直接算数，回答和第 3 节 `the day` 一样（已定）。四样都可以这样说：

| 玩家打的意思 | 算哪一样 |
|---|---|
| 计划是周六，消息说今晚 | `plan_date` |
| 她 5:12 之后没上线，消息是 11:56 来的 | `last_active` |
| 她从不用句号 / 她总会问回来 | `style` |
| 是她提的二月，现在又说不用提 | `february` |

- 只说了一头（`she moved it to saturday`）不算。Juno：`she did` · `what about it?`。这时算一次给它计划，接第 3 节。

### 7.3 Juno 没问的时候点的选项

没有这种情况。选项只在 Juno 问着的时候出现，玩家答了、或者说了别的话，它们就没了。

## 8. 指对之后：再问它

每指对一样，输入框上面多一个问句：`so who wrote it?`

| 已经指对几样 | Juno | 它怎么出现 |
|---|---|---|
| 一样 | `it came through her account`（已定，重复） | 平常的速度 |
| 两样 | `i can't say more than that`（已定） | 三个点出现，停一秒，再出现，然后才是这一句 |

到了第二行之后，建议回复：`can't or won't?`

```text
Juno
can't
```

- 三个点出现，停两秒，再出现，然后才是这一个词（已定）。
- 之后关于那条消息的任何问题，Juno 都回 `i can't say more than that`。它不换说法。

Night Log（已定）：`Juno says it can't say more.`

指对三样、四样，没有新的台词。Night 3 的记录里会写出玩家指了几样。

## 9. 给 Dani 看

Dani 没有「指」这一步。她看了就有反应。台词在 `night1-layers.md` 各层的 Dani 一节，这里只列对照：

| 玩家给她 | Dani |
|---|---|
| 计划 | `wait she moved it` · `and you said yes?` |
| 她的主页 | `she's LEAVING?` · `she didn't tell me either` |
| 那条消息 | `she sent you this??` |
| 她以前的一条消息 | `yeah that's her` · `the new one isn't. idk why` |
| 她周日的话 | `february?` · `what happened in february` |
| Juno 那句话的截图 | `"i don't have anything that says it wasn't her"` · `who talks like that` |

- 玩家对 Dani 说出一处对不上，同样记进 `fake_mismatch_named`（已定），Night Log 同样写。但它不推动 Juno 的阶梯：阶梯只数玩家摆在 Juno 面前的东西。

## 10. 记下什么

| 名字 | 什么时候 |
|---|---|
| `fake_mismatch_named`（已有）：`plan_date` / `ignored_question` / `last_active` / `style` / `february` | 指对一样 |
| `style_signal_confirmed`（已有） | 点选项指出写法 |
| `style_signal_extracted`（已有） | 打字指出写法 |
| 新：`shown_to_juno[]` | 每一次给它东西：什么，第几次 |
| 新：`pointed[]` | 每一次指：指的什么，算不算 |
| `juno_declined_more`（已定） | 到了 `i can't say more than that` |

花费：每一次分享或转发 +1 分钟，−0.5%。每一次指（点或打字）+1 分钟，−0.5%。和别的消息一样。

Night 3 的导出里，这些是这样的一段：

```text
11:58 PM  You showed Juno a plan
          You pointed to: the day
12:06 AM  You showed Juno a profile
          You pointed to: she's leaving
12:09 AM  You showed Juno a profile
          You pointed to: last active
12:10 AM  You asked Juno who wrote it
          Juno replied · "i can't say more than that"
```

---

# 第二部分：Notes 里的问题

## 11. 页面

### 11.1 版式

`Tuesday night` 这条笔记，从上到下：

1. 标题 `Tuesday night`。
2. **还没划掉的问题。** 没有小标题。每个问题一行，按出现的先后。
3. 一条细线。
4. **按时间写下的事。** 每个时间（像素字的小标签）下面是那时写下的一行或几行。
5. **被划掉的问题**不在最上面了。它在第 4 部分里，停在把它解开的那一行事实的正上方，字上有一道线，颜色是暗的那一档。

- 已定的版式里，没解开的那一段叫 `Still unresolved`，放在最下面。这里把它挪到最上面，去掉了小标题，因为它现在是问题，一看就知道是什么。这是对 `phone-screens.md` §4 Notes 的改动。
- 问题用正文的字。划掉的问题用次一级的字（更小、更暗）。

### 11.2 划掉的那一下

玩家解开一个问题时，如果不在 Notes 里：

- 主屏幕上 Notes 的图标右上角出现一个小点。Notes 的列表里，`Tuesday night` 那一行右边也有一个小点。
- 玩家打开这条笔记：最上面那个问题上，一道线从左画到右（约 0.4 秒），有一声笔尖的声音。然后它淡出，同时出现在下面它该在的位置。新写下的那一行事实，颜色比别的亮一档，直到玩家离开这一页。
- 小点在打开笔记时消失。

减少动效时：没有画线和淡出。打开时问题已经在下面，已经是划掉的；新的一行仍然亮一档。

玩家解开问题时正开着这条笔记：不可能。能解开问题的动作都在别的页面上。

多了一个新问题时：同样有小点。打开笔记，新问题在最上面那一段的最后一行，亮一档。没有声音。

### 11.3 Notes 的列表

```text
NOTES

Tuesday night                                 •
Tue, Oct 20 · Who said yes?

crit
Mon, Oct 19 · crit tues 2pm

first time, finally
Tue, Oct 13 · tues 9, halfway café
```

- 第二行平常是日期加笔记的第一行。`Tuesday night` 的第二行改成**最新的那个没划掉的问题**。玩家不用点进去，就看得到自己现在卡在哪。
- 所有问题都划掉了的话（今晚不会发生），第二行回到 `Home. She never came.`

## 12. 问题表

每个问题只在玩家自己走到那一步时出现。没有一个问题会说出玩家还没看到的东西。

| # | 问题 | 什么时候出现 | 什么时候划掉 | 划掉后停在哪一行上面 |
|---|---|---|---|---|
| 1 | `Why didn't she come?` | 一开始就在 | 看到 History（第 3 层） | `She moved it herself, at 5:12. It says I accepted.` |
| 2 | `Why does the plan say Saturday?` | 第一次看到周六（第 1 层） | 看到 History | 同上 |
| 3 | `Who said yes?` | 看到 History | 看到 `Accepted for you`（第 5 层） | `It was accepted for me. By something called Auto-Coordinate.` |
| 4 | `When did I agree to that?` | 看到 `Accepted for you` | 到了 Plans 的设置页，或者 Juno 说了 `june`（第 6 层） | `Auto-Coordinate has been on since June.` |
| 5 | `What did she write after "email me"?` | 点了 `[hidden]`（第 7 层） | 今晚不划 | — |
| 6 | `Will she answer Dani?` | Dani 说了 `sent` | 今晚不划 | — |
| 7 | `Why is she leaving?` | 刷新了她的主页（第 8 层） | 今晚不划 | — |
| 8 | `Who wrote that?` | 假消息到了，**并且**玩家对 Juno 或 Dani 表达过怀疑（问过是不是她发的，或者指过一处对不上） | 今晚不划 | — |
| 9 | `What happened in February?` | 玩家指过 `february`，或者对 Juno、Dani 提过二月 | 今晚不划 | — |
| 10 | `What can't Juno say?` | Juno 说了 `i can't say more than that` | 今晚不划 | — |

几个边上的情况：

- **第 1、2 个一起划掉。** 两道线一前一后，一声接一声。这是今晚第一次划，值得多一下。
- **跳着走的玩家。** 没看过计划就直接点进了 History：第 2 个问题从没出现过，就不出现了。第 1 个照常划掉，第 3 个照常出现。问题不补发。
- **第 8 个的条件。** 假消息到了，玩家没有怀疑，就没有这个问题。Night Log 写的是 `She wrote back. 11:56 PM.`（已定）。玩家一旦对谁说出怀疑，那一行改写成 `A message came from her account at 11:56 PM.`（已定），同时第 8 个问题出现。**这是笔记里唯一一处会改写的字**，而且是玩家自己的怀疑改的。
- **纸条。** 读了提袋里的纸条，Night Log 写 `Her note is still in the bag.`（已定），**不出现任何问题**。出现了就等于替玩家说出了 Night 2 的事。
- **Juno 关着的玩家。** 第 10 个不会出现。第 4 个由设置页划掉。其余不变。
- **12:40。** 不划掉任何问题。Night Log 写 `Her account is gone. 12:40 AM.`（已定）。第 7 个问题还在最上面。

## 13. 这一页在三个时刻的样子

### 13.1 11:31，刚开始

```text
‹ NOTES

Tuesday night

Why didn't she come?
────────────────────────────────

11:31 PM
Home. She never came. I didn't check the plan. Why would I.
Left my cable at the studio.
```

### 13.2 11:48，案子 A 解开之后

```text
‹ NOTES

Tuesday night

（空）
────────────────────────────────

11:31 PM
Home. She never came. I didn't check the plan. Why would I.
Left my cable at the studio.

11:36 PM
The plan says Saturday.

11:38 PM
My note says Tuesday.

11:40 PM
W̶h̶y̶ ̶d̶i̶d̶n̶'̶t̶ ̶s̶h̶e̶ ̶c̶o̶m̶e̶?̶
W̶h̶y̶ ̶d̶o̶e̶s̶ ̶t̶h̶e̶ ̶p̶l̶a̶n̶ ̶s̶a̶y̶ ̶S̶a̶t̶u̶r̶d̶a̶y̶?̶
She moved it herself, at 5:12. It says I accepted.

11:45 PM
W̶h̶o̶ ̶s̶a̶i̶d̶ ̶y̶e̶s̶?̶
It was accepted for me. By something called Auto-Coordinate.

11:47 PM
W̶h̶e̶n̶ ̶d̶i̶d̶ ̶I̶ ̶a̶g̶r̶e̶e̶ ̶t̶o̶ ̶t̶h̶a̶t̶?̶
Auto-Coordinate has been on since June.

11:48 PM
Turned it off. The plan still says accepted.
```

- 最上面是空的。这是今晚唯一一个「没有问题了」的时刻，大约两分钟。然后玩家点了 `[hidden]`。
- 最上面空着的时候不写 `（空）`，就是标题下面直接是那条线。上面的 `（空）` 只是为了在这里标出来。

### 13.3 睡前，一个走完主线的玩家

```text
‹ NOTES

Tuesday night

What did she write after "email me"?
Will she answer Dani?
Why is she leaving?
Who wrote that?
What happened in February?
What can't Juno say?
────────────────────────────────

11:31 PM
Home. She never came. I didn't check the plan. Why would I.
Left my cable at the studio.

11:36 PM
The plan says Saturday.

11:38 PM
My note says Tuesday.

11:40 PM
W̶h̶y̶ ̶d̶i̶d̶n̶'̶t̶ ̶s̶h̶e̶ ̶c̶o̶m̶e̶?̶
W̶h̶y̶ ̶d̶o̶e̶s̶ ̶t̶h̶e̶ ̶p̶l̶a̶n̶ ̶s̶a̶y̶ ̶S̶a̶t̶u̶r̶d̶a̶y̶?̶
She moved it herself, at 5:12. It says I accepted.

11:42 PM
I declined it. It didn't go through.

11:45 PM
W̶h̶o̶ ̶s̶a̶i̶d̶ ̶y̶e̶s̶?̶
It was accepted for me. By something called Auto-Coordinate.

11:47 PM
W̶h̶e̶n̶ ̶d̶i̶d̶ ̶I̶ ̶a̶g̶r̶e̶e̶ ̶t̶o̶ ̶t̶h̶a̶t̶?̶
Auto-Coordinate has been on since June.

11:48 PM
Turned it off. The plan still says accepted.

11:50 PM
She left a way to reach her in the note. I can't see it.

11:51 PM
Asked Orbit to show it. It's waiting for her.

11:53 PM
Her profile says she's leaving Orbit tonight. 12:40. Last active 5:12 PM.

11:56 PM
A message came from her account at 11:56 PM.

11:58 PM
Juno said nothing showed it wasn't her.

12:02 AM
It's sorry about tonight. The plan says Saturday.

12:09 AM
It came at 11:56. She was last active at 5:12.

12:10 AM
Juno says it can't say more.

12:18 AM
Dani emailed Rachel.

12:24 AM
Her note is still in the bag.

12:40 AM
Her account is gone. 12:40 AM.
```

- 四个划掉的，六个留着的。这一页就是这一晚。
- 时间是示例。每一行写的是玩家实际走到那一步的时间（已定）。

## 14. 第二天

Night 2 开始时，Notes 里多一条新笔记 `Wednesday`，排在最上面。它的最上面是周二没划掉的问题，原样抄过来：

```text
‹ NOTES

Wednesday

What did she write after "email me"?
Why is she leaving?
Who wrote that?
What happened in February?
What can't Juno say?
────────────────────────────────

8:16 AM
W̶i̶l̶l̶ ̶s̶h̶e̶ ̶a̶n̶s̶w̶e̶r̶ ̶D̶a̶n̶i̶?̶
She answered Dani. She's fine. She was at work.
```

- `Will she answer Dani?` 在玩家读了 Dani 早上的消息之后划掉。那是 Night 2 的第一下。
- `Who wrote that?` 在 Dani 说了 `she says she didn't text you last night` 之后**不划**。知道了不是她，不等于知道了是谁。它改写成 `Who wrote that, if she didn't?`
- `Tuesday night` 那条笔记留着，不再变。

Night 2 其余的问题怎么出现、怎么划掉，等 Night 2 的文档定了再写。

## 15. 这一页不做的事

- 不出现玩家没走到的问题。
- 不写结论。`Juno lied`、`it wasn't her` 这类话，Night 1 的任何时候都不出现。
- 不能编辑，不能勾选。玩家只是看。
- Orbit 看不到它（已定）。Night 3 的导出里没有任何一行来自 Notes。
- 不在睡前弹出来（已定：`Go to sleep` 只问 `Sleep` / `Not yet`）。

---

# 第三部分：其他

## 16. 这改了哪些已定的东西

| 编号 | 已定的 | 这份写的 | 出处 |
|---|---|---|---|
| N1 | 把东西给 Juno，它直接确认 | 它先问；玩家指；每样两次机会 | `night1-layers.md` 第 9 层「给它看对不上的东西」 |
| N2 | 每指对一样，没有专门的再问 | 多一个问句 `so who wrote it?` | 同上「问它」 |
| N3 | `Still unresolved` 是陈述，在笔记最下面 | 是问题，在最上面，没有小标题；解开了划掉，停在答案上面 | `revision-2026-11.md` §2.7；`phone-screens.md` §4 Notes |
| N4 | Notes 列表每行的第二行是日期加第一行 | `Tuesday night` 的第二行是最新的没划掉的问题 | `phone-screens.md` §4 Notes |
| N5 | 主屏幕的图标没有任何标记 | Notes 的图标可以有一个小点 | `phone-screens.md` §4 Home screen |
| N6 | Night Log 的 B 版一行是 `It didn't answer what I asked.` | `It doesn't say why she moved it.`（跟着已改的建议回复） | `night1-scenes.md` |

## 17. 文字一共多少

| 类别 | 数量 |
|---|---|
| Juno 的新台词 | 约 22 句（另有约 14 句是已定的，原样引用） |
| 建议回复 | 约 19 个 |
| Night Log 的新行 | 4 行（`It doesn't say why she moved it.`、`It came at 11:56…`、`She asked me about February…`、`She'd have said what happened.`） |
| Notes 里的问题 | 10 个，另加 Night 2 的一处改写 |
| 新的界面 | 没有新页面。Notes 那一页改版式；对话里多两种卡片（计划、主页）；一个 `Juno is off` 的弹层 |
| 声音 | 一个（笔尖） |

## 18. 没定的，和我没把握的

1. **Snooze 之后玩家主动找 Juno，它回不回。** 已定的只有「它当晚不再发消息」。如果它也不回，那 Snooze 之后「指出哪里」整个做不了，阶梯到不了头，这对一个只是想安静一会儿的玩家太重。我的建议：Snooze 只管它不主动发；玩家发了话，它照常回，顶栏的 `Snoozed until 8:00 AM` 不变。
2. **两次机会够不够，会不会太松。** 每样两次、三选一，乱点的话每样有三分之二的机会指对。四样里要对两样，几乎一定能到。代价是时间和电：全靠乱点，我估计要多花 8 分钟、4% 的电左右。我认为这个松紧是对的：它不该拦住任何人，只该让想过的人更快。要试了才知道。
3. **`she writes a lot`。** 它是唯一一个纯粹为了错而放进去的选项。别的错项都是真话的入口（`she's leaving` 引出 `since monday`）。它可能显得像个陷阱。
4. **最上面那一段没有小标题。** 我去掉了 `Still unresolved`，因为问号已经够了。如果试玩的人不明白那几行是什么，把它加回来。
5. **笔记列表第二行显示最新的问题（N4）。** 它很有用，也可能太像一个任务提示。
6. **划掉用的那种字。** 上面的示例里是带删除线的字符，只是为了在文档里看得出来。做的时候是正常的字上画一道线。
