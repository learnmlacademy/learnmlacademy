import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import { createPrerenderServer, loadPages, outputPathForRoute } from './prerender.mjs';
import {
  extractEducationalContent,
  MANIFEST_PATH,
} from './generate-content-preservation-manifest.mjs';
import {
  comparePageContent,
  compareTopicQuizzes,
  verifyProtectedAssetsWithProvider,
  matchMultiset,
} from './preservation-engine.mjs';
import {
  createStorageProvider,
  StorageProvider,
  LocalStorageProvider,
  PrivateObjectStorageProvider,
} from './storage-provider.mjs';

// Re-export shared functions and classes for backward compatibility
export {
  comparePageContent,
  compareTopicQuizzes,
  comparePageContent as verifyPageContent,
  compareTopicQuizzes as verifyTopicQuizzes,
  matchMultiset,
  createStorageProvider,
  StorageProvider,
  LocalStorageProvider,
  PrivateObjectStorageProvider,
};

/**
 * Resolves the physical path of a protected document via the active StorageProvider.
 */
export function resolveAssetPath(asset, baseDir = process.cwd()) {
  const provider = new LocalStorageProvider(baseDir);
  return provider.getAssetLocation(asset);
}

/**
 * Verifies that all protected assets (PDFs and ZIPs) exist, have expected sizes,
 * and match their cryptographic SHA-256 fingerprints using StorageProvider.
 */
export async function verifyProtectedAssets(manifest, baseDir = process.cwd()) {
  const provider = createStorageProvider('local', { baseDir });
  return await verifyProtectedAssetsWithProvider(manifest, provider);
}

/**
 * Verifies sitemap.xml and vercel.json redirect preservation.
 */
export async function verifySitemapAndRedirects(manifest, baseDir = process.cwd()) {
  const violations = [];

  const sitemapPath = path.resolve(baseDir, 'public/sitemap.xml');
  try {
    const sitemapXml = await fs.readFile(sitemapPath, 'utf8');
    const sitemapUrls = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

    if (sitemapUrls.length < manifest.totalPages) {
      violations.push(
        `Sitemap URL count decreased: baseline had ${manifest.totalPages}, current has ${sitemapUrls.length}`
      );
    }

    // Verify all baseline routes exist in sitemap
    for (const [route] of Object.entries(manifest.pages)) {
      const expectedUrl = route === '/' ? 'https://www.learnmlacademy.com/' : `https://www.learnmlacademy.com${route}`;
      if (!sitemapUrls.includes(expectedUrl)) {
        violations.push(`Sitemap missing baseline route: ${expectedUrl}`);
      }
    }
  } catch (err) {
    violations.push(`Failed to verify sitemap.xml: ${err.message}`);
  }

  const vercelPath = path.resolve(baseDir, 'vercel.json');
  try {
    const vercelJson = JSON.parse(await fs.readFile(vercelPath, 'utf8'));
    if (!Array.isArray(vercelJson.redirects) || vercelJson.redirects.length < 33) {
      violations.push(
        `Vercel redirects reduced: expected at least 33, found ${vercelJson.redirects?.length || 0}`
      );
    }
  } catch (err) {
    violations.push(`Failed to verify vercel.json: ${err.message}`);
  }

  return violations;
}

export async function verifyContentPreservation() {
  console.log('Validating content preservation against baseline manifest...');

  let manifestRaw;
  try {
    manifestRaw = await fs.readFile(MANIFEST_PATH, 'utf8');
  } catch {
    throw new Error(
      `Missing preservation manifest at ${MANIFEST_PATH}. Run 'npm run update:content-preservation' to generate it.`
    );
  }
  const manifest = JSON.parse(manifestRaw);

  const failures = [];

  // 1. Verify protected assets using StorageProvider
  const storageProvider = createStorageProvider();
  const assetViolations = await verifyProtectedAssetsWithProvider(manifest, storageProvider);
  failures.push(...assetViolations);

  // 2. Verify sitemap and redirects
  const sitemapViolations = await verifySitemapAndRedirects(manifest);
  failures.push(...sitemapViolations);

  // 3. Verify prerendered pages
  const vite = await createPrerenderServer();
  try {
    const pages = await loadPages(vite);

    // Support additional pages: page count must be >= baseline totalPages
    if (pages.length < manifest.totalPages) {
      failures.push(
        `Canonical page route count decreased: baseline had ${manifest.totalPages}, current has ${pages.length}`
      );
    }

    const { getQuizzesForTopicId } = await vite.ssrLoadModule('/src/data/quizzes.ts');

    // Verify that every single baseline route remains present
    for (const [route, baseline] of Object.entries(manifest.pages)) {
      const pageExists = pages.some(p => p.route === route);
      if (!pageExists) {
        failures.push(`${route}: Route was removed or replaced.`);
        continue;
      }

      const htmlPath = outputPathForRoute(route);
      let html;
      try {
        html = await fs.readFile(htmlPath, 'utf8');
      } catch {
        failures.push(`${route}: Prerendered HTML file missing at ${htmlPath}`);
        continue;
      }

      const current = extractEducationalContent(html, route);
      const pageViolations = comparePageContent(current, baseline, route);
      failures.push(...pageViolations);

      // Quiz verification for lessons
      if (baseline.quizzes && baseline.quizzes.length > 0) {
        const topicId = route.replace(/^\/learn\//, '');
        const currentQuizzes = (getQuizzesForTopicId(topicId) || []).map(q => ({
          id: q.id,
          question: q.question.trim(),
          options: q.options.map(o => o.trim()),
          correctAnswerIndex: q.correctAnswerIndex,
          explanation: q.explanation.trim(),
        }));
        const quizViolations = compareTopicQuizzes(currentQuizzes, baseline.quizzes, route);
        failures.push(...quizViolations);
      }
    }
  } finally {
    await vite.close();
  }

  if (failures.length > 0) {
    console.error(`\n❌ CONTENT PRESERVATION TEST FAILED with ${failures.length} violation(s):\n`);
    for (const f of failures.slice(0, 30)) {
      console.error(`  - ${f}`);
    }
    if (failures.length > 30) {
      console.error(`  ... and ${failures.length - 30} more violations.`);
    }
    process.exit(1);
  }

  console.log(
    `verify:content-preservation PASS — All ${manifest.totalPages} baseline pages verified; 0 character regressions; 100% headings, paragraphs, list items, captions, code blocks, tables, formulas, figures, and quizzes preserved.`
  );
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  await verifyContentPreservation();
}
