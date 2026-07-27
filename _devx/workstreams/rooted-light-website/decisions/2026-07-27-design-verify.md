---
gate: PASS
status_reason: 'All 33 source IDs fully covered in design mode.'
reviewer: 'devx gate coverage (design mode)'
updated: 2026-07-27
waiver: { active: false, approver: null, reason: null }
---

# Verify — _devx/workstreams/rooted-light-website — 2026-07-27

## Subject

`design.md` reviewed against `prd.md` (design mode; workstream `cdea58`).

## Coverage

| ID | Status | Where covered | Note |
|---|---|---|---|
| G-1 | ✅ | design.md §Overview, §Design/Architecture (mockups/index.astro, mockups/<pack>.astro), §Risks (E-1) | 6+ swappable style packs rendered from one content source behind a single shareable review index; distinctness enforced by E-1. Unchanged by the rlw116 revision (mockup routes untouched). |
| G-2 | ✅ | design.md §Design/Architecture (pages tree, revised 2026-07-26), §Interfaces (npm run build → dist/), §Risks (E-2) | The site builds statically as one scrollable page (hero → quote → About/Services/Modalities/Resources anchor sections) plus standalone resource detail routes; TODO(kylie) placeholders cover pending copy. All five former sections' content survives as sections. |
| G-3 | ✅ | design.md §Resolved design questions (hosting supersession 2026-07-27), §Out of scope (DNS repoint), decisions/2026-07-26-domain-reuse-squarespace.md | Hosting fully specified: GitHub Pages permanent (auto-HTTPS, no cache/route mapping to design), domain = Kylie’s existing Squarespace registration attached by DNS repoint per the decision doc; booking path designed (Calendly link-out). The former partial (AWS provisioning mechanics undesigned) is moot — there is no AWS. |
| G-4 | ✅ | design.md §Constraints (zero backend, <$5/mo), §Trade-offs, §Discarded considerations | Pure static output with all dynamic behavior delegated to hosted providers; Squarespace/Wix discarded on cost; hosting now $0/mo on Pages (2026-07-27), beating the <$5 bar outright. |
| G-5 | ✅ | design.md §Risks (E-4), §Design/Booking integration point, §Architecture (index.astro #services carries both booking CTAs) | Under the single-page IA the booking CTA lives on the home page itself — depth 0 — with E-4's ≤3-click walk kept as a regression guard. |
| G-6 | ✅ | design.md §Assumptions (broken assumption), §Risks (E-7), §Architecture (pack-lavender-*, mockups index round 2 first) | Scoped lavender-only refinement round designed with distinct-identity enforcement and Modalities nav check on every mockup. |
| UC-1 | ✅ | design.md §Architecture (content/offerings, index.astro #services reiki block), §Booking integration point | Reiki explainer content plus Calendly session event-type link-out with PayPal collect-at-booking; the reiki surface is now the reiki block of the Services section. |
| UC-2 | ✅ | design.md §Architecture (offerings/*.md training CTA), §Booking integration point (booking.training_url) | Training description carries its own sign-up CTA resolving to the Calendly group event type; renders in the Services section's reiki block. |
| UC-3 | ✅ | design.md §Constraints (therapy inquiry-only), §Architecture (index.astro #services therapy block), §Design/Therapy inquiry form | Therapy block carries the modality summary deep-linking #modalities anchors, the static form posting to contact.form_action, PT link, 988 note; SimplePractice after first contact. About You removed (FR-4) — the who-benefits data stays in the catalog. |
| UC-4 | ✅ | design.md §Architecture (about-me.md; index.astro #about section) | The About section (renamed from About Me) folds the three-subsection content file into the one-pager; About You is removed per the revised FR-4/UC-4. |
| UC-5 | ✅ | design.md §Architecture (content/resources/*.md, resources/[slug].astro kept standalone), §Wrap don't duplicate (ICRT links) | Explainer collection with cards in the #resources section; detail pages deliberately remain real routes (SEO/scannability rationale in the overturned discarded-consideration). |
| UC-6 | ✅ | design.md §Architecture (mockups/index.astro), §Discarded considerations (Figma), §Interfaces (mobile-first base.css) | Built HTML mockups behind one index specifically so Kylie can browse and compare on her phone or laptop. |
| UC-7 | ✅ | design.md §Overview (pure static hosting on Pages), §Resolved design questions (hosting supersession), §Migration plan (mockup exclusion) | The deploy path is the already-running rlw112 Pages workflow — exercised on every merge; remaining production hygiene (mockup prune, un-noindex, DNS repoint) is specified in plan phase 7. |
| CAP-1 | ✅ | design.md §Architecture (pages tree, revised), §Resolved design questions (one-page decision, 2026-07-26) | Single scrollable page with anchored About/Services/Modalities/Resources sections, anchor nav, resource detail routes standalone, former routes redirecting — matching CAP-1 as revised for rlw116. |
| CAP-2 | ✅ | design.md §Design/Booking integration point, §Resolved design questions | Calendly Standard, link-out, two seams (booking.url + booking.training_url), PayPal collect-at-booking, provisioning runbook docs/CALENDLY-SETUP.md. Seams untouched by the fold-in. |
| CAP-3 | ✅ | design.md §Design/Therapy inquiry form, §Constraints, §Assumptions | Static form to a provider endpoint or mailto via single contact.form_action config, plus a small Psychology Today link and no booking widget — now inside the Services section's therapy block. |
| CAP-4 | ✅ | design.md §Interfaces (modality frontmatter schema), §Architecture (index.astro #modalities), §Resolved design questions | Schema carries summary/what_it_is/who_benefits/resources/certifications rendered as a <details> accordion with stable anchors, now page-global fragments on the one-pager. |
| CAP-5 | ✅ | design.md §Overview, §Architecture (styles/tokens pack-<name>.css, layouts, mockups/), §Trade-offs | Style-pack pipeline builds all mockups from the same content source into one review index. |
| CAP-6 | ✅ | design.md §Overview, §Resolved design questions (hosting supersession 2026-07-27) | Static build output deploys to GitHub Pages continuously today; CAP-6 revised 2026-07-27 to match (was S3+CloudFront deferred). |
| FR-1 | ✅ | design.md §Architecture (pages tree + redirects note), §Resolved design questions (one-page decision) | One scrollable page with the section order and stable anchors, anchor nav Home·About·Services·Modalities·Resources, banned legacy labels, former routes redirecting via astro.config redirects. |
| FR-2 | ✅ | design.md §Architecture (site.json name/owner_line/intention; public/ placeholders), §Resolved design questions (site name) | Hero placeholder imagery, site name Rooted Light Healing + owner line + single intention line (tagline dropped from hero per revised FR-2), pill CTA to #services; copy values live in site.json. |
| FR-3 | ✅ | design.md §Architecture (about-me.md) | Three subsections named explicitly, with Experiences marked TODO(kylie); folds into the #about section under the renamed About heading. |
| FR-4 | ✅ | design.md §Architecture (about-you.md deletion note), §Discarded considerations (overturn note) | FR-4 is a removal requirement as revised: design documents the deletion of about-you.md/route/nav and notes who_benefits data survives in modalities/*.md. Nothing left to design. |
| FR-5 | ✅ | design.md §Architecture (content/resources/*.md, resources/[slug].astro), §Wrap don't duplicate | Explainers for modalities, reiki, and reiki types; ICRT reference reused as external links; cards in #resources, full text on standalone routes. |
| FR-6 | ✅ | design.md §Design/Booking integration point, §Architecture (index.astro #services reiki block), §Risks (E-4) | Two Calendly event-type hand-off CTAs (session + training) as link-outs in the reiki block, click-depth-checked from Home (depth 0 on the one-pager); therapy stays inquiry-only. |
| FR-7 | ✅ | design.md §Constraints, §Architecture (index.astro #services therapy block), §Risks (E-3) | Form-only contact path with Psychology Today link, 988 note, and short modality summary deep-linking the #modalities anchors; DOM contract asserts zero booking affordances scoped to the therapy block. |
| FR-8 | ✅ | design.md §Constraints (tone/palette), §Resolved design questions (soft lavender dusk), §Risks (E-5) | Soft earthy, lavender-led, not kitschy/glamorous, with token-level WCAG AA validation. |
| FR-9 | ✅ | design.md §Overview, §Architecture (mockups/<pack>.astro), §Risks (E-1) | 6+ packs differing in layout, typography, and palette treatment from one content source behind one index. |
| FR-10 | ✅ | design.md §Out of scope, §Risks (E-6), §Trade-offs (form provider) | Written ≥3-provider comparison is scoped as a required artifact before integration with E-6 as proof; the resulting decision (Calendly) is now reflected in the design. |
| FR-11 | ✅ | design.md §Overview, §Constraints, §Risks (E-2), §Resolved design questions (hosting supersession) | Astro static output served by GitHub Pages, custom domain by DNS repoint with auto-HTTPS; no server-side runtime, no AWS; E-2 guards the no-runtime property. |
| FR-12 | ✅ | design.md §Interfaces (responsive/accessibility baseline), §Risks (E-5) | Mobile-first base.css at 360px, CSS-only nav collapse, single h1 + landmarks + required alt, token-validated AA contrast; the one-pager keeps the single h1 (hero) with sections at h2. |
| FR-13 | ✅ | design.md §Architecture (index.astro #modalities), §Interfaces (frontmatter schema), §Resolved design questions (superseded-location note) | The catalog renders the CAP-4 contract as a <details> accordion in the #modalities section with stable per-modality id anchors as page-global fragments. |
| FR-14 | ✅ | design.md §Assumptions, §Risks (E-7), §Architecture (pack-lavender-*, mockups/index.astro round 2 first) | ≥5 lavender-led simple refinements from the same content with distinct accent/heading identities and Modalities nav checked on every mockup in both rounds. |

## Extras requiring product approval

- none

## Verdict detail

PASS — every source ID is ✅ covered.
