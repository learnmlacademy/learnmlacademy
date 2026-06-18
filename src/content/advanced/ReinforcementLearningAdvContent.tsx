import React from 'react';
import { Car, Bot, Gamepad2, Brain, Activity, Target, Zap, ShieldAlert, PlaySquare, RefreshCw, Layers } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, Legend, AreaChart, Area } from 'recharts';

const learningCurveData = [
  { episode: 0, reward: -50 },
  { episode: 100, reward: -20 },
  { episode: 200, reward: 10 },
  { episode: 300, reward: 30 },
  { episode: 400, reward: 60 },
  { episode: 500, reward: 75 },
  { episode: 600, reward: 85 },
  { episode: 700, reward: 90 },
  { episode: 800, reward: 95 },
  { episode: 900, reward: 98 },
  { episode: 1000, reward: 100 },
];

export function ReinforcementLearningAdvContent() {
  return (
    <div id="reinforcement-learning-guide">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
        Reinforcement Learning
      </h1>

      <p className="text-lg leading-relaxed mb-4 text-slate-800">
        Machine Learning systems are designed to learn patterns from data and make intelligent decisions. Traditional Machine Learning approaches usually learn from <strong>Historical examples</strong>, <strong>Pre-labeled datasets</strong>, and <strong>Static training information</strong>.
      </p>

      <div className="pl-4 border-l-4 border-indigo-400 bg-indigo-50 py-4 pr-4 rounded-r-md mb-8 shadow-sm">
        <ul className="text-indigo-900 leading-relaxed m-0 text-base list-disc pl-5">
           <li>A spam detection model learns from labeled spam emails.</li>
           <li>A house price prediction model learns from past housing data.</li>
           <li>A medical diagnosis model learns from historical patient records.</li>
        </ul>
      </div>

      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        These approaches work well when correct answers already exist. However, many real-world problems are completely different. In many situations, there is no labeled dataset, the environment changes continuously, decisions must be made step-by-step, and actions affect future outcomes. 
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
         <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-sm">
            <Car className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <span className="font-semibold text-slate-800">Self-Driving Cars</span>
         </div>
         <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-sm">
            <Gamepad2 className="w-8 h-8 mx-auto mb-2 text-rose-600" />
            <span className="font-semibold text-slate-800">Game-Playing AI</span>
         </div>
         <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-sm">
            <Bot className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
            <span className="font-semibold text-slate-800">Robotics</span>
         </div>
         <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center shadow-sm">
            <Activity className="w-8 h-8 mx-auto mb-2 text-amber-600" />
            <span className="font-semibold text-slate-800">Stock Trading</span>
         </div>
      </div>

      <p className="text-lg leading-relaxed mb-10 text-slate-800">
        In such environments, the system cannot simply memorize examples. Instead, it must <strong>learn through trial and error</strong>. This leads to one of the most powerful areas of Artificial Intelligence: <strong>Reinforcement Learning (RL)</strong>.
      </p>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">What is Reinforcement Learning?</h2>
      
      <p className="text-lg text-slate-700 italic leading-relaxed mb-6">
        Reinforcement Learning is a branch of Machine Learning in which an intelligent agent learns how to make decisions by interacting with an environment and receiving rewards or penalties based on its actions.
      </p>

      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        <strong>The Main Goal:</strong> Maximize cumulative rewards over time.
      </p>

      <div className="pl-4 border-l-4 border-emerald-400 bg-emerald-50 py-4 pr-4 rounded-r-md mb-8 shadow-sm">
         <div className="flex items-start">
            <Zap className="text-emerald-600 w-6 h-6 mr-3 mt-1 shrink-0" />
            <div>
               <h4 className="font-bold text-emerald-900 text-lg mb-2">Simple Human Analogy</h4>
               <p className="text-emerald-800 leading-relaxed m-0 text-[15px]">
                  Imagine teaching a child to ride a bicycle. Initially, the child falls frequently, makes mistakes, and loses balance. But gradually, they learn from mistakes, understand balance, improve movement, and gain confidence. Eventually, the child masters bicycle riding without a labeled dataset. Learning happened through trial and error.
               </p>
            </div>
         </div>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm mb-12 flex flex-col md:flex-row items-center">
         <div className="w-full md:w-1/3 p-6 bg-slate-50 border-r border-slate-100 flex flex-col justify-center">
            <h3 className="text-xl font-bold text-slate-800 mb-2">Learning Curve</h3>
            <p className="text-slate-600 mb-4 leading-relaxed text-sm">
              Notice how the agent starts with highly negative rewards (falling over) but through trial and error, exploits good actions that yield maximum rewards.
            </p>
         </div>
         <div className="w-full md:w-2/3 p-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={learningCurveData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
                  <defs>
                    <linearGradient id="colorReward" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.5} vertical={false} />
                  <XAxis dataKey="episode" stroke="#64748b" fontSize={12} dy={10} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <RechartsTooltip cursor={{strokeDasharray: '3 3'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="reward" name="Cumulative Reward" stroke="#10b981" fillOpacity={1} fill="url(#colorReward)" />
               </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Components of Reinforcement Learning</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Every Reinforcement Learning system contains several important components orchestrating the simulation:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
         <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center">
               <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-3 font-mono">1</span>
               Agent
            </h4>
            <p className="text-slate-700 leading-relaxed text-[15px] m-0">The learner or decision-maker. It interacts with the environment and tries to maximize rewards. (e.g., A Self-driving Car AI).</p>
         </div>
         <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center">
               <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-3 font-mono">2</span>
               Environment
            </h4>
            <p className="text-slate-700 leading-relaxed text-[15px] m-0">The world in which the agent operates. The environment responds to the agent’s actions. (e.g., Roads and traffic).</p>
         </div>
         <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center">
               <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-3 font-mono">3</span>
               State & Action
            </h4>
            <p className="text-slate-700 leading-relaxed text-[15px] m-0">A <strong>State</strong> represents the current situation of the environment. An <strong>Action</strong> is a decision taken by the agent (e.g., State: Obstacle ahead, Action: Brake).</p>
         </div>
         <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 shadow-sm">
            <h4 className="font-bold text-slate-900 text-lg mb-2 flex items-center">
               <span className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded text-xs mr-3 font-mono">4</span>
               Reward Signal
            </h4>
            <p className="text-slate-700 leading-relaxed text-[15px] m-0">Feedback received from the environment telling the agent whether its action was good or bad. (e.g., Safe driving yields +5, Collision yields -100).</p>
         </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">Mathematical Understanding: Q-Learning</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Reinforcement Learning is mathematically modeled using a <strong>Markov Decision Process (MDP)</strong>, assuming the future depends only on the current state and action, not the full history. 
        <strong>Q-Learning</strong> is one of the most popular algorithms to solve this natively.
      </p>

      <div className="pl-4 border-l-4 border-slate-400 bg-slate-50 py-6 pr-4 rounded-r-md mb-10 shadow-sm">
         <h4 className="font-mono text-slate-800 font-bold text-lg mb-3">Q-Learning Update Formula:</h4>
         <div className="text-[17px] mb-4 pl-4 text-indigo-800 font-mono tracking-tighter">
            Q(s,a) = Q(s,a) + α [r + γ max Q(s',a') - Q(s,a)]
         </div>
         <ul className="text-slate-700 space-y-2 mb-0 list-none pl-0 text-[15px]">
            <li><strong>Q(s,a)</strong> = Current Q-value (Quality of the action in the state)</li>
            <li><strong>α (Alpha)</strong> = Learning rate</li>
            <li><strong>r</strong> = Immediate reward</li>
            <li><strong>γ (Gamma)</strong> = Discount factor (Importance of future rewards)</li>
            <li><strong>max Q(s',a')</strong> = The maximum predicted Q-value for the next state</li>
         </ul>
      </div>

      <h2 className="text-2xl font-bold text-indigo-800 mb-6 border-b pb-2">Python Implementation (Q-Learning)</h2>
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Let's implement a simple Q-Learning Maze agent using Numpy to understand the trial and error process logic.
      </p>

      {/* Step-by-Step Code View */}
      <div className="space-y-6 mb-12">
        <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
          <div className="bg-slate-50 border-b border-slate-200 p-4">
            <h4 className="font-bold text-indigo-900 flex items-center m-0">
               <PlaySquare className="w-5 h-5 mr-2 text-indigo-600" />
               Implementing Q-Learning Logic
            </h4>
          </div>
          <div className="p-0 bg-[#1e1e1e]">
            <pre className="text-[#d4d4d4] font-mono text-sm p-4 overflow-x-auto whitespace-pre-wrap m-0">
<span className="text-emerald-400">import</span> numpy <span className="text-emerald-400">as</span> np

<span className="text-slate-500"># 1. Define Q-Table (5x5 Maze, 4 possible actions)</span>
<span className="text-slate-500"># Actions: 0=Left, 1=Right, 2=Up, 3=Down</span>
Q = np.zeros((5, 5, 4))

<span className="text-slate-500"># 2. Define Parameters</span>
alpha = <span className="text-amber-300">0.1</span>   <span className="text-slate-500"># Learning rate</span>
gamma = <span className="text-amber-300">0.9</span>   <span className="text-slate-500"># Discount factor</span>
epsilon = <span className="text-amber-300">0.2</span> <span className="text-slate-500"># Exploration probability</span>
episodes = <span className="text-amber-300">1000</span>

<span className="text-slate-500"># 3. Training Loop</span>
<span className="text-emerald-400">for</span> episode <span className="text-emerald-400">in</span> <span className="text-cyan-300">range</span>(episodes):
    state = start_state
    done = <span className="text-amber-300">False</span>
    
    <span className="text-emerald-400">while not</span> done:
        <span className="text-slate-500"># Epsilon-Greedy Action Selection (Exploration vs Exploitation)</span>
        <span className="text-emerald-400">if</span> np.random.uniform(0, 1) &lt; epsilon:
            action = np.random.choice(4) <span className="text-slate-500"># Explore</span>
        <span className="text-emerald-400">else</span>:
            action = np.argmax(Q[state[0], state[1]]) <span className="text-slate-500"># Exploit</span>
            
        <span className="text-slate-500"># Environment gives the next state and reward based on action</span>
        next_state, reward, done = env.step(state, action)
        
        <span className="text-slate-500"># 4. Q-Learning Update Formula</span>
        current_q = Q[state[0], state[1], action]
        max_future_q = np.<span className="text-cyan-300">max</span>(Q[next_state[0], next_state[1]])
        
        Q[state[0], state[1], action] = current_q + alpha * (reward + gamma * max_future_q - current_q)
        
        state = next_state
            </pre>
            <div className="bg-slate-800 p-4 border-t border-slate-700 text-slate-300 text-sm">
               <strong>Note:</strong> After 1000 episodes, the Q-table will contain optimal values indicating the correct "policy" (directions) from every tile of the maze directly to the goal state.
            </div>
          </div>
        </div>
      </div>

      <hr className="border-slate-200 mt-8 mb-10" />

      <h2 className="text-2xl font-bold text-indigo-800 mb-4 border-b pb-2">Advantages & Disadvantages</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-emerald-50 border-emerald-200 border rounded-xl overflow-hidden shadow-sm">
           <div className="bg-emerald-100 px-6 py-4 border-b border-emerald-200">
             <h4 className="text-emerald-900 font-bold flex items-center text-xl m-0">
               Advantages
             </h4>
           </div>
           <div className="p-6">
             <ul className="space-y-3 text-emerald-900 m-0 pl-0 list-none text-[15px]">
               <li className="flex items-start"><span className="text-emerald-600 font-bold mr-2 text-lg leading-none">✓</span> Learns autonomously without needing a labeled dataset.</li>
               <li className="flex items-start"><span className="text-emerald-600 font-bold mr-2 text-lg leading-none">✓</span> Can discover entirely novel strategies surpassing human capabilities (e.g., AlphaGo).</li>
               <li className="flex items-start"><span className="text-emerald-600 font-bold mr-2 text-lg leading-none">✓</span> Handles sequential and continuous decisions optimally.</li>
               <li className="flex items-start"><span className="text-emerald-600 font-bold mr-2 text-lg leading-none">✓</span> Works remarkably well in uncertain or constantly changing physical environments.</li>
             </ul>
           </div>
        </div>

        <div className="bg-rose-50 border-rose-200 border rounded-xl overflow-hidden shadow-sm">
           <div className="bg-rose-100 px-6 py-4 border-b border-rose-200">
             <h4 className="text-rose-900 font-bold flex items-center text-xl m-0">
               Disadvantages
             </h4>
           </div>
           <div className="p-6">
             <ul className="space-y-3 text-rose-900 m-0 pl-0 list-none text-[15px]">
               <li className="flex items-start"><span className="text-rose-600 font-bold mr-2 text-lg leading-none">×</span> Computationally extremely expensive and requires massive training time frames.</li>
               <li className="flex items-start"><span className="text-rose-600 font-bold mr-2 text-lg leading-none">×</span> Difficult "Reward Design": poorly designed rewards cause disastrous edge-case exploits.</li>
               <li className="flex items-start"><span className="text-rose-600 font-bold mr-2 text-lg leading-none">×</span> Navigates early "Exploration Risks" which can be hazardous in physical robotics.</li>
               <li className="flex items-start"><span className="text-rose-600 font-bold mr-2 text-lg leading-none">×</span> Training instability is notoriously difficult to debug compared to supervised learning.</li>
             </ul>
           </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6 text-slate-800 border-b pb-2">Final Summary</h2>
      
      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        Reinforcement Learning is a Machine Learning paradigm where an intelligent agent learns by interacting with an environment and receiving rewards or penalties. The goal is to maximize long-term cumulative rewards step-by-step through pure experience.
      </p>

      <p className="text-lg leading-relaxed mb-6 text-slate-800">
        It powers the most advanced AI frontiers we see today, from physical robotics and autonomous drones to competitive game-playing AI and multi-step complex optimization systems. Modern breakthroughs deeply connect it to Deep Learning (Deep RL) to process visual fields natively.
      </p>

      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-slate-400 mt-6 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-xl">Most Important Insight to Remember:</p>
        <p className="text-slate-800 italic text-lg leading-relaxed m-0">
          Reinforcement Learning does not operate natively on a dataset of answers; it optimizes over outcomes. You give the system a clear win/loss condition, and it recursively tests the bounds of the environment until it constructs a highly efficient pathway to persistent victory.
        </p>
      </div>
    </div>
  );
}
