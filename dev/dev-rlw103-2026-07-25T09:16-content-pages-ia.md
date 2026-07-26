---
hash: rlw103
type: dev
created: 2026-07-25T09:16:00-06:00
title: Content pages & information architecture — all seven routes full
from: _devx/workstreams/rooted-light-website/plan.md (phase 3)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-26T1537-70206
branch: feat/dev-rlw103
---

## Goal

Flesh out all seven routes from stubs to full structure: About Me (three
subsections: Experiences `TODO(kylie)`, Interests/Devotions,
Education/Certifications), About You (who-benefits + modality map from
`who_benefits[]`), Resources (explainers + ICRT link), Offerings
landing, Reiki page (what it is, session shape, training section,
BookingCTA component with `data-cta="booking"` — placeholder href until
rlw106), Therapy page (modality `<details>` accordion with
description/who-benefits/resources/certifications per entry via
`data-modality`/`data-field` markers, inquiry form posting to the
`contact.form_action` seam, small Psychology Today link, crisis-resources
note e.g. 988). Nav complete everywhere.

## Acceptance criteria

- [ ] `node _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs`
      passes (7 routes, nav complete on every page)
- [ ] `node _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs`
      passes (booking CTA element reachable ≤ 3 clicks from home)
- [ ] `node _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs --allow-placeholder`
      passes (full DOM contract minus external href)
- [ ] Therapy page carries a crisis-resources note (988) and zero
      booking affordances
- [ ] Placeholder personal copy is `TODO(kylie)`-marked (greppable)

## Technical notes

- Selector contracts are load-bearing for evals: `data-cta="booking"`,
  `data-modality`, `data-field="what-it-is|who-benefits|resources|certifications"`.
- Do not edit eval scripts to make them pass (`devx revise` if a
  contract is genuinely wrong).
- Depends on rlw101; can start before Kylie's mockup pick (theme-neutral
  base styling).

## Status log

- 2026-07-25T09:16 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 3.
- 2026-07-25 — scope revised by the cdea58 revision (Leo's decision):
  Modalities promoted to a top-level route — EIGHT routes / six nav
  sections; the four-field modality catalog moves to /modalities/ (with
  id anchors, FR-13); therapy page keeps a summary + link. See plan.md
  phase 3 (revised) + E-2/E-3 (revised).
- 2026-07-26T15:37:26-06:00 — claimed by /devx in session /devx-2026-07-26T1537-70206
