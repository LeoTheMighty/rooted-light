#!/usr/bin/env node
// E-3: Offering-page contracts. Covers UC-1, UC-2, UC-3, CAP-2/3/4,
// FR-6, FR-7, FR-13.
// Reiki page: ≥1 session booking CTA ([data-cta="booking"]) AND ≥1
// training signup CTA ([data-cta="booking-training"]) — Calendly splits
// sessions vs group trainings into separate event types (revised
// 2026-07-26 via devx revise cdea58) — each with an off-site href
// (or provider embed). Therapy page: form present, psychologytoday.com
// link present, ≥1 link to /modalities/, ZERO booking affordances.
// Modalities page (top-level, revised 2026-07-25 via devx revise
// cdea58): every modality entry ([data-modality]) carries the 4
// required fields ([data-field=...]) and an id anchor.
// --allow-placeholder: skips the external-href requirement (phase 3 use
// only) and HARD-ERRORS against a production build (no dist/mockups/).
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIST = join(ROOT, "dist");
const allowPlaceholder = process.argv.includes("--allow-placeholder");
const fail = (msg) => { console.error(`RED E-3: ${msg}`); process.exit(1); };

if (!existsSync(DIST))
  fail("no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phases 3/6 not landed)");

if (allowPlaceholder && !existsSync(join(DIST, "mockups")))
  fail("--allow-placeholder used against a production build (no dist/mockups/) — the flag is dead after phase 6; run flagless");

const page = (route) => {
  const asDir = join(DIST, route, "index.html");
  const asFile = join(DIST, `${route}.html`);
  if (existsSync(asDir)) return readFileSync(asDir, "utf8");
  if (existsSync(asFile)) return readFileSync(asFile, "utf8");
  fail(`route /${route} missing from dist/ (feature missing: phase 3 not landed)`);
};

// --- Reiki page ---
const reiki = page("offerings/reiki");
const ctaMatches = [...reiki.matchAll(/<[^>]*data-cta="booking"[^>]*>/g)];
if (!ctaMatches.length)
  fail('reiki page has no [data-cta="booking"] element (selector contract, plan.md T3.3)');
const hrefs = ctaMatches
  .map((m) => (m[0].match(/href="([^"]+)"/) || [])[1])
  .filter(Boolean);
const external = hrefs.some((h) => /^https?:\/\//.test(h));
const embed = /<iframe[^>]*(calendly|acuity|squareup|simplepractice)/i.test(reiki);
if (!external && !embed) {
  if (!allowPlaceholder)
    fail(`reiki booking CTA href is not off-site (${hrefs.join(", ") || "no href"}) and no provider embed found — booking not wired (phase 6b)`);
  console.log("E-3 note: placeholder booking href tolerated (--allow-placeholder)");
}

// Training signup CTA (revised 2026-07-26: Calendly separates the
// Reiki Training group event type — UC-2 requires an online signup path).
const trainingMatches = [...reiki.matchAll(/<[^>]*data-cta="booking-training"[^>]*>/g)];
if (!trainingMatches.length)
  fail('reiki page has no [data-cta="booking-training"] element — training signup not wired (phase 6b)');
const trainingHrefs = trainingMatches
  .map((m) => (m[0].match(/href="([^"]+)"/) || [])[1])
  .filter(Boolean);
const trainingExternal = trainingHrefs.some((h) => /^https?:\/\//.test(h));
if (!trainingExternal && !embed) {
  if (!allowPlaceholder)
    fail(`training signup CTA href is not off-site (${trainingHrefs.join(", ") || "no href"}) and no provider embed found — training booking not wired (phase 6b)`);
  console.log("E-3 note: placeholder training href tolerated (--allow-placeholder)");
}

// --- Therapy page ---
const therapy = page("offerings/therapy");
if (!/<form[\s>]/.test(therapy)) fail("therapy page has no <form> (inquiry form missing)");
if (!/psychologytoday\.com/.test(therapy)) fail("therapy page has no psychologytoday.com link");
if (/data-cta="booking"/.test(therapy) || /<iframe[^>]*(calendly|acuity|squareup)/i.test(therapy))
  fail("therapy page contains a booking affordance — contract is inquiry-only");

if (!/href="[^"]*\/modalities\/?[^"]*"/.test(therapy))
  fail("therapy page has no link to /modalities/ (catalog moved top-level, FR-7/FR-13)");

// --- Modalities page (top-level catalog) ---
const modalitiesPage = page("modalities");
const modalities = modalitiesPage.split(/data-modality/g).length - 1;
if (modalities < 1)
  fail("modalities page lists no [data-modality] entries (catalog missing, FR-13)");
const REQUIRED = ["what-it-is", "who-benefits", "resources", "certifications"];
const blocks = modalitiesPage.split(/(?=<[^>]*data-modality)/g).filter((b) => /data-modality/.test(b));
for (const [i, b] of blocks.entries()) {
  const missing = REQUIRED.filter((f) => !b.includes(`data-field="${f}"`));
  if (missing.length)
    fail(`modality entry #${i + 1} missing field(s): ${missing.join(", ")}`);
  if (!/<[^>]*data-modality[^>]*\sid="[^"]+"/.test(b))
    fail(`modality entry #${i + 1} has no id anchor (deep-link contract, FR-13)`);
}

console.log(`E-3 PASS: reiki session CTA ${external || embed ? "live" : "placeholder-tolerated"}, training CTA ${trainingExternal || embed ? "live" : "placeholder-tolerated"}, therapy contract clean, modalities catalog clean (${modalities} modalities)`);
