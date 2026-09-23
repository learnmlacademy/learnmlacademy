import React from 'react';
import { DeepLearningIllustratedExample } from './DeepLearningIllustratedExample';

export function DeepLearningIntroContent() {
  return (
    <div className="space-y-8">
      <p className="text-lg text-slate-500 mb-6">Understand the complete learning process first, then see which neural-network family fits images, sequences, text, graphs and generation.</p>

      {/* ── WHAT IS DEEP LEARNING ── */}
      <div className="not-prose bg-gradient-to-br from-indigo-50 via-white to-violet-50 border border-indigo-200 rounded-2xl p-6 md:p-8">
        <p className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">Start with the big idea</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
          Deep Learning = neural networks learning useful representations in stages
        </h2>
        <p className="text-slate-700 leading-relaxed mb-6">
          Imagine teaching a computer to recognize a cat in a photo. A traditional approach might require humans to design useful features first. A deep network can instead learn increasingly useful internal representations from data.
        </p>
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 text-center">
          {[
            ['Pixels', 'raw image values'],
            ['Simple patterns', 'edges and textures'],
            ['Larger patterns', 'eyes, ears, shapes'],
            ['Prediction', 'cat'],
          ].map(([title, caption], index) => (
            <React.Fragment key={title}>
              <div className="flex-1 bg-white border border-indigo-100 rounded-xl p-4">
                <div className="font-bold text-indigo-900">{title}</div>
                <div className="text-xs text-slate-600 mt-1">{caption}</div>
              </div>
              {index < 3 && <span className="text-indigo-400 font-bold text-xl rotate-90 md:rotate-0">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <p className="text-lg leading-relaxed">
        Deep Learning is a subfield of Machine Learning built around neural networks with multiple learned layers. These layers can learn useful representations directly from data, reducing the need to hand-design every feature. Deep learning is especially influential in areas such as computer vision, speech, natural-language processing, recommendation, and generative AI.
      </p>

      <div className="not-prose bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
        <p className="text-amber-900 m-0 leading-relaxed">
          <strong>“Deep” does not mean “more intelligent.”</strong> It refers to the use of multiple learned layers between input and output. A deeper network is not automatically better; architecture, data, compute, optimization, and regularization all matter.
        </p>
      </div>

      <DeepLearningIllustratedExample topicId="deep-learning-intro" />

      {/* ML vs DL comparison table */}
      <div className="not-prose my-8">
        <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Figure 1 — Traditional ML vs Deep Learning</p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="p-3 text-left">Aspect</th>
                <th className="p-3 text-left">Traditional ML</th>
                <th className="p-3 text-left">Deep Learning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {[
                ['Feature Engineering','Often relies more on hand-designed or precomputed features','Can learn many useful representations directly from data'],
                ['Data Required','Often effective on small to medium structured datasets','Frequently benefits from larger datasets, though transfer learning can reduce data needs'],
                ['Compute','Often practical on CPUs','Training larger models often benefits greatly from GPUs / TPUs'],
                ['Interpretability','Varies by model; some methods are easier to inspect','Often harder to interpret directly, though many explanation tools exist'],
                ['Typical strengths','Often strong and efficient for structured/tabular data','Often strong for images, audio, text, video, and large-scale representation learning'],
                ['Examples','XGBoost, SVM, Random Forest','CNNs, RNNs, Transformers'],
              ].map(([a,b,c]) => (
                <tr key={a} className="hover:bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700">{a}</td>
                  <td className="p-3 text-slate-600">{b}</td>
                  <td className="p-3 text-indigo-700 font-medium">{c}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── WHY NOW ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">What Does “Learn Features Automatically” Actually Mean?</h2>
      <p className="text-lg leading-relaxed mb-5">
        The phrase sounds magical, but the idea is simple: each layer transforms the representation it receives. Later layers work with the patterns produced by earlier ones.
      </p>
      <div className="not-prose grid md:grid-cols-4 gap-4 mb-8">
        {[
          ['Layer 0', 'Raw input', 'pixels'],
          ['Layer 1', 'Simple structure', 'edges'],
          ['Layer 2', 'Combined structure', 'corners / textures'],
          ['Later layers', 'Task-specific patterns', 'object parts / classes'],
        ].map(([stage, title, example]) => (
          <div key={stage} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className="text-xs font-bold text-indigo-600 uppercase mb-1">{stage}</div>
            <div className="font-bold text-slate-900">{title}</div>
            <div className="text-xs text-slate-600 mt-1">Example: {example}</div>
          </div>
        ))}
      </div>
      <p className="text-lg leading-relaxed mb-8">
        These representations are learned because they help reduce the training objective. They are not manually named or guaranteed to correspond perfectly to human concepts.
      </p>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Why Did Modern Deep Learning Accelerate Around 2012?</h2>
      <p className="text-lg leading-relaxed mb-4">
        Neural-network research began decades before 2012, with important work on artificial neurons, perceptrons, backpropagation and convolutional networks. AlexNet&apos;s 2012 ImageNet result was a major modern turning point for computer vision: it showed how a large labelled dataset, GPU computation and an effective convolutional architecture could work together at scale. It was not the birth of neural networks. Three broad forces helped deep learning become practical across more tasks:
      </p>
      <div className="not-prose grid md:grid-cols-3 gap-5 my-6">
        {[
          {icon:'🗄️', title:'More useful data', card:'bg-indigo-50 border-indigo-200', heading:'text-indigo-900', desc:'Larger labelled and unlabelled collections made it possible to learn richer representations. More data can help when it is relevant, correctly labelled and representative; duplicated, biased or mismatched data can instead preserve or amplify errors.'},
          {icon:'⚡', title:'Accelerator hardware', card:'bg-emerald-50 border-emerald-200', heading:'text-emerald-900', desc:'GPUs can perform many multiply-and-add operations in parallel. This can greatly shorten training for sufficiently large workloads, although speed-up depends on model size, data transfer, software kernels and the specific hardware.'},
          {icon:'🧪', title:'Better training methods', card:'bg-amber-50 border-amber-200', heading:'text-amber-900', desc:'ReLU-family activations, improved initialization, normalization, residual connections, regularization and optimizers made many deep models easier to train. Each addresses particular difficulties; none eliminates every optimization or generalization problem.'},
        ].map(f => (
          <div key={f.title} className={`${f.card} border rounded-xl p-5`}>
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className={`${f.heading} font-bold text-lg mb-2`}>{f.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── DEEP NETWORK ARCHITECTURE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Why Stack Layers at All?</h2>
      <p className="text-lg leading-relaxed mb-5">
        A single layer can learn one transformation. By stacking layers, the network can compose transformations and represent more complicated relationships.
      </p>
      <div className="not-prose bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
        <p className="font-mono text-sm md:text-base m-0">input → layer 1 → layer 2 → layer 3 → output</p>
        <p className="text-sm text-slate-700 mt-3 mb-0">
          Each layer receives the previous layer's representation, transforms it, and passes a new representation forward.
        </p>
      </div>
      <div className="not-prose bg-rose-50 border border-rose-200 rounded-xl p-5 mb-10">
        <p className="text-rose-900 m-0"><strong>Important:</strong> simply adding layers does not guarantee improvement. Very deep networks can be harder to train, slower, and easier to overfit without good architecture and regularization.</p>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Deep Network Architecture — Layers Explained</h2>
      <p className="text-lg leading-relaxed mb-4">
        A deep neural network stacks many neuron layers. Each layer transforms its input into a richer representation that the next layer builds upon:
      </p>

      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
            Figure 3 — Deep Neural Network with 2 Hidden Layers
          </figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 640 280" className="w-full max-w-2xl mx-auto block" aria-label="Deep neural network diagram showing input layer with 3 nodes, two hidden layers with 4 nodes each, and output layer with 2 nodes">
              {/* Layer labels */}
              {[['Input\nLayer',80],['Hidden\nLayer 1',220],['Hidden\nLayer 2',380],['Output\nLayer',540]].map(([label,x]) => (
                <text key={String(x)} x={Number(x)} y="268" textAnchor="middle" fontSize="11" fill="#64748b" fontWeight="600">{String(label).split('\n').map((l,i)=><tspan key={i} x={Number(x)} dy={i===0?0:13}>{l}</tspan>)}</text>
              ))}
              {/* Input nodes (3) */}
              {[60,130,200].map((y,i)=>(
                <g key={y}>
                  <circle cx="80" cy={y} r="20" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2"/>
                  <text x="80" y={y+5} textAnchor="middle" fontSize="12" fill="#3730a3" fontWeight="700">x{i+1}</text>
                </g>
              ))}
              {/* Hidden layer 1 nodes (4) */}
              {[45,100,160,215].map((y,i)=>(
                <g key={y}>
                  <circle cx="220" cy={y} r="20" fill="#6366f1" stroke="#4338ca" strokeWidth="2"/>
                  <text x="220" y={y+5} textAnchor="middle" fontSize="11" fill="white" fontWeight="700">h{i+1}</text>
                </g>
              ))}
              {/* Hidden layer 2 nodes (4) */}
              {[45,100,160,215].map((y,i)=>(
                <g key={y}>
                  <circle cx="380" cy={y} r="20" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                  <text x="380" y={y+5} textAnchor="middle" fontSize="11" fill="white" fontWeight="700">h{i+1}</text>
                </g>
              ))}
              {/* Output nodes (2) */}
              {[90,170].map((y,i)=>(
                <g key={y}>
                  <circle cx="540" cy={y} r="20" fill="#10b981" stroke="#059669" strokeWidth="2"/>
                  <text x="540" y={y+5} textAnchor="middle" fontSize="11" fill="white" fontWeight="700">o{i+1}</text>
                </g>
              ))}
              {/* Connections input→h1 */}
              {[60,130,200].map(iy=>[45,100,160,215].map(hy=>(
                <line key={`${iy}-${hy}`} x1="100" y1={iy} x2="200" y2={hy} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.7"/>
              )))}
              {/* Connections h1→h2 */}
              {[45,100,160,215].map(iy=>[45,100,160,215].map(hy=>(
                <line key={`h1${iy}-h2${hy}`} x1="240" y1={iy} x2="360" y2={hy} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.7"/>
              )))}
              {/* Connections h2→output */}
              {[45,100,160,215].map(iy=>[90,170].map(hy=>(
                <line key={`h2${iy}-o${hy}`} x1="400" y1={iy} x2="520" y2={hy} stroke="#cbd5e1" strokeWidth="0.8" opacity="0.7"/>
              )))}
            </svg>
          </div>
        </figure>
      </div>

      {/* ── ACTIVATION FUNCTIONS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Where Activation Functions Fit</h2>
      <p className="text-lg leading-relaxed mb-4">
        An activation function changes a layer’s raw numbers so stacked layers can learn non-linear relationships. <strong>ReLU is a common hidden-layer baseline</strong>, but it is not automatically best for every architecture. A <strong>sigmoid</strong> is commonly used when one output represents a binary probability. <strong>Softmax</strong> commonly turns competing class scores into probabilities, and it also appears in mechanisms such as attention. Many training losses accept raw scores called logits and apply the required transformation internally, so the activation must be matched to the loss rather than added by habit.
      </p>
      <p className="text-sm text-slate-600">The dedicated activation-functions lesson develops the formulas, graphs, numerical examples and selection trade-offs.</p>

      {/* ── FORWARD + BACK PROP ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">How Does a Deep Network Actually Learn?</h2>
      <p className="text-lg leading-relaxed mb-5">
        Training is a repeated correction loop. The network predicts, measures how wrong it was, computes which parameters contributed to that error, and adjusts them.
      </p>
      <div className="not-prose flex flex-col md:flex-row items-stretch md:items-center gap-3 text-center mb-8">
        {[
          ['1. Forward', 'make prediction'],
          ['2. Loss', 'measure error'],
          ['3. Backward', 'compute gradients'],
          ['4. Optimizer', 'update parameters'],
          ['5. Repeat', 'next batch'],
        ].map(([title, caption], index) => (
          <React.Fragment key={title}>
            <div className="flex-1 bg-white border border-indigo-100 rounded-xl p-4">
              <div className="font-bold text-indigo-900">{title}</div>
              <div className="text-xs text-slate-600 mt-1">{caption}</div>
            </div>
            {index < 4 && <span className="text-indigo-400 font-bold text-xl rotate-90 md:rotate-0">→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* ── PYTHON CODE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">A Tiny Parameter-Count Example</h2>
      <p className="text-lg leading-relaxed mb-4">
        Suppose a dense layer receives <strong>4 input values</strong> and contains <strong>3 neurons</strong>.
      </p>
      <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
        <p className="font-mono m-0">weights = 4 × 3 = 12</p>
        <p className="font-mono mt-2 mb-0">biases = 3</p>
        <p className="font-mono mt-2 mb-0 font-bold text-indigo-900">total = 15 trainable parameters</p>
        <p className="mt-4 mb-0 text-sm leading-relaxed text-indigo-950">Why 4 × 3? Each of the 3 neurons receives all 4 input values, so each neuron needs 4 separate connection weights. That gives 4 + 4 + 4 = 12 weights. Each neuron also has its own adjustable bias, so 3 more parameters are added.</p>
      </div>

      {/* ── ARCHITECTURE TYPES ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Main Types of Deep Learning Models</h2>
      <p className="text-lg leading-relaxed mb-4">The word <strong>type</strong> refers to the way layers are connected and the kind of structure the model is designed to process. The four families below are a useful first map; later lessons explain them one at a time.</p>
      <div className="not-prose my-8 bg-slate-50 border border-slate-200 rounded-2xl p-6 overflow-x-auto">
        <p className="text-center text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">Figure 4 — Deep Learning Architecture Tree</p>
        <div className="flex flex-col items-center min-w-[560px]">
          <div className="bg-slate-800 text-white px-6 py-3 rounded-xl font-bold text-sm shadow">Deep Learning Architectures</div>
          <div className="w-0.5 bg-slate-300 h-6"/>
          <div className="relative w-[92%] border-t-2 border-slate-300">
            {[0,33,66,100].map(p=><div key={p} className="absolute top-0 w-0.5 bg-slate-300 h-6" style={{left:`${p}%`,transform:'translateX(-50%)'}}/>)}
          </div>
          <div className="grid grid-cols-4 w-[96%] gap-3 mt-6">
            {[
              {label:'CNN',sub:'Convolutional Neural Net',box:'bg-emerald-100 border-emerald-400 text-emerald-900',subColor:'text-emerald-700',items:['Image Classification','Object Detection','Face Recognition','Medical Imaging']},
              {label:'RNN / LSTM',sub:'Recurrent Neural Net',box:'bg-amber-100 border-amber-400 text-amber-900',subColor:'text-amber-700',items:['Time Series','Speech Recognition','Machine Translation','Text Generation']},
              {label:'GAN',sub:'Generative Adversarial Net',box:'bg-rose-100 border-rose-400 text-rose-900',subColor:'text-rose-700',items:['Image Generation','Synthetic Data','Data Augmentation','Style Transfer']},
              {label:'Transformer',sub:'Attention-Based',box:'bg-violet-100 border-violet-400 text-violet-900',subColor:'text-violet-700',items:['Language Modelling','Translation','Vision Transformers','Code Models']},
            ].map(a=>(
              <div key={a.label} className="flex flex-col items-center">
                <div className={`${a.box} border-2 px-3 py-2 rounded-lg font-bold text-xs mb-1 w-full text-center`}>{a.label}</div>
                <div className={`${a.subColor} text-xs mb-2 text-center font-medium`}>{a.sub}</div>
                <div className="w-0.5 bg-slate-300 h-4"/>
                <div className="space-y-1 w-full">
                  {a.items.map(it=><div key={it} className="text-xs bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-center shadow-sm">{it}</div>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHEN NOT TO USE DL ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">When Deep Learning May—or May Not—Be the Best Starting Point</h2>
      <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <h3 className="font-bold text-emerald-900 mb-3">Situations worth testing</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {['Inputs are images, audio, raw text, video or another high-dimensional signal','A suitable pretrained model already exists for the domain','Useful features are difficult to specify by hand','Enough representative data and compute are available for the chosen approach','Validation shows the neural model improves the outcome that matters'].map(i=><li key={i} className="flex items-start gap-2"><span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>{i}</li>)}
          </ul>
        </div>
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-5">
          <h3 className="font-bold text-rose-900 mb-3">Situations needing a simpler baseline</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            {['The dataset is small and structured, with strong tree or linear baselines','Latency, memory or energy constraints rule out the proposed network','The decision must be directly inspectable and the available explanation method is insufficient','A simpler method already meets the required quality reliably','Labels are too noisy or unrepresentative for a high-capacity model to learn the intended task'].map(i=><li key={i} className="flex items-start gap-2"><span className="text-rose-500 mt-0.5 flex-shrink-0">•</span>{i}</li>)}
          </ul>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10 border-b pb-2">Common Mistakes</h2>
      <div className="not-prose space-y-3 mb-10">
        {[
          ['“Deep learning is always better than traditional ML.”', 'No. Tree-based models and simpler methods are often excellent choices for structured/tabular problems, especially with limited data.'],
          ['“More layers automatically mean higher accuracy.”', 'No. Deeper models can be harder to optimize and may overfit or waste compute.'],
          ['“Deep learning removes the need for data preparation.”', 'No. Data quality, labels, sampling, preprocessing, leakage control, and evaluation remain critical.'],
          ['“Backpropagation is the optimizer.”', 'No. Backpropagation computes gradients; optimizers such as SGD or Adam use those gradients to update parameters.'],
          ['“GPU means the model will always train faster.”', 'Not necessarily. Small models and small datasets may not benefit enough to justify accelerator overhead.'],
        ].map(([mistake, correction]) => (
          <div key={mistake} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <p className="font-semibold text-slate-900 mb-1">{mistake}</p>
            <p className="text-sm text-slate-700 m-0">{correction}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Deep learning uses stacked layers of artificial neurons to learn useful representations from data. Its core training cycle — make a prediction, measure the error, calculate how each parameter affected that error, and update the parameters — repeats as the model learns. Larger datasets, accelerator hardware, and improved architectures and training methods have helped modern deep-learning systems scale to difficult tasks.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-4 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-lg">Key Takeaway</p>
        <p className="text-slate-800 italic text-base leading-relaxed">
          For many structured tabular datasets, tree-based models such as XGBoost are strong, efficient baselines. Deep learning is especially valuable for images, audio, text and other data where useful representations are difficult to design by hand. Compare approaches on representative validation data instead of assuming that a deeper model must win.
        </p>
      </div>
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Continue Learning</h2>
      <div className="not-prose mb-10">
        <a href="/learn/neural-networks" className="block border border-slate-200 rounded-xl p-4 hover:border-indigo-300 hover:bg-indigo-50 transition-colors no-underline">
          <p className="text-xs font-bold text-indigo-600 uppercase mb-1">Next</p>
          <p className="font-bold text-slate-900 m-0">How Neural Networks Learn</p>
        </a>
      </div>
    </div>
  );
}
