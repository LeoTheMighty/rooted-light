---
hash: rlw105
type: dev
created: 2026-07-25T09:18:00-06:00
title: Theme promotion — apply Kylie's chosen style pack site-wide
from: _devx/workstreams/rooted-light-website/plan.md (phase 5)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: blocked
owner: null
branch: feat/dev-rlw105
---

## Goal

Gated on Kylie's style pick (INTERVIEW.md, from rlw102). Promote the
chosen style pack to the site-wide theme — all pages, not just home —
restyling nav/CTA/components. If Kylie picks a blend of two packs, blend
at the token level (one pack's palette, the other's type); no third
exploration round. Mockup routes stay intact until rlw107's production
profile prunes them.

## Acceptance criteria

- [ ] Chosen pack's tokens are the default theme import in
      `Page.astro` / `base.css`; all seven routes render with it
- [ ] E-1, E-2, E-4, E-5 all still green after the restyle
- [ ] Human: side-by-side check that the promoted theme matches the
      mockup Kylie picked (log in spec status log)

## Technical notes

- Blocked-by: rlw102 (package sent) + Kylie's INTERVIEW.md answer.
- Parallel-safe with rlw106 (this touches styles/layouts; rlw106
  touches config + offering pages).

## Status log

- 2026-07-25T09:18 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 5. Blocked on Kylie's style pick.
