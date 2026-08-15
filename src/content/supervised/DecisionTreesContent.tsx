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
        Decision Trees are algorithms that work by repeatedly asking questions about the data and splitting it into smaller groups until a final prediction is made.
      </p>

      <h2 className="text-3xl font-bold text-slate-800 mt-8 mb-4">
        Decision Tree in Simple Words
      </h2>
      <p className="text-lg leading-relaxed text-slate-700 mb-6">
        Think of a Decision Tree as a sequence of simple questions. Each answer
        sends us to the next question until we reach a final decision.
      </p>

      <div className="bg-sky-50 border border-sky-200 rounded-xl p-5 sm:p-6 mb-8">
        <p className="font-bold text-sky-900 text-lg mb-5 text-center">
          Simple Example: Should We Play Cricket?
        </p>
        <div className="flex flex-col items-center text-sm sm:text-base font-semibold text-slate-700">
          <div className="bg-white border border-sky-300 rounded-lg px-5 py-3 text-center shadow-sm">
            Is it raining?
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-20 mt-3 w-full max-w-md">
            <div className="text-center">
              <p className="text-emerald-700 text-sm mb-2">No ↓</p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-3">
                Play outside
              </div>
            </div>
            <div className="text-center">
              <p className="text-rose-700 text-sm mb-2">Yes ↓</p>
              <div className="bg-white border border-sky-300 rounded-lg px-3 py-3">
                Indoor ground available?
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-xs sm:text-sm">
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-2">
                  Yes → Play inside
                </div>
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-2">
                  No → Do not play
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          ["1. Ask", "Ask one useful question about a feature."],
          ["2. Split", "Send different answers into different groups."],
          ["3. Predict", "Keep asking until the tree reaches a final prediction."],
        ].map(([title, text]) => (
          <div key={title} className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
            <p className="font-bold text-indigo-700 mb-1">{title}</p>
            <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

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
        Decision Trees are widely used because their rules are easy to inspect,
        they can model nonlinear relationships, and the same tree idea can be
        used for both classification and regression.
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
            Topmost node containing the training samples before the first split.
            The algorithm searches possible feature-and-threshold splits and
            chooses one according to its splitting criterion.
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
            Represents the final prediction for samples that reach that node.
            A leaf does not have to be perfectly pure; tree-stopping rules may
            end splitting earlier.
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
        purer groups. At each node, the algorithm compares possible questions
        and chooses a split that improves the chosen impurity or prediction-loss
        criterion the most.
      </p>

      <div className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 mb-8 shadow-sm">
        <p className="font-bold text-slate-800 mb-4 text-center">
          See the Goal Before the Formula
        </p>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center text-center">
          <div className="bg-rose-50 border border-rose-200 rounded-lg p-4">
            <p className="font-semibold text-rose-800 mb-2">Before a useful split</p>
            <p className="font-mono text-sm">YES · NO · YES · NO · YES · NO</p>
            <p className="text-xs text-slate-600 mt-2">Classes are mixed together.</p>
          </div>
          <div className="text-slate-400 font-bold text-2xl">→</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="font-mono text-sm">YES · YES · YES</p>
            </div>
            <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
              <p className="font-mono text-sm">NO · NO · NO</p>
            </div>
            <p className="col-span-2 text-xs text-slate-600">Better split → purer child groups</p>
          </div>
        </div>
      </div>

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
        A classification tree needs a mathematical method to compare possible
        splits. Two common classification criteria are <strong>Gini impurity</strong>{" "}
        and <strong>Entropy / Information Gain</strong>.
      </p>
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 text-slate-700">
        <strong>Regression tree note:</strong> when the target is a number, the
        tree usually compares splits using a regression loss such as squared
        error rather than class impurity.
      </div>

      {/* Gini Index */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-indigo-900 mb-4">
          1. Gini Index
        </h3>
        <p className="text-lg text-slate-700 mb-4">
          Measures how mixed the classes are inside a classification node.
          Lower values mean greater purity. Scikit-learn uses Gini impurity as
          the default classification criterion. The formula is:
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
                    0.5
                  </td>
                  <td className="py-3 text-slate-700">Most mixed binary node (50/50)</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-slate-500 mt-3">
              For more than two classes, the maximum possible Gini impurity is
              higher than 0.5 and depends on the number of classes.
            </p>
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
            For a binary node, 0.48 is close to the maximum of 0.5, so the
            classes are still highly mixed.
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
            For two classes, entropy 0.971 is close to the maximum of 1, so the
            node is highly mixed.
          </p>

          <div className="mt-6 bg-white border border-cyan-200 rounded-lg p-5">
            <p className="font-bold text-cyan-900 mb-3">Tiny Information Gain Example</p>
            <p className="text-slate-700 mb-3">
              Suppose a question splits the 10 samples into a pure child with 4
              YES samples and another child with 2 YES + 4 NO samples.
            </p>
            <div className="space-y-2 font-mono text-sm text-slate-700">
              <p><strong>Step 1:</strong> Parent entropy = 0.971</p>
              <p><strong>Step 2:</strong> Child entropies ≈ 0 and 0.918</p>
              <p><strong>Step 3:</strong> Weighted child entropy = (4/10 × 0) + (6/10 × 0.918) ≈ 0.551</p>
              <p><strong>Step 4:</strong> Information Gain = 0.971 − 0.551 ≈ <strong>0.420</strong></p>
            </div>
            <p className="text-sm text-slate-600 mt-3">
              The question reduced uncertainty by about 0.420 in this small example.
            </p>
          </div>
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
            Decision Trees can grow very deep and fit details that do not
            generalize well. This is <strong>overfitting</strong>: training
            performance may look strong while performance on new data gets worse.
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
              (One Control Strategy)
            </h3>
            <p className="text-lg text-slate-700 mb-4">
              Tree complexity can be controlled while growing the tree or by
              pruning branches afterward. The goal is to keep useful structure
              without fitting unnecessary detail.
            </p>
            <ul className="list-disc pl-5 text-emerald-800 space-y-2 font-medium">
              <li>
                <strong>Control growth:</strong> use settings such as max_depth,
                min_samples_split, or min_samples_leaf.
              </li>
              <li>
                <strong>Post-pruning:</strong> cost-complexity pruning can remove
                branches using a parameter such as ccp_alpha.
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
                <strong>Overfitting:</strong> Deep trees can fit noise and overly specific patterns
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-emerald-800 bg-emerald-50/50">
                <strong>Scaling usually unnecessary:</strong> splits rely on feature thresholds rather than distances
              </td>
              <td className="px-6 py-4 text-rose-800 bg-rose-50/50">
                <strong>Instability:</strong> Small data changes can sometimes
                produce a noticeably different tree
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 text-emerald-800 bg-emerald-50/50">
                <strong>Handles nonlinear relationships</strong> natively
              </td>
              <td className="px-6 py-4 text-rose-800 bg-rose-50/50">
                <strong>Greedy splitting:</strong> Each split is chosen locally,
                so the final tree is not guaranteed to be globally optimal
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
        <span className="text-emerald-400 block mb-2 font-bold font-sans"># Step 1: Import Libraries</span>
        <span className="text-rose-400">import</span> pandas <span className="text-rose-400">as</span> pd<br />
        <span className="text-rose-400">from</span> sklearn.model_selection <span className="text-rose-400">import</span> train_test_split<br />
        <span className="text-rose-400">from</span> sklearn.tree <span className="text-rose-400">import</span> DecisionTreeClassifier, export_text<br />
        <span className="text-rose-400">from</span> sklearn.metrics <span className="text-rose-400">import</span> accuracy_score<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold font-sans"># Step 2: Create a Small Teaching Dataset</span>
        data = {"{"}<br />
        &nbsp;&nbsp;<span className="text-amber-300">"Age"</span>: [22, 25, 28, 31, 35, 38, 42, 45, 48, 52, 55, 60],<br />
        &nbsp;&nbsp;<span className="text-amber-300">"Income"</span>: [18000, 22000, 30000, 35000, 42000, 50000, 58000, 65000, 72000, 80000, 90000, 100000],<br />
        &nbsp;&nbsp;<span className="text-amber-300">"Buy"</span>: [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1]<br />
        {"}"}<br />
        df = pd.DataFrame(data)<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold font-sans"># Step 3: Features and Target</span>
        X = df[[<span className="text-amber-300">"Age"</span>, <span className="text-amber-300">"Income"</span>]]<br />
        y = df[<span className="text-amber-300">"Buy"</span>]<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold font-sans"># Step 4: Split the Data</span>
        X_train, X_test, y_train, y_test = train_test_split(<br />
        &nbsp;&nbsp;X, y, test_size=<span className="text-sky-300">0.33</span>, random_state=<span className="text-sky-300">42</span>, stratify=y<br />
        )<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold font-sans"># Step 5: Train a Small Tree</span>
        model = DecisionTreeClassifier(max_depth=<span className="text-sky-300">3</span>, random_state=<span className="text-sky-300">42</span>)<br />
        model.fit(X_train, y_train)<br /><br />

        <span className="text-emerald-400 block mb-2 font-bold font-sans"># Step 6: Predict and Read the Learned Rule</span>
        predictions = model.predict(X_test)<br />
        <span className="text-sky-300">print</span>(<span className="text-amber-300">"Accuracy:"</span>, accuracy_score(y_test, predictions))<br />
        <span className="text-sky-300">print</span>(export_text(model, feature_names=list(X.columns)))<br />
      </div>

      {/* Code Expected Output */}
      <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
        Expected Output
      </h3>
      <div className="bg-black text-emerald-400 p-6 rounded-xl shadow-lg border border-slate-700 font-mono text-sm leading-relaxed overflow-x-auto mb-4">
        Accuracy: 1.0<br /><br />
        |--- Age &lt;= 36.50<br />
        |   |--- class: 0<br />
        |--- Age &gt;&nbsp; 36.50<br />
        |   |--- class: 1<br />
      </div>
      <p className="text-sm text-slate-600 mb-12">
        This is a deliberately simple teaching dataset, so the test split is
        easy. A perfect score here does <strong>not</strong> mean Decision Trees
        will achieve 100% accuracy on real-world data.
      </p>

      <hr className="border-slate-200 mt-10 mb-10" />

      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Common Questions About Decision Trees
      </h2>
      <div className="space-y-4 mb-10">
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="font-bold text-slate-800 mb-2">Do Decision Trees need feature scaling?</p>
          <p className="text-slate-700">
            Usually no. A tree compares feature values with thresholds, so ordinary
            rescaling does not change the ordering of values. Categorical data may
            still need suitable preprocessing depending on the implementation.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="font-bold text-slate-800 mb-2">What does max_depth do?</p>
          <p className="text-slate-700">
            It limits how many levels the tree can grow. A smaller depth can make
            the model easier to interpret and can help control overfitting.
          </p>
        </div>
        <div className="bg-white border border-slate-200 rounded-lg p-5">
          <p className="font-bold text-slate-800 mb-2">Decision Tree or Random Forest?</p>
          <p className="text-slate-700">
            A single tree is easier to inspect. A Random Forest combines many trees
            and often gives more stable predictions, at the cost of some simplicity.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-10">
        <p className="font-bold text-indigo-900 mb-3">Continue Learning</p>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <a href="/learn/classification-intro" className="text-indigo-700 underline underline-offset-2">Classification Overview</a>
          <a href="/learn/overfitting-underfitting" className="text-indigo-700 underline underline-offset-2">Overfitting & Underfitting</a>
          <a href="/learn/random-forest" className="text-indigo-700 underline underline-offset-2">Random Forest</a>
          <a href="/learn/confusion-matrix" className="text-indigo-700 underline underline-offset-2">Confusion Matrix</a>
        </div>
      </div>

      {/* FINAL SUMMARY */}
      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">
        Final Summary
      </h2>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        Decision Trees are an intuitive supervised-learning model because their
        predictions can be followed as a sequence of feature-based questions and
        branches.
      </p>
      <p className="text-lg text-slate-700 leading-relaxed mb-4">
        A single tree can model nonlinear relationships and usually does not need
        ordinary feature scaling, but an unconstrained tree can overfit. Decision
        Trees are also important building blocks for ensemble methods such as
        Random Forest and Gradient Boosting.
      </p>
      
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
         <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
         <p className="text-slate-800 italic text-lg leading-relaxed">
           A Decision Tree is easy to inspect, but controlling its depth and
           validating it on unseen data are important because a single tree can be
           sensitive to the training sample.
         </p>
      </div>

    </>
  );
}
