import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { getLearningResourceSchema, getTopicDateModified, seoData } from '../src/utils/seo.ts';
import { TOPIC_MODIFICATION_DATES } from '../src/utils/seoData.ts';
import { curriculum } from '../src/data/curriculum.ts';
import { blogPosts } from '../src/data/blog.ts';

const allTopics = curriculum.flatMap(category => category.subtopics);
assert.equal(allTopics.length, 167, 'Must have 167 curriculum topics');
assert.equal(Object.keys(TOPIC_MODIFICATION_DATES).length, 49, 'Only the 49 explicitly reviewed topic dates may be registered');
assert.equal(getTopicDateModified('rag'), '2026-10-16');
assert.equal(getTopicDateModified('linear-regression'), undefined, 'Topics without verified edit dates must not inherit a fallback');

// 1. Lesson SEO titles remain within the existing search-result title limit.
for (const [id, data] of Object.entries(seoData)) {
  assert(
    data.title.length <= 60,
    `SEO title exceeds 60 characters for topic ${id} (${data.title.length} chars): "${data.title}"`
  );
}
assert.equal(seoData['feature-selection']?.title, 'Feature Selection Techniques | LearnMLAcademy');
assert.equal(seoData['pretraining-finetuning']?.title, 'LLM Pretraining & Fine-Tuning | LearnMLAcademy');
assert.equal(seoData['agent-evaluation-safety']?.title, 'AI Agent Evaluation & Safety | LearnMLAcademy');

// 2. Every lesson schema uses exactly its verified date, or omits date fields.
const topicIds = new Set(allTopics.map(topic => topic.id));
for (const topicId of Object.keys(TOPIC_MODIFICATION_DATES)) {
  assert(topicIds.has(topicId), `Date registry contains unknown lesson id: ${topicId}`);
}
for (const topic of allTopics) {
  const expectedDate = getTopicDateModified(topic.id);
  const schema = JSON.parse(getLearningResourceSchema(
    topic.id,
    topic.title,
    'Test description that satisfies length requirements for test validation.',
    'Test Category',
    'Intermediate'
  ));
  const article = schema['@graph']?.find((item: any) => item['@type']?.includes('TechArticle'));
  assert.ok(article, `Missing article in schema for ${topic.id}`);
  assert.equal(article.dateModified, expectedDate, `Incorrect dateModified for ${topic.id}`);
  assert.equal(article.datePublished, undefined, `Unverified datePublished must be omitted for ${topic.id}`);
}

// 3. Sitemap retains every canonical URL and contains only the 49 verified lesson dates.
const sitemapPath = path.resolve('public/sitemap.xml');
assert(fs.existsSync(sitemapPath), 'public/sitemap.xml must exist');
const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
const sitemapEntries = [...sitemapXml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => {
  const block = match[1];
  return {
    url: block.match(/<loc>([^<]+)<\/loc>/)?.[1],
    lastmod: block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
  };
});
assert.equal(sitemapEntries.length, 201, 'Sitemap must retain all 201 canonical URLs');
const sitemapByUrl = new Map(sitemapEntries.map(entry => [entry.url, entry]));
assert.equal(sitemapByUrl.size, 201, 'Sitemap URLs must be unique');

for (const topic of allTopics) {
  const url = `https://www.learnmlacademy.com/learn/${topic.id}`;
  const entry = sitemapByUrl.get(url);
  assert(entry, `Missing lesson sitemap URL: ${url}`);
  assert.equal(entry.lastmod, getTopicDateModified(topic.id), `Sitemap date mismatch for ${topic.id}`);
}
for (const post of blogPosts) {
  const url = `https://www.learnmlacademy.com/blog/${post.slug}`;
  const entry = sitemapByUrl.get(url);
  assert(entry, `Missing blog sitemap URL: ${url}`);
  assert.equal(entry.lastmod, undefined, `Blog publication date must not be emitted as sitemap lastmod: ${post.slug}`);
}
const datedEntries = sitemapEntries.filter(entry => entry.lastmod);
assert.equal(datedEntries.length, 49, 'Sitemap must contain exactly 49 verified lastmod values');
for (const entry of datedEntries) {
  assert(/^\d{4}-\d{2}-\d{2}$/.test(entry.lastmod), `Invalid lastmod date: ${entry.lastmod}`);
  assert(!Number.isNaN(Date.parse(entry.lastmod)), `Unparseable lastmod date: ${entry.lastmod}`);
}

console.log('ALL SEO SCHEMA CONSISTENCY CHECKS PASS');
