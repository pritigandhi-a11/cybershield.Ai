export type RiskBand = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';

export interface RiskFactorWeights {
  vulnerabilityExposure: number; // default 0.25 (25%)
  threatActivity: number;        // default 0.20 (20%)
  assetCriticality: number;      // default 0.20 (20%)
  securityControlsGap: number;   // default 0.15 (15%)
  incidentHistory: number;       // default 0.10 (10%)
  environmentalExposure: number; // default 0.10 (10%)
}

export interface FactorBreakdown {
  score: number; // 0 - 100
  weightedContribution: number;
  weight: number; // 0.0 - 1.0
  status: 'SAFE' | 'ELEVATED' | 'HIGH_RISK' | 'CRITICAL';
  keyContributors: string[];
  explanation: string;
}

export interface RiskDriver {
  id: string;
  type: 'VULNERABILITY' | 'ASSET_EXPOSURE' | 'THREAT_BEACON' | 'MISSING_MFA' | 'STALE_BACKUP';
  title: string;
  impactScore: number; // points contributed to risk
  assetName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  remediationSnippet: string;
}

export interface HistoricalRiskPoint {
  timestamp: string;
  score: number;
  incidentCount: number;
  majorEvent?: string;
}

export interface DepartmentRisk {
  department: string;
  assetCount: number;
  riskScore: number;
  criticalVulnerabilities: number;
  compliancePercentage: number;
  topConcern: string;
}

export interface QuantifiedRiskState {
  overallScore: number; // 0 - 100
  riskBand: RiskBand;
  confidenceInterval: { min: number; max: number };
  delta7Days: number; // e.g. +4 or -12
  weights: RiskFactorWeights;
  factors: {
    vulnerabilityExposure: FactorBreakdown;
    threatActivity: FactorBreakdown;
    assetCriticality: FactorBreakdown;
    securityControlsGap: FactorBreakdown;
    incidentHistory: FactorBreakdown;
    environmentalExposure: FactorBreakdown;
  };
  topDrivers: RiskDriver[];
  departmentRisks: DepartmentRisk[];
  historicalTrend: HistoricalRiskPoint[];
  calculatedAt: string;
  formulaVersion: string;
}
