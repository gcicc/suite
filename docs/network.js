/* RANGE network chrome — masthead, footer, favicon and title for one section.
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
  var REGISTRY = {"network":"RANGE","tagline":"stated ambition against measured reality","home":"https://gcicc.github.io/suite/","groups":["News","Trackers","Library","Tools"],"sections":[{"id":"grudge","name":"GRUDGE","group":"News","live":true,"url":"https://gcicc.github.io/GRUDGE/","purpose":"The tabloid desk: drama-scored headlines, Drudge style.","accent":{"dark":"#ff6b60","light":"#c0392f"}},{"id":"newsscraper","name":"Wire","group":"News","live":true,"url":"https://grego1074.shinyapps.io/Stable-NewsScraper/","purpose":"Everything on Drudge, Fox and the financial wires, plus headlines by category. No ads.","accent":{"dark":"#8792a8","light":"#5c667a"}},{"id":"hangar","name":"Hangar","group":"Trackers","live":true,"url":"https://gcicc.github.io/hangar/","purpose":"SpaceX and Tesla: stated targets against the launch and production record.","accent":{"dark":"#3987e5","light":"#2a78d6"}},{"id":"overhang","name":"Overhang","group":"Trackers","live":true,"url":"https://gcicc.github.io/overhang/","purpose":"AI: what has been claimed against what has been measured.","accent":{"dark":"#d36be0","light":"#9b3aa8"}},{"id":"uplift","name":"Uplift","group":"Trackers","live":true,"url":"https://gcicc.github.io/uplift/","purpose":"Human enhancement and longevity, through registered clinical trials.","accent":{"dark":"#7fd4e8","light":"#1f7f99"}},{"id":"clintrialist","name":"ClinTrialist","group":"Trackers","live":true,"url":"https://clintrialist.github.io/clintrialist-report/","purpose":"Daily pharma and biostatistics aggregator.","accent":{"dark":"#2a9d8f","light":"#1d7a6f"}},{"id":"bible-study","name":"Bible Study","group":"Library","live":false,"url":"https://gcicc.github.io/bible-study/","purpose":"Scripture as a network: citations, people, themes and genealogies across fourteen panels.","accent":{"dark":"#b7ae74","light":"#6b6430"}},{"id":"world-history","name":"World History","group":"Library","live":false,"url":"https://gcicc.github.io/world-history/","purpose":"Who and where across history, with the spread of mathematics and statistics.","accent":{"dark":"#9ccc65","light":"#557a1f"}},{"id":"claude-trends","name":"Claude Trends","group":"Tools","live":false,"url":"https://gcicc.github.io/claude-trends/","purpose":"What is new in how people use Claude, sweep by sweep.","accent":{"dark":"#ffa14a","light":"#b85c00"}},{"id":"teleprompter","name":"Teleprompter","group":"Tools","live":true,"url":"https://gcicc.github.io/pga-teleprompter/","purpose":"Chord sheets and lyrics for 1,215 songs, on stage.","accent":{"dark":"#f2d544","light":"#7d6a00"}},{"id":"keystone","name":"Keystone","group":"Tools","live":true,"url":"https://gcicc.github.io/keystone-apps/","purpose":"The small-apps shelf: timers, simulations and trainers.","accent":{"dark":"#c2557f","light":"#a63d66"}}]};
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

  function isLight() {
    var t = document.documentElement.getAttribute("data-theme");
    if (t) return t === "light";
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  }

  function paintAccent() {
    if (!current) return;
    document.documentElement.style.setProperty("--net-accent", isLight() ? current.accent.light : current.accent.dark);
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

  function mount() {
    if (document.querySelector(".net-mast")) return;
    stylesheet();
    fonts();
    paintAccent();
    document.body.insertBefore(masthead(), document.body.firstChild);
    document.body.appendChild(footer());
    favicon();
    title();
    // Follow host theme toggles (HANGAR-family pages set data-theme on <html>).
    new MutationObserver(paintAccent).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: light)");
      if (mq.addEventListener) mq.addEventListener("change", paintAccent);
    }
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
