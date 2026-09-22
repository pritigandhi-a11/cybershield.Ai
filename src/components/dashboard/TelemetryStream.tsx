import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Radio, Filter, ExternalLink, ShieldCheck, Activity } from 'lucide-react';
import { SeverityBadge } from '../common/StatusBadge';

interface TelemetryStreamProps {
  onNavigateTab: (tabId: string) => void;
}

export const TelemetryStream: React.FC<TelemetryStreamProps> = ({ onNavigateTab }) => {
  const { telemetryEvents } = useSecurity();
  const [filterSeverity, setFilterSeverity] = useState<string>('ALL');

  const filteredEvents = telemetryEvents.filter(e => {
    if (filterSeverity === 'ALL') return true;
    if (filterSeverity === 'CRITICAL_HIGH') return e.severity === 'CRITICAL' || e.severity === 'HIGH';
    return e.severity === filterSeverity;
  });

  return (
    <div className="cyber-card p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Continuous Telemetry Ingestion Feed
            </h2>
            <p className="text-xs text-slate-400">
              Live normalized security logs mapped to MITRE ATT&CK vectors
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Severity Filter */}
          <select
            value={filterSeverity}
            onChange={(e) => setFilterSeverity(e.target.value)}
            className="px-2.5 py-1 rounded-lg text-xs bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Events ({telemetryEvents.length})</option>
            <option value="CRITICAL_HIGH">Critical & High Only</option>
            <option value="CRITICAL">Critical Only</option>
          </select>

          <button
            onClick={() => onNavigateTab('telemetry')}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
          >
            Studio <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
        {filteredEvents.map(evt => (
          <div
            key={evt.id}
            className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 hover:border-slate-700 transition-colors text-xs font-mono"
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <SeverityBadge severity={evt.severity} />
                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 text-[10px] font-bold">
                  {evt.source}
                </span>
                <span className="text-cyan-300 text-[11px] font-semibold truncate max-w-[200px]">
                  {evt.normalizedCategory}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 flex-shrink-0">
                {evt.timestamp}
              </span>
            </div>

            <p className="text-slate-300 text-[11px] font-sans leading-relaxed">
              {evt.aiCorrelationNotes}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-1.5 border-t border-slate-900 text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <span>SRC: <span className="text-rose-300">{evt.sourceIp}</span></span>
                <span>&rarr;</span>
                <span>DST: <span className="text-slate-300">{evt.targetAsset}</span></span>
              </div>
              {evt.threatActorContext && (
                <span className="text-amber-400 font-sans font-medium">
                  Actor: {evt.threatActorContext}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
