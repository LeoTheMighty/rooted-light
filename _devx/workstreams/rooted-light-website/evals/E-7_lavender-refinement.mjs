#!/usr/bin/env node
// E-7: Lavender refinement package — ≥5 additional lavender-led packs
// (≥6 pack-lavender-*.css total incl. the original dusk pack), distinct
// identities across the ENTIRE pack set, and every built mockup page
// (both rounds) carrying the top-level "Modalities" nav entry. Covers
// G-6, FR-8, FR-14, UC-6. Authored RED 2026-07-25 at the devx revise
// cdea58 cascade, before phase 2b executes. Runs against the FULL build
// profile (dist/mockups/ present) + src token packs.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIST = join(ROOT, "dist");
const MOCKUPS = join(DIST, "mockups");
const TOKENS = join(ROOT, "src/styles/tokens");
const fail = (msg) => { console.error(`RED E-7: ${msg}`); process.exit(1); };

if (!existsSync(TOKENS))
  fail("src/styles/tokens/ missing (feature missing: phase 2 not landed)");

// ≥6 lavender-family packs (original + ≥5 refinements)
const lavender = readdirSync(TOKENS).filter((f) =>
  /^pack-lavender-.*\.css$/.test(f),
);
if (lavender.length < 6)
  fail(`only ${lavender.length} pack-lavender-*.css pack(s) — need ≥ 6 (original dusk + ≥ 5 refinements; feature missing: phase 2b not landed)`);

// Distinct identities across the ENTIRE pack set (rounds 1 + 2)
const all = readdirSync(TOKENS).filter((f) => /^pack-.*\.css$/.test(f));
const token = (css, name) =>
  (css.replace(/\/\*[\s\S]*?\*\//g, "")
    .match(new RegExp(`${name}\\s*:\\s*([^;]+);`)) || [])[1]?.trim();
const identities = new Map();
for (const f of all) {
  const css = readFileSync(join(TOKENS, f), "utf8");
  const accent = token(css, "--color-accent");
  const font = token(css, "--font-heading");
  if (!accent || !font)
    fail(`${f} missing --color-accent / --font-heading (token contract)`);
  const id = `${accent}|${font}`;
  if (identities.has(id))
    fail(`${f} and ${identities.get(id)} share identity (${id}) — packs must stay distinct across BOTH rounds`);
  identities.set(id, f);
}

// Every built mockup page carries the Modalities nav entry
if (!existsSync(MOCKUPS))
  fail("dist/mockups/ missing — run the full build (feature missing: phase 2b not landed)");
const pages = readdirSync(MOCKUPS, { withFileTypes: true })
  .filter((e) => e.isDirectory() && existsSync(join(MOCKUPS, e.name, "index.html")))
  .map((e) => e.name);
const noModalities = pages.filter(
  (p) => !/>\s*Modalities\s*</.test(readFileSync(join(MOCKUPS, p, "index.html"), "utf8")),
);
if (noModalities.length)
  fail(`mockup page(s) missing the "Modalities" nav entry: ${noModalities.join(", ")} (FR-14: ALL mockups carry the new top-level section)`);

// Refinement pages linked from the review index
const index = readFileSync(join(MOCKUPS, "index.html"), "utf8");
const refinementSlugs = lavender
  .map((f) => f.replace(/^pack-/, "").replace(/\.css$/, ""))
  .filter((s) => s !== "lavender-dusk");
const unlinked = refinementSlugs.filter((s) => !index.includes(s));
if (unlinked.length)
  fail(`review index does not link refinement mockup(s): ${unlinked.join(", ")}`);

console.log(
  `E-7 PASS: ${lavender.length} lavender packs (${refinementSlugs.length} refinements), ${all.length} distinct identities, Modalities nav on all ${pages.length} mockups`,
);
