import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Grid, Zap, Clock, ShieldCheck } from 'lucide-react';

export const RemediationMatrix: React.FC = () => {
  const { vulnerabilities } = useSecurity();

  const openVulns = vulnerabilities.filter(v => v.status !== 'REMEDIATED');

  // Quick Wins: High Risk Reduction (< 4 hours fix)
  const quickWins = openVulns.filter(v => v.estimatedFixHours <= 4 && v.riskReductionPoints >= 8.0);
  // Major Projects: High Risk Reduction (> 4 hours fix)
  const majorProjects = openVulns.filter(v => v.estimatedFixHours > 4 && v.riskReductionPoints >= 8.0);
  // Secondary: Low Risk Reduction (< 4 hours fix)
  const secondary = openVulns.filter(v => v.estimatedFixHours <= 4 && v.riskReductionPoints < 8.0);
  // Low ROI: Low Risk Reduction (> 4 hours fix)
  const lowRoi = openVulns.filter(v => v.estimatedFixHours > 4 && v.riskReductionPoints < 8.0);

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Grid className="w-4 h-4 text-cyan-400" />
            Remediation Priority 2x2 Matrix (Impact vs. Effort)
          </h2>
          <p className="text-xs text-slate-400">
            Categorizes vulnerabilities by risk reduction impact against engineering hours required
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Quadrant 1: Quick Wins */}
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase font-mono text-emerald-400 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-400" />
                Quadrant 1: Quick Wins (High Impact / Low Effort)
              </span>
              <span className="text-xs font-mono font-bold text-emerald-300">
                {quickWins.length} Items
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Highest ROI: Fixes that yield major risk drop with minimal downtime.
            </p>

            <div className="space-y-2">
              {quickWins.map(v => (
                <div key={v.id} className="p-2.5 rounded-lg bg-slate-950/80 border border-emerald-500/20 text-xs">
                  <div className="flex justify-between font-semibold text-slate-200">
                    <span>{v.cveId} ({v.affectedAssetName})</span>
                    <span className="font-mono text-emerald-400">-{v.riskReductionPoints} pts</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Est. Fix Time: {v.estimatedFixHours} hours
                  </div>
                </div>
              ))}
              {quickWins.length === 0 && (
                <div className="text-xs text-slate-500 italic p-2">No quick wins remaining.</div>
              )}
            </div>
          </div>
        </div>

        {/* Quadrant 2: Major Projects */}
        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase font-mono text-cyan-400 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                Quadrant 2: Major Projects (High Impact / High Effort)
              </span>
              <span className="text-xs font-mono font-bold text-cyan-300">
                {majorProjects.length} Items
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Requires scheduled maintenance windows and multi-team coordination.
            </p>

            <div className="space-y-2">
              {majorProjects.map(v => (
                <div key={v.id} className="p-2.5 rounded-lg bg-slate-950/80 border border-cyan-500/20 text-xs">
                  <div className="flex justify-between font-semibold text-slate-200">
                    <span>{v.cveId} ({v.affectedAssetName})</span>
                    <span className="font-mono text-cyan-400">-{v.riskReductionPoints} pts</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Est. Fix Time: {v.estimatedFixHours} hours
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quadrant 3: Secondary */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase font-mono text-slate-300">
              Quadrant 3: Secondary Fill-Ins
            </span>
            <span className="text-xs font-mono text-slate-400">{secondary.length} Items</span>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Low effort, lower risk reduction points.
          </p>
          <div className="space-y-2">
            {secondary.map(v => (
              <div key={v.id} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex justify-between">
                <span>{v.cveId}</span>
                <span className="font-mono text-slate-400">-{v.riskReductionPoints} pts</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quadrant 4: Low ROI */}
        <div className="p-4 rounded-xl bg-slate-950/40 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase font-mono text-slate-400">
              Quadrant 4: Low ROI Backlog
            </span>
            <span className="text-xs font-mono text-slate-400">{lowRoi.length} Items</span>
          </div>
          <p className="text-xs text-slate-400 mb-2">
            Defer until higher-priority security controls are in place.
          </p>
          <div className="space-y-2">
            {lowRoi.map(v => (
              <div key={v.id} className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-400 flex justify-between">
                <span>{v.cveId}</span>
                <span className="font-mono text-slate-500">-{v.riskReductionPoints} pts</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
