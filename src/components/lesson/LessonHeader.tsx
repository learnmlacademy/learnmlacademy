import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  Clock,
  BookOpen,
  Calendar,
  Share2,
  Check,
  CheckCircle2,
  Compass,
  Sparkles,
} from 'lucide-react';

type LessonHeaderProps = {
  title: string;
  description: string;
  category: string;
  module?: string;
  topicId?: string;
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  readTimeMinutes?: number;
};

// Helper to determine difficulty based on category
function getDifficultyLevel(category: string, override?: string): 'Beginner' | 'Intermediate' | 'Advanced' {
  if (override === 'Beginner' || override === 'Intermediate' || override === 'Advanced') {
    return override;
  }
  const cat = category.toLowerCase();
  if (cat.includes('foundation') || cat.includes('python')) return 'Beginner';
  if (cat.includes('deep learning') || cat.includes('generative') || cat.includes('agentic') || cat.includes('llm') || cat.includes('mlops') || cat.includes('interview')) {
    return 'Advanced';
  }
  return 'Intermediate';
}

export function LessonHeader({
  title,
  description,
  category,
  module,
  topicId,
  difficulty,
  readTimeMinutes = 10,
}: LessonHeaderProps) {
  const cleanCategory = category.replace(/^\d+\.\s*/, '');
  const diffLevel = getDifficultyLevel(category, difficulty);
  const [copied, setCopied] = useState(false);

  const difficultyColors = {
    Beginner: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    Intermediate: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    Advanced: 'bg-purple-50 text-purple-700 border-purple-200/80',
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore copy error
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`Master ${title} on @LearnMLAcademy`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <header className="mb-8 border-b border-slate-200/80 pb-7">
      {/* Crisp Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
          <li>
            <Link to="/curriculum" className="hover:text-indigo-600 transition">
              Curriculum
            </Link>
          </li>
          <li aria-hidden="true">
            <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          </li>
          <li>
            <span className="text-slate-700 font-semibold">{cleanCategory}</span>
          </li>
          {module && (
            <>
              <li aria-hidden="true">
                <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
              </li>
              <li>
                <span className="text-slate-500">{module}</span>
              </li>
            </>
          )}
        </ol>
      </nav>

      {/* Meta Badges Row */}
      <div className="flex flex-wrap items-center gap-2.5 text-xs">
        {/* Difficulty Badge */}
        <span
          className={`inline-flex items-center gap-1 rounded-md border px-2.5 py-0.5 font-bold uppercase tracking-wider text-[11px] ${difficultyColors[diffLevel]}`}
        >
          <Compass className="h-3 w-3" />
          {diffLevel}
        </span>

        {/* Read Time */}
        <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
          <Clock className="h-3.5 w-3.5 text-slate-400" />
          <span>{readTimeMinutes} min read</span>
        </span>

        <span className="text-slate-300" aria-hidden="true">·</span>

        {/* Freshness / Update Date */}
        <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
          <Calendar className="h-3.5 w-3.5 text-slate-400" />
          <span>Updated March 2026</span>
        </span>

        <span className="text-slate-300" aria-hidden="true">·</span>

        {/* Interactive Tag */}
        <span className="inline-flex items-center gap-1 text-indigo-600 font-semibold">
          <BookOpen className="h-3.5 w-3.5" />
          <span>Open-Access Tutorial</span>
        </span>

        {/* Quick Social Share Action in header */}
        <div className="ml-auto hidden sm:flex items-center gap-1.5 text-slate-500">
          <button
            type="button"
            onClick={handleCopyLink}
            title="Copy lesson link"
            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11px] font-semibold text-slate-600 hover:border-indigo-300 hover:text-indigo-600 transition"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Share2 className="h-3 w-3" />
                <span>Share</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Title */}
      <h1 className="mt-3.5 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl lg:text-4xl leading-[1.2]">
        {title}
      </h1>

      {/* Synopsis / Executive Summary */}
      <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base max-w-3xl">
        {description}
      </p>

      {/* Key Takeaways / What You'll Learn Banner (Modern Doc Standard) */}
      <div className="mt-5 rounded-xl border border-indigo-100 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/50 p-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-900">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <span>What you will master in this lesson</span>
        </div>
        <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-slate-700">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <span>Intuitive core mechanisms & practical real-world intuition</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <span>Step-by-step mathematical breakdown & visual diagrams</span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-3.5 w-3.5 text-indigo-600 shrink-0 mt-0.5" />
            <span>Runnable Python implementation & practical trade-offs</span>
          </div>
        </div>
      </div>
    </header>
  );
}
