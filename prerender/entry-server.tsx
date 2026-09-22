import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppRoutes } from '../src/App';

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    let html = '';
    let settled = false;

    output.setEncoding('utf8');
    output.on('data', (chunk) => {
      html += chunk;
    });
    output.on('end', () => {
      if (!settled) {
        settled = true;
        resolve(html);
      }
    });
    output.on('error', (error) => {
      if (!settled) {
        settled = true;
        reject(error);
      }
    });

    const { pipe, abort } = renderToPipeableStream(
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>,
      {
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
          console.error(`Prerender React error for ${url}:`, error);
        },
      },
    );

    setTimeout(() => {
      if (!settled) {
        abort();
        settled = true;
        reject(new Error(`Prerender timed out for ${url}`));
      }
    }, 30000);
  });
}
