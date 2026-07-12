import React from "react";
import { AnimatedBatchVsOnline } from "../../components/diagrams/AnimatedFoundationDiagrams";

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
      <AnimatedBatchVsOnline />

        </div>
        
        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md">
          <strong className="text-slate-900 text-lg block mb-1">
            Data Drift (Concept Drift)
          </strong>
          <p className="text-lg text-slate-700 m-0 leading-relaxed">
            This occurs when the fundamental statistical properties of the real world change over time (e.g., consumer purchasing behavior shifting dramatically during a global pandemic). Online learning handles drift naturally by adapting on the fly. Batch models will silently fail until manually rebuilt.
          </p>
        </div>

        <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-3 pr-4 rounded-r-md">
          <strong className="text-slate-900 text-lg block mb-1">
            Out-of-Core Learning
          </strong>
          <p className="text-lg text-slate-700 m-0 leading-relaxed">
            An engineering technique used when a dataset is so impossibly massive (e.g., Petabytes of data) that it cannot physically fit into a computer's main memory (RAM). The algorithm streams data in chunks, trains on that chunk, discards it to clear RAM, and loads the next. (This is essentially Online Learning applied to an offline, static dataset).
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
          <h2 className="text-2xl font-bold text-slate-900 m-0">
            Batch Learning (Offline Learning)
          </h2>
        </div>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          The system is entirely incapable of learning incrementally. It must be trained using <em>all</em> available historical data at once in a massive computational job. Once trained, the mathematical parameters are locked, and it is deployed to production where it just predicts. It learns absolutely nothing new while running live.
        </p>

        <strong className="text-slate-900 block text-lg mb-2">
          The Update Process:
        </strong>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          To update a Batch model with the newest week's data, you cannot just "add" the new knowledge. You must gather the full historical dataset <em>plus</em> the new week's data, spin up heavy cloud servers, and train a totally new version of the system from absolute scratch (taking hours or days). You then swap the old model out with the new model.
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
          <h2 className="text-2xl font-bold text-slate-900 m-0">
            Online Learning (Incremental Learning)
          </h2>
        </div>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          The system is trained dynamically and incrementally by continuously feeding it data instances sequentially as they arrive. The model's parameters adjust continuously in the live production environment.
        </p>

        <strong className="text-slate-900 block text-lg mb-2">
          The Update Process:
        </strong>
        <p className="text-slate-800 text-lg leading-relaxed mb-6">
          The deployed model receives a new live stream of data. It makes a prediction, compares it against the true outcome, calculates its error mathematically, and instantly tweaks its internal weights to correct itself. It then permanently discards that data instance to save memory and moves to the next.
        </p>

        <strong className="text-slate-900 block text-lg mb-2 border-t border-amber-200 pt-4">
          Real-World Applications:
        </strong>
        <p className="text-slate-800 text-lg leading-relaxed">
          High-frequency algorithmic trading bots predicting stock micro-fluctuations, TikTok's recommendation engine adjusting to your scrolling behavior in real-time, or live fraud detection networks blocking stolen credit cards.
        </p>
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
            <strong>Stable & Highly Safe:</strong> Because the model is trained entirely offline, engineering teams can rigorously test and validate its accuracy before replacing the live system. It won't suddenly "go crazy" if fed bad data in production because its parameters are locked.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Simpler Architecture:</strong> Vastly easier to implement, monitor, and rollback than continuous live-learning systems.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <XCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Resource Heavy & Expensive:</strong> Retraining from scratch requires reading massive historical datasets repeatedly, causing massive spikes in server compute costs.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <XCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Stale Predictions:</strong> The model's knowledge stops at the exact date it was trained. It is blind to sudden shifts (like a viral news event or a sudden stock market crash) until it is manually retrained.
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
            <strong>Highly Adaptive to Drift:</strong> Instantly catches onto new trends. Perfect for cyber-security and fraud detection where hackers rapidly and constantly change their attack vectors.
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Memory Efficient:</strong> Since the model learns from an instance and immediately discards the data, you don't need massive RAM to hold the dataset. Models can run effectively on edge devices (IoT sensors, smartphones).
          </span>
        </li>
        <li className="flex gap-3 items-start">
          <XCircle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" /> 
          <span className="text-slate-800">
            <strong>Catastrophic Data Vulnerability:</strong> A massive engineering risk. If broken sensors, a bug, or malicious hackers start feeding faulty/poisoned data to the live model, its performance will degrade instantly in production, potentially causing automated systems to fail.
          </span>
        </li>
      </ul>

      
      <h2 className="text-2xl font-bold mt-12 mb-6 text-indigo-800 border-b pb-2">Glossary of Key Terms</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Batch Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">Training a model using the entire historical dataset all at once in a static, offline environment.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Online Learning</p>
          <p className="text-slate-700 text-base leading-relaxed">Training a model incrementally by feeding it data instances or mini-batches sequentially as they arrive in real-time.</p>
        </div>
        <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl shadow-sm">
          <p className="font-bold text-indigo-900 text-lg mb-1">Concept Drift</p>
          <p className="text-slate-700 text-base leading-relaxed">The phenomenon where the statistical properties of the target variable change over time in the real world, causing model accuracy to silently degrade.</p>
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
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">The entire historical dataset all at once.</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Incrementally, one live instance or small mini-batch at a time.</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Model State in Production</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Static (It predicts only, it never learns).</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Dynamic (It predicts and continuously updates).</td>
            </tr>
            <tr className="hover:bg-slate-50">
              <td className="p-4 font-bold text-slate-900">Risk of Degradation</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Low live risk. Fails gracefully simply by becoming "outdated."</td>
              <td className="p-4 text-slate-700 text-lg border-l border-slate-100">Extreme live risk. Bad data can immediately poison the live algorithm.</td>
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
              You must use an <strong>Online Learning</strong> approach (specifically the technique known as <strong>Out-of-Core Learning</strong>).
            </p>
            <p className="italic">
              Because the daily dataset (500GB) is vastly larger than your available physical memory (32GB), you physically cannot load the full dataset into RAM to execute a Batch Learning training run. You must stream a chunk of data, train the model incrementally, clear the RAM, and then load the next chunk.
            </p>
          </div>
        </details>
      </div>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed">
          Batch Learning is safe, stable, and easy to deploy, but it is slow to adapt and expensive to update. Online Learning is highly adaptive and memory-efficient, but it introduces massive engineering risks if the live data stream is corrupted or poisoned. The choice depends entirely on your system's required speed of adaptation versus its tolerance for failure.
        </p>
      </div>
    </>
  );
}
