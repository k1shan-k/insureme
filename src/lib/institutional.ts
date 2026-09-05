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
    title: "Underwriting for digital-asset protocols and infrastructure.",
    eyebrow: "About Prime Insurances",
    intro:
      "Prime Insurances evaluates defined technical, economic and operational exposures and structures insurance coverage around documented policy boundaries.",
    sections: [
      {
        heading: "Purpose",
        paragraphs: [
          "Digital-asset systems combine deployed code, governance, liquidity, custody and external infrastructure. Insurance can transfer selected risks only when the relevant assets, systems, triggers and loss measures are defined clearly.",
          "Our role is to assess the information presented, determine whether a risk can be considered and document any proposed coverage in terms that identify what is included and excluded.",
        ],
      },
      {
        heading: "Assessment approach",
        paragraphs: [
          "A review may consider contract architecture, audit and remediation history, administrative privileges, governance, liquidity, dependencies, incident history and operational controls.",
        ],
        items: [
          "Defined coverage triggers",
          "Scheduled assets and systems",
          "Evidence-based risk review",
          "Material-change obligations",
        ],
      },
      {
        heading: "Scope of insurance",
        paragraphs: [
          "Insurance does not replace security engineering, governance or incident response. Coverage applies only as stated in authorized policy documentation and remains subject to its limits, retentions, exclusions and conditions.",
        ],
      },
    ],
    cta: { label: "View coverage areas", href: "/insurance" },
  },
  {
    slug: "leadership",
    title: "Governance and decision authority.",
    eyebrow: "Corporate governance",
    intro:
      "Authority for an insurance transaction should be verified from authorized documentation and communications.",
    sections: [
      {
        heading: "Transaction authority",
        paragraphs: [
          "Users should verify the identity and authority of transaction participants. Quotations, binders, policies, endorsements, claims decisions, and other formal actions should be relied on only when issued through an authorized transaction process.",
        ],
      },
      {
        heading: "Verification considerations",
        paragraphs: [
          "The relevant entities and transaction documents determine which review and decision controls apply to a matter.",
        ],
        items: [
          "Identity and role of transaction participants",
          "Authority for quotations and binders",
          "Authority for policy changes and claims decisions",
          "Applicable referral and approval requirements",
          "Applicable recordkeeping and conflict requirements",
        ],
      },
      {
        heading: "Documentation and communications",
        paragraphs: [
          "Any applicable review, referral, recordkeeping, conflict, or approval requirements are matters for the relevant entities and transaction documentation. A website statement, informal communication, or model output should not be treated as approval of insurance coverage or a policy change.",
        ],
      },
    ],
    cta: { label: "Read governance information", href: "/legal/governance" },
  },
  {
    slug: "careers",
    title: "Careers in digital-asset insurance and risk.",
    eyebrow: "Careers",
    intro:
      "Prime Insurances considers candidates with experience in underwriting, protocol security, claims, insurance law and risk data.",
    sections: [
      {
        heading: "Professional disciplines",
        paragraphs: [
          "The work requires clear written reasoning, careful treatment of evidence and the ability to distinguish measurable exposure from unresolved uncertainty.",
        ],
        items: [
          "Insurance underwriting",
          "Protocol and application security",
          "Claims and forensic analysis",
          "Insurance product counsel",
          "Risk data engineering",
        ],
      },
      {
        heading: "Current opportunities",
        paragraphs: [
          "Open roles are communicated through authorized Prime Insurances channels. Unsolicited material should not contain confidential information, credentials or details of undisclosed vulnerabilities.",
        ],
      },
    ],
    cta: { label: "About Prime Insurances", href: "/company/about" },
  },
];

export const resourcePages: InstitutionalPage[] = [
  {
    slug: "insights",
    title: "Operational topics that affect insurability.",
    eyebrow: "Risk topics",
    intro:
      "A reference overview of protocol changes, controls and evidence that may affect underwriting or an issued policy.",
    sections: [
      {
        heading: "Topics for protocol operators",
        paragraphs: [
          "The significance of a change depends on the insured environment and the applicable policy. Material matters should be reported using the process stated in the policy documentation.",
        ],
        items: [
          "Changes to governance or administrative privilege",
          "Contract upgrades and migrations",
          "New dependencies and concentration",
          "Incident response and evidence preservation",
          "Loss measurement, limits and retentions",
        ],
      },
      {
        heading: "Use of this information",
        paragraphs: [
          "These topics are general information. They are not underwriting decisions, security certifications, investment recommendations or amendments to policy terms.",
        ],
      },
    ],
    cta: { label: "Read risk disclosures", href: "/legal/risk-disclosures" },
  },
  {
    slug: "research",
    title: "Evidence used in protocol risk assessment.",
    eyebrow: "Research approach",
    intro:
      "Observable data can support underwriting when its source, context, limitations and relevance to the insured exposure are understood.",
    sections: [
      {
        heading: "Assessment domains",
        paragraphs: [
          "Technical and on-chain indicators are considered alongside documentation, interviews and underwriting judgment.",
        ],
        items: [
          "Contract deployments and change history",
          "Privilege and governance concentration",
          "Liquidity and exposure concentration",
          "Oracle, bridge and infrastructure dependencies",
          "Incident propagation and recovery",
        ],
      },
      {
        heading: "Data limitations",
        paragraphs: [
          "On-chain and third-party data may be incomplete, delayed, manipulated or difficult to attribute. No indicator is a guarantee of security, eligibility, performance or claim outcome.",
        ],
      },
    ],
    cta: {
      label: "Read the underwriting methodology",
      href: "/legal/underwriting-methodology",
    },
  },
  {
    slug: "risk-reports",
    title: "Information structure for protocol risk reporting.",
    eyebrow: "Reporting framework",
    intro:
      "A structured report can organize material architecture, control and dependency information for underwriting and governance review.",
    sections: [
      {
        heading: "Report content",
        paragraphs: [
          "The scope of a report depends on the engagement, available evidence and intended use.",
        ],
        items: [
          "Architecture and deployed contracts",
          "Material-change record",
          "Dependency and concentration map",
          "Control observations",
          "Items requiring underwriting referral",
        ],
      },
      {
        heading: "No certification or rating",
        paragraphs: [
          "A risk report is not an audit, security certification, financial rating, warranty or decision to provide coverage. Findings may change when information or the assessed environment changes.",
        ],
      },
    ],
    cta: {
      label: "Request a preliminary assessment",
      href: "/risk-assessment",
    },
  },
];

export function getCompanyPage(slug: string) {
  return companyPages.find((page) => page.slug === slug);
}

export function getResourcePage(slug: string) {
  return resourcePages.find((page) => page.slug === slug);
}
