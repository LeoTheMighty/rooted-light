#!/usr/bin/env node
// E-3: Offering-page contracts. Covers UC-1, UC-3, CAP-2/3/4, FR-6, FR-7.
// Reiki page: ≥1 booking CTA ([data-cta="booking"]) with an off-site href
// (or provider embed). Therapy page: form present, psychologytoday.com
// link present, ZERO booking affordances, every modality entry
// ([data-modality]) carries the 4 required fields ([data-field=...]).
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
    fail(`reiki booking CTA href is not off-site (${hrefs.join(", ") || "no href"}) and no provider embed found — booking not wired (phase 6)`);
  console.log("E-3 note: placeholder booking href tolerated (--allow-placeholder)");
}

// --- Therapy page ---
const therapy = page("offerings/therapy");
if (!/<form[\s>]/.test(therapy)) fail("therapy page has no <form> (inquiry form missing)");
if (!/psychologytoday\.com/.test(therapy)) fail("therapy page has no psychologytoday.com link");
if (/data-cta="booking"/.test(therapy) || /<iframe[^>]*(calendly|acuity|squareup)/i.test(therapy))
  fail("therapy page contains a booking affordance — contract is inquiry-only");

const modalities = therapy.split(/data-modality/g).length - 1;
if (modalities < 1)
  fail("therapy page lists no [data-modality] entries (modality catalog missing)");
const REQUIRED = ["what-it-is", "who-benefits", "resources", "certifications"];
const blocks = therapy.split(/(?=<[^>]*data-modality)/g).filter((b) => /data-modality/.test(b));
for (const [i, b] of blocks.entries()) {
  const missing = REQUIRED.filter((f) => !b.includes(`data-field="${f}"`));
  if (missing.length)
    fail(`modality entry #${i + 1} missing field(s): ${missing.join(", ")}`);
}

console.log(`E-3 PASS: reiki CTA ${external || embed ? "live" : "placeholder-tolerated"}, therapy contract clean (${modalities} modalities)`);
