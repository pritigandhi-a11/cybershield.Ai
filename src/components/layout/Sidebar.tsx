import React, { useState } from 'react';
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
  Building2,
  Server,
  Bug,
  ShieldAlert,
  FileCheck2,
  SlidersHorizontal,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  HelpCircle,
  FileText,
  BadgeAlert,
  Layers,
  Settings as SettingsIcon,
  UserCheck
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCopilotDrawer: () => void;
  openSettingsModal?: () => void;
  openHelpModal?: () => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  openCopilotDrawer,
  openSettingsModal,
  openHelpModal,
  isCollapsed = false,
  setIsCollapsed
}) => {
  const {
    organization,
    riskState,
    vulnerabilities,
    incidents,
    controls,
    investmentScenario,
    currentUser,
    logout
  } = useSecurity();

  const [localCollapsed, setLocalCollapsed] = useState<boolean>(false);
  const collapsed = isCollapsed ?? localCollapsed;
  const toggleCollapse = () => {
    if (setIsCollapsed) {
      setIsCollapsed(!collapsed);
    } else {
      setLocalCollapsed(!collapsed);
    }
  };

  const openVulnsCount = vulnerabilities.filter(v => v.status !== 'REMEDIATED').length;
  const criticalVulnsCount = vulnerabilities.filter(v => v.severity === 'CRITICAL' && v.status !== 'REMEDIATED').length;
  const activeIncidentsCount = incidents.filter(i => i.status === 'ACTIVE_TRIAGE').length;
  const degradedControlsCount = controls.filter(c => c.health !== 'OPTIMAL').length;

  const navGroups = [
    {
      title: 'COMMAND CENTER',
      items: [
        {
          id: 'dashboard',
          label: 'Executive Overview',
          icon: LayoutDashboard,
          badge: `${riskState.overallScore}/100`,
          badgeColor: riskState.overallScore >= 75 ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
        },
        {
          id: 'risk-dashboard',
          label: 'Risk Dashboard',
          icon: Calculator,
          badge: '6 Factors',
          badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30'
        }
      ]
    },
    {
      title: 'SECURITY OPERATIONS',
      items: [
        {
          id: 'assets',
          label: 'Critical Assets',
          icon: Server,
          badge: `${organization.totalAssetsCount}`,
          badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
        },
        {
          id: 'vulnerabilities',
          label: 'Vulnerabilities',
          icon: Bug,
          badge: criticalVulnsCount > 0 ? `${criticalVulnsCount} Critical` : `${openVulnsCount}`,
          badgeColor: criticalVulnsCount > 0 ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
        },
        {
          id: 'telemetry',
          label: 'Threat Intelligence',
          icon: Activity,
          badge: 'Live Feeds',
          badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
        },
        {
          id: 'incidents',
          label: 'Incident Center',
          icon: Flame,
          badge: activeIncidentsCount > 0 ? `${activeIncidentsCount} Active` : '0 Active',
          badgeColor: activeIncidentsCount > 0 ? 'bg-red-500/25 text-red-300 border-red-500/40 animate-pulse' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        },
        {
          id: 'controls',
          label: 'Security Controls',
          icon: ShieldAlert,
          badge: degradedControlsCount > 0 ? `${degradedControlsCount} Gaps` : 'Optimal',
          badgeColor: degradedControlsCount > 0 ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        }
      ]
    },
    {
      title: 'QUANTITATIVE INTELLIGENCE',
      items: [
        {
          id: 'risk-engine',
          label: 'Risk Analysis Engine',
          icon: SlidersHorizontal,
          badge: 'Formula',
          badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30'
        },
        {
          id: 'investment',
          label: 'Risk-to-Rupee Optimizer',
          icon: Coins,
          badge: `-${investmentScenario.totalModeledReduction} pts`,
          badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
        },
        {
          id: 'recommendations',
          label: 'Prioritized Actions',
          icon: ListOrdered,
          badge: `${investmentScenario.selectedActionIds.length} Selected`,
          badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/30'
        },
        {
          id: 'compliance',
          label: 'Regulatory Compliance',
          icon: FileCheck2,
          badge: 'RBI • CERT-In',
          badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
        }
      ]
    },
    {
      title: 'GOVERNANCE & AUDIT',
      items: [
        {
          id: 'blockchain',
          label: 'Audit Ledger',
          icon: ShieldCheck,
          badge: 'SHA-256',
          badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30'
        },
        {
          id: 'reports',
          label: 'Executive Reports',
          icon: FileText,
          badge: 'Pitch Deck',
          badgeColor: 'bg-slate-700/60 text-slate-300 border-slate-600'
        }
      ]
    }
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-20' : 'w-72'
      } flex-shrink-0 border-r border-slate-800/90 bg-[#030712]/95 backdrop-blur-xl transition-all duration-300 hidden lg:flex flex-col justify-between z-30 select-none`}
    >
      {/* Top Header & Organization Profile Card */}
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          {!collapsed ? (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div className="font-black text-sm tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-400">
                  CYBERSHIELD<span className="text-cyan-400">.AI</span>
                </div>
                <div className="text-[10px] text-slate-400 font-mono">ENTERPRISE SOC</div>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 mx-auto rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          )}

          <button
            onClick={toggleCollapse}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Selected Organization Summary Card */}
        {!collapsed ? (
          <div className="p-3.5 mx-3 mt-3 rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-950 to-slate-900/50 border border-slate-800 shadow-md">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              <div className="truncate">
                <div className="font-bold text-xs text-white truncate">{organization.name}</div>
                <div className="text-[10px] text-slate-400 truncate">{organization.industryLabel}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-800/80 font-mono">
              <span className="text-slate-400">Base Budget:</span>
              <span className="text-cyan-400 font-bold">₹{(organization.baseBudgetINR / 100000).toFixed(1)}L</span>
            </div>
          </div>
        ) : (
          <div className="p-2 mx-auto mt-2 text-center" title={`${organization.name} (${organization.industryLabel})`}>
            <div className="w-8 h-8 mx-auto rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400">
              <Building2 className="w-4 h-4" />
            </div>
          </div>
        )}

        {/* Scrollable Navigation Groups */}
        <div className="p-3 space-y-4 overflow-y-auto max-h-[calc(100vh-290px)] custom-scrollbar">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx}>
              {!collapsed && (
                <div className="px-3 text-[9.5px] font-mono uppercase font-bold tracking-wider text-slate-400 mb-1.5">
                  {group.title}
                </div>
              )}
              <nav className="space-y-0.5">
                {group.items.map(item => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      title={collapsed ? `${item.label} (${item.badge})` : undefined}
                      className={`w-full flex items-center ${
                        collapsed ? 'justify-center p-2.5' : 'justify-between px-3 py-2'
                      } rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-cyan-500/20 via-cyan-500/10 to-blue-500/5 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'}`} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </div>
                      {!collapsed && item.badge && (
                        <span className={`px-1.5 py-0.5 text-[9.5px] font-mono rounded-md border ${item.badgeColor}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom User Profile & Action Controls */}
      <div className="p-3 border-t border-slate-800/90 space-y-2 bg-slate-950/90">
        {/* Grounded AI Copilot Quick Button */}
        <button
          onClick={openCopilotDrawer}
          className={`w-full flex items-center ${
            collapsed ? 'justify-center p-2' : 'justify-between px-3 py-2'
          } rounded-xl bg-gradient-to-r from-cyan-500/15 via-blue-600/15 to-indigo-600/15 hover:from-cyan-500/25 hover:to-indigo-600/25 border border-cyan-500/30 text-cyan-300 text-xs font-semibold shadow-sm transition-all group`}
          title="Open Grounded AI Security Copilot"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
            {!collapsed && <span>AI Copilot</span>}
          </div>
          {!collapsed && (
            <span className="px-1.5 py-0.5 text-[9px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 rounded font-mono">
              ACTIVE
            </span>
          )}
        </button>

        {/* User Profile / Settings Row */}
        {!collapsed ? (
          <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 truncate mr-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-indigo-300 text-xs font-bold">
                {currentUser?.name ? currentUser.name.charAt(0) : 'P'}
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-white truncate">{currentUser?.name || 'Preeti Gandhi'}</div>
                <div className="text-[10px] text-slate-400 truncate">CISO Staff</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {openHelpModal && (
                <button
                  onClick={openHelpModal}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title="SIH Demo Guide & Help"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                </button>
              )}
              {openSettingsModal && (
                <button
                  onClick={openSettingsModal}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                  title="Settings"
                >
                  <SettingsIcon className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={logout}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-colors"
                title="Sign Out to Login Screen"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-300 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};
