import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { AlertTriangle, Wrench, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { SeverityBadge } from '../common/StatusBadge';

interface TopRiskDriversProps {
  onNavigateTab: (tabId: string) => void;
}

export const TopRiskDrivers: React.FC<TopRiskDriversProps> = ({ onNavigateTab }) => {
  const { riskState, remediateVulnerability } = useSecurity();
  const { topDrivers } = riskState;

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            Top Risk Drivers & Exposure Points
          </h2>
          <p className="text-xs text-slate-400">
            Highest impact contributors to current risk score (Sorted by realized impact)
          </p>
        </div>
        <button
          onClick={() => onNavigateTab('prioritization')}
          className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
        >
          View Full Backlog <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="space-y-3">
        {topDrivers.map((driver, idx) => (
          <div
            key={driver.id || idx}
            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
          >
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center font-mono font-bold text-xs flex-shrink-0 mt-0.5 sm:mt-0">
                #{idx + 1}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-xs text-slate-200 group-hover:text-white transition-colors">
                    {driver.title}
                  </span>
                  <SeverityBadge severity={driver.severity} />
                </div>

                <div className="flex flex-wrap items-center gap-3 mt-1 text-[11px] text-slate-400">
                  <span className="text-slate-300 font-mono">
                    Target: <span className="text-cyan-300">{driver.assetName}</span>
                  </span>
                  <span>•</span>
                  <span className="text-slate-400 italic">
                    Fix: {driver.remediationSnippet}
                  </span>
                </div>
              </div>
            </div>

            {/* Impact score badge & Action */}
            <div className="flex items-center gap-3 self-end sm:self-center flex-shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono text-slate-400 block">Risk Impact</span>
                <span className="font-mono font-black text-red-400 text-sm">
                  +{driver.impactScore} pts
                </span>
              </div>

              <button
                onClick={() => onNavigateTab('prioritization')}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-cyan-500/40 flex items-center gap-1 transition-colors"
                title="Open remediation queue"
              >
                <Wrench className="w-3.5 h-3.5 text-cyan-400" />
                <span>Fix</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
