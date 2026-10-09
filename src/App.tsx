import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GoogleAnalytics } from './components/GoogleAnalytics';
import { AppLayout } from './components/layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { ProgressProvider } from './context/ProgressContext';
import { ProjectLearningSupport } from './components/projects/ProjectLearningSupport';

const TopicPage = lazy(() => import('./pages/TopicPage').then(module => ({ default: module.TopicPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const CurriculumPage = lazy(() => import('./pages/CurriculumPage').then(module => ({ default: module.CurriculumPage })));
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));
const CheatsheetPage = lazy(() => import('./pages/CheatsheetPage').then(module => ({ default: module.CheatsheetPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then(module => ({ default: module.ProjectsPage })));
const TitanicProjectPage = lazy(() => import('./pages/TitanicProjectPage').then(module => ({ default: module.TitanicProjectPage })));
const HousePriceProjectPage = lazy(() => import('./pages/HousePriceProjectPage').then(module => ({ default: module.HousePriceProjectPage })));
const MovieRecommenderProjectPage = lazy(() => import('./pages/MovieRecommenderProjectPage').then(module => ({ default: module.MovieRecommenderProjectPage })));
const CreditCardFraudProjectPage = lazy(() => import('./pages/CreditCardFraudProjectPage').then(module => ({ default: module.CreditCardFraudProjectPage })));
const CustomerSegmentationProjectPage = lazy(() => import('./pages/CustomerSegmentationProjectPage').then(module => ({ default: module.CustomerSegmentationProjectPage })));
const PdfRagSemanticProjectPage = lazy(() => import("./pages/PdfRagSemanticProjectPage").then(module => ({ default: module.PdfRagSemanticProjectPage })));
const PdfRagProjectPage = lazy(() => import("./pages/PdfRagProjectPage").then(module => ({ default: module.PdfRagProjectPage })));
const AIContentCreatorProjectPage = lazy(() => import('./pages/AIContentCreatorProjectPage').then(module => ({ default: module.AIContentCreatorProjectPage })));
const AIResearchAssistantProjectPage = lazy(() => import('./pages/AIResearchAssistantProjectPage').then(module => ({ default: module.AIResearchAssistantProjectPage })));
const ModelToProductionProjectPage = lazy(() => import('./pages/ModelToProductionProjectPage').then(module => ({ default: module.ModelToProductionProjectPage })));
const RemainingProjectPage = lazy(() => import("./pages/RemainingProjectPage").then(module => ({ default: module.RemainingProjectPage })));
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
    <ProgressProvider>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="learn/:topicId" element={<DeferredRoute><TopicPage /></DeferredRoute>} />
          <Route path="curriculum" element={<DeferredRoute><CurriculumPage /></DeferredRoute>} />
          <Route path="about" element={<DeferredRoute><AboutPage /></DeferredRoute>} />
          <Route path="blog" element={<DeferredRoute><BlogPage /></DeferredRoute>} />
          <Route path="blog/:slug" element={<DeferredRoute><BlogPostPage /></DeferredRoute>} />
          <Route path="cheatsheet" element={<DeferredRoute><CheatsheetPage /></DeferredRoute>} />
          <Route path="projects" element={<DeferredRoute><ProjectsPage /></DeferredRoute>} />
          <Route path="projects/titanic-survival" element={<DeferredRoute><ProjectLearningSupport projectId="titanic-survival"><TitanicProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/house-price" element={<DeferredRoute><ProjectLearningSupport projectId="house-price"><HousePriceProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/movie-recommender" element={<DeferredRoute><ProjectLearningSupport projectId="movie-recommender"><MovieRecommenderProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/credit-card-fraud" element={<DeferredRoute><ProjectLearningSupport projectId="credit-card-fraud"><CreditCardFraudProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/customer-segmentation" element={<DeferredRoute><ProjectLearningSupport projectId="customer-segmentation"><CustomerSegmentationProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/pdf-rag" element={<DeferredRoute><ProjectLearningSupport projectId="pdf-rag"><PdfRagProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/pdf-rag/semantic" element={<DeferredRoute><PdfRagSemanticProjectPage /></DeferredRoute>} />
          <Route path="projects/ai-content-creator" element={<DeferredRoute><ProjectLearningSupport projectId="ai-content-creator"><AIContentCreatorProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/ai-research-assistant" element={<DeferredRoute><ProjectLearningSupport projectId="ai-research-assistant"><AIResearchAssistantProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/model-to-production" element={<DeferredRoute><ProjectLearningSupport projectId="model-to-production"><ModelToProductionProjectPage /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/retail-forecasting" element={<DeferredRoute><ProjectLearningSupport projectId="retail-forecasting"><RemainingProjectPage kind="retail-forecasting" /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/disaster-tweets" element={<DeferredRoute><ProjectLearningSupport projectId="disaster-tweets"><RemainingProjectPage kind="disaster-tweets" /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="projects/digit-recognizer" element={<DeferredRoute><ProjectLearningSupport projectId="digit-recognizer"><RemainingProjectPage kind="digit-recognizer" /></ProjectLearningSupport></DeferredRoute>} />
          <Route path="privacy" element={<DeferredRoute><PrivacyPolicyPage /></DeferredRoute>} />
          <Route path="terms" element={<DeferredRoute><TermsOfServicePage /></DeferredRoute>} />
          <Route path="disclaimer" element={<DeferredRoute><DisclaimerPage /></DeferredRoute>} />
        </Route>
      </Routes>
    </ProgressProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <GoogleAnalytics />
      <AppRoutes />
    </BrowserRouter>
  );
}
