// Shared home-page content for every mockup layout. All seven style
// directions render exactly this data (sourced from site.json) so the
// comparison is visual, not editorial. Copy is placeholder until rlw103.
import site from "../../content/site.json";

/** In-page anchors: the mockup package is browsed from a zip (file://),
 *  so nav never leaves the page. "Modalities" is the top-level section
 *  Leo promoted on 2026-07-25 (FR-13/FR-14) — every mockup carries it. */
export const nav = [
  { label: "Welcome", anchor: "#welcome" },
  { label: "Offerings", anchor: "#offerings" },
  { label: "Modalities", anchor: "#modalities" },
  { label: "About", anchor: "#about" },
  { label: "Resources", anchor: "#resources" },
];

export const home = {
  name: site.name,
  /** Round 4 (rlw111): Kylie's name goes right on the front page. */
  ownerLine: site.owner_line,
  tagline: site.tagline,
  intention: site.intention,
  intentionWords: site.intention_words,
  // The real booking seam (site.booking.url) is still a dead placeholder;
  // in mockups the CTA anchors to the shell's booking note so a tap gives
  // visible feedback instead of silently doing nothing.
  bookingUrl: "#booking-note",
  legalName: site.legal_name,
  offerings: [
    {
      title: "Reiki sessions",
      blurb:
        "Gentle, unhurried energy work — an hour that belongs entirely to you.",
    },
    {
      title: "Reiki training",
      blurb:
        "Small-group attunement and practice for those called to learn the work.",
    },
    {
      title: "Therapy",
      blurb:
        "Licensed talk therapy, integrated with the same rooted, caring presence.",
    },
  ],
  // Modalities per Leo's 2026-07-26 instruction (rlw111): Somatic,
  // Transpersonal, and Parts Work.
  modalities: [
    {
      title: "Somatic",
      blurb: "Body-led work — listening to what words alone can't reach.",
    },
    {
      title: "Transpersonal",
      blurb: "Therapy that makes room for spirit, meaning, and mystery.",
    },
    {
      title: "Parts Work",
      blurb: "Meeting every part of you with curiosity and care.",
    },
  ],
  about: [
    {
      title: "About Me",
      blurb: "Who I am, how I work, and the training behind the practice.",
    },
    {
      title: "About You",
      blurb: "Who this space serves — and what a first visit feels like.",
    },
  ],
  resources: [
    { title: "What is reiki?" },
    { title: "What are modalities?" },
    { title: "Types of reiki" },
  ],
};

/** Round-4 (rlw111) favorite-quote spaces: placeholder quotes that show
 *  the treatment — Kylie swaps in her own favorites later. TODO(kylie) */
export const quotes = {
  home: {
    text: "The wound is the place where the Light enters you.",
    attribution: "Rumi",
  },
  modalities: {
    text: "What is to give light must endure burning.",
    attribution: "Viktor Frankl",
  },
};

/** Round-3 (rlw110) multi-page content: the grounded variants render
 *  real pages instead of one scroll. Copy stays placeholder until
 *  rlw103; ids double as file:// anchor targets, so keep them stable —
 *  the nav dropdowns deep-link into them. */
export const pages = {
  offerings: {
    slug: "offerings",
    title: "Offerings",
    intro:
      "Three ways to work together — each one begins with the same rooted, unhurried presence.",
    items: [
      {
        id: "reiki-sessions",
        title: "Reiki sessions",
        blurb: home.offerings[0].blurb,
        meta: "About an hour · in person or at a distance",
        body: "Gentle, unhurried energy work — an hour that belongs entirely to you. We begin with a short conversation about what you're carrying, and the rest of the session is quiet, restful, and yours.",
        cta: "Book a reiki session",
      },
      {
        id: "reiki-training",
        title: "Reiki training",
        blurb: home.offerings[1].blurb,
        meta: "Small groups · offered seasonally",
        body: "Small-group attunement and practice for those called to learn the work. Training moves at a human pace: history, hands-on practice, and time to ask everything.",
        cta: "Ask about training",
      },
      {
        id: "therapy",
        title: "Therapy",
        blurb: home.offerings[2].blurb,
        meta: "Weekly or biweekly · telehealth or in person",
        body: "Licensed talk therapy, integrated with the same rooted, caring presence. Sessions are steady and relational — we go at your pace, toward what matters to you.",
        cta: "Inquire about therapy",
      },
    ],
  },
  modalities: {
    slug: "modalities",
    title: "Modalities",
    intro:
      "The ways of working that shape a session — used on their own or woven together, depending on what you need.",
    items: [
      {
        id: "somatic",
        title: "Somatic",
        body: "Body-led work — listening to what words alone can't reach. We slow down and notice what the body is holding, and let it move at its own pace.",
      },
      {
        id: "transpersonal",
        title: "Transpersonal",
        body: "Therapy that makes room for spirit, meaning, and mystery. Whatever your beliefs, the parts of life that feel bigger than words are welcome here.",
      },
      {
        id: "parts-work",
        title: "Parts Work",
        body: "Meeting every part of you with curiosity and care — even the ones that protect, resist, or carry old pain. Nothing about you is a problem to fix.",
      },
    ],
  },
  about: {
    slug: "about",
    title: "About",
    intro: "Who holds this space, and who it's for.",
    sections: [
      {
        id: "about-me",
        title: "About Me",
        body: "Who I am, how I work, and the training behind the practice. Licensed therapist, reiki practitioner and teacher — one integrated body of work.",
      },
      {
        id: "about-you",
        title: "About You",
        body: "Who this space serves — and what a first visit feels like. You don't need to arrive with the right words; feeling safe, seen, and unpressured comes first.",
      },
    ],
  },
} as const;
