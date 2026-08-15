import React from "react";
import { AlertTriangle, Code } from "lucide-react";

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

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Missing data means some information is absent from a dataset. Before training a model, we should first understand <strong>what is missing, why it may be missing, and how our chosen treatment could change the data</strong>.
      </p>

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
        Missing Data in Simple Words
      </h2>
      <p>
        Think of a school record where one student forgot to enter their age and
        another student's marks were not recorded. The empty cells are the
        missing values.
      </p>

      <div className="overflow-x-auto my-6 not-prose">
        <table className="min-w-full border border-slate-200 bg-white rounded-lg">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Student</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Age</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Marks</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-sm">
            <tr><td className="px-4 py-3">Aman</td><td className="px-4 py-3">17</td><td className="px-4 py-3">72</td></tr>
            <tr><td className="px-4 py-3">Priya</td><td className="px-4 py-3 bg-amber-50 font-semibold text-amber-800">Missing</td><td className="px-4 py-3">81</td></tr>
            <tr><td className="px-4 py-3">Rohit</td><td className="px-4 py-3">18</td><td className="px-4 py-3 bg-amber-50 font-semibold text-amber-800">Missing</td></tr>
            <tr><td className="px-4 py-3">Sneha</td><td className="px-4 py-3">17</td><td className="px-4 py-3">88</td></tr>
          </tbody>
        </table>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 my-6 not-prose">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="text-sm font-bold text-indigo-700 mb-1">1. Detect</div>
          <div className="text-sm text-slate-600">Which cells are missing?</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="text-sm font-bold text-indigo-700 mb-1">2. Understand</div>
          <div className="text-sm text-slate-600">Why might they be missing?</div>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-center">
          <div className="text-sm font-bold text-indigo-700 mb-1">3. Handle</div>
          <div className="text-sm text-slate-600">Delete, fill, or use another method?</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Why Handling Missing Values is Important
      </h2>
      <ol>
        <li>
          <strong>Supports Reliable Models:</strong> Missing values can change the
          information available to a model, so they should be handled deliberately.
        </li>
        <li>
          <strong>Prevents Bias:</strong> Ignoring missing values improperly may
          create biased analysis.
        </li>
        <li>
          <strong>Avoids Compatibility Problems:</strong> Many estimators require
          missing values to be handled first, although some modern algorithms can
          work with missing values directly.
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
          <strong className="text-indigo-700 block mb-2">Missing Completely at Random (MCAR)</strong>
          <p className="text-sm text-slate-600 mb-3">The missingness is not related to the measured data.</p>
          <div className="text-xs bg-slate-50 rounded-lg p-3 text-slate-700"><strong>Simple example:</strong> a paper form is accidentally damaged and one answer becomes unreadable.</div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-2">Missing at Random (MAR)</strong>
          <p className="text-sm text-slate-600 mb-3">The chance of missingness can be related to information we did observe.</p>
          <div className="text-xs bg-slate-50 rounded-lg p-3 text-slate-700"><strong>Simple example:</strong> younger users are less likely to answer a salary question, and age is available.</div>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-indigo-700 block mb-2">Missing Not at Random (MNAR)</strong>
          <p className="text-sm text-slate-600 mb-3">The missingness may be related to the unobserved value itself or another unobserved reason.</p>
          <div className="text-xs bg-slate-50 rounded-lg p-3 text-slate-700"><strong>Simple example:</strong> people with very high salaries may be more likely to leave salary blank.</div>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 my-6 not-prose">
        <p className="m-0 text-sm text-indigo-900">
          <strong>Why this matters:</strong> the reason data is missing can influence
          whether deleting or filling values is reasonable. We should not choose an
          imputation method only because it is easy to code.
        </p>
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
df.info()`}
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
memory usage: ...`}
      />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Before Choosing a Method: Measure the Missingness
      </h2>
      <p>
        First count how much data is missing. A column with 1% missing values is a
        different problem from a column with 70% missing values.
      </p>
      <CodeBlock
        title="missing_percentage.py"
        code={`missing_pct = df.isna().mean() * 100
print(missing_pct.round(1))`}
        output={`Name       0.0
Age       25.0
Salary    25.0
dtype: float64`}
      />
      <p>
        In this four-row example, one missing value means <strong>1 ÷ 4 × 100 = 25%</strong>.
        The percentage is useful, but the reason for the missing values is just as important.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Methods to Handle Missing Values
      </h2>
      <p>
        There is no single perfect method for handling missing data. The best
        technique depends on dataset size, the amount and pattern of missing data,
        the meaning of the variable, and the problem you are solving.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">
        1. Removing Missing Values
      </h3>
      <p>You can remove rows or columns containing missing values, but only when the information loss is acceptable and the missingness pattern does not create unwanted bias.</p>
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 my-5 not-prose">
        <div className="font-bold text-blue-900 mb-3">Worked Example: Find the Mean Salary</div>
        <div className="space-y-2 text-sm text-slate-700">
          <p className="m-0"><strong>Known salaries:</strong> 45,000, 52,000, 61,000</p>
          <p className="m-0"><strong>Step 1 — Add them:</strong> 45,000 + 52,000 + 61,000 = 158,000</p>
          <p className="m-0"><strong>Step 2 — Count known values:</strong> 3</p>
          <p className="m-0"><strong>Step 3 — Divide:</strong> 158,000 ÷ 3 = 52,666.67</p>
          <p className="m-0"><strong>Result:</strong> replace Rohit's missing salary with approximately 52,666.67.</p>
        </div>
      </div>

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
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 my-5 not-prose">
        <div className="font-bold text-emerald-900 mb-3">Worked Example: Find the Median Salary</div>
        <div className="space-y-2 text-sm text-slate-700">
          <p className="m-0"><strong>Step 1 — Sort:</strong> 45,000, 52,000, 61,000</p>
          <p className="m-0"><strong>Step 2 — Choose the middle value:</strong> 52,000</p>
          <p className="m-0"><strong>Result:</strong> the median salary is 52,000.</p>
        </div>
      </div>

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
              Replaces missing values with the <strong>most frequently occurring value</strong> in that column. A common simple choice for columns like City or Category where averaging makes no sense.
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Mode imputation — fills missing City with most common city
df['City'] = df['City'].fillna(df['City'].mode()[0])

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
              Propagates the <strong>last known value forward</strong> to fill gaps. Useful for some ordered or time-series data when carrying the previous observation forward is a reasonable assumption.
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Forward fill — use previous row's value
df = df.ffill()

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
              Uses the <strong>next available value</strong> to fill backward. Useful in some ordered data when using the next available observation is a defensible assumption. Avoid it when future information would create leakage in a prediction problem.
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Backward fill — use next row's value
df = df.bfill()

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
            <h4 className="font-bold text-violet-900">Interpolation — estimate values between known points</h4>
          </div>
          <div className="p-5">
            <p className="text-slate-700 text-sm mb-3">
              Estimates missing numeric values from surrounding known values. Linear interpolation draws a straight-line change between known points; other methods use different assumptions. It is most sensible for ordered numeric data when values are expected to change smoothly.
            </p>
            <div className="bg-slate-900 rounded-lg overflow-hidden">
              <div className="bg-slate-800 px-4 py-1.5 text-slate-400 text-xs font-mono">Python</div>
              <pre className="p-4 text-sm font-mono text-slate-200 overflow-x-auto">{`# Linear interpolation — estimates a value between two known points
df['Salary'] = df['Salary'].interpolate(method='linear')

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
                <p className="text-emerald-700 text-xs">Can preserve a smooth local trend · Uses neighbouring values · Useful for suitable ordered data</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-center text-sm">
                <p className="font-bold text-red-800 mb-1">✗ Limitations</p>
                <p className="text-red-700 text-xs">Depends on the chosen trend assumption · Can mislead when values jump suddenly · Not for categorical data</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold mt-8 mb-2">5. Advanced Techniques</h3>
      <p>
        <strong>KNN Imputation:</strong> K-Nearest Neighbors predicts missing
        values using similar records. It can use relationships between variables,
        but it is not guaranteed to outperform simple methods and can be more
        computationally expensive. Feature scales and the choice of neighbors also matter.
      </p>
      <p>
        <strong>Predictive Model Imputation:</strong> Machine learning models
        can estimate missing values. Examples include regression-based methods
        and iterative multivariate imputation. These methods need careful validation
        because a more complex imputer is not automatically a better one.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">6. Missing-Value Indicator</h3>
      <p>
        Sometimes the fact that a value is missing is itself useful information.
        You can add a simple 0/1 column before imputation.
      </p>
      <div className="overflow-x-auto my-5 not-prose">
        <table className="min-w-full border border-slate-200 bg-white">
          <thead className="bg-slate-50"><tr><th className="px-4 py-2 text-left">Salary</th><th className="px-4 py-2 text-left">Salary_was_missing</th></tr></thead>
          <tbody className="divide-y divide-slate-200"><tr><td className="px-4 py-2">45,000</td><td className="px-4 py-2">0</td></tr><tr><td className="px-4 py-2">Missing</td><td className="px-4 py-2">1</td></tr></tbody>
        </table>
      </div>
      <p>
        This can help a model distinguish an originally observed value from one
        that was filled later. Whether it helps should be checked during validation.
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
              <td className="px-6 py-4 text-sm text-slate-700 align-top">
                A small number of rows are missing and deletion is defensible
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 font-semibold align-top">
                Consider removing rows
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-slate-700 align-top">
                Numerical data with a roughly symmetric distribution
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 font-semibold align-top">
                Mean may be a simple baseline
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-slate-700 align-top">
                Categorical data with a meaningful most-common category
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 font-semibold align-top">
                Mode or a separate "Missing" category
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-slate-700 align-top">
                Ordered/time-series data with a defensible carry-forward assumption
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 font-semibold align-top">
                Consider forward fill or interpolation
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-sm text-slate-700 align-top">
                Relationships between features may help estimate missing values
              </td>
              <td className="px-6 py-4 text-sm text-slate-700 font-semibold align-top">
                Consider KNN or multivariate imputation
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-5 not-prose">
        <p className="m-0 text-sm text-amber-900">
          <strong>Important:</strong> this table is a starting guide, not a fixed rule.
          Compare reasonable methods using validation and domain knowledge.
        </p>
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
2  26.5  52000.000000
3  30.0  61000.000000
4  28.0  52666.666667`}
      />
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-5 not-prose">
        <p className="m-0 text-sm text-slate-700">
          <strong>For a real ML project:</strong> split the data first. Calculate the
          median, mean, or other imputation rule using the <strong>training data only</strong>,
          then apply that learned rule to validation and test data. This helps avoid data leakage.
        </p>
      </div>

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
            <li>Fit imputation statistics on training data, then apply them to validation/test data</li>
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
          <AlertTriangle className="h-5 w-5" /> Treat Missing Data as Information, Not Just Empty Cells
        </div>
        <p className="text-sm text-yellow-900 m-0">
          Poor handling can distort distributions, hide important patterns, or create data leakage.
          Some estimators reject missing values while others can handle them directly, so always
          check the algorithm and validate the preprocessing choice.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Common Questions
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold mb-1">Should I always replace missing values?</h3>
          <p>No. Sometimes deletion is reasonable, sometimes imputation is better, and some algorithms can work with missing values directly. The choice depends on the data and the model.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">Mean or median — which is better?</h3>
          <p>Mean is a simple baseline for roughly symmetric numeric data. Median is often more robust when extreme values or skew are present.</p>
        </div>
        <div>
          <h3 className="text-lg font-bold mb-1">Why should imputation be fitted only on training data?</h3>
          <p>Using validation or test data to calculate an imputation value lets information from those sets leak into training. Fit the preprocessing on the training set, then apply it to the other sets.</p>
        </div>
      </div>

      <div className="mt-8 p-5 rounded-xl border border-indigo-200 bg-indigo-50 not-prose">
        <div className="font-bold text-indigo-900 mb-2">Continue learning</div>
        <p className="text-sm text-indigo-900 m-0">
          Missing values are only one preprocessing step. Next, learn how to convert text categories into numbers in <a className="font-semibold underline" href="/learn/encoding-categorical">Encoding Categorical Data</a>. You can also revisit <a className="font-semibold underline" href="/learn/eda">Exploratory Data Analysis</a> to learn how missingness is discovered during data investigation.
        </p>
      </div>
    </div>
  );
}
