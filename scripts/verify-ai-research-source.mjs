import assert from "node:assert/strict";
import fs from "node:fs/promises";

const path = "src/data/aiResearchSourceCode.ts";
const ts = await fs.readFile(path, "utf8");
const marker = "export const aiResearchSourceCode: Record<string, string> = ";
const index = ts.indexOf(marker);
assert(index >= 0, "Complete project code block is missing");
const raw = ts.slice(index + marker.length).trim();
assert(raw.endsWith(";"), "Invalid source catalog terminator");
const actual = JSON.parse(raw.slice(0, -1));
const paths = Object.keys(actual);
assert(paths.length >= 10, "Project 11 must expose every source and workflow file");
for (const file of paths) {
  assert(!file.startsWith("/") && !file.includes(".."), "Invalid source path");
  const disk = await fs.readFile(file, "utf8");
  assert.equal(actual[file], disk, "Handbook code differs from repository: " + file);
}
console.log("verify:research-source PASS — " + paths.length + " full executable source, tests and workflow files match the handbook.");
