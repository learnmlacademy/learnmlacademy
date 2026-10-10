import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

const dataPoints = [
  { x: 10, y: 20 },
  { x: 20, y: 35 },
  { x: 30, y: 30 },
  { x: 40, y: 50 },
  { x: 50, y: 45 },
  { x: 60, y: 70 },
  { x: 70, y: 65 },
  { x: 80, y: 85 },
  { x: 90, y: 80 },
];

// Machine best fit line parameters (pre-calculated for simplicity)
// mean_x = 50, mean_y = 53.33
// m = ~0.836, b = 11.51
const machineM = 0.836;
const machineB = 11.51;

export const HumanRegressor: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // User line handles (normalized 0-100 coordinates)
  const [leftHandle, setLeftHandle] = useState(30);
  const [rightHandle, setRightHandle] = useState(70);
  
  const [showMachine, setShowMachine] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Calculate user line equation y = mx + b
  const userM = (rightHandle - leftHandle) / 100;
  const userB = leftHandle;

  // Calculate MSE
  const calcMSE = (m: number, b: number) => {
    let sum = 0;
    dataPoints.forEach(p => {
      const pred = m * p.x + b;
      sum += Math.pow(p.y - pred, 2);
    });
    return (sum / dataPoints.length).toFixed(1);
  };

  const userMSE = calcMSE(userM, userB);
  const machineMSE = calcMSE(machineM, machineB);

  const handlePointerDown = (e: React.PointerEvent, handleType: 'left' | 'right') => {
    e.preventDefault();
    setIsDragging(true);
    const svg = svgRef.current;
    if (!svg) return;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const rect = svg.getBoundingClientRect();
      const relativeY = moveEvent.clientY - rect.top;
      let yVal = 100 - (relativeY / rect.height) * 100;
      yVal = Math.max(0, Math.min(100, yVal)); // Clamp between 0 and 100

      if (handleType === 'left') {
        setLeftHandle(yVal);
      } else {
        setRightHandle(yVal);
      }
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const mapX = (val: number) => `${val}%`;
  const mapY = (val: number) => `${100 - val}%`;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden mb-12">
      <div className="bg-slate-50 p-6 border-b border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-2">Interactive: Be the Algorithm</h3>
        <p className="text-slate-600">Drag the blue handles to find the line that best fits the data points. Then, challenge the machine to see its mathematically perfect prediction.</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm font-bold text-blue-800 uppercase mb-1">Your Error (MSE)</p>
            <p className="text-3xl font-bold text-blue-900">{userMSE}</p>
          </div>
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 relative">
            <p className="text-sm font-bold text-emerald-800 uppercase mb-1">Machine Error (MSE)</p>
            {showMachine ? (
              <motion.p 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="text-3xl font-bold text-emerald-900"
              >
                {machineMSE}
              </motion.p>
            ) : (
              <div className="h-9 flex items-center text-slate-400 font-mono">Hidden</div>
            )}
          </div>
          <div className="flex items-center justify-center">
             <button 
                onClick={() => setShowMachine(true)}
                disabled={showMachine}
                className={`w-full py-3 px-4 rounded-lg font-bold transition-all ${showMachine ? 'bg-slate-100 text-slate-400' : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md'}`}
             >
                {showMachine ? "Machine Revealed" : "Reveal Machine"}
             </button>
          </div>
        </div>

        <div className="relative w-full aspect-[2/1] bg-slate-50 border border-slate-200 rounded-lg touch-none" style={{ cursor: isDragging ? 'grabbing' : 'default' }}>
          <svg ref={svgRef} className="absolute inset-0 w-full h-full overflow-visible">
            {/* Grid lines */}
            {[20, 40, 60, 80].map(val => (
              <g key={val}>
                <line x1="0%" y1={`${val}%`} x2="100%" y2={`${val}%`} stroke="#e2e8f0" strokeDasharray="4 4" />
                <line x1={`${val}%`} y1="0%" x2={`${val}%`} y2="100%" stroke="#e2e8f0" strokeDasharray="4 4" />
              </g>
            ))}

            {/* Error Lines (Residuals) for User */}
            {dataPoints.map((p, i) => {
              const pred = userM * p.x + userB;
              return (
                <line 
                  key={`err-${i}`}
                  x1={mapX(p.x)} 
                  y1={mapY(p.y)} 
                  x2={mapX(p.x)} 
                  y2={mapY(pred)} 
                  stroke="#ef4444" 
                  strokeWidth="2" 
                  strokeDasharray="4 4"
                  opacity={0.5}
                />
              )
            })}

            {/* Machine Line */}
            {showMachine && (
              <motion.line
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                x1="0%"
                y1={mapY(machineB)}
                x2="100%"
                y2={mapY(machineM * 100 + machineB)}
                stroke="#10b981"
                strokeWidth="4"
                strokeDasharray="8 8"
              />
            )}

            {/* User Line */}
            <line 
              x1="0%" 
              y1={mapY(leftHandle)} 
              x2="100%" 
              y2={mapY(rightHandle)} 
              stroke="#3b82f6" 
              strokeWidth="4"
            />

            {/* Data Points */}
            {dataPoints.map((p, i) => (
              <circle 
                key={i} 
                cx={mapX(p.x)} 
                cy={mapY(p.y)} 
                r="6" 
                fill="#1e293b" 
              />
            ))}

            {/* Interactive Handles */}
            <circle 
              cx="0%" 
              cy={mapY(leftHandle)} 
              r="14" 
              fill="#3b82f6" 
              className="cursor-grab hover:scale-110 transition-transform active:cursor-grabbing shadow-lg"
              onPointerDown={(e) => handlePointerDown(e, 'left')}
            />
            <circle 
              cx="100%" 
              cy={mapY(rightHandle)} 
              r="14" 
              fill="#3b82f6" 
              className="cursor-grab hover:scale-110 transition-transform active:cursor-grabbing shadow-lg"
              onPointerDown={(e) => handlePointerDown(e, 'right')}
            />
          </svg>
        </div>
        <div className="mt-4 flex justify-between text-sm font-bold text-slate-500 uppercase tracking-wide">
          <span>X: Independent Variable</span>
          <span>Y: Dependent Variable</span>
        </div>
      </div>
    </div>
  );
};
