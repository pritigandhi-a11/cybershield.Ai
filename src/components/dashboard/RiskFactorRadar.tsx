import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { Shield, AlertCircle, Eye, Sliders, Database, Server } from 'lucide-react';

export const RiskFactorRadar: React.FC = () => {
  const { riskState } = useSecurity();
  const { factors } = riskState;

  const radarData = [
    {
      subject: 'Vulnerability Exp',
      score: factors.vulnerabilityExposure.score,
      weight: `${Math.round(factors.vulnerabilityExposure.weight * 100)}%`,
      fullMark: 100
    },
    {
      subject: 'Threat Activity',
      score: factors.threatActivity.score,
      weight: `${Math.round(factors.threatActivity.weight * 100)}%`,
      fullMark: 100
    },
    {
      subject: 'Asset Criticality',
      score: factors.assetCriticality.score,
      weight: `${Math.round(factors.assetCriticality.weight * 100)}%`,
      fullMark: 100
    },
    {
      subject: 'Controls Gap',
      score: factors.securityControlsGap.score,
      weight: `${Math.round(factors.securityControlsGap.weight * 100)}%`,
      fullMark: 100
    },
    {
      subject: 'Incident History',
      score: factors.incidentHistory.score,
      weight: `${Math.round(factors.incidentHistory.weight * 100)}%`,
      fullMark: 100
    },
    {
      subject: 'Network Exposure',
      score: factors.environmentalExposure.score,
      weight: `${Math.round(factors.environmentalExposure.weight * 100)}%`,
      fullMark: 100
    }
  ];

  const factorItems = [
    {
      label: 'Vulnerability Exposure',
      icon: AlertCircle,
      factor: factors.vulnerabilityExposure,
      desc: 'Known CVEs, CVSS severity & weaponized in-the-wild exploit availability.'
    },
    {
      label: 'Threat Activity',
      icon: Eye,
      factor: factors.threatActivity,
      desc: 'Active C2 beacons, brute-force anomalies & threat actor telemetry.'
    },
    {
      label: 'Asset Criticality',
      icon: Server,
      factor: factors.assetCriticality,
      desc: 'Business impact score of targeted systems (Payments, PII, AD).'
    },
    {
      label: 'Security Controls Gap',
      icon: Shield,
      factor: factors.securityControlsGap,
      desc: 'Incomplete coverage of Privileged MFA, EDR, Backups & CSPM.'
    },
    {
      label: 'Incident History',
      icon: Database,
      factor: factors.incidentHistory,
      desc: 'Unresolved active security alerts currently undergoing SOC triage.'
    },
    {
      label: 'Network Exposure',
      icon: Sliders,
      factor: factors.environmentalExposure,
      desc: 'Public internet-facing attack surface and open ingress boundaries.'
    }
  ];

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            6-Factor Quantified Breakdown
          </h2>
          <p className="text-xs text-slate-400">
            Transparent mathematical weighting contributing to overall score
          </p>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-mono rounded bg-slate-800 text-slate-300 border border-slate-700">
          Normalized 0–100 Scale
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Radar Chart */}
        <div className="lg:col-span-5 h-64 w-full flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" strokeDasharray="3 3" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#64748b', fontSize: 9 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 border border-cyan-500/40 p-2 rounded-lg text-xs font-mono shadow-xl">
                        <p className="text-cyan-300 font-bold">{data.subject}</p>
                        <p className="text-white">Score: <strong className="text-red-400">{data.score}/100</strong></p>
                        <p className="text-slate-400">Engine Weight: {data.weight}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Radar
                name="Cyber Exposure"
                dataKey="score"
                stroke="#38bdf8"
                fill="#0ea5e9"
                fillOpacity={0.4}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Factor Bars */}
        <div className="lg:col-span-7 space-y-3">
          {factorItems.map((item, idx) => {
            const Icon = item.icon;
            const score = item.factor.score;
            const weightPercent = Math.round(item.factor.weight * 100);
            const contribution = item.factor.weightedContribution;

            const barColor =
              score >= 75
                ? 'bg-red-500'
                : score >= 55
                ? 'bg-orange-500'
                : score >= 35
                ? 'bg-yellow-500'
                : 'bg-emerald-500';

            return (
              <div key={idx} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between text-xs mb-1">
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-semibold text-slate-200">{item.label}</span>
                    <span className="text-[10px] font-mono text-slate-400">({weightPercent}% weight)</span>
                  </div>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-slate-400 text-[11px]">+ {contribution} pts</span>
                    <span className="font-bold text-white text-xs px-1.5 py-0.5 rounded bg-slate-800">
                      {score}/100
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full ${barColor} rounded-full transition-all duration-700`}
                    style={{ width: `${score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
