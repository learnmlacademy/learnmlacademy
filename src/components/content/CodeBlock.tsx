import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Check, Clipboard, Code2, TriangleAlert } from 'lucide-react';
import { cn } from '../layout/classNames';

export type CodeBlockType = 'runnable' | 'conceptual' | 'pseudocode' | 'output' | 'config';

type CodeBlockProps = {
  code: string;
  language?: string;
  title?: string;
  caption?: ReactNode;
  type?: CodeBlockType;
  typeLabel?: string;
  wrap?: boolean;
  className?: string;
};

const typeLabels: Record<CodeBlockType, string> = {
  runnable: 'Runnable',
  conceptual: 'Conceptual',
  pseudocode: 'Pseudocode',
  output: 'Output',
  config: 'Configuration',
};

export function CodeBlock({
  code,
  language,
  title,
  caption,
  type,
  typeLabel,
  wrap = false,
  className,
}: CodeBlockProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState('copied');
    } catch {
      setCopyState('error');
    }
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyState('idle'), 2200);
  };

  const copyLabel = copyState === 'copied' ? 'Copied' : copyState === 'error' ? 'Copy failed' : 'Copy';

  return (
    <figure
      data-code-block
      className={cn('not-prose my-5 overflow-hidden rounded-xl border border-[var(--lma-code-border)] bg-[var(--lma-code-canvas)] shadow-sm', className)}
    >
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-[var(--lma-code-border)] bg-[var(--lma-surface-inverse)] px-3 py-2 sm:px-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[var(--lma-code-muted)]">
          <Code2 className="h-4 w-4 shrink-0 text-cyan-300" aria-hidden="true" />
          {title && <strong className="break-words text-[var(--lma-text-inverse)]">{title}</strong>}
          {language && <span className="font-mono uppercase tracking-wide">{language}</span>}
          {(typeLabel || type) && <span className="rounded-md border border-[var(--lma-code-border)] px-2 py-0.5 font-bold text-[var(--lma-code-muted)]">{typeLabel ?? (type ? typeLabels[type] : '')}</span>}
        </div>
        <button
          type="button"
          onClick={copyCode}
          aria-label={`${copyLabel} ${title ? `${title} ` : ''}code`}
          className="inline-flex min-h-9 shrink-0 items-center gap-2 rounded-lg border border-[var(--lma-code-border)] px-3 py-1.5 text-xs font-bold text-[var(--lma-text-inverse)] transition hover:border-slate-400 hover:bg-[var(--lma-code-hover)]"
        >
          {copyState === 'copied' ? <Check className="h-4 w-4" aria-hidden="true" /> : copyState === 'error' ? <TriangleAlert className="h-4 w-4" aria-hidden="true" /> : <Clipboard className="h-4 w-4" aria-hidden="true" />}
          {copyLabel}
        </button>
      </div>
      <pre className={cn('lma-scrollbar m-0 max-w-full overflow-x-auto p-4 text-[0.8125rem] leading-6 text-[var(--lma-text-inverse)] sm:p-5 sm:text-sm', wrap && 'whitespace-pre-wrap break-words')}>
        <code>{code}</code>
      </pre>
      {caption && <figcaption className="border-t border-[var(--lma-code-border)] bg-[var(--lma-surface-inverse)] px-4 py-3 text-xs leading-relaxed text-[var(--lma-code-muted)] sm:px-5">{caption}</figcaption>}
      <span className="sr-only" role="status" aria-live="polite">{copyState === 'copied' ? 'Code copied to clipboard.' : copyState === 'error' ? 'Code could not be copied.' : ''}</span>
    </figure>
  );
}
