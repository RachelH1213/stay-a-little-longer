# ART 08.6 — Fine Pixel Illustration / review candidate

This is a **design candidate**, not approved. Existing Orbit Saturn stays unchanged.

## Artwork
- Notes — fine outlined/folded memo with ink/negative-space writing and minimal 1px patina
- Photos — one coherent tilted print, true dark image window and tiny landscape details
- Settings — exact eight-tooth cream gear, open aperture, thin 1px machining marks

Files: `Assets/Art/UI/PhoneHome/` contains **both full rounded tile** sprites and **glyph-only transparent** sprites. Choose ONE according to the existing Unity UI; do not stack both tile backgrounds.

Editable `.aseprite` files are in `Aseprite_Source/`; constituent transparent layer PNGs in `Layer_PNGs/`. Keep originals separately from the Unity Assets folder.

Textures: Sprite (2D and UI); Point (no filter); Compression None; Mip Maps off; keep transparent alpha; don't downsample. Titles and labels remain Unity runtime text.

Only replace Notes, Photos, Settings after review. No edits to the approved Orbit logo, Night1Greybox scene or phone frame.

Not tested inside the Unity editor or Aseprite GUI. `.aseprite` files were parsed and their layer composites checked against PNG exactly.

Preview note: `Preview/ART08_6_UnityHome_Screenshot_STATIC_Mock.png` is an EDITED STATIC COPY of the earlier Unity screenshot to assess size and alignment; it is not a Unity runtime capture or an actual project modification.
