// @ts-check
import { defineConfig } from "astro/config";

// Static-only output (G-4: zero backend, S3 + CloudFront target).
// `build:full` and `build` are the same profile until the deploy phase
// adds a production profile that prunes /mockups/.
export default defineConfig({
  output: "static",
});
