import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { AuditBlock } from '../../types/blockchain';
import { ShieldCheck, Lock, Award, CheckCircle2, FileCheck, ArrowRight, Sparkles, Hash } from 'lucide-react';
import { AuditCertificateModal } from '../blockchain/AuditCertificateModal';

export const Blockchain3DChain: React.FC = () => {
  const { ledgerBlocks, organization, commitAuditSnapshot, isCommittingBlock } = useSecurity();
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<AuditBlock | null>(null);

  return (
    <div className="cyber-card-3d p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 cyber-grid-bg opacity-25 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm sm:text-base text-white">
                3D Cryptographic Audit Ledger & Merkle Chain
              </h3>
              <span className="px-2 py-0.5 text-[9.5px] font-mono font-bold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 rounded">
                SHA-256 PROTOTYPE
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Immutable assessment snapshots anchored via SHA-256 Merkle root verification
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => commitAuditSnapshot('CONTINUOUS_TELEMETRY_SNAP')}
            disabled={isCommittingBlock}
            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <FileCheck className={`w-3.5 h-3.5 ${isCommittingBlock ? 'animate-spin text-cyan-400' : 'text-emerald-400'}`} />
            <span>{isCommittingBlock ? 'Hashing Block...' : 'Anchor New Block'}</span>
          </button>

          <button
            onClick={() => setShowCertModal(true)}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold shadow-md shadow-cyan-500/20 hover:brightness-110 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Award className="w-3.5 h-3.5" />
            <span>Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Connected 3D Blocks Visual Chain */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        {ledgerBlocks.slice(0, 3).map((block, idx) => (
          <div
            key={block.blockNumber}
            onClick={() => setSelectedBlock(block)}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-950/90 via-slate-900 to-slate-950 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/30 cursor-pointer relative group"
          >
            {/* Block Number & Status */}
            <div className="flex items-center justify-between text-[10px] font-mono mb-2">
              <span className="px-2 py-0.5 rounded bg-indigo-950/80 text-indigo-300 border border-indigo-800/60 font-bold">
                BLOCK #{block.blockNumber}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> VERIFIED
              </span>
            </div>

            {/* Block Hash */}
            <div className="mb-2">
              <span className="text-[9.5px] text-slate-500 font-mono block">SHA-256 BLOCK HASH</span>
              <div className="font-mono text-xs text-indigo-300 truncate font-semibold">
                {block.currentHash}
              </div>
            </div>

            {/* Risk Snapshot Details */}
            <div className="pt-2 border-t border-slate-800/80 grid grid-cols-2 gap-2 text-[10.5px] font-mono">
              <div>
                <span className="text-slate-500 text-[9px] block">QUANT RISK</span>
                <strong className="text-rose-400">{block.payload.calculatedRiskScore} / 100</strong>
              </div>
              <div>
                <span className="text-slate-500 text-[9px] block">TIMESTAMP</span>
                <span className="text-slate-300">{new Date(block.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[10.5px] font-mono text-slate-400">
        <span>Off-Chain Confidentiality: Raw assets & IP topology remain strictly private.</span>
        <span className="text-indigo-400 font-bold">Total Committed Blocks: {ledgerBlocks.length}</span>
      </div>

      <AuditCertificateModal isOpen={showCertModal} onClose={() => setShowCertModal(false)} />
    </div>
  );
};
