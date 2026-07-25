# Plan critique pass — 2026-07-25 (lenses: pm, architect, dev, qa)

Thoroughness is send-it, but the plan spans ≥ 2 stack surfaces (Astro
app, CI workflows, AWS infra, external providers), so the critique ran
per `engine.critique.min_surfaces`. Four parallel lens subagents; all
file-citing claims were grep-grounded by the lenses.

## Accepted findings (applied to plan.md)

- **Phase-6 contradiction (pm/arch/dev/qa — 3 lenses)**: "E-1..E-6 green
  against deployed dist/" impossible once mockups are pruned. → Two
  build profiles (`build:full` for E-1/E-5, `build:prod` for the rest);
  exclusion mechanism corrected to postbuild prune (Astro has no
  exclude-pages config).
- **No mockup delivery mechanism before hosting (pm HIGH)**: → T2.5 now
  publishes to a throwaway share channel, verified on a phone.
- **Launch could ship placeholder content (pm HIGH)**: → content request
  bundled into the phase-2 Kylie touchpoint; `TODO(kylie)` checkpoint
  gate before DNS cutover (T7.4).
- **Phase 5 double-gated (arch MED)**: theme promotion and provider
  wiring blocked on independent human decisions. → Split into phase 5
  (theme, gated on style pick) and phase 6 (wiring, gated on provider
  choice); 7 phases total.
- **Astro v5 realities (dev MED)**: `src/content.config.ts` + glob
  loaders; `site.json` is a plain import, not a collection.
- **Repo hygiene (dev/arch MED)**: `.gitignore` additions, npm scripts
  (`dev`/`build`/`build:full`/`evals`), evals wired into devx-ci.yml
  markers (T1.1, T1.5).
- **Machine-readable eval hooks (dev MED)**: canonical token-name
  contract per pack (incl. solid `--color-bg` fallback for gradient
  packs); `data-cta="booking"` selector contract (T2.1, T3.3).
- **E-3 `--allow-placeholder` hole (qa MED)**: flag now hard-errors
  against production builds; phases 6/7 + deploy workflow run flagless.
- **E-4 coverage row incoherent (qa MED)**: E-4 is click-depth only per
  its threshold → verified fully in phase 3 via the CTA selector; href
  liveness stays E-3's concern. E-5 priority label normalized to P2.
- **Wrap-don't-duplicate on deploy (arch MED)**: use the existing
  `.github/workflows/devx-deploy.yml` stub markers, not a new workflow.
- **Domain decision surfaced late (pm MED)**: bundled into phase 4's
  INTERVIEW touchpoint (also pre-filed in INTERVIEW.md today).
- **No dates (pm MED)**: phase checklist now carries target dates
  mapped to G-1 (08-08) and G-3 (09-30).
- **Crisis-resources pointer missing (pm LOW)**: added to T3.4 (988
  note on therapy page) per PRD anti-persona.
- **Human steps durability (qa LOW)**: phone sanity-check folded into
  T2.5's MANUAL entry; T5.4→T6.3 now files MANUAL.md explicitly.

## Rejected / reinterpreted findings

- **"No task authors the eval scripts" (dev/qa HIGH)**: reinterpreted —
  evals are authored at the RED stage before phase 1 executes (engine
  contract), not by plan phases. Plan now states this explicitly in
  Current state, including the no-editing-evals-to-pass rule, so the
  finding's underlying risk (phase claimed green with no eval) is
  closed by clarification rather than new tasks.
- **CI evals step could mask red (implied)**: evals are expected red
  until their phase lands; the CI step reports but the devx CI contract
  (lint/test) stays the required check until launch.
