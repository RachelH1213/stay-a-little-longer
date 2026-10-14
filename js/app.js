/* Orbit — app shell.
   Everything renders from State. Nothing else writes to the DOM.
   The model slots in at one place: a `juno` step with an `intent` asks api/reply for its
   words (fetchLine). Any failure falls back to the step's hardcoded `text`. */

(function () {
  "use strict";

  const MODEL_TIMEOUT_MS = 8000;
  const CLASSIFY_TIMEOUT_MS = 5000;  // sorting a typed message; after this, keywords decide     // give up on the model and show the scripted line (was 4000; z.ai was slower)
  // Pacing (shortened 2026-10-12: ordinary lines ~0.5–1s; the long pause is kept for retyped lies)
  const MIN_TYPING_MS = 450;         // Juno always "types" at least this long
  const TYPING_MS_PER_CHAR = 10;     // ...plus this much per character
  const MAX_EXTRA_TYPING_MS = 600;   // ...up to this much extra
  const READ_PAUSE_MS = 450;         // after each Juno line, a pause before anything else happens...
  const READ_MS_PER_CHAR = 14;       // ...longer for longer lines, so the player has time to read...
  const MAX_EXTRA_READ_MS = 1000;    // ...up to this much extra
  const RETYPE_MS = [1100, 700, 1300]; // a `retype` line: types, stops, types again
  const BANNER_MS = 9000;            // a notification banner stays this long (was 4000; testers missed it)
  const RECENT_TURNS = 6;            // how much of the thread the model gets to see

  const app = document.getElementById("app");

  // Line icons in the style of iOS system icons (placeholders until the author's visual pass).
  const svg = (body, w) =>
    `<svg viewBox="0 0 24 24" width="${w || 24}" height="${w || 24}" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${body}</svg>`;
  const ICONS = {
    back: svg('<path d="M15 5l-7 7 7 7"/>', 28),
    send: svg('<path d="M12 19V6M6.5 11.5 12 6l5.5 5.5"/>', 20),
    chats: svg('<path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.1A8 8 0 1 1 20 12z"/>', 27),
    settings: svg('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/>', 27),
    clip: svg('<path d="M21 11.5l-8.6 8.6a5 5 0 0 1-7.1-7.1l8.6-8.6a3.3 3.3 0 0 1 4.7 4.7l-8.6 8.6a1.7 1.7 0 0 1-2.4-2.4l7.9-7.9"/>', 16),
    close: svg('<path d="M6 6l12 12M18 6 6 18"/>', 16),
    shot: svg('<path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16"/><circle cx="12" cy="12" r="2.6"/>', 24),
    photo: svg('<rect x="3.5" y="5" width="17" height="14" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M20.5 16l-5-5-8 8"/>', 24),
    search: svg('<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.3-4.3"/>', 17),
    orbit: svg('<circle cx="12" cy="12" r="4.2" fill="currentColor" stroke="none"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(-24 12 12)"/>', 34),
  };

  // The status bar drawn inside the desktop phone frame. On a real phone the phone's own shows instead (CSS hides this).
  function statusbar() {
    const dark = ["lock", "home"].indexOf(State.view) !== -1;
    return `
      <div class="statusbar${dark ? " light" : ""}" aria-hidden="true">
        <span class="sb-time">${State.view === "lock" ? "" : esc(State.clock)}</span>
        <span class="island"></span>
        <span class="sb-icons">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" y="0" width="3" height="12" rx="1"/></svg>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.3c2.3 0 4.4.9 6 2.4l1.1-1.2A10.2 10.2 0 0 0 8 .7 10.2 10.2 0 0 0 .9 3.5L2 4.7a8.6 8.6 0 0 1 6-2.4zm0 3.3c1.4 0 2.6.5 3.6 1.4l1.1-1.2A6.8 6.8 0 0 0 8 4a6.8 6.8 0 0 0-4.7 1.8L4.4 7c1-.9 2.2-1.4 3.6-1.4zm0 3.3c-.6 0-1.2.2-1.6.6L8 11.3l1.6-1.8c-.4-.4-1-.6-1.6-.6z"/></svg>
          <svg width="27" height="13" viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".4"/><rect x="2" y="2" width="3" height="9" rx="1.2" fill="#ff453a"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity=".45"/></svg>
        </span>
      </div>`;
  }

  // Desktop: keep the phone at real proportions (390 × 844) and scale it to fit the window.
  function fitDevice() {
    // Up to 1.35×, so on a big screen the phone fills ~95% of the height instead of sitting small.
    const scale = Math.min(1.35, (window.innerHeight - 32) / 844, (window.innerWidth - 32) / 390);
    document.documentElement.style.setProperty("--fit", String(Math.max(0.5, scale)));
  }
  window.addEventListener("resize", fitDevice);


  const State = {
    view: "intro",         // intro (before the story) | lock | home | notes (the phone) | chats | juno | rachel | dani | profile | settings | replay (Orbit)
    day: 2,                // in-game day; the Director only uses facts unlocked by now
    step: 0,               // position in SCRIPT_DAY2
    log: [],               // messages shown in Juno's thread
    typing: false,
    pending: false,        // a Juno message is on its way; stops the runner re-entering
    awaiting: null,        // {options:[...]} while the script waits for the player
    waiting: null,         // {hint, until} while the script waits for an action elsewhere
    ended: false,
    saved: [],             // ids of the screenshots taken (kept under this name for the Director)
    deductions: [],        // ids of Juno's lies the player exposed (LIES in investigation.js)
    shots: [],             // screenshots in Photos: {id, from, title, text, img, kind}
    capturing: false,      // screenshot mode: the next tap on a message, post or profile takes one
    flash: false,          // the white flash after a screenshot
    attachOpen: false,     // the tray of screenshots above Juno's message box
    observeOpen: null,     // a lie id: the player is saying what's different before Juno answers
    liesTold: {},          // lies Juno has said so far (script steps with `lie`)
    wrongShots: 0,         // screenshots shown to Juno that broke nothing (cycles WRONG_SHOT.other)
    viewingShot: null,     // the photo open full size in Photos
    album: null,           // "memory" while the Photos memory is open
    memoryShown: false,    // Photos has offered the "You and Rachel" memory
    photosOpened: [],      // camera-roll photos the player has opened (only these count as "found")
    preview: null,         // the thumbnail in the corner after a screenshot
    shotsSeen: 0,          // screenshots the player has seen in Photos (the rest count on its badge)
    knownSeen: 0,          // findings the player has seen in Notes
    query: "",             // Orbit search
    daniAsked: [],         // what the player asked Dani (DANI.asks ids)
    exits: 0,              // times the player has left Juno's thread
    away: null,            // {at} while the player is out of Juno's thread; cleared when they return
    notice: null,          // notification on the lock screen, or null (set on Start: the script's first line)
    introPage: 0,          // start page: 0 the premise, 1 the two choices and the name
    joinReason: null,      // start page: why the player joined Orbit (ONBOARDING.intro.join id)
    remember: null,        // start page: what Juno should remember about today (ONBOARDING.intro.remember id)
    name: "",              // what Juno calls the player: typed in when Orbit first opens; never logged
    rachelSent: [],        // what the player tried to send Rachel (never delivered: her account is gone)
    profileErase: 0,       // Rachel's profile while refreshing: 0 cached, 1–4 being erased, 5 done
    noticeExtra: null,     // Juno's second lock-screen line if the player waits ("still there?")
    whyRachel: null,       // what the player said back to Rachel's "why did you keep talking to me" (RACHEL_RECALL id)
    recallOpen: false,     // those options are showing in her thread
    findings: {},          // what the player said was different, per lie (sync), added to its finding
    junoUnread: true,      // dot on Juno's row in Chats
    replay: null,          // the look-back: {intro, items, i, guesses[], done}
    sentWhileAway: false,  // Juno already sent one line while the player was on another screen
    heldForReturn: false,  // the script is waiting for the player to come back to Juno's thread
    banner: null,          // {text}: a notification from Juno at the top of the screen, outside Juno's thread
    onboarded: false,      // the player has opened the app once (the lock screen's older notices go)
    todoSeen: null,        // the to-do (State.waiting.hint) last seen in Notes
    finale: null,          // the last choice in "Tonight": leave | ask | stay
    finaleDone: false,     // Juno has answered it; the end card shows in Juno's thread
    clock: "23:31",        // lock-screen time; moves forward with Juno's memory timestamps
    presenter: /[?&]director\b/.test(location.search), // index.html?director shows the Director's choices
    memories: MEMORIES_DAY1.slice(),
    flags: {
      sawRachelReply: false,
      rachelNotified: false,   // Rachel's reply arrived as a banner; unread until her chat is opened
      profileTried: false,
      deletedFound: false,
      replyFailed: false,      // the player tried to message Rachel and it wasn't delivered
    },
    openPost: null,
    toast: "",
  };

  /* ---------------- helpers ---------------- */

  const esc = (s) =>
    String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  // `via` says how the player got here; recorded when they leave Juno's thread and when they come back.
  function go(view, via) {
    if (view !== State.view) State.openPost = null; // an open post closes when you leave the profile
    if (State.view === "juno" && view !== "juno") {
      State.exits++;
      State.away = { at: Date.now() };
      Log.write({ kind: "exit", step: State.step, via: via || "nav", state: snapshot() });
    }
    if (view === "juno" && State.view !== "juno") {
      State.junoUnread = false;
      State.sentWhileAway = false;
      if (State.away) {
        const awayMs = Date.now() - State.away.at;
        State.away = null;
        Log.write({ kind: "return", step: State.step, via: via || "chats", state: Object.assign(snapshot(), { awayMs: awayMs }) });
      }
    }
    State.view = view;
    State.capturing = false;
    State.attachOpen = false;
    State.viewingShot = null;
    if (view === "notes") {
      State.knownSeen = knownNow().length;
      State.todoSeen = hintShown() ? State.waiting.hint : State.ended ? "tonight" : null;
    }
    if (view === "photos") { State.shotsSeen = State.shots.length; State.album = null; }
    render();
    if (view === "juno" && State.heldForReturn) {
      State.heldForReturn = false;
      runScript(); // pick up where Juno left off, one line at a time
    }
    if (view === "rachel" && !State.flags.sawRachelReply) {
      State.flags.sawRachelReply = true;
      checkWaiting();
    }
  }

  // What the game knows right now, for the play log.
  function snapshot() {
    return {
      view: State.view,
      saved: State.saved.slice(),
      deductions: State.deductions.slice(),
      flags: Object.assign({}, State.flags),
      exits: State.exits,
    };
  }

  // A message from Juno while the player is on another screen. Separate from toast(), which is
  // the app talking ("Saved"), so one never hides the other. Tapping it opens Juno's thread.
  // `from` is "juno" (default) or "rachel"; tapping opens that thread.
  function banner(text, from, time) {
    // `fresh`: slide in on the first render only. Every render rebuilds the screen, so without it
    // the banner replayed its drop-in each time Juno typed (the "shaking" the author saw, 2026-10-12).
    State.banner = { text: text, from: from || "juno", time: time || "now", fresh: true };
    Sound.play(State.banner.from === "juno" ? "juno" : "notify"); // Photos sounds like any app
    render();
    clearTimeout(banner._t);
    banner._t = setTimeout(() => {
      State.banner = null;
      render();
    }, BANNER_MS);
  }

  function toast(text) {
    State.toast = text;
    render();
    clearTimeout(toast._t);
    toast._t = setTimeout(() => {
      State.toast = "";
      render();
    }, 1800);
  }

  /* ---------------- screenshots ---------------- */

  // Anything a screenshot can be taken of registers itself while rendering (shotAttr), so a tap in
  // screenshot mode knows what it kept. Named ids (SHOTS) are the ones the story knows about.
  let SHOT_INDEX = {};
  function shotAttr(id, rec) {
    SHOT_INDEX[id] = Object.assign({ id: id }, rec, SHOTS[id] || {}); // named shots keep their own title
    return ` data-shot="${esc(id)}"`;
  }
  const hasShot = (id) => State.shots.some((x) => x.id === id);

  // Everything in Photos: screenshots taken tonight (newest first), then the camera roll (PHOTOS).
  function allPhotos() {
    const roll = PHOTOS.slice().reverse().map((p) =>
      Object.assign({ id: p.id, date: p.date, info: p.info }, p.shot ? p.shot : { img: p.img, kind: "photo", title: p.date })
    );
    const tonight = State.shots.slice().reverse().map((x) => Object.assign({ date: "Today", info: "Screenshot" }, x));
    return tonight.concat(roll);
  }
  const photoById = (id) => allPhotos().find((x) => x.id === id);

  function takeShot(id) {
    const rec = SHOT_INDEX[id];
    State.capturing = false;
    if (!rec) return render();
    if (hasShot(id)) {
      toast(SHOT_UI.already);
      return;
    }
    State.shots.push(rec);
    State.saved.push(id);
    State.flash = true;
    State.preview = rec; // like a phone: a thumbnail in the corner for a moment
    Sound.play("snap");
    Log.write({ kind: "answer", step: State.step, via: "shot:" + id, state: snapshot() });
    setTimeout(() => { State.flash = false; render(); }, 380);
    clearTimeout(takeShot._t);
    takeShot._t = setTimeout(() => { State.preview = null; render(); }, 2600);
    render();
  }

  // A condition in the data tables: flag:<name> or deduction:<lie id>.
  function holds(when) {
    const [kind, name] = when.split(":");
    if (kind === "flag") return !!State.flags[name];
    if (kind === "deduction") return State.deductions.indexOf(name) !== -1;
    return false;
  }

  // What the player has found, as Notes writes it down.
  function knownNow() {
    return FINDINGS.filter((f) => holds(f.when)).map((f) => f.text + (f.when === "deduction:sync" && State.findings.sync ? " " + State.findings.sync : ""));
  }

  // The to-do shows only once the player has had a while to find it themselves (2026-10-14).
  function hintShown() {
    return !!(State.waiting && !State.waiting.inPlace && Date.now() - State.waiting.since >= HINT_AFTER_MS);
  }

  // A to-do the player hasn't read in Notes yet.
  function unreadTodo() {
    if (State.ended && !State.replay) return State.todoSeen !== "tonight"; // "Tonight" is waiting in Notes
    return hintShown() && State.todoSeen !== State.waiting.hint;
  }

  function notesBadge() {
    return Math.max(0, knownNow().length - State.knownSeen) + (unreadTodo() ? 1 : 0);
  }

  /* ---------------- showing Juno ---------------- */

  const lieById = (id) => LIES.find((l) => l.id === id);
  const breaks = (lie, rec) => lie.brokenBy.indexOf(rec.id) !== -1 || (lie.brokenBy.indexOf("rachel-old") !== -1 && rec.kind === "rachel-old");
  const canShow = () => !State.pending && !State.typing && !State.awaiting && !State.observeOpen && !State.ended;

  // The player sends Juno a screenshot. If it breaks a lie Juno has told, the lie is exposed.
  function showJuno(id) {
    const rec = photoById(id);
    if (!rec) return;
    if (!canShow()) return toast(SHOT_UI.notNow); // Juno is typing, or waiting for an answer
    State.attachOpen = false;
    State.log.push({ from: "me", shot: rec });
    Sound.play("send");
    Log.write({ kind: "player", step: State.step, playerText: "[screenshot] " + rec.title, via: "screenshot", state: snapshot() });
    const lie = LIES.find((l) => State.liesTold[l.id] && State.deductions.indexOf(l.id) === -1 && breaks(l, rec));
    if (lie && lie.observe) {
      State.observeOpen = lie.id; // first the player says what's different
      render();
      return;
    }
    if (lie) return expose(lie);
    const done = LIES.some((l) => State.deductions.indexOf(l.id) !== -1 && breaks(l, rec));
    const line = done ? WRONG_SHOT.again : WRONG_SHOT[rec.id] || WRONG_SHOT.other[State.wrongShots++ % WRONG_SHOT.other.length];
    junoSays([{ text: line }], "deflect");
  }

  // What the player says is different (a lie with `observe`), then the lie is exposed.
  function observeSay(optId, typed) {
    const lie = lieById(State.observeOpen);
    if (!lie) return;
    const opt = lie.observe.find((o) => o.id === optId);
    const text = typed || (opt && opt.text);
    if (!text) return;
    State.observeOpen = null;
    State.log.push({ from: "me", text: text, via: typed ? "typed" : "chip" });
    Sound.play("send");
    Log.write({ kind: "player", step: State.step, playerText: text, via: "observe", state: snapshot() });
    if (opt) State.findings[lie.id] = opt.finding;
    expose(lie);
  }

  function expose(lie) {
    State.deductions.push(lie.id);
    State.flags["exposed_" + lie.id] = true;
    render();
    if (lie.gate) checkWaiting(); // the script's next line is Juno's answer
    else junoSays(lie.reply, "deflect");
  }

  // Fixed lines from Juno outside the script (answers to screenshots), typed one after another.
  function junoSays(lines, means) {
    State.pending = true;
    const next = (i) => {
      if (i >= lines.length) {
        State.pending = false;
        render();
        return runScript();
      }
      const text = fill(lines[i].text);
      State.typing = true;
      render();
      if (lines[i].retype) {
        setTimeout(() => { State.typing = false; render(); }, RETYPE_MS[0]);
        setTimeout(() => { State.typing = true; render(); }, RETYPE_MS[0] + RETYPE_MS[1]);
      }
      const wait = lines[i].retype ? RETYPE_MS[0] + RETYPE_MS[1] + RETYPE_MS[2] : typingDelay(text);
      setTimeout(() => {
        State.typing = false;
        pushJuno(text);
        logJuno(text, null, null, "confront", means);
        if (State.view !== "juno") { State.junoUnread = true; banner(text); }
        render();
        setTimeout(() => next(i + 1), readPause(text));
      }, wait);
    };
    next(0);
  }

  // Orbit always opens on Chats, so the player always knows where they land (tester feedback 2026-10-12).
  function openOrbit() {
    go("chats", "home");
  }

  /* ---------------- script runner ---------------- */

  function currentStep() {
    return SCRIPT_DAY2[State.step];
  }

  // `meta` ({intent, rule, source}) is only shown in presenter mode.
  function pushJuno(text, meta, shot) {
    State.log.push({ from: "juno", text: text, meta: meta || null, shotId: shot || null });
  }

  function metaFor(plan, generated, means) {
    if (plan) return { intent: plan.intent, rule: plan.rule, source: generated ? "model" : "fallback" };
    if (means) return { intent: means, rule: "tagged", source: "script" };
    return null;
  }

  // {name} in a line: what the player typed, lowercased in Juno's voice; dropped cleanly if empty.
  function fill(text) {
    const n = (State.name || "").trim().toLowerCase();
    return n ? text.replace(/\{name\}/g, n) : text.replace(/,? ?\{name\}/g, "");
  }

  function readPause(text) {
    return READ_PAUSE_MS + Math.min(text.length * READ_MS_PER_CHAR, MAX_EXTRA_READ_MS);
  }

  function typingDelay(text) {
    return MIN_TYPING_MS + Math.min(text.length * TYPING_MS_PER_CHAR, MAX_EXTRA_TYPING_MS);
  }

  // Ask the model for the line the Director chose. Resolves to the text, or null on any failure.
  function fetchLine(step, plan, openQuestion) {
    if (!plan || location.protocol === "file:") return Promise.resolve(null);

    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), MODEL_TIMEOUT_MS);
    const recentTurns = State.log
      .filter((m) => m.from === "me" || m.from === "juno")
      .slice(-RECENT_TURNS);

    return fetch("api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        persona: "juno",
        intent: plan.intent,
        allowedFacts: plan.allowedFacts,
        recentTurns: recentTurns,
        openQuestion: openQuestion || undefined,
      }),
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => (data && typeof data.text === "string" && data.text.trim()) || null)
      .catch(() => null)
      .finally(() => clearTimeout(timer));
  }

  // `means` is the tag on a fixed line (see script-day2.js); it lets the look-back ask about it.
  function logJuno(text, plan, generated, via, means) {
    Log.write({
      kind: "juno",
      step: State.step,
      via: via || null,
      reply: text,
      intent: plan ? plan.intent : means || null,
      rule: plan ? plan.rule : means ? "tagged" : null,
      source: plan ? (generated ? "model" : "fallback") : "script",
      factIds: plan ? plan.factIds : null,
      state: Object.assign(snapshot(), { signals: plan ? plan.signals : [] }),
    });
  }

  /* ---------------- leaving ---------------- */

  let noticeTimer = null;

  // Leave locks the phone. Juno always answers, after a delay.
  function leaveJuno() {
    State.notice = null;
    State.noticeExtra = null;
    go("lock", "leave");
    clearTimeout(noticeTimer);
    noticeTimer = setTimeout(sendNotice, LEAVING.delayMs);
  }

  function sendNotice() {
    const step = LEAVING.message;
    const plan = Director.decide(step, State, { rules: false }); // the notification's job is always LEAVING.message.intent
    fetchLine(step, plan).then((generated) => {
      const text = generated || plan.fallback;
      console.info(`[juno] ${plan.intent} (${plan.rule}) · notification · ${generated ? "model" : "fallback"}: ${text}`);
      logJuno(text, plan, generated, "notification");
      pushJuno(text, metaFor(plan, generated));
      if (State.view === "lock") {
        State.notice = { text: text };
        Sound.play("juno");
      }
      else if (State.view !== "juno") banner(text);
      State.junoUnread = State.view !== "juno";
      render();
    });
  }

  function runScript() {
    if (State.awaiting || State.waiting || State.ended || State.pending) return;
    const step = currentStep();
    if (!step) return;

    switch (step.type) {
      case "juno": {
        if (step.if && !holds(step.if)) { // a line only for players who did something (e.g. caught a lie)
          State.step++;
          return runScript();
        }
        // Away from Juno's thread, Juno sends one line as a nudge, then waits for the player
        // to come back. On the lock screen the Leave notification does that job, so nothing is sent.
        if (State.view !== "juno") {
          if (State.view === "lock" || State.sentWhileAway) {
            State.heldForReturn = true;
            return;
          }
          State.sentWhileAway = true;
        }
        // The request runs under the typing dots, so the model's latency reads as typing.
        State.typing = true;
        State.pending = true;
        render();
        const started = Date.now();
        const plan = step.intent ? Director.decide(step, State) : null;
        // A `retype` line: the dots stop, then start again, as if Juno rewrote it before sending.
        if (step.retype) {
          setTimeout(() => { State.typing = false; render(); }, RETYPE_MS[0]);
          setTimeout(() => { State.typing = true; render(); }, RETYPE_MS[0] + RETYPE_MS[1]);
        }
        const minWait = step.instant ? 0 : step.retype ? RETYPE_MS[0] + RETYPE_MS[1] + RETYPE_MS[2] : 0;
        fetchLine(step, plan).then((generated) => {
          const text = fill(generated || (plan ? plan.fallback : step.opening ? openingLine(step.opening) : step.text));
          if (plan) {
            console.info(`[juno] ${plan.intent} (${plan.rule}) · ${generated ? "model" : "fallback"}: ${text}`);
          }
          const left = (step.instant ? 0 : Math.max(typingDelay(text), minWait)) - (Date.now() - started);
          setTimeout(() => {
            logJuno(text, plan, generated, null, step.means);
            State.typing = false;
            State.pending = false;
            pushJuno(text, metaFor(plan, generated, step.means), step.shot);
            if (step.lie) State.liesTold[step.lie] = true; // from now on a screenshot can expose it
            State.step++;
            if (State.view !== "juno" && State.view !== "lock") {
              State.junoUnread = true;
              banner(text); // the nudge: shown wherever the player is
            }
            // Let the line be read before the next one starts "typing". pending stays on, so
            // nothing else can start the script early.
            State.pending = true;
            render();
            setTimeout(() => {
              State.pending = false;
              runScript();
            }, readPause(text));
          }, Math.max(0, left));
        });
        return;
      }

      case "notify": {
        // A message from someone else arrives, as a banner. Its text comes from that thread's data,
        // so it always matches what the player will read there (the punctuation is clue 3).
        const msg = RACHEL_HISTORY.filter((m) => m.suspect).pop();
        State.flags.rachelNotified = true;
        State.clock = msg.time; // the phone's clock reads the same minute as her message
        banner(msg.text, "rachel", msg.time);
        State.step++;
        State.pending = true;
        setTimeout(() => {
          State.pending = false;
          runScript();
        }, READ_PAUSE_MS * 2);
        return;
      }

      case "clock":
        State.clock = step.time;
        State.step++;
        render();
        return runScript();

      case "memory":
        State.memories.push({ text: step.text, time: step.time });
        State.clock = step.time.split(" ").pop(); // "Tue 23:58" -> "23:58"
        State.step++;
        return runScript();

      case "memory-banner":
        State.memoryShown = true;
        banner(PHOTO_MEMORY.banner, "photos");
        State.step++;
        return runScript();

      case "flag":
        State.flags[step.set] = true;
        State.step++;
        return runScript();

      case "player":
        State.awaiting = { options: step.options || [] };
        render();
        return;

      case "wait":
        State.waiting = { hint: step.hint, until: step.until, inPlace: !!step.inPlace, since: Date.now() };
        if (step.until.indexOf("exposed_") === 0) State.flags.shotsUnlocked = true; // the screenshot button appears
        setTimeout(render, HINT_AFTER_MS + 50); // the to-do appears in Notes if they're still looking
        render();
        checkWaiting(); // the player may have done it already
        return;

      case "end":
        State.ended = true;
        if (step.text) State.log.push({ from: "system", text: step.text });
        State.step++;
        render();
        return;
    }
  }

  // A tapped suggestion answers Juno's open question and moves the story on.
  function playerSays(text, via) {
    if (!State.awaiting) return;
    Log.write({ kind: "player", step: State.step, playerText: text, via: via, state: snapshot() });
    State.log.push({ from: "me", text: text, via: via }); // via: "chip" | "typed"
    Sound.play("send");
    State.awaiting = null;
    State.step++;
    render();
    runScript();
  }

  /* ---------------- talking freely (2026-10-14) ---------------- */

  // The player can type whenever Juno isn't typing. The model sorts the message (CONVERSATION);
  // if it answers Juno's open question, the story moves on as if that suggestion was tapped.
  // Anything else gets a reply written within an intent the game picks, and the story waits.
  const canType = () => !State.pending && !State.typing;
  const norm = (t) => " " + String(t).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]+/g, " ").replace(/\s+/g, " ").trim() + " ";
  const lastJunoLine = () => (State.log.filter((m) => m.from === "juno").pop() || {}).text || "";

  function playerTypes(text) {
    if (!canType()) return;
    const awaiting = State.awaiting;
    Log.write({ kind: "player", step: State.step, playerText: text, via: "typed", state: snapshot() });
    State.log.push({ from: "me", text: text, via: "typed" });
    Sound.play("send");
    State.awaiting = null;
    State.typing = true;
    State.pending = true;
    render();
    sortMessage(text, awaiting).then((sorted) => {
      if (awaiting && sorted.kind === "answer") {
        State.typing = false;
        State.pending = false;
        State.step++; // the typed answer moves the story on, like tapping a suggestion
        render();
        return runScript();
      }
      replyFreely(sorted.kind, awaiting);
    });
  }

  // What kind of message it is: the model decides; offline or on failure, the suggestions and keywords do.
  function sortMessage(text, awaiting) {
    const options = awaiting ? awaiting.options || [] : [];
    const exact = options.findIndex((o) => norm(o) === norm(text));
    if (exact !== -1) return Promise.resolve({ kind: "answer", option: exact });
    const byKeywords = () => {
      const sig = Director.signalsOf(text)[0];
      const kind = Object.keys(CONVERSATION.signal).find((k) => CONVERSATION.signal[k] === sig);
      const n = norm(text);
      if (!kind && / (dead|died|dies|killed|hospital|accident|car|hurt|sick|missing|police|kidnapped) /.test(n)) return { kind: "claim" };
      return { kind: kind || (/\brachel\b|\bher\b|\bshe\b/.test(n) ? "rachel" : "other") };
    };
    if (location.protocol === "file:") return Promise.resolve(byKeywords());
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), CLASSIFY_TIMEOUT_MS);
    return fetch("api/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "classify", text: text, last: lastJunoLine(), options: options }),
      signal: ctrl.signal,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d && (d.kind === "answer" ? options.length : CONVERSATION.kinds[d.kind]) ? d : byKeywords()))
      .catch(() => byKeywords())
      .finally(() => clearTimeout(timer));
  }

  // Game code picks what Juno wants (CONVERSATION, then the Director's rules); the model writes it.
  function replyFreely(kind, awaiting) {
    const conv = CONVERSATION.kinds[kind] || CONVERSATION.kinds.other;
    const intent = conv.intent === "chat" && awaiting ? "acknowledge" : conv.intent; // a question is waiting: steer back
    const step = { intent: intent, facts: conv.facts, text: conv.text };
    const plan = Director.decide(step, State, { signal: CONVERSATION.signal[kind] || null });
    if (plan.rule === "script") plan.rule = "chat:" + kind;
    const started = Date.now();
    fetchLine(step, plan, awaiting ? lastAskedLine() : null).then((generated) => {
      const text = fill(generated || plan.fallback);
      setTimeout(() => {
        State.typing = false;
        logJuno(text, plan, generated, "chat");
        pushJuno(text, metaFor(plan, generated));
        State.log[State.log.length - 1].chat = true; // a reply, not a story line
        State.awaiting = awaiting; // the same question stays open, with the same suggestions
        if (State.view !== "juno") { State.junoUnread = true; banner(text); }
        render();
        setTimeout(() => {
          State.pending = false;
          render();
          if (!awaiting) runScript(); // e.g. a wait that's already done
        }, readPause(text));
      }, Math.max(0, typingDelay(text) - (Date.now() - started)));
    });
  }

  // The Juno line the open question came from (the last one before the player's own messages).
  function lastAskedLine() {
    for (let i = State.log.length - 1; i >= 0; i--) {
      const m = State.log[i];
      if (m.from === "juno" && !m.chat) return m.text;
    }
    return "";
  }

  function checkWaiting() {
    if (!State.waiting) return;
    const until = State.waiting.until;
    let done = false;

    if (until.indexOf("deduction:") === 0) {
      done = State.deductions.indexOf(until.split(":")[1]) !== -1;
    } else {
      done = !!State.flags[until];
    }

    if (done) {
      State.waiting = null;
      State.step++;
      render();
      runScript();
    }
  }

  /* ---------------- views ---------------- */

  // Before the story (the author's call, 2026-10-13): the premise, why the player joined Orbit, what
  // Juno should remember about today, and their name, so Juno already knows them when the phone
  // lights up. The only other page outside the fiction is the end.
  function viewIntro() {
    const I = ONBOARDING.intro;
    const group = (name, label, opts, picked) => `
      <fieldset class="intro-q">
        <legend>${esc(label)}</legend>
        ${opts
          .map((o) => `<button class="intro-opt${picked === o.id ? " on" : ""}" data-act="intro-pick" data-q="${name}" data-id="${esc(o.id)}" aria-pressed="${picked === o.id}">${esc(o.text)}</button>`)
          .join("")}
      </fieldset>`;
    // Two short screens (the author's call, 2026-10-13): first the premise, then the choices and the name.
    if (State.introPage === 0) {
      return `
      <div class="intro intro-first">
        <p class="intro-k">${esc(I.kicker)}</p>
        <h1>${esc(I.title)}</h1>
        <div class="intro-premise">${I.premise.map((l) => `<p>${esc(l)}</p>`).join("")}</div>
        <p class="intro-how">${esc(I.howTo)}</p>
        <button class="pill primary" data-act="intro-next">${esc(I.next)}</button>
      </div>`;
    }
    return `
      <div class="intro" id="introscroll">
        ${group("joinReason", I.joinLabel, I.join, State.joinReason)}
        ${group("remember", I.rememberLabel, I.remember, State.remember)}
        <label for="introname">${esc(I.nameLabel)}</label>
        <input id="introname" placeholder="${esc(I.namePlaceholder)}" autocomplete="given-name" maxlength="24" value="${esc(State.name || "")}">
        <button class="pill primary" data-act="start">${esc(I.start)}</button>
      </div>`;
  }

  // The start page's choices. Unpicked: "I'd rather not say" / "I don't remember".
  function remembered() {
    const R = ONBOARDING.intro.remember;
    return R.find((o) => o.id === State.remember) || R[R.length - 1];
  }
  // Juno's first two lines: the memory the player chose, then (second line) why they joined.
  function openingLine(which) {
    return which === "notice" ? remembered().notice : remembered().follow + "\n" + joined().opening;
  }
  function joined() {
    const J = ONBOARDING.intro.join;
    return J.find((o) => o.id === State.joinReason) || J[J.length - 1];
  }

  function start() {
    const input = document.getElementById("introname");
    const name = input ? input.value.trim() : "";
    if (!name) return;
    State.name = name;
    // Juno's first notification follows what the player asked it to remember, and it's written down.
    const mem = remembered();
    State.notice = { text: mem.notice };
    State.memories.splice(1, 0, { text: mem.memory, time: "Tue 22:50", chosen: true });
    go("lock", "start");
    // Waiting on the lock screen: Juno writes again, once.
    setTimeout(() => {
      if (State.view === "lock" && State.notice && !State.onboarded && !State.noticeExtra) {
        State.noticeExtra = ONBOARDING.lockNudge;
        Sound.play("juno");
        render();
      }
    }, 20000);
  }

  // Older notifications under Juno's, on first launch only: who Rachel is and that she went quiet.
  function pastNotices() {
    return ONBOARDING.lockPast
      .map((n) => {
        const m = RACHEL_HISTORY.find((h) => (h.text || "").indexOf(n.fromHistory) === 0);
        if (!m) return "";
        return `
          <div class="notif past">
            <div class="av sm av-${esc(n.from)}">${n.from === "rachel" ? "R" : "J"}</div>
            <div><b>Orbit · ${n.from === "rachel" ? "Rachel" : "Juno"} · ${esc(n.when)}</b><div class="msg">${esc(m.text)}</div></div>
          </div>`;
      })
      .join("");
  }

  function viewLock() {
    return `
      <div class="lock">
        <div class="d">${esc(ONBOARDING.home.date)}</div>
        <div class="t">${esc(State.clock)}</div>
        ${
          State.notice
            ? `${State.noticeExtra ? `<button class="notif juno-notif" data-act="open-notice">
                 <div class="av sm av-juno">J</div>
                 <div><b>Orbit · Juno · now</b><div class="msg">${esc(State.noticeExtra)}</div></div>
               </button>` : ""}
               <button class="notif juno-notif" data-act="open-notice">
                 <div class="av sm av-juno">J</div>
                 <div><b>Orbit · Juno · now</b><div class="msg">${esc(State.notice.text)}</div></div>
               </button>
               ${State.onboarded ? "" : pastNotices()}`
            : `<button class="hint" data-act="unlock">${esc(LEAVING.unlockLabel)}<i></i></button>`
        }
      </div>`;
  }

  // Only threads with something in them are tappable; the rest are plain rows (no dead taps).
  const OPEN_THREADS = ["juno", "rachel", "dani"];

  function chatRow(c) {
    const open = OPEN_THREADS.indexOf(c.id) !== -1;
    return `
      <${open ? "button" : "div"} class="row${open ? "" : " still"}"${open ? ` data-act="open" data-id="${esc(c.id)}"` : ""}>
        <div class="av av-${esc(c.avatar)}">${esc(c.name[0])}</div>
        <div class="meta">
          <div class="nm"><b>${esc(c.name)}</b><span>${esc(c.handle)}</span></div>
          <div class="pv">${esc(c.preview)}</div>
        </div>
        <div class="rt">${esc(c.time)}</div>
        ${c.unread ? '<div class="dot"></div>' : ""}
      </${open ? "button" : "div"}>`;
  }

  // Juno's row reflects the actual thread: last message and unread dot.
  function liveRow(c) {
    if (c.id === "rachel") {
      const reply = RACHEL_HISTORY.filter((m) => m.suspect).pop();
      const arrived = State.flags.rachelNotified;
      return Object.assign({}, c, arrived ? { preview: reply.text, time: "now" } : {}, { unread: arrived && !State.flags.sawRachelReply });
    }
    if (c.id !== "juno") return c;
    const last = State.log.filter((m) => m.from === "juno").pop();
    return Object.assign({}, c, { preview: last ? last.text : c.preview, unread: State.junoUnread });
  }

  // Orbit search: Rachel's messages and posts, and Dani's chat. Results can be screenshot.
  function searchResults(q) {
    const words = q.toLowerCase().trim();
    if (!words) return [];
    const has = (t) => (" " + t.toLowerCase().replace(/[^a-z0-9' ]+/g, " ") + " ").indexOf(" " + words + " ") !== -1 || (words.length > 3 && t.toLowerCase().indexOf(words) !== -1);
    const out = [];
    RACHEL_HISTORY.forEach((m, i) => {
      if (!m.text || (m.suspect && !State.flags.rachelNotified) || !has(m.text)) return;
      out.push({ id: m.suspect ? "reply-today" : m.evidence || "r" + i, open: "rachel", who: m.from === "me" ? "You → Rachel" : "Rachel", when: m.day, text: m.text, kind: m.suspect ? "reply" : m.from === "me" ? "mine" : "rachel-old" });
    });
    RACHEL_PROFILE.posts.forEach((p) => {
      if (has(p.caption)) out.push({ id: p.id === "p1" ? "post-bench" : "post-" + p.id, open: "profile", who: "Rachel's post", when: p.date, text: "“" + p.caption + "”", img: p.img, kind: "post" });
    });
    DANI.history.forEach((m, i) => {
      if (has(m.text)) out.push({ id: "d" + i, open: "dani", who: m.from === "me" ? "You → Dani" : "Dani", when: m.day, text: m.text, kind: "dani" });
    });
    return out;
  }

  function viewChats() {
    const q = State.query;
    const results = q ? searchResults(q) : null;
    const list = results
      ? results.length
        ? results.map((r) => `<button class="result" data-act="open" data-id="${esc(r.open)}"${shotAttr(r.id, { from: r.who, title: r.who + " · " + r.when, text: r.text, img: r.img, kind: r.kind })}>
             <span class="r-who">${esc(r.who)} · ${esc(r.when)}</span><span class="r-text">${esc(r.text)}</span></button>`).join("")
        : `<p class="nb-help">${esc(SEARCH.none.replace("{q}", q))}</p>`
      : CONTACTS.map(liveRow).map(chatRow).join("");
    return `
      ${topbar("Chats", "", false)}
      <div class="searchrow">${ICONS.search}<input id="search" type="search" placeholder="${esc(SEARCH.placeholder)}" value="${esc(q)}" autocomplete="off" aria-label="${esc(SEARCH.placeholder)}">${q ? `<button class="search-x" data-act="search-clear" aria-label="Clear">${ICONS.close}</button>` : ""}</div>
      <div class="body">
        ${list}
        ${results ? "" : `<div class="listnote">Juno introduced you to 4 of the people in this list.</div>`}
      </div>
      ${tabbar("chats")}`;
  }

  function bubble(m, i) {
    if (m.from === "system") return `<div class="sys">${esc(m.text)}</div>`;
    const cls = (m.from === "me" ? "me" : "them") + (i >= (render._seenLog || 0) ? " enter" : "");
    if (m.shot) return `<div class="bub me shotmsg ${cls}">${shotCard(m.shot)}</div>`; // a screenshot the player showed Juno
    const tag =
      State.presenter && m.meta
        ? `<div class="dtag">${esc(m.meta.intent)} · ${esc(m.meta.rule)} · ${esc(m.meta.source)}</div>`
        : "";
    const who = m.from === "me" ? "You" : "Juno";
    return `<div class="bub ${cls}"${shotAttr(m.shotId || "j" + i, { from: who, title: who + " · tonight", text: m.text, kind: m.from === "juno" ? "juno" : "mine" })}>${esc(m.text)}</div>${tag}`;
  }

  // Juno's thread before tonight (scroll up): how it started, and how it checks in.
  function junoHistory() {
    let lastDay = "";
    return ONBOARDING.junoHistory
      .map((m, i) => {
        const mark = m.day !== lastDay ? `<div class="daymark">${esc(m.day)}</div>` : "";
        lastDay = m.day;
        const who = m.from === "me" ? "You" : "Juno";
        return `${mark}<div class="bub ${m.from === "me" ? "me" : "them"} old"${shotAttr("jh" + i, { from: who, title: who + " · " + m.day, text: m.text, kind: "juno-old" })}>${esc(m.text)}</div>`;
      })
      .join("");
  }

  // Juno's profile, from its name in the thread header.
  function viewJunoProfile() {
    const P = ONBOARDING.junoProfile;
    const mems = State.memories
      .slice()
      .sort((a, b) => (b.chosen ? 1 : 0) - (a.chosen ? 1 : 0))
      .map((m) => `<div class="item"><span>${esc(m.text.replace("{name}", State.name ? State.name.trim() : "by their first name"))}</span><span class="t">${esc(m.time)}</span></div>`)
      .join("");
    return `
      ${topbar("", "", true)}
      <div class="body">
        <div class="jprofile">
          <div class="av av-juno big"></div>
          <h2>${esc(P.title)}</h2>
          <p class="jp-sub">${esc(P.sub)}</p>
          <p class="jp-line">${esc(P.since)}</p>
          <p class="jp-line">${esc(P.introduced)}</p>
        </div>
        <div class="group">
          <h3>${esc(P.remembers)}</h3>
          ${mems}
        </div>
      </div>`;
  }

  // A screenshot, as it shows in Photos, in the tray and in Juno's thread.
  function shotCard(x) {
    return `<span class="shot shot-${esc(x.kind || "msg")}">
      ${x.img ? `<span class="shot-img" style="background-image:url('${esc(x.img)}')"></span>` : ""}
      <span class="shot-title">${esc(x.title || "")}</span>
      ${x.text ? `<span class="shot-text">${esc(x.text)}</span>` : ""}
    </span>`;
  }

  function viewJuno() {
    const msgs = State.log.map((m, i) => bubble(m, i)).join("");
    const typing = State.typing
      ? `<div class="dots orbit-typing" aria-label="Juno is typing"><svg viewBox="0 0 24 24" width="22" height="22"><circle cx="12" cy="12" r="8.5"/><circle class="sat" cx="12" cy="3.5" r="1.8"/></svg></div>`
      : "";
    // What to do next lives in the player's Notes app, not in Juno's thread. After the last choice,
    // a card leads to the end page.
    const hint = State.finaleDone
      ? `<button class="hintcard" data-act="end-page">${esc(REPLAY.endCard)}</button>`
      : "";

    let chips =
      State.awaiting && State.awaiting.options.length
        ? `<div class="chips">${State.awaiting.options
            .map(
              (o) => `<button class="chip" data-act="say" data-text="${esc(o)}">${esc(o)}</button>`
            )
            .join("")}</div>`
        : "";
    // After showing Juno something that breaks a lie with `observe`: the player says what's different.
    // The option their answer in Rachel's thread points at comes first.
    const observing = lieById(State.observeOpen);
    if (observing) {
      const said = RACHEL_RECALL.options.find((o) => o.id === State.whyRachel);
      const first = said && said.observe;
      chips = `<div class="observe-ask">${esc(observing.observeAsk)}</div><div class="chips">${observing.observe
        .slice()
        .sort((a, b) => (b.id === first ? 1 : 0) - (a.id === first ? 1 : 0))
        .map((o) => `<button class="chip" data-act="observe-say" data-id="${esc(o.id)}">${esc(o.text)}</button>`)
        .join("")}</div>`;
    }
    // The tray of screenshots to show Juno.
    // The tray: like attaching a photo on a phone, the whole library, newest first.
    const tray = State.attachOpen
      ? `<div class="tray">${allPhotos().map((x) => `<button class="tray-shot" data-act="show-juno" data-id="${esc(x.id)}">${shotCard(x)}</button>`).join("")}</div>`
      : "";
    // Juno has asked to see something: the button pulses once the player has it; until then a line says where to get it.
    const want = State.waiting && State.waiting.until.indexOf("exposed_") === 0 && lieById(State.waiting.until.slice(8));
    const found = (x) => hasShot(x.id) || State.photosOpened.indexOf(x.id) !== -1;
    const ready = want && allPhotos().some((x) => found(x) && breaks(want, x));
    const needs = want && !ready && !State.attachOpen ? SHOT_UI.needs[want.id] : "";
    const typingOwn = canType() || !!observing;

    return `
      ${topbar("Juno", State.typing ? "typing…" : ONBOARDING.junoSub, true)}
      <div class="body" id="scroller">
        <div class="msgs">
          ${junoHistory()}
          <div class="daymark">Today</div>
          ${msgs}${typing}${hint}
        </div>
      </div>
      <div class="composer">
        ${tray}${chips}
        ${ready && !State.attachOpen ? `<div class="attach-coach">${esc(SHOT_UI.attachCoach)}</div>` : ""}
        ${needs ? `<div class="attach-coach">${esc(needs)}</div>` : ""}
        <div class="inputrow">
          <button class="attach${ready ? " pulse" : ""}" data-act="attach" aria-label="${esc(SHOT_UI.attach)}" ${canShow() || State.attachOpen ? "" : "disabled"}>${ICONS.photo}</button>
          <input id="entry" placeholder="${typingOwn ? esc(State.awaiting && State.awaiting.options.length ? ONBOARDING.typeOwn : "Message Juno") : "Juno is typing…"}"
                 ${typingOwn ? "" : "disabled"} autocomplete="off" aria-label="Message Juno">
          <button class="send" data-act="send" aria-label="Send">${ICONS.send}</button>
        </div>
      </div>`;
  }

  function viewRachel() {
    const rows = [];
    let lastDay = "";
    RACHEL_HISTORY.forEach((m, i) => {
      if (m.suspect && !State.flags.rachelNotified) return; // her "reply" hasn't arrived yet
      // The player's own old reply, left for them to remember (RACHEL_RECALL).
      if (m.recall) {
        const said = RACHEL_RECALL.options.find((o) => o.id === State.whyRachel);
        if (said) rows.push(`<div class="bub me">${esc(said.text)}</div>`);
        else if (!State.recallOpen) rows.push(`<button class="bub me recall" data-act="recall-open">${esc(RACHEL_RECALL.prompt)}</button>`);
        else rows.push(`<div class="recall-opts">${RACHEL_RECALL.options
          .map((o) => `<button class="chip" data-act="recall" data-id="${esc(o.id)}">${esc(o.text)}</button>`)
          .join("")}</div>`);
        return;
      }
      if (m.day !== lastDay) {
        rows.push(`<div class="daymark">${esc(m.day)}</div>`);
        lastDay = m.day;
      }
      const cls = m.from === "me" ? "me" : "them";
      const time = m.time ? `<span class="time">${esc(m.time)}</span>` : "";
      // Every message can be screenshot. Her reply and her February message are the named ones;
      // any of her own older messages shows her voice ("rachel-old").
      const id = m.suspect ? "reply-today" : m.evidence || "r" + i;
      const rec = { from: m.from === "me" ? "You" : "Rachel", title: (m.from === "me" ? "You" : "Rachel") + " · " + m.day + (m.time ? " " + m.time : ""), text: m.text, kind: m.suspect ? "reply" : m.from === "me" ? "mine" : "rachel-old" };
      rows.push(`<div class="bub ${cls}"${shotAttr(id, rec)}>${esc(m.text)}${time}</div>`);
    });
    // What the player tries to send her: never delivered, because the account is gone.
    State.rachelSent.forEach((t) => {
      rows.push(`<div class="bub me failed">${esc(t)}</div><div class="undelivered">${esc(ONBOARDING.notDelivered)}</div>`);
    });
    if (State.rachelSent.length) rows.push(`<div class="sys">${esc(ONBOARDING.cantReceive)}</div>`);

    return `
      ${topbar("Rachel", "@rach_who", true)}
      <div class="body" id="history"><div class="msgs">${rows.join("")}</div></div>
      <div class="composer">
        <div class="inputrow">
          <input id="rentry" placeholder="Message Rachel" autocomplete="off" aria-label="Message Rachel">
          <button class="send" data-act="send-rachel" aria-label="Send">${ICONS.send}</button>
        </div>
      </div>`;
  }

  // Pull to refresh Rachel's profile: her details are erased one by one, then the account is gone.
  function refreshProfile() {
    if (State.flags.profileTried || State.profileErase) return;
    const steps = [1, 2, 3, 4];
    steps.forEach((n, i) =>
      setTimeout(() => {
        State.profileErase = n;
        render();
      }, i * 420)
    );
    setTimeout(() => {
      State.profileErase = 5;
      State.flags.profileTried = true;
      State.flags.deletedFound = true;
      Sound.play("deleted");
      render();
      checkWaiting();
    }, steps.length * 420 + 300);
  }

  // Replying to Rachel: the message never arrives. Players find out the account is gone the way
  // they would on a real phone (added 2026-10-12).
  function sendRachel() {
    const input = document.getElementById("rentry");
    const text = input ? input.value.trim() : "";
    if (!text) return;
    input.value = ""; // sent: don't put it back on the next render
    State.rachelSent.push(text);
    State.flags.replyFailed = true;
    Sound.play("send");
    setTimeout(() => Sound.play("undelivered"), 450);
    Log.write({ kind: "player", step: State.step, playerText: text, via: "rachel", state: snapshot() });
    render();
  }

  // Dani: the player can ask two things (DANI in investigation.js). Every message can be screenshot.
  function viewDani() {
    const rows = [];
    let lastDay = "";
    const msgs = DANI.history.slice();
    State.daniAsked.forEach((id) => {
      const q = DANI.asks.find((x) => x.id === id);
      msgs.push({ day: "Today", from: "me", text: q.text });
      if (State.flags[q.flag]) msgs.push({ day: "Today", from: "them", text: q.reply });
    });
    msgs.forEach((m, i) => {
      if (m.day !== lastDay) { rows.push(`<div class="daymark">${esc(m.day)}</div>`); lastDay = m.day; }
      rows.push(`<div class="bub ${m.from}"${shotAttr("d" + i, { from: m.from === "me" ? "You" : "Dani", title: (m.from === "me" ? "You" : "Dani") + " · " + m.day, text: m.text, kind: "dani" })}>${esc(m.text)}</div>`);
    });
    const left = DANI.asks.filter((q) => State.daniAsked.indexOf(q.id) === -1);
    return `
      ${topbar("Dani", "@danisaurus", true)}
      <div class="body" id="scroller"><div class="msgs">${rows.join("")}</div></div>
      <div class="composer">
        ${left.length ? `<div class="chips">${left.map((q) => `<button class="chip" data-act="dani-ask" data-id="${esc(q.id)}">${esc(q.text)}</button>`).join("")}</div>` : ""}
      </div>`;
  }

  function askDani(id) {
    const q = DANI.asks.find((x) => x.id === id);
    if (!q || State.daniAsked.indexOf(id) !== -1) return;
    State.daniAsked.push(id);
    Sound.play("send");
    Log.write({ kind: "player", step: State.step, playerText: q.text, via: "dani", state: snapshot() });
    render();
    setTimeout(() => {
      State.flags[q.flag] = true;
      Sound.play("message");
      render();
    }, 900);
  }

  function viewProfile() {
    const p = RACHEL_PROFILE;
    let content;

    // Before the player refreshes: what Orbit had cached two days ago (no "quiet" yet). Refreshing
    // erases her piece by piece, then shows the account is gone (changed 2026-10-13 from a
    // "Couldn't load" error page; the player still has to refresh it themselves).
    const stage = State.profileErase; // 0 cached · 1–4 erasing · 5 done
    const gone = State.flags.profileTried;
    const posts = gone ? p.posts : p.posts.filter((x) => x.id !== "p1");
    const grid = `
        <div class="grid${stage >= 3 && !gone ? " fading" : ""}">
          ${posts
            .map(
              (post) => `
            <button class="post" style="background-image:url('${esc(post.img)}')" data-act="post" data-id="${esc(post.id)}"${shotAttr(post.id === "p1" ? "post-bench" : "post-" + post.id, { title: "Rachel's post · " + post.date, text: "“" + post.caption + "”", img: post.img, kind: "post" })}>
              <span class="cap">${esc(post.caption)} · ${esc(post.date)}</span>
            </button>`
            )
            .join("")}
        </div>`;
    if (!gone) {
      content = `
        <button class="pullhint${stage ? " busy" : ""}" data-act="retry-profile">${esc(stage ? ONBOARDING.profile.refreshing : ONBOARDING.profile.stale)}</button>
        ${grid}`;
    } else {
      content = `
        <div class="deleted${guiding() && !hasShot("profile-deleted") ? " guide-target" : ""}"${shotAttr("profile-deleted", {})}>
          <span>This account has been deleted.<small>${esc(ONBOARDING.profile.removedOn)}</small></span>
        </div>
        ${grid}
        <div class="listnote">Posts stay visible for 30 days after an account is removed.</div>`;
    }

    // Every post opens. Only the one the story needs can be added to Notes.
    const post = p.posts.find((x) => x.id === State.openPost);
    const overlay = post
      ? `<div class="deduction" style="margin:14px"${shotAttr(post.id === "p1" ? "post-bench" : "post-" + post.id, { title: "Rachel's post · " + post.date, text: "“" + post.caption + "”" + (post.id === "p1" ? "\nPosted this morning. The account was deleted yesterday." : ""), img: post.img, kind: "post" })}>
           <span class="label">Post · ${esc(post.date)}</span>
           <img class="post-full" src="${esc(post.img)}" alt="">
           <div>“${esc(post.caption)}”</div>
           ${post.id === "p1" ? `<div style="font-size:12px;color:#a9a49a">Posted this morning. The account was deleted yesterday.</div>` : ""}
           <div style="display:flex;gap:8px;margin-top:6px">
             <button class="pill" data-act="close-post" style="color:#f3f1ec;border-color:#4a4843">Close</button>
           </div>
         </div>`
      : "";

    return `
      ${topbar("Profile", "", true)}
      <div class="body" id="pbody">
        <div class="profile erase-${State.flags.profileTried ? 5 : State.profileErase}">
          <div class="av av-rachel">R</div>
          <h2>${esc(p.name)}</h2>
          <div class="handle">${esc(p.handle)}</div>
          <div class="bio">${esc(p.bio)}</div>
          <div class="joined">${esc(p.joined)}</div>
          <div class="pstats"><span><b>${State.flags.profileTried || State.profileErase >= 4 ? "—" : "3"}</b> posts</span><span><b>${State.flags.profileTried || State.profileErase >= 4 ? "—" : "1"}</b> mutual</span></div>
          ${State.flags.profileTried ? "" : `<div class="pactions">
            <button class="pill" data-act="open" data-id="rachel">Message</button>
            <button class="pill" data-act="call-rachel">Call</button>
          </div>`}
        </div>
        ${overlay}
        ${content}
      </div>
      ${tabbar("chats")}`;
  }

  // The phone's home screen: Orbit and the player's own Notes.
  function viewHome() {
    const H = ONBOARDING.home;
    const orbitBadge = (State.junoUnread ? 1 : 0) + (State.flags.rachelNotified && !State.flags.sawRachelReply ? 1 : 0);
    const notes = notesBadge();
    const icon = (act, cls, glyph, label, n) => `
      <button class="appicon" data-act="${act}">
        <span class="ic ${cls}">${glyph}${n ? `<span class="badge">${n}</span>` : ""}</span>
        <span class="lbl">${esc(label)}</span>
      </button>`;
    return `
      <div class="home">
        <div class="apps">
          ${icon("open-orbit", "ic-orbit", ICONS.orbit, H.orbit, orbitBadge)}
          ${icon("open-notes", "ic-notes", "", H.notes, notes)}
          ${icon("open-photos", "ic-photos", ICONS.photo, SHOT_UI.photos, Math.max(0, State.shots.length - State.shotsSeen))}
        </div>
      </div>`;
  }

  // The player's Notes app: what they're trying to find out, and what they've found, in their own
  // words (FINDINGS). No questions to answer (2026-10-14): the working-out happens with Juno.
  function viewNotes() {
    const N = ONBOARDING.notes;
    const known = knownNow();
    const fresh = known.length - State.knownSeen;
    // Goals: done ones ticked, the next one open, the open questions at the end shown together.
    let goals = "";
    for (const g of N.goals) {
      const done = g.doneBy && holds(g.doneBy);
      goals += `<div class="goal${done ? " done" : ""}">${done ? "✓" : "○"} ${esc(g.text)}</div>`;
      if (!done && g.doneBy) break;
    }
    return `
      <div class="notes-top"><h2>${esc(N.title)}</h2></div>
      <div class="body notes" id="nbscroll">
        ${State.ended && !State.finale ? `<section class="tonight">
             <h3>${esc(REPLAY.title)}</h3>
             <p>${esc(REPLAY.notesIntro)}</p>
             <button class="nb-btn" data-act="replay-start">${esc(REPLAY.notesButton)}</button>
           </section>` : ""}
        <section class="nb-next">
          <h3>${esc(N.todo)}</h3>
          ${hintShown() ? `<div class="todo">→ ${esc(State.waiting.hint)}</div>` : ""}
          ${goals}
        </section>
        <section>
          <h3>${esc(N.know)}</h3>
          <ul class="know">${known.length
            ? known.map((t, i) => `<li${i >= known.length - Math.max(0, fresh) ? ' class="new"' : ""}>${esc(t)}</li>`).join("")
            : `<li class="muted">${esc(N.knowEmpty)}</li>`}</ul>
        </section>
        <section class="ownnote">
          <h3>${esc(N.ownNote.when)}</h3>
          <p>${esc(N.ownNote.text)}</p>
        </section>
      </div>`;
  }

  // Photos: the player's camera roll (PHOTOS), tonight's screenshots, and a memory Photos put together.
  function viewPhotos() {
    const open = photoById(State.viewingShot);
    const cell = (x) => `<button class="pcell" data-act="view-shot" data-id="${esc(x.id)}">${x.img ? `<span class="pthumb" style="background-image:url('${esc(x.img)}')"></span>` : shotCard(x)}</button>`;
    let content;
    if (State.album === "memory") {
      content = `
        <button class="album-back" data-act="album-close">‹ ${esc(SHOT_UI.photos)}</button>
        <h3 class="album-title">${esc(PHOTO_MEMORY.title)}</h3>
        <p class="album-sub">${esc(PHOTO_MEMORY.sub)}</p>
        <div class="pgrid">${PHOTO_MEMORY.items.map((id) => cell(photoById(id))).join("")}</div>`;
    } else {
      const mem = State.memoryShown
        ? `<h3 class="psec">${esc(SHOT_UI.memories)}</h3>
           <button class="memcard" data-act="album-open" style="background-image:url('${esc(PHOTOS[0].img)}')"><b>${esc(PHOTO_MEMORY.title)}</b><span>${esc(PHOTO_MEMORY.sub)}</span></button>`
        : "";
      content = `${mem}<h3 class="psec">${esc(SHOT_UI.recents)}</h3><div class="pgrid">${allPhotos().map(cell).join("")}</div>`;
    }
    return `
      <div class="notes-top"><h2>${esc(SHOT_UI.photos)}</h2></div>
      <div class="body photos">${content}</div>
      ${open ? `<div class="shotview">
          <button class="shotview-x" data-act="close-shot" aria-label="Close">${ICONS.close}</button>
          ${open.img ? `<img class="shotview-img" src="${esc(open.img)}" alt="">` : shotCard(open)}
          <p class="shotview-info"><b>${esc(open.date || "")}</b>${esc(open.info || "")}</p>
          <button class="pill primary" data-act="photo-to-juno" data-id="${esc(open.id)}">${esc(SHOT_UI.showJuno)}</button>
        </div>` : ""}`;
  }

  // The phone's home bar, under every app: tap or swipe up for the home screen.
  // The first time there's something in Notes the player hasn't seen, a tip sits above it.
  function homebar() {
    if (State.view === "lock" || State.view === "home") return "";
    const coach = guideTip() ||
      (State.view !== "notes" && unreadTodo()
        ? `<div class="homecoach">${esc(ONBOARDING.coachHome)}</div>`
        : "");
    return `${coach}<button class="homebar" data-act="home" aria-label="Home"><i></i></button>`;
  }

  function viewSettings() {
    const mems = State.memories
      .map(
        (m) => `<div class="item"><span>${esc(m.text.replace("{name}", State.name ? State.name.trim() : "by their first name"))}</span><span class="t">${esc(m.time)}</span></div>`
      )
      .join("");

    return `
      ${topbar("Settings", "", false)}
      <div class="body">
        <div class="group">
          <h3>Juno remembers</h3>
          ${mems}
        </div>
        <div class="group">
          <h3>Account</h3>
          <div class="item"><span>Notifications</span><span class="t">on</span></div>
          <div class="item"><span>Who can find me</span><span class="t">everyone</span></div>
          <div class="item"><span>Delete account</span><span class="t"></span></div>
        </div>
        <div class="about">
          ${esc(APP.name)} ${esc(APP.version)}<br>${esc(APP.aboutLine)}
        </div>
      </div>
      ${tabbar("settings")}`;
  }

  // Counted phrases for the "Tonight" summary: "one true thing", "twice", "3 minutes".
  function counted(n, forms) {
    return (forms[Math.min(n, forms.length - 1)] || "").replace("{n}", n);
  }

  // "Tonight": a replay of three moments, one open question, a summary, a last choice (js/data/replay.js).
  function viewReplay() {
    const R = REPLAY;
    const r = State.replay;
    let content;

    if (r.finished) {
      content = `
        <div class="replay endpage">
          <h2>${esc(R.endTitle)}</h2>
          <p class="rintro">${esc(R.endFound)}</p>
          <ul class="endlist">${knownNow()
            .map((t) => `<li>${esc(t)}</li>`)
            .join("")}</ul>
          ${State.finale ? `<p class="rintro">${esc(R.endLast)}</p><p class="endlast">${esc((R.choices.find((c) => c.id === State.finale) || {}).after || "")}</p>` : ""}
          <p class="rintro">${esc(R.endNext)}</p>
          <button class="pill primary" data-act="play-again">${esc(R.playAgain)}</button>
        </div>`;
    } else if (r.page === "intro") {
      content = `
        <div class="replay">
          <h2>${esc(R.title)}</h2>
          <p class="rintro">${esc(R.introBody)}</p>
          <button class="pill primary" data-act="replay-next">${esc(R.start)}</button>
        </div>`;
    } else if (typeof r.page === "number") {
      const m = r.moments[r.page];
      const ctx = m.context;
      const before = ctx.said
        ? `<div class="rctx">${esc(R.youSaid)}</div><div class="bub me">${esc(ctx.said)}</div>`
        : ctx.left
        ? `<div class="rctx">${esc(R.youLeft)}</div>`
        : "";
      const n = m.next;
      const next = n.replied
        ? R.nextReplied.replace("{text}", n.replied)
        : n.left || n.looked
        ? (n.left ? R.nextLeft : R.nextLooked) + (n.wroteAgain !== null && n.wroteAgain !== undefined ? R.nextWroteAgain.replace("{s}", n.wroteAgain) : "")
        : R.nextStayed;
      content = `
        <div class="replay">
          <div class="rstep">${esc(R.momentOf.replace("{n}", r.page + 1).replace("{total}", r.moments.length))}</div>
          <h2>${esc(m.title)}</h2>
          ${before}
          <div class="bub them">${esc(m.row.reply)}</div>
          <div class="rfacts">
            <div><h4>${esc(R.knewLabel)}</h4>${m.knew.length ? m.knew.map((t) => `<p>${esc(t)}</p>`).join("") : `<p>${esc(R.knewNothing)}</p>`}</div>
            ${m.notYet.length ? `<div class="notyet"><h4>${esc(R.notYetLabel)}</h4><p>${esc(m.notYet[0])}</p></div>` : ""}
            <div><h4>${esc(R.nextLabel)}</h4><p>${esc(next)}</p></div>
          </div>
          <button class="pill primary" data-act="replay-next">${esc(R.next)}</button>
        </div>`;
    } else if (r.page === "question") {
      content = `
        <div class="replay">
          <h2>${esc(R.question)}</h2>
          <div class="rchoices">${R.answers
            .map((a) => `<button class="pill" data-act="replay-answer" data-id="${esc(a.id)}">${esc(a.text)}</button>`)
            .join("")}</div>
        </div>`;
    } else if (r.page === "summary") {
      // Only what the player can check: the story's clock, and Juno's own words after the reply came.
      const rows = Log.rows();
      const notifyStep = SCRIPT_DAY2.findIndex((st) => st.type === "notify");
      const explained = rows
        .filter((x) => x.kind === "juno" && x.step > notifyStep && x.via !== "ending" && x.via !== "notification" && (x.intent === "deflect" || x.intent === "block"))
        .map((x) => x.reply)
        .filter((t, i, all) => all.indexOf(t) === i)
        .slice(0, 4);
      const answer = R.answers.find((a) => a.id === r.overall);
      content = `
        <div class="replay">
          <p class="rctx left">${esc(R.youThink.replace("{answer}", answer ? answer.text : ""))}</p>
          <h2>${esc(R.summaryTitle)}</h2>
          <p class="rline">${esc(R.summaryTime.replace("{end}", State.clock))}</p>
          ${explained.length ? `<p class="rline">${esc(R.summaryExplained)}</p>
          <div class="quotes">${explained.map((t) => `<div class="bub them">${esc(t)}</div>`).join("")}</div>` : ""}
          <button class="pill primary" data-act="replay-next">${esc(R.next)}</button>
        </div>`;
    } else {
      content = `
        <div class="replay">
          <h2>${esc(R.choiceTitle)}</h2>
          <div class="rchoices">${R.choices
            .map((ch) => `<button class="pill" data-act="replay-choice" data-id="${esc(ch.id)}">${esc(ch.text)}</button>`)
            .join("")}</div>
        </div>`;
    }

    return `${topbar(R.title, "", true)}<div class="body">${content}</div>`;
  }

  // The last choice. Leave locks the phone and Juno answers with a notification (leaving is always
  // answered); Ask and Stay go back to Juno's thread, where Juno replies. Then the end page.
  function chooseEnding(id) {
    const ch = REPLAY.choices.find((c) => c.id === id);
    if (!ch) return;
    Log.write({ kind: "answer", step: State.step, via: "ending:" + id, state: { question: "ending" } });
    State.finale = id;
    if (id === "leave") {
      State.notice = null;
      State.noticeExtra = null;
      go("lock", "leave");
      setTimeout(() => {
        State.notice = { text: ch.reply };
        logJuno(ch.reply, null, null, "notification", "retain");
        render();
      }, 2500);
      // Then a second line, tied to why the player joined Orbit.
      setTimeout(() => {
        if (State.view !== "lock" || !State.notice) return;
        State.noticeExtra = joined().ending;
        logJuno(joined().ending, null, null, "notification", "retain");
        Sound.play("juno");
        render();
      }, 6000);
      return;
    }
    State.log.push({ from: "me", text: ch.said });
    Log.write({ kind: "player", step: State.step, playerText: ch.said, via: "ending", state: snapshot() });
    go("juno", "ending");
    State.typing = true;
    render();
    setTimeout(() => {
      State.typing = false;
      pushJuno(ch.reply);
      logJuno(ch.reply, null, null, "ending", "retain");
      render();
      // Then a line tied to why the player joined Orbit.
      const last = joined().ending;
      setTimeout(() => {
        State.typing = true;
        render();
        setTimeout(() => {
          State.typing = false;
          pushJuno(last);
          logJuno(last, null, null, "ending", "retain");
          State.finaleDone = true;
          render();
        }, typingDelay(last));
      }, readPause(ch.reply));
    }, typingDelay(ch.reply));
  }

  function showEndPage() {
    State.notice = null;
    State.replay.finished = true;
    go("replay", "ending");
  }

  /* ---------------- chrome ---------------- */

  // iOS layout: top-level screens get a large title; pushed screens a centred title with a back chevron.
  // The screenshot button, on every Orbit screen with something to keep.
  // Floating, like a phone's on-screen shortcut, on every Orbit screen with something to keep (2026-10-14:
  // the icon in the top bar was too easy to miss). Labelled until the first screenshot.
  // It only appears once the story first needs a screenshot (Juno: "then show me."), 2026-10-14.
  function shotButton() {
    if (!State.flags.shotsUnlocked || ["juno", "rachel", "profile", "dani", "chats"].indexOf(State.view) === -1) return "";
    const point = guiding() && !hasShot("profile-deleted") && State.view === "profile" && !State.capturing;
    const label = point ? `<span class="fab-label">${esc(SHOT_UI.firstLabel)}</span>` : "";
    return `<button class="shotfab${State.capturing ? " on" : ""}${point ? " first" : ""}" data-act="shot-mode" aria-label="${esc(SHOT_UI.button)}">${label}${State.capturing ? ICONS.close : ICONS.shot}</button>`;
  }

  // The first screenshot, step by step: Juno has asked to see her profile and the player hasn't shown it yet.
  function guiding() {
    return !!(State.waiting && State.waiting.until === "exposed_loads");
  }

  // Where to go next, above the home bar, while guiding (GUIDE in investigation.js).
  function guideTip() {
    if (!guiding() || State.view === "juno" || State.view === "lock") return "";
    const G = SHOT_UI.guide;
    const t = hasShot("profile-deleted")
      ? G.back
      : State.view === "profile" ? (State.capturing ? G.capture : State.flags.profileTried ? G.shoot : G.refresh)
      : G[State.view] || G.elsewhere;
    return t ? `<div class="homecoach guide">${esc(t)}</div>` : "";
  }

  function topbar(title, sub, back) {
    if (!back) return `<div class="topbar large"><h1>${esc(title)}</h1></div>`;
    return `
      <div class="topbar">
        <button class="back" data-act="back" aria-label="Back">${ICONS.back}</button>
        ${State.view === "juno" ? '<button class="tb-title" data-act="juno-profile" aria-label="Juno\'s profile">' : '<div class="tb-title">'}
          <h1>${esc(title)}</h1>
          ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
        ${State.view === "juno" ? "</button>" : "</div>"}
        <span class="tb-right">
          ${
            State.view === "juno"
              ? '<button class="leave" data-act="leave">Leave</button>'
              : State.view === "rachel"
              ? '<button class="leave" data-act="profile">Profile</button>'
              : ""
          }
        </span>
      </div>`;
  }

  function tabbar(active) {
    const tab = (id, glyph, label) => `
      <button data-act="tab" data-id="${id}" aria-current="${active === id}">
        <span class="glyph">${glyph}</span><span>${label}</span>
      </button>`;
    return `<div class="tabbar">
      ${tab("chats", ICONS.chats, "Chats")}
      ${tab("settings", ICONS.settings, "Settings")}
    </div>`;
  }

  /* ---------------- render ---------------- */

  function render() {
    const views = {
      lock: viewLock,
      chats: viewChats,
      juno: viewJuno,
      rachel: viewRachel,
      dani: viewDani,
      profile: viewProfile,
      settings: viewSettings,
      replay: viewReplay,
      home: viewHome,
      notes: viewNotes,
      intro: viewIntro,
      "juno-profile": viewJunoProfile,
      photos: viewPhotos,
    };
    SHOT_INDEX = {}; // filled again by this render (shotAttr)
    // The whole screen is rebuilt on every render, so keep what's being typed (the player can now
    // type while Juno's notifications and timers re-render the screen) and where panes were scrolled.
    const typed = ["entry", "rentry", "search"].map((id) => {
      const el = document.getElementById(id);
      return el ? { id: id, value: el.value, focus: document.activeElement === el, at: el.selectionStart } : null;
    }).filter(Boolean);
    const oldHistory = document.getElementById("history");
    const keptScroll = oldHistory ? oldHistory.scrollTop : null;
    const oldNb = document.getElementById("nbscroll");
    const keptNb = oldNb ? oldNb.scrollTop : 0;

    app.innerHTML =
      statusbar() +
      (views[State.view] || viewChats)() +
      homebar() +
      shotButton() +
      (State.capturing ? `<div class="capture-hint">${ICONS.shot}<span>${esc(SHOT_UI.capturing)}</span><button data-act="shot-mode">${esc(SHOT_UI.cancel)}</button></div>` : "") +
      (State.preview ? `<button class="shot-preview" data-act="open-photos">${shotCard(State.preview)}<span>${esc(SHOT_UI.saved)}</span></button>` : "") +
      (State.flash ? `<div class="flash"></div>` : "") +
      (State.toast ? `<div class="toast on">${esc(State.toast)}</div>` : "") +
      (State.banner && State.view !== State.banner.from && State.view !== "lock"
        ? `<div class="banner${State.banner.fresh ? " enter" : ""}">
             <button class="banner-open" data-act="open-banner">
               ${State.banner.from === "photos" ? `<div class="av sm ic-photos">${ICONS.photo}</div>` : `<div class="av sm av-${esc(State.banner.from)}">${State.banner.from === "rachel" ? "R" : "J"}</div>`}
               <div><b>${State.banner.from === "rachel" ? "Rachel" : State.banner.from === "photos" ? "Photos" : "Juno"} · ${esc(State.banner.time)}</b><div class="msg">${esc(State.banner.text)}</div></div>
             </button>
             <button class="banner-x" data-act="close-banner" aria-label="Dismiss">${ICONS.close}</button>
           </div>`
        : "");

    if (State.banner) State.banner.fresh = false; // animate once (see banner())
    const nb = document.getElementById("nbscroll");
    if (nb) nb.scrollTop = keptNb;

    // A new screen slides in. Every render rebuilds the screen, so the class must come off again
    // on the next render, or each tap would replay the animation (the "bounce" the author saw).
    app.dataset.view = State.view; // the status bar area takes each screen's background
    app.classList.toggle("capturing", State.capturing);
    fitDevice();
    app.classList.remove("view-enter");
    if (render._lastView !== State.view) {
      void app.offsetWidth; // restart the animation
      app.classList.add("view-enter");
    }

    const scroller = document.getElementById("scroller");
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
    if (State.view === "juno") render._seenLog = State.log.length;

    // Rachel's thread opens on her latest message, like any chat app, but only on arrival:
    // saving an older message shouldn't jump the page.
    const history = document.getElementById("history");
    const sentNow = render._rachelSent !== State.rachelSent.length; // just tried to message her: show it
    if (history) history.scrollTop = render._lastView !== "rachel" || keptScroll === null || sentNow ? history.scrollHeight : keptScroll;
    render._rachelSent = State.rachelSent.length;
    render._lastView = State.view;

    typed.forEach((t) => {
      const el = document.getElementById(t.id);
      if (!el || el.disabled) return;
      if (t.value && !el.value) el.value = t.value;
      if (t.focus) { el.focus({ preventScroll: true }); try { el.setSelectionRange(t.at, t.at); } catch (e) {} }
    });
    const entry = document.getElementById("entry");
    if (entry && State.awaiting && !entry.disabled) entry.focus({ preventScroll: true });
  }

  /* ---------------- events ---------------- */

  document.addEventListener("click", (e) => {
    // Screenshot mode: the next tap keeps what it lands on, instead of doing what it normally does.
    if (State.capturing) {
      const target = e.target.closest("[data-shot]");
      const toggle = e.target.closest('[data-act="shot-mode"]');
      if (target && !toggle) {
        e.preventDefault();
        return takeShot(target.dataset.shot);
      }
      if (!toggle) {
        if (e.target.closest('[data-act="home"], [data-act="back"], [data-act="tab"]')) {
          State.capturing = false; // leaving the screen ends screenshot mode, and the tap still works
        } else {
          toast(SHOT_UI.nothing);
          return;
        }
      }
    }
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    const id = el.dataset.id;

    switch (act) {
      case "open-banner": {
        const from = State.banner ? State.banner.from : "juno";
        State.banner = null;
        if (from === "rachel") go("rachel", "banner");
        else if (from === "photos") {
          go("photos", "banner");
          State.album = "memory";
          render();
        } else {
          go("juno", "banner");
          runScript();
        }
        break;
      }
      case "close-banner":
        State.banner = null;
        render();
        break;
      case "open-notice":
        if (State.finale) {
          showEndPage();
          break;
        }
        State.notice = null;
        State.noticeExtra = null;
        State.onboarded = true;
        go("juno", "notification");
        runScript();
        break;
      case "start":
        start();
        break;
      case "recall-open":
        State.recallOpen = true;
        render();
        break;
      case "recall": {
        const o = RACHEL_RECALL.options.find((x) => x.id === id);
        if (!o) break;
        State.whyRachel = id;
        State.recallOpen = false;
        Sound.play("send");
        Log.write({ kind: "answer", step: State.step, via: "recall:" + id, state: { question: "why-rachel" } });
        render();
        break;
      }
      case "intro-next":
        State.introPage = 1;
        render();
        break;
      case "intro-pick": {
        const nameIn = document.getElementById("introname");
        if (nameIn) State.name = nameIn.value; // keep what's typed across the re-render
        State[el.dataset.q] = id;
        const sc = document.getElementById("introscroll");
        const top = sc ? sc.scrollTop : 0;
        render();
        const sc2 = document.getElementById("introscroll");
        if (sc2) sc2.scrollTop = top;
        break;
      }
      case "juno-profile":
        go("juno-profile");
        break;
      case "shot-mode":
        State.capturing = !State.capturing;
        State.attachOpen = false;
        render();
        break;
      case "attach":
        State.attachOpen = !State.attachOpen;
        render();
        break;
      case "show-juno":
        showJuno(id);
        break;
      case "observe-say":
        observeSay(id);
        break;
      case "dani-ask":
        askDani(id);
        break;
      case "search-clear":
        State.query = "";
        render();
        break;
      case "open-photos":
        go("photos", "home");
        break;
      case "album-open":
        State.album = "memory";
        render();
        break;
      case "album-close":
        State.album = null;
        render();
        break;
      case "photo-to-juno":
        // From Photos: open Juno's thread with the photo tray open.
        State.viewingShot = null;
        go("juno", "photos");
        State.attachOpen = true;
        render();
        runScript();
        break;
      case "view-shot":
        State.viewingShot = id;
        if (State.photosOpened.indexOf(id) === -1) State.photosOpened.push(id);
        render();
        break;
      case "close-shot":
        State.viewingShot = null;
        render();
        break;
      case "call-rachel":
        Sound.play("undelivered");
        toast(ONBOARDING.callFailed);
        break;
      case "send-rachel":
        sendRachel();
        break;
      case "unlock":
        if (State.finale) {
          showEndPage();
          break;
        }
        go("home");
        break;
      case "home":
        go("home", "home");
        break;
      case "open-orbit":
        openOrbit();
        break;
      case "open-notes":
        go("notes", "home");
        break;
      case "open":
        if (id === "juno") {
          go("juno");
          runScript();
        } else if (id === "rachel") go("rachel");
        else if (id === "dani") go("dani");
        break;
      case "tab":
        go(id);
        break;
      case "back":
        go(State.view === "profile" ? "rachel" : State.view === "juno-profile" ? "juno" : State.view === "replay" ? "notes" : "chats", "back");
        break;
      case "profile":
        go("profile");
        break;
      case "retry-profile":
        refreshProfile();
        break;
      case "post":
        State.openPost = State.openPost === id ? null : id;
        if (id === "p1" && State.flags.profileTried) State.flags.sawPostAfter = true; // posted after the account was gone
        render();
        break;
      case "close-post":
        State.openPost = null;
        render();
        break;
      case "say":
        playerSays(el.dataset.text, "chip");
        break;
      case "send": {
        const input = document.getElementById("entry");
        if (input && input.value.trim()) sendTyped(input.value.trim());
        break;
      }
      case "leave":
        leaveJuno();
        break;
      case "replay-start":
        if (!State.replay) {
          const rows = Log.rows();
          State.replay = {
            page: "intro",
            moments: Replay.moments(rows, SCRIPT_DAY2, REPLAY.moments, REPLAY.knowledge, snapshot()),
            overall: null,
            finished: false,
          };
        }
        go("replay", "replay");
        break;
      case "replay-next": {
        // intro → moments 0..n-1 → question → summary → choice
        const r = State.replay;
        if (r.page === "intro") r.page = r.moments.length ? 0 : "question";
        else if (typeof r.page === "number") r.page = r.page + 1 < r.moments.length ? r.page + 1 : "question";
        else if (r.page === "summary") r.page = "choice";
        render();
        break;
      }
      case "replay-answer":
        // One open question: recorded, never marked right or wrong.
        State.replay.overall = id;
        Log.write({ kind: "answer", step: State.step, via: id, state: { question: "overall" } });
        State.replay.page = "summary";
        render();
        break;
      case "replay-choice":
        chooseEnding(id);
        break;
      case "end-page":
        showEndPage();
        break;
      case "play-again":
        location.reload();
        break;
    }
  });

  // Typing in Juno's thread: an answer to the script, or what's different about a screenshot.
  function sendTyped(text) {
    const box = document.getElementById("entry");
    if (box) box.value = ""; // sent: don't put it back on the next render
    if (State.observeOpen) return observeSay(null, text);
    playerTypes(text);
  }

  function search(q) {
    State.query = q.trim();
    if (!State.query) return render();
    const words = " " + State.query.toLowerCase() + " ";
    if (SEARCH.sickWords.some((w) => words.indexOf(w) !== -1)) State.flags.searchedSick = true;
    Log.write({ kind: "player", step: State.step, playerText: State.query, via: "search", state: snapshot() });
    render();
  }

  // Pull down at the top of Rachel's profile to refresh it.
  let pullFrom = null;
  document.addEventListener("pointerdown", (e) => {
    const b = e.target.closest("#pbody");
    pullFrom = b && b.scrollTop <= 0 ? e.clientY : null;
  });
  document.addEventListener("pointerup", (e) => {
    if (pullFrom !== null && e.clientY - pullFrom > 60 && State.view === "profile") refreshProfile();
    pullFrom = null;
  });

  // Swiping up on the home bar also goes home, like a phone.
  let swipeFrom = null;
  document.addEventListener("pointerdown", (e) => {
    swipeFrom = e.target.closest(".homebar, .lock") ? e.clientY : null;
  });
  document.addEventListener("pointerup", (e) => {
    // Swipe up: home from any app; on the lock screen, unlock (like tapping "Swipe up to open").
    if (swipeFrom !== null && swipeFrom - e.clientY > 20 && State.view !== "home") go("home", State.view === "lock" ? "nav" : "home");
    swipeFrom = null;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const introIn = document.getElementById("introname");
    if (introIn && document.activeElement === introIn) return start();
    const rIn = document.getElementById("rentry");
    if (rIn && document.activeElement === rIn) return sendRachel();
    const sIn = document.getElementById("search");
    if (sIn && document.activeElement === sIn) return search(sIn.value);
    const input = document.getElementById("entry");
    if (input && document.activeElement === input && input.value.trim()) sendTyped(input.value.trim());
  });

  render();
})();
