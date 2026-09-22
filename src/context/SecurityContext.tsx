import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import { IndustryType, OrganizationProfile } from '../types/organization';
import { SecurityAsset, Vulnerability, IncidentAlert, SecurityControlStatus, TelemetryEvent } from '../types/security';
import { RiskFactorWeights, QuantifiedRiskState } from '../types/risk';
import { SecurityAction, InvestmentScenario, BudgetCurvePoint } from '../types/investment';
import { AuditBlock, VerificationResult, AuditRecordPayload } from '../types/blockchain';
import { CopilotMessage, queryGroundedCopilot } from '../services/aiCopilotService';
import {
  INDUSTRY_PRESETS,
  INITIAL_ASSETS,
  INITIAL_VULNERABILITIES,
  INITIAL_CONTROLS,
  INITIAL_INCIDENTS,
  SECURITY_ACTIONS_CATALOG
} from '../services/organizationData';
import { calculateQuantifiedCyberRisk, DEFAULT_WEIGHTS, assessOrganizationCyberRisk } from '../services/riskEngine';
import {
  optimizeSecurityInvestment,
  calculateCustomScenario,
  generateBudgetOptimizationCurve
} from '../services/investmentOptimizer';
import { getInitialTelemetryEvents, ATTACK_SCENARIOS, AttackScenario } from '../services/telemetryService';
import { getInitialLedger, createAuditBlock, verifyAuditBlockIntegrity } from '../services/blockchainService';
import { cybersecurityRepository } from '../services/dataRepository';
import { securityIngestionService } from '../services/securityIngestionService';
import {
  RawSecurityEvent,
  RawVulnerabilityRecord,
  RawIncidentRecord,
  RawAssetRecord,
  RawControlRecord,
  IngestionResult,
  IngestionStats
} from '../types/ingestion';

interface SecurityContextType {
  // Organization
  currentIndustry: IndustryType;
  organization: OrganizationProfile;
  setIndustry: (industry: IndustryType) => void;

  // Telemetry & Assets
  assets: SecurityAsset[];
  vulnerabilities: Vulnerability[];
  incidents: IncidentAlert[];
  controls: SecurityControlStatus[];
  telemetryEvents: TelemetryEvent[];
  addCustomTelemetryLog: (rawLog: string) => void;
  simulateAttack: (scenario: AttackScenario) => void;
  remediateVulnerability: (vulnId: string) => void;
  resolveIncident: (incidentId: string) => void;

  // Ingestion Service
  ingestRawEvent: (raw: RawSecurityEvent | string) => IngestionResult<TelemetryEvent>;
  ingestRawVulnerability: (raw: RawVulnerabilityRecord | string) => IngestionResult<Vulnerability>;
  ingestRawIncident: (raw: RawIncidentRecord) => IngestionResult<IncidentAlert>;
  ingestRawAsset: (raw: RawAssetRecord) => IngestionResult<SecurityAsset>;
  ingestRawControl: (raw: RawControlRecord) => IngestionResult<SecurityControlStatus>;
  injectDemoScenario: (type: 'DEMO_EVENT' | 'DEMO_VULN' | 'DEMO_INCIDENT' | 'DEMO_CONTROL_GAP') => void;
  ingestionStats: IngestionStats;
  ingestionLogs: IngestionResult<any>[];

  // Risk Engine
  weights: RiskFactorWeights;
  setWeights: React.Dispatch<React.SetStateAction<RiskFactorWeights>>;
  resetWeights: () => void;
  riskState: QuantifiedRiskState;

  // Investment Optimizer
  budgetINR: number;
  setBudgetINR: (budget: number) => void;
  selectedActionIds: string[];
  toggleActionSelection: (actionId: string) => void;
  autoOptimizeBudget: () => void;
  investmentScenario: InvestmentScenario;
  actionsCatalog: SecurityAction[];
  budgetOptimizationCurve: BudgetCurvePoint[];

  // Blockchain Audit Ledger
  ledgerBlocks: AuditBlock[];
  isCommittingBlock: boolean;
  commitAuditSnapshot: (assessmentType?: AuditBlock['assessmentType']) => Promise<AuditBlock>;
  verifyBlock: (block: AuditBlock) => Promise<VerificationResult>;

  // AI Copilot
  copilotMessages: CopilotMessage[];
  isCopilotThinking: boolean;
  sendCopilotMessage: (text: string) => Promise<void>;
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

export const SecurityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentIndustry, setCurrentIndustry] = useState<IndustryType>('BANKING_FINTECH');
  const organization = useMemo(() => INDUSTRY_PRESETS[currentIndustry], [currentIndustry]);

  const [assets, setAssets] = useState<SecurityAsset[]>(INITIAL_ASSETS.BANKING_FINTECH);
  const [vulnerabilities, setVulnerabilities] = useState<Vulnerability[]>(INITIAL_VULNERABILITIES);
  const [incidents, setIncidents] = useState<IncidentAlert[]>(INITIAL_INCIDENTS);
  const [controls, setControls] = useState<SecurityControlStatus[]>(INITIAL_CONTROLS);
  const [telemetryEvents, setTelemetryEvents] = useState<TelemetryEvent[]>(getInitialTelemetryEvents());
  const [weights, setWeights] = useState<RiskFactorWeights>(DEFAULT_WEIGHTS);

  // Investment state
  const [budgetINR, setBudgetINR] = useState<number>(500000); // default ₹5,00,000
  const [isManualSelection, setIsManualSelection] = useState<boolean>(false);
  const [manualSelectedIds, setManualSelectedIds] = useState<string[]>([]);
  const [actionsCatalog] = useState<SecurityAction[]>(SECURITY_ACTIONS_CATALOG);

  // Blockchain Ledger
  const [ledgerBlocks, setLedgerBlocks] = useState<AuditBlock[]>([]);
  const [isCommittingBlock, setIsCommittingBlock] = useState<boolean>(false);

  // AI Copilot
  const [geminiApiKey, setGeminiApiKeyState] = useState<string>(() => {
    return localStorage.getItem('CYBER_GEMINI_API_KEY') || '';
  });
  const [isCopilotThinking, setIsCopilotThinking] = useState<boolean>(false);
  const [copilotMessages, setCopilotMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-init-1',
      sender: 'COPILOT',
      text: `Hello! I am **CyberShield AI Copilot**, your grounded cybersecurity risk quantification & investment advisor. I am currently monitoring **${organization.name}**.\n\nAsk me about current risk drivers, investment trade-offs, or regulatory compliance status.`,
      timestamp: new Date().toLocaleTimeString(),
      suggestedActions: [
        'Why is our cyber risk score high?',
        'How should we allocate our ₹5 Lakhs budget?',
        'What is our CERT-In compliance status?',
        'Verify blockchain audit integrity'
      ]
    }
  ]);

  const setGeminiApiKey = (key: string) => {
    setGeminiApiKeyState(key);
    localStorage.setItem('CYBER_GEMINI_API_KEY', key);
  };

  // Switch Industry Preset
  const setIndustry = useCallback((ind: IndustryType) => {
    setCurrentIndustry(ind);
    const org = INDUSTRY_PRESETS[ind];
    const repoAssets = cybersecurityRepository.getAssets(org.id);
    const repoVulns = cybersecurityRepository.getVulnerabilities(org.id);
    const repoControls = cybersecurityRepository.getSecurityControls(org.id);
    const repoIncidents = cybersecurityRepository.getIncidents(org.id);
    const repoEvents = cybersecurityRepository.getTelemetryEvents(org.id);

    setAssets(repoAssets.length > 0 ? repoAssets : (INITIAL_ASSETS[ind] || INITIAL_ASSETS.BANKING_FINTECH));
    setVulnerabilities(repoVulns.length > 0 ? repoVulns : INITIAL_VULNERABILITIES);
    setControls(repoControls.length > 0 ? repoControls : INITIAL_CONTROLS);
    setIncidents(repoIncidents.length > 0 ? repoIncidents : INITIAL_INCIDENTS);
    setTelemetryEvents(repoEvents.length > 0 ? repoEvents : getInitialTelemetryEvents());
    setBudgetINR(org.baseBudgetINR);
    setIsManualSelection(false);
  }, []);

  // Initialize blockchain ledger on mount
  useEffect(() => {
    getInitialLedger(organization.name).then(blocks => {
      setLedgerBlocks(blocks);
    });
  }, [organization.name]);

  // Compute live quantified risk state
  const riskState = useMemo(() => {
    const calculated = calculateQuantifiedCyberRisk(
      assets,
      vulnerabilities,
      incidents,
      controls,
      telemetryEvents,
      weights
    );

    // Save assessment to data repository
    const assessment = assessOrganizationCyberRisk(
      organization.id,
      assets,
      vulnerabilities,
      incidents,
      controls,
      telemetryEvents,
      weights
    );
    cybersecurityRepository.saveRiskAssessment(assessment);

    return calculated;
  }, [assets, vulnerabilities, incidents, controls, telemetryEvents, weights, organization.id]);

  // Investment calculations
  const autoOptimizedScenario = useMemo(() => {
    return optimizeSecurityInvestment(actionsCatalog, budgetINR, riskState.overallScore);
  }, [actionsCatalog, budgetINR, riskState.overallScore]);

  const investmentScenario = useMemo(() => {
    if (isManualSelection) {
      return calculateCustomScenario(actionsCatalog, manualSelectedIds, budgetINR, riskState.overallScore);
    }
    return autoOptimizedScenario;
  }, [isManualSelection, manualSelectedIds, actionsCatalog, budgetINR, riskState.overallScore, autoOptimizedScenario]);

  const selectedActionIds = useMemo(() => {
    return isManualSelection ? manualSelectedIds : autoOptimizedScenario.selectedActionIds;
  }, [isManualSelection, manualSelectedIds, autoOptimizedScenario]);

  const toggleActionSelection = useCallback((actionId: string) => {
    setIsManualSelection(true);
    setManualSelectedIds(prev => {
      const current = isManualSelection ? prev : autoOptimizedScenario.selectedActionIds;
      if (current.includes(actionId)) {
        return current.filter(id => id !== actionId);
      } else {
        return [...current, actionId];
      }
    });
  }, [isManualSelection, autoOptimizedScenario]);

  const autoOptimizeBudget = useCallback(() => {
    setIsManualSelection(false);
  }, []);

  const budgetOptimizationCurve = useMemo(() => {
    return generateBudgetOptimizationCurve(actionsCatalog, riskState.overallScore);
  }, [actionsCatalog, riskState.overallScore]);

  // Telemetry Actions
  const addCustomTelemetryLog = useCallback((rawLog: string) => {
    const isC2 = rawLog.includes('C2') || rawLog.includes('beacon') || rawLog.includes('drop');
    const newEvent: TelemetryEvent = {
      id: `evt-custom-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      source: isC2 ? 'FIREWALL' : 'SIEM_SPLUNK',
      rawMessage: rawLog,
      normalizedCategory: isC2 ? 'C2_BEACONING' : 'POLICY_VIOLATION',
      severity: isC2 ? 'CRITICAL' : 'HIGH',
      sourceIp: '198.51.100.44',
      destinationIp: '10.14.0.12',
      targetAsset: 'Core UPI Switch Gateway',
      threatActorContext: 'Ingested Telemetry Stream',
      aiCorrelationNotes: 'AI Correlated: Ingested log normalized and matched with MITRE ATT&CK technique T1071.',
      confidenceScore: 0.95,
      isAnomaly: true
    };
    setTelemetryEvents(prev => [newEvent, ...prev]);

    cybersecurityRepository.addSecurityEvent(organization.id, {
      id: newEvent.id,
      assetId: 'ast-bnk-01',
      eventType: newEvent.normalizedCategory,
      severity: newEvent.severity,
      timestamp: newEvent.timestamp,
      source: newEvent.source,
      description: newEvent.aiCorrelationNotes,
      normalized: true
    });
  }, [organization.id]);

  const simulateAttack = useCallback((scenario: AttackScenario) => {
    const newEvents = scenario.triggerSimulatedEvents();
    setTelemetryEvents(prev => [...newEvents, ...prev]);

    // Create an active incident if scenario is high impact
    const newIncident: IncidentAlert = {
      id: `inc-sim-${Date.now()}`,
      title: `[SIMULATED ATTACK] ${scenario.name}`,
      category: scenario.category,
      severity: 'CRITICAL',
      affectedAssets: [assets[0]?.id || 'ast-bnk-01'],
      status: 'ACTIVE_TRIAGE',
      detectedAt: 'Just now',
      impactSummary: `${scenario.description} Injected ${scenario.injectedEventsCount} critical correlated events.`,
      assignedEngineer: 'Automated SOC Incident Response'
    };
    setIncidents(prev => [newIncident, ...prev]);
  }, [assets]);

  const [ingestionStats, setIngestionStats] = useState<IngestionStats>(() => securityIngestionService.getIngestionStats());
  const [ingestionLogs, setIngestionLogs] = useState<IngestionResult<any>[]>(() => securityIngestionService.getRecentIngestionLogs());

  const ingestRawEvent = useCallback((raw: RawSecurityEvent | string) => {
    const result = securityIngestionService.ingestSecurityEvent(raw, organization.id);
    if (result.success && result.entity) {
      setTelemetryEvents(prev => [result.entity!, ...prev]);
    }
    setIngestionStats(securityIngestionService.getIngestionStats());
    setIngestionLogs(securityIngestionService.getRecentIngestionLogs());
    return result;
  }, [organization.id]);

  const ingestRawVulnerability = useCallback((raw: RawVulnerabilityRecord | string) => {
    const result = securityIngestionService.ingestVulnerability(raw, organization.id);
    if (result.success && result.entity) {
      setVulnerabilities(prev => [result.entity!, ...prev]);
    }
    setIngestionStats(securityIngestionService.getIngestionStats());
    setIngestionLogs(securityIngestionService.getRecentIngestionLogs());
    return result;
  }, [organization.id]);

  const ingestRawIncident = useCallback((raw: RawIncidentRecord) => {
    const result = securityIngestionService.ingestIncident(raw, organization.id);
    if (result.success && result.entity) {
      setIncidents(prev => [result.entity!, ...prev]);
    }
    setIngestionStats(securityIngestionService.getIngestionStats());
    setIngestionLogs(securityIngestionService.getRecentIngestionLogs());
    return result;
  }, [organization.id]);

  const ingestRawAsset = useCallback((raw: RawAssetRecord) => {
    const result = securityIngestionService.ingestAsset(raw, organization.id);
    if (result.success && result.entity) {
      setAssets(prev => [result.entity!, ...prev]);
    }
    setIngestionStats(securityIngestionService.getIngestionStats());
    setIngestionLogs(securityIngestionService.getRecentIngestionLogs());
    return result;
  }, [organization.id]);

  const ingestRawControl = useCallback((raw: RawControlRecord) => {
    const result = securityIngestionService.ingestControlStatus(raw, organization.id);
    if (result.success && result.entity) {
      setControls(prev => {
        const index = prev.findIndex(c => c.id === result.entity!.id || c.name === result.entity!.name);
        if (index !== -1) {
          const updated = [...prev];
          updated[index] = result.entity!;
          return updated;
        }
        return [result.entity!, ...prev];
      });
    }
    setIngestionStats(securityIngestionService.getIngestionStats());
    setIngestionLogs(securityIngestionService.getRecentIngestionLogs());
    return result;
  }, [organization.id]);

  const injectDemoScenario = useCallback((type: 'DEMO_EVENT' | 'DEMO_VULN' | 'DEMO_INCIDENT' | 'DEMO_CONTROL_GAP') => {
    switch (type) {
      case 'DEMO_EVENT': {
        const demoEvt = securityIngestionService.generateDemoSecurityEvent('AUTH_BURST');
        ingestRawEvent(demoEvt);
        break;
      }
      case 'DEMO_VULN': {
        const demoVuln = securityIngestionService.generateDemoVulnerability();
        ingestRawVulnerability(demoVuln);
        break;
      }
      case 'DEMO_INCIDENT': {
        const demoInc = securityIngestionService.generateDemoIncident();
        ingestRawIncident(demoInc);
        break;
      }
      case 'DEMO_CONTROL_GAP': {
        const demoCtrl = securityIngestionService.generateDemoControlDegradation();
        ingestRawControl(demoCtrl);
        break;
      }
    }
  }, [ingestRawEvent, ingestRawVulnerability, ingestRawIncident, ingestRawControl]);

  const remediateVulnerability = useCallback((vulnId: string) => {
    cybersecurityRepository.remediateVulnerability(vulnId);
    setVulnerabilities(prev =>
      prev.map(v => (v.id === vulnId ? { ...v, status: 'REMEDIATED' } : v))
    );
  }, []);

  const resolveIncident = useCallback((incidentId: string) => {
    cybersecurityRepository.resolveIncident(incidentId);
    setIncidents(prev =>
      prev.map(i => (i.id === incidentId ? { ...i, status: 'CLOSED' } : i))
    );
  }, []);

  const resetWeights = useCallback(() => {
    setWeights(DEFAULT_WEIGHTS);
  }, []);

  // Blockchain commit snapshot
  const commitAuditSnapshot = useCallback(async (
    assessmentType: AuditBlock['assessmentType'] = 'CONTINUOUS_TELEMETRY_SNAP'
  ): Promise<AuditBlock> => {
    setIsCommittingBlock(true);
    const lastBlock = ledgerBlocks[ledgerBlocks.length - 1];
    const prevHash = lastBlock ? lastBlock.currentHash : '0000000000000000000000000000000000000000000000000000000000000000';
    const nextBlockNum = ledgerBlocks.length;

    const payload: AuditRecordPayload = {
      organizationId: organization.id,
      organizationName: organization.name,
      calculatedRiskScore: riskState.overallScore,
      riskBand: riskState.riskBand,
      criticalVulnerabilitiesCount: vulnerabilities.filter(v => v.severity === 'CRITICAL' && v.status !== 'REMEDIATED').length,
      totalAssetsProtected: assets.length,
      allocatedBudgetINR: investmentScenario.allocatedBudgetINR,
      projectedRiskScore: investmentScenario.projectedRiskScore,
      securityInterventionsCount: investmentScenario.selectedActionIds.length,
      factorsDigest: `V:${riskState.factors.vulnerabilityExposure.score}|T:${riskState.factors.threatActivity.score}|A:${riskState.factors.assetCriticality.score}|C:${riskState.factors.securityControlsGap.score}`
    };

    const newBlock = await createAuditBlock(nextBlockNum, prevHash, assessmentType, payload);
    setLedgerBlocks(prev => [...prev, newBlock]);
    setIsCommittingBlock(false);
    return newBlock;
  }, [ledgerBlocks, organization, riskState, vulnerabilities, assets, investmentScenario]);

  const verifyBlock = useCallback(async (block: AuditBlock) => {
    return await verifyAuditBlockIntegrity(block, ledgerBlocks);
  }, [ledgerBlocks]);

  // AI Copilot Send Message
  const sendCopilotMessage = useCallback(async (userText: string) => {
    if (!userText.trim()) return;

    const userMsg: CopilotMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'USER',
      text: userText,
      timestamp: new Date().toLocaleTimeString()
    };

    setCopilotMessages(prev => [...prev, userMsg]);
    setIsCopilotThinking(true);

    try {
      const responseText = await queryGroundedCopilot(
        userText,
        {
          organization,
          riskState,
          investmentScenario,
          assets,
          vulnerabilities,
          incidents,
          controls,
          actionsCatalog
        },
        geminiApiKey
      );

      const copilotReply: CopilotMessage = {
        id: `msg-copilot-${Date.now()}`,
        sender: 'COPILOT',
        text: responseText,
        timestamp: new Date().toLocaleTimeString(),
        metricsContext: {
          riskScore: riskState.overallScore,
          riskBand: riskState.riskBand,
          budgetINR: investmentScenario.totalBudgetINR,
          projectedRisk: investmentScenario.projectedRiskScore
        }
      };

      setCopilotMessages(prev => [...prev, copilotReply]);
    } catch (err) {
      console.error('Copilot error:', err);
      const errorReply: CopilotMessage = {
        id: `msg-err-${Date.now()}`,
        sender: 'COPILOT',
        text: 'I encountered an error analyzing the telemetry state. Please try again.',
        timestamp: new Date().toLocaleTimeString()
      };
      setCopilotMessages(prev => [...prev, errorReply]);
    } finally {
      setIsCopilotThinking(false);
    }
  }, [
    organization,
    riskState,
    investmentScenario,
    assets,
    vulnerabilities,
    incidents,
    controls,
    actionsCatalog,
    geminiApiKey
  ]);

  return (
    <SecurityContext.Provider
      value={{
        currentIndustry,
        organization,
        setIndustry,
        assets,
        vulnerabilities,
        incidents,
        controls,
        telemetryEvents,
        addCustomTelemetryLog,
        simulateAttack,
        remediateVulnerability,
        resolveIncident,
        ingestRawEvent,
        ingestRawVulnerability,
        ingestRawIncident,
        ingestRawAsset,
        ingestRawControl,
        injectDemoScenario,
        ingestionStats,
        ingestionLogs,
        weights,
        setWeights,
        resetWeights,
        riskState,
        budgetINR,
        setBudgetINR,
        selectedActionIds,
        toggleActionSelection,
        autoOptimizeBudget,
        investmentScenario,
        actionsCatalog,
        budgetOptimizationCurve,
        ledgerBlocks,
        isCommittingBlock,
        commitAuditSnapshot,
        verifyBlock,
        copilotMessages,
        isCopilotThinking,
        sendCopilotMessage,
        geminiApiKey,
        setGeminiApiKey
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
};

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
}
