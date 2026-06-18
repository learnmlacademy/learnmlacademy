import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { blogPosts } from '../data/blog';
import { Calendar, Clock, Tag, ArrowLeft, ArrowRight, Download } from 'lucide-react';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { TopMLAlgorithmsContent } from '../content/blog/top-ml-algorithms-explained';
import { MLInterviewPrepContent } from '../content/blog/ml-interview-prep-guide';
import { BlogContent_overfitting_underfitting_guide } from '../content/blog/overfitting-underfitting-guide';
import { BlogContent_feature_engineering_tips } from '../content/blog/feature-engineering-tips';
import { BlogContent_xgboost_vs_random_forest } from '../content/blog/xgboost-vs-random-forest';

// ─────────────────────────────────────────────────────────────────────────────
// BLOG CONTENT MAP
// When you add a new blog post:
// 1. Create the content file in src/content/blog/[slug].tsx
// 2. Import the component above
// 3. Add it to this map below with the slug as the key
// ─────────────────────────────────────────────────────────────────────────────
const contentMap: Record<string, React.ReactNode> = {
  'top-ml-algorithms-explained': <TopMLAlgorithmsContent />,
  'ml-interview-prep-guide': <MLInterviewPrepContent />,
  'overfitting-underfitting-guide': <BlogContent_overfitting_underfitting_guide />,
  'feature-engineering-tips': <BlogContent_feature_engineering_tips />,
  'xgboost-vs-random-forest': <BlogContent_xgboost_vs_random_forest />,
};

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | ML Academy Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) metaDesc.setAttribute('content', post.excerpt);
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post || !slug) return <Navigate to="/blog" />;

  const currentIdx = blogPosts.findIndex(p => p.slug === slug);
  const prevPost = currentIdx > 0 ? blogPosts[currentIdx - 1] : null;
  const nextPost = currentIdx < blogPosts.length - 1 ? blogPosts[currentIdx + 1] : null;
  const content = contentMap[slug];
  const categoryColors: Record<string, string> = {
    Algorithms: 'bg-indigo-100 text-indigo-700',
    Career: 'bg-emerald-100 text-emerald-700',
    Fundamentals: 'bg-amber-100 text-amber-700',
    'Data Science': 'bg-violet-100 text-violet-700',
  };
  const catColor = categoryColors[post.category] || 'bg-slate-100 text-slate-700';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
        <span>›</span>
        <Link to="/blog" className="hover:text-indigo-600 transition-colors">Blog</Link>
        <span>›</span>
        <span className="text-slate-600 truncate max-w-xs">{post.title}</span>
      </nav>

      {/* Post header */}
      <header className="mb-10">
        <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-4 ${catColor}`}>{post.category}</span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">{post.title}</h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-6">{post.excerpt}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 pb-6 border-b border-slate-100">
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4"/>{new Date(post.date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4"/>{post.readTime} min read</span>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1 bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded-full text-xs">
                <Tag className="w-2.5 h-2.5"/>{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* PDF download banner for interview post */}
      {slug === 'ml-interview-prep-guide' && (
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl p-6 mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="text-white font-bold text-lg">Free: ML Interview Cheatsheet PDF</p>
            <p className="text-indigo-200 text-sm">100 questions with detailed answers — download instantly</p>
          </div>
          <a href="/ML_Interview_Cheatsheet.pdf" download
            className="flex items-center gap-2 bg-white text-indigo-700 font-bold px-5 py-2.5 rounded-xl text-sm hover:bg-indigo-50 transition-colors flex-shrink-0">
            <Download className="w-4 h-4"/> Download Free PDF
          </a>
        </div>
      )}

      {/* Content or coming soon */}
      <article className="prose prose-slate prose-lg max-w-none">
        {content || (
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
            <div className="text-5xl mb-4">✍️</div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3">Article Coming Soon</h2>
            <p className="text-slate-500 mb-6">This article is being written. Subscribe to get notified when it goes live.</p>
          </div>
        )}
      </article>

      {/* Newsletter */}
      <div className="mt-12">
        <NewsletterSignup />
      </div>

      {/* Post navigation */}
      <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-8 gap-4">
        {prevPost ? (
          <Link to={`/blog/${prevPost.slug}`} className="group flex items-center gap-3 text-left max-w-xs">
            <ArrowLeft className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0 transition-colors"/>
            <div>
              <p className="text-xs text-slate-400 mb-1">Previous article</p>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors line-clamp-2">{prevPost.title}</p>
            </div>
          </Link>
        ) : <div/>}
        {nextPost && (
          <Link to={`/blog/${nextPost.slug}`} className="group flex items-center gap-3 text-right max-w-xs ml-auto">
            <div>
              <p className="text-xs text-slate-400 mb-1">Next article</p>
              <p className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors line-clamp-2">{nextPost.title}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 flex-shrink-0 transition-colors"/>
          </Link>
        )}
      </div>
    </div>
  );
}
