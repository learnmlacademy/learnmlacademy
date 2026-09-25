import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, CheckCircle2, MessageSquare } from 'lucide-react';
import { cn } from '../layout/classNames';

type WasThisHelpfulProps = {
  topicId: string;
  topicTitle: string;
  className?: string;
};

export function WasThisHelpful({ topicId, topicTitle, className }: WasThisHelpfulProps) {
  const [feedback, setFeedback] = useState<'yes' | 'no' | null>(null);
  const [comment, setComment] = useState('');
  const [submittedComment, setSubmittedComment] = useState(false);

  const handleVote = (vote: 'yes' | 'no') => {
    setFeedback(vote);
    // Store in localStorage for user session persistence
    try {
      localStorage.setItem(`lma-feedback-${topicId}`, vote);
    } catch {
      // Ignore storage errors in restricted iframes
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmittedComment(true);
  };

  return (
    <section
      aria-label="Tutorial feedback"
      className={cn(
        'not-prose my-10 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm transition',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>Was this tutorial helpful?</span>
          </h3>
          <p className="mt-1 text-xs text-slate-500">
            Your feedback helps us continuously refine and improve our open-access tutorials.
          </p>
        </div>

        {feedback === null ? (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => handleVote('yes')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition"
              aria-label="Yes, this tutorial was helpful"
            >
              <ThumbsUp className="h-3.5 w-3.5 text-emerald-600" />
              <span>Yes</span>
            </button>
            <button
              type="button"
              onClick={() => handleVote('no')}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-xs hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 transition"
              aria-label="No, this tutorial could be improved"
            >
              <ThumbsDown className="h-3.5 w-3.5 text-rose-500" />
              <span>No</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1.5 rounded-lg">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>{feedback === 'yes' ? 'Thanks for the feedback!' : 'Thank you. We will work on improving this guide.'}</span>
          </div>
        )}
      </div>

      {feedback !== null && !submittedComment && (
        <form onSubmit={handleCommentSubmit} className="mt-4 pt-4 border-t border-slate-200/70">
          <label htmlFor={`feedback-note-${topicId}`} className="block text-xs font-medium text-slate-600 mb-1.5">
            {feedback === 'yes' ? 'What part did you find most useful? (Optional)' : 'How can we make this explanation clearer? (Optional)'}
          </label>
          <div className="flex gap-2">
            <input
              id={`feedback-note-${topicId}`}
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g., More code examples, clearer diagram, etc."
              className="w-full text-xs rounded-lg border border-slate-200 px-3 py-2 text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!comment.trim()}
              className="shrink-0 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-700 disabled:opacity-50 transition"
            >
              Send
            </button>
          </div>
        </form>
      )}

      {submittedComment && (
        <p className="mt-3 text-xs text-slate-500 flex items-center gap-1.5">
          <MessageSquare className="h-3.5 w-3.5 text-indigo-600" />
          <span>Note received — thank you for contributing to better AI education!</span>
        </p>
      )}
    </section>
  );
}
