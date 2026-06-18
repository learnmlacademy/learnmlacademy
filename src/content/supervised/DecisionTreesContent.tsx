import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  Legend,
  Tooltip as RechartsTooltip,
  AreaChart,
  Area,
} from "recharts";
import {
  Target,
  AlertTriangle,
  Calculator,
  Layers,
  Code,
  CheckCircle,
  Briefcase,
  Activity,
  ShieldAlert,
  GitBranch,
  RefreshCw,
  BarChart2,
  FileCode,
  Network,
  SplitSquareHorizontal,
  XCircle,
} from "lucide-react";
import { DecisionTreeDiagram } from "../../components/diagrams/MLDiagrams";

export function DecisionTreesContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Decision Tree</h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-700 font-medium">
        Decision Trees are algorithms that work by repeatedly asking questions about the data and splitting it into smaller groups until a final prediction is made.</p>

      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 mb-8 text-white shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Network className="mr-3 text-emerald-200" /> A Decision Tree looks
            similar to a flowchart:
          </h3>
          <ul className="text-lg text-emerald-50 font-medium space-y-2 mb-4">
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full border-2 border-emerald-300 mr-3"></span>
              Each internal node represents a question
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full border-2 border-emerald-300 mr-3"></span>
              Each branch represents an answer
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 rounded-full border-2 border-emerald-300 mr-3"></span>
              Each leaf node represents the final prediction
            </li>
          </ul>
        </div>
      </div>

      <p className="text-lg leading-relaxed text-slate-700 mb-10 italic">
        They are highly popular because they are easy to visualize,
        interpretable, fast to train, capable of handling nonlinear data, and
        useful for both classification and regression.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* What is a Decision Tree */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        What is a Decision Tree?
      </h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-700">
        A Decision Tree is a supervised machine learning algorithm that divides
        data into smaller subsets based on conditions. The model learns a
        sequence of decision rules from historical data and uses those rules to
        make predictions on new data.
      </p>
      <DecisionTreeDiagram />

      <div className="mb-12 p-6 bg-slate-50 border border-slate-200 rounded-xl shadow-sm text-center">
        <h4 className="font-bold text-slate-800 mb-6 font-sans text-lg">
          Simple Decision Tree Workflow
        </h4>
        <div className="flex flex-col items-center justify-center font-mono text-sm sm:text-base font-bold text-slate-700 space-y-2">
          <span className="bg-white border border-slate-300 px-6 py-2 rounded shadow-sm">
            Input Data
          </span>
          <span className="text-slate-400">↓</span>
          <span className="bg-white border border-slate-300 px-6 py-2 rounded shadow-sm">
            Ask Questions
          </span>
          <span className="text-slate-400">↓</span>
          <span className="bg-white border border-slate-300 px-6 py-2 rounded shadow-sm">
            Split Dataset
          </span>
          <span className="text-slate-400">↓</span>
          <span className="bg-white border border-slate-300 px-6 py-2 rounded shadow-sm">
            Create Smaller Groups
          </span>
          <span className="text-slate-400">↓</span>
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-300 px-6 py-2 rounded shadow-sm">
            Final Prediction
          </span>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl p-8 mb-12 shadow-sm">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
          <Briefcase className="mr-3 text-indigo-600" /> Real-Life Example: Bank
          Loan
        </h3>
        <p className="text-lg text-slate-700 mb-6">
          Suppose a bank wants to decide whether to approve a loan. The tree
          learns rules automatically from previous customer records.
        </p>

        <div className="flex flex-col items-center font-mono font-bold text-sm">
          <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-6 py-3 rounded-lg shadow-sm">
            Is Salary &gt; 50,000?
          </div>
          <div className="h-6 w-px bg-slate-300"></div>

          <div className="flex w-full max-w-sm relative justify-center">
            <div className="absolute top-0 w-32 h-px bg-slate-300"></div>
            <div className="flex justify-between w-32">
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="h-6 w-px bg-slate-300"></div>
            </div>
          </div>

          <div className="flex w-full max-w-sm justify-between -mt-1">
            <div className="text-rose-500 text-xs text-center w-0 bg-white ml-6 z-10 -mt-2">
              NO
            </div>
            <div className="text-emerald-500 text-xs text-center w-0 bg-white mr-6 z-10 -mt-2">
              YES
            </div>
          </div>

          <div className="flex w-full max-w-md justify-between items-start mt-2">
            <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-2 rounded shadow-sm whitespace-nowrap">
              REJECT LOAN
            </div>
            <div className="bg-indigo-50 border border-indigo-200 text-indigo-900 px-4 py-2 rounded shadow-sm whitespace-nowrap">
              Is Credit Good?
            </div>
          </div>

          <div className="flex w-full max-w-md justify-end">
            <div className="w-1/2 flex flex-col items-center">
              <div className="h-6 w-px bg-slate-300"></div>
              <div className="flex w-full max-w-[12rem] relative justify-center">
                <div className="absolute top-0 w-full h-px bg-slate-300"></div>
                <div className="flex justify-between w-full">
                  <div className="h-6 w-px bg-slate-300"></div>
                  <div className="h-6 w-px bg-slate-300"></div>
                </div>
              </div>

              <div className="flex w-full max-w-[12rem] justify-between items-start mt-2">
                <div className="bg-rose-50 border border-rose-200 text-rose-800 px-4 py-2 rounded shadow-sm text-xs">
                  REJECT
                </div>
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded shadow-sm text-xs">
                  APPROVE
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Structure of a Decision Tree */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Layers className="mr-3 text-indigo-600" /> Structure of a Decision Tree
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        A Decision Tree mainly contains three types of nodes, forming a
        hierarchical structure.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-blue-900 mb-3 border-b border-blue-200 pb-2 flex items-center">
            1. Root Node
          </h3>
          <p className="text-slate-700 mb-4 whitespace-pre-wrap leading-relaxed">
            Topmost node containing the complete dataset before any splitting
            occurs. The algorithm selects the best feature mathematically.
          </p>
          <div className="bg-white p-3 rounded border border-blue-100 text-sm font-mono text-center text-blue-800 shadow-sm leading-tight">
            Example: <br />
            <strong>Is Age &gt; 30?</strong>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-amber-900 mb-3 border-b border-amber-200 pb-2 flex items-center">
            2. Decision Node
          </h3>
          <p className="text-slate-700 mb-4 whitespace-pre-wrap leading-relaxed">
            Internal nodes where additional conditions are evaluated to divide
            dataset into smaller, purer groups.
          </p>
          <div className="bg-white p-3 rounded border border-amber-100 text-sm font-mono text-center text-amber-800 shadow-sm leading-tight">
            Example: <br />
            <strong>Is Income &gt; 60K?</strong>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-emerald-900 mb-3 border-b border-emerald-200 pb-2 flex items-center">
            3. Leaf Node
          </h3>
          <p className="text-slate-700 mb-4 whitespace-pre-wrap leading-relaxed">
            Represents the final prediction. No further splitting occurs after
            reaching a leaf node. Data is highly organized.
          </p>
          <div className="bg-white p-3 rounded border border-emerald-100 text-sm font-mono text-center text-emerald-800 shadow-sm leading-tight">
            Example: <br />
            <strong>Loan Approved</strong>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Types of Decision Trees */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <SplitSquareHorizontal className="mr-3 text-emerald-600" /> Types of
        Decision Trees
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
          <h3 className="text-xl font-bold text-indigo-900 mb-4 border-b border-slate-100 pb-2">
            Classification Tree
          </h3>
          <p className="text-slate-700 mb-4">
            Predicts discrete categories or labels.
          </p>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                Examples
              </h4>
              <ul className="text-sm font-mono space-y-1 text-slate-600">
                <li>YES / NO</li>
                <li>SPAM / NOT SPAM</li>
                <li>FRAUD / LEGITIMATE</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                Applications
              </h4>
              <ul className="text-sm space-y-1 text-slate-600 list-disc pl-4">
                <li>Spam detection</li>
                <li>Medical diagnosis</li>
                <li>Customer churn</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col h-full">
          <h3 className="text-xl font-bold text-emerald-900 mb-4 border-b border-slate-100 pb-2">
            Regression Tree
          </h3>
          <p className="text-slate-700 mb-4">
            Predicts continuous numerical values.
          </p>
          <div className="grid grid-cols-2 gap-4 flex-1">
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                Examples
              </h4>
              <ul className="text-sm font-mono space-y-1 text-slate-600">
                <li>House Price</li>
                <li>Temperature</li>
                <li>Sales Forecast</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-sm uppercase mb-2">
                Applications
              </h4>
              <ul className="text-sm space-y-1 text-slate-600 list-disc pl-4">
                <li>Real estate pricing</li>
                <li>Demand forecasting</li>
                <li>Revenue estimation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Concept: Purity and Works */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        How Decision Trees Work & Purity
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        The main objective is to repeatedly divide the dataset into smaller and
        purer groups. The algorithm searches for the best feature that creates
        the most organized split.
      </p>

      <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm mb-12">
        <h4 className="text-xl font-bold text-slate-800 mb-6 text-center">
          Understanding Purity
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg text-center">
            <h5 className="font-bold font-sans text-emerald-900 mb-3">
              Pure Node Example
            </h5>
            <div className="flex gap-2 justify-center mb-3">
              <span className="bg-emerald-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                YES
              </span>
              <span className="bg-emerald-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                YES
              </span>
              <span className="bg-emerald-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                YES
              </span>
              <span className="bg-emerald-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                YES
              </span>
            </div>
            <p className="text-sm text-emerald-800 italic">
              All samples belong to the same category.
            </p>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-4 rounded-lg text-center">
            <h5 className="font-bold font-sans text-rose-900 mb-3">
              Impure Node Example
            </h5>
            <div className="flex gap-2 justify-center mb-3">
              <span className="bg-emerald-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                YES
              </span>
              <span className="bg-rose-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                NO
              </span>
              <span className="bg-emerald-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                YES
              </span>
              <span className="bg-rose-500 text-white px-2 py-1 rounded font-bold text-xs shadow-sm">
                NO
              </span>
            </div>
            <p className="text-sm text-rose-800 italic">
              The node contains mixed categories.
            </p>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Splitting Criteria: Gini & Entropy */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <Calculator className="mr-3 text-indigo-600" /> Splitting Criteria
        (Math)
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        A Decision Tree needs a mathematical method to determine which feature
        creates the best split. The two most important criteria are the{" "}
        <strong>Gini Index</strong> and <strong>Entropy</strong>.
      </p>

      {/* Gini Index */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4">
          1. Gini Index
        </h3>
        <p className="text-lg text-slate-700 mb-4">
          Measures how mixed the classes are inside a node. Lower values
          indicate better purity. It is used primarily in the CART
          (Classification and Regression Trees) algorithm. The formula is:
        </p>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col justify-center items-center">
            <div className="bg-white p-4 rounded text-center border border-indigo-100 shadow-sm font-mono text-indigo-800 overflow-x-auto text-lg md:text-xl font-bold block mb-4 w-full">
              Gini = 1 - Σ(pᵢ²)
            </div>
            <p className="text-slate-600 text-sm">
              Where{" "}
              <code className="bg-white px-1 py-0.5 rounded border border-slate-200">
                pᵢ
              </code>{" "}
              = probability of class i
            </p>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex-1">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="pb-2">Gini Value</th>
                  <th className="pb-2">Interpretation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 font-mono font-bold text-emerald-600 text-lg">
                    0
                  </td>
                  <td className="py-3 text-slate-700">Perfectly pure node</td>
                </tr>
                <tr>
                  <td className="py-3 font-mono font-bold text-rose-500 text-lg">
                    Near 1
                  </td>
                  <td className="py-3 text-slate-700">Highly impure node</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Worked Example */}
        <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md">
          <h4 className="font-bold text-xl mb-3 text-indigo-900">
            Worked Example of Gini Index
          </h4>
          <p className="mb-4 text-indigo-800">
            Suppose a node contains <strong>6 YES</strong> and{" "}
            <strong>4 NO</strong> (Total: 10)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm">
            <div className="bg-white p-4 rounded shadow-sm border border-indigo-100">
              <span className="font-bold text-slate-500 block mb-2 font-sans border-b pb-1">
                Step 1: Probabilities
              </span>
              P(YES) = 6/10 = 0.6
              <br />
              P(NO) = 4/10 = 0.4
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-indigo-100">
              <span className="font-bold text-slate-500 block mb-2 font-sans border-b pb-1">
                Step 2: Apply Formula
              </span>
              Gini = 1 - (0.6² + 0.4²)
              <br />
              Gini = 1 - (0.36 + 0.16)
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="bg-indigo-900 text-white font-mono font-bold px-6 py-3 rounded-lg shadow-sm text-xl border border-indigo-700">
              Gini = 1 - 0.52 = 0.48
            </div>
          </div>
          <p className="text-center mt-3 text-indigo-800 font-medium">
            Moderate impurity. Algorithm will try to split further.
          </p>
        </div>
      </div>

      {/* Entropy */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-cyan-900 mb-4">
          2. Entropy & Information Gain
        </h3>
        <p className="text-lg text-slate-700 mb-4">
          Entropy measures disorder or uncertainty inside a node (from
          Information Theory). Lower entropy means more organized data.{" "}
          <strong>Information Gain</strong> measures how much Entropy decreases
          after a split.
        </p>

        <div className="flex flex-col md:flex-row gap-8 mb-6">
          <div className="bg-cyan-50 border border-cyan-200 p-6 rounded-xl shadow-sm flex-1 flex flex-col justify-center items-center">
            <div className="bg-white p-4 rounded text-center border border-cyan-100 shadow-sm font-mono text-cyan-800 overflow-x-auto text-base md:text-lg font-bold block mb-4 w-full">
              Entropy = -Σ(pᵢ * log₂(pᵢ))
            </div>
            <div className="bg-white p-3 rounded text-center border border-cyan-100 shadow-sm font-mono text-cyan-800 overflow-x-auto text-sm md:text-base font-bold block w-full mt-2">
              Gain = Entropy(Parent) - Weighted_Entropy(Children)
            </div>
          </div>
          <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm flex-1">
            <table className="w-full text-sm mt-3">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="pb-2">Value</th>
                  <th className="pb-2">Meaning</th>
                  <th className="pb-2">Goal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 pb-2">
                <tr>
                  <td className="py-2 font-mono font-bold text-emerald-600">
                    0
                  </td>
                  <td className="py-2 text-slate-700">Perfectly pure</td>
                  <td className="py-2 text-slate-500 italic">Minimize</td>
                </tr>
                <tr>
                  <td className="py-2 font-mono font-bold text-rose-500">1</td>
                  <td className="py-2 text-slate-700">Max disorder (binary)</td>
                  <td className="py-2 text-slate-500 italic"></td>
                </tr>
                <tr>
                  <td className="py-2 font-mono font-bold text-indigo-600">
                    High Gain
                  </td>
                  <td className="py-2 text-slate-700">Huge uncertainty drop</td>
                  <td className="py-2 text-slate-500 italic">Maximize</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Worked Example */}
        <div className="pl-4 border-l-4 border-cyan-400 bg-cyan-50 py-4 pr-4 rounded-r-md">
          <h4 className="font-bold text-xl mb-3 text-cyan-900">
            Worked Example of Entropy
          </h4>
          <p className="mb-4 text-cyan-800">
            Suppose a node contains <strong>6 YES</strong> and{" "}
            <strong>4 NO</strong> (Total: 10)
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-sm leading-relaxed mb-4">
            <div className="bg-white p-4 rounded shadow-sm border border-cyan-100">
              <span className="font-bold text-slate-500 block mb-2 font-sans border-b pb-1">
                Calculation Steps
              </span>
              P(YES) = 0.6, P(NO) = 0.4 <br />
              <span className="text-slate-400">
                log₂(0.6) ≈ -0.737, log₂(0.4) ≈ -1.322
              </span>
            </div>
            <div className="bg-white p-4 rounded shadow-sm border border-cyan-100">
              <span className="font-bold text-slate-500 block mb-2 font-sans border-b pb-1">
                Multiply Values
              </span>
              0.6 * -0.737 = -0.4422 <br />
              0.4 * -1.322 = -0.5288
            </div>
          </div>
          <div className="mt-4 flex justify-center">
            <div className="bg-cyan-900 text-white font-mono font-bold px-6 py-3 rounded-lg shadow-sm text-xl border border-cyan-700">
              Entropy = -(-0.4422 - 0.5288) = 0.971
            </div>
          </div>
          <p className="text-center mt-3 text-cyan-800 font-medium">
            Entropy close to 1 indicates high disorder. Needs more splitting.
          </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Overfitting, Pruning and Drawbacks */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <GitBranch className="mr-3 text-indigo-600" /> Advanced: Overfitting &
        Limitations
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-rose-50 border border-rose-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-rose-900 mb-4 flex items-center">
            <AlertTriangle className="mr-2 text-rose-600 w-5 h-5" /> Overfitting
          </h3>
          <p className="text-lg text-slate-700 mb-4">
            Decision Trees can easily become overly complex. This is called{" "}
            <strong>overfitting</strong>. An overfitted tree maps the training
            data too closely instead of learning general patterns.
          </p>
          <ul className="list-disc pl-5 text-rose-800 space-y-2 font-medium">
            <li>Creates very deep, complex branches</li>
            <li>Captures noise and outliers</li>
            <li>Leads to poor test accuracy</li>
          </ul>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-xl shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-emerald-900 mb-4 flex items-center">
              <CheckCircle className="mr-2 text-emerald-600 w-5 h-5" /> Pruning
              (The Solution)
            </h3>
            <p className="text-lg text-slate-700 mb-4">
              Pruning reduces unnecessary branches from the tree, stripping away
              sections that provide little predictive power.
            </p>
            <ul className="list-disc pl-5 text-emerald-800 space-y-2 font-medium">
              <li>
                <strong>Pre-pruning:</strong> Stop growing early (max_depth).
              </li>
              <li>
                <strong>Post-pruning:</strong> Grow full tree, then cut back
                weak branches.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Adv / Disadv */}
      <h3 className="text-2xl font-bold text-slate-800 mb-6">
        Advantages vs Disadvantages
      </h3>
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-12">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-slate-800 text-white">
              <th className="px-6 py-4 w-1/2">✅ Advantages</th>
              <th className="px-6 py-4 w-1/2">❌ Disadvantages</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 text-lg">
            <tr>
              <td className="px-6 py-4 text-emerald-800 bg-emerald-50/50">
                <strong>Interpretable:</strong> Human-readable rules
              </td>
              <td className="px-6 py-4 text-rose-800 bg-rose-50/50">
                <strong>Overfitting:</strong> Deep trees memorize data easily
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-emerald-800 bg-emerald-50/50">
                <strong>No Feature Scaling required:</strong> Works on raw data
              </td>
              <td className="px-6 py-4 text-rose-800 bg-rose-50/50">
                <strong>Instability:</strong> Small change in data completely
                alters tree structure
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-emerald-800 bg-emerald-50/50">
                <strong>Handles nonlinear relationships</strong> natively
              </td>
              <td className="px-6 py-4 text-rose-800 bg-rose-50/50">
                <strong>Greedy optimization:</strong> Makes local optimum
                decisions, not always global
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      {/* Code Implementation */}
      <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center">
        <FileCode className="mr-3 text-indigo-600" /> Python Implementation
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        Here is a practical Python implementation using Scikit-Learn.
      </p>

      <div className="bg-[#1e1e1e] text-[#d4d4d4] p-6 sm:p-8 rounded-xl shadow-lg border border-slate-700 font-mono text-sm leading-relaxed overflow-x-auto mb-12">
        <span className="text-emerald-400 block mb-2 font-bold font-sans">
          # Step 1: Import Libraries
        </span>
        <span className="text-rose-400">import</span> pandas{" "}
        <span className="text-rose-400">as</span> pd
        <br />
        <span className="text-rose-400">import</span> numpy{" "}
        <span className="text-rose-400">as</span> np
        <br />
        <br />
        <span className="text-rose-400">from</span> sklearn.model_selection{" "}
        <span className="text-rose-400">import</span> train_test_split
        <br />
        <span className="text-rose-400">from</span> sklearn.tree{" "}
        <span className="text-rose-400">import</span> DecisionTreeClassifier
        <br />
        <span className="text-rose-400">from</span> sklearn.metrics{" "}
        <span className="text-rose-400">import</span> accuracy_score
        <br />
        <br />
        <span className="text-emerald-400 block mb-2 font-bold font-sans">
          # Step 2: Create Mock Dataset
        </span>
        data = {"{"} <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">'Age'</span>:
        [25, 35, 45, 20, 50],
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">'Income'</span>
        : [20000, 50000, 80000, 15000, 90000],
        <br />
        &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-amber-300">'Buy'</span>:
        [0, 1, 1, 0, 1]
        <br />
        {"}"}
        <br />
        df = pd.DataFrame(data)
        <br />
        <br />
        <span className="text-emerald-400 block mb-2 font-bold font-sans">
          # Step 3: Split Features and Target
        </span>
        X = df[[<span className="text-amber-300">'Age'</span>,{" "}
        <span className="text-amber-300">'Income'</span>]]
        <br />y = df[<span className="text-amber-300">'Buy'</span>]<br />
        <br />
        <span className="text-emerald-400 block mb-2 font-bold font-sans">
          # Step 4: Train-Test Split
        </span>
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=
        <span className="text-sky-300">0.2</span>, random_state=
        <span className="text-sky-300">42</span>)<br />
        <br />
        <span className="text-emerald-400 block mb-2 font-bold font-sans">
          # Step 5: Train Model
        </span>
        model = DecisionTreeClassifier()
        <br />
        model.fit(X_train, y_train)
        <br />
        <br />
        <span className="text-emerald-400 block mb-2 font-bold font-sans">
          # Step 6: Make Predictions & Evaluate
        </span>
        predictions = model.predict(X_test)
        <br />
        accuracy = accuracy_score(y_test, predictions)
        <br />
        <br />
        <span className="text-sky-300">print</span>(
        <span className="text-amber-300">"Accuracy:"</span>, accuracy)
        <br />
      </div>

      {/* Code Expected Output */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        Expected Output
      </h3>
      <div className="bg-black text-emerald-400 p-6 rounded-xl shadow-lg border border-slate-700 font-mono text-sm leading-relaxed overflow-x-auto mb-12">
        Accuracy: 1.0
        <br />
      </div>

      <hr className="border-slate-200 mt-10 mb-10" />

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Decision Trees represent an intuitive way a machine can learn. By mimicking human decision-making—splitting information into simple yes/no questions based on feature boundaries—it provides incredible transparency.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        While highly interpretable and capable of handling complex non-linear data without scaling, building a solitary deep tree is extremely prone to memorizing training data (overfitting). Because of this, it is most commonly used as the foundational building block for advanced ensemble methods like Random Forest and Gradient Boosting.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           "A standalone Decision Tree is incredibly interpretable but dangerously unstable; its true power is unlocked when thousands of simple trees are combined to form powerful ensemble models."
         </p>
      </div>

    </>
  );
}
