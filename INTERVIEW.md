# INTERVIEW — Questions for you

<!-- devx-empty-state-start -->
> **What goes here:** decisions only the human can make. Filed by any agent
> when a product decision is ambiguous. Each item: one question + 2-3
> options + a recommendation. Mobile companion shows these in the inbox
> tab. Don't conflate with MANUAL.md — INTERVIEW = decisions, MANUAL =
> actions. This empty-state header auto-deletes once this file holds three
> or more items.
<!-- devx-empty-state-end -->


## (from /devx-init) Stack: which language for the first dev story?

Empty repo — no stack file detected. The first slice's spec needs a primary
language so language_runners + lint/test commands can be wired up.

**Options:** TypeScript / Python / Rust / Go / Flutter / other.
**Recommendation:** TypeScript (default for the first dev story unless you
say otherwise — broadest tooling, fastest iteration).

- [ ] Pick a primary language for the first dev story.

## (from /devx-init) CI: when should GitHub Actions run?

`.github/workflows/devx-ci.yml` was just scaffolded. It needs trigger filters.

**Options:**
- on PR + push to main (default, runs every change before merge)
- on push only (cheaper; PRs go through review without CI)
- on schedule + on PR (nightly + per-PR)

**Recommendation:** on PR + push to main.

- [ ] Confirm CI trigger filters.

## (from /devx-init) Browser harness — Playwright, Cypress, or none?

If the first slice has any UI, this gates Layer-1 (scripted) browser tests.
If it's pure CLI / API, pick none — devx will skip browser harness setup.

**Options:** Playwright (default) / Cypress / none.
**Recommendation:** Playwright (covers Chromium + WebKit + Firefox in one run).

- [ ] Pick a browser harness (or `none`).

## (from /devx-plan cdea58) Domain name for Rooted Light

Needed only by the deploy phase (DNS step) — not urgent, but registrars
move fast on good names.

**Options:** rootedlight.com / rootedlightllc.com / rootedlighthealing.com
/ a .co or .care variant if .com is taken.
**Recommendation:** rootedlight.com if available; otherwise ask Kylie
which variant feels right before falling back.

- [x] **ANSWERED 2026-07-26 (Leo): reuse Kylie's existing domain** — she
  already registered one through Squarespace for her current Squarespace
  site, so no new registration. Provisional: "she might change it at
  some point, but we'll do this one for now" — so nothing in the build
  should hard-code the string. Registrar ≠ host: the domain points
  wherever we tell it. Full reasoning, constraints, and the CloudFront
  knock-on:
  `_devx/workstreams/rooted-light-website/decisions/2026-07-26-domain-reuse-squarespace.md`
- [ ] Record the exact domain string (`TODO(leo)` in the decision doc) —
  nothing else is blocked on it.
- [x] **rlw107 assumption — RESOLVED 2026-07-27 (Leo): GitHub Pages,
  permanent.** "What do we need any AWS usage for?" — CloudFront
  dropped entirely; the rlw112 Pages pipeline is the production deploy.
  Squarespace keeps registration + DNS (Pages publishes real apex A
  records, so the ALIAS problem vanishes). rlw107 rescoped accordingly;
  the domain no longer gates anything.

## (from /devx rlw104) Booking provider + payment timing + form provider — decide together with the domain name above

The FR-10 comparison is done:
`_devx/workstreams/rooted-light-website/decisions/booking-provider-comparison.md`
(4 providers × fees / PayPal / friction / schedule control, verified
2026-07-25). This bundles the three open picks into one client touchpoint
with the **domain-name entry directly above** — one sit-down with Kylie
settles all four. rlw106 (booking & form wiring) is gated on this.

**1. Booking provider** (full reasoning in the doc):
- **Calendly Standard, $12/mo** — recommended. Only option with PayPal
  at booking ("Yes to PayPal?" ✓, "No to Stripe" ✓); lowest friction;
  Fridays-only trivial; group trainings included. No deposits, no
  manual approval.
- Acuity Starter, $20/mo — runner-up if deposits, booking-time intake
  forms, or approval-style booking matter.
- Square Appointments Free, $0/mo — fallback iff PayPal is dropped
  (e.g. pay-in-person chosen). No PayPal ever.
- SimplePractice — ruled out for reiki booking (Stripe-powered, no
  pay-at-booking, no online group signup); stays therapy-only.

**2. Payment timing** (same entry as "Reiki payment timing" below —
answer once): pay-at-booking / pay-in-person / deposit. Note the
interaction: pay-at-booking → Calendly; deposit → Acuity; pay-in-person
→ Square Free becomes the cheap option.

**3. Therapy-form provider**: **Web3Forms free** recommended (plain-HTML
form, $0 at 250 submissions/mo, own thank-you page, email hidden);
Formspree free as runner-up; mailto rejected (silent failures + address
scraping). Addendum section of the same doc.

- [x] **ANSWERED 2026-07-26 (Leo): Calendly** — "I think Calendly is the
  way to go." Calendly Standard ($12/mo monthly or $10/mo annual), PayPal
  collect-at-booking. Setup + wiring re-planned as rlw114 (runbook +
  manual steps) → rlw106 (site wiring, revised scope). Payment timing
  resolved by implication — see the entry below.
- [ ] Confirm form provider for the therapy inquiry form (Web3Forms
  recommended — still open; split out of rlw106 into rlw113, which
  stays gated on this answer).

## (from /devx-plan cdea58) Reiki payment timing

Affects the booking-provider choice (phase 4 comparison). Whiteboard
left it open: "People pay before/after (to book?)".

**Options:**
- Pay at booking (fewer no-shows, cleaner provider requirements)
- Pay in person / after (softer feel, matches "not transactional" tone,
  loosens provider requirements considerably)
- Deposit at booking, remainder in person

**Recommendation:** Kylie's call — phase 4's comparison will present
what each provider supports either way.

- [x] **ANSWERED 2026-07-26 (by implication): pay at booking, full
  amount, via PayPal.** Leo picked Calendly with the goal "she can get
  paid for her reiki and reiki trainings" — Calendly's only payment mode
  is full payment collected during booking (no deposits, no
  charge-later), so choosing Calendly + wanting payment settles this.
  If Kylie later prefers deposits or pay-in-person, that reopens the
  provider choice (deposit → Acuity; pay-in-person → Square Free).

## (from /devx-plan cdea58 rev 2026-07-26) Calendly event-type details — Kylie's numbers

Provider is decided (Calendly, above). Before the two event types can go
live with payment, Kylie needs to supply the numbers. The rlw114 runbook
uses `TODO(kylie)` placeholders for these; the MANUAL.md setup chain
stops at "publish event types" until they're answered. **Not blocking**
rlw114 (runbook authoring) or the account/PayPal creation steps — those
can start now.

**Needed:**
1. **Reiki session** — price ($) and duration (60 min? 90?). Buffer
   between sessions, if any.
2. **Reiki training** — price ($), duration/format (single day? multi-
   session series?), and max seats per training.
3. **Schedule** — she picks her recurring availability directly in
   Calendly (whiteboard said "typically Fridays"); min-notice and
   how far out clients may book are hers to set in the same screen.

- [ ] Kylie supplies session price/duration, training price/format/seats.

## (from /devx rlw102) Kylie's style-direction pick

The mockup package is built (7 directions behind `/mockups/`; share zip
via `npm run mockups:package` — see the MANUAL.md entry for delivery
steps). rlw105 (theme promotion) is gated on this answer.

**Options:** botanical-editorial / craft-paper / lavender-dusk /
grounded-modern / hand-touched-organic / quiet-minimal-light /
forest-deep — or a blend of two (one pack's palette + the other's type).
**Recommendation:** none — this is Kylie's call; the index asks her to
reply with a favorite or a blend of two.

- [x] **ANSWERED 2026-07-25 (Leo): direction 3 — soft lavender dusk.**
  Constraints: stay with lavender, keep it simple. Plus an IA change:
  "Modalities" becomes a top-level linkable section. A lavender
  refinement round (rlw108) follows; the FINAL variant pick is the new
  entry below. rlw105 now gates on that refinement pick.

## (from /devx rlw108) Kylie's lavender refinement pick

Round 2: simple lavender variants (all including the new top-level
Modalities section) behind /mockups/. rlw105 (theme promotion) is gated
on this answer.

- [x] **ANSWERED 2026-07-26 (Leo): Warm sand & lilac** (round-4 variant
  `sand-lilac`, token pack `pack-sand-lilac` from rlw111 — tan primary,
  lilac secondary, Didot headings / Avenir body). "Out of the mockups,
  the warm sand and lilac looks the best." Build the base site with it;
  everything except the external Calendly connections (rlw106 stays
  gated on the provider sit-down above). rlw105 unblocked.

## (from /devx-plan cdea58) Content Kylie needs to supply (tracking)

Not blocking any build phase (placeholders are marked `TODO(kylie)`),
but blocking launch polish: Experiences copy for About Me,
Education/Certifications list, photography/imagery, Psychology Today
profile URL.

- [ ] Gather Kylie's content + photos (can trickle in any time before
      phase 5).

## (from devx init) What are you building? <!-- devx:init-defaults:n1 -->

Non-interactive scaffold took a default: placeholder ("Scaffolded non-interactively — describe what this project builds (see INTERVIEW.md).").
Why it needs you: no README to derive the project description from.

- [ ] Confirm or replace this default.

## (from devx init) First slice — what's the smallest demo that matters? <!-- devx:init-defaults:n2 -->

Non-interactive scaffold took a default: placeholder ("Scaffolded non-interactively — pick the smallest demo that matters (see INTERVIEW.md).").
Why it needs you: the first slice is a product decision no repo probe can make.

- [ ] Confirm or replace this default.

## (from devx init) Who's it for? <!-- devx:init-defaults:n3 -->

Non-interactive scaffold took a default: "you propose" — devx drafted the persona panel under focus-group/.
Why it needs you: audience is a product decision; review the proposed panel.

- [ ] Confirm or replace this default.
