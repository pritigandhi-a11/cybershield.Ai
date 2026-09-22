export interface SecurityAction {
  id: string;
  title: string;
  category: 'PATCHING' | 'MFA_IDENTITY' | 'BACKUP_DISASTER' | 'EDR_COVERAGE' | 'CLOUD_CSPM' | 'TRAINING' | 'FIREWALL_WAF' | 'ZERO_TRUST';
  description: string;
  costInINR: number; // e.g. 200000 = ₹2,00,000
  estimatedRiskReduction: number; // points (e.g. 14.5)
  timeToImplementWeeks: number;
  targetedVulnerabilityIds?: string[];
  targetedAssetIds?: string[];
  roiEfficiency: number; // calculated as (Risk Reduction / Cost in Lakhs)
  complianceTags: string[]; // e.g. ['RBI Annex 2', 'CERT-In 6-hour mandate', 'ISO 27001 A.12']
  isRecommended: boolean;
  priorityTier: 'TIER_1_MUST_HAVE' | 'TIER_2_HIGH_ROI' | 'TIER_3_COMPREHENSIVE';
}

export interface InvestmentScenario {
  scenarioName: string;
  totalBudgetINR: number;
  allocatedBudgetINR: number;
  unallocatedBudgetINR: number;
  selectedActionIds: string[];
  currentRiskScore: number;
  projectedRiskScore: number;
  totalModeledReduction: number;
  overallRoiScore: number; // Points saved per ₹1 Lakh
  projectedRiskBand: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
}

export interface BudgetCurvePoint {
  budgetINR: number;
  budgetFormatted: string; // e.g. "₹2.0L"
  projectedRiskScore: number;
  actionsCount: number;
}
