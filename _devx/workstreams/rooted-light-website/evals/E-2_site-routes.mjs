#!/usr/bin/env node
// E-2: Single-page static build — the home page is one scrollable
// document (hero → quote → About → Services → Modalities → Resources,
// stable id anchors), anchor nav complete on every standalone route,
// no legacy labels, site name "Rooted Light Healing", old routes
// redirecting. Covers G-2, G-4, CAP-1, CAP-6, FR-1, FR-11, FR-13,
// UC-7. Runs against dist/ (any profile; /mockups/ is out of scope —
// mockup pages are historical review artifacts).
// Revised 2026-07-25 (devx revise cdea58): Modalities promoted to a
// top-level section — routes 7 → 8, named nav sections 4 → 5.
// Revised 2026-07-26 (devx revise cdea58, rlw116): single-page IA —
// the eight-route assertion became this one-pager assertion.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIST = join(ROOT, "dist");
const fail = (msg) => { console.error(`RED E-2: ${msg}`); process.exit(1); };

if (!existsSync(DIST))
  fail("no dist/ build output — site has not been built yet (run `npm run build`)");

const SITE_NAME = "Rooted Light Healing";
// Document order on the one-pager: hero, quote band, then the four
// anchor sections. Markers are matched by first occurrence.
const ORDER = [
  ['class="mist-hero"', "full-screen hero"],
  ['class="quote-band"', "quote band"],
  ['id="about"', "About section anchor"],
  ['id="services"', "Services section anchor"],
  ['id="modalities"', "Modalities section anchor"],
  ['id="resources"', "Resources section anchor"],
];
const ANCHORS = ["about", "services", "modalities", "resources"];
// Former top-level routes: absent, or a redirect stub to the one-pager.
const OLD_ROUTES = [
  "about-me", "about-you", "offerings", "offerings/reiki",
  "offerings/therapy", "modalities", "resources",
];

const pageFile = (route) => {
  const asDir = join(DIST, route, "index.html");
  const asFile = join(DIST, `${route || "index"}.html`);
  if (existsSync(asDir)) return asDir;
  if (existsSync(asFile)) return asFile;
  return null;
};
const stripComments = (html) => html.replace(/<!--[\s\S]*?-->/g, "");

// --- The one-pager ---
const homeFile = pageFile("");
if (!homeFile) fail("dist/ has no home page");
const home = readFileSync(homeFile, "utf8");

let cursor = -1;
for (const [marker, label] of ORDER) {
  const at = home.indexOf(marker);
  if (at === -1) fail(`home page missing ${label} (${marker})`);
  if (at < cursor) fail(`home page section out of order: ${label} appears before the previous marker`);
  cursor = at;
}

if (!new RegExp(`<title>[^<]*${SITE_NAME}`).test(home))
  fail(`home <title> does not carry "${SITE_NAME}"`);
if (!new RegExp(`<h1[^>]*>[^<]*${SITE_NAME}`).test(home))
  fail(`home hero h1 does not read "${SITE_NAME}"`);

// --- Nav completeness + banned labels on every standalone route ---
// Standalone = the one-pager + each resource explainer detail page.
const resourceDirs = existsSync(join(DIST, "resources"))
  ? readdirSync(join(DIST, "resources")).filter((d) =>
      statSync(join(DIST, "resources", d)).isDirectory() &&
      existsSync(join(DIST, "resources", d, "index.html"))
    )
  : [];
if (resourceDirs.length < 1)
  fail("no standalone resource explainer detail pages under dist/resources/*/ (they must remain real routes)");

const standalone = [
  ["", home],
  ...resourceDirs.map((d) => [
    `resources/${d}`,
    readFileSync(join(DIST, "resources", d, "index.html"), "utf8"),
  ]),
];

for (const [route, html] of standalone) {
  const visible = stripComments(html);
  const missingAnchors = ANCHORS.filter(
    (a) => !new RegExp(`href="[^"]*#${a}"`).test(visible)
  );
  if (missingAnchors.length)
    fail(`/${route}: nav missing anchor link(s) to ${missingAnchors.join(", ")}`);
  if (!/href="\/(index\.html)?"/.test(visible))
    fail(`/${route}: nav has no home link`);
  if (/About You/.test(visible))
    fail(`/${route}: banned label "About You" is user-visible`);
  if (/Offerings/.test(visible))
    fail(`/${route}: banned label "Offerings" is user-visible`);
  if (route && !new RegExp(`>\\s*${SITE_NAME}\\s*<`).test(visible))
    fail(`/${route}: nav brand does not read "${SITE_NAME}"`);
}

// --- Old routes: gone or redirecting to the one-pager ---
for (const route of OLD_ROUTES) {
  const f = pageFile(route);
  if (!f) continue; // removed outright — acceptable
  const html = readFileSync(f, "utf8");
  const redirects =
    /http-equiv="refresh"/i.test(html) || /<link rel="canonical"/i.test(html);
  if (!redirects)
    fail(`/${route}/ still serves full content — must be removed or redirect to its section anchor`);
}

console.log(
  `E-2 PASS: one-pager with ${ANCHORS.length} anchored sections in order, nav + name clean on ${standalone.length} standalone route(s), ${OLD_ROUTES.length} legacy routes redirecting/removed`
);
