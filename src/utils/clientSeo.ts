import { getSEOData, fitMetaDescription } from './seoData';

export { getSEOData, fitMetaDescription };

export interface ClientMeta {
  title: string;
  description: string;
}

const BASE_URL = 'https://www.learnmlacademy.com';

export function getCanonicalUrl(topicId?: string): string {
  if (topicId) return `${BASE_URL}/learn/${topicId}`;
  return BASE_URL;
}

/**
 * Updates head metadata in the browser SPA without bundling heavy schema/quiz data.
 */
export function updateClientMeta({
  title,
  description,
  topicId,
  categoryTitle,
}: {
  title: string;
  description: string;
  topicId?: string;
  categoryTitle?: string;
}) {
  if (typeof document === 'undefined') return;

  document.title = title;

  const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', description);

  const canonicalUrl = getCanonicalUrl(topicId);
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  canonical.setAttribute('href', canonicalUrl);

  // OpenGraph tags
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', canonicalUrl);
  setMeta('meta[property="og:site_name"]', 'content', 'Learn ML Academy');
  setMeta('meta[property="og:type"]', 'content', 'article');
  setMeta('meta[property="og:image"]', 'content', `${BASE_URL}/og-image.png`);
  if (categoryTitle) {
    setMeta('meta[property="article:section"]', 'content', categoryTitle.replace(/^\d+\.\s*/, ''));
  }

  // Twitter Card tags
  setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', `${BASE_URL}/og-image.png`);
}
