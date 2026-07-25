#!/usr/bin/env node
// E-5: Palette accessibility — WCAG AA contrast at the token level.
// Covers FR-8, FR-12, UC-4. Documented exception to the dist/
// convention: reads src/styles/tokens/pack-*.css SOURCE files (bundled
// CSS is minified/hashed). Pairings per token-name contract (T2.1):
//   --color-text-body    vs --color-bg  ≥ 4.5:1  (and vs --color-surface)
//   --color-text-heading vs --color-bg  ≥ 3:1
// Gradient packs must declare a solid --color-bg fallback.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../..");
const TOKENS = join(ROOT, "src/styles/tokens");
const fail = (msg) => { console.error(`RED E-5: ${msg}`); process.exit(1); };

if (!existsSync(TOKENS))
  fail("src/styles/tokens/ missing — token packs not authored yet (feature missing: phase 2 not landed)");
const packs = readdirSync(TOKENS).filter((f) => /^pack-.*\.css$/.test(f));
if (!packs.length) fail("no pack-*.css files in src/styles/tokens/ (feature missing: phase 2 not landed)");

const hex = (s) => {
  const m = s.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (!m) return null;
  let h = m[1];
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
};
const lum = ([r, g, b]) => {
  const f = (c) => { c /= 255; return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (l1 + 0.05) / (l2 + 0.05);
};
const token = (css, name) =>
  (css.match(new RegExp(`${name}\\s*:\\s*([^;]+);`)) || [])[1]?.trim();

let checked = 0;
for (const f of packs) {
  const css = readFileSync(join(TOKENS, f), "utf8");
  const need = { bg: "--color-bg", surface: "--color-surface", body: "--color-text-body", heading: "--color-text-heading" };
  const c = {};
  for (const [k, name] of Object.entries(need)) {
    const raw = token(css, name);
    if (!raw) fail(`${f}: missing token ${name} (token-name contract)`);
    c[k] = hex(raw);
    if (!c[k]) fail(`${f}: ${name} is not a parseable solid hex color ("${raw}") — gradient packs need a solid fallback`);
  }
  const checks = [
    ["body vs bg", ratio(c.body, c.bg), 4.5],
    ["body vs surface", ratio(c.body, c.surface), 4.5],
    ["heading vs bg", ratio(c.heading, c.bg), 3],
  ];
  for (const [label, r, min] of checks) {
    if (r < min) fail(`${f}: ${label} contrast ${r.toFixed(2)}:1 < ${min}:1 (WCAG AA)`);
    checked++;
  }
}
console.log(`E-5 PASS: ${packs.length} pack(s), ${checked} pairings AA-clean`);
