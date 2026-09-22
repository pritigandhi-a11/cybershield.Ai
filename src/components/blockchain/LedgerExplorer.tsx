import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { AuditBlock } from '../../types/blockchain';
import { ShieldCheck, Link2, CheckCircle2, Copy, Check } from 'lucide-react';

interface LedgerExplorerProps {
  onSelectBlock: (block: AuditBlock) => void;
  selectedBlockNumber: number | null;
}

export const LedgerExplorer: React.FC<LedgerExplorerProps> = ({ onSelectBlock, selectedBlockNumber }) => {
  const { ledgerBlocks, commitAuditSnapshot, isCommittingBlock } = useSecurity();
  const [copiedHash, setCopiedHash] = useState<string | null>(null);

  const handleCopy = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(hash);
    setTimeout(() => setCopiedHash(null), 2500);
  };

  return (
    <div className="cyber-card p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            Tamper-Evident Audit Ledger & Merkle Chain
          </h2>
          <p className="text-xs text-slate-400">
            Cryptographically anchored assessment snapshots with SHA-256 digests (Client-Side Cryptographic Prototype)
          </p>
        </div>

        <button
          onClick={() => commitAuditSnapshot('CONTINUOUS_TELEMETRY_SNAP')}
          disabled={isCommittingBlock}
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <Link2 className="w-3.5 h-3.5" />
          <span>{isCommittingBlock ? 'Hashing Block...' : 'Commit New Block'}</span>
        </button>
      </div>

      {/* Block Sequence Cards */}
      <div className="space-y-3">
        {ledgerBlocks.map((block, idx) => {
          const isSelected = selectedBlockNumber === block.blockNumber;

          return (
            <div
              key={block.blockNumber}
              onClick={() => onSelectBlock(block)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-slate-900/90 border-cyan-500/60 shadow-lg shadow-cyan-950/30'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md font-mono font-bold text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    Block #{block.blockNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300">
                    {block.assessmentType}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> COMMITTED
                  </span>
                </div>

                <div className="text-[11px] font-mono text-slate-400">
                  {new Date(block.timestamp).toLocaleString()}
                </div>
              </div>

              {/* Hashes & Merkle Root */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs font-mono mt-3">
                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="flex justify-between items-center text-slate-400 text-[10px] mb-0.5">
                    <span>CURRENT SHA-256 HASH:</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCopy(block.currentHash);
                      }}
                      className="text-cyan-400 hover:underline flex items-center gap-0.5"
                    >
                      {copiedHash === block.currentHash ? <Check className="w-2.5 h-2.5" /> : <Copy className="w-2.5 h-2.5" />}
                      <span>{copiedHash === block.currentHash ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="text-cyan-300 truncate font-semibold">
                    {block.currentHash}
                  </div>
                </div>

                <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                  <div className="text-slate-400 text-[10px] mb-0.5">PREVIOUS BLOCK HASH:</div>
                  <div className="text-slate-400 truncate">
                    {block.previousHash}
                  </div>
                </div>
              </div>

              {/* Payload Summary Pills */}
              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-900 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-3">
                  <span>Risk Score: <strong className="text-red-400">{block.payload.calculatedRiskScore}/100</strong></span>
                  <span>•</span>
                  <span>Budget: <strong className="text-slate-200">₹{(block.payload.allocatedBudgetINR / 100000).toFixed(1)}L</strong></span>
                  <span>•</span>
                  <span>Targeted Reduction: <strong className="text-emerald-400">{block.payload.projectedRiskScore} pts</strong></span>
                </div>

                <span className="text-slate-400 font-sans">
                  Validator: <strong className="text-cyan-400">{block.validatorNode}</strong>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
