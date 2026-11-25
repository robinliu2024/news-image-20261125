// News Image 20261125 — one image that sums up 25 November 2026 world news.
// The image lives in this repository as entry.png (1024x683 PNG, 860,062 bytes).
// A newspaper front page: masthead WORLD NEWS, dated Wednesday 25 November 2026,
// headline HUAWEI GUILTY ON 10 COUNTS, plus six panels — Shanghai chief probed,
// Colombia hostages, Hanoi blast, Russian jets near Korea, Senegal champions again,
// Odesa strike kills 2.
// This program does nothing but copy those exact bytes to /output/entry.png,
// so every run produces identical output. No network access, no randomness.
// After the copy it reads the output back and compares it byte for byte with
// the source, so a short or corrupt write fails loudly instead of slipping by.
// The OUTPUT_DIR variable exists only for local testing; the harness always
// writes to /output, which is the default when it is unset.
import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");
const outDir = process.env.OUTPUT_DIR ?? "/output";
const target = join(outDir, "entry.png");

mkdirSync(outDir, { recursive: true });
copyFileSync(source, target);

const wanted = readFileSync(source);
const got = readFileSync(target);
if (!wanted.equals(got)) {
  throw new Error(
    `output mismatch: ${target} is ${got.length} bytes, expected ${wanted.length} bytes from ${source}`,
  );
}
console.log(`wrote ${target} (${got.length} bytes, byte-identical to entry.png)`);
