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
      <h3 className="font-extrabold text-emerald-900 text-xl">{title}</h3>
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

      <CodeBlock code={`pip install pandas

import pandas as pd
import numpy as np
print(pd.__version__)   # e.g. 2.2.1`} output={`2.2.1`} />

      {/* ── 1. Creating DataFrames ── */}
      <SectionHeader icon="📋" title="1. Creating & Loading DataFrames" subtitle="A DataFrame is pandas' core structure — a table with labelled rows and columns" />

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
print(df.info())     # dtypes + non-null counts
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

      {/* ── 4. Cleaning ── */}
      <SectionHeader icon="🧹" title="4. Cleaning Data — The Most Important Step in ML" subtitle="Garbage in, garbage out. Real datasets always have missing values, wrong types, and duplicates" />

      <CodeBlock code={`# Handling missing values
print(df['Age'].isnull().sum())  # how many NaN in Age?

# Drop rows with any NaN
df_dropped = df.dropna()

# Fill NaN with mean (common for numerical columns)
df['Age'].fillna(df['Age'].mean(), inplace=True)

# Fill NaN with mode (best for categorical)
df['City'].fillna(df['City'].mode()[0], inplace=True)

# Forward fill (great for time series)
df.fillna(method='ffill', inplace=True)

print(df.isnull().sum())  # should all be 0 now`}
output={`1
Name    0
Age     0
Score   0
City    0
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
      <SectionHeader icon="⚙️" title="5. Creating New Features" subtitle="Derived features often improve model accuracy significantly" />

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

      {/* ── 7. ML pipeline ── */}
      <SectionHeader icon="🤖" title="7. Complete ML Preprocessing Pipeline" subtitle="How to go from raw CSV to model-ready NumPy arrays using pandas" />

      <CodeBlock code={`import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Step 1: Load data
df = pd.read_csv('titanic.csv')

# Step 2: Drop irrelevant columns
df.drop(columns=['Name', 'Ticket', 'Cabin'], inplace=True)

# Step 3: Fill missing values
df['Age'].fillna(df['Age'].median(), inplace=True)
df['Embarked'].fillna(df['Embarked'].mode()[0], inplace=True)

# Step 4: Encode categorical columns
le = LabelEncoder()
df['Sex']      = le.fit_transform(df['Sex'])       # male→1, female→0
df['Embarked'] = le.fit_transform(df['Embarked'])  # C→0, Q→1, S→2

# Step 5: Separate features (X) and target (y)
X = df.drop(columns=['Survived'])   # all columns except target
y = df['Survived']                  # target column

# Step 6: Convert to NumPy (what sklearn actually uses)
X_np = X.values   # DataFrame → NumPy array
y_np = y.values

# Step 7: Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X_np, y_np, test_size=0.2, random_state=42
)

print(f"Training samples: {X_train.shape[0]}")
print(f"Test samples:     {X_test.shape[0]}")
print(f"Features:         {X_train.shape[1]}")`}
output={`Training samples: 713
Test samples:     179
Features:         7`} />

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
                ['To NumPy', 'df.values or df.to_numpy()'],
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
    </div>
  );
}
