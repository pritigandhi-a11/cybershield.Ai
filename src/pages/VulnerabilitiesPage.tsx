import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { RemediationMatrix } from '../components/prioritization/RemediationMatrix';
import { VulnerabilityQueue } from '../components/prioritization/VulnerabilityQueue';
import { Bug, AlertOctagon, Flame, Wrench, ShieldAlert } from 'lucide-react';

export const VulnerabilitiesPage: React.FC = () => {
  const { vulnerabilities, organization } = useSecurity();

  const openVulns = vulnerabilities.filter(v => v.status !== 'REMEDIATED');
  const criticalVulns = openVulns.filter(v => v.severity === 'CRITICAL');
  const wildExploits = openVulns.filter(v => v.exploitAvailableInWild);
  const totalRiskReductionAvailable = openVulns.reduce((sum, v) => sum + v.riskReductionPoints, 0);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Institutional Vulnerability Management & CVE Queue
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30 rounded-md">
              {openVulns.length} Open CVEs
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ranked CVE backlog and remediation workflow for <strong>{organization.name}</strong>, ordered by realized risk impact reduction.
          </p>
        </div>
      </div>

      {/* Vulnerability KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Open CVEs</span>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <Bug className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">{openVulns.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Ingested via CVEM Scanners</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Critical Severity (CVSS &gt; 9.0)</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">{criticalVulns.length}</div>
          <div className="text-[11px] text-rose-300 mt-1">Requires immediate hotfix</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Exploited in Wild (KEV)</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{wildExploits.length}</div>
          <div className="text-[11px] text-amber-300 mt-1">Active CISA / CERT-In Warning</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Max Risk Reduction</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">-{totalRiskReductionAvailable.toFixed(1)} pts</div>
          <div className="text-[11px] text-emerald-300 mt-1">If all patches applied</div>
        </div>
      </div>

      {/* 2x2 Remediation Matrix */}
      <RemediationMatrix />

      {/* Ranked Vulnerability Queue */}
      <VulnerabilityQueue />
    </div>
  );
};
