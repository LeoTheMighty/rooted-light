---
hash: rlw101
type: dev
created: 2026-07-25T09:14:00-06:00
title: Scaffold & foundation — Astro project, content schemas, base layout
from: _devx/workstreams/rooted-light-website/plan.md (phase 1)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: done
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
- 2026-07-25T15:30 — phase 2: spec ACs direct (v2 native); 6 ACs; workstream=rooted-light-website; red-artifacts=E-1..E-6 (tests-after phase — evals expected red, runner must execute them). Note: GitHub repo LeoTheMighty/rooted-light created this session (user-run) — first claim rolled back on missing origin.
- 2026-07-25T15:35 — phase 3: T1.1–T1.5 implemented. Astro 5 static project, content.config.ts (modalities/offerings/resources glob collections), site.json seams (#booking-tbd), base.css + Page.astro, 7 route stubs, scripts/run-evals.mjs, CI markers wired (test=build, evals job continue-on-error), projects: entry added. Build green (7 routes); evals 1/6 green (E-2 early-green, honest — routes+nav complete); dev server smoke-tested.
- 2026-07-25T15:50 — phase 4: 3-agent parallel adversarial review (Blind Hunter, Edge Case Hunter, Acceptance Auditor); 8 findings (0 HIGH, 3 MED, 5 LOW); ALL fixed in-place — most load-bearing: --color-accent 4.19:1 → #5a6b4e 5.43:1/4.93:1 (AA link contrast on bg+surface); also home-title dedupe, per-page meta description, evals-runner numeric sort + loose E-* filter + spawn-failure diagnostics + 5-min timeout, greppable TODO(kylie) marker in site.json; package-lock.json flagged for commit. 3 reported findings dismissed with evidence (aria-current exact-match is correct ARIA; about-you h2 exists in markdown; CI marker edits are the intended /devx-init upgrade path). Re-review of changed hunks clean (build green, titles verified in dist).
- 2026-07-25T15:55 — phase 5/6/7: local gates green (build exit 0, 7 routes; evals runner honest 1/6; artifacts clean); commit d7df880; pushed feat/dev-rlw101; PR https://github.com/LeoTheMighty/rooted-light/pull/1
- 2026-07-25T16:00 — phase 7.5: tour published (https://htmlpreview.github.io/?https://raw.githubusercontent.com/LeoTheMighty/rooted-light/devx-tours/tours/rlw101/tour.html); PR body updated with tour link. Remote CI success on first probe (run 30176134769).
- 2026-07-25T16:05 — merged via PR #1 (squash → 23e7031). check-hold clean; merge-gate {"merge":true}. Worktree + local branch removed.
