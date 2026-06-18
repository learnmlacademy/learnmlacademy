# How to Add a New Blog Post

Adding a new blog post takes 3 simple steps. No coding expertise needed.

---

## Step 1 — Add post metadata to `src/data/blog.ts`

Open `src/data/blog.ts` and add a new entry to the `blogPosts` array:

```typescript
{
  slug: "your-post-url-slug",           // URL: /blog/your-post-url-slug
  title: "Your Post Title Here",
  excerpt: "A 1-2 sentence summary shown on the blog listing page.",
  category: "Algorithms",               // Choose: Algorithms, Career, Fundamentals, Data Science
  readTime: 8,                          // Estimated reading time in minutes
  date: "2026-06-01",                   // Publication date YYYY-MM-DD
  tags: ["tag1", "tag2", "tag3"],       // 3-5 relevant tags
  featured: true,                       // Optional: shows in Featured section
},
```

---

## Step 2 — Create the content file

Create a new file: `src/content/blog/your-post-url-slug.tsx`

Use this template:

```tsx
import React from 'react';

export function YourPostNameContent() {
  return (
    <div className="space-y-6">
      <p className="text-xl text-slate-600 leading-relaxed">
        Your introduction paragraph here...
      </p>

      <h2 className="text-2xl font-bold text-slate-900">Section Heading</h2>
      <p className="text-slate-700 leading-relaxed">
        Your content here...
      </p>

      {/* Code block example */}
      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">example.py</div>
        <pre className="text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto">{`
import numpy as np
# Your code here
        `}</pre>
      </div>

      {/* Tip box example */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-4">
        <p className="font-bold text-amber-800 mb-1">💡 Pro tip</p>
        <p className="text-amber-700 text-sm">Your tip here...</p>
      </div>
    </div>
  );
}
```

---

## Step 3 — Register in `src/pages/BlogPostPage.tsx`

Open `src/pages/BlogPostPage.tsx` and:

**Add the import** at the top (with other imports):
```typescript
import { YourPostNameContent } from '../content/blog/your-post-url-slug';
```

**Add to the contentMap** (look for the comment `// Add new posts here:`):
```typescript
'your-post-url-slug': <YourPostNameContent />,
```

---

## That's it!

Your post will automatically appear:
- ✅ On the /blog listing page
- ✅ At /blog/your-post-url-slug
- ✅ In the sidebar navigation
- ✅ With its own SEO title and meta description
- ✅ With prev/next post navigation

---

## Adding a new category

Open `src/data/blog.ts` — categories are auto-generated from the `category` field of your posts. Just use a new category name and it will appear in the filter automatically.

---

## Tips for writing good ML blog posts

- **Target a specific question** people search on Google (e.g. "xgboost vs random forest which is better")
- **Always include Python code** — it dramatically improves time-on-page
- **Add a visual diagram** if explaining a concept (use the MLDiagrams components)
- **Keep it practical** — what problem does this solve? When would a practitioner use this?
- **Link to related tutorials** in your site — e.g. "See our full XGBoost tutorial →"
- **Aim for 1,200-2,000 words** — this is the sweet spot for Google ranking

