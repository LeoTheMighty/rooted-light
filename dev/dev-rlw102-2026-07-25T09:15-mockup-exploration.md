---
hash: rlw102
type: dev
created: 2026-07-25T09:15:00-06:00
title: Mockup exploration — 6+ style packs + review index for Kylie
from: _devx/workstreams/rooted-light-website/plan.md (phase 2)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: ready
owner: null
branch: feat/dev-rlw102
---

## Goal

The G-1 deliverable (target 2026-08-06): ≥ 6 visually distinct home-page
style directions — each a token CSS pack (`src/styles/tokens/pack-*.css`)
+ home layout variant over the same `site.json` content — behind a
phone-friendly review index at `/mockups/`, published to a throwaway
share channel so Kylie can browse them before hosting exists. Directions
(from plan.md phase 2): botanical editorial / warm craft-paper / soft
lavender dusk / grounded modern / hand-touched organic / quiet minimal
light / optional forest-deep accent. Brief: bright, genuine, caring,
earthy (sage, lavender, tan, brown) — not kitschy, not glamorous.

## Acceptance criteria

- [ ] `node _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs`
      passes (≥ 6 mockups + index, all linked, distinct identities)
- [ ] `node _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs`
      passes (every pack AA: body ≥ 4.5:1, heading ≥ 3:1)
- [ ] Token-name contract honored in every pack: `--color-bg`,
      `--color-surface`, `--color-text-body`, `--color-text-heading`,
      `--color-accent`, `--font-heading`, `--font-body` (solid
      `--color-bg` fallback for gradient packs)
- [ ] Layout variants differ structurally (hero placement, nav
      treatment, section rhythm) — not recolors
- [ ] Package published to a throwaway share channel (temp private S3 +
      presigned/CloudFront, or zipped relative-path build) and verified
      to open on a phone
- [ ] MANUAL.md entry filed: send package to Kylie + request long-lead
      content (Experiences copy, certifications, photos, Psychology
      Today URL); record her style pick in INTERVIEW.md

## Technical notes

- Fonts: system or self-hosted only — no CDN.
- Placeholder imagery: botanical/texture, no stock people.
- E-1 distinctness is mechanical: no two packs share
  (--color-accent, --font-heading).

## Status log

- 2026-07-25T09:15 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 2.
