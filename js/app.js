/* Orbit — app shell.
   Everything renders from State. Nothing else writes to the DOM.
   The script runner below is where the model will slot in later: `juno` steps become
   {intent, allowedFacts} and the text comes back from the Director + model instead of the file. */

(function () {
  "use strict";

  const app = document.getElementById("app");

  const State = {
    view: "lock",          // lock | chats | juno | rachel | dani | profile | saved | settings
    step: 0,               // position in SCRIPT_DAY2
    log: [],               // messages shown in Juno's thread
    typing: false,
    pending: false,        // a Juno message is on its way; stops the runner re-entering
    awaiting: null,        // {options:[...]} while the script waits for the player
    waiting: null,         // {hint, until} while the script waits for an action elsewhere
    ended: false,
    saved: [],             // evidence ids
    deductions: [],        // deduction ids
    memories: MEMORIES_DAY1.slice(),
    flags: {
      sawRachelReply: false,
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

  function go(view) {
    State.view = view;
    State.selection = [];
    render();
    if (view === "rachel" && !State.flags.sawRachelReply) {
      State.flags.sawRachelReply = true;
      checkWaiting();
    }
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

  function saveCard(id) {
    if (isSaved(id)) {
      State.saved = State.saved.filter((x) => x !== id);
      toast("Removed from Saved");
    } else {
      State.saved.push(id);
      toast("Saved");
    }
    render();
  }

  /* ---------------- script runner ---------------- */

  function currentStep() {
    return SCRIPT_DAY2[State.step];
  }

  function pushJuno(text) {
    State.log.push({ from: "juno", text: text });
  }

  function runScript() {
    if (State.awaiting || State.waiting || State.ended || State.pending) return;
    const step = currentStep();
    if (!step) return;

    switch (step.type) {
      case "juno":
        State.typing = true;
        State.pending = true;
        render();
        setTimeout(() => {
          State.typing = false;
          State.pending = false;
          pushJuno(step.text);
          State.step++;
          render();
          runScript();
        }, 700 + Math.min(step.text.length * 22, 1400));
        return;

      case "memory":
        State.memories.push({ text: step.text, time: step.time });
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

  function playerSays(text) {
    if (!State.awaiting) return;
    State.log.push({ from: "me", text: text });
    State.awaiting = null;
    State.step++;
    render();
    runScript();
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
    if (!hit) {
      toast("Those two don't say anything together");
      render();
      return;
    }
    if (State.deductions.indexOf(hit.id) === -1) State.deductions.push(hit.id);
    render();
    checkWaiting();
  }

  /* ---------------- views ---------------- */

  function viewLock() {
    return `
      <div class="lock">
        <div class="t">23:31</div>
        <div class="d">Tuesday, 23 September</div>
        <button class="notif" data-act="open-juno">
          <div class="av sm av-juno">J</div>
          <div><b>Orbit · Juno · now</b><div class="msg">you up?</div></div>
        </button>
        <div class="hint">Tap the notification</div>
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

  function viewChats() {
    return `
      ${topbar("Chats", "", false)}
      <div class="body">
        ${CONTACTS.map(chatRow).join("")}
        <div class="listnote">Juno introduced you to 4 of the people in this list.</div>
      </div>
      ${tabbar("chats")}`;
  }

  function bubble(m) {
    if (m.from === "system") return `<div class="sys">${esc(m.text)}</div>`;
    const cls = m.from === "me" ? "me" : "them";
    return `<div class="bub ${cls}">${esc(m.text)}</div>`;
  }

  function viewJuno() {
    const msgs = State.log.map(bubble).join("");
    const typing = State.typing
      ? '<div class="dots" aria-label="Juno is typing"><i></i><i></i><i></i></div>'
      : "";
    const hint = State.waiting
      ? `<button class="hintcard" data-act="hint">${esc(State.waiting.hint)}</button>`
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
      rows.push(
        `<div class="bub ${cls}${saveId ? " saveable" : ""}">${esc(m.text)}${time}${
          saveId
            ? `<button class="save${isSaved(saveId) ? " on" : ""}" data-act="save" data-id="${saveId}" aria-label="Save to Saved">⚑</button>`
            : ""
        }</div>`
      );
    });

    return `
      ${topbar("Rachel", "@rach_who", true)}
      <div class="body"><div class="msgs">${rows.join("")}</div></div>
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
          <button class="save${isSaved("profile-deleted") ? " on" : ""}" data-act="save" data-id="profile-deleted"
                  style="position:static;margin-left:8px;display:inline-grid" aria-label="Save to Saved">⚑</button>
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
               <button class="pill primary" data-act="save" data-id="post-bench">${isSaved("post-bench") ? "Saved" : "Save this"}</button>
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

  function viewSaved() {
    const cards = State.saved
      .map((id) => {
        const e = EVIDENCE[id];
        if (!e) return "";
        const on = State.selection.indexOf(id) !== -1;
        return `
          <button class="card ${e.kind === "system" ? "system" : ""}" aria-pressed="${on}"
                  data-act="select" data-id="${esc(id)}">
            <b>${esc(e.title)}</b>
            <div class="body">${esc(e.body)}</div>
            <div class="note">${esc(e.note)}</div>
          </button>`;
      })
      .join("");

    const deductions = State.deductions
      .map((id) => {
        const d = PAIRS.find((p) => p.id === id);
        return `<div class="deduction"><span class="label">Noted</span><div>${esc(d.text)}</div></div>`;
      })
      .join("");

    const connectBtn =
      State.selection.length === 2
        ? `<button class="pill primary" data-act="connect" style="align-self:center">Put these together</button>`
        : "";

    const empty = !State.saved.length
      ? `<div class="empty">Nothing saved yet.<br>Hold the flag icon on a message or a screen to keep it here.</div>`
      : "";

    return `
      ${topbar("Saved", State.selection.length ? "Pick two, then connect them" : "", false)}
      <div class="body">
        <div class="cards">${empty}${cards}${connectBtn}${deductions}</div>
      </div>
      ${tabbar("saved")}`;
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
        ${id === "saved" && State.saved.length ? `<span class="badge">${State.saved.length}</span>` : ""}
      </button>`;
    return `<div class="tabbar">
      ${tab("chats", "◎", "Chats")}
      ${tab("saved", "⚑", "Saved")}
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
      saved: viewSaved,
      settings: viewSettings,
    };
    app.innerHTML =
      (views[State.view] || viewChats)() +
      (State.toast ? `<div class="toast on">${esc(State.toast)}</div>` : "");

    const scroller = document.getElementById("scroller");
    if (scroller) scroller.scrollTop = scroller.scrollHeight;

    const entry = document.getElementById("entry");
    if (entry && State.awaiting) entry.focus({ preventScroll: true });
  }

  /* ---------------- events ---------------- */

  app.addEventListener("click", (e) => {
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    const id = el.dataset.id;

    switch (act) {
      case "open-juno":
        go("juno");
        runScript();
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
        go(State.view === "profile" ? "rachel" : "chats");
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
        playerSays(el.dataset.text);
        break;
      case "send": {
        const input = document.getElementById("entry");
        if (input && input.value.trim()) playerSays(input.value.trim());
        break;
      }
      case "hint": {
        const until = State.waiting ? State.waiting.until : "";
        if (until.indexOf("deduction:") === 0) go("saved");
        else if (until === "deletedFound") go("profile");
        else go("rachel");
        break;
      }
      case "leave":
        go("chats");
        toast("Juno is still typing…");
        break;
    }
  });

  app.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const input = document.getElementById("entry");
    if (input && document.activeElement === input && input.value.trim()) {
      playerSays(input.value.trim());
    }
  });

  render();
})();
