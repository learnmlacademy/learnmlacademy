import React, { useState } from 'react';
import { ChevronRight, Folder, FolderOpen } from 'lucide-react';
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
  expanded,
  activeTopicId,
  onToggle,
  onNavigate,
}: NavigationGroupProps) {
  const count = getGroupLessonCount(group);
  const isActive = group.categories.some(category =>
    category.subtopics.some(topic => topic.id === activeTopicId),
  );

  // Allow collapsing individual subcategories inside the track if there are multiple
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (categoryId: string) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  return (
    <div className="mb-1 select-none">
      {/* Group / Track Heading Button */}
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls={`learning-group-${group.id}`}
        onClick={onToggle}
        className={cn(
          'group flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition-colors duration-150',
          isActive
            ? 'bg-slate-100/90 text-slate-950 font-bold'
            : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900',
        )}
      >
        <div className="flex min-w-0 items-center gap-2">
          <ChevronRight
            className={cn(
              'h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform duration-200 ease-out',
              expanded && 'rotate-90 text-indigo-600',
            )}
            aria-hidden="true"
          />
          <span className="truncate">
            {group.shortTitle ?? group.title}
          </span>
        </div>

        <span
          className={cn(
            'ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold tabular-nums',
            isActive ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-500',
          )}
        >
          {count}
        </span>
      </button>

      {/* Nested Collapsible Subcategories & Topics */}
      {expanded && (
        <div
          id={`learning-group-${group.id}`}
          className="ml-3.5 mt-1 border-l-2 border-slate-100 pl-2.5 space-y-1.5"
        >
          {group.categories.map(category => {
            const isCategoryActive = category.subtopics.some(t => t.id === activeTopicId);
            const isCategoryCollapsed = collapsedCategories[category.id] ?? false;
            const hasMultipleCategories = group.categories.length > 1;

            return (
              <div key={category.id} className="last:mb-0">
                {/* Subcategory Accordion Header (if track has multiple subcategories) */}
                {hasMultipleCategories && (
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full items-center justify-between px-1.5 py-1 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-800 transition"
                  >
                    <span className="truncate">
                      {category.title.replace(/^\d+\.\s*/, '')}
                    </span>
                    <ChevronRight
                      className={cn(
                        'h-3 w-3 shrink-0 text-slate-400 transition-transform duration-150',
                        !isCategoryCollapsed && 'rotate-90 text-slate-600',
                      )}
                      aria-hidden="true"
                    />
                  </button>
                )}

                {/* Topics inside subcategory */}
                {!isCategoryCollapsed && (
                  <div className="mt-0.5 space-y-0.5">
                    {category.subtopics.map((topic, topicIndex) => (
                      <React.Fragment key={topic.id}>
                        {topic.module &&
                          topic.module !== category.subtopics[topicIndex - 1]?.module && (
                            <p className="px-2 pt-2 pb-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-600">
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
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
