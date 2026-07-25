---
gate: WAIVED
status_reason: 'Mid-flight revision replay (devx revise cdea58, 2026-07-25): every UNSHIPPED expectation is RED for the right reason — E-2 (8-route revision), E-3 (modalities-page revision), E-4, and the newly authored E-7 (1 lavender pack, phase 2b missing). E-1/E-5/E-6 are green because their phases (rlw102, rlw104) already merged — shipped-green, not gate-defeating. gate evals has no mid-flight deferral; defect filed in the devx repo DEBUG.md.'
reviewer: 'devx gate evals + /devx session (hand-waived, D-9)'
updated: 2026-07-25
waiver: { active: true, approver: 'Leo Belyi (standing YOLO autonomy; 2026-07-25 instruction to proceed with the lavender refinement round)', reason: 'RED requirement is satisfiable only by unshipped expectations; E-1/E-5/E-6 green solely because rlw102/rlw104 merged. All four open expectations verified RED for the right reason.' }
---

# RED report — _devx/workstreams/rooted-light-website — 2026-07-25

## Runs

### E-1: Mockup review package (P0)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs
- **Command**: `node E-1_mockup-package.mjs`
- **Exit code**: 0
- **Failure quote**:
  ```
  E-1 PASS: 7 mockups + index, 7 distinct packs
  ```
- **RED verdict**: not-red

### E-2: Full-site static build (P0)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs
- **Command**: `node E-2_site-routes.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-2: missing route(s) in dist/: /modalities
  ```
- **RED verdict**: right-reason

### E-3: Offering-page contracts (P1)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs
- **Command**: `node E-3_offering-contracts.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-3: reiki page has no [data-cta="booking"] element (selector contract, plan.md T3.3)
  ```
- **RED verdict**: right-reason

### E-4: Booking click depth (P1)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs
- **Command**: `node E-4_click-depth.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-4: no page containing [data-cta="booking"] reachable within 3 clicks of home (booking CTA missing or buried)
  ```
- **RED verdict**: right-reason

### E-5: Palette accessibility (P2)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs
- **Command**: `node E-5_contrast.mjs`
- **Exit code**: 0
- **Failure quote**:
  ```
  E-5 PASS: 7 pack(s), 21 pairings AA-clean
  ```
- **RED verdict**: not-red

### E-6: Booking-provider comparison (P2)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-6_provider-comparison.mjs
- **Command**: `node E-6_provider-comparison.mjs`
- **Exit code**: 0
- **Failure quote**:
  ```
  E-6 PASS: 4 providers × 4 axes + recommendation
  ```
- **RED verdict**: not-red

### E-7: Lavender refinement package (added 2026-07-25) (P0)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-7_lavender-refinement.mjs
- **Command**: `node E-7_lavender-refinement.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-7: only 1 pack-lavender-*.css pack(s) — need ≥ 6 (original dusk + ≥ 5 refinements; feature missing: phase 2b not landed)
  ```
- **RED verdict**: right-reason

## Deferred stubs

- none
