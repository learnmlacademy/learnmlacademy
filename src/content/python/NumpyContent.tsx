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
      <h3 className="font-extrabold text-indigo-900 text-xl">{title}</h3>
      <p className="text-indigo-700 text-sm mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export function NumpyContent() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">NumPy for Machine Learning</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-2">
        NumPy (<strong>Num</strong>erical <strong>Py</strong>thon) is the backbone of every ML library. pandas, scikit-learn, TensorFlow and PyTorch all convert data to NumPy arrays internally. Mastering NumPy means understanding how data actually flows through ML pipelines.
      </p>

      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          { icon: '⚡', label: 'Fast vectorised ops', sub: '100× faster than Python loops' },
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
print(np.__version__)   # e.g. 1.26.4`} output={`1.26.4`} />

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
      <SectionHeader icon="➕" title="3. Vectorised Math Operations" subtitle="NumPy applies operations to every element simultaneously — no loops needed, orders of magnitude faster" />

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

      <CodeBlock code={`# Broadcasting — NumPy auto-expands smaller arrays to match shape
# This is how feature scaling works under the hood in scikit-learn!
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
Std dev:  25.73
Variance: 661.61
Min:      11, Max: 89
25th pct: 25.25
75th pct: 64.25
Sum:      457`} />

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
      <SectionHeader icon="🧮" title="6. Linear Algebra (Essential for ML)" subtitle="Dot products, matrix multiplication, and decompositions are the maths behind every algorithm" />

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
Eigenvalues: [0.17 4.83]`} />

      {/* ── 7. ML Example ── */}
      <SectionHeader icon="🤖" title="7. Complete ML Example: Linear Regression with NumPy" subtitle="Build a linear regression model from scratch using only NumPy — this is what scikit-learn does internally" />

      <CodeBlock code={`import numpy as np

# Dataset: Study hours → Exam score
hours  = np.array([1, 2, 3, 4, 5, 6, 7, 8])
scores = np.array([52, 58, 64, 70, 75, 82, 88, 95])

# Linear Regression: score = w * hours + b
# Normal equation: w = (XᵀX)⁻¹ Xᵀy
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
output={`Intercept (b): 44.83
Slope (w):     6.21
Equation:  score = 6.21 × hours + 44.83

Prediction for 9 hours: 100.7`} />

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
