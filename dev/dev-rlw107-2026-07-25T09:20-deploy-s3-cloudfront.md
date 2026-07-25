---
hash: rlw107
type: dev
created: 2026-07-25T09:20:00-06:00
title: Deploy — S3 + CloudFront + domain, production build profile
from: _devx/workstreams/rooted-light-website/plan.md (phase 7)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: blocked
owner: null
branch: feat/dev-rlw107
---

## Goal

Ship it (G-3, target 2026-09-23 with buffer to 09-30). `build:prod`
profile (build + `rm -rf dist/mockups` postbuild prune — Astro has no
exclude-pages config; env-guarded `getStaticPaths` is the fallback), S3
bucket + CloudFront distribution + ACM cert + chosen domain, deploy
wired inside the existing `.github/workflows/devx-deploy.yml` markers
(wrap, don't duplicate), runbook in `docs/DEPLOY.md`, human steps
(domain purchase, ACM validation, CI credentials/OIDC) in MANUAL.md.

## Acceptance criteria

- [ ] Site loads over HTTPS on the custom domain from a cold client
- [ ] `curl` of `/mockups/` on production returns 404/redirect
- [ ] Evals split by profile: E-2, E-3 (flagless), E-4, E-6 green
      against production `dist/`; E-1, E-5 green against `build:full`
      output
- [ ] Launch content checkpoint before DNS cutover: every `TODO(kylie)`
      marker resolved or consciously deferred by Kylie/Leo (grep output
      dispositioned, logged in MANUAL.md)
- [ ] Hosting recurring cost < $5/mo (G-4) — verified against the AWS
      calculator/billing estimate in the runbook

## Technical notes

- Blocked-by: rlw105 + rlw106 (launch needs theme + live booking);
  domain decision from INTERVIEW.md at the DNS step only — bucket +
  distribution can precede it.
- G-4: S3+CloudFront at this traffic is cents/month.

## Status log

- 2026-07-25T09:20 — emitted by /devx-plan from workstream cdea58
  (rooted-light-website), phase 7. Blocked on rlw105/rlw106.
