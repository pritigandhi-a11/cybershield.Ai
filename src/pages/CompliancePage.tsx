import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { ComplianceOverview } from '../components/dashboard/ComplianceOverview';
import { FileCheck2, ShieldCheck, AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';

export const CompliancePage: React.FC = () => {
  const { organization, controls, riskState } = useSecurity();

  const frameworks = organization.primaryRegulatoryFrameworks || ['CERT-In Mandates', 'ISO/IEC 27001:2022', 'DPDP Act 2023'];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Scale className="w-6 h-6 text-indigo-400" />
              Institutional Regulatory Compliance & Governance Posture
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-md">
              {organization.industryLabel}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Automated compliance mapping for <strong>{organization.name}</strong>, tracking statutory cyber directives, breach reporting SLA readiness, and control adherence.
          </p>
        </div>
      </div>

      {/* Compliance Mandate Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworks.map((fw, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/60 border border-slate-800 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-300 font-mono">FRAMEWORK #{idx + 1}</span>
              <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                <FileCheck2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-base font-bold text-white mb-2 leading-snug">{fw}</div>
            <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80">
              <span className="text-slate-400">Audit Status:</span>
              <span className="text-emerald-400 font-bold font-mono">● Active Track</span>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Compliance Overview Component */}
      <ComplianceOverview />
    </div>
  );
};
