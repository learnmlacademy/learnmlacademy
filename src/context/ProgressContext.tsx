import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { curriculum, Category, SubTopic } from '../data/curriculum';

const STORAGE_KEY = 'learnml_completed_lessons_v1';
const LAST_VISITED_KEY = 'learnml_last_visited_topic';
const EVENT_NAME = 'learnml_progress_updated';

type CategoryProgress = {
  completed: number;
  total: number;
  percentage: number;
};

type ProgressContextType = {
  completedLessons: Set<string>;
  completedCount: number;
  totalLessonsCount: number;
  progressPercentage: number;
  isCompleted: (topicId: string) => boolean;
  toggleCompleted: (topicId: string) => boolean;
  markCompleted: (topicId: string) => void;
  markIncomplete: (topicId: string) => void;
  markCategoryCompleted: (categoryId: string) => void;
  resetCategoryProgress: (categoryId: string) => void;
  resetProgress: () => void;
  getCategoryProgress: (categoryId: string) => CategoryProgress;
  lastVisitedTopicId: string | null;
  setLastVisitedTopicId: (topicId: string) => void;
  getNextIncompleteTopic: () => { id: string; title: string; categoryTitle: string } | null;
};

const ProgressContext = createContext<ProgressContextType | null>(null);

function getInitialCompletedLessons(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed.filter((id): id is string => typeof id === 'string'));
      }
    }
  } catch (e) {
    console.error('Failed to parse completed lessons from localStorage:', e);
  }
  return new Set();
}

function getInitialLastVisited(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(LAST_VISITED_KEY);
  } catch {
    return null;
  }
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  // SSR starts with empty progress. The first browser render must be identical;
  // reading localStorage in a useState initializer causes React hydration errors
  // for returning learners with completed lessons or a last-visited topic.
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(() => new Set());
  const [lastVisitedTopicId, setLastVisitedState] = useState<string | null>(null);

  useEffect(() => {
    setCompletedLessons(getInitialCompletedLessons());
    setLastVisitedState(getInitialLastVisited());
  }, []);

  // Sync state changes to localStorage and dispatch custom event
  const persist = useCallback((nextSet: Set<string>) => {
    try {
      const array = Array.from(nextSet);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(array));
      window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: array }));
    } catch (e) {
      console.error('Failed to save completed lessons to localStorage:', e);
    }
  }, []);

  // Listen to cross-tab storage changes and custom events
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setCompletedLessons(new Set(parsed));
          }
        } catch {
          // ignore
        }
      } else if (e.key === LAST_VISITED_KEY) {
        setLastVisitedState(e.newValue);
      }
    };

    const handleCustom = (e: Event) => {
      const custom = e as CustomEvent<string[]>;
      if (Array.isArray(custom.detail)) {
        setCompletedLessons(new Set(custom.detail));
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener(EVENT_NAME, handleCustom);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener(EVENT_NAME, handleCustom);
    };
  }, []);

  const totalLessonsCount = useMemo(() => {
    return curriculum.reduce((sum, cat) => sum + cat.subtopics.length, 0);
  }, []);

  const completedCount = completedLessons.size;

  const progressPercentage = useMemo(() => {
    if (totalLessonsCount === 0) return 0;
    return Math.min(100, Math.round((completedCount / totalLessonsCount) * 100));
  }, [completedCount, totalLessonsCount]);

  const isCompleted = useCallback((topicId: string) => {
    return completedLessons.has(topicId);
  }, [completedLessons]);

  const toggleCompleted = useCallback((topicId: string): boolean => {
    let newState = false;
    setCompletedLessons(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) {
        next.delete(topicId);
        newState = false;
      } else {
        next.add(topicId);
        newState = true;
      }
      persist(next);
      return next;
    });
    return newState;
  }, [persist]);

  const markCompleted = useCallback((topicId: string) => {
    setCompletedLessons(prev => {
      if (prev.has(topicId)) return prev;
      const next = new Set(prev);
      next.add(topicId);
      persist(next);
      return next;
    });
  }, [persist]);

  const markIncomplete = useCallback((topicId: string) => {
    setCompletedLessons(prev => {
      if (!prev.has(topicId)) return prev;
      const next = new Set(prev);
      next.delete(topicId);
      persist(next);
      return next;
    });
  }, [persist]);

  const markCategoryCompleted = useCallback((categoryId: string) => {
    const category = curriculum.find(c => c.id === categoryId);
    if (!category) return;
    setCompletedLessons(prev => {
      const next = new Set(prev);
      category.subtopics.forEach(st => next.add(st.id));
      persist(next);
      return next;
    });
  }, [persist]);

  const resetCategoryProgress = useCallback((categoryId: string) => {
    const category = curriculum.find(c => c.id === categoryId);
    if (!category) return;
    setCompletedLessons(prev => {
      const next = new Set(prev);
      category.subtopics.forEach(st => next.delete(st.id));
      persist(next);
      return next;
    });
  }, [persist]);

  const resetProgress = useCallback(() => {
    const next = new Set<string>();
    setCompletedLessons(next);
    persist(next);
  }, [persist]);

  const getCategoryProgress = useCallback((categoryId: string): CategoryProgress => {
    const category = curriculum.find(c => c.id === categoryId);
    if (!category || category.subtopics.length === 0) {
      return { completed: 0, total: 0, percentage: 0 };
    }
    const total = category.subtopics.length;
    let completed = 0;
    for (const st of category.subtopics) {
      if (completedLessons.has(st.id)) completed++;
    }
    const percentage = Math.round((completed / total) * 100);
    return { completed, total, percentage };
  }, [completedLessons]);

  const setLastVisitedTopicId = useCallback((topicId: string) => {
    setLastVisitedState(topicId);
    try {
      localStorage.setItem(LAST_VISITED_KEY, topicId);
    } catch {
      // ignore
    }
  }, []);

  const getNextIncompleteTopic = useCallback(() => {
    for (const cat of curriculum) {
      for (const st of cat.subtopics) {
        if (!completedLessons.has(st.id)) {
          return {
            id: st.id,
            title: st.title,
            categoryTitle: cat.title.replace(/^\d+\.\s*/, ''),
          };
        }
      }
    }
    return null;
  }, [completedLessons]);

  const value: ProgressContextType = {
    completedLessons,
    completedCount,
    totalLessonsCount,
    progressPercentage,
    isCompleted,
    toggleCompleted,
    markCompleted,
    markIncomplete,
    markCategoryCompleted,
    resetCategoryProgress,
    resetProgress,
    getCategoryProgress,
    lastVisitedTopicId,
    setLastVisitedTopicId,
    getNextIncompleteTopic,
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

const defaultProgressContext: ProgressContextType = {
  completedLessons: new Set(),
  completedCount: 0,
  totalLessonsCount: 0,
  progressPercentage: 0,
  isCompleted: () => false,
  toggleCompleted: () => false,
  markCompleted: () => {},
  markIncomplete: () => {},
  markCategoryCompleted: () => {},
  resetCategoryProgress: () => {},
  resetProgress: () => {},
  getCategoryProgress: () => ({ completed: 0, total: 0, percentage: 0 }),
  lastVisitedTopicId: null,
  setLastVisitedTopicId: () => {},
  getNextIncompleteTopic: () => null,
};

export function useProgress() {
  const context = useContext(ProgressContext);
  return context ?? defaultProgressContext;
}
