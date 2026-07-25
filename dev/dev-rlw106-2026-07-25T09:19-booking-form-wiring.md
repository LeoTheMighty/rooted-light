---
hash: rlw106
type: dev
created: 2026-07-25T09:19:00-06:00
title: Booking & form wiring — live provider integration
from: _devx/workstreams/rooted-light-website/plan.md (phase 6)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: blocked
owner: null
branch: feat/dev-rlw106
---

## Goal

Gated on the provider + payment-timing + form-provider decisions
(INTERVIEW.md, from rlw104). Set `booking.url` (+ `booking.training_url`
if the provider splits session vs class event types) in
`src/content/site.json`, wire the therapy inquiry form action, and
verify both flows end-to-end manually. From this story on, E-3 runs
flagless — `--allow-placeholder` is dead.

## Acceptance criteria

- [ ] `node _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs`
      (no flags) fully green: live external booking href/embed on reiki;
      therapy form + Psychology Today link + zero booking affordances;
      modality fields complete
- [ ] `node _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs`
      green against the live CTA
- [ ] Human end-to-end (logged in MANUAL.md): book + cancel a test
      reiki slot; submit a test therapy inquiry and confirm it reaches
      Kylie's email

## Technical notes

- Blocked-by: rlw103 (pages exist) + rlw104's INTERVIEW.md answers.
- Parallel-safe with rlw105.

## Status log

- 2026-07-25T09:19 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 6. Blocked on provider decisions.
