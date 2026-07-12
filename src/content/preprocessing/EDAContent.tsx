import React from "react";
import {
  Search,
  Code,
  AlertTriangle,
} from "lucide-react";

function CodeBlock({ code, output, title }: { code: string; output?: React.ReactNode; title?: string }) {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-sm not-prose">
      {title && <div className="bg-slate-800 text-slate-300 px-4 py-2 text-sm border-b border-slate-700 flex items-center gap-2 font-mono"><Code className="w-4 h-4"/> {title}</div>}
      <div className="p-4 text-sm font-mono overflow-x-auto text-slate-200">
        <pre className="!m-0 max-w-full min-w-full"><code className="language-python">{code}</code></pre>
      </div>
      {output && (
        <div className="bg-white border-t border-slate-200">
          <div className="bg-slate-50 text-slate-500 px-4 py-1 text-xs border-b border-slate-200 uppercase tracking-wider font-semibold">Output</div>
          <div className="p-4 overflow-x-auto text-sm text-slate-800 bg-white">
            {typeof output === 'string' ? <pre className="!m-0 font-mono">{output}</pre> : output}
          </div>
        </div>
      )}
    </div>
  )
}

export function EDAContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-indigo-500 pl-4 py-1 bg-slate-50">
        Before building machine learning models or creating dashboards, analysts first need to understand the data properly. Raw datasets often contain hidden problems such as missing values, duplicate records, unusual patterns, or incorrect formatting.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        What is Exploratory Data Analysis?
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-4">
        Exploratory Data Analysis (EDA) is the practice of examining a dataset before applying any machine learning algorithm — using statistics and visualisations to understand its structure, quality, and patterns. Think of EDA as the detective phase: you are not yet building a model, you are investigating the data to form hypotheses and catch problems early.
      </p>
      <p className="text-lg leading-relaxed text-slate-700 mb-4">
        In real ML projects, EDA is what separates high-performing models from poor ones. A model trained on poorly understood data with hidden missing values, wrong data types, or undetected outliers will perform unreliably — no matter how advanced the algorithm. EDA is the foundation everything else is built upon.
      </p>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        The main objectives of EDA are to understand the dataset structure and shape, detect missing or erroneous values before they corrupt training, find relationships and correlations between features, identify outliers that may skew model learning, discover hidden trends or class imbalances, and ultimately prepare the data for reliable machine learning.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Why is EDA Important?
      </h2>
      <div className="not-prose sm:-cols-2 mb-8 space-y-8">
        {[
          { icon: '🔍', title: 'Understand Data Structure', desc: 'EDA reveals the number of rows, columns, data types, and value ranges. You cannot model what you do not understand.' },
          { icon: '🚨', title: 'Detect Missing Values', desc: 'Real-world data always has gaps. EDA quantifies exactly how many NaNs exist per column and guides your imputation strategy.' },
          { icon: '📉', title: 'Find Outliers', desc: 'Extreme values can distort model training. EDA exposes them through boxplots, histograms, and z-score analysis.' },
          { icon: '🔗', title: 'Identify Relationships', desc: 'Correlation matrices and scatter plots reveal which features are predictive and which are redundant or collinear.' },
          { icon: '⚖️', title: 'Spot Class Imbalance', desc: 'If 98% of your labels are "No" and 2% are "Yes", accuracy is a useless metric. EDA catches this before you train.' },
          { icon: '💡', title: 'Guide Feature Engineering', desc: 'EDA insights — like skewed distributions or interaction patterns — directly inspire which new features to create.' },
        ].map(f => (
          <div key={f.title} className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
            <span className="text-2xl flex-shrink-0">{f.icon}</span>
            <div>
              <p className="font-bold text-slate-800 text-sm mb-1">{f.title}</p>
              <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Types of Exploratory Data Analysis
      </h2>

            {/* EDA Hierarchical Tree */}
      <div className="bg-slate-50 border border-slate-200 py-8 px-4 rounded-xl shadow-sm my-8 overflow-x-auto">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider text-center mb-6">Figure — EDA Types Hierarchy</p>
        <div className="flex flex-col items-center min-w-[700px] max-w-4xl mx-auto">
          <div className="bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow text-sm">Exploratory Data Analysis (EDA)</div>
          <div className="w-0.5 bg-slate-300 h-6"/>
          
          <div className="relative w-full h-6">
            <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: '16.666%', right: '16.666%' }} />
            {[0, 1, 2].map(idx => (
              <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{ left: `${(idx + 0.5) * 100 / 3}%`, transform: 'translateX(-50%)' }} />
            ))}
          </div>
          
          <div className="flex w-full items-stretch">
            {[
              { name: 'Univariate Analysis', col: 'indigo', sub: ['One variable at a time','Distribution, shape, spread','Histogram, boxplot, bar chart'] },
              { name: 'Bivariate Analysis', col: 'emerald', sub: ['Two variables together','Relationships & correlation','Scatter plot, heatmap, crosstab'] },
              { name: 'Multivariate Analysis', col: 'amber', sub: ['3+ variables simultaneously','Interactions & clusters','Pair plot, PCA, parallel coords'] },
            ].map(t => (
              <div key={t.name} className="flex-1 px-3">
                <div className={`bg-${t.col}-50 border border-${t.col}-200 rounded-xl p-4 text-center h-full`}>
                  <p className={`font-bold text-${t.col}-800 text-sm mb-2`}>{t.name}</p>
                  {t.sub.map(s => <p key={s} className="text-xs text-slate-500 mb-0.5">{s}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Univariate */}
      <h3 className="text-xl font-bold mt-8 mb-4 text-indigo-800">1. Univariate Analysis — Exploring One Variable</h3>
      <p className="text-lg leading-relaxed text-slate-700 mb-4">
        Univariate analysis examines each feature independently to understand its distribution, central tendency, spread, and the presence of outliers. It answers questions like: Is this feature normally distributed? Is it skewed? Are there unusual extreme values?
      </p>

      <CodeBlock
        title="univariate_analysis.py"
        code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# Example dataset: Student exam scores
scores = pd.Series([45, 52, 67, 72, 58, 89, 74, 63, 91, 55,
                    78, 83, 69, 77, 84, 61, 93, 48, 71, 86])

# --- Numerical summary ---
print("Count:   ", scores.count())
print("Mean:    ", round(scores.mean(), 2))
print("Median:  ", scores.median())
print("Std Dev: ", round(scores.std(), 2))
print("Min/Max: ", scores.min(), "/", scores.max())
print("Skewness:", round(scores.skew(), 3))  # > 0 = right skew

# --- Visualisations ---
fig, axes = plt.subplots(1, 3, figsize=(14, 4))

# Histogram — see distribution shape
axes[0].hist(scores, bins=8, color='#6366f1', edgecolor='white')
axes[0].set_title('Histogram — Distribution Shape')
axes[0].set_xlabel('Exam Score')

# Boxplot — see median, IQR, outliers
axes[1].boxplot(scores, patch_artist=True,
                boxprops=dict(facecolor='#e0e7ff'))
axes[1].set_title('Boxplot — Spread & Outliers')

# KDE — smooth distribution estimate
scores.plot.kde(ax=axes[2], color='#6366f1')
axes[2].set_title('KDE — Probability Density')

plt.tight_layout()
plt.savefig('univariate.png', dpi=120)
plt.show()`}
      />

      {/* Bivariate */}
      <h3 className="text-xl font-bold mt-8 mb-4 text-emerald-800">2. Bivariate Analysis — Relationships Between Two Variables</h3>
      <p className="text-lg leading-relaxed text-slate-700 mb-4">
        Bivariate analysis investigates how two variables relate to each other. It can reveal correlations (do study hours predict exam score?), group differences (do students in Delhi outperform those in Mumbai?), or categorical associations.
      </p>

      <CodeBlock
        title="bivariate_analysis.py"
        code={`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.DataFrame({
    'Study_Hours': [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
    'Exam_Score':  [52, 58, 64, 70, 75, 82, 88, 91, 94, 97],
    'City':        ['Delhi','Mumbai','Delhi','Pune','Mumbai',
                    'Delhi','Pune','Mumbai','Delhi','Pune'],
    'Passed':      [False, False, True, True, True,
                    True,  True,  True, True, True],
})

fig, axes = plt.subplots(1, 3, figsize=(15, 4))

# 1. Scatter plot: numerical vs numerical
axes[0].scatter(df['Study_Hours'], df['Exam_Score'], color='#6366f1', s=80)
axes[0].set_xlabel('Study Hours')
axes[0].set_ylabel('Exam Score')
axes[0].set_title('Scatter: Study Hours vs Score')

# Correlation coefficient
corr = df['Study_Hours'].corr(df['Exam_Score'])
print(f"Pearson correlation: {corr:.4f}")   # close to 1 = strong positive

# 2. Boxplot: categorical vs numerical
df.boxplot(column='Exam_Score', by='City', ax=axes[1])
axes[1].set_title('Boxplot: Score by City')
axes[1].set_xlabel('City')

# 3. Cross-tabulation: categorical vs categorical
ct = pd.crosstab(df['City'], df['Passed'])
print("\nCross-tabulation City vs Passed:")
print(ct)
ct.plot(kind='bar', ax=axes[2], color=['#ef4444','#10b981'])
axes[2].set_title('Pass Rate by City')

plt.tight_layout()
plt.savefig('bivariate.png', dpi=120)
plt.show()`}
      />

      <CodeBlock
        title=""
        code={``}
        output={`Pearson correlation: 0.9981   ← very strong positive relationship

Cross-tabulation City vs Passed:
Passed  False  True
City
Delhi       0     4
Mumbai      1     2
Pune        0     3`}
      />

      {/* Multivariate */}
      <h3 className="text-xl font-bold mt-8 mb-4 text-amber-800">3. Multivariate Analysis — Three or More Variables</h3>
      <p className="text-lg leading-relaxed text-slate-700 mb-4">
        Multivariate analysis examines how multiple features interact simultaneously. It answers questions like: Which combination of features best separates classes? Are any features so correlated that they are redundant? It forms the basis of feature selection and dimensionality reduction.
      </p>

      <CodeBlock
        title="multivariate_analysis.py"
        code={`import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris

iris = load_iris()
df = pd.DataFrame(iris.data, columns=iris.feature_names)
df['species'] = pd.Categorical.from_codes(iris.target, iris.target_names)

# 1. Correlation heatmap — detect redundant features
plt.figure(figsize=(7, 5))
corr_matrix = df.drop(columns='species').corr()
sns.heatmap(corr_matrix, annot=True, fmt='.2f', cmap='RdYlGn',
            center=0, square=True, linewidths=0.5)
plt.title('Feature Correlation Heatmap')
plt.savefig('heatmap.png', dpi=120)
plt.show()
print("Correlation matrix:")
print(corr_matrix.round(2))

# 2. Pair plot — all feature combinations coloured by class
sns.pairplot(df, hue='species', palette='husl', plot_kws={'alpha':0.6})
plt.suptitle('Pair Plot — All Feature Combinations', y=1.02)
plt.savefig('pairplot.png', dpi=120)
plt.show()`}
      />

      <CodeBlock
        title=""
        code={``}
        output={`Correlation matrix:
                     sepal length  sepal width  petal length  petal width
sepal length (cm)           1.00        -0.12          0.87         0.82
sepal width (cm)           -0.12         1.00         -0.43        -0.37
petal length (cm)           0.87        -0.43          1.00         0.96
petal width (cm)            0.82        -0.37          0.96         1.00

Insight: petal length and petal width are highly correlated (0.96)
→ one of them may be redundant for modelling`}
      />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Common Steps in Exploratory Data Analysis
      </h2>
      <p>
        An effective EDA process generally follows a standardized set of steps using Python libraries. Let's walk through them.
      </p>

      <h3 className="text-xl font-bold mt-8 mb-2">Step 1 – Import Required Libraries</h3>
      <p>Python provides powerful libraries for data analysis and visualization. Common libraries include Pandas, NumPy, Matplotlib, Seaborn, and Plotly.</p>
      
      <CodeBlock 
        title="1_import_libraries.py"
        code={`import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns`} 
      />

      <h3 className="text-xl font-bold mt-8 mb-2">Step 2 – Load the Dataset</h3>
      <p>Datasets are usually stored in CSV, Excel, or database formats.</p>

      <CodeBlock 
        title="2_load_data.py"
        code={`df = pd.read_csv("data.csv")
print(df.head())`}
        output={`      Name   Age  Salary  Experience
0    Alice  28.0   60000           3
1      Bob  34.0   75000           6
2  Charlie   NaN   50000           1
3    David  45.0  120000          15
4      Eve  30.0   80000           5`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">Step 3 – Understand Dataset Structure</h3>
      
      <CodeBlock 
        title="3_structure.py"
        code={`# Check Shape
print(df.shape)

# Check Data Types
print(df.info())

# Statistical Summary
print(df.describe())`}
        output={`(100, 4)

<class 'pandas.core.frame.DataFrame'>
RangeIndex: 100 entries, 0 to 99
Data columns (total 4 columns):
 #   Column      Non-Null Count  Dtype  
---  ------      --------------  -----  
 0   Name        100 non-null    object 
 1   Age         92 non-null     float64
 2   Salary      100 non-null    int64  
 3   Experience  100 non-null    int64  
dtypes: float64(1), int64(2), object(1)
memory usage: 3.2+ KB
None

              Age         Salary  Experience
count   92.000000     100.000000  100.000000
mean    35.240000   72500.500000    7.200000
std      8.120000   24000.100000    4.500000
min     22.000000   45000.000000    1.000000
25%     29.000000   55000.000000    3.000000
50%     34.000000   68000.000000    6.000000
75%     41.000000   85000.000000   10.000000
max     60.000000  150000.000000   25.000000`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">Step 4 – Handling Missing Values</h3>
      <CodeBlock 
        title="4_missing_values.py"
        code={`# Check Missing Values
print(df.isnull().sum())

# Remove Missing Values (Optional, drops rows with missing data)
# df.dropna()

# Fill Missing Values with Mean
df.fillna(df.mean(numeric_only=True), inplace=True)`}
        output={`Name          0
Age           8
Salary        0
Experience    0
dtype: int64`}
      />

      <h3 className="text-xl font-bold mt-8 mb-2">Step 5 – Detecting Duplicate Records</h3>
      <p>Duplicate data can create misleading analysis.</p>
      <CodeBlock 
        title="5_duplicates.py"
        code={`# Count duplicates
print(df.duplicated().sum())

# Remove duplicates
df.drop_duplicates(inplace=True)`}
        output={`3`}
      />

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Data Visualization in EDA
      </h2>
      <p>Visualization makes analysis easier and faster.</p>

      <div className="md:grid-cols-2 grid my-6 gap-8">
        <div>
          <CodeBlock 
            code={`# Histogram Example
plt.hist(df['Age'])
plt.show()`}
            output={
              <div className="w-full flex items-center justify-center p-4 bg-white rounded">
                <svg width="200" height="150" viewBox="0 0 200 150" className="w-full max-w-[200px] h-auto text-blue-500">
                  <path d="M 20,130 L 180,130 M 20,20 L 20,130" stroke="currentColor" strokeWidth="2" fill="none" />
                  <rect x="30" y="90" width="15" height="40" fill="currentColor" opacity="0.8" />
                  <rect x="50" y="60" width="15" height="70" fill="currentColor" opacity="0.8" />
                  <rect x="70" y="30" width="15" height="100" fill="currentColor" opacity="0.8" />
                  <rect x="90" y="20" width="15" height="110" fill="currentColor" opacity="0.8" />
                  <rect x="110" y="45" width="15" height="85" fill="currentColor" opacity="0.8" />
                  <rect x="130" y="70" width="15" height="60" fill="currentColor" opacity="0.8" />
                  <rect x="150" y="100" width="15" height="30" fill="currentColor" opacity="0.8" />
                </svg>
              </div>
            }
          />
        </div>
        <div>
          <CodeBlock 
            code={`# Box Plot Example
sns.boxplot(x=df['Salary'])
plt.show()`}
            output={
              <div className="w-full flex items-center justify-center p-4 bg-white rounded">
                <svg width="200" height="100" viewBox="0 0 200 100" className="w-full max-w-[200px] h-auto text-indigo-500">
                  {/* Axis */}
                  <path d="M 20,80 L 180,80" stroke="#cbd5e1" strokeWidth="2" fill="none" />
                  {/* Whiskers */}
                  <line x1="40" y1="50" x2="160" y2="50" stroke="currentColor" strokeWidth="2" />
                  <line x1="40" y1="40" x2="40" y2="60" stroke="currentColor" strokeWidth="2" />
                  <line x1="160" y1="40" x2="160" y2="60" stroke="currentColor" strokeWidth="2" />
                  {/* Box */}
                  <rect x="70" y="30" width="60" height="40" fill="currentColor" opacity="0.2" stroke="currentColor" strokeWidth="2" />
                  {/* Median */}
                  <line x1="110" y1="30" x2="110" y2="70" stroke="currentColor" strokeWidth="2" />
                  {/* Outliers */}
                  <circle cx="25" cy="50" r="3" fill="currentColor" />
                  <circle cx="175" cy="50" r="3" fill="currentColor" />
                </svg>
              </div>
            }
          />
        </div>
        <div>
          <CodeBlock 
            code={`# Scatter Plot Example
sns.scatterplot(
    x='Experience', y='Salary', data=df
)
plt.show()`}
            output={
              <div className="w-full flex items-center justify-center p-4 bg-white rounded">
                <svg width="200" height="150" viewBox="0 0 200 150" className="w-full max-w-[200px] h-auto text-emerald-500">
                  {/* Axes */}
                  <path d="M 20,130 L 180,130 M 20,20 L 20,130" stroke="currentColor" strokeWidth="2" fill="none" />
                  {/* Points */}
                  <circle cx="40" cy="110" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="45" cy="120" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="60" cy="100" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="70" cy="95" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="85" cy="80" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="95" cy="90" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="110" cy="70" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="125" cy="65" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="135" cy="50" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="150" cy="40" r="4" fill="currentColor" opacity="0.7" />
                  <circle cx="165" cy="30" r="4" fill="currentColor" opacity="0.7" />
                </svg>
              </div>
            }
          />
        </div>
        <div>
          <CodeBlock 
            code={`# Correlation Heatmap Example
plt.figure(figsize=(10,6))
sns.heatmap(df.corr(), annot=True)
plt.show()`}
            output={
              <div className="w-full flex items-center justify-center p-4 bg-white rounded">
                <svg width="150" height="150" viewBox="0 0 150 150" className="w-full max-w-[150px] h-auto font-sans text-xs font-semibold">
                  <rect x="0" y="0" width="50" height="50" fill="#dc2626" />
                  <text x="25" y="30" fill="white" textAnchor="middle">1.0</text>
                  <rect x="50" y="0" width="50" height="50" fill="#f87171" />
                  <text x="75" y="30" fill="white" textAnchor="middle">0.8</text>
                  <rect x="100" y="0" width="50" height="50" fill="#fecaca" />
                  <text x="125" y="30" fill="#7f1d1d" textAnchor="middle">0.2</text>
                  
                  <rect x="0" y="50" width="50" height="50" fill="#f87171" />
                  <text x="25" y="80" fill="white" textAnchor="middle">0.8</text>
                  <rect x="50" y="50" width="50" height="50" fill="#dc2626" />
                  <text x="75" y="80" fill="white" textAnchor="middle">1.0</text>
                  <rect x="100" y="50" width="50" height="50" fill="#fee2e2" />
                  <text x="125" y="80" fill="#7f1d1d" textAnchor="middle">0.1</text>
                  
                  <rect x="0" y="100" width="50" height="50" fill="#fecaca" />
                  <text x="25" y="130" fill="#7f1d1d" textAnchor="middle">0.2</text>
                  <rect x="50" y="100" width="50" height="50" fill="#fee2e2" />
                  <text x="75" y="130" fill="#7f1d1d" textAnchor="middle">0.1</text>
                  <rect x="100" y="100" width="50" height="50" fill="#dc2626" />
                  <text x="125" y="130" fill="white" textAnchor="middle">1.0</text>
                </svg>
              </div>
            }
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Best Practices & Challenges
      </h2>
      <div className="md:grid-cols-2 grid my-6 gap-8">
        <div>
          <h3 className="text-xl font-bold text-emerald-700">Best Practices for EDA</h3>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Always understand business objectives first</li>
            <li>Clean the data carefully</li>
            <li>Use multiple visualizations</li>
            <li>Validate unusual patterns</li>
            <li>Document observations</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-rose-700">Challenges in EDA</h3>
          <ul className="list-disc pl-6 text-slate-700">
            <li>Missing Data</li>
            <li>Outliers</li>
            <li>Large Datasets</li>
            <li>Data Imbalance</li>
            <li>Inconsistent Formats</li>
          </ul>
        </div>
      </div>
      
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded mb-8 mt-8 not-prose">
        <div className="flex items-center gap-2 text-yellow-800 font-bold mb-2">
          <AlertTriangle className="h-5 w-5" /> The Garbage In, Garbage Out Warning
        </div>
        <p className="text-sm text-yellow-900 m-0">
          Machine Learning models are fundamentally dumb mathematical equations.
          If you skip EDA and feed a model data where missing ages are recorded
          as <code>-999</code>, the model might incorrectly assume age actually negatively
          affects pricing in bizarre mathematical ways.{" "}
          <strong>You cannot skip EDA.</strong>
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Practice Checkpoint
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden not-prose">
        <Search className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-indigo-300">
          Test Your Recognition
        </h4>
        <p className="font-medium text-slate-200">Scenario:</p>
        <p className="text-sm bg-slate-700/50 p-3 rounded mb-4">
          You are preparing a dataset of 10,000 employees to predict salary. You
          want to quickly check if someone accidentally typed an extra '0' for
          someone's salary, creating an extreme anomaly that could break your
          linear regression model. <br />
          <br />
          Which visualization plot from EDA is specifically known as the
          "absolute best tool" for spotting these extreme anomalies?
        </p>
        <details className="group cursor-pointer">
          <summary className="font-bold text-indigo-400 outline-none select-none">
            Reveal Answer
          </summary>
          <div className="mt-3 p-4 bg-emerald-900/40 border border-emerald-800/50 text-emerald-100 rounded text-sm space-y-2">
            <p>
              <strong>Answer: A Box Plot.</strong>
            </p>
            <p className="text-slate-300">
              Box plots calculate summary statistics (like percentiles) and draw
              specific "whiskers" for normal ranges. Any data point (like the
              typo salary) falling outside those whiskers is plotted as an
              isolated dot, immediately highlighting it as an outlier.
            </p>
          </div>
        </details>
      </div>
    </div>
  );
}
