# Booking-provider comparison — reiki sessions & trainings (FR-10)

Researched 2026-07-25 (rlw104). Pricing verified against provider-owned
pages that day unless marked otherwise (semi-verified = provider page
unfetchable or dynamic, ≥2 independent 2026 sources agree); PayPal's US
processing rate
(3.49% + $0.49 per transaction, PayPal-branded checkout) is from 2026
third-party calculators, near-verified.

**Whiteboard constraints this doc is scored against:**

- "No to Stripe" — no Stripe integration; payment lives inside the provider.
- "Yes to PayPal?" — PayPal at booking is the leading candidate, not yet confirmed.
- Kylie keeps her schedule — "typically Fridays"; tight availability control.
- Payment timing open — pay at booking vs in person vs deposit (INTERVIEW.md).
- G-4: hosting < $5/mo (provider fees are on top, and are Kylie's call).
- G-5: booking flow reachable in ≤ 3 clicks from home — embed-vs-link quality matters.
- Occasional group trainings need self-serve signup, not just 1:1 sessions.

**Quick scan** (details + sources in each section below):

| Provider | Min. viable plan | $/mo | PayPal at booking | Pay at booking | Group trainings online | Static-site embed |
|---|---|---|---|---|---|---|
| Calendly | Standard | $10 annual / $12 monthly | Yes (Standard+) | Yes (full amount) | Yes (paid plans) | Inline/popup JS widget or plain link |
| Acuity Scheduling | Starter | $16 annual / $20 monthly | Yes (all plans) | Yes (full or deposit) | Yes (all plans) | iframe or link; custom CSS = Premium only |
| SimplePractice | Essential (booking) / Plus (embed) | $79 / $99 | No (Stripe-powered cards only) | No (card stored, charged after) | No | Plus only; else link to therapy-branded portal |
| Square Appointments | Free | $0 (classes need Plus $49) | No (Square processing only) | Yes | Plus only ($49/mo) | Embed, button, or link — all free |

## Calendly

**Fit verdict: the cheapest path that satisfies "Yes to PayPal" with true
pay-at-booking and low client friction.**

### Fees

- Standard plan: **$10/mo billed annually, $12/mo billed monthly** — the
  minimum tier for payments and for more than one event type. Free tier is
  unusable here (1 event type, no payment collection, no group events).
  (calendly.com/pricing, 2026-07-25)
- Per-transaction: Calendly adds **no fee of its own**; you pay only the
  processor — PayPal's ~**3.49% + $0.49** per transaction. On a $90 session
  that's ≈ $3.63.
- Real annual cost: **$120–144/yr** + PayPal's cut.

### PayPal support

- **Native PayPal collect-at-booking on Standard and above** — the invitee
  pays during the booking flow, before the slot confirms. Requires a PayPal
  Business account. Clients can pay by PayPal wallet, Venmo (US), or
  card via PayPal. (calendly.com/help/calendly-paypal)
- Caveats: refunds are manual (done in PayPal), no promo codes with PayPal
  (Stripe-only feature), no deposit/partial-payment option — full price at
  booking only.

### Client friction

- Lowest friction of the four: pick date → pick time → details + pay on the
  same form → confirmed. **3–4 screens, no client account ever**, payment is
  part of the booking form rather than a separate checkout. Widely regarded
  as the best-in-class booking client experience; responsive on mobile.

### Schedule control

- Recurring weekly schedules per event type — a "Fridays only" availability
  schedule is directly supported, plus date overrides, buffers, min-notice,
  date-range limits, and per-day booking caps. All on every plan.
- **No manual confirmation** — bookings auto-confirm; Calendly explicitly
  does not support approve-before-accept. If Kylie wants to vet each
  booking, this is Calendly's one real gap.
- Group events (one host, N seats per slot) supported on paid plans —
  covers trainings, with a seat cap per session.

### Embed vs link on a static site

- Three embed modes (inline, popup text link, floating popup widget), all
  plans, via a copy-paste JS snippet — works fine in static Astro. Colors
  and detail-hiding configurable. Plain link-out to the hosted page needs
  zero JS and also satisfies G-5's ≤ 3 clicks.

### Notes

- Reminders (email/SMS workflows) are on paid plans; SMS costs extra.
- No card-on-file / no-show-fee tooling — but with full pay-at-booking,
  no-shows are already paid.
- No intake forms beyond custom booking questions — fine for reiki; therapy
  intake stays in SimplePractice anyway (PRD non-goal).

## Acuity Scheduling

**Fit verdict: strongest appointment-business feature set with PayPal on
every plan; costs more than Calendly and the embed is less polished.**

### Fees

- Starter plan: **$16/mo billed annually, $20/mo billed monthly** — bottom
  tier already includes payments (Stripe, Square, **PayPal**), custom
  intake forms, and classes/workshops. No free tier — 7-day trial only.
  (acuityscheduling.com/pricing, 2026-07-25)
- SMS reminders, packages/memberships, gift certificates need Standard
  (**$27 annual / $34 monthly**).
- Per-transaction: Acuity adds **no fee of its own**; PayPal's ~3.49% +
  $0.49 applies. Real annual cost: **$192–240/yr** + PayPal's cut.

### PayPal support

- **PayPal collect-at-booking on every plan.** Connections created since
  April 2026 complete payment in a pop-up on the scheduler (older ones
  redirect to paypal.com and back).
- Caveats: **no card vaulting with PayPal** — charge-later features
  (no-show fees, pay-after-booking) are Stripe/Square-only. **Deposits at
  booking are supported**, which Calendly can't do — relevant if Kylie
  picks the deposit option for payment timing.

### Client friction

- Slightly more friction than Calendly: appointment type → date/time →
  details + intake form → PayPal pop-up → confirmed. ~4 screens; client
  accounts are optional (off by default). The scheduler UI is denser and
  more utilitarian than Calendly's.

### Schedule control

- Repeating weekly hours (Fridays-only), **per-appointment-type
  availability**, min-notice ("at least X hours ahead"), max-horizon,
  cancel/reschedule cutoffs, per-type padding. The most granular
  scheduling control of the four.
- Manual confirmation exists only as a documented two-appointment-type
  workaround (public "request" type → you approve by converting) — not a
  native toggle.
- Classes/workshops with per-slot seat counts are native on all plans —
  the richest group-training model here (class series, per-class intake).

### Embed vs link on a static site

- Embeds as an **iframe**, so the site's CSS can't style it; the custom-CSS
  panel and API are Premium-only ($49–61/mo). Plain link-out works on all
  plans. Functional but the least attractive embed story of the paid
  options.

### Notes

- Custom intake forms on every plan — useful for reiki consent/intake
  questions at booking, which Calendly only approximates.
- HIPAA BAA exists on Premium — irrelevant here (therapy stays in
  SimplePractice), but notable given the dual practice.
- Owned by Squarespace; appointment-business-focused and stable.

## SimplePractice

**Fit verdict: not viable for the reiki booking path — its payments are
Stripe under the hood, there is no pay-at-booking, and group trainings
can't be booked online. Keep it for therapy back-office only.**

### Fees

- She already pays for it, but online appointment requests require
  **Essential ($79/mo)**; embedding the request widget on an external site
  requires **Plus ($99/mo)** (semi-verified — SimplePractice's own
  plan-comparison page blocked fetching; multiple 2026 secondary sources
  agree). Marginal cost is $0 only if she's already on Essential+.
- Payment processing: **3.15% + $0.30** per transaction, cards only.

### PayPal support

- **None.** The integrated payment system is card-only and is
  **powered by Stripe** — SimplePractice is a published Stripe partner. If
  "No to Stripe" means no Stripe-processed payments, SimplePractice's
  payments violate it outright; PayPal would be an off-platform manual
  workaround with no automation.

### Client friction

- Highest friction of the four, by design (it's a clinical intake
  pipeline, not a storefront): booking is a **request**, not a confirmed
  slot — new client picks a time, gets held on the Inquiries page until
  Kylie manually approves, then receives a Client Portal welcome email
  with passwordless login, and **payment happens after the session**
  (AutoPay/manual charge). No true pay-at-booking exists. For a casual
  reiki client this flow is heavy and slow.

### Schedule control

- Genuinely good: weekly availability blocks (Fridays-only trivial),
  **per-service availability** ("Reiki, Fridays 10–4" while therapy keeps
  its own windows), mandatory manual approval of every online request,
  per-weekday booking caps.
- **Group classes cannot be booked online at all** — group appointments
  exist but must be scheduled by the practitioner; no self-serve workshop
  signup, no pay-to-register. Hard blocker for trainings.

### Embed vs link on a static site

- Embed widget is Plus-only ($99/mo). Otherwise link-out to the hosted
  Client Portal page at `{practice}.clientsecure.me` — which carries **the
  therapy practice's branding**, one brand per account.

### Notes — SimplePractice adjacency

- The adjacency question ("can her existing tool cover reiki too?") has a
  technical yes but a practical no: reiki clients would become records in
  the same clinical EHR, on the therapy brand's portal, through a
  request-and-approve flow with post-session card billing. That's the
  opposite of the light, "not transactional but warm" reiki booking the
  site wants, and it entangles a non-clinical wellness service with her
  therapy records. The PRD already scopes SimplePractice to therapy
  intake/paperwork (non-goals) — this research confirms keeping it there.

## Square Appointments

**Fit verdict: the best free tier by far and true pay-at-booking — but no
PayPal, ever. The fallback if PayPal turns out to be optional.**

### Fees

- **Free plan: $0/mo**, solo, unlimited bookings, online booking site +
  embed, prepayment/no-show protection, reminders. **Class bookings
  (group trainings) require Plus at $49/mo** (semi-verified — Square's
  pricing page renders prices dynamically; two independent 2026 sources
  agree). Plans are month-to-month, so Plus could in principle be switched
  on only for training months.
- Processing (Square's own, verified on squareup.com): **online 3.3% +
  $0.30** on Free (2.9% + $0.30 on Plus); in-person 2.6% + $0.15.

### PayPal support

- **None, explicitly and permanently** — Square is a closed processor;
  its own help docs state customers cannot pay for Appointments with
  PayPal, and staff have said there are no plans to add it. Booking
  payments: cards, Apple Pay, Google Pay, Cash App Pay, Afterpay.
- Honest read on the whiteboard: Square is *not* Stripe — a different
  processor — so "No to Stripe" is technically satisfied. But if the
  underlying intent is "PayPal specifically," Square fails it the same
  way Stripe would.

### Client friction

- Low: service → Friday slot → name/email/phone → pay (card/Apple
  Pay/Google Pay) → confirmed, in one sitting, no client account.
  Comparable to Calendly; genuinely good mobile flow.

### Schedule control

- Bookable hours per staff member — Fridays-only supported. Per-service
  online-bookability, duration, buffer, price. A global (not per-service)
  accept/decline mode exists if she wants manual approval. One noted gap:
  availability windows are per-staff, not per-service — moot for a
  reiki-only account.
- Classes (Plus): recurring group sessions with seat caps and waitlists;
  one known wart — each attendee books individually, one seat per
  transaction.

### Embed vs link on a static site

- All free: embed code for the full booking flow, a customizable "Book
  Now" button, or a hosted booking-site link. Works in static Astro with
  a script embed and no backend. Minimal Square branding on hosted pages.

### Notes

- A separate Square account keeps reiki fully outside the therapy EHR —
  clean brand and data separation, which is exactly the structure the PRD
  wants (SimplePractice = therapy, something else = reiki).
- If Kylie chose pay-in-person, Square Free still works as a pure
  scheduler at $0/mo — the cheapest full-featured option in that world.

## Recommendation

**Primary: Calendly Standard — $12/mo (or $120/yr) + PayPal's ~3.49% +
$0.49 per transaction — with payment collected at booking via PayPal.**

Reasoning against the whiteboard: it is the only seed provider that
satisfies "Yes to PayPal?" with real pay-at-booking at the lowest price;
its client friction is the lowest (3–4 screens, no account, pay on the
booking form — matching the ≤ 3-clicks goal G-5); "typically Fridays" is a
first-class availability schedule; group trainings work as seat-capped
group events on the same plan; and both an inline embed and a plain
link-out drop into the static Astro site without a backend.

**Runner-up: Acuity Scheduling Starter — $20/mo (or $192/yr).** Choose it
over Calendly if any of these matter enough to pay ~$6–8/mo more: deposits
at booking (Calendly can't), intake forms attached to booking, a richer
class model for trainings, or the manual-confirmation workaround (Calendly
has no approval flow at all).

**Fallback: Square Appointments Free — $0/mo — iff PayPal is dropped.**
If Kylie answers the payment-timing question with "pay in person" or is
indifferent to PayPal, Square's free tier does confirmed bookings,
prepayment, reminders, and embeds at zero monthly cost (trainings would
need Plus at $49/mo in training months, or be handled with payment links).

**Ruled out for booking: SimplePractice.** Its payments are Stripe-powered
(fails "No to Stripe"), there is no pay-at-booking, group trainings have
no online signup, and reiki clients would be pulled into the therapy
EHR/brand. It stays exactly where the PRD put it: therapy intake,
paperwork, and back-office.

Costs restated for G-4: hosting stays < $5/mo regardless of this choice;
the provider subscription ($0–20/mo) and processor cut (~2.9–3.5% + ~$0.30–0.49
per paid booking, depending on provider and plan) are Kylie's call and are surfaced in INTERVIEW.md
alongside payment timing.

Decision owner: Kylie (with Leo) — filed in INTERVIEW.md bundled with the
domain-name decision so both land in one client touchpoint. rlw106 (booking
& form wiring) is gated on that entry being resolved.

## Addendum: Form provider (therapy inquiry form)

Same axes, smaller stakes — the therapy page needs a static-site-friendly
inquiry form (name, email, message) that reliably reaches Kylie's email
(CAP-3). Candidates: Formspree, Web3Forms, mailto.

| | Formspree Free | Web3Forms Free | mailto |
|---|---|---|---|
| Cost / limit | $0 / 50 subs/mo (then $15/mo) | $0 / 250 subs/mo | $0 / none |
| Own thanks page without JS | No (paid; free needs a JS fetch) | Yes — free same-domain redirect | n/a |
| Spam protection | Basic + reCAPTCHA + honeypot | Server-side + hCaptcha + honeypot | none |
| Storage of inquiries | 30 days, AWS US, SOC 2 + GDPR/SCCs | 30 days (privacy policy; docs FAQ outdated), AWS US | none — direct email |
| Email hidden from scrapers | Yes | Yes | **No — harvested from source** |

**Recommendation: Web3Forms free tier.** Plain HTML `<form>` POST (zero
JS), a free same-domain redirect to our own thank-you page, 250
submissions/month (a solo practice will never hit it — cost stays $0,
inside G-4), and Kylie's email never appears in the page source.
Runner-up: Formspree free if we later prefer the more established vendor
(SOC 2, dashboard recovery) and accept 50/mo + a JS submit to stay
on-site. **Rejected: mailto** — silent failure on devices with no mail
client configured (a lost prospective therapy client, invisibly), address
harvesting by spam bots, and the highest-friction flow at exactly the
anxious first-contact moment the form exists to soften.

Privacy note for the choice: neither vendor offers a HIPAA BAA. A
pre-client inquiry form is ordinarily outside HIPAA scope, but keep the
form minimal (name, email, message — no symptom/history prompts) so
nothing clinical transits or is retained by a third party; submissions
auto-delete after 30 days on both.
