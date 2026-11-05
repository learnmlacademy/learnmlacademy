import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fitMetaDescription, getLearningResourceSchema, getTopicDateModified, seoData } from '../src/utils/seo.ts';
import { curriculum } from '../src/data/curriculum.ts';

// 1. RAG topic schema dateModified matches sitemap lastmod of 2026-10-16
assert.equal(getTopicDateModified('rag'), '2026-10-16');

const ragTitle = seoData['rag']?.title || 'Retrieval-Augmented Generation (RAG) | LearnMLAcademy';
assert(ragTitle.length <= 60, `RAG title exceeds 60 chars: ${ragTitle.length}`);

const schemaJson = getLearningResourceSchema(
  'rag',
  ragTitle,
  'Understand Retrieval-Augmented Generation (RAG): indexing vs query phases, source attribution, failure boundaries, diagrams, and self-check quiz.',
  'Large Language Models',
  'Advanced'
);

const schema = JSON.parse(schemaJson);
const article = schema['@graph']?.find((item: any) => item['@type']?.includes('TechArticle'));
assert.ok(article, 'Schema must contain TechArticle');
assert.equal(article.dateModified, '2026-10-16', 'RAG JSON-LD dateModified must be 2026-10-16');

// 1b. Validate all 167 lesson titles in seoData are <= 60 characters
for (const [id, data] of Object.entries(seoData)) {
  assert(
    data.title.length <= 60,
    `SEO title exceeds 60 characters for topic ${id} (${data.title.length} chars): "${data.title}"`
  );
}

// 1c. Validate specific reviewed titles
assert.equal(seoData['feature-selection']?.title, 'Feature Selection Techniques | LearnMLAcademy');
assert.equal(seoData['pretraining-finetuning']?.title, 'LLM Pretraining & Fine-Tuning | LearnMLAcademy');
assert.equal(seoData['agent-evaluation-safety']?.title, 'AI Agent Evaluation & Safety | LearnMLAcademy');

// 1d. Validate all 167 lesson meta descriptions are 130-155 chars with no dangling words
const DANGLING_WORD_REGEX = /\b(and|or|with|using|including|from|to|for|by|while|through|into|in|on|of|a|an|the)$/i;

assert.equal(Object.keys(seoData).length, 167, 'Must have exactly 167 topics in seoData');
for (const [id, data] of Object.entries(seoData)) {
  assert(
    data.description.length >= 130 && data.description.length <= 155,
    `SEO description length out of range [130, 155] for topic ${id} (${data.description.length} chars): "${data.description}"`
  );
  const trimmed = data.description.replace(/[.,;:!?-]+$/, '').trim();
  assert(
    !DANGLING_WORD_REGEX.test(trimmed),
    `SEO description ends with dangling word/preposition for topic ${id}: "${data.description}"`
  );
}

// 1e. Boundary and quality tests for fitMetaDescription
function validateDescriptionQuality(desc: string, isLesson: boolean = false) {
  if (isLesson && desc.length < 130) {
    throw new Error(`Description under 130 characters: ${desc.length}`);
  }
  if (desc.length > 155) {
    throw new Error(`Description exceeds 155 characters: ${desc.length}`);
  }
  const stripped = desc.replace(/[.,;:!?-]+$/, '').trim();
  if (DANGLING_WORD_REGEX.test(stripped)) {
    throw new Error(`Description ends with dangling word: "${desc}"`);
  }
  return true;
}

// Boundary: exactly 130 characters preserved
const exactly130 = 'A'.repeat(129) + '.';
assert.equal(exactly130.length, 130);
assert.equal(fitMetaDescription(exactly130), exactly130);
assert.doesNotThrow(() => validateDescriptionQuality(fitMetaDescription(exactly130), true));

// Boundary: exactly 155 characters preserved
const exactly155 = 'Learn machine learning foundations: ' + 'B'.repeat(118) + '.';
assert.equal(exactly155.length, 155);
assert.equal(fitMetaDescription(exactly155), exactly155);
assert.doesNotThrow(() => validateDescriptionQuality(fitMetaDescription(exactly155), true));

// Boundary: 156 characters trimmed to <= 155 without dangling prepositions
const over156 = 'Learn machine learning foundations with hands-on Python code, mathematical formulas, and worked exercises to master algorithms and build real models in code today!';
assert(over156.length > 155);
const fitted = fitMetaDescription(over156);
assert(fitted.length <= 155, `Fitted description exceeds 155: ${fitted.length}`);
assert.doesNotThrow(() => validateDescriptionQuality(fitted, false));

// Dangling word removal at sentence/phrase boundary
const danglingInput = 'Understand key deep learning concepts including neural networks, backpropagation, and loss functions with'.padEnd(160, ' extra information about models and training');
const fittedDangling = fitMetaDescription(danglingInput);
assert(fittedDangling.length <= 155);
assert.doesNotThrow(() => validateDescriptionQuality(fittedDangling, false));

// Negative tests: boundary enforcement catches invalid lengths and dangling prepositions
assert.throws(() => validateDescriptionQuality('Too short description for lesson.', true), /under 130/);
assert.throws(() => validateDescriptionQuality('X'.repeat(156), false), /exceeds 155/);
assert.throws(() => validateDescriptionQuality('A valid length string that unfortunately ends with a dangling preposition such as with', false), /dangling word/);
assert.throws(() => validateDescriptionQuality('A valid length string that unfortunately ends with a dangling conjunction such as and.', false), /dangling word/);

// 2. Non-RAG lessons do not blanket-inherit the RAG modification date
const foundationsDate = getTopicDateModified('linear-regression');
assert.equal(foundationsDate, '2026-03-28', 'Baseline curriculum topics should keep 2026-03-28');
assert.notEqual(foundationsDate, '2026-10-16', 'Baseline topics must not be overwritten with RAG date');

const agenticDate = getTopicDateModified('agentic-ai-intro');
assert.equal(agenticDate, '2026-09-28', 'Agentic AI topics should retain 2026-09-28');

const genAiDate = getTopicDateModified('generative-ai-intro');
assert.equal(genAiDate, '2026-09-27', 'Generative AI topics should retain 2026-09-27');

// 3. Every curriculum topic schema dateModified matches getTopicDateModified
const allTopics = curriculum.flatMap(c => c.subtopics);
assert.equal(allTopics.length, 167, 'Must have 167 curriculum topics');

for (const topic of allTopics) {
  const expectedDate = getTopicDateModified(topic.id);
  const schemaItemJson = getLearningResourceSchema(
    topic.id,
    topic.title,
    'Test description that satisfies length requirements for test validation.',
    'Test Category',
    'Intermediate'
  );
  const itemSchema = JSON.parse(schemaItemJson);
  const itemArticle = itemSchema['@graph']?.find((item: any) => item['@type']?.includes('TechArticle'));
  assert.ok(itemArticle, `Missing article in schema for ${topic.id}`);
  assert.equal(
    itemArticle.dateModified,
    expectedDate,
    `Schema dateModified for ${topic.id} (${itemArticle.dateModified}) must match getTopicDateModified (${expectedDate})`
  );
}

// 4. Check sitemap.xml if generated
const sitemapPath = path.resolve('public/sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const ragMatch = sitemapXml.match(/<loc>https:\/\/www\.learnmlacademy\.com\/learn\/rag<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/);
  assert.ok(ragMatch, 'sitemap.xml must have /learn/rag entry');
  assert.equal(ragMatch[1], '2026-10-16', 'sitemap.xml /learn/rag lastmod must be 2026-10-16');

  const linearMatch = sitemapXml.match(/<loc>https:\/\/www\.learnmlacademy\.com\/learn\/linear-regression<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/);
  assert.ok(linearMatch, 'sitemap.xml must have /learn/linear-regression entry');
  assert.equal(linearMatch[1], '2026-03-28', 'sitemap.xml linear-regression lastmod must be 2026-03-28');
}

console.log('ALL SEO SCHEMA CONSISTENCY CHECKS PASS');
