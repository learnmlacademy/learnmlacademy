import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");
const standardLibrary = new Set([
  "collections", "hashlib", "html", "json", "math", "pathlib",
  "random", "re", "sqlite3", "tempfile",
]);

test("49 Modern AI labs remain standard-library-only and use no external services", async () => {
  const paths = [
    "../src/content/modernai/agenticTutorialLabs.json",
    "../src/content/modernai/genaiTutorialLabs.json",
    "../src/content/modernai/llmTutorialLabs.json",
  ];
  const groups = await Promise.all(paths.map(async (path) => JSON.parse(await read(path))));
  assert.deepEqual(groups.map((group) => Object.keys(group).length), [16, 17, 16]);
  const allLabs = groups.flatMap((group) => Object.entries(group));
  assert.equal(allLabs.length, 49);

  for (const [topicId, lesson] of allLabs) {
    assert.equal(typeof lesson.code, "string", topicId + ": missing Python code");
    assert.equal(typeof lesson.output, "string", topicId + ": missing expected output");
    const imports = [
      ...lesson.code.matchAll(/^\s*(?:from\s+([A-Za-z_][A-Za-z0-9_.]*)\s+import|import\s+([A-Za-z_][A-Za-z0-9_.]*))/gm),
    ].map((match) => (match[1] || match[2]).split(".")[0]);
    for (const name of imports) {
      assert(standardLibrary.has(name), topicId + ": non-standard-library import " + name);
    }
    assert(!/\b(?:requests|urllib|httpx|aiohttp|socket|subprocess)\b/.test(lesson.code), topicId + ": external network/process API found");
    assert(!/\b(?:https?:\/\/|micropip\.install)\b/.test(lesson.code), topicId + ": external dependency or URL found");
  }
});

test("Pyodide runtime is pinned, lazy, and package loading is allowlisted", async () => {
  const worker = await read("../public/python-worker.js");
  const hook = await read("../src/hooks/usePyodideWorker.ts");
  const component = await read("../src/components/interactive/PythonCodeRunner.tsx");
  const config = JSON.parse(await read("../vercel.json"));

  assert.match(worker, /cdn\.jsdelivr\.net\/pyodide\/v314\.0\.7\/full\/pyodide\.mjs/);
  assert.match(worker, /new Set\(\["numpy", "pandas", "scikit-learn", "matplotlib"\]\)/);
  assert.match(worker, /pyodide\.loadPackage\(missingPackages\)/);
  assert.doesNotMatch(worker, /micropip\.install/);
  assert.match(hook, /new Worker\("\/python-worker\.js",\s*\{\s*type: "module"/);
  assert.match(hook, /EXECUTION_TIMEOUT_MS = 5000/);
  assert.match(hook, /MAX_CODE_CHARS = 32000/);
  assert.match(hook, /INITIALIZATION_TIMEOUT_MS = 120000/);
  assert.match(component, /Run Code/);
  assert.match(component, /data-python-runner/);

  const workerHeaders = config.headers.find((item) => item.source === "/python-worker.js");
  assert(workerHeaders, "Dedicated Worker response headers are required");
  const policy = workerHeaders.headers.find((item) => item.key.toLowerCase() === "content-security-policy")?.value || "";
  assert.match(policy, /default-src 'none'/);
  assert.match(policy, /script-src https:\/\/cdn\.jsdelivr\.net 'wasm-unsafe-eval'/);
  assert.match(policy, /connect-src https:\/\/cdn\.jsdelivr\.net(?:;|$)/);
  assert.doesNotMatch(policy, /connect-src[^;]*(?:'self'|\*)/);
});

test("Phase 1 execution is wired to real lesson routes, with the invalid roadmap slug removed", async () => {
  const targets = {
    "what-is-ml": "../src/content/foundations/WhatIsMLContent.tsx",
    "linear-regression": "../src/content/supervised/LinearRegressionContent.tsx",
    "train-test-split": "../src/content/evaluation/TrainTestSplitContent.tsx",
    "decision-trees": "../src/content/supervised/DecisionTreesContent.tsx",
    "kmeans": "../src/content/unsupervised/KMeansContent.tsx",
    "logistic-regression": "../src/content/supervised/LogisticRegressionContent.tsx",
    "roc-auc": "../src/content/evaluation/RocAucContent.tsx",
    "confusion-matrix": "../src/content/evaluation/ConfusionMatrixContent.tsx",
    "knn": "../src/content/supervised/KNNContent.tsx",
    "pca": "../src/content/unsupervised/PCAContent.tsx",
  };
  for (const [id, path] of Object.entries(targets)) {
    const source = await read(path);
    assert(source.includes("PythonCodeRunner") || source.includes("executionPackages"), id + ": missing Python execution control");
  }
  const roadmap = await read("../docs/MASTER_EXECUTION_PLAN.md");
  const phaseOneLine = roadmap.split("\n").find((line) => line.trim().startsWith("- Phase 1:"));
  assert(phaseOneLine, "The Phase 1 lesson list must be present");
  const phaseOneSlugs = [...phaseOneLine.matchAll(/`([^`]+)`/g)].map((match) => match[1]);
  assert.deepEqual(phaseOneSlugs, [
    "what-is-ml", "linear-regression", "train-test-split", "decision-trees", "kmeans",
    "logistic-regression", "roc-auc", "confusion-matrix", "knn", "pca",
  ], "Phase 1 must use ten real curriculum lesson slugs and replace the invalid evaluation-metrics slug");
});
