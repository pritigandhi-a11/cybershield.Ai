import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { InvestmentActionList } from '../components/investment/InvestmentActionList';
import { AIRecommendedActionsSummary } from '../components/dashboard/AIRecommendedActionsSummary';
import { ListOrdered, Coins, TrendingDown, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const RecommendationsPage: React.FC = () => {
  const { actionsCatalog, investmentScenario, organization } = useSecurity();

  const selectedActions = actionsCatalog.filter(a => investmentScenario.selectedActionIds.includes(a.id));
  const totalCost = selectedActions.reduce((sum, a) => sum + a.costInINR, 0);
  const totalPoints = investmentScenario.totalModeledReduction;
  const avgRoi = (totalPoints / Math.max(0.1, totalCost / 100000)).toFixed(2);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <ListOrdered className="w-6 h-6 text-teal-400" />
              Prioritized Security Interventions & Strategic Actions
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-teal-500/10 text-teal-300 border border-teal-500/30 rounded-md">
              {actionsCatalog.length} Total Interventions
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Knapsack-optimized remediation backlog for <strong>{organization.name}</strong>, ranking interventions by ROI efficiency (Risk Reduction Points per ₹1 Lakh invested).
          </p>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="text-xs font-semibold text-slate-400 mb-1">Selected Budget Allocation</div>
          <div className="text-2xl font-black text-cyan-400 font-mono">₹{(totalCost / 100000).toFixed(2)} Lakhs</div>
          <div className="text-[11px] text-slate-400 mt-0.5">{selectedActions.length} Actions Active</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="text-xs font-semibold text-slate-400 mb-1">Projected Risk Reduction</div>
          <div className="text-2xl font-black text-emerald-400 font-mono">-{totalPoints.toFixed(1)} Points</div>
          <div className="text-[11px] text-emerald-300 mt-0.5">Modeled Posture Improvement</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="text-xs font-semibold text-slate-400 mb-1">Overall Capital Efficiency</div>
          <div className="text-2xl font-black text-teal-300 font-mono">{avgRoi}x ROI</div>
          <div className="text-[11px] text-teal-400 mt-0.5">Points Reduced per ₹1.0 Lakh</div>
        </div>
      </div>

      {/* AI Grounded Recommendations Summary */}
      <AIRecommendedActionsSummary onNavigateTab={() => {}} />

      {/* Full Interactive Action List */}
      <InvestmentActionList />
    </div>
  );
};
