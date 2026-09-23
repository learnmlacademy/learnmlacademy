import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';

const TopicPage = lazy(() => import('./pages/TopicPage').then(module => ({ default: module.TopicPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage').then(module => ({ default: module.CurriculumPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const CheatsheetPage = lazy(() => import('./pages/CheatsheetPage').then(module => ({ default: module.CheatsheetPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/legal/PrivacyPolicyPage').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsOfServicePage = lazy(() => import('./pages/legal/TermsOfServicePage').then(module => ({ default: module.TermsOfServicePage })));
const DisclaimerPage = lazy(() => import('./pages/legal/DisclaimerPage').then(module => ({ default: module.DisclaimerPage })));

function RouteFallback() {
  return (
    <div
      className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8"
      role="status"
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className="animate-pulse space-y-4">
        <div className="h-8 w-2/3 rounded bg-slate-200" />
        <div className="h-4 w-full rounded bg-slate-200" />
        <div className="h-4 w-5/6 rounded bg-slate-200" />
      </div>
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

function DeferredRoute({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="learn/:topicId" element={<DeferredRoute><TopicPage /></DeferredRoute>} />
        <Route path="curriculum" element={<DeferredRoute><CurriculumPage /></DeferredRoute>} />
        <Route path="about" element={<DeferredRoute><AboutPage /></DeferredRoute>} />
        <Route path="blog" element={<DeferredRoute><BlogPage /></DeferredRoute>} />
        <Route path="blog/:slug" element={<DeferredRoute><BlogPostPage /></DeferredRoute>} />
        <Route path="cheatsheet" element={<DeferredRoute><CheatsheetPage /></DeferredRoute>} />
        <Route path="privacy" element={<DeferredRoute><PrivacyPolicyPage /></DeferredRoute>} />
        <Route path="terms" element={<DeferredRoute><TermsOfServicePage /></DeferredRoute>} />
        <Route path="disclaimer" element={<DeferredRoute><DisclaimerPage /></DeferredRoute>} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
