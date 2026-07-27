---
hash: rlw115
type: dev
created: 2026-07-26T16:45:00-06:00
title: Home page — Lavender-mist hero skeleton with sand-lilac accents
from: user instruction 2026-07-26 (Leo — "front page like the lavender mist home page (round 2, #1) with the new accents; full screen on desktop and phone; less busy; keep all content")
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: ready
owner: null
branch: feat/dev-rlw115
entered_at: execute
---

## Goal

The current home page reads too busy. Rebuild it on the Round 2 #1
("Lavender mist") mockup's skeleton — the dusk layout: a full-viewport
wash hero with the nav floating over it, centered name + owner line +
tagline + intention + one pill CTA, then the content drifting below in
soft cards — but colored with the PROMOTED sand-lilac accents (the
"new accents"), not mist's lavender palette. First impression must fill
the screen on both desktop and phone. All existing content stays: the
quote band, the five section links (as soft cards), every other route
untouched.

## Acceptance criteria

- [ ] Home hero + floating nav together fill the full viewport
      (100dvh) at desktop AND 360px-wide mobile; wash gradient derives
      from the promoted pack's tokens (secondary → bg), no hardcoded
      mist hexes
- [ ] Nav floats transparent over the wash on home only; every other
      route keeps the solid header exactly as today
- [ ] Hero: site name, Kylie owner line, tagline, intention line, ONE
      pill CTA linking /offerings/ (offerings-first per rlw110; NO
      data-cta booking affordance on home)
- [ ] All prior home content survives below the fold: quote band +
      five section links restyled as mist-style soft cards; footer on
      home wears the wash-foot treatment
- [ ] Default build: E-1..E-5 + E-7 all green; base (Pages) build:
      zero unprefixed internal hrefs on home; deployed preview renders
      the new hero

## Technical notes

- Skeleton reference: src/layouts/home/HomeDusk.{astro,css} +
  pack-lavender-mist.css --wash-hero/--wash-foot (rlw109 convergence).
  Real-site equivalents live in base.css using
  color-mix/var(--color-secondary, ...) so they follow any future pack.
- Page.astro grows a `hero` variant (full-bleed slot + transparent
  absolute header + unwrapped main); default rendering byte-identical
  for all other pages.
- E-4 still finds data-cta at /offerings/reiki/ ≤3 clicks (hero pill →
  /offerings/ → reiki = 2; nav also present).
- Do not touch mockup files or the other session's rlw114 surfaces
  (docs/CALENDLY-SETUP.md, MANUAL.md).

## Status log

- 2026-07-26T16:45 — filed by /devx from Leo's instruction (round-2 #1
  skeleton + promoted accents; entered_at: execute; rlw113/rlw114
  hashes taken by the concurrent Calendly re-plan).
