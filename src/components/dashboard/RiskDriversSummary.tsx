import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldAlert, AlertCircle, Eye, Server, Shield, Database, Sliders, ArrowRight } from 'lucide-react';

interface RiskDriversSummaryProps {
  onNavigateTab: (tabId: string) => void;
}

export const RiskDriversSummary: React.FC<RiskDriversSummaryProps> = ({ onNavigateTab }) => {
  const { riskState } = useSecurity();
  const { factors } = riskState;

  const driverFactors = [
    {
      label: 'Vulnerability Exposure',
      score: factors.vulnerabilityExposure.score,
      contribution: factors.vulnerabilityExposure.weightedContribution,
      weight: '25%',
      icon: AlertCircle,
      desc: factors.vulnerabilityExposure.explanation,
      status: factors.vulnerabilityExposure.status,
      tabId: 'prioritization'
    },
    {
      label: 'Threat Activity / Telemetry',
      score: factors.threatActivity.score,
      contribution: factors.threatActivity.weightedContribution,
      weight: '20%',
      icon: Eye,
      desc: factors.threatActivity.explanation,
      status: factors.threatActivity.status,
      tabId: 'telemetry'
    },
    {
      label: 'Asset Criticality & Exposure',
      score: factors.assetCriticality.score,
      contribution: factors.assetCriticality.weightedContribution,
      weight: '20%',
      icon: Server,
      desc: factors.assetCriticality.explanation,
      status: factors.assetCriticality.status,
      tabId: 'telemetry'
    },
    {
      label: 'Security Controls Gap',
      score: factors.securityControlsGap.score,
      contribution: factors.securityControlsGap.weightedContribution,
      weight: '15%',
      icon: Shield,
      desc: factors.securityControlsGap.explanation,
      status: factors.securityControlsGap.status,
      tabId: 'risk-engine'
    },
    {
      label: 'Incident & Event Backlog',
      score: factors.incidentHistory.score,
      contribution: factors.incidentHistory.weightedContribution,
      weight: '10%',
      icon: Database,
      desc: factors.incidentHistory.explanation,
      status: factors.incidentHistory.status,
      tabId: 'prioritization'
    }
  ];

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Main Risk Drivers Breakdown
          </h2>
          <p className="text-xs text-slate-400">
            Contributors driving the current {riskState.overallScore}/100 quantified score
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('risk-engine')}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
        >
          Inspect Model <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {driverFactors.map((df, idx) => {
          const Icon = df.icon;
          const barColor =
            df.score >= 75
              ? 'bg-red-500'
              : df.score >= 55
              ? 'bg-orange-500'
              : df.score >= 35
              ? 'bg-yellow-500'
              : 'bg-emerald-500';

          return (
            <div
              key={idx}
              onClick={() => onNavigateTab(df.tabId)}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between text-xs mb-1.5">
                <div className="flex items-center gap-2">
                  <Icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-semibold text-slate-200 group-hover:text-white transition-colors">
                    {df.label}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">({df.weight} weight)</span>
                </div>

                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="text-slate-400 text-[11px]">+{df.contribution} pts</span>
                  <span className="font-bold text-white px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {df.score}/100
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-900 overflow-hidden mb-1.5">
                <div
                  className={`h-full ${barColor} rounded-full transition-all duration-700`}
                  style={{ width: `${df.score}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 line-clamp-1">
                {df.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
