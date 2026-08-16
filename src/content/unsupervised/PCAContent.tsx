import React from 'react';
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Code,
  Combine,
  Eye,
  Layers,
  Lightbulb,
  Variable,
} from 'lucide-react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export function PCAContent() {
  const screeData = [
    { component: 'PC1', variance: 85 },
    { component: 'PC2', variance: 10 },
    { component: 'PC3', variance: 3 },
    { component: 'PC4', variance: 1.5 },
    { component: 'PC5', variance: 0.5 },
  ];

  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
          Principal Component Analysis (PCA)
        </h1>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Principal Component Analysis (PCA) is a <strong>linear dimensionality-reduction technique</strong>. It transforms many original features into a smaller set of new features called <strong>principal components</strong>.
        </p>

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-4">PCA in Simple Words</h2>
          <div className="grid md:grid-cols-4 gap-3 text-center">
            {[
              ['1', 'Start with many features'],
              ['2', 'Find directions with large variation'],
              ['3', 'Create new principal components'],
              ['4', 'Keep only the useful components'],
            ].map(([step, text]) => (
              <div key={step} className="bg-white border border-indigo-100 rounded-lg p-4">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-800 font-bold flex items-center justify-center mx-auto mb-2">
                  {step}
                </div>
                <p className="text-sm font-semibold text-slate-800">{text}</p>
              </div>
            ))}
          </div>
          <p className="text-slate-700 mt-4 text-center">
            Example: <strong>4 correlated measurements → 2 principal components</strong> that retain most of the dataset's variance.
          </p>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">Important meaning of “information” in PCA</p>
          <p className="text-slate-800 leading-relaxed">
            PCA preserves <strong>variance</strong>, not necessarily the information that is most useful for a prediction target. PCA is unsupervised: it does not look at class labels or target values while finding components.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="why-pca">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Why Use PCA?</h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Modern datasets can contain many features, including features that carry overlapping information. Working with many dimensions can make analysis, visualization, storage, and some models more difficult.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            ['Many features', 'A dataset may have tens, hundreds, or thousands of columns.'],
            ['Correlated features', 'Several columns may describe similar underlying variation.'],
            ['Hard to visualize', 'Humans cannot directly view 20-dimensional feature spaces.'],
            ['Computational cost', 'Fewer dimensions can reduce later storage or computation in suitable workflows.'],
          ].map(([title, text]) => (
            <div key={title} className="border border-slate-200 rounded-lg p-4 bg-white">
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-slate-700 text-sm">{text}</p>
            </div>
          ))}
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 text-lg mb-2">PCA and High-Dimensional Data</p>
          <p className="text-slate-800 leading-relaxed">
            High dimensionality can create practical and statistical challenges, but PCA is only <strong>one possible tool</strong> for dimensionality reduction. It is not an automatic cure for every high-dimensional problem and does not guarantee better model accuracy.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="core-idea">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Lightbulb className="mr-3 text-indigo-600" /> Core Idea Behind PCA
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          PCA looks for new directions in the feature space. The <strong>first principal component (PC1)</strong> is the direction along which the projected data has the greatest variance. The next component captures the greatest remaining variance while being perpendicular (orthogonal) to earlier components.
        </p>

        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 max-w-3xl">
          <h3 className="font-bold text-slate-900 text-lg mb-4 text-center">Simple Visual: Rotate the Axes</h3>
          <svg viewBox="0 0 620 260" className="w-full h-auto" role="img" aria-label="Diagonal data cloud with PC1 along the main spread and PC2 perpendicular to it">
            <line x1="65" y1="220" x2="560" y2="220" stroke="#94a3b8" strokeWidth="2" />
            <line x1="65" y1="220" x2="65" y2="30" stroke="#94a3b8" strokeWidth="2" />
            {[
              [130, 190], [175, 170], [215, 154], [260, 137], [300, 123],
              [345, 102], [390, 87], [435, 65], [485, 50], [325, 130],
            ].map(([cx, cy], index) => (
              <circle key={index} cx={cx} cy={cy} r="7" fill="#818cf8" opacity="0.9" />
            ))}
            <line x1="110" y1="205" x2="510" y2="40" stroke="#4f46e5" strokeWidth="4" />
            <polygon points="510,40 494,41 503,55" fill="#4f46e5" />
            <text x="515" y="42" fontSize="16" fontWeight="700" fill="#4338ca">PC1</text>
            <line x1="300" y1="123" x2="245" y2="42" stroke="#059669" strokeWidth="3" strokeDasharray="7 5" />
            <polygon points="245,42 249,57 259,49" fill="#059669" />
            <text x="205" y="35" fontSize="16" fontWeight="700" fill="#047857">PC2</text>
          </svg>
          <p className="text-center text-sm text-slate-600 mt-2">
            PC1 follows the largest spread of the data. PC2 is perpendicular and captures the next-largest remaining variation.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Real-Life Analogy</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Imagine a classroom dataset containing height, arm length, leg length, and shoe size. These measurements may be correlated because they partly reflect an underlying body-size pattern.
        </p>
        <p className="text-lg leading-relaxed mb-8 text-slate-800">
          PCA may combine those correlated measurements into a component that we might <em>informally interpret</em> as “overall size.” But the component itself is mathematically a weighted combination of the original features; PCA does not automatically assign a human meaning to it.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <p className="font-bold text-indigo-900 mb-1">PC1</p>
            <p className="text-sm text-slate-700">Maximum projected variance.</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-4">
            <p className="font-bold text-emerald-900 mb-1">PC2</p>
            <p className="text-sm text-slate-700">Maximum remaining variance, orthogonal to PC1.</p>
          </div>
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-slate-900 mb-1">Later PCs</p>
            <p className="text-sm text-slate-700">Continue in descending order of explained variance.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="visualization-terminologies">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Important PCA Terminology</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            ['Feature', 'An original input column.'],
            ['Variance', 'How spread out values are.'],
            ['Covariance', 'How two variables vary together.'],
            ['Eigenvector', 'A direction associated with the covariance structure.'],
            ['Eigenvalue', 'Variance associated with that eigenvector.'],
            ['Explained variance ratio', 'Fraction of total variance represented by a component.'],
          ].map(([title, text]) => (
            <div key={title} className="border border-slate-200 rounded-lg p-4 bg-white">
              <p className="font-bold text-slate-900 mb-1">{title}</p>
              <p className="text-sm text-slate-700">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="math-basics">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Understanding Variance and Covariance</h2>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
          <Variable className="mr-2 text-indigo-600" /> Variance
        </h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Variance measures how spread out values are around their mean. PCA orders directions by variance, but <strong>high variance does not automatically mean high predictive importance</strong> for a target variable.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Sample Variance</p>
          <p className="text-slate-800 font-mono mb-2">s² = [1 / (n - 1)] × Σ(xᵢ - x̄)²</p>
          <p className="text-slate-700 text-sm">For a sample, the common denominator is n - 1. Population variance instead uses n.</p>
        </div>

        <h4 className="font-bold text-xl text-slate-800 mb-4">Worked Variance Example</h4>
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 font-mono text-sm">
          <p className="text-slate-800 mb-2">Sample: <strong>2, 4, 6</strong></p>
          <p className="text-slate-800 mb-2">Mean = (2 + 4 + 6) / 3 = <strong>4</strong></p>
          <p className="text-slate-800 mb-2">Squared deviations = 4, 0, 4</p>
          <p className="text-slate-800 mb-2">Sum = 8</p>
          <p className="text-slate-800">Sample variance = 8 / (3 - 1) = <strong>4</strong></p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center">
          <Combine className="mr-2 text-indigo-600" /> Covariance
        </h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Covariance measures whether two variables tend to move together. Positive covariance means they tend to move in the same direction; negative covariance means they tend to move in opposite directions.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md">
            <h4 className="font-bold text-emerald-900 mb-2">Positive Covariance</h4>
            <p className="text-slate-800 text-sm">Example: in a dataset, height and leg length may tend to increase together.</p>
          </div>
          <div className="pl-4 border-l-4 border-rose-400 bg-rose-50 py-4 pr-4 rounded-r-md">
            <h4 className="font-bold text-rose-900 mb-2">Negative Covariance</h4>
            <p className="text-slate-800 text-sm">Example: for a fixed distance, higher speed may be associated with lower travel time.</p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Sample Covariance</p>
          <p className="text-slate-800 font-mono mb-3">Cov(X,Y) = [1 / (n - 1)] × Σ(xᵢ - x̄)(yᵢ - ȳ)</p>
          <p className="font-bold text-slate-800 mb-2">Worked example</p>
          <p className="font-mono text-slate-800 text-sm mb-1">X = [2, 4, 6], x̄ = 4</p>
          <p className="font-mono text-slate-800 text-sm mb-1">Y = [60, 80, 100], ȳ = 80</p>
          <p className="font-mono text-slate-800 text-sm mb-1">Products = (-2)(-20), (0)(0), (2)(20)</p>
          <p className="font-mono text-slate-800 text-sm mb-1">Products = 40, 0, 40</p>
          <p className="font-mono text-slate-800 text-sm">Cov(X,Y) = 80 / 2 = <strong>40</strong></p>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">Covariance depends on scale</p>
          <p className="text-slate-800">
            A feature measured in thousands can dominate a feature measured in small units. This is why standardization is often considered before PCA when feature scales are not naturally comparable.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="pca-workflow">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> PCA Step-by-Step Workflow
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Suppose three students have Math and Physics scores below. Physics is exactly twice Math, so both features contain the same one-dimensional pattern.
        </p>

        <div className="overflow-x-auto mb-4 max-w-xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Student</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Math (X)</th>
                <th className="px-5 py-3 text-left text-sm font-bold text-slate-700">Physics (Y)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white font-mono text-sm">
              <tr><td className="px-5 py-3">A</td><td className="px-5 py-3">2</td><td className="px-5 py-3">4</td></tr>
              <tr><td className="px-5 py-3">B</td><td className="px-5 py-3">4</td><td className="px-5 py-3">8</td></tr>
              <tr><td className="px-5 py-3">C</td><td className="px-5 py-3">6</td><td className="px-5 py-3">12</td></tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-slate-600 mb-8 italic">
          For this hand calculation we center the two features but do not standardize them. That keeps the arithmetic transparent and shows PCA on the covariance matrix.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 1 — Center the Data</h3>
        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-slate-800 text-sm mb-1">Mean(Math) = (2 + 4 + 6) / 3 = <strong>4</strong></p>
          <p className="font-mono text-slate-800 text-sm mb-4">Mean(Physics) = (4 + 8 + 12) / 3 = <strong>8</strong></p>
          <p className="font-bold text-slate-800 mb-2">Centered points</p>
          <ul className="font-mono text-slate-800 text-sm space-y-1">
            <li>A: (2 - 4, 4 - 8) = <strong>(-2, -4)</strong></li>
            <li>B: (4 - 4, 8 - 8) = <strong>(0, 0)</strong></li>
            <li>C: (6 - 4, 12 - 8) = <strong>(2, 4)</strong></li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 2 — Build the Covariance Matrix</h3>
        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-mono text-slate-800 text-sm mb-1">Var(Math) = (4 + 0 + 4) / 2 = <strong>4</strong></p>
          <p className="font-mono text-slate-800 text-sm mb-1">Var(Physics) = (16 + 0 + 16) / 2 = <strong>16</strong></p>
          <p className="font-mono text-slate-800 text-sm mb-4">Cov(Math, Physics) = (8 + 0 + 8) / 2 = <strong>8</strong></p>
          <div className="bg-white p-3 rounded border border-emerald-200 font-mono text-slate-800 inline-block whitespace-pre-wrap">
{`| 4   8 |
| 8  16 |`}
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 3 — Find Eigenvalues and Eigenvectors</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Eigenvectors give candidate directions; eigenvalues tell us how much variance lies along those directions.
        </p>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">Characteristic equation</p>
          <p className="font-mono text-slate-800 text-sm mb-1">det(A - λI) = 0</p>
          <p className="font-mono text-slate-800 text-sm mb-1">(4 - λ)(16 - λ) - 64 = 0</p>
          <p className="font-mono text-slate-800 text-sm mb-1">λ² - 20λ = 0</p>
          <p className="font-mono text-slate-800 text-sm mb-4">λ(λ - 20) = 0</p>
          <p className="text-slate-800 mb-2">Therefore:</p>
          <ul className="font-mono text-sm text-slate-800 space-y-1 mb-5">
            <li>λ₁ = <strong>20</strong></li>
            <li>λ₂ = <strong>0</strong></li>
          </ul>
          <p className="text-slate-800 mb-2">
            A direction for λ₁ is <span className="font-mono font-bold">[1, 2]</span>. PCA normally represents a component as a <strong>unit vector</strong>, so normalize it:
          </p>
          <p className="font-mono text-slate-800 text-sm mb-1">Length = √(1² + 2²) = √5</p>
          <p className="font-mono text-slate-800 text-sm">PC1 = [1/√5, 2/√5] ≈ <strong>[0.447, 0.894]</strong></p>
          <p className="text-xs text-slate-600 mt-3 italic">The opposite sign [-0.447, -0.894] represents the same axis; eigenvector signs are arbitrary.</p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 4 — Rank Components by Explained Variance</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Total variance is `20 + 0 = 20`, so PC1 explains `20 / 20 = 100%` of the variance in this intentionally perfect-line example. PC2 explains 0%.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Step 5 — Project the Data onto PC1</h3>
        <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-slate-800 mb-4 text-sm">Projection = centered point · unit PC1 vector</p>
          <ul className="font-mono text-slate-800 text-sm space-y-3 bg-white p-4 rounded border border-blue-100">
            <li>A: (-2 × 0.447) + (-4 × 0.894) ≈ <strong>-4.472</strong></li>
            <li>B: (0 × 0.447) + (0 × 0.894) = <strong>0</strong></li>
            <li>C: (2 × 0.447) + (4 × 0.894) ≈ <strong>4.472</strong></li>
          </ul>
          <p className="text-slate-800 mt-4">
            The 2D points are therefore represented in one dimension as approximately <span className="font-mono bg-indigo-100 px-2 py-1 rounded text-indigo-800 font-bold">[-4.472, 0, 4.472]</span> with no variance lost in this special toy example.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="scaling">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Should We Scale Before PCA?</h2>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          PCA is sensitive to feature scale because it follows variance. If one feature is measured in thousands and another in decimals, the larger-scale feature can dominate the principal components.
        </p>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
            <p className="font-bold text-emerald-900 mb-2">Often standardize first when...</p>
            <p className="text-sm text-slate-700">Features use different units or their raw scales should not determine importance.</p>
          </div>
          <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
            <p className="font-bold text-blue-900 mb-2">You may keep original scale when...</p>
            <p className="text-sm text-slate-700">The original variance scale itself is meaningful and intentionally should influence PCA.</p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 mb-2">Scikit-learn detail</p>
          <p className="text-slate-800">
            `sklearn.decomposition.PCA` centers the features automatically, but <strong>does not standardize their scales</strong>. `StandardScaler` is a separate preprocessing choice.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="scree-plot">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> Choosing How Many Components to Keep
        </h2>
        <p className="text-lg leading-relaxed mb-5 text-slate-800">
          A scree plot displays how much variance each principal component explains. It can help us inspect where additional components begin contributing relatively little variance.
        </p>

        <div className="bg-white p-6 border border-slate-200 rounded-xl shadow-sm mb-6 w-full max-w-3xl">
          <h3 className="font-bold text-slate-800 text-lg mb-4 text-center">Illustrative Explained Variance</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={screeData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="component" />
                <YAxis unit="%" />
                <Tooltip />
                <Line type="monotone" dataKey="variance" stroke="#4f46e5" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-slate-900 mb-2">Elbow idea</p>
            <p className="text-sm text-slate-700">A bend can suggest a reasonable stopping point, but it is a heuristic—not a guaranteed “optimal” number.</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
            <p className="font-bold text-indigo-900 mb-2">Cumulative variance</p>
            <p className="text-sm text-slate-700">In this illustration, PC1 + PC2 explain 85% + 10% = <strong>95%</strong> of the total variance.</p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="real-life-examples">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Real-Life Examples</h2>

        <div className="flex flex-col space-y-8 mb-10">
          <div>
            <div className="flex items-center mb-3">
              <Eye className="text-indigo-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-slate-900">Image Representation</h3>
            </div>
            <p className="text-lg text-slate-800">
              Images can contain thousands of pixel features. PCA has historically been used to represent image variation with fewer components; the classic “eigenfaces” idea is one example. Reduced components can support visualization, compression, or downstream modeling.
            </p>
          </div>

          <div>
            <div className="flex items-center mb-3">
              <Activity className="text-indigo-600 mr-3" size={28} />
              <h3 className="text-2xl font-bold text-slate-900">Financial Data Exploration</h3>
            </div>
            <p className="text-lg text-slate-800">
              Many financial variables may move together. PCA can summarize correlated patterns into fewer components for exploration or risk modeling, but those components should not automatically be interpreted as causal market factors.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="code-implementation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Python Implementation of PCA</h2>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-6 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h3 className="font-bold text-slate-800 text-lg">PCA on the Iris dataset</h3>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`import matplotlib.pyplot as plt

from sklearn.datasets import load_iris
from sklearn.decomposition import PCA
from sklearn.preprocessing import StandardScaler

# 1. Load data
iris = load_iris()
X = iris.data
y = iris.target

# 2. Standardize deliberately before PCA
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# 3. Reduce 4 features to 2 principal components
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# 4. Inspect explained variance
print("Explained variance ratio:", pca.explained_variance_ratio_.round(4))
print("Cumulative explained variance:", round(pca.explained_variance_ratio_.sum(), 4))

# 5. Visualize the 2D projection
plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y)
plt.xlabel("PC1")
plt.ylabel("PC2")
plt.title("PCA Projection of Iris Data")
plt.show()`}</code></pre>
          </div>
          <div className="bg-slate-50 border-t border-slate-200 p-4">
            <p className="font-mono text-sm text-slate-800 mb-2"><strong>Verified output:</strong></p>
            <pre className="font-mono text-sm text-slate-700 whitespace-pre-wrap">{`Explained variance ratio: [0.7296 0.2285]
Cumulative explained variance: 0.9581`}</pre>
            <p className="text-sm text-slate-600 mt-3">
              In this standardized Iris example, the first two components represent about <strong>95.81%</strong> of total feature variance. That does not mean they preserve 95.81% of every possible task-relevant signal.
            </p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">Avoid preprocessing leakage</p>
          <p className="text-slate-800">
            The code above is an exploratory visualization of the full Iris dataset. If PCA is part of a predictive train/test workflow, fit both scaling and PCA on the <strong>training data only</strong>, ideally inside a Scikit-learn `Pipeline`.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Keep Enough Components for a Variance Target</h3>
        <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 rounded-lg overflow-x-auto text-sm font-mono mb-8">
<pre><code>{`# With the full SVD solver, keep enough components
# to explain more than 95% of the variance.
pca_95 = PCA(n_components=0.95, svd_solver="full")
X_reduced = pca_95.fit_transform(X_scaled)

print(pca_95.n_components_)`}</code></pre>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons-and-complexity">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Advantages & Disadvantages</h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="border border-emerald-200 bg-emerald-50 rounded-xl p-5">
            <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
              <CheckCircle2 className="mr-2" /> Potential Advantages
            </h3>
            <ul className="list-disc pl-5 text-slate-800 space-y-2">
              <li>Can reduce the number of dimensions.</li>
              <li>Can summarize correlated feature variation.</li>
              <li>Can make high-dimensional data easier to visualize.</li>
              <li>May reduce downstream computation when many components are discarded.</li>
            </ul>
          </div>

          <div className="border border-rose-200 bg-rose-50 rounded-xl p-5">
            <h3 className="text-xl font-bold text-rose-900 mb-4 flex items-center">
              <AlertTriangle className="mr-2" /> Limitations
            </h3>
            <ul className="list-disc pl-5 text-slate-800 space-y-2">
              <li>Principal components can be harder to interpret than original features.</li>
              <li>Discarded low-variance directions can still contain predictive signal.</li>
              <li>PCA is a linear transformation and may not capture nonlinear structure well.</li>
              <li>Results can change substantially depending on feature scaling.</li>
            </ul>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-amber-900 mb-2">PCA does not guarantee less overfitting</p>
          <p className="text-slate-800">
            Reducing dimensions can sometimes improve generalization, but it can also remove useful signal. For supervised tasks, choose the PCA configuration using a proper validation or cross-validation workflow rather than assuming that more compression is always better.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">PCA vs Feature Selection</h3>
        <div className="overflow-x-auto mb-8 max-w-3xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Question</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-indigo-700">PCA</th>
                <th className="px-6 py-3 text-left text-sm font-bold text-slate-700">Feature Selection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">What happens to features?</td>
                <td className="px-6 py-4 text-sm text-indigo-700">Creates new linear combinations</td>
                <td className="px-6 py-4 text-sm text-slate-700">Keeps a subset of original features</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Interpretability</td>
                <td className="px-6 py-4 text-sm text-indigo-700">Often lower</td>
                <td className="px-6 py-4 text-sm text-slate-700">Often easier because original columns remain</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">Uses target labels?</td>
                <td className="px-6 py-4 text-sm text-indigo-700">No</td>
                <td className="px-6 py-4 text-sm text-slate-700">Depends on the selection method</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Applications of PCA</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            '2D / 3D data visualization',
            'Image representation and compression',
            'Exploratory analysis of correlated measurements',
            'Signal preprocessing',
            'Genomics and other high-dimensional biological data',
            'Dimensionality reduction before selected downstream models',
          ].map((item) => (
            <div key={item} className="border border-slate-200 bg-white rounded-lg p-4 text-slate-800 font-medium">
              {item}
            </div>
          ))}
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="common-mistakes">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Common PCA Mistakes</h2>
        <div className="space-y-4 mb-8">
          {[
            ['Assuming PCA automatically scales features', 'Scikit-learn PCA centers features, but scaling is a separate preprocessing decision.'],
            ['Calling the highest-variance component the most predictive', 'PCA does not use the target and can discard a low-variance but predictive direction.'],
            ['Using an elbow as an exact optimum', 'A scree-plot elbow is only one heuristic for choosing dimensionality.'],
            ['Fitting PCA on the full dataset before supervised evaluation', 'In predictive workflows, fit preprocessing on training folds/data only to avoid leakage.'],
          ].map(([title, text]) => (
            <div key={title} className="flex gap-3 bg-slate-50 border border-slate-200 rounded-lg p-4">
              <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20} />
              <div>
                <p className="font-bold text-slate-900">{title}</p>
                <p className="text-sm text-slate-700 mt-1">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div id="faq">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">Quick Questions</h2>
        <div className="space-y-3 mb-8">
          <details className="border border-slate-200 rounded-lg p-4 bg-white">
            <summary className="font-bold text-slate-900 cursor-pointer">Does PCA always require feature scaling?</summary>
            <p className="text-slate-700 mt-3">No. But scaling is often appropriate when feature units or magnitudes differ and those raw scales should not determine PCA's variance directions.</p>
          </details>
          <details className="border border-slate-200 rounded-lg p-4 bg-white">
            <summary className="font-bold text-slate-900 cursor-pointer">Are principal components original features?</summary>
            <p className="text-slate-700 mt-3">No. Each component is a new linear combination of the original features.</p>
          </details>
          <details className="border border-slate-200 rounded-lg p-4 bg-white">
            <summary className="font-bold text-slate-900 cursor-pointer">What should I learn after PCA?</summary>
            <p className="text-slate-700 mt-3">Continue to <a href="/learn/tsne" className="text-indigo-700 font-semibold hover:underline">t-SNE</a> to see a nonlinear visualization method, and compare PCA with <a href="/learn/feature-selection" className="text-indigo-700 font-semibold hover:underline">Feature Selection</a>. Review <a href="/learn/feature-scaling" className="text-indigo-700 font-semibold hover:underline">Feature Scaling</a> if the preprocessing choice is still unclear.</p>
          </details>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        PCA is a linear dimensionality-reduction technique that creates orthogonal principal components and orders them by the amount of feature variance they explain. Keeping only the leading components can produce a lower-dimensional representation of the data.
      </p>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        PCA is especially useful for visualization and for summarizing correlated high-dimensional measurements, but it is unsupervised and variance-focused. Scaling choices, validation strategy, and the meaning of discarded directions all matter.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          PCA does not simply “delete columns.” It rotates the feature space to find new directions of high variance, then lets us represent the data using fewer of those directions when that trade-off is useful.
        </p>
      </div>
    </>
  );
}
