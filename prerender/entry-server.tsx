import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { Route, Routes, StaticRouter } from 'react-router';

async function routeElement(url: string) {
  if (url === '/') {
    const { HomePage } = await import('../src/pages/HomePage');
    return { kind: 'index' as const, element: <HomePage /> };
  }
  if (url.startsWith('/learn/')) {
    const { TopicPage } = await import('../src/pages/TopicPage');
    return { kind: 'path' as const, path: 'learn/:topicId', element: <TopicPage /> };
  }
  if (url === '/curriculum') {
    const { CurriculumPage } = await import('../src/pages/CurriculumPage');
    return { kind: 'path' as const, path: 'curriculum', element: <CurriculumPage /> };
  }
  if (url === '/about') {
    const { AboutPage } = await import('../src/pages/AboutPage');
    return { kind: 'path' as const, path: 'about', element: <AboutPage /> };
  }
  if (url === '/blog') {
    const { BlogPage } = await import('../src/pages/BlogPage');
    return { kind: 'path' as const, path: 'blog', element: <BlogPage /> };
  }
  if (url.startsWith('/blog/')) {
    const { BlogPostPage } = await import('../src/pages/BlogPostPage');
    return { kind: 'path' as const, path: 'blog/:slug', element: <BlogPostPage /> };
  }
  if (url === '/cheatsheet') {
    const { CheatsheetPage } = await import('../src/pages/CheatsheetPage');
    return { kind: 'path' as const, path: 'cheatsheet', element: <CheatsheetPage /> };
  }
  if (url === '/privacy') {
    const { PrivacyPolicyPage } = await import('../src/pages/legal/PrivacyPolicyPage');
    return { kind: 'path' as const, path: 'privacy', element: <PrivacyPolicyPage /> };
  }
  if (url === '/terms') {
    const { TermsOfServicePage } = await import('../src/pages/legal/TermsOfServicePage');
    return { kind: 'path' as const, path: 'terms', element: <TermsOfServicePage /> };
  }
  if (url === '/disclaimer') {
    const { DisclaimerPage } = await import('../src/pages/legal/DisclaimerPage');
    return { kind: 'path' as const, path: 'disclaimer', element: <DisclaimerPage /> };
  }
  throw new Error(`No prerender route for ${url}`);
}

export async function render(url: string): Promise<string> {
  const [{ AppLayout }, route] = await Promise.all([
    import('../src/components/layout/AppLayout'),
    routeElement(url),
  ]);

  const app = (
    <StaticRouter location={url}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          {route.kind === 'index'
            ? <Route index element={route.element} />
            : <Route path={route.path} element={route.element} />}
        </Route>
      </Routes>
    </StaticRouter>
  );

  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    let html = '';
    let settled = false;
    let firstError: unknown = null;

    output.setEncoding('utf8');
    output.on('data', (chunk) => {
      html += chunk;
    });
    output.on('end', () => {
      if (settled) return;
      settled = true;
      if (firstError) reject(firstError);
      else resolve(html);
    });
    output.on('error', (error) => {
      if (!settled) {
        settled = true;
        reject(error);
      }
    });

    const { pipe, abort } = renderToPipeableStream(app, {
      onAllReady() {
        pipe(output);
      },
      onShellError(error) {
        if (!settled) {
          settled = true;
          reject(error);
        }
      },
      onError(error) {
        firstError ??= error;
        console.error(`Prerender React error for ${url}:`, error);
      },
    });

    setTimeout(() => {
      if (!settled) {
        abort();
        settled = true;
        reject(new Error(`Prerender timed out for ${url}`));
      }
    }, 30000);
  });
}
