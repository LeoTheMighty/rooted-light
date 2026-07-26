// Registry of the style directions. Single source for the review index
// and each mockup page's title/blurb; slugs must match both the route
// filename and the token pack basename (E-1/E-7 link by slug).
// Round 3 (grounded mist, 2026-07-26) entries sit at the END of this
// array so rounds 1–2 keep their numbers ("number N" replies stay
// stable), but the review index displays round 3 first. Round-3
// variants all share pack-lavender-mist — the palette is picked; the
// options are navigation treatments (`nav`), and each is multi-page.
export interface Direction {
  slug: string;
  pack: string;
  title: string;
  blurb: string;
  round: 1 | 2 | 3;
  /** round-3 only: which navigation treatment the variant demonstrates */
  nav?: "classic" | "centered" | "rail" | "compact";
}

export const directions: Direction[] = [
  {
    slug: "lavender-mist",
    pack: "pack-lavender-mist",
    title: "Lavender mist",
    blurb:
      "The palest take — near-white under the faintest lavender haze, smallest type.",
    round: 2,
  },
  {
    slug: "lavender-linen",
    pack: "pack-lavender-linen",
    title: "Lavender linen",
    blurb:
      "Warm cream under the wash — the coziest temperature of the five.",
    round: 2,
  },
  {
    slug: "lavender-sage",
    pack: "pack-lavender-sage",
    title: "Lavender sage",
    blurb:
      "The wash drifts from lavender into sage — the earthy tie-in.",
    round: 2,
  },
  {
    slug: "lavender-ink",
    pack: "pack-lavender-ink",
    title: "Lavender ink",
    blurb:
      "Deep plum-ink serif type under a pale wash — the most literary.",
    round: 2,
  },
  {
    slug: "lavender-dawn",
    pack: "pack-lavender-dawn",
    title: "Lavender dawn",
    blurb:
      "Mauve-rose warmth — first light instead of dusk.",
    round: 2,
  },
  {
    slug: "botanical-editorial",
    pack: "pack-botanical-editorial",
    title: "Botanical editorial",
    blurb:
      "Serif display, generous whitespace, sage-forward. Calm, literary, unhurried.",
    round: 1,
  },
  {
    slug: "craft-paper",
    pack: "pack-craft-paper",
    title: "Warm craft paper",
    blurb:
      "Tan and brown paper textures, humanist type, tactile cards. Handmade and grounded.",
    round: 1,
  },
  {
    slug: "lavender-dusk",
    pack: "pack-lavender-dusk",
    title: "Soft lavender dusk",
    blurb:
      "Gentle gradient washes, soft rounded cards, floating nav. Quiet evening calm.",
    round: 1,
  },
  {
    slug: "grounded-modern",
    pack: "pack-grounded-modern",
    title: "Grounded modern",
    blurb:
      "Strong grid, bordered earth-tone blocks, confident sans. Structured and clear.",
    round: 1,
  },
  {
    slug: "hand-touched-organic",
    pack: "pack-hand-touched-organic",
    title: "Hand-touched organic",
    blurb:
      "Rounded pebble cards, soft blob shapes, wavy underlines. Human and warm.",
    round: 1,
  },
  {
    slug: "quiet-minimal-light",
    pack: "pack-quiet-minimal-light",
    title: "Quiet minimal light",
    blurb:
      "Near-white, brightness-first, hairline rules, type and space only. The quietest one.",
    round: 1,
  },
  {
    slug: "forest-deep",
    pack: "pack-forest-deep",
    title: "Forest deep",
    blurb:
      "Deep green grounding, light content wells, warm gold accent. The darker option.",
    round: 1,
  },
  {
    slug: "mist-classic",
    pack: "pack-lavender-mist",
    title: "Grounded classic",
    blurb:
      "Mist's type and palette, gradient gone — flat color and hairlines. A classic top bar; Modalities opens as a dropdown.",
    round: 3,
    nav: "classic",
  },
  {
    slug: "mist-centered",
    pack: "pack-lavender-mist",
    title: "Grounded centered",
    blurb:
      "Centered brand over a centered menu. Tapping Modalities unfolds it in place, gently pushing the page down.",
    round: 3,
    nav: "centered",
  },
  {
    slug: "mist-rail",
    pack: "pack-lavender-mist",
    title: "Grounded rail",
    blurb:
      "A side rail holds the whole site in one glance — modalities listed in the open, no dropdown at all.",
    round: 3,
    nav: "rail",
  },
  {
    slug: "mist-compact",
    pack: "pack-lavender-mist",
    title: "Grounded compact",
    blurb:
      "The quietest bar — one Menu button holds everything, with Modalities as its own labeled group inside.",
    round: 3,
    nav: "compact",
  },
];

export function direction(slug: string): Direction {
  const d = directions.find((d) => d.slug === slug);
  if (!d) throw new Error(`unknown mockup direction: ${slug}`);
  return d;
}
