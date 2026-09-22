import React, { useState } from 'react';
import { SecurityProvider } from './context/SecurityContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AIChatDrawer } from './components/copilot/AIChatDrawer';
import { DashboardPage } from './pages/DashboardPage';
import { TelemetryPage } from './pages/TelemetryPage';
import { RiskEnginePage } from './pages/RiskEnginePage';
import { PrioritizationPage } from './pages/PrioritizationPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { BlockchainAuditPage } from './pages/BlockchainAuditPage';
import { CopilotPage } from './pages/CopilotPage';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isCopilotDrawerOpen, setIsCopilotDrawerOpen] = useState<boolean>(false);

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardPage onNavigateTab={setActiveTab} />;
      case 'telemetry':
        return <TelemetryPage />;
      case 'risk-engine':
        return <RiskEnginePage />;
      case 'prioritization':
        return <PrioritizationPage />;
      case 'investment':
        return <InvestmentPage />;
      case 'blockchain':
        return <BlockchainAuditPage />;
      case 'copilot':
        return <CopilotPage />;
      default:
        return <DashboardPage onNavigateTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Command Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCopilotDrawer={() => setIsCopilotDrawerOpen(true)}
      />

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Dynamic Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActivePage()}
        </main>
      </div>

      {/* Slide-out AI Security Copilot Drawer */}
      <AIChatDrawer
        isOpen={isCopilotDrawerOpen}
        onClose={() => setIsCopilotDrawerOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SecurityProvider>
      <AppContent />
    </SecurityProvider>
  );
};

export default App;
