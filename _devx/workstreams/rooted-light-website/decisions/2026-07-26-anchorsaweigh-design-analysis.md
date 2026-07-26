# Design analysis: anchorsaweighcounseling.com (Kylie's reference site)

- **Context:** Kylie's round-3 feedback (relayed by Leo, 2026-07-26): "I
  like this example a lot… but for me I see more tan and lilac on my
  site." — https://www.anchorsaweighcounseling.com/
- **Filed by:** rlw111 (tan & lilac decision round). The round-4 token
  packs cite this doc; the "How round 4 uses this" section at the bottom
  maps each takeaway to a pack.
- **Method:** values extracted from the live site's generated
  Squarespace `site.css` (the sitewide 5-slot HSL theme palette) and
  rendered HTML — not eyeballed.

**Important finding up front:** there is **no lilac anywhere in this
site's actual palette**. The palette is terracotta-tan + warm cream +
deep teal-green. The "lilac" Kylie sees is her own preference layered
onto this site's *structure*. That is useful: the thing to borrow is the
**composition system** (how a warm neutral, a saturated warm accent, and
a dark grounding color alternate in full-width bands), substituting
lilac into one of those three roles.

## Palette (exact values)

Squarespace 7.1 five-slot palette (from `--*-hsl` variables in site.css):

| Hex | Slot | Role on the site | Tan/lilac analog |
|---|---|---|---|
| `#D4967D` | accent | **Primary buttons** (filled), link/heading accents | The warm **terracotta/clay tan** accent |
| `#DCD9D0` | lightAccent | **Cream band** backgrounds, footer | The pale **tan/greige** light neutral |
| `#FFFFFF` | white | "white" section backgrounds, button text | Base white |
| `#3F4A49` | black | Body/heading text; **hero + dark section** background | The dark grounding color (→ deep plum/aubergine in a lilac scheme) |
| `#495A58` | darkAccent | "dark" section backgrounds (services, final CTA) | Slightly lighter sibling of the dark |

Ratio/roles across the homepage: roughly **white/cream ~50%**
(alternating bands), **dark teal ~40%** (hero, services, closing CTA),
**terracotta <10%** — reserved almost exclusively for buttons and small
accents. The accent is scarce, which is why it reads confident rather
than loud. The two darks are only ~5% apart in lightness — two
*near-twin* darks give subtle band-to-band variation.

Buttons: primary = solid `#D4967D` fill, white text, **square** shape.
Footer = cream with dark text.

## Typography

- **Headings: "adonis-web"** (Adonis, Adobe Fonts) — elegant, light,
  high-contrast **serif**, weight 400, line-height 1em, **uppercase on
  all headings**. h1 4.7rem, h2 4.6rem, h3 2.8rem, h4 1.6rem. The huge
  thin uppercase serif is the site's single strongest identity move.
- **Body & meta: "Pontano Sans"** (Google Fonts) — soft, rounded,
  humanist sans, weight 400, line-height 1.5.
- **Buttons: Pontano Sans**, uppercase, letter-spacing .1em, generous
  padding — quiet, label-like.
- No third font. The contrast is purely serif-display vs sans-body.

## Composition / layout

- **Band system:** full-width edge-to-edge color bands alternating
  dark/light. Homepage order: dark hero ("Welcome." + moody dark nature
  photo) → cream "Our approach" (terracotta buttons) → white "Take the
  first steps" + newsletter → dark services band (4 cards, white
  line-art icons) → **cream testimonial quote band** → white Resources →
  dark closing CTA → cream footer.
- **Hero:** dark section, near-white logo, single-word giant uppercase
  serif headline, short intro. **No therapist name or face on the
  homepage** — the portrait lives on /about-us ("Meet Nicky").
  (Rooted Light diverges here deliberately: Leo asked for Kylie Fustini
  right on the front page.)
- **Nav:** solid header, logo left, links right, plus a filled
  terracotta **"schedule now"** button persistent in the nav, repeated
  ~3 more times down the page.
- **Imagery:** one moody hero photo, a small anchor-chain motif divider,
  white line-art service icons. Sparse — color bands do the visual work.
- Subpages are short — 2–3 bands each, same alternation.

## Quotes

One **testimonial pull-quote band** on the homepage, and it's a strong
pattern: a full cream section whose only content is the quote set as an
*italic* h3 in the display serif (~2.8rem), followed by a small
attribution line ("— Anchors Aweigh Client | WILD WOMAN CAMPING
RETREAT"). No card, no border, no photo — **the quote is the section.**
This maps directly to Kylie's favorite-quote spaces.

## Takeaways for a tan+lilac Rooted Light

1. Borrow the **three-role band system, not the colors**: light warm
   neutral + one saturated accent + one deep grounding dark, ~50/40/10.
   For tan+lilac: tan can play the neutral role with lilac as accent, or
   the inverse — that IS the primary-vs-secondary decision.
2. **Variant "lilac as accent"** (closest to the reference): cream/tan
   bands + deep aubergine (~`#4A4155`) as the dark, mid lilac doing what
   terracotta does there — buttons and small accents only.
3. **Variant "tan as accent"**: soft lilac-grey bands as the neutral,
   with a clay tan (the `#D4967D` family, deepened for AA) as the
   button/accent color.
4. **Two near-twin darks** (e.g. `#453D50` / `#514960`) so consecutive
   sections vary subtly.
5. **Typography recipe:** big thin uppercase serif headings (Adonis;
   device-font stand-ins: Didot, Bodoni 72) over a soft rounded sans
   body; uppercase letterspaced sans button labels.
6. **Square solid buttons, accent fill, used sparingly** — accent
   appearing only on interactive elements makes a two-color scheme feel
   intentional.
7. **Steal the quote band verbatim:** full-width secondary-color
   section, italic display-serif quote, em-dash attribution, nothing
   else in the section.
8. Persistent booking CTA in the nav + a closing CTA band is the proven
   solo-therapist rhythm (Rooted Light's offerings-first CTA decision
   from rlw110 still leads; worth revisiting at rlw103/rlw105).

## How round 4 uses this

| Mockup | Makeup | What it tests from this analysis |
|---|---|---|
| 17 Warm sand & lilac (`pack-sand-lilac`) | Tan primary | Takeaway 2 with Didot — the Adonis stand-in — and the aubergine heading dark |
| 18 Almond veil (`pack-almond-veil`) | Tan primary | Takeaway 2 at a deeper tan temperature, #13's Optima kept |
| 19 Lilac field (`pack-lilac-field`) | Lilac primary | The inverse composition: lilac as base neutral, tan as the quote-band voice |
| 20 Mauve & clay (`pack-mauve-clay`) | Lilac primary | Takeaway 3 — the deepened terracotta accent against lilac-grey bands |
| 21 Linen bloom (`pack-linen-bloom`) | Neutral base | Takeaway 1's 50/40/10 rhythm with tan and lilac sharing the band roles |
| 22 Porcelain & lilac (`pack-porcelain-lilac`) | Neutral base | The quietest reading — both families as whispers over porcelain |

Every round-4 page carries the italic-serif quote band (takeaway 7) and
a decision sheet stating its exact hexes and font names, so the round
closes with three concrete picks: fonts, shades, and makeup.
