# Phone screens (draft for the author, 2026-11-18)

Every phone screen, element by element. Sizes are in the 280 × 512 layout units. Nothing on the phone may use a size, colour or spacing that isn't in this document.

## 1. Text styles (the only seven)

| Style | Font | Standard / Large / Extra Large | Colour | Used for |
|---|---|---|---|---|
| **Display** | VT323 | 55.12, fixed | text | the lock screen's clock only |
| **Heading** | VT323 | 27.56, fixed | text (ink on paper) | top-level headings: `ACTIVITY`, `ME`, `NOTES`, `PHOTOS`, `SETTINGS`; the `orbit` wordmark |
| **Bar title** | VT323 | 20.67, fixed | text | titles of second-level screens: `PLANS`, `PLAN`, `CHANGE HISTORY`, `PRIVACY & DATA` |
| **Label** | VT323, uppercase | 13.78, fixed | dim | date groups, field labels (`WHEN`, `FROM`), back labels, buttons in bars (`INFO`, `END`, `PLANS ›`, `SHARE`), times in lists, tab labels, the status bar |
| **Body** | Inter Regular | 13 / 14 / 16 | text (messages: text-warm) | messages, list text, setting names, field values, sheet text, chips |
| **Strong** | Inter SemiBold | same as Body | text | names, card and plan titles, the first line of a notification, sheet titles, buttons in sheets |
| **Secondary** | Inter Regular | 11 / 12 / 13 | dim | previews, descriptions, small print, message times, `Delivered`, home-screen labels, `◌ Suggested replies` |

- VT323 never follows the text-size setting: it stays on the pixel grid and is always sharp.
- Hierarchy comes from weight and colour, never from an extra size.
- One card holds at most two Inter styles and one Label.
- Text in lists, rows and buttons is left-aligned and short enough for one line at Extra Large. Body text in messages and sheets may wrap; system text is laid out as label / value rows instead of wrapping.

## 2. Colours

| Token | Hex | Use |
|---|---|---|
| bg | #111719 | every screen's background |
| paper | #E7DAB9 | the Chats masthead, thread bars, selected tab, timeline nodes, switches on |
| ink | #101612 | text and icons on paper |
| text | #DBE0D6 | primary text |
| text-warm | #EDE5CF | message text |
| dim | #899A94 | Secondary, Label |
| line | #596B69 | dividers, card and bubble borders |
| card | #202A29 | cards, the other person's bubbles |
| mine | #2C2E27 | the player's bubbles (paper-tinted) |
| mine-line | #6E6A57 | the player's bubble border |
| nav | #172022 | tab bar |
| alert | #B85249 | low battery, the erase countdown |

## 3. Spacing and fixed parts

- Spacing is only 4 / 8 / 12 / 16. Page side margin 16. Card padding 12, space between cards 8, between sections 16.
- **Status bar** 20 tall: the clock at the left, battery at the right (Label), 24 from the side edges so they clear the screen's rounded corners. **It has no background of its own**: it takes the colour of whatever is directly under it (paper over the Chats masthead and thread bars, bg elsewhere), and its text takes that surface's text colour (ink on paper).
- **Top bar** 32 tall, the full width of the screen. Back (`‹` + Label of the previous screen; the `‹` is the same Label, on the same baseline) at the left, 16 from the edge; the title centred; the right button (`INFO`, `END`, `SHARE`) a plain Label 16 from the right edge, with no box and no divider, mirroring Back. Everything in the bar is centred vertically.
- **Tab bar** 36 tall (nav), then the **home indicator area** 20 tall (an indicator 72 × 3, centred). They never overlap. Tab labels are Label; the selected tab is a paper plate with ink text.
- **Field rows** (label / value): the label sits on the first line of its value, never lower. When a value doesn't fit beside its label at the current text size, the label goes above the value instead of the value wrapping.
- **Rows:** at least 28 tall (touch target), 12 padding left and right, a 1 px line between rows inside a card, a `›` at the right when the row opens something.
- **Switches:** 28 × 16.
- **Sheets:** they rise from the bottom over a darkened screen; 16 padding. Every sheet has a title (Strong), then its text (Body) if any, then its buttons (32 tall, full width, Strong, 8 apart), and always ends with a way out: `Cancel`, or `Close` on a sheet that only informs. Action lists (Forward, Share, the long-press menu) are rows with a `Cancel` button under them. The long-press menu's title is the message's sender and time (`Rachel H. · 11:37 PM`), and its action is a row `Forward ›`, so it never reads as a second title. The destructive button is outlined in alert. Tapping the darkened screen closes a sheet like Cancel.
- **Back labels:** a thread always goes back to `‹ CHATS`, however it was opened (Chats, a banner, a notification, a plan). A profile goes back to `‹ CHAT`. Every other screen names the screen it returns to. Never a bare `‹`.
- **Avatars:** every avatar is a square portrait on its own background inside a 1 px line frame, at every size (Chats, thread bars, sheets, profiles). Juno too: its head and shoulders on a square, never the free-standing full-body sprite.
- The phone shows no scrollbars and nothing outside the screen's rounded corners.

## 4. Screen by screen

### Lock screen
- No clock in the status bar on this screen (battery only); the big clock is the time.
- Date (Label, centred, `TUESDAY, OCTOBER 20`), clock (Display, centred, `11:37` with no AM/PM), 48 from the top of the screen.
- Notifications: cards 8 from the side edges, 8 apart. Each card: app line (Label, `ORBIT · 11:37 PM`), sender (Strong), one line of text (Body, ellipsis).
- `Swipe up to open` (Secondary, centred), 8 above the home indicator.

### Home screen
- App grid: icons 44 × 44, 4 per row, 24 apart, 16 from the side edges, starting 24 under the status bar. Label under each icon (Secondary, centred, 4 below the icon).

### Quick panel (pulled down from the status bar)
- A card under the status bar, 8 from the side edges: brightness (Label `BRIGHTNESS` and a slider), then the `SCREENSHOT` tile: 44 × 44 with a pixel glyph of a phone screen with corner marks, and the Label under it. Paused by Battery Saver, the tile is dimmed and says so when tapped.

### Banner (a message while on another screen)
- The same card as a lock-screen notification, 8 under the status bar, over the top bar.

### Chats
- Masthead: paper, 40 tall: the logo (24) and `orbit` (Heading, ink). Nothing under it but the list: no `CHATS` heading.
- Rows, sorted by latest message: avatar 36, name (Strong) with `AI` (Label) for Juno, time (Label) at the right, preview (Secondary, one line, ellipsis). Unread: a paper dot of 6 at the right of the preview, the preview in text colour.
- Tab bar.

### A thread (Juno, Rachel, Dani)
- Bar (paper): Back at the left, the button at the right: `INFO` for Rachel, `END` for Juno, none for Dani (she has no profile), both as in §3. In the middle, centred on the screen: the avatar, 20 × 20, the same head-and-shoulders image as in Chats inside the same 1 px ink frame (never the full-body sprite, nothing sticking out of the frame), 6 apart from the name (Strong, ink). Avatar and name together open the profile.
- Date dividers: Label, centred, with a rule on each side.
- Bubbles: Body, padding 8 / 6, at most 75% of the width, 1 px border. The other person: card fill, line border, at the left. The player: mine fill, mine-line border, at the right.
- Groups: one sender within 5 minutes; 4 between bubbles, 12 between groups. The time (Secondary) once, under the group's last bubble, on its side; `· Delivered` after the time of the player's last message only.
- Typing: a bubble with three dots (still with Reduce motion).
- Juno while switched off: the bar keeps Back and the name but no `END`.
- Suggested replies: `◌ Suggested replies` (Secondary), 4 above a single row of chips: Body, 28 tall, 12 padding, 1 px line border, 8 apart, scrolling sideways, a 16 fade at the right edge when they don't fit, from the background colour at full strength at the edge, clearly visible. Never something already sent.
- Composer: 8 padding top and bottom, 16 at the sides: the field (28 tall, Body, placeholder in dim) and the send button (28 × 28), 8 apart.
- Long-press menu and the forward sheet: sheets (§3); the forward sheet lists Juno and Dani as rows with avatar 24 and name (Strong).

### Profiles (Rachel, Juno)
- Top bar `‹ CHAT`, for Rachel and Juno alike.
- Avatar 64, centred; name (Strong), centred; one line under it (Secondary): Rachel `Last synced Sunday, 10:48 PM`, and under it `Pull down to refresh` (one line each; tapping the line or pulling the page down refreshes it; there is no Refresh button, so nothing points at it), after refresh `Last active · 5:12 PM`; Juno `AI COMPANION` (Label).
- Sections as cards with a Label header: Rachel `SHARED PLANS`; Juno `ABOUT` (its three lines, Body) and `JUNO REMEMBERS` (Body, time in Secondary).
- Rachel's refreshed blocks read `Unavailable` (Secondary). Under the Last active line, in alert, centred, one line each: `Leaving Orbit` and `Account closes Wed 12:40 AM` (Body), then the countdown in story time, `1 hr 1 min left` (Secondary, alert), which moves with the clock.

### Activity
- `ACTIVITY` (Heading) at the left; `PLANS ›` (Label, plain, no box and no divider) at the right on the same baseline.
- Date groups (Label, `OCT 13`), 16 above, 8 below.
- The invitation, a card that opens the plan: `Rachel H. invited you to a plan` (Strong), `First time, finally` (Body), `Accepted by you` (Secondary), `›` at the right.
- Nothing else on Night 1. No Check-in.

### Plans
- Top bar `‹ ACTIVITY`, `PLANS`.
- A row per plan: title (Strong), `Sat, Oct 24 · 9:00 PM · Rachel H.` (Secondary), `ACCEPTED` (Label) at the right, `›`.

### Plan details
- Top bar `‹` + where it came from, `PLAN`.
- Card: title (Strong), `With Rachel H.` (Secondary), then field rows: Label column 64 wide (`WHEN`, `WHERE`, `STATUS`), value (Body).
- Then one card with two rows: `Change history ›`, `Message Rachel ›` (Body).

### Change history
- Top bar `‹ PLAN`, `CHANGE HISTORY`.
- Timeline: a 1 px line at 16 from the left, a 6 × 6 paper node per entry, entries 12 to its right, 8 apart.
- Entry 1: `OCT 20 · 5:12 PM` (Label); `Rachel proposed a new time` (Strong); field rows `FROM` / `TO` (Label column 48) with Body values; `NOTE` (Label), then her note (Body, in quotes) with `[contact info hidden]` underlined; under it, 8 apart, the Orbit mark (8) and `Orbit keeps your conversations safe` (Secondary).
- Entry 2: `OCT 20 · 5:12 PM` (Label); `Change accepted` (Strong); field rows `HANDLED BY` · `Conversation Assist ›` (Body, opens Me → Settings at Auto-Coordinate) and `CONFIRMATION` · `Not required` (Body). Label column 96.
- Contact Protection sheet (§3): `Contact Protection` (Strong), the text (Body), `Manage in Settings` (button).

### Me
- `ME` (Heading); `SETTINGS` (Label), 16 below.
- Cards, 8 apart:
  1. `Privacy & Data ›`, with its description.
  2. `Juno`, switch.
  3. `Conversation Assist`, switch; inside the same card, indented 12, divided by lines: `Auto-Coordinate`, switch; `Follow-up replies`, switch.
  4. `Battery Saver`, switch.
- Each row: name (Body), description under it (Secondary), switch or `›` at the right, centred on the name.
- Confirmations (turning Juno off, Contact Protection off) are sheets (§3).

### Privacy & Data
- Top bar `‹ ME`, `PRIVACY & DATA`. One card: `Contact Protection`, switch, and its description `Hides emails and phone numbers from people you haven't verified.` (draft).

### Notes
- `NOTES` (Heading). A row per note: title (Strong), date and first line (Secondary). Newest first.
- A note: top bar `‹ NOTES`; title (Strong); lines (Body); in `Tuesday night`, each time (Label) above its lines, 12 between entries; `Still unresolved` (Strong) 16 above its lines, 8 between them.
- Paused by Battery Saver: one centred line (Secondary).
- Notes' look as the player's own notebook (art-direction §8) waits for the author's art; until then it uses these styles on bg.

### Photos
- `PHOTOS` (Heading). Grid: 3 columns, 2 apart, square thumbnails edge to edge, each cropped from the top of its screenshot (so the bar and the name show) with a 1 px line border.
- A photo: top bar `‹ PHOTOS`, right button `SHARE`; the screenshot inset 16 from the sides with a 1 px line border, so it never reads as the live screen, scaled down until its caption fits on the screen; under it its time and source (Secondary, e.g. `Tue 11:38 PM · Orbit`). Share opens the Share sheet.
- Empty: `No Photos` (Secondary), centred.

### Settings (the phone's)
- `SETTINGS` (Heading). One card: `Brightness` (Body) and a slider.

### Sheets and offers
- End Session (title `End this session with Juno?`, text `You can return at any time.`), turning Juno off, Contact Protection, turning Contact Protection off (`Turn off Contact Protection?`), Battery Saver's offer: all sheets as in §3, with their decided text. (Delete all local data is on the title screen, not the phone.)
