import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { TopicPage } from './pages/TopicPage';
import { PrivacyPolicyPage } from './pages/legal/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/legal/TermsOfServicePage';
import { DisclaimerPage } from './pages/legal/DisclaimerPage';
import { AboutPage } from './pages/AboutPage';
import { CurriculumPage } from './pages/CurriculumPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { CheatsheetPage } from './pages/CheatsheetPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="learn/:topicId" element={<TopicPage />} />
          <Route path="curriculum" element={<CurriculumPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="cheatsheet" element={<CheatsheetPage />} />
          <Route path="privacy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsOfServicePage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
