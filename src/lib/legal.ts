export type LegalSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type LegalDoc = {
  slug: string;
  title: string;
  intro: string;
  updated: string;
  category?: "core" | "transparency";
  sections: LegalSection[];
};

const UPDATED = "24 August 2026";

export const legalDocs: LegalDoc[] = [
  {
    slug: "privacy",
    title: "Privacy Notice",
    updated: UPDATED,
    intro:
      "This notice provides general information about personal data submitted through this website. Transaction-specific notices and documentation may provide additional information.",
    sections: [
      {
        heading: "1. Information submitted through the site",
        paragraphs: [
          "The assessment and incident-notification forms collect the contact, organization, protocol, risk, policy-reference, and incident information entered by the user. Hosting, security, and delivery systems may also process technical request information needed to operate and protect the site.",
          "Do not submit seed phrases, private keys, passwords, signing requests, privileged credentials, undisclosed vulnerabilities, or other secrets through a public form. Use an authenticated channel identified in relevant transaction documentation for sensitive material.",
        ],
      },
      {
        heading: "2. Purposes",
        paragraphs: [
          "Submitted information may be used to route and review an enquiry, conduct a preliminary underwriting review, process an initial incident notification, maintain records, protect the site, and meet applicable legal requirements. A website submission does not determine insurance coverage or satisfy every transaction-specific requirement.",
        ],
      },
      {
        heading: "3. Recipients",
        paragraphs: [
          "Information may be processed by service providers that operate the website or configured intake systems. For a specific transaction or incident, information may also be shared as needed with the parties and professional advisers identified by, or necessary for, that matter, subject to applicable documentation and law.",
          "Do not assume that a carrier, broker, administrator, investigator, adviser, or other third party will receive a website submission unless that is confirmed through an authorized channel.",
        ],
      },
      {
        heading: "4. Retention and location",
        paragraphs: [
          "Retention and processing location depend on the configured service providers, the purpose of the submission, applicable law, and any transaction-specific requirements. Information should not be submitted unless it is appropriate for those purposes.",
        ],
      },
      {
        heading: "5. Requests and contact",
        paragraphs: [
          "Privacy rights vary by jurisdiction. Use a configured public contact route on this site or the contact route in relevant transaction documentation to make a privacy enquiry. Additional identity verification may be required before a request is processed.",
        ],
      },
      {
        heading: "6. Security limitations",
        paragraphs: [
          "Internet transmission and storage involve risk. The website is not an appropriate channel for credentials or highly sensitive security material, and no public website can guarantee absolute confidentiality or security.",
        ],
      },
    ],
  },
  {
    slug: "terms",
    title: "Terms of Use",
    updated: UPDATED,
    intro:
      "These terms apply to use of this public website. They do not govern an insurance transaction or replace transaction-specific documentation.",
    sections: [
      {
        heading: "1. General information",
        paragraphs: [
          "Website content is general information, not insurance, legal, tax, financial, security, or investment advice. It is not an offer, quotation, binder, policy, or commitment to provide insurance coverage.",
        ],
      },
      {
        heading: "2. Transaction documentation",
        paragraphs: [
          "Authorization, entity, carrier, administrator, product, jurisdiction, and insurance coverage facts for a transaction are stated in the relevant transaction documents. Website summaries do not establish or amend those facts. Transaction documents control coverage.",
        ],
      },
      {
        heading: "3. Website use",
        paragraphs: [
          "Users should provide accurate information, avoid unlawful or disruptive use, and avoid submitting credentials or material they are not authorized to disclose. Access to a public page does not grant access to a policyholder system or confidential information.",
        ],
      },
      {
        heading: "4. Accuracy and availability",
        paragraphs: [
          "Content may be incomplete, become outdated, or be revised. The website may be unavailable or contain links to third-party resources. Users should verify material facts through authorized transaction channels before relying on them.",
        ],
      },
      {
        heading: "5. Applicable terms",
        paragraphs: [
          "Any additional legal terms, governing law, dispute process, limitation period, or liability allocation applicable to an insurance or service relationship must be determined from the documentation governing that relationship, not from this general page.",
        ],
      },
    ],
  },
  {
    slug: "policy-terms",
    title: "Coverage Documentation Overview",
    updated: UPDATED,
    intro:
      "This non-binding overview identifies subjects commonly addressed in insurance documentation. It does not describe an issued policy or create insurance coverage, exclusions, duties, or rights.",
    sections: [
      {
        heading: "1. Transaction parties and scope",
        paragraphs: [
          "Documentation may identify relevant entities, insured interests, scheduled contracts, wallets, assets, networks, dependencies, and the period of insurance. The applicable transaction documents provide the authoritative scope.",
        ],
      },
      {
        heading: "2. Event and loss definitions",
        paragraphs: [
          "Documentation may define relevant events, causation, discovery, evidence, valuation, aggregation, and recovery treatment. Similar terminology can have different meanings in different transactions.",
        ],
      },
      {
        heading: "3. Financial parameters",
        paragraphs: [
          "Limits, sublimits, deductibles, waiting periods, coinsurance, and other retentions are transaction-specific. No amount or structure displayed on this website applies unless included in issued documentation.",
        ],
      },
      {
        heading: "4. Exclusions and conditions",
        paragraphs: [
          "Issued documentation may contain exclusions, notice provisions, information requirements, change provisions, mitigation requirements, evidence requirements, and other conditions. This overview does not state what applies to a particular transaction.",
        ],
      },
      {
        heading: "5. Controlling documents",
        paragraphs: [
          "The relevant binder, schedule, policy wording, endorsements, certificates, and other authorized transaction documents determine the parties' rights and obligations. Transaction documents control coverage.",
        ],
      },
    ],
  },
  {
    slug: "coverage-disclosures",
    title: "Coverage Disclosures",
    updated: UPDATED,
    intro:
      "These disclosures explain the limited role of public program information. They are not transaction terms.",
    sections: [
      {
        heading: "1. Underwriting is required",
        paragraphs: [
          "A submission may be considered in a preliminary underwriting review. It does not establish eligibility, availability, price, limits, wording, or insurance coverage.",
        ],
      },
      {
        heading: "2. Coverage is transaction-specific",
        paragraphs: [
          "Potential insurance coverage depends on the applicable parties, jurisdiction, risk, underwriting decision, and issued documentation. Public program categories are only general risk-area summaries.",
        ],
      },
      {
        heading: "3. Claims are not predetermined",
        paragraphs: [
          "An incident notification, risk assessment, or reference to a program does not determine whether a loss is covered or payable. Any determination must be made under the applicable transaction documents and facts.",
        ],
      },
      {
        heading: "4. Changes and dependencies",
        paragraphs: [
          "Changes to code, architecture, governance, assets, custody, dependencies, or controls may alter risk. Any reporting or approval requirements are found in issued documentation.",
        ],
      },
    ],
  },
  {
    slug: "claims-procedure",
    title: "Claims Procedure",
    updated: UPDATED,
    intro:
      "This page provides general incident-notification guidance. It does not replace the notice channels, deadlines, procedures, or requirements in issued documentation.",
    sections: [
      {
        heading: "1. Use the required notice channel",
        paragraphs: [
          "Follow the notice instructions in the issued policy, binder, schedule, or administrator documentation. If those documents identify a carrier, broker, administrator, portal, email address, or other channel, use that channel within the stated time. Do not rely on this website as the only notice method unless the issued documentation expressly permits it.",
        ],
      },
      {
        heading: "2. Safety, mitigation, and deadlines",
        paragraphs: [
          "Prioritize safety and reasonable containment and mitigation. Do not delay action or a required notice while completing a web form. A website submission does not extend a deadline, waive a requirement, or satisfy a proof-of-loss obligation.",
        ],
      },
      {
        heading: "3. Preserve information securely",
        paragraphs: [
          "Preserve relevant system state, logs, transaction records, communications, approvals, custody records, valuation information, and recovery evidence. Do not submit private keys, seed phrases, passwords, signing requests, privileged credentials, or confidential evidence through a public form.",
        ],
      },
      {
        heading: "4. Review under issued documentation",
        paragraphs: [
          "The responsible parties, review process, requested evidence, loss assessment, and any coverage decision depend on the transaction documents and facts. Initial receipt is not confirmation of insurance coverage or payment.",
        ],
      },
    ],
  },
  {
    slug: "risk-disclosures",
    title: "Risk Disclosures",
    updated: UPDATED,
    intro:
      "Digital-asset protocols and infrastructure involve technical, economic, operational, legal, and market risks. These disclosures are general information, not advice.",
    sections: [
      {
        heading: "1. Technical and operational risk",
        paragraphs: [
          "Code defects, access-control failures, key compromise, configuration error, governance action, and operational failures can cause irreversible or difficult-to-recover outcomes. Audits and controls reduce some risks but do not eliminate them.",
        ],
      },
      {
        heading: "2. Dependency and concentration risk",
        paragraphs: [
          "Oracles, bridges, networks, sequencers, validators, custodians, service providers, liquidity venues, and other protocols can create correlated or cascading exposures.",
        ],
      },
      {
        heading: "3. Economic and market risk",
        paragraphs: [
          "Volatility, illiquidity, depeg, liquidation, incentive design, bad debt, counterparty failure, and market manipulation can produce losses that differ from technical exploit losses.",
        ],
      },
      {
        heading: "4. Legal and regulatory uncertainty",
        paragraphs: [
          "Legal characterization, enforceability, sanctions, authorization, tax, and regulatory treatment can vary by asset, activity, party, and jurisdiction and may change over time.",
        ],
      },
      {
        heading: "5. Role of insurance",
        paragraphs: [
          "Insurance coverage can address only defined risks under issued documentation. It does not certify security, eliminate risk, guarantee recovery, or replace governance, security engineering, operational controls, or incident response.",
        ],
      },
    ],
  },
  {
    slug: "regulatory",
    title: "Regulatory and Licensing Information",
    updated: UPDATED,
    intro:
      "This website does not state that any unspecified entity holds a license or authorization or that any product is available in a particular jurisdiction.",
    sections: [
      {
        heading: "1. Transaction-specific facts",
        paragraphs: [
          "The relevant transaction documentation should identify the contracting entities, product, carrier or capacity provider where applicable, intermediaries or administrators where applicable, and jurisdiction-specific information.",
        ],
      },
      {
        heading: "2. Authorization and availability",
        paragraphs: [
          "Authorization and product-availability requirements vary by jurisdiction and transaction. No inference about licensing, authorization, passporting, or permitted activity should be drawn from a website page or brand name.",
        ],
      },
      {
        heading: "3. Verification",
        paragraphs: [
          "Prospective counterparties should review transaction documentation, applicable public registers, and information supplied through authorized channels. Obtain independent advice where appropriate.",
        ],
      },
      {
        heading: "4. Enquiries",
        paragraphs: [
          "Use a configured public contact route or the contact identified in transaction documentation for regulatory or compliance enquiries. Do not send confidential regulatory material through an unverified channel.",
        ],
      },
    ],
  },
  {
    slug: "underwriting-methodology",
    title: "Underwriting Methodology",
    updated: UPDATED,
    category: "transparency",
    intro:
      "This overview identifies information that may be considered in a preliminary underwriting review. It is not a scoring model, eligibility rule, or commitment to provide insurance coverage.",
    sections: [
      {
        heading: "1. Information domains",
        paragraphs: [
          "A review may consider architecture, deployed code, audit and remediation history, economic design, governance, privileges, liquidity, dependencies, operations, incident history, custody, and requested risk boundaries.",
        ],
      },
      {
        heading: "2. Evidence and limitations",
        paragraphs: [
          "Submitted, public, on-chain, and third-party information may be incomplete, delayed, inaccurate, or difficult to attribute. Indicators and models do not replace review of context and evidence.",
        ],
      },
      {
        heading: "3. Review status",
        paragraphs: [
          "Online submission and information review do not produce a score, eligibility decision, insurance coverage, or terms. Any proposal would require separate authorization and transaction documentation.",
        ],
      },
    ],
  },
  {
    slug: "security-practices",
    title: "Website Security Information",
    updated: UPDATED,
    category: "transparency",
    intro:
      "This page provides user guidance for handling information on the public website. It is not a security certification or description of transaction-specific controls.",
    sections: [
      {
        heading: "1. Public-form boundaries",
        paragraphs: [
          "Use public forms only for the requested intake fields. Do not send credentials, signing requests, private keys, seed phrases, passwords, undisclosed vulnerabilities, or confidential evidence.",
        ],
      },
      {
        heading: "2. Verify channels",
        paragraphs: [
          "Verify portal links, contact addresses, and requests through known transaction channels. Do not approve a transaction or disclose access material in response to an unexpected message.",
        ],
      },
      {
        heading: "3. Security limitations",
        paragraphs: [
          "No website or transmission method is risk-free. Transaction-specific security requirements and evidence-transfer methods should be obtained from authorized documentation or contacts.",
        ],
      },
    ],
  },
  {
    slug: "capital-capacity",
    title: "Capacity Information",
    updated: UPDATED,
    category: "transparency",
    intro:
      "This website does not state available insurance capacity, capital support, carrier participation, or reinsurance for a transaction.",
    sections: [
      {
        heading: "1. No website allocation",
        paragraphs: [
          "A program page, assessment request, or preliminary discussion does not reserve capacity or establish a limit. No website amount applies to a transaction.",
        ],
      },
      {
        heading: "2. Transaction documentation",
        paragraphs: [
          "If applicable, transaction documentation should identify the relevant carrier or participation structure, limits, and other capacity facts. Those facts should not be inferred from general website language.",
        ],
      },
      {
        heading: "3. Counterparty review",
        paragraphs: [
          "Prospective counterparties should conduct their own review of the entities and documentation relevant to a proposed transaction and seek independent advice where appropriate.",
        ],
      },
    ],
  },
  {
    slug: "governance",
    title: "Governance Information",
    updated: UPDATED,
    category: "transparency",
    intro:
      "This page explains that authority for a transaction must be verified from authorized documentation. It does not make claims about a particular corporate structure or committee process.",
    sections: [
      {
        heading: "1. Authorized documentation",
        paragraphs: [
          "Only communications and documents issued through an authorized transaction process should be relied on for a quotation, binder, policy, endorsement, claims decision, or other formal action.",
        ],
      },
      {
        heading: "2. Verification",
        paragraphs: [
          "Users should verify the identity and authority of transaction participants and should not treat a website statement, model output, or informal message as approval of insurance coverage or a policy change.",
        ],
      },
      {
        heading: "3. Transaction controls",
        paragraphs: [
          "Any applicable review, referral, recordkeeping, conflict, or approval requirements are matters for the relevant entities and transaction documentation.",
        ],
      },
    ],
  },
  {
    slug: "partners-reinsurance",
    title: "Partners and Risk Transfer",
    updated: UPDATED,
    category: "transparency",
    intro:
      "This website does not identify or imply a carrier, reinsurer, broker, adviser, or service-provider relationship unless that relationship is expressly stated and approved for public display.",
    sections: [
      {
        heading: "1. Transaction participants",
        paragraphs: [
          "A transaction may involve different entities and professional service providers. Their identity, role, authority, and obligations must be determined from transaction-specific documentation.",
        ],
      },
      {
        heading: "2. Risk-transfer arrangements",
        paragraphs: [
          "Any insurance, coinsurance, reinsurance, or other risk-transfer structure is transaction-specific. This page does not assert that any such arrangement exists or grants rights to a website user.",
        ],
      },
      {
        heading: "3. Public references",
        paragraphs: [
          "Names, marks, transactions, or relationships should be displayed only with appropriate factual verification and approval. Absence from the website does not establish whether a relationship exists.",
        ],
      },
    ],
  },
];

export function getLegalDoc(slug: string) {
  return legalDocs.find((d) => d.slug === slug);
}
