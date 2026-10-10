import React, { useState } from 'react';

export const EquationExplorer: React.FC = () => {
  const [slope, setSlope] = useState<number>(1);
  const [intercept, setIntercept] = useState<number>(20);

  // Define scale (0 to 100 on both axes)
  const mapX = (val: number) => `${val}%`;
  const mapY = (val: number) => `${100 - val}%`;

  // Calculate line ends
  const startY = intercept; // when x = 0
  const endY = slope * 100 + intercept; // when x = 100

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-12">
      <div className="bg-indigo-50 p-6 border-b border-indigo-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-indigo-900 mb-1">Equation Explorer</h3>
          <p className="text-indigo-700 text-sm">See how changing the slope (m) and intercept (b) affects the line.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-lg border border-indigo-200 shadow-sm">
          <code className="text-2xl font-mono font-bold text-indigo-900">
            Y = <span className="text-rose-600">{slope.toFixed(1)}</span>X + <span className="text-emerald-600">{intercept}</span>
          </code>
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 flex flex-col justify-center gap-8">
          <div>
             <div className="flex justify-between mb-2">
               <label className="font-bold text-slate-700 flex items-center">
                 <span className="w-4 h-4 rounded-full bg-rose-600 mr-2"></span> Slope (m)
               </label>
               <span className="font-mono font-bold text-rose-600">{slope.toFixed(1)}</span>
             </div>
             <input 
               type="range" 
               min="-2" 
               max="3" 
               step="0.1" 
               value={slope} 
               onChange={(e) => setSlope(parseFloat(e.target.value))}
               className="w-full accent-rose-600"
             />
             <p className="text-xs text-slate-500 mt-2">Controls the steepness and direction of the line.</p>
          </div>

          <div>
             <div className="flex justify-between mb-2">
               <label className="font-bold text-slate-700 flex items-center">
                 <span className="w-4 h-4 rounded-full bg-emerald-600 mr-2"></span> Intercept (b)
               </label>
               <span className="font-mono font-bold text-emerald-600">{intercept}</span>
             </div>
             <input 
               type="range" 
               min="-20" 
               max="80" 
               step="1" 
               value={intercept} 
               onChange={(e) => setIntercept(parseFloat(e.target.value))}
               className="w-full accent-emerald-600"
             />
             <p className="text-xs text-slate-500 mt-2">Controls where the line crosses the Y axis (when X is 0).</p>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="relative w-full aspect-[4/3] bg-slate-50 border border-slate-200 rounded-lg">
            {/* Axis Labels */}
            <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-sm font-bold text-slate-500 tracking-widest uppercase">Y Axis (Output)</div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-500 tracking-widest uppercase">X Axis (Input)</div>

            <svg className="absolute inset-0 w-full h-full overflow-hidden rounded-lg">
              {/* Grid lines */}
              {[20, 40, 60, 80].map(val => (
                <g key={val}>
                  <line x1="0%" y1={`${val}%`} x2="100%" y2={`${val}%`} stroke="#e2e8f0" strokeDasharray="4 4" />
                  <line x1={`${val}%`} y1="0%" x2={`${val}%`} y2="100%" stroke="#e2e8f0" strokeDasharray="4 4" />
                </g>
              ))}

              {/* Central Axis for 0 if we allowed negative coords, but here we stay 0-100 */}
              <line x1="0%" y1="100%" x2="100%" y2="100%" stroke="#94a3b8" strokeWidth="4" />
              <line x1="0%" y1="0%" x2="0%" y2="100%" stroke="#94a3b8" strokeWidth="4" />

              {/* Intercept Highlight Point */}
              <circle 
                cx="0%" 
                cy={mapY(intercept)} 
                r="8" 
                fill="#10b981" 
              />
              <text x="3%" y={mapY(intercept - 3)} fill="#10b981" fontWeight="bold" fontSize="14">
                b = {intercept}
              </text>

              {/* Regression Line */}
              <line 
                x1="0%" 
                y1={mapY(startY)} 
                x2="100%" 
                y2={mapY(endY)} 
                stroke="#6366f1" 
                strokeWidth="4"
              />

              {/* Slope Triangle Indicator (showing rise over run) */}
              {slope > 0 && startY < 80 && (
                <g opacity={0.6}>
                  <line x1="40%" y1={mapY(slope * 40 + intercept)} x2="60%" y2={mapY(slope * 40 + intercept)} stroke="#e11d48" strokeWidth="2" strokeDasharray="4 4" />
                  <line x1="60%" y1={mapY(slope * 40 + intercept)} x2="60%" y2={mapY(slope * 60 + intercept)} stroke="#e11d48" strokeWidth="2" strokeDasharray="4 4" />
                  <text x="62%" y={mapY(slope * 50 + intercept)} fill="#e11d48" fontSize="12" fontWeight="bold">Rise = {slope.toFixed(1)}</text>
                  <text x="45%" y={mapY(slope * 40 + intercept - 3)} fill="#e11d48" fontSize="12" fontWeight="bold">Run = 1</text>
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
