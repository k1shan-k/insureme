export const trustItems = [
  "Protocol architecture",
  "Smart-contract code",
  "Digital-asset exposure",
  "External dependencies",
  "Operational controls",
];

export const steps = [
  {
    step: "01",
    title: "Submit information",
    description:
      "Provide architecture, contracts, audits, governance, dependencies and requested coverage information.",
  },
  {
    step: "02",
    title: "Manual underwriting review",
    description:
      "A human underwriter reviews a complete submission and sends the assessment and quotation within 24 hours. If more information is required, the submitter receives a status update within that period. No automated score is produced.",
  },
  {
    step: "03",
    title: "Consider terms",
    description:
      "If the risk can be considered, proposed scope, limits, pricing, retentions and conditions are documented.",
  },
  {
    step: "04",
    title: "Complete placement",
    description:
      "Any coverage and its effective date are stated in authorized transaction documents.",
  },
];

export const assessmentAreas = [
  {
    label: "Technical architecture",
    description:
      "Contract design, upgradeability, audits and implementation history.",
  },
  {
    label: "Governance and control",
    description:
      "Privileges, timelocks, decision rights and operational authority.",
  },
  {
    label: "Economic exposure",
    description: "Liquidity, concentration, incentives and loss pathways.",
  },
  {
    label: "External dependencies",
    description:
      "Oracles, bridges, custodians, infrastructure and counterparties.",
  },
  {
    label: "Incident readiness",
    description:
      "Monitoring, response, evidence preservation and recovery controls.",
  },
];

export const riskInputs = [
  "Smart-contract architecture",
  "Audit and remediation history",
  "Governance controls",
  "Administrative privileges",
  "Oracle dependencies",
  "Liquidity profile",
  "Concentration risk",
  "Cross-chain dependencies",
  "Infrastructure dependencies",
  "Operational controls",
  "Incident history",
];

export const materialChangeExamples = [
  { text: "Governance or voting configuration", tag: "Governance" },
  { text: "Administrator, signer or privilege changes", tag: "Access" },
  { text: "New or materially changed oracle dependency", tag: "Oracle" },
  { text: "Material liquidity or concentration change", tag: "Liquidity" },
  { text: "Contract deployment, upgrade or migration", tag: "Code" },
];

export const audiences = [
  "DeFi protocols",
  "Decentralized organizations",
  "Foundations",
  "Stablecoin issuers",
  "Digital-asset platforms",
  "Bridge operators",
  "Custodians",
  "Infrastructure providers",
];

export const pillars = [
  {
    title: "Structured assessment",
    description:
      "Technical, economic, governance and operational evidence reviewed within a defined underwriting process.",
    icon: "underwriting",
  },
  {
    title: "Protocol context",
    description:
      "Coverage discussions reflect deployed code, control structures, dependencies and loss pathways.",
    icon: "expertise",
  },
  {
    title: "Explicit boundaries",
    description:
      "Schedules, triggers, limits, retentions, exclusions and conditions define the scope of an issued policy.",
    icon: "policy",
  },
  {
    title: "Documented claims process",
    description:
      "Incident notice, evidence, investigation and loss assessment follow the applicable policy documentation.",
    icon: "data",
  },
];

export const transparencyItems = [
  {
    label: "Underwriting methodology",
    href: "/legal/underwriting-methodology",
  },
  { label: "General policy structure", href: "/legal/policy-terms" },
  { label: "Coverage disclosures", href: "/legal/coverage-disclosures" },
  { label: "Claims procedure", href: "/legal/claims-procedure" },
  { label: "Security practices", href: "/legal/security-practices" },
  { label: "Risk disclosures", href: "/legal/risk-disclosures" },
  { label: "Capital and capacity", href: "/legal/capital-capacity" },
  { label: "Regulatory information", href: "/legal/regulatory" },
  { label: "Corporate governance", href: "/legal/governance" },
  { label: "Partners and reinsurance", href: "/legal/partners-reinsurance" },
];
