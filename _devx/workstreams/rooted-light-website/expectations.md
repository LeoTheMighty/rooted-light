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

<!-- Revised 2026-07-25: Modalities promoted to top level (FR-1/FR-13) —
     seven routes → eight, five nav sections → six.
     Revised 2026-07-26 (rlw116): single-page IA — the eight-route
     assertion becomes a one-scrollable-page assertion: hero → quote →
     About → Services → Modalities → Resources sections with stable
     anchors, anchor nav, banned legacy labels, name change to
     "Rooted Light Healing", resource detail routes still standalone,
     old routes redirecting. -->

- **Priority:** P0
- **Covers:** G-2, G-4, CAP-1, CAP-6, FR-1, FR-11, FR-13, UC-7
- **Trigger:** the site build command is run
- **Expectation (EARS):** When the site build command is run, the system
  SHALL produce a fully static output whose home page is a single
  scrollable document containing, in order: the full-screen hero, the
  quote band, and About / Services / Modalities / Resources sections
  each with a stable id anchor; whose navigation reads Home · About ·
  Services · Modalities · Resources linking to those anchors; which
  presents no "About You" or "Offerings" label anywhere user-visible;
  which carries the site name "Rooted Light Healing"; and which requires
  no server-side runtime to serve.
- **Threshold:** dist/index.html contains ids `about`, `services`,
  `modalities`, `resources` in that document order, preceded by the
  hero and quote band; nav on the home page and on every remaining
  standalone route links all four section anchors + home; zero
  user-visible "About You"/"Offerings" labels; "Rooted Light Healing"
  in the `<title>`, nav brand, and hero h1; each resources-collection
  entry still renders as a standalone route; each former top-level
  route (/about-me/, /about-you/, /offerings/, /offerings/reiki/,
  /offerings/therapy/, /modalities/, /resources/) either absent or a
  redirect page targeting the one-pager; exit code 0.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs

## E-3: Offering-page contracts

<!-- Revised 2026-07-25: the four-field modality contract moved to the
     top-level Modalities page (FR-13); therapy keeps form/PT/no-booking
     and must link to /modalities/.
     Revised 2026-07-26: Calendly decided — sessions and trainings are
     separate event types, so the reiki page must carry BOTH a session
     booking CTA and a training signup CTA (UC-2 was previously
     unenforced).
     Revised 2026-07-26 (rlw116): single-page IA — the same selector
     contracts, scoped to the one-pager's sections instead of routes.
     The therapy no-booking assertion applies to the therapy block of
     the Services section; modality links target in-page anchors. -->

- **Priority:** P1
- **Covers:** UC-1, UC-2, UC-3, CAP-2, CAP-3, CAP-4, FR-6, FR-7, FR-13
- **Trigger:** the built one-page site's Services and Modalities sections are inspected
- **Expectation (EARS):** When the built one-page site's Services and
  Modalities sections are inspected, the system SHALL show an external
  booking call-to-action for reiki sessions AND an external signup
  call-to-action for reiki trainings in the reiki block; in the therapy
  block an email inquiry form, a Psychology Today link, a link to the
  Modalities section, a 988 crisis note, and no booking widget; and in
  the Modalities section every modality with description / who-benefits
  / resources / certifications, each under a stable anchor.
- **Threshold:** on dist/index.html — reiki block: ≥ 1 session booking
  CTA (`[data-cta="booking"]`) AND ≥ 1 training signup CTA
  (`[data-cta="booking-training"]`), each with an href resolving
  off-site (or to the provider embed); therapy block (scoped between
  the therapy marker and the Modalities section): form element present,
  "psychologytoday.com" link present, ≥ 1 link to the `#modalities`
  anchor or a modality anchor, "988" present, 0 booking embeds/links;
  Modalities section: every listed modality has the 4 required content
  fields and an id anchor.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs

## E-4: Booking click depth

<!-- Revised 2026-07-26 (rlw116): single-page IA — the booking CTA now
     lives on the home page itself (Services section), so the expected
     depth is 0; the BFS stays as a regression guard (fragment-only
     hops are not link traversals) and the ≤ 3 bound is unchanged. -->

- **Priority:** P1
- **Covers:** G-5, UC-1, FR-6
- **Trigger:** the link graph of the built site is walked from the home page
- **Expectation (EARS):** When the link graph of the built site is walked
  from the home page, the system SHALL expose a path to the reiki
  booking call-to-action in at most 3 clicks, with in-page anchor hops
  counting as 0 clicks.
- **Threshold:** shortest path Home → booking CTA ≤ 3 link traversals
  (expected 0 under the single-page IA — the CTA is on the home page);
  fragment-only hrefs do not count as traversals.
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

## E-7: Lavender refinement package (added 2026-07-25)

- **Priority:** P0
- **Covers:** G-6, FR-8, FR-14, UC-6
- **Trigger:** the design-refinement build is run
- **Expectation (EARS):** When the design-refinement build is run, the
  system SHALL emit at least 5 additional lavender-led home-page mockups
  with distinct style identities, and every mockup page in the package
  (both rounds) SHALL include the top-level Modalities section in its
  navigation.
- **Threshold:** ≥ 6 `pack-lavender-*.css` token packs (the original
  dusk pack + ≥ 5 refinements), no two sharing (--color-accent,
  --font-heading); every built mockup page under dist/mockups/ contains
  a "Modalities" nav entry; refinement mockup pages present and linked
  from the review index.
- **Verified by:** _devx/workstreams/rooted-light-website/evals/E-7_lavender-refinement.mjs
