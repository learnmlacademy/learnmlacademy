import React, { useEffect, useState } from 'react';
import {
  getActiveNavigationGroup,
  learningNavigationGroups,
} from '../../data/learningNavigation';
import { NavigationGroup } from './NavigationGroup';

type CurriculumNavProps = {
  activeTopicId?: string;
  onNavigate?: () => void;
  label?: string;
};

export function CurriculumNav({
  activeTopicId,
  onNavigate,
  label = 'Learning paths',
}: CurriculumNavProps) {
  const activeGroup = getActiveNavigationGroup(activeTopicId);
  const [expandedGroup, setExpandedGroup] = useState(activeGroup?.id ?? 'machine-learning');

  useEffect(() => {
    if (activeGroup?.id) setExpandedGroup(activeGroup.id);
  }, [activeGroup?.id]);

  return (
    <nav aria-label={label} className="space-y-2">
      <div className="px-2 pb-2 pt-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
          {label}
        </p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Follow the path or open the section you need.
        </p>
      </div>
      {learningNavigationGroups.map((group, index) => (
        <NavigationGroup
          key={group.id}
          group={group}
          index={index}
          expanded={expandedGroup === group.id}
          activeTopicId={activeTopicId}
          onToggle={() => setExpandedGroup(current => current === group.id ? '' : group.id)}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
