import React, { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type RefObject } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { searchableLessons, type UnifiedSearchItem } from "../../data/learningNavigation";
import { cn } from "../layout/classNames";
import { SearchResult } from "./SearchResult";

type LessonSearchProps = {
  className?: string;
  inputRef?: RefObject<HTMLInputElement | null>;
  onNavigate?: () => void;
  placeholder?: string;
  inputClassName?: string;
};

const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

const searchTokens = (value: string) =>
  normalizeSearchText(value).split(/\s+/).filter(Boolean);

export function LessonSearch({
  className,
  inputRef,
  onNavigate,
  placeholder = "Search tutorials & project handbooks…",
  inputClassName,
}: LessonSearchProps) {
  const navigate = useNavigate();
  const generatedId = useId().replace(/:/g, "");
  const localInputRef = useRef<HTMLInputElement>(null);
  const searchRef = inputRef ?? localInputRef;
  const rootRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const results = useMemo(() => {
    const normalized = normalizeSearchText(query);
    if (normalized.length < 2) return [];
    const queryTokens = searchTokens(normalized);

    return (searchableLessons as UnifiedSearchItem[])
      .map(item => {
        const title = normalizeSearchText(item.title);
        const shortTitle = item.shortTitle ? normalizeSearchText(item.shortTitle) : "";
        const titleTokens = searchTokens(title);
        const shortTitleTokens = shortTitle ? searchTokens(shortTitle) : [];
        const allTitleTokens = [...titleTokens, ...shortTitleTokens];
        const context = normalizeSearchText(`${item.categoryTitle} ${item.module ?? ""}`);
        const path = normalizeSearchText(item.id.replace(/-/g, " "));
        const keywordList = item.keywords ? item.keywords.map(k => normalizeSearchText(k)) : [];
        const allKeywordTokens = keywordList.flatMap(k => searchTokens(k));
        const description = item.description ? normalizeSearchText(item.description) : "";
        const descTokens = searchTokens(description);

        let rank = Number.POSITIVE_INFINITY;
        // 0: Exact match on title, shortTitle, or path
        if (title === normalized || shortTitle === normalized || path === normalized) {
          rank = 0;
        }
        // 1: Starts with query
        else if (title.startsWith(normalized) || (shortTitle && shortTitle.startsWith(normalized))) {
          rank = 1;
        }
        // 2: All query tokens are in title tokens (exact word match)
        else if (queryTokens.every(token => allTitleTokens.includes(token))) {
          rank = 2;
        }
        // 3: Substring in title or shortTitle (for queries > 3 characters)
        else if (normalized.length > 3 && (title.includes(normalized) || (shortTitle && shortTitle.includes(normalized)))) {
          rank = 3;
        }
        // 4: All query tokens are in path or context
        else if (queryTokens.every(token => searchTokens(path).includes(token) || searchTokens(context).includes(token))) {
          rank = 4;
        }
        // 5: Keywords contain all query tokens
        else if (allKeywordTokens.length > 0 && queryTokens.every(token => allKeywordTokens.includes(token))) {
          rank = 5;
        }
        // 6: Description contains all query tokens
        else if (descTokens.length > 0 && queryTokens.every(token => descTokens.includes(token))) {
          rank = 6;
        }

        return { item, rank };
      })
      .filter(result => Number.isFinite(result.rank))
      .sort((a, b) => a.rank - b.rank || a.item.title.localeCompare(b.item.title))
      .slice(0, 10);
  }, [query]);

  const closeResults = () => {
    setOpen(false);
    setHighlightedIndex(-1);
  };

  const choose = (destination: string) => {
    setQuery("");
    closeResults();
    onNavigate?.();
    navigate(destination);
  };

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      const isCmdK = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      const isSlash = event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey;

      if (!isCmdK && !isSlash) return;

      const activeEl = document.activeElement;
      const isInput =
        activeEl?.tagName === 'INPUT' ||
        activeEl?.tagName === 'TEXTAREA' ||
        (activeEl as HTMLElement)?.isContentEditable;

      if (isSlash && isInput) return;

      if (searchRef.current) {
        event.preventDefault();
        searchRef.current.focus();
        searchRef.current.select();
        setOpen(true);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [searchRef]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeResults();
      searchRef.current?.blur();
      return;
    }
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex(index => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setHighlightedIndex(index => (index <= 0 ? results.length - 1 : index - 1));
    } else if (event.key === "Enter" && open) {
      event.preventDefault();
      const selected = results[highlightedIndex]?.item ?? results[0]?.item;
      if (selected) {
        choose(selected.destination);
      }
    }
  };

  const listboxId = `lesson-search-results-${generatedId}`;
  const activeResultId = results.length && open && highlightedIndex >= 0
    ? `${listboxId}-${highlightedIndex}`
    : undefined;

  return (
    <div
      ref={rootRef}
      className={cn("relative", className)}
      onBlur={event => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          closeResults();
        }
      }}
    >
      <label htmlFor={`lesson-search-${generatedId}`} className="sr-only">
        Search LearnMLAcademy lessons and project handbooks
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
        className={cn(
          "h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-9 text-sm font-medium text-slate-900 placeholder:text-slate-500 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:outline-none",
          inputClassName
        )}
      />
      {query && (
        <button
          type="button"
          aria-label="Clear lesson search"
          onClick={() => {
            setQuery("");
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
          aria-label="Search results"
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-96 overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl"
        >
          {results.length ? (
            results.map(({ item }, index) => (
              <SearchResult
                key={item.destination}
                lesson={item}
                resultId={`${listboxId}-${index}`}
                highlighted={index === highlightedIndex}
                onHover={() => setHighlightedIndex(index)}
                onSelect={() => {
                  setQuery("");
                  closeResults();
                  onNavigate?.();
                }}
              />
            ))
          ) : (
            <p className="px-4 py-4 text-center text-sm text-slate-500">
              No lessons or project handbooks match “{query}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
