import React from 'react';
import { BudgetSliderControls } from '../components/investment/BudgetSliderControls';
import { InvestmentActionList } from '../components/investment/InvestmentActionList';
import { WhatIfSimulator } from '../components/investment/WhatIfSimulator';
import { ExecutivePitchExport } from '../components/investment/ExecutivePitchExport';

export const InvestmentPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Security Investment Optimizer ("Risk-to-Rupee" Engine)
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Solve bounded knapsack capital allocation to maximize risk reduction points per ₹1 Lakh invested.
          </p>
        </div>
      </div>

      {/* Decision Flow Pipeline Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-2 text-slate-300">
          <span className="text-red-400 font-bold">1. Current Risk</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-cyan-400 font-bold">2. Available Budget</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-purple-400 font-bold">3. Interventions Catalog</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-amber-400 font-bold">4. Allocated Capital</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-emerald-400 font-bold">5. Modeled Reduction</span>
          <span className="text-slate-600">&rarr;</span>
          <span className="text-emerald-300 font-extrabold">6. Projected Posture</span>
        </div>
        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          MODELED ESTIMATE / SIMULATION
        </span>
      </div>

      <BudgetSliderControls />
      <WhatIfSimulator />
      <InvestmentActionList />
      <ExecutivePitchExport />
    </div>
  );
};
