import React from 'react';
import { Target, AlertTriangle, ShieldCheck, Activity, BarChart, Cpu, Search, CheckCircle, XCircle, Code, ShieldAlert, Check } from 'lucide-react';

export function ConfusionMatrixContent() {
  return (
    <>
      <div id="introduction">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Confusion Matrix in Machine Learning</h1>
        
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A confusion matrix is one of the most important evaluation tools in Machine Learning classification problems. It helps us understand how many predictions were correct, what kinds of mistakes the model made, whether the model is biased toward certain classes, and how reliable the predictions are.
        </p>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Unlike simple accuracy, a confusion matrix gives a <strong>complete breakdown</strong> of model performance. This is why confusion matrices are extensively used in Medical diagnosis systems, Fraud detection, Spam filtering, Face recognition, Credit scoring, Object detection, Recommendation systems, and Cybersecurity systems.
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8">
          <p className="text-indigo-900 text-lg leading-relaxed mb-2 font-bold">Why the Name "Confusion Matrix"?</p>
          <p className="text-indigo-800 text-lg italic leading-relaxed">
            The term "Confusion" comes from the fact that the matrix shows exactly where the model becomes confused between classes. For example, a cat image classified as a dog means the model became confused between Cat and Dog. Similarly, a spam email predicted as a normal email, or a fraud transaction predicted as legitimate, all represent model confusion which the matrix captures visually and numerically.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="what-is-confusion-matrix">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Target className="mr-3 text-indigo-600" /> What Is a Confusion Matrix?
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          A confusion matrix is a table used to evaluate the performance of a classification model by comparing Actual values vs Predicted values. It summarizes Correct predictions, Incorrect predictions, Positive predictions, and Negative predictions in a structured matrix format.
        </p>

        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">Binary Classification Confusion Matrix</h3>
        <p className="text-lg leading-relaxed mb-6 text-slate-800">
          The most common structure is the 2 × 2 Binary Confusion Matrix used for binary classification problems (e.g., Yes/No, Disease/Healthy, Spam/Not Spam).
        </p>

        <div className="bg-white border text-center border-slate-200 rounded-xl p-8 shadow-sm mb-10 overflow-x-auto w-full md:w-fit font-mono">
          <table className="w-full text-slate-800">
            <thead>
              <tr>
                <th className="p-3"></th>
                <th className="p-3 bg-slate-100 border border-slate-200 rounded-tl-lg">Predicted Positive</th>
                <th className="p-3 bg-slate-100 border border-slate-200 rounded-tr-lg">Predicted Negative</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="p-3 bg-slate-100 border border-slate-200 rounded-bl-lg text-left">Actual Positive</th>
                <td className="p-4 border border-slate-200 bg-emerald-50 text-emerald-900 font-bold text-lg">True Positive (TP)</td>
                <td className="p-4 border border-slate-200 bg-rose-50 text-rose-900 font-bold text-lg">False Negative (FN)</td>
              </tr>
              <tr>
                <th className="p-3 bg-slate-100 border border-slate-200 rounded-br-lg text-left">Actual Negative</th>
                <td className="p-4 border border-slate-200 bg-orange-50 text-orange-900 font-bold text-lg">False Positive (FP)</td>
                <td className="p-4 border border-slate-200 bg-sky-50 text-sky-900 font-bold text-lg">True Negative (TN)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="components-in-detail">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Activity className="mr-3 text-indigo-600" /> Understanding Each Component
        </h2>

        {/* TP */}
        <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <CheckCircle className="h-6 w-6 text-emerald-600 mr-2" />
            <h3 className="text-2xl font-bold text-emerald-900 mt-1">1. True Positive (TP)</h3>
          </div>
          <p className="text-emerald-800 mb-3 text-lg">
            occurs when the model predicts <strong>Positive</strong> AND the actual class is <strong>Positive</strong> (A correct positive prediction).
          </p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-emerald-900 mb-4">
            <li><strong>Disease Detection:</strong> Patient has cancer, model predicts cancer.</li>
            <li><strong>Fraud Detection:</strong> Transaction is fraud, model predicts fraud.</li>
          </ul>
          <div className="bg-white border-l-4 border-emerald-500 rounded p-4 text-sm font-mono text-emerald-900">
            <strong>Mathematical Example:</strong> Out of 100 patients, 40 actually have the disease. The model correctly identifies 35. Therefore, <strong>TP = 35</strong>.
          </div>
        </div>

        {/* TN */}
        <div className="bg-sky-50 border border-sky-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <ShieldCheck className="h-6 w-6 text-sky-600 mr-2" />
            <h3 className="text-2xl font-bold text-sky-900 mt-1">2. True Negative (TN)</h3>
          </div>
          <p className="text-sky-800 mb-3 text-lg">
            occurs when the model predicts <strong>Negative</strong> AND the actual class is <strong>Negative</strong> (A correctly negative prediction).
          </p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-sky-900 mb-4">
            <li><strong>Medical Diagnosis:</strong> Patient does NOT have disease, model predicts NO disease.</li>
            <li><strong>Spam Detection:</strong> Email is legitimate, model keeps it in inbox.</li>
          </ul>
          <div className="bg-white border-l-4 border-sky-500 rounded p-4 text-sm font-mono text-sky-900">
            <strong>Mathematical Example:</strong> Out of 100 patients, 60 are healthy. The model correctly predicts 50 healthy patients. Therefore, <strong>TN = 50</strong>.
          </div>
        </div>

        {/* FP */}
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center mb-3">
            <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
            <h3 className="text-2xl font-bold text-orange-900 mt-1">3. False Positive (FP) - <em>"Type-I Error"</em></h3>
          </div>
          <p className="text-orange-800 mb-3 text-lg">
            occurs when the model predicts <strong>Positive</strong> BUT actual class is <strong>Negative</strong> (A False Alarm).
          </p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-orange-900 mb-4">
            <li><strong>Spam Detection:</strong> Email is legitimate, model predicts Spam (important email lost).</li>
            <li><strong>Banking:</strong> Legitimate transaction blocked due to false fraud alert.</li>
          </ul>
          <div className="bg-white border-l-4 border-orange-500 rounded p-4 text-sm font-mono text-orange-900">
            <strong>Mathematical Example:</strong> Out of 60 healthy patients, 10 are incorrectly predicted as diseased. Therefore, <strong>FP = 10</strong>.
          </div>
        </div>

        {/* FN */}
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-6 shadow-sm mb-8">
          <div className="flex items-center mb-3">
            <ShieldAlert className="h-6 w-6 text-rose-600 mr-2" />
            <h3 className="text-2xl font-bold text-rose-900 mt-1">4. False Negative (FN) - <em>"Type-II Error"</em></h3>
          </div>
          <p className="text-rose-800 mb-3 text-lg">
            occurs when the model predicts <strong>Negative</strong> BUT actual class is <strong>Positive</strong> (Missing a critical positive case). False Negatives are often the most dangerous errors.
          </p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-2 text-rose-900 mb-4">
            <li><strong>Cancer Detection:</strong> Patient actually has cancer, model predicts healthy (disease remains untreated).</li>
            <li><strong>Intrusion Detection:</strong> Hacker attack occurs, security model ignores it.</li>
          </ul>
          <div className="bg-white border-l-4 border-rose-500 rounded p-4 text-sm font-mono text-rose-900">
            <strong>Mathematical Example:</strong> Out of 40 diseased patients, 5 are incorrectly predicted healthy. Therefore, <strong>FN = 5</strong>.
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="metrics-derived">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <BarChart className="mr-3 text-indigo-600" /> Metrics Derived from Confusion Matrix
        </h2>

        {/* Accuracy */}
        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">1. Accuracy</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Measures the overall correctness of the model. It calculates the proportion of correct predictions (TP and TN) out of the total predictions.
        </p>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-8 w-fit">
          <p className="font-mono text-lg font-bold text-slate-900 mb-2">Accuracy = (TP + TN) / (TP + TN + FP + FN)</p>
          <p className="font-bold text-slate-900 mb-2 mt-4 border-t pt-2">Worked Example:</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-slate-800">
            <li>TP = 40, TN = 50, FP = 5, FN = 5</li>
            <li>Accuracy = (40 + 50) / 100 = 90 / 100 = <strong>0.9 (90%)</strong></li>
          </ul>
          <p className="font-bold text-slate-900 mb-2 mt-4 border-t pt-2">Real-Time Application:</p>
          <p className="text-sm text-slate-800 italic">Predicting if an email is Spam or not Spam where both classes are roughly equal in the dataset. If the dataset has 500 spam and 500 legitimate emails, accuracy is a reliable metric for overall performance.</p>
        </div>
        
        <p className="text-lg text-rose-600 italic font-bold mb-8">
          The Problem with Accuracy: It becomes highly misleading for imbalanced datasets. If 990 transactions are normal and 10 are fraud, a lazy model that predicts "Everything is normal" correctly guesses 990/1000 = 99% accuracy, but completely fails to detect fraud. This is why we need other metrics.
        </p>

        {/* Precision */}
        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">2. Precision</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Precision answers: <em>When the model predicts positive, how often is it actually correct?</em> It focuses heavily on predicting quality, and is critical when <strong>False Positives are expensive</strong> (e.g., avoiding marking normal emails as spam).
        </p>

        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8 w-fit">
          <p className="font-mono text-lg font-bold text-indigo-900 mb-2">Precision = TP / (TP + FP)</p>
          <p className="font-bold text-indigo-900 mb-2 mt-4 border-t pt-2 border-indigo-200">Worked Example:</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-indigo-800">
            <li>TP = 80, FP = 20</li>
            <li>Precision = 80 / (80 + 20) = 80 / 100 = <strong>0.8 (80%)</strong></li>
            <li className="italic text-indigo-700 mt-2">Meaning: 80% of positive predictions were actually positive.</li>
          </ul>
          <p className="font-bold text-indigo-900 mb-2 mt-4 border-t pt-2 border-indigo-200">Real-Time Application (YouTube Recommendations):</p>
          <p className="text-sm text-indigo-800 italic">YouTube's recommendation algorithm optimizes for Precision. If it recommends a video (Predicts Positive: User will like it), it should be highly certain. Recommending irrelevant videos (False Positives) frustrates users and makes them close the app.</p>
        </div>

        {/* Recall */}
        <h3 className="text-2xl font-bold text-slate-800 mb-4 mt-8">3. Recall (Sensitivity)</h3>
        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Recall answers: <em>Out of all real positive cases, how many did the model detect?</em> It is absolutely critical when <strong>missing positive cases is dangerous</strong> (e.g., missing cancer diagnosis).
        </p>

        <div className="pl-4 border-l-4 border-teal-400 bg-teal-50 py-4 pr-4 rounded-r-md mb-8 w-fit">
          <p className="font-mono text-lg font-bold text-teal-900 mb-2">Recall = TP / (TP + FN)</p>
          <p className="font-bold text-teal-900 mb-2 mt-4 border-t pt-2 border-teal-200">Worked Example:</p>
          <ul className="list-disc pl-5 font-mono text-sm space-y-1 text-teal-800">
            <li>TP = 90, FN = 10</li>
            <li>Recall = 90 / (90 + 10) = 90 / 100 = <strong>0.9 (90%)</strong></li>
          </ul>
          <p className="font-bold text-teal-900 mb-2 mt-4 border-t pt-2 border-teal-200">Real-Time Application (Airport Security Scanners):</p>
          <p className="text-sm text-teal-800 italic">Airport security alarms optimize for Recall. It is better to have the alarm go off for a passenger's keys (False Positive) than to miss a dangerous weapon (False Negative). They want to detect EVERY actual threat, even if it means checking innocent people.</p>
        </div>

        {/* Tradeoff */}
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg mb-8">
          <h4 className="text-xl font-bold text-amber-400 mb-3">Precision vs Recall Trade-Off</h4>
          <p className="text-slate-200 mb-4 text-lg">Often, improving one metric directly reduces the other.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-slate-700 rounded p-4 bg-slate-800 font-mono text-sm">
              <span className="text-sky-300 font-bold block mb-1">HIGH PRECISION</span>
              Model is highly conservative. It only predicts positive when very confident. Leads to fewer False Positives, but might miss real cases.
            </div>
            <div className="border border-slate-700 rounded p-4 bg-slate-800 font-mono text-sm">
              <span className="text-rose-400 font-bold block mb-1">HIGH RECALL</span>
              Model is highly sensitive. It flags anything suspicious. Finds almost all real cases, but generates many False Positives.
            </div>
          </div>
        </div>

        {/* F1 & Specificity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-slate-800 mb-4">4. F1-Score</h3>
            <p className="text-lg leading-relaxed mb-4 text-slate-800">
              Combines both precision and recall into a single harmonic mean. Highly useful when navigating an imbalanced dataset because it actively balances between FP and FN.
            </p>
            <div className="pl-4 border-l-4 border-violet-400 bg-violet-50 py-4 pr-4 rounded-r-md">
              <p className="font-mono text-sm font-bold text-violet-900 mb-2">F1 = 2 × (Pr × Re) / (Pr + Re)</p>
              <ul className="list-disc pl-4 font-mono text-xs space-y-1 text-violet-800 mt-2 border-t pt-2 border-violet-200">
                <li>Precision = 0.8, Recall = 0.9</li>
                <li>F1 = (2 × 0.8 × 0.9) / 1.7 = 1.44 / 1.7 = <strong>0.847 (84.7%)</strong></li>
              </ul>
              <p className="font-bold text-violet-900 mb-1 mt-3 border-t pt-2 border-violet-200 text-sm">Real-Time Application (Search Engine Retrieval):</p>
              <p className="text-xs text-violet-800 italic">Google Search optimizes for F1-score. It wants to give you ALL the relevant matching documents (Recall) while ensuring the page 1 results aren't cluttered with irrelevant junk (Precision). It must balance both.</p>
            </div>
          </div>

          <div>
             <h3 className="text-2xl font-bold text-slate-800 mb-4">5. Specificity</h3>
            <p className="text-lg leading-relaxed mb-4 text-slate-800">
              Measures how well the model identifies the negative cases. Critical for preventing false alarms. 
            </p>
            <div className="pl-4 border-l-4 border-sky-400 bg-sky-50 py-4 pr-4 rounded-r-md">
              <p className="font-mono text-sm font-bold text-sky-900 mb-2">Specificity = TN / (TN + FP)</p>
              <ul className="list-disc pl-4 font-mono text-xs space-y-1 text-sky-800 mt-2 border-t pt-2 border-sky-200">
                <li>TN = 80, FP = 20</li>
                <li>Specificity = 80 / 100 = <strong>0.8 (80%)</strong></li>
              </ul>
              <p className="font-bold text-sky-900 mb-1 mt-3 border-t pt-2 border-sky-200 text-sm">Real-Time Application (Drug Testing):</p>
              <p className="text-xs text-sky-800 italic">In athlete drug testing (Doping), a high Specificity is critical. If an athlete is clean (Negative), the test MUST say negative (True Negative) to avoid a life-ruining false accusation (False Positive).</p>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-8" />

      <div id="python-implementation">
        <h2 className="text-3xl font-bold text-indigo-800 mb-6 flex items-center">
          <Code className="mr-3 text-indigo-600" /> Python Implementation
        </h2>

        <p className="text-lg leading-relaxed mb-4 text-slate-800">
          Generating a highly visual confusion matrix in Python is incredibly easy utilizing <code>scikit-learn</code> alongside visualization libraries like <code>seaborn</code>.
        </p>

        <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-10">
          <div className="bg-slate-50 p-4 border-b border-slate-200 flex justify-between items-center">
            <h4 className="font-bold text-slate-800">Confusion Matrix Pipeline & Classification Report</h4>
            <span className="text-xs font-mono bg-slate-200 text-slate-700 px-2 py-1 rounded">Python</span>
          </div>
          <div className="bg-[#1e1e1e] text-[#d4d4d4] p-5 text-sm font-mono overflow-x-auto">
            <pre className="!m-0">
<code className="language-python">{`import numpy as np
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
import matplotlib.pyplot as plt

# 1. Create a simulated dataset
# Example Context: Animal Classification (Binary context: Dog or Not Dog)
actual = np.array([
    'Dog','Dog','Dog','Not Dog',
    'Dog','Not Dog','Dog',
    'Dog','Not Dog','Not Dog'
])

predicted = np.array([
    'Dog','Not Dog','Dog','Not Dog',
    'Dog','Dog','Dog',
    'Dog','Not Dog','Not Dog'
])

# 2. Build the numerical Confusion Matrix
cm = confusion_matrix(actual, predicted, labels=['Dog', 'Not Dog'])
print("Raw Confusion Matrix:\\n", cm)

# 3. Visualize using Seaborn Heatmap
sns.heatmap(
    cm, 
    annot=True, # Show numerals inside cells
    fmt='g',    # General format (removes scientific notation)
    cmap="Blues", 
    xticklabels=['Dog (Predicted)','Not Dog (Pred)'],
    yticklabels=['Dog (Actual)','Not Dog (Actual)']
)

plt.title('Confusion Matrix Visualization')
plt.show()

# 4. Generate automated comprehensive metrics
print("\\nClassification Report:\\n")
print(classification_report(actual, predicted))`}</code>
            </pre>
          </div>
          <div className="bg-[#1e1e1e] text-sky-300 p-4 font-mono text-sm border-t border-slate-700">
            <p>Output (Raw Matrix):</p>
            <p>[[5 1]</p>
            <p> [1 3]]</p>
            
            <div className="bg-white p-6 rounded shadow-inner max-w-[400px] my-6 mx-auto text-slate-800 font-sans">
              <p className="text-center font-bold mb-4 font-sans text-base">Confusion Matrix Visualization</p>
              <div className="flex border-l border-b border-slate-400 relative ml-6">
                <div className="absolute -left-10 top-1/2 -translate-y-1/2 -rotate-90 font-bold text-xs tracking-widest text-slate-600">Actual</div>
                <div className="absolute left-1/2 -bottom-10 -translate-x-1/2 font-bold text-xs tracking-widest text-slate-600">Predicted</div>
                
                <div className="w-full">
                  <div className="flex">
                     <div className="w-16 h-16 flex items-center justify-end pr-2 text-xs font-semibold">Dog</div>
                     <div className="flex-1 h-16 bg-blue-600 flex items-center justify-center text-white font-bold text-lg">5</div>
                     <div className="flex-1 h-16 bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-lg">1</div>
                  </div>
                  <div className="flex">
                     <div className="w-16 h-16 flex items-center justify-end pr-2 text-xs font-semibold">Not Dog</div>
                     <div className="flex-1 h-16 bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-lg">1</div>
                     <div className="flex-1 h-16 bg-blue-400 flex items-center justify-center text-white font-bold text-lg">3</div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between pl-[4.5rem] mt-2 text-xs font-semibold pb-4">
                <div className="flex-1 text-center">Dog</div>
                <div className="flex-1 text-center">Not Dog</div>
              </div>
            </div>

            <p className="text-emerald-400">Classification Report:</p>
            <p className="text-slate-300 whitespace-pre">{`              precision    recall  f1-score   support

         Dog       0.83      0.83      0.83         6
     Not Dog       0.75      0.75      0.75         4

    accuracy                           0.80        10
   macro avg       0.79      0.79      0.79        10
weighted avg       0.80      0.80      0.80        10`}</p>
          </div>
        </div>

        <p className="text-lg leading-relaxed text-slate-800 mb-8 italic">
          <strong>Note on Heatmaps:</strong> Visualizing matrices using heatmap coloration immediately alerts the engineer to model performance — darker diagonal cells represent correct classifications (TP & TN), whereas darker off-diagonal cells represent a severely confused model.
        </p>

      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        A Confusion Matrix serves as the foundational artifact of error analysis in classification tasks. While top-level aggregate metrics like accuracy only offer a misleadingly high surface-level score, the confusion matrix breaks down the literal instances where the model's intelligence fractured (False Positives and False Negatives). 
      </p>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        By parsing these internal fracture points, engineers map out the economic or health risk of deploying the model. In cancer diagnosis, driving heavily to minimize False Negatives creates high-sensitivity pipelines that save lives. In financial algorithms, protecting the user experience requires mapping high Precision to dodge severe False Positives.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Never trust Accuracy alone when evaluating models containing imbalanced dataset classes. You must default to utilizing the Confusion Matrix, expanding it explicitly to check F1-Score, Precision, and Recall. The exact ratio between Type I and Type II errors fundamentally determines your model's real-world business and human impact.
        </p>
      </div>

    </>
  );
}

