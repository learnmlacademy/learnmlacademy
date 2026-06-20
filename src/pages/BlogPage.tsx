import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, ArrowRight, BookOpen, Rss } from 'lucide-react';
import { blogPosts, blogCategories, type BlogPost } from '../data/blog';
import { NewsletterSignup } from '../components/NewsletterSignup';

function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const categoryColors: Record<string, string> = {
    Algorithms: 'bg-indigo-100 text-indigo-700',
    Career: 'bg-emerald-100 text-emerald-700',
    Fundamentals: 'bg-amber-100 text-amber-700',
    'Data Science': 'bg-violet-100 text-violet-700',
  };
  const color = categoryColors[post.category] || 'bg-slate-100 text-slate-700';

  return (
    <Link to={`/blog/${post.slug}`}
      className={`group block bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`bg-gradient-to-br from-indigo-600 to-violet-700 ${featured ? 'h-40' : 'h-28'} flex items-end p-5`}>
        <span className={`text-xs font-bold px-3 py-1 rounded-full ${color} bg-opacity-90`}>{post.category}</span>
      </div>
      <div className="p-5">
        <h2 className={`font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug ${featured ? 'text-xl' : 'text-base'}`}>
          {post.title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Calendar className="w-3 h-3"/>{new Date(post.date).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3"/>{post.readTime} min read</span>
          </div>
          <span className="text-indigo-600 text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
            Read <ArrowRight className="w-3 h-3"/>
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.slice(0,3).map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-full">
              <Tag className="w-2.5 h-2.5"/>{tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', ...blogCategories];
  const filtered = activeCategory === 'All' ? blogPosts : blogPosts.filter(p => p.category === activeCategory);
  const featured = filtered.filter(p => p.featured);
  const rest = filtered.filter(p => !p.featured);

  useEffect(() => {
    document.title = 'ML Academy Blog | Machine Learning Tips, Guides & Career Advice';
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (el) el.setAttribute(attr, value);
    };
    const desc = 'Read the ML Academy blog for practical Machine Learning guides, algorithm comparisons, interview prep tips, and career advice for aspiring data scientists.';
    setMeta('meta[name="description"]', 'content', desc);
    setMeta('meta[property="og:title"]', 'content', 'ML Academy Blog');
    setMeta('meta[property="og:description"]', 'content', desc);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://www.learnmlacademy.com/blog');
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 text-indigo-600 font-semibold text-sm mb-3">
          <Rss className="w-4 h-4"/>
          <span>ML Academy Blog</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
          Tutorials, Tips &amp; Guides
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl">
          In-depth articles on machine learning, data science, Python and career advice. Published by practising ML engineers.
        </p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              activeCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-600'
            }`}>
            {cat}
          </button>
        ))}
      </div>

      {/* Featured posts */}
      {featured.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Featured</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {featured.map(post => <PostCard key={post.slug} post={post} featured />)}
          </div>
        </div>
      )}

      {/* All posts */}
      {rest.length > 0 && (
        <div className="mb-16">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">All Articles</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map(post => <PostCard key={post.slug} post={post} />)}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-40"/>
          <p className="text-lg">No articles in this category yet.</p>
        </div>
      )}

      {/* Newsletter */}
      <NewsletterSignup />
    </div>
  );
}
