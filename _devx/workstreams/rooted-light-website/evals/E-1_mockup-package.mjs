#!/usr/bin/env node
// E-1: Mockup review package — ≥6 distinct home-page mockups + index.
// Covers G-1, UC-6, CAP-5, FR-8, FR-9. Runs against the FULL build
// profile (dist/ must include /mockups/). Distinctness contract: no two
// packs share the same (--color-accent, --font-heading) pair (token-name
// contract, plan.md T2.1).
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIST = join(ROOT, "dist");
const MOCKUPS = join(DIST, "mockups");
const TOKENS = join(ROOT, "src/styles/tokens");
const fail = (msg) => { console.error(`RED E-1: ${msg}`); process.exit(1); };

if (!existsSync(DIST))
  fail("no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phase 1/2 not landed)");
if (!existsSync(MOCKUPS))
  fail("dist/mockups/ missing — mockup package not built (feature missing: phase 2 not landed)");

// Collect mockup pages: mockups/<pack>/index.html or mockups/<pack>.html
const entries = readdirSync(MOCKUPS, { withFileTypes: true });
const pages = [];
for (const e of entries) {
  if (e.isDirectory() && existsSync(join(MOCKUPS, e.name, "index.html")))
    pages.push(e.name);
  else if (e.isFile() && e.name.endsWith(".html") && e.name !== "index.html")
    pages.push(e.name.replace(/\.html$/, ""));
}
if (pages.length < 6)
  fail(`only ${pages.length} mockup page(s) in dist/mockups/ — need ≥ 6`);

if (!existsSync(join(MOCKUPS, "index.html")))
  fail("dist/mockups/index.html (review index) missing");
const index = readFileSync(join(MOCKUPS, "index.html"), "utf8");
const unlinked = pages.filter((p) => !index.includes(p));
if (unlinked.length)
  fail(`review index does not link to: ${unlinked.join(", ")}`);

// Distinct identity: parse token packs.
if (!existsSync(TOKENS))
  fail("src/styles/tokens/ missing — token packs not authored (feature missing)");
const packFiles = readdirSync(TOKENS).filter((f) => /^pack-.*\.css$/.test(f));
if (packFiles.length < 6)
  fail(`only ${packFiles.length} token pack(s) in src/styles/tokens/ — need ≥ 6`);
const token = (css, name) =>
  (css.match(new RegExp(`${name}\\s*:\\s*([^;]+);`)) || [])[1]?.trim();
const identities = new Map();
for (const f of packFiles) {
  const css = readFileSync(join(TOKENS, f), "utf8");
  const accent = token(css, "--color-accent");
  const font = token(css, "--font-heading");
  if (!accent || !font)
    fail(`${f} missing required tokens --color-accent / --font-heading (token-name contract)`);
  const id = `${accent}|${font}`;
  if (identities.has(id))
    fail(`${f} and ${identities.get(id)} share identity (accent ${accent}, heading font ${font}) — packs must be distinct`);
  identities.set(id, f);
}

console.log(`E-1 PASS: ${pages.length} mockups + index, ${packFiles.length} distinct packs`);
