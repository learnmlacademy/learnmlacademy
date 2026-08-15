import React from 'react';

const CodeBlock = ({ code, output }: { code: string; output?: string }) => (
  <div className="not-prose my-4 rounded-xl overflow-hidden border border-slate-200 shadow-sm">
    <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
      <div className="flex gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500"/><span className="w-3 h-3 rounded-full bg-yellow-500"/><span className="w-3 h-3 rounded-full bg-green-500"/></div>
      <span className="text-slate-400 text-xs font-mono ml-2">Python</span>
    </div>
    <pre className="bg-slate-900 p-4 text-sm font-mono text-slate-200 overflow-x-auto leading-relaxed">{code}</pre>
    {output && (
      <>
        <div className="bg-slate-700 px-4 py-1.5 text-xs text-slate-400 font-mono border-t border-slate-600">Output</div>
        <pre className="bg-slate-950 p-4 text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed">{output}</pre>
      </>
    )}
  </div>
);

const SectionHeader = ({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) => (
  <div className="not-prose flex items-start gap-4 my-8 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
    <span className="text-3xl">{icon}</span>
    <div>
      <h2 className="font-extrabold text-indigo-900 text-xl">{title}</h2>
      <p className="text-indigo-700 text-sm mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export function NumpyContent() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">NumPy for Machine Learning</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-2">
        NumPy (<strong>Num</strong>erical <strong>Py</strong>thon) is one of the most important numerical libraries in the Python ML ecosystem. pandas and scikit-learn work closely with NumPy arrays, while frameworks such as TensorFlow and PyTorch use their own tensor objects with similar array-based ideas. Learning NumPy gives you a strong foundation for understanding how numerical data is represented and processed in ML.
      </p>

      <div className="not-prose my-6 rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <h2 className="text-xl font-extrabold text-sky-950 mb-2">NumPy in Simple Words</h2>
        <p className="text-sm text-sky-900 leading-relaxed mb-4">
          Think of NumPy as a fast way to store and calculate with many numbers together. In Machine Learning, one row often represents one example and one column represents one feature.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm border-collapse bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-sky-100 text-sky-950">
                <th className="border border-sky-200 px-3 py-2 text-left">Student</th>
                <th className="border border-sky-200 px-3 py-2 text-center">Study Hours</th>
                <th className="border border-sky-200 px-3 py-2 text-center">Attendance %</th>
                <th className="border border-sky-200 px-3 py-2 text-center">Previous Marks</th>
              </tr>
            </thead>
            <tbody className="text-slate-700">
              <tr><td className="border border-sky-100 px-3 py-2 font-semibold">A</td><td className="border border-sky-100 px-3 py-2 text-center">2</td><td className="border border-sky-100 px-3 py-2 text-center">70</td><td className="border border-sky-100 px-3 py-2 text-center">55</td></tr>
              <tr><td className="border border-sky-100 px-3 py-2 font-semibold">B</td><td className="border border-sky-100 px-3 py-2 text-center">4</td><td className="border border-sky-100 px-3 py-2 text-center">85</td><td className="border border-sky-100 px-3 py-2 text-center">72</td></tr>
              <tr><td className="border border-sky-100 px-3 py-2 font-semibold">C</td><td className="border border-sky-100 px-3 py-2 text-center">5</td><td className="border border-sky-100 px-3 py-2 text-center">90</td><td className="border border-sky-100 px-3 py-2 text-center">80</td></tr>
            </tbody>
          </table>
        </div>

        <div className="grid md:grid-cols-3 gap-3 mt-4 text-sm">
          <div className="rounded-xl bg-white border border-sky-100 p-3">
            <p className="font-bold text-slate-900">Rows</p>
            <p className="text-slate-600 mt-1">Each row is one student (one sample).</p>
          </div>
          <div className="rounded-xl bg-white border border-sky-100 p-3">
            <p className="font-bold text-slate-900">Columns</p>
            <p className="text-slate-600 mt-1">Each numeric column is a feature.</p>
          </div>
          <div className="rounded-xl bg-white border border-sky-100 p-3">
            <p className="font-bold text-slate-900">NumPy Array</p>
            <p className="text-slate-600 mt-1">NumPy can store the numeric part as one 2D array.</p>
          </div>
        </div>
      </div>

      <div className="not-prose my-6 rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-lg font-extrabold text-slate-900 mb-3">Python List vs NumPy Array</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead><tr className="bg-slate-100">
              <th className="border border-slate-200 px-3 py-2 text-left">Question</th>
              <th className="border border-slate-200 px-3 py-2 text-left">Python List</th>
              <th className="border border-slate-200 px-3 py-2 text-left">NumPy Array</th>
            </tr></thead>
            <tbody>
              <tr><td className="border border-slate-200 px-3 py-2 font-semibold">Main use</td><td className="border border-slate-200 px-3 py-2">General Python data</td><td className="border border-slate-200 px-3 py-2">Numerical calculations</td></tr>
              <tr><td className="border border-slate-200 px-3 py-2 font-semibold">Element types</td><td className="border border-slate-200 px-3 py-2">Can mix types</td><td className="border border-slate-200 px-3 py-2">Usually one data type</td></tr>
              <tr><td className="border border-slate-200 px-3 py-2 font-semibold">Math on all values</td><td className="border border-slate-200 px-3 py-2">Usually needs a loop/comprehension</td><td className="border border-slate-200 px-3 py-2">Vectorised operations</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          { icon: '⚡', label: 'Fast vectorised ops', sub: 'Often much faster than Python loops' },
          { icon: '🔢', label: 'N-dimensional arrays', sub: 'Scalars, vectors, matrices, tensors' },
          { icon: '🧮', label: 'Linear algebra', sub: 'dot, matmul, inv, eig' },
          { icon: '📊', label: 'Statistical functions', sub: 'mean, std, percentile, corrcoef' },
        ].map(f => (
          <div key={f.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{f.icon}</div>
            <p className="text-xs font-bold text-slate-800">{f.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{f.sub}</p>
          </div>
        ))}
      </div>

      <CodeBlock code={`# Installation (run once in terminal)
pip install numpy

# Import convention — always use 'np' alias
import numpy as np
print(np.__version__)   # prints the NumPy version installed on your system`} output={`Example: 2.x (your version may differ)`} />

      {/* ── 1. Arrays ── */}
      <SectionHeader icon="🔢" title="1. Creating Arrays" subtitle="The ndarray is NumPy's core data structure — think of it as a turbo-charged Python list" />

      <CodeBlock code={`# From Python list
a = np.array([10, 20, 30, 40, 50])
print(a)
print(type(a))
print(a.dtype)    # data type of elements
print(a.shape)    # tuple: (5,) means 1D array of 5 elements
print(a.ndim)     # number of dimensions`}
output={`[10 20 30 40 50]
<class 'numpy.ndarray'>
int64
(5,)
1`} />

      <div className="not-prose my-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <h3 className="text-base font-extrabold text-indigo-950 mb-2">See a 2D Array Before Coding It</h3>
        <p className="text-sm text-indigo-900 mb-3">
          Here the array has <strong>3 rows</strong> and <strong>3 columns</strong>, so its shape is <code>(3, 3)</code>.
        </p>
        <div className="flex justify-center">
          <div className="inline-grid grid-cols-3 gap-1 bg-white border border-indigo-100 rounded-xl p-3 text-center font-mono text-sm text-slate-800">
            {[1,2,3,4,5,6,7,8,9].map(n => <span key={n} className="w-10 h-9 flex items-center justify-center rounded bg-indigo-50 border border-indigo-100">{n}</span>)}
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-2 mt-4 text-xs text-slate-700">
          <div className="bg-white border border-indigo-100 rounded-lg p-2"><strong>shape = (3, 3)</strong><br/>3 rows × 3 columns</div>
          <div className="bg-white border border-indigo-100 rounded-lg p-2"><strong>ndim = 2</strong><br/>It has two axes</div>
          <div className="bg-white border border-indigo-100 rounded-lg p-2"><strong>size = 9</strong><br/>9 values in total</div>
        </div>
      </div>

      <CodeBlock code={`# 2D array (matrix) — common in ML for feature matrices
X = np.array([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
])
print(X.shape)   # (3, 3) → 3 rows, 3 columns (3 samples × 3 features)
print(X.ndim)    # 2 dimensions`}
output={`(3, 3)
2`} />

      <CodeBlock code={`# Built-in array creators — essential in ML
np.zeros((3, 4))          # 3×4 matrix of zeros  (initialise weights)
np.ones((2, 5))           # 2×5 matrix of ones
np.eye(4)                 # 4×4 identity matrix
np.arange(0, 10, 2)       # [0, 2, 4, 6, 8]  — like range()
np.linspace(0, 1, 5)      # [0. 0.25 0.5 0.75 1.0]  — evenly spaced
np.random.randn(3, 3)     # 3×3 standard normal random values
np.random.randint(1,100, size=(4,)) # 4 random integers 1–99

print(np.arange(0, 10, 2))
print(np.linspace(0, 1, 5))`}
output={`[0 2 4 6 8]
[0.   0.25 0.5  0.75 1.  ]`} />

      {/* ── 2. Indexing ── */}
      <SectionHeader icon="✂️" title="2. Indexing & Slicing" subtitle="Access specific rows, columns, or subsets — critical for train/test splits and feature extraction" />

      <CodeBlock code={`a = np.array([10, 20, 30, 40, 50])

# Basic indexing (0-based)
print(a[0])     # 10  — first element
print(a[-1])    # 50  — last element
print(a[1:4])   # [20 30 40]  — slice (start:stop, stop excluded)
print(a[::2])   # [10 30 50]  — every 2nd element`}
output={`10
50
[20 30 40]
[10 30 50]`} />

      <div className="not-prose my-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
        <h3 className="text-base font-extrabold text-violet-950 mb-2">How 2D Indexing Looks</h3>
        <p className="text-sm text-violet-900 mb-3">For <code>X[row, column]</code>, choose the row first and then the column.</p>
        <div className="overflow-x-auto">
          <table className="mx-auto text-center text-sm border-collapse bg-white">
            <thead><tr><th className="px-3 py-2 text-slate-500"></th><th className="border border-violet-200 px-4 py-2 text-violet-800">Col 0</th><th className="border border-violet-200 px-4 py-2 bg-violet-100 text-violet-950">Col 1</th><th className="border border-violet-200 px-4 py-2 text-violet-800">Col 2</th></tr></thead>
            <tbody>
              <tr><th className="border border-violet-200 px-3 py-2 text-violet-800">Row 0</th><td className="border border-violet-200 px-4 py-2">1</td><td className="border border-violet-200 px-4 py-2 bg-violet-100 font-bold">2</td><td className="border border-violet-200 px-4 py-2">3</td></tr>
              <tr><th className="border border-violet-200 px-3 py-2 text-violet-800">Row 1</th><td className="border border-violet-200 px-4 py-2">4</td><td className="border border-violet-200 px-4 py-2 bg-violet-100 font-bold">5</td><td className="border border-violet-200 px-4 py-2">6</td></tr>
              <tr><th className="border border-violet-200 px-3 py-2 text-violet-800">Row 2</th><td className="border border-violet-200 px-4 py-2">7</td><td className="border border-violet-200 px-4 py-2 bg-violet-100 font-bold">8</td><td className="border border-violet-200 px-4 py-2">9</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-violet-900 mt-3"><code>X[:, 1]</code> means: <strong>all rows</strong>, but only <strong>column 1</strong> → <code>[2, 5, 8]</code>.</p>
      </div>

      <CodeBlock code={`# 2D indexing — very common in ML
X = np.array([[1,2,3],[4,5,6],[7,8,9]])

print(X[0])         # First row:   [1 2 3]
print(X[:, 1])      # Second column: [2 5 8]
print(X[0:2, 1:3])  # Rows 0-1, Cols 1-2  — submatrix
print(X[-1, -1])    # Last row, last col: 9`}
output={`[1 2 3]
[2 5 8]
[[2 3]
 [5 6]]
9`} />

      <CodeBlock code={`# Boolean (conditional) indexing — filter rows meeting a condition
scores = np.array([45, 72, 88, 55, 91, 63])

# Who scored above 70?
mask = scores > 70
print(mask)           # [False  True  True False  True False]
print(scores[mask])   # [72 88 91]

# One-liner
print(scores[scores > 70])`}
output={`[False  True  True False  True False]
[72 88 91]
[72 88 91]`} />

      {/* ── 3. Math operations ── */}
      <SectionHeader icon="➕" title="3. Vectorised Math Operations" subtitle="Apply numerical operations across arrays without writing a Python loop for each element" />

      <div className="not-prose my-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <h3 className="text-base font-extrabold text-emerald-950 mb-2">Vectorisation: One Instruction, Many Numbers</h3>
        <div className="grid sm:grid-cols-3 gap-3 items-center text-center text-sm">
          <div className="bg-white border border-emerald-100 rounded-xl p-3 font-mono">[1, 2, 3, 4]</div>
          <div className="font-bold text-emerald-800">× 3 →</div>
          <div className="bg-white border border-emerald-100 rounded-xl p-3 font-mono">[3, 6, 9, 12]</div>
        </div>
        <p className="text-sm text-emerald-900 mt-3">You write one NumPy operation; NumPy applies it across the array without you writing a Python loop for each value.</p>
      </div>

      <CodeBlock code={`a = np.array([1, 2, 3, 4])

# Element-wise arithmetic (no loop needed!)
print(a + 10)      # [11 12 13 14]
print(a * 3)       # [ 3  6  9 12]
print(a ** 2)      # [ 1  4  9 16]
print(np.sqrt(a))  # [1.  1.414 1.732 2.]

# Two arrays
b = np.array([10, 20, 30, 40])
print(a + b)       # [11 22 33 44]
print(a * b)       # [10 40 90 160]`}
output={`[11 12 13 14]
[ 3  6  9 12]
[ 1  4  9 16]
[1.         1.41421356 1.73205081 2.        ]
[11 22 33 44]
[ 10  40  90 160]`} />

      <div className="not-prose my-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
        <h3 className="text-base font-extrabold text-cyan-950 mb-2">Broadcasting — See the Idea First</h3>
        <p className="text-sm text-cyan-900 mb-3">NumPy can apply a shorter compatible row of values across several rows automatically.</p>
        <div className="overflow-x-auto">
          <table className="mx-auto text-center text-sm border-collapse bg-white">
            <tbody>
              <tr><td className="border border-cyan-200 px-3 py-2 font-mono">1</td><td className="border border-cyan-200 px-3 py-2 font-mono">2</td><td className="border border-cyan-200 px-3 py-2 font-mono">3</td><td className="px-3 py-2 font-bold text-cyan-800">−</td><td className="border border-cyan-200 px-3 py-2 bg-cyan-100 font-mono">2.5</td><td className="border border-cyan-200 px-3 py-2 bg-cyan-100 font-mono">3.5</td><td className="border border-cyan-200 px-3 py-2 bg-cyan-100 font-mono">4.5</td><td className="px-3 py-2 font-bold">=</td><td className="border border-cyan-200 px-3 py-2 font-mono">-1.5</td><td className="border border-cyan-200 px-3 py-2 font-mono">-1.5</td><td className="border border-cyan-200 px-3 py-2 font-mono">-1.5</td></tr>
              <tr><td className="border border-cyan-200 px-3 py-2 font-mono">4</td><td className="border border-cyan-200 px-3 py-2 font-mono">5</td><td className="border border-cyan-200 px-3 py-2 font-mono">6</td><td className="px-3 py-2 font-bold text-cyan-800">−</td><td className="border border-cyan-200 px-3 py-2 bg-cyan-100 font-mono">2.5</td><td className="border border-cyan-200 px-3 py-2 bg-cyan-100 font-mono">3.5</td><td className="border border-cyan-200 px-3 py-2 bg-cyan-100 font-mono">4.5</td><td className="px-3 py-2 font-bold">=</td><td className="border border-cyan-200 px-3 py-2 font-mono">1.5</td><td className="border border-cyan-200 px-3 py-2 font-mono">1.5</td><td className="border border-cyan-200 px-3 py-2 font-mono">1.5</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-cyan-800 mt-3">The row <code>[2.5, 3.5, 4.5]</code> is not literally copied first; NumPy follows broadcasting rules so the operation behaves as if it were aligned with each compatible row.</p>
      </div>

      <CodeBlock code={`# Broadcasting — NumPy aligns compatible shapes for arithmetic
# This subtraction pattern is one idea used in feature scaling.
X = np.array([[1, 2, 3],
              [4, 5, 6]])          # shape (2, 3)
mean = np.array([2.5, 3.5, 4.5])  # shape (3,) → broadcast across rows

print(X - mean)   # subtract mean of each column from every row`}
output={`[[-1.5 -1.5 -1.5]
 [ 1.5  1.5  1.5]]`} />

      {/* ── 4. Statistics ── */}
      <SectionHeader icon="📊" title="4. Statistical Functions" subtitle="These are the building blocks of data analysis and feature engineering" />

      <CodeBlock code={`data = np.array([23, 45, 12, 67, 34, 89, 56, 11, 78, 42])

print(f"Mean:     {np.mean(data):.2f}")
print(f"Median:   {np.median(data):.2f}")
print(f"Std dev:  {np.std(data):.2f}")
print(f"Variance: {np.var(data):.2f}")
print(f"Min:      {np.min(data)}, Max: {np.max(data)}")
print(f"25th pct: {np.percentile(data, 25)}")
print(f"75th pct: {np.percentile(data, 75)}")
print(f"Sum:      {np.sum(data)}")`}
output={`Mean:     45.70
Median:   43.50
Std dev:  25.46
Variance: 648.41
Min:      11, Max: 89
25th pct: 25.75
75th pct: 64.25
Sum:      457`} />

      <div className="not-prose my-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="text-base font-extrabold text-amber-950 mb-2">Understanding <code>axis</code> with Student Marks</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm border-collapse bg-white">
            <thead><tr className="bg-amber-100"><th className="border border-amber-200 px-3 py-2">Student</th><th className="border border-amber-200 px-3 py-2">Maths</th><th className="border border-amber-200 px-3 py-2">English</th><th className="border border-amber-200 px-3 py-2">Science</th><th className="border border-amber-200 px-3 py-2">Row mean<br/><span className="font-normal">axis=1</span></th></tr></thead>
            <tbody>
              <tr><td className="border border-amber-200 px-3 py-2 font-semibold">1</td><td className="border border-amber-200 px-3 py-2 text-center">80</td><td className="border border-amber-200 px-3 py-2 text-center">75</td><td className="border border-amber-200 px-3 py-2 text-center">90</td><td className="border border-amber-200 px-3 py-2 text-center font-bold">81.67</td></tr>
              <tr><td className="border border-amber-200 px-3 py-2 font-semibold">2</td><td className="border border-amber-200 px-3 py-2 text-center">65</td><td className="border border-amber-200 px-3 py-2 text-center">88</td><td className="border border-amber-200 px-3 py-2 text-center">72</td><td className="border border-amber-200 px-3 py-2 text-center font-bold">75.00</td></tr>
              <tr><td className="border border-amber-200 px-3 py-2 font-semibold">3</td><td className="border border-amber-200 px-3 py-2 text-center">92</td><td className="border border-amber-200 px-3 py-2 text-center">60</td><td className="border border-amber-200 px-3 py-2 text-center">85</td><td className="border border-amber-200 px-3 py-2 text-center font-bold">79.00</td></tr>
              <tr className="bg-amber-50"><td className="border border-amber-200 px-3 py-2 font-bold">Column mean<br/><span className="font-normal">axis=0</span></td><td className="border border-amber-200 px-3 py-2 text-center font-bold">79.00</td><td className="border border-amber-200 px-3 py-2 text-center font-bold">74.33</td><td className="border border-amber-200 px-3 py-2 text-center font-bold">82.33</td><td className="border border-amber-200 px-3 py-2"></td></tr>
            </tbody>
          </table>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-3 text-sm">
          <div className="bg-white border border-amber-100 rounded-xl p-3"><strong>axis=0</strong> → combine values down the rows, giving one result per <strong>column/subject</strong>.</div>
          <div className="bg-white border border-amber-100 rounded-xl p-3"><strong>axis=1</strong> → combine values across the columns, giving one result per <strong>row/student</strong>.</div>
        </div>
      </div>

      <CodeBlock code={`# Axis-wise stats — critical for working with feature matrices
X = np.array([[80, 75, 90],   # Student 1: Maths, English, Science
              [65, 88, 72],   # Student 2
              [92, 60, 85]])  # Student 3

print("Column means (avg per subject):", np.mean(X, axis=0))
print("Row means   (avg per student):", np.mean(X, axis=1))
print("Overall max:", np.max(X))`}
output={`Column means (avg per subject): [79.   74.33 82.33]
Row means   (avg per student):  [81.67 75.   79.  ]
Overall max: 92`} />

      {/* ── 5. Reshape ── */}
      <SectionHeader icon="🔄" title="5. Reshaping & Stacking" subtitle="Reshape arrays to fit model input requirements — one of the most-used operations in ML pipelines" />

      <div className="not-prose my-5 rounded-2xl border border-fuchsia-200 bg-fuchsia-50 p-5">
        <h3 className="text-base font-extrabold text-fuchsia-950 mb-2">Reshape Changes the Arrangement, Not the Number of Values</h3>
        <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center text-center">
          <div className="bg-white border border-fuchsia-100 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-500 mb-2">Shape (12,)</p>
            <p className="font-mono text-sm break-words">[1 2 3 4 5 6 7 8 9 10 11 12]</p>
          </div>
          <div className="font-bold text-fuchsia-800">reshape(3, 4) →</div>
          <div className="bg-white border border-fuchsia-100 rounded-xl p-3">
            <p className="text-xs font-bold text-slate-500 mb-2">Shape (3, 4)</p>
            <div className="inline-grid grid-cols-4 gap-1 font-mono text-sm">
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <span key={n} className="w-9 h-8 flex items-center justify-center bg-fuchsia-50 rounded">{n}</span>)}
            </div>
          </div>
        </div>
        <p className="text-sm text-fuchsia-900 mt-3"><strong>12 values before, 12 values after.</strong> A reshape is valid only when the total number of elements is compatible with the requested shape.</p>
      </div>

      <CodeBlock code={`a = np.arange(1, 13)   # [1 2 3 4 5 6 7 8 9 10 11 12]
print(a.shape)         # (12,)

# Reshape to 2D matrix
B = a.reshape(3, 4)    # 3 rows × 4 columns
print(B)
print(B.shape)         # (3, 4)

# Reshape to 3D tensor (for deep learning)
C = a.reshape(2, 2, 3)
print(C.shape)         # (2, 2, 3)

# -1 lets NumPy infer the dimension automatically
D = a.reshape(-1, 3)   # infer rows → 4 rows × 3 columns
print(D.shape)         # (4, 3)`}
output={`(12,)
[[ 1  2  3  4]
 [ 5  6  7  8]
 [ 9 10 11 12]]
(3, 4)
(2, 2, 3)
(4, 3)`} />

      <CodeBlock code={`# Stacking arrays — used to combine features
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])

print(np.hstack([a, b]))       # [1 2 3 4 5 6]  — side by side
print(np.vstack([a, b]))       # [[1 2 3]        — stacked rows
                               #  [4 5 6]]

# Adding a new column to a feature matrix
X    = np.array([[1, 2], [3, 4], [5, 6]])   # 3×2
bias = np.ones((3, 1))                       # 3×1 bias column
print(np.hstack([X, bias]))`}
output={`[1 2 3 4 5 6]
[[1 2 3]
 [4 5 6]]
[[1. 2. 1.]
 [3. 4. 1.]
 [5. 6. 1.]]`} />

      {/* ── 6. Linear algebra ── */}
      <SectionHeader icon="🧮" title="6. Linear Algebra (Essential for ML)" subtitle="Dot products and matrix operations appear in many important ML algorithms" />

      <div className="not-prose my-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
        <h3 className="text-base font-extrabold text-blue-950 mb-2">Dot Product — A Tiny Numerical Example</h3>
        <p className="text-sm text-blue-900 mb-3">Suppose a model has two features <code>[2, 3]</code> and two weights <code>[0.5, 1.0]</code>.</p>
        <div className="space-y-2 text-sm">
          <div className="bg-white border border-blue-100 rounded-xl p-3"><strong>Step 1 — Multiply matching positions:</strong><br/><code>(2 × 0.5) + (3 × 1.0)</code></div>
          <div className="bg-white border border-blue-100 rounded-xl p-3"><strong>Step 2 — Calculate each product:</strong><br/><code>1 + 3</code></div>
          <div className="bg-white border border-blue-100 rounded-xl p-3"><strong>Step 3 — Add them:</strong><br/><code>4</code></div>
        </div>
        <p className="text-sm text-blue-900 mt-3">So the dot product is <strong>4</strong>. ML models repeatedly perform calculations like this when combining feature values with learned weights.</p>
      </div>

      <CodeBlock code={`# Dot product — at the heart of linear regression and neural networks
# y = X·w  (prediction = features dot weights)
X = np.array([[1, 2], [3, 4], [5, 6]])  # 3 samples × 2 features
w = np.array([0.5, 1.5])               # 2 weights

predictions = np.dot(X, w)   # or X @ w (Python 3.5+)
print("Predictions:", predictions)

# Matrix multiplication
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
print("A @ B =")
print(A @ B)`}
output={`Predictions: [ 3.5  7.5 11.5]
A @ B =
[[19 22]
 [43 50]]`} />

      <CodeBlock code={`# Useful linear algebra operations
A = np.array([[2, 1], [5, 3]])

print("Transpose:\\n", A.T)
print("Determinant:", np.linalg.det(A))
print("Inverse:\\n", np.linalg.inv(A))

# Eigenvalues & eigenvectors (used in PCA)
vals, vecs = np.linalg.eig(A)
print("Eigenvalues:", vals)`}
output={`Transpose:
 [[2 5]
  [1 3]]
Determinant: 1.0
Inverse:
 [[ 3. -1.]
  [-5.  2.]]
Eigenvalues: [0.20871215 4.79128785]`} />

      {/* ── 7. ML Example ── */}
      <SectionHeader icon="🤖" title="7. Complete ML Example: Linear Regression with NumPy" subtitle="Build a small linear regression model from scratch using NumPy to understand the matrix idea behind least squares" />

      <CodeBlock code={`import numpy as np

# Dataset: Study hours → Exam score
hours  = np.array([1, 2, 3, 4, 5, 6, 7, 8])
scores = np.array([52, 58, 64, 70, 75, 82, 88, 95])

# Linear Regression: score = w * hours + b
# Normal-equation form for learning: w = (XᵀX)⁻¹ Xᵀy
# (Production libraries generally use more numerically stable solvers.)
X = np.column_stack([np.ones(len(hours)), hours])  # add bias column
y = scores

# Solve for weights [b, w]
weights = np.linalg.inv(X.T @ X) @ X.T @ y
b, w = weights

print(f"Intercept (b): {b:.2f}")
print(f"Slope (w):     {w:.2f}")
print(f"Equation:  score = {w:.2f} × hours + {b:.2f}")

# Predict for 9 hours of study
new_hours = 9
prediction = w * new_hours + b
print(f"\\nPrediction for {new_hours} hours: {prediction:.1f}")`}
output={`Intercept (b): 45.68
Slope (w):     6.07
Equation:  score = 6.07 × hours + 45.68

Prediction for 9 hours: 100.3`} />

      <div className="not-prose bg-rose-50 border border-rose-200 rounded-2xl p-5 my-5">
        <h3 className="font-extrabold text-rose-950 text-base mb-2">Why did the model predict about 100.3 marks?</h3>
        <p className="text-sm text-rose-900 leading-relaxed">
          The model learned approximately <code>score = 6.07 × hours + 45.68</code>. For 9 hours: <code>(6.07 × 9) + 45.68 ≈ 100.3</code>. The model simply extends the straight-line pattern beyond the training range of 1–8 hours; it does not automatically know that an exam may have a maximum of 100 marks. This is called <strong>extrapolation</strong>. It is a reminder to combine model output with real-world constraints and domain knowledge.
        </p>
      </div>

      <div className="not-prose my-8 rounded-2xl border border-slate-200 bg-slate-50 p-5">
        <h2 className="text-xl font-extrabold text-slate-900 mb-4">Common NumPy Questions</h2>
        <div className="space-y-4 text-sm text-slate-700">
          <div>
            <p className="font-bold text-slate-900">What is the difference between <code>shape</code>, <code>ndim</code>, and <code>size</code>?</p>
            <p className="mt-1"><code>shape</code> tells you the length of each dimension, <code>ndim</code> tells you how many dimensions there are, and <code>size</code> tells you the total number of values.</p>
          </div>
          <div>
            <p className="font-bold text-slate-900">Why is broadcasting useful in Machine Learning?</p>
            <p className="mt-1">It lets NumPy combine compatible arrays without writing explicit loops. A common example is subtracting one mean value per feature from every row during feature scaling.</p>
          </div>
          <div>
            <p className="font-bold text-slate-900">Does <code>reshape()</code> always copy the data?</p>
            <p className="mt-1">Not necessarily. NumPy returns a view when possible, but a copy can be required in some memory layouts. For beginners, the key idea is that reshaping changes how the same values are organised as long as the element count is compatible.</p>
          </div>
          <div>
            <p className="font-bold text-slate-900">Should I learn all NumPy linear algebra before Machine Learning?</p>
            <p className="mt-1">No. Start with arrays, indexing, vectorised operations, statistics, reshaping, and dot products. Learn deeper linear algebra gradually as algorithms such as PCA and Linear Regression require it.</p>
          </div>
        </div>
      </div>

      <div className="not-prose my-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <h2 className="text-lg font-extrabold text-indigo-950 mb-3">Where to Go Next</h2>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <a href="/learn/pandas-essentials" className="bg-white border border-indigo-100 rounded-xl p-3 hover:border-indigo-300 transition-colors">
            <span className="font-bold text-indigo-800">Pandas Essentials →</span>
            <p className="text-slate-600 mt-1">Use labelled rows and columns for real datasets.</p>
          </a>
          <a href="/learn/scikit-learn-essentials" className="bg-white border border-indigo-100 rounded-xl p-3 hover:border-indigo-300 transition-colors">
            <span className="font-bold text-indigo-800">Scikit-learn Essentials →</span>
            <p className="text-slate-600 mt-1">Train ML models using arrays and DataFrames.</p>
          </a>
          <a href="/learn/feature-scaling" className="bg-white border border-indigo-100 rounded-xl p-3 hover:border-indigo-300 transition-colors">
            <span className="font-bold text-indigo-800">Feature Scaling →</span>
            <p className="text-slate-600 mt-1">See a practical use of column means and broadcasting ideas.</p>
          </a>
          <a href="/learn/linear-regression" className="bg-white border border-indigo-100 rounded-xl p-3 hover:border-indigo-300 transition-colors">
            <span className="font-bold text-indigo-800">Linear Regression →</span>
            <p className="text-slate-600 mt-1">See where dot products and matrix ideas are used in a model.</p>
          </a>
        </div>
      </div>

      <div className="not-prose bg-amber-50 border border-amber-200 rounded-2xl p-5 my-6">
        <p className="font-bold text-amber-900 text-base mb-3">🎯 NumPy Cheat Sheet — Essential ML Operations</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-amber-100">
              <th className="px-3 py-2 text-left font-bold text-amber-900">Operation</th>
              <th className="px-3 py-2 text-left font-bold text-amber-900">Code</th>
              <th className="px-3 py-2 text-left font-bold text-amber-900">Used in</th>
            </tr></thead>
            <tbody className="divide-y divide-amber-100">
              {[
                ['Create array', 'np.array([1,2,3])', 'Everything'],
                ['Shape of array', 'X.shape', 'Debugging'],
                ['Reshape', 'X.reshape(n, -1)', 'Model inputs'],
                ['Column mean', 'X.mean(axis=0)', 'Feature scaling'],
                ['Boolean filter', 'X[X > 0]', 'Data cleaning'],
                ['Dot product', 'X @ w or np.dot(X,w)', 'Linear/Neural nets'],
                ['Transpose', 'X.T', 'Matrix math'],
                ['Stack arrays', 'np.hstack([a,b])', 'Combining features'],
                ['Random seed', 'np.random.seed(42)', 'Reproducibility'],
                ['Concatenate', 'np.concatenate([a,b])', 'Joining datasets'],
              ].map(([op, code, use]) => (
                <tr key={op} className="hover:bg-amber-50">
                  <td className="px-3 py-2 font-semibold text-slate-700">{op}</td>
                  <td className="px-3 py-2 font-mono text-indigo-700">{code}</td>
                  <td className="px-3 py-2 text-slate-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
