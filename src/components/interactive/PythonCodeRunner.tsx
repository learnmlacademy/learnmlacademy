import { useState } from "react";
import { AlertTriangle, Check, Copy, Play, RotateCcw, Terminal } from "lucide-react";
import { CodeBlock } from "../content/CodeBlock";
import { usePyodideWorker, type PyodidePackage, type PythonExecutionResult } from "../../hooks/usePyodideWorker";

interface PythonCodeRunnerProps {
  code: string;
  title: string;
  description?: string;
  packages?: PyodidePackage[];
  caption?: string;
  className?: string;
}

const phaseLabels = {
  idle: "Ready when you are",
  "loading-runtime": "Loading Python runtime…",
  "loading-packages": "Loading required scientific packages…",
  running: "Running Python in a separate browser thread…",
};

export function PythonCodeRunner({
  code,
  title,
  description,
  packages = [],
  caption = "Runs locally in your browser after you select Run Code. No code is uploaded to a LearnMLAcademy server.",
  className,
}: PythonCodeRunnerProps) {
  const { run, phase } = usePyodideWorker();
  const [result, setResult] = useState<PythonExecutionResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");

  const handleRun = async () => {
    setIsRunning(true);
    setResult(null);
    try {
      setResult(await run(code, packages));
    } catch (error) {
      setResult({
        stdout: "",
        stderr: "",
        error: error instanceof Error ? error.message : "Python execution failed.",
        plots: [],
        durationMs: 0,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyState("copied");
    } catch {
      setCopyState("error");
    }
    window.setTimeout(() => setCopyState("idle"), 1800);
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <section className={className} data-python-runner>
      {description && <p className="mb-3 text-sm leading-relaxed text-slate-600">{description}</p>}
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
        <div className="min-w-0">
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="text-xs text-slate-600">{phaseLabels[phase]}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" onClick={handleCopy} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">
            {copyState === "copied" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copyState === "copied" ? "Copied" : copyState === "error" ? "Copy failed" : "Copy"}
          </button>
          <button type="button" onClick={handleRun} disabled={isRunning} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 disabled:cursor-wait disabled:opacity-60">
            <Play className="h-3.5 w-3.5 fill-current" />
            {isRunning ? "Running…" : "Run Code"}
          </button>
          {result && <button type="button" onClick={handleReset} className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100">
            <RotateCcw className="h-3.5 w-3.5" /> Clear
          </button>}
        </div>
      </div>
      <CodeBlock code={code} language="python" type="runnable" title={title} caption={caption} />
      {result && (
        <div className="mt-3 overflow-hidden rounded-xl border border-slate-800 bg-slate-950" data-python-output>
          <div className="flex items-center gap-2 border-b border-slate-800 px-4 py-2 text-xs font-bold uppercase tracking-wide text-slate-300">
            <Terminal className="h-4 w-4 text-emerald-400" />
            Actual Python output
            {result.durationMs > 0 && <span className="ml-auto font-normal normal-case text-slate-500">{result.durationMs} ms</span>}
          </div>
          {result.error && (
            <div className="flex items-start gap-2 border-b border-rose-900/60 bg-rose-950/50 px-4 py-3 text-sm text-rose-200">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
              <pre className="whitespace-pre-wrap font-mono text-xs">{result.error}</pre>
            </div>
          )}
          {result.stdout && <pre className="max-h-72 overflow-auto whitespace-pre-wrap px-4 py-3 font-mono text-xs leading-relaxed text-emerald-300">{result.stdout}</pre>}
          {result.stderr && <pre className="max-h-40 overflow-auto whitespace-pre-wrap border-t border-amber-900/60 px-4 py-3 font-mono text-xs leading-relaxed text-amber-200">{result.stderr}</pre>}
          {result.plots.length > 0 && <div className="grid gap-3 border-t border-slate-800 p-3">
            {result.plots.map((plot, index) => <img key={index} src={plot} alt={`Python-generated plot ${index + 1}`} className="h-auto max-w-full rounded-lg bg-white" loading="lazy" />)}
          </div>}
          {!result.error && !result.stdout && !result.stderr && result.plots.length === 0 && <p className="px-4 py-3 text-sm text-slate-400">The script completed without printed output or a plot.</p>}
        </div>
      )}
      <p className="mt-2 text-xs leading-relaxed text-slate-500">This browser runtime is for small teaching examples. It blocks arbitrary network destinations from the worker, limits code/output size, and stops computation after five seconds. It is not a production security sandbox or a hard memory quota.</p>
    </section>
  );
}
