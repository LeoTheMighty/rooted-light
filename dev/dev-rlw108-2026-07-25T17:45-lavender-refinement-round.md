---
hash: rlw108
type: dev
created: 2026-07-25T17:45:00-06:00
title: Lavender refinement round — ≥5 simple variants + Modalities section in all mockups
from: _devx/workstreams/rooted-light-website/plan.md (phase 2b)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-25T1757-30209
branch: feat/dev-rlw108
entered_at: execute
---

## Goal

The G-6 deliverable (target 2026-08-13): Leo picked soft lavender dusk
("keep it simple") and promoted Modalities to a top-level linkable
section. Produce ≥ 5 additional lavender-led, deliberately simple
home-page variants (distinct identities within the family), add the
Modalities section to the shared mockup content + nav so EVERY mockup
(both rounds) carries it, restructure the review index with round 2
first, and re-package the share channel.

## Acceptance criteria

- [ ] `node _devx/workstreams/rooted-light-website/evals/E-7_lavender-refinement.mjs`
      passes (≥ 6 pack-lavender-*.css incl. original dusk; distinct
      identities across the ENTIRE pack set; "Modalities" nav entry on
      every dist/mockups page; refinement pages linked from index)
- [ ] E-1 and E-5 still pass (round-1 packs untouched; new packs join
      the AA contrast set)
- [ ] Token-name contract honored in every new pack (all 7 tokens,
      solid --color-bg fallback for gradient packs)
- [ ] Refinement layouts are deliberately simple (fewer decorations,
      calmer sections) yet structurally distinguishable — not seven
      recolors of one layout
- [ ] Review index restructured: round 2 (refinements) listed first,
      round 1 kept below; share package regenerated via
      `npm run mockups:package`
- [ ] MANUAL.md entry filed: send round-2 package to Kylie; record the
      refinement pick in INTERVIEW.md ("Kylie's lavender refinement
      pick" entry — rlw105 gates on it)

## Technical notes

- Fonts: system or self-hosted only — no CDN.
- E-7 distinctness is mechanical across BOTH rounds: no two packs share
  (--color-accent, --font-heading).
- Modalities mockup section: seed the three modalities (talk therapy,
  EMDR, reiki-informed care) from shared content; nav anchor contract
  `>Modalities<` (E-7 regex: `>\s*Modalities\s*<`).
- Round-1 layouts gain the Modalities section too — FR-14 says ALL
  mockups carry the new top-level section.

## Status log

- 2026-07-25T17:45 — emitted by the /devx revision of workstream cdea58
  (phase 2b), from Leo's 2026-07-25 decision: lavender pick + keep
  simple + Modalities top-level.
- 2026-07-25T17:57:43-06:00 — claimed by /devx in session /devx-2026-07-25T1757-30209
- 2026-07-25 — phase 2: spec ACs direct (v2 native); 6 ACs;
  workstream=rooted-light-website; red-artifacts=E-7_lavender-refinement.mjs
  — re-run in worktree, confirmed failing for the right reason (1
  lavender pack, refinements missing).
- 2026-07-25 — phase 3: implemented 5 lavender refinement packs (E-5:
  36 pairings AA first pass), 5 simple structurally-distinct layouts,
  Modalities section + nav added to _content.ts and ALL 7 round-1
  layouts, registry gained round field (round 2 first), index
  restructured into rounds, MANUAL round-2 entry. E-7 GREEN (6 lavender
  packs, Modalities nav on all 12 mockups), E-1 GREEN (12 mockups),
  E-5 GREEN. Build 20 pages; self-containment verified; package
  regenerated (12 srcdocs).
- 2026-07-25 — phase 4: 3-agent parallel adversarial review (Blind
  Hunter / Edge Case Hunter / Acceptance Auditor); 11 unique findings
  (1 HIGH, 2 MED, 6 LOW, 2 info/no-action); ALL actionable fixed
  in-place — most load-bearing: the single-file share artifact still
  carried round-1 framing ("reply with your favorite" over 12 flat
  options) and diverging numbering; the generator now scrapes the round
  structure from the built index (round-2-first sections, continuous
  1–12 numbering that matches everywhere) with hardened guards (≥12
  unique slugs, 2 rounds, zero-card round throws). Also fixed: sage
  kicker/CTA + mist/linen/dawn accents darkened to ≥4.5:1 on bg AND
  surface (computed, comments carry ratios), --band consumed by the
  linen footer, Ink gained an editorial margin-label chapter grid to
  separate it structurally from Mist. Re-review clean: rebuild + E-7/
  E-1/E-5 green, single-file framing + numbering verified in output.
- 2026-07-25 — phase 5: local gates green — npm run build exit 0
  (20 pages), E-7 PASS (6 lavender packs, Modalities on all 12), E-1
  PASS (12 mockups), E-5 PASS (36 pairings). Lint/coverage not
  configured (honest no-ops); E-2/E-3/E-4 red by design (phase 3/6).
