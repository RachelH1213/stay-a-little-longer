# Art direction

**Status (2026-11-10): decided.** Pixel art is the direction for the room and the full game. The author has made the avatars for the three characters and the base UI pages; they set the look, and later work builds on them or refines them. Message text stays in a clear typeface (§7). Everything here is the author's to change.

This replaces landing §10's "visual TBD" for the room, the phone and the paper layer. It doesn't change what the player can do, only how it looks.

---

## 1. In one line

A dark, quiet pixel-art room at night, seen from the chair at the desk; the phone in it is the only smooth, glowing, perfect thing.

## 2. Pillars

1. **Warm on the surface, wrong underneath.** The look must never announce a villain or a horror game. The unease comes slowly, from what Orbit does, not from the art.
2. **Two materials, two worlds.** People leave marks that are hand-made and imperfect: pixels, paper, handwriting, tape. Orbit is clean, smooth, lit from within. The player can tell which is which at a glance.
3. **Everything readable.** Clues live in text (Rachel never uses full stops), so every word on screen is crisp and real, never pixel-blurred or gibberish.

## 3. References

| Reference | What to take | What not to take |
|---|---|---|
| *Daily Protocol* (concept images the author collected) | the colour grade (desaturated grey-green, one sharp accent); collage of paper, polaroids, tape and clips; menus and notebooks that look like real documents | the horror cast (machine heads, ghosts); illegible text |
| *The Last Night* | pixel art lit by modern, soft light; night; depth from layers | the cyberpunk setting |
| *VA-11 Hall-A* | one fixed seat, most of the game is talking; a pixel room around crisp text | the bright anime palette |
| *Signalis* | cold, quiet palette; interfaces that feel like documents | the horror |
| *Dave the Diver* | pixel art inside real lighting and depth (the technique) | the brightness and the comedy |

## 4. The three layers

The visual system stays the one decided on 2026-10-13: phone, humans, Orbit.

| Layer | What belongs to it | Look |
|---|---|---|
| **Room / phone hardware** | the desk, lamp, window, objects, the player's hands, the phone's body | pixel art, dark grey-green, lit by the lamp and the screen |
| **Humans** | Rachel's messages and old photos, Dani, the player's Notes and Night Log, Rachel's private share (Night 2) | warm off-white paper, handwriting, tape, polaroids, a little red |
| **Orbit** | Juno, Suggested replies, Conversation Assist, Continuity, Orbit's records (Night 3) | clean, crisp, smooth gradients, deep blue-violet, the orbit ring; the only thing that glows |

## 5. Colour

- **Base:** desaturated grey-green and grey-blue, very dark; blacks are never pure black.
- **Lamp:** one warm yellow, small and soft, only in the lamp's pool of light.
- **Orbit:** deep blue-violet (`#8f82ff` family), only on Orbit's things and the screen's glow.
- **Paper red:** a muted red for paper labels, stamps and the player's own marks. Sparing.
- **Palette size:** 16–24 colours for the room, fixed in a palette file the author keeps. The UI on the phone isn't limited to the palette.

## 6. The room

- **View:** first person from the chair (story-bible §6, "How the game looks"), now drawn instead of modelled.
- **Canvas:** 640 × 360 pixels, shown at whole-number scales only (×3 at 1080p, ×4 at 1440p, ×6 at 4K), never blurred. **Other shapes (decided 2026-11-19, e.g. a MacBook's 16:10):** the room fills the screen at the smallest whole-number scale that covers it, cropped equally at the edges, never letterboxed; the phone is always wholly inside the visible area and is scaled to fit its height. Hotspots, room controls (`Go to sleep`, waits) and the phone stay inside the central **safe area of 512 × 320**, which every Mac display shows. A check of the room or the phone's placement adds one 16:10 screenshot (2880 × 1800).
- **Window (decided 2026-11-12):** the game starts fullscreen at the display's own resolution, so a normal screen lands on ×3 or more and the phone's interface is 420 pixels wide or wider. 1280 × 720 in a window is the smallest supported size (×2, interface 280 wide): suggested replies wrap to a second line and dates use the short form there, so nothing is cut off. Only below ×2 does the game fall back to a smoothed scale. The phone's interface is laid out at one fixed size (280 × 512 units) and only scaled, so line breaks are the same on every screen.
- **Phone frame and icons:** the phone frame (160 × 280), the 44 px avatars and Orbit's logo follow the same whole-number rule. The logo needs a small version of about 48 px drawn for the interface; the 96 px one doesn't scale cleanly.
- **States to draw:** holding the phone (the screen area left empty); phone down, looking at the desk and room; phone lit up on the desk. Later: the phone dead, the power bank found, morning.
- **Layers:** each drawn on its own layer so light and a little parallax can work: back wall and window; desk; lamp; objects on the desk; the player's hands and phone; foreground. Names: `room_<state>_<layer>.png`, e.g. `room_holding_desk.png`.
- **Things in the room:** the desk, the lamp, the window at night, a chair edge, the tote bag Rachel's package came in (`xoxo` printed on it), a radio, an alarm clock, books, a notebook and crit papers. (Revised 2026-11-20 to match the final art: no drawer.) The room tells who the player is (a design student after crit) without words.
- **Light:** drawn flat and darker than final; the game adds the lamp and the screen glow as real 2D lights, so the screen's light visibly changes the room when a notification arrives.

## 7. The phone and its screens

- **The phone's body** is pixel art like the room; **its screen is not.** The screen shows the game's UI at full resolution, crisp, in the Orbit layer's style. The contrast is the point: the one high-resolution thing in a hand-drawn room.
- **Screens** follow the existing UI (Juno's thread, the lock screen) until the author's Figma style frames replace it (§11).
- **Text, hybrid (decided 2026-11-12):** the pixel font VT323 only for interface chrome (the `orbit` wordmark, page and section headings, uppercase labels, date dividers, counts, back labels, `INFO`, `AI COMPANION`, tab labels, the status bar). Inter for anything a clue could be in: message bubbles, chat previews, names, list text, plan fields, change history entries, Rachel's note, the Contact Protection sheet. VT323 is used at a size whose pixel grid lands on whole screen pixels at every supported scale.

**Superseded 2026-11-18 by `docs/phone-screens.md`**, the one source for every phone screen (text styles, colours, spacing, each screen element by element). Where anything below differs, `phone-screens.md` wins.

### Orbit UI design system v1.0 (fixed 280 × 512, approved 2026-11-12)

For Orbit's screens on the phone only; not the room, the title screen or other scenes. Sizes are in the 280 × 512 layout units. Final readability is checked in Unity's Game View at the real scale, and no text goes below 10 units.

| Use | Size / weight |
|---|---|
| Page heading (Activity, Plans) | 16 / semibold |
| Plan title | 14 / semibold |
| Primary list text | 12 / medium |
| Secondary text, dates | 11 / regular |
| Small labels (WHEN, STATUS, date group headers), uppercase, dimmer | 10 / medium |
| Bottom tab labels; the selected tab clearly brighter | 10 / medium |

- **Spacing:** 4 / 6 / 8 / 12 / 16 only. Page side margins 14, card padding 12. Top bar 32, tab bar 36 plus the home indicator. Touch targets at least 28 tall.
- **Message text** keeps its own size; this scale doesn't change it.
- **Weights:** semibold and medium only if the font asset has them; never faked by overdrawing or scaling.
- **Shared components:** page heading, section label, list item (primary and secondary line), field row (label and value), chevron row. New screens use these rather than their own sizes.

### Phone layout fixes (decided 2026-11-15, after a Game View check at Large text)

- **The screen is one shape.** Top bars are exactly the screen's width (32 tall; `INFO`, `End` inside them, at the right); everything on the phone is clipped to the screen's rounded corners.
- **No visible scrollbars.** At most a thin line while scrolling.
- **Text size on the phone moves in small steps.** Message text (Inter): Standard 13, Large 14, Extra Large 16. Interface text grows by the same small steps and stays within 10–16. Bubbles are at most 75% of the screen's width.
- **Messages in groups.** One sender's messages within 5 minutes form a group: 4 between bubbles, 12 between groups. The time shows once, under a group's last message; `Delivered` only under the player's last message.
- **The player's bubbles** have their own fill (a little lighter, slightly paper-tinted), different from the other person's. Bubble padding 8 horizontal, 6 vertical; 1 px border.
- **Suggested replies:** a small `◌ Suggested replies` label (10), then the replies in one row that scrolls sideways if needed, 28 tall. Together with the composer, about 84 tall at most.
- **The room's hint** `Esc · Put down` shows only until the player has put the phone down once.
- **UI checks** (revised 2026-11-19): Standard at 1280 × 720 by default; Extra Large when text could wrap or overflow; other sizes only when the change concerns them (`rebuild-CLAUDE.md`, Checking UI).

### Phone layout, second pass (decided 2026-11-17, after the author's walkthrough)

- **One header system.** Second-level screens: a 32 top bar, back at the left, title centred, the right button (`INFO`, `END`) flush with the right edge, nothing after it. Top-level screens (Chats, Activity, Me) use a large heading; Chats has the orbit masthead only, no second `CHATS` heading. A thread's bar: back · avatar · name · button (`AI COMPANION` only on Juno's profile). Rachel's and Dani's 24 px avatars come with the art.
- **No stray marks:** no scrollbars, no dots at the screen's edges; `Esc · Put down` gone after the first put-down. Checked screen by screen.
- **VT323 on the pixel grid** at every size (no soft or heavier labels).
- **No one-word last lines** in system text: anything that wraps becomes label / value rows.
- **Home screen:** simple pixel glyphs for Notes, Photos and Settings until the author's icons; labels 10–11.
- **Chats** sorted by latest message (Juno not pinned); unread threads show a dot.
- **The tab bar and the home indicator** each have their own space.
- **Activity:** see `phone-screens.md`.
- **Change history:** `Orbit keeps your conversations safe` is small, dim system text with a small Orbit mark, clearly not Rachel's words. `Change accepted` shows `OCT 20 · 5:12 PM`. `HANDLED BY` · `Conversation Assist ›` and `CONFIRMATION` · `Not required` as label / value rows.
- **Threads:** the player's bubbles paper-tinted; Suggested replies never repeat something already sent; replies that don't fit fade at the right edge; the composer's field and send button the same height, with equal side margins.
- **Me:** settings in grouped cards with dividers, children indented inside the group; every row has an 11, dim description (Privacy & Data: `Contact Protection and how Orbit handles your data.`); switches about the height of a line of text.
- **The phone frame art:** four lighter bezel pixels (column 9, rows 32 and 168; column 151, rows 42 and 187) read as dots on the screen's edge; they take the colour of their neighbours.

### The room at the desk (decided 2026-11-20)

The final art is four 640 × 360 layers (`01_back` wall and window, `02_mid` the desk's objects, `03_phone`, `04_front` the desk's edge), each unlit and lit (the lit ones carry the phone's painted red glow). Whole-number scale only.

**Holding the phone, the room is peripheral: seen, never touched.** Nothing around the phone is a button or a readout; what's there changes on its own and draws the eye up. To touch the room, the player puts the phone down (Esc, or moving the pointer onto the room and clicking an object). Orbit never sees any of it.

What shows around the held phone: the books and the cabinet's edge (left), both sides of the window, the lamp, the notebook and the poster (right). The tote bag, radio, clock and power bank are behind the phone: only the phone's own clock is visible while holding it, the real one only when it's down.

**Objects** (hotspots on the art; hover shows pixel corner marks and the object's name only, in VT323; never an action or a key):

| Object | Click |
|---|---|
| Phone | picks it up |
| Tote bag (`xoxo`) | the first time: the power bank comes out onto the desk and Rachel's note shows, read in place (+2 min); after that, the note again |
| Power bank (to be drawn: Rachel's, blue, left of the phone once out of the bag, four indicator dots) | connects it: a cable appears between it and the phone; its one lit dot blinks, then fades as the charge moves; it can't be recharged |
| Lamp | on / off (free). Off, the room is darker and the phone's red carries it |

**Waiting** appears only once the power bank is connected: a line of VT323 at the bottom, `Leave it charging`, opening a small panel in the title's button style: `Wait 5 minutes` · `Wait until it's empty (about 10 minutes)` · `Pick up the phone`, each with its cost (`11:41 PM → 11:46 PM · 3% → 5%`) and `Rachel's account closes at 12:40 AM`. That line is shown nowhere else.

**Other room controls** use the title screen's style (Silkscreen labels, the menu button art), never the phone's: `Go to sleep` bottom right once allowed; the dead phone's choices in the lower third, without a frame.

**Light.**
- Phone lit on the desk: the lit layers over the unlit ones; arriving messages add a red swell (built).
- Phone held: a faint red glow over the lower half of the room, following the screen's brightness.
- The lamp: a warm pool on the desk while on.

**The night moves on its own** (story time; none of it points at anything): a car's light sweeps across the blinds around 11:50 and 12:15; across the street, lit windows go dark one by one from midnight (12:05, 12:20, 12:35); after 12:30 the streetlamp flickers now and then. The erase at 12:40 changes nothing in the room.

**Clock:** its hands follow story time (minute hand in 5-minute steps).

**Second pass (decided 2026-11-21, after the first build of the room):**
- **The held glow** comes from where the phone is: strongest just under the phone's bottom edge, falling off in every direction, faint (the room stays readable); never a band across the screen.
- **The lamp's pool** until its art arrives: drawn in the pixel style (two or three flat, hard-edged bands of the room's warm colour, under the lamp's head), never a soft blur. A soft blur reads as a glowing ball in a pixel scene.
- **The car's light** brightens the blinds' slats as it passes (the light pixels of the slats, in a slanted band moving sideways), not a vertical shaft over them.
- **Room text controls:** `Leave it charging` and `Go to sleep` are the same kind of thing, plain VT323 lines in the room's lower corners (charging bottom left, sleep bottom right), with the corner marks on hover; only the panels they open use the title's buttons.
- **The waits panel:** `Wait 5 minutes` · `Wait until it's empty` · `Pick up the phone`; `about 10 minutes` goes into that wait's cost line. Picking up from the panel costs nothing.
- **The tote bag** holds the power bank and Rachel's note (2026-11-21, `night1-scenes.md`, The room). The note closes on a click anywhere, Esc, or the bag again; it looks like paper with her handwriting once that art exists, until then a plain card.
- **The power bank's hotspot** is its drawn pixels once the art arrives; until then, the planned place.

**Narrowing:** after ten story minutes holding the phone without putting it down, the room darkens slowly toward a vignette (at most about a quarter darker, over twenty minutes). Putting the phone down resets it at once. Never mentioned anywhere.

**Status bar:** a pixel battery icon beside the percentage; a bolt while charging.

**Art still to make for the room** (each a 640 × 360 transparent PNG, only its own pixels, so it stacks without coordinates):
- the blue power bank, with 0–4 dots lit (five states), and the cable (connected);
- Rachel's note: a small paper with her handwriting (the text in `night1-scenes.md`, The room), shown large over the room when read;
- the lamp's bulb lit and unlit, and its warm pool (or Unity's light);
- the lit windows across the street (one layer, each window separable);
- the streetlamp lit and dim;
- the clock's minute hand in 12 positions and hour hand at 11, 12 and 1;
- the tote bag: `xoxo` worn and broken by the creases; its side face with the same grain, darker; the lit bag brighter near the phone and fading upward;
- the status bar's battery icon and bolt (in `phone-screens.md` sizes).

## 8. Paper and documents

- **Notes and the Night Log** look like the player's real notebook: lined or grid paper, handwriting, the player's screenshots as polaroids taped in, sticky notes, a few crossings-out.
- **Rachel's private share (Night 2)** looks scanned and personal: her own paper, her own marks.
- **Orbit's records (Night 3)** are the opposite: clean system documents, monospaced fields, no hand anywhere.
- **Textures** come from real paper, tape and handwriting, scanned or photographed, then cleaned up.

## 9. The test (one or two days)

1. **The author draws** one 640 × 360 image, "holding the phone at the desk", in layers; rough is fine (composition, colour, light).
2. **Unity** sets up the pixel scene (whole-number scaling), the lamp and screen as 2D lights, colour grade, grain and vignette as Inspector settings, the existing UI crisp in the phone's screen, a simple fade between holding and putting down, and an adjustable parallax.
3. **The author judges** it in Play mode against §2:
   - Does it feel like night, warm on the surface, wrong underneath?
   - Is every word on the phone easy to read?
   - Does the phone look like the only glowing, smooth thing?
   - Can the author keep drawing at this level for the whole room and its states?
4. **Then** decide: keep pixel art, adjust it, or switch to the photo collage (§10).

## 10. Fallback: photo collage

If pixel art doesn't work (it doesn't feel right, or it's too much drawing), the room is built from the author's own photographs of their room at night, cut out and layered as flat cards at the same camera position, with the same colour grade, lights and paper layer. Everything else in this document still applies.

## 11. What the author makes, and what Unity does

| The author | Unity (Claude Code) |
|---|---|
| the room in pixel art (or photos), the palette | pixel scaling, layers, parallax |
| Figma style frames: lock screen, Juno's thread, Rachel's thread, Suggested replies, a Notes page, an Orbit record | the screens built from those frames |
| the Orbit logo and ring, the app icon | lights, colour grade, grain, vignette as Inspector settings |
| paper, tape and handwriting, scanned | transitions between holding, putting down and the phone on the desk |
| key images (title, ending), painted over the author's own drawings or photos | rendering screenshots from fixed views to compare with the author's references |
| all final judgement on the look | nothing about the look is decided here |

### Art still to make (the author's, 2026-11-12)

- the room at 640 × 360 in its states (holding the phone, phone down, phone lit on the desk; later: dead, morning) and its objects (desk, lamp, window, tote bag, power bank);
- Orbit's logo at about 48 px for interface use (the 32 px from Figma is in use meanwhile);
- 24 px avatars of Rachel and Dani for thread headers (Juno's exists);
- three tab icons of about 14 px: speech box, log, head and torso;
- the send button's lit state if the recoloured disabled image isn't enough;
- home-screen icons for Notes, Photos and Settings;
- a few of the player's own old photos for Photos;
- the room's objects as hotspots on the picture (the build uses labelled buttons until then);
- the phone on the desk switched off (dark screen), for when it dies.

## 12. Not in this direction

- Horror imagery: machine heads, ghosts, gore, jump scares.
- Text that looks like text but can't be read.
- A bright, cute palette.
