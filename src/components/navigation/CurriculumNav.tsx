import React, { useEffect, useState } from 'react';
import {
  getActiveNavigationGroup,
  learningNavigationGroups,
} from '../../data/learningNavigation';
import { NavigationGroup } from './NavigationGroup';
import { Search, Compass, ChevronsUpDown, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

type CurriculumNavProps = {
  activeTopicId?: string;
  onNavigate?: () => void;
  label?: string;
};

export function CurriculumNav({
  activeTopicId,
  onNavigate,
  label = 'Curriculum',
}: CurriculumNavProps) {
  const activeGroup = getActiveNavigationGroup(activeTopicId);
  const [expandedGroup, setExpandedGroup] = useState(activeGroup?.id ?? 'machine-learning');
  const [filterQuery, setFilterQuery] = useState('');

  // Auto-expand group when active topic changes
  useEffect(() => {
    if (activeGroup?.id) setExpandedGroup(activeGroup.id);
  }, [activeGroup?.id]);

  const filteredTopics = filterQuery.trim()
    ? learningNavigationGroups.flatMap(group =>
        group.categories.flatMap(cat =>
          cat.subtopics.filter(st =>
            st.title.toLowerCase().includes(filterQuery.toLowerCase()),
          ),
        ),
      )
    : [];

  return (
    <nav aria-label={label} className="flex h-full flex-col text-slate-800">
      {/* Search Header */}
      <div className="sticky top-0 z-10 bg-white pb-3 pt-1">
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="text"
            value={filterQuery}
            onChange={e => setFilterQuery(e.target.value)}
            placeholder="Quick search lessons..."
            className="h-8 w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-7 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {filterQuery && (
            <button
              type="button"
              onClick={() => setFilterQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[11px] font-semibold text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>
          )}
        </div>

        {/* Quick Links inside Docs Sidebar */}
        <div className="mt-2.5 flex items-center justify-between border-b border-slate-100 pb-2 px-1 text-[11px] font-medium text-slate-500">
          <Link
            to="/curriculum"
            onClick={onNavigate}
            className="flex items-center gap-1 hover:text-indigo-600 transition"
          >
            <BookOpen className="h-3 w-3" aria-hidden="true" />
            <span>Full Index</span>
          </Link>
          <span className="text-slate-300">·</span>
          <Link
            to="/cheatsheet"
            onClick={onNavigate}
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition"
          >
            Cheatsheet PDF
          </Link>
        </div>
      </div>

      {/* Filter View or Nested Hierarchy */}
      <div className="flex-1 space-y-1 overflow-y-auto pr-1">
        {filterQuery.trim() ? (
          <div className="space-y-0.5 pt-1">
            <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {filteredTopics.length} matches
            </p>
            {filteredTopics.length === 0 ? (
              <p className="px-2 py-4 text-center text-xs text-slate-500">
                No lessons matching &quot;{filterQuery}&quot;
              </p>
            ) : (
              filteredTopics.map(topic => (
                <Link
                  key={topic.id}
                  to={`/learn/${topic.id}`}
                  onClick={onNavigate}
                  className={`block rounded-md px-2.5 py-1.5 text-xs transition ${
                    topic.id === activeTopicId
                      ? 'bg-indigo-50 font-semibold text-indigo-700'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {topic.title}
                </Link>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-0.5 pt-1 pb-10">
            {learningNavigationGroups.map((group, index) => (
              <NavigationGroup
                key={group.id}
                group={group}
                index={index}
                expanded={expandedGroup === group.id}
                activeTopicId={activeTopicId}
                onToggle={() =>
                  setExpandedGroup(current => (current === group.id ? '' : group.id))
                }
                onNavigate={onNavigate}
              />
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
