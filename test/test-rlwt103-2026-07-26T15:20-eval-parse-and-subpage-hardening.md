---
hash: rlwt103
type: test
created: 2026-07-26T15:20:00-06:00
title: Eval hardening — align comment-stripping across parsers; extend E-7 to subpages
from: dev/dev-rlw111-2026-07-26T14:53-tan-lilac-decision-round.md (phase-4 review findings)
status: ready
---

## Goal

Two latent guardrail gaps surfaced by rlw111's adversarial review — both
unexploited today (verified manually), neither fixed in-item because
E-1/E-5/E-7 are workstream RED-artifact contracts and hardening them
mid-dev-item risks the contract:

1. **Three-way comment-strip divergence.** E-1 and E-5 parse pack tokens
   from RAW CSS; E-7, the review index, and GroundedPage strip `/* … */`
   comments first. A future pack with a commented-out declaration above
   the real one (`/* --color-accent: #old; */`) would make E-1's
   uniqueness / E-5's AA checks validate a value the built pages don't
   use. Fix: same strip-then-match helper in all parsers.
2. **E-7 scans only direct children of dist/mockups/.** The "Modalities
   nav on every mockup page" contract is unguarded for the multi-page
   variants' subpages (rounds 3–4: 40 subpages today, all carrying the
   nav via the shared skeleton). Fix: extend the scan to
   `dist/mockups/*/*/index.html`.

## Acceptance criteria

- [ ] One shared token-parse rule (comment-stripped) across E-1, E-5,
      E-7, index.astro, and GroundedPage — or a single imported helper
- [ ] E-7 asserts the Modalities regex on subpage index.html files too
- [ ] Both evals still green on the current build; a deliberate
      regression (commented-out accent decoy; subpage without nav)
      turns them red

## Status log

- 2026-07-26T15:20 — filed by /devx from rlw111 phase-4 findings
  (Blind Hunter #2, Acceptance Auditor #2).
