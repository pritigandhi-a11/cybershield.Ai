export type IndustryType = 'BANKING_FINTECH' | 'HEALTHCARE' | 'ENTERPRISE_SAAS' | 'HIGHER_EDUCATION' | 'CRITICAL_INFRASTRUCTURE';

export interface OrganizationProfile {
  id: string;
  name: string;
  industry: IndustryType;
  industryLabel: string;
  description: string;
  totalAssetsCount: number;
  primaryRegulatoryFrameworks: string[];
  defaultCurrencySymbol: string;
  typicalThreatActors: string[];
  sampleCriticalAssetNames: string[];
  baseBudgetINR: number;
}
