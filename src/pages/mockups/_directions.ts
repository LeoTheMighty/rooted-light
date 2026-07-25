// Registry of the seven style directions. Single source for the review
// index and each mockup page's title/blurb; slugs must match both the
// route filename and the token pack basename (E-1 links by slug).
export interface Direction {
  slug: string;
  pack: string;
  title: string;
  blurb: string;
}

export const directions: Direction[] = [
  {
    slug: "botanical-editorial",
    pack: "pack-botanical-editorial",
    title: "Botanical editorial",
    blurb:
      "Serif display, generous whitespace, sage-forward. Calm, literary, unhurried.",
  },
  {
    slug: "craft-paper",
    pack: "pack-craft-paper",
    title: "Warm craft paper",
    blurb:
      "Tan and brown paper textures, humanist type, tactile cards. Handmade and grounded.",
  },
  {
    slug: "lavender-dusk",
    pack: "pack-lavender-dusk",
    title: "Soft lavender dusk",
    blurb:
      "Gentle gradient washes, soft rounded cards, floating nav. Quiet evening calm.",
  },
  {
    slug: "grounded-modern",
    pack: "pack-grounded-modern",
    title: "Grounded modern",
    blurb:
      "Strong grid, bordered earth-tone blocks, confident sans. Structured and clear.",
  },
  {
    slug: "hand-touched-organic",
    pack: "pack-hand-touched-organic",
    title: "Hand-touched organic",
    blurb:
      "Rounded pebble cards, soft blob shapes, wavy underlines. Human and warm.",
  },
  {
    slug: "quiet-minimal-light",
    pack: "pack-quiet-minimal-light",
    title: "Quiet minimal light",
    blurb:
      "Near-white, brightness-first, hairline rules, type and space only. The quietest one.",
  },
  {
    slug: "forest-deep",
    pack: "pack-forest-deep",
    title: "Forest deep",
    blurb:
      "Deep green grounding, light content wells, warm gold accent. The darker option.",
  },
];

export function direction(slug: string): Direction {
  const d = directions.find((d) => d.slug === slug);
  if (!d) throw new Error(`unknown mockup direction: ${slug}`);
  return d;
}
