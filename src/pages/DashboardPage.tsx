import React from 'react';
import { ExecutiveRiskHero } from '../components/dashboard/ExecutiveRiskHero';
import { DataIngestionSummary } from '../components/dashboard/DataIngestionSummary';
import { SecurityPostureSummary } from '../components/dashboard/SecurityPostureSummary';
import { RiskTrendCard } from '../components/dashboard/RiskTrendCard';
import { RiskDriversSummary } from '../components/dashboard/RiskDriversSummary';
import { AIRecommendedActionsSummary } from '../components/dashboard/AIRecommendedActionsSummary';
import { InvestmentSummaryWidget } from '../components/dashboard/InvestmentSummaryWidget';
import { BlockchainVerificationSummary } from '../components/dashboard/BlockchainVerificationSummary';
import { QuickNavigationGrid } from '../components/dashboard/QuickNavigationGrid';
import { ComplianceOverview } from '../components/dashboard/ComplianceOverview';

interface DashboardPageProps {
  onNavigateTab: (tabId: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. Overall Cyber Risk Hero */}
      <ExecutiveRiskHero onNavigateTab={onNavigateTab} />

      {/* 2. Cybersecurity Data Ingestion & Normalization Layer */}
      <DataIngestionSummary onNavigateTab={onNavigateTab} />

      {/* 3. Security Posture Summary (Assets, CVEs, Events, Controls) */}
      <SecurityPostureSummary onNavigateTab={onNavigateTab} />

      {/* 3. Risk Trend & Main Risk Drivers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <RiskTrendCard onNavigateTab={onNavigateTab} />
        </div>
        <div className="lg:col-span-6">
          <RiskDriversSummary onNavigateTab={onNavigateTab} />
        </div>
      </div>

      {/* 4. AI Recommended Actions & Investment Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <AIRecommendedActionsSummary onNavigateTab={onNavigateTab} />
        </div>
        <div className="lg:col-span-6">
          <InvestmentSummaryWidget onNavigateTab={onNavigateTab} />
        </div>
      </div>

      {/* 5. Blockchain Verification Summary & Compliance Posture */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <BlockchainVerificationSummary onNavigateTab={onNavigateTab} />
        </div>
        <div className="lg:col-span-6">
          <ComplianceOverview />
        </div>
      </div>

      {/* 6. Quick Platform Navigation Grid */}
      <QuickNavigationGrid onNavigateTab={onNavigateTab} />
    </div>
  );
};
