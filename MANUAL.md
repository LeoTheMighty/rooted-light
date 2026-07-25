# MANUAL — Things only you can do

<!-- devx-empty-state-start -->
> **What goes here:** actions that require a human (App Store upload,
> credentials, paid-API onboarding, etc.). One bullet per task. Don't
> conflate with INTERVIEW.md — INTERVIEW = decisions, MANUAL = actions.
> This empty-state header auto-deletes once this file holds three or more
> items.
<!-- devx-empty-state-end -->


## Mockup review package (rlw102)

- [ ] **Send the style-direction package to Kylie + verify on a phone**
  The package is built: run `npm run mockups:package` → it writes two
  artifacts to `.devx-cache/`:
  - `rooted-light-mockups.html` — **send this one.** A single
    self-contained file (7 directions embedded + jump nav); phone file
    viewers render one HTML file fine but don't follow links between
    unzipped files.
  - `rooted-light-mockups.zip` — desktop fallback (unzip → open
    `mockups/index.html`).
  Steps:
  1. AirDrop/text the `.html` to your own phone first and sanity-check
     each direction renders and scrolls inside its frame (if the Files
     preview looks off, use the share sheet → open in Safari).
  2. Share it with Kylie with the note already baked in: reply with a
     favorite or a blend of two.
  3. In the same message, request her long-lead content: Experiences
     copy for About Me, Education/Certifications list, photos/imagery,
     and her Psychology Today profile URL (tracked in INTERVIEW.md
     "Content Kylie needs to supply").
  4. When she answers, record her style pick in INTERVIEW.md ("Kylie's
     style-direction pick" entry) — rlw105 (theme promotion) is gated
     on it.
  Filed: 2026-07-25 by /devx rlw102.

## /devx-init deferred work

- [x] **devx-init: no-remote** — GitHub-side scaffolding deferred — no `origin` remote
  Resolved 2026-07-25: user created `LeoTheMighty/rooted-light` (private) and
  added `origin`; `devx init --resume-gh` replayed queued ops (workflows
  verified on main; single-branch config — no develop, no protection).
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
