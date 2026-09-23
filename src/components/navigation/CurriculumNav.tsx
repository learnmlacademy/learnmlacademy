import React, { useEffect, useState } from 'react';
import {
  getActiveNavigationGroup,
  learningNavigationGroups,
} from '../../data/learningNavigation';
import { NavigationGroup } from './NavigationGroup';
import { Search } from 'lucide-react';
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
    <nav aria-label={label} className="space-y-3 pb-8">
      {/* Quick Search inside Sidebar */}
      <div className="relative px-1">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
        <input
          type="text"
          value={filterQuery}
          onChange={e => setFilterQuery(e.target.value)}
          placeholder="Filter lessons..."
          className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
        {filterQuery && (
          <button
            type="button"
            onClick={() => setFilterQuery('')}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 hover:text-slate-700"
          >
            ✕
          </button>
        )}
      </div>

      {/* Filter Mode or Full Hierarchy */}
      {filterQuery.trim() ? (
        <div className="space-y-0.5 px-1">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {filteredTopics.length} matches
          </p>
          {filteredTopics.length === 0 ? (
            <p className="px-2 py-2 text-xs text-slate-500">No lessons found.</p>
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
        <div className="space-y-1 px-1">
          {learningNavigationGroups.map((group, index) => (
            <NavigationGroup
              key={group.id}
              group={group}
              index={index}
              expanded={expandedGroup === group.id}
              activeTopicId={activeTopicId}
              onToggle={() => setExpandedGroup(current => (current === group.id ? '' : group.id))}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </nav>
  );
}
