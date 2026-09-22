import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Sparkles, ArrowRight, Coins, ShieldAlert, Star } from 'lucide-react';

interface AIRecommendedActionsSummaryProps {
  onNavigateTab: (tabId: string) => void;
}

export const AIRecommendedActionsSummary: React.FC<AIRecommendedActionsSummaryProps> = ({ onNavigateTab }) => {
  const { actionsCatalog, investmentScenario } = useSecurity();

  // Top recommended actions (Tier 1 & High ROI)
  const topRecommendations = actionsCatalog
    .filter(a => a.isRecommended || a.priorityTier === 'TIER_1_MUST_HAVE')
    .slice(0, 3);

  const priorityStyles = {
    TIER_1_MUST_HAVE: 'bg-red-500/20 text-red-300 border-red-500/30',
    TIER_2_HIGH_ROI: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    TIER_3_COMPREHENSIVE: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
  };

  const priorityLabels = {
    TIER_1_MUST_HAVE: 'Tier 1: Mandatory',
    TIER_2_HIGH_ROI: 'Tier 2: High ROI',
    TIER_3_COMPREHENSIVE: 'Tier 3: Standard'
  };

  return (
    <div className="cyber-card p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              AI-Prioritized Remediation Actions
            </h2>
            <p className="text-xs text-slate-400">
              Highest-yield security actions calculated by the Risk-to-Rupee engine
            </p>
          </div>

          <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
            Knapsack Optimized
          </span>
        </div>

        <div className="space-y-2.5">
          {topRecommendations.map((action, idx) => (
            <div
              key={action.id}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px] flex items-center justify-center font-bold">
                    #{idx + 1}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${priorityStyles[action.priorityTier]}`}>
                    {priorityLabels[action.priorityTier]}
                  </span>
                  <span className="font-semibold text-xs text-slate-200">
                    {action.title}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-1 pl-7">
                  {action.description}
                </p>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-center flex-shrink-0 font-mono text-right pl-7 sm:pl-0">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Cost</span>
                  <span className="text-xs font-bold text-slate-200">
                    ₹{(action.costInINR / 100000).toFixed(2)}L
                  </span>
                </div>

                <div>
                  <span className="text-[9px] text-slate-500 uppercase block">Risk Drop</span>
                  <span className="text-xs font-bold text-emerald-400">
                    -{action.estimatedRiskReduction} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Selected Portfolio Yields: <strong className="text-emerald-400 font-mono">-{investmentScenario.totalModeledReduction} points</strong> reduction
        </span>

        <button
          onClick={() => onNavigateTab('investment')}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 transition-colors"
        >
          <span>Open Investment Optimizer</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
