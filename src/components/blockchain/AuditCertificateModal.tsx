import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldCheck, X, Award, CheckCircle2, Download, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';
import { BrandLogo } from '../common/BrandLogo';

interface AuditCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuditCertificateModal: React.FC<AuditCertificateModalProps> = ({ isOpen, onClose }) => {
  const { organization, riskState, ledgerBlocks } = useSecurity();

  if (!isOpen) return null;

  const latestBlock = ledgerBlocks[ledgerBlocks.length - 1];

  const handlePrint = () => {
    confetti({ particleCount: 70, spread: 50 });
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl cyber-card p-6 border-cyan-500/40 shadow-2xl shadow-cyan-950/40 print:bg-white print:text-black">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white print:hidden"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Certificate Header */}
        <div className="text-center pb-4 border-b border-slate-800 print:border-black flex flex-col items-center">
          <BrandLogo size="sm" showBadge={true} badgeText="AUDIT VERIFIED" className="mb-2.5" />
          <h2 className="text-xl font-black text-white print:text-black tracking-tight uppercase">
            Tamper-Evident Cyber Risk Audit Certificate
          </h2>
          <p className="text-xs font-mono text-cyan-400 print:text-blue-600 mt-0.5">
            Cryptographically Anchored on Enterprise Blockchain Ledger
          </p>
        </div>

        {/* Certificate Body */}
        <div className="py-5 space-y-4 text-xs text-slate-300 print:text-black font-sans leading-relaxed">
          <p className="text-center italic text-slate-400 print:text-slate-600">
            This certifies that the cybersecurity posture and risk quantification metrics for:
          </p>

          <div className="text-center">
            <div className="text-lg font-extrabold text-white print:text-black">
              {organization.name}
            </div>
            <div className="text-xs font-mono text-slate-400 print:text-slate-600">
              Industry Domain: {organization.industryLabel}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300 font-mono text-xs">
            <div>
              <span className="text-slate-500 block text-[10px]">QUANTIFIED CYBER RISK:</span>
              <span className="font-extrabold text-red-400 print:text-red-700 text-sm">
                {riskState.overallScore}/100 ({riskState.riskBand})
              </span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">ANCHOR BLOCK NUMBER:</span>
              <span className="font-extrabold text-cyan-300 print:text-blue-700 text-sm">
                Block #{latestBlock ? latestBlock.blockNumber : 0}
              </span>
            </div>
            <div className="col-span-2 pt-2 border-t border-slate-900 print:border-slate-300">
              <span className="text-slate-500 block text-[10px]">SHA-256 MERKLE ROOT DIGEST:</span>
              <span className="text-emerald-400 print:text-emerald-800 text-[11px] truncate block">
                {latestBlock ? latestBlock.merkleRoot : 'N/A'}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 print:text-slate-600 pt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Consensus Validator: <strong>{latestBlock?.validatorNode || 'NODE_IN_01'}</strong>
            </span>
            <span className="font-mono">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="pt-4 border-t border-slate-800 print:hidden flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
