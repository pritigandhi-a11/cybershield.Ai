import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Sliders, RotateCcw } from 'lucide-react';
import { RiskFactorWeights } from '../../types/risk';

export const FactorWeightEditor: React.FC = () => {
  const { weights, setWeights, resetWeights, riskState } = useSecurity();

  const handleWeightChange = (key: keyof RiskFactorWeights, value: number) => {
    setWeights(prev => ({
      ...prev,
      [key]: value / 100
    }));
  };

  const weightEntries: { key: keyof RiskFactorWeights; label: string; desc: string }[] = [
    { key: 'vulnerabilityExposure', label: 'Vulnerability Exposure', desc: 'CVSS scores, zero-days & weaponized exploits in wild.' },
    { key: 'threatActivity', label: 'Threat Activity Telemetry', desc: 'Real-time C2 beacons, brute-force anomalies & EDR alerts.' },
    { key: 'assetCriticality', label: 'Asset Criticality & Value', desc: 'Business impact weighting of targeted infrastructure.' },
    { key: 'securityControlsGap', label: 'Security Controls Gap', desc: 'Incomplete coverage of MFA, EDR, CSPM & Backups.' },
    { key: 'incidentHistory', label: 'Incident History & Active Triages', desc: 'Active unresolved security incident backlog.' },
    { key: 'environmentalExposure', label: 'Environmental & Network Exposure', desc: 'Public edge attack surface & open ports.' },
  ];

  return (
    <div className="cyber-card p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            Transparent Mathematical Risk Formula & Weight Customizer
          </h2>
          <p className="text-xs text-slate-400">
            Deterministic calculation engine: Risk = Sum(Factor Score * Weight). Adjust weights to customize risk profile.
          </p>
        </div>

        <button
          onClick={resetWeights}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Defaults</span>
        </button>
      </div>

      {/* Formula Explanation Banner */}
      <div className="p-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/20 mb-5 text-xs font-mono text-slate-300">
        <div className="flex items-center justify-between mb-1 text-cyan-300 font-bold">
          <span>📐 Current Deterministic Formula:</span>
          <span>Version: {riskState.formulaVersion}</span>
        </div>
        <div className="text-[11px] text-slate-400 leading-relaxed">
          Score = (Vuln × {Math.round(riskState.factors.vulnerabilityExposure.weight * 100)}%) + (Threat × {Math.round(riskState.factors.threatActivity.weight * 100)}%) + (AssetCrit × {Math.round(riskState.factors.assetCriticality.weight * 100)}%) + (Controls × {Math.round(riskState.factors.securityControlsGap.weight * 100)}%) + (Incidents × {Math.round(riskState.factors.incidentHistory.weight * 100)}%) + (Network × {Math.round(riskState.factors.environmentalExposure.weight * 100)}%) = <strong className="text-red-400">{riskState.overallScore}/100</strong>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {weightEntries.map(item => {
          const val = Math.round(weights[item.key] * 100);
          return (
            <div
              key={item.key}
              className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">{item.label}</span>
                  <span className="font-mono font-bold text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {val}%
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mb-2">{item.desc}</p>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={val}
                  onChange={(e) => handleWeightChange(item.key, parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
