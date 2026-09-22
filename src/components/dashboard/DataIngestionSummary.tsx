import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Radio,
  Sparkles,
  ShieldAlert,
  Bug,
  AlertTriangle,
  RefreshCw,
  Cpu,
  CheckCircle,
  Clock,
  ChevronRight,
  Database,
  Sliders
} from 'lucide-react';

interface DataIngestionSummaryProps {
  onNavigateTab?: (tabId: string) => void;
}

export const DataIngestionSummary: React.FC<DataIngestionSummaryProps> = ({ onNavigateTab }) => {
  const {
    ingestionStats,
    injectDemoScenario,
    telemetryEvents,
    vulnerabilities,
    incidents,
    assets
  } = useSecurity();

  const [lastAction, setLastAction] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleInject = (
    type: 'DEMO_EVENT' | 'DEMO_VULN' | 'DEMO_INCIDENT' | 'DEMO_CONTROL_GAP',
    label: string
  ) => {
    setIsProcessing(true);
    setLastAction(`Ingesting ${label}...`);
    setTimeout(() => {
      injectDemoScenario(type);
      setLastAction(`Ingested: ${label} (Normalized & Stored in Canonical Repository)`);
      setIsProcessing(false);
    }, 300);
  };

  return (
    <div className="cyber-card p-5 border border-slate-800 bg-slate-900/90 relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-950/80 border border-cyan-800/60 text-cyan-400">
            <Radio className="w-5 h-5 animate-pulse text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white tracking-wide">
                Cybersecurity Data Ingestion & Normalization
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {ingestionStats.normalizationStatus}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Multi-source pipeline: JSON, Syslog, CSV feeds normalized into central data model
            </p>
          </div>
        </div>

        {/* Live Normalization Status Badge */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-mono">Last Ingested</span>
            <span className="text-xs font-mono text-cyan-300 font-semibold flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3 text-cyan-400" />
              {ingestionStats.lastIngestionTime}
            </span>
          </div>
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('telemetry')}
              className="flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors px-2.5 py-1.5 rounded-lg bg-cyan-950/40 border border-cyan-800/50 hover:bg-cyan-900/40"
            >
              <span>Ingestion Studio</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {/* Events Ingested */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded bg-cyan-500/10 text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Events Ingested</span>
            <span className="text-base font-mono font-bold text-white">
              {telemetryEvents.length}
            </span>
          </div>
        </div>

        {/* Vulnerabilities Ingested */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded bg-amber-500/10 text-amber-400">
            <Bug className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Vulnerabilities</span>
            <span className="text-base font-mono font-bold text-white">
              {vulnerabilities.filter(v => v.status !== 'REMEDIATED').length} <span className="text-xs text-slate-500">open</span>
            </span>
          </div>
        </div>

        {/* Incidents Ingested */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded bg-red-500/10 text-red-400">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Active Incidents</span>
            <span className="text-base font-mono font-bold text-white">
              {incidents.filter(i => i.status !== 'CLOSED').length}
            </span>
          </div>
        </div>

        {/* Assets Monitored */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-3">
          <div className="p-2 rounded bg-indigo-500/10 text-indigo-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 block">Monitored Assets</span>
            <span className="text-base font-mono font-bold text-white">
              {assets.length}
            </span>
          </div>
        </div>
      </div>

      {/* Action Banner / Status */}
      {lastAction && (
        <div className="mb-4 px-3 py-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-200 flex items-center gap-2 animate-fade-in">
          <CheckCircle className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="truncate">{lastAction}</span>
        </div>
      )}

      {/* Safe Demo Ingestion Controllers */}
      <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Simulated Security Ingestion Triggers (Safe Demo Feed)</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Pipeline: Ingest ➔ Normalize ➔ Store ➔ Risk Engine Recalculation
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {/* Inject Event */}
          <button
            onClick={() => handleInject('DEMO_EVENT', 'Authentication Burst (Syslog Event 4625)')}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Inject Security Event</span>
          </button>

          {/* Inject Vuln */}
          <button
            onClick={() => handleInject('DEMO_VULN', 'Critical RCE CVE (CVSS 9.8)')}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-amber-300 border border-slate-700 hover:border-amber-500/50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Bug className="w-3.5 h-3.5 text-amber-400" />
            <span>Inject Vulnerability</span>
          </button>

          {/* Inject Incident */}
          <button
            onClick={() => handleInject('DEMO_INCIDENT', 'Kerberos Golden Ticket Incident')}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-red-300 border border-slate-700 hover:border-red-500/50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
            <span>Inject Incident Alert</span>
          </button>

          {/* Degrade Control */}
          <button
            onClick={() => handleInject('DEMO_CONTROL_GAP', 'MFA Coverage Degradation (42%)')}
            disabled={isProcessing}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 hover:bg-slate-800 text-purple-300 border border-slate-700 hover:border-purple-500/50 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          >
            <Sliders className="w-3.5 h-3.5 text-purple-400" />
            <span>Degrade Control</span>
          </button>
        </div>
      </div>
    </div>
  );
};
