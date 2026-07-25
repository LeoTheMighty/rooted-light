---
hash: rlwt102
type: test
created: 2026-07-25T17:20:00-06:00
title: Close the token-contract eval gap (--font-body, heading-vs-surface, package invariants)
from: dev/dev-rlw102-2026-07-25T09:15-mockup-exploration.md
status: ready
owner: null
branch: null
---

## Goal

The rlw102 token-name contract is wider than what the evals enforce.
Verified manually during rlw102's adversarial review, but manual checks
don't survive future edits; rlw105 (theme promotion) will consume these
packs site-wide, so drift gets expensive.

## Gaps

- `--font-body` is required by the contract but checked by neither E-1
  nor E-5 — a pack could drop it and stay green.
- E-5 checks heading-vs-bg but not heading-vs-surface (currently
  6.99–11.79:1, safe — unguarded).
- `scripts/package-mockups.mjs` invariants (staleness guard, srcdoc
  embedding, review-bar strip, ≥6 direction links) have no automated
  test.

## Acceptance criteria

- [ ] A check (eval addendum via `devx revise`, or a repo test once a
      test framework lands per rlwt101) fails when any pack omits a
      contract token, including `--font-body`.
- [ ] Heading-vs-surface pairing enforced ≥ 3:1.
- [ ] Package-script invariants covered by a runnable test.

## Status log

- 2026-07-25T17:20 — filed by /devx rlw102 after-merge gap filing
  (Acceptance Auditor finding: eval coverage narrower than contract).
