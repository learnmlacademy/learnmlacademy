import React, { useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { searchableLessons } from '../../data/learningNavigation';
import { cn } from '../layout/classNames';
import { SearchResult } from './SearchResult';

type LessonSearchProps = {
  className?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onNavigate?: () => void;
  placeholder?: string;
};

const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

const searchTokens = (value: string) =>
  normalizeSearchText(value).split(/\s+/).filter(Boolean);

export function LessonSearch({
  className,
  inputRef,
  onNavigate,
  placeholder = 'Search lessons…',
}: LessonSearchProps) {
  const navigate = useNavigate();
  const generatedId = useId().replace(/:/g, '');
  const localInputRef = useRef<HTMLInputElement>(null);
  const searchRef = inputRef ?? localInputRef;
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const results = useMemo(() => {
    const normalized = normalizeSearchText(query);
    if (normalized.length < 2) return [];
    const queryTokens = searchTokens(normalized);

    return searchableLessons
      .map(lesson => {
        const title = normalizeSearchText(lesson.title);
        const titleTokens = searchTokens(title);
        const context = normalizeSearchText(`${lesson.categoryTitle} ${lesson.module ?? ''}`);
        const path = normalizeSearchText(lesson.id);
        let rank = Number.POSITIVE_INFINITY;

        if (title === normalized) rank = 0;
        else if (title.startsWith(normalized)) rank = 1;
        else if (queryTokens.every(token => titleTokens.includes(token))) rank = 2;
        else if (context.includes(normalized) || path.includes(normalized)) rank = 3;
        else if (title.includes(normalized)) rank = 4;

        return { lesson, rank };
      })
      .filter(result => Number.isFinite(result.rank))
      .sort((a, b) => a.rank - b.rank || a.lesson.title.localeCompare(b.lesson.title))
      .slice(0, 10);
  }, [query]);

  const closeResults = () => {
    setOpen(false);
    setHighlightedIndex(-1);
  };

  const choose = (id: string) => {
    setQuery('');
    closeResults();
    onNavigate?.();
    navigate(`/learn/${id}`);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeResults();
      searchRef.current?.blur();
      return;
    }

    if (!results.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex(index => (index + 1) % results.length);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex(index => index <= 0 ? results.length - 1 : index - 1);
    } else if (event.key === 'Enter' && open) {
      event.preventDefault();
      choose(results[highlightedIndex]?.lesson.id ?? results[0].lesson.id);
    }
  };

  const listboxId = `lesson-search-results-${generatedId}`;
  const activeResultId = results.length && open && highlightedIndex >= 0
    ? `${listboxId}-${highlightedIndex}`
    : undefined;

  return (
    <div
      ref={rootRef}
      className={cn('relative', className)}
      onBlur={event => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          closeResults();
        }
      }}
    >
      <label htmlFor={`lesson-search-${generatedId}`} className="sr-only">
        Search LearnMLAcademy lessons
      </label>
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <input
        id={`lesson-search-${generatedId}`}
        ref={searchRef}
        type="search"
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={open && query.trim().length > 0}
        aria-activedescendant={activeResultId}
        autoComplete="off"
        value={query}
        onChange={event => {
          setQuery(event.target.value);
          setHighlightedIndex(-1);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm font-medium text-slate-900 placeholder:text-slate-500 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:outline-none"
      />
      {query && (
        <button
          type="button"
          aria-label="Clear lesson search"
          onClick={() => {
            setQuery('');
            closeResults();
            searchRef.current?.focus();
          }}
          className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-200 hover:text-slate-900"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      {open && query.trim() && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Lesson search results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"
        >
          {results.length ? (
            results.map(({ lesson }, index) => (
              <SearchResult
                key={lesson.id}
                lesson={lesson}
                resultId={`${listboxId}-${index}`}
                highlighted={index === highlightedIndex}
                onHover={() => setHighlightedIndex(index)}
                onSelect={() => {
                  setQuery('');
                  closeResults();
                  onNavigate?.();
                }}
              />
            ))
          ) : (
            <p className="px-4 py-4 text-center text-sm text-slate-500">
              No lessons match “{query}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
