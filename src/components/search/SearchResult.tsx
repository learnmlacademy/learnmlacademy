import React from "react";
import { Link } from "react-router-dom";
import { BookOpen, FolderKanban } from "lucide-react";
import type { UnifiedSearchItem } from "../../data/learningNavigation";
import { cn } from "../layout/classNames";

type SearchResultProps = {
  key?: React.Key;
  lesson: UnifiedSearchItem;
  resultId: string;
  highlighted: boolean;
  onSelect: () => void;
  onHover: () => void;
};

export function SearchResult({
  lesson,
  resultId,
  highlighted,
  onSelect,
  onHover,
}: SearchResultProps) {
  const isProject = lesson.kind === "project";

  return (
    <Link
      id={resultId}
      role="option"
      aria-selected={highlighted}
      to={lesson.destination}
      onClick={onSelect}
      onMouseEnter={onHover}
      className={cn(
        "block border-b border-slate-100 px-4 py-3 text-left transition-colors last:border-b-0",
        highlighted ? "bg-indigo-50/80" : "bg-white hover:bg-slate-50",
      )}
    >
      <div className="flex items-start justify-between gap-2.5">
        <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-900 group-hover:text-indigo-600">
          {lesson.title}
        </span>
        {isProject ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-800">
            <FolderKanban className="h-3 w-3 text-amber-600" aria-hidden="true" />
            <span>Project Handbook</span>
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
            <BookOpen className="h-3 w-3 text-indigo-500" aria-hidden="true" />
            <span>Lesson</span>
          </span>
        )}
      </div>
      <div className="mt-1 flex items-center gap-1.5 text-xs leading-snug text-slate-500">
        <span className="truncate">
          {lesson.categoryTitle}
          {lesson.module ? ` · ${lesson.module}` : ""}
        </span>
      </div>
    </Link>
  );
}
