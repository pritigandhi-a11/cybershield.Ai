/**
 * Central Foundational Cybersecurity Data Model & Dynamic Snapshot
 * 
 * Defines standard data structures for continuous cyber risk quantification
 * and decision-making pipeline:
 * Security Data -> AI Normalization -> Central Cybersecurity Data Model -> Risk Engine -> Dashboard & Optimizer
 */

export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'INFO';
export type CriticalityLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type AssetEnvironment = 'PRODUCTION' | 'STAGING' | 'DMZ' | 'INTERNAL_VLAN' | 'CLOUD';
export type ExposureType = 'INTERNET_FACING' | 'INTERNAL_DMZ' | 'ISOLATED_VLAN';
export type AssetStatus = 'ACTIVE' | 'MAINTENANCE' | 'DECOMMISSIONED' | 'ISOLATED';
export type VulnerabilityStatus = 'OPEN' | 'IN_PROGRESS' | 'REMEDIATED';
export type IncidentStatus = 'ACTIVE_TRIAGE' | 'CONTAINED' | 'MITIGATED' | 'CLOSED';
export type ControlHealth = 'OPTIMAL' | 'DEGRADED' | 'CRITICAL_GAP' | 'ACTIVE';

export type ControlCategory =
  | 'MFA'
  | 'FIREWALL'
  | 'ENCRYPTION'
  | 'BACKUP'
  | 'ENDPOINT_PROTECTION'
  | 'ACCESS_CONTROL'
  | 'MONITORING'
  | 'IDENTITY'
  | 'ENDPOINT'
  | 'DATA_PROTECTION'
  | 'NETWORK'
  | 'GOVERNANCE'
  | 'CLOUD_INFRA';

// 1. Organization Entity
export interface Organization {
  id: string;
  name: string;
  industry: string;
  createdAt: string;
  industryLabel?: string;
  description?: string;
  totalAssetsCount?: number;
  primaryRegulatoryFrameworks?: string[];
  defaultCurrencySymbol?: string;
  typicalThreatActors?: string[];
  sampleCriticalAssetNames?: string[];
  baseBudgetINR?: number;
}

// 2. SecurityAsset Entity
export interface SecurityAsset {
  id: string;
  organizationId?: string;
  name: string;
  type?: string; // e.g. 'API_GATEWAY' | 'DATABASE' | 'IDENTITY_DC' | 'CORE_BANKING' | 'CLOUD_INFRA' | 'ENDPOINT' | 'EHR_HEALTH'
  category?: string; // alias for type
  criticality?: CriticalityLevel; // 'Low' | 'Medium' | 'High' | 'Critical'
  criticalityScore?: number; // 1 - 10 numerical score
  environment?: AssetEnvironment;
  exposure?: ExposureType; // 'INTERNET_FACING' | 'INTERNAL_DMZ' | 'ISOLATED_VLAN'
  exposureLevel?: ExposureType; // alias for exposure
  internetExposed?: boolean;
  owner?: string;
  status?: AssetStatus;
  
  // Infrastructure telemetry fields
  ipAddress?: string;
  department?: string;
  vulnerabilitiesCount?: {
    critical: number;
    high: number;
    medium: number;
    low: number;
  };
  mfaEnabled?: boolean;
  edrActive?: boolean;
  lastBackupHoursAgo?: number;
  healthScore?: number; // 0 - 100
}

// Alias for Asset
export type Asset = SecurityAsset;

// 3. Vulnerability Entity
export interface Vulnerability {
  id: string;
  assetId?: string; // Target Asset ID reference
  affectedAssetId?: string; // alias for assetId
  affectedAssetName?: string;
  title: string;
  severity: SeverityLevel;
  cveId: string; // CVE identifier
  cvssScore: number; // 0.0 - 10.0
  exploited?: boolean; // exploited in wild status
  exploitAvailableInWild?: boolean; // alias for exploited
  exploitability?: 'Weaponized in Wild' | 'Proof of Concept' | 'Theoretical' | 'None' | string;
  remediationStatus?: VulnerabilityStatus;
  status?: VulnerabilityStatus | string; // alias for remediationStatus
  discoveredAt?: string;
  detectedAt?: string; // alias for discoveredAt
  source?: 'CVE_NVD' | 'NESSUS' | 'QUALYS' | 'SNORT' | 'CROWDSTRIKE' | 'MANUAL_AUDIT' | string;
  
  // Remediation properties
  description?: string;
  patchAvailable?: boolean;
  remediationAction?: string;
  estimatedFixHours?: number;
  riskReductionPoints?: number; // estimated risk points reduced
}

// Alias for VulnerabilityModel
export type VulnerabilityModel = Vulnerability;

// 4. SecurityControlStatus Entity
export interface SecurityControlStatus {
  id: string;
  organizationId?: string;
  name: string;
  category: ControlCategory | string;
  status?: ControlHealth | string;
  health?: ControlHealth | string; // alias for status
  coveragePercentage?: number; // 0 - 100%
  coverage?: number; // alias for coveragePercentage
  effectiveness?: 'HIGH' | 'MEDIUM' | 'LOW' | number | string;
  isMandatory?: boolean;
  standardAlignment?: string[];
  lastAudited?: string;
}

// Alias for SecurityControl
export type SecurityControl = SecurityControlStatus;

// 5. TelemetryEvent Entity
export interface TelemetryEvent {
  id: string;
  assetId?: string;
  targetAsset?: string;
  eventType?: 'AUTH_BRUTE_FORCE' | 'EXPLOIT_ATTEMPT' | 'C2_BEACONING' | 'DATA_EXFIL' | 'POLICY_VIOLATION' | 'PORT_SCAN' | 'PRIVILEGE_ESCALATION' | string;
  normalizedCategory?: string; // alias for eventType
  timestamp: string;
  source?: 'FIREWALL' | 'EDR_CROWDSTRIKE' | 'SIEM_SPLUNK' | 'ACTIVE_DIRECTORY' | 'AWS_GUARDDUTY' | 'VULN_SCANNER' | string;
  sourceIp?: string;
  destinationIp?: string;
  severity?: SeverityLevel;
  normalizedDescription?: string;
  aiCorrelationNotes?: string; // alias for normalizedDescription
  rawMessage?: string;
  confidenceScore?: number; // 0.0 - 1.0
  isAnomaly?: boolean;
  normalized?: boolean;
  threatActorContext?: string;
}

// Alias for SecurityEvent
export type SecurityEvent = TelemetryEvent;

// 6. IncidentAlert Entity
export interface IncidentAlert {
  id: string;
  organizationId?: string;
  title: string;
  severity?: SeverityLevel;
  status?: IncidentStatus | string;
  source?: string;
  timestamp?: string; // alias for detectedAt / occurredAt
  occurredAt?: string;
  detectedAt?: string;
  resolvedAt?: string;
  affectedAsset?: string;
  affectedAssets?: string[];
  description?: string;
  impactSummary?: string; // alias for description
  category?: string;
  assignedEngineer?: string;
}

// Alias for Incident
export type Incident = IncidentAlert;

// Major Risk Driver structure
export interface RiskDriverItem {
  id: string;
  type: 'VULNERABILITY' | 'ASSET_EXPOSURE' | 'THREAT_BEACON' | 'MISSING_MFA' | 'STALE_BACKUP';
  title: string;
  impactScore: number; // points contributed to risk
  assetName: string;
  severity: SeverityLevel;
  remediationSnippet: string;
}

// 7. RiskAssessment Entity
export interface RiskAssessment {
  id: string;
  assessmentId?: string; // alias for id
  timestamp: string;
  organizationId: string;
  organizationName?: string;
  riskScore?: number; // overall calculated score (0 - 100)
  overallRiskScore?: number; // alias for riskScore
  riskBand?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  vulnerabilityRisk?: number;
  threatExposure?: number;
  assetCriticality?: number;
  controlsGap?: number;
  incidentRisk?: number;
  environmentalRisk?: number;
  factorScores?: {
    vulnerabilityRisk: number;
    threatExposure: number;
    assetCriticality: number;
    controlsGap: number;
    incidentRisk: number;
    environmentalRisk: number;
  };
  majorRiskDrivers?: RiskDriverItem[];
  sourceDataSummary?: {
    totalAssets: number;
    criticalAssets: number;
    openVulnerabilities: number;
    criticalVulnerabilities: number;
    recentTelemetryEvents: number;
    averageControlCoverage: number;
    activeIncidents: number;
  };
  modelVersion?: string; // e.g. 'v2.4-deterministic-weighted'
  confidenceInterval?: { min: number; max: number };
  delta7Days?: number;
}

// 8. Central Derived Cybersecurity Snapshot
export interface CybersecuritySnapshot {
  organization: Organization;
  assets: SecurityAsset[];
  vulnerabilities: Vulnerability[];
  telemetry: TelemetryEvent[];
  incidents: IncidentAlert[];
  controls: SecurityControlStatus[];
  factorScores: {
    vulnerabilityRisk: number;
    threatExposure: number;
    assetCriticality: number;
    controlsGap: number;
    incidentRisk: number;
    environmentalRisk: number;
  };
  riskAssessment: RiskAssessment;
  majorRiskDrivers: RiskDriverItem[];
  timestamp: string;
}
