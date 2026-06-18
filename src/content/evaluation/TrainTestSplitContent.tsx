import React from 'react';
import { Target, Layers, PlayCircle, Eye, AlertTriangle, Code, Columns } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip as RechartsTooltip, Legend } from 'recharts';

const dataSplit = [
  { name: "Training Data", value: 80, color: "#4f46e5" },
  { name: "Testing Data", value: 20, color: "#f59e0b" },
];

export function TrainTestSplitContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Train/Test Split in Machine Learning</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Train/Test Split is one of the most fundamental concepts in Machine Learning. Before any Machine Learning model can be evaluated properly, the available dataset must be divided into separate parts so that the model can learn patterns from one portion of the data and be evaluated on unseen data.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          This process is called <strong>Train/Test Splitting</strong> or <strong>Dataset Splitting</strong>.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-indigo-900 text-lg mb-2">Primary Purpose:</p>
          <p className="text-slate-800 italic leading-relaxed">
            To evaluate how well a Machine Learning model generalizes to new unseen data.
          </p>
        </div>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          Without proper splitting, a model may appear extremely accurate during training but fail completely in real-world situations.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Why Train/Test Split Is Necessary</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose a student memorizes answers to practice questions without actually understanding the concepts. During practice, the student scores very high. But in the real exam with unseen questions, performance becomes poor.
        </p>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The same thing happens in Machine Learning. If we train and test a model using the same data, the model may simply memorize the dataset instead of learning real patterns. This problem is called <span className="font-bold text-rose-600">Overfitting</span>. Train/Test Split helps detect whether the model truly understands the data or is only memorizing it.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Real-Life Example</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Imagine a teacher preparing students for a final exam. The teacher uses some questions for practice and different questions for testing.
        </p>
        <ul className="list-disc pl-6 mb-4 text-lg text-slate-800 font-mono space-y-2">
          <li>Practice Questions → Training Set</li>
          <li>Final Exam Questions → Test Set</li>
        </ul>
        <p className="text-lg leading-relaxed text-slate-800 mb-6">
          If the same questions are used for both, the evaluation becomes meaningless. Similarly in Machine Learning, the Training Set is used to train the model, and the Test Set is used to evaluate it.
        </p>

        <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row items-center justify-center p-6 mb-8 mt-10">
          <div className="w-full md:w-1/2 flex items-center justify-center relative min-h-[300px]">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={dataSplit}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {dataSplit.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 md:pl-6 mt-6 md:mt-0 space-y-4 font-mono text-sm leading-relaxed">
            <h4 className="font-bold text-slate-900 border-b pb-2 text-lg font-sans">Typical Dataset Split Ratios</h4>
            <div className="flex justify-between items-center text-slate-800 border-b border-dashed pb-1">
              <span>70% Train / 30% Test</span>
              <span className="text-slate-500">Small datasets</span>
            </div>
            <div className="flex justify-between items-center text-indigo-700 font-bold border-b border-dashed pb-1">
              <span>80% Train / 20% Test</span>
              <span>Most common</span>
            </div>
            <div className="flex justify-between items-center text-slate-800 pb-1">
              <span>90% Train / 10% Test</span>
              <span className="text-slate-500">Large datasets</span>
            </div>
            <p className="font-sans text-slate-600 italic mt-4 text-base">The 80:20 split provides a good balance: enough data for learning and enough data for evaluation.</p>
          </div>
        </div>

      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="definitions">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Layers className="mr-3 text-indigo-600" /> Datasets: Train, Validation & Test
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">What Is a Training Set?</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              The Training Set is the portion of data used by the Machine Learning algorithm to learn patterns. The model studies relationships, trends, correlations, and statistical patterns inside this data.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border text-sm font-mono text-slate-700">
              During training, the model adjusts internal parameters to minimize prediction errors using the training data.
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">What Is a Test Set?</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              The Test Set is used after training. The model has never seen this data before. Its purpose is to evaluate model performance on unseen data, which helps estimate real-world accuracy.
            </p>
            <div className="bg-slate-50 p-4 rounded-lg border text-sm font-mono text-slate-700">
              During testing, predicted values are compared with actual values to calculate metrics like Accuracy or MSE.
            </div>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="font-bold text-sky-900 text-lg mb-2">What Is a Validation Set?</p>
          <p className="text-slate-800 leading-relaxed">
            A Validation Set is an optional dataset used <strong>during</strong> training. It helps tune hyperparameters (like learning rate or K value in KNN), prevent overfitting, and compare models. Many beginners confuse it with the Test Set. Remember: Validation happens during training, while Testing happens after.
          </p>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-10">Complete ML Workflow Using Dataset Splitting</h3>
        <div className="font-mono text-indigo-900 bg-indigo-50 p-6 rounded-xl border border-indigo-100 whitespace-pre overflow-x-auto w-fit mb-10 text-sm">
{`RAW DATA
   │
   ▼
DATA CLEANING
   │
   ▼
TRAIN/TEST SPLIT
   │
   ▼
MODEL TRAINING
   │
   ▼
VALIDATION
   │
   ▼
MODEL TESTING
   │
   ▼
FINAL DEPLOYMENT`}
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Mathematical Understanding</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Suppose dataset size is N=1000. If <code className="font-mono bg-slate-100 px-1 rounded text-red-600">test_size=0.2</code>, then:
        </p>
        <ul className="list-disc pl-6 mb-6 text-lg text-slate-800 font-mono space-y-2">
          <li>Test samples = 1000 × 0.2 = 200</li>
          <li>Training samples = 1000 − 200 = 800</li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="splitting-techniques">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Columns className="mr-3 text-indigo-600" /> Why Random and Stratified Splitting Matters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">Random Splitting</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              Suppose dataset rows are ordered: first 500 rows are young customers, last 500 are old customers. If splitting occurs without shuffling, your training data might be entirely young customers, resulting in a biased and poor model. Random shuffling ensures both datasets contain representative samples.
            </p>
          </div>
          <div>
            <h4 className="text-xl font-bold text-slate-800 mb-2">random_state</h4>
            <p className="text-lg leading-relaxed text-slate-800 mb-4">
              The parameter <code className="bg-slate-100 px-1 rounded text-sm text-red-600 font-mono">random_state=42</code> controls reproducibility. Without it, each script execution creates different splits. With it, the same split is generated every time. This is critical for research, team collaboration, and reproducible experiments.
            </p>
          </div>
        </div>

        <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 mt-4">
          <p className="font-bold text-emerald-900 text-lg mb-2">What Is Stratified Splitting?</p>
          <p className="text-slate-800 leading-relaxed mb-2">
            In classification problems, classes may be imbalanced (e.g. 90 Spam, 10 Not Spam). If random splitting occurs carelessly, the test set may miss minority classes entirely. <strong>Stratified splitting</strong> preserves class proportions across both training and testing datasets.
          </p>
          <div className="font-mono text-sm text-emerald-800 mt-4 border-t border-emerald-200 pt-3">
{`ORIGINAL: 90% Class A, 10% Class B
TRAIN SET: 90% Class A, 10% Class B
TEST SET:  90% Class A, 10% Class B`}
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="applications-and-code">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation (scikit-learn)
        </h2>

        <p className="text-lg leading-relaxed mb-6 text-slate-800">
           The most common method uses <code className="bg-slate-100 px-1 font-mono rounded text-red-600">train_test_split()</code> from <code className="bg-slate-100 px-1 font-mono rounded text-red-600">sklearn.model_selection</code>. You pass features (X), labels (y), an optional test size, random state, and parameters like <code>shuffle</code> and <code>stratify</code>.
        </p>

        <div className="bg-white border text-left border-slate-200 rounded-xl overflow-hidden shadow-sm mb-10 border-l-4 border-l-indigo-500">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center">
            <Code className="text-indigo-600 mr-3" />
            <h4 className="font-bold text-slate-800 text-lg">Python Code: Splitting and Training</h4>
          </div>
          <div className="p-0">
            <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 overflow-x-auto text-sm font-mono leading-relaxed">
<pre><code>{`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# Step 1 — Create Dataset
data = {
    'Hours': [1,2,3,4,5,6,7,8],
    'Passed': [0,0,0,1,1,1,1,1]
}
df = pd.DataFrame(data)

# Step 2 — Separate Features and Labels
X = df[['Hours']]
y = df['Passed']

# Step 3 — Perform Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.25,
    random_state=42,
    shuffle=True
)

# Step 4 — Train Model
model = LogisticRegression()
model.fit(X_train, y_train)

# Step 5 — Predict on Test Data
y_pred = model.predict(X_test)

# Step 6 — Calculate Accuracy
accuracy = accuracy_score(y_test, y_pred)
print("Accuracy:", accuracy)
# Output: Accuracy: 1.0`}</code></pre>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-10">
          <h4 className="text-xl font-bold flex items-center text-amber-900 mb-4">
            <AlertTriangle className="mr-2" /> Common Mistakes Beginners Make
          </h4>
          <ul className="list-disc pl-6 text-lg text-amber-900 space-y-2">
            <li><strong>Training and Testing on Same Data:</strong> Creates unrealistic accuracy.</li>
            <li><strong>Forgetting Shuffle:</strong> Leads to biased splits.</li>
            <li><strong>Very Small Test Set:</strong> Evaluation becomes unreliable.</li>
            <li><strong>Data Leakage:</strong> Using test data during training accidentally. Extremely dangerous algorithmically.</li>
            <li><strong>Ignoring Class Imbalance:</strong> Can produce misleading high accuracy scores (always stratify).</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="comparisons">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> Comparisons, Advantages & Disadvantages
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Advantages of Train/Test Split</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Simple and Easy:</strong> Very beginner friendly.</li>
              <li><strong>Fast Execution:</strong> Requires minimal computation compared to cross-validation.</li>
              <li><strong>Useful for Large Datasets:</strong> Works efficiently on big datasets where training is costly.</li>
              <li><strong>Easy Model Evaluation:</strong> Provides straightforward performance estimation.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Disadvantages</h3>
            <ul className="list-disc pl-5 text-lg text-slate-800 space-y-3">
              <li><strong>Performance Depends on Random Split:</strong> Different random states might give wildly varying accuracy.</li>
              <li><strong>Not Ideal for Small Datasets:</strong> Too little training data reduces learning quality.</li>
              <li><strong>Risk of Biased Splits:</strong> Especially if you forget to use stratification.</li>
            </ul>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-800 mb-4">Train/Test Split vs Cross Validation</h3>
        <div className="overflow-x-auto mb-8 max-w-4xl">
          <table className="min-w-full divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm text-lg">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-slate-700">Feature</th>
                <th className="px-6 py-3 text-left font-bold text-indigo-700">Train/Test Split</th>
                <th className="px-6 py-3 text-left font-bold text-emerald-700">Cross Validation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Number of splits</td>
                <td className="px-6 py-4 text-indigo-700 font-bold">One</td>
                <td className="px-6 py-4 text-emerald-700">Multiple</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="px-6 py-4 text-slate-900 font-medium">Speed</td>
                <td className="px-6 py-4 text-indigo-700 font-bold">Faster</td>
                <td className="px-6 py-4 text-amber-600">Slower</td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-slate-900 font-medium">Reliability</td>
                <td className="px-6 py-4 text-amber-600">Moderate</td>
                <td className="px-6 py-4 text-emerald-700 font-bold">Higher</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Train/Test Split is a fundamental Machine Learning technique used to divide a dataset into training data for learning and testing data for evaluation. It helps measure how well a model generalizes to unseen data and prevents overfitting.
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        The most commonly used tool is <code>train_test_split()</code> from <code>sklearn.model_selection</code>. Important parameters include <code>test_size</code>, <code>random_state</code>, <code>shuffle</code>, and <code>stratify</code>. Train/Test Split forms the foundation of reliable Machine Learning model evaluation and is essential in almost every supervised learning workflow.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          A Machine Learning model should NEVER see test data during training. Because the test set simulates real-world unseen data, violating this principle creates <strong>Data Leakage</strong>, which leads to artificially inflated, fake performance scores that will collapse in production.
        </p>
      </div>
    </>
  );
}
