# Expectations — Rooted Light Website

<!-- Gate 1 input. Minimum 3 E-blocks (config: engine.expectations_min).
     Every business goal (G-) must be covered by at least one expectation;
     every Covers: ID must resolve in prd.md. EARS regex enforced by
     `devx gate prd`: "When .+, the system SHALL .+". A P0 with a vague
     Verified-by target fails the gate. -->

## E-1: Mockup review package

- **Priority:** P0
- **Covers:** G-1, UC-6, CAP-5, FR-8, FR-9
- **Trigger:** the design-exploration build is run
- **Expectation (EARS):** When the design-exploration build is run, the
  system SHALL emit a static review package containing an index page and
  at least 6 home-page mockups, each a distinct style direction rendered
  from the same content source.
- **Threshold:** ≥ 6 mockup HTML pages + 1 index linking to all of them;
  each mockup declares a distinct style identity (no two mockups share
  the same primary palette tokens + heading font pair).
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs

## E-2: Full-site static build

- **Priority:** P0
- **Covers:** G-2, G-4, CAP-1, CAP-6, FR-1, FR-11, UC-7
- **Trigger:** the site build command is run
- **Expectation (EARS):** When the site build command is run, the system
  SHALL produce a fully static output containing all seven routes (Home,
  About Me, About You, Resources, Offerings index or landing, Reiki &
  Reiki Training, Therapy) with global navigation reaching every
  section, and no server-side runtime required to serve it.
- **Threshold:** all 7 routes present as static HTML in build output;
  every page's nav links to all 5 top-level sections; exit code 0.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs

## E-3: Offering-page contracts

- **Priority:** P1
- **Covers:** UC-1, UC-3, CAP-2, CAP-3, CAP-4, FR-6, FR-7
- **Trigger:** the built reiki and therapy pages are inspected
- **Expectation (EARS):** When the built reiki and therapy pages are
  inspected, the system SHALL show an external booking call-to-action on
  the reiki page, and on the therapy page an email inquiry form, a
  Psychology Today link, a modality list with per-modality description /
  who-benefits / resources / certifications, and no booking widget.
- **Threshold:** reiki page: ≥ 1 booking CTA whose href resolves
  off-site (or to the provider embed); therapy page: form element
  present, "psychologytoday.com" link present, 0 booking embeds/links,
  every listed modality has the 4 required content fields.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs

## E-4: Booking click depth

- **Priority:** P1
- **Covers:** G-5, UC-1, FR-6
- **Trigger:** the link graph of the built site is walked from the home page
- **Expectation (EARS):** When the link graph of the built site is walked
  from the home page, the system SHALL expose a path to the reiki
  booking call-to-action in at most 3 clicks.
- **Threshold:** shortest path Home → booking CTA ≤ 3 link traversals.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs

## E-5: Palette accessibility

- **Priority:** P2
- **Covers:** FR-8, FR-12, UC-4
- **Trigger:** the design-token palette is checked
- **Expectation (EARS):** When the design-token palette is checked, the
  system SHALL provide text/background token pairings that meet WCAG AA
  contrast while staying within the soft earthy palette.
- **Threshold:** every declared body-text pairing ≥ 4.5:1; large-text /
  heading pairings ≥ 3:1.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs

## E-6: Booking-provider comparison

- **Priority:** P2
- **Covers:** FR-10, CAP-2, G-3
- **Trigger:** the provider-comparison document is reviewed before booking integration
- **Expectation (EARS):** When the provider-comparison document is
  reviewed before booking integration, the system SHALL present at least
  3 providers compared on fees, client friction, schedule control, and
  PayPal support, with a recommendation.
- **Threshold:** ≥ 3 provider sections, each covering the 4 comparison
  axes; 1 explicit recommendation section.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-6_provider-comparison.mjs
