import React from 'react';
import { Link } from 'react-router-dom';

export function GenerativeAIInterviewPrepContent() {
  const phases = [
    {
      phase: 'Phase 1',
      title: 'Generative AI Foundations',
      items: [
        'Explain the difference between discriminative and generative modelling and what it means to learn a data distribution.',
        'Know the intuition behind latent variables, likelihood, sampling and why generation is different from classification.',
        'Be able to compare VAEs, GANs and diffusion models at a high level: how they train, how they generate and where they are used.',
        'Understand multimodal systems and how text, image, audio or video representations can be combined.',
        'Know the basic risks: hallucination, bias, copyright concerns, unsafe generation and misuse.',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Diffusion, Fine-Tuning & Control',
      items: [
        'Explain forward noising and reverse denoising without hiding behind equations.',
        'Know the role of the denoising network, timestep conditioning and latent-space generation.',
        'Understand classifier-free guidance and why stronger guidance can improve prompt alignment but reduce diversity.',
        'Be able to discuss fine-tuning methods such as LoRA and when adapters are preferable to full model fine-tuning.',
        'Know common control mechanisms for image generation and how conditioning changes the generated output.',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Building & Evaluating GenAI Applications',
      items: [
        'Start from the use case and choose the model family based on quality, latency, privacy, controllability and cost.',
        'Explain prompt design, structured outputs, safety checks and fallback handling in a user-facing GenAI application.',
        'Know why evaluating generative systems is harder than measuring simple classification accuracy.',
        'Discuss human evaluation, task-specific metrics, factuality checks and safety evaluation.',
        'Be prepared to explain how you would version prompts, models and evaluation datasets.',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Production & Responsible AI',
      items: [
        'Discuss inference cost, latency, caching, batching and model-size trade-offs.',
        'Know how you would protect user data and sensitive prompts in a production application.',
        'Prepare examples of failure modes and explain how guardrails reduce risk without assuming they are perfect.',
        'Be able to explain monitoring for quality drift, policy violations and unexpected user behaviour.',
        'Have one end-to-end GenAI project story ready: problem, model choice, evaluation, deployment and lessons learned.',
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <p className="text-xl text-slate-600 leading-relaxed">
        Generative AI interviews usually mix model intuition with application design. The strongest answers show that you understand how generative models work, how to evaluate them and how to ship them responsibly.
      </p>

      {phases.map((phase) => (
        <section key={phase.phase} className="border-l-4 border-rose-500 bg-white rounded-r-2xl p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full">{phase.phase}</span>
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

      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-6">
        <h3 className="text-lg font-bold text-slate-900 mb-2">Revise the Generative AI curriculum</h3>
        <p className="text-slate-600 text-sm mb-4">
          Start with the Generative AI foundation lesson and move through VAEs, GANs, diffusion, multimodal systems, evaluation and deployment.
        </p>
        <Link to="/learn/generative-ai-intro" className="inline-flex items-center rounded-xl bg-rose-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-rose-700">
          Open Generative AI →
        </Link>
      </div>
    </div>
  );
}
