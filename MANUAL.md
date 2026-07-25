# MANUAL — Things only you can do

<!-- devx-empty-state-start -->
> **What goes here:** actions that require a human (App Store upload,
> credentials, paid-API onboarding, etc.). One bullet per task. Don't
> conflate with INTERVIEW.md — INTERVIEW = decisions, MANUAL = actions.
> This empty-state header auto-deletes once this file holds three or more
> items.
<!-- devx-empty-state-end -->


## /devx-init deferred work

- [ ] **devx-init: no-remote** — GitHub-side scaffolding deferred — no `origin` remote
  GitHub-side scaffolding deferred — repo has no `origin` remote.
  
  Once you `git remote add origin <url>` and `git push -u origin main`,
  run `devx init --resume-gh` to replay the queued ops:
    - create `develop` branch
    - set `develop` as default branch
    - push `.github/workflows/*` to remote (already on disk)
    - apply branch protection on `main`
  
  Local setup is complete and devx works without the GitHub side.
  Filed: 2026-07-25T14:42:53.909Z  <!-- devx:init-failure:no-remote -->

- [ ] **devx-init: supervisor-install-deferred** — OS-supervisor install deferred by non-interactive `devx init`
  Bare `devx init` never installs launchd/systemd/Task Scheduler units
  unattended. To install the manager/concierge supervisor, run the
  interactive `/devx-init` flow (or see docs/SETUP.md). Until then,
  `devx manage` / `devx loop` run only while you start them yourself.
  Filed: 2026-07-25T14:42:53.932Z  <!-- devx:init-failure:supervisor-install-deferred -->
