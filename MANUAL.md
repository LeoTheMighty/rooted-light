# MANUAL — Things only you can do

<!-- devx-empty-state-start -->
> **What goes here:** actions that require a human (App Store upload,
> credentials, paid-API onboarding, etc.). One bullet per task. Don't
> conflate with INTERVIEW.md — INTERVIEW = decisions, MANUAL = actions.
> This empty-state header auto-deletes once this file holds three or more
> items.
<!-- devx-empty-state-end -->

## Calendly connection chain (cdea58 rev 2026-07-26 → rlw114/rlw106)

Do these **in order** — each unblocks the next. The click-by-click
runbook is **[`docs/CALENDLY-SETUP.md`](docs/CALENDLY-SETUP.md)**
(shipped by rlw114) — every step below points at its section; the
how-to details, prices, and caveats live there and in the comparison
doc, not here. Steps 1–2 can start **today**. Money lands in Kylie's
PayPal from step 8 onward.

- [ ] **1. PayPal Business account for Kylie** (runbook §2) — the long
  pole: identity verification can take days, so start first. Required
  for Calendly payment collection; the runbook covers
  upgrade-vs-new-account and what to have ready.
- [ ] **2. Calendly account on Standard** (runbook §1) — sign up with
  Kylie's email; subscribe to Standard.
- [ ] **3. Connect PayPal to Calendly** (runbook §3) — log in with the
  Business account from step 1.
- [ ] **4. Kylie's numbers** — answer the INTERVIEW.md entry "Calendly
  event-type details — Kylie's numbers": session price + duration,
  training price + format + seat cap. (A decision, tracked there;
  listed here because step 5 consumes it.)
- [ ] **5. Create the two event types** (runbook §4–§5): "Reiki
  Session" (1:1) and "Reiki Training" (group, seat-capped), each with
  PayPal collection ON. Nothing else is made public — therapy is never
  bookable.
- [ ] **6. Kylie picks her schedule** (runbook §6) — recurring weekly
  availability, minimum notice, booking horizon, buffers. All hers,
  all changeable anytime in Calendly without touching the site.
- [ ] **7. Capture the two event-type links** (runbook §7) — copy the
  "Reiki Session" and "Reiki Training" share links and paste them into
  a reply to this chain (or straight into `src/content/site.json`
  `booking.url` / `booking.training_url`). **This unblocks rlw106**
  (site wiring).
- [ ] **8. Paid end-to-end test** (after rlw106 merges; runbook §7
  copy-paste checklist): book + pay a real session AND a training seat
  from the live site, confirm funds arrive, then cancel and refund
  both. Log the result in the rlw106 spec.

Filed: 2026-07-26 by /devx-plan (cdea58 revision — Calendly decision).


## Lavender refinement package (rlw108)

- [x] **SUPERSEDED 2026-07-27** — the refinement pick was answered
  2026-07-26 (Warm sand & lilac, via Leo) and the theme shipped
  (rlw105); the live one-pager preview is now the thing to show Kylie,
  not the mockup package. Kept for history:
- ~~**Send the round-2 (lavender refinement) package to Kylie**~~
  Supersedes the rlw102 send below if it hasn't gone out yet — the new
  package contains both rounds, refinements first, and every mockup now
  carries the Modalities section. Run `npm run mockups:package` →
  `.devx-cache/rooted-light-mockups.html` (send this single file; zip
  is the desktop fallback). Steps:
  1. Open the .html on your own phone; check the five lavender variants
     render and scroll inside their frames.
  2. Send to Kylie: "direction is lavender — which of these five is the
     final look (or what would you tweak)?"
  3. Record the answer in INTERVIEW.md ("Kylie's lavender refinement
     pick") — rlw105 (theme promotion) is gated on it.
  Filed: 2026-07-25 by /devx rlw108.

## Mockup review package (rlw102)

- [x] **SUPERSEDED 2026-07-27** — style pick answered 2026-07-25 (soft
  lavender dusk) and finalized 2026-07-26; the long-lead content
  request folded into the how-to-finish email to Kylie. Kept for
  history:
- ~~**Send the style-direction package to Kylie + verify on a phone**~~
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

- [ ] **rlw105: side-by-side theme check (AC-3)** — Compare the promoted
  site against the picked mockup: run `npm run dev`, open `/` (and any
  other route) next to `/mockups/sand-lilac/` and confirm the promoted
  theme matches the Warm sand & lilac variant (bg #f7f1e8, lilac accent
  #6c5590, Didot headings, quote band). Log the result as a status-log
  line in `dev/dev-rlw105-2026-07-25T09:18-theme-promotion.md`.
  PR: https://github.com/LeoTheMighty/rooted-light/pull/9
  Filed: 2026-07-26 by /devx (YOLO merged without blocking on the human check)
