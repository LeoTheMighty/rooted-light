---
hash: rlw103
type: dev
created: 2026-07-25T09:16:00-06:00
title: Content pages & information architecture — all seven routes full
from: _devx/workstreams/rooted-light-website/plan.md (phase 3)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: done
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
- 2026-07-26 — phase 2: spec ACs direct (v2 native); 5 ACs;
  workstream=rooted-light-website; red-artifacts=E-2,E-3,E-4 — all
  three re-run in worktree and watched fail (E-2: /modalities missing;
  E-4: no booking CTA in 3 clicks; E-3: no [data-cta="booking"] on
  reiki). Context: Leo's theme pick (sand-lilac) landed same day;
  this item stays theme-neutral per its own notes — rlw105 promotes.
- 2026-07-26 — phase 3: four components (BookingCTA carrying
  data-cta="booking", ModalityAccordion carrying data-modality + id +
  four data-field sections, InquiryForm posting to contact.form_action,
  ResourceCard); new top-level /modalities/ route + nav entry (six
  sections); resources detail pages ([slug].astro); reiki gains
  session-shape section + two BookingCTAs on the site.json seams;
  therapy gains modality summaries deep-linking /modalities/#id,
  InquiryForm, Psychology Today link (directory URL until Kylie's
  profile — TODO marked in-page), 988 note kept, zero booking
  affordances; about-you map deep-links anchors; base.css gains
  theme-neutral CTA/accordion/form primitives. Build 64 pages;
  E-2, E-3 (--allow-placeholder), E-4 all flipped GREEN; E-1/E-5/E-7
  guardrails still green.
- 2026-07-26 — phase 4: 3-agent parallel adversarial review (Blind
  Hunter / Edge Case Hunter / Acceptance Auditor); auditor: all 5 ACs +
  every Goal clause MET; 7 deduped findings (2 MED, 5 LOW); ALL fixed
  in-place — MEDs: deep links landed on closed <details> (fragment
  targeting the details element does not auto-expand; now rendered
  open) and h1→h3 outline skip on /modalities/ (modality names now h2
  inside <summary>); LOWs: reiki CTAs regained "(opens soon)" honesty
  notes, contact.form_action renamed #booking-tbd → #inquiry-tbd so no
  booking-ish literal ships on the therapy page, inquiry form gained a
  "delivery goes live soon" note, modality resources[] dead
  #todo-kylie anchors now point at the live /resources/what-are-
  modalities/ explainer (TODO(kylie) kept for specific links), schema
  arrays tightened .nonempty() so an empty certifications list fails
  the build instead of rendering a bare heading, PT copy reworded to
  "(profile link coming soon)". Re-review of fix hunks in dist clean.
- 2026-07-26 — phase 5: local gates green — build exit 0 (64 pages);
  E-2/E-3(--allow-placeholder)/E-4 target evals PASS; E-1/E-5/E-7
  mockup guardrails PASS; no lint/coverage runners configured
  (YOLO: informational only).
- 2026-07-26T15:37:26-06:00 — claimed by /devx in session /devx-2026-07-26T1537-70206
- 2026-07-26 — phase 7: PR https://github.com/LeoTheMighty/rooted-light/pull/8 opened (base main); devx-ci run 30221860682 SUCCESS.
- 2026-07-26 — phase 7.5: tour published — https://htmlpreview.github.io/?https://raw.githubusercontent.com/LeoTheMighty/rooted-light/devx-tours/tours/rlw103/tour.html; PR body updated.
- 2026-07-26 — phase 8: check-hold clean; merge-gate {"merge":true}; merged via PR #8 (squash → 50d4671); worktree + local branch removed.
