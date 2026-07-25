<!-- refined: critique 2026-07-25 (lenses: pm, architect, dev, qa) -->
# Plan — Rooted Light Website

<!-- Stage: Plan. Gate: `devx gate coverage <hash>` (plan mode — one row per
     E-id; P0 floor: every P0 expectation `full` and naming a runnable
     artifact). Sizing rule: a phase is one cohesive concern with a
     verifiable exit, sized to land as a single reviewable PR. Default to
     more, smaller phases. One phase ≙ one dev spec ≙ one PR ≙ one tour. -->

## Current state

Empty devx-scaffolded repo (`plan/`, `dev/`, backlog files, CI stub at
`.github/workflows/devx-ci.yml`, deploy stub at
`.github/workflows/devx-deploy.yml`). No application code. Workstream
artifacts exist: `_devx/workstreams/rooted-light-website/{prd.md,
expectations.md,design.md}`. Brainstorm whiteboard captured in the PRD.
No domain, no hosting, no booking provider chosen.

**Eval authorship**: the six eval scripts (E-1..E-6) are authored at the
RED stage of this workstream — *before* phase 1 executes — at the exact
Verified-by paths in expectations.md, each failing for the right reason
(feature missing). Phases below do not write evals; they turn them
green. Phases must not edit an eval to make it pass; eval changes go
through `devx revise`.

**Eval build profiles**: evals run against build output at `dist/`
except E-5, which reads `src/styles/tokens/pack-*.css` source files
directly (token-level contrast can't survive CSS bundling/minification —
documented exception to the dist convention). Two build profiles exist
from phase 6 onward: **full** (includes `/mockups/` — E-1 and E-5 target
this) and **production** (mockups excluded — E-2/E-3/E-4 target this;
E-3 always flagless/strict in production).

## Desired state

An Astro static site in-repo: shared content source (`src/content/`),
mobile-first `base.css` + token-driven style packs, all seven routes
built with placeholder-marked copy, ≥ 6 distinct home-page mockups behind
`/mockups/` for Kylie's review (delivered to her by 2026-08-08), a
written booking-provider comparison with a recommendation, booking/form
integration wired to the chosen providers, and a repeatable static
deploy to S3 + CloudFront on the chosen domain by 2026-09-30. Evals
E-1..E-6 green under their respective profiles.

## What we're NOT doing

- No custom backend, SSR, database, or in-house payment/checkout.
- No online therapy booking anywhere on the site (inquiry form only).
- No CMS, blog, client portal, or user accounts.
- No final copywriting or photography (placeholders marked `TODO(kylie)`).
- No second full mockup round (blend-of-two refinement is in scope of
  theme promotion, not a new exploration).
- No analytics beyond, at most, a privacy-light pageview counter (needs
  product approval — flagged extra from design verify).

## Expectation coverage

| E-id | Priority | Verified in phase | Validation type | Eval artifact | Coverage |
|---|---|---|---|---|---|
| E-1 | P0 | 2 | tests-first | _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs | full |
| E-2 | P0 | 3 | tests-first | _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs | full |
| E-3 | P1 | 6 | tests-first | _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs | full |
| E-4 | P1 | 3 | tests-first | _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs | full |
| E-5 | P2 | 2 | tests-first | _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs | full |
| E-6 | P2 | 4 | tests-first | _devx/workstreams/rooted-light-website/evals/E-6_provider-comparison.mjs | full |

Notes: E-4's threshold is click depth to the booking CTA element
(selector contract `data-cta="booking"`), independent of href liveness —
fully verifiable in phase 3. Href liveness is E-3's concern: phase 3
runs E-3 with `--allow-placeholder` (which hard-errors if pointed at a
production build), phase 6 and the deploy workflow run it flagless.

## Phase checklist

Target dates track G-1 (mockups to Kylie 2026-08-08) and G-3 (launch
2026-09-30); phases 3–4 run during Kylie's review window.

- [ ] Phase 1: Scaffold & foundation — by 2026-08-01
- [ ] Phase 2: Mockup exploration — 6+ style packs + review index — delivered by 2026-08-06
- [ ] Phase 3: Content pages & information architecture — by 2026-08-22
- [ ] Phase 4: Booking-provider comparison — by 2026-08-15
- [ ] Phase 5: Theme promotion — by 2026-09-05 (gated: Kylie's style pick)
- [ ] Phase 6: Booking & form wiring — by 2026-09-12 (gated: provider choice)
- [ ] Phase 7: Deploy — S3 + CloudFront + domain — by 2026-09-23 (buffer to 09-30)

## Phases

### 1. Phase: Scaffold & foundation

**Overview**: Stand up the Astro project and the shared bones every
later phase builds on: content collections + schemas, `base.css`
(mobile-first primitives, nav collapse, landmark layout), shared page
layout, `site.json` config seams (`booking.url`, `booking.training_url`,
`contact.form_action`), stub routes for all seven pages, repo hygiene,
and the eval runner wired into CI. First because every other phase
composes these surfaces.

**Files**:
- `package.json`, `astro.config.mjs`, `tsconfig.json` — Astro static
  project, `output: 'static'`; scripts: `dev`, `build`, `build:full`,
  `evals` (runs every present `E-*.mjs` after a build).
- `.gitignore` — add `node_modules/`, `dist/`, `.astro/`.
- `src/content/site.json` — name, tagline, intention words, nav,
  contact + booking seams (placeholder `#booking-tbd`). Plain import,
  **not** a content collection.
- `src/content.config.ts` — Astro v5 collection config (glob loaders)
  for modalities, offerings, resources per design.md Interfaces.
- `src/content/{about-me,about-you}.md`, `modalities/*.md` (2–3 seed
  entries), `offerings/*.md`, `resources/*.md` — placeholder-marked
  seed content.
- `src/styles/base.css` — reset, layout primitives, 360px-first flow.
- `src/layouts/Page.astro` — landmarks, nav, one-h1 rule, footer.
- `src/pages/…` — seven route stubs rendering real content structure.
- `.github/workflows/devx-ci.yml` — add build + `npm run evals` step
  inside the managed markers (evals report but expected red until
  their phase lands; CI step must not mask devx CI contract).

**Context**:
- Design fixes content-first structure; copy is placeholder but the
  *shape* (three About Me subsections, modality frontmatter fields) is
  contractual now.
- Keep zero client JS; `<details>` accordion is native.
- Astro v5: content config lives at `src/content.config.ts` with
  `glob()` loaders — not the legacy `src/content/config.ts`.

**Verification plan**:
- Type: tests-after
- Success criteria:
  - `npm run build` exits 0 and `dist/` contains all seven routes
    (E-2 may remain partial until nav completeness lands in phase 3).
  - `npm run dev` serves pages readable at 360px width.
  - `git status` clean of build artifacts after a build.

**Tasks**:
- [ ] T1.1 Init Astro project: static output, npm scripts (`dev`,
      `build`, `build:full`, `evals`), `.gitignore` additions — files:
      `package.json`, `astro.config.mjs`, `.gitignore`
- [ ] T1.2 Author `src/content.config.ts` (v5 glob loaders) + seed
      placeholder content; `site.json` as plain import — files:
      `src/content/**`, `src/content.config.ts`
- [ ] T1.3 Build `base.css` + shared `Page.astro` layout with nav —
      files: `src/styles/base.css`, `src/layouts/Page.astro`
- [ ] T1.4 Stub all seven routes rendering their content sources —
      files: `src/pages/**`
- [ ] T1.5 Wire build + evals step into CI markers — files:
      `.github/workflows/devx-ci.yml`

### 2. Phase: Mockup exploration — 6+ style packs + review index

**Overview**: The deliverable Leo sends Kylie (G-1, by 2026-08-06).
Six-plus visually distinct home-page directions — each a token CSS pack
+ home layout variant over the same `site.json` content — behind a
phone-friendly review index, plus a shareable delivery channel (hosting
doesn't exist until phase 7). Style directions span genuinely different
feels within the earthy brief, e.g.: (1) botanical editorial — serif
display, generous whitespace, sage-forward; (2) warm craft/paper —
tan/brown textures, humanist sans; (3) soft lavender dusk — calm
gradient washes; (4) grounded modern — strong grid, earth-blocked
sections; (5) hand-touched organic — illustrated accents, rounded
forms; (6) quiet minimal light — near-white, brightness-first, thin
rules; (7 optional) forest-deep accent — darker green grounding with
light content wells. Every pack must pass token contrast (E-5).

**Files**:
- `src/styles/tokens/pack-*.css` — ≥ 6 token packs. **Token-name
  contract** (E-1/E-5 parse these): every pack declares the canonical
  set `--color-bg`, `--color-surface`, `--color-text-body`,
  `--color-text-heading`, `--color-accent`, `--font-heading`,
  `--font-body` (+ pack-specific extras). Gradient-wash packs must
  still declare a solid `--color-bg` fallback that contrast is
  computed against.
- `src/layouts/home/Home*.astro` — layout variants (hero placement,
  nav treatment, section rhythm differ per pack).
- `src/pages/mockups/<pack>.astro` — one mockup route per pack.
- `src/pages/mockups/index.astro` — review index: thumbnail/link list,
  style-direction one-liners, "reply with your favorite (or a blend of
  two)" note.

**Context**:
- E-1 distinctness threshold: no two packs share primary palette
  tokens + heading font pair; layouts must differ structurally, not
  just recolor (design.md Risks).
- Fonts: system/self-hosted only (no CDN dependency).
- Placeholder imagery: botanical/texture, no stock people.
- Delivery: hosting doesn't exist yet — publish the built package to a
  throwaway share channel (temp private S3 staging bucket + CloudFront
  or presigned links, or a zipped relative-path build that opens from
  files) and verify it opens on a phone before sending.

**Verification plan**:
- Type: tests-first
- Success criteria:
  - `node _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs`
    passes: ≥ 6 mockups + index, all linked, distinct identities.
  - `node _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs`
    passes: every pack's body pairing ≥ 4.5:1, heading ≥ 3:1.
  - Human: Leo opens the shared package on a phone and sanity-checks
    each direction (logged in the T2.5 MANUAL.md entry).

**Tasks**:
- [ ] T2.1 Define token-name contract + author ≥ 6 packs — files:
      `src/styles/tokens/`
- [ ] T2.2 Build home layout variants — files: `src/layouts/home/`
- [ ] T2.3 Wire mockup routes + review index — files:
      `src/pages/mockups/`
- [ ] T2.4 Contrast-tune every pack until E-5 green — files:
      `src/styles/tokens/`
- [ ] T2.5 Publish package to throwaway share channel; verify on
      phone; file MANUAL.md entry: "send package to Kylie + request
      her long-lead content (Experiences copy, certifications list,
      photos, Psychology Today URL — see INTERVIEW.md); record her
      style pick in INTERVIEW.md" — files: `MANUAL.md`

### 3. Phase: Content pages & information architecture

**Overview**: Flesh out all seven routes from stubs to full structure:
About Me (three subsections), About You (who-benefits + modality map),
Resources (explainer collection + ICRT), Offerings landing, Reiki page
(what it is, session shape, training section, booking CTA — placeholder
href until phase 6), Therapy page (modality `<details>` accordion with
the four required fields per modality, inquiry form markup posting to
the `contact.form_action` seam, small Psychology Today link, and a
crisis-resources note — e.g. 988 — per the PRD anti-persona). Nav wired
everywhere.

**Files**:
- `src/pages/{about-me,about-you}.astro`, `src/pages/resources/**`,
  `src/pages/offerings/**` — full page structure.
- `src/components/` — ModalityAccordion, BookingCTA, InquiryForm,
  ResourceCard. BookingCTA renders `data-cta="booking"` — the stable
  selector E-3/E-4 target.
- `src/content/**` — expand placeholder copy so pages read coherently
  (still `TODO(kylie)`-marked where personal).

**Context**:
- E-3's DOM contract shapes the two offering pages; keep therapy page
  free of any booking affordance.
- E-4 counts clicks Home → `[data-cta="booking"]`; put an
  Offerings/Reiki path in the home hero or primary nav (≤ 3 clicks).

**Verification plan**:
- Type: tests-first
- Success criteria:
  - `node …/evals/E-2_site-routes.mjs` passes (all 7 routes + full nav).
  - `node …/evals/E-4_click-depth.mjs` passes (click depth to the CTA
    element; href liveness not in scope).
  - `node …/evals/E-3_offering-contracts.mjs --allow-placeholder`
    passes (all assertions except external-href, which is phase 6's).

**Tasks**:
- [ ] T3.1 About Me / About You full structure — files: `src/pages/`,
      `src/content/`
- [ ] T3.2 Resources section + detail pages — files:
      `src/pages/resources/`
- [ ] T3.3 Reiki page with training section + BookingCTA
      (`data-cta="booking"`) — files:
      `src/pages/offerings/reiki.astro`, `src/components/`
- [ ] T3.4 Therapy page: accordion, form, PT link, crisis-resources
      note — files: `src/pages/offerings/therapy.astro`,
      `src/components/`
- [ ] T3.5 Nav completeness + click-depth pass — files:
      `src/layouts/Page.astro`

### 4. Phase: Booking-provider comparison

**Overview**: The deferred research (FR-10). Compare ≥ 3 booking/payment
providers for reiki sessions + trainings on: fees (monthly + per-txn),
client friction (steps to book+pay), Kylie's schedule control, PayPal
support, embed-vs-link quality on a static site, and SimplePractice
adjacency (can her existing tool cover reiki too?). Seed list: Calendly,
Acuity Scheduling, SimplePractice native booking, Square Appointments.
Output: decisions doc + INTERVIEW.md entry so Kylie/Leo can choose —
bundled with the domain-name decision so both land in one client
touchpoint. Parallel-safe with phases 2–3 (touches no site code).

**Files**:
- `_devx/workstreams/rooted-light-website/decisions/booking-provider-comparison.md`
  — the comparison + recommendation.
- `INTERVIEW.md` — decision entry (provider + pay-at-booking vs
  pay-in-person + form provider choice); nudge the already-filed
  domain-name entry in the same touchpoint.

**Context**:
- Whiteboard constraints: "No to Stripe", "Yes to PayPal?", Kylie
  keeps her schedule ("typically Fridays"), payment timing open.
- Also settle the therapy form provider (Formspree/Web3Forms/mailto)
  in the same doc — same axes, small addendum section.

**Verification plan**:
- Type: tests-first
- Success criteria:
  - `node …/evals/E-6_provider-comparison.mjs` passes: ≥ 3 providers ×
    4 axes + explicit recommendation.

**Tasks**:
- [ ] T4.1 Research providers (web) + draft comparison — files:
      `decisions/booking-provider-comparison.md`
- [ ] T4.2 Form-provider addendum — files: same doc
- [ ] T4.3 File INTERVIEW.md decision entry (provider + payment timing
      + form provider), bundle with domain-name decision — files:
      `INTERVIEW.md`

### 5. Phase: Theme promotion

**Overview**: Gated only on Kylie's style pick (INTERVIEW, from phase
2). Promote the chosen style pack to the site-wide theme (all pages,
not just home), restyle nav/CTA/components accordingly. If Kylie picks
a blend of two packs, blend at the token level (one pack's palette,
other's type) — not a third exploration. Keep mockup routes intact
until the deploy phase's production profile excludes them.

**Files**:
- `src/styles/tokens/` → default theme import in `Page.astro` /
  `base.css` — chosen pack promoted.
- `src/layouts/**`, `src/components/**` — theme applied site-wide.

**Context**:
- E-1/E-5 must stay green after promotion (packs remain in the full
  build); re-run both.

**Verification plan**:
- Type: tests-after
- Success criteria:
  - E-1, E-2, E-4, E-5 all still green after restyle.
  - Human: side-by-side check that the promoted theme matches the
    mockup Kylie picked.

**Tasks**:
- [ ] T5.1 Promote chosen pack to global theme — files:
      `src/styles/`, `src/layouts/`
- [ ] T5.2 Re-run evals + visual check vs chosen mockup — files: none
      (results logged in spec status log)

### 6. Phase: Booking & form wiring

**Overview**: Gated only on the provider + payment-timing + form
decisions (INTERVIEW, from phase 4). Set `booking.url` (+
`booking.training_url` if the provider splits session vs class event
types), wire the inquiry form action, verify the provider's embed or
link-out flow end-to-end manually. Parallel-safe with phase 5 (theme
touches styles/layouts; this touches config + offering pages).

**Files**:
- `src/content/site.json` — live `booking.url`,
  `booking.training_url`, `contact.form_action`.
- `src/pages/offerings/{reiki,therapy}.astro` — final CTA/embed +
  form wiring.

**Context**:
- E-3 runs **flagless** from this phase on — `--allow-placeholder` is
  dead after this phase and hard-errors against a production build.

**Verification plan**:
- Type: tests-first
- Success criteria:
  - `node …/evals/E-3_offering-contracts.mjs` (no flags) fully green:
    external booking href live; therapy form + PT link + zero booking
    affordances; modality fields complete.
  - `node …/evals/E-4_click-depth.mjs` green against the live CTA.
  - Human: Leo books + cancels a test reiki slot; submits a test
    therapy inquiry and confirms it reaches Kylie's email — files:
    `MANUAL.md` log.

**Tasks**:
- [ ] T6.1 Wire booking URL/embed + training CTA — files:
      `src/content/site.json`, `src/pages/offerings/reiki.astro`
- [ ] T6.2 Wire inquiry form provider + test delivery — files:
      `src/pages/offerings/therapy.astro`
- [ ] T6.3 End-to-end human test of both paths — files: `MANUAL.md`

### 7. Phase: Deploy — S3 + CloudFront + domain

**Overview**: Ship it. S3 bucket + CloudFront distribution + ACM cert +
the chosen domain (Route53 or external registrar DNS), deploy wired
into the existing `.github/workflows/devx-deploy.yml` stub (inside its
managed markers — wrap, don't duplicate), production build profile
excluding `/mockups/` via a postbuild prune (`rm -rf dist/mockups` in
the `build:prod` script — Astro has no config option to exclude a pages
directory; env-guarded `getStaticPaths` is the fallback if prune proves
brittle). Domain purchase and console steps needing Leo's AWS account
go to MANUAL.md.

**Files**:
- `.github/workflows/devx-deploy.yml` — build + `aws s3 sync` +
  CloudFront invalidation on push to main, inside the stub's markers.
- `package.json` — `build:prod` script (build + mockup prune);
  `build:full` remains for E-1/E-5.
- `docs/DEPLOY.md` — provisioning runbook (IaC only if trivial; a
  documented console/CLI runbook is acceptable at this scale).
- `MANUAL.md` — domain purchase, ACM validation, OIDC/credentials
  setup for CI.

**Context**:
- G-4: hosting < $5/mo — S3+CloudFront at this traffic is cents.
- Domain decision should already be answered (bundled into phase 4's
  INTERVIEW touchpoint); phase blocks on it only at the DNS step
  (bucket + distribution can precede it).
- **Launch content checkpoint**: before DNS cutover, every
  `TODO(kylie)` marker is either resolved or consciously deferred by
  Kylie/Leo (grep for the marker; decision logged in MANUAL.md). The
  site must not launch with accidental placeholder copy.

**Verification plan**:
- Type: human
- Success criteria:
  - Site loads over HTTPS on the custom domain from a cold client.
  - `curl` of `/mockups/` on production returns 404/redirect.
  - Evals split by profile: E-2, E-3 (flagless), E-4, E-6 green
    against the production `dist/`; E-1, E-5 green against
    `build:full` output.
  - `grep -r "TODO(kylie)"` output reviewed and dispositioned.

**Tasks**:
- [ ] T7.1 `build:prod` profile with mockup prune — files:
      `package.json`, `astro.config.mjs`
- [ ] T7.2 Provision S3 + CloudFront + cert; document runbook —
      files: `docs/DEPLOY.md`, `MANUAL.md`
- [ ] T7.3 Deploy workflow inside devx-deploy.yml markers — files:
      `.github/workflows/devx-deploy.yml`
- [ ] T7.4 Content checkpoint + DNS cutover + cold-client
      verification — files: `MANUAL.md` log
