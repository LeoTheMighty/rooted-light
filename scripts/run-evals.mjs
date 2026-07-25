#!/usr/bin/env node
// Runs every present E-*.mjs eval under the workstream evals directory.
// Contract (rlw101 AC): the runner executes ALL evals and reports each
// one's status — it never stops at the first red and never edits an eval
// to make it pass. Exit code is honest: non-zero if any eval is red.
// Extra args are forwarded to every eval (e.g. --allow-placeholder).
import { readdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EVALS_DIR = join(ROOT, "_devx/workstreams/rooted-light-website/evals");

if (!existsSync(EVALS_DIR)) {
  console.error(`evals: directory not found: ${EVALS_DIR}`);
  process.exit(1);
}

// "Every E-*.mjs" — the filter is deliberately loose (E-7.mjs and
// E-7-slug.mjs count too); sort is numeric-aware so E-10 runs after E-9.
const evalNum = (f) => Number((f.match(/^E-(\d+)/) || [])[1] ?? Infinity);
const evals = readdirSync(EVALS_DIR)
  .filter((f) => /^E-.*\.mjs$/.test(f))
  .sort((a, b) => evalNum(a) - evalNum(b) || a.localeCompare(b));

if (!evals.length) {
  console.error(`evals: no E-*.mjs files under ${EVALS_DIR}`);
  process.exit(1);
}

const forwarded = process.argv.slice(2);
const results = [];
for (const f of evals) {
  const r = spawnSync("node", [join(EVALS_DIR, f), ...forwarded], {
    stdio: "inherit",
    timeout: 300_000,
  });
  // status===0 is the only green; distinguish "asserted red" from
  // "never ran" (spawn error / signal kill) so CI logs stay diagnosable.
  if (r.error) console.error(`evals: ${f} failed to run: ${r.error.message}`);
  else if (r.signal) console.error(`evals: ${f} killed by signal ${r.signal}`);
  results.push({ eval: f, green: r.status === 0 });
}

const red = results.filter((r) => !r.green);
console.log("\n— eval summary —");
for (const r of results) console.log(`  ${r.green ? "GREEN" : "RED  "} ${r.eval}`);
console.log(`${results.length - red.length}/${results.length} green`);
process.exit(red.length ? 1 : 0);
