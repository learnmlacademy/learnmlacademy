import React from "react";

export function ReinforcementIntroContent() {
  return (
    <div className="prose max-w-none text-slate-800">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Reinforcement Learning</h1>
      <p>Reinforcement Learning (RL) is a branch of Machine Learning inspired by behavioral psychology where an agent learns to make decisions by performing actions in an environment to maximize a reward.</p>

      <p>
        The system learns through trial and error, modifying its behavior based
        on the rewards or punishments it receives.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        How Reinforcement Learning Works
      </h2>
      <p>
        Imagine training a dog. When the dog successfully performs a trick (like
        "Sit"), you give it a treat (Positive Reward). When it misbehaves, you
        scold it or withhold the treat (Negative Reward/Punishment). Over time,
        the dog figures out which actions lead to the most treats.
      </p>

      <p>
        Reinforcement Learning uses this exact same concept but applies it to
        software algorithms.
      </p>

      <h3 className="text-xl font-bold mt-6 mb-2">The Five Key Concepts</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Agent:</strong> The AI program or entity that is learning and
          making decisions.
        </li>
        <li>
          <strong>Environment:</strong> The world or system in which the agent
          interacts.
        </li>
        <li>
          <strong>State (s):</strong> The current situation or condition of the
          environment.
        </li>
        <li>
          <strong>Action (a):</strong> A move or decision made by the agent.
        </li>
        <li>
          <strong>Reward (r):</strong> The feedback score given from the
          environment after an action.
        </li>
      </ul>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm my-6 p-6">
        <h3 className="text-lg font-bold mb-4 text-center">
          The RL Interaction Loop
        </h3>
        <p className="text-center text-slate-600 mb-6">
          The Agent takes an Action in the Environment, and receives a new State
          and a Reward.
        </p>

        <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md mx-auto">
          {/* Top block */}
          <div className="bg-indigo-100 text-indigo-800 p-4 rounded-lg w-full font-semibold border border-indigo-200">
            Agent (Algorithm)
          </div>

          {/* Middle arrows */}
          <div className="flex justify-between w-full px-8 relative h-10">
            <div className="absolute left-8 flex flex-col items-center">
              <span className="text-sm font-bold text-slate-500">
                Action (a)
              </span>
              <span>↓</span>
            </div>
            <div className="absolute right-8 flex flex-col items-center">
              <span>↑</span>
              <span className="text-sm font-bold text-slate-500">
                State (s) & Reward (r)
              </span>
            </div>
          </div>

          {/* Bottom block */}
          <div className="bg-amber-100 text-amber-800 p-8 rounded-lg w-full font-semibold border border-amber-200">
            Environment
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">The Goal of RL</h2>
      <p>
        The ultimate goal of the Agent is to discover a{" "}
        <strong>Policy (π)</strong>. A policy is a strategy or rulebook that
        tells the agent what action to take in every possible state to maximize
        the <strong>Cumulative Reward</strong> over time. The agent doesn't just
        look for immediate treats; it plans for long-term success.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Popular Reinforcement Learning Algorithms
      </h2>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Q-Learning:</strong> A value-based algorithm where the agent
          learns a mathematical table (Q-table) evaluating how "good" a specific
          action is in a specific state.
        </li>
        <li>
          <strong>Deep Q-Networks (DQN):</strong> Combines Q-Learning with Deep
          Neural Networks to handle complex environments (like evaluating
          billions of possible screen pixels in a video game).
        </li>
        <li>
          <strong>Policy Gradients:</strong> Instead of calculating values,
          these algorithms try to optimize the policy directly.
        </li>
      </ul>

      <div className="bg-slate-900 text-slate-100 p-8 rounded-2xl shadow-xl my-8 mx-auto border border-slate-800 max-w-2xl">
        <h3 className="text-xl font-bold mb-4 text-emerald-400 text-center uppercase tracking-wider">
          The Bellman Equation (Q-Learning Core)
        </h3>
        <p className="text-slate-300 text-sm mb-6 text-center">
          This formula allows the agent to update the value of an action based
          on immediate reward and future expected rewards.
        </p>

        <div className="font-mono text-center overflow-x-auto text-lg md:text-xl py-4 bg-slate-800 rounded">
          Q(s, a) = R(s, a) + γ · max Q(s', a')
        </div>

        <ul className="mt-6 text-sm text-slate-400 space-y-2 list-none p-0">
          <li>
            <span className="text-amber-300 font-bold">Q(s, a)</span> : Quality
            of current action in current state.
          </li>
          <li>
            <span className="text-amber-300 font-bold">R(s, a)</span> :
            Immediate reward received.
          </li>
          <li>
            <span className="text-indigo-300 font-bold">γ (Gamma)</span> :
            Discount factor (how much we care about the future).
          </li>
          <li>
            <span className="text-amber-300 font-bold">max Q(s', a')</span> :
            Best possible future value from the next state.
          </li>
        </ul>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">
        Exploration vs. Exploitation Trade-off
      </h2>
      <p>
        One of the biggest challenges in RL is the{" "}
        <strong>Exploration vs. Exploitation dilemma</strong>:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Exploration:</strong> The agent tries new, random actions to
          discover potentially better strategies that it doesn't know about yet.
        </li>
        <li>
          <strong>Exploitation:</strong> The agent uses its current knowledge to
          choose the best known action to get a guaranteed reward.
        </li>
      </ul>
      <p>
        A good RL algorithm must balance both; exploring early on to map the
        environment, and exploiting later to maximize score.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Real-World Applications</h2>
      <table className="min-w-full text-left bg-white border border-slate-200 mt-4 rounded-lg shadow-sm">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 font-bold text-slate-700">Domain</th>
            <th className="p-4 font-bold text-slate-700">
              Application Example
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Gaming & AI</td>
            <td className="p-4">
              AlphaGo defeating world champions, AI mastering Dota 2 and
              StarCraft.
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Robotics</td>
            <td className="p-4">
              Teaching robotic arms to grasp objects, or teaching mechanical
              dogs to walk over rough terrain.
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Autonomous Vehicles</td>
            <td className="p-4">
              Self-driving cars learning braking, steering, and lane changing
              policies in traffic.
            </td>
          </tr>
          <tr className="hover:bg-slate-50">
            <td className="p-4 font-bold">Resource Management</td>
            <td className="p-4">
              Google using RL to dynamically optimize database cooling systems,
              saving millions in energy.
            </td>
          </tr>
        </tbody>
      </table>

      <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded mt-8">
        <h3 className="font-bold text-lg text-indigo-800">Summary</h3>
        <p className="text-indigo-900 mt-2">
          Reinforcement Learning is the closest mimic to how biological beings
          learn through consequences. While computationally expensive and
          difficult to train, RL algorithms are the leading force behind
          breakthroughs in creating intelligent agents capable of making
          complex, long-term decisions.
        </p>
      </div>
    </div>
  );
}
