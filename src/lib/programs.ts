export type ProgramSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type InsuranceProgram = {
  index: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  strapline: string;
  designedFor: string[];
  indicativeTriggers: string[];
  programExclusions: string[];
  requiredInformation: string[];
  terms: ProgramSection[];
};

export type PolicyFrameworkParameter = {
  index: string;
  name: string;
  question: string;
  description: string;
  schedule: string;
};

export const policyFrameworkParameters: PolicyFrameworkParameter[] = [
  {
    index: "01",
    name: "Coverage boundary",
    question: "What may be scheduled?",
    description:
      "Relevant entities, contracts, wallets, assets, networks, dependencies, and operating arrangements.",
    schedule: "Any applicable boundary is stated in transaction documents",
  },
  {
    index: "02",
    name: "Event definition",
    question: "What event may be addressed?",
    description:
      "An event definition may address cause, evidence, timing, discovery, and the relationship to loss.",
    schedule: "Any covered event is defined in transaction documents",
  },
  {
    index: "03",
    name: "Limit structure",
    question: "What financial parameters may apply?",
    description:
      "Potential parameters include event and aggregate limits, sublimits, and participation percentages.",
    schedule: "No amount displayed on this website applies to a transaction",
  },
  {
    index: "04",
    name: "Retention",
    question: "What amount may remain with the insured?",
    description:
      "Potential structures include deductibles, waiting periods, thresholds, and coinsurance.",
    schedule: "Any applicable retention is stated in transaction documents",
  },
  {
    index: "05",
    name: "Valuation method",
    question: "How may loss be measured?",
    description:
      "Relevant considerations may include data sources, valuation time, observation periods, and recoveries.",
    schedule: "Any valuation method is stated in transaction documents",
  },
  {
    index: "06",
    name: "Policy conditions",
    question: "What requirements may apply?",
    description:
      "Transaction-specific requirements may address disclosure, controls, changes, notice, evidence, and cooperation.",
    schedule: "Only issued documentation creates policy conditions",
  },
  {
    index: "07",
    name: "Exclusions",
    question: "What may remain outside coverage?",
    description:
      "Examples may include unscheduled dependencies, known issues, market loss, authorized acts, or prohibited activity.",
    schedule: "Only issued documentation creates exclusions",
  },
  {
    index: "08",
    name: "Claims information",
    question: "What information may be relevant?",
    description:
      "Relevant material may include transaction traces, system state, incident records, custody evidence, valuation, and recoveries.",
    schedule: "Issued documentation controls notice and evidence requirements",
  },
];

const commonTerms: ProgramSection[] = [
  {
    heading: "Purpose of this overview",
    paragraphs: [
      "This program overview describes risk areas that may be considered during underwriting. It is not a quotation, binder, policy, or representation that insurance coverage is available.",
      "Transaction documents control coverage, including the insured parties and interests, scheduled systems and assets, event definitions, limits, retentions, exclusions, conditions, governing law, and claims requirements.",
    ],
  },
  {
    heading: "Information for underwriting",
    paragraphs: [
      "A preliminary underwriting review may consider the submitted architecture, controls, dependencies, loss scenarios, incident history, and supporting evidence. Additional or updated information may be requested before any decision is made.",
      "Review of information, a risk indicator, or discussion of possible structure does not determine eligibility or create insurance coverage or terms.",
    ],
  },
  {
    heading: "Coverage considerations",
    paragraphs: [
      "If a transaction proceeds, its documentation may define scheduled components, covered events, loss measurement, limits, retentions, exclusions, notice requirements, and other conditions. Those provisions are transaction-specific.",
    ],
    list: [
      "Dependencies and changes may affect the assessed risk boundary.",
      "Economic, operational, custody, governance, and third-party causes may be treated differently from code defects.",
      "Recovery, valuation, aggregation, and other insurance may affect the assessment of a loss.",
    ],
  },
  {
    heading: "Incident and claims information",
    paragraphs: [
      "Potential insureds and policyholders should follow the notice, mitigation, evidence, and communication requirements in their issued documentation. This website does not extend a deadline, replace a required notice channel, or determine whether an event is covered.",
    ],
  },
];

function withCommon(specific: ProgramSection[]): ProgramSection[] {
  return [...specific, ...commonTerms];
}

export const insurancePrograms: InsuranceProgram[] = [
  {
    index: "01",
    slug: "smart-contract-cover",
    title: "Smart Contract Cover",
    shortTitle: "Smart Contract",
    description:
      "A program area concerning defined losses associated with scheduled smart-contract code.",
    icon: "smart-contract",
    strapline:
      "Underwriting considerations for scheduled contract code and unintended execution events.",
    designedFor: [
      "DeFi applications",
      "On-chain marketplaces",
      "Staking protocols",
      "Protocol foundations",
    ],
    indicativeTriggers: [
      "A defect in scheduled production code that permits an unauthorized transfer or permanent loss of scheduled assets may be considered.",
      "Unintended execution of a scheduled contract that directly causes asset loss may be considered.",
      "Timing, discovery, evidence, retention, and recovery parameters would be defined only in transaction documents.",
    ],
    programExclusions: [
      "Unscheduled contracts, versions, proxies, modules, networks, or assets may be outside a proposed risk boundary.",
      "Deployments, upgrades, parameter changes, or governance actions may require separate review.",
      "Oracle error, bridge failure, key compromise, social engineering, transaction ordering, congestion, and economic design are distinct risk causes.",
      "A warning, defect, or attempted exploit without qualifying loss may not satisfy a transaction-specific event definition.",
    ],
    requiredInformation: [
      "Verified source and deployed bytecode",
      "Audit reports and remediation log",
      "Administrative and upgrade controls",
      "Dependency and asset schedule",
      "Incident response plan",
    ],
    terms: withCommon([
      {
        heading: "Smart-contract risk area",
        paragraphs: [
          "Underwriting may examine whether loss arises directly from scheduled code operating in an unintended manner. The relevant code, assets, event, causation, and evidence would need transaction-specific definitions.",
        ],
      },
      {
        heading: "Code and change boundaries",
        paragraphs: [
          "Addresses, implementations, modules, networks, assets, upgrade mechanisms, and dependencies may form part of the assessed boundary. Migrations and changes can alter that boundary and may require further review.",
        ],
      },
    ]),
  },
  {
    index: "02",
    slug: "protocol-exploit-cover",
    title: "Protocol Exploit Cover",
    shortTitle: "Protocol Exploit",
    description:
      "A program area concerning defined external exploit events affecting a scheduled protocol.",
    icon: "exploit",
    strapline:
      "Underwriting considerations for specified exploit paths and scheduled protocol assets.",
    designedFor: [
      "Lending markets",
      "Decentralized exchanges",
      "Derivatives protocols",
      "On-chain asset managers",
    ],
    indicativeTriggers: [
      "An unauthorized external actor using a specified exploit technique against a scheduled protocol may be considered.",
      "A direct removal or destruction of scheduled assets may need to meet defined timing, loss, and evidence parameters.",
      "The relevant exploit categories and causation standard would be stated only in transaction documents.",
    ],
    programExclusions: [
      "Governance capture, approved proposals, voting conduct, bribery, and voting concentration are distinct risk causes.",
      "Compromise or misuse of keys, credentials, multisignature controls, administrators, delegates, or front-end systems may be treated separately.",
      "Price manipulation, flash-loan-assisted economic attacks, bad debt, and oracle manipulation may require express consideration.",
      "Insider, affiliate, or authorized-access conduct may fall outside an external exploit definition.",
    ],
    requiredInformation: [
      "Threat model and exploit taxonomy",
      "Governance and privilege map",
      "Economic attack simulations",
      "Audit and bug-bounty history",
      "Liquidity and oracle dependencies",
    ],
    terms: withCommon([
      {
        heading: "Protocol exploit risk area",
        paragraphs: [
          "Underwriting may distinguish external unauthorized exploitation from governance, credential, economic, oracle, and insider events. Any covered category would require a definition in transaction documents.",
        ],
      },
      {
        heading: "Attribution and classification",
        paragraphs: [
          "Transaction traces, state changes, authority, actor relationships, and dominant causes may be relevant when classifying an event. Permitted testing and authorized activity are considered separately from unauthorized exploitation.",
        ],
      },
    ]),
  },
  {
    index: "03",
    slug: "cross-chain-bridge-cover",
    title: "Cross-Chain & Bridge Cover",
    shortTitle: "Cross-Chain & Bridge",
    description:
      "A program area concerning defined failures in scheduled bridge and cross-chain infrastructure.",
    icon: "bridge",
    strapline:
      "Underwriting considerations for specified routes, mechanisms, and cross-chain dependencies.",
    designedFor: [
      "Cross-chain bridges",
      "Interoperability protocols",
      "Wrapped-asset issuers",
      "Multichain applications",
    ],
    indicativeTriggers: [
      "Unauthorized minting, release, or transfer caused by a specified bridge or verification defect may be considered.",
      "A defined validator, relayer, or messaging failure that directly causes permanent asset loss may be considered.",
      "Any relevant route, network pair, contracts, assets, and event period would need to be scheduled in transaction documents.",
    ],
    programExclusions: [
      "Underlying network failure, reorganization, finality failure, sequencer outage, slashing, and consensus attack are distinct risk causes.",
      "Depeg, impairment, or redemption failure of wrapped, synthetic, or canonical assets may be treated separately.",
      "Congestion, delayed messages, stuck transfers, and unavailable liquidity do not necessarily result in permanent loss.",
      "Unscheduled routes, relayers, validators, custodians, messaging layers, and destination protocols may be outside the assessed boundary.",
    ],
    requiredInformation: [
      "Route and network-pair schedule",
      "Verification and validator model",
      "Relayer and messaging dependencies",
      "Mint and burn controls",
      "Emergency pause and recovery procedures",
    ],
    terms: withCommon([
      {
        heading: "Cross-chain risk area",
        paragraphs: [
          "Underwriting may examine whether a loss originates in a bridge mechanism, an underlying network, an asset, or another dependency. Delay and temporary unavailability are considered separately from permanent loss.",
        ],
      },
      {
        heading: "Route and dependency boundaries",
        paragraphs: [
          "A review may identify source and destination networks, contracts, verification methods, relayers, validator sets, assets, and finality assumptions for each route.",
        ],
      },
    ]),
  },
  {
    index: "04",
    slug: "stablecoin-depeg-cover",
    title: "Stablecoin & Depeg Cover",
    shortTitle: "Stablecoin & Depeg",
    description:
      "A program area concerning specifically defined stablecoin price and realized-loss events.",
    icon: "depeg",
    strapline:
      "Underwriting considerations for scheduled assets, price observations, and realized loss.",
    designedFor: [
      "Stablecoin issuers",
      "Protocol treasuries",
      "Liquidity managers",
      "Institutional digital-asset platforms",
    ],
    indicativeTriggers: [
      "A scheduled asset trading below a defined price for a defined observation period across specified sources may be considered.",
      "A direct realized loss through a specified disposal or redemption process may be relevant.",
      "Price, timing, custody, liquidity, ownership, and evidence parameters would be stated only in transaction documents.",
    ],
    programExclusions: [
      "Price movement that does not meet a defined level or observation period may fall outside a proposed event definition.",
      "Unrealized mark-to-market change, disposal outside a defined process, delay, and speculation may be treated separately.",
      "Issuer insolvency, fraud, reserve impairment, redemption suspension, sanctions, and regulatory action are distinct risk causes.",
      "Manipulated, stale, unavailable, or anomalous prices may be excluded from a valuation methodology.",
    ],
    requiredInformation: [
      "Asset and exposure schedule",
      "Custody and wallet evidence",
      "Proposed price sources",
      "Liquidity and disposal plan",
      "Issuer and reserve analysis",
    ],
    terms: withCommon([
      {
        heading: "Stablecoin and depeg risk area",
        paragraphs: [
          "Underwriting may examine price thresholds, observation periods, eligible holdings, realization, recoveries, and valuation sources. A price movement alone does not establish insurance coverage or payment.",
        ],
      },
      {
        heading: "Price and valuation considerations",
        paragraphs: [
          "Venue quality, source availability, time weighting, outliers, liquidity, and conduct affecting the measured price may be relevant to a transaction-specific methodology.",
        ],
      },
    ]),
  },
  {
    index: "05",
    slug: "treasury-digital-asset-cover",
    title: "Treasury & Digital Asset Cover",
    shortTitle: "Treasury & Digital Asset",
    description:
      "A program area concerning defined loss events affecting scheduled digital assets and custody arrangements.",
    icon: "treasury",
    strapline:
      "Underwriting considerations for scheduled assets, wallets, custody, and transaction controls.",
    designedFor: [
      "Protocol treasuries",
      "Foundations",
      "Digital-asset funds",
      "Institutional platforms",
    ],
    indicativeTriggers: [
      "An unauthorized external transfer of scheduled assets from a specified wallet following a defined compromise may be considered.",
      "Permanent destruction or loss of access caused by a specified event may be considered.",
      "Wallets, assets, custody configuration, ownership interests, and controls would require transaction-specific review.",
    ],
    programExclusions: [
      "Authorized, mistaken, or socially engineered transfers using valid approvals may be treated separately from external compromise.",
      "Key, seed phrase, backup, or credential handling inconsistent with the assessed control environment may affect the risk analysis.",
      "Market decline, slashing, lockup, illiquidity, lending loss, and protocol participation are distinct risk causes.",
      "Exchange, custodian, counterparty, or issuer failure may require separate consideration.",
    ],
    requiredInformation: [
      "Wallet and asset schedule",
      "Custody architecture",
      "Signer and privilege matrix",
      "Transaction approval policy",
      "Key backup and incident response controls",
    ],
    terms: withCommon([
      {
        heading: "Treasury and custody risk area",
        paragraphs: [
          "Underwriting may consider ownership, custody architecture, signer authority, approval procedures, transaction controls, backup arrangements, and the cause of any loss of assets or access.",
        ],
      },
      {
        heading: "Authority and valuation considerations",
        paragraphs: [
          "The distinction between authorized and unauthorized activity, together with recoveries and the valuation source and time, may be material to a transaction-specific structure.",
        ],
      },
    ]),
  },
  {
    index: "06",
    slug: "custom-protocol-cover",
    title: "Custom Protocol Cover",
    shortTitle: "Custom Protocol",
    description:
      "A review path for architectures or risk combinations not represented by the other program summaries.",
    icon: "custom",
    strapline:
      "Preliminary review of complex architectures and transaction-specific risk areas.",
    designedFor: [
      "Novel protocol architectures",
      "Institutional infrastructure",
      "Complex risk programmes",
      "Multiline placements",
    ],
    indicativeTriggers: [
      "Only events, causes, assets, and loss measures defined in transaction documents could form part of insurance coverage.",
      "Architecture, timing, evidence, and other transaction-specific parameters may be required.",
      "Direct loss and valuation concepts may need to be defined for the relevant risk scenario.",
    ],
    programExclusions: [
      "Risks, events, assets, dependencies, and loss categories outside a documented transaction boundary may be excluded.",
      "Changes to represented architecture, controls, limits, use, or deployment may require further review.",
      "Correlation, accumulation, and systemic events may require separate boundaries or sublimits.",
      "Any exclusions or conditions would arise only from issued transaction documents, not this website.",
    ],
    requiredInformation: [
      "Complete architecture and dependency map",
      "Loss scenarios and quantification",
      "Control and governance evidence",
      "Independent audits and opinions",
      "Requested triggers, limits, and structure",
    ],
    terms: withCommon([
      {
        heading: "Custom risk area",
        paragraphs: [
          "A custom review begins with the architecture, parties, assets, dependencies, controls, and loss scenarios presented. Discussion of a possible structure is preliminary and non-binding.",
        ],
      },
      {
        heading: "Transaction-specific boundaries",
        paragraphs: [
          "Any insurance coverage would need to be documented expressly. No event, asset, dependency, exclusion, condition, or right is created by analogy to another program or by this overview.",
        ],
      },
    ]),
  },
];

export function getInsuranceProgram(slug: string) {
  return insurancePrograms.find((program) => program.slug === slug);
}
