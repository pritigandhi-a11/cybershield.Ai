import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Flame, ShieldCheck, CheckCircle2, UserCheck, AlertTriangle } from 'lucide-react';
import { SeverityBadge } from '../common/StatusBadge';

export const IncidentActionCenter: React.FC = () => {
  const { incidents, resolveIncident } = useSecurity();

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-red-400" />
            Live SOC Incident Action Center
          </h2>
          <p className="text-xs text-slate-400">
            Active security incidents undergoing containment and blast-radius mitigation
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {incidents.map(inc => {
          const isClosed = inc.status === 'CLOSED';

          return (
            <div
              key={inc.id}
              className={`p-4 rounded-xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                isClosed
                  ? 'bg-slate-950/40 border-slate-800 opacity-60'
                  : 'bg-red-950/15 border-red-500/30'
              }`}
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityBadge severity={inc.severity} />
                  <span className="font-bold text-xs text-slate-100">
                    {inc.title}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                    {inc.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {inc.impactSummary}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                  <span>Detected: <strong className="text-slate-200">{inc.detectedAt}</strong></span>
                  <span>•</span>
                  <span>Assigned: <strong className="text-cyan-300">{inc.assignedEngineer}</strong></span>
                </div>
              </div>

              {/* Action */}
              <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
                {!isClosed ? (
                  <button
                    onClick={() => resolveIncident(inc.id)}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5 transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mitigate & Contain</span>
                  </button>
                ) : (
                  <span className="px-3 py-1.5 rounded-lg text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    Contained & Closed ✓
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
