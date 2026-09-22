export interface AuditRecordPayload {
  organizationId: string;
  organizationName: string;
  calculatedRiskScore: number;
  riskBand: string;
  criticalVulnerabilitiesCount: number;
  totalAssetsProtected: number;
  allocatedBudgetINR: number;
  projectedRiskScore: number;
  securityInterventionsCount: number;
  factorsDigest: string;
}

export interface AuditBlock {
  blockNumber: number;
  timestamp: string;
  previousHash: string;
  currentHash: string;
  merkleRoot: string;
  assessmentType: 'CONTINUOUS_TELEMETRY_SNAP' | 'INVESTMENT_ALLOCATION' | 'INCIDENT_ESCALATION' | 'REGULATORY_COMPLIANCE_AUDIT';
  validatorNode: string;
  signature: string;
  payload: AuditRecordPayload;
  status: 'COMMITTED' | 'VERIFIED' | 'TAMPER_CHECK_PASSED';
}

export interface VerificationResult {
  isValid: boolean;
  blockFound?: AuditBlock;
  calculatedHash: string;
  storedHash: string;
  merkleMatched: boolean;
  verifiedAt: string;
  details: string;
}
