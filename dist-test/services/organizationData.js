export const INDUSTRY_PRESETS = {
    BANKING_FINTECH: {
        id: 'org-fintech-01',
        name: 'Bharat NeoBank & Financial Services Ltd.',
        industry: 'BANKING_FINTECH',
        industryLabel: 'Banking & FinTech',
        description: 'High-volume digital payments switch, core banking microservices, and customer lending platform handling 4.2M daily UPI transactions.',
        totalAssetsCount: 148,
        primaryRegulatoryFrameworks: ['RBI Cyber Security Framework 2024', 'PCI-DSS v4.0.1', 'CERT-In Cyber Directives', 'DPDP Act 2023'],
        defaultCurrencySymbol: '₹',
        typicalThreatActors: ['FIN7 / Cobalt Group', 'Lazarus SWIFT Targeting', 'Credential Stuffing Botnets'],
        sampleCriticalAssetNames: ['Core UPI Switch Engine', 'Customer PII Mongo Cluster', 'SWIFT Gateway Node 1', 'HSM Key Management Appliance'],
        baseBudgetINR: 500000, // ₹5,00,000
    },
    HEALTHCARE: {
        id: 'org-health-02',
        name: 'Apex SuperSpecialty Hospital & Research Network',
        industry: 'HEALTHCARE',
        industryLabel: 'Healthcare & Hospital Systems',
        description: 'Connected electronic health record (EHR) network, PACS medical imaging storage, and IoT patient monitor telemetry across 6 regional centers.',
        totalAssetsCount: 230,
        primaryRegulatoryFrameworks: ['DISHA / Digital Health Act', 'HIPAA Security Rule', 'CERT-In Mandate', 'NABH IT Standards'],
        defaultCurrencySymbol: '₹',
        typicalThreatActors: ['LockBit 3.0 Ransomware', 'Medusa Extortion', 'Unauthenticated DICOM Scanners'],
        sampleCriticalAssetNames: ['Central EHR Postgres DB', 'PACS Medical Imaging Archive', 'ICU Telemetry Gateway', 'Active Directory Domain Controller'],
        baseBudgetINR: 400000, // ₹4,00,000
    },
    ENTERPRISE_SAAS: {
        id: 'org-saas-03',
        name: 'CloudScale Technologies (Multi-Tenant SaaS)',
        industry: 'ENTERPRISE_SAAS',
        industryLabel: 'Enterprise SaaS & Cloud',
        description: 'Global multi-tenant B2B analytics platform hosted across AWS ap-south-1 & Azure with Kubernetes clusters and Kafka streaming queues.',
        totalAssetsCount: 195,
        primaryRegulatoryFrameworks: ['SOC 2 Type II', 'ISO/IEC 27001:2022', 'GDPR', 'CERT-In Guidelines'],
        defaultCurrencySymbol: '₹',
        typicalThreatActors: ['Cloud Infrastructure Extortionists', 'Supply Chain Dependency Attackers', 'API Token Scraping Botnets'],
        sampleCriticalAssetNames: ['Production Kubernetes EKS Master', 'Kafka Streaming Broker Cluster', 'AWS IAM Admin Secrets Vault', 'Public API Gateway'],
        baseBudgetINR: 600000, // ₹6,00,000
    },
    HIGHER_EDUCATION: {
        id: 'org-edu-04',
        name: 'National Institute of Science & Technology (NIST University)',
        industry: 'HIGHER_EDUCATION',
        industryLabel: 'Higher Education & Research',
        description: 'Campus-wide hybrid network serving 18,000 students, high-performance computing (HPC) research cluster, and student ERP examination portal.',
        totalAssetsCount: 310,
        primaryRegulatoryFrameworks: ['UGC IT Security Guidelines', 'CERT-In Directives', 'DPDP Act 2023'],
        defaultCurrencySymbol: '₹',
        typicalThreatActors: ['Student Grading Exploitation', 'Campus Wi-Fi Torrent/Botnet Nodes', 'Phishing & Credential Harvesters'],
        sampleCriticalAssetNames: ['Exam Results & Grading Oracle DB', 'HPC GPU Research Node', 'Campus Active Directory Kerberos', 'Student Fee Payment Gateway'],
        baseBudgetINR: 300000, // ₹3,00,000
    },
    CRITICAL_INFRASTRUCTURE: {
        id: 'org-infra-05',
        name: 'GridPower Energy & Distribution Grid Corp',
        industry: 'CRITICAL_INFRASTRUCTURE',
        industryLabel: 'Critical Infrastructure & Energy',
        description: 'SCADA/ICS electrical substation telemetry, smart meter grid control network, and corporate ERP system.',
        totalAssetsCount: 180,
        primaryRegulatoryFrameworks: ['NCIIPC Critical Guidelines', 'CEA Cyber Security in Power Sector', 'ISO 27019', 'CERT-In Mandate'],
        defaultCurrencySymbol: '₹',
        typicalThreatActors: ['Volt Typhoon / Sandworm', 'ICS Protocol Fuzzers', 'Firmware Supply Chain Injections'],
        sampleCriticalAssetNames: ['SCADA Substation Controller PLC-01', 'Smart Meter Grid Headend', 'Historian Industrial DB', 'OT-IT DMZ Jump Server'],
        baseBudgetINR: 750000, // ₹7,50,000
    }
};
export const INITIAL_ASSETS = {
    BANKING_FINTECH: [
        {
            id: 'ast-bnk-01',
            name: 'Core UPI Switch Gateway (api.neo.bank)',
            category: 'API_GATEWAY',
            ipAddress: '10.14.0.12',
            department: 'Payments Engineering',
            criticalityScore: 9.8,
            exposureLevel: 'INTERNET_FACING',
            vulnerabilitiesCount: { critical: 2, high: 3, medium: 4, low: 1 },
            mfaEnabled: true,
            edrActive: true,
            lastBackupHoursAgo: 2,
            healthScore: 54,
            owner: 'sre-payments@neobank.in'
        },
        {
            id: 'ast-bnk-02',
            name: 'Customer PII & Account Master PostgreSQL DB',
            category: 'DATABASE',
            ipAddress: '10.14.2.45',
            department: 'Data Infrastructure',
            criticalityScore: 9.5,
            exposureLevel: 'INTERNAL_DMZ',
            vulnerabilitiesCount: { critical: 1, high: 2, medium: 5, low: 2 },
            mfaEnabled: false,
            edrActive: true,
            lastBackupHoursAgo: 14,
            healthScore: 62,
            owner: 'dba-lead@neobank.in'
        },
        {
            id: 'ast-bnk-03',
            name: 'Corporate Active Directory Domain Controller (DC-01)',
            category: 'IDENTITY_DC',
            ipAddress: '10.10.1.10',
            department: 'Corporate IT',
            criticalityScore: 9.2,
            exposureLevel: 'INTERNAL_DMZ',
            vulnerabilitiesCount: { critical: 2, high: 4, medium: 2, low: 3 },
            mfaEnabled: false,
            edrActive: false,
            lastBackupHoursAgo: 48,
            healthScore: 42,
            owner: 'sysadmin@neobank.in'
        },
        {
            id: 'ast-bnk-04',
            name: 'SWIFT Settlement & RTGS Bridge Node',
            category: 'CORE_BANKING',
            ipAddress: '10.14.5.88',
            department: 'Treasury & Settlement',
            criticalityScore: 9.9,
            exposureLevel: 'ISOLATED_VLAN',
            vulnerabilitiesCount: { critical: 0, high: 1, medium: 2, low: 0 },
            mfaEnabled: true,
            edrActive: true,
            lastBackupHoursAgo: 4,
            healthScore: 88,
            owner: 'treasury-ops@neobank.in'
        },
        {
            id: 'ast-bnk-05',
            name: 'Customer Support Portal & Admin CRM',
            category: 'CLOUD_INFRA',
            ipAddress: '10.12.8.21',
            department: 'Operations',
            criticalityScore: 7.4,
            exposureLevel: 'INTERNET_FACING',
            vulnerabilitiesCount: { critical: 1, high: 5, medium: 6, low: 4 },
            mfaEnabled: true,
            edrActive: false,
            lastBackupHoursAgo: 72,
            healthScore: 48,
            owner: 'ops-admin@neobank.in'
        }
    ],
    HEALTHCARE: [
        {
            id: 'ast-hlt-01',
            name: 'Epic EHR Central Database Cluster',
            category: 'EHR_HEALTH',
            ipAddress: '172.16.4.10',
            department: 'Clinical Informatics',
            criticalityScore: 9.7,
            exposureLevel: 'INTERNAL_DMZ',
            vulnerabilitiesCount: { critical: 2, high: 3, medium: 2, low: 1 },
            mfaEnabled: false,
            edrActive: true,
            lastBackupHoursAgo: 26,
            healthScore: 51,
            owner: 'ehr-sysadmin@apexhospital.org'
        },
        {
            id: 'ast-hlt-02',
            name: 'PACS Medical Imaging & DICOM Gateway',
            category: 'DATABASE',
            ipAddress: '172.16.5.22',
            department: 'Radiology IT',
            criticalityScore: 8.9,
            exposureLevel: 'INTERNET_FACING',
            vulnerabilitiesCount: { critical: 3, high: 4, medium: 1, low: 2 },
            mfaEnabled: false,
            edrActive: false,
            lastBackupHoursAgo: 96,
            healthScore: 36,
            owner: 'radiology-tech@apexhospital.org'
        },
        {
            id: 'ast-hlt-03',
            name: 'ICU Patient Telemetry Monitoring Server',
            category: 'ENDPOINT',
            ipAddress: '172.16.8.50',
            department: 'Critical Care Operations',
            criticalityScore: 9.9,
            exposureLevel: 'ISOLATED_VLAN',
            vulnerabilitiesCount: { critical: 0, high: 1, medium: 3, low: 1 },
            mfaEnabled: true,
            edrActive: true,
            lastBackupHoursAgo: 6,
            healthScore: 82,
            owner: 'biomed-eng@apexhospital.org'
        }
    ],
    ENTERPRISE_SAAS: [
        {
            id: 'ast-sas-01',
            name: 'AWS Production EKS Master Cluster',
            category: 'CLOUD_INFRA',
            ipAddress: '10.200.1.5',
            department: 'Cloud Platform',
            criticalityScore: 9.6,
            exposureLevel: 'INTERNAL_DMZ',
            vulnerabilitiesCount: { critical: 2, high: 4, medium: 5, low: 2 },
            mfaEnabled: true,
            edrActive: true,
            lastBackupHoursAgo: 3,
            healthScore: 58,
            owner: 'platform-lead@cloudscale.io'
        },
        {
            id: 'ast-sas-02',
            name: 'Public Customer REST / GraphQL API Gateway',
            category: 'API_GATEWAY',
            ipAddress: '52.76.110.42',
            department: 'Core Product',
            criticalityScore: 9.4,
            exposureLevel: 'INTERNET_FACING',
            vulnerabilitiesCount: { critical: 1, high: 3, medium: 7, low: 3 },
            mfaEnabled: true,
            edrActive: false,
            lastBackupHoursAgo: 12,
            healthScore: 61,
            owner: 'api-team@cloudscale.io'
        }
    ],
    HIGHER_EDUCATION: [
        {
            id: 'ast-edu-01',
            name: 'Central Examination & Student ERP System',
            category: 'DATABASE',
            ipAddress: '192.168.10.5',
            department: 'University Registrar',
            criticalityScore: 9.1,
            exposureLevel: 'INTERNET_FACING',
            vulnerabilitiesCount: { critical: 3, high: 5, medium: 8, low: 2 },
            mfaEnabled: false,
            edrActive: false,
            lastBackupHoursAgo: 120,
            healthScore: 32,
            owner: 'registrar-it@nist.ac.in'
        }
    ],
    CRITICAL_INFRASTRUCTURE: [
        {
            id: 'ast-inf-01',
            name: 'SCADA Energy Grid RTU Master Gateway',
            category: 'CORE_BANKING',
            ipAddress: '10.50.0.1',
            department: 'Grid Operations Control',
            criticalityScore: 10.0,
            exposureLevel: 'INTERNAL_DMZ',
            vulnerabilitiesCount: { critical: 1, high: 2, medium: 1, low: 0 },
            mfaEnabled: true,
            edrActive: true,
            lastBackupHoursAgo: 8,
            healthScore: 71,
            owner: 'grid-master@powercorp.gov.in'
        }
    ]
};
export const INITIAL_VULNERABILITIES = [
    {
        id: 'vuln-01',
        cveId: 'CVE-2024-3094',
        title: 'XZ Utils Backdoor Remote Code Execution',
        description: 'Malicious code injected into upstream tarballs allowing unauthorized SSH authentication bypass and arbitrary code execution.',
        severity: 'CRITICAL',
        cvssScore: 10.0,
        affectedAssetId: 'ast-bnk-01',
        affectedAssetName: 'Core UPI Switch Gateway',
        exploitAvailableInWild: true,
        patchAvailable: true,
        discoveredAt: '2026-03-12T04:20:00Z',
        remediationAction: 'Downgrade/recompile liblzma5 to 5.6.1-patch or upgrade to non-tampered repository release.',
        estimatedFixHours: 4,
        riskReductionPoints: 14.5,
        status: 'OPEN'
    },
    {
        id: 'vuln-02',
        cveId: 'CVE-2024-21413',
        title: 'Microsoft Outlook / Active Directory NTLM Relay Elevation',
        description: 'Improper parsing of Moniker links enables remote unauthenticated attackers to trigger automatic NTLM hash exfiltration and relaying against DC.',
        severity: 'CRITICAL',
        cvssScore: 9.8,
        affectedAssetId: 'ast-bnk-03',
        affectedAssetName: 'Corporate Active Directory Domain Controller (DC-01)',
        exploitAvailableInWild: true,
        patchAvailable: true,
        discoveredAt: '2026-03-10T11:00:00Z',
        remediationAction: 'Deploy Microsoft Security Update KB5035227 and disable outgoing SMB NTLM relay on boundary.',
        estimatedFixHours: 8,
        riskReductionPoints: 11.2,
        status: 'OPEN'
    },
    {
        id: 'vuln-03',
        cveId: 'CVE-2023-48795',
        title: 'Terrapin SSH Protocol Prefix Truncation Attack',
        description: 'Cryptographic vulnerability in SSH protocol state machine allowing MiTM attackers to tamper with sequence numbers and disable keystroke timing obfuscation.',
        severity: 'HIGH',
        cvssScore: 7.5,
        affectedAssetId: 'ast-bnk-02',
        affectedAssetName: 'Customer PII & Account Master PostgreSQL DB',
        exploitAvailableInWild: false,
        patchAvailable: true,
        discoveredAt: '2026-03-01T14:30:00Z',
        remediationAction: 'Enforce strict KEX extension negotiation mode across all production OpenSSH daemons.',
        estimatedFixHours: 6,
        riskReductionPoints: 6.8,
        status: 'OPEN'
    },
    {
        id: 'vuln-04',
        cveId: 'CVE-2024-27198',
        title: 'JetBrains TeamCity / CI-CD Auth Bypass to Admin RCE',
        description: 'Authentication bypass issue in TeamCity web server enables creation of rogue admin accounts and unauthenticated remote code execution in pipeline runners.',
        severity: 'CRITICAL',
        cvssScore: 9.8,
        affectedAssetId: 'ast-bnk-05',
        affectedAssetName: 'Customer Support Portal & Admin CRM',
        exploitAvailableInWild: true,
        patchAvailable: true,
        discoveredAt: '2026-03-14T08:15:00Z',
        remediationAction: 'Upgrade CI runner images to version 2023.11.4 and revoke any newly created admin tokens.',
        estimatedFixHours: 3,
        riskReductionPoints: 8.5,
        status: 'OPEN'
    },
    {
        id: 'vuln-05',
        cveId: 'CVE-2023-44487',
        title: 'HTTP/2 Rapid Reset Distributed Denial of Service',
        description: 'RST_STREAM frame multiplexing abuse causes massive CPU spike on load balancers and reverse proxies without triggering standard rate limits.',
        severity: 'HIGH',
        cvssScore: 7.5,
        affectedAssetId: 'ast-bnk-01',
        affectedAssetName: 'Core UPI Switch Gateway',
        exploitAvailableInWild: true,
        patchAvailable: true,
        discoveredAt: '2026-02-28T09:00:00Z',
        remediationAction: 'Enable Cloudflare/AWS WAF HTTP/2 frame inspection rule and limit max concurrent streams.',
        estimatedFixHours: 2,
        riskReductionPoints: 5.0,
        status: 'OPEN'
    }
];
export const INITIAL_CONTROLS = [
    {
        id: 'ctrl-01',
        name: 'Privileged Access Multi-Factor Authentication (FIDO2 / Hardware Token)',
        category: 'IDENTITY',
        coveragePercentage: 58,
        isMandatory: true,
        standardAlignment: ['RBI CSF Annex 1 (Identity)', 'CERT-In Mandate Sec 4', 'ISO 27001 A.9.4'],
        health: 'DEGRADED',
        lastAudited: '3 days ago'
    },
    {
        id: 'ctrl-02',
        name: 'Endpoint Detection & Response (EDR / XDR Agent Telemetry)',
        category: 'ENDPOINT',
        coveragePercentage: 74,
        isMandatory: true,
        standardAlignment: ['CERT-In 6-hour Incident Reporting', 'NIST CSF PR.PT-1'],
        health: 'DEGRADED',
        lastAudited: '1 day ago'
    },
    {
        id: 'ctrl-03',
        name: 'Immutable Air-Gapped Disaster Recovery Backups (3-2-1-1 Rule)',
        category: 'BACKUP',
        coveragePercentage: 62,
        isMandatory: true,
        standardAlignment: ['RBI Cyber Security Framework Sec 7 (Ransomware Resilience)', 'ISO 27001 A.12.3'],
        health: 'DEGRADED',
        lastAudited: '4 days ago'
    },
    {
        id: 'ctrl-04',
        name: 'Cloud Security Posture Management (CSPM & Secrets Scanner)',
        category: 'CLOUD_INFRA',
        coveragePercentage: 45,
        isMandatory: false,
        standardAlignment: ['CIS AWS Benchmark v2.0', 'SOC 2 Type II CC6.1'],
        health: 'CRITICAL_GAP',
        lastAudited: '7 days ago'
    },
    {
        id: 'ctrl-05',
        name: 'Continuous Vulnerability & Exposure Management (CVEM)',
        category: 'NETWORK',
        coveragePercentage: 88,
        isMandatory: true,
        standardAlignment: ['PCI-DSS v4.0 Req 6.3', 'CERT-In Guidelines'],
        health: 'OPTIMAL',
        lastAudited: '12 hours ago'
    }
];
export const INITIAL_INCIDENTS = [
    {
        id: 'inc-901',
        title: 'High-Frequency NTLM Relay Authentication Spray on Domain Controller',
        category: 'Active Directory / Credential Attack',
        severity: 'CRITICAL',
        affectedAssets: ['ast-bnk-03'],
        status: 'ACTIVE_TRIAGE',
        detectedAt: '28 mins ago',
        impactSummary: 'Over 4,200 failed Kerberos/NTLM authentication requests originating from staging subnet targeting Domain Admin accounts.',
        assignedEngineer: 'Aman V. (Lead SOC Analyst)'
    },
    {
        id: 'inc-902',
        title: 'Suspicious Base64 Encoded Outbound Connection to Known C2 IP',
        category: 'Command & Control Beacon',
        severity: 'HIGH',
        affectedAssets: ['ast-bnk-01'],
        status: 'ACTIVE_TRIAGE',
        detectedAt: '1 hour ago',
        impactSummary: 'Firewall flagged 18 periodic beacon pulses to 194.26.29.112 over port 443 with abnormal TLS fingerprint.',
        assignedEngineer: 'Pooja R. (Threat Hunter)'
    }
];
export const SECURITY_ACTIONS_CATALOG = [
    {
        id: 'act-patch-rce',
        title: 'Emergency Critical Vulnerability Patching (XZ Utils & NTLM Relay)',
        category: 'PATCHING',
        description: 'Deploy hotfixes for CVE-2024-3094 and CVE-2024-21413 across UPI Gateway and Active Directory Domain Controllers with regression testing.',
        costInINR: 180000, // ₹1,80,000
        estimatedRiskReduction: 16.5,
        timeToImplementWeeks: 1,
        targetedVulnerabilityIds: ['vuln-01', 'vuln-02'],
        targetedAssetIds: ['ast-bnk-01', 'ast-bnk-03'],
        roiEfficiency: 9.17, // 16.5 / 1.8 Lakhs
        complianceTags: ['CERT-In Mandate', 'RBI CSF Sec 5'],
        isRecommended: true,
        priorityTier: 'TIER_1_MUST_HAVE'
    },
    {
        id: 'act-fido2-mfa',
        title: 'Enforce Hardware FIDO2 / Passkey MFA on All Privileged Accounts',
        category: 'MFA_IDENTITY',
        description: 'Procure and enforce YubiKey / WebAuthn hardware tokens for all 45 domain admins, DBA root accounts, and DevOps engineers.',
        costInINR: 120000, // ₹1,20,000
        estimatedRiskReduction: 9.4,
        timeToImplementWeeks: 2,
        roiEfficiency: 7.83,
        complianceTags: ['RBI Annex 1 (Zero Trust Identity)', 'ISO 27001 A.9'],
        isRecommended: true,
        priorityTier: 'TIER_1_MUST_HAVE'
    },
    {
        id: 'act-airgap-backup',
        title: 'Air-Gapped Immutable Ransomware-Proof Backup Appliance',
        category: 'BACKUP_DISASTER',
        description: 'Implement WORM (Write Once Read Many) immutable AWS S3 Object Lock & off-site cold storage with automated daily integrity tests.',
        costInINR: 140000, // ₹1,40,000
        estimatedRiskReduction: 8.2,
        timeToImplementWeeks: 3,
        roiEfficiency: 5.86,
        complianceTags: ['RBI CSF Sec 7', 'NIST CSF PR.IP-4'],
        isRecommended: true,
        priorityTier: 'TIER_1_MUST_HAVE'
    },
    {
        id: 'act-edr-expansion',
        title: 'Expand EDR/XDR Telemetry Coverage to 100% of Production Nodes',
        category: 'EDR_COVERAGE',
        description: 'Deploy lightweight CrowdStrike / SentinelOne sensor daemon across unmonitored DMZ jump servers, databases, and container pods.',
        costInINR: 90000, // ₹90,000
        estimatedRiskReduction: 6.5,
        timeToImplementWeeks: 1,
        roiEfficiency: 7.22,
        complianceTags: ['CERT-In 6-Hour Alerting', 'PCI-DSS Req 5'],
        isRecommended: true,
        priorityTier: 'TIER_2_HIGH_ROI'
    },
    {
        id: 'act-cloud-cspm',
        title: 'Automated Cloud Security Posture Management & Drift Detection',
        category: 'CLOUD_CSPM',
        description: 'Integrate real-time IAM misconfiguration scanner, public S3 bucket quarantine, and secret exposure monitoring for GitHub & AWS.',
        costInINR: 75000, // ₹75,000
        estimatedRiskReduction: 4.8,
        timeToImplementWeeks: 1,
        roiEfficiency: 6.40,
        complianceTags: ['CIS AWS Benchmark', 'SOC 2 Type II'],
        isRecommended: false,
        priorityTier: 'TIER_2_HIGH_ROI'
    },
    {
        id: 'act-human-training',
        title: 'Simulated Phishing & High-Risk Role Security Awareness Campaign',
        category: 'TRAINING',
        description: 'Conduct interactive spear-phishing drills, executive credential hygiene coaching, and quarterly incident response tabletop exercises.',
        costInINR: 45000, // ₹45,000
        estimatedRiskReduction: 3.2,
        timeToImplementWeeks: 4,
        roiEfficiency: 7.11,
        complianceTags: ['ISO 27001 A.7.2.2', 'RBI Cyber Training Mandate'],
        isRecommended: false,
        priorityTier: 'TIER_3_COMPREHENSIVE'
    },
    {
        id: 'act-waf-ddos',
        title: 'Next-Gen Web Application Firewall (WAF) & API Rate Limiter',
        category: 'FIREWALL_WAF',
        description: 'Upgrade boundary edge with automated HTTP/2 Rapid Reset mitigation, bot management, and OWASP API Top 10 anomaly protection.',
        costInINR: 110000, // ₹1,10,000
        estimatedRiskReduction: 5.6,
        timeToImplementWeeks: 2,
        targetedVulnerabilityIds: ['vuln-05'],
        roiEfficiency: 5.09,
        complianceTags: ['PCI-DSS Req 6.4', 'CERT-In Edge Protection'],
        isRecommended: false,
        priorityTier: 'TIER_2_HIGH_ROI'
    },
    {
        id: 'act-zero-trust-net',
        title: 'Micro-segmentation & Zero Trust Network Access (ZTNA) Gateway',
        category: 'ZERO_TRUST',
        description: 'Isolate East-West traffic between core database tier and web frontend; eliminate legacy perimeter VPN in favor of identity-aware proxy.',
        costInINR: 220000, // ₹2,20,000
        estimatedRiskReduction: 9.8,
        timeToImplementWeeks: 6,
        roiEfficiency: 4.45,
        complianceTags: ['NIST SP 800-207', 'RBI Cyber Framework Sec 4'],
        isRecommended: false,
        priorityTier: 'TIER_3_COMPREHENSIVE'
    }
];
