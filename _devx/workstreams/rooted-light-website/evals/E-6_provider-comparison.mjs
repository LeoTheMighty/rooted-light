#!/usr/bin/env node
// E-6: Booking-provider comparison doc — ≥ 3 providers × 4 axes + an
// explicit recommendation. Covers FR-10, CAP-2, G-3. Reads the
// decisions doc, not dist/.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const DIR = dirname(fileURLToPath(import.meta.url));
const DOC = resolve(DIR, "../decisions/booking-provider-comparison.md");
const fail = (msg) => { console.error(`RED E-6: ${msg}`); process.exit(1); };

if (!existsSync(DOC))
  fail("decisions/booking-provider-comparison.md missing — comparison not written yet (feature missing: phase 4 not landed)");
const md = readFileSync(DOC, "utf8");

// Provider sections: H2 headings that aren't the recommendation/addendum.
const sections = [...md.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim());
const providers = sections.filter((s) => !/recommendation|form.provider|addendum/i.test(s));
if (providers.length < 3)
  fail(`only ${providers.length} provider section(s) (## headings) — need ≥ 3`);

const AXES = [
  ["fees", /fee|cost|price|per.?(txn|transaction)|\$\d/i],
  ["client friction", /friction|steps to book|clicks|client experience/i],
  ["schedule control", /schedul|availability|calendar control/i],
  ["PayPal support", /paypal/i],
];
const chunks = md.split(/^##\s+/m).slice(1);
for (const chunk of chunks) {
  const title = chunk.split("\n")[0].trim();
  if (!providers.includes(title)) continue;
  const missing = AXES.filter(([, re]) => !re.test(chunk)).map(([n]) => n);
  if (missing.length)
    fail(`provider "${title}" missing axis coverage: ${missing.join(", ")}`);
}

if (!/^##?#?\s+recommendation/im.test(md))
  fail("no explicit Recommendation section");

console.log(`E-6 PASS: ${providers.length} providers × 4 axes + recommendation`);
