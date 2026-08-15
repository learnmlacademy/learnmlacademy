import React from "react";
import { ArrowRight, BookOpen, UserCheck, Search, Database, Stethoscope, Briefcase, ShoppingCart } from "lucide-react";

export function SupervisedIntroContent() {
  return (
    <>
            
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <p className="font-bold text-indigo-900 text-xl mb-2">In simple words: Supervised Learning = Learning with an Answer Key</p>
        <p className="text-slate-700 text-lg leading-relaxed mb-0">
          We show the computer many examples where the correct answer is already known. The computer studies those examples, learns a pattern, and then uses that pattern to predict the answer for a new example.
        </p>
      </div>

      <div className="border-l-4 border-slate-300 pl-5 mb-8">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Technical definition</p>
        <p className="text-lg leading-relaxed mb-0">
          Supervised learning is the most common and practically used sub-branch of Machine Learning. In this paradigm, algorithms are trained using meticulously labeled datasets. The defining characteristic is the presence of a "Supervisor" or "Teacher" — the explicit target variables that guide the algorithm during its training process. The fundamental goal is to establish a mathematical mapping function between the inputs and outputs. Once this mapping is established with high accuracy on the training data, the model can generalize and confidently predict the outputs for entirely new, unseen data in the future.
        </p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm my-8 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-5 py-4">
          <p className="font-bold text-slate-900 text-lg">A tiny example: Predict whether a student will Pass or Fail</p>
          <p className="text-slate-600 mt-1">The model is given past examples together with their correct answers.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="bg-white border-b border-slate-200">
              <tr>
                <th className="p-3 font-semibold text-slate-700">Study Hours</th>
                <th className="p-3 font-semibold text-slate-700">Attendance</th>
                <th className="p-3 font-semibold text-slate-700">Correct Answer (Label)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr><td className="p-3">1 hour</td><td className="p-3">55%</td><td className="p-3 font-semibold text-rose-700">Fail</td></tr>
              <tr><td className="p-3">2 hours</td><td className="p-3">65%</td><td className="p-3 font-semibold text-rose-700">Fail</td></tr>
              <tr><td className="p-3">4 hours</td><td className="p-3">80%</td><td className="p-3 font-semibold text-emerald-700">Pass</td></tr>
              <tr><td className="p-3">5 hours</td><td className="p-3">90%</td><td className="p-3 font-semibold text-emerald-700">Pass</td></tr>
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 bg-amber-50 border-t border-amber-100 text-slate-800">
          <strong>New student:</strong> 4.5 study hours and 85% attendance → the trained model may predict <strong className="text-emerald-700">Pass</strong>.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 my-8">
        {[
          ["1", "Examples + answers", "Past student records"],
          ["2", "Learn the pattern", "Compare inputs with Pass/Fail"],
          ["3", "Give new data", "A new student's details"],
          ["4", "Make a prediction", "Pass or Fail"],
        ].map(([step, title, note]) => (
          <div key={step} className="border border-slate-200 rounded-lg p-4 bg-white text-center shadow-sm">
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mx-auto mb-2">{step}</div>
            <p className="font-bold text-slate-900">{title}</p>
            <p className="text-sm text-slate-600 mt-1">{note}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 mb-10">
        <p className="font-bold text-slate-900 text-lg mb-3">Features and Label in the example</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-blue-800">Features (Inputs)</p>
            <p className="text-slate-700 mt-1">Study Hours, Attendance</p>
            <p className="text-sm text-slate-500 mt-2">These are the details the model uses to make its prediction.</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-4">
            <p className="font-bold text-emerald-800">Label (Correct Answer)</p>
            <p className="text-slate-700 mt-1">Pass or Fail</p>
            <p className="text-sm text-slate-500 mt-2">This is the answer supplied during training so the model can learn.</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        How Supervised Learning Works
      </h2>

      <p className="text-lg text-slate-700 italic leading-relaxed mb-8">
        Think of supervised learning as a student studying for an exam using flashcards. The front of the flashcard has the data (e.g., a picture of an animal), and the back has the label (e.g., "Giraffe"). By repeatedly reviewing these labeled examples and self-correcting when wrong, the student eventually learns the underlying characteristics that define a giraffe.
      </p>

      <div className="pl-4 border-l-4 border-blue-400 bg-blue-50 py-4 pr-4 rounded-r-md mb-12">
        <p className="text-slate-900 font-bold text-xl mb-4">The Standard Training Pipeline:</p>
        <ol className="list-decimal pl-6 space-y-4 text-slate-800 text-lg">
          <li><strong>Data Collection & Labeling:</strong> Gathering a massive dataset where every item has a definitive label. For example, assembling 100,000 photos of skin lesions, each labeled by human dermatologists as either "Benign" or "Malignant."</li>
          <li><strong>Feature Extraction:</strong> Identifying the most important variables in the data that the algorithm should pay attention to (e.g., the symmetry, border, and color of the lesion).</li>
          <li><strong>Training Phase:</strong> The algorithm mathematically analyzes the patterns connecting the features to the labels. Depending on the algorithm, it may adjust parameters, build rules, or organize the training examples so that future predictions match the known labels as closely as possible.</li>
          <li><strong>Validation & Testing:</strong> We evaluate the model using a separate portion of the labeled data that the model was never allowed to train on. This ensures it hasn't just memorized the training set but has actually learned generalizable patterns.</li>
          <li><strong>Deployment:</strong> Once performance meets the required standard, the model can be deployed to make predictions on new, real-world data in a live application.</li>
        </ol>
      </div>

      <div className="bg-slate-50 border border-slate-200 py-6 px-4 rounded-xl shadow-sm my-8 overflow-x-auto">
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

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Main Categories of Supervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        Supervised learning algorithms are strictly divided into two distinct categories based entirely on the type of output they are trying to predict.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        <div className="border-2 border-rose-200 bg-rose-50 rounded-xl p-5">
          <p className="font-bold text-rose-900 text-xl mb-3">Classification → Predict a Category</p>
          <div className="bg-white border border-rose-100 rounded-lg p-4 mb-3 text-center">
            <p className="text-slate-600 text-sm mb-2">Example question</p>
            <p className="font-semibold text-slate-900">Will this email be spam?</p>
            <div className="flex justify-center gap-3 mt-3">
              <span className="px-3 py-1.5 rounded-md bg-rose-100 text-rose-800 font-semibold">Spam</span>
              <span className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-700 font-semibold">Not Spam</span>
            </div>
          </div>
          <p className="text-slate-700"><strong>Output:</strong> one category or class.</p>
        </div>

        <div className="border-2 border-blue-200 bg-blue-50 rounded-xl p-5">
          <p className="font-bold text-blue-900 text-xl mb-3">Regression → Predict a Number</p>
          <div className="bg-white border border-blue-100 rounded-lg p-4 mb-3 text-center">
            <p className="text-slate-600 text-sm mb-2">Example question</p>
            <p className="font-semibold text-slate-900">What marks may this student score?</p>
            <div className="mt-3">
              <span className="inline-block px-4 py-2 rounded-md bg-blue-100 text-blue-800 font-bold text-lg">78 marks</span>
            </div>
          </div>
          <p className="text-slate-700"><strong>Output:</strong> a numerical value.</p>
        </div>
      </div>

      <p className="text-center text-slate-600 italic mb-6">
        Easy rule to remember: <strong>Classification chooses a name; Regression estimates a number.</strong>
      </p>

            {/* Hierarchical Tree */}
      <div className="bg-slate-50 border border-slate-200 py-8 px-4 rounded-xl shadow-sm my-8 overflow-x-auto">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">
          Figure — Supervised Learning Hierarchy
        </p>
        <div className="flex flex-col items-center min-w-[600px] max-w-3xl mx-auto">
          <div className="bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-bold shadow text-sm">
            Supervised Learning
          </div>
          <div className="w-0.5 bg-slate-300 h-6" />
          <div className="relative w-full h-6">
            <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: '25%', right: '25%' }} />
            {[0, 1].map(idx => (
              <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{ left: `${(idx + 0.5) * 100 / 2}%`, transform: 'translateX(-50%)' }} />
            ))}
          </div>
          <div className="flex w-full">
            {/* Classification branch */}
            <div className="flex flex-col items-center flex-1 px-4">
              <div className="bg-rose-50 border-2 border-rose-400 text-rose-900 px-4 py-2.5 rounded-lg font-bold text-sm mb-0 w-full text-center shadow-sm">
                Classification (Categories)
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="relative w-full h-5">
                 <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: `${50 / 3}%`, right: `${50 / 3}%` }} />
                 {[0, 1, 2].map(idx => (
                    <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-5" style={{ left: `${(idx + 0.5) * 100 / 3}%`, transform: 'translateX(-50%)' }} />
                 ))}
              </div>
              <div className="flex w-full">
                {['Logistic Reg.', 'Decision Tree', 'SVM / KNN'].map(t => (
                  <div key={t} className="flex-1 px-1">
                    <div className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-1 rounded w-full text-center shadow-sm">{t}</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Regression branch */}
            <div className="flex flex-col items-center flex-1 px-4">
              <div className="bg-blue-50 border-2 border-blue-400 text-blue-900 px-4 py-2.5 rounded-lg font-bold text-sm mb-0 w-full text-center shadow-sm">
                Regression (Numbers)
              </div>
              <div className="w-0.5 bg-slate-300 h-5" />
              <div className="relative w-full h-5">
                 <div className="absolute top-0 border-t-2 border-slate-300" style={{ left: `${50 / 3}%`, right: `${50 / 3}%` }} />
                 {[0, 1, 2].map(idx => (
                    <div key={idx} className="absolute top-0 w-0.5 bg-slate-300 h-5" style={{ left: `${(idx + 0.5) * 100 / 3}%`, transform: 'translateX(-50%)' }} />
                 ))}
              </div>
              <div className="flex w-full">
                {['Linear Reg.', 'Polynomial', 'Ridge / Lasso'].map(t => (
                  <div key={t} className="flex-1 px-1">
                    <div className="bg-white border border-slate-200 text-slate-700 text-[11px] font-semibold py-1.5 px-1 rounded w-full text-center shadow-sm">{t}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-400 italic mt-8 text-center">
            Classification predicts discrete labels. Regression predicts continuous values.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Modern Trends & Techniques in Supervised Learning
      </h2>
      <p className="text-lg leading-relaxed mb-6">
        As the demand for labeled data has skyrocketed, the industry has developed new ways to make supervised learning more efficient:
      </p>

      <ul className="space-y-6 text-lg text-slate-700 leading-relaxed mb-12">
        <li>
          <strong className="text-slate-900">Transfer Learning:</strong> Instead of training a model from absolute scratch (which requires massive datasets), developers take a pre-trained model (like Google's image recognition models) that already understands general features (shapes, edges, colors) and simply fine-tune it on a much smaller, highly specific supervised dataset. This drastically reduces the time and data needed.
        </li>
        <li>
          <strong className="text-slate-900">Active Learning:</strong> When labeling data is incredibly expensive (like paying specialized doctors to label MRI scans), active learning algorithms review a massive pool of unlabeled data and intelligently select only the most confusing or borderline examples to send to human experts for labeling. This ensures humans only spend time labeling data that actually helps the model improve.
        </li>
      </ul>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Advantages & Limitations
      </h2>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-6">
        <h3 className="text-xl font-bold text-emerald-900 mb-3 flex items-center"><UserCheck className="w-6 h-6 mr-3 text-emerald-600" /> Advantages</h3>
        <ul className="list-disc pl-6 space-y-3 text-emerald-800 text-lg">
          <li><strong>Can Achieve High Accuracy:</strong> Because the algorithm learns from known ground-truth examples, a well-trained and properly evaluated model can achieve strong predictive performance for a clearly defined task.</li>
          <li><strong>Clear Evaluation Metrics:</strong> It is mathematically simple to evaluate exactly how well the model is performing by comparing its predictions to the hidden test labels.</li>
          <li><strong>Highly Specific Targeting:</strong> Allows businesses to optimize models for exact, well-defined commercial tasks (e.g., predicting customer churn).</li>
        </ul>
      </div>

      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-12">
        <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center"><Search className="w-6 h-6 mr-3 text-slate-600" /> Limitations</h3>
        <ul className="list-disc pl-6 space-y-3 text-slate-800 text-lg">
          <li><strong>Data Labeling Bottleneck:</strong> Creating massive, perfectly labeled datasets requires extraordinary human effort, time, and money. It is often the single most expensive part of an ML project.</li>
          <li><strong>Inflexibility:</strong> A supervised model is highly specialized. A model trained exclusively to classify cats and dogs is utterly useless if you ask it to identify a bird. It requires complete retraining.</li>
          <li><strong>Overfitting Risks:</strong> If the model is too complex or the dataset is too small, the model might simply memorize the training data rather than learning general patterns, causing it to fail completely on new real-world data.</li>
        </ul>
      </div>

      <hr className="border-slate-200 mt-12 mb-10" />

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Where Supervised Learning Is Used</h2>
      
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm mb-10">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-800 text-lg">Industry</th>
              <th className="p-4 font-bold text-slate-800 text-lg">Real-World Application Examples</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900 border-r border-slate-100 flex items-center"><Briefcase className="w-5 h-5 mr-3 text-indigo-600" /> Finance</td>
              <td className="p-4 text-slate-700 text-lg">Credit scoring, Fraud detection in transactions, Loan approval probability prediction</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900 border-r border-slate-100 flex items-center"><Stethoscope className="w-5 h-5 mr-3 text-rose-600" /> Healthcare</td>
              <td className="p-4 text-slate-700 text-lg">Predicting patient risk levels, Automated X-ray analysis, Tumor malignancy classification</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900 border-r border-slate-100 flex items-center"><ShoppingCart className="w-5 h-5 mr-3 text-amber-600" /> E-Commerce</td>
              <td className="p-4 text-slate-700 text-lg">Predicting quarterly inventory demand, Customer sentiment analysis, Churn prediction</td>
            </tr>
          </tbody>
        </table>
      </div>

            
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">Glossary of Key Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Label (Target)</p>
          <p className="text-slate-700 text-base leading-relaxed">The correct answer or ground truth we want our machine learning model to predict.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Features (Inputs)</p>
          <p className="text-slate-700 text-base leading-relaxed">The individual measurable properties, variables, or characteristics used to make a prediction.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Classification</p>
          <p className="text-slate-700 text-base leading-relaxed">A supervised learning task where the goal is to predict a discrete category or class (e.g., Spam vs. Not Spam).</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Regression</p>
          <p className="text-slate-700 text-base leading-relaxed">A supervised learning task where the goal is to predict a continuous numerical value (e.g., House Price).</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
<p className="text-lg leading-relaxed mb-8">
        Supervised Learning remains the absolute backbone of commercial AI development. It relies on historical, explicitly labeled data to train models capable of making high-accuracy predictions about the future. Whether classifying objects (Classification) or forecasting continuous numerical values (Regression), supervised algorithms power the vast majority of AI systems you interact with daily.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          The defining feature and major bottleneck of Supervised Learning is the strict requirement for an "Answer Key" (labeled data) during training. The model uses those input-and-answer examples to learn a relationship that can later be used to predict the answer for new data. Different supervised algorithms learn that relationship in different ways. 
        </p>
      </div>
    </>
  );
}
