import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Coins,
  TrendingDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sliders,
  DollarSign,
  Award,
  Zap
} from 'lucide-react';

export const RiskToRupee3DExperience: React.FC = () => {
  const {
    budgetINR,
    setBudgetINR,
    riskState,
    investmentScenario,
    actionsCatalog,
    organization,
    autoOptimizeBudget
  } = useSecurity();

  const currentScore = riskState.overallScore;
  const projectedScore = investmentScenario.projectedRiskScore;
  const reduction = investmentScenario.totalModeledReduction;
  const allocated = investmentScenario.allocatedBudgetINR;
  const efficiency = (reduction / Math.max(0.1, allocated / 100000)).toFixed(1);

  const selectedActions = actionsCatalog.filter(a =>
    investmentScenario.selectedActionIds.includes(a.id)
  );

  return (
    <div className="cyber-card-3d p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/30 border border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/10">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-black text-sm sm:text-base text-white tracking-tight">
                "Risk-to-Rupee" 3D Investment Optimization Engine
              </h3>
              <span className="px-2 py-0.5 text-[9.5px] font-mono font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded">
                KNAPSACK SOLVER
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Optimal capital allocation maximizing quantified risk points reduction per ₹1 Lakh invested
            </p>
          </div>
        </div>

        <button
          onClick={autoOptimizeBudget}
          className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm cursor-pointer self-start sm:self-auto"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>Re-Optimize ROI</span>
        </button>
      </div>

      {/* Main 3D Balance & Financial-Risk Visualizer */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        
        {/* Step 1: Baseline Current Risk */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800 shadow-lg relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span className="font-mono text-[10px] font-semibold text-rose-400">CURRENT BASELINE</span>
            <span className="text-[10px] font-mono">AS-IS POSTURE</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-rose-400 font-mono">
            {currentScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-rose-300/80 font-medium mt-1">
            {riskState.riskBand}
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10.5px] text-slate-400">
            Unmitigated organizational exposure
          </div>
        </div>

        {/* Step 2: Optimal Capital Allocation */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900/90 to-slate-950 border border-cyan-500/40 shadow-xl shadow-cyan-950/30 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-cyan-400 mb-2">
            <span className="font-mono text-[10px] font-semibold">SECURITY INVESTMENT</span>
            <span className="px-1.5 py-0.2 rounded text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-mono">
              {efficiency}x ROI
            </span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-cyan-300 font-mono">
            ₹{(allocated / 100000).toFixed(2)}L
          </div>
          <div className="text-xs text-cyan-400 font-bold mt-1">
            {selectedActions.length} Interventions Selected
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10.5px] text-slate-400">
            Allocated from ₹{(budgetINR / 100000).toFixed(2)}L limit
          </div>
        </div>

        {/* Step 3: Optimized Projected Risk */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-slate-900/90 to-slate-950 border border-emerald-500/40 shadow-xl shadow-emerald-950/30 relative overflow-hidden group">
          <div className="flex items-center justify-between text-xs text-emerald-400 mb-2">
            <span className="font-mono text-[10px] font-semibold">PROJECTED POSTURE</span>
            <span className="text-[10px] font-mono text-emerald-300 font-bold">-{reduction.toFixed(1)} PTS</span>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
            {projectedScore} <span className="text-xs text-slate-400 font-normal">/ 100</span>
          </div>
          <div className="text-xs text-emerald-300 font-bold mt-1 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Risk Reduced by {reduction.toFixed(1)} Points</span>
          </div>
          <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10.5px] text-slate-400">
            Target post-remediation posture
          </div>
        </div>
      </div>

      {/* Interactive Budget Slider with Live Real-Time Knapsack Resolution */}
      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800/80 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Simulate Available Security Budget (INR):</span>
          </span>
          <span className="text-base font-black text-cyan-300 font-mono">
            ₹{(budgetINR / 100000).toFixed(2)} Lakhs
          </span>
        </div>

        <input
          type="range"
          min="50000"
          max="1000000"
          step="25000"
          value={budgetINR}
          onChange={(e) => setBudgetINR(Number(e.target.value))}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1.5">
          <span>₹0.50 Lakhs (Min)</span>
          <span>₹5.00 Lakhs (Base)</span>
          <span>₹10.00 Lakhs (Max)</span>
        </div>
      </div>

      {/* Top 3 Prioritized Actions Breakdown */}
      <div>
        <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-3">
          <span>Top Knapsack Selected Security Actions (Highest ROI First):</span>
          <span className="text-[11px] text-emerald-400 font-mono font-bold">
            Efficiency: {efficiency} pts / ₹1.0L
          </span>
        </div>

        <div className="space-y-2">
          {selectedActions.slice(0, 3).map((act, idx) => (
            <div
              key={act.id}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 flex items-center justify-between gap-3 transition-all"
            >
              <div className="flex items-center gap-2.5 truncate">
                <span className="w-6 h-6 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono flex items-center justify-center flex-shrink-0">
                  0{idx + 1}
                </span>
                <div className="truncate">
                  <div className="font-bold text-xs text-white truncate">{act.title}</div>
                  <div className="text-[10px] font-mono text-slate-400">
                    Budget: <strong>₹{(act.costInINR / 100000).toFixed(2)}L</strong> • ROI: <strong className="text-teal-300">{act.roiEfficiency.toFixed(2)} pts/₹L</strong>
                  </div>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <span className="text-xs font-black text-emerald-400 font-mono block">
                  -{act.estimatedRiskReduction.toFixed(1)} pts
                </span>
                <span className="text-[9.5px] text-emerald-300/80 uppercase font-mono font-semibold">
                  High Impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
