---
gate: WAIVED
status_reason: 'Mid-flight revision replay (devx revise cdea58, 2026-07-26 — Calendly decision): the only open expectation, E-3 (revised: session + training CTAs with live off-site hrefs), is RED for the right reason — reiki booking CTA href is #booking-tbd, booking not wired (phase 6b missing); the training-CTA assertion sits behind the same missing feature. E-1/E-2/E-4/E-5/E-6/E-7 are green because their phases (rlw102/rlw108–111, rlw103, rlw104, rlw105) already merged — shipped-green, not gate-defeating. Same mid-flight-awareness defect as the 2026-07-25 waiver (filed in devx repo DEBUG.md).'
reviewer: 'devx gate evals + /devx-plan session (hand-waived, D-9)'
updated: 2026-07-26
waiver: { active: true, approver: 'Leo Belyi (standing YOLO autonomy; 2026-07-26 instruction to plan the Calendly setup)', reason: 'RED requirement is satisfiable only by unshipped expectations; six of seven evals green solely because their phases merged. The single open expectation E-3 verified RED for the right reason (feature missing, not wiring error).' }
---

# RED report — _devx/workstreams/rooted-light-website — 2026-07-26

## Runs

### E-1: Mockup review package (P0)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs
- **Command**: `node E-1_mockup-package.mjs`
- **Exit code**: 0
- **Failure quote**:
  ```
  E-1 PASS: 22 mockups + index, 18 distinct packs
  ```
- **RED verdict**: not-red

### E-2: Full-site static build (P0)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs
- **Command**: `node E-2_site-routes.mjs`
- **Exit code**: 0
- **Failure quote**:
  ```
  E-2 PASS: 8 routes present, nav complete on every page
  ```
- **RED verdict**: not-red

### E-3: Offering-page contracts (P1)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs
- **Command**: `node E-3_offering-contracts.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-3: reiki booking CTA href is not off-site (#booking-tbd, #booking-tbd) and no provider embed found — booking not wired (phase 6b)
  ```
- **RED verdict**: right-reason

### E-4: Booking click depth (P1)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs
- **Command**: `node E-4_click-depth.mjs`
- **Exit code**: 0
- **Failure quote**:
  ```
  E-4 PASS: booking CTA reachable at /offerings/reiki/ in 2 click(s)
  ```
- **RED verdict**: not-red

### E-5: Palette accessibility (P2)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs
- **Command**: `node E-5_contrast.mjs`
- **Exit code**: 0
- **Failure quote**:
  ```
  E-5 PASS: 18 pack(s), 54 pairings AA-clean
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
- **Exit code**: 0
- **Failure quote**:
  ```
  E-7 PASS: 6 lavender packs (5 refinements), 18 distinct identities, Modalities nav on all 22 mockups
  ```
- **RED verdict**: not-red

## Deferred stubs

- none
