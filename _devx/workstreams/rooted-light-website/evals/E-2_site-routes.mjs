#!/usr/bin/env node
// E-2: Full-site static build — all 8 routes present, global nav reaches
// every top-level section from every page. Covers G-2, G-4, CAP-1,
// CAP-6, FR-1, FR-11, FR-13, UC-7. Runs against dist/ (any profile).
// Revised 2026-07-25 (devx revise cdea58): Modalities promoted to a
// top-level section — routes 7 → 8, named nav sections 4 → 5.
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIST = join(ROOT, "dist");
const fail = (msg) => { console.error(`RED E-2: ${msg}`); process.exit(1); };

if (!existsSync(DIST))
  fail("no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phase 1 not landed)");

const ROUTES = [
  "", "about-me", "about-you", "modalities", "resources",
  "offerings", "offerings/reiki", "offerings/therapy",
];
const NAV_SECTIONS = ["about-me", "about-you", "modalities", "resources", "offerings"];

const pageFile = (route) => {
  const asDir = join(DIST, route, "index.html");
  const asFile = join(DIST, `${route || "index"}.html`);
  if (existsSync(asDir)) return asDir;
  if (existsSync(asFile)) return asFile;
  return null;
};

const missing = ROUTES.filter((r) => !pageFile(r));
if (missing.length)
  fail(`missing route(s) in dist/: ${missing.map((r) => "/" + r).join(", ")}`);

for (const route of ROUTES) {
  const html = readFileSync(pageFile(route), "utf8");
  // Home is a nav target too ("/"); the 4 named sections must be linked.
  const unlinked = NAV_SECTIONS.filter(
    (s) => !new RegExp(`href="[^"]*\\b${s}\\b[^"]*"`).test(html)
  );
  const noHome = !/href="\/(index\.html)?"/.test(html);
  if (unlinked.length || noHome)
    fail(`/${route || ""}: nav incomplete — missing link(s) to ${[...unlinked, ...(noHome ? ["home"] : [])].join(", ")}`);
}

console.log(`E-2 PASS: ${ROUTES.length} routes present, nav complete on every page`);
