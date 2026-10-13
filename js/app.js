/* Orbit — app shell.
   Everything renders from State. Nothing else writes to the DOM.
   The model slots in at one place: a `juno` step with an `intent` asks api/reply for its
   words (fetchLine). Any failure falls back to the step's hardcoded `text`. */

(function () {
  "use strict";

  const MODEL_TIMEOUT_MS = 8000;     // give up on the model and show the scripted line (was 4000; z.ai was slower)
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
    const scale = Math.min(1, (window.innerHeight - 48) / 844, (window.innerWidth - 32) / 390);
    document.documentElement.style.setProperty("--fit", String(Math.max(0.5, scale)));
  }
  window.addEventListener("resize", fitDevice);


  const State = {
    view: "lock",          // lock | home | notes (the phone) | chats | juno | rachel | dani | profile | settings | replay (Orbit)
    day: 2,                // in-game day; the Director only uses facts unlocked by now
    step: 0,               // position in SCRIPT_DAY2
    log: [],               // messages shown in Juno's thread
    typing: false,
    pending: false,        // a Juno message is on its way; stops the runner re-entering
    awaiting: null,        // {options:[...]} while the script waits for the player
    waiting: null,         // {hint, until} while the script waits for an action elsewhere
    ended: false,
    saved: [],             // evidence ids
    deductions: [],        // deduction ids
    exits: 0,              // times the player has left Juno's thread
    away: null,            // {at} while the player is out of Juno's thread; cleared when they return
    notice: { text: "still awake after crit?" }, // notification on the lock screen, or null (the script's first line)
    name: "",              // what Juno calls the player: typed in when Orbit first opens; never logged
    rachelSent: [],        // what the player tried to send Rachel (never delivered: her account is gone)
    profileErase: 0,       // Rachel's profile while refreshing: 0 cached, 1–4 being erased, 5 done
    noticeExtra: null,     // Juno's second lock-screen line if the player waits ("still there?")
    junoUnread: true,      // dot on Juno's row in Chats
    replay: null,          // the look-back: {intro, items, i, guesses[], done}
    bridgedStep: -1,       // the player step Juno already answered off-script once (see playerSays)
    sentWhileAway: false,  // Juno already sent one line while the player was on another screen
    heldForReturn: false,  // the script is waiting for the player to come back to Juno's thread
    banner: null,          // {text}: a notification from Juno at the top of the screen, outside Juno's thread
    onboarded: false,      // the player has opened the app once (the lock screen's older notices go)
    clipsSeen: 0,          // items the player has seen in Notes (the rest count on its icon badge)
    todoSeen: null,        // the to-do (State.waiting.hint) last seen in Notes
    misses: {},            // wrong answers per question in Notes; two misses bring a plainer hint
    notesHint: null,       // {q, text}: the nudge under a question after a wrong answer
    notesFlash: "",        // "Found it…" after a right answer, shown once
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
    State.notesFlash = "";
    State.notesHint = null;
    if (view === "notes") {
      State.clipsSeen = State.saved.length;
      State.todoSeen = State.waiting ? State.waiting.hint : State.ended ? "tonight" : null;
    }
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
    Sound.play(State.banner.from === "juno" ? "juno" : "notify");
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

  function isSaved(id) {
    return State.saved.indexOf(id) !== -1;
  }

  // Adding to Notes is the player's own act, like sharing to another app; it isn't an Orbit feature.
  function saveCard(id) {
    if (isSaved(id)) {
      State.saved = State.saved.filter((x) => x !== id);
      State.clipsSeen = Math.min(State.clipsSeen, State.saved.length);
      toast(ONBOARDING.unclipped);
    } else {
      State.saved.push(id);
      Sound.play("snap");
      toast(ONBOARDING.clipped);
    }
    render();
  }

  // Badge on the Notes icon: new items, plus a to-do the player hasn't read yet.
  // A to-do the player hasn't read in Notes yet. Steps the story already points at in place
  // (`inPlace`, e.g. Rachel's reply: banner, unread dot, Juno saying "go look") don't send them to Notes.
  function unreadTodo() {
    if (State.ended && !State.replay) return State.todoSeen !== "tonight"; // "Tonight" is waiting in Notes
    return !!(State.waiting && !State.waiting.inPlace && State.todoSeen !== State.waiting.hint);
  }

  function notesBadge() {
    const todo = unreadTodo() ? 1 : 0;
    return Math.max(0, State.saved.length - State.clipsSeen) + todo;
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
  function pushJuno(text, meta) {
    State.log.push({ from: "juno", text: text, meta: meta || null });
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
  function fetchLine(step, plan) {
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
          const text = fill(generated || (plan ? plan.fallback : step.text));
          if (plan) {
            console.info(`[juno] ${plan.intent} (${plan.rule}) · ${generated ? "model" : "fallback"}: ${text}`);
          }
          const left = (step.instant ? 0 : Math.max(typingDelay(text), minWait)) - (Date.now() - started);
          setTimeout(() => {
            logJuno(text, plan, generated, null, step.means);
            State.typing = false;
            State.pending = false;
            pushJuno(text, metaFor(plan, generated, step.means));
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
        banner(msg.text, "rachel", msg.time);
        State.step++;
        State.pending = true;
        setTimeout(() => {
          State.pending = false;
          runScript();
        }, READ_PAUSE_MS * 2);
        return;
      }

      case "memory":
        State.memories.push({ text: step.text, time: step.time });
        State.clock = step.time.split(" ").pop(); // "Tue 23:58" -> "23:58"
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
        State.waiting = { hint: step.hint, until: step.until, inPlace: !!step.inPlace };
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

  // A typed message the script didn't expect gets one short reply from Juno, and the same question
  // stays open. It moves the script on if it was a suggested reply, matched a Director signal,
  // or this question was already answered off-script once.
  function needsBridge(text, via, awaiting) {
    if (via !== "typed" || State.bridgedStep === State.step) return false;
    if ((awaiting.options || []).some((o) => o.toLowerCase() === text.trim().toLowerCase())) return false;
    return Director.signalsOf(text).length === 0;
  }

  function playerSays(text, via) {
    if (!State.awaiting) return;
    Log.write({ kind: "player", step: State.step, playerText: text, via: via, state: snapshot() });
    State.log.push({ from: "me", text: text, via: via }); // via: "chip" | "typed"
    Sound.play("send");
    const awaiting = State.awaiting;
    State.awaiting = null;

    if (!needsBridge(text, via, awaiting)) {
      State.step++;
      render();
      runScript();
      return;
    }

    // Game code picks the intent ("acknowledge"); the model only writes the words.
    // If the model fails there is no stock reply: the script just moves on as before.
    State.bridgedStep = State.step;
    State.typing = true;
    State.pending = true;
    render();
    const plan = { intent: "acknowledge", allowedFacts: [], factIds: [], rule: "bridge", signals: [] };
    const started = Date.now();
    fetchLine({ intent: "acknowledge" }, plan).then((generated) => {
      const wait = generated ? Math.max(0, typingDelay(generated) - (Date.now() - started)) : 0;
      setTimeout(() => {
        State.typing = false;
        State.pending = false;
        if (generated) {
          console.info(`[juno] acknowledge (bridge) · model: ${generated}`);
          logJuno(generated, plan, generated, "bridge");
          pushJuno(generated, metaFor(plan, generated));
          State.awaiting = awaiting; // same question, same suggestions
          render();
        } else {
          State.step++;
          render();
          runScript();
        }
      }, wait);
    });
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

  /* ---------------- case board ---------------- */

  // Questions in Notes (PAIRS in app-data.js): which are open, and answering one with a card.
  function questionOpen(q) {
    const w = q.opensWhen || {};
    if (w.flag) return !!State.flags[w.flag];
    if (w.saved) return State.saved.indexOf(w.saved) !== -1;
    if (w.waiting) return !!State.waiting && State.waiting.until === w.waiting;
    return false;
  }
  const solved = (q) => State.deductions.indexOf(q.id) !== -1;
  // Questions to show: solved ones (ticked) and open ones, in story order.
  const shownQuestions = () => PAIRS.filter((q) => solved(q) || questionOpen(q));

  function answerQuestion(qid, cardId) {
    const q = PAIRS.find((x) => x.id === qid);
    if (!q || solved(q)) return;
    if (q.answers.indexOf(cardId) !== -1) {
      Sound.play("snap");
      State.deductions.push(q.id);
      State.misses[q.id] = 0;
      const left = shownQuestions().filter((x) => !solved(x)).length;
      State.notesFlash = left ? ONBOARDING.notes.foundMore.replace("{n}", left === 1 ? "One question" : left + " questions") : ONBOARDING.notes.found;
      render();
      checkWaiting();
      return;
    }
    Sound.play("miss");
    State.misses[q.id] = (State.misses[q.id] || 0) + 1;
    State.notesHint = { q: q.id, text: State.misses[q.id] >= 2 ? q.second : (q.wrong && q.wrong[cardId]) || q.wrongOther };
    render();
  }

  /* ---------------- views ---------------- */

  // Older notifications under Juno's, on first launch only: who Rachel is and that she went quiet.
  function pastNotices() {
    return ONBOARDING.lockPast
      .map((n) => {
        const m = RACHEL_HISTORY.find((h) => h.text.indexOf(n.fromHistory) === 0);
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

  function viewChats() {
    return `
      ${topbar("Chats", "", false)}
      <div class="body">
        ${CONTACTS.map(liveRow).map(chatRow).join("")}
        <div class="listnote">Juno introduced you to 4 of the people in this list.</div>
      </div>
      ${tabbar("chats")}`;
  }

  function bubble(m, i) {
    if (m.from === "system") return `<div class="sys">${esc(m.text)}</div>`;
    const cls = (m.from === "me" ? "me" : "them") + (i >= (render._seenLog || 0) ? " enter" : "");
    const tag =
      State.presenter && m.meta
        ? `<div class="dtag">${esc(m.meta.intent)} · ${esc(m.meta.rule)} · ${esc(m.meta.source)}</div>`
        : "";
    return `<div class="bub ${cls}">${esc(m.text)}</div>${tag}`;
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

    const chips =
      State.awaiting && State.awaiting.options.length
        ? `<div class="chips">${State.awaiting.options
            .map(
              (o) => `<button class="chip" data-act="say" data-text="${esc(o)}">${esc(o)}</button>`
            )
            .join("")}</div>`
        : "";

    return `
      ${topbar("Juno", State.typing ? "typing…" : ONBOARDING.junoSub, true)}
      <div class="body" id="scroller">
        <div class="msgs">
          <div class="daymark">Today</div>
          ${msgs}${typing}${hint}
        </div>
      </div>
      <div class="composer">
        ${chips}
        <div class="inputrow">
          <input id="entry" placeholder="${State.awaiting ? esc(State.awaiting.options.length ? ONBOARDING.typeOwn : "Message Juno") : "…"}"
                 ${State.awaiting ? "" : "disabled"} autocomplete="off" aria-label="Message Juno">
          <button class="send" data-act="send" aria-label="Send">${ICONS.send}</button>
        </div>
      </div>`;
  }

  function viewRachel() {
    const rows = [];
    let lastDay = "";
    RACHEL_HISTORY.forEach((m, i) => {
      if (m.suspect && !State.flags.rachelNotified) return; // her "reply" hasn't arrived yet
      if (m.day !== lastDay) {
        rows.push(`<div class="daymark">${esc(m.day)}</div>`);
        lastDay = m.day;
      }
      const cls = m.from === "me" ? "me" : "them";
      const saveId = m.suspect ? "reply-today" : m.evidence || null;
      const time = m.time ? `<span class="time">${esc(m.time)}</span>` : "";
      // The message the story needs pulses until it's saved; the very first time, a tip says why.
      // The old message only pulses once the to-do points at it (clue 3).
      const wantOld = State.waiting && State.waiting.until === "deduction:not-her-typing";
      const key = saveId && !isSaved(saveId) && (m.suspect || (saveId === "old-dms" && wantOld));
      rows.push(
        `<div class="bub ${cls}${saveId ? " saveable" : ""}">${esc(m.text)}${time}${
          saveId
            ? `<button class="save${isSaved(saveId) ? " on" : ""}${key ? " pulse" : ""}" data-act="save" data-id="${saveId}" aria-label="${esc(ONBOARDING.clipLabel)}">${ICONS.clip}</button>`
            : ""
        }</div>`
      );
      if (key && !State.saved.length) rows.push(`<div class="coach">${esc(ONBOARDING.coachClip)}</div>`);
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

  // First time Orbit opens: it asks what Juno should call you (a real app's re-sign-in after an update).
  function viewSignin() {
    const S = ONBOARDING.signin;
    return `
      <div class="signin">
        <div class="ic ic-orbit">${ICONS.orbit}</div>
        <h1>${esc(S.title)}</h1>
        <p>${esc(S.body)}</p>
        <input id="nameentry" placeholder="${esc(S.placeholder)}" autocomplete="given-name" maxlength="24" aria-label="${esc(S.placeholder)}">
        <button class="pill primary" data-act="set-name">${esc(S.button)}</button>
      </div>`;
  }

  function setName() {
    const input = document.getElementById("nameentry");
    const name = input ? input.value.trim() : "";
    if (!name) return;
    State.name = name;
    go("juno", "notification");
    runScript();
  }

  // Replying to Rachel: the message never arrives. Players find out the account is gone the way
  // they would on a real phone (added 2026-10-12).
  function sendRachel() {
    const input = document.getElementById("rentry");
    const text = input ? input.value.trim() : "";
    if (!text) return;
    State.rachelSent.push(text);
    State.flags.replyFailed = true;
    Sound.play("send");
    setTimeout(() => Sound.play("undelivered"), 450);
    Log.write({ kind: "player", step: State.step, playerText: text, via: "rachel", state: snapshot() });
    render();
  }

  function viewDani() {
    return `
      ${topbar("Dani", "@danisaurus", true)}
      <div class="body"><div class="msgs">
        <div class="daymark">Tuesday</div>
        <div class="bub them">ok weird question\nhas juno asked you about rachel</div>
        <div class="bub me">not yet. why</div>
        <div class="bub them">no reason\nnevermind</div>
      </div></div>`;
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
            <button class="post" style="background-image:url('${esc(post.img)}')" data-act="post" data-id="${esc(post.id)}">
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
        <div class="deleted">
          <span>This account has been deleted.<small>${esc(ONBOARDING.profile.removedOn)}</small></span>
          <button class="save${isSaved("profile-deleted") ? " on" : " pulse"}" data-act="save" data-id="profile-deleted"
                  style="position:static;margin-left:8px;display:inline-grid" aria-label="${esc(ONBOARDING.clipLabel)}">${ICONS.clip}</button>
        </div>
        ${grid}
        <div class="listnote">Posts stay visible for 30 days after an account is removed.</div>`;
    }

    // Every post opens. Only the one the story needs can be added to Notes.
    const post = p.posts.find((x) => x.id === State.openPost);
    const overlay = post
      ? `<div class="deduction" style="margin:14px">
           <span class="label">Post · ${esc(post.date)}</span>
           <img class="post-full" src="${esc(post.img)}" alt="">
           <div>“${esc(post.caption)}”</div>
           ${post.id === "p1" ? `<div style="font-size:12px;color:#a9a49a">Posted this morning. The account was deleted yesterday.</div>` : ""}
           <div style="display:flex;gap:8px;margin-top:6px">
             ${post.id === "p1" ? `<button class="save inline${isSaved("post-bench") ? " on" : ""}" data-act="save" data-id="post-bench" aria-label="${esc(ONBOARDING.clipLabel)}">${ICONS.clip}</button>` : ""}
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
        </div>
      </div>`;
  }

  // The player's Notes app: the to-do, what they kept from Orbit, comparing, what they know.
  function viewNotes() {
    const N = ONBOARDING.notes;
    // Evidence keeps the look of where it came from: a cut-out chat bubble, the red system bar,
    // a post thumbnail.
    const card = (id, attrs) => {
      const e = EVIDENCE[id];
      if (!e) return "";
      const tag = attrs ? "button" : "div";
      const inner =
        e.kind === "post"
          ? `<span class="ev-thumb" style="background-image:url('${esc(e.img)}')"></span><span class="ev-txt"><b>${esc(e.title)}</b><span class="ev-body">${esc(e.body)}</span><span class="ev-note">${esc(e.note)}</span></span>`
          : e.kind === "system"
          ? `<b>${esc(e.title)}</b><span class="ev-bar">${esc(e.body)}</span><span class="ev-note">${esc(e.note)}</span>`
          : `<b>${esc(e.title)}</b><span class="ev-bubble">${esc(e.body)}</span><span class="ev-note">${esc(e.note)}</span>`;
      return `<${tag} class="clip ev ev-${esc(e.kind)}"${attrs || ""}>${inner}</${tag}>`;
    };

    // Questions: solved ones ticked with their conclusion; the first open one expanded,
    // with its pinned card and the player's other cards to answer it with.
    const qs = shownQuestions();
    const active = qs.find((q) => !solved(q));
    const questions = qs
      .map((q) => {
        if (solved(q)) {
          return `<div class="q done"><div class="q-head">✓ ${esc(q.question)}</div><div class="q-found">${esc(q.text)}</div></div>`;
        }
        if (q !== active) return `<div class="q"><div class="q-head">○ ${esc(q.question)}</div></div>`;
        const options = State.saved.filter((id) => id !== q.anchor);
        const canAnswer = options.some((id) => q.answers.indexOf(id) !== -1);
        const hint = State.notesHint && State.notesHint.q === q.id ? State.notesHint.text : !canAnswer ? q.missing : "";
        return `
          <div class="q open">
            <div class="q-head">○ ${esc(q.question)}</div>
            <div class="q-label">${esc(N.startFrom)}</div>
            <div class="clips pinned">${card(q.anchor)}</div>
            ${options.length ? `<div class="q-label">${esc(N.whichAnswers)}</div>` : ""}
            <div class="clips">${options
              .map((id) => card(id, ` data-act="answer" data-q="${esc(q.id)}" data-id="${esc(id)}"`))
              .join("")}</div>
            ${hint ? `<p class="q-hint">${esc(hint)}</p>` : ""}
          </div>`;
      })
      .join("");

    // Everything kept from Orbit, for reference, when no question is asking for it.
    const kept = active
      ? ""
      : `<section>
           <h3>${esc(N.saved)}</h3>
           ${State.saved.length ? `<div class="clips">${State.saved.map((id) => card(id)).join("")}</div>` : `<p class="nb-help">${esc(N.empty)}</p>`}
         </section>`;

    const know = State.deductions.length
      ? State.deductions
          .map((id) => `<li>${esc(PAIRS.find((p) => p.id === id).text)}</li>`)
          .join("")
      : `<li class="muted">${esc(N.knowEmpty)}</li>`;

    // The player's own goals: done ones ticked, the next one open, later ones not shown yet.
    let goals = "";
    for (const g of N.goals) {
      const done = g.doneBy && State.deductions.indexOf(g.doneBy) !== -1;
      goals += `<div class="goal${done ? " done" : ""}">${done ? "✓" : "○"} ${esc(g.text)}</div>`;
      if (!done) break;
    }
    // The script's current step sits above the player's own goals (not when a question below says the same).
    const waitingOnQuestion = State.waiting && active && active.opensWhen.waiting === State.waiting.until;
    const showTodo = State.waiting && !waitingOnQuestion && !(active && State.waiting.until === "deduction:" + active.id);
    const todo = `<section class="nb-next">
           <h3>${esc(N.todo)}</h3>
           ${showTodo ? `<div class="todo">○ ${esc(State.waiting.hint)}</div>` : ""}
           ${goals}
         </section>`;

    const flash = State.notesFlash ? `<div class="q-flash">${esc(State.notesFlash)}</div>` : "";

    return `
      <div class="notes-top"><h2>${esc(N.title)}</h2></div>
      <div class="body notes" id="nbscroll">
        ${todo}
        ${State.ended && !State.finale ? `<section class="tonight">
             <h3>${esc(REPLAY.title)}</h3>
             <p>${esc(REPLAY.notesIntro)}</p>
             <button class="nb-btn" data-act="replay-start">${esc(REPLAY.notesButton)}</button>
           </section>` : ""}
        ${qs.length ? `<section><h3>${esc(N.questions)}</h3>${flash}${questions}</section>` : ""}
        ${kept}
        <section>
          <h3>${esc(N.know)}</h3>
          <ul class="know">${know}</ul>
        </section>
        <section class="ownnote">
          <h3>${esc(N.ownNote.when)}</h3>
          <p>${esc(N.ownNote.text)}</p>
        </section>
      </div>`;
  }

  // The phone's home bar, under every app: tap or swipe up for the home screen.
  // The first time there's something in Notes the player hasn't seen, a tip sits above it.
  function homebar() {
    if (State.view === "lock" || State.view === "home") return "";
    const coach =
      State.view !== "notes" && unreadTodo()
        ? `<div class="homecoach">${esc(ONBOARDING.coachHome)}</div>`
        : "";
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
          <ul class="endlist">${State.deductions
            .map((id) => `<li>${esc(PAIRS.find((x) => x.id === id).text)}</li>`)
            .join("")}</ul>
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
      const rows = Log.rows();
      const c = Replay.counts(rows);
      const U = R.units;
      const vals = {
        told: counted(c.told, U.thing),
        redirected: counted(c.redirected, U.time),
        admitted: counted(c.admitted, U.fact),
        minutes: counted(Replay.minutes(rows), U.minute),
      };
      const lines = R.summaryLines
        .filter((l) => !(l.indexOf("{admitted}") !== -1 && !c.admitted) && !(l.indexOf("{redirected}") !== -1 && !c.redirected))
        .map((l) => l.replace(/\{(\w+)\}/g, (x, k) => vals[k]));
      const answer = R.answers.find((a) => a.id === r.overall);
      content = `
        <div class="replay">
          <p class="rctx left">${esc(R.youThink.replace("{answer}", answer ? answer.text : ""))}</p>
          <h2>${esc(R.summaryTitle)}</h2>
          ${lines.map((l) => `<p class="rline">${esc(l)}</p>`).join("")}
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
      go("lock", "leave");
      setTimeout(() => {
        State.notice = { text: ch.reply };
        logJuno(ch.reply, null, null, "notification", "retain");
        render();
      }, 2500);
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
      State.finaleDone = true;
      render();
    }, typingDelay(ch.reply));
  }

  function showEndPage() {
    State.notice = null;
    State.replay.finished = true;
    go("replay", "ending");
  }

  /* ---------------- chrome ---------------- */

  // iOS layout: top-level screens get a large title; pushed screens a centred title with a back chevron.
  function topbar(title, sub, back) {
    if (!back) return `<div class="topbar large"><h1>${esc(title)}</h1></div>`;
    return `
      <div class="topbar">
        <button class="back" data-act="back" aria-label="Back">${ICONS.back}</button>
        <div class="tb-title">
          <h1>${esc(title)}</h1>
          ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
        </div>
        ${
          State.view === "juno"
            ? '<button class="leave" data-act="leave">Leave</button>'
            : State.view === "rachel"
            ? '<button class="leave" data-act="profile">Profile</button>'
            : ""
        }
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
      signin: viewSignin,
    };
    // The whole screen is rebuilt on every render, so remember where scrollable panes were.
    const oldHistory = document.getElementById("history");
    const keptScroll = oldHistory ? oldHistory.scrollTop : null;
    const oldNb = document.getElementById("nbscroll");
    const keptNb = oldNb ? oldNb.scrollTop : 0;

    app.innerHTML =
      statusbar() +
      (views[State.view] || viewChats)() +
      homebar() +
      (State.toast ? `<div class="toast on">${esc(State.toast)}</div>` : "") +
      (State.banner && State.view !== State.banner.from && State.view !== "lock"
        ? `<div class="banner${State.banner.fresh ? " enter" : ""}">
             <button class="banner-open" data-act="open-banner">
               <div class="av sm av-${esc(State.banner.from)}">${State.banner.from === "rachel" ? "R" : "J"}</div>
               <div><b>${State.banner.from === "rachel" ? "Rachel" : "Juno"} · ${esc(State.banner.time)}</b><div class="msg">${esc(State.banner.text)}</div></div>
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

    const entry = document.getElementById("entry");
    if (entry && State.awaiting) entry.focus({ preventScroll: true });
  }

  /* ---------------- events ---------------- */

  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    const id = el.dataset.id;

    switch (act) {
      case "open-banner": {
        const from = State.banner ? State.banner.from : "juno";
        State.banner = null;
        if (from === "rachel") go("rachel", "banner");
        else {
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
        State.onboarded = true;
        if (!State.name) {
          go("signin", "notification"); // Orbit asks what Juno should call you, once
          break;
        }
        go("juno", "notification");
        runScript();
        break;
      case "set-name":
        setName();
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
        go(State.view === "profile" ? "rachel" : State.view === "replay" ? "notes" : "chats", "back");
        break;
      case "profile":
        go("profile");
        break;
      case "retry-profile":
        refreshProfile();
        break;
      case "post":
        State.openPost = State.openPost === id ? null : id;
        render();
        break;
      case "close-post":
        State.openPost = null;
        render();
        break;
      case "save":
        saveCard(id);
        break;
      case "answer":
        answerQuestion(el.dataset.q, id);
        break;
      case "say":
        playerSays(el.dataset.text, "chip");
        break;
      case "send": {
        const input = document.getElementById("entry");
        if (input && input.value.trim()) playerSays(input.value.trim(), "typed");
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

  // Waiting on the lock screen: Juno writes again, once (a nudge that is also Juno being Juno).
  setTimeout(() => {
    if (State.view === "lock" && State.notice && !State.onboarded && !State.noticeExtra) {
      State.noticeExtra = ONBOARDING.lockNudge;
      Sound.play("juno");
      render();
    }
  }, 20000);

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
    const nameIn = document.getElementById("nameentry");
    if (nameIn && document.activeElement === nameIn) return setName();
    const rIn = document.getElementById("rentry");
    if (rIn && document.activeElement === rIn) return sendRachel();
    const input = document.getElementById("entry");
    if (input && document.activeElement === input && input.value.trim()) {
      playerSays(input.value.trim(), "typed");
    }
  });

  render();
})();
