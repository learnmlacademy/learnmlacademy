import { createServer } from 'vite';

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'error',
});

try {
  const [{ curriculum }, { blogPosts }, seo, entry] = await Promise.all([
    vite.ssrLoadModule('/src/data/curriculum.ts'),
    vite.ssrLoadModule('/src/data/blog.ts'),
    vite.ssrLoadModule('/src/utils/seo.ts'),
    vite.ssrLoadModule('/prerender/entry-server.tsx'),
  ]);

  const topicCount = curriculum.flatMap((category) => category.subtopics).length;
  if (topicCount !== 167) {
    throw new Error(`Expected 167 canonical lessons, found ${topicCount}.`);
  }
  if (!Array.isArray(blogPosts) || typeof seo.getSEOData !== 'function') {
    throw new Error('Prerender metadata modules did not load correctly.');
  }
  if (typeof entry.render !== 'function') {
    throw new Error('Prerender server entry did not expose render().');
  }

  const homeHtml = await entry.render('/');
  if (typeof homeHtml !== 'string' || homeHtml.length < 500) {
    throw new Error('Home prerender returned unexpectedly little HTML.');
  }

  console.log(`prerender diagnostic: home rendered with ${homeHtml.length} characters.`);
} finally {
  await vite.close();
}
