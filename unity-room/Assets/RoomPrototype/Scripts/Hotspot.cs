// Something in the room the player can look at, or search once they need power.
// Texts are drafts from docs/night1-scenes.md; the author writes the real ones.
using UnityEngine;

namespace StayALittleLonger.Room
{
    public class Hotspot : MonoBehaviour
    {
        public string label = "";
        [TextArea] public string lookText = "";
        [TextArea] public string searchText = "";
        public int searchMinutes = 2;
        public bool holdsPowerBank;
        public bool isPhone;
        public Renderer[] highlightRenderers;   // what glows faintly on hover (never the phone screen)
        public GameObject revealWhenSearching;  // e.g. the blue strap showing from the tote bag

        [HideInInspector] public bool searched;

        static readonly Color Glow = new Color(0.22f, 0.19f, 0.15f);

        public void SetHighlight(bool on)
        {
            if (highlightRenderers == null) return;
            foreach (var r in highlightRenderers)
            {
                if (r == null) continue;
                var m = r.material;
                if (!m.HasProperty("_EmissionColor")) continue;
                m.EnableKeyword("_EMISSION");
                m.SetColor("_EmissionColor", on ? Glow : Color.black);
            }
        }
    }
}
