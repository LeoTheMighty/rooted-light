---
hash: rlw101
type: dev
created: 2026-07-25T09:14:00-06:00
title: Scaffold & foundation — Astro project, content schemas, base layout
from: _devx/workstreams/rooted-light-website/plan.md (phase 1)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-25T1525-15993
branch: feat/dev-rlw101
---

## Goal

Stand up the Astro static project and the shared bones every later phase
builds on: content collections + schemas (Astro v5 `src/content.config.ts`
with glob loaders), `site.json` config seams (`booking.url`,
`booking.training_url`, `contact.form_action` — placeholder
`#booking-tbd`), mobile-first `base.css`, shared `Page.astro` layout with
landmarks + nav, stub routes for all seven pages, repo hygiene
(`.gitignore`: `node_modules/`, `dist/`, `.astro/`), npm scripts (`dev`,
`build`, `build:full`, `evals`), and a build+evals step inside the
devx-ci.yml managed markers.

## Acceptance criteria

- [ ] `npm run build` exits 0; `dist/` contains all seven routes (home,
      about-me, about-you, resources, offerings, offerings/reiki,
      offerings/therapy)
- [ ] `npm run dev` serves pages readable at 360px width (single-column
      flow, nav usable)
- [ ] `git status` clean of build artifacts after a build
- [ ] `src/content.config.ts` defines modalities/offerings/resources
      collections per design.md Interfaces; `site.json` is a plain
      import, not a collection
- [ ] `npm run evals` runs every `E-*.mjs` under
      `_devx/workstreams/rooted-light-website/evals/` (red is expected
      at this phase; the script must run them, not pass them)
- [ ] CI (devx-ci.yml markers) builds and reports eval status without
      masking the lint/test contract

## Technical notes

- Design: `_devx/workstreams/rooted-light-website/design.md`
  (Architecture tree, token/seam contracts). Zero client JS; `<details>`
  accordion is native.
- Do not edit eval scripts to make them pass — eval changes go through
  `devx revise` (plan.md Current state).
- Add a `projects:` runner entry for the site itself (repo root, `test:`
  once a test command exists) alongside the existing evals runner in
  devx.config.yaml.

## Status log

- 2026-07-25T09:14 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 1.
- 2026-07-25T15:25:22-06:00 — claimed by /devx in session /devx-2026-07-25T1525-15993
