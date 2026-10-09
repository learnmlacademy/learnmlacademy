import assert from "node:assert/strict";
import fs from "node:fs/promises";

const modules = [
  "src/data/pdfRagSemanticCoreA.ts",
  "src/data/pdfRagSemanticCoreB.ts",
  "src/data/pdfRagSemanticScripts.ts",
  "src/data/pdfRagSemanticTestsA.ts",
  "src/data/pdfRagSemanticTestsB.ts",
];
const regex = /= (\{[\s\S]*\});\s*$/;
let checked = 0;
const visited = new Set();
for (const modulePath of modules) {
  const content = await fs.readFile(modulePath, "utf8");
  const match = content.match(regex);
  assert(match, "Could not parse source catalog " + modulePath);
  const source = JSON.parse(match[1]);
  for (const [path, expected] of Object.entries(source)) {
    assert(path.startsWith("projects/pdf-rag-assistant/") ||
      path === ".github/workflows/pdf-rag-engineering-verify.yml",
      "Unexpected source path: " + path);
    assert(!visited.has(path), "Duplicate code file: " + path);
    visited.add(path);
    const actual = await fs.readFile(path, "utf8");
    assert.equal(expected, actual, "Displayed learner code differs from source: " + path);
    checked++;
  }
}
assert(checked >= 30, "Expected full runnable source, test and workflow files");
console.log("verify:semantic-code PASS — " + checked + " full source files match the executable project.");
