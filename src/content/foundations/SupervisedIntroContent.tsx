import React from "react";
import { GraduationCap, ArrowRight, BookOpen, UserCheck, Search, Database } from "lucide-react";

export function SupervisedIntroContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6">
        Supervised Learning
      </h1>

      <div className="text-xl text-slate-700 mb-8 leading-relaxed">
        Supervised Learning is a training method where machines are trained using <strong className="text-slate-900">labeled data</strong>. The training data includes both the input features and the correct answers (the output).
      </div>

      <p className="text-lg leading-relaxed mb-4">
        The primary goal of this branch of machine learning is for the machine to learn the relationship between the inputs and outputs so it can accurately predict outputs for new, unseen data in the future.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        How Supervised Learning Works
      </h2>

      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        Supervised learning acts like a student learning under a teacher's supervision. The "teacher" provides questions alongside the correct answers. The "student" studies these examples to learn patterns and later takes a blind exam with new questions.
      </p>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-8">
        <p className="text-slate-800 font-medium text-lg mb-2">The Training Process:</p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-700 text-lg">
          <li><strong>Data Collection:</strong> We gather a large dataset where every item has a label. (e.g., 10,000 emails classified as "Spam" or "Not Spam").</li>
          <li><strong>Training Phase:</strong> The algorithm studies the patterns. It learns that emails containing "Free Money" are usually Spam.</li>
          <li><strong>Testing Phase:</strong> We give the model new, unlabeled data to check its accuracy against a hidden answer key.</li>
          <li><strong>Deployment:</strong> Once verified, the model automatically labels real-world data in production.</li>
        </ol>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm my-10 p-8">
        <h3 className="text-xl font-bold mb-6 text-center text-slate-800">
          Supervised Learning Flowchart
        </h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          <div className="bg-indigo-50 text-indigo-800 p-4 rounded-lg w-full md:w-48 font-semibold border border-indigo-200">
            <Database className="w-6 h-6 mx-auto mb-2 text-indigo-600" />
            1. Labeled Data
          </div>
          <ArrowRight className="text-slate-300 hidden md:block w-8 h-8" />
          <div className="bg-amber-50 text-amber-800 p-4 rounded-lg w-full md:w-48 font-semibold border border-amber-200">
            <BookOpen className="w-6 h-6 mx-auto mb-2 text-amber-600" />
            2. ML Algorithm
          </div>
          <ArrowRight className="text-slate-300 hidden md:block w-8 h-8" />
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-lg w-full md:w-48 font-semibold border border-emerald-200">
            <UserCheck className="w-6 h-6 mx-auto mb-2 text-emerald-600" />
            3. Trained Model
          </div>
          <ArrowRight className="text-slate-300 hidden md:block w-8 h-8" />
          <div className="bg-blue-50 text-blue-800 p-4 rounded-lg w-full md:w-48 font-semibold border border-blue-200">
            <Search className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            4. Predictions
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-indigo-800 border-b pb-2">
        Main Categories of Supervised Learning
      </h2>

      {/* Hierarchical Tree */}
      <div className="my-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">
          Figure — Supervised Learning Hierarchy
        </p>
        <div className="flex flex-col items-center min-w-[560px]">
          <div className="bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow text-sm">
            Supervised Learning
          </div>
          <div className="w-0.5 bg-slate-300 h-6" />
          <div className="relative w-[75%] border-t-2 border-slate-300">
            <div className="absolute left-0 top-0 w-0.5 bg-slate-300 h-6" />
            <div className="absolute right-0 top-0 w-0.5 bg-slate-300 h-6" />
          </div>
          <div className="flex justify-between w-[80%] mt-6 gap-8">
            {/* Classification branch */}
            <div className="flex flex-col items-center flex-1">
              <div className="bg-indigo-100 border-2 border-indigo-400 text-indigo-900 px-4 py-2 rounded-lg font-bold text-sm mb-4 w-full text-center">
                Classification
              </div>
              <div className="w-0.5 bg-slate-300 h-4" />
              <div className="relative w-full border-t-2 border-slate-300">
                {[0, 50, 100].map(p => <div key={p} className="absolute top-0 w-0.5 bg-slate-300 h-4" style={{ left: `${p}%`, transform: 'translateX(-50%)' }} />)}
              </div>
              <div className="flex justify-between w-full mt-4 gap-1.5">
                {['Logistic Reg.', 'Decision Tree', 'SVM / KNN'].map(t => (
                  <div key={t} className="text-xs bg-white border border-indigo-200 text-indigo-700 px-1.5 py-1 rounded text-center flex-1 shadow-sm font-medium leading-tight">{t}</div>
                ))}
              </div>
            </div>
            {/* Regression branch */}
            <div className="flex flex-col items-center flex-1">
              <div className="bg-violet-100 border-2 border-violet-400 text-violet-900 px-4 py-2 rounded-lg font-bold text-sm mb-4 w-full text-center">
                Regression
              </div>
              <div className="w-0.5 bg-slate-300 h-4" />
              <div className="relative w-full border-t-2 border-slate-300">
                {[0, 50, 100].map(p => <div key={p} className="absolute top-0 w-0.5 bg-slate-300 h-4" style={{ left: `${p}%`, transform: 'translateX(-50%)' }} />)}
              </div>
              <div className="flex justify-between w-full mt-4 gap-1.5">
                {['Linear Reg.', 'Polynomial', 'Ridge / Lasso'].map(t => (
                  <div key={t} className="text-xs bg-white border border-violet-200 text-violet-700 px-1.5 py-1 rounded text-center flex-1 shadow-sm font-medium leading-tight">{t}</div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic mt-5 text-center">
            Classification → predicts discrete labels · Regression → predicts continuous values
          </p>
        </div>
      </div>
      <p className="text-lg leading-relaxed mb-6">
        Supervised learning algorithms are divided into two main categories depending on the type of output they produce:
      </p>

      <div className="my-10 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm overflow-x-auto flex flex-col items-center justify-center w-full">
        <div className="flex flex-col items-center min-w-[400px]">
          <div className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-md z-10 text-lg">
            Supervised Learning
          </div>
          <div className="w-1 bg-slate-300 h-8"></div>
          <div className="w-[60%] border-t-[3px] border-slate-300 relative">
            <div className="absolute left-0 top-0 w-1 bg-slate-300 h-8"></div>
            <div className="absolute right-0 top-0 w-1 bg-slate-300 h-8"></div>
          </div>
          <div className="flex justify-between w-[70%] mt-8 gap-8">
            <div className="flex flex-col items-center flex-1">
              <div className="bg-rose-100 border-2 border-rose-400 text-rose-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-2 w-full text-center">
                Classification
              </div>
              <div className="text-xs text-slate-600 font-medium bg-white border border-slate-200 p-2 rounded text-center w-full shadow-sm">Discrete Labels</div>
            </div>
             <div className="flex flex-col items-center flex-1">
              <div className="bg-blue-100 border-2 border-blue-400 text-blue-900 px-4 py-2 rounded-lg font-bold shadow-sm mb-2 w-full text-center">
                Regression
              </div>
              <div className="text-xs text-slate-600 font-medium bg-white border border-slate-200 p-2 rounded text-center w-full shadow-sm">Continuous Numbers</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="bg-rose-50 border border-rose-100 rounded-xl p-6">
          <h4 className="font-bold text-rose-900 text-xl mb-2">1. Classification (Categorical)</h4>
          <p className="text-rose-800 text-sm mb-4 leading-relaxed">
            Used when the output needs to be a specific category or label. The model predicts a discrete value from a finite list of options.
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm text-rose-900 space-y-1">
            <li><strong>Spam Detection:</strong> "Spam" or "Inbox"</li>
            <li><strong>Image Recognition:</strong> "Cat" or "Dog"</li>
            <li><strong>Medical:</strong> "Malignant" or "Benign"</li>
          </ul>
          <p className="text-xs font-mono text-rose-700 bg-rose-100 p-2 rounded">Algorithms: Logistic Regression, Decision Trees, Random Forest, SVM, Naive Bayes</p>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
          <h4 className="font-bold text-blue-900 text-xl mb-2">2. Regression (Continuous)</h4>
          <p className="text-blue-800 text-sm mb-4 leading-relaxed">
            Used when the output needs to be a real number or a continuous value. The model predicts a numerical quantity.
          </p>
          <ul className="list-disc pl-5 mb-4 text-sm text-blue-900 space-y-1">
            <li><strong>Real Estate:</strong> Predicting house prices ($)</li>
            <li><strong>Stock Market:</strong> Forecasting stock values</li>
            <li><strong>Weather:</strong> Predicting temperature (Degrees)</li>
          </ul>
          <p className="text-xs font-mono text-blue-700 bg-blue-100 p-2 rounded">Algorithms: Linear Regression, Polynomial Regression, Ridge, Lasso</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-indigo-800 border-b pb-2">
        Advantages & Limitations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div>
          <h4 className="text-lg font-bold text-emerald-700 mb-3 flex items-center"><UserCheck className="w-5 h-5 mr-2" /> Advantages</h4>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong>High Accuracy:</strong> By learning from correct historical examples, prediction accuracy is very high.</li>
            <li><strong>Clear Evaluation:</strong> You can easily measure performance by comparing predictions to the actual test labels.</li>
            <li><strong>Specific Targeting:</strong> Allows developers to optimize models for exact, well-defined tasks.</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold text-rose-700 mb-3 flex items-center"><Search className="w-5 h-5 mr-2" /> Limitations</h4>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong>Expensive Data Preparation:</strong> Creating labeled datasets requires massive human effort and time.</li>
            <li><strong>Inflexible:</strong> A model trained to classify cats and dogs cannot classify birds without complete retraining.</li>
            <li><strong>Overfitting:</strong> The model might memorize training data instead of learning general patterns.</li>
          </ul>
        </div>
      </div>

      <hr className="border-slate-200 mt-12 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <div className="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm mb-6">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-700">Industry</th>
              <th className="p-4 font-bold text-slate-700">Real-World Application Example</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-800 border-r border-slate-100">Banking & Finance</td>
              <td className="p-4 text-slate-600">Credit scoring, Fraud detection, Loan approval probability</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-800 border-r border-slate-100">Healthcare</td>
              <td className="p-4 text-slate-600">Predicting diseases, Analyzing X-rays, Drug discovery</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-800 border-r border-slate-100">E-Commerce</td>
              <td className="p-4 text-slate-600">Predicting inventory demand, Customer sentiment analysis</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-800 border-r border-slate-100">Technology</td>
              <td className="p-4 text-slate-600">Speech recognition (Siri/Alexa), Translation logic</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p className="text-lg leading-relaxed mb-6">
        Supervised Learning uses historical, labeled data to train a model to make accurate predictions about the future. Whether you are categorizing emails (Classification) or forecasting future sales (Regression), Supervised Learning provides the foundation for most predictive commercial ML software today.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          The defining feature of Supervised Learning is the presence of an "Answer Key" during training. The algorithm learns by making a guess, checking the answer key, calculating its error, and adjusting its math to be less wrong the next time. 
        </p>
      </div>
    </>
  );
}
