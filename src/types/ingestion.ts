import { SeverityLevel, TelemetryEvent, Vulnerability, IncidentAlert, SecurityAsset, SecurityControlStatus, ControlCategory } from './dataModel';

/**
 * Raw Cybersecurity Ingestion Types & Data Structures
 * 
 * Supports multi-format ingest feeds:
 * - JSON Security Events (IDP, EDR, SIEM, CloudTrail)
 * - Syslog Strings (RFC5424 / RFC3164)
 * - CSV-style Vulnerability Records (Qualys, Nessus, NVD)
 * - Incident Alerts (SOC Triage, PagerDuty, Jira Sec)
 * - Asset Inventory Feeds (CMDB, AWS/GCP inventory)
 * - Control Posture Feeds (Compliance, IAM, EDR status)
 */

// A. Raw JSON Security Event
export interface RawSecurityEvent {
  event_type?: string;
  eventType?: string;
  timestamp?: string;
  source?: string;
  user?: string;
  username?: string;
  asset?: string;
  target_asset?: string;
  targetAsset?: string;
  asset_id?: string;
  assetId?: string;
  severity?: string;
  message?: string;
  rawMessage?: string;
  raw_message?: string;
  source_ip?: string;
  sourceIPAddress?: string;
  sourceIp?: string;
  destination_ip?: string;
  destinationIp?: string;
  dest_ip?: string;
  confidence_score?: number;
  confidenceScore?: number;
  anomaly?: boolean;
  isAnomaly?: boolean;
  threat_actor?: string;
  threatActorContext?: string;
  [key: string]: any;
}

// B. Raw Syslog String
export interface RawSyslogInput {
  syslog_string: string;
  facility?: number;
  severity_level?: number;
  hostname?: string;
  timestamp?: string;
}

// C. Raw CSV / Structured Vulnerability Record
export interface RawVulnerabilityRecord {
  asset_id?: string;
  assetId?: string;
  cve_id?: string;
  cveId?: string;
  title?: string;
  severity?: string;
  cvss?: number | string;
  cvss_score?: number | string;
  cvssScore?: number | string;
  status?: string;
  discovered_at?: string;
  discoveredAt?: string;
  description?: string;
  remediation_action?: string;
  remediationAction?: string;
  risk_reduction_points?: number | string;
  riskReductionPoints?: number | string;
  exploit_available_in_wild?: boolean | string;
  exploited?: boolean | string;
  [key: string]: any;
}

// D. Raw Security Incident Record
export interface RawIncidentRecord {
  id?: string;
  title: string;
  severity?: string;
  status?: string;
  source?: string;
  timestamp?: string;
  occurred_at?: string;
  detected_at?: string;
  affected_asset?: string;
  affected_assets?: string[] | string;
  affectedAsset?: string;
  affectedAssets?: string[];
  description?: string;
  impact_summary?: string;
  category?: string;
  assigned_engineer?: string;
  [key: string]: any;
}

// E. Raw Asset Record
export interface RawAssetRecord {
  id?: string;
  name: string;
  type?: string;
  category?: string;
  criticality?: string;
  criticality_score?: number | string;
  criticalityScore?: number | string;
  environment?: string;
  exposure?: string;
  exposure_level?: string;
  exposureLevel?: string;
  internet_exposed?: boolean | string;
  internetExposed?: boolean | string;
  owner?: string;
  ip_address?: string;
  ipAddress?: string;
  department?: string;
  mfa_enabled?: boolean | string;
  mfaEnabled?: boolean | string;
  edr_active?: boolean | string;
  edrActive?: boolean | string;
  [key: string]: any;
}

// F. Raw Control Record
export interface RawControlRecord {
  id?: string;
  name: string;
  category?: ControlCategory | string;
  coverage_percentage?: number | string;
  coveragePercentage?: number | string;
  coverage?: number | string;
  status?: string;
  health?: string;
  effectiveness?: string | number;
  is_mandatory?: boolean | string;
  isMandatory?: boolean | string;
  standard_alignment?: string[] | string;
  [key: string]: any;
}

// Normalization Metadata & Method Enum
export type NormalizationMethod =
  | 'AI_ASSISTED'
  | 'DETERMINISTIC_PARSER'
  | 'SYSLOG_REGEX'
  | 'CSV_PARSER'
  | 'DIRECT_TYPED';

export interface IngestionMetadata {
  ingestedAt: string;
  normalizationMethod: NormalizationMethod;
  confidenceScore: number;
  rawInputSnippet: string;
  originalEventType?: string;
  normalizedEventType?: string;
  originalSeverity?: string;
  normalizedSeverity?: SeverityLevel;
}

// Ingestion Result wrapper
export interface IngestionResult<T> {
  success: boolean;
  entityType: 'TELEMETRY_EVENT' | 'VULNERABILITY' | 'INCIDENT' | 'ASSET' | 'CONTROL';
  entityId: string;
  entity?: T;
  metadata: IngestionMetadata;
  validationErrors?: string[];
}

// Live Ingestion Stats
export interface IngestionStats {
  totalEventsReceived: number;
  totalVulnerabilitiesReceived: number;
  totalIncidentsReceived: number;
  totalAssetsMonitored: number;
  totalControlsTracked: number;
  lastIngestionTime: string;
  normalizationStatus: 'OPERATIONAL' | 'DEGRADED' | 'IDLE';
  aiAssistedCount: number;
  deterministicParsedCount: number;
}
