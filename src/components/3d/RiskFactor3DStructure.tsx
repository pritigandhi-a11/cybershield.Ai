import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { SlidersHorizontal, ShieldAlert, Cpu, Activity, Server, Flame, Globe2, HelpCircle } from 'lucide-react';

export const RiskFactor3DStructure: React.FC = () => {
  const { riskState, weights } = useSecurity();
  const [activeHoverIdx, setActiveHoverIdx] = useState<number | null>(null);

  const factors = [
    {
      key: 'vulnerabilityExposure',
      name: 'Vulnerability Exposure',
      weight: weights.vulnerabilityExposure,
      weightLabel: '25%',
      score: riskState.factors.vulnerabilityExposure.score,
      contribution: riskState.factors.vulnerabilityExposure.weightedContribution,
      icon: ShieldAlert,
      color: 'from-rose-500 to-red-600',
      borderColor: 'border-rose-500/40',
      glowColor: 'rgba(244, 63, 94, 0.4)',
      desc: 'Known CVE density, CVSS exploitability ratings, and unpatched critical weaknesses.'
    },
    {
      key: 'threatActivity',
      name: 'Threat Activity Telemetry',
      weight: weights.threatActivity,
      weightLabel: '20%',
      score: riskState.factors.threatActivity.score,
      contribution: riskState.factors.threatActivity.weightedContribution,
      icon: Activity,
      color: 'from-amber-500 to-orange-600',
      borderColor: 'border-amber-500/40',
      glowColor: 'rgba(245, 158, 11, 0.4)',
      desc: 'Real-time telemetry event frequency, MITRE ATT&CK correlation, and C2 pulse beacons.'
    },
    {
      key: 'assetCriticality',
      name: 'Asset Criticality & Value',
      weight: weights.assetCriticality,
      weightLabel: '20%',
      score: riskState.factors.assetCriticality.score,
      contribution: riskState.factors.assetCriticality.weightedContribution,
      icon: Server,
      color: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-500/40',
      glowColor: 'rgba(168, 85, 247, 0.4)',
      desc: 'Financial value, operational dependency, and business impact of affected systems.'
    },
    {
      key: 'securityControlsGap',
      name: 'Security Controls Gap',
      weight: weights.securityControlsGap,
      weightLabel: '15%',
      score: riskState.factors.securityControlsGap.score,
      contribution: riskState.factors.securityControlsGap.weightedContribution,
      icon: Cpu,
      color: 'from-blue-500 to-cyan-600',
      borderColor: 'border-cyan-500/40',
      glowColor: 'rgba(6, 182, 212, 0.4)',
      desc: 'Deficiencies in MFA enforcement, EDR agent telemetry coverage, and air-gapped backups.'
    },
    {
      key: 'incidentHistory',
      name: 'Incident History & SOC Alerts',
      weight: weights.incidentHistory,
      weightLabel: '10%',
      score: riskState.factors.incidentHistory.score,
      contribution: riskState.factors.incidentHistory.weightedContribution,
      icon: Flame,
      color: 'from-red-500 to-rose-600',
      borderColor: 'border-red-500/40',
      glowColor: 'rgba(239, 68, 68, 0.4)',
      desc: 'Frequency and severity of active containment triage alerts in the past 90 days.'
    },
    {
      key: 'environmentalExposure',
      name: 'Network & Cloud Exposure',
      weight: weights.environmentalExposure,
      weightLabel: '10%',
      score: riskState.factors.environmentalExposure.score,
      contribution: riskState.factors.environmentalExposure.weightedContribution,
      icon: Globe2,
      color: 'from-emerald-500 to-teal-600',
      borderColor: 'border-emerald-500/40',
      glowColor: 'rgba(16, 185, 129, 0.4)',
      desc: 'Public-facing attack surface, open API gateway ports, and external DMZ perimeters.'
    }
  ];

  return (
    <div className="cyber-card-3d p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">6-Factor Deterministic Mathematical Engine</h3>
            <p className="text-[11px] text-slate-400">Zero-hallucination weighted multi-dimensional risk decomposition</p>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950/80 border border-purple-800/60 text-purple-300 font-bold">
          TOTAL WEIGHT: 100%
        </span>
      </div>

      {/* 3D Interactive Factor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {factors.map((factor, idx) => {
          const Icon = factor.icon;
          const isHovered = activeHoverIdx === idx;

          return (
            <div
              key={factor.key}
              onMouseEnter={() => setActiveHoverIdx(idx)}
              onMouseLeave={() => setActiveHoverIdx(null)}
              className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isHovered
                  ? 'bg-slate-900/95 border-cyan-500/50 shadow-lg -translate-y-1 scale-[1.02]'
                  : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700'
              }`}
              style={{
                boxShadow: isHovered ? `0 10px 25px -5px ${factor.glowColor}` : undefined
              }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-lg bg-gradient-to-br ${factor.color} text-white shadow-sm`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <span className="font-bold text-xs text-white block">{factor.name}</span>
                    <span className="text-[10px] font-mono text-slate-400">Deterministic Weight: <strong>{factor.weightLabel}</strong></span>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <div className="text-xs font-black text-white">{factor.score} <span className="text-[10px] text-slate-400">/ 100</span></div>
                  <div className="text-[10px] text-cyan-400 font-bold">+{factor.contribution.toFixed(1)} pts</div>
                </div>
              </div>

              {/* 3D Animated Progress Bar */}
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className={`h-full bg-gradient-to-r ${factor.color} rounded-full transition-all duration-500 shadow-sm`}
                  style={{ width: `${factor.score}%` }}
                />
              </div>

              {/* Hover description tooltip */}
              {isHovered && (
                <div className="text-[10.5px] text-slate-300 mt-2 pt-2 border-t border-slate-800/80 leading-relaxed animate-fade-in font-sans">
                  {factor.desc}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Formula Summary Footnote */}
      <div className="pt-4 mt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono text-slate-400">
        <span>Formula: Risk = &sum; (Factor Score &times; Weight)</span>
        <span className="text-cyan-300 font-bold">Total Quantified Risk: {riskState.overallScore}/100</span>
      </div>
    </div>
  );
};
