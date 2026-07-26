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
  modalities: [
    {
      title: "Talk therapy",
      blurb: "Steady, relational work at your own pace.",
    },
    {
      title: "EMDR",
      blurb: "Structured processing for what the body still carries.",
    },
    {
      title: "Reiki-informed care",
      blurb: "Energy work woven gently into the therapeutic space.",
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
