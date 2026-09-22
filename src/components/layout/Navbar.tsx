import React, { useState } from 'react';
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
  ChevronDown
} from 'lucide-react';
import { ATTACK_SCENARIOS } from '../../services/telemetryService';
import { ApiKeyConfigModal } from '../copilot/ApiKeyConfigModal';
import { AuditCertificateModal } from '../blockchain/AuditCertificateModal';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openCopilotDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setActiveTab, openCopilotDrawer }) => {
  const {
    organization,
    currentIndustry,
    setIndustry,
    riskState,
    commitAuditSnapshot,
    isCommittingBlock,
    simulateAttack,
    geminiApiKey
  } = useSecurity();

  const [showOrgDropdown, setShowOrgDropdown] = useState(false);
  const [showSimDropdown, setShowSimDropdown] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showCertModal, setShowCertModal] = useState(false);
  const [snapshotSuccess, setSnapshotSuccess] = useState(false);

  const handleTakeSnapshot = async () => {
    await commitAuditSnapshot('CONTINUOUS_TELEMETRY_SNAP');
    setSnapshotSuccess(true);
    setTimeout(() => setSnapshotSuccess(false), 3000);
  };

  const industries: { key: IndustryType; label: string; icon: string }[] = [
    { key: 'BANKING_FINTECH', label: 'Banking & FinTech (RBI CSF)', icon: '🏦' },
    { key: 'HEALTHCARE', label: 'Healthcare & Hospital (HIPAA/DISHA)', icon: '🏥' },
    { key: 'ENTERPRISE_SAAS', label: 'Enterprise SaaS (SOC2/ISO 27001)', icon: '☁️' },
    { key: 'HIGHER_EDUCATION', label: 'Higher Education (NIST/UGC)', icon: '🎓' },
    { key: 'CRITICAL_INFRASTRUCTURE', label: 'Critical Energy Grid (NCIIPC)', icon: '⚡' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/90 bg-[#030712]/90 backdrop-blur-md px-4 lg:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-lg bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-cyan-300">
                  CyberShield<span className="text-cyan-400">.AI</span>
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase font-bold tracking-wider rounded border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                  QUANT-ENGINE v2.4
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Continuous Cyber Risk Quantification & Risk-to-Rupee Optimizer
              </p>
            </div>
          </div>

          {/* Industry Preset Selector */}
          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowOrgDropdown(!showOrgDropdown)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-200 transition-colors"
              >
                <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate max-w-[190px]">{organization.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showOrgDropdown && (
                <div className="absolute left-0 mt-2 w-72 rounded-xl bg-slate-900/95 border border-slate-700 shadow-2xl p-1.5 z-50 backdrop-blur-xl">
                  <div className="px-2 py-1.5 text-[10px] font-mono uppercase text-slate-400 border-b border-slate-800">
                    Switch Industry Preset
                  </div>
                  {industries.map(ind => (
                    <button
                      key={ind.key}
                      onClick={() => {
                        setIndustry(ind.key);
                        setShowOrgDropdown(false);
                      }}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 text-xs rounded-lg transition-colors ${
                        currentIndustry === ind.key
                          ? 'bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span className="text-sm">{ind.icon}</span>
                      <span className="truncate">{ind.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Action Controls */}
          <div className="flex items-center gap-2">
            {/* Live Attack Simulator Trigger */}
            <div className="relative">
              <button
                onClick={() => setShowSimDropdown(!showSimDropdown)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-all"
                title="Inject live cyber attack telemetry to test dynamic risk engine"
              >
                <Radio className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span className="hidden sm:inline">Simulate Attack</span>
              </button>

              {showSimDropdown && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-slate-900 border border-red-500/30 shadow-2xl p-2 z-50">
                  <div className="px-2 py-1 text-[11px] font-bold text-red-300 uppercase tracking-wider border-b border-slate-800 mb-1">
                    ⚡ Live Threat Injection Scenarios
                  </div>
                  {ATTACK_SCENARIOS.map(scen => (
                    <button
                      key={scen.id}
                      onClick={() => {
                        simulateAttack(scen);
                        setShowSimDropdown(false);
                      }}
                      className="w-full text-left p-2.5 rounded-lg hover:bg-red-500/10 transition-colors border border-transparent hover:border-red-500/20 mb-1 group"
                    >
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-red-300 flex items-center justify-between">
                        <span>{scen.name}</span>
                        <span className="text-[10px] font-mono text-red-400 font-bold">+{scen.expectedRiskIncrease} pts</span>
                      </div>
                      <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">{scen.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Commit Blockchain Audit Snapshot */}
            <button
              onClick={handleTakeSnapshot}
              disabled={isCommittingBlock}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                snapshotSuccess
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-slate-800/80 border-slate-700 hover:border-cyan-500/50 text-slate-200'
              }`}
              title="Generate SHA-256 cryptographic snapshot and commit to audit ledger"
            >
              <FileCheck className={`w-3.5 h-3.5 ${isCommittingBlock ? 'animate-spin text-cyan-400' : 'text-emerald-400'}`} />
              <span className="hidden md:inline">
                {snapshotSuccess ? 'Snapshot Anchored!' : isCommittingBlock ? 'Hashing...' : 'Anchor Audit Hash'}
              </span>
            </button>

            {/* Blockchain Certificate */}
            <button
              onClick={() => setShowCertModal(true)}
              className="p-1.5 rounded-lg text-xs bg-slate-900 border border-slate-700 hover:border-slate-600 text-slate-300"
              title="View Tamper-Evident Assessment Certificate"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
            </button>

            {/* Gemini API Key */}
            <button
              onClick={() => setShowKeyModal(true)}
              className={`p-1.5 rounded-lg text-xs border transition-colors ${
                geminiApiKey
                  ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
              }`}
              title="Configure Gemini API Key / Settings"
            >
              <Key className="w-4 h-4" />
            </button>

            {/* AI Copilot Trigger */}
            <button
              onClick={openCopilotDrawer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:brightness-110 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin text-cyan-200" style={{ animationDuration: '6s' }} />
              <span>AI Copilot</span>
            </button>
          </div>
        </div>
      </header>

      {/* Modals */}
      <ApiKeyConfigModal isOpen={showKeyModal} onClose={() => setShowKeyModal(false)} />
      <AuditCertificateModal isOpen={showCertModal} onClose={() => setShowCertModal(false)} />
    </>
  );
};
