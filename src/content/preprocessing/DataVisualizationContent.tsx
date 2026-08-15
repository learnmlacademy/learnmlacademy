import React from "react";
import {
  Code,
  BarChart2,
  Activity,
  Layers,
  BrainCircuit,
  Clock,
  Type,
} from "lucide-react";

function CodeBlock({
  code,
  output,
  title,
}: {
  code: string;
  output?: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm not-prose">
      {title && (
        <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm border-b border-slate-700 flex items-center gap-2 font-mono">
          <Code className="w-4 h-4" /> {title}
        </div>
      )}
      <div className="p-4 text-sm font-mono overflow-x-auto text-slate-200">
        <pre className="!m-0 max-w-full min-w-full">
          <code className="language-python">{code}</code>
        </pre>
      </div>
      {output && (
        <div className="bg-white border-t border-slate-200">
          <div className="bg-slate-50 text-slate-500 px-4 py-1 text-xs border-b border-slate-200 uppercase tracking-wider font-semibold">
            Output
          </div>
          <div className="p-4 overflow-x-auto text-sm text-slate-800 bg-white">
            {typeof output === "string" ? (
              <pre className="!m-0 font-mono">{output}</pre>
            ) : (
              output
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function DataVisualizationContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Data Visualization for Machine Learning</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Data visualization is the graphic representation of information and
        data. By using visual elements like charts, graphs, and maps, it
        provides an accessible way to see and understand trends, outliers, and
        patterns in data—a foundational step in any Machine Learning pipeline.
      </p>

      <p>
        In 1973, statistician Francis Anscombe created "Anscombe's Quartet,"
        showing that datasets can have very similar summary statistics while
        looking very different when plotted. The lesson is not that statistics
        are wrong, but that <strong>numbers and visuals should be used together</strong>.
        A chart can reveal shape, unusual points, and relationships that a single
        summary number may hide. Charts can also mislead when they are designed
        poorly, so we must learn how to read them carefully.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Data Visualization in Simple Words
      </h2>
      <p>
        Data visualization means <strong>turning numbers into a picture that answers a question</strong>.
        You do not choose a chart because it looks attractive. You choose it because
        it makes one idea easier to see.
      </p>

      <div className="my-6 not-prose overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[620px] text-sm text-left border-collapse">
          <thead className="bg-slate-100 text-slate-800">
            <tr>
              <th className="p-3 border-b">Question</th>
              <th className="p-3 border-b">Simple Example</th>
              <th className="p-3 border-b">Useful Chart</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b">
              <td className="p-3">Which class scored highest?</td>
              <td className="p-3">Class A, B, C marks</td>
              <td className="p-3 font-semibold">Bar chart</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Are marks improving each month?</td>
              <td className="p-3">Monthly test marks</td>
              <td className="p-3 font-semibold">Line chart</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">Do more study hours relate to higher marks?</td>
              <td className="p-3">Study hours vs marks</td>
              <td className="p-3 font-semibold">Scatter plot</td>
            </tr>
            <tr className="border-b">
              <td className="p-3">How are exam scores distributed?</td>
              <td className="p-3">Scores of 100 students</td>
              <td className="p-3 font-semibold">Histogram</td>
            </tr>
            <tr>
              <td className="p-3">Are there unusual values?</td>
              <td className="p-3">Typical salaries plus a few extreme salaries</td>
              <td className="p-3 font-semibold">Box plot</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 my-6 not-prose">
        {[
          ["1", "Ask a question", "What exactly do I want to understand?"],
          ["2", "Choose a chart", "Pick the simplest chart that answers that question."],
          ["3", "Read the message", "Look for trend, comparison, relationship, spread, or unusual values."],
        ].map(([step, title, text]) => (
          <div key={step} className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">Step {step}</div>
            <div className="font-bold text-slate-900 mb-1">{title}</div>
            <div className="text-sm text-slate-700">{text}</div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Analytical Approaches: Univariate, Bivariate, and Multivariate
      </h2>

      <p>
        Before plotting data randomly, first ask how many variables you are
        trying to understand. Visualizations commonly fall into three simple
        categories.
      </p>

      <div className="my-5 not-prose rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <strong>Easy memory trick:</strong> One variable = <strong>Uni</strong>variate,
        two variables = <strong>Bi</strong>variate, and more than two = <strong>Multi</strong>variate.
      </div>

      <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
        <div className="border border-slate-200 p-5 rounded-xl bg-white shadow-sm border-t-4 border-t-blue-500">
          <h4 className="font-bold text-lg text-slate-900 mb-2">
            Univariate Analysis
          </h4>
          <p className="text-sm text-slate-600 mb-3">
            Analyzing exactly <strong>one variable</strong> at a time. The main
            purpose is to describe the data and find patterns that exist within
            it.
          </p>
          <ul className="text-xs text-slate-700 space-y-1 bg-slate-50 p-2 rounded list-inside list-disc">
            <li>Histograms</li>
            <li>Bar Charts</li>
            <li>Pie Charts</li>
            <li>Box Plots</li>
          </ul>
        </div>

        <div className="border border-slate-200 p-5 rounded-xl bg-white shadow-sm border-t-4 border-t-emerald-500">
          <h4 className="font-bold text-lg text-slate-900 mb-2">
            Bivariate Analysis
          </h4>
          <p className="text-sm text-slate-600 mb-3">
            Analyzing <strong>two variables</strong> simultaneously to discover
            the empirical relationship between them.
          </p>
          <ul className="text-xs text-slate-700 space-y-1 bg-slate-50 p-2 rounded list-inside list-disc">
            <li>Scatter Plots</li>
            <li>Line Charts</li>
            <li>Correlation Matrices (2 var)</li>
            <li>Grouped Bar Charts</li>
          </ul>
        </div>

        <div className="border border-slate-200 p-5 rounded-xl bg-white shadow-sm border-t-4 border-t-purple-500">
          <h4 className="font-bold text-lg text-slate-900 mb-2">
            Multivariate Analysis
          </h4>
          <p className="text-sm text-slate-600 mb-3">
            Analyzing <strong>more than two variables</strong> to understand
            simultaneous relationships and interactions across multiple
            dimensions.
          </p>
          <ul className="text-xs text-slate-700 space-y-1 bg-slate-50 p-2 rounded list-inside list-disc">
            <li>Heatmaps</li>
            <li>3D Scatter Plots</li>
            <li>Pair Plots</li>
            <li>Parallel Coordinates</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Taxonomy of Data Visualizations
      </h2>
      <p>
        Different questions need different chart types. The diagram below is a
        reference map of common visualization families; you do not need to
        memorize every chart at once. Start with bar, line, scatter, histogram,
        box plot, and heatmap, then learn specialized charts when a problem needs them.
      </p>

      {/* SVG Hierarchical Tree for Types of Charts */}
      <div className="w-full flex justify-center my-8 bg-slate-50 p-6 rounded-xl border border-slate-200 not-prose overflow-x-auto">
        <svg
          width="700"
          height="280"
          viewBox="0 0 700 280"
          className="font-sans min-w-[700px]"
        >
          <rect x="250" y="20" width="200" height="40" rx="8" fill="#1e293b" />
          <text
            x="350"
            y="45"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Types of Visualizations
          </text>

          {/* Lines connecting to children */}
          <path
            d="M 350,60 L 350,90"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 120,90 L 580,90"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />

          {/* Drops to children */}
          <path
            d="M 120,90 L 120,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 270,90 L 270,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 430,90 L 430,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M 580,90 L 580,120"
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
          />

          {/* Child 1 */}
          <rect x="40" y="120" width="160" height="40" rx="6" fill="#3b82f6" />
          <text
            x="120"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Basic Charts
          </text>
          <text
            x="120"
            y="180"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Histograms
          </text>
          <text
            x="120"
            y="200"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Bar / Line / Pie
          </text>
          <text
            x="120"
            y="220"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Scatter Plots
          </text>

          {/* Child 2 */}
          <rect x="210" y="120" width="120" height="40" rx="6" fill="#10b981" />
          <text
            x="270"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Advanced
          </text>
          <text
            x="270"
            y="180"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Heatmaps
          </text>
          <text
            x="270"
            y="200"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Box Plots
          </text>
          <text
            x="270"
            y="220"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Violin Plots
          </text>

          {/* Child 3 */}
          <rect x="360" y="120" width="140" height="40" rx="6" fill="#8b5cf6" />
          <text
            x="430"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Text / Spatial
          </text>
          <text
            x="430"
            y="180"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Word Clouds
          </text>
          <text
            x="430"
            y="200"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Choropleth Maps
          </text>
          <text
            x="430"
            y="220"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Network Graphs
          </text>

          {/* Child 4 */}
          <rect x="520" y="120" width="120" height="40" rx="6" fill="#f59e0b" />
          <text
            x="580"
            y="145"
            fill="white"
            textAnchor="middle"
            fontWeight="bold"
          >
            Temporal
          </text>
          <text
            x="580"
            y="180"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Gantt Charts
          </text>
          <text
            x="580"
            y="200"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Waterfall
          </text>
          <text
            x="580"
            y="220"
            fill="#64748b"
            textAnchor="middle"
            fontSize="12"
          >
            Bullet Graphs
          </text>
        </svg>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-2 flex items-center gap-2">
        <BarChart2 className="text-blue-500" />
        1. Basic Charts
      </h3>
      <ul>
        <li>
          <strong>Histogram:</strong> Useful for seeing the distribution of a
          numerical variable. It can reveal shape, skewness, gaps, and multiple peaks.
        </li>
        <li>
          <strong>Scatter Plot:</strong> Places two numerical variables on the X
          and Y axes. It helps you look for relationships, clusters, and unusual points.
        </li>
        <li>
          <strong>Line / Bar / Pie Charts:</strong> Line charts are useful for
          ordered trends such as time, bar charts for category comparisons, and
          pie charts for a small number of simple part-to-whole categories.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-2 flex items-center gap-2">
        <Layers className="text-emerald-500" />
        2. Advanced Charts
      </h3>
      <ul>
        <li>
          <strong>Heatmap:</strong> Represents numbers in a matrix using color.
          A common ML use is displaying a correlation matrix so many pairwise
          relationships can be scanned quickly.
        </li>
        <li>
          <strong>Box-and-Whisker Plot:</strong> Summarizes the median, quartiles,
          and spread of a numerical variable. Points beyond the whiskers are often
          treated as <em>potential</em> outliers that should be investigated.
        </li>
        <li>
          <strong>Violin Plot:</strong> Combines distribution shape with summary
          information. It is useful when you want more detail than a simple box plot.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-2 flex items-center gap-2">
        <Type className="text-purple-500" />
        3. Textual & Symbolic Data Patterns
      </h3>
      <ul>
        <li>
          <strong>Word Cloud:</strong> A quick visual summary in which frequently
          occurring (or otherwise weighted) words appear larger. It can be useful
          for exploration, but frequency alone does not automatically mean importance.
        </li>
      </ul>

      <h3 className="text-xl font-bold mt-8 mb-2 flex items-center gap-2">
        <Clock className="text-amber-500" />
        4. Temporal and Trend Focus
      </h3>
      <ul>
        <li>
          <strong>Gantt Chart:</strong> Useful for project tasks and time spans.
          <strong> Waterfall Chart:</strong> Useful for showing how positive and
          negative changes build from a starting value to an ending value.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Python Implementations
      </h2>
      <p>
        The Python Machine Learning ecosystem provides incredible libraries for
        graphing data. Here is how they differ:
      </p>

      <div className="grid md:grid-cols-2 gap-4 mt-6 mb-8 not-prose">
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <strong className="text-slate-800 font-bold block mb-1">
            1. Matplotlib
          </strong>
          <span className="text-sm text-slate-600">
            A foundational plotting library with fine control over axes, labels,
            and chart details. Many other Python visualization tools build on it.
          </span>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <strong className="text-slate-800 font-bold block mb-1">
            2. Seaborn
          </strong>
          <span className="text-sm text-slate-600">
            Built on Matplotlib and convenient for statistical plots such as
            distributions, category comparisons, and relationships.
          </span>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <strong className="text-slate-800 font-bold block mb-1">
            3. Plotly
          </strong>
          <span className="text-sm text-slate-600">
            Useful for interactive web-based charts where users may hover, zoom,
            or pan to inspect data.
          </span>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <strong className="text-slate-800 font-bold block mb-1">
            4. Bokeh
          </strong>
          <span className="text-sm text-slate-600">
            Another option for interactive browser visualizations and dashboards,
            including applications that update over time.
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Python Chart Implementations & Outputs
      </h2>
      <p>
        Let's explore the core charts you will use daily. The examples below
        utilize the <strong>Matplotlib</strong> and <strong>Seaborn</strong>{" "}
        libraries, capturing both the Python scripting and the expected visual
        output.
      </p>

      {/* 1. Scatter Plot */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Activity className="text-blue-500" />
          Scatter Plot
        </h3>
        <p className="text-slate-600 mb-4 text-sm bg-blue-50 p-3 rounded-lg border border-blue-100">
          Scatter plots are the core tool for viewing the correlation or
          relationship between two numerical sets of data.
        </p>
        <CodeBlock
          title="scatter_plot.py"
          code={`import matplotlib.pyplot as plt

days = [1, 2, 3, 4, 5, 6]
sales = [15, 12, 18, 25, 23, 30]

# Create a scatter plot representing Sales over Days
plt.figure(figsize=(6, 4))
plt.scatter(days, sales, color='#3b82f6', s=100, alpha=0.8)

plt.title("Daily Sales Comparison")
plt.xlabel("Day")
plt.ylabel("Sales")
plt.grid(True, linestyle='--', alpha=0.5)
plt.show()`}
          output={
            <div className="p-4 bg-slate-50 flex justify-center w-full min-w-[300px]">
              <svg
                width="100%"
                height="250"
                viewBox="0 0 400 250"
                className="bg-white border text-sans border-slate-200 rounded-lg shadow-sm max-w-lg"
              >
                <line
                  x1="50"
                  y1="200"
                  x2="380"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <text
                  x="215"
                  y="235"
                  fontSize="12"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Day
                </text>
                <text
                  x="20"
                  y="110"
                  fontSize="12"
                  fill="#64748b"
                  textAnchor="middle"
                  transform="rotate(-90 20,110)"
                >
                  Sales
                </text>
                <text
                  x="215"
                  y="18"
                  fontSize="14"
                  fill="#334155"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  Daily Sales Comparison
                </text>

                <circle
                  cx="100"
                  cy="162.5"
                  r="6"
                  fill="#3b82f6"
                  opacity="0.8"
                />
                <circle cx="150" cy="185" r="6" fill="#3b82f6" opacity="0.8" />
                <circle cx="200" cy="140" r="6" fill="#3b82f6" opacity="0.8" />
                <circle cx="250" cy="87.5" r="6" fill="#3b82f6" opacity="0.8" />
                <circle
                  cx="300"
                  cy="102.5"
                  r="6"
                  fill="#3b82f6"
                  opacity="0.8"
                />
                <circle cx="350" cy="50" r="6" fill="#3b82f6" opacity="0.8" />
              </svg>
            </div>
          }
        />
      </div>

      {/* 2. Line Chart */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Activity className="text-red-500" />
          Line Chart
        </h3>
        <p className="text-slate-600 mb-4 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
          Line charts connect individual data points together. They are perfect
          for showing trends or changes over continuous intervals like time.
        </p>
        <CodeBlock
          title="line_chart.py"
          code={`import matplotlib.pyplot as plt

months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
temperature = [20, 22, 25, 28, 30, 32]

plt.figure(figsize=(6, 4))
plt.plot(months, temperature, color='#ef4444', marker='o', linewidth=2)

plt.title("Monthly Temperature Trend")
plt.xlabel("Month")
plt.ylabel("Temperature (C)")
plt.show()`}
          output={
            <div className="p-4 bg-slate-50 flex justify-center w-full min-w-[300px]">
              <svg
                width="100%"
                height="250"
                viewBox="0 0 400 250"
                className="bg-white border text-sans border-slate-200 rounded-lg shadow-sm max-w-lg"
              >
                <line
                  x1="50"
                  y1="200"
                  x2="380"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                <text
                  x="50"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Jan
                </text>
                <text
                  x="110"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Feb
                </text>
                <text
                  x="170"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Mar
                </text>
                <text
                  x="230"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Apr
                </text>
                <text
                  x="290"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  May
                </text>
                <text
                  x="350"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Jun
                </text>

                <text
                  x="20"
                  y="110"
                  fontSize="12"
                  fill="#64748b"
                  textAnchor="middle"
                  transform="rotate(-90 20,110)"
                >
                  Temperature (C)
                </text>
                <text
                  x="215"
                  y="18"
                  fontSize="14"
                  fill="#334155"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  Monthly Temperature Trend
                </text>

                <polyline
                  points="50,200 110,175 170,137.5 230,100 290,75 350,50"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                />

                <circle
                  cx="50"
                  cy="200"
                  r="4"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <circle
                  cx="110"
                  cy="175"
                  r="4"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <circle
                  cx="170"
                  cy="137.5"
                  r="4"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <circle
                  cx="230"
                  cy="100"
                  r="4"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <circle
                  cx="290"
                  cy="75"
                  r="4"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
                <circle
                  cx="350"
                  cy="50"
                  r="4"
                  fill="white"
                  stroke="#ef4444"
                  strokeWidth="2"
                />
              </svg>
            </div>
          }
        />
      </div>

      {/* 3. Bar Chart */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <BarChart2 className="text-emerald-500" />
          Bar Chart
        </h3>
        <p className="text-slate-600 mb-4 text-sm bg-emerald-50 p-3 rounded-lg border border-emerald-100">
          Bar charts aggregate data clearly by category. Here we use Seaborn
          which offers beautiful default semantic mappings (like color mapping).
        </p>
        <CodeBlock
          title="bar_plot.py"
          code={`import seaborn as sns
import matplotlib.pyplot as plt

categories = ['Electronics', 'Clothing', 'Home', 'Beauty']
revenue = [5500, 3200, 4800, 2100]

plt.figure(figsize=(6, 4))
# Seaborn naturally maps categories to beautiful palettes
sns.barplot(x=categories, y=revenue, palette='viridis')

plt.title("Revenue by Category")
plt.xlabel("Category")
plt.ylabel("Revenue ($)")
plt.show()`}
          output={
            <div className="p-4 bg-slate-50 flex justify-center w-full min-w-[300px]">
              <svg
                width="100%"
                height="250"
                viewBox="0 0 400 250"
                className="bg-white border text-sans border-slate-200 rounded-lg shadow-sm max-w-lg"
              >
                <line
                  x1="50"
                  y1="200"
                  x2="380"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                <text
                  x="100"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Electronics
                </text>
                <text
                  x="180"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Clothing
                </text>
                <text
                  x="260"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Home
                </text>
                <text
                  x="340"
                  y="220"
                  fontSize="10"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Beauty
                </text>

                <text
                  x="20"
                  y="110"
                  fontSize="12"
                  fill="#64748b"
                  textAnchor="middle"
                  transform="rotate(-90 20,110)"
                >
                  Revenue ($)
                </text>
                <text
                  x="215"
                  y="18"
                  fontSize="14"
                  fill="#334155"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  Revenue by Category
                </text>

                <rect
                  x="75"
                  y="62.5"
                  width="50"
                  height="137.5"
                  fill="#440154"
                  rx="2"
                />
                <rect
                  x="155"
                  y="120"
                  width="50"
                  height="80"
                  fill="#31688e"
                  rx="2"
                />
                <rect
                  x="235"
                  y="80"
                  width="50"
                  height="120"
                  fill="#35b779"
                  rx="2"
                />
                <rect
                  x="315"
                  y="147.5"
                  width="50"
                  height="52.5"
                  fill="#fde725"
                  rx="2"
                />
              </svg>
            </div>
          }
        />
      </div>

      {/* 4. Histogram */}
      <div className="mt-12">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Layers className="text-purple-500" />
          Histogram
        </h3>
        <p className="text-slate-600 mb-4 text-sm bg-purple-50 p-3 rounded-lg border border-purple-100">
          Histograms sort continuous data into buckets to expose the underlying
          probability distribution. Here we add a KDE curve to see the shape
          clearly.
        </p>
        <CodeBlock
          title="histogram.py"
          code={`import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# Generate reproducible example age data
np.random.seed(42)
ages = np.random.normal(loc=35, scale=5, size=1000)

plt.figure(figsize=(6, 4))
# Plot histogram along with a Kernel Density Estimate (KDE) curve
sns.histplot(ages, bins=20, kde=True, color='purple', alpha=0.6)

plt.title("Age Distribution of Users")
plt.xlabel("Age")
plt.ylabel("Frequency")
plt.show()`}
          output={
            <div className="p-4 bg-slate-50 flex justify-center w-full min-w-[300px]">
              <svg
                width="100%"
                height="250"
                viewBox="0 0 400 250"
                className="bg-white border text-sans border-slate-200 rounded-lg shadow-sm max-w-lg"
              >
                <line
                  x1="50"
                  y1="200"
                  x2="380"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />
                <line
                  x1="50"
                  y1="20"
                  x2="50"
                  y2="200"
                  stroke="#cbd5e1"
                  strokeWidth="2"
                />

                <text
                  x="215"
                  y="235"
                  fontSize="12"
                  fill="#64748b"
                  textAnchor="middle"
                >
                  Age
                </text>
                <text
                  x="20"
                  y="110"
                  fontSize="12"
                  fill="#64748b"
                  textAnchor="middle"
                  transform="rotate(-90 20,110)"
                >
                  Frequency
                </text>
                <text
                  x="215"
                  y="18"
                  fontSize="14"
                  fill="#334155"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  Age Distribution of Users
                </text>

                <rect
                  x="70"
                  y="180"
                  width="30"
                  height="20"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="100"
                  y="150"
                  width="30"
                  height="50"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="130"
                  y="100"
                  width="30"
                  height="100"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="160"
                  y="50"
                  width="30"
                  height="150"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="190"
                  y="30"
                  width="30"
                  height="170"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="220"
                  y="60"
                  width="30"
                  height="140"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="250"
                  y="110"
                  width="30"
                  height="90"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="280"
                  y="160"
                  width="30"
                  height="40"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />
                <rect
                  x="310"
                  y="190"
                  width="30"
                  height="10"
                  fill="#a855f7"
                  opacity="0.6"
                  stroke="white"
                  strokeWidth="1"
                />

                <path
                  d="M 50,195 Q 110,130 145,100 T 205,30 Q 250,70 275,130 T 340,195"
                  fill="none"
                  stroke="#7e22ce"
                  strokeWidth="3"
                />
              </svg>
            </div>
          }
        />
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        How to Read a Chart Step by Step
      </h2>
      <p>
        A chart is useful only if you can explain what it says. Use this simple
        three-question routine before drawing a conclusion.
      </p>

      <div className="my-6 not-prose overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[620px] text-sm border-collapse">
          <thead className="bg-slate-100 text-slate-800">
            <tr>
              <th className="p-3 text-left border-b">Step</th>
              <th className="p-3 text-left border-b">Ask</th>
              <th className="p-3 text-left border-b">Example</th>
            </tr>
          </thead>
          <tbody className="text-slate-700">
            <tr className="border-b">
              <td className="p-3 font-semibold">1</td>
              <td className="p-3">What do the axes or categories represent?</td>
              <td className="p-3">X = study hours, Y = marks</td>
            </tr>
            <tr className="border-b">
              <td className="p-3 font-semibold">2</td>
              <td className="p-3">What pattern do I see?</td>
              <td className="p-3">Marks generally rise as study hours rise</td>
            </tr>
            <tr>
              <td className="p-3 font-semibold">3</td>
              <td className="p-3">What should I <em>not</em> claim?</td>
              <td className="p-3">The chart alone does not prove that study hours caused the higher marks</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="my-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <strong>Important:</strong> Correlation or a visible relationship does not
        automatically prove causation. A third factor may influence both variables.
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Best Practices & Pitfalls
      </h2>

      <div className="grid md:grid-cols-2 gap-6 my-6 not-prose">
        <div className="bg-emerald-50 border text-center border-emerald-200 rounded-xl p-4 shadow-sm">
          <strong className="text-emerald-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Best Practices ✅
          </strong>
          <ul className="text-sm text-emerald-900 space-y-1 text-left list-disc pl-5">
            <li>
              <strong>Always label axes:</strong> An unlabelled Y-axis renders a
              chart useless.
            </li>
            <li>
              <strong>Provide Context:</strong> Use clear, descriptive titles.
            </li>
            <li>
              <strong>Select the right chart:</strong> Don't use pie charts if
              you have 15 categories. Use a horizontal bar chart.
            </li>
            <li>
              <strong>Use color carefully:</strong> Ensure sufficient contrast and
              avoid relying only on red/green to communicate opposing meaning.
            </li>
          </ul>
        </div>
        <div className="bg-red-50 border text-center border-red-200 rounded-xl p-4 shadow-sm">
          <strong className="text-red-800 block mb-2 font-bold uppercase tracking-wider text-xs">
            Mistakes to Avoid ❌
          </strong>
          <ul className="text-sm text-red-900 space-y-1 text-left list-disc pl-5">
            <li>
              <strong>Distorting axes:</strong> Avoid axis choices that exaggerate
              small differences. Bar charts usually need a zero baseline; line charts
              may use a narrower range when it is clearly labelled and appropriate.
            </li>
            <li>
              <strong>Cluttering:</strong> Cramming 20 lines onto a single line
              chart creates a "spaghetti graph"—totally unreadable.
            </li>
            <li>
              <strong>Gimmicky 3D effects:</strong> Extruding 2D data into 3D
              pie/bar charts visually obscures actual proportions.
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Common Questions
      </h2>
      <div className="space-y-4 my-6">
        <div className="rounded-xl border border-slate-200 p-4">
          <strong>Which chart should a beginner learn first?</strong>
          <p className="mt-2 mb-0">Start with bar, line, scatter, histogram, and box plots. These cover many everyday ML exploration questions.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <strong>Does a beautiful chart make an analysis correct?</strong>
          <p className="mt-2 mb-0">No. Labels, scale, data quality, and the conclusion drawn from the chart matter more than decoration.</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-4">
          <strong>Should every ML project use every chart?</strong>
          <p className="mt-2 mb-0">No. Choose only the charts that answer useful questions about your particular dataset.</p>
        </div>
      </div>

      <div className="my-8 not-prose rounded-xl border border-indigo-200 bg-indigo-50 p-5">
        <div className="font-bold text-indigo-900 mb-2">Continue Learning</div>
        <p className="text-sm text-slate-700 mb-3">
          Data visualization is closely connected to exploring and preparing data.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href="/learn/eda" className="rounded-lg bg-white border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">Exploratory Data Analysis</a>
          <a href="/learn/pandas-essentials" className="rounded-lg bg-white border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">Pandas Essentials</a>
          <a href="/learn/feature-engineering" className="rounded-lg bg-white border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-100">Feature Engineering</a>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Interview Knowledge Test
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden not-prose mb-10">
        <BrainCircuit className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Check Your Understanding
        </h4>
        <div className="space-y-4 relative z-10">
          <div>
            <p className="font-bold text-slate-200">
              Q: What is the primary purpose of a Heatmap in the context of
              Machine Learning preprocessing?
            </p>
            <p className="text-sm text-slate-400 mt-1">
              A common ML use of a heatmap is to display a correlation matrix.
              It helps you quickly spot strong positive or negative relationships
              that may deserve investigation. High correlation does not always mean
              two features are exact duplicates, and correlation alone does not prove causation.
            </p>
          </div>
          <div>
            <p className="font-bold text-slate-200">
              Q: When would you choose a Box Plot over a Histogram?
            </p>
            <p className="text-sm text-slate-400 mt-1">
              A histogram shows the detailed shape of a distribution, while a
              box plot gives a compact summary of the median, quartiles, spread,
              and potential outliers. Points beyond the whiskers should be
              investigated rather than automatically removed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
