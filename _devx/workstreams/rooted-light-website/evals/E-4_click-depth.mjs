#!/usr/bin/env node
// E-4: Booking click depth — BFS the internal link graph from the home
// page; a page containing [data-cta="booking"] must be reachable in ≤ 3
// link traversals. Covers G-5, UC-1, FR-6. Depth is to the CTA element;
// href liveness is E-3's concern. Runs against dist/ (any profile).
import { readFileSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const DIST = join(ROOT, "dist");
const fail = (msg) => { console.error(`RED E-4: ${msg}`); process.exit(1); };

if (!existsSync(DIST))
  fail("no dist/ build output — site has not been built yet (feature missing: run `npm run build`, phase 3 not landed)");

const norm = (href) => {
  let p = href.replace(/^https?:\/\/[^/]+/, "").split(/[?#]/)[0];
  if (!p.startsWith("/")) return null; // relative links resolved below
  p = p.replace(/\/index\.html$/, "/").replace(/\.html$/, "");
  if (!p.endsWith("/")) p += "/";
  return p;
};
const fileFor = (route) => {
  const clean = route.replace(/^\/|\/$/g, "");
  const asDir = join(DIST, clean, "index.html");
  const asFile = join(DIST, `${clean || "index"}.html`);
  if (existsSync(asDir)) return asDir;
  if (existsSync(asFile)) return asFile;
  return null;
};

const start = "/";
if (!fileFor(start)) fail("dist/ has no home page");
const seen = new Set([start]);
let frontier = [start];
for (let depth = 0; depth <= 3; depth++) {
  const next = [];
  for (const route of frontier) {
    const f = fileFor(route);
    if (!f) continue;
    const html = readFileSync(f, "utf8");
    if (/data-cta="booking"/.test(html)) {
      console.log(`E-4 PASS: booking CTA reachable at ${route} in ${depth} click(s)`);
      process.exit(0);
    }
    for (const m of html.matchAll(/href="([^"]+)"/g)) {
      const n = norm(m[1]);
      if (n && !seen.has(n) && fileFor(n)) { seen.add(n); next.push(n); }
    }
  }
  frontier = next;
}
fail("no page containing [data-cta=\"booking\"] reachable within 3 clicks of home (booking CTA missing or buried)");
