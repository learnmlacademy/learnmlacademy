import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router';

export function render(url: string): Promise<string> {
  const app = (
    <StaticRouter location={url}>
      <main>Prerender stream diagnostic</main>
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
