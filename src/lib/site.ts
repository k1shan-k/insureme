export const site = {
  name: "Prime Insurances",
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "",
  tagline: "Insurance and underwriting for digital-asset risk.",
  year: new Date().getUTCFullYear(),
  email: process.env.NEXT_PUBLIC_UNDERWRITING_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_UNDERWRITING_PHONE || "",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "",
  clientServicesEmail: process.env.NEXT_PUBLIC_CLIENT_SERVICES_EMAIL || "",
};

export const primaryNav: { label: string; href: string }[] = [
  { label: "Insurance", href: "/insurance" },
  { label: "Underwriting", href: "/#risk-intelligence" },
  { label: "Who we serve", href: "/#for-protocols" },
  { label: "Claims", href: "/claims/notify" },
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
      { label: "Governance", href: "/company/leadership" },
      { label: "Careers", href: "/company/careers" },
      { label: "Request an assessment", href: "/risk-assessment" },
    ],
  },
  {
    heading: "Insurance",
    links: [
      { label: "Coverage areas", href: "/insurance" },
      { label: "Who we serve", href: "/#for-protocols" },
      { label: "Underwriting approach", href: "/#risk-intelligence" },
      { label: "Notify an incident", href: "/claims/notify" },
      { label: "Claims procedure", href: "/legal/claims-procedure" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { label: "Risk topics", href: "/resources/insights" },
      { label: "Research approach", href: "/resources/research" },
      { label: "Reporting framework", href: "/resources/risk-reports" },
      { label: "Legal and disclosures", href: "/legal" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Terms of use", href: "/legal/terms" },
      { label: "Privacy policy", href: "/legal/privacy" },
      { label: "General policy structure", href: "/legal/policy-terms" },
      { label: "Coverage disclosures", href: "/legal/coverage-disclosures" },
      { label: "Regulatory information", href: "/legal/regulatory" },
    ],
  },
];
