export const trustItems = [
  "Protocol Risk",
  "Smart Contract Risk",
  "Digital Asset Risk",
  "Cross-Chain Risk",
  "Operational Risk",
];

export const steps = [
  {
    step: "01",
    title: "Submit Your Protocol",
    description:
      "Provide architecture, contracts, audits, TVL, governance and security information.",
  },
  {
    step: "02",
    title: "Underwrite the Risk",
    description:
      "Our framework evaluates technical, economic, governance and operational risk factors.",
  },
  {
    step: "03",
    title: "Receive a Proposal",
    description:
      "Review available coverage, limits, pricing, deductibles and policy conditions.",
  },
  {
    step: "04",
    title: "Manage Your Coverage",
    description:
      "Monitor policy status, risk information, incidents and claims through your account.",
  },
];

export const riskFactors = [
  { label: "Smart Contract", value: 78 },
  { label: "Governance", value: 69 },
  { label: "Oracle Dependency", value: 74 },
  { label: "Liquidity", value: 81 },
  { label: "Operational Controls", value: 76 },
];

export const riskInputs = [
  "Smart contract architecture",
  "Audit history",
  "Governance controls",
  "Admin privileges",
  "Oracle dependencies",
  "Liquidity",
  "TVL concentration",
  "Cross-chain dependencies",
  "Infrastructure dependencies",
  "Operational controls",
  "Incident history",
];

export const monitoringAlerts = [
  {
    text: "Governance configuration changed",
    tag: "Governance",
    severity: "Elevated",
  },
  { text: "New administrator detected", tag: "Access", severity: "Material" },
  { text: "Oracle dependency increased", tag: "Oracle", severity: "Elevated" },
  {
    text: "TVL concentration increased",
    tag: "Liquidity",
    severity: "Moderate",
  },
  { text: "Contract upgrade detected", tag: "Code", severity: "Material" },
];

export const audiences = [
  "DeFi Protocols",
  "DAOs",
  "Foundations",
  "Stablecoin Issuers",
  "Exchanges",
  "Bridges",
  "Custodians",
  "Infrastructure Providers",
  "Institutional Digital-Asset Platforms",
];

export const pillars = [
  {
    title: "Institutional Underwriting",
    description:
      "Disciplined risk assessment built for complex digital infrastructure.",
    icon: "underwriting",
  },
  {
    title: "Web3-Native Expertise",
    description:
      "Deep understanding of smart contracts, governance, digital assets and protocol architecture.",
    icon: "expertise",
  },
  {
    title: "Data-Driven Risk Intelligence",
    description:
      "Continuous visibility into the factors that influence protocol risk.",
    icon: "data",
  },
  {
    title: "Clear Policy Frameworks",
    description:
      "Defined coverage, limits, conditions, exclusions and claims procedures.",
    icon: "policy",
  },
];

export const transparencyItems = [
  {
    label: "Underwriting Methodology",
    href: "/legal/underwriting-methodology",
  },
  { label: "Policy Documentation", href: "/legal" },
  { label: "Coverage Disclosures", href: "/legal/coverage-disclosures" },
  { label: "Claims Process", href: "/legal/claims-procedure" },
  { label: "Security Practices", href: "/legal/security-practices" },
  { label: "Risk Disclosures", href: "/legal/risk-disclosures" },
  { label: "Capital & Capacity", href: "/legal/capital-capacity" },
  { label: "Regulatory Information", href: "/legal/regulatory" },
  { label: "Governance", href: "/legal/governance" },
  { label: "Partners & Reinsurance", href: "/legal/partners-reinsurance" },
];
