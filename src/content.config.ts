// Astro v5 content collections (glob loaders). Schemas per
// _devx/workstreams/rooted-light-website/design.md § Interfaces.
// site.json is a plain import, NOT a collection.
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const modalities = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/modalities" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    what_it_is: z.string(),
    who_benefits: z.array(z.string()),
    resources: z.array(z.object({ label: z.string(), url: z.string() })),
    certifications: z.array(z.string()),
    order: z.number(),
  }),
});

const offerings = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/offerings" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    // "session" books via booking.url; "training" via booking.training_url
    // (single seam in site.json — flipped when the FR-10 decision lands).
    kind: z.enum(["session", "training"]),
    order: z.number(),
  }),
});

const resources = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.string() })).default([]),
    order: z.number(),
  }),
});

export const collections = { modalities, offerings, resources };
