import assert from "node:assert/strict";
import fs from "node:fs/promises";

const path = "src/data/aiContentStudioSourceCode.ts";
const source = await fs.readFile(path, "utf8");
const marker = "export const aiContentStudioSourceCode: Record<string, string> = ";
const start = source.indexOf(marker);
assert(start >= 0, "Website handbook source map is missing");
const raw = source.slice(start + marker.length).trim();
assert(raw.endsWith(";"), "Incomplete source map");
const files = JSON.parse(raw.slice(0, -1));
const paths = Object.keys(files);
assert(paths.length >= 10, "Need all app, tests, dependencies and CI files");
for (const name of paths) {
  assert(!name.includes("..") && !name.startsWith("/"), "Invalid source path");
  assert.equal(files[name], await fs.readFile(name, "utf8"),
               "The website copy differs from executable file: " + name);
}
console.log("verify:content-source PASS — " + paths.length + " full code/config files identical.");
