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

**Eval authorship**: the eval scripts (E-1..E-7) are authored at the
RED stage of this workstream — *before* phase 1 executes — at the exact
Verified-by paths in expectations.md, each failing for the right reason
(feature missing). Phases below do not write evals; they turn them
green. Phases must not edit an eval to make it pass; eval changes go
through `devx revise`.

**Eval build profiles**: evals run against build output at `dist/`
except E-5, which reads `src/styles/tokens/pack-*.css` source files
directly (token-level contrast can't survive CSS bundling/minification —
documented exception to the dist convention). Two build profiles exist
from phase 6b onward: **full** (includes `/mockups/` — E-1 and E-5 target
this) and **production** (mockups excluded — E-2/E-3/E-4 target this;
E-3 always flagless/strict in production).

## Desired state

An Astro static site in-repo: shared content source (`src/content/`),
mobile-first `base.css` + token-driven style packs, **one scrollable
page** (revised 2026-07-26, rlw116: hero → quote → About → Services →
Modalities → Resources anchor sections as "Rooted Light Healing";
resource explainer detail pages standalone; former routes redirecting)
built with placeholder-marked copy, ≥ 6 distinct home-page mockups behind
`/mockups/` for Kylie's review (delivered to her by 2026-08-08), a
written booking-provider comparison with a recommendation, booking/form
integration wired to the chosen providers, and a repeatable static
deploy on GitHub Pages with Kylie's existing domain attached (revised
2026-07-27: was S3 + CloudFront) by 2026-09-30. Evals
E-1..E-7 green under their respective profiles.

## What we're NOT doing

- No custom backend, SSR, database, or in-house payment/checkout.
- No online therapy booking anywhere on the site (inquiry form only).
- No CMS, blog, client portal, or user accounts.
- No final copywriting or photography (placeholders marked `TODO(kylie)`).
- No second full mockup *exploration* round. (Revised 2026-07-25: a
  **scoped lavender refinement round** (phase 2b / FR-14) IS in scope —
  variants within the chosen direction, not a re-exploration. Blend
  handling stays in theme promotion.)
- No analytics beyond, at most, a privacy-light pageview counter (needs
  product approval — flagged extra from design verify).

## Expectation coverage

| E-id | Priority | Verified in phase | Validation type | Eval artifact | Coverage |
|---|---|---|---|---|---|
| E-1 | P0 | 2 | tests-first | _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs | full |
| E-2 | P0 | 3, 5b (single-page revision) | tests-first | _devx/workstreams/rooted-light-website/evals/E-2_site-routes.mjs | full |
| E-3 | P1 | 6b | tests-first | _devx/workstreams/rooted-light-website/evals/E-3_offering-contracts.mjs | full |
| E-4 | P1 | 3, 5b (single-page revision) | tests-first | _devx/workstreams/rooted-light-website/evals/E-4_click-depth.mjs | full |
| E-5 | P2 | 2 | tests-first | _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs | full |
| E-6 | P2 | 4 | tests-first | _devx/workstreams/rooted-light-website/evals/E-6_provider-comparison.mjs | full |
| E-7 | P0 | 2b | tests-first | _devx/workstreams/rooted-light-website/evals/E-7_lavender-refinement.mjs | full |

Notes: E-4's threshold is click depth to the booking CTA element
(selector contract `data-cta="booking"`), independent of href liveness —
fully verifiable in phase 3. Href liveness is E-3's concern: phase 3
runs E-3 with `--allow-placeholder` (which hard-errors if pointed at a
production build), phase 6b and the deploy workflow run it flagless.
E-3 revised 2026-07-26: also requires a training signup CTA
(`data-cta="booking-training"`) with a live off-site href — Calendly
models trainings as a separate group event type. E-3's therapy-side
assertions are DOM-presence only (form element, PT link, no booking
affordances) — form-action *liveness* is human-verified in phase 6c,
so E-3 goes fully green at 6b.
Revised 2026-07-26 (rlw116, phase 5b): E-2 and E-4 are rewritten for
the single-page IA (sections/anchors instead of routes) and re-verified
in 5b; E-3's selector contracts carry over scoped to the one-pager's
sections — its RED cause (booking not wired) and its 6b green-up are
unchanged.

## Phase checklist

Target dates track G-1 (mockups to Kylie 2026-08-08) and G-3 (launch
2026-09-30); phases 3–4 run during Kylie's review window.

- [x] Phase 1: Scaffold & foundation — by 2026-08-01 (dev spec: rlw101) — merged 2026-07-25
- [x] Phase 2: Mockup exploration — 6+ style packs + review index — delivered by 2026-08-06 (dev spec: rlw102) — merged 2026-07-25; **picked: soft lavender dusk**
- [x] Phase 2b: Lavender refinement round — ≥5 simple lavender variants + Modalities section in all mockups (dev spec: rlw108) — merged 2026-07-25; follow-ups rlw109/110/111 merged 2026-07-26; **picked: warm sand & lilac**
- [x] Phase 3: Content pages & information architecture — all EIGHT routes incl. /modalities/ (dev spec: rlw103) — merged 2026-07-26
- [x] Phase 4: Booking-provider comparison — by 2026-08-15 (dev spec: rlw104) — merged 2026-07-25; **picked 2026-07-26: Calendly**
- [x] Phase 5: Theme promotion (dev spec: rlw105) — merged 2026-07-26, warm sand & lilac site-wide
- [x] Phase 5b: Single-page IA + renames + "Rooted Light Healing" (dev spec: rlw116) *(added 2026-07-26 from Kylie's direction)* — merged 2026-07-26 (PR #13)
- [ ] Phase 6a: Calendly setup runbook + manual connection chain — by 2026-08-01 (ready now, parallel-safe) (dev spec: rlw114) *(added 2026-07-26)*
- [ ] Phase 6b: Reiki session + training booking wiring — by 2026-09-12 (gated: MANUAL.md Calendly chain complete — real event-type links exist) (dev spec: rlw106) *(scope revised 2026-07-26)*
- [ ] Phase 6c: Therapy inquiry form wiring — by 2026-09-12 (gated: form-provider confirmation in INTERVIEW.md) (dev spec: rlw113) *(split from old phase 6, 2026-07-26)*
- [ ] Phase 7: Deploy — promote GitHub Pages to production + attach Kylie's domain — by 2026-09-23 (buffer to 09-30) (gated: 6b + 6c; domain no longer blocks — DNS repoint is attach-later) (dev spec: rlw107) *(rescoped 2026-07-27: no AWS)*

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

### 2b. Phase: Lavender refinement round (added 2026-07-25)

**Overview**: Leo picked soft lavender dusk with "keep it simple" and a
new top-level Modalities section. Produce ≥ 5 additional lavender-led,
deliberately simple home-page variants (distinct identities within the
family: shift temperature, depth, and type while staying lavender-led),
add the Modalities section to the shared mockup content + nav so EVERY
mockup (both rounds) carries it, and restructure the review index with
round 2 first. Same share-channel flow as phase 2.

**Files**:
- `src/styles/tokens/pack-lavender-*.css` — ≥ 5 new refinement packs
  (original `pack-lavender-dusk.css` stays; identities distinct across
  the entire pack set).
- `src/layouts/home/` — simple layout variants for the refinements
  (lean on minimal structures); Modalities section added to
  `_content.ts` + all existing round-1 layouts.
- `src/pages/mockups/` — refinement routes; index restructured into
  rounds.
- `MANUAL.md` / `INTERVIEW.md` — round-2 delivery + refinement-pick
  entries.

**Context**:
- E-7 distinctness: no two packs in the whole set share
  (--color-accent, --font-heading); every dist/mockups page must carry
  a "Modalities" nav entry.
- "Simple" is a design constraint, not a mechanical one — refinement
  layouts favor fewer decorations, calmer sections.
- E-1/E-5 must stay green (round-1 packs untouched; new packs join the
  contrast set).

**Verification plan**:
- Type: tests-first
- Success criteria:
  - `node …/evals/E-7_lavender-refinement.mjs` passes (authored RED at
    this revision, before phase 2b executes).
  - E-1, E-5 still green.
  - Human: Leo forwards the round-2 package; refinement pick recorded
    in INTERVIEW.md.

**Tasks**:
- [ ] T2b.1 Author ≥ 5 lavender refinement packs — files:
      `src/styles/tokens/`
- [ ] T2b.2 Add Modalities to shared mockup content/nav + all layouts —
      files: `src/layouts/home/`
- [ ] T2b.3 Simple refinement layouts + routes — files:
      `src/layouts/home/`, `src/pages/mockups/`
- [ ] T2b.4 Index restructure (round 2 first) + package + MANUAL/
      INTERVIEW entries — files: `src/pages/mockups/index.astro`,
      `MANUAL.md`, `INTERVIEW.md`

### 3. Phase: Content pages & information architecture

**Overview** *(revised 2026-07-25: Modalities is now a top-level route —
eight routes, six nav sections)*: Flesh out all eight routes from stubs
to full structure:
About Me (three subsections), About You (who-benefits + modality map
deep-linking /modalities/ anchors), **Modalities page** (top-level
`<details>` accordion: four required fields per modality, stable id
anchors — FR-13), Resources (explainer collection + ICRT), Offerings
landing, Reiki page (what it is, session shape, training section,
booking CTA — placeholder href until phase 6), Therapy page (short
modality summary linking to /modalities/, inquiry form markup posting
to the `contact.form_action` seam, small Psychology Today link, and a
crisis-resources note — e.g. 988 — per the PRD anti-persona). Nav wired
everywhere (six sections).

**Files**:
- `src/pages/{about-me,about-you}.astro`, `src/pages/modalities.astro`,
  `src/pages/resources/**`, `src/pages/offerings/**` — full page
  structure.
- `src/content/site.json` — nav gains the Modalities entry.
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
  - `node …/evals/E-2_site-routes.mjs` passes (all 8 routes + 6-section
    nav — revised threshold).
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
- [ ] T3.4 Modalities page: top-level accordion, 4 fields per modality,
      stable anchors — files: `src/pages/modalities.astro`,
      `src/components/`
- [ ] T3.5 Therapy page: modality summary → /modalities/ link, form,
      PT link, crisis-resources note — files:
      `src/pages/offerings/therapy.astro`, `src/components/`
- [ ] T3.6 Nav completeness (six sections incl. Modalities) +
      click-depth pass — files: `src/layouts/Page.astro`,
      `src/content/site.json`

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

### 5b. Phase: Single-page IA + renames + "Rooted Light Healing" (added 2026-07-26)

**Overview**: Kylie's direction after seeing the live preview: ONE
scrollable page. Fold About / Services (reiki + therapy) / Modalities /
Resources into `index.astro` as anchor sections below the mist hero +
quote band; remove About You entirely; rename About Me → About and
Offerings → Services; site name becomes "Rooted Light Healing"
(legal name unchanged); hero de-cluttered (owner line
`Kylie Fustini · Therapist · Reiki Master/Teacher`, new intention line,
tagline dropped from hero). Former routes redirect to section anchors;
resource explainer detail pages stay standalone. E-2/E-4 rewritten for
the single-page IA (this phase's RED artifacts); E-3 re-scoped to the
one-pager's sections without changing its RED cause.

**Files**:
- `src/pages/index.astro` — the one-pager (hero + quote + 4 sections).
- `src/content/site.json` — name, owner_line, intention, anchor nav.
- `src/pages/{about-me,about-you,modalities}.astro`,
  `src/pages/offerings/*` , `src/pages/resources/index.astro` — deleted;
  `astro.config.mjs` redirects take over the routes.
- `src/content/about-you.md` — deleted.
- `src/components/{ModalityAccordion,ResourceCard}.astro`, `base.css` —
  heading-level demotions for the single-document outline.
- Evals E-2/E-3/E-4 + prd/design/plan/expectations (this revision).

**Context**:
- BookingCTA + InquiryForm components and the site.json booking/contact
  seams stay exactly where rlw106 (6b) and rlw113 (6c) expect them —
  those phases now target the Services section of `index.astro`.
- Mockup routes untouched (rlw107 prunes them); E-1/E-5/E-7 untouched.
- 988 note and `TODO(kylie)` markers survive the fold-in.

**Verification plan**:
- Type: tests-first (revised E-2 observed RED against the multi-page
  build before the fold-in; E-4 stays shipped-green — its revision is
  anchor-awareness, not a new failure mode)
- Success criteria:
  - `node …/evals/E-2_site-routes.mjs` green: sections/anchors/nav/
    name/redirect assertions per revised expectations.md.
  - `node …/evals/E-4_click-depth.mjs` green (CTA at depth 0).
  - `node …/evals/E-3_offering-contracts.mjs --allow-placeholder`
    RED only for the unchanged 6b reason (booking-training CTA +
    live hrefs missing) — the re-scope introduces no new RED.
  - `npm run build` green; Pages preview renders the one-pager.

**Tasks**:
- [ ] T5b.1 Revise prd/expectations/design/plan + rewrite E-2/E-4,
      re-scope E-3 (devx revise cdea58) — files: workstream artifacts
- [ ] T5b.2 site.json: name/owner_line/intention/anchor nav — files:
      `src/content/site.json`
- [ ] T5b.3 Fold sections into index.astro; delete old pages +
      about-you content; redirects — files: `src/pages/`,
      `astro.config.mjs`
- [ ] T5b.4 Re-run evals + build; verify preview — files: none

### 6a. Phase: Calendly setup runbook + manual connection chain (added 2026-07-26)

**Overview**: Provider decided — Calendly Standard, PayPal
collect-at-booking, link-out (design.md Booking integration point). The
account provisioning is entirely human work (Kylie's accounts, her
money), so the deliverable is a **runbook** — `docs/CALENDLY-SETUP.md`,
researched against Calendly's and PayPal's *current* signup/config
flows — plus the MANUAL.md action chain that walks Leo/Kylie through it.
Docs-only PR; touches no site code; parallel-safe with everything.
Ready now.

**Files**:
- `docs/CALENDLY-SETUP.md` — click-by-click runbook, seven sections:
  1. Calendly account + Standard plan ($12/mo monthly, $10/mo annual —
     annual recommended).
  2. PayPal **Business** account for Kylie (the long pole — identity
     verification can take days; start first).
  3. Connect PayPal to Calendly (Integrations → PayPal).
  4. Event type "Reiki Session" — 1:1, duration/price from INTERVIEW.md
     (`TODO(kylie)` placeholders until answered), PayPal collection ON.
  5. Event type "Reiki Training" — **group** event type, seat cap /
     price / format from INTERVIEW.md, PayPal collection ON.
  6. Availability: Kylie sets her own recurring schedule (typically
     Fridays), min-notice, booking horizon, buffers — hers to pick in
     one screen; the runbook shows where.
  7. Scoping + capture: only these two event types public (therapy is
     never bookable); copy the two event-type links → they become
     `booking.url` / `booking.training_url` in phase 6b. Includes the
     paid end-to-end test script (book, pay via PayPal, confirm funds
     land, cancel/refund — refunds are manual in PayPal) used by 6b's
     human AC.
- `MANUAL.md` — the ordered action chain pointing at runbook sections.

**Context**:
- Wrap-don't-duplicate: the comparison doc
  (`decisions/booking-provider-comparison.md`) already holds the
  pricing/caveat facts — the runbook links to it rather than restating
  research.
- Calendly caveats to surface verbatim in the runbook: no deposits
  (full amount only), refunds manual in PayPal, no promo codes with
  PayPal, bookings auto-confirm (no approval step).

**Verification plan**:
- Type: human
- Success criteria:
  - Runbook exists with all seven sections, each grounded in the
    provider's current UI (web-researched, not from memory).
  - MANUAL.md chain filed in dependency order with the PayPal-first
    note; INTERVIEW.md pricing entry cross-linked.
  - `npm run build` still green (docs-only — no site surface touched).

**Tasks**:
- [ ] T6a.1 Research current Calendly Standard + PayPal Business setup
      flows (web) — files: none (feeds T6a.2)
- [ ] T6a.2 Author `docs/CALENDLY-SETUP.md` (7 sections above) — files:
      `docs/CALENDLY-SETUP.md`
- [ ] T6a.3 File the MANUAL.md action chain + cross-link INTERVIEW.md
      pricing entry — files: `MANUAL.md`

### 6b. Phase: Reiki session + training booking wiring (was phase 6; scope revised 2026-07-26)

**Overview**: Once the MANUAL chain has produced the two real Calendly
event-type links: set `booking.url` (Reiki Session) and
`booking.training_url` (Reiki Training) in `site.json`, render the
session CTA (`data-cta="booking"`, existing) and the training signup CTA
(`data-cta="booking-training"`, new E-3 contract) on the reiki page as
link-outs, and verify the full paid flow end-to-end. Therapy form moved
to phase 6c. Gated on: rlw114 merged + MANUAL.md Calendly chain complete
(links captured) — a human gate, like rlw105's pick.

**Files**:
- `src/content/site.json` — live `booking.url`, `booking.training_url`.
- `src/pages/index.astro` (reiki block of the Services section — was
  `src/pages/offerings/reiki.astro` before rlw116),
  `src/components/BookingCTA.astro` — training CTA added; both CTAs
  link out to Calendly.

**Context**:
- E-3 runs **flagless** from this phase on — `--allow-placeholder` is
  dead and hard-errors against a production build.
- Link-out, not inline embed (design.md rationale: zero-client-JS
  principle; embed is a one-component switch later if wanted).

**Verification plan**:
- Type: tests-first
- Success criteria:
  - `node …/evals/E-3_offering-contracts.mjs` (no flags) fully green:
    session AND training CTAs with live off-site hrefs; therapy contract
    clean; modality fields complete.
  - `node …/evals/E-4_click-depth.mjs` green against the live CTA.
  - Human (runbook §7 script, logged in MANUAL.md): book + pay a test
    session slot AND a test training seat via PayPal; confirm the money
    lands in Kylie's PayPal; cancel + refund both.

**Tasks**:
- [ ] T6b.1 Wire the two live Calendly links into `site.json` — files:
      `src/content/site.json`
- [ ] T6b.2 Training signup CTA in the reiki block
      (`data-cta="booking-training"`) + confirm both CTAs link out —
      files: `src/pages/index.astro`, `src/components/`
- [ ] T6b.3 Paid end-to-end human test (session + training, pay →
      confirm → refund) — files: `MANUAL.md` log

### 6c. Phase: Therapy inquiry form wiring (split from old phase 6, 2026-07-26)

**Overview**: The other half of old phase 6, unchanged in scope: wire
`contact.form_action` to the chosen form provider (Web3Forms
recommended; INTERVIEW.md confirmation still open), add the same-domain
thank-you page, verify a test submission reaches Kylie's email. Gated
only on the form-provider confirmation; parallel-safe with 6a/6b.

**Files**:
- `src/content/site.json` — live `contact.form_action`.
- `src/pages/index.astro` (therapy block of the Services section — was
  `src/pages/offerings/therapy.astro` before rlw116) — form posts to
  the provider; keep fields minimal (name, email, message — privacy
  note in the comparison doc addendum).
- `src/pages/thanks.astro` — thank-you page (Web3Forms same-domain
  redirect target).

**Context**:
- E-3's therapy assertions (form present, PT link, zero booking
  affordances) are already enforced and stay green; form-action
  liveness is human-verified — no eval change.

**Verification plan**:
- Type: human
- Success criteria:
  - Test submission from the built site reaches Kylie's email
    (logged in MANUAL.md); thank-you page renders.
  - E-3 (flagless if 6b has landed, else `--allow-placeholder`) and
    E-2 still green.

**Tasks**:
- [ ] T6c.1 Wire form action + thank-you page — files:
      `src/content/site.json`, `src/pages/index.astro`,
      `src/pages/thanks.astro`
- [ ] T6c.2 Human delivery test → MANUAL.md log — files: `MANUAL.md`

### 7. Phase: Deploy — promote GitHub Pages to production + attach Kylie's domain (rescoped 2026-07-27: no AWS)

**Overview**: Ship it — by promoting what already ships. The rlw112
Pages workflow deploys every merge to main; this phase makes that THE
production deploy: production build profile excluding `/mockups/` via a
postbuild prune (`rm -rf dist/mockups` in the `build:prod` script —
Astro has no config option to exclude a pages directory; env-guarded
`getStaticPaths` is the fallback if prune proves brittle), drop
`DEPLOY_NOINDEX` + rebuild at base `/` when the domain attaches, update
deploy-pages.yml from "temporary preview" to permanent (its
self-deletion comment dies), and attach Kylie's existing
Squarespace-registered domain by DNS repoint (4 apex A records + www
CNAME at Squarespace's DNS panel; GitHub provisions HTTPS
automatically). No S3, no CloudFront, no ACM, no AWS credentials —
`.github/workflows/devx-deploy.yml` stays an unused stub (delete or
leave; note in the runbook). Squarespace DNS steps (Kylie's account) go
to MANUAL.md.

**Files**:
- `.github/workflows/deploy-pages.yml` — becomes the permanent deploy:
  `build:prod` (mockup prune), `DEPLOY_NOINDEX` dropped and
  `DEPLOY_SITE`/`DEPLOY_BASE` flipped to the custom domain + `/` at
  cutover.
- `package.json` — `build:prod` script (build + mockup prune);
  `build:full` remains for E-1/E-5.
- `docs/DEPLOY.md` — Pages custom-domain runbook: repo Settings →
  Pages → custom domain, the 4 GitHub apex IPs + www CNAME, Squarespace
  DNS panel walk-through, don't-touch-MX warning, hard-cutover note
  (staging = the github.io URL, flip once with Kylie watching).
- `MANUAL.md` — DNS records in Kylie's Squarespace account; exact
  domain string recorded (INTERVIEW TODO(leo)); enforce-HTTPS toggle
  after cert issuance.

**Context**:
- G-4: hosting < $5/mo — Pages is $0. Constraint: repo stays public.
- Domain no longer gates anything: deployment is continuous today on
  the github.io URL; the repoint is attach-later
  (decisions/2026-07-26-domain-reuse-squarespace.md, option (b)).
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
  - Kylie's mail (if any MX on the domain) still works post-repoint.

**Tasks**:
- [ ] T7.1 `build:prod` profile with mockup prune — files:
      `package.json`
- [ ] T7.2 deploy-pages.yml → permanent production deploy (prune,
      noindex/base flip staged behind the domain attach) — files:
      `.github/workflows/deploy-pages.yml`
- [ ] T7.3 Custom-domain runbook — files: `docs/DEPLOY.md`,
      `MANUAL.md` (Squarespace DNS chain)
- [ ] T7.4 Content checkpoint + DNS cutover + cold-client
      verification — files: `MANUAL.md` log
