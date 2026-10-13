/* Sound and haptics. Every sound is synthesised in the browser (Web Audio), so there are no audio
   files to load. Sound.play(name) never throws; it does nothing until the player's first tap
   (browsers only allow audio after one), or where Web Audio isn't available.

   notify     a notification from Rachel or the phone: two soft bright notes
   juno       Juno's own sound: a low, slow, rounded tone (players learn to recognise it)
   message    a message arriving in an open thread: one short tick
   send       the player sends something
   snap       evidence locks into place in Notes
   miss       a wrong pick: a soft muted thud
   deleted    the account is gone: a low falling tone
   undelivered  a message that doesn't arrive

   PLACEHOLDER sounds (Claude Code, 2026-10-13) until the author's sound design. */

const Sound = (function () {
  "use strict";
  let ctx = null;

  function unlock() {
    try {
      if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
    } catch (e) {}
  }
  document.addEventListener("pointerdown", unlock, { capture: true });
  document.addEventListener("keydown", unlock, { capture: true });

  // One enveloped tone: frequency (Hz, or [from, to] for a glide), start offset, length, volume, wave.
  function tone(freq, at, len, vol, type) {
    const t = ctx.currentTime + (at || 0);
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type || "sine";
    if (Array.isArray(freq)) {
      o.frequency.setValueAtTime(freq[0], t);
      o.frequency.exponentialRampToValueAtTime(freq[1], t + len);
    } else o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + len + 0.05);
  }

  const SOUNDS = {
    notify: () => { tone(1318, 0, 0.18, 0.07); tone(1760, 0.11, 0.26, 0.06); },
    juno: () => { tone(330, 0, 0.55, 0.09); tone(494, 0.06, 0.6, 0.05); tone([660, 640], 0.12, 0.5, 0.03); },
    message: () => tone(1046, 0, 0.09, 0.04, "triangle"),
    send: () => tone([700, 1100], 0, 0.12, 0.05),
    snap: () => { tone(880, 0, 0.06, 0.06, "triangle"); tone(1318, 0.05, 0.16, 0.05, "triangle"); },
    miss: () => tone([220, 160], 0, 0.18, 0.06, "triangle"),
    deleted: () => { tone([196, 98], 0, 1.2, 0.09); tone([147, 73], 0.08, 1.3, 0.05, "triangle"); },
    undelivered: () => { tone(392, 0, 0.12, 0.06, "triangle"); tone(330, 0.13, 0.22, 0.06, "triangle"); },
  };
  const BUZZ = { deleted: [30, 60, 30], undelivered: [20], snap: [12], miss: [8] };

  function play(name) {
    try {
      if (BUZZ[name] && navigator.vibrate) navigator.vibrate(BUZZ[name]); // Android; iPhone browsers ignore it
      if (!ctx || ctx.state !== "running" || !SOUNDS[name]) return;
      SOUNDS[name]();
    } catch (e) {}
  }

  return { play: play };
})();
