import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { Server, Shield, Key, HardDrive, Search, Filter } from 'lucide-react';
import { ExposureBadge } from '../common/StatusBadge';

export const AssetInventoryTable: React.FC = () => {
  const { assets } = useSecurity();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const filteredAssets = assets.filter(asset => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.ipAddress.includes(searchTerm) ||
      asset.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || asset.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="cyber-card p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            Critical Asset Inventory & Exposure Mapping
          </h2>
          <p className="text-xs text-slate-400">
            Real-time asset telemetry, criticality weighting, and security control health
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {/* Search input */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search assets, IPs, depts..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
            />
          </div>

          {/* Filter dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg text-xs bg-slate-950 border border-slate-800 text-slate-300 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Categories</option>
            <option value="API_GATEWAY">API Gateways</option>
            <option value="DATABASE">Databases</option>
            <option value="IDENTITY_DC">Identity & Active Directory</option>
            <option value="CORE_BANKING">Core Banking / SCADA</option>
            <option value="CLOUD_INFRA">Cloud Infra</option>
          </select>
        </div>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider bg-slate-950/60">
              <th className="py-2.5 px-3">Asset Name & IP</th>
              <th className="py-2.5 px-3">Department</th>
              <th className="py-2.5 px-3">Criticality (1-10)</th>
              <th className="py-2.5 px-3">Exposure Level</th>
              <th className="py-2.5 px-3">Controls (MFA / EDR / Backup)</th>
              <th className="py-2.5 px-3 text-right">Health Score</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-900 text-xs">
            {filteredAssets.map(asset => (
              <tr key={asset.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-3">
                  <div className="font-semibold text-slate-200">{asset.name}</div>
                  <div className="font-mono text-[11px] text-cyan-400">{asset.ipAddress}</div>
                </td>
                <td className="py-3 px-3 text-slate-400 font-sans">{asset.department}</td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-1.5 font-mono">
                    <span
                      className={`font-black text-xs ${
                        asset.criticalityScore >= 9.0
                          ? 'text-red-400'
                          : asset.criticalityScore >= 7.0
                          ? 'text-orange-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {asset.criticalityScore}
                    </span>
                    <span className="text-[10px] text-slate-400">/ 10</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <ExposureBadge level={asset.exposureLevel} />
                </td>
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono">
                    <span
                      className={`px-1.5 py-0.5 rounded border ${
                        asset.mfaEnabled
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-red-500/10 text-red-300 border-red-500/30'
                      }`}
                      title={asset.mfaEnabled ? 'Hardware MFA Enforced' : 'MFA Missing'}
                    >
                      MFA: {asset.mfaEnabled ? '✓' : '✗'}
                    </span>

                    <span
                      className={`px-1.5 py-0.5 rounded border ${
                        asset.edrActive
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-red-500/10 text-red-300 border-red-500/30'
                      }`}
                      title={asset.edrActive ? 'EDR Sensor Active' : 'EDR Sensor Missing'}
                    >
                      EDR: {asset.edrActive ? '✓' : '✗'}
                    </span>

                    <span
                      className={`px-1.5 py-0.5 rounded border ${
                        asset.lastBackupHoursAgo <= 24
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                      }`}
                      title={`Last backup ${asset.lastBackupHoursAgo} hours ago`}
                    >
                      Backup: {asset.lastBackupHoursAgo}h
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-right">
                  <div className="font-mono font-bold text-xs">
                    <span
                      className={
                        asset.healthScore >= 75
                          ? 'text-emerald-400'
                          : asset.healthScore >= 50
                          ? 'text-amber-400'
                          : 'text-red-400'
                      }
                    >
                      {asset.healthScore}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
