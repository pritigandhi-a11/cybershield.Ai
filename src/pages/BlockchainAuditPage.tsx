import React, { useState } from 'react';
import { useSecurity } from '../context/SecurityContext';
import { LedgerExplorer } from '../components/blockchain/LedgerExplorer';
import { HashVerifier } from '../components/blockchain/HashVerifier';
import { AuditCertificateModal } from '../components/blockchain/AuditCertificateModal';
import { AuditBlock } from '../types/blockchain';
import { ShieldCheck, Award, Lock } from 'lucide-react';

export const BlockchainAuditPage: React.FC = () => {
  const { ledgerBlocks } = useSecurity();
  const [selectedBlock, setSelectedBlock] = useState<AuditBlock | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            Tamper-Evident Audit Prototype & Merkle Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Anchors risk assessments, budget allocations, and compliance snapshots onto an immutable SHA-256 Merkle chain.
          </p>
        </div>

        <button
          onClick={() => setShowCertModal(true)}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 transition-colors shadow-sm"
        >
          <Award className="w-4 h-4" />
          <span>View Audit Certificate</span>
        </button>
      </div>

      {/* Security Info Card */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-slate-200 font-bold block">Privacy-Preserving Off-Chain Storage (Cryptographic Prototype)</span>
            <span className="text-slate-400 font-sans">Raw customer data, credentials, and internal IP topology remain strictly off-chain. Only SHA-256 digests and Merkle roots are committed.</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-slate-400 flex-shrink-0">
          <span>Committed Blocks: <strong className="text-cyan-400">{ledgerBlocks.length}</strong></span>
          <span>•</span>
          <span>Proof Type: <strong className="text-emerald-400">SHA-256 Merkle Root</strong></span>
        </div>
      </div>

      <HashVerifier selectedBlock={selectedBlock} />
      <LedgerExplorer
        onSelectBlock={(b) => setSelectedBlock(b)}
        selectedBlockNumber={selectedBlock?.blockNumber ?? null}
      />

      <AuditCertificateModal isOpen={showCertModal} onClose={() => setShowCertModal(false)} />
    </div>
  );
};
