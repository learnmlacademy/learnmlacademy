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
  <div className="not-prose flex items-start gap-4 my-8 p-5 bg-emerald-50 border border-emerald-100 rounded-2xl">
    <span className="text-3xl">{icon}</span>
    <div>
      <h2 className="font-extrabold text-emerald-900 text-xl">{title}</h2>
      <p className="text-emerald-700 text-sm mt-0.5">{subtitle}</p>
    </div>
  </div>
);

export function PandasContent() {
  return (
    <div className="prose prose-slate max-w-none">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Pandas for Machine Learning</h1>
      <p className="text-xl text-slate-600 leading-relaxed mb-2">
        Pandas is the go-to library for loading, exploring, cleaning, and transforming tabular data before feeding it into ML models. If NumPy is the engine, Pandas is the workshop where raw data gets shaped into model-ready form.
      </p>

      <div className="not-prose grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
        {[
          { icon: '📋', label: 'DataFrame', sub: 'Labelled 2D table like Excel' },
          { icon: '📈', label: 'Series', sub: '1D labelled array (single column)' },
          { icon: '🧹', label: 'Data Cleaning', sub: 'Handle NaN, duplicates, types' },
          { icon: '🔍', label: 'EDA', sub: 'describe(), groupby(), value_counts()' },
        ].map(f => (
          <div key={f.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm">
            <div className="text-2xl mb-1">{f.icon}</div>
            <p className="text-xs font-bold text-slate-800">{f.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{f.sub}</p>
          </div>
        ))}
      </div>

      <div className="not-prose my-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 md:p-6">
        <h2 className="text-xl font-extrabold text-emerald-950">Pandas in Simple Words</h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-700">
          Think of Pandas as an <strong>Excel-like table that you can control with Python</strong>. In machine learning, we often receive raw data as rows and columns, then use Pandas to inspect it, clean it, create useful features, and pass the prepared data to a model.
        </p>

        <div className="mt-5 overflow-x-auto rounded-xl border border-emerald-200 bg-white">
          <table className="w-full min-w-[520px] text-sm border-collapse">
            <thead>
              <tr className="bg-emerald-100 text-emerald-950">
                <th className="px-3 py-2 text-left">Student</th>
                <th className="px-3 py-2 text-left">Study Hours</th>
                <th className="px-3 py-2 text-left">Marks</th>
                <th className="px-3 py-2 text-left">Passed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr><td className="px-3 py-2">Asha</td><td className="px-3 py-2">2</td><td className="px-3 py-2">48</td><td className="px-3 py-2">No</td></tr>
              <tr><td className="px-3 py-2">Ravi</td><td className="px-3 py-2">4</td><td className="px-3 py-2">72</td><td className="px-3 py-2">Yes</td></tr>
              <tr><td className="px-3 py-2">Meera</td><td className="px-3 py-2">5</td><td className="px-3 py-2">84</td><td className="px-3 py-2">Yes</td></tr>
            </tbody>
          </table>
        </div>

        <div className="mt-5 grid gap-2 md:grid-cols-4">
          {[
            ['1', 'Load', 'Read CSV / Excel / database data'],
            ['2', 'Inspect', 'See rows, columns, types and missing values'],
            ['3', 'Clean', 'Fix missing, duplicate or incorrect values'],
            ['4', 'Prepare', 'Create features and send data to the ML model'],
          ].map(([step, title, text]) => (
            <div key={step} className="rounded-xl border border-emerald-100 bg-white p-3">
              <p className="text-xs font-bold text-emerald-700">STEP {step}</p>
              <p className="mt-1 font-bold text-slate-900">{title}</p>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <CodeBlock code={`pip install pandas

import pandas as pd
import numpy as np
print(pd.__version__)   # your installed pandas version`} />

      {/* ── 1. Creating DataFrames ── */}
      <SectionHeader icon="📋" title="1. Creating & Loading DataFrames" subtitle="A DataFrame is pandas' core structure — a table with labelled rows and columns" />

      <div className="not-prose my-5 rounded-2xl border border-slate-200 bg-white p-5">
        <p className="font-bold text-slate-900">See a DataFrame before writing code</p>
        <p className="mt-1 text-sm text-slate-600">Rows are individual records. Columns describe the information stored for every record. The left-most numbers are the <strong>index</strong>.</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[500px] text-sm border-collapse">
            <thead><tr className="bg-slate-100 text-slate-800"><th className="px-3 py-2 text-left">Index</th><th className="px-3 py-2 text-left">Name</th><th className="px-3 py-2 text-left">Age</th><th className="px-3 py-2 text-left">Score</th></tr></thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr><td className="px-3 py-2 font-mono text-indigo-700">0</td><td className="px-3 py-2">Alice</td><td className="px-3 py-2">24</td><td className="px-3 py-2">88</td></tr>
              <tr><td className="px-3 py-2 font-mono text-indigo-700">1</td><td className="px-3 py-2">Bob</td><td className="px-3 py-2">32</td><td className="px-3 py-2">75</td></tr>
              <tr><td className="px-3 py-2 font-mono text-indigo-700">2</td><td className="px-3 py-2">Charlie</td><td className="px-3 py-2">28</td><td className="px-3 py-2">92</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-slate-500"><strong>Shape = (3, 3)</strong> here because there are 3 data rows and 3 data columns. The index is a label, not one of these three data columns.</p>
      </div>

      <CodeBlock code={`# Create DataFrame from dictionary — columns are keys
data = {
    'Name':    ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'Age':     [24, 32, 28, 35, 22],
    'Score':   [88, 75, 92, 68, 95],
    'Passed':  [True, True, True, False, True],
}
df = pd.DataFrame(data)
print(df)`}
output={`      Name  Age  Score  Passed
0    Alice   24     88    True
1      Bob   32     75    True
2  Charlie   28     92    True
3    Diana   35     68   False
4      Eve   22     95    True`} />

      <CodeBlock code={`# Load from CSV — the most common way in real projects
df = pd.read_csv('students.csv')

# Other common formats:
df_excel = pd.read_excel('data.xlsx')
df_json  = pd.read_json('data.json')
df_sql   = pd.read_sql('SELECT * FROM students', connection)

# Save back to CSV
df.to_csv('cleaned_data.csv', index=False)`} />

      {/* ── 2. Exploring ── */}
      <SectionHeader icon="🔍" title="2. Exploring Your Dataset — Always Do This First" subtitle="Before any modelling, understand your data shape, types, and quality" />

      <div className="not-prose my-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {[
          ['1', 'How big?', 'df.shape'],
          ['2', 'Which columns?', 'df.columns'],
          ['3', 'Which types?', 'df.dtypes'],
          ['4', 'Anything missing?', 'df.isnull().sum()'],
          ['5', 'What do values look like?', 'df.describe()'],
        ].map(([n, q, code]) => (
          <div key={n} className="rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
            <p className="text-xs font-bold text-emerald-700">CHECK {n}</p>
            <p className="mt-1 text-sm font-semibold text-slate-900">{q}</p>
            <code className="mt-2 block text-xs text-indigo-700">{code}</code>
          </div>
        ))}
      </div>

      <CodeBlock code={`df = pd.DataFrame({
    'Name':   ['Alice','Bob','Charlie','Diana','Eve'],
    'Age':    [24, 32, 28, None, 22],
    'Score':  [88, 75, 92, 68, 95],
    'City':   ['Delhi','Mumbai','Delhi','Pune','Mumbai'],
})

print(df.shape)         # (5, 4) — rows × columns
print(df.dtypes)        # data type of each column
print(df.columns)       # column names`}
output={`(5, 4)
Name      object
Age      float64
Score      int64
City      object
dtype: object
Index(['Name', 'Age', 'Score', 'City'], dtype='object')`} />

      <CodeBlock code={`print(df.head(3))    # first 3 rows
print(df.tail(2))    # last 2 rows
df.info()            # dtypes + non-null counts
print(df.describe()) # stats for numeric columns`}
output={`      Name   Age  Score    City
0    Alice  24.0     88   Delhi
1      Bob  32.0     75  Mumbai
2  Charlie  28.0     92   Delhi

     Name   Age  Score    City
3   Diana   NaN     68    Pune
4     Eve  22.0     95  Mumbai

<class 'pandas.core.frame.DataFrame'>
RangeIndex: 5 entries, 0 to 4
Data columns (total 4 columns):
 #   Column  Non-Null Count  Dtype
---  ------  --------------  -----
 0   Name    5 non-null      object
 1   Age     4 non-null      float64   ← 1 missing!
 2   Score   5 non-null      int64
 3   City    5 non-null      object

        Age      Score
count  4.00   5.000000
mean  26.50  83.600000
std    4.43  11.501449
min   22.00  68.000000
25%   23.50  75.000000
50%   26.00  88.000000
75%   29.00  92.000000
max   32.00  95.000000`} />

      <CodeBlock code={`# Check missing values — critical before ML
print(df.isnull().sum())       # count NaN per column
print(df.isnull().sum() / len(df) * 100)  # % missing

# Unique values and counts
print(df['City'].value_counts())
print(df['City'].nunique())    # number of unique values`}
output={`Name     0
Age      1
Score    0
City     0
dtype: int64

Name     0.0
Age     20.0   ← 20% missing in Age column
Score    0.0
City     0.0
dtype: float64

Mumbai    2
Delhi     2
Pune      1
Name: City, dtype: int64
3`} />

      {/* ── 3. Selection ── */}
      <SectionHeader icon="✂️" title="3. Selecting Rows & Columns" subtitle="Access exactly the data you need — by label (loc) or by position (iloc)" />

      <div className="not-prose my-5 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <h3 className="font-bold text-indigo-950">loc vs iloc — the easiest way to remember</h3>
        <div className="mt-4 overflow-x-auto rounded-xl border border-indigo-100 bg-white">
          <table className="w-full min-w-[560px] text-sm border-collapse">
            <thead><tr className="bg-indigo-100 text-indigo-950"><th className="px-3 py-2 text-left">Method</th><th className="px-3 py-2 text-left">Think</th><th className="px-3 py-2 text-left">Example</th><th className="px-3 py-2 text-left">Meaning</th></tr></thead>
            <tbody className="divide-y divide-indigo-100 text-slate-700">
              <tr><td className="px-3 py-2 font-mono font-bold">loc</td><td className="px-3 py-2">Labels / names</td><td className="px-3 py-2 font-mono">df.loc[2, 'Score']</td><td className="px-3 py-2">Row labelled 2, column named Score</td></tr>
              <tr><td className="px-3 py-2 font-mono font-bold">iloc</td><td className="px-3 py-2">Integer positions</td><td className="px-3 py-2 font-mono">df.iloc[2, 2]</td><td className="px-3 py-2">3rd row, 3rd column</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-sm text-indigo-900">In the small table above, both examples reach Charlie's score: <strong>92</strong>. The difference is <em>how</em> you point to the cell.</p>
      </div>

      <CodeBlock code={`# Select a single column → returns Series
print(df['Score'])

# Select multiple columns → returns DataFrame
print(df[['Name', 'Score']])

# loc — label based (use column names and index labels)
print(df.loc[0:2, 'Name':'Score'])  # rows 0-2, cols Name to Score

# iloc — position based (use integers like NumPy)
print(df.iloc[0:3, 1:3])           # rows 0-2, cols index 1-2`}
output={`0    88
1    75
2    92
3    68
4    95
Name: Score, dtype: int64

      Name  Score
0    Alice     88
1      Bob     75
2  Charlie     92
3    Diana     68
4      Eve     95

      Name  Age  Score
0    Alice   24     88
1      Bob   32     75
2  Charlie   28     92

    Age  Score
0  24.0     88
1  32.0     75
2  28.0     92`} />

      <CodeBlock code={`# Boolean filtering — select rows meeting conditions
# Students who passed (score >= 70)
passed = df[df['Score'] >= 70]
print(passed)

# Multiple conditions: score >= 70 AND age < 30
young_passed = df[(df['Score'] >= 70) & (df['Age'] < 30)]
print(young_passed)

# From specific cities
delhi = df[df['City'].isin(['Delhi', 'Pune'])]
print(delhi)`}
output={`      Name   Age  Score    City
0    Alice  24.0     88   Delhi
1      Bob  32.0     75  Mumbai
2  Charlie  28.0     92   Delhi
4      Eve  22.0     95  Mumbai

      Name   Age  Score   City
0    Alice  24.0     88  Delhi
2  Charlie  28.0     92  Delhi
4      Eve  22.0     95  Mumbai

      Name   Age  Score   City
0    Alice  24.0     88  Delhi
2  Charlie  28.0     92  Delhi
3    Diana   NaN     68   Pune`} />

      <div className="not-prose my-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
        <p className="font-bold text-amber-950">Filtering is simply asking a question</p>
        <p className="mt-2 text-sm text-slate-700"><code>df['Score'] &gt;= 70</code> asks each row: <strong>“Is this student's score at least 70?”</strong></p>
        <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-lg bg-white px-3 py-2 border border-amber-100">Alice 88 ✓</span>
          <span className="rounded-lg bg-white px-3 py-2 border border-amber-100">Bob 75 ✓</span>
          <span className="rounded-lg bg-white px-3 py-2 border border-amber-100">Charlie 92 ✓</span>
          <span className="rounded-lg bg-white px-3 py-2 border border-amber-100 text-slate-400">Diana 68 ✗</span>
          <span className="rounded-lg bg-white px-3 py-2 border border-amber-100">Eve 95 ✓</span>
        </div>
      </div>

      {/* ── 4. Cleaning ── */}
      <SectionHeader icon="🧹" title="4. Cleaning Data — A Critical Step in ML" subtitle="Garbage in, garbage out. Real datasets often have missing values, wrong types, and duplicates" />

      <div className="not-prose my-5 rounded-2xl border border-rose-200 bg-rose-50 p-5">
        <h3 className="font-bold text-rose-950">A missing-value example with easy numbers</h3>
        <p className="mt-2 text-sm text-slate-700">Diana's age is missing. The known ages are <strong>24, 32, 28 and 22</strong>. If we choose mean imputation:</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          <div className="rounded-xl bg-white border border-rose-100 p-3"><p className="text-xs font-bold text-rose-700">STEP 1 — ADD</p><p className="mt-1 font-mono text-sm">24 + 32 + 28 + 22 = 106</p></div>
          <div className="rounded-xl bg-white border border-rose-100 p-3"><p className="text-xs font-bold text-rose-700">STEP 2 — DIVIDE</p><p className="mt-1 font-mono text-sm">106 ÷ 4 = 26.5</p></div>
          <div className="rounded-xl bg-white border border-rose-100 p-3"><p className="text-xs font-bold text-rose-700">STEP 3 — FILL</p><p className="mt-1 text-sm">Diana's missing Age → <strong>26.5</strong></p></div>
        </div>
        <p className="mt-3 text-xs text-slate-600">Mean imputation is easy to understand, but it is not automatically the best method. The right choice depends on why values are missing and on the data distribution.</p>
      </div>

      <CodeBlock code={`# Handling missing values
print(df['Age'].isnull().sum())  # how many NaN in Age?

# Option 1: drop rows with missing values (use carefully)
df_dropped = df.dropna()

# Option 2: fill a numerical column with its mean
df['Age'] = df['Age'].fillna(df['Age'].mean())

# For a categorical column, the mode can sometimes be useful:
# df['City'] = df['City'].fillna(df['City'].mode()[0])

# For ordered/time-series data, forward fill may sometimes be suitable:
# df = df.ffill()

print(df.isnull().sum())`}
output={`1
Name     0
Age      0
Score    0
City     0
dtype: int64`} />

      <CodeBlock code={`# Remove duplicates
df_clean = df.drop_duplicates()
print(f"Before: {len(df)}, After: {len(df_clean)}")

# Fix data types — models need numbers, not strings
df['Age'] = df['Age'].astype(int)
df['Score'] = df['Score'].astype(float)

# Rename columns
df.rename(columns={'Score': 'exam_score', 'Name': 'student_name'}, inplace=True)

# Drop columns not needed for ML
df.drop(columns=['student_name'], inplace=True)
print(df.dtypes)`}
output={`Before: 5, After: 5
Age            int64
exam_score    float64
City           object
dtype: object`} />

      {/* ── 5. Feature Engineering ── */}
      <SectionHeader icon="⚙️" title="5. Creating New Features" subtitle="Useful derived features can help a model learn patterns more effectively" />

      <div className="not-prose my-5 rounded-2xl border border-violet-200 bg-violet-50 p-5">
        <p className="font-bold text-violet-950">Feature engineering means creating a more useful column from information you already have</p>
        <div className="mt-4 grid gap-3 md:grid-cols-3 text-sm">
          <div className="rounded-xl bg-white border border-violet-100 p-3"><p className="text-xs text-slate-500">Original</p><p className="mt-1 font-semibold">Score = 92</p></div>
          <div className="flex items-center justify-center font-bold text-violet-700">→ apply a simple rule →</div>
          <div className="rounded-xl bg-white border border-violet-100 p-3"><p className="text-xs text-slate-500">New feature</p><p className="mt-1 font-semibold">Grade = A</p></div>
        </div>
      </div>

      <CodeBlock code={`df = pd.DataFrame({
    'Name': ['Alice','Bob','Charlie','Diana'],
    'Age':  [24, 32, 28, 22],
    'Score':[88, 75, 92, 68],
    'City': ['Delhi','Mumbai','Delhi','Pune'],
})

# Create new column
df['Grade'] = df['Score'].apply(lambda x: 'A' if x >= 90 else ('B' if x >= 75 else 'C'))

# Bin age into groups
df['Age_Group'] = pd.cut(df['Age'], bins=[18,25,30,40],
                         labels=['18-25','26-30','31-40'])

# Extract info from strings
df['City_Short'] = df['City'].str[:3].str.upper()  # 'DEL', 'MUM', etc.

print(df[['Name','Score','Grade','Age_Group','City_Short']])`}
output={`      Name  Score Grade Age_Group City_Short
0    Alice     88     B     18-25        DEL
1      Bob     75     B     31-40        MUM
2  Charlie     92     A     26-30        DEL
3    Diana     68     C     18-25        PUN`} />

      {/* ── 6. GroupBy ── */}
      <SectionHeader icon="📊" title="6. GroupBy — Aggregate & Summarise" subtitle="Find patterns across groups — essential for EDA and feature engineering" />

      <div className="not-prose my-5 rounded-2xl border border-sky-200 bg-sky-50 p-5">
        <h3 className="font-bold text-sky-950">GroupBy = Split → Calculate → Combine</h3>
        <p className="mt-2 text-sm text-slate-700">For Delhi, Alice scored 88 and Charlie scored 92. To find Delhi's average:</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="rounded-lg bg-white border border-sky-100 px-3 py-2">88</span>
          <span className="font-bold text-sky-700">+</span>
          <span className="rounded-lg bg-white border border-sky-100 px-3 py-2">92</span>
          <span className="font-bold text-sky-700">= 180</span>
          <span className="font-bold text-sky-700">→</span>
          <span className="rounded-lg bg-white border border-sky-100 px-3 py-2">180 ÷ 2 = <strong>90</strong></span>
        </div>
        <p className="mt-3 text-sm text-slate-700">Pandas performs this same idea for every city with <code>groupby()</code>.</p>
      </div>

      <CodeBlock code={`# Average score by city
city_stats = df.groupby('City')['Score'].mean()
print(city_stats)

# Multiple aggregations at once
summary = df.groupby('City')['Score'].agg(['mean','min','max','count'])
print(summary)

# GroupBy on multiple columns
grade_city = df.groupby(['Grade','City'])['Score'].count()
print(grade_city)`}
output={`City
Delhi     90.0
Mumbai    75.0
Pune      68.0
Name: Score, dtype: float64

          mean  min  max  count
City
Delhi     90.0   88   92      2
Mumbai    75.0   75   75      1
Pune      68.0   68   68      1

Grade  City
A      Delhi     1
B      Delhi     1
       Mumbai    1
C      Pune      1
Name: Score, dtype: int64`} />

      {/* ── 7. Merge ── */}
      <SectionHeader icon="🔗" title="7. Combining Tables with merge()" subtitle="Real projects often store related information in separate tables" />

      <div className="not-prose my-5 grid gap-3 lg:grid-cols-[1fr_auto_1fr_auto_1.2fr] items-center">
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
          <p className="font-bold text-slate-900">Students</p>
          <p className="mt-2 font-mono text-xs">1  Asha<br/>2  Ravi</p>
        </div>
        <div className="text-center font-bold text-indigo-700">+</div>
        <div className="rounded-xl border border-slate-200 bg-white p-3 text-sm">
          <p className="font-bold text-slate-900">Scores</p>
          <p className="mt-2 font-mono text-xs">1  82<br/>2  76</p>
        </div>
        <div className="text-center font-bold text-indigo-700">→</div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 text-sm">
          <p className="font-bold text-indigo-950">Merged by StudentID</p>
          <p className="mt-2 font-mono text-xs">1  Asha  82<br/>2  Ravi  76</p>
        </div>
      </div>

      <CodeBlock code={`students = pd.DataFrame({
    'StudentID': [1, 2],
    'Name': ['Asha', 'Ravi']
})

scores = pd.DataFrame({
    'StudentID': [1, 2],
    'Score': [82, 76]
})

combined = pd.merge(students, scores, on='StudentID')
print(combined)`}
output={`   StudentID  Name  Score
0          1  Asha     82
1          2  Ravi     76`} />

      <p>
        The shared key <code>StudentID</code> tells Pandas which rows belong together. This is similar to joining tables in SQL.
      </p>

      {/* ── 8. ML pipeline ── */}
      <SectionHeader icon="🤖" title="8. Complete ML Preprocessing Pipeline" subtitle="How to go from a raw CSV to model-ready features using pandas" />

      <div className="not-prose my-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="font-bold text-emerald-950">The complete idea before the code</p>
        <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-slate-700">
          {['Raw CSV', 'Inspect', 'Clean', 'Encode categories', 'Choose X and y', 'Train / test split'].map((label, i, arr) => (
            <React.Fragment key={label}>
              <span className="rounded-lg border border-emerald-100 bg-white px-3 py-2 font-semibold">{label}</span>
              {i < arr.length - 1 && <span className="font-bold text-emerald-700">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <CodeBlock code={`import pandas as pd
from sklearn.model_selection import train_test_split

# Step 1: Load data
df = pd.read_csv('titanic.csv')

# Step 2: Drop columns we do not want to use as features here
df = df.drop(columns=['PassengerId', 'Name', 'Ticket', 'Cabin'])

# Step 3: Fill missing values
df['Age'] = df['Age'].fillna(df['Age'].median())
df['Embarked'] = df['Embarked'].fillna(df['Embarked'].mode()[0])

# Step 4: One-hot encode nominal categories
# This avoids pretending that categories have a natural numeric order.
df = pd.get_dummies(
    df,
    columns=['Sex', 'Embarked'],
    drop_first=True,
    dtype=int
)

# Step 5: Separate features (X) and target (y)
X = df.drop(columns=['Survived'])
y = df['Survived']

# Step 6: Split directly — scikit-learn can work with DataFrames
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Training samples: {X_train.shape[0]}")
print(f"Test samples:     {X_test.shape[0]}")
print(f"Features:         {X_train.shape[1]}")`}
output={`Training samples: 712
Test samples:     179
Features:         8`} />

      <div className="not-prose my-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
        <strong>Why one-hot encoding here?</strong> Columns such as <code>Sex</code> and <code>Embarked</code> are categories, not quantities. Giving them arbitrary numbers such as 0, 1 and 2 can incorrectly suggest an order or distance. One-hot encoding represents the categories more safely for many models.
      </div>

      <div className="not-prose bg-emerald-50 border border-emerald-200 rounded-2xl p-5 my-6">
        <p className="font-bold text-emerald-900 text-base mb-3">🎯 Pandas Cheat Sheet — Most-Used ML Operations</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead><tr className="bg-emerald-100">
              <th className="px-3 py-2 text-left font-bold text-emerald-900">Task</th>
              <th className="px-3 py-2 text-left font-bold text-emerald-900">Code</th>
            </tr></thead>
            <tbody className="divide-y divide-emerald-100">
              {[
                ['Load CSV', "pd.read_csv('file.csv')"],
                ['Check shape', 'df.shape'],
                ['Quick stats', 'df.describe()'],
                ['Missing values', 'df.isnull().sum()'],
                ['Fill missing', "df['col'].fillna(df['col'].mean())"],
                ['Drop duplicates', 'df.drop_duplicates()'],
                ['Select rows', "df[df['col'] > 50]"],
                ['Group average', "df.groupby('City')['Score'].mean()"],
                ['Create feature', "df['new'] = df['a'] + df['b']"],
                ['To NumPy (when needed)', 'df.to_numpy()'],
                ['Merge tables', "pd.merge(left, right, on='id')"],
                ['Rename column', "df.rename(columns={'old':'new'})"],
                ['Drop column', "df.drop(columns=['col'])"],
              ].map(([task, code]) => (
                <tr key={task} className="hover:bg-emerald-50">
                  <td className="px-3 py-2 font-semibold text-slate-700">{task}</td>
                  <td className="px-3 py-2 font-mono text-indigo-700">{code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="not-prose my-10 border-t border-slate-200 pt-8">
        <h2 className="text-2xl font-extrabold text-slate-900">Common Pandas Questions for ML Beginners</h2>
        <div className="mt-5 space-y-3">
          {[
            ['What is the difference between a Series and a DataFrame?', 'A Series is one labelled column of values. A DataFrame is a table made of multiple labelled columns.'],
            ['What is the difference between loc and iloc?', 'loc selects using labels or names. iloc selects using integer positions.'],
            ['Why is Pandas useful before machine learning?', 'Real data usually needs inspection, cleaning, filtering, combining and feature preparation before a model can learn from it.'],
            ['Does scikit-learn require NumPy arrays?', 'No. Many scikit-learn estimators can accept Pandas DataFrames and Series directly. Converting to NumPy is useful in some workflows, but it is not always required.'],
            ['Should I always fill missing numerical values with the mean?', 'No. Mean imputation is one simple option. The right method depends on the data, the amount and pattern of missingness, and the model you plan to use.'],
          ].map(([q, a]) => (
            <details key={q} className="rounded-xl border border-slate-200 bg-white p-4">
              <summary className="cursor-pointer font-bold text-slate-900">{q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </section>

      <div className="not-prose my-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
        <h2 className="text-lg font-extrabold text-indigo-950">Continue learning</h2>
        <p className="mt-2 text-sm text-slate-700">Pandas is mainly about preparing tabular data. These lessons build directly on the skills used here:</p>
        <div className="mt-4 flex flex-wrap gap-2 text-sm font-semibold">
          <a className="rounded-lg bg-white px-3 py-2 text-indigo-700 border border-indigo-100 hover:underline" href="/learn/numpy-essentials">NumPy Essentials</a>
          <a className="rounded-lg bg-white px-3 py-2 text-indigo-700 border border-indigo-100 hover:underline" href="/learn/eda">Exploratory Data Analysis</a>
          <a className="rounded-lg bg-white px-3 py-2 text-indigo-700 border border-indigo-100 hover:underline" href="/learn/handling-missing-data">Handling Missing Data</a>
          <a className="rounded-lg bg-white px-3 py-2 text-indigo-700 border border-indigo-100 hover:underline" href="/learn/feature-engineering">Feature Engineering</a>
          <a className="rounded-lg bg-white px-3 py-2 text-indigo-700 border border-indigo-100 hover:underline" href="/learn/scikit-learn-essentials">Scikit-learn Essentials</a>
        </div>
      </div>
    </div>
  );
}
