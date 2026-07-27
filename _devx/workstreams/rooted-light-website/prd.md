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

**Decision update (2026-07-26, Kylie via Leo — rlw116):** Kylie wants
**one scrollable page**, not multiple pages. The mist hero (rlw115)
stays as the full-screen first impression, the quote band stays, and
each former page's content becomes a scroll section navigated by anchor
links. Renames: **About Me → About**, **Offerings → Services**;
**About You is removed entirely**. The business name is **Rooted Light
Healing** (site name everywhere; legal name stays Rooted Light LLC).
Hero is de-cluttered: owner line reads `Kylie Fustini · Therapist ·
Reiki Master/Teacher`, the tagline line is dropped from the hero, and
the intention is reworded to "A place to feel safe, seen, and
supported — and to leave feeling whole again."

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
- **UC-4**: A visitor reads the About section to gauge personal fit
  before reaching out. (Revised 2026-07-26, rlw116: was "About Me /
  About You"; About You is removed per FR-4.)
- **UC-5**: A visitor digs deeper via Resources — modality explainers,
  reiki background, types of reiki, ICRT reference.
- **UC-6**: Kylie reviews a set of distinct home-page mockups on her own
  device and picks a direction (or a blend).
- **UC-7**: Leo deploys the chosen site as a static build behind
  CloudFront on a custom domain.

## Capabilities

- **CAP-1**: Static site with the agreed information architecture.
  (Revised 2026-07-26, rlw116: a **single scrollable page** — full-screen
  hero → quote band → About → Services → Modalities → Resources sections,
  each with a stable anchor; anchor-link navigation. Resource explainer
  detail pages may remain standalone routes. Previously: multi-page —
  Home, About Me, About You, Modalities, Resources, Offerings; Modalities
  promoted to top level 2026-07-25.)
- **CAP-2**: External booking + payment integration point for reiki
  (embed or link-out; provider selected by a comparison in the design
  stage — Calendly and SimplePractice-native are the seed candidates).
  (Decided 2026-07-26: **Calendly Standard** with PayPal
  collect-at-booking — two event types, Reiki Session + Reiki Training;
  Kylie owns availability in Calendly; site hands off via link-out.)
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

The site SHALL be a single scrollable page whose sections appear in
this order: full-screen hero, quote band, About, Services, Modalities,
Resources — each section carrying a stable id anchor. Navigation SHALL
read Home · About · Services · Modalities · Resources and link to the
section anchors. The labels "About You" and "Offerings" SHALL NOT
appear anywhere user-visible. Former page routes SHALL redirect to
their section anchors (or be removed). (Revised 2026-07-26, rlw116:
single-page IA per Kylie. Previously: six top-level sections routed as
pages, eight routes total; 2026-07-25: Modalities promoted to top
level.)

### FR-2: Home page

Home SHALL present: a photo/hero area (placeholder until Kylie supplies
imagery), the site name + a one-line intention statement drawn from the
brainstorm language, and clear paths into About, Services, and
Resources. (Revised 2026-07-26, rlw116: the hero SHALL show exactly —
site name "Rooted Light Healing", the owner line `Kylie Fustini ·
Therapist · Reiki Master/Teacher`, the intention line "A place to feel
safe, seen, and supported — and to leave feeling whole again.", and the
pill CTA labeled to match "Services". The tagline line is removed from
the hero; the paths into sections are the anchor nav + in-page scroll.)

### FR-3: About Me

About (renamed from "About Me", 2026-07-26 rlw116; now a section of the
one-page site) SHALL contain three subsections — Experiences
(placeholder, marked TODO), Interests/Devotions (research, teaching,
healing work), and Education/Certifications.

### FR-4: About You

**REMOVED 2026-07-26 (rlw116, Kylie via Leo):** the About You section
is deleted entirely — page, nav entry, content, and the who-benefits
modality map. Who-benefits information remains available per-modality
inside the Modalities catalog (CAP-4 field contract, unchanged). ID
retained for traceability; no surface implements FR-4.

### FR-5: Resources

Resources SHALL contain explainer content: therapy modality deep-dives,
what reiki is, types of reiki, and an ICRT reference link.

### FR-6: Reiki offering page

(Revised 2026-07-26, rlw116: "page" → the reiki block of the
**Services** section on the one-page site; all content and CTA
contracts below carry over unchanged.) The Reiki & Reiki Training
surface SHALL explain what reiki is and what a
session looks like, describe training offerings, and present a booking
call-to-action that hands off to the chosen external booking/payment
provider (where Kylie controls her schedule — e.g. "typically on
Fridays"). Reaching this CTA from Home SHALL take ≤ 3 clicks.
(Revised 2026-07-26: the provider is **Calendly**, which models sessions
and group trainings as separate event types — the page SHALL therefore
present **two** hand-off CTAs: one for booking a reiki session and one
for signing up for a reiki training, each resolving to its Calendly
event-type link. Only these two services are bookable; therapy remains
inquiry-only per FR-7.)

### FR-7: Therapy offering page

The Therapy surface SHALL present an email inquiry form as the only
contact path (no booking widget), a small Psychology Today link, and a
short modality summary that links to the Modalities catalog. (Revised
2026-07-25: the full per-modality catalog moved to FR-13. Revised
2026-07-26, rlw116: "page" → the therapy block of the **Services**
section; the no-booking-affordance contract applies to that block, and
the modality links target the in-page #modalities anchors. The 988
crisis note carries over.)

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

The Modalities surface SHALL render the modality catalog: each modality
with description, who benefits, resources, and Kylie's certifications
(the CAP-4 contract), each modality addressable via a stable anchor so
any surface can deep-link it. Rendered as the clean `<details>`
accordion (or flat sections if cleaner). (Revised 2026-07-26, rlw116:
"page" → the Modalities section of the one-page site; the per-modality
anchors are now page-global fragments — `/#<modality-id>`.)

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
- Reiki page carries BOTH a session booking CTA and a training signup
  CTA, each with an off-site (Calendly) href; therapy still has zero
  booking affordances → E-3 revision (2026-07-26).
- Single-page build: one scrollable home with hero → quote → About →
  Services → Modalities → Resources sections + anchor nav; no
  "About You"/"Offerings" labels; old routes redirect → E-2 revision
  (2026-07-26, rlw116).
- Booking CTA now lives ON the home page (Services section) → E-4's
  ≤ 3-click BFS trivially satisfiable at depth 0; keep the graph walk
  as a regression guard → E-4 revision (2026-07-26, rlw116).
- E-3's selector contracts (data-cta, data-cta="booking-training",
  data-modality/data-field, 988, PT link, therapy-block-has-no-booking)
  carry over scoped to the single page's sections → E-3 revision
  (2026-07-26, rlw116).

## Open questions

- ~~Booking/payment provider choice~~ — **RESOLVED 2026-07-26 (Leo):
  Calendly Standard** ($12/mo monthly / $10/mo annual) with PayPal
  collect-at-booking, per the FR-10 comparison's recommendation.
- Calendly event-type numbers (session price/duration; training
  price/format/seat cap) — owner: Kylie (INTERVIEW.md entry filed
  2026-07-26). Blocks publishing the event types, not the runbook or
  account setup.
- Domain name (rootedlight.com vs rootedlightllc.com vs …) — owner: user
  (Kylie/Leo). Needed before deploy phase only.
- Photography / imagery from Kylie — owner: user. Mockups use tasteful
  placeholders until then.
- Real "Experiences" copy — owner: user. Placeholder-marked in build.
- ~~Reiki payment timing (pay at booking vs pay in person)~~ —
  **RESOLVED 2026-07-26 (by implication of the Calendly pick + "she can
  get paid"): full payment at booking via PayPal** (Calendly's only
  mode — no deposits, no charge-later).

## Reference links

- Spec: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
- Brainstorm whiteboard photo: ~/Downloads/IMG_0512.HEIC (2026-07-24)
- Psychology Today (inquiry-flow reference), SimplePractice (therapy
  back-office), ICRT (reiki resource, from whiteboard)
