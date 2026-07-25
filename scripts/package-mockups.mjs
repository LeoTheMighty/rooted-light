#!/usr/bin/env node
// Packages the built mockups into the rlw102 throwaway share channel
// (no hosting exists until the deploy phase). Two artifacts:
//
//   1. .devx-cache/rooted-light-mockups.html — PRIMARY. One self-
//      contained file with every direction embedded via iframe srcdoc.
//      Phone file viewers (iOS QuickLook, Android content:// viewers)
//      render a single HTML file fine but do NOT follow relative
//      file:// links between files, so a multi-file zip dead-ends on
//      exactly the device this package is for.
//   2. .devx-cache/rooted-light-mockups.zip — fallback for desktop
//      review (unzip → open mockups/index.html).
//
// Usage: npm run mockups:package  (runs build:full first)
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MOCKUPS = join(ROOT, "dist", "mockups");
const OUT_DIR = join(ROOT, ".devx-cache");
const OUT_ZIP = join(OUT_DIR, "rooted-light-mockups.zip");
const OUT_HTML = join(OUT_DIR, "rooted-light-mockups.html");

if (!existsSync(MOCKUPS)) {
  console.error(
    "package-mockups: dist/mockups/ not found — run `npm run mockups:package` (it builds first)",
  );
  process.exit(1);
}

// Staleness guard: refuse to package a build older than the mockup
// sources (a direct `node scripts/package-mockups.mjs` after edits
// would otherwise silently ship an outdated package).
const newestMtime = (dir) => {
  let newest = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    newest = Math.max(
      newest,
      e.isDirectory() ? newestMtime(p) : statSync(p).mtimeMs,
    );
  }
  return newest;
};
const srcDirs = ["src/styles/tokens", "src/layouts/home", "src/pages/mockups"]
  .map((d) => join(ROOT, d))
  .filter(existsSync);
const builtAt = statSync(join(MOCKUPS, "index.html")).mtimeMs;
if (srcDirs.some((d) => newestMtime(d) > builtAt)) {
  console.error(
    "package-mockups: mockup sources are newer than dist/ — run `npm run mockups:package` so the build happens first",
  );
  process.exit(1);
}

mkdirSync(OUT_DIR, { recursive: true });

// --- Artifact 1: single-file review HTML -------------------------------
const index = readFileSync(join(MOCKUPS, "index.html"), "utf8");

// Slug order + per-card copy come from the built index so the single
// file can never disagree with it.
const slugs = [...index.matchAll(/href="\.\/([^/"]+)\/index\.html"/g)].map(
  (m) => m[1],
);
if (slugs.length < 6) {
  console.error(
    `package-mockups: only found ${slugs.length} direction links in the review index — expected ≥ 6`,
  );
  process.exit(1);
}

const escAttr = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
const pageMeta = (html, name) => {
  const get = (re) => (html.match(re) || [])[1];
  const title = get(/<title>([^<]*?)\s*·/) ?? name;
  const blurb = get(/<meta name="description" content="([^"]*)"/) ?? "";
  return { title, blurb };
};

const sections = slugs.map((slug, i) => {
  let page = readFileSync(join(MOCKUPS, slug, "index.html"), "utf8");
  const { title, blurb } = pageMeta(page, slug);
  // The review bar's "../index.html" link can't resolve inside srcdoc —
  // strip it; the wrapper provides navigation instead.
  page = page.replace(/<footer class="review-bar">[\s\S]*?<\/footer>/, "");
  return { slug, i, title, blurb, srcdoc: escAttr(page) };
});

const single = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rooted Light — style directions</title>
<style>
*,*::before,*::after{box-sizing:border-box}*{margin:0}
body{background:#faf8f4;color:#3d3a33;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6;padding:1.5rem 1rem 3rem}
.intro{max-width:38rem;margin:0 auto 1.6rem;text-align:center}
.intro h1{font-family:Georgia,serif;color:#4a5544;font-size:1.6rem}
.intro p{margin-top:.7rem;font-size:.95rem}
.jump{max-width:38rem;margin:0 auto 2rem;display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center}
.jump a{background:#f1ede4;border-radius:999px;padding:.3rem .85rem;font-size:.82rem;text-decoration:none;color:#4a5544;font-weight:600}
.direction{max-width:60rem;margin:0 auto 2.4rem;scroll-margin-top:1rem}
.direction h2{font-family:Georgia,serif;color:#4a5544;font-size:1.15rem}
.direction .blurb{font-size:.9rem;margin:.25rem 0 .7rem;opacity:.85}
.direction iframe{width:100%;height:82vh;border:1px solid #ddd8ca;border-radius:10px;background:#fff}
.foot{text-align:center;font-size:.85rem;opacity:.8}
</style>
</head>
<body>
<header class="intro">
<h1>Rooted Light — style directions</h1>
<p>${sections.length} looks for the home page, all showing the same words — only the feel changes. Each one scrolls inside its frame.</p>
<p>Live with them for a bit, then reply with your favorite — or a blend of two (e.g. “colors of one, type of another”).</p>
<p>A note on type: the fonts are your device’s own, so they render truest on an iPhone or iPad.</p>
</header>
<nav class="jump" aria-label="Directions">
${sections.map((s) => `<a href="#${s.slug}">${s.i + 1}. ${s.title}</a>`).join("\n")}
</nav>
<main>
${sections
  .map(
    (s) => `<section class="direction" id="${s.slug}">
<h2>${s.i + 1}. ${s.title}</h2>
<p class="blurb">${s.blurb}</p>
<iframe title="${escAttr(s.title)} mockup" loading="lazy" srcdoc="${s.srcdoc}"></iframe>
</section>`,
  )
  .join("\n")}
</main>
<footer class="foot"><p>Rooted Light LLC · mockup review package · ${sections.length} directions</p></footer>
</body>
</html>
`;

writeFileSync(OUT_HTML, single);

// --- Artifact 2: folder zip (desktop fallback) -------------------------
rmSync(OUT_ZIP, { force: true });
// -X strips extended attributes; zip from inside dist/ so the archive
// root is mockups/ (unzip → open mockups/index.html).
const r = spawnSync("zip", ["-r", "-X", OUT_ZIP, "mockups"], {
  cwd: join(ROOT, "dist"),
  stdio: "inherit",
});
if (r.error || r.status !== 0) {
  console.error(
    `package-mockups: zip failed${r.error ? `: ${r.error.message}` : ` (exit ${r.status})`}`,
  );
  process.exit(1);
}

console.log(`\npackage-mockups: wrote ${OUT_HTML} (primary — send this one)`);
console.log(`package-mockups: wrote ${OUT_ZIP} (desktop fallback)`);
console.log(
  "Phone flow: AirDrop/text the .html file and open it — no unzipping needed.",
);
