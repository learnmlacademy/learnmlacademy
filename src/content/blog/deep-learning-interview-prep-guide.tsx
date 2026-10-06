import React from 'react';
import { Link } from 'react-router-dom';

export function DeepLearningInterviewPrepContent() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Neural Network Fundamentals',
      items: [
        'Explain forward propagation, loss calculation, backpropagation and gradient descent as one connected training loop.',
        'Know activation functions such as ReLU, sigmoid, tanh and softmax, including when each is appropriate.',
        'Understand vanishing and exploding gradients, weight initialization, normalization and why deeper networks can be hard to train.',
        'Be able to compare common losses such as MSE and cross-entropy and connect them to regression or classification tasks.',
        'Explain overfitting in neural networks and how dropout, data augmentation, regularisation and early stopping help.',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Architectures: CNNs, RNNs & Transformers',
      items: [
        'Know how convolution, pooling, receptive fields and residual connections work in CNNs.',
        'Explain why RNNs struggle with long dependencies and how LSTMs and GRUs improve memory.',
        'Understand self-attention, positional information, multi-head attention and the main blocks of a Transformer.',
        'Be ready to compare CNNs, RNNs and Transformers for image, sequence and multimodal tasks.',
        'Know transfer learning and fine-tuning: when to freeze layers, unfreeze them and use a smaller learning rate.',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Training, Debugging & Evaluation',
      items: [
        'Know Adam, SGD with momentum, learning-rate schedules, batch size and the trade-offs between them.',
        'Diagnose a model that does not learn: bad labels, wrong loss, learning rate, normalization, dead activations or data leakage.',
        'Use train/validation curves to identify underfitting, overfitting and optimization problems.',
        'Understand class imbalance, calibration and the right evaluation metrics for the business objective.',
        'Be able to discuss reproducibility, random seeds, checkpointing and experiment tracking.',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Production & Interview Practice',
      items: [
        'Discuss inference latency, throughput, batching, quantization and model-size trade-offs.',
        'Know how you would deploy, monitor and retrain a deep-learning model in production.',
        'Prepare one image, one NLP and one production debugging example from your own project experience.',
        'Practise drawing an architecture on a whiteboard and explaining every major tensor transformation.',
        'Expect follow-ups on why you chose a model, what failed, and what you would change with more data or compute.',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-xl text-slate-600 leading-relaxed">
        Deep learning interviews test more than definitions. You need to connect the mathematics, architecture, training process and production trade-offs into one clear story. Use the four phases below as a practical preparation plan.
      </p>

      {phases.map((phase) => (
        <section key={phase.phase} className="border-l-4 border-violet-500 bg-white rounded-r-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full">{phase.phase}</span>
            <h2 className="font-bold text-slate-900 text-xl">{phase.title}</h2>
          </div>
          <ul className="space-y-2">
            {phase.items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-slate-700 text-sm leading-relaxed">
                <span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="rounded-2xl border border-violet-100 bg-violet-50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Continue with the full Deep Learning interview lesson</h3>
        <p className="text-slate-600 text-sm mb-4">
          Use the dedicated interview lesson for focused questions and then revise the underlying concepts from the Deep Learning curriculum.
        </p>
        <Link to="/learn/deep-learning-interview-questions" className="inline-flex items-center rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-violet-700">
          Deep Learning Interview Questions →
        </Link>
      </div>
    </div>
  );
}
