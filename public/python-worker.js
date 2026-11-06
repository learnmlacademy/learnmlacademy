const PYODIDE_BASE_URL = "https://cdn.jsdelivr.net/pyodide/v314.0.7/full/";
const ALLOWED_PACKAGES = new Set(["numpy", "pandas", "scikit-learn", "matplotlib"]);
const MAX_CODE_CHARS = 32000;
const MAX_OUTPUT_CHARS = 64000;
const MAX_PLOTS = 4;
const MAX_PLOT_BASE64_CHARS = 1500000;
const PLOT_SENTINEL = "__LEARNMLACADEMY_PLOT__";

let pyodidePromise;
let loadedPackages = new Set();
let matplotlibReady = false;

function send(id, payload) {
  self.postMessage({ id, ...payload });
}

async function getPyodide(id) {
  if (!pyodidePromise) {
    send(id, { type: "status", phase: "loading-runtime" });
    pyodidePromise = (async () => {
      const { loadPyodide } = await import(PYODIDE_BASE_URL + "pyodide.mjs");
      return loadPyodide({ indexURL: PYODIDE_BASE_URL });
    })();
  }
  return pyodidePromise;
}

async function prepareMatplotlib(pyodide) {
  if (matplotlibReady) return;
  await pyodide.runPythonAsync(`
import io as _lma_io
import base64 as _lma_base64
import matplotlib as _lma_matplotlib
_lma_matplotlib.use("Agg")
import matplotlib.pyplot as _lma_plt

def _lma_capture_plot():
    _lma_buffer = _lma_io.BytesIO()
    _lma_plt.gcf().savefig(
        _lma_buffer,
        format="png",
        dpi=100,
        bbox_inches="tight",
    )
    print("${PLOT_SENTINEL}" + _lma_base64.b64encode(_lma_buffer.getvalue()).decode("ascii"))
    _lma_plt.close("all")

_lma_plt.show = _lma_capture_plot
`);
  matplotlibReady = true;
}

self.onmessage = async (event) => {
  const { id, code, packages = [] } = event.data ?? {};
  if (!id) return;

  if (typeof code !== "string" || code.length === 0 || code.length > MAX_CODE_CHARS) {
    send(id, {
      type: "result",
      error: `Python input must contain 1–${MAX_CODE_CHARS.toLocaleString()} characters.`,
      stdout: "",
      stderr: "",
      plots: [],
      durationMs: 0,
    });
    return;
  }

  if (!Array.isArray(packages) || packages.some((name) => !ALLOWED_PACKAGES.has(name))) {
    send(id, {
      type: "result",
      error: "This example requested a package that is not on the approved list.",
      stdout: "",
      stderr: "",
      plots: [],
      durationMs: 0,
    });
    return;
  }

  let executionStartTime = 0;
  let stdoutLength = 0;
  let stderrLength = 0;
  const stdoutChunks = [];
  const stderrChunks = [];
  try {
    const pyodide = await getPyodide(id);
    const missingPackages = [...new Set(packages)].filter((name) => !loadedPackages.has(name));
    if (missingPackages.length > 0) {
      send(id, { type: "status", phase: "loading-packages", packages: missingPackages });
      await pyodide.loadPackage(missingPackages);
      missingPackages.forEach((name) => loadedPackages.add(name));
    }

    const wantsMatplotlib = packages.includes("matplotlib");
    if (wantsMatplotlib) await prepareMatplotlib(pyodide);

    pyodide.setStdout({
      batched: (text) => {
        const remaining = MAX_OUTPUT_CHARS - stdoutLength;
        if (remaining > 0) {
          const chunk = text.slice(0, remaining);
          stdoutChunks.push(chunk);
          stdoutLength += chunk.length;
        }
      },
    });
    pyodide.setStderr({
      batched: (text) => {
        const remaining = MAX_OUTPUT_CHARS - stderrLength;
        if (remaining > 0) {
          const chunk = text.slice(0, remaining);
          stderrChunks.push(chunk);
          stderrLength += chunk.length;
        }
      },
    });

    executionStartTime = performance.now();
    send(id, { type: "status", phase: "running" });
    await pyodide.runPythonAsync(code);

    let stdout = stdoutChunks.join("\n");
    const stderr = stderrChunks.join("\n");
    const plots = [];
    if (wantsMatplotlib) {
      const outputLines = stdout.split(/\r?\n/);
      const visibleLines = [];
      for (const line of outputLines) {
        if (line.startsWith(PLOT_SENTINEL)) {
          const plot = line.slice(PLOT_SENTINEL.length);
          if (plots.length < MAX_PLOTS && plot.length <= MAX_PLOT_BASE64_CHARS) {
            plots.push(`data:image/png;base64,${plot}`);
          }
        } else {
          visibleLines.push(line);
        }
      }
      stdout = visibleLines.join("\n");
    }

    if (stdout.length > MAX_OUTPUT_CHARS) stdout = stdout.slice(0, MAX_OUTPUT_CHARS) + "\n[Output truncated]";
    send(id, {
      type: "result",
      stdout,
      stderr,
      plots,
      durationMs: executionStartTime ? Math.round(performance.now() - executionStartTime) : 0,
    });
  } catch (error) {
    send(id, {
      type: "result",
      stdout: stdoutChunks.join("\n").slice(0, MAX_OUTPUT_CHARS),
      stderr: stderrChunks.join("\n").slice(0, MAX_OUTPUT_CHARS),
      plots: [],
      error: (error instanceof Error ? error.message : String(error)).slice(0, MAX_OUTPUT_CHARS),
      durationMs: executionStartTime ? Math.round(performance.now() - executionStartTime) : 0,
    });
  }
};
