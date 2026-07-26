---
hash: rlw106
type: dev
created: 2026-07-25T09:19:00-06:00
title: Reiki session + training booking wiring — live Calendly links
from: _devx/workstreams/rooted-light-website/plan.md (phase 6b)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: blocked
owner: null
branch: feat/dev-rlw106
---

## Goal

*(Scope revised 2026-07-26: provider decided — Calendly Standard, PayPal
collect-at-booking, link-out. Therapy form wiring split out to rlw113 so
this story is purely the Calendly hand-off.)* Once the MANUAL.md
"Calendly connection chain" has produced the two real event-type links:
set `booking.url` (Reiki Session) and `booking.training_url` (Reiki
Training) in `src/content/site.json`, render the session CTA
(`data-cta="booking"`, existing) and the new training signup CTA
(`data-cta="booking-training"`) on the reiki page as link-outs, and
verify the full paid flow end-to-end. From this story on, E-3 runs
flagless — `--allow-placeholder` is dead.

## Acceptance criteria

- [ ] `node _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs`
      (no flags) fully green: live off-site session CTA AND training CTA
      (`data-cta="booking-training"`) on reiki; therapy form + Psychology
      Today link + zero booking affordances; modality fields complete
- [ ] `node _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs`
      green against the live CTA
- [ ] Both hrefs are the real Calendly event-type links from MANUAL.md
      chain step 7 (no placeholder, no third URL, nothing else bookable)
- [ ] Human end-to-end (runbook §7 script, logged in MANUAL.md): book +
      pay a test session slot AND a test training seat via PayPal from
      the live site; confirm the money lands in Kylie's PayPal; cancel
      and refund both

## Technical notes

- Blocked-by: rlw114 (runbook) + MANUAL.md "Calendly connection chain"
  steps 1–7 complete (real event-type links captured) — a human gate,
  like rlw105's pick was.
- Link-out, not inline embed (design.md rationale: zero-client-JS
  principle; the inline widget is a one-component switch later if Kylie
  wants booking to feel on-site).
- Parallel-safe with rlw113 (therapy form).

## Status log

- 2026-07-25T09:19 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 6. Blocked on provider decisions.
- 2026-07-26 — scope revised by /devx-plan (cdea58 revision): Calendly
  decided (INTERVIEW.md answered); therapy form split to rlw113; training
  CTA added per revised E-3; now blocked on rlw114 + the MANUAL.md
  Calendly chain instead of the provider decision.
