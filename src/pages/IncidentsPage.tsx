import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { IncidentActionCenter } from '../components/prioritization/IncidentActionCenter';
import { Flame, ShieldAlert, CheckCircle2, Clock, Users, Radio } from 'lucide-react';
import { ATTACK_SCENARIOS } from '../services/telemetryService';

export const IncidentsPage: React.FC = () => {
  const { incidents, organization, simulateAttack } = useSecurity();

  const activeIncidents = incidents.filter(i => i.status !== 'CLOSED');
  const criticalIncidents = activeIncidents.filter(i => i.severity === 'CRITICAL');

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-400" />
              Security Operations Center (SOC) Incident Action Hub
            </h1>
            <span className={`px-2 py-0.5 text-xs font-mono font-bold rounded-md border ${
              activeIncidents.length > 0
                ? 'bg-red-500/20 text-red-300 border-red-500/40 animate-pulse'
                : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            }`}>
              {activeIncidents.length > 0 ? `${activeIncidents.length} Active Triage` : 'All Clear'}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time multi-stage threat detection, containment coordinator, and CERT-In 6-hour mandatory reporting workflow for <strong>{organization.name}</strong>.
          </p>
        </div>
      </div>

      {/* Incident Status Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Active Incident Alerts</span>
            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-red-400 font-mono">{activeIncidents.length}</div>
          <div className="text-[11px] text-red-300/80 mt-1">Requires immediate SOC containment</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Critical Threats</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">{criticalIncidents.length}</div>
          <div className="text-[11px] text-slate-400 mt-1">Direct Domain / Data Impact</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Mean Time to Triage</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">14.2 min</div>
          <div className="text-[11px] text-cyan-300/80 mt-1">CERT-In SLA: &lt; 6 Hours</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Assigned SOC Analysts</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-indigo-400 font-mono">2 On-Duty</div>
          <div className="text-[11px] text-slate-400 mt-1">24x7 Tier-2 / Tier-3 Triage</div>
        </div>
      </div>

      {/* 1-Click Attack Simulator Trigger Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/40 via-slate-900/80 to-slate-950 border border-red-500/30">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="font-bold text-sm text-white">Live Threat Simulator (SIH Judge Testing)</span>
          </div>
          <span className="text-[10px] text-red-400 font-mono bg-red-950 px-2 py-0.5 rounded border border-red-800">
            DYNAMIC RISK INJECTION
          </span>
        </div>
        <p className="text-xs text-slate-300 mb-3">
          Simulate an active cyber attack event to observe real-time incident telemetry ingestion and mathematical score spike:
        </p>
        <div className="flex flex-wrap gap-2.5">
          {ATTACK_SCENARIOS.map(scen => (
            <button
              key={scen.id}
              onClick={() => simulateAttack(scen)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-red-950/80 border border-slate-800 hover:border-red-500/50 text-xs font-semibold text-slate-200 hover:text-red-300 transition-all flex items-center gap-2 group"
            >
              <span className="font-bold text-red-400">💥</span>
              <span>{scen.name}</span>
              <span className="text-[10px] text-red-400 font-mono font-bold">+{scen.expectedRiskIncrease} pts</span>
            </button>
          ))}
        </div>
      </div>

      {/* Incident Action Center Component */}
      <IncidentActionCenter />
    </div>
  );
};
