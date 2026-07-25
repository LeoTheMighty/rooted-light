---
hash: rlw104
type: dev
created: 2026-07-25T09:17:00-06:00
title: Booking-provider comparison — research doc + decision entry
from: _devx/workstreams/rooted-light-website/plan.md (phase 4)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-25T1525-16474
branch: feat/dev-rlw104
---

## Goal

The deferred FR-10 research (web research allowed in this story).
Compare ≥ 3 booking/payment providers for reiki sessions + trainings —
seed list: Calendly, Acuity Scheduling, SimplePractice native booking,
Square Appointments — on fees (monthly + per-txn), client friction
(steps to book+pay), Kylie's schedule control ("typically Fridays"),
PayPal support ("No to Stripe", "Yes to PayPal?" from the whiteboard),
embed-vs-link quality on a static site, and SimplePractice adjacency.
Include a form-provider addendum (Formspree / Web3Forms / mailto) for
the therapy inquiry form. Output: comparison doc with an explicit
recommendation + INTERVIEW.md decision entry bundled with the
domain-name question.

## Acceptance criteria

- [ ] `node _devx/workstreams/rooted-light-website/evals/E-6_provider-comparison.mjs`
      passes (≥ 3 providers × 4 axes + Recommendation section) against
      `_devx/workstreams/rooted-light-website/decisions/booking-provider-comparison.md`
- [ ] Form-provider addendum section present in the same doc
- [ ] INTERVIEW.md entry filed: provider choice + payment timing
      (pay-at-booking vs in-person vs deposit) + form provider, bundled
      with the already-filed domain-name decision
- [ ] Costs stated in real numbers (G-4 context: hosting < $5/mo;
      provider fees are Kylie's call, surfaced clearly)

## Technical notes

- Parallel-safe with rlw102/rlw103 — touches no site code.
- Doc heading shape matters to E-6: one `## <Provider>` per provider,
  `## Recommendation`, addendum heading contains "Form provider".

## Status log

- 2026-07-25T09:17 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 4.
- 2026-07-25T15:25:49-06:00 — claimed by /devx in session /devx-2026-07-25T1525-16474
