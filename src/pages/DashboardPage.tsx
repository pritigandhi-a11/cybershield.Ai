import React from 'react';
import { useSecurity } from '../context/SecurityContext';
import { Hero3DRiskSphere } from '../components/3d/Hero3DRiskSphere';
import { RiskFactor3DStructure } from '../components/3d/RiskFactor3DStructure';
import { AssetUniverse3DMap } from '../components/3d/AssetUniverse3DMap';
import { ThreatVector3DMap } from '../components/3d/ThreatVector3DMap';
import { RiskToRupee3DExperience } from '../components/3d/RiskToRupee3DExperience';
import { Compliance3DWall } from '../components/3d/Compliance3DWall';
import { Blockchain3DChain } from '../components/3d/Blockchain3DChain';
import { DataIngestionSummary } from '../components/dashboard/DataIngestionSummary';
import { QuickNavigationGrid } from '../components/dashboard/QuickNavigationGrid';
import {
  Server,
  Bug,
  Flame,
  ShieldCheck,
  Activity,
  Coins,
  Building2,
  Sparkles,
  ArrowRight,
  Zap
} from 'lucide-react';

interface DashboardPageProps {
  onNavigateTab: (tabId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab }) => {
  const {
    organization,
    riskState,
    vulnerabilities,
    incidents,
    controls,
    assets,
    investmentScenario
  } = useSecurity();

  const openVulns = vulnerabilities.filter(v => v.status !== 'REMEDIATED');
  const criticalVulns = openVulns.filter(v => v.severity === 'CRITICAL');
  const activeIncidents = incidents.filter(i => i.status === 'ACTIVE_TRIAGE');
  const avgControlsCoverage = Math.round(
    controls.reduce((sum, c) => sum + c.coveragePercentage, 0) / Math.max(1, controls.length)
  );

  return (
    <div className="space-y-6 pb-16 animate-fade-in">
      
      {/* 1. SIH 2026 Executive Header Banner */}
      <div className="cyber-card-3d p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-l-cyan-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-black text-white tracking-tight">
                {organization.name}
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 rounded-md">
                {organization.industryLabel}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              3D Continuous Cyber Risk Command Center • Grounded Quant Engine v2.4
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
          <span className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold bg-slate-950/80 border border-slate-800 text-slate-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Telemetry: 14,210 eps</span>
          </span>

          <button
            onClick={() => onNavigateTab('investment')}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Coins className="w-3.5 h-3.5" />
            <span>Risk-to-Rupee (₹{(organization.baseBudgetINR / 100000).toFixed(1)}L)</span>
          </button>
        </div>
      </div>

      {/* 2. Top Grid: 3D Hero Risk Sphere + 3D Key Metric Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Left: 3D Holographic Cyber Risk Sphere */}
        <div className="lg:col-span-5 flex flex-col">
          <Hero3DRiskSphere />
        </div>

        {/* Right: Floating 3D Security Metric Cards (6 Real KPIs) */}
        <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
          
          {/* Metric 1: Critical Assets */}
          <div
            onClick={() => onNavigateTab('assets')}
            className="cyber-card-3d p-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">Total Assets</span>
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 group-hover:scale-110 transition-transform">
                <Server className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-white font-mono">{organization.totalAssetsCount}</div>
            <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 100% Ingestion
            </div>
          </div>

          {/* Metric 2: Open CVEs */}
          <div
            onClick={() => onNavigateTab('vulnerabilities')}
            className="cyber-card-3d p-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">Open CVEs</span>
              <div className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 group-hover:scale-110 transition-transform">
                <Bug className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-rose-400 font-mono">
              {openVulns.length} <span className="text-xs text-rose-300 font-normal">({criticalVulns.length} Crit)</span>
            </div>
            <div className="text-[10px] text-rose-400 mt-1 font-mono">
              2 Exploited in Wild
            </div>
          </div>

          {/* Metric 3: Active Incidents */}
          <div
            onClick={() => onNavigateTab('incidents')}
            className="cyber-card-3d p-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">SOC Alerts</span>
              <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-red-400 font-mono">
              {activeIncidents.length} <span className="text-xs text-slate-400 font-normal">Active</span>
            </div>
            <div className="text-[10px] text-amber-300 mt-1 font-mono">
              NTLM Spray Triage
            </div>
          </div>

          {/* Metric 4: Defense Controls */}
          <div
            onClick={() => onNavigateTab('controls')}
            className="cyber-card-3d p-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">Controls Posture</span>
              <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-cyan-300 font-mono">{avgControlsCoverage}%</div>
            <div className="text-[10px] text-amber-400 mt-1 font-mono">
              MFA / EDR Gap
            </div>
          </div>

          {/* Metric 5: Threat Ingestion */}
          <div
            onClick={() => onNavigateTab('telemetry')}
            className="cyber-card-3d p-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">Threat Stream</span>
              <div className="p-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-purple-300 font-mono">4 Feeds</div>
            <div className="text-[10px] text-purple-400 mt-1 font-mono">
              WAF • EDR • AD • Snort
            </div>
          </div>

          {/* Metric 6: Security Budget ROI */}
          <div
            onClick={() => onNavigateTab('investment')}
            className="cyber-card-3d p-4 flex flex-col justify-between cursor-pointer group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-400">Optimized Budget</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              ₹{(organization.baseBudgetINR / 100000).toFixed(1)}L
            </div>
            <div className="text-[10px] text-emerald-300 mt-1 font-mono">
              -{investmentScenario.totalModeledReduction.toFixed(1)} Pts Reduction
            </div>
          </div>

        </div>
      </div>

      {/* 3. Signature Feature: 3D "Risk-to-Rupee" Financial-Risk Optimizer Experience */}
      <RiskToRupee3DExperience />

      {/* 4. 6-Factor Deterministic Mathematical Engine Breakdown */}
      <RiskFactor3DStructure />

      {/* 5. 3D Spatial Maps: Asset Topology Universe & Dynamic Threat Vector Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <AssetUniverse3DMap />
        </div>
        <div className="lg:col-span-6">
          <ThreatVector3DMap />
        </div>
      </div>

      {/* 6. 3D Regulatory Compliance Wall & Cryptographic Audit Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <Compliance3DWall />
        </div>
        <div className="lg:col-span-6">
          <Blockchain3DChain />
        </div>
      </div>

      {/* 7. Real-Time Telemetry Log Ingestion Studio Summary */}
      <DataIngestionSummary onNavigateTab={onNavigateTab} />

      {/* 8. Quick Command Navigation Grid */}
      <QuickNavigationGrid onNavigateTab={onNavigateTab} />

    </div>
  );
};
