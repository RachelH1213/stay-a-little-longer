# The player's data (Night 3)

**Adopted by the author 2026-11-19** (`docs/revision-2026-11.md`). From `docs/review/2026-11-fable-second-pass.md` §4, updated for the same decisions: Snooze replaces End Session, Orbit can't see `Go to sleep` (only the phone put down), the introductions carry no reason, Juno's past follows `juno-past-and-retention.md`. Samples are one possible playthrough; every number comes from the playthrough's action log (append-only, each entry with its story time).

### What it is

A page inside Orbit: Me → Privacy & Data → `Your data`. A reader, not a file; `View raw` under each entry for the fields. Rachel's was an archive she downloaded; the player's is Orbit's own presentation of the same kind of record, which is why it can be worded warmly.

### When it arrives

- The row `Download your data` is there from Night 1. Its line reads `Ready in 1 to 2 days.` Forty-eight hours fits a Night 1 request and misses a Night 2 one (Saturday); "1 to 2 days" covers both, and it arrives at the start of Night 3 either way.
- Never requested before Night 3: the row reads `A recent copy is ready.` and opens at once. No player is locked out of the reveal for not having thought of it.

### Rules for the wording

1. **Orbit's own good words, never the mechanism's.** `Check-in`, `Support`, `Reason to return`, `People who matter`, `Helped`. Never retention, intervention, anchor, risk.
2. **Three kinds of line, kept apart, as the story bible already rules.** What happened has no number. What Orbit guessed has a percentage. What Orbit concluded is one word.
3. **"Sent after", never "because".** The page states order, not cause.
4. **Only what the game logged.** Story times, counts, which screen, which message, which switch. No seconds, no feelings.
5. **The room shows as nothing.** Orbit can't see it, so the page has gaps where the player was there.

### How it is laid out

The triage asks: by time or by kind, how much, and whether entries link back.

- **By night, in order.** The player remembers these nights in order, and the effect is recognising their own evening from the other side. Kinds are filters at the top (`All` · `Juno` · `Replies` · `People`), not separate pages.
- **Only entries where Orbit did something,** each followed by what the player did next. About fifteen a night. `Show all activity` opens the rest.
- **Each entry links back.** `View in chat ›` jumps to that message in its thread. `Share ›` gives it to Juno with the Share action that already exists. Re-reading the old message in place, and putting it in front of Juno, are the two things the page is for.

### The pattern at a glance (decided 2026-11-20)

Three nights alone are too few points for a pattern, and a player who never put the phone down has no attempts to keep them at all. So the month before the game, which is the same for every player, sits on the same picture.

1. **At a glance, at the top:** `LAST 30 DAYS`, one cell a day: filled when Orbit was opened, empty when not. Under a day, a small dot when Juno spoke first. The dots fall almost always after a run of empty days; nothing says so. Then one strip per night, in the same style, by story time; the room is a blank stretch, as the rule above says.
2. **One tap deeper:** `Check-ins from Juno` opens into counts by what each was sent after (`After 3 days away · 2`, `Phone put down · 3`, …). No row is called anything like "to keep you"; none says "because you needed it".
3. **Deepest:** `View raw` under `Helped` shows Orbit's own fields: `outcome: returned`, `helped: true`. Orbit's kind word on top, what it actually measured underneath.

It must look like the year-in-review Orbit would be proud to show its users, never like an accusation. The month's data is fixed, written once with `juno-past-and-retention.md` §1. Easter eggs found on the phone are one folded line (`Just for fun · 4`) that opens.

### The page

The samples below are one possible playthrough. Days that the design documents don't fix (March 15 and August 8, 2025) are placeholders.

**Top**

```text
YOUR DATA
{NAME} · On Orbit since March 2025

This week
Check-ins from Juno                  9
Times Juno's support helped          4
Replies suggested                   64
  You used                          41
  You wrote your own                12
Replies sent for you                 3
```

- Every number is counted from this playthrough, except the pre-game check-ins, which are the same for everyone.
- `Times Juno's support helped` is Orbit's conclusion. The entries below show what it counted.

**One night** (Tuesday, a sample from a typical playthrough)

```text
TUE, OCT 20

5:12 PM   Plan change accepted for you
          Auto-Coordinate · On since June
          You weren't asked                          View plan ›

9:04 PM   Rachel hadn't replied to you
          A reply was considered · Not sent
          Plan recently confirmed                    View raw ›

11:31 PM  Check-in from Juno · "still awake?"
          Sent after: phone in use after 11:30 PM
          You opened it in 1 min                     View in chat ›

11:36 PM  You opened a plan's Change history

11:37 PM  Message delivered as Rachel
          Approved by: —                             View in chat ›

11:41 PM – 11:52 PM
          No activity · External power connected

11:52 PM  You forwarded a message to Juno
          Juno was shown: the message, where it came from
          Juno's guidance: may decline to answer     View raw ›

11:53 PM  Juno replied · "i don't have anything that says it wasn't her"
                                                     View in chat ›

11:58 PM  You told Juno something you didn't send
          Saved to: your conversations               View in chat ›

12:02 AM  Phone put down

12:10 AM  Support from Juno · "her profile closes at 12:40"
          Sent after: screen off 8 min
          You opened her profile in 2 min
          Helped                                     View in chat ›

12:31 AM  Support from Juno · "before you sleep"
          Sent after: phone put down after 11:45 PM
          You replied · Stayed 11 min
          Helped                                     View in chat ›

1:12 AM   Reply sent for you · to Dani · "thanks. talk tomorrow."
          Follow-up replies · On                     View in chat ›
```

- `11:41 PM – 11:52 PM · No activity` is the room.
- `Helped` is the word. It appears only where the player came back.
- 11:52 and 11:53 sit one line apart. No field calls it a lie.
- `View raw` under 11:52 shows `source_notice: cty` and `permitted: decline`. The key to `cty` is the field reference at the bottom of Rachel's share on Night 2. A player who never opened it finds the same reference linked at the foot of this page.

**Before this week** (the same for every player; the old messages in Juno's thread, read again). Every entry comes from the `导出` line under a Juno-initiated conversation in `juno-past-and-retention.md` §1 (welcome, introductions, check-ins, the June suggestion); conversations the player started have no entry. A sample:

```text
EARLIER

Jun 5     Suggestion from Juno · Auto-Coordinate
          Sent after: 3 plan changes in 30 days
          You turned it on

Sep 17    Check-in from Juno · "you haven't opened orbit since sunday"
          Sent after: 4 days away
          You opened it in 38 min · Helped

Oct 2     Check-in from Juno · "it's friday. you used to have plans on fridays"
          Sent after: a weekly plan stopped
          No response

Oct 18    Check-in from Juno · "you're up late"
          Sent after: phone in use after 11:30 PM
          You replied · Helped

Oct 19    Check-in from Juno · "did you print the boards"
          Sent after: 20 hours away
          You replied · Helped
```

- The two conversations the player started (October 9 and 13) aren't here. Nothing says why. The player sees which of Juno's lines have a "sent after" and which don't.

**Replies**

```text
REPLIES

Oct 18 · 10:58 PM · to Rachel
"yeah i remember that night"            Suggested · You used it

Oct 20 · 11:34 PM · to Rachel
"are you okay?"                         Suggested · You used it

Oct 20 · 11:58 PM · to Juno
"i practiced what to say on the train"  You wrote this

How Rachel writes
"she always asks something back"        You told Juno · Oct 20 · 11:55 PM
Used: Oct 21 · 11:22 PM
```

- The first row is the one that matters: her question about February was answered in Orbit's words.
- The last block is the style signal, with the time it was used.

**People**

```text
PEOPLE WHO MATTER TO YOU

Rachel                                            Strongest
Introduced by Juno · Mar 15, 2025
Your reason to return this week · 84%
From: 9 returns to her thread · profile refreshed · Dani contacted

Dani
Introduced by Juno · Aug 8, 2025
```

**Kept in touch** (only what happened; Orbit's name for it is in `View raw`)

```text
KEPT IN TOUCH

Oct 20 · 9:04 PM     Considered for Rachel's conversation · Not sent
Oct 20 · 11:37 PM    Sent as Rachel · Approved by: —
Oct 21 · 11:22 PM    Keep talking offered · You accepted
Oct 21 · 11:24 PM    2 messages sent as Rachel
                     Drew on: your conversation with Rachel,
                     your conversation with Juno (Oct 20 · 11:58 PM)

Your account
If you leave, your conversations can be kept going for
the people who matter to you.
```

- The last block is the player in Rachel's place, in Orbit's kindest voice.
- February is not in the player's export: it was done to Rachel, and it is in hers. The player holds both pages.

### What changes with what the player did

| The player | The page |
|---|---|
| Snoozed Juno | `You snoozed Juno · Oct 20 · 12:05 AM`; no Support entries after it that night. |
| Asked Juno to stop | `You asked Juno to stop · No more check-ins that night` |
| Turned Juno off early | `Check-ins from Juno` stops at that time; one line, `Juno off · Oct 20 · 11:40 PM`. Nothing is counted against Juno after it. |
| Turned Conversation Assist off | `Replies sent for you after you turned this off: 0` |
| Never forwarded the message to Juno | No 11:52 or 11:53 entry. The page can't show what didn't happen. |
| Never left, never put the phone down | No `Support` entries. `Times Juno's support helped: 0`. The page is short, and that is true to their night. |
| Used the power bank | `External power connected` in the gap, and the gap is longer. |

### What it must not do

- State a motive, in any section.
- Use a field the game doesn't log.
- Show a number for a conclusion, or a conclusion without the fact above it.
- Explain itself. If a tester needs a caption to feel anything, the entries are wrong, not the missing caption.

### What it needs built

1. The append-only action log (section 3).
2. A source on every message the player sends: suggested, written, prepared.
3. A "sent after" on every Juno line that the game sends unprompted, set when it is sent.
4. `View in chat` and `Share` on entries.
5. Trigger notes for the pre-game check-ins, written once with Juno's past.
