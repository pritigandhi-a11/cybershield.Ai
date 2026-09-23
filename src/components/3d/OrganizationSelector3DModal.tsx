import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { IndustryType } from '../../types/organization';
import { INDUSTRY_PRESETS } from '../../services/organizationData';
import { Building2, X, CheckCircle2, ShieldAlert, ArrowRight, Sparkles, Coins } from 'lucide-react';

interface OrganizationSelector3DModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrganizationSelector3DModal: React.FC<OrganizationSelector3DModalProps> = ({ isOpen, onClose }) => {
  const { currentIndustry, setIndustry } = useSecurity();

  if (!isOpen) return null;

  const orgs: {
    key: IndustryType;
    name: string;
    industry: string;
    icon: string;
    budget: string;
    frameworks: string[];
    threats: string[];
  }[] = [
    {
      key: 'BANKING_FINTECH',
      name: 'Bharat NeoBank & Financial Services Ltd.',
      industry: 'Banking & FinTech',
      icon: '🏦',
      budget: '₹5.0 Lakhs',
      frameworks: ['RBI CSF 2024', 'PCI-DSS v4.0', 'DPDP Act 2023'],
      threats: ['FIN7 / Cobalt Group', 'Credential Stuffing Botnets']
    },
    {
      key: 'HEALTHCARE',
      name: 'Apex SuperSpecialty Hospital & Research Network',
      industry: 'Healthcare & Hospital Systems',
      icon: '🏥',
      budget: '₹4.0 Lakhs',
      frameworks: ['DISHA / Digital Health', 'HIPAA', 'NABH'],
      threats: ['LockBit 3.0 Ransomware', 'DICOM Imaging Scanners']
    },
    {
      key: 'HIGHER_EDUCATION',
      name: 'National Institute of Science & Technology (NIST University)',
      industry: 'Higher Education & Research',
      icon: '🎓',
      budget: '₹3.0 Lakhs',
      frameworks: ['UGC IT Security', 'CERT-In Mandates', 'DPDP 2023'],
      threats: ['Student Grading Exploits', 'Campus Wi-Fi Botnets']
    },
    {
      key: 'CRITICAL_INFRASTRUCTURE',
      name: 'GridPower Energy & Distribution Grid Corp',
      industry: 'Critical Infrastructure & SCADA',
      icon: '⚡',
      budget: '₹7.5 Lakhs',
      frameworks: ['NCIIPC Guidelines', 'CEA Power Standard', 'ISO 27019'],
      threats: ['Volt Typhoon / Sandworm', 'ICS Protocol Fuzzers']
    },
    {
      key: 'ENTERPRISE_SAAS',
      name: 'CloudScale Technologies (Multi-Tenant SaaS)',
      industry: 'Enterprise SaaS & Cloud',
      icon: '☁️',
      budget: '₹6.0 Lakhs',
      frameworks: ['SOC 2 Type II', 'ISO/IEC 27001:2022', 'GDPR'],
      threats: ['Cloud Extortionists', 'API Token Scraping']
    }
  ];

  const handleSelect = (key: IndustryType) => {
    setIndustry(key);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-4xl max-h-[90vh] rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 overflow-y-auto custom-scrollbar flex flex-col justify-between">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Select Organization Profile</h3>
              <p className="text-xs text-slate-400">
                Institutional risk telemetry, regulatory framework mapping, and knapsack optimization models
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Organization Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {orgs.map((org) => {
            const isSelected = currentIndustry === org.key;

            return (
              <div
                key={org.key}
                onClick={() => handleSelect(org.key)}
                className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                  isSelected
                    ? 'bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-950 border-cyan-500/60 shadow-xl shadow-cyan-950/40 scale-[1.02]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-cyan-500/40 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-cyan-950/20'
                }`}
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{org.icon}</span>
                    {isSelected ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> ACTIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800">
                        {org.budget}
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-sm text-white group-hover:text-cyan-200 transition-colors leading-snug mb-1">
                    {org.name}
                  </h4>
                  <div className="text-[11px] text-cyan-400/90 font-medium mb-3">
                    {org.industry}
                  </div>

                  {/* Frameworks */}
                  <div className="space-y-1 mb-3">
                    <span className="text-[9.5px] text-slate-500 font-mono block uppercase">Compliance Mandates:</span>
                    <div className="flex flex-wrap gap-1">
                      {org.frameworks.map((fw, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded text-[9.5px] bg-slate-900 text-slate-300 border border-slate-800 font-mono">
                          {fw}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-400 text-[10.5px]">Base: <strong className="text-white">{org.budget}</strong></span>
                  <span className="text-cyan-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>{isSelected ? 'Current' : 'Select'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
