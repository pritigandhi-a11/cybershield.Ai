import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Check, Plus, Shield, CheckCircle2, Star, Clock } from 'lucide-react';

export const InvestmentActionList: React.FC = () => {
  const { actionsCatalog, selectedActionIds, toggleActionSelection } = useSecurity();

  const tierLabels = {
    TIER_1_MUST_HAVE: { label: 'Tier 1: Mandatory / High Impact', color: 'text-red-400 border-red-500/30 bg-red-500/10' },
    TIER_2_HIGH_ROI: { label: 'Tier 2: High ROI Optimization', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    TIER_3_COMPREHENSIVE: { label: 'Tier 3: Comprehensive Resilience', color: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10' }
  };

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            Security Interventions & ROI Action Catalog
          </h2>
          <p className="text-xs text-slate-400">
            Select or toggle individual security controls to customize your deployment portfolio
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          {selectedActionIds.length} of {actionsCatalog.length} Selected
        </span>
      </div>

      <div className="space-y-3">
        {actionsCatalog.map(action => {
          const isSelected = selectedActionIds.includes(action.id);
          const tier = tierLabels[action.priorityTier];

          return (
            <div
              key={action.id}
              onClick={() => toggleActionSelection(action.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isSelected
                  ? 'bg-slate-900/90 border-emerald-500/50 shadow-md shadow-emerald-950/20'
                  : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700 opacity-80'
              }`}
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border ${
                    isSelected ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'border-slate-700 bg-slate-900'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${tier.color}`}>
                    {tier.label}
                  </span>

                  <span className="text-xs font-bold text-slate-100">
                    {action.title}
                  </span>

                  {action.isRecommended && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <Star className="w-2.5 h-2.5 fill-current" /> AI Pick
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl pl-7">
                  {action.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 text-[11px] font-mono pl-7 pt-1">
                  <span className="text-slate-400">Compliance:</span>
                  {action.complianceTags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px]">
                      {tag}
                    </span>
                  ))}
                  <span>•</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" /> {action.timeToImplementWeeks}w implementation
                  </span>
                </div>
              </div>

              {/* Right Side Cost & ROI Metrics */}
              <div className="flex items-center gap-4 self-end md:self-center flex-shrink-0 font-mono text-right pl-7 md:pl-0">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Unit Cost</span>
                  <span className="font-bold text-slate-200 text-sm">
                    ₹{(action.costInINR / 100000).toFixed(2)} Lakhs
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">Modeled Drop</span>
                  <span className="font-bold text-emerald-400 text-sm">
                    -{action.estimatedRiskReduction} pts
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 uppercase block">ROI Score</span>
                  <span className="font-extrabold text-cyan-300 text-xs px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 inline-block">
                    {action.roiEfficiency}x
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
