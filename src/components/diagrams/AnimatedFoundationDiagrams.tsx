import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const AnimatedWhatIsML = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-8 my-8 shadow-lg overflow-hidden">
      <h3 className="text-white text-xl font-bold mb-6 text-center">Traditional Programming vs Machine Learning</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Traditional */}
        <div className="bg-slate-800 rounded-lg p-6 relative h-64 flex flex-col items-center border border-slate-700">
          <h4 className="text-slate-300 font-semibold mb-4">Traditional Programming</h4>
          <div className="flex gap-4 absolute top-16">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, repeat: Infinity, repeatDelay: 3 }} className="bg-blue-500 text-white px-3 py-1 rounded">Rules</motion.div>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, repeat: Infinity, repeatDelay: 3 }} className="bg-emerald-500 text-white px-3 py-1 rounded">Data</motion.div>
          </div>
          <motion.div className="w-24 h-24 bg-slate-700 rounded border-2 border-slate-500 flex items-center justify-center mt-12 z-10">
            <span className="text-2xl">💻</span>
          </motion.div>
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ delay: 2, repeat: Infinity, repeatDelay: 3 }} className="bg-amber-500 text-white px-4 py-2 rounded mt-2 font-bold z-20">
            Answers
          </motion.div>
          {/* Arrows */}
          <motion.div className="absolute top-24 w-0.5 h-10 bg-slate-500" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} style={{ originY: 0 }} />
        </div>
        
        {/* Machine Learning */}
        <div className="bg-indigo-950 rounded-lg p-6 relative h-64 flex flex-col items-center border border-indigo-800">
          <h4 className="text-indigo-200 font-semibold mb-4">Machine Learning</h4>
          <div className="flex gap-4 absolute top-16">
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, repeat: Infinity, repeatDelay: 3 }} className="bg-amber-500 text-white px-3 py-1 rounded">Answers</motion.div>
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, repeat: Infinity, repeatDelay: 3 }} className="bg-emerald-500 text-white px-3 py-1 rounded">Data</motion.div>
          </div>
          <motion.div className="w-24 h-24 bg-indigo-900 rounded border-2 border-indigo-500 flex items-center justify-center mt-12 z-10">
            <motion.span animate={{ rotate: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="text-2xl block">⚙️</motion.span>
          </motion.div>
          <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ delay: 2.5, repeat: Infinity, repeatDelay: 3 }} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 font-bold z-20">
            Rules (Model)
          </motion.div>
          <motion.div className="absolute top-24 w-0.5 h-10 bg-indigo-500" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 1.5, duration: 0.5, repeat: Infinity, repeatDelay: 3 }} style={{ originY: 0 }} />
        </div>
      </div>
    </div>
  );
};

export const AnimatedTypesOfML = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-8 my-8 shadow-lg">
      <h3 className="text-white text-xl font-bold mb-8 text-center">The Three Main Paradigms</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Supervised */}
        <div className="bg-slate-800 rounded-lg p-5 border border-indigo-500/30 flex flex-col items-center">
          <h4 className="text-indigo-400 font-bold mb-2">Supervised Learning</h4>
          <p className="text-slate-400 text-xs text-center mb-6">Learning with Labels</p>
          <div className="relative w-32 h-32">
            <motion.div className="absolute top-2 left-2 w-6 h-6 bg-rose-500 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} />
            <motion.div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} />
            <motion.div className="absolute bottom-2 left-6 w-6 h-6 bg-rose-500 rounded-full" animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2, delay: 1 }} />
            
            {/* Labels floating in */}
            <motion.div className="absolute top-0 left-0 bg-white text-xs px-1 rounded text-rose-600 font-bold" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}>Apple</motion.div>
            <motion.div className="absolute top-0 right-0 bg-white text-xs px-1 rounded text-blue-600 font-bold" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ repeat: Infinity, duration: 2, delay: 0.7 }}>Box</motion.div>
            
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-indigo-500/50 -rotate-45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ repeat: Infinity, duration: 2, delay: 1.5 }} />
          </div>
        </div>

        {/* Unsupervised */}
        <div className="bg-slate-800 rounded-lg p-5 border border-emerald-500/30 flex flex-col items-center">
          <h4 className="text-emerald-400 font-bold mb-2">Unsupervised Learning</h4>
          <p className="text-slate-400 text-xs text-center mb-6">Discovering Patterns</p>
          <div className="relative w-32 h-32">
            {/* Scattered points that group up */}
            {[...Array(6)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-3 h-3 bg-emerald-400 rounded-full"
                initial={{ x: Math.random() * 100, y: Math.random() * 100 }}
                animate={{ 
                  x: i < 3 ? 20 + Math.random()*10 : 80 + Math.random()*10, 
                  y: i < 3 ? 20 + Math.random()*10 : 80 + Math.random()*10 
                }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
              />
            ))}
            {/* Cluster circles */}
            <motion.div className="absolute top-4 left-4 w-16 h-16 border border-emerald-500/50 rounded-full" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} />
            <motion.div className="absolute bottom-4 right-4 w-16 h-16 border border-emerald-500/50 rounded-full" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }} />
          </div>
        </div>

        {/* Reinforcement */}
        <div className="bg-slate-800 rounded-lg p-5 border border-amber-500/30 flex flex-col items-center">
          <h4 className="text-amber-400 font-bold mb-2">Reinforcement Learning</h4>
          <p className="text-slate-400 text-xs text-center mb-6">Learning by Trial</p>
          <div className="relative w-32 h-32 grid grid-cols-3 grid-rows-3 gap-1 p-2 bg-slate-700/50 rounded">
            {/* Grid cells */}
            {[...Array(9)].map((_, i) => <div key={i} className="bg-slate-700 rounded" />)}
            {/* Agent */}
            <motion.div 
              className="absolute w-6 h-6 bg-amber-500 rounded-full ml-3 mt-3 shadow-[0_0_10px_rgba(245,158,11,0.5)] z-10 flex items-center justify-center text-[10px]"
              animate={{ 
                x: [0, 32, 64, 64], 
                y: [0, 0, 0, 32] 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >🤖</motion.div>
            {/* Reward */}
            <div className="absolute bottom-3 right-3 text-lg z-0 animate-pulse">⭐</div>
            {/* Fire/Penalty */}
            <div className="absolute bottom-3 left-3 text-lg z-0 opacity-50">🔥</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export const AnimatedSupervised = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-8 my-8 shadow-lg">
      <h3 className="text-white text-xl font-bold mb-8 text-center">Classification vs Regression</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Classification */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col items-center">
          <h4 className="text-indigo-400 font-bold mb-4">Classification (Categories)</h4>
          <div className="relative w-full h-48 bg-slate-900 rounded overflow-hidden">
            {/* Points */}
            <motion.div className="absolute top-8 left-8 w-4 h-4 bg-rose-500 rounded-full" />
            <motion.div className="absolute top-12 left-16 w-4 h-4 bg-rose-500 rounded-full" />
            <motion.div className="absolute top-20 left-10 w-4 h-4 bg-rose-500 rounded-full" />
            
            <motion.div className="absolute bottom-8 right-8 w-4 h-4 bg-blue-500 rounded-sm" />
            <motion.div className="absolute bottom-16 right-12 w-4 h-4 bg-blue-500 rounded-sm" />
            <motion.div className="absolute bottom-12 right-20 w-4 h-4 bg-blue-500 rounded-sm" />

            {/* Decision Boundary */}
            <motion.svg className="absolute inset-0 w-full h-full">
              <motion.line 
                x1="0" y1="100%" x2="100%" y2="0" 
                stroke="#6366f1" strokeWidth="3" strokeDasharray="5,5"
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.svg>
          </div>
        </div>

        {/* Regression */}
        <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 flex flex-col items-center">
          <h4 className="text-emerald-400 font-bold mb-4">Regression (Continuous)</h4>
          <div className="relative w-full h-48 bg-slate-900 rounded overflow-hidden">
            {/* Points (Trend) */}
            <motion.div className="absolute bottom-8 left-8 w-3 h-3 bg-slate-400 rounded-full" />
            <motion.div className="absolute bottom-12 left-16 w-3 h-3 bg-slate-400 rounded-full" />
            <motion.div className="absolute bottom-16 left-24 w-3 h-3 bg-slate-400 rounded-full" />
            <motion.div className="absolute bottom-24 left-32 w-3 h-3 bg-slate-400 rounded-full" />
            <motion.div className="absolute top-16 right-16 w-3 h-3 bg-slate-400 rounded-full" />
            <motion.div className="absolute top-8 right-8 w-3 h-3 bg-slate-400 rounded-full" />

            {/* Line of best fit */}
            <motion.svg className="absolute inset-0 w-full h-full">
              <motion.line 
                x1="10%" y1="90%" x2="90%" y2="10%" 
                stroke="#10b981" strokeWidth="4"
                initial={{ pathLength: 0 }} 
                animate={{ pathLength: 1 }} 
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
            </motion.svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AnimatedUnsupervised = () => {
  const points = Array.from({ length: 30 });
  return (
    <div className="bg-slate-900 rounded-xl p-8 my-8 shadow-lg">
      <h3 className="text-white text-xl font-bold mb-6 text-center">Clustering: Discovering Hidden Structure</h3>
      <div className="relative w-full max-w-lg mx-auto h-64 bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
        {/* Render random points that then snap to 3 clusters */}
        {points.map((_, i) => {
          const isA = i % 3 === 0;
          const isB = i % 3 === 1;
          const targetX = isA ? 25 : isB ? 75 : 50;
          const targetY = isA ? 30 : isB ? 30 : 70;
          
          return (
            <motion.div 
              key={i}
              className="absolute w-3 h-3 rounded-full opacity-70"
              initial={{ 
                x: Math.random() * 300 + 50, 
                y: Math.random() * 200 + 20, 
                backgroundColor: '#94a3b8' // slate-400
              }}
              animate={{ 
                x: targetX * 4 + (Math.random() * 40 - 20), 
                y: targetY * 2.5 + (Math.random() * 40 - 20),
                backgroundColor: isA ? '#6366f1' : isB ? '#10b981' : '#f43f5e'
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", repeatDelay: 1 }}
            />
          );
        })}
        
        {/* Centroids */}
        <motion.div className="absolute top-[30%] left-[25%] w-6 h-6 border-2 border-white rounded-full flex items-center justify-center bg-indigo-500 z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}>×</motion.div>
        <motion.div className="absolute top-[30%] left-[75%] w-6 h-6 border-2 border-white rounded-full flex items-center justify-center bg-emerald-500 z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}>×</motion.div>
        <motion.div className="absolute top-[70%] left-[50%] w-6 h-6 border-2 border-white rounded-full flex items-center justify-center bg-rose-500 z-10" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse", repeatDelay: 3 }}>×</motion.div>
      </div>
    </div>
  );
};

export const AnimatedReinforcement = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-8 my-8 shadow-lg">
      <h3 className="text-white text-xl font-bold mb-6 text-center">Learning through Interaction (Trial & Error)</h3>
      <div className="relative w-full max-w-sm mx-auto h-64 bg-slate-800 rounded-lg border border-slate-700 grid grid-cols-4 grid-rows-4 gap-1 p-2">
        {/* Grid cells */}
        {[...Array(16)].map((_, i) => (
          <div key={i} className="bg-slate-700 rounded relative">
            {i === 5 || i === 10 ? <div className="absolute inset-0 flex items-center justify-center text-2xl opacity-80">🔥</div> : null}
            {i === 15 ? <div className="absolute inset-0 flex items-center justify-center text-3xl animate-pulse">⭐</div> : null}
          </div>
        ))}
        
        {/* Agent */}
        <motion.div 
          className="absolute w-12 h-12 bg-amber-500 rounded flex items-center justify-center text-2xl shadow-[0_0_15px_rgba(245,158,11,0.6)] z-10"
          animate={{ 
            x: [10, 100, 100, 190, 190, 280, 280], 
            y: [10, 10, 70, 70, 190, 190, 190] 
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        >
          🤖
        </motion.div>
        
        {/* Score/Reward floating up */}
        <motion.div 
          className="absolute bottom-4 right-4 text-emerald-400 font-bold text-xl z-20"
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -40, opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 1] }}
        >
          +100
        </motion.div>
      </div>
    </div>
  );
};

export const AnimatedBatchVsOnline = () => {
  return (
    <div className="bg-slate-900 rounded-xl p-8 my-8 shadow-lg">
      <h3 className="text-white text-xl font-bold mb-8 text-center">Batch vs Online Learning</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Batch */}
        <div className="bg-slate-800 rounded-lg p-6 border border-blue-500/30 flex flex-col items-center h-72 relative">
          <h4 className="text-blue-400 font-bold mb-2">Batch Learning</h4>
          <p className="text-slate-400 text-xs mb-8">Periodic heavy training</p>
          
          <div className="w-16 h-24 border-2 border-blue-500 rounded-b-lg relative overflow-hidden mb-4 bg-slate-900">
            {/* Fill up data */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 bg-blue-500"
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white z-10 drop-shadow-md">Data</div>
          </div>
          
          <motion.div 
            className="w-12 h-12 bg-indigo-600 rounded flex items-center justify-center text-xl z-20 border-2 border-indigo-400"
            initial={{ scale: 1, backgroundColor: "#4f46e5" }}
            animate={{ scale: [1, 1.2, 1], backgroundColor: ["#4f46e5", "#10b981", "#4f46e5"] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, times: [0.9, 0.95, 1] }}
          >
            🧠
          </motion.div>
          <motion.div 
            className="absolute bottom-8 bg-blue-500/20 px-3 py-1 rounded text-blue-300 text-xs font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 1, times: [0.9, 0.95, 1] }}
          >
            TRAIN!
          </motion.div>
        </div>

        {/* Online */}
        <div className="bg-slate-800 rounded-lg p-6 border border-amber-500/30 flex flex-col items-center h-72 relative">
          <h4 className="text-amber-400 font-bold mb-2">Online Learning</h4>
          <p className="text-slate-400 text-xs mb-8">Continuous real-time updates</p>
          
          <div className="h-24 w-full flex items-center justify-center relative mb-4">
            {/* Streaming data points */}
            {[...Array(5)].map((_, i) => (
              <motion.div 
                key={i}
                className="absolute w-3 h-3 bg-amber-400 rounded-full"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.4, ease: "linear" }}
              />
            ))}
            <div className="w-16 h-8 border-y-2 border-r-2 border-amber-500/50 rounded-r opacity-30" />
          </div>
          
          <motion.div 
            className="w-12 h-12 bg-amber-600 rounded flex items-center justify-center text-xl z-20 border-2 border-amber-400"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.4, repeat: Infinity }}
          >
            🧠
          </motion.div>
          <div className="absolute bottom-8 bg-amber-500/20 px-3 py-1 rounded text-amber-300 text-xs font-bold animate-pulse">
            UPDATING
          </div>
        </div>

      </div>
    </div>
  );
};

export const AnimatedMLLifecycle = () => {
  const steps = [
    { name: "Business Problem", icon: "🎯", color: "bg-blue-500" },
    { name: "Data Collection", icon: "📊", color: "bg-emerald-500" },
    { name: "Prep & Clean", icon: "🧹", color: "bg-amber-500" },
    { name: "Model Training", icon: "🧠", color: "bg-purple-500" },
    { name: "Evaluation", icon: "✅", color: "bg-rose-500" },
    { name: "Deployment", icon: "🚀", color: "bg-indigo-500" },
    { name: "Monitoring", icon: "📈", color: "bg-cyan-500" },
  ];

  return (
    <div className="bg-slate-900 rounded-xl p-8 my-8 shadow-lg">
      <h3 className="text-white text-xl font-bold mb-12 text-center">The Iterative ML Lifecycle</h3>
      <div className="relative w-full max-w-md mx-auto h-80 flex items-center justify-center">
        {/* Circle path */}
        <div className="absolute w-64 h-64 border-2 border-slate-700 rounded-full border-dashed" />
        
        {steps.map((step, index) => {
          const angle = (index * (360 / steps.length) - 90) * (Math.PI / 180);
          const x = Math.cos(angle) * 128; // radius 128
          const y = Math.sin(angle) * 128;
          
          return (
            <motion.div 
              key={index}
              className={`absolute w-14 h-14 ${step.color} rounded-full flex flex-col items-center justify-center shadow-lg z-10 border-4 border-slate-900`}
              style={{ left: `calc(50% + ${x}px - 28px)`, top: `calc(50% + ${y}px - 28px)` }}
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.5, 1, 0.5],
                boxShadow: ["0 0 0 rgba(0,0,0,0)", "0 0 20px rgba(255,255,255,0.5)", "0 0 0 rgba(0,0,0,0)"]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: index * 0.5,
                times: [0, 0.5, 1]
              }}
            >
              <span className="text-2xl">{step.icon}</span>
              <span className="absolute -bottom-6 whitespace-nowrap text-xs font-bold text-slate-300">{step.name}</span>
            </motion.div>
          );
        })}
        
        {/* Center element showing iteration */}
        <div className="text-center z-0">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="text-slate-600 text-4xl opacity-30"
          >
            ↻
          </motion.div>
          <div className="text-slate-500 font-bold text-sm mt-2 uppercase tracking-widest">Iterate</div>
        </div>
      </div>
    </div>
  );
};

export const AnimatedAnalogy = () => {
  return (
    <div className="bg-emerald-900 rounded-xl p-8 my-8 shadow-lg overflow-hidden relative h-[350px]">
      <h3 className="text-white text-xl font-bold mb-6 text-center">How Humans (and Machines) Learn</h3>
      
      {/* Examples arriving */}
      <motion.div 
        className="absolute top-20 left-10 flex flex-col gap-4 z-10"
      >
        <motion.div 
          className="bg-white rounded-lg p-3 shadow-md flex items-center gap-3 border border-emerald-500"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <span className="text-3xl">🍎</span>
          <span className="font-bold text-slate-700">"Apple"</span>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-3 shadow-md flex items-center gap-3 border border-emerald-500"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="text-3xl">🍌</span>
          <span className="font-bold text-slate-700">"Banana"</span>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-3 shadow-md flex items-center gap-3 border border-emerald-500"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 2.5 }}
        >
          <span className="text-3xl">🍊</span>
          <span className="font-bold text-slate-700">"Orange"</span>
        </motion.div>
      </motion.div>

      {/* The Brain / Model */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-6 w-32 h-32 bg-indigo-600 rounded-full flex flex-col items-center justify-center text-white font-bold z-20 shadow-[0_0_30px_rgba(79,70,229,0.6)]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: [0.8, 1, 1], opacity: 1 }}
        transition={{ duration: 1, delay: 3.5 }}
      >
        <span className="text-4xl mb-1">🧠</span>
        <span className="text-xs uppercase tracking-widest text-indigo-200">Learning</span>
        <motion.div 
          className="absolute inset-0 border-4 border-indigo-400 rounded-full"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity, delay: 4.5 }}
        />
      </motion.div>

      {/* Data flowing to the brain */}
      <svg className="absolute inset-0 w-full h-full z-0">
        <motion.path 
          d="M 180 100 Q 250 150 320 200" 
          fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 1 }}
        />
        <motion.path 
          d="M 180 180 Q 250 190 320 200" 
          fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 2 }}
        />
        <motion.path 
          d="M 180 260 Q 250 230 320 200" 
          fill="none" stroke="#34d399" strokeWidth="3" strokeDasharray="5 5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.5 }}
          transition={{ duration: 1, delay: 3 }}
        />
        {/* Line out */}
        <motion.path 
          d="M 450 200 L 520 200" 
          fill="none" stroke="#818cf8" strokeWidth="4"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 5.5 }}
        />
      </svg>

      {/* Prediction Output */}
      <motion.div 
        className="absolute top-1/2 right-10 -translate-y-1/2 mt-6 bg-slate-800 border-2 border-indigo-400 rounded-lg p-4 shadow-xl z-10 w-48 text-center"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 6.5 }}
      >
        <span className="text-slate-300 text-sm font-bold block mb-2 uppercase tracking-wide">New Input</span>
        <div className="bg-slate-700 rounded p-2 mb-3">
          <span className="text-3xl">🍏</span>
        </div>
        <motion.div 
          className="bg-emerald-500 text-white font-bold rounded py-1 px-3 shadow"
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.5, delay: 8 }}
        >
          Predicted: "Apple"
        </motion.div>
      </motion.div>

    </div>
  );
};
