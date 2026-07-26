---
hash: rlw109
type: dev
created: 2026-07-25T18:25:00-06:00
title: Dusk convergence — all refinement mockups adopt the dusk skeleton + lavender gradient
from: user instruction 2026-07-25 (fast follow to rlw108)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-25T2054-40698
branch: feat/dev-rlw109
entered_at: execute
---

## Goal

Leo: make all the refinement mockups look a lot more like Soft lavender
dusk — its simplicity and its lavender gradient — as fast as possible
while still giving options. Convergence, not exploration: the five
refinements reuse the dusk layout skeleton (gradient hero, floating
nav, soft rounded cards, gradient footer) with per-pack washes; the
options become temperature + type (mist/linen/sage/ink/dawn palettes).

## Acceptance criteria

- [ ] All five refinement mockup pages render through the dusk skeleton
      (HomeDusk) with pack-specific --wash-hero/--wash-foot/
      --radius-soft tokens; bespoke HomeLav* layouts removed
- [ ] E-7, E-1, E-5 all green after the swap (identities stay distinct;
      Modalities nav intact; contrast holds)
- [ ] Registry blurbs + round-2 note describe the converged set
      (palette/type variants of the dusk feel)
- [ ] Share package regenerated; round-2 framing reflects convergence

## Technical notes

- Fastest-path decision (user asked for speed): one skeleton, token-
  driven washes. The rlw108 "not recolors" AC was an exploration
  constraint; convergence on the picked direction is the product ask.
- Solid --color-bg fallbacks stay (E-5 contract).

## Status log

- 2026-07-25T18:25 — filed by /devx from Leo's instruction (fast
  follow; entered_at: execute).
- 2026-07-25T20:54:32-06:00 — claimed by /devx in session /devx-2026-07-25T2054-40698
