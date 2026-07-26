// Base-aware href helper (rlw112): prefixes root-relative internal
// paths with Astro's configured base so the site works under a subpath
// deploy (the temporary GitHub Pages preview at /rooted-light/). With
// the default base ("/") this is an identity function, so the normal
// build, dev server, and eval contracts are unchanged. External URLs,
// fragment anchors, and relative paths pass through untouched.
export function withBase(path: string): string {
  if (!path.startsWith("/")) return path;
  const base = import.meta.env.BASE_URL.replace(/\/+$/, "");
  return `${base}${path}`;
}
