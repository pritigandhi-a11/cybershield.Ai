import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ATTACK_SCENARIOS, SAMPLE_RAW_LOGS } from '../../services/telemetryService';
import { Radio, Plus, Upload, Play, CheckCircle2, Sparkles, Terminal } from 'lucide-react';

export const LogIngestionStudio: React.FC = () => {
  const { addCustomTelemetryLog, simulateAttack, telemetryEvents } = useSecurity();
  const [customLogInput, setCustomLogInput] = useState('');
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  const handleIngestCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customLogInput.trim()) return;
    addCustomTelemetryLog(customLogInput.trim());
    setSuccessNotice('Log ingested and AI-correlated into live security feed!');
    setCustomLogInput('');
    setTimeout(() => setSuccessNotice(null), 4000);
  };

  const handleLoadSample = (idx: number) => {
    setSelectedSampleIndex(idx);
    setCustomLogInput(SAMPLE_RAW_LOGS[idx]);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2.5">
            <Terminal className="w-6 h-6 text-cyan-400" />
            AI Telemetry Ingestion & Attack Simulation Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Continuously collects, parses, normalizes, and correlates multi-source security telemetry into structured risk factors.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Ingestion Daemon Active</span>
        </div>
      </div>

      {/* Attack Scenario Injection Cards */}
      <div className="cyber-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Radio className="w-5 h-5 text-red-400 animate-pulse" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              1-Click Cyber Attack Scenario Simulators
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Test Real-Time Risk Quantification Response
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ATTACK_SCENARIOS.map(scen => (
            <div
              key={scen.id}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-red-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-slate-200 group-hover:text-red-300 transition-colors">
                    {scen.name}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-red-500/20 text-red-300 border border-red-500/30">
                    +{scen.expectedRiskIncrease} pts
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {scen.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400">
                  Injects {scen.injectedEventsCount} raw telemetry logs
                </span>
                <button
                  onClick={() => {
                    simulateAttack(scen);
                    setSuccessNotice(`Simulated Attack "${scen.name}" triggered! Quantified Risk recalculation in progress.`);
                    setTimeout(() => setSuccessNotice(null), 4000);
                  }}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/40 flex items-center gap-1.5 transition-all shadow-sm group-hover:shadow-red-950/30"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Execute Simulation</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Ingestion & AI Normalizer Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Input box */}
        <div className="lg:col-span-7 cyber-card p-5">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            AI Raw Log Ingestion & Normalizer
          </h2>
          <p className="text-xs text-slate-400 mb-4">
            Paste firewall syslogs, EDR process executions, CloudTrail JSON, or Snort IDS alert strings.
          </p>

          {/* Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="text-[11px] font-mono text-slate-400 self-center mr-1">Load Preset:</span>
            {['Palo Alto C2 Syslog', 'AD NTLM Spray 4625', 'EDR Process Curl', 'AWS S3 ACL Leak', 'Snort XZ RCE'].map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleLoadSample(idx)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors border ${
                  selectedSampleIndex === idx
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {preset}
              </button>
            ))}
          </div>

          <form onSubmit={handleIngestCustom} className="space-y-3">
            <textarea
              rows={4}
              value={customLogInput}
              onChange={(e) => setCustomLogInput(e.target.value)}
              placeholder="Paste raw unstructured log string (e.g. Syslog, CEF, JSON, XML)..."
              className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500 transition-colors"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                AI pipeline automatically extracts IP, CVE, MITRE TTPs & Severity.
              </span>
              <button
                type="submit"
                disabled={!customLogInput.trim()}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-50 hover:brightness-110 flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Ingest & Normalize</span>
              </button>
            </div>
          </form>

          {successNotice && (
            <div className="mt-3 p-3 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{successNotice}</span>
            </div>
          )}
        </div>

        {/* Right: Normalization Pipeline Diagram */}
        <div className="lg:col-span-5 cyber-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
              AI Normalization & Correlation Flow
            </h3>
            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-cyan-400 font-bold">1. Ingestion:</span> Syslog / API / Kafka Stream
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-indigo-400 font-bold">2. NLP & Regex Tokenizer:</span> Field extraction (IP, User, CVE)
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-purple-400 font-bold">3. Threat Intelligence:</span> MITRE ATT&CK & FIN7 mapping
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-emerald-400 font-bold">4. Asset Binding:</span> Correlates target to Criticality Score
              </div>
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">
                <span className="text-red-400 font-bold">5. Risk Quantification:</span> Feeds 6-Factor Dynamic Model
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Total Telemetry Ingested: <strong className="text-cyan-400 font-mono">{telemetryEvents.length} events</strong>
          </div>
        </div>
      </div>
    </div>
  );
};
