import React from 'react';
import {
  Target, TrendingUp, Code, Layers, GitBranch, Table as TableIcon,
  CheckCircle, ListPlus, Cpu, Database, Zap
} from 'lucide-react';

export function RegressionIntroContent() {
  return (
    <>
      {/* 1. Introduction */}
      
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Regression Algorithms Overview</h1>
        <p className="lead text-xl text-slate-700 border-l-4 border-indigo-500 pl-5 py-3 bg-slate-50 rounded-r-xl shadow-sm leading-relaxed mb-6">
          <strong>Regression</strong> is a supervised learning technique used to <em>predict continuous numerical values</em> based on historical data.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">Predicting house prices</span>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">Estimating stock prices</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Forecasting sales revenue</span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Predicting temperature</span>
          <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">Medical risk estimation</span>
        </div>

      {/* Beginner-first explanation */}
      <section className="my-8 rounded-2xl border border-indigo-200 bg-indigo-50/60 p-5 sm:p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-3">Regression in Simple Words</h2>
        <p className="text-slate-700 leading-relaxed mb-5">
          Use regression when the answer you want is a <strong>number that can take many possible values</strong>.
          The model studies past examples and learns how the input features are related to that number.
        </p>

        <div className="grid sm:grid-cols-3 gap-3 mb-5 text-center">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="font-bold text-slate-900">Past Examples</div>
            <div className="text-sm text-slate-600 mt-1">House size + known price</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="font-bold text-slate-900">Learn a Pattern</div>
            <div className="text-sm text-slate-600 mt-1">How price changes with size</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <div className="font-bold text-slate-900">Predict a Number</div>
            <div className="text-sm text-slate-600 mt-1">New house → estimated price</div>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white mb-5">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50 text-slate-800">
              <tr><th className="px-4 py-3 text-left">House Size</th><th className="px-4 py-3 text-left">Known Price</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr><td className="px-4 py-3">1000 sq ft</td><td className="px-4 py-3">₹30 lakh</td></tr>
              <tr><td className="px-4 py-3">1500 sq ft</td><td className="px-4 py-3">₹45 lakh</td></tr>
              <tr><td className="px-4 py-3">2000 sq ft</td><td className="px-4 py-3">₹60 lakh</td></tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-xl bg-white border border-indigo-100 p-4">
          <p className="font-bold text-slate-900 mb-2">Tiny prediction example</p>
          <p className="text-slate-700 mb-2">In this deliberately simple data, every extra 500 sq ft adds ₹15 lakh.</p>
          <ol className="list-decimal list-inside space-y-2 text-slate-700">
            <li>1800 sq ft is 300 sq ft larger than 1500 sq ft.</li>
            <li>₹15 lakh for 500 sq ft means ₹0.03 lakh per sq ft.</li>
            <li>Extra price = 300 × 0.03 = ₹9 lakh.</li>
            <li>Estimated price = ₹45 lakh + ₹9 lakh = <strong>₹54 lakh</strong>.</li>
          </ol>
          <p className="text-sm text-slate-600 mt-3">A real regression model learns the relationship from data rather than being given this rule directly.</p>
        </div>

        <div className="mt-5 rounded-xl bg-white border border-slate-200 p-4">
          <p className="font-bold text-slate-900 mb-1">See the idea: points + a fitted relationship</p>
          <p className="text-sm text-slate-600 mb-3">Each dot is a known house. The line represents a simple learned trend used to estimate prices for new house sizes.</p>
          <div className="overflow-x-auto">
            <svg viewBox="0 0 420 230" className="w-full max-w-xl mx-auto" role="img" aria-label="Simple scatter plot showing house size increasing with house price and a fitted regression line">
              <line x1="55" y1="185" x2="390" y2="185" stroke="#64748b" strokeWidth="2" />
              <line x1="55" y1="25" x2="55" y2="185" stroke="#64748b" strokeWidth="2" />
              <line x1="85" y1="160" x2="355" y2="48" stroke="#4f46e5" strokeWidth="3" />
              <circle cx="90" cy="158" r="6" fill="#0f766e" />
              <circle cx="155" cy="130" r="6" fill="#0f766e" />
              <circle cx="220" cy="104" r="6" fill="#0f766e" />
              <circle cx="285" cy="76" r="6" fill="#0f766e" />
              <circle cx="350" cy="50" r="6" fill="#0f766e" />
              <text x="205" y="218" textAnchor="middle" className="fill-slate-600 text-[13px]">House Size</text>
              <text x="18" y="110" textAnchor="middle" transform="rotate(-90 18 110)" className="fill-slate-600 text-[13px]">House Price</text>
              <text x="265" y="42" className="fill-indigo-700 text-[12px] font-semibold">learned trend</text>
            </svg>
          </div>
        </div>
      </section>

      <section className="my-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Regression vs Classification</h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-slate-50"><tr><th className="px-4 py-3 text-left">Question</th><th className="px-4 py-3 text-left">Regression</th><th className="px-4 py-3 text-left">Classification</th></tr></thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr><td className="px-4 py-3 font-medium">What does it predict?</td><td className="px-4 py-3">A numerical value</td><td className="px-4 py-3">A category or class</td></tr>
              <tr><td className="px-4 py-3 font-medium">Student example</td><td className="px-4 py-3">Predict marks = 78</td><td className="px-4 py-3">Predict Pass / Fail</td></tr>
              <tr><td className="px-4 py-3 font-medium">House example</td><td className="px-4 py-3">Predict price = ₹54 lakh</td><td className="px-4 py-3">Predict Expensive / Affordable</td></tr>
            </tbody>
          </table>
        </div>
      </section>
      

      {/* 2. Regression Learning Flow (Workflow) */}
      
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center mb-6">
          <Layers className="mr-3 text-blue-600" /> Regression Learning Flow
        </h2>
        <div className="bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 1, title: 'Collect Data', icon: <Database className="w-5 h-5"/> },
              { id: 2, title: 'Clean & Prepare', icon: <ListPlus className="w-5 h-5"/> },
              { id: 3, title: 'Feature Engineering', icon: <Zap className="w-5 h-5"/> },
              { id: 4, title: 'Select Algorithm', icon: <GitBranch className="w-5 h-5"/> },
              { id: 5, title: 'Train Model', icon: <Cpu className="w-5 h-5"/> },
              { id: 6, title: 'Evaluate Model', icon: <Target className="w-5 h-5"/> },
              { id: 7, title: 'Deploy & Predict', icon: <TrendingUp className="w-5 h-5"/> },
            ].map((step) => (
              <div key={step.id} className="flex items-center gap-3 bg-white border border-slate-300 p-4 rounded-xl shadow-sm">
                <div className="bg-indigo-100 p-2.5 rounded-full text-indigo-600 shrink-0">{step.icon}</div>
                <div>
                  <div className="text-xs font-bold text-indigo-600">Step {step.id}</div>
                  <div className="font-bold text-slate-800 text-sm">{step.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      

      {/* 3. Hierarchical Classification */}
      
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center mb-6">
          <GitBranch className="mr-3 text-emerald-600" /> A Simple Map of Regression Algorithms
        </h2>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-blue-200 rounded-xl p-5 shadow-sm">
            <div className="font-bold text-blue-800 mb-3">1. Linear & Regularized Models</div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Simple Linear Regression</li>
              <li>• Multiple Linear Regression</li>
              <li>• Polynomial Regression</li>
              <li>• Ridge Regression</li>
              <li>• Lasso Regression</li>
              <li>• Elastic Net</li>
            </ul>
          </div>
          <div className="bg-white border border-emerald-200 rounded-xl p-5 shadow-sm">
            <div className="font-bold text-emerald-800 mb-3">2. Tree & Ensemble Models</div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Decision Tree Regression</li>
              <li>• Random Forest Regression</li>
              <li>• Gradient Boosting</li>
              <li>• XGBoost Regression</li>
            </ul>
          </div>
          <div className="bg-white border border-violet-200 rounded-xl p-5 shadow-sm">
            <div className="font-bold text-violet-800 mb-3">3. Other Regression Models</div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>• Support Vector Regression</li>
              <li>• KNN Regression</li>
              <li>• Bayesian Regression</li>
              <li>• Neural Network Regression</li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-8">This is a learning map, not a strict mathematical taxonomy. Some methods can be described in more than one way depending on how they are implemented.</p>
      
      {/* 4. Types of Regression Problems */}
      
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center mb-6">
          <TableIcon className="mr-3 text-indigo-600" /> Types of Regression Problems
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Problem Type</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Example Real-World Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">Price Prediction</td><td className="px-6 py-4">House price prediction based on area</td></tr>
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">Forecasting</td><td className="px-6 py-4">Weather and temperature forecasting</td></tr>
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">Risk Estimation</td><td className="px-6 py-4">Insurance risk and premium prediction</td></tr>
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">Trend Analysis</td><td className="px-6 py-4">Stock market trend prediction</td></tr>
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">Demand Prediction</td><td className="px-6 py-4">E-commerce demand and inventory forecasting</td></tr>
              <tr className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">Scientific Prediction</td><td className="px-6 py-4">Biological growth, temperature/pressure estimation</td></tr>
            </tbody>
          </table>
        </div>
      

      {/* 5. Algorithm Deep Dives */}
      
        <h2 className="text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-2 mb-5 mt-12">
          14 Core Regression Algorithms
        </h2>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 text-slate-700">
          <strong>Do not try to memorize all 14 at once.</strong> Start by remembering four families: 
          <strong>linear models</strong>, <strong>tree/ensemble models</strong>, <strong>neighbour/kernel models</strong>, and <strong>neural/probabilistic models</strong>.
          The dedicated lessons later in the course go deeper into the most important algorithms.
        </div>
        <div className="space-y-12 text-slate-800">
          {algorithms.map((algo, idx) => (
            <div key={idx} className="mb-10">
              <h3 className="text-2xl font-bold text-indigo-800 mb-4">{algo.name}</h3>
              <p className="text-lg leading-relaxed mb-4"><strong>What it is:</strong> {algo.definition}</p>
              {algo.subjective && (
                <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
                  "{algo.subjective}"
                </p>
              )}
              {algo.formula && (
                <div className="mb-6 pl-4 border-l-4 border-amber-400 bg-amber-50 py-2 pr-4 rounded-r-md">
                  <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Mathematical Formula</p>
                  <code className="text-slate-900 font-mono text-lg block">{algo.formula}</code>
                </div>
              )}
              {algo.mathExample && (
                <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-3 pr-4 rounded-r-md">
                  <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Practical Calculation Example</p>
                  <p className="text-slate-800 text-base mb-3">{algo.mathExample.setup}</p>
                  {'steps' in algo.mathExample && algo.mathExample.steps ? (
                    <ol className="space-y-2 mb-3">
                      {algo.mathExample.steps.map((step, stepIndex) => (
                        <li key={stepIndex} className="bg-white/70 rounded-lg p-3 border border-emerald-100">
                          <span className="font-bold text-emerald-800">Step {stepIndex + 1}: </span>
                          <span className="font-mono text-slate-900">{step.calculation}</span>
                          <span className="block text-sm text-slate-600 mt-1">{step.explanation}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <code className="text-slate-900 font-mono block mb-2">{algo.mathExample.calc}</code>
                  )}
                  <p className="text-slate-900 font-bold">{algo.mathExample.result}</p>
                </div>
              )}
              {algo.application && (
                <div className="mb-6 pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-2 pr-4 rounded-r-md">
                  <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Common Applications</p>
                  <p className="text-slate-900">{algo.application}</p>
                </div>
              )}
              <div className="mt-6 flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <p className="font-bold text-green-700 mb-2">Advantages:</p>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 mb-4">
                    {algo.pros.map((p, i) => <li key={i}>{p}</li>)}
                  </ul>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-rose-700 mb-2">Disadvantages:</p>
                  <ul className="list-disc list-inside text-slate-700 space-y-1 mb-6">
                    {algo.cons.map((c, i) => <li key={i}>{c}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      

      {/* 6. Evaluation Metrics */}
      
        <h2 className="text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-2 mb-8 mt-12">
          Evaluation Metrics for Regression
        </h2>
        <div className="space-y-12 text-slate-800">
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">1. Mean Absolute Error (MAE)</h3>
            <p className="text-lg leading-relaxed mb-4">Measures the average of the absolute mathematical differences between actual and predicted values.</p>
            <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
              <strong>Simple intuition:</strong> MAE answers, “On average, how far are the predictions from the actual values?” It stays in the same unit as the target, which often makes it easy to explain to non-technical readers.
            </p>
            <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-2 pr-4 rounded-r-md">
              <code className="text-slate-900 font-mono block mb-2">MAE = (1/n) * Σ |y - y_pred|</code>
            </div>
            <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-2 pr-4 rounded-r-md">
              <strong>Step-by-step example:</strong> Actual=[10, 20], Pred=[12, 18]
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>|10 − 12| = 2 — first absolute error.</li>
                <li>|20 − 18| = 2 — second absolute error.</li>
                <li>2 + 2 = 4 — add the absolute errors.</li>
                <li>4 ÷ 2 = <strong>2</strong> — divide by two predictions.</li>
              </ol>
            </div>
            <hr className="border-slate-200 mt-8" />
          </div>
          
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">2. Mean/Root Mean Squared Error (MSE / RMSE)</h3>
            <p className="text-lg leading-relaxed mb-4">Penalizes large errors heavily by squaring the differences. RMSE is the square root of MSE.</p>
            <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
              <strong>Simple intuition:</strong> Squaring gives larger errors more influence. RMSE then takes the square root so the final value is back in the same unit as the target. It is useful when large mistakes deserve extra attention.
            </p>
            <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-2 pr-4 rounded-r-md">
              <code className="text-slate-900 font-mono block mb-2">MSE = (1/n) * Σ (y - y_pred)²<br/>RMSE = √MSE</code>
            </div>
            <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-2 pr-4 rounded-r-md">
               <strong>Step-by-step example:</strong> Actual=[10, 20], Pred=[12, 18]
               <ol className="list-decimal list-inside mt-2 space-y-1">
                 <li>Errors: 10 − 12 = −2 and 20 − 18 = 2.</li>
                 <li>Square them: (−2)² = 4 and 2² = 4.</li>
                 <li>MSE = (4 + 4) ÷ 2 = <strong>4</strong>.</li>
                 <li>RMSE = √4 = <strong>2</strong>.</li>
               </ol>
            </div>
            <hr className="border-slate-200 mt-8" />
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">3. R-Squared Score (R²)</h3>
            <p className="text-lg leading-relaxed mb-4">Compares your model with a simple baseline that always predicts the mean target value. A score of 1.0 is perfect; around 0 means the model is doing about as well as that mean baseline; and R² can even be negative when the model performs worse than the baseline.</p>
            <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
              <strong>Simple intuition:</strong> Higher is generally better on the same problem, but R² should be read together with error metrics such as MAE or RMSE and with validation/test performance.
            </p>
            <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-2 pr-4 rounded-r-md">
              <code className="text-slate-900 font-mono block mb-2">R² = 1 - ( SS_res / SS_tot )</code>
            </div>
            <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-2 pr-4 rounded-r-md">
               <strong>Common interpretation:</strong> On the evaluated dataset, R² = 0.8 means the model accounts for about 80% of the target variation relative to the mean-prediction baseline. It does not prove causation or guarantee good future predictions.
            </div>
            <div className="mb-6 pl-4 border-l-4 border-cyan-400 bg-cyan-50 py-3 pr-4 rounded-r-md text-slate-700">
              <strong>Tiny numerical example:</strong> Suppose <code>SS_res = 2</code> and <code>SS_tot = 10</code>.
              <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>SS_res ÷ SS_tot = 2 ÷ 10 = 0.2</li>
                <li>R² = 1 − 0.2</li>
                <li>R² = <strong>0.8</strong></li>
              </ol>
            </div>
            <hr className="border-slate-200 mt-8" />
          </div>
        </div>
      

      {/* 7. Comparison Tables */}
       
        <h2 className="text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-2 mb-8">
          Regression Algorithm Comparison Table
        </h2>
        
        <div className="mb-10 text-slate-800 text-lg leading-relaxed">
          <p className="mb-4">Here is a quick classroom-level comparison of popular regression algorithms. Treat labels such as “low”, “medium”, and “high” as <strong>rough tendencies</strong>, not fixed properties—real behaviour depends on the dataset, preprocessing, hyperparameters, and validation setup.</p>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-12">
          <table className="min-w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Algorithm</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Linear/Nonlinear</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Feature Selection</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Overfitting Risk</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Speed</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Interpretability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">Linear Regression</td><td className="px-6 py-4">Linear</td><td className="px-6 py-4">No</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td><td className="px-6 py-4 text-green-600 font-medium">Fast</td><td className="px-6 py-4 text-green-600 font-medium">High</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">Polynomial Regression</td><td className="px-6 py-4">Nonlinear</td><td className="px-6 py-4">No</td><td className="px-6 py-4 text-rose-600 font-medium">High</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">Ridge Regression</td><td className="px-6 py-4">Linear</td><td className="px-6 py-4">No</td><td className="px-6 py-4 text-green-600 font-medium">Low</td><td className="px-6 py-4 text-green-600 font-medium">Fast</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">Lasso Regression</td><td className="px-6 py-4">Linear</td><td className="px-6 py-4 text-green-600 font-medium">Yes</td><td className="px-6 py-4 text-green-600 font-medium">Low</td><td className="px-6 py-4 text-green-600 font-medium">Fast</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">Decision Tree</td><td className="px-6 py-4">Nonlinear</td><td className="px-6 py-4 text-amber-600 font-medium">Partial</td><td className="px-6 py-4 text-rose-600 font-medium">High</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td><td className="px-6 py-4 text-green-600 font-medium">High</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">Random Forest</td><td className="px-6 py-4">Nonlinear</td><td className="px-6 py-4 text-amber-600 font-medium">Partial</td><td className="px-6 py-4 text-green-600 font-medium">Low</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td><td className="px-6 py-4 text-rose-600 font-medium">Low</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">SVR</td><td className="px-6 py-4">Nonlinear</td><td className="px-6 py-4">No</td><td className="px-6 py-4 text-green-600 font-medium">Low</td><td className="px-6 py-4 text-rose-600 font-medium">Slow</td><td className="px-6 py-4 text-rose-600 font-medium">Low</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">KNN Regression</td><td className="px-6 py-4">Nonlinear</td><td className="px-6 py-4">No</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td><td className="px-6 py-4 text-rose-600 font-medium">Slow</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">XGBoost</td><td className="px-6 py-4">Nonlinear</td><td className="px-6 py-4 text-amber-600 font-medium">Partial</td><td className="px-6 py-4 text-green-600 font-medium">Low</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td><td className="px-6 py-4 text-rose-600 font-medium">Low</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-900">Neural Network</td><td className="px-6 py-4">Nonlinear</td><td className="px-6 py-4">No</td><td className="px-6 py-4 text-amber-600 font-medium">Medium</td><td className="px-6 py-4 text-rose-600 font-medium">Slow</td><td className="px-6 py-4 text-rose-600 font-medium">Very Low</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-indigo-800 mb-4">
          When to Use Which Regression Algorithm?
        </h2>
        <p className="text-sm text-slate-600 mb-4">Use the table below as a starting point for experiments, then compare candidate models with validation or cross-validation rather than choosing from a rule alone.</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
          <table className="min-w-full divide-y divide-slate-200 bg-white">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Situation / Scenario</th>
                <th className="px-6 py-4 text-left font-bold text-slate-900 tracking-wider">Recommended Algorithm</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Simple linear relationship</td><td className="px-6 py-4 font-bold text-indigo-700">Linear Regression</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Many correlated features</td><td className="px-6 py-4 font-bold text-indigo-700">Ridge Regression</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Need automatic feature selection</td><td className="px-6 py-4 font-bold text-indigo-700">Lasso Regression</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Complex nonlinear data</td><td className="px-6 py-4 font-bold text-indigo-700">Random Forest / XGBoost</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Strong tabular baseline worth testing</td><td className="px-6 py-4 font-bold text-indigo-700">Gradient Boosting / XGBoost / Random Forest</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Small-to-medium structured datasets</td><td className="px-6 py-4 font-bold text-indigo-700">Start simple; compare Linear / Ridge / SVR / Trees</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Large or unstructured inputs where representation learning helps</td><td className="px-6 py-4 font-bold text-indigo-700">Neural Networks may be appropriate</td></tr>
            </tbody>
          </table>
        </div>
        <hr className="border-slate-200 mt-8" />
      

      {/* 8. Python Implementation */}
      
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center mb-6">
          <Code className="mr-3 text-slate-800" /> Python Implementation Example (Scikit-Learn)
        </h2>
        <div className="space-y-6">
          <div className="bg-white border text-left border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-4 font-bold text-indigo-900 flex items-center">
              1. Import necessary libraries
            </div>
            <div className="grid md:grid-cols-2">
              <div className="bg-[#1e1e1e] p-5 font-mono text-sm text-[#d4d4d4] overflow-x-auto">
<pre className="!m-0 leading-relaxed"><code>{`import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error`}</code></pre>
              </div>
              <div className="p-5 text-slate-700 text-sm leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 flex items-center">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>numpy:</strong> Used to create and manipulate numerical arrays.</li>
                  <li><strong>train_test_split:</strong> Function to split our data reproducibly into training and evaluation sets.</li>
                  <li><strong>Algorithms:</strong> We import the specific mathematical models we wish to use.</li>
                  <li><strong>mean_squared_error:</strong> Our evaluation metric to check model accuracy.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border text-left border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-4 font-bold text-indigo-900 flex items-center">
              2. Prepare Sample Data & Train-Test Split
            </div>
            <div className="grid md:grid-cols-2">
              <div className="bg-[#1e1e1e] p-5 font-mono text-sm text-[#d4d4d4] overflow-x-auto">
<pre className="!m-0 leading-relaxed"><code>{`# House Sizes (Independent variable 'X')
X = np.array([[1000], [1500], [2000], [2500], [3000]])
# Output Prices (Dependent variable 'y')
y = np.array([30, 45, 60, 75, 90])

# Split: 80% Train, 20% Test
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)`}</code></pre>
              </div>
              <div className="p-5 text-slate-700 text-sm leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 flex items-center">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>X & y:</strong> We feed in paired coordinates. For example, a 1000 sq ft house is 30 lakhs. Note the exact linear relationship here (Price = Size * 0.03).</li>
                  <li><strong>test_size=0.2:</strong> Keeps 20% of the data hidden from the model during training so we can test its true predictive power later.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white border text-left border-slate-200 shadow-sm rounded-2xl overflow-hidden">
            <div className="bg-slate-50 border-b border-slate-200 p-4 font-bold text-indigo-900 flex items-center">
              3. Initialize, Train, and Evaluate Models
            </div>
            <div className="grid md:grid-cols-2">
              <div className="bg-[#1e1e1e] p-5 font-mono text-sm text-[#d4d4d4] overflow-x-auto">
<pre className="!m-0 leading-relaxed"><code>{`# Initialize Models
lr_model = LinearRegression()
rf_model = RandomForestRegressor(n_estimators=100, random_state=42)

# Train (.fit)
lr_model.fit(X_train, y_train)
rf_model.fit(X_train, y_train)

# Predict (.predict)
lr_pred = lr_model.predict(X_test)
rf_pred = rf_model.predict(X_test)

# Calculate RMSE
lr_rmse = np.sqrt(mean_squared_error(y_test, lr_pred))
rf_rmse = np.sqrt(mean_squared_error(y_test, rf_pred))

print(f"Linear Regression RMSE: {lr_rmse:.2f}")
print(f"Random Forest RMSE: {rf_rmse:.2f}")`}</code></pre>
              </div>
              <div className="p-5 text-slate-700 text-sm leading-relaxed border-t md:border-t-0 md:border-l border-slate-200 flex items-center">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>.fit():</strong> This is where the actual mathematical learning happens. The model finds the best coefficients.</li>
                  <li><strong>.predict():</strong> Once trained, we generate predictions on the hidden <code className="bg-slate-100 rounded px-1">X_test</code> set.</li>
                  <li><strong>RMSE:</strong> We compare the real answers <code className="bg-slate-100 rounded px-1">y_test</code> against our model's predictions. Lower score is better!</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-[#0cf277]/10 border border-[#0cf277]/50 rounded-2xl p-6 shadow-sm">
             <h4 className="font-bold text-[#09994c] mb-4 uppercase tracking-wider flex items-center">
                Terminal Output & Analysis
             </h4>
             <pre className="font-mono text-base text-[#09994c] whitespace-pre-wrap m-0 leading-relaxed p-4 bg-black/5 rounded-xl border border-[#09994c]/20">
$ python regression_example.py
Linear Regression RMSE: 0.00
Random Forest RMSE: 4.65
             </pre>
             <div className="mt-4 p-4 bg-white/60 rounded-xl border border-[#0cf277]/30 text-emerald-900 font-medium">
               <strong>Why did this happen?</strong><br/>
               Linear Regression gets 0.00 here because the tiny sample follows an exact straight-line rule (Price = Size × 0.03).
               With <code className="bg-white/70 rounded px-1">random_state=42</code>, the Random Forest predicts the single held-out point less precisely, giving RMSE 4.65.
               <strong>Important:</strong> this test set contains only one row, so the comparison is for learning the workflow—not for deciding which algorithm is generally “better”.
             </div>
          </div>

        </div>
      


      <section className="my-10 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Common Regression Questions</h2>
        <div className="space-y-4 text-slate-700">
          <div><p className="font-bold text-slate-900">Is regression only Linear Regression?</p><p>No. Linear Regression is one method. Trees, Random Forests, boosting, KNN, SVR, Bayesian models, and neural networks can also perform regression.</p></div>
          <div><p className="font-bold text-slate-900">Can regression predict Pass or Fail?</p><p>Usually that is a classification problem because the answer is a category. Regression would instead predict a numerical value such as marks or salary.</p></div>
          <div><p className="font-bold text-slate-900">Should I start with the most powerful algorithm?</p><p>No. Start with a simple baseline, then test more complex models only when they provide a meaningful validated improvement.</p></div>
          <div><p className="font-bold text-slate-900">Which topic should I learn next?</p><p>Continue with <a href="/learn/linear-regression" className="text-indigo-700 font-semibold hover:underline">Linear Regression</a>, then learn <a href="/learn/gradient-descent" className="text-indigo-700 font-semibold hover:underline">Gradient Descent</a>, <a href="/learn/ridge-regression" className="text-indigo-700 font-semibold hover:underline">Ridge Regression</a>, and <a href="/learn/lasso-regression" className="text-indigo-700 font-semibold hover:underline">Lasso Regression</a>.</p></div>
        </div>
      </section>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <CheckCircle className="mr-3 text-indigo-600" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Regression algorithms are a major part of supervised predictive modelling. They are used when the target is numerical, such as a price, demand level, temperature, duration, or other continuous measurement.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        From highly interpretable linear models to immensely powerful non-linear tree ensembles and deep neural networks, the practical goal is to start with a sensible baseline, compare models fairly on validation data, and choose a level of complexity that generalizes well.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           Regression learns relationships between input features and a numerical target so that we can estimate values for new data. A good regression model is not the most complicated one—it is one that makes useful predictions on data it has not seen before.
         </p>
      </div>

    </>
  );
}

const algorithms = [
  {
     name: "1. Simple Linear Regression",
     definition: "Finds a straight-line relationship between one independent variable and one dependent variable.",
     formula: "y = mx + b",
     mathExample: {
       setup: "Predicting House Price based on Size. Assuming m = 30 and b = 1000. If size x = 2:",
       calc: "y = 30 × 2 + 1000",
       steps: [
         { calculation: "y = 30 × 2 + 1000", explanation: "Substitute x = 2 into y = mx + b." },
         { calculation: "y = 60 + 1000", explanation: "Multiply the slope by x." },
         { calculation: "y = 1060", explanation: "Add the intercept to get the prediction." }
       ],
       result: "Predicted Output = 1060"
     },
     pros: ["Very simple to understand", "Fast training", "Easy interpretation"],
     cons: ["Cannot capture complex or curved patterns", "Highly sensitive to outliers"],
     application: "Estimating straightforward, continuous trends like expected sales volume based on advertising spend or basic real estate property value estimation.",
     subjective: "Think of this as the \"hello world\" of machine learning. It's elegantly simple: you're just trying to draw the best straight line through a cloud of data points. It works beautifully when you have one clear, predictable relationship—like a bigger house usually means a higher price. But let's be honest, the real world is rarely this simple, and it also remains a useful baseline when a roughly linear relationship is plausible."
  },
  {
     name: "2. Multiple Linear Regression",
     definition: "Uses multiple input variables simultaneously to predict one continuous output.",
     formula: "y = b₀ + b₁x₁ + b₂x₂ + ... + bₙxₙ",
     mathExample: {
       setup: "Predicting Price using Area and Bedrooms. b₀ = 5K, b₁(Area)=300, b₂(Bedrooms)=10K. Area=1000, Bed=3:",
       calc: "y = 5000 + 300(1000) + 10000(3)",
       steps: [
         { calculation: "y = 5000 + 300(1000) + 10000(3)", explanation: "Substitute Area = 1000 and Bedrooms = 3." },
         { calculation: "y = 5000 + 300000 + 30000", explanation: "Calculate the contribution of each feature." },
         { calculation: "y = 335000", explanation: "Add the intercept and feature contributions." }
       ],
       result: "Predicted Output = 335,000"
     },
     pros: ["Better prediction than simple regression", "Interpretable coefficients"],
     cons: ["Multicollinearity issues", "Assumes linear relationships exist across all features"],
     application: "Predicting crop yields from temperature, rainfall, and fertilizer usage; estimating university admission likelihood based on multiple student scores.",
     subjective: "Now we're talking. This is the grown-up version of the simple linear model. Instead of a single line, imagine a flat sheet of rigid glass tilting and balancing across multiple dimensions of data. It respects the fact that things like house prices depend on size, location, and age all simultaneously. It is often a useful baseline because the coefficients remain relatively easy to interpret."
  },
  {
     name: "3. Polynomial Regression",
     definition: "Models nonlinear relationships by fitting a curved polynomial line to the data.",
     formula: "y = b₀ + b₁x + b₂x² + b₃x³ + ...",
     mathExample: {
       setup: "For a curved relationship equation y = 2 + 3x + x². If x = 4:",
       calc: "y = 2 + 3(4) + 4²",
       steps: [
         { calculation: "y = 2 + 3(4) + 4²", explanation: "Substitute x = 4 into the polynomial." },
         { calculation: "y = 2 + 12 + 16", explanation: "Calculate 3 × 4 and 4²." },
         { calculation: "y = 30", explanation: "Add the three terms." }
       ],
       result: "Predicted Output = 30"
     },
     pros: ["Can capture curved polynomial patterns", "Highly flexible"],
     cons: ["Higher polynomial degrees can overfit", "Harder to interpret mathematically"],
     application: "Modeling epidemic spread or viral growth, tracking biological tissue growth rates, analyzing material stress and yield point testing parameters.",
     subjective: "What if your data doesn't follow a straight line? What if it swoops, dips, or arcs? Polynomial regression lets our rigid line bend. It can follow curved patterns, but high polynomial degrees can become too flexible and overfit the training data."
  },
  {
     name: "4. Ridge Regression (L2)",
     definition: "A regularized version of linear regression that adds a L2 penalty term to shrink coefficients and reduce overfitting.",
     formula: "Loss = RSS + λ ∑ (w_j)²",
     mathExample: {
       setup: "If mathematical Error (RSS)=100, Lambda(λ)=0.1, sum of squared weights=50:",
       calc: "Total Loss = 100 + 0.1 × 50",
       steps: [
         { calculation: "Penalty = 0.1 × 50 = 5", explanation: "Multiply λ by the sum of squared weights." },
         { calculation: "Total Loss = 100 + 5", explanation: "Add the Ridge penalty to the original RSS error." },
         { calculation: "Total Loss = 105", explanation: "This is the regularized objective for this tiny example." }
       ],
       result: "Total Computed Loss = 105"
     },
     pros: ["Reduces overfitting", "Can improve stability when features are strongly correlated", "Improves generalization"],
     cons: ["Does not eliminate useless features completely (does not set weights to 0)"],
     application: "Genomic data analysis and research where features highly correlate, or complex housing prediction models with hundreds of overlapping features.",
     subjective: "As we dump more and more columns of data into our models, they tend to get confused by features that are too similar to each other. Ridge is our steady hand in the chaos. It mathematically \"punishes\" features for being too loud or too aggressive. By shrinking the mathematical weights naturally, Ridge can make coefficient estimates more stable when predictors are strongly correlated or the unregularized model is too flexible."
  },
  {
     name: "5. Lasso Regression (L1)",
     definition: "Performs both regularization and automatic feature selection by using an L1 penalty that can shrink some coefficients exactly to zero.",
     formula: "Loss = RSS + λ ∑ |w_j|",
     mathExample: {
       setup: "If Error (RSS)=100, λ=0.1, sum of absolute weights=20. ",
       calc: "Loss = 100 + 0.1 × 20",
       steps: [
         { calculation: "Penalty = 0.1 × 20 = 2", explanation: "Multiply λ by the sum of absolute coefficient values." },
         { calculation: "Loss = 100 + 2", explanation: "Add the L1 penalty to RSS." },
         { calculation: "Loss = 102", explanation: "During fitting, the L1 penalty can drive some coefficients exactly to zero." }
       ],
       result: "Total Computed Loss = 102"
     },
     pros: ["Automatic feature selection", "Simpler, sparse models", "Can produce sparse models"],
     cons: ["Can accidentally drop useful correlated variables", "Unstable with highly correlated data"],
     application: "Financial distress prediction where identifying exactly which handful of indicators out of thousands matter is the primary goal; medical screening feature selection.",
     subjective: "Where Ridge is gentle, Lasso is absolutely ruthless. Lasso doesn't just shrink the influence of unhelpful data; it grabs an eraser and deletes it completely by setting the weight to zero. It's immensely satisfying to use Lasso on a messy dataset with 100 confusing features and watch it boldly tell you, \"You only actually need these 5 columns.\""
  },
  {
     name: "6. Elastic Net Regression",
     definition: "Combines L1 and L2 penalties so the model can trade off sparsity and coefficient shrinkage.",
     formula: "Loss = RSS + λ₁ ∑ |w_j| + λ₂ ∑ (w_j)²",
     mathExample: {
       setup: "Combines L1 and L2. If RSS=100, L1=20, L2=50.",
       calc: "Loss = 100 + λ₁(20) + λ₂(50)",
       steps: [
         { calculation: "Choose λ₁ = 0.1 and λ₂ = 0.02", explanation: "Use small example strengths for the L1 and L2 penalties." },
         { calculation: "L1 penalty = 0.1 × 20 = 2", explanation: "Calculate the L1 contribution." },
         { calculation: "L2 penalty = 0.02 × 50 = 1", explanation: "Calculate the L2 contribution." },
         { calculation: "Loss = 100 + 2 + 1 = 103", explanation: "Add RSS and both penalties." }
       ],
       result: "Illustrative Elastic Net objective = 103"
     },
     pros: ["Combines L1 and L2 regularization", "Can be useful when predictors are correlated"],
     cons: ["More hyperparameters to tune", "Computationally slightly heavier"],
     application: "Algorithmic trading or big-data portfolio optimization involving numerous highly correlated, volatile stock market indices.",
     subjective: "Elastic Net blends L1 and L2 regularization. It is especially worth testing when there are many predictors and groups of correlated features."
  },
  {
     name: "7. Decision Tree Regression",
     definition: "Splits data into branches based on feature conditions to generate predictions at the leaf nodes.",
     formula: null,
     mathExample: {
       setup: "Evaluating conditions step-by-step top down:",
       calc: "IF (Area > 1500) AND IF (Bedrooms > 3) THEN Prediction = ₹75L",
       result: "Final Leaf Output = ₹75L"
     },
     pros: ["Easy visualization and human interpretation", "No feature scaling normally required"],
     cons: ["Deep trees can overfit without constraints", "Unstable to small data changes"],
     application: "Business strategic planning analysis, estimating patient recovery times via conditional medical factors, interpreting conditional risk paths.",
     subjective: "Let's throw out the complex math equations for a second. A Decision Tree is fundamentally just a giant game of \"20 Questions.\" It slices your data based on yes/no questions (e.g., \"Is it located in the city center?\"). I deeply love decision trees because you can literally print them out and explain exactly how the AI made its choice to a non-technical CEO. Sadly, heavily overgrown decision trees are terribly delicate and prone to overfitting."
  },
  {
     name: "8. Random Forest Regression",
     definition: "Combines many varied decision trees together. The final prediction is the mathematical average of all trees' predictions.",
     formula: null,
     mathExample: {
       setup: "Three separate parallel decision trees output different predictions for the same data:",
       calc: "Prediction = Average(Tree1: 70, Tree2: 80, Tree3: 75)",
       result: "Ensemble Prediction = 75"
     },
     pros: ["Often a strong tabular baseline", "Averaging many trees often reduces variance compared with one deep tree", "Handles large datasets well"],
     cons: ["Slower training", "Lost interpretability (Black Box)", "High memory usage"],
     application: "Predicting equipment failure maintenance timing in factories, evaluating loan risk scores based on varied historical financial behaviors.",
     subjective: "If one tree makes mistakes, combining many trees can make the overall prediction more stable. Random Forest averages the predictions of many varied trees, which often reduces the variance of a single deep tree. It is a useful tabular baseline, but validation is still needed."
  },
  {
     name: "9. Support Vector Regression (SVR)",
     definition: "Tries to fit the best line within an acceptable mathematical margin boundary (epsilon).",
     formula: null,
     mathExample: {
       setup: "If margin ε=3, Actual=50, Predicted=48:",
       calc: "Error Margin = |50-48| = 2. Since 2 <= 3 (ε)",
       result: "Prediction is inside margin safely = 0 Loss penalty!"
     },
     pros: ["Works well with high-dimensional data", "Uses an epsilon-insensitive loss that ignores sufficiently small errors"],
     cons: ["Kernel SVR can become slow as sample size grows", "Performance can be sensitive to kernel, C, epsilon, and scaling"],
     application: "Processing highly dense time-series data for electrical grid load forecasting or forecasting in extreme high-dimensional text data processing.",
     subjective: "SVR is bizarre but brilliant. Instead of caring about every single data point perfectly, SVR creates a \"tube\" of acceptable error along its line. It essentially ignores any data point that lands safely inside this tube. It's highly intellectual and shines mathematically when working in insanely high-dimensional spaces (like text analysis), though tuning it can sometimes feel like a dark art."
  },
  {
     name: "10. KNN Regression",
     definition: "Predicts values by looking at the target values of the 'K' nearest, most similar neighboring data points, and averaging them.",
     formula: null,
     mathExample: {
       setup: "If K=3. You find the 3 closest houses to the target house. Their prices: 40L, 42L, 44L.",
       calc: "Prediction Average = (40 + 42 + 44) / 3",
       result: "Predicted Output = 42L"
     },
     pros: ["Simple algorithm conceptually", "Very little model-building work during fit; training mostly stores the data"],
     cons: ["Prediction can become slow on large training sets", "Sensitive to irrelevant features"],
     application: "Local property price estimations (similar nearby properties), baseline collaborative filtering or local-trend estimation in recommendation systems.",
     subjective: "KNN is beautifully lazy. During the \"training\" phase, it mathematically does nothing except memorize the dataset. When you ask it for a prediction, it just looks around for its 'K' most similar neighbors and averages them out. It heavily mimics how human real-estate agents price houses (by looking at \"comps\"). It's wonderfully intuitive but disastrously slow if you have millions of rows."
  },
  {
     name: "11. Bayesian Regression",
     definition: "Uses probability distributions to estimate coefficients instead of fixed absolute parameter values, providing uncertainty estimates.",
     formula: null,
     mathExample: {
       setup: "Instead of outputting absolute '50L', outputs a distribution:",
       calc: "Mean Prediction = 50L. Standard Deviation = 5L.",
       result: "Illustrative interval: about 40L to 60L if a roughly normal predictive distribution makes ±2 standard deviations appropriate."
     },
     pros: ["Can represent parameter and prediction uncertainty probabilistically", "Robust for small datasets", "Priors can regularize estimates"],
     cons: ["Computationally heavy mathematics", "Hard mathematical theory to grasp"],
     application: "Predicting uncertain medical outcomes where confidence intervals are critical, analyzing real estate price trends dynamically over time.",
     subjective: "Most algorithms act like arrogant know-it-alls, giving you a singular, absolute answer like \"The price is $50,000.\" Bayesian Regression is beautifully humble. It admits its uncertainty. It will tell you: \"I am 95% confident the price is between $45k and $55k.\" This ability to mathematically express doubt makes it the absolute holy grail for medical or financial predictions where being confidently wrong is dangerous."
  },
  {
     name: "12. Gradient Boosting Regression",
     definition: "Builds a sequence of models sequentially. Each new model specifically attempts to correct the 'Errors' made by previous models.",
     formula: null,
     mathExample: {
       setup: "Model 1 Predicts 40 (Actual=50). Error is +10. Model 2 trains purely on 'Error'.",
       calc: "Model 2 predicts Error = 8. Final = M1(40) + M2(8)",
       result: "Combined Output = 48 (Closer to 50!)"
     },
     pros: ["Can achieve strong accuracy on many structured problems", "Handles highly complex hidden relationships"],
     cons: ["Slow training process (Sequential)", "Hyperparameter tuning is tricky", "Can overfit easily if unchecked"],
     application: "Online advertising Click-Through Rate (CTR) estimation, pinpointing anomaly detection probabilities in massive banking streams.",
     subjective: "Imagine taking an exam, missing a few questions, and then only studying the exact concepts you failed for the next try. That's Gradient Boosting. It trains a sequence of weak models, where every new model is aggressively hyper-focused on fixing the residual errors of the previous one. It is sequential by design and can perform strongly when its complexity is tuned carefully."
  },
  {
     name: "13. XGBoost Regression",
     definition: "A highly engineered gradient-boosting implementation with regularization and system optimizations.",
     formula: null,
     mathExample: {
       setup: "Optimized boosting loop using second-order derivatives (Hessians).",
       calc: "Final Pred = Sum(learning_rate * tree_predictions)",
       result: "Illustrates how predictions are combined across boosted trees; actual speed depends on data, parameters, and hardware."
     },
     pros: ["Often performs strongly on structured/tabular data", "Fast computation via parallel processing", "Auto-handles missing values natively"],
     cons: ["Complex parameter tuning", "Harder interpretation (Black Box)"],
     application: "Dominating high-stakes structured tabular data tasks (Kaggle competitions), high-volume rapid customer churn probability modeling.",
     subjective: "XGBoost became famous for strong performance on many structured-data competitions and remains an important boosting method. It extends gradient boosting with regularization and engineering optimizations. It can be a strong option for structured data, but it should still be compared with simpler baselines and other ensemble methods."
  },
  {
     name: "14. Neural Network Regression",
     definition: "Uses deep learning hidden layers with activation functions to model incredibly complex, non-linear mathematical relationships.",
     formula: null,
     mathExample: {
       setup: "Inside a single neuron node: w₁=0.5, x₁=10, w₂=0.2, x₂=20, bias=1",
       calc: "Node Output = 0.5(10) + 0.2(20) + 1 = 5 + 4 + 1",
       result: "Neuron Activated Value = 10"
     },
     pros: ["Can model highly complex nonlinear patterns", "Can benefit from large datasets when the architecture matches the problem"],
     cons: ["Can require substantial data depending on the problem and architecture", "Can be computationally expensive to train", "Usually less directly interpretable than simple linear models or small trees"],
     application: "Predicting global energy consumption limits from large numbers of IoT sensors, autonomous driving path prediction coordinates.",
     subjective: "Neural networks use layers of connected units to learn nonlinear functions.  for many small structured datasets, simpler models or tree ensembles can be easier to train and explain. But when you are predicting values based on unstructured chaos—like images, audio waves, or massive paragraphs of text—neural networks can learn useful nonlinear representations that simpler models may miss."
  }
];