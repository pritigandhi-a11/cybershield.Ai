import React from 'react';
import { RemediationMatrix } from '../components/prioritization/RemediationMatrix';
import { VulnerabilityQueue } from '../components/prioritization/VulnerabilityQueue';
import { IncidentActionCenter } from '../components/prioritization/IncidentActionCenter';

export const PrioritizationPage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Cyber Risk Prioritization & Remediation Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Prioritize vulnerability patches by realized risk impact and coordinate active containment workflows.
          </p>
        </div>
      </div>

      <IncidentActionCenter />
      <RemediationMatrix />
      <VulnerabilityQueue />
    </div>
  );
};
