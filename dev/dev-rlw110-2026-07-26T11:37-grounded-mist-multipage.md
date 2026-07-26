---
hash: rlw110
type: dev
created: 2026-07-26T11:37:00-06:00
title: Grounded mist — multi-page mockups, nav options, offerings-first CTA
from: user instruction 2026-07-26 (fast follow to rlw109)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: in-progress
owner: /devx-2026-07-26T1137-50993
branch: feat/dev-rlw110
entered_at: execute
---

## Goal

Leo (relaying Kylie's round-2 feedback): she doesn't love the gradient —
move away from the aggressive gradient wash. Lavender mist is the
closest pack in font, color, and vibe, so round 3 builds from it.
Split the one-scroll mockup into multiple pages, and present a bunch of
navigation options — including ways to show Modalities in a dropdown.
Make the feel more grounded. The multiple offerings are the main CTA,
not the vague "Book a session".

## Acceptance criteria

- [ ] Round-3 "grounded mist" set: ≥4 new mockup directions, each a
      multi-page mockup (Home, Offerings, Modalities, About) built on
      the pack-lavender-mist tokens (typeface + palette unchanged),
      with NO gradient washes — flat backgrounds, hairlines, solid
      tint bands (the grounded treatment)
- [ ] Each variant demonstrates a distinct navigation treatment; ≥2
      show Modalities via a dropdown/disclosure; every built mockup
      page (all rounds) still carries the visible "Modalities" nav
      text (E-7 contract)
- [ ] On round-3 pages the primary hero CTA is the offerings
      themselves (three named offering actions linking into the
      Offerings page); "Book a session" is not the primary button
- [ ] Page-to-page links work over file:// (explicit ./…/index.html
      hrefs at every depth); review index gains a round-3 section
      displayed first (numbering appended after the existing 12, so
      old numbers stay stable)
- [ ] Share package regenerated; round-3 variants embed their
      subpages in the single-file artifact (srcdoc frames can't follow
      relative links, so each page gets its own frame); framing copy
      updated for round 3
- [ ] E-1, E-5, E-7 all green; full build green

## Technical notes

- The share single-file embeds pages via iframe srcdoc — relative
  links dead-end there. Zip + future hosting are where multi-page
  navigation actually clicks through; the single-file shows every
  page as its own frame instead.
- No new token packs: all round-3 variants share pack-lavender-mist
  (E-1/E-7 identity contracts iterate packs, not pages — pages may
  share a pack). Registry `round` type extends to 3.
- Nav dropdowns must be CSS/`<details>`-only (pages are self-contained
  static HTML; no external JS).
- E-7 scans only direct children of dist/mockups/ for the Modalities
  regex (`>Modalities<`); variant subpages are below that but carry
  the same nav anyway.

## Status log

- 2026-07-26T11:37 — filed by /devx from Leo's instruction (fast
  follow to rlw109; entered_at: execute).
- 2026-07-26T11:37:53-06:00 — claimed by /devx in session /devx-2026-07-26T1137-50993
- 2026-07-26 — phase 2: spec ACs direct (v2 native); 6 ACs; workstream=rooted-light-website; red-artifacts=none (E-1/E-5/E-7 are the guardrails)
- 2026-07-26 — phase 3: 4 grounded variants (classic/centered/rail/
  compact nav) × 4 pages each on the mist pack via one GroundedPage
  skeleton + 2 dynamic routes; registry round 3 (nums 13-16, displayed
  first); packager embeds subpage srcdoc frames and parses numbering
  from the built index. Build 36 pages; E-1/E-5/E-7 green.
- 2026-07-26 — phase 4: 3-agent parallel adversarial review (Blind
  Hunter / Edge Case Hunter / Acceptance Auditor); 13 deduped findings
  (4 MED, 9 LOW); ALL fixed in-place — most load-bearing: classic
  dropdown overflowed the viewport at phone widths (now unfolds
  in-flow ≤560px) and the packager card regex could silently mispair
  slug/number (now per-card parse, loud failure, ≥16 guard); 2
  findings closed as no-change-needed (share-drift covered by the
  staleness guard; stale dist artifacts already wiped). Re-review of
  fix hunks clean; all ACs audited MET.
- 2026-07-26 — phase 5: local gates green — build exit 0 (36 pages),
  E-7 PASS (16 mockups), E-1 PASS, E-5 PASS; E-2/3/4 RED expected
  (rlw103 artifacts, waived in CI). Share package regenerated.
- 2026-07-26 — phase 7: PR https://github.com/LeoTheMighty/rooted-light/pull/6 opened (base main).
- 2026-07-26 — phase 7.5: tour published — https://htmlpreview.github.io/?https://raw.githubusercontent.com/LeoTheMighty/rooted-light/devx-tours/tours/rlw110/tour.html; PR body updated.
