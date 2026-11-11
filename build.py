"""Build the RANGE network kit from suite.json into dist/.

    python build.py            # validate suite.json, write docs/
    python build.py --check    # validate only

docs/ is what the gcicc/suite Pages repo serves:
    network.css, network.js (registry inlined), icons/<section>.svg, index.html

Validation is strict because nine sites render from this one file: ids unique,
groups declared, URLs https, and every accent clears 3:1 contrast against the
masthead ground in the theme it is used in (WCAG non-text contrast).
"""

from __future__ import annotations

import argparse
import html
import json
import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
SRC = ROOT / "src"
DIST = ROOT / "docs"
REGISTRY = ROOT / "suite.json"

RACK = {"dark": "#0b1017", "light": "#e2e5ea"}
MIN_CONTRAST = 3.0
HEX = re.compile(r"^#[0-9a-fA-F]{6}$")


def luminance(hex_colour: str) -> float:
    def channel(c: int) -> float:
        s = c / 255
        return s / 12.92 if s <= 0.03928 else ((s + 0.055) / 1.055) ** 2.4

    r, g, b = (int(hex_colour[i : i + 2], 16) for i in (1, 3, 5))
    return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)


def contrast(a: str, b: str) -> float:
    la, lb = sorted((luminance(a), luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def validate(reg: dict) -> list[str]:
    errors: list[str] = []
    for key in ("network", "home", "groups", "sections"):
        if key not in reg:
            errors.append(f"missing top-level key: {key}")
    if errors:
        return errors
    seen: set[str] = set()
    for s in reg["sections"]:
        sid = s.get("id", "?")
        for key in ("id", "name", "group", "live", "url", "purpose", "accent"):
            if key not in s:
                errors.append(f"{sid}: missing {key}")
        if sid in seen:
            errors.append(f"{sid}: duplicate id")
        seen.add(sid)
        if s.get("group") not in reg["groups"]:
            errors.append(f"{sid}: group {s.get('group')!r} not in groups")
        if not str(s.get("url", "")).startswith("https://"):
            errors.append(f"{sid}: url must be https")
        for theme, ground in RACK.items():
            colour = s.get("accent", {}).get(theme, "")
            if not HEX.match(colour):
                errors.append(f"{sid}: accent.{theme} is not #rrggbb")
            elif (ratio := contrast(colour, ground)) < MIN_CONTRAST:
                errors.append(
                    f"{sid}: accent.{theme} {colour} is {ratio:.2f}:1 on {ground}"
                )
    return errors


def icon(accent: dict) -> str:
    # One glyph shape for the whole network (a range-board strip with a lit
    # edge); the section is told apart by its accent. Dark ground in both
    # themes so the tab icon reads on light and dark browser chrome alike.
    return (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">'
        '<rect width="32" height="32" rx="6" fill="#0b1017"/>'
        f'<rect x="6" y="8" width="5" height="16" fill="{accent["dark"]}"/>'
        '<rect x="13" y="8" width="13" height="4" fill="#e9eef5"/>'
        '<rect x="13" y="14" width="10" height="4" fill="#8d97a4"/>'
        '<rect x="13" y="20" width="12" height="4" fill="#8d97a4"/>'
        "</svg>\n"
    )


def front_page(reg: dict) -> str:
    cards = []
    for group in reg["groups"]:
        members = [s for s in reg["sections"] if s["group"] == group and s["live"]]
        if not members:
            continue
        items = "".join(
            f'<a class="card" href="{html.escape(s["url"])}" '
            f'style="--d:{s["accent"]["dark"]};--l:{s["accent"]["light"]}">'
            f"<b>{html.escape(s['name'])}</b><span>{html.escape(s['purpose'])}</span></a>"
            for s in members
        )
        cards.append(
            f'<section><h2>{html.escape(group)}</h2><div class="grid">{items}</div></section>'
        )
    name = html.escape(reg["network"])
    tagline = html.escape(reg.get("tagline", ""))
    return f"""<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{name} — all sections</title>
<link rel="icon" type="image/svg+xml" href="icons/network.svg">
<link rel="stylesheet" href="network.css">
<style>
body{{margin:0;background:var(--net-ground);color:var(--net-ink);font:15px/1.5 var(--net-display)}}
main{{max-width:1080px;margin:0 auto;padding:2rem clamp(1rem,3vw,2.5rem)}}
h1{{font-weight:800;letter-spacing:.3em;text-transform:uppercase;font-size:1.6rem;margin:0}}
.tag{{color:var(--net-ink-2);font-family:var(--net-mono);font-size:.85rem;margin:.3rem 0 2rem}}
h2{{font:500 .72rem var(--net-mono);letter-spacing:.18em;text-transform:uppercase;color:var(--net-ink-muted);
border-bottom:1px solid var(--net-rule);padding-bottom:.4rem;margin:2rem 0 .8rem}}
.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:.6rem}}
.card{{display:block;padding:.85rem 1rem;background:var(--net-strip);border:1px solid var(--net-rule);
border-left:4px solid var(--d);color:inherit;text-decoration:none}}
.card:hover{{border-color:var(--net-rule-bright);border-left-color:var(--d)}}
.card b{{display:block;font-weight:800;letter-spacing:.06em}}
.card span{{display:block;color:var(--net-ink-2);font-size:.88rem;margin-top:.2rem}}
@media (prefers-color-scheme: light){{.card{{border-left-color:var(--l)}}.card:hover{{border-left-color:var(--l)}}}}
</style></head>
<body>
<main><h1>{name}</h1><p class="tag">{tagline}</p>{"".join(cards)}</main>
<script src="network.js" data-section="" defer></script>
</body></html>
"""


def build(reg: dict) -> None:
    if DIST.exists():
        shutil.rmtree(DIST)
    (DIST / "icons").mkdir(parents=True)
    payload = json.dumps(reg, separators=(",", ":"), ensure_ascii=False).replace(
        "</", "<\\/"
    )
    js = (SRC / "network.js").read_text(encoding="utf-8")
    if "/*REGISTRY*/ null" not in js:
        raise SystemExit("src/network.js lost its /*REGISTRY*/ placeholder")
    (DIST / "network.js").write_text(
        js.replace("/*REGISTRY*/ null", payload), encoding="utf-8"
    )
    shutil.copy(SRC / "network.css", DIST / "network.css")
    shutil.copy(SRC / "network.R", DIST / "network.R")
    for s in reg["sections"]:
        (DIST / "icons" / f"{s['id']}.svg").write_text(
            icon(s["accent"]), encoding="utf-8"
        )
    (DIST / "icons" / "network.svg").write_text(
        icon({"dark": "#ffa14a", "light": "#b85c00"}), encoding="utf-8"
    )
    (DIST / "index.html").write_text(front_page(reg), encoding="utf-8")
    (DIST / ".nojekyll").write_text("", encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("--check", action="store_true", help="validate only")
    args = parser.parse_args()
    reg = json.loads(REGISTRY.read_text(encoding="utf-8"))
    errors = validate(reg)
    if errors:
        print("suite.json invalid:", *errors, sep="\n  ", file=sys.stderr)
        raise SystemExit(1)
    if not args.check:
        build(reg)
        print(f"built {DIST} — {len(reg['sections'])} sections")
    else:
        print("suite.json valid")


if __name__ == "__main__":
    main()
