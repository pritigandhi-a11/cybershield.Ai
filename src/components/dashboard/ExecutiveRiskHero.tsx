import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { RiskGauge } from '../common/RiskGauge';
import {
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  Lock,
  Coins,
  Cpu,
  CheckCircle2
} from 'lucide-react';

interface ExecutiveRiskHeroProps {
  onNavigateTab: (tabId: string) => void;
}

export const ExecutiveRiskHero: React.FC<ExecutiveRiskHeroProps> = ({ onNavigateTab }) => {
  const { riskState, organization, investmentScenario, budgetINR } = useSecurity();

  return (
    <div className="cyber-card-glow p-6 relative overflow-hidden">
      {/* Background Decorative Cyber Grid */}
      <div className="absolute inset-0 cyber-grid-bg opacity-30 pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Left: Big Risk Gauge & Risk Level */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <RiskGauge
            score={riskState.overallScore}
            riskBand={riskState.riskBand}
            size="lg"
            showLabel={false}
          />

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-xs font-mono font-black uppercase tracking-wider rounded-md border bg-red-500/20 text-red-300 border-red-500/40">
                {riskState.riskBand} SEVERITY
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Formula {riskState.formulaVersion}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 tracking-tight">
              Quantified Cyber Risk Score
            </h1>

            <p className="text-sm text-slate-300 max-w-xl mt-1 leading-relaxed">
              Real-time multi-vector exposure for <strong className="text-cyan-300">{organization.name}</strong>.
              Confidence interval: <span className="font-mono text-cyan-400">[{riskState.confidenceInterval.min} – {riskState.confidenceInterval.max}]</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs">
              <div className="flex items-center gap-1.5 text-red-400 font-medium">
                <TrendingUp className="w-4 h-4" />
                <span>+7 pts in last 7 days</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-400">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Deterministic Zero-Hallucination Engine</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Investment Optimization Quick Bridge */}
        <div className="w-full lg:w-96 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="flex items-center gap-1 text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                <Coins className="w-3.5 h-3.5" />
                Risk-to-Rupee Target
              </span>
              <span className="font-mono text-white font-bold">
                ₹{(budgetINR / 100000).toFixed(1)} Lakhs Budget
              </span>
            </div>

            <div className="text-sm text-slate-200 mt-2 flex items-center justify-between">
              <span>Projected Risk Score:</span>
              <span className="text-emerald-400 font-mono font-extrabold text-base">
                {investmentScenario.projectedRiskScore}/100 ({investmentScenario.projectedRiskBand})
              </span>
            </div>

            {/* Visual Risk Drop Progress Bar */}
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Current: {riskState.overallScore}</span>
                <span className="text-emerald-300 font-bold">-{investmentScenario.totalModeledReduction} pts modeled drop</span>
                <span>Target: {investmentScenario.projectedRiskScore}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-red-500 via-amber-500 to-emerald-500 rounded-full transition-all duration-700"
                  style={{ width: `${Math.max(15, 100 - investmentScenario.totalModeledReduction * 2.5)}%` }}
                />
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mt-2 italic">
              *Platform-generated empirical model estimate, not a guaranteed result.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('investment')}
            className="mt-4 w-full py-2 px-3 rounded-lg text-xs font-bold bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 border border-cyan-500/40 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Open Investment Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
