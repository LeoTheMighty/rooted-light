---
hash: rlw115
type: dev
created: 2026-07-26T16:45:00-06:00
title: Home page — Lavender-mist hero skeleton with sand-lilac accents
from: user instruction 2026-07-26 (Leo — "front page like the lavender mist home page (round 2, #1) with the new accents; full screen on desktop and phone; less busy; keep all content")
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: done
owner: /devx-2026-07-26T2009-84135
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
- 2026-07-26T20:09:32-06:00 — claimed by /devx in session /devx-2026-07-26T2009-84135
- 2026-07-26 — phase 2: spec ACs direct (v2 native); 5 ACs;
  workstream=rooted-light-website; red-artifacts=none (visual item;
  E-1..E-5/E-7 + Pages base build are the guardrails). Skeleton
  reference re-read: HomeDusk.{astro,css} + pack-lavender-mist wash
  vars; target = that hero shape, sand-lilac tokens, 100dvh.
- 2026-07-26 — phase 3: Page.astro grows variant="hero" (transparent
  absolute header, full-bleed main, no layout h1; default rendering
  untouched — verified therapy carries no page-hero class); base.css
  gains pack-agnostic --wash-hero/--wash-foot (color-mix secondary→bg
  per mist's gradient shape), .mist-hero (100dvh, centered, clamp
  type), horizontal-wrap float-nav on home mobile (stacked nav would
  eat the first impression), .pill-cta, .home-below + .section-cards +
  .soft-card (mist drift-card treatment); index.astro: hero = name +
  owner line + tagline + intention + one offerings pill (no data-cta
  on home), below fold keeps quote band + five section links as soft
  cards. DOM contract verified in dist (14 checks).
- 2026-07-26 — phase 4: single rigorous pass (visual CSS diff, no
  eval-contract markers touched); 2 findings, both fixed in-place —
  header wrap edge padding restored to the wrap default (0.4rem was
  tighter than the mockup's treatment) and 100vh fallback added before
  100dvh (engines without dvh would collapse the hero). Re-verified in
  rebuilt dist. NOTE: E-3 now RED on a NEW phase-6b assertion
  (data-cta="booking-training", introduced by the concurrent cdea58
  revision 784d952) — inherited from main, not a regression from this
  diff; CI waives evals via continue-on-error until 6b lands (rlw106).
- 2026-07-26 — phase 5: local gates green — default build exit 0;
  E-1/E-2/E-4/E-5/E-7 PASS (E-3 expected-RED per note above); Pages
  base build: zero unprefixed hrefs on home, pill CTA prefixed.
- 2026-07-26 — phase 7: devx-ci run 30231703489 SUCCESS.
- 2026-07-26 — phase 8: check-hold clean; merge-gate {"merge":true}; merged via PR #12 (squash → 4b09ce8). Deploy-pages run 30231789501 SUCCESS; live preview verified (hero markup, prefixed pill CTA, owner line, quote band, soft cards, noindex all present at https://leothemighty.github.io/rooted-light/). Worktree + local branch removed.
