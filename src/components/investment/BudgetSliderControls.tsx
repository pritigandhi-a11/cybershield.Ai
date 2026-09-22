import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Coins, Sparkles, Sliders, CheckCircle2, RotateCcw } from 'lucide-react';

export const BudgetSliderControls: React.FC = () => {
  const { budgetINR, setBudgetINR, autoOptimizeBudget, investmentScenario, riskState } = useSecurity();

  const presets = [
    { label: '₹1 Lakh', value: 100000 },
    { label: '₹2 Lakhs', value: 200000 },
    { label: '₹3.5 Lakhs', value: 350000 },
    { label: '₹5 Lakhs', value: 500000 },
    { label: '₹7.5 Lakhs', value: 750000 },
    { label: '₹10 Lakhs', value: 1000000 },
  ];

  return (
    <div className="cyber-card p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Coins className="w-4 h-4 text-emerald-400" />
            Security Budget Allocation & Risk-to-Rupee Engine
          </h2>
          <p className="text-xs text-slate-400">
            Slide available cybersecurity budget to simulate maximum risk reduction and optimize portfolio ROI
          </p>
        </div>

        <button
          onClick={autoOptimizeBudget}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 transition-colors shadow-sm"
          title="Reset to AI Knapsack Global Optimum"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Auto-Optimize Portfolio</span>
        </button>
      </div>

      {/* Main Slider & Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Slider & Presets */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Available Security Budget:
            </span>
            <span className="text-2xl font-black font-mono text-white tracking-tight">
              ₹{(budgetINR / 100000).toFixed(2)} <span className="text-sm text-cyan-400 font-bold">Lakhs</span>
              <span className="text-xs text-slate-400 font-normal ml-1">
                (₹{budgetINR.toLocaleString('en-IN')})
              </span>
            </span>
          </div>

          {/* Interactive Range Input */}
          <div className="space-y-1">
            <input
              type="range"
              min={50000}
              max={1000000}
              step={25000}
              value={budgetINR}
              onChange={(e) => setBudgetINR(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-emerald-400 border border-slate-800"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-400">
              <span>₹50,000 (Min)</span>
              <span>₹5,00,000</span>
              <span>₹10,00,000 (Max)</span>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="text-[11px] font-mono text-slate-400 self-center mr-1">Quick Presets:</span>
            {presets.map(p => (
              <button
                key={p.value}
                onClick={() => setBudgetINR(p.value)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors border ${
                  budgetINR === p.value
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 font-bold'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic ROI Stat Badge */}
        <div className="lg:col-span-4 p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2 font-mono text-xs">
          <div className="flex justify-between text-slate-300">
            <span>Allocated Capital:</span>
            <span className="text-white font-bold">
              ₹{(investmentScenario.allocatedBudgetINR / 100000).toFixed(2)}L
            </span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>Unallocated Reserve:</span>
            <span className="text-cyan-400 font-bold">
              ₹{(investmentScenario.unallocatedBudgetINR / 100000).toFixed(2)}L
            </span>
          </div>
          <div className="flex justify-between text-slate-300">
            <span>ROI Efficiency:</span>
            <span className="text-emerald-400 font-bold">
              {investmentScenario.overallRoiScore} pts / ₹1L
            </span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex justify-between text-slate-200">
            <span>Selected Actions:</span>
            <span className="text-purple-300 font-bold">
              {investmentScenario.selectedActionIds.length} Interventions
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
