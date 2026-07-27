---
hash: rlw114
type: dev
created: 2026-07-26T16:30:00-06:00
title: Calendly setup runbook + manual connection chain
from: _devx/workstreams/rooted-light-website/plan.md (phase 6a)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-26T2004-83721
branch: feat/dev-rlw114
---

## Goal

Provider decided (INTERVIEW.md 2026-07-26: Calendly Standard, PayPal
collect-at-booking, link-out). Author the click-by-click runbook
`docs/CALENDLY-SETUP.md` — researched against Calendly's and PayPal's
**current** signup/config UIs, not from memory — that lets Leo/Kylie
execute the MANUAL.md "Calendly connection chain" without guesswork:
account + Standard plan, PayPal Business + connection, the two event
types (Reiki Session 1:1; Reiki Training group, seat-capped), Kylie's
availability screen, scoping (only those two event types public), link
capture, and the paid end-to-end test script. Docs-only PR; touches no
site code; parallel-safe with everything.

## Acceptance criteria

- [ ] `docs/CALENDLY-SETUP.md` exists with the seven sections from
      plan.md phase 6a (account/plan, PayPal Business, connect,
      Reiki Session event type, Reiki Training group event type,
      availability, scoping + link capture + paid-test script), each
      grounded in the provider's current UI via web research.
- [ ] Pricing/duration/seat-cap fields reference the INTERVIEW.md
      "Calendly event-type details" entry and use `TODO(kylie)`
      placeholders — the runbook is executable up to event-type
      publishing without her numbers.
- [ ] Calendly caveats stated verbatim where relevant: full payment
      only (no deposits), refunds manual in PayPal, no promo codes
      with PayPal, bookings auto-confirm (no approval step).
- [ ] MANUAL.md chain updated: each step points at its runbook section;
      wrap-don't-duplicate — facts live in the runbook / comparison
      doc, not restated in MANUAL.md.
- [ ] `npm run build` still green (docs-only change).

## Technical notes

- Wrap-don't-duplicate: link to
  `_devx/workstreams/rooted-light-website/decisions/booking-provider-comparison.md`
  for pricing/caveat research already done.
- The paid-test script (runbook §7) is consumed by rlw106's human AC —
  write it as a copy-paste checklist (book session → pay PayPal →
  verify funds → cancel → refund; repeat for a training seat).
- Blocked-by: none. Ready now.

## Status log

- 2026-07-26T16:30 — emitted by /devx-plan from workstream cdea58
  revision (Calendly decision), phase 6a.
- 2026-07-26T20:04:46-06:00 — claimed by /devx in session /devx-2026-07-26T2004-83721
