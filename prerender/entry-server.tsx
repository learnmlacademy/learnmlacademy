import { prerenderToNodeStream } from 'react-dom/static';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from '../src/App';

export async function render(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new Error(`Prerender timed out for ${url}`)), 30000);
  const errors: unknown[] = [];

  try {
    // Wait for lazy lesson components. A streaming SSR shell can otherwise leave
    // content in hidden segments that need JavaScript to reveal it.
    const { prelude, postponed } = await prerenderToNodeStream(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
      {
        signal: controller.signal,
        // These are complete static files, not progressively streamed responses.
        // Keep even long lessons inline instead of emitting hidden script-revealed chunks.
        progressiveChunkSize: Number.MAX_SAFE_INTEGER,
        onError(error) {
          errors.push(error);
          console.error(`Prerender React error for ${url}:`, error);
        },
      },
    );

    let html = '';
    prelude.setEncoding('utf8');
    for await (const chunk of prelude) html += chunk;
    if (errors.length) throw new AggregateError(errors, `Prerender failed for ${url}`);
    if (controller.signal.aborted || postponed) throw new Error(`Incomplete prerender for ${url}`);
    return html;
  } finally {
    clearTimeout(timeout);
  }
}
