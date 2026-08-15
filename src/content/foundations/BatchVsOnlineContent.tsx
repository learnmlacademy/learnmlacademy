import React from "react";
import {
  Database,
  Zap,
  RefreshCw,
  Box,
  CheckCircle2,
  XCircle,
  BookOpen,
  Server,
  Activity
} from "lucide-react";

export function BatchVsOnlineContent() {
  return (
    <>
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Batch vs Online Learning in Simple Words
      </h2>

      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        Both approaches train a machine learning model from data. The main difference is <strong>when the model learns from new data</strong>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        <div className="border border-blue-200 bg-blue-50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <Database className="h-6 w-6 text-blue-700" />
            <p className="font-bold text-xl text-blue-900 m-0">Batch Learning</p>
          </div>
          <p className="text-slate-800 text-lg leading-relaxed mb-4">
            Collect a group of data, train the model, and then use that trained model until the next scheduled retraining.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-slate-800">
            <span className="bg-white border border-blue-200 rounded-lg px-3 py-2">Old Data + New Data</span>
            <span aria-hidden="true">→</span>
            <span className="bg-white border border-blue-200 rounded-lg px-3 py-2">Retrain</span>
            <span aria-hidden="true">→</span>
            <span className="bg-white border border-blue-200 rounded-lg px-3 py-2">New Model</span>
          </div>
        </div>

        <div className="border border-amber-200 bg-amber-50 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <RefreshCw className="h-6 w-6 text-amber-700" />
            <p className="font-bold text-xl text-amber-900 m-0">Online Learning</p>
          </div>
          <p className="text-slate-800 text-lg leading-relaxed mb-4">
            Update the model little by little as new data becomes available, instead of waiting for one large retraining job.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-base font-semibold text-slate-800">
            <span className="bg-white border border-amber-200 rounded-lg px-3 py-2">New Data</span>
            <span aria-hidden="true">→</span>
            <span className="bg-white border border-amber-200 rounded-lg px-3 py-2">Small Update</span>
            <span aria-hidden="true">→</span>
            <span className="bg-white border border-amber-200 rounded-lg px-3 py-2">Updated Model</span>
          </div>
        </div>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 my-8">
        <h3 className="font-bold text-xl text-emerald-900 mt-0 mb-4">A Simple School Example</h3>
        <p className="text-lg text-slate-800 leading-relaxed mb-4">
          Imagine a model that predicts whether a student may need extra help based on weekly practice-test results.
        </p>
        <div className="overflow-x-auto rounded-lg border border-emerald-200 bg-white">
          <table className="min-w-full text-left">
            <thead className="bg-emerald-100">
              <tr>
                <th className="p-3 font-bold text-slate-800">Week</th>
                <th className="p-3 font-bold text-slate-800">New Test Data</th>
                <th className="p-3 font-bold text-blue-800">Batch Learning</th>
                <th className="p-3 font-bold text-amber-800">Online Learning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-100 text-slate-700">
              <tr>
                <td className="p-3 font-semibold">1</td>
                <td className="p-3">20 students</td>
                <td className="p-3">Store the data</td>
                <td className="p-3">Update the model</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">2</td>
                <td className="p-3">20 more students</td>
                <td className="p-3">Store the data</td>
                <td className="p-3">Update again</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold">End of month</td>
                <td className="p-3">All collected data</td>
                <td className="p-3">Retrain a new model</td>
                <td className="p-3">Already updated gradually</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-base text-slate-700 mt-4 mb-0">
          <strong>Easy way to remember:</strong> Batch learning learns in scheduled groups; online learning learns in smaller updates as data arrives.
        </p>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Quick Comparison
      </h2>
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-800">Question</th>
              <th className="p-4 font-bold text-blue-800 border-l border-slate-200">Batch</th>
              <th className="p-4 font-bold text-amber-700 border-l border-slate-200">Online</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-lg">
            <tr>
              <td className="p-4 font-semibold text-slate-900">When does it learn?</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">At scheduled retraining times</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Incrementally as new data becomes available</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-900">Best when</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Data changes slowly</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Data or behaviour changes quickly</td>
            </tr>
            <tr>
              <td className="p-4 font-semibold text-slate-900">Main advantage</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Simple and easier to test before deployment</td>
              <td className="p-4 text-slate-700 border-l border-slate-100">Can adapt faster</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Key Architectural Concepts
      </h2>
      
      <div className="space-y-8 my-8">
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md">
          <strong className="text-slate-900 text-lg block mb-1">
            Learning Rate (Step Size)
          </strong>
          <p className="text-lg text-slate-700 m-0 leading-relaxed">
            This controls how drastically the model adjusts its internal parameters when it sees new data. In Online Learning, a high learning rate means the model rapidly "forgets" old historical data to heavily favor adapting to the newest trends.
          </p>
        </div>
        
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md">
          <strong className="text-slate-900 text-lg block mb-1">
            Data Drift (Concept Drift)
          </strong>
          <p className="text-lg text-slate-700 m-0 leading-relaxed">
            This happens when the relationship between incoming data and the outcome you want to predict changes over time. For example, customer buying patterns may change after a major event. Online learning can adapt more frequently, but it does not solve drift automatically; the system still needs monitoring. Batch models usually need a new retraining cycle to catch up.
          </p>
        </div>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md">
          <strong className="text-slate-900 text-lg block mb-1">
            Out-of-Core Learning
          </strong>
          <p className="text-lg text-slate-700 m-0 leading-relaxed">
            An engineering technique used when a dataset is too large to fit into a computer's main memory (RAM). The data is processed in smaller chunks, and an incremental algorithm updates the model chunk by chunk. This applies online-learning ideas to a large dataset that may itself be stored offline.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        The Two Paradigms Explained
      </h2>

      <div className="pl-4 border-l-4 border-blue-500 bg-blue-50 py-6 pr-6 rounded-r-md mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-blue-200 text-blue-700 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <Box className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 m-0">
            Batch Learning (Offline Learning)
          </h3>
        </div>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          In batch learning, the deployed model normally does not update itself from each new data instance. Training happens offline on a collected dataset, and the trained model is then used for prediction until the next retraining cycle.
        </p>

        <strong className="text-slate-900 block text-lg mb-2">
          The Update Process:
        </strong>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          A common update process is to combine the historical training data with newly collected data and train a new model version offline. Depending on the algorithm and system design, retraining may reuse previous work, but the important idea is that the live model is not learning continuously from every incoming record.
        </p>

        <strong className="text-slate-900 block text-lg mb-2 border-t border-blue-200 pt-4">
          Real-World Applications:
        </strong>
        <p className="text-slate-800 text-lg leading-relaxed">
          Monthly sales forecasting systems, annual property valuation models for real estate, or medical diagnosis models that are only updated quarterly after rigorous clinical review.
        </p>
      </div>

      <div className="pl-4 border-l-4 border-amber-500 bg-amber-50 py-6 pr-6 rounded-r-md mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-amber-200 text-amber-700 rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-2xl font-bold text-slate-900 m-0">
            Online Learning (Incremental Learning)
          </h3>
        </div>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          The system is trained incrementally by feeding it new data instances or small mini-batches over time. Updates may happen continuously or at frequent intervals, depending on the application.
        </p>

        <strong className="text-slate-900 block text-lg mb-2">
          The Update Process:
        </strong>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          As new data becomes available, an incremental algorithm can use it to update the model without retraining on the entire historical dataset. In supervised settings, an update can happen when the true outcome or label becomes available. Systems may process one record at a time or use small mini-batches.
        </p>

        <strong className="text-slate-900 block text-lg mb-2 border-t border-amber-200 pt-4">
          Real-World Applications:
        </strong>
        <p className="text-slate-800 text-lg leading-relaxed">
          Streaming fraud detection, adaptive recommendation systems, or other applications where patterns may change frequently and updates need to happen often.
        </p>
        <p className="text-slate-700 text-base leading-relaxed mt-4 mb-0">
          Later in the curriculum, the dedicated <a href="/learn/online-learning" className="text-indigo-700 font-semibold underline underline-offset-2 hover:text-indigo-900">Online Learning</a> lesson explores incremental updates and concept drift in more depth.
        </p>
      </div>


      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Which One Should You Choose?
      </h2>
      <div className="space-y-4 my-8 text-lg text-slate-800">
        <div className="flex gap-3 items-start bg-blue-50 border border-blue-100 rounded-lg p-4">
          <span className="font-bold text-blue-800 shrink-0">1.</span>
          <p className="m-0"><strong>Does your data change slowly?</strong> Batch learning is often simpler and easier to manage.</p>
        </div>
        <div className="flex gap-3 items-start bg-amber-50 border border-amber-100 rounded-lg p-4">
          <span className="font-bold text-amber-800 shrink-0">2.</span>
          <p className="m-0"><strong>Do patterns change quickly?</strong> Online learning may help the model adapt more frequently.</p>
        </div>
        <div className="flex gap-3 items-start bg-slate-50 border border-slate-200 rounded-lg p-4">
          <span className="font-bold text-slate-800 shrink-0">3.</span>
          <p className="m-0"><strong>Is your dataset too large to fit in memory?</strong> Incremental or out-of-core learning can process it in smaller chunks.</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Advantages & Vulnerabilities
      </h2>

      <h3 className="font-bold text-xl text-slate-900 mt-8 mb-4 flex items-center">
        <Server className="w-6 h-6 mr-3 text-blue-600"/> Batch Learning Profile
      </h3>
      <ul className="space-y-4 text-lg mt-4 mb-10">
        <li className="flex gap-3 items-start">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Stable & Easier to Control:</strong> Because the model is trained offline, engineering teams can test and validate a new version before replacing the live system. Incoming prediction data does not directly change the model's parameters.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Simpler Architecture:</strong> Usually easier to implement, test, monitor, and roll back than a system that updates the model continuously.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <XCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Retraining Can Be Resource Heavy:</strong> If the training dataset is very large, repeated retraining can require substantial compute time and cost.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <XCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Can Become Stale:</strong> The model does not learn from new patterns until the next retraining cycle, so its accuracy may fall when the real world changes quickly.
          </span>
        </li>
      </ul>

      <h3 className="font-bold text-xl text-slate-900 mt-10 mb-4 flex items-center">
        <Activity className="w-6 h-6 mr-3 text-amber-600"/> Online Learning Profile
      </h3>
      <ul className="space-y-4 text-lg mt-4 mb-12">
        <li className="flex gap-3 items-start">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Highly Adaptive to Drift:</strong> Can react to new trends faster when updates are frequent. This is useful in areas such as cyber-security and fraud detection where patterns may change over time.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Can Be Memory Efficient:</strong> Incremental algorithms can learn from small chunks instead of loading the complete dataset into memory at once. This is useful for very large datasets and some resource-constrained systems.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <XCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Risk from Bad Incoming Data:</strong> If broken sensors, bugs, or malicious data enter the update stream, the model can gradually learn the wrong pattern. Online systems therefore need strong monitoring, validation, and rollback controls.
          </span>
        </li>
      </ul>

      

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">
        Common Questions
      </h2>
      <div className="space-y-4 mb-12">
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <p className="font-bold text-slate-900 text-lg mb-2">Is online learning the same as learning over the internet?</p>
          <p className="text-slate-700 text-lg leading-relaxed m-0">
            No. In machine learning, <strong>online</strong> means the model can be updated incrementally as new training data becomes available. The data does not have to come from the internet.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <p className="font-bold text-slate-900 text-lg mb-2">Does online learning update after every single record?</p>
          <p className="text-slate-700 text-lg leading-relaxed m-0">
            Not always. It can update one record at a time or from small mini-batches. The key idea is that it learns incrementally instead of waiting for a complete retraining run.
          </p>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
          <p className="font-bold text-slate-900 text-lg mb-2">Is one approach always better?</p>
          <p className="text-slate-700 text-lg leading-relaxed m-0">
            No. Batch learning is often simpler when data changes slowly. Online learning is useful when frequent adaptation or incremental processing is important.
          </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">Glossary of Key Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Batch Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">Training a model offline on a collected dataset, then deploying that fixed model until the next retraining cycle.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Online Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">Training a model incrementally using new data instances or mini-batches over time; updates do not have to wait for a full retraining cycle.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Concept Drift</p>
          <p className="text-slate-700 text-base leading-relaxed">A change over time in the relationship between input data and the target being predicted, which can reduce model accuracy if the model is not updated.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Out-of-Core Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">A technique used in incremental learning to train on massive datasets that are too large to fit into a computer's physical memory (RAM).</p>
        </div>
      </div>
      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 shadow-sm mb-10">
        <table className="min-w-full text-left bg-white">
          <thead className="bg-slate-100 border-b border-slate-200">
            <tr>
              <th className="p-4 font-bold text-slate-800 text-lg">Architectural Feature</th>
              <th className="p-4 font-bold text-blue-800 text-lg border-l border-slate-200">Batch Learning</th>
              <th className="p-4 font-bold text-amber-700 text-lg border-l border-slate-200">Online Learning</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Data Processing</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">A collected training dataset during a scheduled training run.</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Incrementally, one live instance or small mini-batch at a time.</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Model State in Production</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Usually static between retraining cycles.</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Incrementally updated as new training data becomes available.</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Risk of Degradation</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Usually lower risk from unexpected online updates, but performance can still fall as the model becomes outdated.</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Higher update risk. Bad incoming data can change the model unless validation and monitoring are in place.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-slate-800 text-white p-8 rounded-xl relative overflow-hidden mt-10 mb-10 shadow-lg">
        <BookOpen className="absolute right-4 top-4 h-24 w-24 text-slate-700 opacity-30" />
        <h4 className="text-xl font-bold mt-0 border-b border-slate-600 pb-3 mb-6 text-amber-400">
          Engineering Checkpoint
        </h4>
        <p className="font-bold text-slate-200 text-lg mb-2">Scenario:</p>
        <p className="text-lg bg-slate-700/60 p-5 rounded-lg mb-6 leading-relaxed border border-slate-600">
          You are engineering the machine learning backend for a national weather service. The sensors nationwide push 500 Gigabytes of temperature, humidity, and barometric pressure data every single day. <br /><br />
          Your company only has a small server with 32 GB of RAM available to train models. Which paradigm must you use to train your weather prediction model, and why?
        </p>
        <details className="group cursor-pointer">
          <summary className="font-bold text-amber-400 text-lg outline-none select-none hover:text-amber-300 transition-colors">
            Reveal Engineering Answer
          </summary>
          <div className="mt-4 p-5 bg-emerald-900/40 border border-emerald-800 text-emerald-50 rounded-lg text-lg space-y-3 shadow-inner">
            <p>
              A strong choice is an <strong>incremental, out-of-core learning</strong> approach.
            </p>
            <p className="italic">
              Because the daily dataset (500GB) is much larger than the available RAM (32GB), loading everything into memory at once is not practical. An out-of-core approach can read a manageable chunk, update an incremental model, release that chunk, and continue with the next one. Other disk-based or distributed training designs can also handle datasets larger than RAM, so online learning is not the only possible engineering solution.
            </p>
          </div>
        </details>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Batch Learning is usually simpler to test and control, but it adapts only when retraining happens. Online Learning can adapt more frequently and can work well with large or changing data streams, but it needs careful monitoring because incoming data can influence future predictions. The right choice depends on how quickly your data changes, how often you can retrain, and how much operational control you need.
        </p>
      </div>
    </>
  );
}
