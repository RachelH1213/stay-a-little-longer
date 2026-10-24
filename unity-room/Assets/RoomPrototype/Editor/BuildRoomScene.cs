// Builds the room prototype scene from simple shapes, so nothing has to be placed by hand.
// Menu: Stay a Little Longer > Build Room Prototype. Re-running it rebuilds the scene from scratch.
// Shapes, colours and light values are placeholders for judging mood and interaction, not final art.
using System.IO;
using StayALittleLonger.Room;
using UnityEditor;
using UnityEditor.SceneManagement;
using UnityEngine;
using UnityEngine.Rendering;

namespace StayALittleLonger.RoomEditor
{
    public static class BuildRoomScene
    {
        const string Root = "Assets/RoomPrototype";
        const string MatDir = Root + "/Materials";
        const string ScenePath = Root + "/Room.unity";

        [MenuItem("Stay a Little Longer/Build Room Prototype")]
        public static void Build()
        {
            if (!EditorSceneManager.SaveCurrentModifiedScenesIfUserWantsTo()) return;
            if (!AssetDatabase.IsValidFolder(MatDir)) AssetDatabase.CreateFolder(Root, "Materials");

            var scene = EditorSceneManager.NewScene(NewSceneSetup.EmptyScene, NewSceneMode.Single);

            RenderSettings.skybox = null;
            RenderSettings.ambientMode = AmbientMode.Flat;
            RenderSettings.ambientLight = new Color(0.035f, 0.04f, 0.06f);

            // Materials
            var floorM = Mat("Floor", new Color(0.12f, 0.10f, 0.09f));
            var wallM = Mat("Wall", new Color(0.14f, 0.14f, 0.16f));
            var woodM = Mat("Desk", new Color(0.30f, 0.22f, 0.16f));
            var darkM = Mat("Dark", new Color(0.06f, 0.06f, 0.07f));
            var paperM = Mat("Paper", new Color(0.85f, 0.83f, 0.78f));
            var brownM = Mat("Takeout", new Color(0.45f, 0.33f, 0.22f));
            var coatM = Mat("Coat", new Color(0.12f, 0.20f, 0.16f));
            var toteM = Mat("Tote", new Color(0.72f, 0.66f, 0.55f));
            var blueM = Mat("RachelBlue", new Color(0.12f, 0.32f, 0.78f));
            var phoneM = Mat("Phone", new Color(0.05f, 0.05f, 0.055f));
            var screenM = Mat("Screen", new Color(0.02f, 0.02f, 0.03f), new Color(0.02f, 0.02f, 0.04f));
            var lampM = Mat("LampShade", new Color(0.9f, 0.8f, 0.6f), new Color(1.0f, 0.75f, 0.45f));
            var windowM = Mat("Window", new Color(0.05f, 0.07f, 0.12f), new Color(0.10f, 0.14f, 0.26f));
            var ledM = Mat("BankLight", new Color(0.2f, 0.5f, 1f), new Color(0.3f, 0.7f, 1.6f));

            // The room
            Box("Floor", null, new Vector3(0, -0.05f, 0.2f), new Vector3(5, 0.1f, 5), floorM);
            Box("Back wall", null, new Vector3(0, 1.5f, 1.2f), new Vector3(5, 3, 0.1f), wallM);
            Box("Left wall", null, new Vector3(-1.6f, 1.5f, 0.2f), new Vector3(0.1f, 3, 5), wallM);
            Box("Right wall", null, new Vector3(1.8f, 1.5f, 0.2f), new Vector3(0.1f, 3, 5), wallM);

            var window = GameObject.CreatePrimitive(PrimitiveType.Quad);
            window.name = "Window";
            window.transform.position = new Vector3(1.74f, 1.6f, 0.25f);
            window.transform.rotation = Quaternion.Euler(0, 90, 0);
            window.transform.localScale = new Vector3(1.0f, 1.2f, 1);
            window.GetComponent<Renderer>().sharedMaterial = windowM;
            Object.DestroyImmediate(window.GetComponent<Collider>());
            var windowLight = PointLight("Window light", new Vector3(1.45f, 1.6f, 0.25f), new Color(0.45f, 0.55f, 0.85f), 0.7f, 4f, LightShadows.None);

            // The desk
            var desk = new GameObject("Desk");
            Box("Top", desk.transform, new Vector3(0, 0.76f, 0.75f), new Vector3(1.4f, 0.04f, 0.7f), woodM);
            foreach (var x in new[] { -0.66f, 0.66f })
                foreach (var z in new[] { 0.45f, 1.05f })
                    Box("Leg", desk.transform, new Vector3(x, 0.37f, z), new Vector3(0.04f, 0.74f, 0.04f), woodM);

            // The lamp
            var lamp = new GameObject("Lamp");
            Cyl("Base", lamp.transform, new Vector3(-0.5f, 0.785f, 0.9f), new Vector3(0.12f, 0.005f, 0.12f), darkM);
            Cyl("Pole", lamp.transform, new Vector3(-0.5f, 0.97f, 0.9f), new Vector3(0.015f, 0.18f, 0.015f), darkM);
            Cyl("Shade", lamp.transform, new Vector3(-0.46f, 1.16f, 0.86f), new Vector3(0.16f, 0.05f, 0.16f), lampM);
            PointLight("Lamp light", new Vector3(-0.46f, 1.08f, 0.84f), new Color(1.0f, 0.75f, 0.5f), 1.6f, 2.6f, LightShadows.Soft);

            // Hotspots
            var drawer = Spot("Drawer", "Desk drawer",
                look: "Pens, tape, a dead lighter.",
                search: "The adapter is still here.\nThe cable is under your desk in the studio, where you left it after crit.",
                minutes: 2);
            Box("Drawer front", drawer.transform, new Vector3(0.42f, 0.66f, 0.42f), new Vector3(0.45f, 0.14f, 0.02f), woodM);
            Box("Handle", drawer.transform, new Vector3(0.42f, 0.66f, 0.405f), new Vector3(0.12f, 0.015f, 0.015f), darkM);
            Finish(drawer);

            var crit = Spot("Crit work", "Crit printouts",
                look: "Your crit work, in the order you presented it.",
                search: "Just paper.",
                minutes: 2);
            Box("Sheet A", crit.transform, new Vector3(-0.22f, 0.782f, 0.62f), new Vector3(0.3f, 0.004f, 0.42f), paperM, 12f);
            Box("Sheet B", crit.transform, new Vector3(-0.18f, 0.786f, 0.66f), new Vector3(0.3f, 0.004f, 0.42f), paperM, -6f);
            Finish(crit);

            var takeout = Spot("Takeout", "Takeout bag",
                look: "Tonight's takeout, half eaten.",
                search: "Napkins. A receipt.",
                minutes: 2);
            Box("Bag", takeout.transform, new Vector3(0.52f, 0.89f, 0.98f), new Vector3(0.18f, 0.22f, 0.12f), brownM, -8f);
            Finish(takeout);

            var chair = new GameObject("Chair");
            Box("Seat", chair.transform, new Vector3(-1.05f, 0.45f, 0.35f), new Vector3(0.42f, 0.04f, 0.42f), woodM);
            Box("Back", chair.transform, new Vector3(-1.05f, 0.75f, 0.55f), new Vector3(0.42f, 0.55f, 0.04f), woodM);
            foreach (var x in new[] { -1.24f, -0.86f })
                foreach (var z in new[] { 0.16f, 0.54f })
                    Box("Leg", chair.transform, new Vector3(x, 0.22f, z), new Vector3(0.03f, 0.44f, 0.03f), woodM);

            var coat = Spot("Coat", "Your coat",
                look: "Your coat, over the chair.",
                search: "Receipts. Your studio key. No power bank.",
                minutes: 2);
            var coatShape = GameObject.CreatePrimitive(PrimitiveType.Capsule);
            coatShape.name = "Coat shape";
            coatShape.transform.SetParent(coat.transform, false);
            coatShape.transform.position = new Vector3(-1.05f, 0.82f, 0.5f);
            coatShape.transform.localScale = new Vector3(0.38f, 0.32f, 0.14f);
            coatShape.GetComponent<Renderer>().sharedMaterial = coatM;
            Finish(coat);

            var tote = Spot("Tote bag", "Tote bag",
                look: "Still full of things from game night.",
                search: "Rachel's blue power bank.\nA short charging lead folds into the side. One light left.\nIt charges through an old cable you don't have.",
                minutes: 3);
            tote.holdsPowerBank = true;
            Box("Bag", tote.transform, new Vector3(0.95f, 0.19f, 0.62f), new Vector3(0.36f, 0.38f, 0.12f), toteM, -15f);
            Box("Handle", tote.transform, new Vector3(0.95f, 0.44f, 0.62f), new Vector3(0.22f, 0.12f, 0.01f), toteM, -15f);
            var strap = Box("Blue strap", tote.transform, new Vector3(1.02f, 0.41f, 0.6f), new Vector3(0.035f, 0.11f, 0.006f), blueM, -15f);
            Object.DestroyImmediate(strap.GetComponent<Collider>());
            Finish(tote);
            tote.revealWhenSearching = strap;

            // The phone
            var phoneGo = new GameObject("Phone");
            phoneGo.transform.position = new Vector3(0.06f, 0.783f, 0.55f);
            phoneGo.transform.rotation = Quaternion.Euler(0, -10, 0);
            var body = Box("Body", phoneGo.transform, Vector3.zero, new Vector3(0.075f, 0.008f, 0.155f), phoneM, 0f, local: true);
            Object.DestroyImmediate(body.GetComponent<Collider>());
            var screen = Box("Screen", phoneGo.transform, new Vector3(0, 0.0045f, 0), new Vector3(0.068f, 0.001f, 0.146f), screenM, 0f, local: true);
            Object.DestroyImmediate(screen.GetComponent<Collider>());
            var pick = phoneGo.AddComponent<BoxCollider>();
            pick.size = new Vector3(0.13f, 0.04f, 0.21f);
            var screenLight = PointLight("Screen light", Vector3.zero, new Color(0.55f, 0.5f, 0.95f), 0f, 0.7f, LightShadows.None);
            screenLight.transform.SetParent(phoneGo.transform, false);
            screenLight.transform.localPosition = new Vector3(0, 0.06f, 0);
            var phone = phoneGo.AddComponent<PhoneProp>();
            phone.screen = screen.GetComponent<Renderer>();
            phone.screenLight = screenLight;
            var phoneSpot = phoneGo.AddComponent<Hotspot>();
            phoneSpot.label = "Your phone";
            phoneSpot.isPhone = true;
            phoneSpot.highlightRenderers = new[] { body.GetComponent<Renderer>() };

            // Rachel's power bank on the desk, plugged in (hidden until found)
            var bank = new GameObject("Power bank on desk");
            Box("Power bank", bank.transform, new Vector3(0.2f, 0.79f, 0.57f), new Vector3(0.07f, 0.022f, 0.12f), blueM, 8f);
            Box("Lead", bank.transform, new Vector3(0.13f, 0.783f, 0.5f), new Vector3(0.1f, 0.004f, 0.006f), darkM, 25f);
            var led = GameObject.CreatePrimitive(PrimitiveType.Sphere);
            led.name = "One light left";
            led.transform.SetParent(bank.transform, false);
            led.transform.position = new Vector3(0.2f, 0.802f, 0.52f);
            led.transform.localScale = Vector3.one * 0.006f;
            led.GetComponent<Renderer>().sharedMaterial = ledM;
            foreach (var c in bank.GetComponentsInChildren<Collider>()) Object.DestroyImmediate(c);

            // Camera: seated at the desk
            var camGo = new GameObject("Camera");
            var cam = camGo.AddComponent<Camera>();
            camGo.AddComponent<AudioListener>();
            camGo.tag = "MainCamera";
            cam.clearFlags = CameraClearFlags.SolidColor;
            cam.backgroundColor = new Color(0.01f, 0.01f, 0.015f);
            cam.fieldOfView = 55f;
            cam.nearClipPlane = 0.02f;
            camGo.transform.position = new Vector3(0, 1.18f, -0.45f);
            camGo.transform.LookAt(new Vector3(0.05f, 0.78f, 0.6f));

            var anchor = new GameObject("Phone view");
            anchor.transform.position = phoneGo.transform.position + new Vector3(0, 0.32f, -0.02f);
            anchor.transform.LookAt(phoneGo.transform.position, Vector3.forward);

            // State and controller
            var room = new GameObject("Room");
            var state = room.AddComponent<RoomState>();
            var controller = room.AddComponent<RoomController>();
            controller.state = state;
            controller.phone = phone;
            controller.cam = cam;
            controller.phoneViewAnchor = anchor.transform;
            controller.bankOnDesk = bank;
            controller.windowLight = windowLight;

            EditorSceneManager.SaveScene(scene, ScenePath);
            EditorBuildSettings.scenes = new[] { new EditorBuildSettingsScene(ScenePath, true) };
            AssetDatabase.SaveAssets();
            Debug.Log("Room prototype built: " + ScenePath + ". Press Play.");
        }

        // ---------------- helpers ----------------

        static Material Mat(string name, Color color, Color? emission = null)
        {
            string path = MatDir + "/" + name + ".mat";
            var shader = Shader.Find("Universal Render Pipeline/Lit");
            if (shader == null) shader = Shader.Find("Standard");
            var m = new Material(shader) { name = name };
            if (m.HasProperty("_BaseColor")) m.SetColor("_BaseColor", color);
            if (m.HasProperty("_Color")) m.SetColor("_Color", color);
            if (m.HasProperty("_Smoothness")) m.SetFloat("_Smoothness", 0.2f);
            if (m.HasProperty("_Glossiness")) m.SetFloat("_Glossiness", 0.2f);
            if (emission.HasValue)
            {
                m.EnableKeyword("_EMISSION");
                m.SetColor("_EmissionColor", emission.Value);
                m.globalIlluminationFlags = MaterialGlobalIlluminationFlags.RealtimeEmissive;
            }
            if (File.Exists(path)) AssetDatabase.DeleteAsset(path);
            AssetDatabase.CreateAsset(m, path);
            return m;
        }

        static GameObject Box(string name, Transform parent, Vector3 pos, Vector3 scale, Material mat, float rotY = 0f, bool local = false)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cube);
            go.name = name;
            if (parent != null) go.transform.SetParent(parent, false);
            if (local) go.transform.localPosition = pos; else go.transform.position = pos;
            go.transform.rotation = (parent != null && local ? parent.rotation : Quaternion.identity) * Quaternion.Euler(0, rotY, 0);
            go.transform.localScale = scale;
            go.GetComponent<Renderer>().sharedMaterial = mat;
            return go;
        }

        static GameObject Cyl(string name, Transform parent, Vector3 pos, Vector3 scale, Material mat)
        {
            var go = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
            go.name = name;
            go.transform.SetParent(parent, false);
            go.transform.position = pos;
            go.transform.localScale = scale;
            go.GetComponent<Renderer>().sharedMaterial = mat;
            return go;
        }

        static Light PointLight(string name, Vector3 pos, Color color, float intensity, float range, LightShadows shadows)
        {
            var go = new GameObject(name);
            go.transform.position = pos;
            var l = go.AddComponent<Light>();
            l.type = LightType.Point;
            l.color = color;
            l.intensity = intensity;
            l.range = range;
            l.shadows = shadows;
            return l;
        }

        static Hotspot Spot(string name, string label, string look, string search, int minutes)
        {
            var go = new GameObject(name);
            var h = go.AddComponent<Hotspot>();
            h.label = label;
            h.lookText = look;
            h.searchText = search;
            h.searchMinutes = minutes;
            return h;
        }

        static void Finish(Hotspot h)
        {
            h.highlightRenderers = h.GetComponentsInChildren<Renderer>();
        }
    }
}
