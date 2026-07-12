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
    excerpt: "Every ML model fails in one of two ways: it memorises the training data, or it never learns at all. Learn to spot each problem with learning curves and apply the right fix — regularisation, dropout, early stopping, and more.",
    category: "Fundamentals",
    readTime: 8,
    date: "2026-05-10",
    tags: ["overfitting", "regularisation", "model-evaluation", "bias-variance"],
  },
  {
    slug: "feature-engineering-tips",
    title: "6 Feature Engineering Techniques That Improve Any ML Model",
    excerpt: "Data beats algorithms. Learn the practical feature engineering tricks used by Kaggle grandmasters — missing value indicators, cyclical date encoding, target encoding, interaction features, and more.",
    category: "Data Science",
    readTime: 10,
    date: "2026-05-05",
    tags: ["feature-engineering", "pandas", "preprocessing", "tips"],
  },
  {
    slug: "xgboost-vs-random-forest",
    title: "XGBoost vs Random Forest: Which Should You Choose?",
    excerpt: "Both are powerful tree ensemble methods, but they work in completely different ways. This practical guide with code examples explains when to use each — and how to tune them properly.",
    category: "Algorithms",
    readTime: 11,
    date: "2026-04-28",
    tags: ["xgboost", "random-forest", "ensemble", "comparison"],
  },
  {
    slug: "what-is-rag",
    title: "What is RAG (Retrieval-Augmented Generation) and How Does It Work?",
    excerpt: "RAG gives language models the ability to look things up before answering — combining LLM reasoning with a live, updatable knowledge base. Learn the architecture, build it in Python, and understand when to use it and when not to.",
    category: "Generative AI",
    readTime: 14,
    date: "2026-07-03",
    tags: ["rag", "llm", "generative-ai", "langchain", "vector-database"],
    featured: true,
  },
];

export const blogCategories = [...new Set(blogPosts.map(p => p.category))];
