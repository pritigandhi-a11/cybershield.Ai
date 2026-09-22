import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  LayoutDashboard,
  Activity,
  Calculator,
  ListOrdered,
  Coins,
  ShieldCheck,
  BotMessageSquare,
  Flame,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { riskState, vulnerabilities, incidents, investmentScenario } = useSecurity();

  const openVulnsCount = vulnerabilities.filter(v => v.status !== 'REMEDIATED').length;
  const activeIncidentsCount = incidents.filter(i => i.status === 'ACTIVE_TRIAGE').length;

  const navItems = [
    {
      id: 'dashboard',
      label: 'Executive Command',
      icon: LayoutDashboard,
      badge: `${riskState.overallScore}/100`,
      badgeColor: riskState.overallScore >= 75 ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    },
    {
      id: 'telemetry',
      label: 'AI Telemetry & Ingestion',
      icon: Activity,
      badge: 'Live',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    },
    {
      id: 'risk-engine',
      label: 'Mathematical Risk Engine',
      icon: Calculator,
      badge: '6 Factors',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    },
    {
      id: 'prioritization',
      label: 'Risk Prioritization',
      icon: ListOrdered,
      badge: `${openVulnsCount} CVEs`,
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30'
    },
    {
      id: 'investment',
      label: 'Risk-to-Rupee Optimizer',
      icon: Coins,
      badge: `-${investmentScenario.totalModeledReduction} pts`,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
    },
    {
      id: 'blockchain',
      label: 'Blockchain Audit Ledger',
      icon: ShieldCheck,
      badge: 'SHA-256',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      id: 'copilot',
      label: 'AI Security Copilot',
      icon: BotMessageSquare,
      badge: 'Advisor',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-800 bg-slate-950/60 p-4 hidden lg:flex flex-col justify-between">
      <div className="space-y-6">
        {/* Navigation Menu */}
        <div>
          <div className="px-3 text-[10px] font-mono uppercase font-bold tracking-wider text-slate-400 mb-2">
            Decision & Control Layer
          </div>
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/15 to-blue-500/10 text-cyan-300 font-semibold border border-cyan-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Live Active Incident Banner */}
        {activeIncidentsCount > 0 && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30">
            <div className="flex items-center gap-2 text-red-400 text-xs font-bold mb-1">
              <Flame className="w-3.5 h-3.5 animate-bounce" />
              <span>Active Threat Triage</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {activeIncidentsCount} ongoing critical security alert requires active mitigation.
            </p>
            <button
              onClick={() => setActiveTab('prioritization')}
              className="mt-2 text-[11px] text-red-300 hover:underline font-medium"
            >
              Open Incident Action Center &rarr;
            </button>
          </div>
        )}
      </div>

      {/* Footer System Status */}
      <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Quant Engine
          </span>
          <span className="text-emerald-400 font-mono text-[10px]">HEALTHY</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Ledger Nodes</span>
          <span className="font-mono text-cyan-400 text-[10px]">SYNCED (3/3)</span>
        </div>
      </div>
    </aside>
  );
};
