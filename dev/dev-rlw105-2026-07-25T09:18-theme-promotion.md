---
hash: rlw105
type: dev
created: 2026-07-25T09:18:00-06:00
title: Theme promotion — apply Kylie's chosen style pack site-wide
from: _devx/workstreams/rooted-light-website/plan.md (phase 5)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-26T1554-64692
branch: feat/dev-rlw105
---

## Goal

Gated on Kylie's style pick (INTERVIEW.md, from rlw102). Promote the
chosen style pack to the site-wide theme — all pages, not just home —
restyling nav/CTA/components. If Kylie picks a blend of two packs, blend
at the token level (one pack's palette, the other's type); no third
exploration round. Mockup routes stay intact until rlw107's production
profile prunes them.

## Acceptance criteria

- [ ] Chosen pack's tokens are the default theme import in
      `Page.astro` / `base.css`; all seven routes render with it
- [ ] E-1, E-2, E-4, E-5 all still green after the restyle
- [ ] Human: side-by-side check that the promoted theme matches the
      mockup Kylie picked (log in spec status log)

## Technical notes

- Blocked-by: rlw102 (package sent) + Kylie's INTERVIEW.md answer.
- Parallel-safe with rlw106 (this touches styles/layouts; rlw106
  touches config + offering pages).

## Status log

- 2026-07-25T09:18 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 5. Blocked on Kylie's style pick.
- 2026-07-25 — gate rewired by the cdea58 revision: direction is chosen
  (soft lavender dusk, keep simple); the block is now Kylie's/Leo's
  FINAL refinement pick via rlw108 (INTERVIEW.md "lavender refinement
  pick" entry). Promotion applies the picked lavender variant.
- 2026-07-26 — UNBLOCKED: final pick recorded (Leo) — round-4 "Warm
  sand & lilac" (`pack-sand-lilac`, rlw111). Promotion applies this
  pack site-wide. Status → ready.
- 2026-07-26T15:54:53-06:00 — claimed by /devx in session /devx-2026-07-26T1554-64692
- 2026-07-26 — phase 2: spec ACs direct (v2 native); 3 ACs;
  workstream=rooted-light-website; red-artifacts=none (E-1/E-2/E-4/E-5
  are the guardrails, all green pre-change). Promotion target:
  pack-sand-lilac (Leo's pick). Scope note: restyle adopts the picked
  mockup's hero owner-line and home quote band (rlw111 locked
  decisions "Kylie on front page" + "quote spaces") using the pack's
  --color-secondary treatment; mockup surfaces untouched (mockups are
  self-contained via _shared.css, not base.css). AC-3 (human
  side-by-side) will be filed in MANUAL.md — YOLO doesn't block on it.
- 2026-07-26 — phase 3: pack-sand-lilac imported in Page.astro after
  base.css (cascade-verified in dist: pack token #f7f1e8 overrides
  default #faf8f4); home hero gains owner-line (Kylie Fustini) + quote
  band in the picked mockup's exact treatment (secondary 42% mix,
  Didot italic, big quote glyph, attribution slot, TODO(kylie) swap
  comment); cards adopt --radius-soft with --radius fallback. Build 64
  pages; theme confirmed on home AND therapy (site-wide via layout).
- 2026-07-26 — phase 4: clean review (0 issues; re-ran with stricter
  framing — confirmed clean). Single rigorous pass (small non-marker
  diff, threshold rule): cascade order verified in dist, owner_line
  source field exists, figure>blockquote+figcaption valid, booking-cta
  bg-on-accent = pack's AA-checked 5.60:1, --color-secondary has
  surface fallback, mockups isolated (self-contained _shared.css).
- 2026-07-26 — phase 5: local gates green — build exit 0 (64 pages);
  E-1/E-2/E-4/E-5 (the AC guardrails) PASS + E-3(--allow-placeholder)/
  E-7 PASS; no lint/coverage runners configured (YOLO informational).
