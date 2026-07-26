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
// src/content is a mockup input since round 4 (owner_line, modality
// copy flow into every grounded page via _content.ts).
const srcDirs = [
  "src/styles/tokens",
  "src/layouts/home",
  "src/pages/mockups",
  "src/content",
]
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

// Round structure, slug order, and per-card copy all come from the
// built index so the single file can never disagree with it (round-2
// framing, continuous numbering). Chunks split on the round headings.
const roundChunks = index.split(/<h2 class="round-title">/).slice(1);
if (roundChunks.length < 4) {
  console.error(
    `package-mockups: review index has ${roundChunks.length} round section(s) — expected 4 (rounds restructure missing?)`,
  );
  process.exit(1);
}
// Numbering comes FROM the index cards ("N. Title"), not a local
// counter: display order (round 3 first) diverged from array order
// (round 3 appended last, so old numbers stay stable) in rlw110 —
// counting here would re-number and break "numbers match everywhere".
// Each card is parsed on its own so a slug can never inherit a
// neighbor's number; a card missing either piece fails loudly.
const roundsMeta = roundChunks.map((chunk) => ({
  title: (chunk.match(/^([^<]*)</) || [])[1] ?? "Directions",
  note: (chunk.match(/<p class="round-note">([^<]*)</) || [])[1] ?? "",
  cards: chunk.split(/<a class="card" /).slice(1).map((card) => {
    const slug = (card.match(/^href="\.\/([^/"]+)\/index\.html"/) || [])[1];
    const num = (card.match(/<h3>\s*(\d+)\./) || [])[1];
    if (!slug || !num) {
      console.error(
        `package-mockups: review-index card missing its slug or number (slug=${slug ?? "?"}, num=${num ?? "?"}) — card markup changed?`,
      );
      process.exit(1);
    }
    return { slug, num: Number(num) };
  }),
}));
const slugs = roundsMeta.flatMap((r) => r.cards.map((c) => c.slug));
const nums = roundsMeta.flatMap((r) => r.cards.map((c) => c.num));
if (
  slugs.length < 22 ||
  new Set(slugs).size !== slugs.length ||
  new Set(nums).size !== nums.length
) {
  console.error(
    `package-mockups: found ${slugs.length} numbered direction cards (${new Set(slugs).size} unique slugs, ${new Set(nums).size} unique numbers) in the review index — expected ≥ 22, all unique (all four rounds)`,
  );
  process.exit(1);
}

const escAttr = (s) => s.replaceAll("&", "&amp;").replaceAll('"', "&quot;");
// Titles/blurbs captured here come out of built HTML, so they are
// already entity-escaped — safe in text AND attributes as-is. Running
// escAttr over them again would double-escape (& → &amp;amp;).
const pageMeta = (html, name) => {
  const get = (re) => (html.match(re) || [])[1];
  const title = get(/<title>([^<]*?)\s*·/) ?? name;
  const blurb = get(/<meta name="description" content="([^"]*)"/) ?? "";
  return { title, blurb };
};

// The review bar's "../index.html" link can't resolve inside
// srcdoc — strip it; the wrapper provides navigation instead.
const stripBar = (html) =>
  html.replace(/<footer class="review-bar">[\s\S]*?<\/footer>/, "");

// Round-3 directions are multi-page. srcdoc iframes can't follow
// relative file links, so each subpage gets its own frame in this
// single file (the zip and the live site are where links click
// through). Fixed order keeps the story straight; unknown dirs sort
// after the known ones.
const SUBPAGE_ORDER = ["offerings", "modalities", "about"];
const subpagesOf = (slug, title) =>
  readdirSync(join(MOCKUPS, slug), { withFileTypes: true })
    .filter(
      (e) =>
        e.isDirectory() && existsSync(join(MOCKUPS, slug, e.name, "index.html")),
    )
    .map((e) => e.name)
    .sort((a, b) => {
      const ia = SUBPAGE_ORDER.indexOf(a);
      const ib = SUBPAGE_ORDER.indexOf(b);
      return (
        (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib) || a.localeCompare(b)
      );
    })
    .map((dir) => {
      const sub = readFileSync(join(MOCKUPS, slug, dir, "index.html"), "utf8");
      const meta = pageMeta(sub, `${slug}/${dir}`);
      return {
        dir,
        // page titles are "<variant> — <page>"; show just the page part
        label: meta.title.startsWith(`${title} — `)
          ? meta.title.slice(title.length + 3)
          : meta.title,
        srcdoc: escAttr(stripBar(sub)),
      };
    });

const roundSections = roundsMeta.map((r) => ({
  ...r,
  sections: r.cards.map(({ slug, num }) => {
    const page = readFileSync(join(MOCKUPS, slug, "index.html"), "utf8");
    const { title, blurb } = pageMeta(page, slug);
    return {
      slug,
      num,
      title,
      blurb,
      srcdoc: escAttr(stripBar(page)),
      subpages: subpagesOf(slug, title),
    };
  }),
}));
const sections = roundSections.flatMap((r) => r.sections);

const single = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rooted Light — tan &amp; lilac</title>
<style>
*,*::before,*::after{box-sizing:border-box}*{margin:0}
body{background:#faf8f4;color:#3d3a33;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.6;padding:1.5rem 1rem 3rem}
.intro{max-width:38rem;margin:0 auto 1.6rem;text-align:center}
.intro h1{font-family:Georgia,serif;color:#4a5544;font-size:1.6rem}
.intro p{margin-top:.7rem;font-size:.95rem}
.jump{max-width:38rem;margin:0 auto 2rem;display:flex;flex-wrap:wrap;gap:.45rem;justify-content:center}
.jump a{background:#f1ede4;border-radius:999px;padding:.3rem .85rem;font-size:.82rem;text-decoration:none;color:#4a5544;font-weight:600}
.round-head{max-width:38rem;margin:2.4rem auto .4rem;text-align:center}
.round-head h2{font-family:Georgia,serif;color:#4a5544;font-size:1.25rem}
.round-head p{font-size:.9rem;margin-top:.4rem;opacity:.85}
.direction{max-width:60rem;margin:0 auto 2.4rem;scroll-margin-top:1rem}
.direction h2{font-family:Georgia,serif;color:#4a5544;font-size:1.15rem}
.direction .blurb{font-size:.9rem;margin:.25rem 0 .7rem;opacity:.85}
.direction iframe{width:100%;height:82vh;border:1px solid #ddd8ca;border-radius:10px;background:#fff}
.direction h3.subpage{font-family:Georgia,serif;color:#4a5544;font-size:1rem;margin:1.1rem 0 .4rem}
.direction .subpage-frame{height:70vh}
.foot{text-align:center;font-size:.85rem;opacity:.8}
</style>
</head>
<body>
<header class="intro">
<h1>Rooted Light — tan &amp; lilac</h1>
<p>Round 4, the decision round: the first ${roundSections[0].sections.length} are no. 13's layout dressed in tans and lilacs, inspired by the site you shared — some lead with tan, some with lilac, some keep a neutral base where both share. Kylie's name is on every front page, each has a favorite-quote space, and the decision sheet at the bottom of every page lists its exact shades and fonts. Earlier rounds follow for reference. Each page scrolls inside its frame.</p>
<p>Reply with what feels right for each choice — fonts, shades, and which color leads. Mixing is welcome ("19's colors with 17's fonts"). Numbers match everywhere.</p>
<p>A note on type: the fonts are your device’s own, so they render truest on an iPhone or iPad.</p>
</header>
<nav class="jump" aria-label="Directions">
${sections.map((s) => `<a href="#${s.slug}">${s.num}. ${s.title}</a>`).join("\n")}
</nav>
<main>
${roundSections
  .map(
    (r) => `<div class="round-head"><h2>${r.title}</h2><p>${r.note}</p></div>
${r.sections
  .map(
    (s) => `<section class="direction" id="${s.slug}">
<h2>${s.num}. ${s.title}</h2>
<p class="blurb">${s.blurb}</p>
${
  s.subpages.length
    ? `<p class="blurb">Multi-page — every page is framed below. (In this single file the links inside the frames don't navigate; in the zip and on the real site they do.)</p>`
    : ""
}
<iframe title="${s.title} mockup" loading="lazy" srcdoc="${s.srcdoc}"></iframe>
${s.subpages
  .map(
    (p) => `<h3 class="subpage">${s.num} · ${p.label} page</h3>
<iframe class="subpage-frame" title="${s.title} — ${p.label} mockup" loading="lazy" srcdoc="${p.srcdoc}"></iframe>`,
  )
  .join("\n")}
</section>`,
  )
  .join("\n")}`,
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
