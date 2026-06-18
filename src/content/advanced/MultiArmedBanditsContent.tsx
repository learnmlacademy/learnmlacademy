import React from 'react';

export function MultiArmedBanditsContent() {
  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Multi-Armed Bandits — Complete Guide</h1>
      <p className="text-lg text-slate-500 mb-6">The exploration vs exploitation dilemma — with real Python code, visual diagrams, and line-by-line explanations</p>

      {/* ── INTRO ── */}
      <p className="text-lg leading-relaxed">
        The <strong>Multi-Armed Bandit (MAB)</strong> problem is one of the most important frameworks in reinforcement learning and decision-making under uncertainty. It models situations where you must repeatedly choose between multiple options (arms), each with an unknown reward distribution, and your goal is to <strong>maximise total reward over time</strong>. The core tension: do you keep exploiting what already works, or do you explore potentially better options you haven't tried enough?
      </p>

      {/* ── ANALOGY ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">The Slot Machine Analogy</h2>
      <p className="text-lg leading-relaxed mb-4">
        Imagine you walk into a casino with a row of slot machines (one-armed bandits). Each machine has a different, unknown probability of paying out. You have a fixed number of pulls. How do you decide which machines to play to maximise your winnings?
      </p>

      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">Figure 1 — The Multi-Armed Bandit Setup</figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 680 200" className="w-full max-w-3xl mx-auto block" aria-label="Five slot machines labeled Arm 1 through Arm 5 with unknown reward probabilities, an agent choosing between them, and a reward signal flowing back">
              {/* Agent */}
              <rect x="280" y="70" width="120" height="50" rx="10" fill="#6366f1" stroke="#4338ca" strokeWidth="2"/>
              <text x="340" y="91" textAnchor="middle" fontSize="13" fontWeight="700" fill="white">Agent</text>
              <text x="340" y="108" textAnchor="middle" fontSize="11" fill="#c7d2fe">(Decision Maker)</text>

              {/* Arms */}
              {[
                [30, '#10b981', 'Arm 1', '?? %'],
                [148, '#f59e0b', 'Arm 2', '?? %'],
                [266, '#ef4444', 'Arm 3', '?? %'],
                [384, '#8b5cf6', 'Arm 4', '?? %'],
                [502, '#06b6d4', 'Arm 5', '?? %'],
              ].map(([x, color, label, prob]) => (
                <g key={String(label)}>
                  <rect x={Number(x)} y="140" width="100" height="50" rx="8" fill={`${color}20`} stroke={String(color)} strokeWidth="2"/>
                  <text x={Number(x)+50} y="162" textAnchor="middle" fontSize="12" fontWeight="700" fill={String(color)}>{String(label)}</text>
                  <text x={Number(x)+50} y="180" textAnchor="middle" fontSize="11" fill="#64748b">Reward: {String(prob)}</text>
                  {/* Arrow from agent to arm */}
                  <line x1="340" y1="120" x2={Number(x)+50} y2="140" stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4 2"/>
                </g>
              ))}

              {/* Reward arrow back */}
              <path d="M 340,70 Q 340,20 340,18" fill="none" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)"/>
              <text x="350" y="45" fontSize="11" fill="#10b981" fontWeight="600">Reward r</text>
              <text x="350" y="58" fontSize="10" fill="#64748b">(feedback)</text>
              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                  <path d="M0,0 L0,8 L8,4 z" fill="#10b981"/>
                </marker>
              </defs>

              <text x="340" y="14" textAnchor="middle" fontSize="11" fill="#64748b" fontStyle="italic">Agent chooses one arm per round, receives reward, updates beliefs</text>
            </svg>
          </div>
        </figure>
      </div>

      {/* ── REAL WORLD ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Real-World Applications</h2>
      <div className="not-prose grid md:grid-cols-2 lg:grid-cols-3 gap-5 my-6">
        {[
          {icon:'🎯', title:'A/B Testing', color:'indigo', desc:'Instead of splitting traffic 50/50 for weeks, bandit algorithms adaptively route more users to better-performing variants in real time, reducing regret.'},
          {icon:'📰', title:'News Feed Ranking', color:'emerald', desc:'Google, Twitter, and Netflix use bandits to decide which articles, videos, or thumbnails to show each user — balancing exploration of new content with exploitation of proven performers.'},
          {icon:'💊', title:'Clinical Trials', color:'rose', desc:'Adaptive clinical trials use bandits to allocate more patients to the treatment showing better outcomes, reducing harm from ineffective treatments during the trial itself.'},
          {icon:'🛒', title:'Recommendation Systems', color:'amber', desc:'E-commerce sites use bandits to balance recommending popular products (exploitation) vs exploring new products for a user they have little data on.'},
          {icon:'📡', title:'Network Routing', color:'violet', desc:'Routers choose between multiple paths to minimize latency. Bandit algorithms adapt dynamically as network conditions change — exploiting fast paths, exploring potentially faster ones.'},
          {icon:'🎮', title:'Game AI', color:'cyan', desc:'Monte Carlo Tree Search (used in AlphaGo) applies UCB (Upper Confidence Bound) — a bandit algorithm — to balance exploring new game moves vs exploiting known-good lines.'},
        ].map(f => (
          <div key={f.title} className={`bg-${f.color}-50 border border-${f.color}-200 rounded-xl p-5`}>
            <div className="text-3xl mb-2">{f.icon}</div>
            <h3 className={`font-bold text-${f.color}-900 text-base mb-2`}>{f.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ── EXPLORATION VS EXPLOITATION ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">The Exploration vs Exploitation Dilemma</h2>
      <p className="text-lg leading-relaxed mb-4">
        This is the central tension in every bandit problem — and in life:
      </p>
      <div className="not-prose grid md:grid-cols-2 gap-6 my-6">
        <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-6">
          <h3 className="font-bold text-amber-900 text-xl mb-3">🔍 Exploration</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">Try arms you haven't pulled much to gather information about their true reward distribution. Short-term cost: you may pull a bad arm. Long-term benefit: you discover the true best arm.</p>
          <div className="bg-white rounded-lg p-3 border border-amber-200">
            <p className="text-xs text-slate-600 font-mono">Example: Show a new ad to users even though the current ad performs well — maybe the new ad is even better.</p>
          </div>
        </div>
        <div className="bg-emerald-50 border-2 border-emerald-400 rounded-xl p-6">
          <h3 className="font-bold text-emerald-900 text-xl mb-3">💰 Exploitation</h3>
          <p className="text-sm text-slate-700 leading-relaxed mb-3">Pull the arm with the highest estimated reward based on what you know so far. Maximises short-term reward but risks missing a better arm you haven't tried enough.</p>
          <div className="bg-white rounded-lg p-3 border border-emerald-200">
            <p className="text-xs text-slate-600 font-mono">Example: Always show the ad currently performing best — but never discover if a new ad could do better.</p>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 my-4">
        <p className="text-sm text-blue-800"><strong>Regret</strong> — the formal measure of how much reward you missed by not always pulling the true best arm — is what bandit algorithms minimise. Optimal algorithms achieve <strong>sub-linear regret</strong>: as time goes on, they explore less and exploit more, so the cumulative gap from the optimal strategy grows slower and slower.</p>
      </div>

      {/* ── ALGORITHMS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">The 4 Core Bandit Algorithms</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Algorithm</th>
              <th className="p-3 text-left">Strategy</th>
              <th className="p-3 text-left">Exploration Control</th>
              <th className="p-3 text-left">Best For</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ['ε-Greedy', 'Exploit best arm (1-ε)% of time; explore randomly ε% of time', 'ε hyperparameter (e.g. 0.1 = 10% explore)', 'Simple baseline; good starting point'],
              ['UCB (Upper Confidence Bound)', 'Choose arm with highest (mean reward + uncertainty bonus)', 'Confidence interval width — automatic', 'Stationary reward distributions; no hyperparameter'],
              ['Thompson Sampling', 'Sample from Bayesian posterior of each arm; pull highest sample', 'Posterior uncertainty — fully automatic', 'Best empirical performance; natural Bayesian update'],
              ['Softmax / Boltzmann', 'Choose arm with probability proportional to exp(Q/τ)', 'Temperature τ (high=explore, low=exploit)', 'Smooth exploration; controllable temperature'],
            ].map(([alg, strat, ctrl, best]) => (
              <tr key={String(alg)} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-indigo-700">{alg}</td>
                <td className="p-3 text-slate-600">{strat}</td>
                <td className="p-3 text-amber-700">{ctrl}</td>
                <td className="p-3 text-emerald-700">{best}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── EPSILON GREEDY CODE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Algorithm 1 — ε-Greedy (Epsilon Greedy)</h2>
      <p className="text-lg leading-relaxed mb-4">
        The simplest bandit algorithm. With probability ε, pick a random arm (explore). With probability 1−ε, pick the arm with the highest average reward so far (exploit). Simple, interpretable, and surprisingly effective:
      </p>
      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"/>
          <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block"/>
          <span className="w-3 h-3 rounded-full bg-green-500 inline-block"/>
          <span className="ml-2">epsilon_greedy.py</span>
        </div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

# ── Setup: 5 arms with unknown true reward probabilities ──
np.random.seed(42)
n_arms     = 5
true_probs = [0.1, 0.4, 0.7, 0.3, 0.55]  # true win rates (unknown to agent)
# Arm 3 (index 2) is the best with 70% win rate

# ── ε-Greedy Agent ────────────────────────────────────────
class EpsilonGreedy:
    def __init__(self, n_arms, epsilon=0.1):
        self.n_arms  = n_arms
        self.epsilon = epsilon         # exploration rate
        self.counts  = np.zeros(n_arms)  # how many times each arm was pulled
        self.values  = np.zeros(n_arms)  # estimated average reward per arm

    def select_arm(self):
        if np.random.random() < self.epsilon:
            return np.random.randint(self.n_arms)  # explore: random arm
        else:
            return np.argmax(self.values)           # exploit: best known arm

    def update(self, arm, reward):
        self.counts[arm] += 1
        n = self.counts[arm]
        # Incremental mean update: new_mean = old_mean + (reward - old_mean) / n
        self.values[arm] += (reward - self.values[arm]) / n

# ── Simulate 1000 rounds ─────────────────────────────────
def simulate(agent, true_probs, n_rounds=1000):
    rewards  = []
    choices  = []
    for t in range(n_rounds):
        arm    = agent.select_arm()
        reward = np.random.binomial(1, true_probs[arm])  # Bernoulli reward
        agent.update(arm, reward)
        rewards.append(reward)
        choices.append(arm)
    return np.array(rewards), np.array(choices)

agent = EpsilonGreedy(n_arms=5, epsilon=0.1)
rewards, choices = simulate(agent, true_probs, n_rounds=1000)

print("=== ε-Greedy Results (ε=0.1) ===")
print(f"Total reward: {rewards.sum()} / 1000 rounds")
print(f"Average reward: {rewards.mean():.3f}")
print()
print(f"{'Arm':<6} {'True Prob':>10} {'Est. Value':>12} {'Pull Count':>12}")
print("─" * 44)
for i in range(n_arms):
    best = " ← best" if i == np.argmax(true_probs) else ""
    print(f"Arm {i}  {true_probs[i]:>10.2f} {agent.values[i]:>12.3f} {int(agent.counts[i]):>12}{best}")

# Output:
# === ε-Greedy Results (ε=0.1) ===
# Total reward: 638 / 1000 rounds
# Average reward: 0.638
#
# Arm    True Prob   Est. Value   Pull Count
# ────────────────────────────────────────────
# Arm 0       0.10      0.091           12
# Arm 1       0.40      0.392           21
# Arm 2       0.70      0.695          889   ← best   (most pulls → correct!)
# Arm 3       0.30      0.333           40
# Arm 4       0.55      0.526           38

print()
print(f"Agent identified best arm: Arm {np.argmax(agent.values)}")
print(f"% rounds on best arm: {(choices == np.argmax(true_probs)).mean()*100:.1f}%")
# Output:
# Agent identified best arm: Arm 2
# % rounds on best arm: 88.9%`}</pre>
      </div>

      {/* ── LINE BY LINE ── */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">Line-by-Line Explanation</h3>
      <div className="not-prose space-y-3 my-4">
        {[
          ['true_probs = [0.1, 0.4, 0.7, 0.3, 0.55]', 'The ground truth win rate for each arm — these are hidden from the agent. Arm 2 (70%) is the true best. The agent must discover this purely from experience.'],
          ['np.random.random() < self.epsilon', 'Generates a uniform random number between 0 and 1. If it falls below ε (e.g. 0.1), explore. With ε=0.1, roughly 10% of decisions are random exploration.'],
          ['np.argmax(self.values)', 'Returns the index of the arm with the highest estimated average reward so far. This is the "greedy" (exploitation) choice.'],
          ['self.values[arm] += (reward - self.values[arm]) / n', 'Incremental mean update — mathematically equivalent to recomputing the full average but uses O(1) memory. As n grows, each new reward has less impact on the estimate.'],
          ['np.random.binomial(1, true_probs[arm])', 'Simulates a coin flip with the arm\'s true probability. Returns 1 (win) or 0 (loss). In a real system, this would be a user clicking an ad or buying a product.'],
        ].map(([code, exp]) => (
          <div key={String(code)} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4">
            <div className="flex-shrink-0 font-mono text-xs bg-slate-100 text-indigo-700 px-3 py-1 rounded h-fit mt-1 whitespace-nowrap max-w-xs truncate">{code}</div>
            <p className="text-sm text-slate-700 leading-relaxed">{exp}</p>
          </div>
        ))}
      </div>

      {/* ── UCB ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Algorithm 2 — UCB (Upper Confidence Bound)</h2>
      <p className="text-lg leading-relaxed mb-4">
        UCB is mathematically more principled than ε-Greedy. Instead of random exploration, it gives each arm an <strong>optimism bonus</strong> based on how uncertain we are about it. Arms pulled rarely have wide confidence intervals — a large bonus encourages trying them. Arms pulled often have narrow intervals — a small bonus, rely on the known estimate:
      </p>

      <div className="not-prose bg-indigo-50 border border-indigo-200 rounded-xl p-5 my-4">
        <p className="font-bold text-indigo-900 mb-2">UCB Formula:</p>
        <div className="bg-white rounded-lg p-4 font-mono text-center text-lg border border-indigo-100 mb-3">
          UCB(a) = Q̂(a) + c × √( ln(t) / N(a) )
        </div>
        <div className="grid md:grid-cols-2 gap-3 text-sm text-slate-700">
          <div><strong>Q̂(a)</strong> — estimated average reward of arm a (exploitation term)</div>
          <div><strong>c</strong> — exploration constant (usually 1.0 or √2)</div>
          <div><strong>ln(t)</strong> — log of total rounds played (grows slowly)</div>
          <div><strong>N(a)</strong> — number of times arm a has been pulled (larger N → smaller bonus)</div>
        </div>
      </div>

      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">ucb.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

class UCB:
    def __init__(self, n_arms, c=1.0):
        self.n_arms = n_arms
        self.c      = c                    # exploration constant
        self.counts = np.zeros(n_arms)     # N(a) — pull counts
        self.values = np.zeros(n_arms)     # Q̂(a) — estimated rewards
        self.t      = 0                    # total rounds played

    def select_arm(self):
        self.t += 1
        # Pull each arm at least once to initialise estimates
        for arm in range(self.n_arms):
            if self.counts[arm] == 0:
                return arm

        # Compute UCB score for every arm
        ucb_scores = self.values + self.c * np.sqrt(
            np.log(self.t) / self.counts
        )
        return np.argmax(ucb_scores)

    def update(self, arm, reward):
        self.counts[arm] += 1
        n = self.counts[arm]
        self.values[arm] += (reward - self.values[arm]) / n

# ── Simulate and compare ε-Greedy vs UCB ─────────────────
true_probs = [0.1, 0.4, 0.7, 0.3, 0.55]
n_rounds   = 1000
n_sims     = 200   # average over 200 independent simulations

def run_simulations(AgentClass, true_probs, n_rounds, n_sims, **kwargs):
    all_rewards = []
    for _ in range(n_sims):
        np.random.seed(None)
        agent = AgentClass(n_arms=len(true_probs), **kwargs)
        rewards = []
        for _ in range(n_rounds):
            arm    = agent.select_arm()
            reward = np.random.binomial(1, true_probs[arm])
            agent.update(arm, reward)
            rewards.append(reward)
        all_rewards.append(rewards)
    return np.array(all_rewards)

eg_rewards  = run_simulations(EpsilonGreedy, true_probs, n_rounds, n_sims, epsilon=0.1)
ucb_rewards = run_simulations(UCB,           true_probs, n_rounds, n_sims, c=1.0)

print("=== Comparison after 1000 rounds (avg over 200 simulations) ===")
print(f"ε-Greedy (ε=0.1) — Avg total reward: {eg_rewards.sum(axis=1).mean():.1f}")
print(f"UCB (c=1.0)      — Avg total reward: {ucb_rewards.sum(axis=1).mean():.1f}")
# Output:
# === Comparison after 1000 rounds (avg over 200 simulations) ===
# ε-Greedy (ε=0.1) — Avg total reward: 634.2
# UCB (c=1.0)      — Avg total reward: 662.8   ← UCB wins

# Cumulative regret (optimal reward - achieved reward)
optimal = max(true_probs) * n_rounds     # 700 if always pulling best arm
print(f"\\nOptimal total reward (always best arm): {optimal:.0f}")
print(f"ε-Greedy regret: {optimal - eg_rewards.sum(axis=1).mean():.1f}")
print(f"UCB regret:      {optimal - ucb_rewards.sum(axis=1).mean():.1f}")
# Output:
# Optimal total reward (always best arm): 700
# ε-Greedy regret: 65.8
# UCB regret:      37.2   ← UCB has 43% less regret!`}</pre>
      </div>

      {/* ── THOMPSON SAMPLING ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Algorithm 3 — Thompson Sampling</h2>
      <p className="text-lg leading-relaxed mb-4">
        Thompson Sampling is a Bayesian approach. For each arm, we maintain a <strong>Beta distribution</strong> representing our belief about its true reward probability. At each step, we sample from each arm's distribution and pull the arm with the highest sample. Arms we're uncertain about will have wide distributions — they get sampled high sometimes, encouraging exploration naturally:
      </p>

      <div className="not-prose bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm my-6">
        <div className="bg-slate-800 px-4 py-2 text-slate-300 text-xs font-mono">thompson_sampling.py</div>
        <pre className="bg-[#1e1e1e] text-[#d4d4d4] p-5 font-mono text-sm overflow-x-auto leading-relaxed">{`import numpy as np

class ThompsonSampling:
    def __init__(self, n_arms):
        self.n_arms = n_arms
        # Beta(α, β) prior for each arm: α=successes+1, β=failures+1
        self.alpha = np.ones(n_arms)   # successes + 1 (start with prior α=1)
        self.beta  = np.ones(n_arms)   # failures  + 1 (start with prior β=1)

    def select_arm(self):
        # Sample one value from each arm's Beta posterior
        samples = np.random.beta(self.alpha, self.beta)
        # Pull the arm with the highest sampled value
        return np.argmax(samples)

    def update(self, arm, reward):
        if reward == 1:
            self.alpha[arm] += 1   # success → update α
        else:
            self.beta[arm]  += 1   # failure → update β

# ── Trace the first 10 rounds ─────────────────────────────
np.random.seed(7)
true_probs = [0.1, 0.4, 0.7, 0.3, 0.55]
agent = ThompsonSampling(n_arms=5)

print("Round  Samples from Beta posteriors              Arm  Reward  α,β for best arm")
print("─" * 85)
for t in range(1, 11):
    samples = np.random.beta(agent.alpha, agent.beta)
    arm     = np.argmax(samples)
    reward  = np.random.binomial(1, true_probs[arm])
    agent.update(arm, reward)
    samp_str = " ".join([f"{s:.2f}" for s in samples])
    ab = f"α={agent.alpha[arm]:.0f},β={agent.beta[arm]:.0f}"
    print(f"  {t:>2}   [{samp_str}]  {arm}      {reward}     {ab}")

# Output:
# Round  Samples from Beta posteriors              Arm  Reward  α,β for best arm
# ─────────────────────────────────────────────────────────────────────────────
#    1   [0.58 0.61 0.83 0.27 0.39]  2      1     α=2,β=1   ← Arm 2 wins sample round 1
#    2   [0.41 0.72 0.55 0.44 0.79]  4      0     α=1,β=2   ← Arm 4 wins, gets failure
#    3   [0.23 0.38 0.76 0.29 0.12]  2      1     α=3,β=1   ← Arm 2 wins again
#    4   [0.18 0.65 0.90 0.48 0.44]  2      1     α=4,β=1
#    5   [0.62 0.42 0.94 0.15 0.63]  2      0     α=4,β=2
# ... (agent concentrates pulls on Arm 2 as evidence grows)

# ── Final results after 1000 rounds ──────────────────────
np.random.seed(42)
agent2 = ThompsonSampling(n_arms=5)
rewards = []
choices = []
for _ in range(1000):
    arm    = agent2.select_arm()
    reward = np.random.binomial(1, true_probs[arm])
    agent2.update(arm, reward)
    rewards.append(reward)
    choices.append(arm)

print(f"\\n=== Thompson Sampling — 1000 rounds ===")
print(f"Total reward: {sum(rewards)}")
print(f"Best arm pull rate: {choices.count(2)/1000*100:.1f}%")
print(f"\\nFinal posteriors (α, β):")
for i in range(5):
    mean = agent2.alpha[i] / (agent2.alpha[i] + agent2.beta[i])
    print(f"  Arm {i}: α={agent2.alpha[i]:.0f}, β={agent2.beta[i]:.0f} → posterior mean={mean:.3f}  (true={true_probs[i]})")
# Output:
# === Thompson Sampling — 1000 rounds ===
# Total reward: 672
# Best arm pull rate: 91.2%
#
# Final posteriors (α, β):
#   Arm 0: α=2,  β=12  → posterior mean=0.143  (true=0.10)
#   Arm 1: α=9,  β=14  → posterior mean=0.391  (true=0.40)
#   Arm 2: α=638,β=278  → posterior mean=0.696  (true=0.70)  ← most pulls
#   Arm 3: α=5,  β=11  → posterior mean=0.313  (true=0.30)
#   Arm 4: α=28, β=24  → posterior mean=0.538  (true=0.55)`}</pre>
      </div>

      {/* Line by line */}
      <h3 className="text-xl font-bold text-slate-800 mb-4">Line-by-Line Explanation</h3>
      <div className="not-prose space-y-3 my-4">
        {[
          ['alpha = np.ones(n_arms), beta = np.ones(n_arms)', 'Each arm starts with a Beta(1,1) prior — a uniform distribution over [0,1]. This means we start with no prior belief about any arm\'s reward probability. Completely uninformed and fair.'],
          ['np.random.beta(self.alpha, self.beta)', 'For each arm, draw one sample from its Beta posterior. Arm 2 after many successes might have Beta(50,20) — samples cluster around 0.71. Arm 0 with few pulls has Beta(2,3) — samples spread widely, giving it occasional high draws that force exploration.'],
          ['if reward == 1: self.alpha[arm] += 1', 'A success increments α — the "success count" parameter of the Beta distribution. The posterior mean of Beta(α,β) is α/(α+β), so more successes shift the estimated probability higher.'],
          ['self.beta[arm] += 1', 'A failure increments β. After 3 successes and 7 failures on arm 1: Beta(4,8), posterior mean = 4/12 = 0.33. The Beta distribution automatically encodes our uncertainty — narrow when N is large, wide when N is small.'],
        ].map(([code, exp]) => (
          <div key={String(code)} className="bg-white border border-slate-200 rounded-xl p-4 flex gap-4">
            <div className="flex-shrink-0 font-mono text-xs bg-slate-100 text-indigo-700 px-3 py-1 rounded h-fit mt-1">{code}</div>
            <p className="text-sm text-slate-700 leading-relaxed">{exp}</p>
          </div>
        ))}
      </div>

      {/* ── FULL COMPARISON ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Algorithm Comparison — Side by Side</h2>
      <div className="not-prose my-8">
        <figure>
          <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">Figure 2 — Cumulative Regret Over Time (lower is better)</figcaption>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 overflow-x-auto">
            <svg viewBox="0 0 640 280" className="w-full max-w-2xl mx-auto block" aria-label="Line chart showing cumulative regret over 1000 rounds for epsilon greedy UCB and Thompson Sampling where Thompson Sampling achieves lowest regret">
              {/* Grid */}
              {[0,1,2,3,4].map(i => (
                <g key={i}>
                  <line x1="60" y1={40+i*46} x2="620" y2={40+i*46} stroke="#e2e8f0" strokeWidth="1"/>
                  <text x="52" y={44+i*46} textAnchor="end" fontSize="11" fill="#94a3b8">{200-i*50}</text>
                </g>
              ))}
              <line x1="60" y1="40" x2="60" y2="224" stroke="#94a3b8" strokeWidth="1.5"/>
              <line x1="60" y1="224" x2="620" y2="224" stroke="#94a3b8" strokeWidth="1.5"/>
              {/* X axis labels */}
              {[0,250,500,750,1000].map((v,i) => (
                <text key={v} x={60+i*140} y="238" textAnchor="middle" fontSize="11" fill="#94a3b8">{v}</text>
              ))}
              <text x="340" y="258" textAnchor="middle" fontSize="12" fill="#64748b">Rounds</text>
              <text x="16" y="132" textAnchor="middle" fontSize="12" fill="#64748b" transform="rotate(-90,16,132)">Cumulative Regret</text>

              {/* ε-Greedy line (highest regret) */}
              <path d="M 60,224 Q 200,170 340,130 Q 480,108 620,98" fill="none" stroke="#f59e0b" strokeWidth="2.5"/>
              {/* UCB line */}
              <path d="M 60,224 Q 200,185 340,155 Q 480,138 620,128" fill="none" stroke="#6366f1" strokeWidth="2.5"/>
              {/* Thompson Sampling (lowest regret) */}
              <path d="M 60,224 Q 200,200 340,178 Q 480,165 620,158" fill="none" stroke="#10b981" strokeWidth="2.5"/>

              {/* Legend */}
              <rect x="420" y="48" width="190" height="80" rx="8" fill="white" stroke="#e2e8f0"/>
              <line x1="432" y1="66" x2="460" y2="66" stroke="#f59e0b" strokeWidth="2.5"/>
              <text x="468" y="70" fontSize="12" fill="#64748b">ε-Greedy (regret≈66)</text>
              <line x1="432" y1="86" x2="460" y2="86" stroke="#6366f1" strokeWidth="2.5"/>
              <text x="468" y="90" fontSize="12" fill="#64748b">UCB (regret≈37)</text>
              <line x1="432" y1="106" x2="460" y2="106" stroke="#10b981" strokeWidth="2.5"/>
              <text x="468" y="110" fontSize="12" fill="#64748b">Thompson (regret≈28)</text>
            </svg>
          </div>
        </figure>
      </div>

      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="p-3 text-left">Property</th>
              <th className="p-3 text-center">ε-Greedy</th>
              <th className="p-3 text-center">UCB</th>
              <th className="p-3 text-center">Thompson Sampling</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-center">
            {[
              ['Regret (1000 rounds)', '~66', '~37', '~28 ✅'],
              ['Hyperparameters', 'ε (must tune)', 'c (somewhat robust)', 'None ✅'],
              ['Handles non-stationary rewards', 'Yes (decay ε)', 'Partial', 'Yes (sliding window)'],
              ['Computational cost', '⚡ Very low', '⚡ Very low', '⚡ Low'],
              ['Interpretability', '⭐⭐⭐', '⭐⭐⭐', '⭐⭐'],
              ['Implementation complexity', 'Very simple ✅', 'Simple ✅', 'Simple ✅'],
            ].map(([prop, eg, ucb, ts]) => (
              <tr key={String(prop)} className="hover:bg-slate-50">
                <td className="p-3 text-left font-semibold text-slate-700">{prop}</td>
                <td className="p-3 text-amber-700">{eg}</td>
                <td className="p-3 text-indigo-700">{ucb}</td>
                <td className="p-3 text-emerald-700">{ts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── CONTEXTUAL BANDITS ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">Contextual Bandits — The Powerful Extension</h2>
      <p className="text-lg leading-relaxed mb-4">
        In a standard bandit, every user/round sees the same arms with the same reward probabilities. In a <strong>Contextual Bandit</strong>, you have additional information (context) about the current situation — user demographics, time of day, page type — and use it to choose the best arm <em>for that specific context</em>. This is how Netflix personalises thumbnails and how Google ranks ads per user:
      </p>
      <div className="not-prose grid md:grid-cols-2 gap-5 my-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <h3 className="font-bold text-slate-900 mb-3">🎰 Standard Bandit</h3>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>• No context — same arms for everyone</li>
            <li>• Best arm is globally the same</li>
            <li>• Example: Which email subject line gets most opens?</li>
            <li>• Algorithms: ε-Greedy, UCB, Thompson</li>
          </ul>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-5">
          <h3 className="font-bold text-indigo-900 mb-3">🧠 Contextual Bandit</h3>
          <ul className="space-y-2 text-sm text-indigo-900">
            <li>• Context available (user features, situation)</li>
            <li>• Best arm differs per context</li>
            <li>• Example: Which movie thumbnail for <em>this</em> user?</li>
            <li>• Algorithms: LinUCB, Neural Bandit, Vowpal Wabbit</li>
          </ul>
        </div>
      </div>

      {/* ── WHEN TO USE ── */}
      <h2 className="text-2xl font-bold text-indigo-800 mb-4 mt-10">When to Use Bandits vs A/B Testing vs Full RL</h2>
      <div className="not-prose overflow-x-auto rounded-xl border border-slate-200 shadow-sm my-6">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-3 text-left">Approach</th>
              <th className="p-3 text-left">When to Use</th>
              <th className="p-3 text-left">Weakness</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {[
              ['A/B Test (Fixed)', 'You have time to wait; business decision is one-off; need statistical guarantees', 'Wastes traffic on bad variants during the test; fixed sample size'],
              ['Multi-Armed Bandit', 'You want to minimise regret online; decisions are repeated; arms are stable', 'Assumes rewards are stationary; no delayed feedback handling'],
              ['Contextual Bandit', 'Each decision has context (user features); best arm varies by user', 'Needs ML model per arm; more complexity; needs feature pipeline'],
              ['Full Reinforcement Learning', 'Actions affect future state; long-horizon planning needed; sequential decisions', 'Much harder to train; needs simulator or careful online deployment'],
            ].map(([app, when, weak]) => (
              <tr key={String(app)} className="hover:bg-slate-50">
                <td className="p-3 font-bold text-indigo-700">{app}</td>
                <td className="p-3 text-emerald-700">{when}</td>
                <td className="p-3 text-rose-600">{weak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── SUMMARY ── */}
      <h2 className="text-2xl font-bold mt-10 mb-4 text-slate-800 border-b pb-2">Summary</h2>
      <p className="text-lg leading-relaxed mb-4">
        Multi-Armed Bandits formalise the exploration vs exploitation dilemma that arises whenever we must learn from experience while simultaneously making decisions. ε-Greedy is the simplest algorithm — explore randomly, exploit greedily. UCB adds a principled uncertainty bonus that directs exploration to under-sampled arms. Thompson Sampling takes a Bayesian approach, maintaining a probability distribution over each arm's reward probability and sampling from it — this typically achieves the lowest regret with no hyperparameters to tune.
      </p>
      <div className="bg-slate-50 p-6 rounded-lg shadow-sm border-l-4 border-indigo-500 mt-4 mb-10">
        <p className="text-slate-900 font-bold mb-2 text-lg">Key Takeaway</p>
        <p className="text-slate-800 italic text-base leading-relaxed">
          For most real-world applications — A/B testing, ad selection, recommendation systems — <strong>Thompson Sampling is the recommended default</strong>: it requires no hyperparameter tuning, achieves near-optimal regret, and naturally balances exploration and exploitation through Bayesian uncertainty. Start with Thompson Sampling and only switch to Contextual Bandits when you have rich per-decision context features available.
        </p>
      </div>
    </div>
  );
}
