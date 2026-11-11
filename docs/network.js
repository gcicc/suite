/* RANGER network chrome — masthead, footer, favicon and title for one section.
 *
 * Include on any section page:
 *   <link rel="stylesheet" href="https://gcicc.github.io/suite/network.css">
 *   <script src="https://gcicc.github.io/suite/network.js" data-section="hangar"
 *           data-built="2026-11-11 18:00 UTC" data-next="every 2h" defer></script>
 *
 * The registry below is generated from suite.json by build.py — edit suite.json,
 * never this block. If this script fails to load, the host page is unaffected:
 * the chrome is additive and nothing on the page depends on it.
 */
(function () {
  "use strict";
  var REGISTRY = {"network":"RANGER","tagline":"Reality Against Narrative — Gauged, Evidenced, Recorded","home":"https://gcicc.github.io/suite/","groups":["News","Trackers","Library","Tools"],"sections":[{"id":"grudge","name":"GRUDGE","group":"News","live":true,"sound":"teletype","url":"https://gcicc.github.io/GRUDGE/","purpose":"The tabloid desk: drama-scored headlines, Drudge style.","accent":{"dark":"#ff6b60","light":"#c0392f"}},{"id":"newsscraper","name":"Wire","group":"News","live":true,"sound":"bell","url":"https://gcicc.github.io/newsscraper/","purpose":"Everything on Drudge, Fox and the financial wires, plus headlines by category. No ads.","accent":{"dark":"#8792a8","light":"#5c667a"}},{"id":"hangar","name":"Hangar","group":"Trackers","live":true,"sound":"morse","url":"https://gcicc.github.io/hangar/","purpose":"SpaceX and Tesla: stated targets against the launch and production record.","accent":{"dark":"#3987e5","light":"#2a78d6"}},{"id":"overhang","name":"Overhang","group":"Trackers","live":true,"sound":"morse","url":"https://gcicc.github.io/overhang/","purpose":"AI: what has been claimed against what has been measured.","accent":{"dark":"#d36be0","light":"#9b3aa8"}},{"id":"uplift","name":"Uplift","group":"Trackers","live":true,"sound":"morse","url":"https://gcicc.github.io/uplift/","purpose":"Human enhancement and longevity, through registered clinical trials.","accent":{"dark":"#7fd4e8","light":"#1f7f99"}},{"id":"clintrialist","name":"ClinTrialist","group":"Trackers","live":true,"sound":"morse","url":"https://clintrialist.github.io/clintrialist-report/","purpose":"Daily pharma and biostatistics aggregator.","accent":{"dark":"#2a9d8f","light":"#1d7a6f"}},{"id":"bible-study","name":"Bible Study","group":"Library","live":true,"sound":"none","url":"https://gcicc.github.io/bible-study/","purpose":"Scripture as a network: citations, people, themes and genealogies across fourteen panels.","accent":{"dark":"#b7ae74","light":"#6b6430"}},{"id":"world-history","name":"World History","group":"Library","live":true,"sound":"none","url":"https://gcicc.github.io/world-history/","purpose":"Who and where across history, with the spread of mathematics and statistics.","accent":{"dark":"#9ccc65","light":"#557a1f"}},{"id":"claude-trends","name":"Claude Trends","group":"Tools","live":true,"sound":"morse","url":"https://gcicc.github.io/claude-trends/","purpose":"What is new in how people use Claude, sweep by sweep.","accent":{"dark":"#ffa14a","light":"#b85c00"}},{"id":"teleprompter","name":"Teleprompter","group":"Tools","live":true,"sound":"none","url":"https://gcicc.github.io/pga-teleprompter/","purpose":"Chord sheets and lyrics for 1,215 songs, on stage.","accent":{"dark":"#f2d544","light":"#7d6a00"}},{"id":"keystone","name":"Keystone","group":"Tools","live":true,"sound":"none","url":"https://gcicc.github.io/keystone-apps/","purpose":"The small-apps shelf: timers, simulations and trainers.","accent":{"dark":"#c2557f","light":"#a63d66"}}]};
  if (!REGISTRY) return;

  var me = document.currentScript || document.querySelector("script[data-section]");
  var sectionId = me ? me.getAttribute("data-section") : null;
  var built = me ? me.getAttribute("data-built") : null;
  var next = me ? me.getAttribute("data-next") : null;
  var base = me ? me.src.replace(/network\.js(\?.*)?$/, "") : REGISTRY.home;

  var sections = REGISTRY.sections.filter(function (s) { return s.live || s.id === sectionId; });
  var current = REGISTRY.sections.filter(function (s) { return s.id === sectionId; })[0] || null;

  function el(tag, attrs, text) {
    var node = document.createElement(tag);
    for (var k in attrs) if (Object.prototype.hasOwnProperty.call(attrs, k)) node.setAttribute(k, attrs[k]);
    if (text != null) node.textContent = text;
    return node;
  }

  // The ground the chrome sits on: the host's declared theme if it has one,
  // otherwise the luminance of the host's actual background.
  function hostGround() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t === "light" || t === "dark") return t;
    var probe = [document.body, document.documentElement];
    for (var i = 0; i < probe.length; i++) {
      var m = getComputedStyle(probe[i]).backgroundColor.match(/[\d.]+/g);
      if (m && (m.length < 4 || +m[3] > 0)) {
        var lum = (0.2126 * m[0] + 0.7152 * m[1] + 0.0722 * m[2]) / 255;
        return lum < 0.5 ? "dark" : "light";
      }
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function paint() {
    var ground = hostGround();
    [".net-mast", ".net-foot"].forEach(function (sel) {
      var node = document.querySelector(sel);
      if (!node) return;
      node.classList.toggle("net-on-dark", ground === "dark");
      node.classList.toggle("net-on-light", ground === "light");
    });
    if (current) {
      document.documentElement.style.setProperty("--net-accent", ground === "light" ? current.accent.light : current.accent.dark);
    }
  }

  function stylesheet() {
    // Self-loading, so a host needs one tag — and so embed-resources hosts
    // (Quarto) can use the runtime loader without pandoc inlining a stale copy.
    if (document.querySelector('link[href$="network.css"]')) return;
    document.head.appendChild(el("link", { rel: "stylesheet", href: base + "network.css" }));
  }

  function fonts() {
    if (document.querySelector('link[href*="family=IBM+Plex+Mono"]')) return;
    document.head.appendChild(el("link", {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Archivo:wght@500;800&family=IBM+Plex+Mono:wght@400;500&display=swap"
    }));
  }

  function masthead() {
    var mast = el("header", { "class": "net-mast", role: "banner", "aria-label": REGISTRY.network + " network" });
    mast.appendChild(el("a", { "class": "net-mark", href: REGISTRY.home, title: REGISTRY.network + " — all sections" }, REGISTRY.network));
    var nav = el("nav", { "aria-label": "Network sections" });
    REGISTRY.groups.forEach(function (group) {
      var members = sections.filter(function (s) { return s.group === group; });
      if (!members.length) return;
      nav.appendChild(el("span", { "class": "net-group", "aria-hidden": "true" }, group));
      members.forEach(function (s) {
        var a = el("a", { href: s.url, title: s.purpose }, s.name);
        if (s.id === sectionId) a.setAttribute("aria-current", "page");
        nav.appendChild(a);
      });
    });
    mast.appendChild(nav);
    return mast;
  }

  function footer() {
    var foot = el("footer", { "class": "net-foot", role: "contentinfo" });
    function sep() { foot.appendChild(el("span", { "class": "net-sep", "aria-hidden": "true" }, "·")); }
    var lead = el("span");
    lead.appendChild(document.createTextNode(current ? "A " : ""));
    lead.appendChild(el("b", {}, REGISTRY.network));
    lead.appendChild(document.createTextNode(current ? " section — " + current.name : ""));
    foot.appendChild(lead);
    if (built) { sep(); foot.appendChild(el("span", {}, "built " + built)); }
    if (next) { sep(); foot.appendChild(el("span", {}, "refresh " + next)); }
    sep();
    foot.appendChild(el("a", { href: REGISTRY.home }, "all sections"));
    return foot;
  }

  function favicon() {
    if (!current || document.querySelector('link[rel~="icon"]')) return;
    document.head.appendChild(el("link", { rel: "icon", type: "image/svg+xml", href: base + "icons/" + current.id + ".svg" }));
  }

  function title() {
    if (!current) return;
    var t = (document.title || "").trim();
    if (t.indexOf(REGISTRY.network) !== -1) return;
    if (!t || /^shiny app$/i.test(t) || /^https?:/i.test(t)) t = current.name;
    document.title = t + " — " + REGISTRY.network;
  }

  /* ---------- sting: a short synthesized sound per section ---------------
   * Browsers refuse audio before a user gesture, so the sting is armed on load
   * and plays on the first click or key press — once per section per browser
   * session. Everything is synthesized with Web Audio: no files, no licences,
   * no extra requests. The masthead toggle mutes it; the choice persists.
   */
  var MUTE_KEY = "range-sting-muted";
  var MORSE = { A: ".-", E: ".", G: "--.", N: "-.", R: ".-." };

  function store(kind, key, value) {
    try {
      var s = window[kind];
      if (value === undefined) return s.getItem(key);
      s.setItem(key, value);
    } catch (e) { /* private mode or blocked storage: degrade to always-ask */ }
    return null;
  }

  function muted() { return store("localStorage", MUTE_KEY) === "1"; }

  var STINGS = {
    // Morse for the network name, 700 Hz CW at ~20 wpm.
    morse: function (ctx, out) {
      var unit = 0.06, t = ctx.currentTime + 0.05;
      REGISTRY.network.toUpperCase().split("").forEach(function (ch) {
        (MORSE[ch] || "").split("").forEach(function (sym) {
          var len = sym === "." ? unit : unit * 3;
          var osc = ctx.createOscillator(), g = ctx.createGain();
          osc.frequency.value = 700;
          g.gain.setValueAtTime(0, t);
          g.gain.linearRampToValueAtTime(0.18, t + 0.005);
          g.gain.setValueAtTime(0.18, t + len - 0.005);
          g.gain.linearRampToValueAtTime(0, t + len);
          osc.connect(g).connect(out);
          osc.start(t); osc.stop(t + len + 0.01);
          t += len + unit;
        });
        t += unit * 2;
      });
    },
    // Teleprinter: irregular filtered-noise clacks, then the carriage bell.
    teletype: function (ctx, out) {
      var t = ctx.currentTime + 0.05, buf = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 4);
      for (var k = 0; k < 22; k++) {
        var src = ctx.createBufferSource(), bp = ctx.createBiquadFilter(), g = ctx.createGain();
        src.buffer = buf; bp.type = "bandpass"; bp.frequency.value = 1800 + Math.random() * 1400; bp.Q.value = 3;
        g.gain.value = 0.5;
        src.connect(bp).connect(g).connect(out);
        src.start(t);
        t += 0.045 + Math.random() * 0.05;
      }
      bell(ctx, out, t + 0.05, 2093, 0.12, 0.6);
    },
    // Opening bell: three struck metallic tones (inharmonic partials).
    bell: function (ctx, out) {
      var t = ctx.currentTime + 0.05;
      for (var k = 0; k < 3; k++) bell(ctx, out, t + k * 0.32, 880, 0.16, 1.4);
    }
  };

  function bell(ctx, out, t, f, peak, decay) {
    [1, 2.76, 5.4, 8.93].forEach(function (ratio, i) {
      var osc = ctx.createOscillator(), g = ctx.createGain();
      osc.frequency.value = f * ratio;
      g.gain.setValueAtTime(peak / (i + 1), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + decay / (i * 0.6 + 1));
      osc.connect(g).connect(out);
      osc.start(t); osc.stop(t + decay);
    });
  }

  function play(kind) {
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC || !STINGS[kind]) return;
    var ctx = new AC(), out = ctx.createGain();
    out.gain.value = 0.6;
    out.connect(ctx.destination);
    STINGS[kind](ctx, out);
    setTimeout(function () { ctx.close(); }, 4000);
  }

  function armSting() {
    if (!current || !current.sound || current.sound === "none") return;
    var sessionKey = "range-sting-" + current.id;
    if (store("sessionStorage", sessionKey)) return;
    function fire() {
      window.removeEventListener("pointerdown", fire, true);
      window.removeEventListener("keydown", fire, true);
      if (muted()) return;
      store("sessionStorage", sessionKey, "1");
      play(current.sound);
    }
    window.addEventListener("pointerdown", fire, true);
    window.addEventListener("keydown", fire, true);
  }

  function soundToggle(mast) {
    if (!current || !current.sound || current.sound === "none") return;
    var btn = el("button", { type: "button", "class": "net-sound" });
    function label() {
      var off = muted();
      btn.textContent = off ? "🔇" : "🔈";
      btn.setAttribute("aria-pressed", off ? "true" : "false");
      btn.setAttribute("aria-label", off ? "Network sound off — turn on" : "Network sound on — turn off");
      btn.title = off ? "Sound off" : "Sound on (plays once per visit)";
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var nowMuted = !muted();
      store("localStorage", MUTE_KEY, nowMuted ? "1" : "0");
      label();
      if (!nowMuted) play(current.sound); // preview on unmute
    });
    label();
    // Replay on demand. Plays even when muted: a click on "play" is the request.
    var replay = el("button", { type: "button", "class": "net-sound", "aria-label": "Play the section sound again", title: "Play again" }, "▶");
    replay.addEventListener("click", function (e) { e.stopPropagation(); play(current.sound); });
    mast.insertBefore(replay, mast.children[1]);
    mast.insertBefore(btn, mast.children[1]);
  }

  function mount() {
    if (document.querySelector(".net-mast")) return;
    stylesheet();
    fonts();
    var mast = masthead();
    soundToggle(mast);
    document.body.insertBefore(mast, document.body.firstChild);
    document.body.appendChild(footer());
    armSting();
    favicon();
    title();
    paint();
    // Follow host theme toggles (HANGAR-family pages set data-theme on <html>).
    new MutationObserver(paint).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: light)");
      if (mq.addEventListener) mq.addEventListener("change", paint);
    }
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
