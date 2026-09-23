import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import {
  HelpCircle,
  X,
  Zap,
  CheckCircle2,
  Building2,
  Cpu,
  Coins,
  ShieldCheck,
  Radio,
  FileCheck2
} from 'lucide-react';

interface HelpGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpGuideModal: React.FC<HelpGuideModalProps> = ({ isOpen, onClose }) => {
  const { organization } = useSecurity();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-2xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 overflow-y-auto custom-scrollbar flex flex-col justify-between">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">SIH 2026 5-Minute Judge Demonstration Script</h3>
                <p className="text-xs text-slate-400">CyberShield.AI • AICTE Cyber Security Cell</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Flow Guide */}
          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-cyan-300 text-sm mb-1 flex items-center gap-1.5">
                <span>1. Multi-Organization Profile Selection</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Demonstrate the <strong>Organization Switcher</strong> in the top-nav or login screen to show instant adaptation across 5 critical Indian sectors: <em>Banking (RBI CSF)</em>, <em>Healthcare (HIPAA/DISHA)</em>, <em>Higher Education (NIST)</em>, <em>Energy SCADA (NCIIPC)</em>, and <em>Cloud SaaS (SOC 2)</em>.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-purple-300 text-sm mb-1 flex items-center gap-1.5">
                <span>2. 6-Factor Deterministic Mathematical Engine (0–100)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Explain that CyberShield uses a zero-hallucination weighted formula (Vuln 25%, Threat 20%, Asset 20%, Controls 15%, Incident 10%, Env 10%). Show the <strong>Risk Analysis Engine</strong> where factor weights can be interactively modified.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-red-300 text-sm mb-1 flex items-center gap-1.5">
                <span>3. Live Attack Simulator & Telemetry Ingestion</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Click <strong>"Simulate Attack"</strong> in the top navbar and trigger <em>LockBit 3.0 Ransomware</em> or <em>Log4Shell RCE</em>. Show how the risk score spikes immediately, alerting the SOC Incident Center.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-emerald-300 text-sm mb-1 flex items-center gap-1.5">
                <span>4. "Risk-to-Rupee" ROI Optimizer (Knapsack Solver)</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Open <strong>Risk-to-Rupee Optimizer</strong>. Drag the budget slider (₹50k to ₹10 Lakhs) to show the knapsack algorithm automatically choosing the highest ROI interventions, reducing risk by 30+ points.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="font-bold text-indigo-300 text-sm mb-1 flex items-center gap-1.5">
                <span>5. Cryptographic SHA-256 Merkle Ledger & Audit Certificate</span>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Show the <strong>Audit Ledger</strong> and click <strong>"View Audit Certificate"</strong> to display the verifiable, tamper-evident cyber risk certificate with ECDSA cryptographic signatures.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Ready to Present
          </button>
        </div>
      </div>
    </div>
  );
};
