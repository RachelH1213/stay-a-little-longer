// The room prototype: one seated view, a few hotspots, Rachel's power bank, waiting, and picking the
// phone back up. Rules from docs/story-bible.md §6 ("The room") and docs/night1-scenes.md.
// The UI is Unity's immediate-mode GUI on purpose, so the prototype needs no Canvas or TextMeshPro setup.
// Every line on screen is a draft.
using System.Collections;
using UnityEngine;

namespace StayALittleLonger.Room
{
    public class RoomController : MonoBehaviour
    {
        public static bool ReduceMotion;

        public RoomState state;
        public PhoneProp phone;
        public Camera cam;
        public Transform phoneViewAnchor;   // where the camera goes when the phone is picked up
        public GameObject bankOnDesk;       // the power bank and its lead, shown once found and plugged in
        public Light windowLight;

        const string HintAfterTwo = "Rachel's power bank might still be in your bag.";

        Hotspot hovered;
        string caption = "";
        bool offerPlugIn;
        bool waitMenu;
        bool waiting;
        bool phoneView;
        bool showDebug;
        Quaternion baseRot;
        Vector3 basePos;
        Color windowStart;
        float uiScale = 1f;

        void Start()
        {
            baseRot = cam.transform.rotation;
            basePos = cam.transform.position;
            if (bankOnDesk != null) bankOnDesk.SetActive(false);
            if (windowLight != null) windowStart = windowLight.color;
            Say("The phone is on the desk. " + state.Clock + ".");
        }

        void Update()
        {
            uiScale = Screen.height / 720f;
            UpdateReveals();

            Vector2 mouse = MousePosition();
            Transform t = cam.transform;

            if (phoneView)
            {
                t.position = Vector3.Lerp(t.position, phoneViewAnchor.position, Time.deltaTime * 6f);
                t.rotation = Quaternion.Slerp(t.rotation, phoneViewAnchor.rotation, Time.deltaTime * 6f);
                SetHover(null);
                return;
            }

            Quaternion target = baseRot;
            if (!ReduceMotion)
            {
                float nx = mouse.x / Mathf.Max(1, Screen.width) - 0.5f;
                float ny = mouse.y / Mathf.Max(1, Screen.height) - 0.5f;
                target = baseRot * Quaternion.Euler(-ny * 4f, nx * 6f, 0f);
            }
            t.position = Vector3.Lerp(t.position, basePos, Time.deltaTime * 6f);
            t.rotation = Quaternion.Slerp(t.rotation, target, Time.deltaTime * 4f);

            // The bottom of the screen belongs to the buttons; clicks there never reach the room.
            bool overUi = mouse.y < 190f * uiScale
                || (mouse.x < 110f * uiScale && mouse.y > Screen.height - 40f * uiScale)
                || (showDebug && mouse.x < 260f * uiScale && mouse.y > Screen.height - 230f * uiScale);
            if (waitMenu || waiting || overUi)
            {
                SetHover(null);
                return;
            }

            Hotspot h = null;
            if (Physics.Raycast(cam.ScreenPointToRay(mouse), out RaycastHit hit, 20f))
                h = hit.collider.GetComponentInParent<Hotspot>();
            SetHover(h);
            if (h != null && Clicked()) Use(h);
        }

        void UpdateReveals()
        {
            foreach (var h in FindHotspots())
                if (h.revealWhenSearching != null)
                    h.revealWhenSearching.SetActive(state.SearchMode && !state.bankFound);
        }

        Hotspot[] cachedHotspots;
        Hotspot[] FindHotspots()
        {
            if (cachedHotspots == null) cachedHotspots = FindObjectsByType<Hotspot>(FindObjectsSortMode.None);
            return cachedHotspots;
        }

        void SetHover(Hotspot h)
        {
            if (hovered == h) return;
            if (hovered != null) hovered.SetHighlight(false);
            hovered = h;
            if (hovered != null) hovered.SetHighlight(true);
        }

        void Use(Hotspot h)
        {
            if (h.isPhone)
            {
                if (state.bankPluggedIn && state.bankRemaining > 0f) waitMenu = true;
                else PickUp();
                return;
            }
            if (!state.SearchMode)
            {
                Say(h.lookText);
                return;
            }
            if (h.searched)
            {
                Say(h.holdsPowerBank ? "Nothing else you need in there." : "You've already looked here.");
                return;
            }
            h.searched = true;
            state.Spend(h.searchMinutes);
            CheckErase();
            if (h.holdsPowerBank)
            {
                state.bankFound = true;
                offerPlugIn = true;
                Say(h.searchText);
            }
            else
            {
                state.wrongSearches++;
                string text = h.searchText;
                if (state.wrongSearches >= 2 && !state.bankFound) text += "\n" + HintAfterTwo;
                Say(text);
            }
        }

        void PlugIn()
        {
            offerPlugIn = false;
            state.bankPluggedIn = true;
            if (bankOnDesk != null) bankOnDesk.SetActive(true);
            Say("Plugged in. With the screen on it barely keeps up. Put down, it charges.");
        }

        void PickUp()
        {
            // Picking the phone up always goes to the lock screen, never into a notification.
            waitMenu = false;
            phoneView = true;
        }

        void PutDown()
        {
            phoneView = false;
            phone.hasUnread = false;
            Say("You put the phone back on the desk.");
        }

        IEnumerator Wait(int minutes)
        {
            waitMenu = false;
            waiting = true;
            float gain = Mathf.Min(minutes * state.chargePerMinute, state.bankRemaining);
            int startClock = state.clockMinutes;
            float startBattery = state.battery;
            bool notify = state.notifyBudget > 0 && Random.value < 0.5f;
            Say("You leave it charging.");

            const float seconds = 2.5f;
            float t = 0f;
            while (t < seconds)
            {
                t += Time.deltaTime;
                float k = Mathf.Clamp01(t / seconds);
                state.clockMinutes = startClock + Mathf.RoundToInt(minutes * k);
                state.battery = startBattery + gain * k;
                if (windowLight != null)
                    windowLight.color = Color.Lerp(windowStart, windowStart * 0.8f + new Color(0.02f, 0.02f, 0.06f), k);
                if (notify && k > 0.5f)
                {
                    notify = false;
                    state.notifyBudget--;
                    phone.Notify(6f);
                    Say("The phone lights up on the desk.");
                }
                yield return null;
            }

            state.clockMinutes = startClock + minutes;
            state.battery = startBattery + gain;
            state.bankRemaining = Mathf.Max(0f, state.bankRemaining - gain);
            waiting = false;
            if (state.bankRemaining <= 0.01f) Say("The power bank's last light goes out.");
            CheckErase();
        }

        void CheckErase()
        {
            if (state.erased || state.clockMinutes < state.eraseAtMinutes) return;
            state.erased = true;
            Say("It's past 00:40. Her account is gone for good.");
        }

        void Say(string text)
        {
            caption = text;
        }

        // ---------------- UI ----------------

        void OnGUI()
        {
            GUI.matrix = Matrix4x4.Scale(new Vector3(uiScale, uiScale, 1f));
            float w = Screen.width / uiScale;
            float h = Screen.height / uiScale;

            var small = new GUIStyle(GUI.skin.label) { fontSize = 14 };
            small.normal.textColor = new Color(0.85f, 0.85f, 0.85f);
            var body = new GUIStyle(GUI.skin.label) { fontSize = 18, wordWrap = true, alignment = TextAnchor.UpperCenter };
            body.normal.textColor = new Color(0.95f, 0.93f, 0.88f);
            var button = new GUIStyle(GUI.skin.button) { fontSize = 16 };

            // Status (the phone's own clock and battery, as on its status bar).
            GUI.Label(new Rect(w - 230, 12, 220, 22), state.Clock + "   " + Mathf.FloorToInt(state.battery) + "%" +
                (state.bankFound ? "   power bank " + Mathf.CeilToInt(state.bankRemaining) + "%" : ""), small);

            if (phoneView)
            {
                DrawLockScreen(w, h, body, small, button);
                return;
            }

            // What the player sees or thinks.
            if (!string.IsNullOrEmpty(caption))
                GUI.Label(new Rect(w * 0.1f, h - 175, w * 0.8f, 90), caption, body);

            if (hovered != null && !string.IsNullOrEmpty(hovered.label))
                GUI.Label(new Rect(w * 0.5f - 150, h - 205, 300, 24), hovered.label, small);

            float y = h - 70;
            if (waitMenu)
            {
                DrawWaitMenu(w, h, body, button);
            }
            else if (!waiting)
            {
                float x = w * 0.5f - 230;
                if (offerPlugIn && GUI.Button(new Rect(x, y, 220, 40), "Plug in Rachel's power bank", button)) PlugIn();
                else if (state.bankPluggedIn && state.bankRemaining > 0f && GUI.Button(new Rect(x, y, 220, 40), "Leave the phone charging", button)) waitMenu = true;
                if (GUI.Button(new Rect(x + 240, y, 220, 40), "Pick up the phone", button)) PickUp();
            }

            // Prototype controls, not part of the game.
            if (GUI.Button(new Rect(10, 10, 90, 26), showDebug ? "Hide" : "Prototype", button)) showDebug = !showDebug;
            if (showDebug)
            {
                GUI.Box(new Rect(10, 40, 240, 180), "");
                ReduceMotion = GUI.Toggle(new Rect(20, 50, 220, 22), ReduceMotion, " Reduce motion");
                state.knowsBlueBrick = GUI.Toggle(new Rect(20, 76, 220, 22), state.knowsBlueBrick, " Read Rachel's \"blue brick\"");
                GUI.Label(new Rect(20, 104, 220, 22), "Battery " + Mathf.FloorToInt(state.battery) + "%", small);
                state.battery = GUI.HorizontalSlider(new Rect(20, 128, 210, 20), state.battery, 0f, 20f);
                if (GUI.Button(new Rect(20, 152, 210, 26), "Make the phone light up", button)) phone.Notify(6f);
                if (GUI.Button(new Rect(20, 184, 210, 26), "Reset", button)) UnityEngine.SceneManagement.SceneManager.LoadScene(0);
            }
        }

        void DrawWaitMenu(float w, float h, GUIStyle body, GUIStyle button)
        {
            float bw = 460, bh = 230;
            float x = w * 0.5f - bw * 0.5f, y = h - bh - 20;
            GUI.Box(new Rect(x, y, bw, bh), "");
            int five = Mathf.Min(5, state.MinutesUntilEmpty);
            int all = state.MinutesUntilEmpty;
            string info = "It's " + state.Clock + ". Rachel's account clears at " + RoomState.Format(state.eraseAtMinutes) + ".\n" +
                          five + " minutes: about +" + Mathf.RoundToInt(Mathf.Min(five * state.chargePerMinute, state.bankRemaining)) + "%\n" +
                          "Until it's empty (" + all + " minutes): about +" + Mathf.RoundToInt(state.bankRemaining) + "%";
            GUI.Label(new Rect(x + 20, y + 14, bw - 40, 90), info, body);
            if (GUI.Button(new Rect(x + 20, y + 112, bw - 40, 30), "Wait " + five + " minutes", button)) StartCoroutine(Wait(five));
            if (all > five && GUI.Button(new Rect(x + 20, y + 146, bw - 40, 30), "Wait until the power bank is empty", button)) StartCoroutine(Wait(all));
            if (GUI.Button(new Rect(x + 20, y + 180, (bw - 50) * 0.5f, 30), "Pick up the phone", button)) PickUp();
            if (GUI.Button(new Rect(x + 30 + (bw - 50) * 0.5f, y + 180, (bw - 50) * 0.5f, 30), "Not yet", button)) waitMenu = false;
        }

        void DrawLockScreen(float w, float h, GUIStyle body, GUIStyle small, GUIStyle button)
        {
            // A stand-in for the real lock screen, which lives in the phone UI.
            float pw = 300, ph = 520;
            float x = w * 0.5f - pw * 0.5f, y = h * 0.5f - ph * 0.5f;
            GUI.Box(new Rect(x, y, pw, ph), "");
            var big = new GUIStyle(body) { fontSize = 54, alignment = TextAnchor.MiddleCenter };
            GUI.Label(new Rect(x, y + 40, pw, 70), state.Clock, big);
            GUI.Label(new Rect(x, y + 112, pw, 24), Mathf.FloorToInt(state.battery) + "%" + (state.bankPluggedIn && state.bankRemaining > 0f ? " · charging" : ""), new GUIStyle(small) { alignment = TextAnchor.MiddleCenter });
            if (phone.hasUnread)
            {
                GUI.Box(new Rect(x + 16, y + 170, pw - 32, 64), "");
                GUI.Label(new Rect(x + 28, y + 178, pw - 56, 52), "Juno\nstill there?", new GUIStyle(body) { alignment = TextAnchor.UpperLeft, fontSize = 16 });
            }
            GUI.Label(new Rect(x, y + ph - 110, pw, 40), "(the phone's screens go here)", new GUIStyle(small) { alignment = TextAnchor.MiddleCenter });
            if (GUI.Button(new Rect(x + 40, y + ph - 60, pw - 80, 36), "Put it down", button)) PutDown();
        }

        // ---------------- input (works with the old Input Manager or the new Input System) ----------------

        static Vector2 MousePosition()
        {
#if ENABLE_INPUT_SYSTEM
            var m = UnityEngine.InputSystem.Mouse.current;
            return m != null ? m.position.ReadValue() : Vector2.zero;
#else
            return Input.mousePosition;
#endif
        }

        static bool Clicked()
        {
#if ENABLE_INPUT_SYSTEM
            var m = UnityEngine.InputSystem.Mouse.current;
            return m != null && m.leftButton.wasPressedThisFrame;
#else
            return Input.GetMouseButtonDown(0);
#endif
        }
    }
}
