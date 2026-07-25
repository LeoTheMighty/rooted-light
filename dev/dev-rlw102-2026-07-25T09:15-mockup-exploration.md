---
hash: rlw102
type: dev
created: 2026-07-25T09:15:00-06:00
title: Mockup exploration — 6+ style packs + review index for Kylie
from: _devx/workstreams/rooted-light-website/plan.md (phase 2)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: done
owner: /devx-2026-07-25T1647-23250
branch: feat/dev-rlw102
---

## Goal

The G-1 deliverable (target 2026-08-06): ≥ 6 visually distinct home-page
style directions — each a token CSS pack (`src/styles/tokens/pack-*.css`)
+ home layout variant over the same `site.json` content — behind a
phone-friendly review index at `/mockups/`, published to a throwaway
share channel so Kylie can browse them before hosting exists. Directions
(from plan.md phase 2): botanical editorial / warm craft-paper / soft
lavender dusk / grounded modern / hand-touched organic / quiet minimal
light / optional forest-deep accent. Brief: bright, genuine, caring,
earthy (sage, lavender, tan, brown) — not kitschy, not glamorous.

## Acceptance criteria

- [x] `node _devx/workstreams/rooted-light-website/evals/E-1_mockup-package.mjs`
      passes (≥ 6 mockups + index, all linked, distinct identities)
- [x] `node _devx/workstreams/rooted-light-website/evals/E-5_contrast.mjs`
      passes (every pack AA: body ≥ 4.5:1, heading ≥ 3:1)
- [x] Token-name contract honored in every pack: `--color-bg`,
      `--color-surface`, `--color-text-body`, `--color-text-heading`,
      `--color-accent`, `--font-heading`, `--font-body` (solid
      `--color-bg` fallback for gradient packs)
- [x] Layout variants differ structurally (hero placement, nav
      treatment, section rhythm) — not recolors
- [ ] Package published to a throwaway share channel (single-file HTML +
      zipped relative-path build via `npm run mockups:package`) and
      verified to open on a phone (phone check = human step, see
      MANUAL.md)
- [x] MANUAL.md entry filed: send package to Kylie + request long-lead
      content (Experiences copy, certifications, photos, Psychology
      Today URL); record her style pick in INTERVIEW.md

## Technical notes

- Fonts: system or self-hosted only — no CDN.
- Placeholder imagery: botanical/texture, no stock people.
- E-1 distinctness is mechanical: no two packs share
  (--color-accent, --font-heading).

## Status log

- 2026-07-25T09:15 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 2.
- 2026-07-25 — phase 2: spec ACs direct (v2 native); 6 ACs;
  workstream=rooted-light-website; red-artifacts=E-1_mockup-package.mjs,
  E-5_contrast.mjs — both re-run in worktree and confirmed failing for
  the right reason (no dist/, no src/styles/tokens/).
- 2026-07-25 — phase 3: implemented 7 token packs (E-5 green first
  pass, 21 pairings), 7 structurally distinct Home*.astro layouts via
  shared MockupShell (all CSS inlined for file:// zip sharing), 7
  mockup routes + review index with build-time-parsed swatches,
  scripts/package-mockups.mjs + `npm run mockups:package` share
  channel (zip verified: no external refs, explicit index.html
  links), MANUAL.md send-to-Kylie entry + INTERVIEW.md style-pick
  entry. E-1 green (7 mockups + index, 7 distinct identities).
- 2026-07-25 — phase 4: 3-agent parallel adversarial review (Blind
  Hunter / Edge Case Hunter / Acceptance Auditor); 15 unique findings
  (1 HIGH, 4 MED, 10 LOW); ALL actionable fixed in-place — most
  load-bearing: phone file viewers don't follow relative file:// links
  between unzipped files, so the share channel now leads with a
  single-file srcdoc review HTML (zip kept as desktop fallback). Also
  fixed: sticky-topbar anchor clearance (grounded-modern), booking-CTA
  dead tap → anchors to a visible placeholder note, organic tagline
  AA over blob, Android font-fallback note in index, hardened token
  parsing (comment-strip + loud failure), </style> guard, stale-zip
  guard, forest centering + dead rules, valid card nesting.
  Re-review clean: rebuild + E-1/E-5 green, all fixes verified in
  dist/ output.
- 2026-07-25 — phase 5: local gates green — npm run build exit 0
  (15 pages), E-1 PASS, E-5 PASS (21 pairings). Lint/coverage not
  configured for this stack (honest no-ops per rlw101); full eval
  summary 4/6 green (E-3, E-4 red by design — phases 3/6).
- 2026-07-25T16:47:29-06:00 — claimed by /devx in session /devx-2026-07-25T1647-23250
- 2026-07-25 — phase 7: pushed feat/dev-rlw102 (c21694e); PR #3 opened
  → https://github.com/LeoTheMighty/rooted-light/pull/3 (no unresolved
  placeholders in body); remote CI devx-ci run 30178869474 SUCCESS.
- 2026-07-25 — phase 7.5: tour built (6 stops, 3 grep-verified trails,
  6-entry decision ledger) + published to devx-tours (1ece160); PR body
  updated with tour link + orientation fallback.
- 2026-07-25 — phase 8: check-hold clean, merge-gate {"merge":true};
  merged via PR #3 (squash → 478203b). gh exited non-zero in-worktree
  (known quirk) — verified MERGED via gh pr view.
