---
gate: PASS
status_reason: 'All 33 source IDs fully covered in design mode.'
reviewer: 'devx gate coverage (design mode)'
updated: 2026-07-25
waiver: { active: false, approver: null, reason: null }
---

# Verify — _devx/workstreams/rooted-light-website — 2026-07-25

## Subject

`design.md` reviewed against `prd.md` (design mode; workstream `cdea58`).

## Coverage

| ID | Status | Where covered | Note |
|---|---|---|---|
| G-1 | ✅ | design.md Overview + Design/Architecture (style packs, review index) | Met 2026-07-25 — rlw102 shipped; pick recorded (soft lavender dusk). |
| G-2 | ✅ | design.md Overview (Astro static, content-first) + Architecture tree | Eight-route static build; tree updated with modalities.astro. |
| G-3 | ✅ | design.md Constraints + Wrap-don't-duplicate (hosted provider flows) | Booking hand-off designed; provider decision pending (INTERVIEW). |
| G-4 | ✅ | design.md Constraints (zero backend, <$5/mo) | Static S3+CloudFront target unchanged. |
| G-5 | ✅ | design.md Risks (click-depth → E-4) |  |
| G-6 | ✅ | design.md Assumptions (revised) + Risks (refinement risk → E-7) + Resolved design questions | Refinement round designed: lavender-only packs, distinct identities, Modalities nav check. |
| UC-1 | ✅ | design.md Design/Architecture (booking.url seam) + Constraints |  |
| UC-2 | ✅ | design.md Architecture (offerings/*.md incl. training + booking.training_url) |  |
| UC-3 | ✅ | design.md Constraints (inquiry-only therapy) + Interfaces (form_action) | Therapy now links to top-level /modalities/ for the catalog. |
| UC-4 | ✅ | design.md Architecture (about-me.md, about-you.md) |  |
| UC-5 | ✅ | design.md Architecture (resources/*.md) |  |
| UC-6 | ✅ | design.md Overview + Architecture (mockups routes, review index, round-2 note) | Round 2 (refinement) added; index lists round 2 first. |
| UC-7 | ✅ | design.md Migration plan + Constraints (static deploy) |  |
| CAP-1 | ✅ | design.md Architecture tree (eight routes incl. modalities.astro) | Revised 2026-07-25: Modalities top-level. |
| CAP-2 | ✅ | design.md Architecture (booking integration point, single config value) |  |
| CAP-3 | ✅ | design.md Architecture (form_action seam) + Constraints |  |
| CAP-4 | ✅ | design.md Architecture (modalities.astro with id anchors) + Interfaces (modality schema) | Catalog moved to top-level page; schema unchanged. |
| CAP-5 | ✅ | design.md Overview + Architecture (style packs, one content source) |  |
| CAP-6 | ✅ | design.md Migration plan + Constraints |  |
| FR-1 | ✅ | design.md Architecture tree + Resolved design questions (six sections / eight routes) |  |
| FR-2 | ✅ | design.md Architecture (site.json + home layouts) |  |
| FR-3 | ✅ | design.md Architecture (about-me.md three H2 subsections) |  |
| FR-4 | ✅ | design.md Architecture (about-you.md + who_benefits map) | About You deep-links /modalities/ anchors. |
| FR-5 | ✅ | design.md Architecture (resources/*.md) |  |
| FR-6 | ✅ | design.md Architecture (offerings/reiki + booking seam) + Risks (E-4) |  |
| FR-7 | ✅ | design.md Architecture (therapy: summary → /modalities/ link, form seam) | Revised: full catalog no longer on therapy page. |
| FR-8 | ✅ | design.md Constraints (tone/palette) + Resolved design questions (lavender-led) |  |
| FR-9 | ✅ | design.md Overview + Risks (E-1 distinctness) | Met via rlw102. |
| FR-10 | ✅ | design.md Out of scope (comparison artifact) — delivered by rlw104 |  |
| FR-11 | ✅ | design.md Constraints + Migration plan (S3+CloudFront) |  |
| FR-12 | ✅ | design.md Interfaces (mobile-first base.css, landmarks, E-5 tokens) |  |
| FR-13 | ✅ | design.md Architecture (modalities.astro, id anchors) + Resolved design questions | Added 2026-07-25. |
| FR-14 | ✅ | design.md Risks (E-7) + Assumptions (revised) + Architecture (pack-lavender-* mockups) | Added 2026-07-25. |

## Extras requiring product approval

- none

## Verdict detail

PASS — every source ID is ✅ covered.
