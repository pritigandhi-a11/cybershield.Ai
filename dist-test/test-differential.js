import { calculateQuantifiedCyberRisk } from './services/riskEngine.js';
import { cybersecurityRepository } from './services/dataRepository.js';
const orgs = [
    { id: 'org-fintech-01', name: 'Banking & FinTech', key: 'BANKING_FINTECH' },
    { id: 'org-health-01', name: 'Healthcare & Hospitals', key: 'HEALTHCARE' },
    { id: 'org-saas-01', name: 'Enterprise Cloud SaaS', key: 'ENTERPRISE_SAAS' },
    { id: 'org-edu-01', name: 'Higher Education', key: 'HIGHER_EDUCATION' },
    { id: 'org-infra-01', name: 'Critical Energy Grid', key: 'CRITICAL_INFRASTRUCTURE' }
];
console.log('================================================================');
console.log('STEP 4.2 DIFFERENTIAL DATA-FLOW VERIFICATION RUN');
console.log('================================================================\n');
for (const org of orgs) {
    const assets = cybersecurityRepository.getAssets(org.id);
    const vulns = cybersecurityRepository.getVulnerabilities(org.id);
    const controls = cybersecurityRepository.getSecurityControls(org.id);
    const incidents = cybersecurityRepository.getIncidents(org.id);
    const events = cybersecurityRepository.getTelemetryEvents(org.id);
    const initial = calculateQuantifiedCyberRisk(assets, vulns, incidents, controls, events);
    console.log(`>>> [ORGANIZATION: ${org.name} (${org.id})] <<<`);
    console.log('Initial Overall Risk Score:', initial.overallScore, `(${initial.riskBand})`);
    console.log('Six-Factor Breakdown:');
    console.log('  1. Vulnerability Exposure (25%):', initial.factors.vulnerabilityExposure.score, `-> Contribution: ${initial.factors.vulnerabilityExposure.weightedContribution} pts`);
    console.log('  2. Threat Activity        (20%):', initial.factors.threatActivity.score, `-> Contribution: ${initial.factors.threatActivity.weightedContribution} pts`);
    console.log('  3. Asset Criticality      (20%):', initial.factors.assetCriticality.score, `-> Contribution: ${initial.factors.assetCriticality.weightedContribution} pts`);
    console.log('  4. Controls Gap           (15%):', initial.factors.securityControlsGap.score, `-> Contribution: ${initial.factors.securityControlsGap.weightedContribution} pts`);
    console.log('  5. Incident History       (10%):', initial.factors.incidentHistory.score, `-> Contribution: ${initial.factors.incidentHistory.weightedContribution} pts`);
    console.log('  6. Environmental Exposure (10%):', initial.factors.environmentalExposure.score, `-> Contribution: ${initial.factors.environmentalExposure.weightedContribution} pts`);
    const openVulns = vulns.filter(v => v.status !== 'REMEDIATED');
    const criticalVulns = openVulns.filter(v => v.severity === 'CRITICAL');
    const avgCoverage = Math.round(controls.reduce((a, c) => a + (c.coveragePercentage || 0), 0) / Math.max(1, controls.length));
    console.log('KPI Inventory Counts:');
    console.log('  - Total Assets:', assets.length);
    console.log('  - Open Vulnerabilities:', openVulns.length);
    console.log('  - Critical Vulnerabilities:', criticalVulns.length);
    console.log('  - Ingested Telemetry Events:', events.length);
    console.log('  - Active Incidents:', incidents.filter(i => i.status !== 'CLOSED').length);
    console.log('  - Control Coverage:', `${avgCoverage}%`);
    // Safe Mutation: Inject 1 Critical CVE into this specific organization's repository
    const newCve = {
        id: `vuln-diff-test-${org.id}`,
        assetId: assets[0]?.id || 'ast-01',
        affectedAssetId: assets[0]?.id || 'ast-01',
        affectedAssetName: assets[0]?.name || 'Perimeter Gateway',
        title: `[TEST MUTATION] Unauthenticated Zero-Day RCE in ${org.name}`,
        cveId: `CVE-2026-${Math.floor(10000 + Math.random() * 80000)}`,
        severity: 'CRITICAL',
        cvssScore: 10.0,
        exploitAvailableInWild: true,
        patchAvailable: false,
        discoveredAt: new Date().toISOString(),
        status: 'OPEN',
        remediationAction: 'Emergency kernel patch',
        riskReductionPoints: 16
    };
    cybersecurityRepository.addVulnerability(org.id, newCve);
    // Re-read updated repository collection
    const updatedVulns = cybersecurityRepository.getVulnerabilities(org.id);
    const postMutation = calculateQuantifiedCyberRisk(assets, updatedVulns, incidents, controls, events);
    console.log('Post-Mutation Overall Risk (after injecting 1 Critical CVE):', postMutation.overallScore, `(${postMutation.riskBand})`);
    console.log('Vulnerability Factor Delta:', `${initial.factors.vulnerabilityExposure.score} -> ${postMutation.factors.vulnerabilityExposure.score} (+${postMutation.factors.vulnerabilityExposure.score - initial.factors.vulnerabilityExposure.score} pts)`);
    console.log('Overall Risk Delta:', `${initial.overallScore} -> ${postMutation.overallScore} (${postMutation.overallScore >= initial.overallScore ? '+' : ''}${postMutation.overallScore - initial.overallScore} pts)`);
    console.log('----------------------------------------------------------------\n');
}
