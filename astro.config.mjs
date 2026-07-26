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
export default defineConfig({
  output: "static",
  site: process.env.DEPLOY_SITE,
  base: process.env.DEPLOY_BASE,
});
