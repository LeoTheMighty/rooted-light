# PRD — Rooted Light Website

<!-- Stage: PRD. Gate: `devx gate prd <hash>`. Every concrete item gets a
     stable ID (G-/UC-/CAP-/FR-). IDs are never renumbered. Traceability is
     by ID, not by prose. -->

## Problem

Kylie Fustini is a licensed therapist and a reiki teacher/practitioner
operating as **Rooted Light LLC**. She currently has no website: prospective
therapy clients can only find her through Psychology Today, and reiki
clients/students have no place to learn what she offers, book a session, or
pay. Her two practices (therapy and reiki) are one integrated body of work —
"providing a space for people to heal" — but there is nowhere that presents
them together, in her voice.

The site must feel bright, genuine, caring, integrated, and human — "a
person too", "not greater than thou" — and explicitly not kitschy, verbose,
or glamorous (source: brainstorm whiteboard, 2026-07-24). Palette direction:
sage green, lavender, tans, browns — soft, earthy, grounded.

The immediate need is twofold: (1) an overall build plan for the site, and
(2) a set of distinct home-page design mockups Kylie can review to pick a
visual direction before full content build-out.

**Decision update (2026-07-25, Leo):** the round-1 mockup set (rlw102)
was reviewed and **soft lavender dusk** was picked, with two riders:
(a) *keep it simple* — the refinement should lean minimal, and (b) the
information architecture gains a top-level, linkable **Modalities**
section (previously the modality catalog lived inside the Therapy
page). A lavender-only refinement round follows before theme promotion.

## Goals

<!-- User goals in prose; business/project goals MUST be numeric + dated so
     /devx outcome can score them later. -->

- **G-1**: Kylie selects a visual direction from **≥ 6 distinct home-page
  mockups** delivered as a single shareable review package by
  **2026-08-08**.
- **G-2**: Full site (all five sections, placeholder copy where real content
  is pending) builds statically and renders locally by **2026-08-29**.
- **G-3**: Site is live on a custom domain via CloudFront with a working
  reiki booking path (external provider) by **2026-09-30**.
- **G-4**: Recurring infrastructure cost (hosting, excluding domain
  registration and booking-provider fees) **< $5/month**; zero servers for
  Leo to maintain.
- **G-5**: A reiki visitor reaches the external booking/payment flow in
  **≤ 3 clicks** from the home page.
- **G-6**: Kylie confirms the final visual direction from **≥ 5 simple,
  lavender-led refinement mockups** (every mockup carrying the new
  top-level Modalities section) by **2026-08-13**. (G-1 was met
  2026-07-25 — direction picked: soft lavender dusk.)

## Non-goals

- **Custom backend / API** — static frontend only; all dynamic needs
  (booking, payment, forms) go through external providers.
- **In-house payment processing** — no Stripe integration or custom
  checkout; payment lives inside the booking provider (whiteboard: "No to
  Stripe", "Yes to PayPal?").
- **Online therapy booking** — therapy is inquiry-by-email only; scheduling,
  paperwork, and intake stay in SimplePractice.
- **Client portal / accounts** — SimplePractice already covers documents and
  intake.
- **Blog / CMS** — content is maintained as files in the repo for now; a CMS
  can be revisited if Kylie wants to self-edit later.
- **Final copywriting** — Experiences and other personal content will be
  filled in by Kylie/Leo; the build uses clearly-marked placeholders.

## Users

- **Primary**: Prospective therapy clients and prospective reiki clients /
  reiki students — people seeking healing who want to feel safe, seen, and
  unpressured; they should leave feeling empowered, "whole again",
  connected (whiteboard: words that describe who views it).
- **Secondary**: Kylie (content owner; must be able to review designs and
  later supply content without touching code), Leo (builder/maintainer).
- **Anti-persona**: People seeking crisis/emergency mental-health services
  (site should point them elsewhere, not serve them); visitors shopping for
  a glamorous wellness-influencer brand.

## Use cases

- **UC-1**: A prospective reiki client learns what reiki is, sees session
  offerings, and books + pays through an external provider where Kylie
  controls her own availability.
- **UC-2**: A prospective reiki student finds reiki training details and
  how to sign up.
- **UC-3**: A prospective therapy client reads who Kylie helps and which
  modalities she practices, then reaches out via an email inquiry form
  (Psychology Today-style); everything after first contact happens in
  SimplePractice.
- **UC-4**: A visitor reads About Me / About You to gauge personal fit
  before reaching out.
- **UC-5**: A visitor digs deeper via Resources — modality explainers,
  reiki background, types of reiki, ICRT reference.
- **UC-6**: Kylie reviews a set of distinct home-page mockups on her own
  device and picks a direction (or a blend).
- **UC-7**: Leo deploys the chosen site as a static build behind
  CloudFront on a custom domain.

## Capabilities

- **CAP-1**: Static multi-page site with the agreed information
  architecture: Home, About Me, About You, **Modalities**, Resources,
  Offerings (Reiki & Reiki Training; Therapy). (Modalities promoted to
  top level 2026-07-25.)
- **CAP-2**: External booking + payment integration point for reiki
  (embed or link-out; provider selected by a comparison in the design
  stage — Calendly and SimplePractice-native are the seed candidates).
- **CAP-3**: Email inquiry form for therapy (form service or mailto-based;
  no booking widget), plus a small Psychology Today link.
- **CAP-4**: Modality catalog: a content structure where each therapy
  modality has a description, what it is, who benefits, resources to dig
  deeper, and Kylie's certifications — rendered as a clean
  accordion/dropdown if it stays clean, otherwise a simple list of
  sections. Lives at the top-level **/modalities/** page with a stable
  per-modality anchor so any page (Therapy, About You) can deep-link a
  modality.
- **CAP-5**: Design-exploration pipeline: multiple visually distinct
  home-page mockups built from one shared content source, packaged into a
  single index Kylie can browse and compare.
- **CAP-6**: Static build output deployable to S3 + CloudFront (deferred
  to the deploy phase; no infra work during design exploration).

## Feature requirements

### FR-1: Information architecture

The site SHALL have six top-level sections routed as pages: Home, About
Me, About You, Modalities, Resources, Offerings — with Offerings split
into Reiki & Reiki Training and Therapy subpages (eight routes total).
Navigation SHALL reach every section from every page. (Revised
2026-07-25: Modalities promoted from a Therapy-page subsection to a
top-level, linkable section.)

### FR-2: Home page

Home SHALL present: a photo/hero area (placeholder until Kylie supplies
imagery), Rooted Light name + a one-line intention statement drawn from
the brainstorm language, and clear paths into About, Offerings, and
Resources.

### FR-3: About Me

About Me SHALL contain three subsections — Experiences (placeholder,
marked TODO), Interests/Devotions (research, teaching, healing work), and
Education/Certifications.

### FR-4: About You

About You SHALL describe who will benefit from working with Kylie and map
modalities to the people they're useful for.

### FR-5: Resources

Resources SHALL contain explainer content: therapy modality deep-dives,
what reiki is, types of reiki, and an ICRT reference link.

### FR-6: Reiki offering page

The Reiki & Reiki Training page SHALL explain what reiki is and what a
session looks like, describe training offerings, and present a booking
call-to-action that hands off to the chosen external booking/payment
provider (where Kylie controls her schedule — e.g. "typically on
Fridays"). Reaching this CTA from Home SHALL take ≤ 3 clicks.

### FR-7: Therapy offering page

The Therapy page SHALL present an email inquiry form as the only contact
path (no booking widget), a small Psychology Today link, and a short
modality summary that links to the top-level Modalities page for the
full catalog. (Revised 2026-07-25: the full per-modality catalog moved
to FR-13; the four-field content contract lives there now.)

### FR-8: Visual language

All designs SHALL use the agreed direction: soft earthy palette (sage
green, lavender, tan, brown), bright and warm but not glamorous or
kitschy; typography and imagery that read genuine, caring, human.
(Narrowed 2026-07-25: **lavender-led** per the chosen soft-lavender-dusk
direction, kept deliberately simple; sage/tan/brown remain as supporting
accents.)

### FR-9: Home-page mockup set

The design exploration SHALL produce ≥ 6 home-page mockups, each a
distinct style direction (differing in layout, typography, and palette
treatment while staying within FR-8), rendered from the same content, and
packaged behind one index page Kylie can open on her phone or laptop.

### FR-10: Booking-provider comparison

Before the reiki booking CTA is wired, a written comparison of ≥ 3
booking/payment providers (fees, client friction, schedule control,
PayPal support) SHALL be produced for Kylie/Leo to choose from. (Research
deferred out of the PRD stage per Leo's instruction — this is a plan
phase, not a PRD input.)

### FR-11: Static deploy target

The chosen site SHALL build to static files servable from S3 +
CloudFront with a custom domain; no server-side runtime.

### FR-12: Responsive + accessible baseline

Pages SHALL be usable on mobile widths (≥ 360px) and meet basic
accessibility: semantic headings, alt text, WCAG AA contrast within the
soft palette.

### FR-13: Modalities page (added 2026-07-25)

The Modalities page SHALL render the modality catalog at the top level:
each modality with description, who benefits, resources, and Kylie's
certifications (the CAP-4 contract), each modality addressable via a
stable anchor so other pages can deep-link it. Rendered as the clean
`<details>` accordion (or flat sections if cleaner).

### FR-14: Lavender refinement round (added 2026-07-25)

The design exploration SHALL produce ≥ 5 additional home-page mockups
refining the chosen soft-lavender-dusk direction: lavender-led palettes,
deliberately simple layouts, rendered from the same content source, each
with a distinct style identity, and — together with the round-1 mockups —
every mockup SHALL include the new top-level Modalities section in its
navigation. Packaged behind the same review index (round 2 listed
first).

## Evals seed

<!-- Raw material for expectations.md — behaviors worth pinning, thresholds
     worth measuring. Promoted into E-blocks before Gate 1. -->

- Mockup package exists: ≥ 6 mockup pages + 1 index, all render, styles
  measurably distinct → runnable check on build output.
- Full-site build: all seven routes (5 sections + 2 offering subpages)
  present in static output → runnable check.
- Reiki page has external booking CTA; therapy page has a form and no
  booking embed → DOM assertions on built HTML.
- Click depth Home → booking CTA ≤ 3 → link-graph check.
- Contrast of palette tokens meets WCAG AA → token-level contrast check.
- Lavender refinement round: ≥ 5 lavender-led packs with distinct
  identities; every mockup page (both rounds) carries "Modalities" in
  nav → runnable check on packs + build output.
- Full-site build now = eight routes / six top-level nav sections
  (Modalities added) → E-2 revision.

## Open questions

- Booking/payment provider choice — owner: research (FR-10 phase), then
  Kylie decides. Seed candidates: Calendly (+PayPal?), SimplePractice
  native scheduling, Acuity.
- Domain name (rootedlight.com vs rootedlightllc.com vs …) — owner: user
  (Kylie/Leo). Needed before deploy phase only.
- Photography / imagery from Kylie — owner: user. Mockups use tasteful
  placeholders until then.
- Real "Experiences" copy — owner: user. Placeholder-marked in build.
- Reiki payment timing (pay at booking vs pay in person) — owner: user;
  affects provider choice (whiteboard left this open).

## Reference links

- Spec: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
- Brainstorm whiteboard photo: ~/Downloads/IMG_0512.HEIC (2026-07-24)
- Psychology Today (inquiry-flow reference), SimplePractice (therapy
  back-office), ICRT (reiki resource, from whiteboard)
