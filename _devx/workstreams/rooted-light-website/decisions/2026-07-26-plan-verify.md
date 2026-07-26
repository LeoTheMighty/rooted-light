---
gate: PASS
status_reason: 'All 7 source IDs fully covered in plan mode.'
reviewer: 'devx gate coverage (plan mode)'
updated: 2026-07-26
waiver: { active: false, approver: null, reason: null }
---

# Verify — _devx/workstreams/rooted-light-website — 2026-07-26

## Subject

`plan.md` reviewed against `design.md + expectations.md` (plan mode; workstream `cdea58`).

## Coverage

| ID | Status | Where covered | Note |
|---|---|---|---|
| E-1 | ✅ | plan.md phase 2 / coverage table row E-1 — _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs | Table row: phase 2, tests-first, full; phase 2 verification plan runs evals/E-1_mockup-package.mjs by exact path. |
| E-2 | ✅ | plan.md phase 3 / coverage table row E-2 — _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs | Mapped full; phase 3 runs evals/E-2_site-routes.mjs. Judge flagged stale '7 routes' wording in phase 3's success criterion + Desired state — fixed to 8 routes / 6-nav during this judgment (2026-07-26); phase 1's 'seven routes' left as historical record of the shipped phase. |
| E-3 | ✅ | plan.md phase 6b / coverage table row E-3 — _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs | Table row: phase 6b, full; phase 6b runs E-3_offering-contracts.mjs flagless and T6b.2 delivers the new data-cta="booking-training" CTA plus live hrefs; therapy DOM assertions stay green from phase 3, form-action liveness human-verified in 6c without weakening the eval. |
| E-4 | ✅ | plan.md phase 3 / coverage table row E-4 — _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs | Table row: phase 3, full; phase 3 runs E-4_click-depth.mjs on the data-cta="booking" element, and phase 6b re-runs it against the live CTA. |
| E-5 | ✅ | plan.md phase 2 / coverage table row E-5 — _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs | Table row: phase 2, full; phase 2 runs E-5_contrast.mjs (T2.4 tunes until green), with the documented src/styles/tokens source-file exception; re-run in 2b and 5. |
| E-6 | ✅ | plan.md phase 4 / coverage table row E-6 — _devx/workstreams/rooted-light-website/evals/E-6_provider-comparison.mjs | Table row: phase 4, full; phase 4 verification runs E-6_provider-comparison.mjs against the decisions doc (≥3 providers × 4 axes + recommendation). |
| E-7 | ✅ | plan.md phase 2b / coverage table row E-7 — _devx/workstreams/rooted-light-website/evals/E-7_lavender-refinement.mjs | Table row: phase 2b, full; phase 2b runs E-7_lavender-refinement.mjs (authored RED before 2b); preamble E-count wording updated to E-1..E-7 during this judgment. |

## Extras requiring product approval

- none

## Verdict detail

PASS — every source ID is ✅ covered.
