import React, { useState, useRef, useEffect } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { IndustryType } from '../../types/organization';
import {
  ShieldAlert,
  Building2,
  Sparkles,
  RefreshCw,
  FileCheck,
  Key,
  Radio,
  SlidersHorizontal,
  ChevronDown,
  User,
  LogOut,
  Settings as SettingsIcon,
  HelpCircle,
  Menu,
  X,
  Award,
  ShieldCheck,
  Zap,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { ATTACK_SCENARIOS } from '../../services/telemetryService';
import { ApiKeyConfigModal } from '../copilot/ApiKeyConfigModal';
import { AuditCertificateModal } from '../blockchain/AuditCertificateModal';
import { HelpGuideModal } from '../common/HelpGuideModal';
import { SettingsModal } from '../common/SettingsModal';
import { OrganizationSelector3DModal } from '../3d/OrganizationSelector3DModal';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCopilotDrawer: () => void;
  toggleMobileMenu?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setActiveTab, openCopilotDrawer, toggleMobileMenu }) => {
  const {
    organization,
    currentIndustry,
    setIndustry,
    riskState,
    commitAuditSnapshot,
    isCommittingBlock,
    simulateAttack,
    geminiApiKey,
    currentUser,
    logout
  } = useSecurity();

  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showOrg3DModal, setShowOrg3DModal] = useState(false);
  const [showSimDropdown, setShowSimDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [snapshotSuccess, setSnapshotSuccess] = useState(false);

  const orgMenuRef = useRef<HTMLDivElement>(null);
  const simMenuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (orgMenuRef.current && !orgMenuRef.current.contains(event.target as Node)) {
        setShowOrgDropdown(false);
      }
      if (simMenuRef.current && !simMenuRef.current.contains(event.target as Node)) {
        setShowSimDropdown(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTakeSnapshot = async () => {
    await commitAuditSnapshot('CONTINUOUS_TELEMETRY_SNAP');
    setSnapshotSuccess(true);
    setTimeout(() => setSnapshotSuccess(false), 3000);
  };

  const industries: { key: IndustryType; label: string; icon: string; budget: string; compliance: string }[] = [
    { key: 'BANKING_FINTECH', label: 'Bharat NeoBank & FinTech', icon: '🏦', budget: '₹5.0L', compliance: 'RBI CSF • PCI-DSS' },
    { key: 'HEALTHCARE', label: 'Apex SuperSpecialty Hospital', icon: '🏥', budget: '₹4.0L', compliance: 'HIPAA • DISHA' },
    { key: 'HIGHER_EDUCATION', label: 'NIST University Campus', icon: '🎓', budget: '₹3.0L', compliance: 'NIST • UGC' },
    { key: 'CRITICAL_INFRASTRUCTURE', label: 'GridPower Energy & SCADA', icon: '⚡', budget: '₹7.5L', compliance: 'NCIIPC • CEA' },
    { key: 'ENTERPRISE_SAAS', label: 'CloudScale Multi-Tenant SaaS', icon: '☁️', budget: '₹6.0L', compliance: 'SOC 2 • ISO 27001' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-[#030712]/95 backdrop-blur-xl px-4 lg:px-6 py-2.5">
        <div className="flex items-center justify-between gap-3">
          
          {/* Left: Mobile Hamburger & Brand/Org Info */}
          <div className="flex items-center gap-3">
            {toggleMobileMenu && (
              <button
                onClick={toggleMobileMenu}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-300 lg:hidden"
                title="Toggle Mobile Menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}

            {/* Official Brand Logo & Name */}
            <BrandLogo
              size="sm"
              showText={true}
              showSubtitle={true}
              showBadge={true}
              badgeText="SIH 2026"
              onClick={() => setActiveTab('dashboard')}
            />

            {/* Vertical Divider */}
            <div className="hidden xl:block h-6 w-px bg-slate-800" />

            {/* Prominent Active Organization Badge */}
            <div className="hidden md:flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 px-3 py-1.5 rounded-xl">
              <Building2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <div className="text-left truncate max-w-[200px] lg:max-w-[280px]">
                <div className="font-bold text-xs text-white truncate">{organization.name}</div>
                <div className="text-[10px] text-slate-400 flex items-center gap-1.5 font-mono">
                  <span className="text-cyan-400 font-medium">{organization.industryLabel}</span>
                  <span>•</span>
                  <span className="text-emerald-400">● LIVE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Fast Organization Selector Dropdown */}
          <div className="relative" ref={orgMenuRef}>
            <button
              onClick={() => setShowOrgDropdown(!showOrgDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-900/90 border border-slate-700 hover:border-cyan-500/50 text-slate-200 transition-all shadow-sm"
              title="Switch Organization Profile"
            >
              <span className="text-sm">
                {industries.find(i => i.key === currentIndustry)?.icon || '🏦'}
              </span>
              <span className="truncate max-w-[130px] sm:max-w-[180px] font-medium">
                {organization.name}
              </span>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showOrgDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showOrgDropdown && (
              <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-80 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl p-2 z-50 backdrop-blur-2xl animate-fade-in">
                <div className="px-3 py-2 text-[10px] font-mono uppercase font-bold text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                  <span>Switch Organization Profile</span>
                  <span className="text-cyan-400">5 Sector Presets</span>
                </div>
                <div className="space-y-1">
                  {industries.map(ind => (
                    <button
                      key={ind.key}
                      onClick={() => {
                        setIndustry(ind.key);
                        setShowOrgDropdown(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl transition-all ${
                        currentIndustry === ind.key
                          ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm'
                          : 'text-slate-300 hover:bg-slate-800/80 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-semibold mb-0.5">
                        <span className="flex items-center gap-2">
                          <span>{ind.icon}</span>
                          <span className="truncate">{ind.label}</span>
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400">{ind.budget}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 pl-6 font-mono">
                        {ind.compliance}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="pt-2 mt-1 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowOrgDropdown(false);
                      setShowOrg3DModal(true);
                    }}
                    className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Launch 3D Organization Matrix</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Live Threat Simulator Trigger */}
            <div className="relative" ref={simMenuRef}>
              <button
                onClick={() => setShowSimDropdown(!showSimDropdown)}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-all shadow-sm"
                title="Simulate live cyber attack telemetry to test dynamic risk spike"
              >
                <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span className="hidden sm:inline">Simulate Threat</span>
              </button>

              {showSimDropdown && (
                <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-slate-900 border border-red-500/30 shadow-2xl p-2.5 z-50 backdrop-blur-2xl animate-fade-in">
                  <div className="px-2 py-1.5 text-[10.5px] font-bold text-red-300 uppercase tracking-wider border-b border-slate-800 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Flame className="w-3.5 h-3.5 text-red-400" />
                      Live Attack Injection (SIH Demo)
                    </span>
                  </div>
                  <div className="space-y-1">
                    {ATTACK_SCENARIOS.map(scen => (
                      <button
                        key={scen.id}
                        onClick={() => {
                          simulateAttack(scen);
                          setShowSimDropdown(false);
                        }}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-red-500/15 transition-colors border border-transparent hover:border-red-500/30 group"
                      >
                        <div className="text-xs font-semibold text-slate-200 group-hover:text-red-300 flex items-center justify-between">
                          <span>{scen.name}</span>
                          <span className="text-[10px] font-mono text-red-400 font-bold">+{scen.expectedRiskIncrease} pts</span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{scen.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Commit Blockchain Audit Snapshot */}
            <button
              onClick={handleTakeSnapshot}
              disabled={isCommittingBlock}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                snapshotSuccess
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-900/90 border-slate-700 hover:border-cyan-500/50 text-slate-200'
              }`}
              title="Generate SHA-256 cryptographic snapshot and commit to blockchain audit ledger"
            >
              <FileCheck className={`w-3.5 h-3.5 ${isCommittingBlock ? 'animate-spin text-cyan-400' : 'text-emerald-400'}`} />
              <span>
                {snapshotSuccess ? 'Snapshot Anchored!' : isCommittingBlock ? 'Hashing...' : 'Anchor Hash'}
              </span>
            </button>

            {/* Grounded AI Copilot Trigger */}
            <button
              onClick={openCopilotDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>

            {/* User Profile Menu Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 transition-colors"
                title="User Profile & System Menu"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  {currentUser?.name ? currentUser.name.charAt(0) : 'P'}
                </div>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:block" />
              </button>

              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900/95 border border-slate-700 shadow-2xl p-2 z-50 backdrop-blur-2xl animate-fade-in text-xs">
                  {/* User Profile Header */}
                  <div className="p-3 border-b border-slate-800 mb-1">
                    <div className="font-bold text-white text-sm">{currentUser?.name || 'Preeti Gandhi'}</div>
                    <div className="text-[11px] text-cyan-300 font-medium">{currentUser?.role || 'CISO Staff'}</div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{organization.name}</div>
                  </div>

                  {/* Menu Items */}
                  <div className="space-y-0.5">
                    <button
                      onClick={() => {
                        setShowCertModal(true);
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                    >
                      <Award className="w-4 h-4 text-cyan-400" />
                      <span>Audit Certificate</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowSettingsModal(true);
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                    >
                      <SettingsIcon className="w-4 h-4 text-slate-400" />
                      <span>Platform Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowHelpModal(true);
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition-colors text-left"
                    >
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                      <span>SIH 2026 Presentation Guide</span>
                    </button>

                    <div className="border-t border-slate-800 my-1" />

                    <button
                      onClick={() => {
                        logout();
                        setShowUserDropdown(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-red-400 hover:bg-red-500/15 transition-colors text-left font-semibold"
                    >
                      <LogOut className="w-4 h-4 text-red-400" />
                      <span>Sign Out / Switch User</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* Modals */}
      <ApiKeyConfigModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} />
      <AuditCertificateModal isOpen={showCertModal} onClose={() => setShowCertModal(false)} />
      <HelpGuideModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      <OrganizationSelector3DModal isOpen={showOrg3DModal} onClose={() => setShowOrg3DModal(false)} />
    </>
  );
};
