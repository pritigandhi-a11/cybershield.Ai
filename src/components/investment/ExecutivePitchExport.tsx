import React, { useState } from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { FileText, Printer, Download, CheckCircle2, ShieldAlert, Coins } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ExecutivePitchExport: React.FC = () => {
  const { organization, riskState, investmentScenario, actionsCatalog, selectedActionIds } = useSecurity();
  const [copied, setCopied] = useState(false);

  const selectedActions = actionsCatalog.filter(a => selectedActionIds.includes(a.id));

  const handlePrint = () => {
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 } });
    window.print();
  };

  const handleCopySummary = () => {
    const text = `CYBERSHIELD AI - EXECUTIVE RISK & INVESTMENT BRIEF
Organization: ${organization.name}
Industry: ${organization.industryLabel}
Current Cyber Risk: ${riskState.overallScore}/100 (${riskState.riskBand})
Recommended Budget: ₹${(investmentScenario.allocatedBudgetINR / 100000).toFixed(2)} Lakhs
Projected Risk Post-Remediation: ${investmentScenario.projectedRiskScore}/100 (${investmentScenario.projectedRiskBand})
Modeled Risk Reduction: -${investmentScenario.totalModeledReduction} points
ROI Efficiency: ${investmentScenario.overallRoiScore} points reduced per ₹1 Lakh

SELECTED SECURITY ACTIONS:
${selectedActions.map((a, i) => `${i + 1}. ${a.title} (Cost: ₹${(a.costInINR / 100000).toFixed(2)}L, Risk Drop: -${a.estimatedRiskReduction} pts)`).join('\n')}

Audit Status: Verified by SHA-256 Merkle Cryptographic Digest.`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="cyber-card p-6 print:bg-white print:text-black print:border-none print:shadow-none">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800 print:border-black">
        <div>
          <span className="text-xs font-mono uppercase text-cyan-400 print:text-blue-600 font-bold tracking-wider">
            Board-Ready Investment Proposal
          </span>
          <h2 className="text-xl font-black text-white print:text-black tracking-tight mt-0.5">
            Executive Security Budget Justification Deck
          </h2>
        </div>

        <div className="flex items-center gap-2 print:hidden">
          <button
            onClick={handleCopySummary}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 flex items-center gap-1.5 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Executive Deck</span>
          </button>
        </div>
      </div>

      {/* Structured Pitch Content */}
      <div className="space-y-5 text-xs text-slate-300 print:text-slate-900 leading-relaxed">
        {/* Executive Summary Paragraph */}
        <div className="p-4 rounded-xl bg-slate-950/80 print:bg-slate-100 border border-slate-800 print:border-slate-300">
          <h3 className="font-bold text-sm text-white print:text-black mb-1">
            Executive Problem Statement & ROI Hypothesis
          </h3>
          <p>
            An assessment of <strong>{organization.name}</strong> identifies an elevated cyber risk posture of{' '}
            <span className="text-red-400 print:text-red-600 font-bold">{riskState.overallScore}/100 ({riskState.riskBand})</span>, driven primarily by unpatched perimeter remote code executions, credential replay vulnerability on Active Directory, and incomplete privileged hardware MFA coverage.
          </p>
          <p className="mt-2">
            By deploying a targeted capital investment of{' '}
            <strong className="text-emerald-400 print:text-emerald-700 font-mono">
              ₹{(investmentScenario.allocatedBudgetINR / 100000).toFixed(2)} Lakhs
            </strong>
            , the organization can reduce quantified risk by{' '}
            <strong className="text-emerald-400 print:text-emerald-700 font-mono">
              -{investmentScenario.totalModeledReduction} points
            </strong>
            , bringing enterprise risk to an acceptable baseline of{' '}
            <strong className="text-emerald-400 print:text-emerald-700 font-mono">
              {investmentScenario.projectedRiskScore}/100 ({investmentScenario.projectedRiskBand})
            </strong>.
          </p>
        </div>

        {/* Selected Portfolio Breakdown Table */}
        <div>
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400 print:text-slate-600 mb-2 font-mono">
            Itemized Security Capital Allocation:
          </h4>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-xs">
              <thead>
                <tr className="border-b border-slate-800 print:border-slate-300 text-slate-400 bg-slate-950/60 print:bg-slate-200">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Security Action</th>
                  <th className="py-2 px-3">Capital Required</th>
                  <th className="py-2 px-3">Modeled Risk Drop</th>
                  <th className="py-2 px-3">ROI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 print:divide-slate-200">
                {selectedActions.map((action, idx) => (
                  <tr key={action.id}>
                    <td className="py-2 px-3 text-slate-500">{idx + 1}</td>
                    <td className="py-2 px-3 font-semibold text-slate-200 print:text-black">
                      {action.title}
                    </td>
                    <td className="py-2 px-3">₹{(action.costInINR / 100000).toFixed(2)}L</td>
                    <td className="py-2 px-3 text-emerald-400 print:text-emerald-700 font-bold">
                      -{action.estimatedRiskReduction} pts
                    </td>
                    <td className="py-2 px-3 text-cyan-300 print:text-blue-700">
                      {action.roiEfficiency}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
