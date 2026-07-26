---
hash: rlw112
type: dev
created: 2026-07-26T16:20:00-06:00
title: Temporary GitHub Pages preview deploy (pre-domain)
from: user instruction 2026-07-26 (Leo — temporary hosting while name/domain are decided; repo flipped public by Leo's choice)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: ready
owner: null
branch: feat/dev-rlw112
entered_at: execute
---

## Goal

Serve the promoted site at https://leothemighty.github.io/rooted-light/
while the business name + domain are still being decided. This is a
TEMPORARY preview: rlw107 (S3 + CloudFront + domain) remains the real
deploy ticket and is untouched. Because Pages serves under the
`/rooted-light/` subpath, the site must become base-path aware without
changing the default build (evals and local dev keep root-relative
behavior).

## Acceptance criteria

- [ ] `astro.config.mjs` reads `DEPLOY_SITE` / `DEPLOY_BASE` env vars;
      default build (no env) is byte-equivalent behavior to today —
      E-1..E-5, E-7 all still green
- [ ] All internal root-relative links (nav, brand, in-page links,
      modality deep links, resource cards/backlinks, internal
      frontmatter resource urls) render base-prefixed when
      `DEPLOY_BASE` is set — zero hardcoded `/rooted-light/` in src
- [ ] `.github/workflows/deploy-pages.yml` builds with the Pages base
      + noindex flag and deploys `dist/` via actions/deploy-pages on
      push to main (+ manual dispatch); it does not touch devx-ci
- [ ] Preview pages carry `<meta name="robots" content="noindex">`
      (temporary URL must not get indexed); default build has no such
      tag
- [ ] Post-merge: Pages deployment succeeds and
      https://leothemighty.github.io/rooted-light/ serves the themed
      site with working nav + subpage links

## Technical notes

- Base-aware links via a tiny `withBase()` helper on
  `import.meta.env.BASE_URL`; site.json nav hrefs stay root-relative
  data, prefixed at render in Page.astro (aria-current must compare
  base-aware too).
- Pages was enabled with `build_type=workflow`; deploy uses
  actions/configure-pages → upload-pages-artifact → deploy-pages (no
  Jekyll, so no .nojekyll needed).
- Mockup pages use explicit ./relative links (file:// contract) — no
  base work needed there.
- When the real domain lands (rlw107), the workflow is deleted and
  `DEPLOY_BASE` goes away; nothing else should need unwinding.

## Status log

- 2026-07-26T16:20 — filed by /devx from Leo's instruction (temporary
  Pages preview; repo→public + Pages enablement done pre-claim with
  Leo's explicit choice via AskUserQuestion; entered_at: execute).
