import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { AssetInventoryTable } from '../components/telemetry/AssetInventoryTable';
import { Server, ShieldCheck, AlertTriangle, Layers, Filter, Search } from 'lucide-react';

export const AssetsPage: React.FC = () => {
  const { assets, organization } = useSecurity();

  const highCriticalAssets = assets.filter(a => a.criticalityScore >= 8.5);
  const mfaEnabledCount = assets.filter(a => a.mfaEnabled).length;
  const edrActiveCount = assets.filter(a => a.edrActive).length;
  const internetFacingCount = assets.filter(a => a.exposureLevel === 'INTERNET_FACING').length;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Institutional Asset Inventory & Criticality Matrix
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded-md">
              {organization.totalAssetsCount} Total Assets
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time asset telemetry for <strong>{organization.name}</strong>, tracking operational criticality, network exposure boundaries, EDR agent heartbeats, and identity enforcement.
          </p>
        </div>
      </div>

      {/* Asset KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Total Monitored Nodes</span>
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Server className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">{organization.totalAssetsCount}</div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> 100% Ingestion Coverage
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Tier-1 Critical Systems</span>
            <div className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-400 font-mono">{highCriticalAssets.length} Nodes</div>
          <div className="text-[11px] text-rose-300/80 mt-1">Criticality Score &ge; 8.5 / 10.0</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">EDR / XDR Sensor Active</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {Math.round((edrActiveCount / Math.max(1, assets.length)) * 100)}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1">{edrActiveCount} of {assets.length} sample assets active</div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Internet Facing Endpoints</span>
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">{internetFacingCount} Gateways</div>
          <div className="text-[11px] text-amber-300/80 mt-1">External DMZ Perimeter</div>
        </div>
      </div>

      {/* Main Asset Table */}
      <AssetInventoryTable />
    </div>
  );
};
