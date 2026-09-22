import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Server, Bug, ShieldAlert, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

interface SecurityPostureSummaryProps {
  onNavigateTab: (tabId: string) => void;
}

export const SecurityPostureSummary: React.FC<SecurityPostureSummaryProps> = ({ onNavigateTab }) => {
  const { assets, vulnerabilities, telemetryEvents, controls } = useSecurity();

  const criticalAssetsCount = assets.filter(a => a.criticalityScore >= 9.0).length;
  const openVulnsCount = vulnerabilities.filter(v => v.status !== 'REMEDIATED').length;
  const criticalVulnsCount = vulnerabilities.filter(v => v.severity === 'CRITICAL' && v.status !== 'REMEDIATED').length;
  const avgControlCoverage = Math.round(
    controls.reduce((acc, c) => acc + (c.coveragePercentage || 0), 0) / Math.max(1, controls.length)
  );

  const postureMetrics = [
    {
      label: 'Total Assets',
      value: assets.length,
      subtext: `${assets.filter(a => a.exposureLevel === 'INTERNET_FACING').length} Public Edge`,
      icon: Server,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      tabId: 'telemetry'
    },
    {
      label: 'Critical Assets',
      value: criticalAssetsCount,
      subtext: 'Score ≥ 9.0 / 10',
      icon: AlertTriangle,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30',
      tabId: 'telemetry'
    },
    {
      label: 'Open CVEs',
      value: openVulnsCount,
      subtext: `${vulnerabilities.filter(v => v.exploitAvailableInWild).length} Weaponized`,
      icon: Bug,
      color: 'text-orange-400 bg-orange-500/10 border-orange-500/30',
      tabId: 'prioritization'
    },
    {
      label: 'Critical CVEs',
      value: criticalVulnsCount,
      subtext: 'Requires Urgent Patch',
      icon: ShieldAlert,
      color: 'text-red-400 bg-red-500/10 border-red-500/30',
      tabId: 'prioritization'
    },
    {
      label: 'Security Events',
      value: telemetryEvents.length,
      subtext: 'Normalized Telemetry',
      icon: Activity,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30',
      tabId: 'telemetry'
    },
    {
      label: 'Control Coverage',
      value: `${avgControlCoverage}%`,
      subtext: `${controls.filter(c => c.health === 'OPTIMAL').length}/${controls.length} Optimal`,
      icon: ShieldCheck,
      color: avgControlCoverage >= 75 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30' : 'text-yellow-400 bg-yellow-500/10 border-yellow-500/30',
      tabId: 'risk-engine'
    }
  ];

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Security Posture Summary
          </h2>
          <p className="text-xs text-slate-400">
            Real-time multi-source inventory metrics and baseline control health
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {postureMetrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigateTab(m.tabId)}
              className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 transition-all text-left group flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                  {m.label}
                </span>
                <div className={`p-1.5 rounded-lg border ${m.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              <div>
                <div className="text-xl font-black font-mono text-white group-hover:text-cyan-300 transition-colors">
                  {m.value}
                </div>
                <div className="text-[10px] text-slate-500 truncate mt-0.5">
                  {m.subtext}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
