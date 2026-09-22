import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { AuditBlock, VerificationResult } from '../../types/blockchain';
import { Search, ShieldCheck, AlertOctagon, CheckCircle2, RefreshCw, Key } from 'lucide-react';

interface HashVerifierProps {
  selectedBlock: AuditBlock | null;
}

export const HashVerifier: React.FC<HashVerifierProps> = ({ selectedBlock }) => {
  const { ledgerBlocks, verifyBlock } = useSecurity();
  const [inputHash, setInputHash] = useState('');
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [tamperSimulation, setTamperSimulation] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputHash.trim()) return;

    setIsVerifying(true);
    // Find matching block
    const foundBlock = ledgerBlocks.find(b => b.currentHash.toLowerCase() === inputHash.trim().toLowerCase());

    if (foundBlock) {
      if (tamperSimulation) {
        // Tamper test simulation: simulate modified payload
        setVerificationResult({
          isValid: false,
          blockFound: foundBlock,
          calculatedHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
          storedHash: foundBlock.currentHash,
          merkleMatched: false,
          verifiedAt: new Date().toISOString(),
          details: '⚠️ INTEGRITY FAILURE DETECTED: The payload was altered after anchoring. Hash mismatch detected on Block #' + foundBlock.blockNumber
        });
      } else {
        const res = await verifyBlock(foundBlock);
        setVerificationResult(res);
      }
    } else {
      setVerificationResult({
        isValid: false,
        calculatedHash: 'N/A',
        storedHash: inputHash.trim(),
        merkleMatched: false,
        verifiedAt: new Date().toISOString(),
        details: 'Hash not found in the verified blockchain consensus ledger.'
      });
    }
    setIsVerifying(false);
  };

  const handleQuickVerifyBlock = async (block: AuditBlock) => {
    setInputHash(block.currentHash);
    setIsVerifying(true);
    const res = await verifyBlock(block);
    setVerificationResult(res);
    setIsVerifying(false);
  };

  return (
    <div className="cyber-card p-5 space-y-4">
      <div>
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Cryptographic Integrity & Tamper-Proof Inspector
        </h2>
        <p className="text-xs text-slate-400">
          Paste any assessment report hash or click a block to verify mathematical non-tampering against the SHA-256 Merkle root.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleVerify} className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={inputHash}
              onChange={(e) => setInputHash(e.target.value)}
              placeholder="Paste 64-character SHA-256 assessment hash (e.g. 0x8a92...)"
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={isVerifying || !inputHash.trim()}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white disabled:opacity-50 hover:brightness-110 flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20"
          >
            {isVerifying ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Search className="w-3.5 h-3.5" />}
            <span>Verify Integrity</span>
          </button>
        </div>

        {/* Tamper Test Simulation Toggle */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={tamperSimulation}
              onChange={(e) => setTamperSimulation(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-cyan-500 focus:ring-0"
            />
            <span className="text-slate-300">Simulate Tampered / Altered Record Scenario</span>
          </label>

          {ledgerBlocks.length > 0 && (
            <button
              type="button"
              onClick={() => handleQuickVerifyBlock(ledgerBlocks[ledgerBlocks.length - 1])}
              className="text-cyan-400 hover:underline font-mono"
            >
              Verify Latest Block #{ledgerBlocks[ledgerBlocks.length - 1].blockNumber} &rarr;
            </button>
          )}
        </div>
      </form>

      {/* Verification Results Panel */}
      {verificationResult && (
        <div
          className={`p-4 rounded-xl border transition-all ${
            verificationResult.isValid
              ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-300'
              : 'bg-red-950/20 border-red-500/40 text-red-300'
          }`}
        >
          <div className="flex items-start gap-3">
            {verificationResult.isValid ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertOctagon className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            )}

            <div className="space-y-1.5 text-xs font-mono">
              <div className="font-extrabold uppercase tracking-wide text-sm">
                {verificationResult.isValid ? 'PROVEN MATHEMATICALLY UNTAMPERED' : 'CRYPTOGRAPHIC VERIFICATION FAILED'}
              </div>
              <p className="font-sans leading-relaxed text-slate-300">
                {verificationResult.details}
              </p>

              <div className="mt-2 pt-2 border-t border-slate-800/80 space-y-1 text-[11px] text-slate-400">
                <div>Stored Digest: <span className="text-cyan-300 truncate">{verificationResult.storedHash}</span></div>
                <div>Recalculated Digest: <span className={verificationResult.isValid ? 'text-emerald-400 truncate' : 'text-red-400 truncate'}>{verificationResult.calculatedHash}</span></div>
                <div>Verified Timestamp: <span className="text-slate-200">{new Date(verificationResult.verifiedAt).toLocaleString()}</span></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
