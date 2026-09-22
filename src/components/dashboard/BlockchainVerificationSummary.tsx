import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { ShieldCheck, Link2, CheckCircle2, ArrowRight, Lock, Key } from 'lucide-react';

interface BlockchainVerificationSummaryProps {
  onNavigateTab: (tabId: string) => void;
}

export const BlockchainVerificationSummary: React.FC<BlockchainVerificationSummaryProps> = ({ onNavigateTab }) => {
  const { ledgerBlocks } = useSecurity();

  const latestBlock = ledgerBlocks[ledgerBlocks.length - 1];

  return (
    <div className="cyber-card p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-indigo-400" />
              Blockchain Audit & Integrity Status
            </h2>
            <p className="text-xs text-slate-400">
              Cryptographically anchored assessment records with tamper-evident proof
            </p>
          </div>

          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Ledger Synced
          </span>
        </div>

        {/* Latest Block Details Box */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Latest Finalized Block:</span>
            </span>
            <strong className="text-cyan-300">Block #{latestBlock ? latestBlock.blockNumber : 0}</strong>
          </div>

          <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-[10px] text-slate-500 block mb-0.5">SHA-256 MERKLE ROOT DIGEST:</span>
            <span className="text-emerald-400 text-[11px] truncate block font-bold">
              {latestBlock ? latestBlock.merkleRoot : '0x811c9dc5...'}
            </span>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Validator: <strong className="text-slate-200">{latestBlock?.validatorNode || 'NODE_IN_01'}</strong></span>
            <span>Total Blocks: <strong className="text-indigo-400">{ledgerBlocks.length}</strong></span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-900 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 flex items-center gap-1">
          <Lock className="w-3 h-3 text-cyan-400" /> Zero-Knowledge Off-Chain Privacy
        </span>

        <button
          onClick={() => onNavigateTab('blockchain')}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 flex items-center gap-1.5 transition-colors"
        >
          <span>Inspect Blockchain Ledger</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
