import React, { useState } from 'react';
import { SecurityProvider, useSecurity } from './context/SecurityContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { AIChatDrawer } from './components/copilot/AIChatDrawer';
import { LoginPage } from './components/auth/LoginPage';
import { HelpGuideModal } from './components/common/HelpGuideModal';
import { SettingsModal } from './components/common/SettingsModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { TelemetryPage } from './pages/TelemetryPage';
import { RiskEnginePage } from './pages/RiskEnginePage';
import { PrioritizationPage } from './pages/PrioritizationPage';
import { InvestmentPage } from './pages/InvestmentPage';
import { BlockchainAuditPage } from './pages/BlockchainAuditPage';
import { CopilotPage } from './pages/CopilotPage';
import { AssetsPage } from './pages/AssetsPage';
import { VulnerabilitiesPage } from './pages/VulnerabilitiesPage';
import { IncidentsPage } from './pages/IncidentsPage';
import { ControlsPage } from './pages/ControlsPage';
import { CompliancePage } from './pages/CompliancePage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { ReportsPage } from './pages/ReportsPage';
import { X } from 'lucide-react';

export const AppContent: React.FC = () => {
  const { isAuthenticated } = useSecurity();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isCopilotDrawerOpen, setIsCopilotDrawerOpen] = useState<boolean>(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // If user is not authenticated, display the enterprise Login Page
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={() => setActiveTab('dashboard')} />;
  }

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'dashboard':
      case 'overview':
        return <DashboardPage onNavigateTab={handleTabChange} />;
      case 'risk-dashboard':
        return <RiskEnginePage />;
      case 'assets':
        return <AssetsPage />;
      case 'vulnerabilities':
        return <VulnerabilitiesPage />;
      case 'telemetry':
        return <TelemetryPage />;
      case 'incidents':
        return <IncidentsPage />;
      case 'controls':
        return <ControlsPage />;
      case 'risk-engine':
        return <RiskEnginePage />;
      case 'prioritization':
        return <PrioritizationPage />;
      case 'investment':
        return <InvestmentPage />;
      case 'recommendations':
        return <RecommendationsPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'blockchain':
        return <BlockchainAuditPage />;
      case 'reports':
        return <ReportsPage />;
      case 'copilot':
        return <CopilotPage />;
      default:
        return <DashboardPage onNavigateTab={handleTabChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Enterprise Command Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        openCopilotDrawer={() => setIsCopilotDrawerOpen(true)}
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />

      {/* Main Workspace Layout with Sidebar & Content */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Desktop Collapsible Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          openCopilotDrawer={() => setIsCopilotDrawerOpen(true)}
          openSettingsModal={() => setShowSettingsModal(true)}
          openHelpModal={() => setShowHelpModal(true)}
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
        />

        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="relative w-80 max-w-[85vw] bg-[#030712] border-r border-slate-800 h-full flex flex-col z-10 shadow-2xl">
              <div className="p-4 border-b border-slate-800 flex items-center justify-between">
                <span className="font-bold text-white text-sm">Navigation Menu</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar
                  activeTab={activeTab}
                  setActiveTab={handleTabChange}
                  openCopilotDrawer={() => {
                    setIsMobileMenuOpen(false);
                    setIsCopilotDrawerOpen(true);
                  }}
                  openSettingsModal={() => {
                    setIsMobileMenuOpen(false);
                    setShowSettingsModal(true);
                  }}
                  openHelpModal={() => {
                    setIsMobileMenuOpen(false);
                    setShowHelpModal(true);
                  }}
                  isCollapsed={false}
                />
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {renderActivePage()}
        </main>
      </div>

      {/* Slide-out Grounded AI Security Copilot Drawer */}
      <AIChatDrawer
        isOpen={isCopilotDrawerOpen}
        onClose={() => setIsCopilotDrawerOpen(false)}
      />

      {/* Common Modals */}
      <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} />
      <HelpGuideModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />
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
