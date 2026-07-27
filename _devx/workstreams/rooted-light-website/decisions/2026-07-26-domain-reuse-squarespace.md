# Decision: reuse Kylie's existing Squarespace-registered domain

- **Context:** Leo, 2026-07-26 — Kylie already built a Squarespace site
  and registered a domain through it. Rather than register a fresh
  `rootedlight.com`, the launch reuses that domain.
- **Status:** decided, **provisional** — Leo: "she might change it at
  some point, but we'll do this one for now."
- **Supersedes:** the domain options in the INTERVIEW entry
  "(from /devx-plan cdea58) Domain name for Rooted Light".
- **Exact domain string:** `TODO(leo)` — not yet recorded here. Nothing
  below depends on which string it is.

## Why reuse rather than register new

The existing domain already carries whatever search presence and
inbound links Kylie has accumulated — Google Business Profile,
Psychology Today, directory listings, referral links, anything printed.
A fresh domain starts that at zero and orphans every existing pointer
unless the old one is kept and redirected (which means paying for both).
Reuse is the default; a new domain is only worth it if she wants a
rebrand-level break from the current name.

## The core fact

**Registrar ≠ host.** Buying a domain through Squarespace only makes
Squarespace the *registrar*. The domain can point at any hosting we
choose; nothing about it is locked to Squarespace's site builder.

Two paths, either of which gets us off Squarespace hosting:

1. **Keep registration at Squarespace, repoint DNS** — edit the A/CNAME
   records in Squarespace's domain panel to point at our host. Works
   immediately, no waiting period, fully reversible. **Recommended for
   launch**: fewest moving parts, no dependency on lock windows, and it
   doesn't require untangling her billing.
2. **Transfer the domain out** (Cloudflare / Porkbun / Namecheap) —
   cleaner long-term and unlocks better DNS features, but gated on the
   lock windows below. Can be done any time after launch without
   touching the site.

## Constraints that gate the timeline

- **Free-with-plan domains.** If the domain came bundled free with an
  annual Squarespace subscription, it is free for year one only and
  **cannot be transferred out** during that window. Path 1 is unaffected
  and works from day one. Related trap: cancelling the Squarespace
  subscription stops renewing a bundled domain, and it can lapse — get
  it onto an independent/paid footing **before** cancelling anything.
- **60-day ICANN lock.** Blocks *transfers* (never DNS edits) for 60
  days after initial registration, after a prior transfer, or after a
  registrant-contact change. Only relevant to path 2.
- **Account control.** Domain admin lives in Kylie's Squarespace
  account. She either makes the DNS edits herself (walked through) or
  grants access. → becomes a MANUAL.md item when the deploy story
  (rlw107) unblocks; not actionable before then.
- **Don't touch MX/TXT.** If any email runs on that domain, change only
  A/CNAME records. Clobbering MX kills her mail at cutover.
- **Cutover is hard, not soft.** The moment the apex repoints, the
  existing Squarespace site is off that domain. Stage on the GitHub
  Pages preview from rlw112
  (https://leothemighty.github.io/rooted-light/) and flip once, with her
  watching.

## Knock-on for rlw107 (S3 + CloudFront)

Squarespace's DNS editor has **no ALIAS/ANAME support**. An apex domain
pointed at CloudFront needs one — CloudFront hands out a hostname, not
stable IPs — so "registration and DNS both stay at Squarespace" and
"CloudFront at the apex" are mutually exclusive. Three ways out; rlw107
should pick one before it starts (it is currently blocked on
rlw106/rlw113, so there is time):

- **(a) Move DNS to Cloudflare or Route 53**, leaving registration at
  Squarespace. Cloudflare's CNAME flattening handles the apex, it's
  free, and it sidesteps the transfer locks entirely — only nameservers
  change. Best option if CloudFront is kept.
- **(b) Drop CloudFront for GitHub Pages.** Pages publishes real apex A
  records, needs no DNS feature Squarespace lacks, and the deploy
  pipeline already exists from rlw112. Cheapest path to launch; revisit
  if traffic or cache control ever justifies CloudFront.
- **(c) www-only, apex redirects.** Point `www` at CloudFront via CNAME
  and redirect the apex. Works, but leans on Squarespace's redirect
  behavior and reads worse in print.

Recommendation: **(b) for launch, (a) if CloudFront is kept.** Either
way the domain decision does not block anything today.
