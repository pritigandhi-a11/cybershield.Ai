import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Building, ShieldCheck, AlertTriangle } from 'lucide-react';

export const DepartmentHeatmap: React.FC = () => {
  const { riskState } = useSecurity();
  const { departmentRisks } = riskState;

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Building className="w-4 h-4 text-cyan-400" />
            Organizational Risk Distribution Heatmap
          </h2>
          <p className="text-xs text-slate-400">
            Quantified cyber risk breakdown across business units and network zones
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {departmentRisks.map((dept, idx) => {
          const score = dept.riskScore;
          const cardBorder =
            score >= 75
              ? 'border-red-500/40 bg-red-950/10'
              : score >= 55
              ? 'border-orange-500/40 bg-orange-950/10'
              : 'border-slate-800 bg-slate-950/60';

          const badgeColor =
            score >= 75
              ? 'bg-red-500/20 text-red-300 border-red-500/30'
              : score >= 55
              ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border ${cardBorder} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-bold text-xs text-slate-100">{dept.department}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${badgeColor}`}>
                    {score}/100 RISK
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] text-slate-400 font-mono mb-3">
                  <div className="flex justify-between">
                    <span>Monitored Assets:</span>
                    <span className="text-slate-200 font-bold">{dept.assetCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical Vulns:</span>
                    <span className={dept.criticalVulnerabilities > 0 ? 'text-red-400 font-bold' : 'text-emerald-400 font-bold'}>
                      {dept.criticalVulnerabilities}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Control Compliance:</span>
                    <span className="text-cyan-300 font-bold">{dept.compliancePercentage}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-900 text-[11px] text-slate-300 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-2">{dept.topConcern}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
