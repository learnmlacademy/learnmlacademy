import React, { useState, useId } from 'react';
import { Play, RotateCcw, Copy, Check, Terminal, Sliders, Sparkles, CheckCircle2 } from 'lucide-react';

export interface CodeParameter {
  id: string;
  name: string;
  label: string;
  type: 'number' | 'slider' | 'select';
  min?: number;
  max?: number;
  step?: number;
  options?: { label: string; value: string | number }[];
  defaultValue: number | string;
  description?: string;
}

export interface SimulationResult {
  stdout: string;
  metrics?: { label: string; value: string | number; highlight?: boolean }[];
  observation?: string;
  executionTimeMs?: number;
}

interface RunnableCodeBlockProps {
  title: string;
  description?: string;
  defaultCode: string;
  language?: string;
  parameters?: CodeParameter[];
  simulateRun: (params: Record<string, any>, currentCode: string) => SimulationResult;
  className?: string;
}

export const RunnableCodeBlock: React.FC<RunnableCodeBlockProps> = ({
  title,
  description,
  defaultCode,
  language = 'python',
  parameters = [],
  simulateRun,
  className = '',
}) => {
  const componentId = useId();
  // Initialize parameter state
  const initialParams = parameters.reduce<Record<string, any>>((acc, param) => {
    acc[param.id] = param.defaultValue;
    return acc;
  }, {});

  const [params, setParams] = useState<Record<string, any>>(initialParams);
  const [code, setCode] = useState<string>(() => generateCodeWithParams(defaultCode, initialParams));
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [output, setOutput] = useState<SimulationResult | null>(null);
  const [hasCopied, setHasCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'output' | 'metrics'>('output');

  // Replace parameters in code when changed
  function generateCodeWithParams(template: string, currentParams: Record<string, any>): string {
    let updated = template;
    Object.entries(currentParams).forEach(([key, val]) => {
      // Look for comments like /*PARAM:key*/ or variable assignments like key = <value>
      const paramRegex = new RegExp(`(#?\\s*${key}\\s*=\\s*)([^\\n#]+)`, 'g');
      if (paramRegex.test(updated)) {
        updated = updated.replace(paramRegex, `$1${typeof val === 'string' ? `'${val}'` : val}`);
      }
    });
    return updated;
  }

  const handleParamChange = (paramId: string, value: any) => {
    const nextParams = { ...params, [paramId]: value };
    setParams(nextParams);
    setCode(generateCodeWithParams(defaultCode, nextParams));
  };

  const handleReset = () => {
    setParams(initialParams);
    setCode(generateCodeWithParams(defaultCode, initialParams));
    setOutput(null);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    // Simulate realistic execution delay (250ms)
    setTimeout(() => {
      const result = simulateRun(params, code);
      setOutput({
        ...result,
        executionTimeMs: result.executionTimeMs || Math.floor(25 + Math.random() * 30),
      });
      setIsRunning(false);
      setActiveTab('output');
    }, 280);
  };

  const lines = code.split('\n');

  return (
    <div className={`my-8 overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-xl ${className}`}>
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-full bg-rose-500/80" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-indigo-300">
                {language}
              </span>
              <h4 className="text-sm font-bold text-slate-100 sm:text-base">{title}</h4>
            </div>
            {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            title="Copy code"
          >
            {hasCopied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-700 hover:text-white"
            title="Reset to default code"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>
          <button
            type="button"
            onClick={handleRun}
            disabled={isRunning}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white shadow-md shadow-emerald-950/50 transition hover:bg-emerald-500 active:scale-98 disabled:opacity-50"
          >
            <Play className={`h-3.5 w-3.5 fill-current ${isRunning ? 'animate-pulse' : ''}`} />
            <span>{isRunning ? 'Running…' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Parameters Bar (if parameters provided) */}
      {parameters.length > 0 && (
        <div className="border-b border-slate-800 bg-slate-900/60 p-4">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <Sliders className="h-4 w-4" />
            <span>Live Hyperparameters (Tweak &amp; Re-run)</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {parameters.map((param) => (
              <div key={param.id} className="rounded-xl border border-slate-800 bg-slate-900 p-3">
                <div className="flex items-center justify-between text-xs">
                  <label htmlFor={`${componentId}-${param.id}`} className="font-semibold text-slate-300">{param.label}</label>
                  <span className="font-mono font-bold text-indigo-300">
                    {params[param.id]}
                  </span>
                </div>
                {param.type === 'slider' && (
                  <div className="mt-2">
                    <input
                      id={`${componentId}-${param.id}`}
                      type="range"
                      min={param.min ?? 1}
                      max={param.max ?? 10}
                      step={param.step ?? 1}
                      value={params[param.id]}
                      onChange={(e) =>
                        handleParamChange(
                          param.id,
                          param.step && param.step < 1 ? parseFloat(e.target.value) : parseInt(e.target.value, 10)
                        )
                      }
                      className="w-full accent-indigo-500 cursor-pointer"
                    />
                    <div className="mt-1 flex justify-between text-[10px] text-slate-500 font-mono">
                      <span>{param.min}</span>
                      <span>{param.max}</span>
                    </div>
                  </div>
                )}
                {param.type === 'select' && param.options && (
                  <select
                    id={`${componentId}-${param.id}`}
                    value={params[param.id]}
                    onChange={(e) => handleParamChange(param.id, e.target.value)}
                    className="mt-2 w-full rounded border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-mono text-slate-200 focus:border-indigo-500 focus:outline-none"
                  >
                    {param.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}
                {param.description && (
                  <p className="mt-1.5 text-[11px] text-slate-400 leading-tight">{param.description}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Code Area */}
      <div className="max-h-[380px] overflow-auto bg-slate-950 p-4 font-mono text-xs sm:text-sm leading-relaxed text-slate-300">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-slate-900/50">
                <td className="w-8 select-none pr-4 text-right text-xs text-slate-600 align-top">
                  {idx + 1}
                </td>
                <td className="whitespace-pre break-words font-mono text-slate-300">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Output / Terminal Window */}
      {output && (
        <div className="border-t border-slate-800 bg-slate-900/90 p-4 sm:p-5">
          <div className="mb-3 flex items-center justify-between border-b border-slate-800 pb-2.5">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Execution Output ($ python main.py)
              </span>
            </div>
            {output.executionTimeMs && (
              <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                <CheckCircle2 className="h-3 w-3" />
                <span>Finished in {output.executionTimeMs}ms</span>
              </div>
            )}
          </div>

          {/* Metrics Pills (if available) */}
          {output.metrics && output.metrics.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2.5">
              {output.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-mono ${
                    metric.highlight
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300'
                      : 'border-slate-700 bg-slate-800/80 text-slate-300'
                  }`}
                >
                  <span className="text-slate-400 font-sans text-[11px]">{metric.label}:</span>
                  <span className="font-bold">{metric.value}</span>
                </div>
              ))}
            </div>
          )}

          {/* Console Text Output */}
          <pre className="max-h-[220px] overflow-auto rounded-xl border border-slate-800 bg-black/60 p-3.5 font-mono text-xs sm:text-sm text-emerald-400 leading-relaxed">
            {output.stdout}
          </pre>

          {/* Pedagogical Observation */}
          {output.observation && (
            <div className="mt-3.5 flex items-start gap-2.5 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3 text-xs text-indigo-200">
              <Sparkles className="h-4 w-4 shrink-0 text-indigo-400 mt-0.5" />
              <div>
                <strong className="font-bold text-indigo-100">Learner Takeaway: </strong>
                <span>{output.observation}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Prompt to run if not run yet */}
      {!output && (
        <div className="border-t border-slate-800 bg-slate-900/40 px-5 py-3 text-center text-xs text-slate-400">
          Click <strong className="text-emerald-400">"Run Code"</strong> above to execute this script in the sandbox and inspect live outputs.
        </div>
      )}
    </div>
  );
};
