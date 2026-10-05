// ─────────────────────────────────────────────────────────────────────────────
// BLOG DATA FILE — Add new blog posts here
//
// HOW TO ADD A NEW BLOG POST:
// 1. Add a new entry to the `blogPosts` array below
// 2. Create a new file in src/content/blog/ named [slug].tsx
// 3. Export a React component from that file
// 4. Import and add it to the contentMap in src/pages/BlogPostPage.tsx
//
// That's it — the post will automatically appear on the blog page,
// in the sidebar, in the sitemap, and get its own SEO meta tags.
// ─────────────────────────────────────────────────────────────────────────────

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  category: string;
  readTime: number;   // minutes
  date: string;       // "YYYY-MM-DD"
  tags: string[];
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "top-ml-algorithms-explained",
    title: "Top 10 Machine Learning Algorithms Every Data Scientist Should Know",
    seoTitle: "Top 10 Machine Learning Algorithms | Python Guide",
    excerpt: "A practical guide to the most important ML algorithms — what they do, when to use them, and how they compare. Includes Python code for each.",
    category: "Algorithms",
    readTime: 12,
    date: "2026-05-20",
    tags: ["algorithms", "beginner", "python", "scikit-learn"],
    featured: true,
  },
  {
    slug: "ml-interview-prep-guide",
    title: "Complete ML Interview Preparation Guide for FAANG Companies",
    seoTitle: "ML Interview Preparation Guide | Questions & Strategy",
    excerpt: "Everything you need to ace ML engineer interviews at Google, Amazon, Meta and Microsoft — from theory questions to system design.",
    category: "Career",
    readTime: 15,
    date: "2026-05-15",
    tags: ["interview", "career", "faang", "preparation"],
    featured: true,
  },
  // ── Add new blog posts below this line ────────────────────────────────────
  // Follow the HOW TO ADD A NEW BLOG POST guide at the top of this file.
  {
    slug: "overfitting-underfitting-guide",
    title: "Overfitting vs Underfitting: How to Diagnose and Fix Both",
    seoTitle: "Overfitting vs Underfitting | Diagnosis & Fixes",
    excerpt: "Learn to diagnose overfitting and underfitting with learning curves, then fix them using regularisation, dropout, early stopping, and other techniques.",
    category: "Fundamentals",
    readTime: 8,
    date: "2026-05-10",
    tags: ["overfitting", "regularisation", "model-evaluation", "bias-variance"],
  },
  {
    slug: "feature-engineering-tips",
    title: "6 Feature Engineering Techniques That Improve Any ML Model",
    seoTitle: "Feature Engineering Techniques for Better ML Models",
    excerpt: "Learn six practical feature engineering techniques for stronger ML models, including missing-value indicators, date encoding, target encoding, and interactions.",
    category: "Data Science",
    readTime: 10,
    date: "2026-05-05",
    tags: ["feature-engineering", "pandas", "preprocessing", "tips"],
  },
  {
    slug: "xgboost-vs-random-forest",
    title: "XGBoost vs Random Forest: Which Should You Choose?",
    excerpt: "Compare XGBoost and Random Forest, understand how they differ, when to use each model, and how to tune them effectively with practical code examples.",
    category: "Algorithms",
    readTime: 11,
    date: "2026-04-28",
    tags: ["xgboost", "random-forest", "ensemble", "comparison"],
  },
  {
    slug: "what-is-rag",
    title: "What is RAG (Retrieval-Augmented Generation) and How Does It Work?",
    seoTitle: "What Is RAG? Retrieval-Augmented Generation Explained",
    excerpt: "Learn how RAG combines LLMs with external knowledge, how its retrieval architecture works, how to build it in Python, and when to use it.",
    category: "Generative AI",
    readTime: 14,
    date: "2026-07-03",
    tags: ["rag", "llm", "generative-ai", "langchain", "vector-database"],
    featured: true,
  },
];

export const blogCategories = [...new Set(blogPosts.map(p => p.category))];
