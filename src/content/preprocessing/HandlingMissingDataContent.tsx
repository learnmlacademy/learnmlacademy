import React from "react";
import { Search, AlertTriangle, Code } from "lucide-react";

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

export function HandlingMissingDataContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Handling Missing Values</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">Handling missing data is a critical preprocessing step where incomplete or unavailable values in a dataset are managed to prevent ML algorithms from failing or producing inaccurate models.</p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        What are Missing Values?
      </h2>
      <p>
        Missing values are data entries that are not stored properly inside a
        dataset. In Python and data science libraries, missing values are
        commonly represented as:
      </p>
      <ul>
        <li>
          <code>NaN</code> (Not a Number)
        </li>
        <li>
          <code>NULL</code>
        </li>
        <li>
          <code>None</code>
        </li>
        <li>Empty cells</li>
        <li>Unknown values</li>
      </ul>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Why Handling Missing Values is Important
      </h2>
      <ol>
        <li>
          <strong>Improves Model Accuracy:</strong> Machine learning algorithms
          work best with clean and complete datasets.
        </li>
        <li>
          <strong>Prevents Bias:</strong> Ignoring missing values improperly may
          create biased analysis.
        </li>
        <li>
          <strong>Avoids Training Errors:</strong> Many machine learning
          algorithms cannot process null values directly.
        </li>
        <li>
          <strong>Preserves Data Quality:</strong> Handling missing values
          properly keeps the dataset reliable.
        </li>
        <li>
          <strong>Helps Better Decision Making:</strong> Businesses rely on
          accurate data for forecasting and analytics.
        </li>
      </ol>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Common Reasons & Types of Missing Values
      </h2>
      <p>
        Missing data can result from human errors, technical problems, privacy
        concerns, data merging issues, or data corruption.
      </p>
      <div className="grid md:grid-cols-3 gap-4 my-6 not-prose">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-1">
            Missing Completely at Random (MCAR)
          </strong>
          <p className="text-sm text-slate-600 m-0">
            Missing values occur randomly and are unrelated to any variable.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-1">
            Missing at Random (MAR)
          </strong>
          <p className="text-sm text-slate-600 m-0">
            Missing values depend on another observed variable.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-1">
            Missing Not at Random (MNAR)
          </strong>
          <p className="text-sm text-slate-600 m-0">
            Missingness depends on the missing value itself.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Check Missing Values with Python
      </h2>

      <p>
        Let's create a sample dataset and see how to check for missing values
        using pandas.
      </p>

      <CodeBlock
        title="create_and_check.py"
        code={`import pandas as pd
import numpy as np

data = {
    'Name': ['Aman', 'Priya', 'Rohit', 'Sneha'],
    'Age': [22, np.nan, 25, 28],
    'Salary': [45000, 52000, np.nan, 61000]
}

df = pd.DataFrame(data)
print("--- Dataset ---")
print(df)

print("\\n--- Count Missing Values ---")
print(df.isnull().sum())

print("\\n--- Dataset Information ---")
print(df.info())`}
        output={`--- Dataset ---
    Name   Age   Salary
0   Aman  22.0  45000.0
1  Priya   NaN  52000.0
2  Rohit  25.0      NaN
3  Sneha  28.0  61000.0

--- Count Missing Values ---
Name      0
Age       1
Salary    1
dtype: int64

--- Dataset Information ---
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 4 entries, 0 to 3
Data columns (total 3 columns):
 #   Column  Non-Null Count  Dtype  
---  ------  --------------  -----  
 0   Name    4 non-null      object 
 1   Age     3 non-null      float64
 2   Salary  3 non-null      float64
dtypes: float64(2), object(1)
memory usage: 228.0+ bytes
None`}
      />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Methods to Handle Missing Values
      </h2>
      <p>
        There is no single perfect method for handling missing data. The best
        technique depends on Dataset size, Amount of missing data, Business
        problem, and Type of variable.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">
        1. Removing Missing Values
      </h3>
      <p>You can remove rows or columns containing missing values.</p>
      <ul>
        <li>
          <strong>Advantages:</strong> Simple implementation, Quick cleaning
        </li>
        <li>
          <strong>Disadvantages:</strong> Loss of valuable data, Smaller dataset
        </li>
      </ul>
      <CodeBlock
        title="remove_missing.py"
        code={`# Remove Rows with Missing Values:
df_dropped_rows = df.dropna()
print("Dropped Rows:\\n", df_dropped_rows)

# Remove Columns with Missing Values:
df_dropped_cols = df.dropna(axis=1)
print("\\nDropped Columns:\\n", df_dropped_cols)`}
        output={`Dropped Rows:
     Name   Age   Salary
0   Aman  22.0  45000.0
3  Sneha  28.0  61000.0

Dropped Columns:
     Name
0   Aman
1  Priya
2  Rohit
3  Sneha`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">2. Mean Imputation</h3>
      <p>Replace missing numerical values using the average value.</p>
      <ul>
        <li>
          <strong>Advantages:</strong> Easy to implement, Maintains dataset size
        </li>
        <li>
          <strong>Disadvantages:</strong> Sensitive to outliers
        </li>
      </ul>
      <CodeBlock
        title="mean_imputation.py"
        code={`df_mean = df.copy()
df_mean['Salary'] = df_mean['Salary'].fillna(df_mean['Salary'].mean())
print(df_mean)`}
        output={`    Name   Age        Salary
0   Aman  22.0  45000.000000
1  Priya   NaN  52000.000000
2  Rohit  25.0  52666.666667
3  Sneha  28.0  61000.000000`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">3. Median Imputation</h3>
      <p>Replace missing values using the median.</p>
      <ul>
        <li>
          <strong>Advantages:</strong> Handles outliers better, More robust than
          mean
        </li>
      </ul>
      <CodeBlock
        title="median_imputation.py"
        code={`df_median = df.copy()
df_median['Salary'] = df_median['Salary'].fillna(df_median['Salary'].median())
print(df_median)`}
        output={`    Name   Age   Salary
0   Aman  22.0  45000.0
1  Priya   NaN  52000.0
2  Rohit  25.0  52000.0
3  Sneha  28.0  61000.0`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">
        4. Other Imputation Techniques
      </h3>
      <p className="text-base text-slate-600 leading-relaxed mb-5">
        Beyond mean and median imputation, several smarter techniques handle special cases — categorical variables, time-series data, and trending signals.
      </p>
      <div className="not-prose space-y-5">
        {/* Mode */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-indigo-50 border-b border-indigo-100 px-5 py-3 flex items-center gap-3">
            <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">A</span>
            <h4 className="font-bold text-indigo-900">Mode Imputation — for categorical columns</h4>
          </div>
          <div className="p-5">
            <p className="text-slate-700 text-sm mb-3">
              Replaces missing values with the <strong>most frequently occurring value</strong> in that column. Ideal for columns like City, Gender, or Category where averaging makes no sense.
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Mode imputation — fills missing City with most common city
df['City'].fillna(df['City'].mode()[0], inplace=True)

# Example:
# Before: ['Delhi', NaN, 'Mumbai', 'Delhi', NaN]
# mode()[0] = 'Delhi'
# After:  ['Delhi', 'Delhi', 'Mumbai', 'Delhi', 'Delhi']`}</pre>
            </div>
          </div>
        </div>

        {/* Forward Fill */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-emerald-50 border-b border-emerald-100 px-5 py-3 flex items-center gap-3">
            <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">B</span>
            <h4 className="font-bold text-emerald-900">Forward Fill (ffill) — for time-series data</h4>
          </div>
          <div className="p-5">
            <p className="text-slate-700 text-sm mb-3">
              Propagates the <strong>last known value forward</strong> to fill gaps. Perfect for time-series or sequential data (stock prices, sensor readings) where the previous reading is a reasonable estimate.
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Forward fill — use previous row's value
df.fillna(method='ffill', inplace=True)

# Example — Daily temperature readings:
# Before: [22, NaN, NaN, 25, NaN]
# After:  [22,  22,  22, 25,  25]
# Explanation: NaN rows inherit the last valid reading above them`}</pre>
            </div>
          </div>
        </div>

        {/* Backward Fill */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-amber-50 border-b border-amber-100 px-5 py-3 flex items-center gap-3">
            <span className="bg-amber-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">C</span>
            <h4 className="font-bold text-amber-900">Backward Fill (bfill) — fill from future values</h4>
          </div>
          <div className="p-5">
            <p className="text-slate-700 text-sm mb-3">
              Uses the <strong>next available value</strong> to fill backward. Useful when you know a future measurement is more reliable (e.g., filling a missed Monday reading with Tuesday&apos;s value).
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Backward fill — use next row's value
df.fillna(method='bfill', inplace=True)

# Example — Daily temperature readings:
# Before: [NaN, NaN, 22, 25, NaN]
# After:  [ 22,  22, 22, 25, NaN]  ← last NaN stays (no future value)
# Explanation: NaN rows inherit the nearest valid reading below them`}</pre>
            </div>
          </div>
        </div>

        {/* Interpolation */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          <div className="bg-violet-50 border-b border-violet-100 px-5 py-3 flex items-center gap-3">
            <span className="bg-violet-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">D</span>
            <h4 className="font-bold text-violet-900">Interpolation — intelligent trend-preserving estimation</h4>
          </div>
          <div className="p-5">
            <p className="text-slate-700 text-sm mb-3">
              Estimates missing values by <strong>fitting a mathematical curve</strong> through surrounding known values. Unlike ffill/bfill which copy exact values, interpolation calculates a smooth estimate that preserves trends — ideal for salary, population, or any numeric series with gradual change.
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Linear interpolation — estimates a value between two known points
df['Salary'].interpolate(method='linear', inplace=True)

# Example — Annual Salary (₹ in lakhs):
# Index:  0     1     2     3      4
# Before: [4.0, NaN,  NaN,  NaN,  8.0]
# After:  [4.0, 5.0,  6.0,  7.0,  8.0]
# Explanation: Linear interpolation divides the gap (8.0-4.0)/4 = 1.0
#              and adds 1.0 at each step → perfectly smooth ramp

# Other interpolation methods:
df['Salary'].interpolate(method='polynomial', order=2)  # curved trend
df['Salary'].interpolate(method='time')                 # for DatetimeIndex`}</pre>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-center text-sm">
                <p className="font-bold text-emerald-800 mb-1">✓ Advantages</p>
                <p className="text-emerald-700 text-xs">Preserves data trend · Produces realistic estimates · Better than mean for ordered data</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center text-sm">
                <p className="font-bold text-red-800 mb-1">✗ Limitations</p>
                <p className="text-red-700 text-xs">Assumes linear/smooth trend · Can introduce bias if trend breaks · Not for categorical data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-2">5. Advanced Techniques</h3>
      <p>
        <strong>KNN Imputation:</strong> K-Nearest Neighbors predicts missing
        values using similar records. It is more accurate than simple methods
        and uses relationships between variables, but is computationally
        expensive.
      </p>
      <p>
        <strong>Predictive Model Imputation:</strong> Machine learning models
        can predict missing values. Examples include Regression-based
        prediction, Random Forest imputation, and Deep learning methods.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Choosing the Right Missing Value Technique
      </h2>
      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg bg-white">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Situation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Recommended Method
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                Small missing rows
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-semibold">
                Remove rows
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                Numerical data
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-semibold">
                Mean/Median
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                Categorical data
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-semibold">
                Mode
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                Time-series data
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-semibold">
                Forward fill
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                Complex datasets
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700 font-semibold">
                KNN or ML
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Complete Python Example
      </h2>
      <CodeBlock
        title="complete_example.py"
        code={`import pandas as pd
import numpy as np

data = {
    'Age': [22, 25, np.nan, 30, 28],
    'Salary': [45000, np.nan, 52000, 61000, np.nan]
}

df = pd.DataFrame(data)
print("--- Missing Values Count ---")
print(df.isnull().sum())

# Impute Operations
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Salary'] = df['Salary'].fillna(df['Salary'].mean())

print("\\n--- Dataset After Handling Missing Values ---")
print(df)`}
        output={`--- Missing Values Count ---
Age       1
Salary    2
dtype: int64

--- Dataset After Handling Missing Values ---
    Age        Salary
0  22.0  45000.000000
1  25.0  52666.666667
2  25.0  52000.000000
3  30.0  61000.000000
4  28.0  52666.666667`}
      />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Best Practices & Common Mistakes
      </h2>
      <div className="grid md:grid-cols-2 gap-8 my-6">
        <div>
          <h3 className="text-xl font-bold text-emerald-700">Best Practices</h3>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Analyze missing value percentage first</li>
            <li>Understand why data is missing</li>
            <li>Use visualization tools</li>
            <li>Test multiple methods</li>
            <li>Validate model performance</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-rose-700">Common Mistakes</h3>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Blindly removing data</li>
            <li>Using mean for skewed data</li>
            <li>Ignoring missing value patterns</li>
            <li>Applying one method everywhere</li>
          </ul>
        </div>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-8 mt-8 not-prose">
        <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
          <AlertTriangle className="h-5 w-5" /> The Garbage In, Garbage Out
          Warning
        </div>
        <p className="text-sm text-yellow-900 m-0">
          Machine Learning models are fundamentally dumb mathematical equations.
          If you try to pass an empty "NaN" value into a math equation, the
          program will crash immediately. Poor handling can reduce model
          accuracy and produce unreliable predictions.
        </p>
      </div>
    </div>
  );
}
