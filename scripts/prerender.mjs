import { createServer } from 'vite';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const [{ curriculum }, { blogPosts }, seo] = await Promise.all([
    vite.ssrLoadModule('/src/data/curriculum.ts'),
    vite.ssrLoadModule('/src/data/blog.ts'),
    vite.ssrLoadModule('/src/utils/seo.ts'),
  ]);

  const topicCount = curriculum.flatMap((category) => category.subtopics).length;
  if (topicCount !== 167) {
    throw new Error(`Expected 167 canonical lessons, found ${topicCount}.`);
  }
  if (!Array.isArray(blogPosts) || typeof seo.getSEOData !== 'function') {
    throw new Error('Prerender metadata modules did not load correctly.');
  }

  console.log(`prerender diagnostic: metadata loaded for ${topicCount} lessons and ${blogPosts.length} blog posts.`);
} finally {
  await vite.close();
}
