import React from 'react';

export function NeuralNetworkDiagram() {
  const nodes = {
    input: [0, 1, 2],
    hidden1: [0, 1, 2, 3],
    hidden2: [0, 1, 2, 3],
    output: [0, 1]
  };

  const getPos = (layerIdx: number, nodeIdx: number, totalNodes: number) => {
    const layerSpacing = 150;
    const nodeSpacing = 60;
    const startX = 50;
    const cy = 150; // center Y
    
    const x = startX + layerIdx * layerSpacing;
    const y = cy + (nodeIdx - (totalNodes - 1) / 2) * nodeSpacing;
    
    return { x, y };
  };

  return (
    <figure className="my-10 not-prose">
      <figcaption className="text-center text-sm font-semibold text-slate-600 mb-4 uppercase tracking-wider">
        Figure — Fully Connected Neural Network Architecture
      </figcaption>
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-8 overflow-x-auto shadow-2xl relative">
        <svg viewBox="0 0 550 300" className="w-full max-w-2xl mx-auto block relative z-10" aria-label="Neural Network Diagram">
          <defs>
             <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
               <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.4" />
               <stop offset="100%" stopColor="#ec4899" stopOpacity="0.4" />
             </linearGradient>
             <radialGradient id="nodeInput">
               <stop offset="0%" stopColor="#818cf8" />
               <stop offset="100%" stopColor="#4f46e5" />
             </radialGradient>
             <radialGradient id="nodeHidden">
               <stop offset="0%" stopColor="#f472b6" />
               <stop offset="100%" stopColor="#db2777" />
             </radialGradient>
             <radialGradient id="nodeOutput">
               <stop offset="0%" stopColor="#34d399" />
               <stop offset="100%" stopColor="#059669" />
             </radialGradient>
             <filter id="glow">
               <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
               <feMerge>
                   <feMergeNode in="coloredBlur"/>
                   <feMergeNode in="SourceGraphic"/>
               </feMerge>
             </filter>
          </defs>

          {/* Edges Input -> Hidden1 */}
          {nodes.input.map(i => 
            nodes.hidden1.map(h => {
              const p1 = getPos(0, i, nodes.input.length);
              const p2 = getPos(1, h, nodes.hidden1.length);
              return <line key={`ih1-${i}-${h}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="url(#edgeGrad)" strokeWidth="1.5" />
            })
          )}

          {/* Edges Hidden1 -> Hidden2 */}
          {nodes.hidden1.map(h1 => 
            nodes.hidden2.map(h2 => {
              const p1 = getPos(1, h1, nodes.hidden1.length);
              const p2 = getPos(2, h2, nodes.hidden2.length);
              return <line key={`h1h2-${h1}-${h2}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="url(#edgeGrad)" strokeWidth="1.5" />
            })
          )}

          {/* Edges Hidden2 -> Output */}
          {nodes.hidden2.map(h2 => 
            nodes.output.map(o => {
              const p1 = getPos(2, h2, nodes.hidden2.length);
              const p2 = getPos(3, o, nodes.output.length);
              return <line key={`h2o-${h2}-${o}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y} stroke="url(#edgeGrad)" strokeWidth="1.5" />
            })
          )}

          {/* Nodes Input */}
          {nodes.input.map(i => {
            const p = getPos(0, i, nodes.input.length);
            return <circle key={`in-${i}`} cx={p.x} cy={p.y} r="14" fill="url(#nodeInput)" filter="url(#glow)" />
          })}

          {/* Nodes Hidden1 */}
          {nodes.hidden1.map(i => {
            const p = getPos(1, i, nodes.hidden1.length);
            return <circle key={`h1-${i}`} cx={p.x} cy={p.y} r="14" fill="url(#nodeHidden)" filter="url(#glow)" />
          })}

          {/* Nodes Hidden2 */}
          {nodes.hidden2.map(i => {
            const p = getPos(2, i, nodes.hidden2.length);
            return <circle key={`h2-${i}`} cx={p.x} cy={p.y} r="14" fill="url(#nodeHidden)" filter="url(#glow)" />
          })}

          {/* Nodes Output */}
          {nodes.output.map(i => {
            const p = getPos(3, i, nodes.output.length);
            return <circle key={`out-${i}`} cx={p.x} cy={p.y} r="14" fill="url(#nodeOutput)" filter="url(#glow)" />
          })}

          {/* Labels */}
          <text x="50" y="270" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Input Layer</text>
          <text x="200" y="270" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Hidden Layer 1</text>
          <text x="350" y="270" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Hidden Layer 2</text>
          <text x="500" y="270" textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="bold">Output Layer</text>

        </svg>
      </div>
    </figure>
  );
}
