import React from 'react';
import { Database, Zap, ShieldAlert, Activity, Cpu } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, AreaChart, Area } from 'recharts';

const batchVsOnlineData = [
  { time: 'Day 1', batch: 50, online: 50 },
  { time: 'Day 2', batch: 50, online: 60 },
  { time: 'Day 3', batch: 50, online: 70 },
  { time: 'Day 4', batch: 50, online: 75 },
  { time: 'Day 5', batch: 80, online: 80 }, // Batch retraining occurs here
  { time: 'Day 6', batch: 80, online: 85 },
  { time: 'Day 7', batch: 80, online: 88 },
];

const conceptDriftData = [
  { time: 1, accuracy: 95 },
  { time: 2, accuracy: 94 },
  { time: 3, accuracy: 95 },
  { time: 4, accuracy: 90 }, // Drift starts
  { time: 5, accuracy: 75 },
  { time: 6, accuracy: 55 },
  { time: 7, accuracy: 40 },
];

export function OnlineLearningContent() {
  return (
    <div id="online-learning-guide">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Online Learning
      </h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Machine Learning systems are traditionally trained using fixed historical datasets. The model is trained once and then deployed for prediction. This traditional approach is called <strong>Batch Learning</strong> or <em>Offline Learning</em>.
      </p>

      <ul className="list-disc pl-6 space-y-2 text-lg text-slate-800 mb-8">
        <li>Entire dataset is available beforehand</li>
        <li>Training occurs all at once</li>
        <li>Model remains mostly unchanged after deployment</li>
      </ul>

      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        This approach works well for many applications. However, modern real-world systems often generate data continuously (e.g., social media feeds, live stock prices, credit card transactions, streaming platforms, and IoT sensor readings).
      </p>

      <div className="pl-4 border-l-4 border-amber-400 bg-amber-50 py-4 pr-4 rounded-r-md mb-8 shadow-sm">
         <div className="flex items-start">
            <ShieldAlert className="text-amber-600 w-6 h-6 mr-3 mt-1 shrink-0" />
            <div>
               <h4 className="font-bold text-amber-900 text-lg mb-2">The Challenge: Data Never Stops</h4>
               <p className="text-amber-800 leading-relaxed m-0 text-[15px]">
                  If a traditional batch model is retrained repeatedly from scratch on continuous data, training becomes excessively expensive, memory requirements spike, processing becomes too slow, and real-time adaptation becomes practically impossible.
               </p>
            </div>
         </div>
      </div>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        To solve this problem, Machine Learning introduced <strong>Online Learning</strong>. It allows Machine Learning systems to learn continuously from incoming data, instead of waiting for complete datasets.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">What is Online Learning?</h2>
      
      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        Online Learning is a Machine Learning approach where the model updates itself incrementally as new data arrives. Instead of learning from the entire dataset at once, the model learns one observation at a time or in small mini-batches.
      </p>

      <p className="text-lg leading-relaxed mb-8 text-slate-800">
        <strong>The Core Idea:</strong> Learn continuously while data arrives. The model adapts dynamically to new patterns, changing behavior, evolving environments, and streaming data. Just like a child learns continuously from daily experiences and feedback—rather than receiving all knowledge on day one—an online learning model continuously improves over time.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 mt-6">
         <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center"><Database className="w-5 h-5 mr-2 text-indigo-600" /> Batch Learning</h3>
            <p className="text-slate-700 leading-relaxed text-[15px] mb-4">The entire dataset is used at once. You must collect all data, train the model, deploy it, and then retrain it completely later when data becomes stale.</p>
            <ul className="text-sm text-slate-600 space-y-1 pl-0 list-none m-0">
               <li>• High memory usage</li>
               <li>• Slow real-time adaptability</li>
               <li>• High cost for retraining</li>
            </ul>
         </div>
         <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl shadow-sm">
            <h3 className="text-xl font-bold text-slate-800 mb-2 flex items-center"><Zap className="w-5 h-5 mr-2 text-emerald-600" /> Online Learning</h3>
            <p className="text-slate-700 leading-relaxed text-[15px] mb-4">The model updates continuously. When new data is received, the model updates, predicts, and is immediately ready for the next stream of data.</p>
            <ul className="text-sm text-slate-600 space-y-1 pl-0 list-none m-0">
               <li>• Low memory footprint</li>
               <li>• Fast, real-time adaptation</li>
               <li>• Excellent for streaming data</li>
            </ul>
         </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12 flex flex-col md:flex-row">
         <div className="w-full md:w-1/3 p-6 flex flex-col justify-center bg-indigo-50 border-r border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Learning Trajectory</h3>
            <p className="text-indigo-800 text-[15px] leading-relaxed">
              Batch models stagnate until an expensive retraining event occurs (the step). Online learning models incrementally gain knowledge and adapt smoothly to new patterns.
            </p>
         </div>
         <div className="w-full md:w-2/3 p-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
               <LineChart data={batchVsOnlineData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={12} dy={10} />
                  <YAxis domain={[40, 100]} stroke="#64748b" fontSize={12} />
                  <RechartsTooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Legend iconType="circle" />
                  <Line type="stepAfter" dataKey="batch" name="Batch Learning" stroke="#94a3b8" strokeWidth={3} dot={false} />
                  <Line type="monotone" dataKey="online" name="Online Learning" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">The Threat of Concept Drift</h2>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Online learning enables systems to adapt to changing environments. In the real world, the statistical properties of a target variable often change over time in unforeseen ways. This is known as <strong>Concept Drift</strong>.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
             <h4 className="font-bold text-slate-800 flex items-center m-0">
               <Activity className="w-5 h-5 mr-2 text-rose-600" />
               Impact of Concept Drift on Static Models
             </h4>
          </div>
          <div className="p-6 flex-grow" style={{ minHeight: '250px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={conceptDriftData} margin={{ top: 10, right: 10, bottom: 20, left: 0 }}>
                <defs>
                  <linearGradient id="colorAcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#e11d48" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#e11d48" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} dy={10} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={12} />
                <RechartsTooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                <Area type="monotone" dataKey="accuracy" name="Model Accuracy" stroke="#e11d48" fillOpacity={1} fill="url(#colorAcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="flex flex-col justify-center">
            <h4 className="font-bold text-xl text-slate-900 mb-3">Real-Life Example</h4>
            <p className="text-slate-700 leading-relaxed mb-4">
              Fraud detection systems face continuously changing fraud patterns. Fraudsters constantly invent new strategies (Fraud Type A morphs into Fraud Type B). 
            </p>
            <p className="text-slate-700 leading-relaxed mb-0">
              Static (Batch) models become outdated rapidly, and their accuracy drops dramatically as drift occurs. Online learning models adapt automatically, preserving accuracy as the target variable evolves.
            </p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Types of Online Learning</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
           <div className="flex items-center mb-3">
              <span className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full text-xs mr-3">1</span>
              <h4 className="font-bold text-slate-900 text-lg m-0">Pure Online Learning</h4>
           </div>
           <p className="text-slate-600 text-sm leading-relaxed mb-3">
              The model updates after every single data point. When it receives 1 transaction, it updates immediately.
           </p>
           <p className="text-xs font-semibold text-emerald-600 mb-1">Pros: Extremely fast adaptation</p>
           <p className="text-xs font-semibold text-rose-600 m-0">Cons: Sensitive to noisy outliers</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
           <div className="flex items-center mb-3">
              <span className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full text-xs mr-3">2</span>
              <h4 className="font-bold text-slate-900 text-lg m-0">Incremental Learning</h4>
           </div>
           <p className="text-slate-600 text-sm leading-relaxed mb-3">
              The model learns gradually from small chunks of data (e.g., updating after every 100 samples).
           </p>
           <p className="text-xs font-semibold text-emerald-600 m-0">Pros: More stable, efficient memory</p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
           <div className="flex items-center mb-3">
              <span className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full text-xs mr-3">3</span>
              <h4 className="font-bold text-slate-900 text-lg m-0">Mini-Batch Online Learning</h4>
           </div>
           <p className="text-slate-600 text-sm leading-relaxed m-0">
              Standard in Deep Learning. It updates sizes in small mini-batches (e.g., 32 samples). It reduces noise, improves stability, and benefits from vectorized hardware acceleration.
           </p>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
           <div className="flex items-center mb-3">
              <span className="bg-indigo-100 text-indigo-800 font-bold px-3 py-1 rounded-full text-xs mr-3">4</span>
              <h4 className="font-bold text-slate-900 text-lg m-0">Streaming Learning</h4>
           </div>
           <p className="text-slate-600 text-sm leading-relaxed m-0">
              Handles virtually infinite continuous data streams, usually found in IoT devices, sensor networks, or live social media pipelines.
           </p>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">Mathematical Understanding: SGD</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Online learning heavily relies on <strong>Stochastic Gradient Descent (SGD)</strong>. Unlike Batch Gradient Descent which uses the entire dataset to compute gradients, SGD computes the gradient and updates the weights using a <em>single sample</em> (or mini-batch).
      </p>

      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-4 pr-4 rounded-r-md mb-10 shadow-sm">
         <h4 className="font-mono text-slate-800 font-bold text-lg mb-3">SGD Update Formula:</h4>
         <div className="text-xl mb-4 pl-4 text-indigo-800 font-serif">
            w = w - η (∂J / ∂w)
         </div>
         <ul className="text-slate-700 space-y-1 mb-0 list-none pl-0">
            <li><strong>w</strong> = Model weight matrix</li>
            <li><strong>η</strong> (eta) = Learning rate</li>
            <li><strong>J</strong> = Cost function (error)</li>
         </ul>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">Python Implementation (Scikit-Learn)</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        In Scikit-Learn, online learning is implemented via estimators that support the <code>partial_fit()</code> method. This allows the model to learn incrementally without retraining from scratch.
      </p>

      {/* Step-by-Step Code View */}
      <div className="space-y-6 mb-12">
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h4 className="font-bold text-indigo-900 flex items-center m-0">
               <Cpu className="w-5 h-5 mr-2 text-indigo-600" />
               Implementing Online SGD Classifier
            </h4>
          </div>
          <div className="p-0 bg-[#1e1e1e]">
            <pre className="text-[#d4d4d4] font-mono text-sm p-4 overflow-x-auto whitespace-pre-wrap m-0">
<span className="text-emerald-400">from</span> sklearn.linear_model <span className="text-emerald-400">import</span> SGDClassifier
<span className="text-emerald-400">from</span> sklearn.datasets <span className="text-emerald-400">import</span> make_classification
<span className="text-emerald-400">from</span> sklearn.metrics <span className="text-emerald-400">import</span> accuracy_score

<span className="text-slate-500"># 1. Create a dummy streaming dataset</span>
X, y = make_classification(n_samples=1000, n_features=20, random_state=42)

<span className="text-slate-500"># 2. Initialize the SGD Model for Online Learning</span>
model = SGDClassifier(loss=<span className="text-amber-300">"log_loss"</span>)

<span className="text-slate-500"># 3. Incremental Training (Simulating a live stream)</span>
<span className="text-emerald-400">for</span> i <span className="text-emerald-400">in</span> <span className="text-cyan-300">range</span>(<span className="text-cyan-300">len</span>(X)):
    <span className="text-slate-500"># Use partial_fit to update the model one sample at a time</span>
    <span className="text-slate-500"># Important: The classes parameter must be provided on the first call</span>
    model.partial_fit(
        X[i:i+1], 
        y[i:i+1], 
        classes=[0, 1]
    )

<span className="text-slate-500"># 4. Predict and Evaluate</span>
predictions = model.predict(X_test)
<span className="text-cyan-300">print</span>(<span className="text-amber-300">f"Accuracy: &#123;accuracy_score(y_test, predictions)&#125;"</span>)
            </pre>
            <div className="bg-slate-800 p-4 border-t border-slate-700 text-slate-300 text-sm">
               <strong>Note:</strong> <code>partial_fit()</code> is the core mechanism here. It updates the weights slightly based on the current sample, then remembers those weights for the next iteration.
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Advantages & Disadvantages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl">
           <h4 className="text-green-900 font-bold mb-4 flex items-center text-xl m-0">
             Benefits
           </h4>
           <ul className="space-y-3 text-green-800 m-0 pl-0 list-none">
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2 text-lg leading-none">✓</span> Real-Time Adaptation to concept drift and changing environments.</li>
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2 text-lg leading-none">✓</span> Memory Efficient as it does not require storing the full massive dataset in RAM.</li>
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2 text-lg leading-none">✓</span> Faster Updates without the exorbitant computational cost of starting from scratch.</li>
             <li className="flex items-start"><span className="text-green-600 font-bold mr-2 text-lg leading-none">✓</span> Excellent for Live Streaming infrastructure, IoT, and high-frequency trading.</li>
           </ul>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl">
           <h4 className="text-red-900 font-bold mb-4 flex items-center text-xl m-0">
             Risks & Disadvantages
           </h4>
           <ul className="space-y-3 text-red-800 m-0 pl-0 list-none">
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2 text-lg leading-none">×</span> Sensitive to Noise. A stream of corrupted or anomalous data will actively break the live model.</li>
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2 text-lg leading-none">×</span> Catastrophic Forgetting. The model may focus too much on recent trends and entirely forget older baseline patterns.</li>
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2 text-lg leading-none">×</span> Tricky Learning Rate. Tuning how aggressively the model updates is difficult in production.</li>
             <li className="flex items-start"><span className="text-red-600 font-bold mr-2 text-lg leading-none">×</span> Security Risks. Poisoning attacks where adversaries stream fake data to manipulate the model.</li>
           </ul>
        </div>
      </div>

      {/* ── ALGORITHMS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Key Online Learning Algorithms</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Several algorithms are specifically designed for online learning scenarios. Here are the most widely used in production systems:
      </p>
      <div className="space-y-4 mb-10 not-prose">
        {[
          { num:"01", name:"Stochastic Gradient Descent (SGD)", color:"indigo",
            desc:"The workhorse of online learning. Updates model weights using the gradient computed from a single sample or mini-batch. Extremely memory efficient — only one sample needs to be in memory at a time. The foundation of all deep learning training.",
            use:"Neural networks, linear classifiers, large-scale NLP. Used by TensorFlow and PyTorch internally for every training step.",
            sklearn:"SGDClassifier, SGDRegressor — both support partial_fit()" },
          { num:"02", name:"Passive-Aggressive Algorithms", color:"blue",
            desc:"A family of online learning algorithms that are passive when a prediction is correct (weights unchanged) and aggressive when a prediction is wrong (weights updated as little as possible to correct the mistake). Parameter C controls aggressiveness.",
            use:"Real-time text classification, spam detection, sentiment analysis on streaming data.",
            sklearn:"PassiveAggressiveClassifier, PassiveAggressiveRegressor" },
          { num:"03", name:"Perceptron", color:"emerald",
            desc:"The oldest online learning algorithm. Updates weights only when a misclassification occurs — zero update on correct predictions. Guaranteed to converge if data is linearly separable. The conceptual ancestor of all neural networks.",
            use:"Binary classification on linearly separable streaming data, educational demonstrations of online learning.",
            sklearn:"Perceptron — supports partial_fit()" },
          { num:"04", name:"Hoeffding Trees (VFDT)", color:"amber",
            desc:"A decision tree algorithm designed for data streams. Uses the Hoeffding bound (a statistical guarantee) to decide when enough examples have been seen to confidently choose a split. Can process millions of examples with bounded memory.",
            use:"IoT sensor stream classification, network intrusion detection, real-time weather pattern detection.",
            sklearn:"Available in the River library — river.tree.HoeffdingTreeClassifier" },
          { num:"05", name:"ADWIN (Adaptive Windowing)", color:"violet",
            desc:"A change detection algorithm that maintains a variable-length window of recent data. Automatically shrinks the window when concept drift is detected (distribution changes), keeping only the most relevant recent data for model updates.",
            use:"Any online learning system that needs automatic concept drift detection without manual threshold setting.",
            sklearn:"Available in River — river.drift.ADWIN" },
        ].map(a => (
          <div key={a.num} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className={`bg-${a.color}-600 px-5 py-3 flex items-center gap-3`}>
              <span className="text-white/60 font-black text-xl">{a.num}</span>
              <h3 className="text-white font-bold text-base">{a.name}</h3>
            </div>
            <div className="p-5 space-y-3">
              <p className="text-slate-700 text-sm leading-relaxed">{a.desc}</p>
              <div className="grid sm:grid-cols-2 gap-2">
                <div className="bg-slate-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-slate-500 uppercase mb-1">Use cases</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{a.use}</p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-xs font-bold text-indigo-500 uppercase mb-1">Implementation</p>
                  <p className="text-xs font-mono text-indigo-700">{a.sklearn}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── LEARNING RATE SCHEDULING ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Learning Rate Scheduling in Online Learning</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        The learning rate η determines how aggressively the model updates on each new sample. A fixed learning rate is rarely optimal — too high causes instability, too low causes slow adaptation. Learning rate schedules automatically adjust η over time:
      </p>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm mb-8">
        <table className="w-full text-sm">
          <thead className="bg-indigo-600 text-white">
            <tr>
              <th className="p-3 text-left">Schedule</th>
              <th className="p-3 text-left">Formula</th>
              <th className="p-3 text-left">Behaviour</th>
              <th className="p-3 text-left">Best for</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ["Constant","η = η₀","Never changes","Tracking concept drift — need fast adaptation forever"],
              ["Inverse scaling","η = η₀ / t^0.25","Slowly decreases over time","Stationary data — want stability as model matures"],
              ["Optimal (Pegasos)","η = 1 / (λ × t)","Decreases proportional to step","SVM-style online learning with L2 regularisation"],
              ["Adaptive (AdaGrad)","η_i = η₀ / √(sum of past gradients)","Per-feature rates, auto-decreases","Sparse data — rare features get higher effective rate"],
            ].map(([s,f,b,u]) => (
              <tr key={s} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-indigo-700">{s}</td>
                <td className="p-3 font-mono text-xs text-slate-600">{f}</td>
                <td className="p-3 text-xs text-slate-600">{b}</td>
                <td className="p-3 text-xs text-emerald-700">{u}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── REAL WORLD SYSTEMS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Real-World Online Learning Systems</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Some of the most impactful production ML systems in the world rely on online learning to stay current with rapidly changing user behaviour:
      </p>
      <div className="grid md:grid-cols-2 gap-5 mb-8 not-prose">
        {[
          { icon:"🎯", title:"Google Ads CTR Prediction", color:"blue",
            desc:"Google processes billions of ad impressions per day. The click-through rate prediction model updates in real time with each click or non-click event. A model trained last week is already stale — online learning keeps it current with current user intent and market conditions." },
          { icon:"💳", title:"Visa / Mastercard Fraud Detection", color:"rose",
            desc:"Fraud patterns change daily as criminals adapt. Batch models trained monthly cannot keep up. Online learning models update with every transaction — if a new fraud pattern emerges at 2am, the model detects it by 3am without any human intervention." },
          { icon:"📱", title:"TikTok / Instagram Feed Ranking", color:"violet",
            desc:"User preferences shift hourly. A video that was trending yesterday may be irrelevant today. Recommendation models update continuously with each watch event, like, and scroll-past, keeping the feed aligned with current mood and interests." },
          { icon:"🏭", title:"Industrial IoT Predictive Maintenance", color:"amber",
            desc:"Sensors on factory machines stream readings continuously. Online learning models learn each machine's unique baseline pattern and alert when readings deviate — identifying potential failures hours before they occur, saving millions in downtime costs." },
        ].map(a => (
          <div key={a.title} className={`bg-${a.color}-50 border border-${a.color}-200 rounded-xl p-5`}>
            <div className="text-3xl mb-2">{a.icon}</div>
            <h3 className={`font-bold text-${a.color}-900 text-base mb-2`}>{a.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{a.desc}</p>
          </div>
        ))}
      </div>

      {/* ── RIVER LIBRARY ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">The River Library — Online ML in Python</h2>
      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        While sklearn supports online learning via <code className="bg-slate-100 px-1 rounded text-sm">partial_fit()</code>, the <strong>River</strong> library is built from the ground up for streaming data. Every algorithm in River processes one sample at a time:
      </p>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm mb-8 not-prose">
        <div className="bg-slate-800 px-4 py-2 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400"/>
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"/>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400"/>
          <span className="text-slate-300 text-xs ml-1">river_online_learning.py</span>
        </div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-4 text-sm font-mono overflow-x-auto leading-relaxed">{`# pip install river
from river import linear_model, preprocessing, metrics, stream

# River uses a pipeline that processes one sample at a time
model = preprocessing.StandardScaler() | linear_model.LogisticRegression()
metric = metrics.Accuracy()

# Simulate a data stream — process one record at a time
from sklearn.datasets import make_classification
import numpy as np

X, y = make_classification(n_samples=1000, n_features=10, random_state=42)

for xi, yi in stream.iter_array(X, y):
    # 1. Predict BEFORE learning (realistic evaluation)
    y_pred = model.predict_one(xi)

    # 2. Update metric
    metric.update(yi, y_pred)

    # 3. Learn from this sample
    model.learn_one(xi, yi)

print(f"Running accuracy: {metric}")
# Output: Running accuracy: Accuracy: 89.30%

# Key insight: model.learn_one() and model.predict_one()
# process exactly ONE sample — perfect for streaming pipelines`}</pre>
      </div>

      {/* ── WHEN TO USE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Batch vs Online — When to Choose Each</h2>
      <div className="grid sm:grid-cols-2 gap-4 mb-8 not-prose">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <h3 className="font-bold text-green-800 mb-3">✅ Choose Online Learning when</h3>
          <ul className="space-y-2 text-sm text-green-700">
            <li className="flex items-start gap-2"><span>•</span>Data arrives continuously as a stream</li>
            <li className="flex items-start gap-2"><span>•</span>Dataset is too large to fit in memory</li>
            <li className="flex items-start gap-2"><span>•</span>Distribution shifts over time (concept drift)</li>
            <li className="flex items-start gap-2"><span>•</span>Real-time adaptation is a business requirement</li>
            <li className="flex items-start gap-2"><span>•</span>Retraining from scratch is too computationally expensive</li>
          </ul>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-800 mb-3">✅ Stick with Batch Learning when</h3>
          <ul className="space-y-2 text-sm text-amber-700">
            <li className="flex items-start gap-2"><span>•</span>Full historical dataset is available and fits in memory</li>
            <li className="flex items-start gap-2"><span>•</span>Distribution is stable — past data represents future well</li>
            <li className="flex items-start gap-2"><span>•</span>Model interpretability and reproducibility are required</li>
            <li className="flex items-start gap-2"><span>•</span>Training frequency can be weekly or monthly</li>
            <li className="flex items-start gap-2"><span>•</span>Complex models (deep CNNs, large ensembles) are needed</li>
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Online Learning is a paradigm where Machine Learning models learn continuously from incoming data streams, rather than training statically on historical, offline batches. It is a mandatory architecture for systems operating in dynamic, real-time environments like high-frequency trading, real-time fraud detection, ad-click prediction, and large-scale recommendation systems.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed m-0">
          The real world doesn't stand still, and neither should your models. Online learning fights the inevitable decay known as "Concept Drift" by allowing models to adapt incrementally, utilizing real-time optimization algorithms like Stochastic Gradient Descent.
        </p>
      </div>

    </div>
  );
}
