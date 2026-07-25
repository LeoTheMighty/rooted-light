---
gate: PASS
status_reason: 'Every runnable expectation observed RED for the right reason (6 run(s), 0 deferred).'
reviewer: 'devx gate evals'
updated: 2026-07-25
waiver: { active: false, approver: null, reason: null }
---

# RED report — _devx/workstreams/rooted-light-website — 2026-07-25

## Runs

### E-1: Mockup review package (P0)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs
- **Command**: `node E-1_mockup-package.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-1: no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phase 1/2 not landed)
  ```
- **RED verdict**: right-reason

### E-2: Full-site static build (P0)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs
- **Command**: `node E-2_site-routes.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-2: no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phase 1 not landed)
  ```
- **RED verdict**: right-reason

### E-3: Offering-page contracts (P1)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs
- **Command**: `node E-3_offering-contracts.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-3: no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phases 3/6 not landed)
  ```
- **RED verdict**: right-reason

### E-4: Booking click depth (P1)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs
- **Command**: `node E-4_click-depth.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-4: no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phase 3 not landed)
  ```
- **RED verdict**: right-reason

### E-5: Palette accessibility (P2)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs
- **Command**: `node E-5_contrast.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-5: src/styles/tokens/ missing — token packs not authored yet (feature missing: phase 2 not landed)
  ```
- **RED verdict**: right-reason

### E-6: Booking-provider comparison (P2)

- **Artifact**: _devx/workstreams/rooted-light-website/evals/E-6_provider-comparison.mjs
- **Command**: `node E-6_provider-comparison.mjs`
- **Exit code**: 1
- **Failure quote**:
  ```
  RED E-6: decisions/booking-provider-comparison.md missing — comparison not written yet (feature missing: phase 4 not landed)
  ```
- **RED verdict**: right-reason

## Deferred stubs

- none
