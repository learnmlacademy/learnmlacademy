import React from 'react';
import { ChevronRight } from 'lucide-react';
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
    <div className="mb-1">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`learning-group-${group.id}`}
        onClick={onToggle}
        className={cn(
          'group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left transition-colors',
          isActive
            ? 'bg-slate-100 font-bold text-slate-900'
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <ChevronRight
            className={cn(
              'h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-150',
              expanded && 'rotate-90 text-slate-600',
            )}
            aria-hidden="true"
          />
          <span className="truncate text-xs font-semibold leading-tight">
            {group.shortTitle ?? group.title}
          </span>
        </div>

        <span className="shrink-0 text-[11px] font-medium text-slate-400">
          {count}
        </span>
      </button>

      {expanded && (
        <div
          id={`learning-group-${group.id}`}
          className="ml-3.5 mt-0.5 border-l border-slate-200 pl-2 py-0.5 space-y-0.5"
        >
          {group.categories.map(category => (
            <div key={category.id} className="mb-2 last:mb-0">
              {(group.categories.length > 1 || category.subtopics.some(topic => topic.module)) && (
                <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {category.title.replace(/^\d+\.\s*/, '')}
                </p>
              )}
              <div className="space-y-0.5">
                {category.subtopics.map((topic, topicIndex) => (
                  <div key={topic.id}>
                    {topic.module && topic.module !== category.subtopics[topicIndex - 1]?.module && (
                      <p className="px-2.5 pb-0.5 pt-2 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
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
    </div>
  );
}
