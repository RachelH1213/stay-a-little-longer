/* Orbit — app shell.
   Everything renders from State. Nothing else writes to the DOM.
   The model slots in at one place: a `juno` step with an `intent` asks api/reply for its
   words (fetchLine). Any failure falls back to the step's hardcoded `text`. */

(function () {
  "use strict";

  const MODEL_TIMEOUT_MS = 8000;     // give up on the model and show the scripted line (was 4000; z.ai was slower)
  const MIN_TYPING_MS = 700;         // Juno always "types" at least this long
  const TYPING_MS_PER_CHAR = 22;     // ...plus this much per character
  const MAX_EXTRA_TYPING_MS = 1400;  // ...up to this much extra
  const READ_PAUSE_MS = 600;         // after each Juno line, a pause before anything else happens...
  const READ_MS_PER_CHAR = 25;       // ...longer for longer lines, so the player has time to read...
  const MAX_EXTRA_READ_MS = 1600;    // ...up to this much extra
  const RECENT_TURNS = 6;            // how much of the thread the model gets to see

  const app = document.getElementById("app");

  // Screens that belong to the phone, not to Orbit. Everything else is inside Orbit.
  const PHONE_VIEWS = ["lock", "home", "notes"];

  const State = {
    view: "lock",          // lock | home | notes (the phone) | chats | juno | rachel | dani | profile | settings | replay (Orbit)
    orbitView: "chats",    // where Orbit reopens from the home screen, like any app
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
    notice: { text: "you up?" }, // notification on the lock screen, or null
    junoUnread: true,      // dot on Juno's row in Chats
    replay: null,          // the look-back: {intro, items, i, guesses[], done}
    bridgedStep: -1,       // the player step Juno already answered off-script once (see playerSays)
    sentWhileAway: false,  // Juno already sent one line while the player was on another screen
    heldForReturn: false,  // the script is waiting for the player to come back to Juno's thread
    banner: null,          // {text}: a notification from Juno at the top of the screen, outside Juno's thread
    onboarded: false,      // the player has opened the app once (the lock screen's older notices go)
    clipsSeen: 0,          // items the player has seen in Notes (the rest count on its icon badge)
    todoSeen: null,        // the to-do (State.waiting.hint) last seen in Notes
    comparedOnce: false,   // the player has used Compare at least once
    clock: "23:31",        // lock-screen time; moves forward with Juno's memory timestamps
    presenter: /[?&]director\b/.test(location.search), // index.html?director shows the Director's choices
    memories: MEMORIES_DAY1.slice(),
    flags: {
      sawRachelReply: false,
      rachelNotified: false,   // Rachel's reply arrived as a banner; unread until her chat is opened
      profileTried: false,
      deletedFound: false,
    },
    selection: [],         // up to two cards selected on the board
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
    if (PHONE_VIEWS.indexOf(view) === -1) State.orbitView = view;
    if (view === "notes") {
      State.clipsSeen = State.saved.length;
      State.todoSeen = State.waiting ? State.waiting.hint : null;
    }
    State.selection = [];
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
    State.banner = { text: text, from: from || "juno", time: time || "now" };
    render();
    clearTimeout(banner._t);
    banner._t = setTimeout(() => {
      State.banner = null;
      render();
    }, 4000);
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
      toast(ONBOARDING.clipped);
    }
    render();
  }

  // Badge on the Notes icon: new items, plus a to-do the player hasn't read yet.
  function notesBadge() {
    const todo = State.waiting && State.todoSeen !== State.waiting.hint ? 1 : 0;
    return Math.max(0, State.saved.length - State.clipsSeen) + todo;
  }

  function openOrbit() {
    if (State.orbitView === "juno") {
      go("juno", "home");
      runScript();
    } else go(State.orbitView || "chats", "home");
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
      if (State.view === "lock") State.notice = { text: text };
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
        fetchLine(step, plan).then((generated) => {
          const text = generated || (plan ? plan.fallback : step.text);
          if (plan) {
            console.info(`[juno] ${plan.intent} (${plan.rule}) · ${generated ? "model" : "fallback"}: ${text}`);
          }
          const left = typingDelay(text) - (Date.now() - started);
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
        State.waiting = { hint: step.hint, until: step.until };
        render();
        checkWaiting(); // the player may have done it already
        return;

      case "end":
        State.ended = true;
        State.log.push({ from: "system", text: step.text });
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

  function toggleSelect(id) {
    const i = State.selection.indexOf(id);
    if (i !== -1) State.selection.splice(i, 1);
    else if (State.selection.length < 2) State.selection.push(id);
    render();
  }

  function connect() {
    const [a, b] = State.selection;
    const hit = PAIRS.find(
      (p) => p.cards.indexOf(a) !== -1 && p.cards.indexOf(b) !== -1
    );
    State.selection = [];
    State.comparedOnce = true;
    if (!hit) {
      toast(ONBOARDING.notes.noMatch);
      render();
      return;
    }
    if (State.deductions.indexOf(hit.id) === -1) State.deductions.push(hit.id);
    render();
    checkWaiting();
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
        <div class="t">${esc(State.clock)}</div>
        <div class="d">${esc(ONBOARDING.home.date)}</div>
        ${
          State.notice
            ? `<button class="notif" data-act="open-notice">
                 <div class="av sm av-juno">J</div>
                 <div><b>Orbit · Juno · now</b><div class="msg">${esc(State.notice.text)}</div></div>
               </button>
               ${State.onboarded ? "" : pastNotices()}
               <div class="hint">Tap the notification</div>`
            : `<button class="hint" data-act="unlock">${esc(LEAVING.unlockLabel)}</button>`
        }
      </div>`;
  }

  function chatRow(c) {
    return `
      <button class="row" data-act="open" data-id="${esc(c.id)}">
        <div class="av av-${esc(c.avatar)}">${esc(c.name[0])}</div>
        <div class="meta">
          <div class="nm"><b>${esc(c.name)}</b><span>${esc(c.handle)}</span></div>
          <div class="pv">${esc(c.preview)}</div>
        </div>
        <div class="rt">${esc(c.time)}</div>
        ${c.unread ? '<div class="dot"></div>' : ""}
      </button>`;
  }

  // Juno's row reflects the actual thread: last message and unread dot.
  function liveRow(c) {
    if (c.id === "rachel") return Object.assign({}, c, { unread: State.flags.rachelNotified && !State.flags.sawRachelReply });
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
      ? '<div class="dots" aria-label="Juno is typing"><i></i><i></i><i></i></div>'
      : "";
    // What to do next lives in the player's Notes app, not in Juno's thread.
    const hint = State.ended
      ? `<button class="hintcard" data-act="replay-start">${esc(REPLAY.entryLabel)}</button>`
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
      ${topbar("Juno", State.typing ? "typing…" : "online", true)}
      <div class="body" id="scroller">
        <div class="msgs">
          <div class="daymark">Today</div>
          ${msgs}${typing}${hint}
        </div>
      </div>
      <div class="composer">
        ${chips}
        <div class="inputrow">
          <input id="entry" placeholder="${State.awaiting ? "Message Juno" : "…"}"
                 ${State.awaiting ? "" : "disabled"} autocomplete="off" aria-label="Message Juno">
          <button class="send" data-act="send" aria-label="Send">↑</button>
        </div>
      </div>`;
  }

  function viewRachel() {
    const rows = [];
    let lastDay = "";
    RACHEL_HISTORY.forEach((m, i) => {
      if (m.day !== lastDay) {
        rows.push(`<div class="daymark">${esc(m.day)}</div>`);
        lastDay = m.day;
      }
      const cls = m.from === "me" ? "me" : "them";
      const saveId = m.suspect ? "reply-today" : i === 6 ? "old-dms" : null;
      const time = m.time ? `<span class="time">${esc(m.time)}</span>` : "";
      // The message the story needs pulses until it's saved; the very first time, a tip says why.
      const key = m.suspect && !isSaved(saveId);
      rows.push(
        `<div class="bub ${cls}${saveId ? " saveable" : ""}">${esc(m.text)}${time}${
          saveId
            ? `<button class="save${isSaved(saveId) ? " on" : ""}${key ? " pulse" : ""}" data-act="save" data-id="${saveId}" aria-label="${esc(ONBOARDING.clipLabel)}">${ONBOARDING.clip}</button>`
            : ""
        }</div>`
      );
      if (key && !State.saved.length) rows.push(`<div class="coach">${esc(ONBOARDING.coachClip)}</div>`);
    });

    return `
      ${topbar("Rachel", "@rach_who", true)}
      <div class="body" id="history"><div class="msgs">${rows.join("")}</div></div>
      <div class="composer">
        <div class="inputrow">
          <input placeholder="Message Rachel" disabled aria-label="Message Rachel">
          <button class="send" aria-label="Send" disabled>↑</button>
        </div>
      </div>`;
  }

  function viewDani() {
    return `
      ${topbar("Dani", "@danisaurus", true)}
      <div class="body"><div class="msgs">
        <div class="daymark">Tuesday</div>
        <div class="bub them">ok weird question\nhas juno asked you about rachel</div>
        <div class="bub me">not yet. why</div>
        <div class="bub them">no reason\nnevermind</div>
        <div class="sys">Dani's thread opens properly on Day 2 of the full build.</div>
      </div></div>`;
  }

  function viewProfile() {
    const p = RACHEL_PROFILE;
    let content;

    if (!State.flags.profileTried) {
      content = `
        <div class="failstate">
          <div class="big">Couldn't load this profile</div>
          <div>Check your connection and try again.</div>
          <button class="pill primary" data-act="retry-profile">Try again</button>
        </div>`;
    } else {
      content = `
        <div class="deleted">
          This account has been deleted.
          <button class="save${isSaved("profile-deleted") ? " on" : " pulse"}" data-act="save" data-id="profile-deleted"
                  style="position:static;margin-left:8px;display:inline-grid" aria-label="${esc(ONBOARDING.clipLabel)}">${ONBOARDING.clip}</button>
        </div>
        <div class="grid">
          ${p.posts
            .map(
              (post) => `
            <button class="post art-${esc(post.art)}" data-act="post" data-id="${esc(post.id)}">
              <span class="cap">${esc(post.caption)} · ${esc(post.date)}</span>
            </button>`
            )
            .join("")}
        </div>
        <div class="listnote">Posts stay visible for 30 days after an account is removed.</div>`;
    }

    const overlay =
      State.openPost === "p1"
        ? `<div class="deduction" style="margin:14px">
             <span class="label">Post · Sep 20</span>
             <div>“quiet”</div>
             <div style="font-size:12px;color:#a9a49a">Posted two days after this account was deleted.</div>
             <div style="display:flex;gap:8px;margin-top:6px">
               <button class="save inline${isSaved("post-bench") ? " on" : ""}" data-act="save" data-id="post-bench" aria-label="${esc(ONBOARDING.clipLabel)}">${ONBOARDING.clip}</button>
               <button class="pill" data-act="close-post" style="color:#f3f1ec;border-color:#4a4843">Close</button>
             </div>
           </div>`
        : "";

    return `
      ${topbar("Profile", "", true)}
      <div class="body">
        <div class="profile">
          <div class="av av-rachel">R</div>
          <h2>${esc(p.name)}</h2>
          <div class="handle">${esc(p.handle)}</div>
          <div class="bio">${esc(p.bio)}</div>
          <div class="joined">${esc(p.joined)}</div>
          <div class="pactions">
            <button class="pill" disabled>Message</button>
            <button class="pill" disabled>Call</button>
          </div>
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
        <div class="home-clock"><div class="t">${esc(State.clock)}</div><div class="d">${esc(H.date)}</div></div>
        <div class="apps">
          ${icon("open-orbit", "ic-orbit", "◎", H.orbit, orbitBadge)}
          ${icon("open-notes", "ic-notes", "", H.notes, notes)}
        </div>
      </div>`;
  }

  // The player's Notes app: the to-do, what they kept from Orbit, comparing, what they know.
  function viewNotes() {
    const N = ONBOARDING.notes;
    const cards = State.saved
      .map((id) => {
        const e = EVIDENCE[id];
        if (!e) return "";
        const on = State.selection.indexOf(id) !== -1;
        return `
          <button class="clip ${e.kind === "system" ? "system" : ""}" aria-pressed="${on}"
                  data-act="select" data-id="${esc(id)}">
            <b>${esc(e.title)}</b>
            <div class="body">${esc(e.body)}</div>
            <div class="note">${esc(e.note)}</div>
          </button>`;
      })
      .join("");

    const know = State.deductions.length
      ? State.deductions
          .map((id) => `<li>${esc(PAIRS.find((p) => p.id === id).text)}</li>`)
          .join("")
      : `<li class="muted">${esc(N.knowEmpty)}</li>`;

    const help = !State.saved.length
      ? N.empty
      : State.saved.length === 1
      ? N.needTwo
      : State.selection.length === 1
      ? N.picked
      : N.pick;

    const compareBtn =
      State.selection.length === 2
        ? `<button class="nb-btn${State.comparedOnce ? "" : " pulse"}" data-act="connect">${esc(N.compare)}</button>`
        : "";

    const todo = State.waiting
      ? `<section class="nb-next">
           <h3>${esc(N.todo)}</h3>
           <div class="todo">○ ${esc(State.waiting.hint)}</div>
         </section>`
      : "";

    return `
      <div class="notes-top"><h2>${esc(N.title)}</h2></div>
      <div class="body notes" id="nbscroll">
        ${todo}
        <section>
          <h3>${esc(N.saved)}</h3>
          <p class="nb-help">${esc(help)}</p>
          <div class="clips">${cards}</div>
          ${compareBtn}
        </section>
        <section>
          <h3>${esc(N.know)}</h3>
          <ul class="know">${know}</ul>
        </section>
      </div>`;
  }

  // The phone's home bar, under every app: tap or swipe up for the home screen.
  // The first time there's something in Notes the player hasn't seen, a tip sits above it.
  function homebar() {
    if (State.view === "lock" || State.view === "home") return "";
    const coach =
      State.view !== "notes" && State.waiting && notesBadge() > 0
        ? `<div class="homecoach">${esc(ONBOARDING.coachHome)}</div>`
        : "";
    return `${coach}<button class="homebar" data-act="home" aria-label="Home"><i></i></button>`;
  }

  function viewSettings() {
    const mems = State.memories
      .map(
        (m) => `<div class="item"><span>${esc(m.text)}</span><span class="t">${esc(m.time)}</span></div>`
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

  function meaningOf(intent) {
    return REPLAY.meaning[intent] || { side: "keeping", label: intent };
  }

  function viewReplay() {
    const r = State.replay;
    const s = Replay.summary(Log.rows());
    let content;

    if (!r.items.length) {
      content = `<div class="empty">${esc(REPLAY.empty)}</div>`;
    } else if (r.intro) {
      content = `
        <div class="replay">
          <h2>${esc(REPLAY.introTitle)}</h2>
          <p class="rintro">${esc(REPLAY.introBody)}</p>
          <button class="pill primary" data-act="replay-begin">${esc(REPLAY.start)}</button>
        </div>`;
    } else if (r.done) {
      const leaving = REPLAY.summaryLeaving
        .replace("{exits}", Replay.times(s.exits))
        .replace("{notified}", Replay.times(s.notified))
        .replace("{returned}", Replay.times(s.returned));
      // Of the lines where Juno was keeping the player, how many did they believe?
      const keeping = r.items.map((it, k) => k).filter((k) => meaningOf(r.items[k].intent).side === "keeping");
      const believedLine = REPLAY.summaryBelieved
        .replace("{keeping}", keeping.length)
        .replace("{total}", r.items.length)
        .replace("{believed}", keeping.filter((k) => r.guesses[k] === "believed").length);
      content = `
        <div class="replay">
          <h2>${esc(REPLAY.summaryTitle)}</h2>
          ${r.items
            .map((item, k) => {
              const m = meaningOf(item.intent);
              return `
                <div class="rsum">
                  <div class="bub them">${esc(item.reply)}</div>
                  <div class="note"><b class="${esc(m.side)}">${esc(REPLAY.sides[m.side])}</b> · ${esc(m.label)} · ${esc(REPLAY.youSaid)} ${esc(REPLAY.answers[r.guesses[k]] || "")}</div>
                </div>`;
            })
            .join("")}
          ${keeping.length ? `<p class="rleave">${esc(believedLine)}</p>` : ""}
          ${s.exits ? `<p class="rleave">${esc(leaving)}</p>` : ""}
          <button class="pill primary" data-act="replay-close">${esc(REPLAY.finish)}</button>
        </div>`;
    } else {
      const item = r.items[r.i];
      const guess = r.guesses[r.i];
      const m = meaningOf(item.intent);
      const last = r.i === r.items.length - 1;
      const ctx = item.context || {};
      const before = ctx.said
        ? `<div class="rctx">${esc(REPLAY.youWrote)}</div><div class="bub me">${esc(ctx.said)}</div>`
        : ctx.left
        ? `<div class="rctx">${esc(REPLAY.youLeft)}</div>`
        : "";
      content = `
        <div class="replay">
          ${before}
          <div class="bub them">${esc(item.reply)}</div>
          ${
            guess
              ? `<div class="reveal ${esc(m.side)}">
                   <b>${esc(REPLAY.sides[m.side])}</b>
                   <span>${esc(REPLAY.revealPrefix)} ${esc(m.label)}</span>
                   <span class="note">${esc(REPLAY.youSaid)} ${esc(REPLAY.answers[guess])}</span>
                 </div>
                 <button class="pill primary" data-act="replay-next">${esc(last ? REPLAY.finish : REPLAY.next)}</button>`
              : `<div class="rq">${esc(REPLAY.questionLong)}</div>
                 <div class="ranswers">
                   <button class="pill" data-act="replay-answer" data-id="believed">${esc(REPLAY.answers.believed)}</button>
                   <button class="pill" data-act="replay-answer" data-id="doubted">${esc(REPLAY.answers.doubted)}</button>
                 </div>`
          }
        </div>`;
    }

    const sub = r.items.length && !r.done && !r.intro ? `${r.i + 1} / ${r.items.length}` : "";
    return `${topbar(REPLAY.title, sub, true)}<div class="body">${content}</div>`;
  }

  /* ---------------- chrome ---------------- */

  function topbar(title, sub, back) {
    return `
      <div class="topbar">
        ${back ? '<button class="back" data-act="back" aria-label="Back">‹</button>' : ""}
        <div>
          <h1>${esc(title)}</h1>
          ${sub ? `<div class="sub">${esc(sub)}</div>` : ""}
        </div>
        <div class="spacer"></div>
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
        <span class="glyph">${glyph}</span>${label}
      </button>`;
    return `<div class="tabbar">
      ${tab("chats", "◎", "Chats")}
      ${tab("settings", "⚙", "Settings")}
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
    };
    // The whole screen is rebuilt on every render, so remember where scrollable panes were.
    const oldHistory = document.getElementById("history");
    const keptScroll = oldHistory ? oldHistory.scrollTop : null;
    const oldNb = document.getElementById("nbscroll");
    const keptNb = oldNb ? oldNb.scrollTop : 0;

    app.innerHTML =
      (views[State.view] || viewChats)() +
      homebar() +
      (State.toast ? `<div class="toast on">${esc(State.toast)}</div>` : "") +
      (State.banner && State.view !== State.banner.from && State.view !== "lock"
        ? `<button class="banner" data-act="open-banner">
             <div class="av sm av-${esc(State.banner.from)}">${State.banner.from === "rachel" ? "R" : "J"}</div>
             <div><b>${State.banner.from === "rachel" ? "Rachel" : "Juno"} · ${esc(State.banner.time)}</b><div class="msg">${esc(State.banner.text)}</div></div>
           </button>`
        : "");

    const nb = document.getElementById("nbscroll");
    if (nb) nb.scrollTop = keptNb;

    // A new screen slides in. Every render rebuilds the screen, so the class must come off again
    // on the next render, or each tap would replay the animation (the "bounce" the author saw).
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
    if (history) history.scrollTop = render._lastView !== "rachel" || keptScroll === null ? history.scrollHeight : keptScroll;
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
      case "open-notice":
        State.notice = null;
        State.onboarded = true;
        go("juno", "notification");
        runScript();
        break;
      case "unlock":
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
        else toast("Not part of this slice");
        break;
      case "tab":
        go(id);
        break;
      case "back":
        go(State.view === "profile" ? "rachel" : "chats", "back");
        break;
      case "profile":
        go("profile");
        break;
      case "retry-profile":
        State.flags.profileTried = true;
        State.flags.deletedFound = true;
        render();
        checkWaiting();
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
      case "select":
        toggleSelect(id);
        break;
      case "connect":
        connect();
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
          const items = Replay.pick(rows, REPLAY.count).map((it) =>
            Object.assign({}, it, { context: Replay.contextFor(rows, it) })
          );
          State.replay = { intro: true, items: items, i: 0, guesses: [], done: false };
        }
        go("replay", "replay");
        break;
      case "replay-answer": {
        const r = State.replay;
        const item = r.items[r.i];
        r.guesses[r.i] = id;
        Log.write({
          kind: "answer",
          step: State.step,
          via: id,
          reply: item.reply,
          intent: item.intent,
          rule: item.rule,
          state: { forTurn: item.turn, side: meaningOf(item.intent).side },
        });
        render();
        break;
      }
      case "replay-begin":
        State.replay.intro = false;
        render();
        break;
      case "replay-next":
        if (State.replay.i < State.replay.items.length - 1) State.replay.i++;
        else State.replay.done = true;
        render();
        break;
      case "replay-close":
        go("chats");
        break;
    }
  });

  // Swiping up on the home bar also goes home, like a phone.
  let swipeFrom = null;
  document.addEventListener("pointerdown", (e) => {
    swipeFrom = e.target.closest(".homebar") ? e.clientY : null;
  });
  document.addEventListener("pointerup", (e) => {
    if (swipeFrom !== null && swipeFrom - e.clientY > 20 && State.view !== "home") go("home", "home");
    swipeFrom = null;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const input = document.getElementById("entry");
    if (input && document.activeElement === input && input.value.trim()) {
      playerSays(input.value.trim(), "typed");
    }
  });

  render();
})();
