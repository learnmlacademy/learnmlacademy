import React from "react";
import {
  Database,
  Zap,
  RefreshCw,
  Box,
  CheckCircle2,
  XCircle,
  BookOpen,
} from "lucide-react";

export function BatchVsOnlineContent() {
  return (
    <>
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Batch vs Online Learning</h1>

      <p className="lead text-xl text-slate-600 mb-8 border-l-4 border-slate-500 pl-4 py-1 bg-slate-50">
        When conceptualizing how a Machine Learning system will intake data and
        update its parameters during its lifecycle, you must choose a training
        paradigm: Batch Learning or Online Learning. This dictates how
        frequently your model learns.
      </p>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Key Concepts to Understand
      </h2>
      <div className="grid md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-slate-800 block mb-1">
            Learning Rate / Step Size
          </strong>
          <p className="text-sm text-slate-600 m-0">
            How drastically the model adjusts its internal parameters when it
            sees new data. In online learning, a high learning rate means it
            rapidly forgets old data to adapt to the new.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-slate-800 block mb-1">
            Data Drift / Concept Drift
          </strong>
          <p className="text-sm text-slate-600 m-0">
            When the fundamental statistical properties of the target variable
            change over time (e.g., consumer behavior changing during a
            pandemic). Online learning handles this naturally; batch learning
            requires completely rebuilding.
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-slate-800 block mb-1">
            Out-of-Core Learning
          </strong>
          <p className="text-sm text-slate-600 m-0">
            A technique used when a dataset is so massive it cannot fit into a
            computer's main memory (RAM). The algorithm loads data in chunks,
            trains on that chunk, discards the data, and loads the next. (This
            is considered Online Learning applied to an offline dataset).
          </p>
        </div>
        <div className="p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
          <strong className="text-slate-800 block mb-1">Mini-batches</strong>
          <p className="text-sm text-slate-600 m-0">
            Instead of feeding one single row of data at a time (pure online),
            feeding small groups of data (e.g., 32 or 64 rows) allows faster
            hardware processing via GPU vectorization.
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 my-10">
        {/* Batch Learning */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
              <Box className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">
              Batch Learning
            </h2>
          </div>
          <p className="text-slate-600 text-sm flex-1">
            Also known as <strong>Offline Learning</strong>. The system is
            incapable of learning incrementally. It must be trained using all
            the available historical data at once. Once trained, the model
            parameters are locked, and it is deployed to production where it
            just predicts (it does not learn anything new on the fly).
          </p>

          <div className="mt-6 bg-slate-50 border border-slate-100 p-4 rounded-lg space-y-3 test-sm">
            <div>
              <strong className="text-slate-800 block text-sm">
                Update Process:
              </strong>
              <p className="text-slate-600 text-sm mt-1">
                To update a Batch model with new data (say, the newest week's
                transactions), you have to gather the full historical dataset
                PLUS the new week's data. You train a totally new version of the
                system from absolute scratch (often taking hours or days). You
                then swap the old model out with the new model.
              </p>
            </div>
            <div>
              <strong className="text-slate-800 block text-sm mt-3 border-t border-slate-200 pt-3">
                Examples:
              </strong>
              <p className="text-slate-600 text-sm mt-1 mb-1">
                A monthly sales forecasting system, or an annual property
                valuation model.
              </p>
            </div>
          </div>
        </div>

        {/* Online Learning */}
        <div className="bg-white border rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center shrink-0">
              <Zap className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 m-0">
              Online Learning
            </h2>
          </div>
          <p className="text-slate-600 text-sm flex-1">
            Also known as <strong>Incremental Learning</strong>. The system is
            trained incrementally by continuously feeding it data instances
            sequentially, either individually or by small groups (mini-batches).
            The parameters adjust continuously in production.
          </p>

          <div className="mt-6 bg-slate-50 border border-slate-100 p-4 rounded-lg space-y-3 test-sm">
            <div>
              <strong className="text-slate-800 block text-sm">
                Update Process:
              </strong>
              <p className="text-slate-600 text-sm mt-1">
                The deployed model receives a new stream of data. It makes a
                prediction, compares it against the true outcome, calculates the
                error, and instantly tweaks its internal weights. It then
                discards the data to save memory.
              </p>
            </div>
            <div>
              <strong className="text-slate-800 block text-sm mt-3 border-t border-slate-200 pt-3">
                Examples:
              </strong>
              <p className="text-slate-600 text-sm mt-1 mb-1">
                High-frequency trading algorithms predicting stock prices, or
                TikTok's algorithm adjusting to your scrolling real-time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Advantages & Limitations
      </h2>
      <div className="grid md:grid-cols-2 gap-8 my-6">
        <div>
          <h3 className="font-bold text-lg text-slate-900 border-b border-slate-200 pb-2 mb-4">
            Batch Learning
          </h3>
          <ul className="space-y-4 text-sm mt-4">
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Stable & Safe:</strong> Because the model is trained
                offline, you can rigorously test it before replacing the live
                system. It won't suddenly "go crazy" from bad data in
                production.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Simpler Architecture:</strong> Much easier to implement,
                monitor, and rollback than continuous learning systems.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Resource Heavy:</strong> Retraining from scratch
                requires reading massive historical datasets repeatedly, costing
                server time and money.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Stale Predictions:</strong> The model's knowledge stops
                at the date it was trained. It cannot adapt to sudden shifts
                (like a viral news event).
              </span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-900 border-b border-slate-200 pb-2 mb-4">
            Online Learning
          </h3>
          <ul className="space-y-4 text-sm mt-4">
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Highly Adaptive:</strong> Instantly catches onto new
                trends. Perfect for fraud detection where hackers rapidly change
                their methods.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Memory Efficient:</strong> Since the model learns and
                discards the data, you don't need a massive database in RAM. Can
                run on small edge devices (IoT, smartphones).
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Data Vulnerability:</strong> A massive risk. If broken
                sensors start feeding faulty data to the live model, its
                performance will degrade instantly in production.
              </span>
            </li>
            <li className="flex gap-2 items-start">
              <XCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />{" "}
              <span className="text-slate-700">
                <strong>Complex Architecture:</strong> Requires complex
                engineering to monitor system health and pause learning if data
                quality drops.
              </span>
            </li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">
        Direct Comparison
      </h2>
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse text-left border border-slate-200 rounded-lg shadow-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="py-3 px-4 border border-slate-200 font-bold text-slate-700">
                Feature
              </th>
              <th className="py-3 px-4 border border-slate-200 font-bold text-blue-700">
                Batch Learning
              </th>
              <th className="py-3 px-4 border border-slate-200 font-bold text-amber-600">
                Online Learning
              </th>
            </tr>
          </thead>
          <tbody className="bg-white text-sm text-slate-700">
            <tr>
              <td className="py-3 px-4 border border-slate-200 font-semibold bg-slate-50">
                Data Processing
              </td>
              <td className="py-3 px-4 border border-slate-200">
                Entire dataset all at once.
              </td>
              <td className="py-3 px-4 border border-slate-200">
                Incrementally, one instance or a mini-batch at a time.
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 border border-slate-200 font-semibold bg-slate-50">
                Model State in Prod
              </td>
              <td className="py-3 px-4 border border-slate-200">
                Static (predicts only).
              </td>
              <td className="py-3 px-4 border border-slate-200">
                Dynamic (predicts and updates).
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 border border-slate-200 font-semibold bg-slate-50">
                Hardware & Costs
              </td>
              <td className="py-3 px-4 border border-slate-200">
                High computational spikes during training, heavy storage.
              </td>
              <td className="py-3 px-4 border border-slate-200">
                Continuous lightweight compute, minimal storage (Out-of-core).
              </td>
            </tr>
            <tr>
              <td className="py-3 px-4 border border-slate-200 font-semibold bg-slate-50">
                Risk of Degradation
              </td>
              <td className="py-3 px-4 border border-slate-200">
                Low in production. Fails gracefully by just being "outdated".
              </td>
              <td className="py-3 px-4 border border-slate-200">
                High. Bad data can immediately poison the live algorithm.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-800 border-b pb-2">
        Practice Checkpoint
      </h2>
      <div className="bg-slate-800 text-white p-6 rounded-xl relative overflow-hidden">
        <BookOpen className="absolute right-4 top-4 h-16 w-16 text-slate-700 opacity-50" />
        <h4 className="text-lg font-bold mt-0 border-b border-slate-600 pb-2 mb-4 text-amber-300">
          Test Your Engineering Choices
        </h4>
        <p className="font-medium text-slate-200">Scenario:</p>
        <p className="text-sm bg-slate-700/50 p-3 rounded mb-4">
          You are engineering the machine learning backend for a national
          weather service. The sensors nationwide push 500 Gigabytes of
          temperature, humidity, and barometric pressure data every single day.{" "}
          <br />
          <br />
          Your company only has a small server with 32 GB of RAM available to
          train models. Which paradigm must you use to train your weather
          prediction model?
        </p>
        <details className="group cursor-pointer">
          <summary className="font-bold text-amber-400 outline-none select-none">
            Reveal Answer
          </summary>
          <div className="mt-3 p-4 bg-emerald-900/40 border border-emerald-800/50 text-emerald-100 rounded text-sm space-y-2">
            <p>
              You must use an <strong>Online Learning</strong> approach
              (specifically, <strong>Out-of-Core Learning</strong>).
            </p>
            <p>
              Because the dataset (500GB) is vastly larger than your available
              memory (32GB), you cannot load the full dataset into RAM to do
              Batch Learning. You must load a chunk of data, train the model
              incrementally, clear the RAM, and then load the next chunk.
            </p>
          </div>
        </details>
      </div>
    </>
  );
}
