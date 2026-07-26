---
hash: cdea58
type: plan
created: 2026-07-25T08:55:55-06:00
title: Rooted Light Website
status: in-progress
stage: red
entered_at: prd
gate_status:
  prd_validated: true
  design_verified: true
  plan_verified: true
  evals_red: true
outcome:
  status: null
  measure_by: null
workstream: _devx/workstreams/rooted-light-website
gate_verdicts:
  prd: PASS
  design: CONCERNS
  plan: PASS
  evals: FAIL
---

## Goal

Workstream 'Rooted Light Website' — PRD stage next. Artifacts live in `_devx/workstreams/rooted-light-website/`.

## Status log

- 2026-07-25T08:55 — workstream scaffolded by `devx workstream new rooted-light-website`.
- 2026-07-25 — PRD stage: drafted prd.md + expectations.md (6 E-blocks) from Leo's outline + brainstorm whiteboard (IMG_0512, 2026-07-24); `devx gate prd cdea58` → PASS (prd_validated, stage: design). Artifacts: _devx/workstreams/rooted-light-website/{prd.md,expectations.md}.
- 2026-07-25 — Design stage: authored design.md (Astro static site, style-pack mockup system, external booking/form seams); coverage judged by subagent; `devx gate coverage cdea58 --table …` → CONCERNS (5 ⚠️ partials: UC-2, UC-4, FR-3, FR-4, FR-12 — all patched into design.md post-gate; design_verified, stage: plan). Artifacts: design.md, decisions/2026-07-25-design-verify.md.
- 2026-07-25 — Plan stage: authored plan.md (7 phases, dated to G-1/G-3); critique pass ran (4 lenses, plan spans ≥2 stack surfaces) — 14 findings accepted (phase-6 build-profile contradiction, phase-5 split, delivery channel for mockups, Astro v5 fixes, eval hook contracts, --allow-placeholder hole, launch content checkpoint), 1 reinterpreted (evals authored at RED, not by phases); coverage judged 6✅; `devx gate coverage cdea58 --table …` → PASS (plan_verified, stage: red). Artifacts: plan.md, decisions/2026-07-25-plan-critique.md, decisions/2026-07-25-plan-verify.md.
- 2026-07-25 — RED stage: authored 6 zero-dep eval scripts at the exact Verified-by paths; added `projects:` runner (evals dir, `test: node`) to devx.config.yaml; `devx gate evals cdea58` → PASS, all 6 observed RED right-reason (RED-report.md verified line-by-line; evals_red, stage: executing). Emitted dev specs rlw101–rlw107 (one per phase; rlw105/106/107 blocked on human gates) + rlwret retro via emit-retro-story; DEV.md rows in dependency order; `devx plan-helper validate-emit rooted-light-website` → ok. PLAN.md entry added [x]. User decisions filed to INTERVIEW.md: domain, reiki payment timing, Kylie content list.
- 2026-07-25 — REVISION (Leo's decision: soft lavender dusk picked, keep simple; Modalities → top-level section; lavender refinement round ordered): `devx revise cdea58 --touched prd.md` → 4 flags reset. prd.md (+G-6, FR-13, FR-14, FR-1/7/8 revised, CAP-1/4 revised), expectations.md (E-2/E-3 revised, +E-7), design.md (IA tree, risks, assumptions, resolved questions), plan.md (+phase 2b, phase 3 revised to 8 routes, coverage row E-7). Evals: E-2/E-3 revised, E-7 authored RED (verified right-reason). Replay: gate prd PASS, coverage(design) PASS 33✅, coverage(plan) PASS 7✅, gate evals FAIL→WAIVED (D-9 waiver in RED-report.md: E-1/E-5/E-6 green because rlw102/rlw104 shipped; all 4 open expectations RED right-reason; mid-flight-awareness defect filed in devx repo DEBUG.md); evals_red flipped true per waiver. Emitted rlw108 (phase 2b); rlw103 scope revised; rlw105 gate rewired to rlw108 pick.
- 2026-07-26 — REVISION (Leo's decision: **Calendly** — "create all the tickets so Ky just picks her schedule and clients book + pay for Reiki and Reiki Training exclusively"): `devx revise cdea58 --touched prd.md` → 4 flags reset. INTERVIEW.md: provider answered (Calendly Standard, PayPal collect-at-booking), payment timing answered by implication (full pay-at-booking — Calendly's only mode), new entry for Kylie's event-type numbers; form provider stays open. prd.md (FR-6 revised: two CTAs session+training; CAP-2 stamped; open questions resolved), expectations.md (E-3 revised: +UC-2 covers, training CTA `data-cta="booking-training"` threshold), design.md (Calendly link-out decision + rationale, zero-client-JS preserved; stale accordion wording fixed), plan.md (phase 6 → 6a runbook / 6b booking wiring / 6c therapy form; stale 7-route wording fixed; shipped-phase checkboxes reconciled). Evals: E-3 revised, verified RED right-reason (#booking-tbd, feature missing). Replay: gate prd PASS, coverage(design) CONCERNS (G-3/UC-7 deploy-execution partials — phase 7's job), coverage(plan) PASS 7✅, gate evals FAIL→WAIVED (D-9, same mid-flight shape as 2026-07-25: 6 of 7 evals shipped-green, sole open E-3 RED right-reason); evals_red flipped true per waiver. Critique pass skipped (send-it; revision touches docs+config+one page — under min_surfaces). Emitted rlw114 (6a; renumbered from rlw112 — hash taken mid-session by the GH Pages preview spec) + rlw113 (6c); rlw106 rescoped in place to 6b; rlw107 gating updated (rlw106+rlw113); MANUAL.md "Calendly connection chain" filed (8 steps, PayPal-Business-first). validate-emit ok.
