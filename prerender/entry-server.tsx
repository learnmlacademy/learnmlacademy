import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <main>Prerender diagnostic</main>
    </StaticRouter>,
  );
}
