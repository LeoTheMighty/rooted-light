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
- 2026-07-26 — phase 2: spec ACs direct (v2 native); 5 ACs;
  workstream=rooted-light-website (phase 6a, verification=human);
  red-artifacts=none (docs-only, human-verified phase).
- 2026-07-26 — phase 3: web-researched current Calendly/PayPal flows
  (calendly.com/help/calendly-paypal, group-event-type-overview,
  how-to-set-up-an-event-type, availability articles; PayPal
  upgrade/business-signup pages — all fetched 2026-07-26); authored
  docs/CALENDLY-SETUP.md (7 sections, TODO(kylie) placeholders wired
  to INTERVIEW.md entry); MANUAL.md chain re-pointed at runbook
  sections with restated facts trimmed (wrap-don't-duplicate).
- 2026-07-26 — phase 4: single-pass adversarial review (docs-only,
  under threshold); 3 findings (0 HIGH, 1 MED, 2 LOW); ALL fixed
  in-place — most load-bearing: removed two UI-path claims (§1 Billing
  location, §3 "left nav") not grounded in the fetched help docs, per
  the spec's researched-not-from-memory requirement; re-review clean.
- 2026-07-26 — phase 5–7: npm run build green (64 pages, docs-only);
  pushed feat/dev-rlw114; PR #11 —
  https://github.com/LeoTheMighty/rooted-light/pull/11 (first pr-body
  invocation misfired on a missing .devx-cache dir → PR opened with an
  empty body; regenerated and fixed via gh pr edit; no unresolved
  placeholders).
- 2026-07-26T20:04:46-06:00 — claimed by /devx in session /devx-2026-07-26T2004-83721
