# Design — Rooted Light Website

<!-- Stage: Design. Gate: `devx gate coverage <hash>` (design mode — one
     tri-state row per G-/UC-/CAP-/FR- ID in prd.md). Hard rule: don't plan
     here. No phases, no tasks — design is the approach, not the sequence. -->

## Overview

- **Objective**: A fully static, zero-backend website for Rooted Light LLC
  that presents Kylie's integrated therapy + reiki practice in a bright,
  genuine, earthy visual language — preceded by a design-exploration round
  that gives Kylie ≥ 6 distinct home-page directions to choose from before
  any full-site build-out.
- **Solution**: One **Astro** project, structured content-first. All site
  copy (sections, modalities, offerings) lives in content files
  (markdown/JSON collections) separate from presentation. The mockup round
  renders the *same* home-page content through 6+ swappable "style packs"
  (design-token CSS + typography + layout template), emitted as static
  pages behind a review index Kylie can open anywhere. The winning style
  pack becomes the site theme; the remaining pages are built on it. All
  dynamic behavior (reiki booking/payment, therapy inquiry form) is
  delegated to external providers via link-out/embed, keeping the deploy a
  pure S3 + CloudFront static bucket.

## Constraints

- **Zero backend, < $5/mo hosting** (G-4): no server-side runtime; only
  static files. Booking, payment, and form handling must come from
  external providers' hosted flows.
- **Kylie controls her schedule**: the booking provider must let her set
  availability (e.g. "Fridays"); the site only links/embeds.
- **Therapy path is inquiry-only**: no booking UI on the therapy page —
  email form + small Psychology Today link; SimplePractice handles
  everything post-contact (whiteboard + Leo's outline).
- **Tone constraints are hard requirements**: not kitschy, not glamorous,
  not verbose; soft earthy palette (sage, lavender, tan, brown) with
  WCAG AA contrast (E-5) — soft palettes fail contrast easily, so tokens
  must be validated, not eyeballed.
- **Content is partially TBD**: Experiences copy, photography, domain
  name, and provider choice arrive later; the architecture must make
  those drop-in (placeholder-marked content files, provider URL as a
  single config value).

## Risks

- Six mockups drift into "same site, six tints" and the choice is
  meaningless → each style pack must differ in layout + typography +
  palette treatment, enforced mechanically → proven by **E-1**
  (distinct-identity threshold).
- Refinement round inverts the risk: variants must stay *within*
  lavender yet remain distinguishable, and "keep it simple" must not
  erode into sameness → distinct (accent, heading-font) identities still
  enforced across the whole pack set, Modalities nav presence checked on
  every mockup → proven by **E-7**.
- Soft palette fails accessibility → token-level contrast validation in
  the eval suite → proven by **E-5**.
- Booking hand-off buried in prose → click-depth check from Home →
  proven by **E-4**.
- Therapy page accidentally grows booking affordances (provider embeds
  tempt this) → DOM contract: form present, zero booking
  embeds/links → proven by **E-3**.
- Site quietly grows a server dependency (form backend, SSR) → build
  must emit pure static output with all routes → proven by **E-2**.
- Provider chosen on vibes and re-done later → written ≥3-provider
  comparison with recommendation before integration → proven by **E-6**.

## Trade-offs

- **Astro over plain HTML/CSS or 11ty**: chose Astro because content
  collections + layout components make "one content source, N style
  packs" and the later modality catalog cheap; ships zero JS by default
  so the static/perf story is identical to hand-written HTML. Cost: a
  node build step — acceptable, already implied by the eval tooling.
- **Astro over Next.js static export**: no React runtime needed for a
  content site; Next's export mode adds framework weight for no feature
  we use.
- **Style packs in one repo over 6 throwaway prototypes**: mockups are
  built from the real content source, so the winner is a head start, not
  a screenshot. Cost: slightly more upfront structure (token schema)
  before pixels appear.
- **Link-out/embed booking over building any booking UI**: zero
  compliance/payment surface, Kylie keeps schedule control in a tool she
  owns. Cost: a visual seam at hand-off — mitigated by styling the CTA
  and setting expectations in copy.
- **Form provider (or mailto) over form backend**: keeps G-4; cost is a
  third-party dependency for the therapy inquiry — provider chosen
  alongside FR-10 comparison work.

## Out of scope

- Booking-provider *selection* (the comparison doc is in scope as an
  artifact; the decision is Kylie/Leo's — FR-10).
- Final copy, photography, domain purchase, DNS/CloudFront provisioning
  mechanics (deploy phase executes; this design only fixes the target).
- CMS, blog, client portal, analytics beyond a privacy-light pageview
  counter (can be added later without redesign).

## Assumptions

- ~~Kylie will pick one direction (or a blend of two) from the mockup
  set; a full second exploration round is not planned.~~ **Broke
  2026-07-25 — by decision, not by slip**: the pick landed early (soft
  lavender dusk, G-1 met 2026-07-25) and Leo ordered a *scoped*
  refinement round — lavender-only, simple, not a re-exploration (G-6,
  FR-14). Theme promotion now gates on the refinement pick.
- SimplePractice remains the therapy back-office; Psychology Today
  profile exists and is linkable. (Breaks → FR-7 revision.)
- Reiki booking provider can either embed or link out from a static page
  with no server component. (True of Calendly/Acuity/SimplePractice
  booking widgets; breaks → revisit CAP-2.)
- English-only, single-locale site.
- Node ≥ 20 available for build (present: nvm node v24).

## Discarded considerations

- **Squarespace/Wix site instead of custom build**: monthly cost exceeds
  G-4, template look fights the "genuine, not glamorous" brief, and Leo
  wants it in-repo.
- **Figma mockups instead of built HTML mockups**: Kylie reviews on her
  phone; built pages show real type rendering/responsiveness and become
  the actual theme — no translation loss.
- **Tailwind for styling**: token-driven vanilla CSS (custom properties)
  is simpler for 6 swappable palettes and keeps mockup diffs readable;
  no utility-class layer needed at this scale.
- ~~**Single-page site**: the content volume (modality catalog, resources)
  needs real routes for scannability and future SEO.~~ **Overturned
  2026-07-26 (rlw116) — by the client, not by slip**: Kylie explicitly
  wants one scrollable page. The scannability concern is answered by
  anchor nav + the `<details>` accordion; resource explainer detail
  pages remain standalone routes (the long-form content keeps real
  URLs), so the SEO concern survives where it matters. Former top-level
  routes redirect to their section anchors.

## Wrap, don't duplicate

- Reuses: external hosted flows for everything transactional — booking +
  payment (provider per FR-10 comparison), therapy intake/paperwork
  (SimplePractice), discovery (Psychology Today), reiki reference
  content (ICRT links). Astro's content collections and routing rather
  than a custom static generator. Repo is otherwise greenfield — nothing
  in-repo to wrap yet (engine.code_citation_hints is empty; no code
  exists at design time).
- Adds: the Astro site itself (routes, layouts, components), the
  design-token/style-pack system, shared content files, the mockup
  review index, and the eval scripts under
  `_devx/workstreams/rooted-light-website/evals/`.

## Design

### Architecture

Greenfield repo — no existing code paths to cite; the paths below are the
surfaces this design introduces.

```
src/
  content/            # single source of truth for copy
    site.json         # name, tagline, intention words, nav, contact
    about-me.md       # three H2 subsections: Experiences (TODO(kylie)),
                      #   Interests/Devotions, Education/Certifications
    (about-you.md deleted 2026-07-26, rlw116 — About You removed; the
                      #   who-benefits data lives on in modalities/*.md)
    modalities/*.md   # one file per therapy modality (schema below)
    offerings/*.md    # reiki session, reiki training descriptions;
                      #   training carries its own sign-up CTA — same
                      #   booking.url seam, distinct booking.training_url
                      #   key if the provider splits session vs class
                      #   event types (Calendly/Acuity both do)
    resources/*.md    # explainers: modalities, reiki, reiki types
  styles/
    tokens/           # one CSS file per style pack: pack-<name>.css
    base.css          # reset + layout primitives shared by all packs
  layouts/            # per-style-pack home layout + shared page layout
  pages/                        # (IA revised 2026-07-26, rlw116:
                                #   single-page — index.astro carries
                                #   About / Services / Modalities /
                                #   Resources as anchor sections; the
                                #   former page files are deleted and
                                #   their routes redirect via
                                #   astro.config redirects)
    index.astro                 # THE page: hero → quote → #about →
                                #   #services (reiki block incl. both
                                #   booking CTAs + therapy block incl.
                                #   inquiry form/PT/988) → #modalities
                                #   (the <details> accordion, stable
                                #   per-modality id anchors) →
                                #   #resources (explainer cards)
    resources/[slug].astro      # standalone explainer detail pages
                                #   (kept as real routes on purpose)
    mockups/index.astro         # review index for Kylie (round 2 listed
                                #   first, round 1 kept below)
    mockups/<pack>.astro        # one home-page mockup per style pack;
                                #   round-2 refinements: pack-lavender-*
public/               # images (placeholders until Kylie's photos)
```

- **Style pack** = one token CSS file (palette, type scale, spacing,
  radius, texture) + a home layout variant. Mockup pages compose
  `content/site.json` + a pack. The chosen pack is promoted to the site
  default; unchosen packs stay in `mockups/` until pruned.
- **Booking integration point**: `content/site.json` carries
  `booking.url` (and optional `booking.embed`) — one config value to
  flip when the FR-10 decision lands. Until then it points at a
  placeholder `#booking-tbd` anchor so E-3/E-4 stay honestly RED.
  (Revised 2026-07-26 — provider decided: **Calendly Standard**. Two
  seams now carried: `booking.url` = Reiki Session event-type link,
  `booking.training_url` = Reiki Training group event-type link. Hand-off
  mode is **link-out**, not the inline embed: the site's zero-client-JS
  principle holds (Calendly's inline widget is a third-party JS bundle),
  the hosted Calendly page is mobile-polished, and G-5's ≤ 3 clicks is
  measured to the CTA, which link-out satisfies. Switching to the inline
  embed later is a one-component change on the reiki page if Kylie wants
  booking to feel on-site. Payment: PayPal collect-at-booking inside
  Calendly — the site never touches payment. Account/event-type
  provisioning is human work, driven by a runbook: `docs/CALENDLY-SETUP.md`
  + MANUAL.md chain, phase 6a.)
- **Therapy inquiry form**: static `<form>` posting to the chosen form
  provider endpoint (or `mailto:` fallback), also a single config value
  (`contact.form_action`).

### Interfaces

- `npm run dev` — local preview. `npm run build` — static output to
  `dist/` (E-2's subject). `npm run mockups` — alias of build; mockup
  routes are part of the same output under `/mockups/` (E-1's subject).
- Modality content schema (frontmatter): `title`, `summary`,
  `what_it_is`, `who_benefits[]`, `resources[]` (label+url),
  `certifications[]`, `order`. The top-level `/modalities/` page renders
  the collection as an accordion (`<details>/<summary>` — clean, no-JS)
  in `order`; the therapy page keeps a short summary + deep links.
- Eval scripts (node, zero-dep): run against `dist/` as
  `node _devx/workstreams/rooted-light-website/evals/E-*.mjs`.
- Responsive/accessibility baseline (FR-12): `base.css` is mobile-first —
  single-column flow at 360px, `max-width` prose measure, nav collapses
  to a stacked list under 640px (CSS-only, no JS hamburger); every style
  pack inherits these primitives and only overrides tokens/typography.
  Shared page layout enforces one `<h1>` per page, landmark elements
  (`<header>/<main>/<footer>`), and required `alt` on the image
  component; contrast is token-validated by E-5.

### Data

No databases. All data is repo files (content collections + tokens).
Client PII never touches the site: form submissions go directly to the
form provider / email; booking data lives in the booking provider.
Placeholder content is marked with `TODO(kylie)` markers so unfinished
copy is greppable before launch.

## Migration plan

N/A — greenfield. (Post-mockup-selection: the chosen pack's tokens move
from `styles/tokens/pack-<name>.css` to the default theme import; mockup
routes are excluded from the production deploy artifact at the deploy
phase, so the public site never ships the review index.)

## Resolved design questions

- Visual direction? → **soft lavender dusk** (Leo, 2026-07-25), kept
  simple; refinement round narrows within it (FR-14).
- Where does the modality catalog live? → **top-level `/modalities/`
  page** with per-modality anchors (Leo, 2026-07-25); Therapy keeps a
  short summary + link. Nav becomes six sections / eight routes.
  (Superseded 2026-07-26, rlw116: the catalog is the `#modalities`
  section of the one-page site; anchors become page-global fragments.)
- Multi-page or one-page? → **One scrollable page** (Kylie via Leo,
  2026-07-26, rlw116): hero → quote → About → Services → Modalities →
  Resources with anchor nav; About You removed; About Me → "About",
  Offerings → "Services"; resource explainers stay standalone routes;
  former routes redirect to anchors.
- Site name? → **"Rooted Light Healing"** (Leo, 2026-07-26): site.json
  `name`, hero h1, nav brand, `<title>`s. Legal name stays
  **Rooted Light LLC** (footer).

- Static site generator? → **Astro** (see Trade-offs; decided here).
- Mockups as designs-in-code vs design-tool files? → **Built HTML style
  packs** from the real content source (see Discarded considerations).
- Modality dropdown "if clean"? → **`<details>` accordion** — native,
  accessible, no JS; degrades to stacked sections. Meets Leo's "only if
  clean" bar; falls back trivially if Kylie prefers a flat list.
- Where does the booking provider plug in? → single `booking.url` /
  optional embed slot in `content/site.json` (decided here).
- Which booking provider, and embed or link-out? → **Calendly Standard,
  link-out** to two event-type links (session + training), PayPal
  collect-at-booking (Leo, 2026-07-26; rationale in the Booking
  integration point above).
- Hosting shape? → S3 + CloudFront static, per Leo (execution deferred
  to deploy phase).

## Unresolved design questions

- ~~Booking/payment provider~~ — **resolved 2026-07-26: Calendly**
  (moved to Resolved above). Remaining pends are human provisioning
  (accounts, PayPal connection, Kylie's availability + pricing), tracked
  in MANUAL.md / INTERVIEW.md — no further design impact.
- Form provider vs `mailto:` for therapy inquiries — resolved alongside
  FR-10 research; same single-config shape either way.
- Domain name — Kylie/Leo before deploy phase; no design impact.
- Photography — Kylie; mockups use neutral placeholder imagery
  (textures/botanicals, no stock people).
