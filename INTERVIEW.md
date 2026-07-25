# INTERVIEW — Questions for you

<!-- devx-empty-state-start -->
> **What goes here:** decisions only the human can make. Filed by any agent
> when a product decision is ambiguous. Each item: one question + 2-3
> options + a recommendation. Mobile companion shows these in the inbox
> tab. Don't conflate with MANUAL.md — INTERVIEW = decisions, MANUAL =
> actions. This empty-state header auto-deletes once this file holds three
> or more items.
<!-- devx-empty-state-end -->


## (from /devx-init) Stack: which language for the first dev story?

Empty repo — no stack file detected. The first slice's spec needs a primary
language so language_runners + lint/test commands can be wired up.

**Options:** TypeScript / Python / Rust / Go / Flutter / other.
**Recommendation:** TypeScript (default for the first dev story unless you
say otherwise — broadest tooling, fastest iteration).

- [ ] Pick a primary language for the first dev story.

## (from /devx-init) CI: when should GitHub Actions run?

`.github/workflows/devx-ci.yml` was just scaffolded. It needs trigger filters.

**Options:**
- on PR + push to main (default, runs every change before merge)
- on push only (cheaper; PRs go through review without CI)
- on schedule + on PR (nightly + per-PR)

**Recommendation:** on PR + push to main.

- [ ] Confirm CI trigger filters.

## (from /devx-init) Browser harness — Playwright, Cypress, or none?

If the first slice has any UI, this gates Layer-1 (scripted) browser tests.
If it's pure CLI / API, pick none — devx will skip browser harness setup.

**Options:** Playwright (default) / Cypress / none.
**Recommendation:** Playwright (covers Chromium + WebKit + Firefox in one run).

- [ ] Pick a browser harness (or `none`).

## (from devx init) What are you building? <!-- devx:init-defaults:n1 -->

Non-interactive scaffold took a default: placeholder ("Scaffolded non-interactively — describe what this project builds (see INTERVIEW.md).").
Why it needs you: no README to derive the project description from.

- [ ] Confirm or replace this default.

## (from devx init) First slice — what's the smallest demo that matters? <!-- devx:init-defaults:n2 -->

Non-interactive scaffold took a default: placeholder ("Scaffolded non-interactively — pick the smallest demo that matters (see INTERVIEW.md).").
Why it needs you: the first slice is a product decision no repo probe can make.

- [ ] Confirm or replace this default.

## (from devx init) Who's it for? <!-- devx:init-defaults:n3 -->

Non-interactive scaffold took a default: "you propose" — devx drafted the persona panel under focus-group/.
Why it needs you: audience is a product decision; review the proposed panel.

- [ ] Confirm or replace this default.
