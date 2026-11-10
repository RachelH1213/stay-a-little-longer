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
| **Orbit** | Juno, Suggested replies, Conversation Assist, Continuity, Check-in, Orbit's records (Night 3) | clean, crisp, smooth gradients, deep blue-violet, the orbit ring; the only thing that glows |

## 5. Colour

- **Base:** desaturated grey-green and grey-blue, very dark; blacks are never pure black.
- **Lamp:** one warm yellow, small and soft, only in the lamp's pool of light.
- **Orbit:** deep blue-violet (`#8f82ff` family), only on Orbit's things and the screen's glow.
- **Paper red:** a muted red for paper labels, stamps and the player's own marks. Sparing.
- **Palette size:** 16–24 colours for the room, fixed in a palette file the author keeps. The UI on the phone isn't limited to the palette.

## 6. The room

- **View:** first person from the chair (story-bible §6, "How the game looks"), now drawn instead of modelled.
- **Canvas:** 640 × 360 pixels, shown at whole-number scales only (×3 at 1080p, ×4 at 1440p, ×6 at 4K); letterboxed in between, never blurred.
- **States to draw:** holding the phone (the screen area left empty); phone down, looking at the desk and room; phone lit up on the desk. Later: the phone dead, the power bank found, morning.
- **Layers:** each drawn on its own layer so light and a little parallax can work: back wall and window; desk; lamp; objects on the desk; the player's hands and phone; foreground. Names: `room_<state>_<layer>.png`, e.g. `room_holding_desk.png`.
- **Things in the room:** the desk, the lamp, the window at night, a chair edge, the tote bag from game night, a drawer, a coat, a mug. The room tells who the player is (a design student after crit) without words.
- **Light:** drawn flat and darker than final; the game adds the lamp and the screen glow as real 2D lights, so the screen's light visibly changes the room when a notification arrives.

## 7. The phone and its screens

- **The phone's body** is pixel art like the room; **its screen is not.** The screen shows the game's UI at full resolution, crisp, in the Orbit layer's style. The contrast is the point: the one high-resolution thing in a hand-drawn room.
- **Screens** follow the existing UI (Juno's thread, the lock screen) until the author's Figma style frames replace it (§11).
- **Text** uses one readable typeface (Inter for now) everywhere on the phone. No pixel fonts for anything a clue might be in.

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

## 12. Not in this direction

- Horror imagery: machine heads, ghosts, gore, jump scares.
- Text that looks like text but can't be read.
- A bright, cute palette.
