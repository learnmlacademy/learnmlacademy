import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { preloadInitialRoute } from './utils/preloadInitialRoute';
import './index.css';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found.');
}

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

if (root.hasChildNodes()) {
  // The server-rendered page is already visible. Load only its route-specific
  // chunks before hydration to avoid initial Suspense fallbacks shifting layout.
  void preloadInitialRoute(window.location.pathname)
    .catch(error => {
      console.warn('Initial route preload failed; hydrating the rendered page anyway.', error);
    })
    .finally(() => {
      hydrateRoot(root, app);
    });
} else {
  createRoot(root).render(app);
}
