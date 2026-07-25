---
gate: CONCERNS
status_reason: 'UC-2 is ⚠️ partial (Training description content is shaped, but the student sign-up path (same booking CTA? separate flow?) is never designed.) UC-4 is ⚠️ partial (about-me/about-you routes exist, but their content source is absent from the content/ tree — approach for these pages is route-only.) (+3 more)'
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
| G-1 | ✅ | Overview, Design/Architecture, Risks | ≥6 distinct style packs from one content source behind a review index; distinctness enforced via E-1 (date is execution-stage). |
| G-2 | ✅ | Overview, Design/Architecture, Interfaces | Astro static build with all routes in pages/ tree; `npm run build` → dist/ checked by E-2. |
| G-3 | ✅ | Resolved design questions, Migration plan, Out of scope | S3+CloudFront target fixed at design level with booking integration point; provisioning explicitly deferred to deploy phase. |
| G-4 | ✅ | Constraints, Trade-offs | Zero-backend/<$5-mo is a named hard constraint; all transactional needs pushed to external hosted flows. |
| G-5 | ✅ | Risks, Design/Architecture | Booking CTA on reiki page from Home nav; click-depth guarded by E-4 link-graph check. |
| UC-1 | ✅ | Design/Architecture, Constraints, Trade-offs | offerings/reiki.astro + offerings content + single booking.url/embed config; provider keeps Kylie's schedule control. |
| UC-2 | ⚠️ | Design/Architecture (content/offerings) | Training description content is shaped, but the student sign-up path (same booking CTA? separate flow?) is never designed. |
| UC-3 | ✅ | Constraints, Design/Architecture, Interfaces | Therapy page = modality accordion + form posting to contact.form_action (or mailto); inquiry-only enforced by E-3. |
| UC-4 | ⚠️ | Design/Architecture (pages tree) | about-me/about-you routes exist, but their content source is absent from the content/ tree — approach for these pages is route-only. |
| UC-5 | ✅ | Design/Architecture, Wrap don't duplicate | content/resources/*.md explainers (modalities, reiki, reiki types) with resources routes; ICRT linked externally. |
| UC-6 | ✅ | Overview, Design/Architecture, Discarded considerations | mockups/index.astro review index; built-HTML-over-Figma explicitly chosen so Kylie reviews on her phone. |
| UC-7 | ✅ | Resolved design questions, Migration plan | Static dist/ to S3+CloudFront with mockup routes excluded from production artifact; execution deferred by design. |
| CAP-1 | ✅ | Design/Architecture | All seven routes (5 sections + reiki/therapy subpages) enumerated in the pages/ tree. |
| CAP-2 | ✅ | Design/Architecture, Unresolved design questions, Risks | Integration point fully designed (booking.url + optional embed, honest #booking-tbd placeholder); provider selection deferred to FR-10 comparison with E-6. |
| CAP-3 | ✅ | Constraints, Design/Architecture | Static form → provider endpoint or mailto via contact.form_action; small Psychology Today link named in constraints. |
| CAP-4 | ✅ | Interfaces, Resolved design questions | Full frontmatter schema (what_it_is, who_benefits, resources, certifications, order) rendered as native <details> accordion with flat-list fallback. |
| CAP-5 | ✅ | Overview, Design/Architecture, Trade-offs | Style-pack system (token CSS + home layout variant) over shared content, packaged behind one index; winner promoted to theme. |
| CAP-6 | ✅ | Resolved design questions, Migration plan, Out of scope | S3+CloudFront static target fixed; infra work explicitly deferred, matching the CAP's own deferral. |
| FR-1 | ✅ | Design/Architecture | Five sections + two offerings subpages routed; nav lives in site.json and shared page layout serves every page. |
| FR-2 | ✅ | Design/Architecture, Unresolved design questions | site.json carries name/tagline/intention/nav; neutral placeholder imagery decided; per-pack home layouts render it. |
| FR-3 | ⚠️ | Constraints, Data (TODO markers) | Experiences-placeholder handling (TODO(kylie)) is designed, but the three-subsection structure and an About Me content source are not. |
| FR-4 | ⚠️ | Design/Architecture, Interfaces | who_benefits[] data exists in the modality schema, but the About You page's modality-to-people mapping is not designed — route only. |
| FR-5 | ✅ | Design/Architecture, Wrap don't duplicate | resources/*.md explainer collection plus ICRT external reference covers the required content types. |
| FR-6 | ✅ | Design/Architecture, Constraints, Risks | Reiki page with offerings content, styled hand-off CTA via booking.url, schedule control constraint, click depth via E-4. |
| FR-7 | ✅ | Interfaces, Constraints, Risks | Modality schema matches FR-7's required fields; form-only contact enforced by E-3 DOM contract (zero booking affordances); PT link in constraints. |
| FR-8 | ✅ | Constraints, Risks | Tone/palette named as hard requirements with token-level WCAG AA validation rather than eyeballing. |
| FR-9 | ✅ | Overview, Risks, Design/Architecture | ≥6 packs differing in layout+typography+palette, mechanically enforced (E-1), one index, reviewable on phone/laptop. |
| FR-10 | ✅ | Out of scope, Risks, Unresolved design questions | Comparison doc in scope as an artifact with ≥3-provider + recommendation bar (E-6); decision correctly left to Kylie/Leo and non-blocking via config seam. |
| FR-11 | ✅ | Overview, Resolved design questions, Migration plan | Pure static dist/ to S3+CloudFront, no server-side runtime; server-creep guarded by E-2. |
| FR-12 | ⚠️ | Constraints, Resolved design questions, Discarded considerations | WCAG AA contrast (E-5) and native accessible <details> are designed, but the mobile ≥360px responsive approach and semantic-headings/alt-text baseline get only passing mention. |

## Extras requiring product approval

- Privacy-light pageview counter implied in scope ('analytics beyond a privacy-light pageview counter') — no PRD ID covers analytics — Out of scope
- TODO(kylie) greppable placeholder-marker convention — supports the placeholder non-goal but not required by any PRD item — Data
- `npm run mockups` build alias — convenience surface beyond PRD requirements — Interfaces

## Verdict detail

- UC-2 is ⚠️ partial (Training description content is shaped, but the student sign-up path (same booking CTA? separate flow?) is never designed.)
- UC-4 is ⚠️ partial (about-me/about-you routes exist, but their content source is absent from the content/ tree — approach for these pages is route-only.)
- FR-3 is ⚠️ partial (Experiences-placeholder handling (TODO(kylie)) is designed, but the three-subsection structure and an About Me content source are not.)
- FR-4 is ⚠️ partial (who_benefits[] data exists in the modality schema, but the About You page's modality-to-people mapping is not designed — route only.)
- FR-12 is ⚠️ partial (WCAG AA contrast (E-5) and native accessible <details> are designed, but the mobile ≥360px responsive approach and semantic-headings/alt-text baseline get only passing mention.)
