export const site = {
  name: "Meridian Risk",
  legalName: "Meridian Risk Underwriting Ltd.",
  tagline: "Insurance infrastructure for the decentralized economy.",
  year: 2026,
  email: "underwriting@meridianrisk.example",
  phone: "+1 (212) 555-0180",
  address: "One Financial Square, New York, NY 10004",
};

export const primaryNav: { label: string; href: string }[] = [
  { label: "Insurance", href: "/#coverage" },
  { label: "Risk Intelligence", href: "/#risk-intelligence" },
  { label: "For Protocols", href: "/#for-protocols" },
  { label: "Claims", href: "/#claims" },
  { label: "Resources", href: "/#trust" },
  { label: "About", href: "/#why-us" },
];

export const footerColumns: {
  heading: string;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/#why-us" },
      { label: "Leadership", href: "/#trust" },
      { label: "Careers", href: "/#trust" },
      { label: "Contact", href: "/risk-assessment" },
    ],
  },
  {
    heading: "Insurance",
    links: [
      { label: "Coverage", href: "/#coverage" },
      { label: "For Protocols", href: "/#for-protocols" },
      { label: "Risk Intelligence", href: "/#risk-intelligence" },
      { label: "Claims", href: "/legal/claims-procedure" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "/#trust" },
      { label: "Research", href: "/#trust" },
      { label: "Risk Reports", href: "/#risk-intelligence" },
      { label: "Documentation", href: "/legal/coverage-disclosures" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of Use", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Policy Terms", href: "/legal/policy-terms" },
      { label: "Disclosures", href: "/legal/coverage-disclosures" },
      { label: "Regulatory Information", href: "/legal/regulatory" },
    ],
  },
];


