import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { ExecutivePitchExport } from '../components/investment/ExecutivePitchExport';
import { AuditCertificateModal } from '../components/blockchain/AuditCertificateModal';
import { FileText, Award, ShieldCheck, Download, Printer, CheckCircle2 } from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { organization, riskState, investmentScenario, ledgerBlocks } = useSecurity();
  const [showCertModal, setShowCertModal] = useState<boolean>(false);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              Executive Governance Reports & Audit Certificates
            </h1>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded-md">
              Board-Ready Exporters
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Generate executive investment presentations and cryptographic audit certificates for <strong>{organization.name}</strong>.
          </p>
        </div>

        <button
          onClick={() => setShowCertModal(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20 hover:brightness-110 flex items-center gap-2 transition-all cursor-pointer"
        >
          <Award className="w-4 h-4" />
          <span>Launch Audit Certificate</span>
        </button>
      </div>

      {/* Quick Summary Banner */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">CURRENT QUANT RISK</div>
            <div className="text-white font-bold text-sm">{riskState.overallScore} / 100 ({riskState.riskBand})</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">PROJECTED RISK (ROI SOLVED)</div>
            <div className="text-emerald-400 font-bold text-sm">{investmentScenario.projectedRiskScore} / 100</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <div className="text-slate-400 text-[10px]">BLOCKCHAIN LEDGER BLOCKS</div>
            <div className="text-indigo-300 font-bold text-sm">{ledgerBlocks.length} Anchored Blocks</div>
          </div>
        </div>
      </div>

      {/* Executive Investment Pitch Exporter */}
      <ExecutivePitchExport />

      {/* Certificate Modal */}
      <AuditCertificateModal isOpen={showCertModal} onClose={() => setShowCertModal(false)} />
    </div>
  );
};
