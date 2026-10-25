import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getLearningResourceSchema, getTopicDateModified } from '../src/utils/seo.ts';
import { curriculum } from '../src/data/curriculum.ts';

// 1. RAG topic schema dateModified matches sitemap lastmod of 2026-10-16
assert.equal(getTopicDateModified('rag'), '2026-10-16');

const schemaJson = getLearningResourceSchema(
  'rag',
  'Retrieval-Augmented Generation (RAG) Architecture | ML Academy',
  'Understand Retrieval-Augmented Generation (RAG): indexing vs query phases, source attribution, failure boundaries, diagrams, and self-check quiz.',
  'Large Language Models',
  'Advanced'
);

const schema = JSON.parse(schemaJson);
const article = schema['@graph']?.find((item: any) => item['@type']?.includes('TechArticle'));
assert.ok(article, 'Schema must contain TechArticle');
assert.equal(article.dateModified, '2026-10-16', 'RAG JSON-LD dateModified must be 2026-10-16');

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
