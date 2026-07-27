# Calendly setup runbook — Rooted Light booking

Click-by-click guide for standing up the Calendly + PayPal booking stack
(decided in INTERVIEW.md "Booking provider" → **Calendly Standard,
PayPal collect-at-booking, link-out**). Written for Leo/Kylie executing
the MANUAL.md "Calendly connection chain" — each chain step points at a
section here.

UI labels below were verified against Calendly's and PayPal's own help
docs on **2026-07-26**. Menus drift; if a label doesn't match, look for
the nearest equivalent before assuming the flow changed. Pricing and
provider-caveat research lives in
[`_devx/workstreams/rooted-light-website/decisions/booking-provider-comparison.md`](../_devx/workstreams/rooted-light-website/decisions/booking-provider-comparison.md)
— this runbook doesn't restate it.

**Order matters.** Do §2 (PayPal Business) first or in parallel with §1
— identity verification is the long pole and can take days. §3 needs
both. §4–§5 need §3 plus Kylie's numbers (INTERVIEW.md "Calendly
event-type details — Kylie's numbers"). §6 is Kylie's, anytime after §1.
§7 closes the loop and unblocks the site wiring (rlw106).

**The four caveats to keep in mind throughout** (from the comparison
doc; they shape §4–§7):

> - **Full payment only — no deposits.** Calendly has no
>   deposit/partial-payment option; the client pays the entire price at
>   booking.
> - **Refunds are manual, in PayPal.** Calendly never moves money back —
>   cancelling a booking does NOT refund it; you refund from the PayPal
>   Business account yourself.
> - **No promo codes with PayPal.** Discount/coupon codes are a
>   Stripe-only Calendly feature.
> - **Bookings auto-confirm — no approval step.** Calendly does not
>   support approve-before-accept; a paid booking is instantly
>   confirmed on Kylie's calendar.

---

## §1. Calendly account on the Standard plan

MANUAL.md chain step 2.

1. Go to <https://calendly.com/signup> and sign up **with Kylie's
   email** (the account is hers; Leo can be added later if ever
   needed). Signing up with Google is fine if that's her email
   provider — it also pre-wires the calendar connection §6 relies on.
2. During onboarding Calendly asks to connect a calendar (Google
   Calendar / Outlook). **Connect her personal calendar** — this is
   how Calendly blocks times she's already busy so double-bookings
   can't happen.
3. New accounts typically start on a trial of a paid tier. Regardless,
   open the account menu → **Billing** and subscribe to **Standard**:
   - **$10/seat/mo billed annually** (recommended — $120/yr) or
     **$12/seat/mo billed monthly**.
   - 1 seat is enough.
4. Why Standard and not Free: the Free tier allows only one event type,
   no payment collection, and no group events — all three are needed
   here (see the comparison doc for the full matrix).

**Done when:** the Billing page shows an active Standard subscription
under Kylie's account.

## §2. PayPal Business account for Kylie

MANUAL.md chain step 1 — **start this first**; PayPal's identity
verification (CIP) can take days, and §3 can't happen without it.
Calendly's PayPal integration requires a **Business** account —
a personal PayPal cannot connect.

Two paths — pick one:

**Path A — upgrade her existing personal PayPal (keeps history):**

1. Log in at <https://www.paypal.com> → **Settings** (gear icon) →
   Account options → **Upgrade to a Business Account**.
2. Note: a Business account generally **can't be downgraded** back to
   personal. If she wants to keep a personal PayPal too, use Path B
   instead (one personal + one business account is allowed; each needs
   its own email address).

**Path B — fresh Business account:**

1. Go to <https://www.paypal.com/us/business/open-business-account> →
   **Open a Business Account** (free).
2. Use an email Kylie controls that is NOT already on a PayPal account.

**Either path — have ready:**

- Her **legal name and date of birth**.
- **SSN** (or EIN if she has one for the practice) — required for
  identity verification and IRS reporting.
- Business type: sole proprietorship is the simplest fit unless she has
  an LLC; business name can be her own name or "Rooted Light".
- Business address + phone (home address is fine for a home-based
  practice).
- **Bank account** (routing + account number) to receive payouts.
  PayPal verifies it with two micro-deposits (< $1 each) that she
  confirms in the PayPal dashboard — this is part of what takes days.

3. Complete every item PayPal lists under its account-setup
   notifications: verify email, verify phone, link + confirm the bank
   account, and finish the **Customer Identification Process (CIP)**
   prompts. Until CIP is done, PayPal can hold or limit incoming money.

**Done when:** the account shows as a verified Business account with a
confirmed bank link — she can log in and see the Business dashboard
with no outstanding "complete your setup" banners.

## §3. Connect PayPal to Calendly

MANUAL.md chain step 3. Needs §1 + §2 complete.

1. In Calendly, open the **Integrations & apps** page.
2. Find **PayPal** (search or under the payments category) and select
   it.
3. Select **Connect your account** and log in **with the Business
   account from §2** when PayPal's window appears. Approve the
   permissions it requests.
4. Back in Calendly, the PayPal integration page should now show the
   connected account.

Notes:

- Plan check: PayPal collection is available on **Standard and above**
  — if the connect option is missing, re-verify §1 step 3.
- Supported currencies: USD, CAD, AUD, EUR, GBP. Use **USD**.
- Disconnecting PayPal later silently turns off payment on every event
  type that used it — don't disconnect casually.

**Done when:** Integrations & apps → PayPal shows the connected
Business account.

## §4. Event type: "Reiki Session" (1:1)

MANUAL.md chain step 5 (first half). Needs §3, plus Kylie's numbers —
fill every `TODO(kylie)` from the INTERVIEW.md entry **"Calendly
event-type details — Kylie's numbers"** before publishing. Everything
except those fields can be set up now.

1. Go to the **Scheduling** page → **+ Create** → choose
   **One-on-One**.
2. **Event name:** `Reiki Session`.
3. **Duration:** `TODO(kylie)` — 60 or 90 min (INTERVIEW.md item 1).
4. **Location:** In-person meeting — enter the practice address (or
   "Address provided upon confirmation" if she prefers not to publish
   it).
5. **Availability:** attach the schedule built in §6 (it can be
   attached after §6 if doing this first — come back).
6. Select **More options** to reach the full editor, then:
   - **Buffers:** `TODO(kylie)` — time to hold before/after each
     session, if any (INTERVIEW.md item 1).
   - **Minimum notice / date range:** Kylie's call — covered in §6
     step 5.
   - Expand the **Payment** section → select **Accept payments with
     PayPal** → amount: `TODO(kylie)` session price (INTERVIEW.md
     item 1), currency **USD**.
   - In the payment terms/description box, state the policy plainly —
     suggested copy (edit to taste): *"Payment in full reserves your
     session. Need to cancel or reschedule? Reply to your confirmation
     email at least 24 hours ahead and we'll refund or rebook you."*
     (Remember: refunds are manual in PayPal — whatever is promised
     here, Kylie executes by hand, §7.)
7. **Save changes.** The event auto-confirms every paid booking — there
   is no approval step, so only publish once the price/duration are
   real.

**Done when:** the event type exists, shows the PayPal badge/price in
its card on the Scheduling page, and every `TODO(kylie)` above is
resolved.

## §5. Event type: "Reiki Training" (group, seat-capped)

MANUAL.md chain step 5 (second half). Group event types are available
on all paid plans; same prerequisites as §4.

1. **Scheduling** page → **+ Create** → choose **Group** (one host,
   multiple invitees per slot — this is what gives trainings a seat
   cap).
2. **Event name:** `Reiki Training`.
3. **Duration/format:** `TODO(kylie)` — single day vs multi-session
   series (INTERVIEW.md item 2). Note: one Calendly group event = one
   bookable block; a multi-week series is best modeled as either one
   long block per cohort or a separate event per session — decide with
   her answer.
4. **Location:** in-person, as §4.
5. In the editor, expand **Invitee limit**:
   - Enter max seats: `TODO(kylie)` (INTERVIEW.md item 2; Calendly
     allows 2–9,999).
   - Check **Display remaining spots** so prospective students see
     seats counting down — gentle urgency, zero effort.
   - Caveat: the limit applies per time slot, and raising it later only
     affects *future* bookings; an already-scheduled training's cap is
     edited from the **Meetings** page → that meeting → **Edit invitee
     limit**.
6. **More options** → expand **Payment** → **Accept payments with
   PayPal** → amount: `TODO(kylie)` training price per seat
   (INTERVIEW.md item 2), currency **USD**. Each student pays for
   their own seat at booking.
7. Payment terms box: same idea as §4 — trainings may deserve a longer
   cancellation window (e.g. 72 hours) since seats are scarce;
   `TODO(kylie)`.
8. **Save changes.**

**Done when:** the group event exists with a real seat cap, per-seat
price, and remaining-spots display on.

## §6. Kylie's availability

MANUAL.md chain step 6. Entirely hers, changeable anytime in Calendly
without touching the site. Can be done any time after §1.

1. Go to the **Availability** page (left nav) and open the default
   schedule (**Working hours**), or **+ New schedule** to make a
   dedicated "Reiki" schedule — recommended, so reiki hours never
   collide with anything else her calendar does.
2. In **List view**, select **+** next to the day(s) she wants —
   typically **Friday** — and set the time block(s), e.g.
   `10:00am – 4:00pm`. Add a second block with **+** if she wants a
   lunch gap; remove blocks with **x**. Leave all other days empty.
3. **Date-specific hours** (same page): use **+ Hours** to open or
   close specific dates — a vacation Friday, a one-off Saturday
   training — without changing the weekly pattern.
4. Attach the schedule to both event types: in each event type's
   **Availability** section, pick the "Reiki" schedule.
5. Per event type (in the event editor), set the booking-window rules —
   all hers, all revisable:
   - **Date range:** how far into the future clients can book
     (suggested start: 60 days).
   - **Minimum notice:** how close to a slot someone can grab it
     (suggested start: 24 hours — protects her from morning-of
     surprises; remember bookings auto-confirm).
   - **Buffers:** breathing room before/after sessions (§4 step 6).
6. Sanity-check: her connected calendar (§1 step 2) blocks busy times
   automatically — put a fake event on a Friday and confirm the slot
   disappears from the booking page.

**Done when:** the booking pages show only the slots she actually
wants, and a test calendar conflict correctly hides its slot.

## §7. Scoping, link capture, and the paid end-to-end test

MANUAL.md chain steps 7–8. The last mile — this is what hands rlw106
(site wiring) its two URLs.

### Scoping — only these two events are public

Therapy is **never** bookable through this account (PRD non-goal;
therapy stays in SimplePractice). Two rules:

1. Don't create any other event types. If Calendly's onboarding
   auto-created samples (15/30/60-minute meetings), **delete or turn
   them off**: Scheduling page → each sample's **⋮** (three dots) menu
   → delete, or toggle the event off.
2. The site links directly to each event type (link-out decision — no
   embed), so the shared landing page barely matters — but keep it
   clean anyway: anything Kylie wants bookable-by-link-only can be
   marked **Make this a secret event** in its editor (hides it from
   the landing page; the direct link still works).

### Capture the two links

1. On the **Scheduling** page, open the **⋮** menu on **Reiki
   Session** → copy the event link (`https://calendly.com/<account>/<event>`).
2. Repeat for **Reiki Training**.
3. Deliver both per MANUAL.md chain step 7: paste into a reply on the
   chain, or straight into `src/content/site.json` →
   `booking.url` (session) and `booking.training_url` (training).
   **This unblocks rlw106.**

### Paid end-to-end test — copy-paste checklist

Run **after** rlw106 merges (the links are live on the site). This is
real money moving — that's the point; a sandbox proves nothing about
Kylie's actual PayPal. Consumed by rlw106's human AC — log the result
as a status-log line in `dev/dev-rlw106-2026-07-25T09:19-booking-form-wiring.md`.

Session flow:

- [ ] From the **live site** (not Calendly directly), click through to
      book a Reiki Session — use a real email you control that is NOT
      Kylie's.
- [ ] Pay the full price via PayPal (wallet or card — try card, since
      most clients won't have PayPal).
- [ ] Confirm the booking auto-confirmed: confirmation email received
      + event on Kylie's calendar.
- [ ] Confirm the money: PayPal Business dashboard shows the payment
      (minus PayPal's ~3.49% + $0.49 fee).
- [ ] Cancel the booking via the confirmation email's cancel link.
- [ ] Confirm cancelling did **not** refund automatically — then issue
      the refund manually: PayPal Business → Activity → the payment →
      **Refund**.
- [ ] Confirm the refund lands back on the test payment method.

Training flow:

- [ ] Repeat all seven steps for one **Reiki Training** seat, and
      additionally confirm the remaining-seats count decremented after
      booking and restored after the cancellation.

Wrap-up:

- [ ] Log both results (booked / paid / funds seen / refunded, with
      dates) in the rlw106 spec status log.
- [ ] Check MANUAL.md chain step 8 done.

**Done when:** both checklists pass and the results are logged. The
booking stack is live end-to-end.
