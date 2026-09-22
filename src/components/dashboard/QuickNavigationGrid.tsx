import React from 'react';
import {
  Server,
  Bug,
  Activity,
  ShieldCheck,
  Calculator,
  Coins,
  BotMessageSquare,
  FileText,
  Link2,
  ChevronRight
} from 'lucide-react';

interface QuickNavigationGridProps {
  onNavigateTab: (tabId: string) => void;
}

export const QuickNavigationGrid: React.FC<QuickNavigationGridProps> = ({ onNavigateTab }) => {
  const navCards = [
    {
      id: 'telemetry',
      title: 'Assets & Inventory',
      desc: 'Edge exposure, criticality scoring, and endpoint sensor coverage.',
      icon: Server,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'prioritization',
      title: 'Vulnerability Backlog',
      desc: 'Ranked CVEs, CVSS scores, and 1-click remediation actions.',
      icon: Bug,
      color: 'text-red-400 bg-red-500/10 border-red-500/30'
    },
    {
      id: 'telemetry',
      title: 'Security Telemetry Feed',
      desc: 'Normalized firewall, EDR, and Active Directory threat streams.',
      icon: Activity,
      color: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    },
    {
      id: 'risk-engine',
      title: 'Security Controls & Gaps',
      desc: 'MFA, EDR, Immutable Backups, and CSPM posture tracking.',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'risk-engine',
      title: 'Mathematical Risk Engine',
      desc: 'Deterministic 6-factor weighting model and trajectory curves.',
      icon: Calculator,
      color: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/30'
    },
    {
      id: 'investment',
      title: 'Investment Optimizer',
      desc: 'Risk-to-Rupee knapsack solver, budget slider, and What-If simulator.',
      icon: Coins,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'copilot',
      title: 'AI Security Copilot',
      desc: 'Conversational cybersecurity advisor grounded in active metrics.',
      icon: BotMessageSquare,
      color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30'
    },
    {
      id: 'blockchain',
      title: 'Blockchain Audit Ledger',
      desc: 'SHA-256 Merkle chain verification and tamper-evident proofs.',
      icon: Link2,
      color: 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    },
    {
      id: 'investment',
      title: 'Executive Pitch & Deck',
      desc: 'Board-ready capital justification reports with print/export.',
      icon: FileText,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    }
  ];

  return (
    <div className="cyber-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Quick Platform Navigation
          </h2>
          <p className="text-xs text-slate-400">
            Direct access to all CyberShield.AI decision-making and operational modules
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {navCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <button
              key={idx}
              onClick={() => onNavigateTab(card.id)}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/60 transition-all text-left flex items-start justify-between gap-3 group"
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg border ${card.color} flex-shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 line-clamp-2 mt-0.5">
                    {card.desc}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 mt-1" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
