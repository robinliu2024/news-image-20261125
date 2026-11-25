// Front page for Wednesday 25 November 2026, as a single image file.
// entry.png holds the whole entry. This script places an exact copy at
// /output/entry.png and then checks the copy against the original, byte
// for byte, so a truncated write is caught instead of graded.
// Runs are deterministic: the bytes copied never change, and nothing
// here touches the network or the clock. OUTPUT_DIR is a local-test
// override only; the grader always uses /output.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const repoDir = new URL(".", import.meta.url).pathname;
const imagePath = join(repoDir, "entry.png");
const outputDir = process.env.OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.png");

function placeFrontPage() {
  const image = readFileSync(imagePath);
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, image);
  const copy = readFileSync(outputPath);
  if (!copy.equals(image)) {
    throw new Error(`copy check failed for ${outputPath}`);
  }
  console.log(`front page placed at ${outputPath} (${image.length} bytes)`);
}

placeFrontPage();
