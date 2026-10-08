import { type ComponentProps, type ReactNode } from 'react';
import { ClipboardCheck, ExternalLink, Link2 } from 'lucide-react';
import { CodeBlock } from '../content/CodeBlock';
import { FigureShell } from '../content/FigureShell';
import { cn } from '../layout/classNames';

export { DataTable as HandbookTable } from '../content/DataTable';

type HandbookSectionProps = {
  id: string;
  number: number;
  title: string;
  checkpoint: ReactNode;
  children: ReactNode;
  className?: string;
};

export function HandbookSection({ id, number, title, checkpoint, children, className }: HandbookSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-handbook-section
      className={cn('min-w-0 scroll-mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7', className)}
    >
      <header className="mb-5 flex items-start gap-3 sm:gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-sm font-black text-white" aria-hidden="true">
          {number}
        </span>
        <h2 id={`${id}-title`} className="min-w-0 flex-1 text-xl font-black leading-snug text-slate-950 sm:text-2xl">
          <span className="sr-only">Step {number}: </span>{title}
        </h2>
        <a
          href={`#${id}`}
          aria-label={`Link to step ${number}: ${title}`}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 hover:bg-indigo-50 hover:text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <Link2 className="h-4 w-4" aria-hidden="true" />
        </a>
      </header>
      <div className="min-w-0 space-y-5 text-base leading-7 text-slate-700">{children}</div>
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-6 text-emerald-950">
        <ClipboardCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" aria-hidden="true" />
        <div className="min-w-0">
          <p className="font-extrabold">Check before continuing</p>
          <div className="mt-1">{checkpoint}</div>
        </div>
      </div>
    </section>
  );
}

export type HandbookAction = {
  instruction: ReactNode;
  where?: string;
  expected?: ReactNode;
};

type HandbookActionsProps = {
  steps: HandbookAction[];
  title?: string;
};

export function HandbookActions({ steps, title = 'Do this' }: HandbookActionsProps) {
  return (
    <div className="rounded-xl border border-indigo-100 bg-indigo-50/60 p-4 sm:p-5">
      <p className="font-extrabold text-indigo-950">{title}</p>
      <ol className="mt-3 list-decimal space-y-4 pl-5 marker:font-bold marker:text-indigo-700">
        {steps.map((step, index) => (
          <li key={index} className="pl-1 text-sm leading-6 text-slate-700">
            {step.where && <p className="mb-1 text-xs font-extrabold uppercase tracking-wide text-indigo-800">{step.where}</p>}
            <div>{step.instruction}</div>
            {step.expected !== undefined && step.expected !== null && <div className="mt-2 text-emerald-900"><strong>You should see:</strong> {step.expected}</div>}
          </li>
        ))}
      </ol>
    </div>
  );
}

type ScreenshotProps = {
  src: string;
  alt: string;
  caption: ReactNode;
  title?: string;
  width?: number;
  height?: number;
  originalSrc?: string;
  loading?: 'lazy' | 'eager';
};

/** Supply a capture of the actual application, with a caption explaining its result. */
export function Screenshot({ src, alt, caption, title, width, height, originalSrc, loading = 'lazy' }: ScreenshotProps) {
  return (
    <FigureShell
      title={title}
      figureProps={{ 'data-handbook-screenshot': true }}
      caption={(
        <div className="space-y-3">
          <div>{caption}</div>
          <a
            href={originalSrc ?? src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-sm font-bold text-indigo-700 underline decoration-indigo-300 underline-offset-4 hover:text-indigo-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Open original-size screenshot<span className="sr-only"> (opens in a new tab)</span>
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      )}
    >
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        className="block h-auto w-full rounded-lg border border-slate-200"
      />
    </FigureShell>
  );
}

// Deliberately limited lexical coloring: all unmatched text remains unchanged.
// matchAll clones these expressions, so rendering does not mutate shared state.
const pythonTokens = /(?<comment>#[^\r\n]*)|(?<string>(?:[rRuUbBfF]{1,2})?(?:"""[\s\S]*?(?:"""|$)|'''[\s\S]*?(?:'''|$)|"(?:\\[^]|[^"\\\r\n])*"|'(?:\\[^]|[^'\\\r\n])*'))|(?<keyword>\b(?:False|None|True|and|as|assert|async|await|break|class|continue|def|del|elif|else|except|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|raise|return|try|while|with|yield)\b)|(?<number>\b(?:0[xX][\da-fA-F_]+|0[bB][01_]+|0[oO][0-7_]+|\d[\d_]*(?:\.[\d_]*)?(?:[eE][+-]?\d[\d_]*)?[jJ]?)\b)/g;
const powershellTokens = /(?<comment><#[\s\S]*?(?:#>|$)|#[^\r\n]*)|(?<string>@"\r?\n[\s\S]*?\r?\n"@|@'\r?\n[\s\S]*?\r?\n'@|"(?:`[^]|[^"`])*"|'(?:''|[^'])*')|(?<keyword>\b(?:begin|break|catch|class|continue|data|do|dynamicparam|else|elseif|end|exit|filter|finally|for|foreach|from|function|if|in|param|process|return|switch|throw|trap|try|until|using|while)\b|\$(?:true|false|null)\b)|(?<number>\b(?:0x[\da-f]+|\d+(?:\.\d+)?(?:e[+-]?\d+)?)\b)/gi;

const tokenClasses = {
  comment: 'text-slate-400',
  string: 'text-emerald-300',
  keyword: 'text-violet-300',
  number: 'text-amber-200',
};

function highlightCode(code: string, language?: string): ReactNode {
  const normalizedLanguage = language?.toLowerCase();
  const tokens = normalizedLanguage === 'python' || normalizedLanguage === 'py'
    ? pythonTokens
    : normalizedLanguage === 'powershell' || normalizedLanguage === 'pwsh' || normalizedLanguage === 'ps1'
      ? powershellTokens
      : undefined;
  if (!tokens) return code;

  const result: ReactNode[] = [];
  let cursor = 0;
  for (const match of code.matchAll(tokens)) {
    const index = match.index;
    if (index > cursor) result.push(code.slice(cursor, index));
    const kind = Object.keys(tokenClasses).find(key => match.groups?.[key] !== undefined) as keyof typeof tokenClasses;
    result.push(<span key={index} className={tokenClasses[kind]}>{match[0]}</span>);
    cursor = index + match[0].length;
  }
  if (cursor < code.length) result.push(code.slice(cursor));
  return result;
}

type HandbookCodeProps = Omit<ComponentProps<typeof CodeBlock>, 'highlightedContent'> & {
  highlight?: boolean;
};

export function HandbookCode({ code, language, highlight = true, ...props }: HandbookCodeProps) {
  return (
    <CodeBlock
      {...props}
      code={code}
      language={language}
      highlightedContent={highlight ? highlightCode(code, language) : undefined}
    />
  );
}
