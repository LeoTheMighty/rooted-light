---
hash: rlwt101
type: test
created: 2026-07-25T16:05:00-06:00
title: Wire astro check (+ a real test runner) into the lint/test gates
from: dev/dev-rlw101-2026-07-25T09:14-scaffold-foundation.md
status: ready
owner: null
branch: null
---

## Goal

The CI `lint` job and the local lint gate are honest no-ops as of rlw101
(no linter exists for the Astro stack). `@astrojs/check` + `typescript`
would give the lint gate real teeth (template type-checking), and a test
runner (e.g. vitest) becomes worthwhile once components carry logic
(phase 3's ModalityAccordion/BookingCTA/InquiryForm are the natural
trigger).

## Acceptance criteria

- [ ] `npm run lint` (or equivalent) runs `astro check` and fails on type
      errors in `.astro` templates
- [ ] CI `lint` job runs it (replacing the echo no-op inside the managed
      markers)
- [ ] devx.config.yaml `projects:` entry for the site gains the `lint:`
      command; `test:` upgraded from build-as-gate when a runner lands
- [ ] Local gate ordering (lint → test → coverage) unchanged

## Technical notes

- Filed from rlw101 self-review: `test = npm run build` is the current
  honest gate; this item upgrades, not replaces, that contract.
- Keep the evals job untouched — it has its own contract (continue-on-error
  while reds are by-design).

## Status log

- 2026-07-25T16:05 — filed by /devx during rlw101 (lint gate observed as
  no-op; astro check identified as the natural upgrade).
