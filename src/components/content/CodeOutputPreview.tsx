import React, { useState } from "react";
import { Check, Copy, Terminal, BarChart2, Eye, ChevronDown, ChevronUp } from "lucide-react";

type CodeOutputPreviewProps = {
  code: string;
  language?: string;
  title?: string;
  output?: string;
  tableOutput?: {
    headers: string[];
    rows: (string | number)[][];
  };
  plot?: React.ReactNode;
  defaultExpanded?: boolean;
};

export function CodeOutputPreview({
  code,
  language = "python",
  title,
  output,
  tableOutput,
  plot,
  defaultExpanded = true,
}: CodeOutputPreviewProps) {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"output" | "plot">("output");
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasOutput = Boolean(output || tableOutput);
  const hasPlot = Boolean(plot);
  const hasAnyOutput = hasOutput || hasPlot;

  return (
    <div className="not-prose my-6 overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-950 shadow-md">
      {/* Code Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400">
            {language}
          </span>
          {title && (
            <span className="hidden sm:inline text-xs font-medium text-slate-400 border-l border-slate-700 pl-2.5">
              {title}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {hasAnyOutput && (
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
              title={isExpanded ? "Collapse preview" : "Expand preview"}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>{isExpanded ? "Hide Output" : "View Output"}</span>
              {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            title="Copy code to clipboard"
          >
            {copied ? (
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
        </div>
      </div>

      {/* Code Block */}
      <pre className="overflow-x-auto p-4 text-xs sm:text-sm font-mono leading-relaxed text-slate-200 bg-slate-950">
        <code>{code.trim()}</code>
      </pre>

      {/* Output / Plot Section */}
      {hasAnyOutput && isExpanded && (
        <div className="border-t border-slate-800 bg-slate-900/95">
          {/* Sub-header tabs if both text output and plot exist */}
          <div className="flex items-center justify-between border-b border-slate-800/80 px-4 py-2 bg-slate-900">
            <div className="flex items-center gap-3">
              {hasOutput && (
                <button
                  type="button"
                  onClick={() => setActiveTab("output")}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    activeTab === "output" || !hasPlot
                      ? "text-emerald-400 border-b-2 border-emerald-400 pb-0.5"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  <Terminal className="h-3.5 w-3.5" />
                  <span>Expected Output</span>
                </button>
              )}

              {hasPlot && (
                <button
                  type="button"
                  onClick={() => setActiveTab("plot")}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold transition-colors ${
                    activeTab === "plot" && hasOutput
                      ? "text-indigo-400 border-b-2 border-indigo-400 pb-0.5"
                      : hasOutput
                      ? "text-slate-400 hover:text-slate-200"
                      : "text-indigo-400 border-b-2 border-indigo-400 pb-0.5"
                  }`}
                >
                  <BarChart2 className="h-3.5 w-3.5" />
                  <span>Rendered Plot</span>
                </button>
              )}
            </div>
            <span className="text-[11px] font-mono text-slate-500">Python 3.12 · Verified</span>
          </div>

          {/* Active Tab Content */}
          <div className="p-4">
            {(activeTab === "output" || !hasPlot) && (
              <>
                {output && (
                  <pre className="overflow-x-auto rounded-xl bg-slate-950 p-3.5 text-xs sm:text-sm font-mono leading-relaxed text-emerald-400 border border-slate-800">
                    <code>{output.trim()}</code>
                  </pre>
                )}

                {tableOutput && (
                  <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-3">
                    <table className="w-full min-w-[340px] text-xs font-mono text-slate-300">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          {tableOutput.headers.map((h, i) => (
                            <th key={i} className="px-3 py-2 text-left font-bold">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {tableOutput.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="border-b border-slate-900/60 hover:bg-slate-900/40">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-3 py-1.5">{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}

            {activeTab === "plot" && hasPlot && (
              <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 sm:p-5">
                {plot}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
