import { useCallback, useEffect, useRef, useState } from "react";

export type PyodidePackage = "numpy" | "pandas" | "scikit-learn" | "matplotlib";
export type PythonWorkerPhase = "idle" | "loading-runtime" | "loading-packages" | "running";

export interface PythonExecutionResult {
  stdout: string;
  stderr: string;
  error?: string;
  plots: string[];
  durationMs: number;
}

interface WorkerStatusMessage {
  id: number;
  type: "status";
  phase: Exclude<PythonWorkerPhase, "idle">;
  packages?: string[];
}

interface WorkerResultMessage {
  id: number;
  type: "result";
  stdout: string;
  stderr: string;
  error?: string;
  plots: string[];
  durationMs: number;
}

type WorkerMessage = WorkerStatusMessage | WorkerResultMessage;

const MAX_CODE_CHARS = 32000;
const EXECUTION_TIMEOUT_MS = 5000;
const INITIALIZATION_TIMEOUT_MS = 120000;

type PendingRun = {
  id: number;
  resolve: (result: PythonExecutionResult) => void;
  reject: (error: Error) => void;
  initializationTimer: number;
  executionTimer?: number;
};

export function usePyodideWorker() {
  const workerRef = useRef<Worker | null>(null);
  const pendingRef = useRef<PendingRun | null>(null);
  const nextIdRef = useRef(0);
  const [phase, setPhase] = useState<PythonWorkerPhase>("idle");

  const stopWorker = useCallback(() => {
    workerRef.current?.terminate();
    workerRef.current = null;
  }, []);

  const clearPending = useCallback(() => {
    const pending = pendingRef.current;
    if (!pending) return null;
    window.clearTimeout(pending.initializationTimer);
    if (pending.executionTimer !== undefined) window.clearTimeout(pending.executionTimer);
    pendingRef.current = null;
    return pending;
  }, []);

  const run = useCallback((code: string, packages: PyodidePackage[] = []) => {
    if (typeof Worker === "undefined" || typeof WebAssembly === "undefined") {
      return Promise.reject(new Error("This browser does not support the local Python runtime. Copy the code to run it in a local Python 3 environment."));
    }
    if (!code.trim() || code.length > MAX_CODE_CHARS) {
      return Promise.reject(new Error(`Code must contain 1–${MAX_CODE_CHARS.toLocaleString()} characters.`));
    }
    if (pendingRef.current) {
      return Promise.reject(new Error("A Python run is already in progress."));
    }

    let worker = workerRef.current;
    try {
      if (!worker) {
        worker = new Worker("/python-worker.js", {
          type: "module",
          name: "learnmlacademy-python",
        });
        workerRef.current = worker;
      }
    } catch {
      return Promise.reject(new Error("The browser could not start the Python worker. The displayed code is still available to copy."));
    }

    const id = ++nextIdRef.current;
    return new Promise<PythonExecutionResult>((resolve, reject) => {
      const initializationTimer = window.setTimeout(() => {
        const pending = clearPending();
        stopWorker();
        setPhase("idle");
        pending?.resolve({
          stdout: "",
          stderr: "",
          error: "Python initialization took longer than two minutes. Check your connection and try again.",
          plots: [],
          durationMs: 0,
        });
      }, INITIALIZATION_TIMEOUT_MS);

      pendingRef.current = { id, resolve, reject, initializationTimer };

      worker!.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const message = event.data;
        if (!message || message.id !== id) return;

        if (message.type === "status") {
          setPhase(message.phase);
          if (message.phase === "running" && pendingRef.current) {
            window.clearTimeout(pendingRef.current.initializationTimer);
            pendingRef.current.executionTimer = window.setTimeout(() => {
              const pending = clearPending();
              stopWorker();
              setPhase("idle");
              pending?.resolve({
                stdout: "",
                stderr: "",
                error: "Execution stopped after five seconds. The worker was terminated; run again to start a fresh Python session.",
                plots: [],
                durationMs: EXECUTION_TIMEOUT_MS,
              });
            }, EXECUTION_TIMEOUT_MS);
          }
          return;
        }

        const pending = clearPending();
        setPhase("idle");
        pending?.resolve({
          stdout: message.stdout ?? "",
          stderr: message.stderr ?? "",
          error: message.error,
          plots: Array.isArray(message.plots) ? message.plots.slice(0, 4) : [],
          durationMs: Number.isFinite(message.durationMs) ? message.durationMs : 0,
        });
      };

      worker!.onerror = () => {
        const pending = clearPending();
        stopWorker();
        setPhase("idle");
        pending?.reject(new Error("The Python worker stopped unexpectedly. Reload the page and try again."));
      };

      worker!.postMessage({ id, code, packages });
    });
  }, [clearPending, stopWorker]);

  useEffect(() => () => {
    const pending = pendingRef.current;
    if (pending) {
      window.clearTimeout(pending.initializationTimer);
      if (pending.executionTimer !== undefined) window.clearTimeout(pending.executionTimer);
      pending.reject(new Error("Python execution was cancelled because the lesson was closed."));
      pendingRef.current = null;
    }
    workerRef.current?.terminate();
    workerRef.current = null;
  }, []);

  return { run, phase };
}
