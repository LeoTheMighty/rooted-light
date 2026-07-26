---
gate: CONCERNS
status_reason: 'G-3 is ⚠️ partial (Booking path fully designed (Calendly link-out) and S3+CloudFront fixed as the target, but domain/DNS/CloudFront provisioning mechanics are explicitly deferred to the deploy phase — no design detail on TLS, cache, or route mapping.) UC-7 is ⚠️ partial (Static artifact shape and mockup-route exclusion from the deploy artifact are specified, but the actual deploy path (bucket/distribution/DNS steps) is out of scope here.)'
reviewer: 'devx gate coverage (design mode)'
updated: 2026-07-26
waiver: { active: false, approver: null, reason: null }
---

# Verify — _devx/workstreams/rooted-light-website — 2026-07-26

## Subject

`design.md` reviewed against `prd.md` (design mode; workstream `cdea58`).

## Coverage

| ID | Status | Where covered | Note |
|---|---|---|---|
| G-1 | ✅ | design.md §Overview, §Design/Architecture (mockups/index.astro, mockups/<pack>.astro), §Risks (E-1) | 6+ swappable style packs rendered from one content source behind a single shareable review index; distinctness enforced by E-1. |
| G-2 | ✅ | design.md §Design/Architecture (pages tree), §Interfaces (npm run build → dist/), §Risks (E-2) | All sections plus offering subpages exist as static Astro routes; TODO(kylie) placeholders cover pending copy. |
| G-3 | ⚠️ | design.md §Overview, §Out of scope, §Resolved design questions (hosting shape) | Booking path fully designed (Calendly link-out) and S3+CloudFront fixed as the target, but domain/DNS/CloudFront provisioning mechanics are explicitly deferred to the deploy phase — no design detail on TLS, cache, or route mapping. |
| G-4 | ✅ | design.md §Constraints (zero backend, <$5/mo), §Trade-offs, §Discarded considerations | Pure static output with all dynamic behavior delegated to hosted providers; Squarespace/Wix discarded on cost. |
| G-5 | ✅ | design.md §Risks (E-4), §Design/Booking integration point | Click-depth check from Home to booking CTA; link-out decision explicitly reasoned against G-5's ≤3-click measure. |
| G-6 | ✅ | design.md §Assumptions (broken assumption), §Risks (E-7), §Architecture (pack-lavender-*, mockups index round 2 first) | Scoped lavender-only refinement round designed with distinct-identity enforcement and Modalities nav check on every mockup. |
| UC-1 | ✅ | design.md §Architecture (content/offerings, pages/offerings/reiki.astro), §Booking integration point | Reiki explainer content plus Calendly session event-type link-out with PayPal collect-at-booking; Kylie owns availability in Calendly. |
| UC-2 | ✅ | design.md §Architecture (offerings/*.md training CTA), §Booking integration point (booking.training_url) | Training description carries its own sign-up CTA resolving to the Calendly group event type. |
| UC-3 | ✅ | design.md §Constraints (therapy inquiry-only), §Architecture (offerings/therapy.astro), §Design/Therapy inquiry form | About You + modality summary linking to /modalities/, with a static form posting to contact.form_action (or mailto) and SimplePractice after first contact. |
| UC-4 | ✅ | design.md §Architecture (about-me.md, about-you.md; pages/about-me.astro, about-you.astro) | Both pages are first-class content files/routes with defined subsection structure. |
| UC-5 | ✅ | design.md §Architecture (content/resources/*.md, pages/resources/…), §Wrap don't duplicate (ICRT links) | Explainer collection for modalities, reiki, and reiki types plus reused ICRT reference links. |
| UC-6 | ✅ | design.md §Architecture (mockups/index.astro), §Discarded considerations (Figma), §Interfaces (mobile-first base.css) | Built HTML mockups behind one index specifically so Kylie can browse and compare on her phone or laptop. |
| UC-7 | ⚠️ | design.md §Overview, §Out of scope, §Migration plan | Static artifact shape and mockup-route exclusion from the deploy artifact are specified, but the actual deploy path (bucket/distribution/DNS steps) is out of scope here. |
| CAP-1 | ✅ | design.md §Architecture (pages tree), §Resolved design questions (six sections / eight routes) | Every IA section including top-level Modalities is a routed Astro page with Offerings split into reiki and therapy. |
| CAP-2 | ✅ | design.md §Design/Booking integration point, §Resolved design questions | Calendly Standard, link-out, two seams (booking.url + booking.training_url), PayPal collect-at-booking, provisioning runbook docs/CALENDLY-SETUP.md. |
| CAP-3 | ✅ | design.md §Design/Therapy inquiry form, §Constraints, §Assumptions | Static form to a provider endpoint or mailto via single contact.form_action config, plus a small Psychology Today link and no booking widget. |
| CAP-4 | ✅ | design.md §Interfaces (modality frontmatter schema), §Architecture (modalities.astro), §Resolved design questions | Schema carries summary/what_it_is/who_benefits/resources/certifications rendered as a <details> accordion with stable anchors; one stale Interfaces sentence still says 'the therapy page renders the collection'. |
| CAP-5 | ✅ | design.md §Overview, §Architecture (styles/tokens pack-<name>.css, layouts, mockups/), §Trade-offs | Style-pack pipeline builds all mockups from the same content source into one review index. |
| CAP-6 | ✅ | design.md §Overview, §Out of scope, §Resolved design questions (hosting shape) | Pure static S3+CloudFront target fixed with infra execution deliberately deferred, matching CAP-6's own deferral. |
| FR-1 | ✅ | design.md §Architecture (pages tree), §Architecture (site.json nav), §Interfaces (nav collapses under 640px) | Eight routes across six top-level sections; nav sourced from site.json in the shared layout so every page reaches every section. |
| FR-2 | ✅ | design.md §Architecture (site.json name/tagline/intention words; public/ placeholders; layouts home variants) | Hero placeholder imagery, name plus one-line intention, and nav/home layout paths into About, Offerings, and Resources. |
| FR-3 | ✅ | design.md §Architecture (about-me.md) | Three H2 subsections named explicitly, with Experiences marked TODO(kylie). |
| FR-4 | ✅ | design.md §Architecture (about-you.md) | Who-benefits narrative closing with a modality→people map generated from the modalities collection's who_benefits[] fields. |
| FR-5 | ✅ | design.md §Architecture (content/resources/*.md, pages/resources/…), §Wrap don't duplicate | Explainers for modalities, reiki, and reiki types; ICRT reference reused as external links. |
| FR-6 | ✅ | design.md §Design/Booking integration point, §Architecture (offerings/reiki.astro, offerings/*.md), §Risks (E-4) | Two Calendly event-type hand-off CTAs (session + training) as link-outs, click-depth-checked from Home; therapy stays inquiry-only. |
| FR-7 | ✅ | design.md §Constraints, §Architecture (offerings/therapy.astro), §Risks (E-3) | Form-only contact path with Psychology Today link and short modality summary linking to /modalities/; DOM contract asserts zero booking affordances. |
| FR-8 | ✅ | design.md §Constraints (tone/palette), §Resolved design questions (soft lavender dusk), §Risks (E-5) | Soft earthy, lavender-led, not kitschy/glamorous, with token-level WCAG AA validation. |
| FR-9 | ✅ | design.md §Overview, §Architecture (mockups/<pack>.astro), §Risks (E-1) | 6+ packs differing in layout, typography, and palette treatment from one content source behind one index. |
| FR-10 | ✅ | design.md §Out of scope, §Risks (E-6), §Trade-offs (form provider) | Written ≥3-provider comparison is scoped as a required artifact before integration with E-6 as proof; the resulting decision (Calendly) is now reflected in the design. |
| FR-11 | ✅ | design.md §Overview, §Constraints, §Risks (E-2), §Interfaces (npm run build → dist/) | Astro static output to dist/ with an explicit guard against creeping server dependencies. |
| FR-12 | ✅ | design.md §Interfaces (responsive/accessibility baseline), §Risks (E-5) | Mobile-first base.css at 360px, CSS-only nav collapse, single h1 + landmarks + required alt, token-validated AA contrast. |
| FR-13 | ✅ | design.md §Architecture (pages/modalities.astro), §Interfaces (frontmatter schema), §Resolved design questions | Top-level catalog rendering the CAP-4 contract as a <details> accordion with stable per-modality id anchors for deep links. |
| FR-14 | ✅ | design.md §Assumptions, §Risks (E-7), §Architecture (pack-lavender-*, mockups/index.astro round 2 first) | ≥5 lavender-led simple refinements from the same content with distinct accent/heading identities and Modalities nav checked on every mockup in both rounds. |

## Extras requiring product approval

- none

## Verdict detail

- G-3 is ⚠️ partial (Booking path fully designed (Calendly link-out) and S3+CloudFront fixed as the target, but domain/DNS/CloudFront provisioning mechanics are explicitly deferred to the deploy phase — no design detail on TLS, cache, or route mapping.)
- UC-7 is ⚠️ partial (Static artifact shape and mockup-route exclusion from the deploy artifact are specified, but the actual deploy path (bucket/distribution/DNS steps) is out of scope here.)
