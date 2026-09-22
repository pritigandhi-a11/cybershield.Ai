import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Coins, TrendingDown, ArrowRight, CheckCircle2, Shield } from 'lucide-react';

interface InvestmentSummaryWidgetProps {
  onNavigateTab: (tabId: string) => void;
}

export const InvestmentSummaryWidget: React.FC<InvestmentSummaryWidgetProps> = ({ onNavigateTab }) => {
  const { budgetINR, investmentScenario, riskState } = useSecurity();

  return (
    <div className="cyber-card p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Coins className="w-4 h-4 text-emerald-400" />
              Risk-to-Rupee Investment Summary
            </h2>
            <p className="text-xs text-slate-400">
              Allocated capital efficiency and modeled posture transformation
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
            {investmentScenario.overallRoiScore}x ROI Efficiency
          </span>
        </div>

        {/* Budget Allocation Breakdown Cards */}
        <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-center">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
            <span className="text-[10px] text-slate-400 uppercase block">Available Budget</span>
            <span className="text-sm font-bold text-white mt-0.5 block">
              ₹{(budgetINR / 100000).toFixed(2)}L
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-emerald-500/30">
            <span className="text-[10px] text-emerald-400 uppercase block">Allocated Capital</span>
            <span className="text-sm font-bold text-emerald-300 mt-0.5 block">
              ₹{(investmentScenario.allocatedBudgetINR / 100000).toFixed(2)}L
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-cyan-500/30">
            <span className="text-[10px] text-cyan-400 uppercase block">Remaining Reserve</span>
            <span className="text-sm font-bold text-cyan-300 mt-0.5 block">
              ₹{(investmentScenario.unallocatedBudgetINR / 100000).toFixed(2)}L
            </span>
          </div>
        </div>

        {/* Risk Score Transformation Meter */}
        <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="text-slate-300 font-medium">Current Baseline Risk:</span>
              <strong className="font-mono text-red-400 text-sm">{riskState.overallScore}/100</strong>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-bold">
              <TrendingDown className="w-4 h-4" />
              <span>-{investmentScenario.totalModeledReduction} pts Modeled Drop</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-300 font-medium">Projected Risk:</span>
              <strong className="font-mono text-emerald-400 text-sm">
                {investmentScenario.projectedRiskScore}/100 ({investmentScenario.projectedRiskBand})
              </strong>
            </div>
          </div>

          {/* Progress bar visual */}
          <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-700"
              style={{ width: `${Math.max(15, 100 - investmentScenario.totalModeledReduction * 2.2)}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
        <span className="text-[11px] text-slate-500 italic">
          *Empirical knapsack model output under budget constraints.
        </span>

        <button
          onClick={() => onNavigateTab('investment')}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-colors"
        >
          <span>Run What-If Simulator</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
