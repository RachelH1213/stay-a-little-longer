// The phone on the desk: dark until a notification lights it and it buzzes once.
// It never pulls the view back to itself (story bible §6, "Notifications in the room").
using UnityEngine;

namespace StayALittleLonger.Room
{
    public class PhoneProp : MonoBehaviour
    {
        public Renderer screen;
        public Light screenLight;
        public Color screenColor = new Color(0.55f, 0.5f, 0.95f);

        float glowUntil;
        float buzzUntil;
        Vector3 basePos;

        public bool Lit => Time.time < glowUntil;
        [HideInInspector] public bool hasUnread;

        void Start()
        {
            basePos = transform.localPosition;
            SetGlow(0.03f);
        }

        public void Notify(float seconds)
        {
            glowUntil = Time.time + seconds;
            buzzUntil = Time.time + 0.6f;
            hasUnread = true;
        }

        void Update()
        {
            SetGlow(Lit ? 1f : 0.03f);
            bool buzzing = Time.time < buzzUntil && !RoomController.ReduceMotion;
            transform.localPosition = buzzing
                ? basePos + new Vector3(Mathf.Sin(Time.time * 90f) * 0.0015f, 0f, 0f)
                : basePos;
        }

        void SetGlow(float k)
        {
            if (screen == null) return;
            var m = screen.material;
            if (m.HasProperty("_EmissionColor"))
            {
                m.EnableKeyword("_EMISSION");
                m.SetColor("_EmissionColor", screenColor * (k * 2f));
            }
            if (screenLight != null) screenLight.intensity = k * 0.8f;
        }
    }
}
