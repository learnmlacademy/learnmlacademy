const exactRoutePreloaders: Record<string, () => Promise<unknown>> = {
  "/curriculum": () => import("../pages/CurriculumPage"),
  "/about": () => import("../pages/AboutPage"),
  "/blog": () => import("../pages/BlogPage"),
  "/cheatsheet": () => import("../pages/CheatsheetPage"),
  "/projects": () => import("../pages/ProjectsPage"),
  "/projects/titanic-survival": () => import("../pages/TitanicProjectPage"),
  "/projects/house-price": () => import("../pages/HousePriceProjectPage"),
  "/projects/movie-recommender": () => import("../pages/MovieRecommenderProjectPage"),
  "/projects/credit-card-fraud": () => import("../pages/CreditCardFraudProjectPage"),
  "/projects/customer-segmentation": () => import("../pages/CustomerSegmentationProjectPage"),
  "/projects/pdf-rag/semantic": () => import("../pages/PdfRagSemanticProjectPage"),
  "/projects/pdf-rag": () => import("../pages/PdfRagProjectPage"),
  "/projects/ai-content-creator": () => import("../pages/AIContentCreatorProjectPage"),
  "/projects/ai-research-assistant": () => import("../pages/AIResearchAssistantProjectPage"),
  "/projects/model-to-production": () => import("../pages/ModelToProductionProjectPage"),
  "/projects/retail-forecasting": () => import("../pages/RemainingProjectPage"),
  "/projects/disaster-tweets": () => import("../pages/RemainingProjectPage"),
  "/projects/digit-recognizer": () => import("../pages/RemainingProjectPage"),
  "/contact": () => import("../pages/ContactPage"),
  "/privacy": () => import("../pages/legal/PrivacyPolicyPage"),
  "/terms": () => import("../pages/legal/TermsOfServicePage"),
  "/disclaimer": () => import("../pages/legal/DisclaimerPage"),
};

/**
 * Load the prerendered page's route and its content-bearing lazy chunks before
 * hydration starts. This keeps the server-rendered HTML in place instead of
 * briefly replacing a full page with a Suspense fallback on the first frame.
 */
export async function preloadInitialRoute(pathname: string): Promise<void> {
  const normalizedPath = pathname.replace(/\\/+$/, "") || "/";

  if (normalizedPath.startsWith("/learn/")) {
    const topicId = decodeURIComponent(normalizedPath.slice("/learn/".length).split("/")[0]);
    const [topicPageModule, curriculumModule, lessonRegistryModule] = await Promise.all([
      import("../pages/TopicPage"),
      import("../data/curriculum"),
      import("../content/LessonContentRegistry"),
    ]);

    // Keep the route module import explicit so bundlers can statically analyze it.
    void topicPageModule;
    const topic = curriculumModule.getTopicById(topicId);
    if (topic) {
      await lessonRegistryModule.preloadLessonContent(topic.category.id, topicId);
    }
    return;
  }

  const loader =
    exactRoutePreloaders[normalizedPath] ??
    (normalizedPath.startsWith("/blog/") ? () => import("../pages/BlogPostPage") : undefined);

  if (loader) await loader();
}
