import test from "node:test";
import assert from "node:assert/strict";
import { execSync } from "node:child_process";

const root = process.cwd();

test("all 16 Agentic AI and 17 GenAI lessons expose curated primary or official sources", () => {
  const output = execSync("npx tsx tests/run-modernai-source-coverage.ts", {
    cwd: root,
    encoding: "utf8",
  });
  assert.match(
    output,
    /MODERN AI SOURCE COVERAGE PASS: 16 Agentic AI lessons \+ 17 GenAI lessons; \d+ lesson-level references\./,
    "Modern AI lesson source coverage must pass",
  );
});
