export type LegalSection = { heading: string; paragraphs: string[]; list?: string[] };

export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
};

const UPDATED = "1 January 2026";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: UPDATED,
    intro:
      "This Privacy Policy explains how Meridian Risk Underwriting Ltd. and its affiliates collect, use, disclose and safeguard information in connection with our website, underwriting and risk-intelligence activities.",
    sections: [
      {
        heading: "1. Information we collect",
        paragraphs: [
          "We collect information you provide directly — such as contact details, protocol information and correspondence — as well as information generated through your use of our website and services.",
        ],
        list: [
          "Identity and contact information provided in enquiries or applications.",
          "Protocol and organizational information submitted for risk assessment.",
          "Technical data such as IP address, device and browser information.",
          "Publicly available on-chain data relevant to underwriting and monitoring.",
        ],
      },
      {
        heading: "2. How we use information",
        paragraphs: [
          "We use information to assess risk, provide and administer coverage, communicate with counterparties, meet legal and regulatory obligations, and improve our services. We process personal data only where we have a lawful basis to do so.",
        ],
      },
      {
        heading: "3. Sharing and disclosure",
        paragraphs: [
          "We may share information with affiliates, reinsurers, service providers, professional advisers, and regulatory or governmental authorities where permitted or required. We do not sell personal information.",
        ],
      },
      {
        heading: "4. Data retention",
        paragraphs: [
          "We retain information for as long as necessary to fulfil the purposes described in this policy, including to satisfy legal, regulatory, accounting and reporting requirements.",
        ],
      },
      {
        heading: "5. Your rights",
        paragraphs: [
          "Subject to applicable law, you may have rights to access, correct, delete or restrict the processing of your personal data. Requests can be directed to our contact address below.",
        ],
      },
      {
        heading: "6. Security",
        paragraphs: [
          "We maintain administrative, technical and organizational measures designed to protect information. No method of transmission or storage is entirely secure, and we cannot guarantee absolute security.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    updated: UPDATED,
    intro:
      "These Terms of Use govern your access to and use of this website. By accessing the website you agree to these terms.",
    sections: [
      {
        heading: "1. Informational purpose",
        paragraphs: [
          "The content of this website is provided for general information only. It does not constitute an offer to sell, or a solicitation to buy, any insurance product, nor does it constitute financial, legal, tax or investment advice.",
        ],
      },
      {
        heading: "2. No binding coverage",
        paragraphs: [
          "Nothing on this website creates a contract of insurance or a binding commitment to provide coverage. Coverage is available only pursuant to a policy issued following underwriting and subject to its terms, conditions, limits and exclusions.",
        ],
      },
      {
        heading: "3. Intellectual property",
        paragraphs: [
          "All content, trademarks and materials on this website are owned by or licensed to Meridian Risk and are protected by applicable intellectual property laws. You may not reproduce or distribute them without permission.",
        ],
      },
      {
        heading: "4. Limitation of liability",
        paragraphs: [
          "To the fullest extent permitted by law, Meridian Risk shall not be liable for any loss or damage arising from reliance on information contained on this website.",
        ],
      },
      {
        heading: "5. Governing law",
        paragraphs: [
          "These terms are governed by the laws of the jurisdiction in which the relevant Meridian Risk entity is established, without regard to conflict-of-law principles.",
        ],
      },
    ],
  },
  {
    slug: "policy-terms",
    title: "Insurance Policy Terms",
    updated: UPDATED,
    intro:
      "This page summarizes the framework of definitions, conditions, limits, deductibles and exclusions that structure our insurance policies. The controlling terms are those set out in the issued policy documentation.",
    sections: [
      {
        heading: "1. Structure of a policy",
        paragraphs: [
          "Each policy comprises a schedule, definitions, insuring clauses, conditions, exclusions and endorsements. Coverage applies only to losses that fall within the insuring clauses and are not otherwise excluded.",
        ],
      },
      {
        heading: "2. Limits and deductibles",
        paragraphs: [
          "Policies specify aggregate and per-event limits, sub-limits, deductibles and retentions. Amounts payable are subject to these figures and to any applicable co-insurance.",
        ],
      },
      {
        heading: "3. Conditions",
        paragraphs: [
          "Coverage is conditional on matters including accurate disclosure, ongoing compliance with agreed security and governance controls, timely notification of incidents, and cooperation during investigation.",
        ],
      },
      {
        heading: "4. Exclusions",
        paragraphs: [
          "Policies contain exclusions which may include, among others, losses arising from undisclosed material facts, fraud or collusion by insured parties, sanctioned activity, and events outside defined coverage triggers.",
        ],
      },
      {
        heading: "5. Interpretation",
        paragraphs: [
          "In the event of any inconsistency between this summary and the issued policy documentation, the issued policy documentation prevails.",
        ],
      },
    ],
  },
  {
    slug: "coverage-disclosures",
    title: "Coverage Disclosures",
    updated: UPDATED,
    intro:
      "These disclosures describe important limitations and conditions applicable to our coverage products. They should be read together with the applicable policy documentation.",
    sections: [
      {
        heading: "1. Coverage is defined and conditional",
        paragraphs: [
          "Our products provide coverage for specifically defined risks. Coverage varies by product, risk profile and policy conditions. Specific exclusions, limits and deductibles apply.",
        ],
      },
      {
        heading: "2. No guarantee of payment",
        paragraphs: [
          "The existence of a policy does not guarantee payment of any particular claim. Claims are assessed against the policy terms, and payment depends on whether the loss falls within coverage and satisfies applicable conditions.",
        ],
      },
      {
        heading: "3. Underwriting dependency",
        paragraphs: [
          "Availability, scope and pricing of coverage are determined through underwriting and may change based on the information provided and the assessed risk of the insured environment.",
        ],
      },
      {
        heading: "4. Material change",
        paragraphs: [
          "Material changes to an insured protocol — including to architecture, governance, dependencies or controls — may affect coverage and must be disclosed in accordance with policy conditions.",
        ],
      },
    ],
  },
  {
    slug: "claims-procedure",
    title: "Claims Procedure",
    updated: UPDATED,
    intro:
      "This page describes the structured process our claims framework is designed to follow. It is a general description and does not modify the terms of any issued policy.",
    sections: [
      {
        heading: "1. Notification",
        paragraphs: [
          "Insured parties should notify us of a potential claim or incident as soon as reasonably practicable, and in any event within any period specified in the policy. Timely notification is a condition of coverage.",
        ],
      },
      {
        heading: "2. Evidence preservation",
        paragraphs: [
          "We provide guidance on preserving relevant on-chain and off-chain evidence. Prompt preservation supports an accurate and efficient assessment.",
        ],
      },
      {
        heading: "3. Investigation",
        paragraphs: [
          "We conduct a technical and factual review of the incident against the policy terms. This may involve independent experts and cooperation from the insured.",
        ],
      },
      {
        heading: "4. Loss assessment and resolution",
        paragraphs: [
          "Where a loss is determined to fall within coverage, we assess the quantum in accordance with the policy and resolve the claim. We do not offer guaranteed or automatic payouts; each claim is assessed on its merits.",
        ],
      },
    ],
  },
  {
    slug: "risk-disclosures",
    title: "Risk Disclosures",
    updated: UPDATED,
    intro:
      "These disclosures concern the risks associated with digital assets, decentralized protocols and related infrastructure. They are provided for information and do not constitute advice.",
    sections: [
      {
        heading: "1. Nature of digital-asset risk",
        paragraphs: [
          "Digital assets and decentralized protocols are subject to significant technical, economic, operational, regulatory and market risks. These risks may be novel, rapidly evolving and difficult to quantify.",
        ],
      },
      {
        heading: "2. Smart contract and protocol risk",
        paragraphs: [
          "Smart contracts may contain vulnerabilities. Protocol behaviour may deviate from intended design. Audits and reviews reduce but do not eliminate risk.",
        ],
      },
      {
        heading: "3. Interconnection risk",
        paragraphs: [
          "Protocols depend on external components such as oracles, bridges and liquidity venues. A failure in one component may propagate across interconnected systems.",
        ],
      },
      {
        heading: "4. No elimination of risk",
        paragraphs: [
          "Insurance transfers certain defined risks subject to policy terms; it does not eliminate underlying risk. Insured parties remain responsible for their own risk management.",
        ],
      },
    ],
  },
  {
    slug: "regulatory",
    title: "Regulatory / Licensing Information",
    updated: UPDATED,
    intro:
      "This page provides information regarding the regulatory status, licensing and structure of the Meridian Risk group of companies.",
    sections: [
      {
        heading: "1. Group structure",
        paragraphs: [
          "Meridian Risk operates through a group of companies, which may include licensed insurance and reinsurance entities and service companies. The entity providing a given product is identified in the relevant policy documentation.",
        ],
      },
      {
        heading: "2. Licensing and authorization",
        paragraphs: [
          "Insurance products are offered only in jurisdictions and through entities authorized to provide them. Availability of coverage varies by jurisdiction and is subject to applicable regulatory requirements.",
        ],
      },
      {
        heading: "3. Capital and capacity",
        paragraphs: [
          "Our capacity is supported by capital and reinsurance arrangements maintained in accordance with applicable regulatory and prudential requirements. Details are provided to counterparties as part of underwriting where appropriate.",
        ],
      },
      {
        heading: "4. Contact",
        paragraphs: [
          "For regulatory or compliance enquiries, please contact our office using the details provided on this website.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
