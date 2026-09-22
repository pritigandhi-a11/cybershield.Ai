import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Network, AlertCircle, ShieldAlert, CheckCircle2, ChevronRight } from 'lucide-react';
import { SeverityBadge } from '../common/StatusBadge';

export const EventCorrelationView: React.FC = () => {
  const { telemetryEvents } = useSecurity();

  const correlatedClusters = [
    {
      id: 'clus-01',
      title: 'Active Directory Lateral Movement & NTLM Spray Chain',
      mitreTactic: 'TA0008 (Lateral Movement) / T1558',
      threatActor: 'FIN7 / Credential Spreader',
      matchedEventsCount: telemetryEvents.filter(e => e.normalizedCategory === 'AUTH_BRUTE_FORCE' || e.normalizedCategory === 'PRIVILEGE_ESCALATION').length,
      severity: 'CRITICAL' as const,
      summary: 'Multiple failed Kerberos pre-authentications correlated with privilege escalation attempt on Domain Controller DC-01.',
      confidence: 96
    },
    {
      id: 'clus-02',
      title: 'Perimeter Ingress C2 Beaconing to Hostile Subnet',
      mitreTactic: 'TA0011 (Command & Control) / T1071.001',
      threatActor: 'Cobalt Strike Infrastructure',
      matchedEventsCount: telemetryEvents.filter(e => e.normalizedCategory === 'C2_BEACONING').length,
      severity: 'CRITICAL' as const,
      summary: 'Periodic TLS handshakes over port 443 with jitter patterns matching known Command & Control servers.',
      confidence: 98
    },
    {
      id: 'clus-03',
      title: 'Public Cloud Storage ACL Modification & Data Exposure',
      mitreTactic: 'TA0009 (Collection) / T1530',
      threatActor: 'Cloud Misconfiguration / Insider',
      matchedEventsCount: telemetryEvents.filter(e => e.normalizedCategory === 'POLICY_VIOLATION').length,
      severity: 'HIGH' as const,
      summary: 'Automated PutBucketAcl call granted world-readable access to sensitive customer documents bucket.',
      confidence: 92
    }
  ];

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400" />
            AI Threat Correlation & Attack Chain Clusters
          </h2>
          <p className="text-xs text-slate-400">
            Synthesizes raw telemetry into multi-stage MITRE ATT&CK incident chains
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">
          Clustered Graph Engine
        </span>
      </div>

      <div className="space-y-3">
        {correlatedClusters.map(cluster => (
          <div
            key={cluster.id}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={cluster.severity} />
                <span className="font-bold text-xs text-slate-200">
                  {cluster.title}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-cyan-300 border border-slate-700">
                  {cluster.mitreTactic}
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-3xl">
                {cluster.summary}
              </p>

              <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono pt-1">
                <span>Threat Actor Context: <strong className="text-amber-400">{cluster.threatActor}</strong></span>
                <span>•</span>
                <span>Events Correlated: <strong className="text-cyan-400">{cluster.matchedEventsCount}</strong></span>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-center flex-shrink-0">
              <div className="text-right font-mono">
                <span className="text-[10px] uppercase text-slate-400 block">AI Confidence</span>
                <span className="text-cyan-300 font-bold text-sm">{cluster.confidence}%</span>
              </div>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
