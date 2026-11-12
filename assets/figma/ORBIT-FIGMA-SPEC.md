# Figma reference: onboarding and Orbit phone screens

Source: Figma file "Stay a Little Longer — M02 Title Screen". Reference renders are in `reference/`.

**Rule:** layout follows the decided docs, not Figma. For the phone that is `docs/orbit-ia.md` and `docs/art-direction.md` ("Orbit UI design system v1.0": 280 × 512, top bar 32, tab bar 36, sizes 16/14/12/11/10, spacing 4/6/8/12/16, touch targets ≥ 28). Figma gives the visual language: colours, fonts, borders and keylines, card details, timeline nodes, pixel icons, the logo. Where Figma has something the docs don't, list it for the author instead of adopting it.

## Fonts (none can be exported from Figma; download from Google Fonts with their OFL licences)

- **VT323:** pixel chrome on the phone, and all text on the onboarding screens.
- **Silkscreen:** the labels of the onboarding and menu buttons (BACK, CONTINUE).
- DotGothic16 appears in Figma chat previews; not used (previews are Inter under the hybrid rule).

## Onboarding screens (outside the phone)

Frames: `ART 06.0 / BEFORE YOU BEGIN` (200:1236) and `ART 07.0 / ENTER YOUR NAME` (206:1238), both 1440 × 900; component sheet `ART 07.0 / NAME INPUT & BUTTON / STATE MATRIX` (208:1247).

| Token | Hex |
|---|---|
| bg | #111714 |
| paper | #E8DAB9 (buttons use #E8D6B1) |
| rule | #506258 (lines), #58665B (button border), #66604E (secondary button border) |
| accent bar under title | #747B6A |
| dim text | #879184 / #888575 |
| placeholder | #777366 |
| disabled | #605F55 |
| error | the red in the Invalid state (from the reference) |

- Header: "STAY A LITTLE LONGER" left, "01 / ONBOARDING" right (VT323), 2 px rule under it. Footer: 2 px rule, BACK left, "STEP 01 / 02" centre, CONTINUE right.
- Title: cut-plate bitmap lettering, 6 × 9 cells. The native files are `title-before-you-begin-native.png` (111 × 9) and `title-enter-your-name-native.png` (104 × 9); one cell is one image pixel. Show them at a whole-number factor (6× at 1440 × 900), the same way the title screen draws its lettering. A short accent bar under the title.
- Before You Begin: two paper heading bars ("01  CONTENT NOTE", "02  DATA & PRIVACY") with VT323 body text; a Quick Settings panel (paper title bar, TEXT SIZE Standard / Larger, REDUCE MOTION Off/On, SOUND On/Off, "EDIT THESE LATER IN SETTINGS"). The selected option is a filled paper plate; the other is a dark recessed plate with a rule border.
- Name: prompt line, NAME label, input 780 × 96 with 3 px border and 32 px left padding, placeholder "Type your name"; four states (Empty: dim border; Focused: paper border; Filled: paper border, text in paper; Invalid: red border and red helper line). Helper line under the field.
- Buttons 240 × 64: Primary = paper fill, ink label; Secondary = dark face with a 2 to 3 px rule border, paper label; Disabled = dark face, grey border and label. Labels in Silkscreen, centred.

## Orbit phone screens

Frames (372 × 660, the old screen size; layout only as a visual reference): Chats list (222:1271), Juno thread (222:1407), change history (222:1487).

| Token | Hex | Used for |
|---|---|---|
| bg | #111719 | screen background |
| bg-thread | #101918 | message area |
| bg-status | #0B1011 | status bar |
| paper | #E7DAB9 | masthead, thread header, selected tab, timeline nodes |
| paper-line | #BEB08F | lines on paper |
| paper-grain | #A69676 | wordmark underline, grain dots |
| ink | #101612 | text and keylines on paper |
| text | #DBE0D6 | primary text |
| text-warm | #EDE5CF | message text |
| text-dim | #899A94 | secondary text, times, counts |
| text-dim-2 | #9AA9A3 | labels (FROM, TO) |
| line | #596B69 | dividers, card borders |
| line-thread | #536961 | bubble and composer borders |
| card | #202A29 | list cards, history entry |
| card-2 | #1B2525 | plan summary, second history entry |
| card-keyline | #0B1011 | inner keyline on cards |
| bubble | #1C2826 | incoming bubble |
| nav | #172022 | tab bar |
| nav-plate | #303F3D | selected tab plate on dark |
| composer | #1B2625 | composer bar |
| control | #22332F | square + and send buttons |
| input | #0D1514 | message input |
| placeholder | #6D817A | input placeholder |
| icon-disabled | #72877C | send icon, disabled |
| battery-low | #B85249 | low battery |

Decided with the author (2026-11-12):

1. **Chats masthead:** a paper band about 40 tall, on Chats only, with the 32 px logo (`orbit-logo-32.png`) and the "orbit" wordmark in VT323 with its paper-grain underline. Other screens use the normal 32 top bar.
2. **Chat rows in the film style** at the compact size, about 52 tall: card fill, 1 px line border, inner card-keyline, a 3 px keyline at the left with small perforation marks, framed 44 px avatar, name and preview in Inter, time and the "AI" tag in VT323, a dashed baseline.
3. **Change history timeline:** 2 px line spine, paper square nodes with ink centres, entries on card / card-2 with 1 px rules. Content and wording stay as in the build.

Other visual details to take: the thread header on paper with ink keylines and a boxed INFO; the date divider with rules; bubbles with a 1 px border; the composer with square + and send buttons (`send-disabled-42x44.png`); the tab bar with pixel icons (speech box, log, head and torso) and the selected tab as a plate.

## Out of date in Figma (follow the build and docs)

- Activity: Figma shows "PLAN · UPDATED" and "TODAY'S RECAP" tonight; the IA has only the October 13 invitation.
- Plan Details: Figma says "CONFIRMED"; the build says "Accepted". "MESSAGE RACHEL" is now in the IA.
- Change history: Figma says "ACCEPTED ON YOUR BEHALF"; keep "Change accepted · Handled by Conversation Assist · Manual confirmation: Not required" and Rachel's note.
- Juno's avatar: the author's mascot, not Figma's icons. Chat preview "blue brick" and the 23:31 time format are old.
