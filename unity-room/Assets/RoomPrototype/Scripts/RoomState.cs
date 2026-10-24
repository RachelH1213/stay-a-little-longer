// The room's state for the prototype: the story clock, the phone's battery and Rachel's power bank.
// Rules from docs/story-bible.md §6 ("The room") and docs/night1-scenes.md (searching the room, costs).
// Every number here is a draft to tune.
using UnityEngine;

namespace StayALittleLonger.Room
{
    public class RoomState : MonoBehaviour
    {
        // Story time in minutes from Tuesday 00:00, so 23:31 is 1411 and 00:40 the next night is 1480.
        // The clock only moves with actions (searching, waiting), never with real time.
        public int clockMinutes = 1464;        // 00:24
        public int eraseAtMinutes = 1480;      // 00:40: Rachel's account is erased for good
        public float battery = 8f;             // percent
        public float bankRemaining = 12f;      // percent the power bank can still give
        public float chargePerMinute = 1f;     // with the phone down
        public bool knowsBlueBrick = true;     // the player has read Rachel's "blue brick" message

        [HideInInspector] public bool bankFound;
        [HideInInspector] public bool bankPluggedIn;
        [HideInInspector] public bool erased;
        [HideInInspector] public int wrongSearches;
        [HideInInspector] public int notifyBudget = 1; // at most one notification while the phone is down

        public string Clock => Format(clockMinutes);

        public static string Format(int minutes)
        {
            int m = ((minutes % 1440) + 1440) % 1440;
            return (m / 60).ToString("00") + ":" + (m % 60).ToString("00");
        }

        // Hotspots become searchable once there's a reason to look for power.
        public bool SearchMode => (battery <= 10f && knowsBlueBrick) || battery <= 5f;

        public int MinutesUntilEmpty => Mathf.CeilToInt(bankRemaining / chargePerMinute);

        public void Spend(int minutes)
        {
            clockMinutes += minutes;
        }
    }
}
