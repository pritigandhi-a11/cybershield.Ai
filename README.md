# CyberShield AI: Continuous Cyber Risk Quantification & Investment Optimization Platform

CyberShield AI is an enterprise decision-making and cyber risk management platform that continuously ingests security telemetry, calculates a deterministic quantified risk score ($0-100$), prioritizes critical remediation actions, optimizes security budgets in Indian Rupees (₹) using a knapsack ROI solver ("Risk-to-Rupee Engine"), and anchors assessment snapshots onto an immutable blockchain audit ledger.

---

## 🚀 Core Architecture & Capabilities

1. **AI Telemetry & Ingestion Studio**:
   - Ingests raw logs from Firewalls, EDR (CrowdStrike), Active Directory, CloudTrail, and Snort IDS.
   - Normalizes events and correlates multi-stage MITRE ATT&CK attack chains.
   - 1-Click Cyber Attack Simulators (LockBit 3.0 Ransomware, Log4Shell RCE, Credential Stuffing).

2. **Transparent Mathematical Risk Engine ($0-100$)**:
   - Deterministic 6-factor weighted quantification (Zero AI Hallucination):
     - Vulnerability Exposure (25%)
     - Threat Activity Telemetry (20%)
     - Asset Criticality & Value (20%)
     - Security Controls Gap (15%)
     - Incident History (10%)
     - Environmental / Network Exposure (10%)
   - Interactive weight customizer and 30-day trajectory analytics.

3. **Risk Prioritization & Remediation Queue**:
   - 2x2 Impact vs. Effort Remediation Matrix.
   - Ranked CVE backlog with 1-click patch application.
   - Active SOC Incident Action Center.

4. **"Risk-to-Rupee" Investment Optimizer**:
   - Interactive budget slider (₹50k to ₹10 Lakhs).
   - Solves bounded knapsack ROI optimization to maximize risk reduction points per ₹1 Lakh.
   - Interactive What-If Before vs. After simulation and Diminishing Returns Pareto Curve.
   - Board-Ready Executive Investment Pitch Export.

5. **Blockchain Audit & Integrity Layer**:
   - SHA-256 Merkle chain anchoring with consensus signatures.
   - Tamper-evident cryptographic inspector with simulation mode.
   - Downloadable & printable Tamper-Evident Cyber Risk Audit Certificate.

6. **Grounded AI Security Copilot**:
   - Real-time conversational advisory grounded in active organizational metrics.
   - Optional Google Gemini API integration support.

---

## 🛠️ Getting Started

```bash
# Clone and install dependencies
cd cyber-risk-platform
npm install

# Start development server
npm run dev

# Production build
npm run build
```
