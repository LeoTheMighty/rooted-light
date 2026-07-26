---
hash: rlw113
type: dev
created: 2026-07-26T16:31:00-06:00
title: Therapy inquiry form wiring
from: _devx/workstreams/rooted-light-website/plan.md (phase 6c)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: blocked
owner: null
branch: feat/dev-rlw113
---

## Goal

The therapy half of old phase 6, split out (2026-07-26) so the Calendly
work isn't gated on it. Wire `contact.form_action` in
`src/content/site.json` to the chosen form provider (Web3Forms
recommended in the comparison-doc addendum; INTERVIEW.md confirmation
still open), add the same-domain thank-you page, and verify a test
submission reaches Kylie's email.

## Acceptance criteria

- [ ] `contact.form_action` live in `src/content/site.json`; therapy
      form posts to it; fields stay minimal (name, email, message —
      no symptom/history prompts, per the privacy note in the
      comparison-doc addendum).
- [ ] `src/pages/thanks.astro` thank-you page renders; provider
      redirect targets it (Web3Forms same-domain redirect if Web3Forms
      confirmed).
- [ ] Human: test submission from the built site reaches Kylie's email
      — logged in MANUAL.md.
- [ ] `node _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs`
      (flagless if rlw106 has landed, else `--allow-placeholder`) and
      `E-2_site-routes.mjs` still green.

## Technical notes

- Blocked-by: INTERVIEW.md "Confirm form provider for the therapy
  inquiry form" (Web3Forms recommended).
- Parallel-safe with rlw114 and rlw106.
- E-3's therapy assertions are DOM-presence only and already green;
  form-action liveness is the human AC — no eval change in this spec.

## Status log

- 2026-07-26T16:31 — emitted by /devx-plan from workstream cdea58
  revision (phase 6c, split from old phase 6 / rlw106). Blocked on the
  form-provider confirmation.
