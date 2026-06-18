import React from 'react';
import { 
  ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  ReferenceArea
} from 'recharts';
import { 
  Target, TrendingUp, AlertTriangle, Lightbulb, BookOpen, 
  Calculator, Code, Layers, GitBranch, Table as TableIcon, GitMerge, CheckCircle, ListPlus, Share2, Cpu, Database, ChevronRight, Zap
} from 'lucide-react';

export function RegressionIntroContent() {
  return (
    <>
      {/* 1. Introduction */}
      
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Regression</h1>
        <p className="lead text-xl text-slate-700 border-l-4 border-indigo-500 pl-5 py-3 bg-slate-50 rounded-r-xl shadow-sm leading-relaxed mb-6">
          <strong>Regression</strong> is a supervised learning technique used to <em>predict continuous numerical values</em> based on historical data.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">Predicting house prices</span>
          <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium">Estimating stock prices</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">Forecasting sales revenue</span>
          <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">Predicting temperature</span>
          <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">Medical risk estimation</span>
        </div>
      

      {/* 2. Regression Learning Flow (Workflow) */}
      
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center mb-6">
          <Layers className="mr-3 text-blue-600" /> Regression Learning Flow
        </h2>
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <div className="flex justify-between items-center min-w-[800px] gap-2">
            {[
              { id: 1, title: 'Collect Data', icon: <Database className="w-5 h-5"/> },
              { id: 2, title: 'Clean & Prepare', icon: <ListPlus className="w-5 h-5"/> },
              { id: 3, title: 'Feature Engineering', icon: <Zap className="w-5 h-5"/> },
              { id: 4, title: 'Select Algorithm', icon: <GitBranch className="w-5 h-5"/> },
              { id: 5, title: 'Train Model', icon: <Cpu className="w-5 h-5"/> },
              { id: 6, title: 'Evaluate Model', icon: <Target className="w-5 h-5"/> },
              { id: 7, title: 'Deploy & Predict', icon: <TrendingUp className="w-5 h-5"/> },
            ].map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center bg-white border border-slate-300 p-4 rounded-xl shadow-sm min-w-[120px] transform hover:scale-105 transition-transform">
                  <div className="bg-indigo-100 p-3 rounded-full text-indigo-600 mb-3">{step.icon}</div>
                  <span className="font-bold text-slate-800 text-sm text-center">{step.title}</span>
                </div>
                {index < 6 && <ChevronRight className="w-6 h-6 text-slate-400 shrink-0" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      

      {/* 3. Hierarchical Classification */}
      
        <h2 className="text-2xl font-bold text-slate-800 border-b pb-2 flex items-center mb-6">
          <GitBranch className="mr-3 text-emerald-600" /> Hierarchical Classification of Algorithms
        </h2>
        
        <div className="bg-slate-50/50 p-4 sm:p-8 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          <div className="flex flex-col items-center w-full min-w-[700px] pb-4">
            <div className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold text-lg shadow-md z-10">
              Regression Algorithms
            </div>
            
            <div className="w-0.5 h-8 bg-slate-300 z-10"></div>
            
            <div className="w-full relative pt-8">
              {/* Horizontal connection line */}
              <div className="absolute top-0 left-[16.666%] right-[16.666%] border-t-2 border-slate-300"></div>
              {/* Vertical lines coming down from the horizontal line */}
              <div className="absolute top-0 left-[16.666%] w-0.5 h-8 bg-slate-300"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-8 bg-slate-300 -translate-x-1/2"></div>
              <div className="absolute top-0 right-[16.666%] w-0.5 h-8 bg-slate-300"></div>

              <div className="flex w-full justify-between items-start px-2 gap-4">
                {/* Column 1 */}
                <div className="flex flex-col items-center w-1/3">
                   <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow-sm mb-4 w-[90%] text-center text-sm">Linear Models</div>
                   <ul className="text-slate-700 space-y-3 text-xs sm:text-sm bg-white border border-blue-100 p-4 rounded-xl shadow-sm w-full">
                     <li className="flex items-start"><span className="text-blue-500 mr-2 font-bold">-</span> Simple Linear Regression</li>
                     <li className="flex items-start"><span className="text-blue-500 mr-2 font-bold">-</span> Multiple Linear Regression</li>
                     <li className="flex items-start"><span className="text-blue-500 mr-2 font-bold">-</span> Polynomial Regression</li>
                     <li className="flex items-start"><span className="text-blue-500 mr-2 font-bold">-</span> Ridge Regression</li>
                     <li className="flex items-start"><span className="text-blue-500 mr-2 font-bold">-</span> Lasso Regression</li>
                     <li className="flex items-start"><span className="text-blue-500 mr-2 font-bold">-</span> Elastic Net</li>
                   </ul>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col items-center w-1/3">
                   <div className="bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold shadow-sm mb-4 w-[90%] text-center text-sm">Tree-Based Models</div>
                   <ul className="text-slate-700 space-y-3 text-xs sm:text-sm bg-white border border-emerald-100 p-4 rounded-xl shadow-sm w-full">
                     <li className="flex items-start"><span className="text-emerald-500 mr-2 font-bold">-</span> Decision Tree Regression</li>
                     <li className="flex items-start"><span className="text-emerald-500 mr-2 font-bold">-</span> Random Forest Regression</li>
                     <li className="flex items-start"><span className="text-emerald-500 mr-2 font-bold">-</span> Gradient Boosting</li>
                   </ul>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col items-center w-1/3">
                   <div className="bg-violet-500 text-white px-4 py-2 rounded-lg font-bold shadow-sm mb-4 w-[90%] text-center text-sm">Advanced Models</div>
                   <ul className="text-slate-700 space-y-3 text-xs sm:text-sm bg-white border border-violet-100 p-4 rounded-xl shadow-sm w-full">
                     <li className="flex items-start"><span className="text-violet-500 mr-2 font-bold">-</span> Support Vector Regressor (SVR)</li>
                     <li className="flex items-start"><span className="text-violet-500 mr-2 font-bold">-</span> Bayesian Regression</li>
                     <li className="flex items-start"><span className="text-violet-500 mr-2 font-bold">-</span> Deep Neural Networks</li>
                     <li className="flex items-start"><span className="text-violet-500 mr-2 font-bold">-</span> XGBoost Regression</li>
                     <li className="flex items-start"><span className="text-violet-500 mr-2 font-bold">-</span> KNN Regression</li>
                   </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      

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
      
        <h2 className="text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-2 mb-8 mt-12">
          14 Core Regression Algorithms
        </h2>
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
                <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-2 pr-4 rounded-r-md">
                  <p className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-2">Practical Calculation Example</p>
                  <p className="text-slate-800 text-base mb-2">{algo.mathExample.setup}</p>
                  <code className="text-slate-900 font-mono block mb-2">{algo.mathExample.calc}</code>
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
              <strong>The Honest Truth:</strong> When a stakeholder asks me, "How far off are we?", MAE is the one I give them. It operates in the real world. If your model guesses a house is $300k, and it's actually $350k, the error is simply $50k. You average out those literal differences across all houses. It's fundamentally honest, linear, and doesn't exaggerate the severity of a single bad guess.
            </p>
            <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-2 pr-4 rounded-r-md">
              <code className="text-slate-900 font-mono block mb-2">MAE = (1/n) * Σ |y - y_pred|</code>
            </div>
            <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-2 pr-4 rounded-r-md">
              <strong>Example:</strong> Actual=[10, 20], Pred=[12, 18]<br/>
              |10-12| = 2, |20-18| = 2. MAE = (2+2)/2 = 2
            </div>
            <hr className="border-slate-200 mt-8" />
          </div>
          
          <div className="mb-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">2. Mean/Root Mean Squared Error (MSE / RMSE)</h3>
            <p className="text-lg leading-relaxed mb-4">Penalizes large errors heavily by squaring the differences. RMSE is the square root of MSE.</p>
            <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
              <strong>The Strict Teacher:</strong> I use RMSE when a single massive failure is catastrophic. By squaring the errors before averaging them (and later taking the root down), RMSE aggressively inflates the penalty for being horribly wrong on outliers. If your model is mostly perfect but catastrophically predicts a few values off by a mile, RMSE will absolutely scream at you compared to MAE.
            </p>
            <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-2 pr-4 rounded-r-md">
              <code className="text-slate-900 font-mono block mb-2">MSE = (1/n) * Σ (y - y_pred)²<br/>RMSE = √MSE</code>
            </div>
            <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-2 pr-4 rounded-r-md">
               <strong>Example:</strong> Actual=[10, 20], Pred=[12, 18]<br/>
               (-2)² = 4, (2)² = 4. MSE = (4+4)/2 = 4. RMSE = √4 = 2.
            </div>
            <hr className="border-slate-200 mt-8" />
          </div>

          <div className="mb-10">
            <h3 className="text-2xl font-bold text-indigo-800 mb-4">3. R-Squared Score (R²)</h3>
            <p className="text-lg leading-relaxed mb-4">Measures goodness of fit (how well the model explains the variance). 1.0 is perfect, 0.0 is predicting just the mean.</p>
            <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
              <strong>The Pride Metric:</strong> While MAE and RMSE humbly tell you how wrong you are, R² loudly proclaims how right you are. It acts like a percentage score from 0 to 1. If you score an 0.85, you literally explained 85% of the chaotic variance in the real world using your input data. In my view, it's profoundly satisfying. An R² close to 1.0 feels like you've magically captured the essence of reality inside an equation.
            </p>
            <div className="mb-6 pl-4 border-l-4 border-blue-400 bg-blue-50 py-2 pr-4 rounded-r-md">
              <code className="text-slate-900 font-mono block mb-2">R² = 1 - ( SS_res / SS_tot )</code>
            </div>
            <div className="mb-6 pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-2 pr-4 rounded-r-md">
               <strong>Interpretation:</strong> R² = 0.8 means 80% of the variance in the target variable can be explained by your input features.
            </div>
            <hr className="border-slate-200 mt-8" />
          </div>
        </div>
      

      {/* 7. Comparison Tables */}
       
        <h2 className="text-3xl font-extrabold text-slate-900 border-b-2 border-slate-200 pb-2 mb-8">
          Regression Algorithm Comparison Table
        </h2>
        
        <div className="mb-10 text-slate-800 text-lg leading-relaxed">
          <p className="mb-4">Here is a quick summary comparing the key characteristics of popular regression algorithms based on their linearity, feature selection capabilities, risk of overfitting, speed, and interpretability.</p>
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
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Very high accuracy needed (Competitions)</td><td className="px-6 py-4 font-bold text-indigo-700">XGBoost / LightGBM</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Small datasets</td><td className="px-6 py-4 font-bold text-indigo-700">Linear Regression / SVR</td></tr>
              <tr className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4">Huge complex unstructured datasets</td><td className="px-6 py-4 font-bold text-indigo-700">Neural Networks</td></tr>
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
                  <li><strong>train_test_split:</strong> Function to securely split our data into training and evaluation sets.</li>
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
<pre className="!m-0 leading-relaxed"><code>{`# Initialize Modles
lr_model = LinearRegression()
rf_model = RandomForestRegressor(n_estimators=100)

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
Random Forest RMSE: 1.52
             </pre>
             <div className="mt-4 p-4 bg-white/60 rounded-xl border border-[#0cf277]/30 text-emerald-900 font-medium">
               <strong>Why did this happen?</strong><br/>
               Linear Regression scored a perfect 0.00 error! This is because our sample data follows an exact, straight-line mathematical rule (Price = Size * 0.03). 
               Random Forest is meant for highly complex, non-linear patterns, so it struggles slightly to fit a perfect mathematical straight line, resulting in a small error of 1.52.
             </div>
          </div>

        </div>
      

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2 flex items-center">
        <CheckCircle className="mr-3 text-indigo-600" /> Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Regression algorithms serve as the absolute backbone of supervised predictive analytics. Whenever the business goal is to predict continuous numeric outcomes—be it real estate pricing, sales forecasting, or stock market tracking—regression is the tool of choice.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        From highly interpretable linear models to immensely powerful non-linear tree ensembles and deep neural networks, the key to success is matching the correct algorithm's complexity to the intrinsic mathematical patterns hidden within your dataset.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "The goal of regression is not simply to draw lines through dots; it is discovering the hidden mathematical elasticity between causes (features) and effects (outputs) so we can forecast the future with high quantitative precision."
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
       setup: "Predicting Houce Price based on Size. Assuming m = 30 and b = 1000. If size x = 2:",
       calc: "y = 30 * (2) + 1000",
       result: "Predicted Output = 1060"
     },
     pros: ["Very simple to understand", "Fast training", "Easy interpretation"],
     cons: ["Cannot capture complex or curved patterns", "Highly sensitive to outliers"],
     application: "Estimating straightforward, continuous trends like expected sales volume based on advertising spend or basic real estate property value estimation.",
     subjective: "Think of this as the \"hello world\" of machine learning. It's elegantly simple: you're just trying to draw the best straight line through a cloud of data points. It works beautifully when you have one clear, predictable relationship—like a bigger house usually means a higher price. But let's be honest, the real world is rarely this simple, making this algorithm more of a teaching tool than a daily driver."
  },
  {
     name: "2. Multiple Linear Regression",
     definition: "Uses multiple input variables simultaneously to predict one continuous output.",
     formula: "y = b₀ + b₁x₁ + b₂x₂ + ... + bₙxₙ",
     mathExample: {
       setup: "Predicting Price using Area and Bedrooms. b₀ = 5K, b₁(Area)=300, b₂(Bedrooms)=10K. Area=1000, Bed=3:",
       calc: "y = 5000 + 300(1000) + 10000(3)",
       result: "Predicted Output = 335,000"
     },
     pros: ["Better prediction than simple regression", "Interpretable coefficients"],
     cons: ["Multicollinearity issues", "Assumes linear relationships exist across all features"],
     application: "Predicting crop yields from temperature, rainfall, and fertilizer usage; estimating university admission likelihood based on multiple student scores.",
     subjective: "Now we're talking. This is the grown-up version of the simple linear model. Instead of a single line, imagine a flat sheet of rigid glass tilting and balancing across multiple dimensions of data. It respects the fact that things like house prices depend on size, location, and age all simultaneously. It's incredibly reliable and giving it straightforward data often yields surprisingly robust results."
  },
  {
     name: "3. Polynomial Regression",
     definition: "Models nonlinear relationships by fitting a curved polynomial line to the data.",
     formula: "y = b₀ + b₁x + b₂x² + b₃x³ + ...",
     mathExample: {
       setup: "For a curved relationship equation y = 2 + 3x + x². If x = 4:",
       calc: "y = 2 + 3(4) + 4² = 2 + 12 + 16",
       result: "Predicted Output = 30"
     },
     pros: ["Captures nonlinear, curving patterns perfectly", "Highly flexible"],
     cons: ["Can overfit extremely easily (squiggly lines)", "Harder to interpret mathematically"],
     application: "Modeling epidemic spread or viral growth, tracking biological tissue growth rates, analyzing material stress and yield point testing parameters.",
     subjective: "What if your data doesn't follow a straight line? What if it swoops, dips, or arcs? Polynomial regression lets our rigid line bend. It's visually satisfying to watch it trace the perfect curve through your data points. But, a strong warning from experience: it is notoriously eager to overfit. Give it too much freedom, and it will draw crazy, chaotic squiggles just to connect every single dot, completely ruining its predictive power."
  },
  {
     name: "4. Ridge Regression (L2)",
     definition: "A regularized version of linear regression that adds a L2 penalty term to shrink coefficients and reduce overfitting.",
     formula: "Loss = RSS + λ ∑ (w_j)²",
     mathExample: {
       setup: "If mathematical Error (RSS)=100, Lambda(λ)=0.1, sum of squared weights=50:",
       calc: "Total Loss = 100 + 0.1*(50)",
       result: "Total Computed Loss = 105"
     },
     pros: ["Reduces overfitting", "Handles multicollinearity excellently", "Improves generalization"],
     cons: ["Does not eliminate useless features completely (does not set weights to 0)"],
     application: "Genomic data analysis and research where features highly correlate, or complex housing prediction models with hundreds of overlapping features.",
     subjective: "As we dump more and more columns of data into our models, they tend to get confused by features that are too similar to each other. Ridge is our steady hand in the chaos. It mathematically \"punishes\" features for being too loud or too aggressive. By shrinking the mathematical weights naturally, Ridge provides an incredibly stable, generalized model that sleeps well at night."
  },
  {
     name: "5. Lasso Regression (L1)",
     definition: "Performs both regularization and automatic feature selection by forcing shrinking coefficients of useless features down to absolute zero.",
     formula: "Loss = RSS + λ ∑ |w_j|",
     mathExample: {
       setup: "If Error (RSS)=100, λ=0.1, sum of absolute weights=20. ",
       calc: "Loss = 100 + 0.1*(20) = 102",
       result: "Unimportant features receive a weight of exactly 0!"
     },
     pros: ["Automatic feature selection", "Simpler, sparse models", "Removes junk data"],
     cons: ["Can accidentally drop useful correlated variables", "Unstable with highly correlated data"],
     application: "Financial distress prediction where identifying exactly which handful of indicators out of thousands matter is the primary goal; medical screening feature selection.",
     subjective: "Where Ridge is gentle, Lasso is absolutely ruthless. Lasso doesn't just shrink the influence of unhelpful data; it grabs an eraser and deletes it completely by setting the weight to zero. It's immensely satisfying to use Lasso on a messy dataset with 100 confusing features and watch it boldly tell you, \"You only actually need these 5 columns.\""
  },
  {
     name: "6. Elastic Net Regression",
     definition: "Combines the penalties of both Ridge and Lasso Regression to get the best of both worlds.",
     formula: "Loss = RSS + λ₁ ∑ |w_j| + λ₂ ∑ (w_j)²",
     mathExample: {
       setup: "Combines L1 and L2. If RSS=100, L1=20, L2=50.",
       calc: "Loss = 100 + λ₁(20) + λ₂(50)",
       result: "Balances feature selection with stable coefficient shrinkage."
     },
     pros: ["Best of both Ridge and Lasso", "Handles correlated features perfectly"],
     cons: ["More hyperparameters to tune", "Computationally slightly heavier"],
     application: "Algorithmic trading or big-data portfolio optimization involving numerous highly correlated, volatile stock market indices.",
     subjective: "Can't decide between the stability of Ridge and the ruthlessness of Lasso? Elastic Net is your perfect compromise. It beautifully blends both L1 and L2 penalties together. In my experience, if you're dealing with hundreds of highly correlated features—like analyzing financial indicators—Elastic Net is the most responsible choice you can make."
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
     cons: ["Severe overfitting common on deep trees", "Unstable to small data changes"],
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
     pros: ["Extremely high accuracy", "Massively reduces overfitting", "Handles large datasets well"],
     cons: ["Slower training", "Lost interpretability (Black Box)", "High memory usage"],
     application: "Predicting equipment failure maintenance timing in factories, evaluating loan risk scores based on varied historical financial behaviors.",
     subjective: "If one tree makes mistakes, why not grow a thousand of them and have them vote? Random Forests are the ultimate crowd-sourced intelligence. They fix almost all the flaws of single decision trees. They are wonderfully resistant to noisy data and rarely complain about missing values. It's often the first \"heavyweight\" algorithm I deploy because it almost universally gives a strong result on the first try."
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
     pros: ["Works well with high-dimensional data", "Robust to extreme outliers"],
     cons: ["Extremely slow for large datasets", "Difficult hyperparameter tuning required"],
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
     pros: ["Extremely simple algorithm conceptually", "Zero training phase time"],
     cons: ["Extremely slow prediction time for large sets", "Sensitive to irrelevant features"],
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
       result: "Output: 95% confident the value is between 40L and 60L."
     },
     pros: ["Handles uncertainty exceptionally well", "Robust for small datasets", "Prevents overfitting natively"],
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
     pros: ["Unbeatable high accuracy", "Handles highly complex hidden relationships"],
     cons: ["Slow training process (Sequential)", "Hyperparameter tuning is tricky", "Can overfit easily if unchecked"],
     application: "Online advertising Click-Through Rate (CTR) estimation, pinpointing anomaly detection probabilities in massive banking streams.",
     subjective: "Imagine taking an exam, missing a few questions, and then only studying the exact concepts you failed for the next try. That's Gradient Boosting. It trains a sequence of weak models, where every new model is aggressively hyper-focused on fixing the residual errors of the previous one. It's a slow, deliberate learner, but the sheer accuracy it achieves is staggering."
  },
  {
     name: "13. XGBoost Regression",
     definition: "An extreme, highly optimized version of gradient boosting. Famous for constantly winning machine learning competitions.",
     formula: null,
     mathExample: {
       setup: "Optimized boosting loop using second-order derivatives (Hessians).",
       calc: "Final Pred = Sum(learning_rate * tree_predictions)",
       result: "Extreme scalability and lightning fast predictions."
     },
     pros: ["Exceptional accuracy standard in industry", "Fast computation via parallel processing", "Auto-handles missing values natively"],
     cons: ["Complex parameter tuning", "Harder interpretation (Black Box)"],
     application: "Dominating high-stakes structured tabular data tasks (Kaggle competitions), high-volume rapid customer churn probability modeling.",
     subjective: "XGBoost is the undisputed king of Kaggle competitions and modern tabular data. It simply took Gradient Boosting and engineered the absolute soul out of it—adding parallel processing, second-order derivatives, and deep hardware optimization. When I need the absolute peak of predictive performance on a structured dataset, XGBoost is the weapon of choice."
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
     pros: ["Captures impossibly complex patterns", "Exceptional for massive datasets"],
     cons: ["Demands huge amounts of data", "Extremely expensive to train", "Total Black-box model"],
     application: "Predicting global energy consumption limits from infinite IoT sensors, autonomous driving path prediction coordinates.",
     subjective: "The grandmaster of complexity. Deep learning throws layers upon layers of artificial neurons at the problem. To be completely honest, for standard tabular data, it's often massive overkill. But when you are predicting values based on unstructured chaos—like images, audio waves, or massive paragraphs of text—Neural Networks can mathematically perceive invisible, complex patterns that no human or traditional algorithm ever could."
  }
];