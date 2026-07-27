// @ts-check
import { defineConfig } from "astro/config";

// Static-only output (G-4: zero backend, S3 + CloudFront target).
// `build:full` and `build` are the same profile until the deploy phase
// adds a production profile that prunes /mockups/.
//
// DEPLOY_SITE / DEPLOY_BASE (rlw112): set only by the temporary GitHub
// Pages preview workflow (.github/workflows/deploy-pages.yml) so the
// site builds under the /rooted-light/ subpath. Unset (local dev, CI,
// evals) both default and nothing changes. Delete with the workflow
// when the real domain lands (rlw107).
const withBase = (path) =>
  (process.env.DEPLOY_BASE ?? "/").replace(/\/$/, "") + path;

export default defineConfig({
  output: "static",
  site: process.env.DEPLOY_SITE,
  base: process.env.DEPLOY_BASE,
  // Single-page IA (rlw116): the former page routes 301 to their
  // section anchors as static meta-refresh stubs. About You has no
  // successor section — it redirects home. Resource explainer detail
  // pages remain real routes ("/resources/[slug]" still builds).
  // Astro prefixes redirect SOURCES with `base` but not DESTINATIONS,
  // so the base is applied by hand or the Pages preview would redirect
  // off-site to the domain root.
  redirects: {
    "/about-me/": withBase("/#about"),
    "/about-you/": withBase("/"),
    "/offerings/": withBase("/#services"),
    "/offerings/reiki/": withBase("/#services"),
    "/offerings/therapy/": withBase("/#services"),
    "/modalities/": withBase("/#modalities"),
    "/resources/": withBase("/#resources"),
  },
});
