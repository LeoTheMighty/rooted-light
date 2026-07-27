#!/usr/bin/env node
// E-3: Offering contracts on the one-page site. Covers UC-1, UC-2,
// UC-3, CAP-2/3/4, FR-6, FR-7, FR-13.
// Reiki block (Services section): ≥1 session booking CTA
// ([data-cta="booking"]) AND ≥1 training signup CTA
// ([data-cta="booking-training"]) — Calendly splits sessions vs group
// trainings into separate event types (revised 2026-07-26 via devx
// revise cdea58) — each with an off-site href (or provider embed).
// Therapy block (scoped between the therapy marker and the Modalities
// section): form present, psychologytoday.com link present, 988 crisis
// note present, ≥1 link to the modalities anchors, ZERO booking
// affordances. Modalities section: every modality entry
// ([data-modality]) carries the 4 required fields ([data-field=...])
// and an id anchor.
// Revised 2026-07-26 (devx revise cdea58, rlw116): single-page IA —
// same selector contracts, scoped to dist/index.html section slices
// (was: offerings/reiki, offerings/therapy, modalities routes).
// --allow-placeholder: skips the external-href requirement (pre-6b use
// only) and HARD-ERRORS against a production build (no dist/mockups/).
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIST = join(ROOT, "dist");
const allowPlaceholder = process.argv.includes("--allow-placeholder");
const fail = (msg) => { console.error(`RED E-3: ${msg}`); process.exit(1); };

if (!existsSync(DIST))
  fail("no dist/ build output — site has not been built yet (run `npm run build`)");

if (allowPlaceholder && !existsSync(join(DIST, "mockups")))
  fail("--allow-placeholder used against a production build (no dist/mockups/) — the flag is dead after phase 6; run flagless");

const homeFile = existsSync(join(DIST, "index.html"))
  ? join(DIST, "index.html")
  : null;
if (!homeFile) fail("dist/ has no index.html (the one-pager is missing)");
const html = readFileSync(homeFile, "utf8");

// Section slices — the one-pager marks its blocks with data-section=.
const sliceBetween = (startMarker, endMarker, label) => {
  const start = html.indexOf(startMarker);
  if (start === -1) fail(`one-pager missing ${label} (${startMarker})`);
  const end = endMarker ? html.indexOf(endMarker, start) : html.length;
  if (end === -1) fail(`one-pager missing the section after ${label} (${endMarker}) — slice unbounded`);
  return html.slice(start, end);
};

// --- Reiki block: both CTAs, off-site hrefs. The positive assertions
// are scoped to the reiki slice (Services start → therapy marker) so a
// CTA stranded elsewhere on the page can't satisfy the contract; the
// therapy-scope assertion below separately proves no CTA leaks there.
const reikiSlice = sliceBetween(
  'data-section="services"',
  'data-section="therapy"',
  "Services section (reiki block)"
);
const ctaMatches = [...reikiSlice.matchAll(/<[^>]*data-cta="booking"[^>]*>/g)];
if (!ctaMatches.length)
  fail('reiki block has no [data-cta="booking"] element (session CTA selector contract)');
const hrefs = ctaMatches
  .map((m) => (m[0].match(/href="([^"]+)"/) || [])[1])
  .filter(Boolean);
const external = hrefs.some((h) => /^https?:\/\//.test(h));
const embed = /<iframe[^>]*(calendly|acuity|squareup|simplepractice)/i.test(reikiSlice);
if (!external && !embed) {
  if (!allowPlaceholder)
    fail(`reiki booking CTA href is not off-site (${hrefs.join(", ") || "no href"}) and no provider embed found — booking not wired (phase 6b)`);
  console.log("E-3 note: placeholder booking href tolerated (--allow-placeholder)");
}

const trainingMatches = [...reikiSlice.matchAll(/<[^>]*data-cta="booking-training"[^>]*>/g)];
if (!trainingMatches.length)
  fail('reiki block has no [data-cta="booking-training"] element — training signup not wired (phase 6b)');
const trainingHrefs = trainingMatches
  .map((m) => (m[0].match(/href="([^"]+)"/) || [])[1])
  .filter(Boolean);
const trainingExternal = trainingHrefs.some((h) => /^https?:\/\//.test(h));
if (!trainingExternal && !embed) {
  if (!allowPlaceholder)
    fail(`training signup CTA href is not off-site (${trainingHrefs.join(", ") || "no href"}) and no provider embed found — training booking not wired (phase 6b)`);
  console.log("E-3 note: placeholder training href tolerated (--allow-placeholder)");
}

// --- Therapy block: inquiry-only contract, scoped ---
const therapy = sliceBetween(
  'data-section="therapy"',
  'data-section="modalities"',
  "therapy block"
);
if (!/<form[\s>]/.test(therapy)) fail("therapy block has no <form> (inquiry form missing)");
if (!/psychologytoday\.com/.test(therapy)) fail("therapy block has no psychologytoday.com link");
// "988" alone is satisfied by the inquiry form's own footnote — the
// standalone crisis section is the contract, so require the Lifeline
// name it carries.
if (!/988/.test(therapy) || !/Crisis Lifeline/.test(therapy))
  fail("therapy block has no 988 / Suicide & Crisis Lifeline note");
// Same provider allowlist as the page-global embed check above — an
// embed inside the therapy block must never pass as inquiry-only.
if (/data-cta="booking"/.test(therapy) || /<iframe[^>]*(calendly|acuity|squareup|simplepractice)/i.test(therapy))
  fail("therapy block contains a booking affordance — contract is inquiry-only");

// --- Modalities section: four-field catalog, scoped ---
const modalitiesSection = sliceBetween(
  'data-section="modalities"',
  'data-section="resources"',
  "Modalities section"
);

// Therapy must deep-link the catalog: #modalities itself or any
// per-modality id the section actually declares.
const modalityIds = [
  ...modalitiesSection.matchAll(/<[^>]*data-modality[^>]*\sid="([^"]+)"/g),
].map((m) => m[1]);
const anchorTargets = ["modalities", ...modalityIds];
const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
if (!anchorTargets.some((id) => new RegExp(`href="[^"]*#${escapeRe(id)}"`).test(therapy)))
  fail("therapy block has no link into the modalities anchors (FR-7/FR-13)");
const modalities = modalitiesSection.split(/data-modality/g).length - 1;
if (modalities < 1)
  fail("Modalities section lists no [data-modality] entries (catalog missing, FR-13)");
const REQUIRED = ["what-it-is", "who-benefits", "resources", "certifications"];
const blocks = modalitiesSection
  .split(/(?=<[^>]*data-modality)/g)
  .filter((b) => /data-modality/.test(b));
for (const [i, b] of blocks.entries()) {
  const missing = REQUIRED.filter((f) => !b.includes(`data-field="${f}"`));
  if (missing.length)
    fail(`modality entry #${i + 1} missing field(s): ${missing.join(", ")}`);
  if (!/<[^>]*data-modality[^>]*\sid="[^"]+"/.test(b))
    fail(`modality entry #${i + 1} has no id anchor (deep-link contract, FR-13)`);
}

console.log(`E-3 PASS: reiki session CTA ${external || embed ? "live" : "placeholder-tolerated"}, training CTA ${trainingExternal || embed ? "live" : "placeholder-tolerated"}, therapy block contract clean, modalities catalog clean (${modalities} modalities)`);
