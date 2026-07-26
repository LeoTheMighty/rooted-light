---
hash: rlw109
type: dev
created: 2026-07-25T18:25:00-06:00
title: Dusk convergence — all refinement mockups adopt the dusk skeleton + lavender gradient
from: user instruction 2026-07-25 (fast follow to rlw108)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: done
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
- 2026-07-25 — phase 2: spec ACs direct; 4 ACs; convergence delta, no
  new RED artifact (E-7/E-1/E-5 are the guardrails).
- 2026-07-25 — phase 3: wash tokens (--wash-hero/--wash-foot/
  --radius-soft) added to all 5 refinement packs (dawn's --wash-dawn
  superseded), 5 mockup pages swapped to the HomeDusk skeleton, 10
  bespoke HomeLav* files removed, blurbs + round-2 note rewritten for
  the converged set. Build 20 pages; E-7/E-1/E-5 green.
- 2026-07-25 — phase 4: clean single-pass adversarial review (diff 36
  insertions / 914 deletions, under the 3-agent threshold): no dangling
  HomeLav/--wash-dawn refs; every refinement page verified to carry its
  own wash + the dusk float-nav; pill-CTA text (surface-on-accent)
  re-checked against rlw108's computed ratios (>=4.82 all packs);
  packs well-formed. 0 issues; re-verified via greps on built output.
- 2026-07-25 — phase 5: local gates green — build exit 0, E-7 PASS,
  E-1 PASS (12 mockups), E-5 PASS (36 pairings).
- 2026-07-25 — phase 7/7.5/8: PR #5 + tour published; devx-ci run
  30185341880 SUCCESS; check-hold clean; merge-gate {"merge":true};
  merged via PR #5 (squash → dbe6df5).
