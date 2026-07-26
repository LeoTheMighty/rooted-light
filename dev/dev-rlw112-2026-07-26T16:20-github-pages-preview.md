---
hash: rlw112
type: dev
created: 2026-07-26T16:20:00-06:00
title: Temporary GitHub Pages preview deploy (pre-domain)
from: user instruction 2026-07-26 (Leo — temporary hosting while name/domain are decided; repo flipped public by Leo's choice)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: done
owner: /devx-2026-07-26T1620-73496
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
- 2026-07-26T16:20:44-06:00 — claimed by /devx in session /devx-2026-07-26T1620-73496
- 2026-07-26 — phase 2: spec ACs direct (v2 native); 5 ACs;
  workstream=rooted-light-website; red-artifacts=none (infra item;
  E-1..E-5/E-7 are regression guardrails on the default profile).
- 2026-07-26 — phase 3: withBase() helper (src/lib/paths.ts, identity
  under default base); astro.config reads DEPLOY_SITE/DEPLOY_BASE;
  Page.astro nav/brand/aria-current base-aware + DEPLOY_NOINDEX robots
  meta; all root-relative hrefs across 9 pages/components wrapped
  (incl. frontmatter-driven modality/resource urls — withBase passes
  external URLs through); .github/workflows/deploy-pages.yml (push
  main + dispatch, configure-pages → upload-pages-artifact →
  deploy-pages, devx-ci untouched). Pre-claim setup: repo flipped
  public + Pages enabled build_type=workflow (Leo's explicit choice).
- 2026-07-26 — phase 4: clean review (0 issues; re-ran with stricter
  framing — confirmed clean). Single rigorous pass over 100% of
  changed lines (sweep was regex-driven, so output verified
  empirically in BOTH build profiles): default build → all 6 evals
  PASS, links byte-identical, no robots tag; base build → zero
  unprefixed internal hrefs across all 8 routes, deep links
  /rooted-light/modalities/#id correct, aria-current still renders,
  form action untouched, noindex present.
- 2026-07-26 — phase 5: local gates green — default build exit 0 (64
  pages); E-1/E-2/E-3(--allow-placeholder)/E-4/E-5/E-7 PASS; base
  build exit 0 with prefix/leak/noindex checks clean.
- 2026-07-26 — phase 7: PR https://github.com/LeoTheMighty/rooted-light/pull/10 opened (base main); devx-ci run 30223069323 SUCCESS.
- 2026-07-26 — phase 7.5: tour published — https://htmlpreview.github.io/?https://raw.githubusercontent.com/LeoTheMighty/rooted-light/devx-tours/tours/rlw112/tour.html; PR body updated.
- 2026-07-26 — phase 8: check-hold clean; merge-gate {"merge":true}; merged via PR #10 (squash → 43b55a9). AC-5 verified live: deploy-pages run 30223160095 SUCCESS; https://leothemighty.github.io/rooted-light/ → 200, themed title, noindex meta, prefixed nav; /offerings/therapy/ → 200; /modalities/ carries data-modality markers. Worktree + local branch removed.
- 2026-07-26 — NOTE (drift, surfaced to Leo): a concurrent re-plan session's uncommitted INTERVIEW.md edits reference "rlw112 (Calendly runbook)" + "rlw113" — hash rlw112 was already taken by THIS spec (filed d30c1dc). The concurrent session's items need fresh hashes before filing.
