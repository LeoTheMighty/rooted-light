---
hash: rlw107
type: dev
created: 2026-07-25T09:20:00-06:00
title: Deploy — promote GitHub Pages to production + attach Kylie's domain
from: _devx/workstreams/rooted-light-website/plan.md (phase 7)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: blocked
owner: null
branch: feat/dev-rlw107
---

## Goal

Ship it (G-3, target 2026-09-23 with buffer to 09-30) by promoting the
existing GitHub Pages pipeline to production — **no AWS** (rescoped
2026-07-27, Leo). `build:prod` profile (build + `rm -rf dist/mockups`
postbuild prune — Astro has no exclude-pages config; env-guarded
`getStaticPaths` is the fallback), `deploy-pages.yml` made permanent
(temporary-preview comment + `DEPLOY_NOINDEX` dropped;
`DEPLOY_SITE`/`DEPLOY_BASE` flipped to the custom domain + `/` at
cutover), Kylie's existing Squarespace-registered domain attached by
DNS repoint (4 GitHub apex A records + www CNAME; auto-HTTPS), runbook
in `docs/DEPLOY.md`, human steps (Squarespace DNS edits in Kylie's
account, enforce-HTTPS toggle) in MANUAL.md. `devx-deploy.yml` stub
stays unused — note its retirement in the runbook.

## Acceptance criteria

- [ ] Site loads over HTTPS on the custom domain from a cold client
- [ ] `curl` of `/mockups/` on production returns 404/redirect
- [ ] Evals split by profile: E-2, E-3 (flagless), E-4, E-6 green
      against production `dist/`; E-1, E-5 green against `build:full`
      output
- [ ] Launch content checkpoint before DNS cutover: every `TODO(kylie)`
      marker resolved or consciously deferred by Kylie/Leo (grep output
      dispositioned, logged in MANUAL.md)
- [ ] Hosting recurring cost < $5/mo (G-4) — $0: GitHub Pages, public
      repo; no paid infra anywhere
- [ ] Kylie's mail (any MX/TXT on the domain) untouched by the repoint

## Technical notes

- Blocked-by: rlw106 + rlw113 (launch needs live booking + live therapy
  form — E-3 runs flagless in the deploy workflow and the form action
  must be real). The domain does NOT gate: deployment is continuous on
  the github.io URL today; the repoint is attach-later.
- Hosting decision trail:
  _devx/workstreams/rooted-light-website/decisions/2026-07-26-domain-reuse-squarespace.md
  (option (b)) + design.md resolved-questions supersession 2026-07-27.
- Cutover is hard, not soft: the apex repoint takes Kylie's current
  Squarespace site off the domain the moment it lands — flip once,
  with her watching, per the decision doc.

## Status log

- 2026-07-25T09:20 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 7. Blocked on rlw105/rlw106.
- 2026-07-26 — gating updated by /devx-plan (cdea58 revision): rlw105
  done; old phase 6 split — now blocked on rlw106 (booking) + rlw113
  (therapy form).
- 2026-07-27 — RESCOPED by /devx (cdea58 revision, Leo: "what do we
  need any AWS usage for?"): S3/CloudFront/ACM dropped; GitHub Pages
  is the permanent host (rlw112 pipeline promoted); domain = Kylie's
  existing Squarespace-registered one, attached by DNS repoint,
  no longer a gate. Filename keeps the historical slug — hash is the
  identity. Still blocked on rlw106 + rlw113 only.
