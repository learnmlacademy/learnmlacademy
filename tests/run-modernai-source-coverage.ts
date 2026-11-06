import assert from "node:assert/strict";
import { curriculum } from "../src/data/curriculum.ts";
import {
  AGENTIC_LESSON_IDS,
  GENERATIVE_AI_LESSON_IDS,
  getAllVerifiedModernAIReferences,
} from "../src/content/modernai/verifiedLessonReferences.ts";

const referenceMap = getAllVerifiedModernAIReferences();
const expectedIds = [...AGENTIC_LESSON_IDS, ...GENERATIVE_AI_LESSON_IDS].sort();
const actualIds = Object.keys(referenceMap).sort();

assert.deepEqual(actualIds, expectedIds, "Every Agentic AI and GenAI curriculum lesson must have a curated source set");

const agenticCategory = curriculum.find((category) => category.id === "agentic-ai");
const genAiCategory = curriculum.find((category) => category.id === "generative-ai");
assert.ok(agenticCategory, "Agentic AI curriculum category must exist");
assert.ok(genAiCategory, "Generative AI curriculum category must exist");

const curriculumAgentIds = agenticCategory.subtopics.map((topic) => topic.id).sort();
const curriculumGenIds = genAiCategory.subtopics.map((topic) => topic.id).sort();
assert.deepEqual(curriculumAgentIds, [...AGENTIC_LESSON_IDS].sort(), "Source registry must match all 16 Agentic AI lessons");
assert.deepEqual(curriculumGenIds, [...GENERATIVE_AI_LESSON_IDS].sort(), "Source registry must match all 17 GenAI lessons");

let totalReferences = 0;
for (const [topicId, references] of Object.entries(referenceMap)) {
  assert.ok(references.length >= 2, `${topicId} must have at least two references`);
  const urls = references.map((reference) => reference.url);
  assert.equal(new Set(urls).size, urls.length, `${topicId} must not repeat a reference URL`);

  for (const reference of references) {
    assert.ok(reference.title.trim().length > 5, `${topicId} has an incomplete reference title`);
    assert.ok(reference.note.trim().length > 20, `${topicId} has an incomplete source note`);
    const parsed = new URL(reference.url);
    assert.equal(parsed.protocol, "https:", `${topicId} reference must use HTTPS: ${reference.url}`);
    assert.ok(parsed.hostname.length > 3, `${topicId} reference must have a valid host`);
    totalReferences += 1;
  }
}

// High-value source checks prevent quiet regressions in the exact gaps found during the audit.
assert(
  referenceMap["planning-reflection"].some((reference) => reference.url.includes("arxiv.org/abs/2210.03629")),
  "Planning/reflection must cite the original ReAct paper"
);
assert(
  referenceMap["tool-calling"].some((reference) => reference.url.includes("function-calling")),
  "Tool calling must cite current official function-calling documentation"
);
assert(
  referenceMap["agent-context-engineering"].some((reference) => reference.url.includes("token-counting")) &&
    referenceMap["agent-context-engineering"].some((reference) => reference.url.includes("compaction")),
  "Context engineering must cite exact token counting and compaction documentation"
);
assert(
  referenceMap["model-context-protocol"].some((reference) => reference.url.includes("/specification/2026-07-28")),
  "MCP must cite the current versioned protocol specification"
);
assert(
  referenceMap["controlling-diffusion-models"].some((reference) => reference.url.includes("2207.12598")) &&
    referenceMap["controlling-diffusion-models"].some((reference) => reference.url.includes("2302.05543")),
  "Diffusion control must cite classifier-free guidance and ControlNet research"
);
assert(
  referenceMap["responsible-generative-ai"].some((reference) => reference.url.includes("NIST.AI.600-1")) &&
    referenceMap["responsible-generative-ai"].some((reference) => reference.url.includes("owasp-genai-llm-top-10-2026")),
  "Responsible GenAI must cite NIST's GenAI profile and current OWASP LLM guidance"
);

console.log(`MODERN AI SOURCE COVERAGE PASS: ${AGENTIC_LESSON_IDS.length} Agentic AI lessons + ${GENERATIVE_AI_LESSON_IDS.length} GenAI lessons; ${totalReferences} lesson-level references.`);
