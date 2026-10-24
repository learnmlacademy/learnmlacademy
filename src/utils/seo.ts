import { getQuizzesForTopicId, type QuizQuestion } from '../data/quizzes';
export { fitMetaDescription, seoData, getSEOData } from './seoData';

const BASE_URL = 'https://www.learnmlacademy.com';

export const getCanonicalUrl = (topicId?: string): string => {
  if (topicId) return `${BASE_URL}/learn/${topicId}`;
  return BASE_URL;
};

function getEducationalLevel(categoryTitle?: string, difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'): 'Beginner' | 'Intermediate' | 'Advanced' {
  if (difficulty === 'Beginner' || difficulty === 'Intermediate' || difficulty === 'Advanced') {
    return difficulty;
  }
  if (!categoryTitle) return 'Intermediate';
  const c = categoryTitle.toLowerCase();
  if (c.includes('foundation') || c.includes('python')) return 'Beginner';
  if (c.includes('deep learning') || c.includes('generative') || c.includes('large language') || c.includes('agentic') || c.includes('mlops') || c.includes('interview')) {
    return 'Advanced';
  }
  return 'Intermediate';
}

export const getLearningResourceSchema = (
  topicId: string,
  title: string,
  description: string,
  categoryTitle?: string,
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
): string => {
  const pageUrl = `${BASE_URL}/learn/${topicId}`;
  const cleanCategory = (categoryTitle || 'Machine Learning').replace(/^\d+\.\s*/, '');
  const educationalLevel = getEducationalLevel(categoryTitle, difficulty);
  const quizzes = getQuizzesForTopicId(topicId) || [];
  const faqQuestions = quizzes.slice(0, 5);

  const graph: any[] = [
    {
      "@type": ["TechArticle", "LearningResource"],
      "@id": `${pageUrl}#article`,
      "url": pageUrl,
      "headline": title,
      "name": title,
      "description": description,
      "educationalLevel": educationalLevel,
      "learningResourceType": "Tutorial",
      "inLanguage": "en-US",
      "isAccessibleForFree": true,
      "image": `${BASE_URL}/og-image.png`,
      "datePublished": "2026-01-15",
      "dateModified": "2026-03-28",
      "timeRequired": "PT12M",
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": pageUrl
      },
      "author": {
        "@type": "Person",
        "name": "Prateek Sharan",
        "url": `${BASE_URL}/about`
      },
      "publisher": {
        "@type": "Organization",
        "name": "LearnMLAcademy",
        "url": BASE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${BASE_URL}/favicon.svg`
        }
      },
      "teaches": title,
      "audience": {
        "@type": "EducationalAudience",
        "educationalRole": "student"
      }
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": BASE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Curriculum",
          "item": `${BASE_URL}/curriculum`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": cleanCategory,
          "item": `${BASE_URL}/curriculum`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": title,
          "item": pageUrl
        }
      ]
    }
  ];

  if (faqQuestions.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": faqQuestions.map((q) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${q.options[q.correctAnswerIndex]} — ${q.explanation}`
        }
      }))
    });
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph
  });
};
