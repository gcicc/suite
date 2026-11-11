# RANGE — the network kit

Nine (and counting) published pages share one identity: **network chrome outside, section
identity inside**. This folder is the single source of that chrome.

```
suite.json        the registry: network name, groups, sections (id, name, url, purpose, accent)
src/network.css   chrome styles + --net-* tokens (namespaced: never touches host styles)
src/network.js    renders masthead + footer, sets favicon and title; registry inlined at build
src/network.R     Shiny helper: range_chrome(section), range_theme()
build.py          validate suite.json, write docs/   (python build.py | --check)
docs/             what the gcicc/suite Pages repo serves (generated, do not edit)
```

## Brand layers

| Layer | What | Rule |
|---|---|---|
| 1. Network chrome | masthead (wordmark, grouped section links, current section in its accent), footer (`A RANGE section — X · built · refresh · all sections`), favicon, `Title — RANGE` | **every section, no exceptions** |
| 2. Shared tokens | `--net-*` colours, Archivo + IBM Plex Mono, light/dark | every section whose interior allows it |
| 3. Section interior | the site's own layout | free. GRUDGE keeps its Drudge look on purpose |

Accents are identity, never data. `build.py` rejects any accent under 3:1 contrast on the
masthead ground in either theme.

## Section sound

Each section sets `sound` in `suite.json`: `morse` (the network name in CW), `teletype`
(teleprinter clatter + carriage bell), `bell` (three-strike opening bell) or `none`. All are
synthesized in the browser with Web Audio — no audio files, no licences, no requests.

Browsers block audio before a user gesture, so the sound plays on the **first click or key
press**, once per section per browser session. The masthead carries a mute toggle (remembered
in `localStorage`) and a ▶ replay button that plays on demand, even while muted. Pages used
live or for focused reading (Teleprompter, Library) are `none`.

## Add a page to the network (the whole recipe)

1. Add one entry to `suite.json` (`live: false` until its URL serves 200).
2. `python build.py` — it fails loudly on a duplicate id, an unknown group, a non-https URL or a
   low-contrast accent.
3. In the page's generator (never in generated output), add before `</head>`:

   ```html
   <link rel="stylesheet" href="https://gcicc.github.io/suite/network.css">
   <script src="https://gcicc.github.io/suite/network.js" data-section="<id>"
           data-built="<build timestamp>" data-next="<refresh cadence>" defer></script>
   ```
   The `<link>` is optional: `network.js` loads `network.css` itself.
   Shiny: `range_chrome("<id>", built, next_refresh)` from `network.R`.
   **Quarto with `embed-resources: true`:** never use a `<script src>` (pandoc would inline a
   stale copy at render). Copy `02-Maintain/world-history/range.html` — a runtime loader —
   change `dataset.section`, and add `include-in-header: range.html` under `format: html:`.
4. Optional layer 2: map the page's own variables onto `--net-*`.
5. Flip `live: true`, rebuild, publish `docs/` to `gcicc/suite`. Every other section picks the
   new link up on its next page load — no other site is rebuilt.

**Local preview.** Chrome blocks an https page from loading `127.0.0.1` scripts, so test a
built page by serving it *and* `docs/` from the same local server with the snippet pointed at
`/network.js` (see the harness pattern in the 2026-11-11 session).

## What keeps this current

- A new published page joins RANGE by the recipe above — rule in `Dropbox/CLAUDE.md`.
- `03-Tools/project-management` liveness checks cover every `url` in `suite.json`.
- Renaming the network is one field (`network`) and one rebuild.
