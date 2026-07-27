---
hash: rlw116
type: dev
created: 2026-07-26T21:30:00-06:00
title: Single-page IA — scrollable sections, About/Services renames, hero copy
from: user instruction 2026-07-26 (Leo, relaying Kylie — one-page site, section renames, hero simplification)
plan: plan/plan-cdea58-2026-07-25T08:55-rooted-light-website.md
status: ready
owner: null
branch: feat/dev-rlw116
entered_at: execute
---

## Goal

Kylie wants ONE scrollable page, not multiple pages. Convert the site
to a single-page IA: the mist hero (rlw115) stays as the full-screen
first impression, the quote band stays ("she likes the quote"), and
each former page's content becomes a scroll section of the main page,
navigated by anchor links. Plus renames and hero copy changes:

- **Remove "About You" entirely** (page + nav + content).
- **"About Me" → "About"**; **"Offerings" → "Services"**.
- **Nav order: Home, About, Services, Modalities, Resources** (anchor
  links on the one page).
- **Hero owner line**: `Kylie Fustini · Therapist · Reiki
  Master/Teacher`.
- **Hero de-cluttered**: between the owner line and the "Explore"
  pill, ONLY one line remains — the intention, reworded to:
  `A place to feel safe, seen, and supported — and to leave feeling
  whole again.` The tagline line ("Therapy and reiki, one integrated
  body of work.") is removed from the hero.

## Acceptance criteria

- [ ] Home is a single scrollable page: full-screen mist hero → quote
      band → About → Services → Modalities → Resources sections, in
      that order, each with a stable id anchor
- [ ] Nav (floating on hero) reads Home · About · Services ·
      Modalities · Resources and links to the section anchors; no
      "About You" or "Offerings" label anywhere user-visible
- [ ] Hero shows exactly: site name, `Kylie Fustini · Therapist ·
      Reiki Master/Teacher`, the new intention line ("…safe, seen, and
      supported…"), and the pill CTA (relabel to match "Services");
      tagline line gone
- [ ] All existing section content survives the fold-in: About (the
      three About-Me subsections), Services (reiki what-it-is/session/
      training incl. BookingCTA contract + therapy summary/inquiry
      form/PT link/988 note), Modalities (four-field accordion with
      data-modality/data-field/id contracts intact), Resources
      (explainer cards; detail pages may remain as standalone routes
      or fold in — implementer's call, record it)
- [ ] About You content is deleted (about-you.md, page, nav entry,
      who-benefits map) — grep clean
- [ ] Eval contracts revised THROUGH THE PROPER PATH (devx revise /
      plan revision), not hand-hacked: E-2's 8-route+nav assertions
      and E-4's click-depth BFS must be rewritten for single-page IA
      (routes → sections/anchors); E-3 selector contracts (data-cta,
      data-cta="booking-training" phase-6b RED, data-modality,
      data-field, 988, PT link, no booking affordance in the therapy
      section) carry over against the single page
- [ ] Old routes (/about-me/, /about-you/, /offerings/*, /modalities/,
      /resources/) either removed or redirecting to anchors —
      implementer's call, record it; Pages base build stays leak-free
      and the deployed preview renders the one-pager

## Technical notes

- The one-page shape is closest to the ORIGINAL dusk mockup skeleton
  (HomeDusk.astro — anchor nav + section drift) — reuse its section
  treatment with the soft cards already in base.css.
- site.json: nav becomes anchors; owner_line and intention get the
  new copy; tagline stays for the footer/meta (footer keeps
  legal_name · tagline unless it reads odd — implementer's call).
- Coupling: rlw106 (Calendly booking wiring, blocked) and rlw113
  (therapy form wiring) target the reiki/therapy PAGES — after this
  lands they target the Services section; leave the BookingCTA +
  InquiryForm components and site.json seams exactly where rlw106/113
  expect them (data-cta / form_action contracts unchanged).
- E-5 (contrast) and E-1/E-7 (mockups) are untouched surfaces.
- Mockup routes stay intact (rlw107's production profile prunes them).
- 988 crisis note and TODO(kylie) markers must survive the fold-in.

## Status log

- 2026-07-26T21:30 — filed by /devx from Leo's instruction (Kylie:
  one-page scrollable site; renames About/Services; hero copy
  simplification). Filed-only per Leo — execution starts in a fresh
  session (`/devx rlw116`).
