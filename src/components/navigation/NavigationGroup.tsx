import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { LearningNavigationGroup } from '../../data/learningNavigation';
import { getGroupLessonCount, getLessonNumber } from '../../data/learningNavigation';
import { cn } from '../layout/classNames';
import { SidebarItem } from './SidebarItem';

type NavigationGroupProps = {
  key?: React.Key;
  group: LearningNavigationGroup;
  index: number;
  expanded: boolean;
  activeTopicId?: string;
  onToggle: () => void;
  onNavigate?: () => void;
};

export function NavigationGroup({
  group,
  index,
  expanded,
  activeTopicId,
  onToggle,
  onNavigate,
}: NavigationGroupProps) {
  const count = getGroupLessonCount(group);
  const isActive = group.categories.some(category =>
    category.subtopics.some(topic => topic.id === activeTopicId),
  );

  return (
    <section
      className={cn(
        'overflow-hidden rounded-xl border bg-white transition-colors',
        expanded ? 'border-indigo-200' : 'border-slate-200',
      )}
    >
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`learning-group-${group.id}`}
        onClick={onToggle}
        className={cn(
          'flex min-h-12 w-full items-center gap-3 px-3 py-3 text-left transition-colors hover:bg-slate-50',
          isActive && 'text-indigo-700',
        )}
      >
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-extrabold',
            isActive || expanded
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-100 text-slate-600',
          )}
        >
          {index + 1}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-bold leading-tight">
            {group.shortTitle ?? group.title}
          </span>
          <span className="mt-0.5 block text-[11px] font-medium text-slate-500">
            {count} lessons
          </span>
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-slate-400 transition-transform',
            expanded && 'rotate-180 text-indigo-600',
          )}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div id={`learning-group-${group.id}`} className="border-t border-slate-100 px-2 py-2">
          {group.categories.map(category => (
            <div key={category.id} className="mb-3 last:mb-0">
              {(group.categories.length > 1 || category.subtopics.some(topic => topic.module)) && (
                <p className="mb-1 px-3 pt-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                  {category.title.replace(/^\d+\.\s*/, '')}
                </p>
              )}
              <div className="space-y-0.5">
                {category.subtopics.map((topic, topicIndex) => (
                  <div key={topic.id}>
                    {topic.module && topic.module !== category.subtopics[topicIndex - 1]?.module && (
                      <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-indigo-600">
                        {topic.module}
                      </p>
                    )}
                    <SidebarItem
                      id={topic.id}
                      title={topic.title}
                      lessonNumber={getLessonNumber(group, topic)}
                      active={topic.id === activeTopicId}
                      onNavigate={onNavigate}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
