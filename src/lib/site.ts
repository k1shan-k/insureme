export const site = {
  name: "Meridian Risk",
  legalName: "Meridian Risk Underwriting Ltd.",
  tagline: "Insurance infrastructure for the decentralized economy.",
  year: 2026,
  email: process.env.NEXT_PUBLIC_UNDERWRITING_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_UNDERWRITING_PHONE || "",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "",
};

export const primaryNav: { label: string; href: string }[] = [
  { label: "Insurance", href: "/insurance" },
  { label: "Risk Intelligence", href: "/#risk-intelligence" },
  { label: "For Protocols", href: "/#for-protocols" },
  { label: "Claims", href: "/legal/claims-procedure" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/company/about" },
];

export const footerColumns: {
  heading: string;
  links: { label: string; href: string }[];
}[] = [
  {
    heading: "Company",
    links: [
      { label: "About", href: "/company/about" },
      { label: "Leadership", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
      { label: "Contact", href: "/risk-assessment#contact" },
    ],
  },
  {
    heading: "Insurance",
    links: [
      { label: "Programs", href: "/insurance" },
      { label: "For Protocols", href: "/#for-protocols" },
      { label: "Risk Intelligence", href: "/#risk-intelligence" },
      { label: "Claims", href: "/legal/claims-procedure" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Insights", href: "/resources/insights" },
      { label: "Research", href: "/resources/research" },
      { label: "Risk Reports", href: "/resources/risk-reports" },
      { label: "Documentation", href: "/legal" },
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
