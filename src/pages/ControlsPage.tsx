import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2, Award, Clock } from 'lucide-react';

export const ControlsPage: React.FC = () => {
  const { controls, organization } = useSecurity();

  const optimalControls = controls.filter(c => c.health === 'OPTIMAL');
  const degradedControls = controls.filter(c => c.health === 'DEGRADED');
  const criticalGaps = controls.filter(c => c.health === 'CRITICAL_GAP');
  const avgCoverage = Math.round(controls.reduce((sum, c) => sum + c.coveragePercentage, 0) / Math.max(1, controls.length));

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Security Controls Gap Analysis & Defense Posture
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 rounded-md">
              15% Weight in Risk Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Evaluating active defensive controls for <strong>{organization.name}</strong>, tracking coverage percentages and regulatory compliance enforcement.
          </p>
        </div>
      </div>

      {/* Control KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Mean Control Coverage</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">{avgCoverage}%</div>
          <div className="text-[11px] text-cyan-300/80 mt-1">Across 5 Essential Controls</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Critical Control Gaps</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">{criticalGaps.length}</div>
          <div className="text-[11px] text-rose-300/80 mt-1">Coverage &lt; 50% or missing</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Degraded Controls</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{degradedControls.length}</div>
          <div className="text-[11px] text-amber-300/80 mt-1">Coverage between 50%–75%</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Optimal Defenses</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">{optimalControls.length}</div>
          <div className="text-[11px] text-emerald-300/80 mt-1">Coverage &gt; 75% verified</div>
        </div>
      </div>

      {/* Security Controls Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Active Defense Controls & Standards Alignment</h3>
            <p className="text-xs text-slate-400 mt-0.5">Control health directly attenuates baseline vulnerability exposure.</p>
          </div>
          <span className="px-3 py-1 rounded-lg text-xs font-mono bg-slate-800 text-slate-300 border border-slate-700">
            {controls.length} Monitored Controls
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="p-4">Control Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Coverage %</th>
                <th className="p-4">Health Status</th>
                <th className="p-4">Regulatory Standard Alignment</th>
                <th className="p-4">Last Audited</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {controls.map(ctrl => {
                const getHealthBadge = (health: string) => {
                  switch (health) {
                    case 'OPTIMAL':
                      return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">OPTIMAL</span>;
                    case 'DEGRADED':
                      return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">DEGRADED</span>;
                    default:
                      return <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">CRITICAL GAP</span>;
                  }
                };

                const getBarColor = (coverage: number) => {
                  if (coverage >= 80) return 'bg-emerald-500';
                  if (coverage >= 50) return 'bg-amber-500';
                  return 'bg-rose-500';
                };

                return (
                  <tr key={ctrl.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-white text-sm">{ctrl.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {ctrl.isMandatory ? '★ Mandatory Regulatory Requirement' : 'Recommended Defense'}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 border border-slate-700 text-slate-300">
                        {ctrl.category}
                      </span>
                    </td>
                    <td className="p-4 w-48">
                      <div className="flex items-center justify-between text-xs mb-1 font-mono font-bold">
                        <span>{ctrl.coveragePercentage}%</span>
                      </div>
                      <div className="h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                        <div className={`h-full ${getBarColor(ctrl.coveragePercentage)} rounded-full`} style={{ width: `${ctrl.coveragePercentage}%` }} />
                      </div>
                    </td>
                    <td className="p-4">
                      {getHealthBadge(ctrl.health)}
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {ctrl.standardAlignment.map((std, i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
                            {std}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-400 text-[11px]">
                      {ctrl.lastAudited}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
