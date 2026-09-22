import React from 'react';
import { FactorWeightEditor } from '../components/riskEngine/FactorWeightEditor';
import { DepartmentHeatmap } from '../components/riskEngine/DepartmentHeatmap';
import { HistoricalTrends } from '../components/riskEngine/HistoricalTrends';
import { RiskFactorRadar } from '../components/dashboard/RiskFactorRadar';

export const RiskEnginePage: React.FC = () => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Transparent Mathematical Cyber Risk Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deterministic risk modeling without hallucination. Inspect weighted parameters, department distributions, and multi-week trajectories.
          </p>
        </div>
      </div>

      <FactorWeightEditor />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <RiskFactorRadar />
        </div>
        <div className="lg:col-span-6">
          <HistoricalTrends />
        </div>
      </div>

      <DepartmentHeatmap />
    </div>
  );
};
