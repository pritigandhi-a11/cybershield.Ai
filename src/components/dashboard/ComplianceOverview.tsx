import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldCheck, AlertCircle } from 'lucide-react';

export const ComplianceOverview: React.FC = () => {
  const { organization, controls } = useSecurity();

  const avgControlCoverage = Math.round(
    controls.reduce((acc, c) => acc + (c.coveragePercentage || 0), 0) / Math.max(1, controls.length)
  );

  const mfaControl = controls.find(c => c.category === 'MFA');
  const backupControl = controls.find(c => c.category === 'BACKUP');
  const endpointControl = controls.find(c => c.category === 'ENDPOINT' || c.category === 'ENDPOINT_PROTECTION');
  const networkControl = controls.find(c => c.category === 'NETWORK' || c.category === 'FIREWALL');

  const frameworksList = organization.primaryRegulatoryFrameworks.map(fw => {
    let score = avgControlCoverage;
    let scope = 'General Cyber Risk & Baseline Controls';
    let keyDeficit = 'Regular control audits and cadence verification required';

    if (fw.includes('RBI') || fw.includes('FINTECH')) {
      scope = 'Annexure 1 (Identity) & Sec 7 (Ransomware)';
      score = mfaControl ? Math.round((mfaControl.coveragePercentage + avgControlCoverage) / 2) : avgControlCoverage;
      keyDeficit = mfaControl && mfaControl.coveragePercentage < 80
        ? `Hardware MFA gap on ${100 - mfaControl.coveragePercentage}% of privileged access`
        : 'Continuous audit verification of transaction boundaries required';
    } else if (fw.includes('CERT-In')) {
      scope = '6-Hour Incident Notification & Log Retention';
      score = networkControl ? Math.round((networkControl.coveragePercentage + avgControlCoverage) / 2) : avgControlCoverage;
      keyDeficit = 'Active triage logging required for 6-hour incident disclosure window';
    } else if (fw.includes('ISO')) {
      scope = 'Control A.12.3 (Backup) & A.9 (Access Control)';
      score = backupControl ? Math.round((backupControl.coveragePercentage + avgControlCoverage) / 2) : avgControlCoverage;
      keyDeficit = backupControl && backupControl.coveragePercentage < 80
        ? `Backup cadence coverage at ${backupControl.coveragePercentage}% requires immutable storage`
        : 'Audit verification of access control lists required';
    } else if (fw.includes('DPDP') || fw.includes('HIPAA') || fw.includes('DISHA') || fw.includes('Privacy')) {
      scope = 'Data Fiduciary PII & Health Information Storage Controls';
      score = Math.round(avgControlCoverage * 0.95);
      keyDeficit = 'Data classification and database access logs review pending';
    }

    return {
      name: fw,
      scope,
      score: Math.min(100, Math.max(20, score)),
      keyDeficit
    };
  });

  const overallAvgReadiness = Math.round(
    frameworksList.reduce((acc, f) => acc + f.score, 0) / Math.max(1, frameworksList.length)
  );

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Regulatory & Standards Posture
          </h2>
          <p className="text-xs text-slate-400">
            Automated alignment against {organization.primaryRegulatoryFrameworks.length} governing security mandates
          </p>
        </div>
        <span className="text-xs font-mono text-cyan-400 font-semibold">
          Avg: {overallAvgReadiness}% Readiness
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {frameworksList.map((fw, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg bg-slate-950/70 border border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-xs text-slate-200">{fw.name}</span>
                <span className="font-mono text-xs font-bold text-cyan-300">
                  {fw.score}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mb-2">{fw.scope}</p>

              {/* Progress bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
                <div
                  className={`h-full ${
                    fw.score >= 75 ? 'bg-emerald-500' : fw.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                  } rounded-full transition-all duration-500`}
                  style={{ width: `${fw.score}%` }}
                />
              </div>
            </div>

            <div className="text-[11px] text-amber-300/90 flex items-start gap-1.5 mt-1 pt-1 border-t border-slate-900">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
              <span className="truncate">{fw.keyDeficit}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
