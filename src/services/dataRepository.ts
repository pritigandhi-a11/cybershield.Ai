import {
  Organization,
  SecurityAsset,
  Vulnerability,
  TelemetryEvent,
  SecurityControlStatus,
  IncidentAlert,
  RiskAssessment,
  CybersecuritySnapshot,
  RiskDriverItem
} from '../types/dataModel';
import { calculateQuantifiedCyberRisk, assessOrganizationCyberRisk } from './riskEngine';
import {
  INITIAL_ASSETS,
  INITIAL_VULNERABILITIES,
  INITIAL_CONTROLS,
  INITIAL_INCIDENTS,
  INDUSTRY_PRESETS
} from './organizationData';
import { IndustryType } from '../types/organization';

/**
 * Central In-Memory Cybersecurity Repository
 * 
 * Manages the canonical cybersecurity state for all monitored organizations.
 * Supports the data pipeline:
 * Security Data Feeds -> Normalization -> Central Repository -> Risk Engine -> Dashboard & Optimizer
 */
class CybersecurityDataStore {
  private organizations: Map<string, Organization> = new Map();
  private assets: Map<string, SecurityAsset[]> = new Map();
  private vulnerabilities: Map<string, Vulnerability[]> = new Map();
  private telemetryEvents: Map<string, TelemetryEvent[]> = new Map();
  private securityControls: Map<string, SecurityControlStatus[]> = new Map();
  private incidents: Map<string, IncidentAlert[]> = new Map();
  private riskAssessments: Map<string, RiskAssessment[]> = new Map();

  constructor() {
    this.initializeDemoData();
  }

  private initializeDemoData() {
    // 1. Organizations & Seed Entities from Presets
    Object.values(INDUSTRY_PRESETS).forEach(org => {
      this.organizations.set(org.id, {
        id: org.id,
        name: org.name,
        industry: org.industry,
        createdAt: '2024-01-01T00:00:00Z',
        industryLabel: org.industryLabel,
        description: org.description,
        totalAssetsCount: org.totalAssetsCount,
        primaryRegulatoryFrameworks: org.primaryRegulatoryFrameworks,
        defaultCurrencySymbol: org.defaultCurrencySymbol,
        typicalThreatActors: org.typicalThreatActors,
        sampleCriticalAssetNames: org.sampleCriticalAssetNames,
        baseBudgetINR: org.baseBudgetINR
      });

      const industryKey = (org.industry as IndustryType) || 'BANKING_FINTECH';
      const presetAssets = INITIAL_ASSETS[industryKey] || INITIAL_ASSETS.BANKING_FINTECH;
      this.assets.set(org.id, [...presetAssets]);
      this.vulnerabilities.set(org.id, [...INITIAL_VULNERABILITIES]);
      this.securityControls.set(org.id, [...INITIAL_CONTROLS]);
      this.incidents.set(org.id, [...INITIAL_INCIDENTS]);

      const initialEvents: TelemetryEvent[] = [
        {
          id: `evt-${org.id}-01`,
          targetAsset: presetAssets[0]?.name || 'Perimeter Gateway Node',
          assetId: presetAssets[0]?.id || 'ast-bnk-01',
          eventType: 'C2_BEACONING',
          normalizedCategory: 'C2_BEACONING',
          timestamp: '09:41:22',
          source: 'FIREWALL',
          sourceIp: '194.26.29.112',
          destinationIp: '10.14.0.12',
          severity: 'CRITICAL',
          normalizedDescription: 'Outbound repetitive heartbeat telemetry matching command & control patterns.',
          aiCorrelationNotes: 'Correlated beaconing traffic tagged with MITRE ATT&CK T1071.',
          rawMessage: 'Threat Log: C2-Beacon-Pattern drop untrust to trust 194.26.29.112 -> 10.14.0.12:443',
          confidenceScore: 0.98,
          isAnomaly: true,
          normalized: true,
          threatActorContext: 'Targeted Advanced Persistent Threat (APT)'
        },
        {
          id: `evt-${org.id}-02`,
          targetAsset: presetAssets[1]?.name || 'Directory Domain Controller',
          assetId: presetAssets[1]?.id || 'ast-bnk-03',
          eventType: 'AUTH_BRUTE_FORCE',
          normalizedCategory: 'AUTH_BRUTE_FORCE',
          timestamp: '09:42:01',
          source: 'ACTIVE_DIRECTORY',
          sourceIp: '10.12.8.99',
          destinationIp: '10.10.1.10',
          severity: 'HIGH',
          normalizedDescription: 'High-frequency authentication failure burst targeting administrative account.',
          aiCorrelationNotes: 'Credential spray anomaly detected on domain controller.',
          rawMessage: 'Event 4625: Unknown user name or bad password for svc_admin from 10.12.8.99',
          confidenceScore: 0.94,
          isAnomaly: false,
          normalized: true,
          threatActorContext: 'Credential Spray Botnet'
        }
      ];
      this.telemetryEvents.set(org.id, initialEvents);
    });
  }

  public resetDemoData(): void {
    this.initializeDemoData();
  }

  // Organization Operations
  public getOrganization(orgId: string): Organization | undefined {
    return this.organizations.get(orgId);
  }

  public getAllOrganizations(): Organization[] {
    return Array.from(this.organizations.values());
  }

  // Asset Operations
  public getAssets(orgId: string): SecurityAsset[] {
    return this.assets.get(orgId) || [];
  }

  public addAsset(orgId: string, asset: SecurityAsset): void {
    const list = this.getAssets(orgId);
    this.assets.set(orgId, [asset, ...list]);
  }

  public updateAsset(orgId: string, assetId: string, updates: Partial<SecurityAsset>): void {
    const list = this.getAssets(orgId);
    const index = list.findIndex(a => a.id === assetId);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      this.assets.set(orgId, [...list]);
    }
  }

  public removeAsset(orgId: string, assetId: string): void {
    const list = this.getAssets(orgId);
    this.assets.set(orgId, list.filter(a => a.id !== assetId));
  }

  // Vulnerability Operations
  public getVulnerabilities(orgId: string): Vulnerability[] {
    return this.vulnerabilities.get(orgId) || [];
  }

  public addVulnerability(orgId: string, vuln: Vulnerability): void {
    const list = this.getVulnerabilities(orgId);
    this.vulnerabilities.set(orgId, [vuln, ...list]);
  }

  public remediateVulnerability(vulnIdOrOrgId: string, vulnId?: string): void {
    const targetVulnId = vulnId || vulnIdOrOrgId;
    const targetOrgId = vulnId ? vulnIdOrOrgId : 'org-fintech-01';

    // Search in target org, or all orgs if only vulnId was passed
    for (const [orgId, list] of this.vulnerabilities.entries()) {
      if (!vulnId || orgId === targetOrgId) {
        const index = list.findIndex(v => v.id === targetVulnId);
        if (index !== -1) {
          list[index] = {
            ...list[index],
            status: 'REMEDIATED',
            remediationStatus: 'REMEDIATED'
          };
          this.vulnerabilities.set(orgId, [...list]);
        }
      }
    }
  }

  // Telemetry Event Operations
  public getTelemetryEvents(orgId: string): TelemetryEvent[] {
    return this.telemetryEvents.get(orgId) || [];
  }

  public addTelemetryEvent(orgId: string, event: TelemetryEvent): void {
    const list = this.getTelemetryEvents(orgId);
    this.telemetryEvents.set(orgId, [event, ...list]);
  }

  public addSecurityEvent(orgId: string, event: any): void {
    const telemetryEvent: TelemetryEvent = {
      id: event.id || `evt-${Date.now()}`,
      timestamp: event.timestamp || new Date().toISOString(),
      source: event.source || 'FIREWALL',
      severity: event.severity || 'MEDIUM',
      rawMessage: event.rawMessage || event.description || '',
      normalizedCategory: event.eventType || event.category || 'POLICY_VIOLATION',
      normalizedDescription: event.description || event.aiCorrelationNotes || '',
      sourceIp: event.sourceIp || '10.0.0.1',
      destinationIp: event.destinationIp || '10.0.0.2',
      targetAsset: event.targetAsset || 'Enterprise Asset',
      confidenceScore: event.confidenceScore || 0.9,
      isAnomaly: event.isAnomaly !== undefined ? event.isAnomaly : true,
      normalized: true
    };
    this.addTelemetryEvent(orgId, telemetryEvent);
  }

  // Security Controls Operations
  public getSecurityControls(orgId: string): SecurityControlStatus[] {
    return this.securityControls.get(orgId) || [];
  }

  public updateSecurityControl(orgId: string, controlId: string, updates: Partial<SecurityControlStatus>): void {
    const list = this.getSecurityControls(orgId);
    const index = list.findIndex(c => c.id === controlId);
    if (index !== -1) {
      list[index] = { ...list[index], ...updates };
      this.securityControls.set(orgId, [...list]);
    }
  }

  // Incident Operations
  public getIncidents(orgId: string): IncidentAlert[] {
    return this.incidents.get(orgId) || [];
  }

  public addIncident(orgId: string, incident: IncidentAlert): void {
    const list = this.getIncidents(orgId);
    this.incidents.set(orgId, [incident, ...list]);
  }

  public resolveIncident(incidentIdOrOrgId: string, incidentId?: string): void {
    const targetIncidentId = incidentId || incidentIdOrOrgId;
    const targetOrgId = incidentId ? incidentIdOrOrgId : 'org-fintech-01';

    for (const [orgId, list] of this.incidents.entries()) {
      if (!incidentId || orgId === targetOrgId) {
        const index = list.findIndex(i => i.id === targetIncidentId);
        if (index !== -1) {
          list[index] = {
            ...list[index],
            status: 'CLOSED',
            resolvedAt: new Date().toISOString()
          };
          this.incidents.set(orgId, [...list]);
        }
      }
    }
  }

  // Risk Assessments Operations
  public getRiskAssessments(orgId: string): RiskAssessment[] {
    return this.riskAssessments.get(orgId) || [];
  }

  public saveRiskAssessment(assessment: RiskAssessment): void {
    const orgId = assessment.organizationId || 'org-fintech-01';
    const list = this.getRiskAssessments(orgId);
    this.riskAssessments.set(orgId, [assessment, ...list]);
  }

  // Central Derived Cybersecurity Snapshot
  public getCybersecuritySnapshot(orgId: string = 'org-fintech-01'): CybersecuritySnapshot {
    const org = this.getOrganization(orgId) || {
      id: orgId,
      name: 'Default Enterprise',
      industry: 'BANKING_FINTECH',
      createdAt: new Date().toISOString()
    };

    const assets = this.getAssets(orgId);
    const vulnerabilities = this.getVulnerabilities(orgId);
    const telemetry = this.getTelemetryEvents(orgId);
    const controls = this.getSecurityControls(orgId);
    const incidents = this.getIncidents(orgId);

    // Compute dynamic risk using existing risk engine
    const state = calculateQuantifiedCyberRisk(assets, vulnerabilities, incidents, controls, telemetry);
    const riskAssessment = assessOrganizationCyberRisk(orgId, assets, vulnerabilities, incidents, controls, telemetry);

    // Save latest assessment
    const existingAssessments = this.riskAssessments.get(orgId) || [];
    this.riskAssessments.set(orgId, [riskAssessment, ...existingAssessments]);

    const majorRiskDrivers: RiskDriverItem[] = state.topDrivers.map(d => ({
      id: d.id,
      type: d.type,
      title: d.title,
      impactScore: d.impactScore,
      assetName: d.assetName,
      severity: d.severity,
      remediationSnippet: d.remediationSnippet
    }));

    return {
      organization: org,
      assets,
      vulnerabilities,
      telemetry,
      incidents,
      controls,
      factorScores: {
        vulnerabilityRisk: state.factors.vulnerabilityExposure.score,
        threatExposure: state.factors.threatActivity.score,
        assetCriticality: state.factors.assetCriticality.score,
        controlsGap: state.factors.securityControlsGap.score,
        incidentRisk: state.factors.incidentHistory.score,
        environmentalRisk: state.factors.environmentalExposure.score
      },
      riskAssessment,
      majorRiskDrivers,
      timestamp: new Date().toISOString()
    };
  }
}

export const cybersecurityRepository = new CybersecurityDataStore();
