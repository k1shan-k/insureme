export type InstitutionalPage = {
  slug: string;
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; paragraphs: string[]; items?: string[] }[];
  cta: { label: string; href: string };
};

export const companyPages: InstitutionalPage[] = [
  {
    slug: "about",
    title: "Risk discipline for decentralized infrastructure.",
    eyebrow: "About Meridian Risk",
    intro:
      "Meridian Risk is an underwriting organization focused on defined risks across protocols, digital assets and the infrastructure supporting on-chain finance.",
    sections: [
      {
        heading: "Our mandate",
        paragraphs: [
          "We exist to translate complex on-chain risks into clearly bounded insurance structures. Our approach combines technical review, financial analysis, governance assessment and conventional insurance discipline.",
          "We do not treat insurance as a substitute for security. Coverage is one component of a broader risk-management programme and is offered only where the risk can be sufficiently understood, priced and documented.",
        ],
      },
      {
        heading: "How we work",
        paragraphs: [
          "Every engagement begins with protocol architecture and control information. Underwriting considers code, dependencies, liquidity, governance, operational controls and prior incidents before terms are considered.",
        ],
        items: [
          "Defined coverage triggers",
          "Scheduled assets and infrastructure",
          "Evidence-based risk selection",
          "Ongoing material-change reporting",
        ],
      },
      {
        heading: "Institutional orientation",
        paragraphs: [
          "Our policies, claims framework and communications are designed for treasury teams, foundations, boards and institutional counterparties that require clear accountability and documented decision-making.",
        ],
      },
    ],
    cta: { label: "Explore insurance programs", href: "/insurance" },
  },
  {
    slug: "leadership",
    title: "Governance built around underwriting accountability.",
    eyebrow: "Leadership & governance",
    intro:
      "Meridian Risk separates commercial, underwriting, risk and claims responsibilities through defined authority, referral and oversight structures.",
    sections: [
      {
        heading: "Underwriting authority",
        paragraphs: [
          "Risk acceptance is governed by documented authority levels. Complex, novel or concentrated risks are referred for additional technical, legal and capital review before any terms may be authorized.",
        ],
      },
      {
        heading: "Oversight model",
        paragraphs: [
          "Our operating model is designed around independent challenge and written records rather than individual discretion.",
        ],
        items: [
          "Underwriting committee",
          "Technical risk review",
          "Claims and coverage review",
          "Compliance and regulatory oversight",
          "Capital and accumulation monitoring",
        ],
      },
      {
        heading: "Conflicts and conduct",
        paragraphs: [
          "Potential conflicts are expected to be identified, documented and managed. No governance description on this website changes the authority or obligations stated in an issued policy or applicable law.",
        ],
      },
    ],
    cta: { label: "Review governance disclosures", href: "/legal/governance" },
  },
  {
    slug: "careers",
    title: "Work at the intersection of insurance and on-chain systems.",
    eyebrow: "Careers",
    intro:
      "We are interested in disciplined operators who can move between technical evidence, financial exposure and precise policy language.",
    sections: [
      {
        heading: "What we value",
        paragraphs: [
          "Meridian Risk values intellectual honesty, written reasoning, careful risk selection and a willingness to say no where uncertainty cannot be bounded.",
        ],
        items: [
          "Underwriting judgement",
          "Protocol security expertise",
          "Claims and forensic analysis",
          "Insurance product counsel",
          "Risk data engineering",
        ],
      },
      {
        heading: "Open enquiries",
        paragraphs: [
          "We do not publish speculative vacancies. Qualified candidates may use the configured careers contact when available and provide a concise introduction with relevant work. Receipt does not create an employment relationship or obligation to respond.",
        ],
      },
    ],
    cta: { label: "Learn about Meridian", href: "/company/about" },
  },
];

export const resourcePages: InstitutionalPage[] = [
  {
    slug: "insights",
    title: "Practical perspectives on protocol risk.",
    eyebrow: "Insights",
    intro:
      "Short-form analysis for protocol operators, treasury teams and institutional counterparties considering insurance and risk transfer.",
    sections: [
      {
        heading: "Current themes",
        paragraphs: [
          "Our insight framework focuses on questions that directly affect insurability rather than market commentary or token promotion.",
        ],
        items: [
          "Material change after policy inception",
          "Governance and administrative privilege",
          "Evidence preservation after an incident",
          "Dependency concentration",
          "Limits, retentions and loss measurement",
        ],
      },
      {
        heading: "Information standard",
        paragraphs: [
          "Insight materials are general information only. They are not underwriting decisions, security certifications, investment recommendations or amendments to policy wording.",
        ],
      },
    ],
    cta: { label: "Review risk disclosures", href: "/legal/risk-disclosures" },
  },
  {
    slug: "research",
    title: "Research for measurable on-chain exposure.",
    eyebrow: "Research",
    intro:
      "Our research agenda examines how observable protocol characteristics can support disciplined underwriting without substituting model output for judgement.",
    sections: [
      {
        heading: "Research domains",
        paragraphs: [
          "We prioritize repeatable methods, explicit assumptions and explainable indicators.",
        ],
        items: [
          "Smart-contract change frequency",
          "Privilege and governance concentration",
          "Liquidity and TVL concentration",
          "Oracle and bridge dependencies",
          "Incident propagation and recovery",
        ],
      },
      {
        heading: "Limitations",
        paragraphs: [
          "On-chain data can be incomplete, delayed, manipulated or difficult to attribute. Research indicators are inputs to underwriting and are not guarantees of security, performance, eligibility or claim outcome.",
        ],
      },
    ],
    cta: {
      label: "View underwriting methodology",
      href: "/legal/underwriting-methodology",
    },
  },
  {
    slug: "risk-reports",
    title: "Structured reporting for changing protocol risk.",
    eyebrow: "Risk reports",
    intro:
      "Risk reports organize material protocol characteristics and changes into an institutional format for review and escalation.",
    sections: [
      {
        heading: "Report framework",
        paragraphs: [
          "Illustrative reports may include architecture, controls, dependencies, concentration, governance, upgrades and incident history. Scope varies by engagement and available information.",
        ],
        items: [
          "Protocol risk profile",
          "Material-change log",
          "Dependency map",
          "Control observations",
          "Underwriting referrals",
        ],
      },
      {
        heading: "No certification",
        paragraphs: [
          "A risk report is not an audit, security certification, rating, warranty or promise of coverage. Meridian Risk may revise an assessment as information, methodology or market conditions change.",
        ],
      },
    ],
    cta: { label: "Start a protocol assessment", href: "/risk-assessment" },
  },
];

export function getCompanyPage(slug: string) {
  return companyPages.find((page) => page.slug === slug);
}

export function getResourcePage(slug: string) {
  return resourcePages.find((page) => page.slug === slug);
}
