# Room prototype (Unity)

A quick test of the room from `docs/story-bible.md` §6 in Unity, to decide whether the full game should move to Unity. It is **not** part of the web game and isn't deployed. Shapes and lights are placeholders; the point is to judge the mood, the light and how searching, charging and picking the phone up feel.

## Open it

1. Unity Hub → **New project** → template **Universal 3D** (Unity 6, or 2022.3 LTS). Any project name.
2. Copy the folder `Assets/RoomPrototype` from here into the new project's `Assets` folder.
3. Wait for Unity to compile. If the Console shows red errors, copy them to Claude Code.
4. Menu **Stay a Little Longer → Build Room Prototype**. It builds and saves `Assets/RoomPrototype/Room.unity`.
5. Press **Play**.

## What to try

- Move the mouse: the view leans a little (off with Reduce motion).
- Hover things in the room: they glow faintly and show their name. Click to look.
- The battery starts at 8% and you've read Rachel's "blue brick" message, so things are searchable: the tote bag shows a blue strap. Searching costs story time (+2–3 min). After two wrong places the protagonist points the way.
- Find the power bank in the tote bag, **Plug in Rachel's power bank**, then **Leave the phone charging**: wait 5 minutes or until it's empty. The clock moves, the battery rises, the window light shifts; the phone may light up and buzz once on the desk. Nothing pulls you to it.
- **Pick up the phone**: the camera moves to the phone and shows a stand-in lock screen. **Put it down** to go back.
- **Prototype** (top left): Reduce motion, whether you've read "blue brick", the battery slider (above 10% things are only looked at), make the phone light up, reset.

## What it isn't

- No real phone screens: in the full game the lock screen and everything after it would be the phone UI.
- Every line on screen is a draft from `docs/night1-scenes.md`; the author writes the real ones.
- Written without a Unity editor at hand, so it hasn't been run yet.
