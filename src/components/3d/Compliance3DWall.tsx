import React from 'react';
import { useSecurity } from '../../context/SecurityContext';
import { FileCheck2, ShieldCheck, Scale, CheckCircle2, AlertTriangle, ExternalLink } from 'lucide-react';

export const Compliance3DWall: React.FC = () => {
  const { organization, controls } = useSecurity();

  const orgFrameworks = organization.primaryRegulatoryFrameworks || ['CERT-In Cyber Directives', 'DPDP Act 2023', 'ISO 27001'];

  const allFrameworks = [
    {
      id: 'rbi',
      name: 'RBI Cyber Security Framework 2024',
      badge: 'BANKING & FINTECH',
      score: 84,
      status: 'COMPLIANT',
      applicableIndustries: ['BANKING_FINTECH']
    },
    {
      id: 'pci',
      name: 'PCI-DSS v4.0.1 (Cardholder Data)',
      badge: 'PAYMENT SWITCH',
      score: 91,
      status: 'COMPLIANT',
      applicableIndustries: ['BANKING_FINTECH']
    },
    {
      id: 'cert-in',
      name: 'CERT-In 6-Hour Incident Mandates',
      badge: 'NATIONAL DIRECTIVE',
      score: 78,
      status: 'ACTIVE_TRIAGE',
      applicableIndustries: ['BANKING_FINTECH', 'HEALTHCARE', 'HIGHER_EDUCATION', 'CRITICAL_INFRASTRUCTURE', 'ENTERPRISE_SAAS']
    },
    {
      id: 'dpdp',
      name: 'Digital Personal Data Protection (DPDP 2023)',
      badge: 'PRIVACY LAW',
      score: 72,
      status: 'DEGRADED',
      applicableIndustries: ['BANKING_FINTECH', 'HEALTHCARE', 'HIGHER_EDUCATION', 'ENTERPRISE_SAAS']
    },
    {
      id: 'hipaa',
      name: 'HIPAA & DISHA Digital Health Standard',
      badge: 'HEALTHCARE EHR',
      score: 80,
      status: 'COMPLIANT',
      applicableIndustries: ['HEALTHCARE']
    },
    {
      id: 'nciipc',
      name: 'NCIIPC Critical Information Infrastructure',
      badge: 'CRITICAL SECTOR',
      score: 88,
      status: 'COMPLIANT',
      applicableIndustries: ['CRITICAL_INFRASTRUCTURE']
    },
    {
      id: 'soc2',
      name: 'SOC 2 Type II (Trust Services Criteria)',
      badge: 'CLOUD SAAS',
      score: 94,
      status: 'COMPLIANT',
      applicableIndustries: ['ENTERPRISE_SAAS']
    },
    {
      id: 'iso27001',
      name: 'ISO/IEC 27001:2022 ISMS Controls',
      badge: 'GLOBAL STANDARD',
      score: 86,
      status: 'COMPLIANT',
      applicableIndustries: ['ENTERPRISE_SAAS', 'BANKING_FINTECH', 'HIGHER_EDUCATION']
    }
  ];

  // Filter frameworks relevant to current organization
  const relevantFrameworks = allFrameworks.filter(fw =>
    fw.applicableIndustries.includes(organization.industry as any)
  );

  return (
    <div className="cyber-card-3d p-6 relative overflow-hidden flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <Scale className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">3D Regulatory Compliance Wall</h3>
            <p className="text-[11px] text-slate-400">Automated statutory standard mapping for {organization.name}</p>
          </div>
        </div>

        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-950/80 border border-indigo-800/60 text-indigo-300">
          {relevantFrameworks.length} ACTIVE FRAMEWORKS
        </span>
      </div>

      {/* 3D Floating Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {relevantFrameworks.map((fw, idx) => (
          <div
            key={fw.id}
            className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-950/40 relative group cursor-pointer"
          >
            <div className="flex items-center justify-between text-[10px] font-mono mb-2">
              <span className="px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 font-bold">
                {fw.badge}
              </span>
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {fw.score}%
              </span>
            </div>

            <h4 className="font-bold text-xs text-white group-hover:text-indigo-200 transition-colors leading-snug mb-3">
              {fw.name}
            </h4>

            {/* Progress bar */}
            <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500"
                style={{ width: `${fw.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
