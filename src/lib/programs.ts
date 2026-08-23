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

const commonTerms: ProgramSection[] = [
  {
    heading: "Insured's duty of disclosure and continuing accuracy",
    paragraphs: [
      "The insured must disclose every fact, circumstance, dependency, privilege, vulnerability, prior incident and proposed change that is or may reasonably be material to Meridian Risk's assessment of the risk. All information supplied at placement, renewal and during the policy period is treated as a continuing representation and warranty.",
      "Meridian Risk may rely on information supplied without independently verifying it. Any material omission, inaccuracy, misleading statement or failure to update information entitles Meridian Risk, to the fullest extent permitted by law, to amend terms, reduce or deny a claim, suspend coverage, cancel the policy or treat the policy as void from inception.",
    ],
  },
  {
    heading: "Conditions precedent to coverage",
    paragraphs: [
      "No coverage attaches unless the premium and all applicable charges have been received, the insured has complied with all binding risk requirements, and the relevant asset, contract, wallet, dependency, chain and entity are expressly identified in the policy schedule.",
    ],
    list: [
      "Required audits, remediation items and security controls must remain in force.",
      "The insured must maintain access controls, key-management procedures, incident response plans and monitoring represented during underwriting.",
      "Any material change requires prior written approval from Meridian Risk; coverage for the affected risk may be suspended until approval is given.",
      "The insured bears the burden of establishing that every coverage requirement and condition precedent has been satisfied.",
    ],
  },
  {
    heading: "Notification, mitigation and control of claims",
    paragraphs: [
      "The insured must notify Meridian Risk immediately after becoming aware of any incident, suspected incident, threat, vulnerability or circumstance that may give rise to a claim, and in all cases within the shorter period stated in the policy. Late notice may prejudice or extinguish coverage whether or not prejudice can be quantified.",
      "The insured must take all reasonable steps to prevent, contain, mitigate and recover loss, preserve evidence, maintain complete records and follow Meridian Risk's reasonable instructions. No admission, settlement, payment, fork, rollback, reimbursement, bounty or material remediation may be agreed without prior written consent, except where immediately necessary to prevent further loss.",
      "Meridian Risk may appoint counsel, forensic specialists, auditors, valuers and other experts; coordinate the investigation; participate in incident response; and assume control of negotiations or recovery actions where the policy permits. Cooperation is a continuing condition of coverage.",
    ],
  },
  {
    heading: "Loss measurement, limits and aggregation",
    paragraphs: [
      "Only direct, actual and irrecoverable loss is potentially indemnifiable. Loss is measured using the valuation method, observation period, data sources and valuation time selected in the policy schedule or, if not specified, a commercially reasonable methodology selected by Meridian Risk. Hypothetical value, opportunity cost, lost yield, lost fees, loss of market, reputational harm and consequential or indirect loss are excluded.",
      "All losses arising from, attributable to, or connected with the same vulnerability, actor, campaign, dependency, governance action, transaction sequence, design defect or originating cause may be treated as one event at the earliest applicable time. Payments remain subject to deductibles, waiting periods, sub-limits, co-insurance, aggregate limits and other retentions.",
    ],
  },
  {
    heading: "General exclusions",
    paragraphs: [
      "Unless expressly endorsed in writing, no coverage applies to loss arising from or contributed to by any of the following:",
    ],
    list: [
      "Known, disclosed or reasonably discoverable vulnerabilities, prior incidents or circumstances existing before attachment.",
      "Fraud, dishonesty, collusion, intentional conduct, reckless conduct or material non-compliance by an insured, founder, employee, contractor, delegate, administrator or governance participant acting with authority.",
      "Market movement, volatility, insufficient liquidity, adverse selection, impermanent loss, liquidation, bad debt, tokenomics, incentive design or ordinary economic operation of a protocol.",
      "War, terrorism, cyber warfare, widespread infrastructure or internet failure, sovereign action, confiscation, sanctions, regulatory action or unlawful activity.",
      "Failure of an unscheduled third party, chain, oracle, bridge, custodian, exchange, validator, sequencer, cloud provider or other dependency.",
      "Fines, penalties, taxes, punitive or exemplary damages, contractual liabilities voluntarily assumed, legal costs not approved in advance, and losses prohibited from payment by law or sanctions.",
    ],
  },
  {
    heading: "Recoveries, subrogation and other insurance",
    paragraphs: [
      "Meridian Risk is subrogated to all rights of recovery upon payment or advancement. The insured must preserve and assist those rights and may not waive them without prior written consent. Any recovery, restitution, returned asset, fork proceeds, reimbursement, grant, bounty recapture or third-party payment relating to the loss must be disclosed and will reduce the covered loss or be repaid to Meridian Risk after payment.",
      "This coverage is excess of any other valid and collectible insurance, indemnity, guarantee, reserve, compensation scheme or recovery unless the issued policy expressly states otherwise.",
    ],
  },
  {
    heading: "Meridian Risk's rights; cancellation and non-renewal",
    paragraphs: [
      "Meridian Risk may audit compliance, request additional information, impose reasonable protective measures, amend terms at renewal, decline renewal, or exercise cancellation and suspension rights stated in the policy. Monitoring, silence, review or receipt of information does not constitute acceptance of a change, waiver, advice or confirmation of coverage.",
      "Any determination, consent or approval by Meridian Risk must be in writing by an authorized representative. No broker, website statement, dashboard, risk score, proposal or informal communication may amend coverage. Rights and remedies are cumulative, and delay in exercising a right is not a waiver.",
    ],
  },
  {
    heading: "Order of precedence and governing wording",
    paragraphs: [
      "These website terms are an indicative summary only and are not a binder, quotation, contract or promise of payment. The issued policy schedule, endorsements and full wording exclusively govern. If documents conflict, the order of precedence stated in the issued policy applies, with specifically negotiated endorsements prevailing over general summaries.",
      "Coverage is available only in eligible jurisdictions through an appropriately authorized entity. Governing law, dispute resolution, service requirements, limitation periods and forum are those stated in the issued policy. Independent legal, tax and insurance advice should be obtained before placement.",
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
      "Protection against defined losses arising from qualifying smart-contract incidents.",
    icon: "smart-contract",
    strapline:
      "Defined protection for scheduled contract code and qualifying unintended execution.",
    designedFor: [
      "DeFi applications",
      "On-chain marketplaces",
      "Staking protocols",
      "Protocol foundations",
    ],
    indicativeTriggers: [
      "A vulnerability in scheduled production contract code that enables unauthorized transfer or permanent loss of scheduled assets.",
      "Unintended execution of a scheduled contract that directly causes an irrecoverable asset loss during the policy period.",
      "A qualifying incident first discovered and notified during the applicable coverage period, after any waiting period and retention.",
    ],
    programExclusions: [
      "Contracts, versions, proxies, modules, chains or assets not expressly scheduled.",
      "Any deployment, upgrade, parameter change or governance action not approved in writing before implementation.",
      "Oracle error, bridge failure, private-key compromise, social engineering, front-running, MEV, congestion or economic design failure unless specifically endorsed.",
      "Loss reproducible only through assumptions or privileges unavailable to the relevant actor at the time of the incident.",
    ],
    requiredInformation: [
      "Verified source and deployed bytecode",
      "Audit reports and remediation log",
      "Admin and upgrade controls",
      "Dependency and asset schedule",
      "Incident response plan",
    ],
    terms: withCommon([
      {
        heading: "Indicative insuring agreement",
        paragraphs: [
          "Subject to all terms, Meridian Risk may indemnify the named insured for direct and irrecoverable loss of scheduled assets caused solely and directly by a qualifying smart-contract incident affecting scheduled contract code during the policy period.",
          "A qualifying incident must satisfy the technical trigger in the issued schedule and be established by reproducible on-chain evidence. A defect, warning, audit finding or attempted exploit without covered loss is not itself a claim.",
        ],
      },
      {
        heading: "Scheduled code and change control",
        paragraphs: [
          "Coverage is confined to the exact addresses, implementations, bytecode hashes, modules, chains and assets listed in the schedule. Replacement, migration, proxy upgrade, parameter change, emergency action or addition of a dependency is outside coverage unless Meridian Risk approves it in writing.",
          "If an emergency change is necessary, the insured must notify Meridian Risk before execution where practicable and immediately afterward in all other cases. Meridian Risk may suspend, restrict or reprice the affected coverage.",
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
      "Coverage designed for qualifying protocol-level security events.",
    icon: "exploit",
    strapline:
      "Protocol-level protection structured around defined exploit paths and scheduled assets.",
    designedFor: [
      "Lending markets",
      "Decentralized exchanges",
      "Derivatives protocols",
      "On-chain asset managers",
    ],
    indicativeTriggers: [
      "An external actor uses a covered exploit technique against the scheduled protocol and directly removes or destroys scheduled assets.",
      "The exploit is unauthorized, first occurs during the policy period and meets any minimum loss, waiting period and evidence requirement.",
      "The proximate cause falls within the exploit categories affirmatively listed in the issued schedule.",
    ],
    programExclusions: [
      "Governance capture, approved governance proposals, malicious voting, bribery or concentration of voting power unless endorsed.",
      "Compromise or misuse of private keys, credentials, multisigs, administrators, delegates or front-end infrastructure.",
      "Price manipulation, flash-loan-assisted economic attacks, bad debt or oracle manipulation unless the specific mechanism is scheduled.",
      "Acts involving an insider, affiliated party or person acting with authorized access.",
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
        heading: "Indicative insuring agreement",
        paragraphs: [
          "Subject to all terms, Meridian Risk may indemnify direct, irrecoverable loss of scheduled assets resulting solely from a covered external protocol exploit first occurring during the policy period. Covered exploit techniques are limited to those affirmatively identified in the schedule.",
          "The insured must prove unauthorized exploitation, causation and quantum through transaction traces, state changes, forensic evidence and any additional information reasonably requested by Meridian Risk.",
        ],
      },
      {
        heading: "Attribution and exploit classification",
        paragraphs: [
          "Meridian Risk may classify the originating cause of an event using the dominant or proximate cause, notwithstanding that multiple transactions, actors or vulnerabilities are involved. Classification controls whether the event falls within a scheduled trigger or an exclusion.",
          "White-hat activity, permitted testing, approved governance action, bounty participation or transactions performed under valid authority are not unauthorized exploits unless the policy expressly provides otherwise.",
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
      "Protection against defined failures involving bridges and cross-chain infrastructure.",
    icon: "bridge",
    strapline:
      "Scheduled protection for qualifying failures across specified cross-chain architecture.",
    designedFor: [
      "Cross-chain bridges",
      "Interoperability protocols",
      "Wrapped-asset issuers",
      "Multichain applications",
    ],
    indicativeTriggers: [
      "Unauthorized minting, release or transfer caused by a covered defect in a scheduled bridge contract or verification mechanism.",
      "A covered validator, relayer or messaging failure that directly causes permanent loss of scheduled assets.",
      "The event affects an expressly scheduled route, chain pair, contract set and asset during the policy period.",
    ],
    programExclusions: [
      "Underlying chain failure, reorganization, finality failure, sequencer outage, validator slashing or consensus attack unless endorsed.",
      "Depeg, impairment or lack of redemption of wrapped, synthetic or canonical assets.",
      "Congestion, delayed messages, stuck transfers or unavailable liquidity without permanent covered loss.",
      "Failure of an unscheduled route, relayer, validator set, custodian, messaging layer or destination protocol.",
    ],
    requiredInformation: [
      "Route and chain-pair schedule",
      "Verification and validator model",
      "Relayer and messaging dependencies",
      "Mint/burn controls",
      "Emergency pause and recovery procedures",
    ],
    terms: withCommon([
      {
        heading: "Indicative insuring agreement",
        paragraphs: [
          "Subject to all terms, Meridian Risk may indemnify direct and irrecoverable loss of scheduled assets caused solely by a covered failure of the scheduled bridge or cross-chain mechanism on an approved route during the policy period.",
          "Coverage does not attach merely because a message, transfer or redemption is delayed. The insured must establish permanent loss after expiration of the policy's waiting and recovery periods.",
        ],
      },
      {
        heading: "Route, finality and dependency boundaries",
        paragraphs: [
          "Each covered route is treated as a distinct risk and must identify the source chain, destination chain, contracts, verification method, relayers, validator set, assets and finality assumptions. Components outside that boundary are not covered.",
          "Meridian Risk may determine when finality occurred and whether the loss originated in the bridge, an underlying chain or another dependency, using reasonable technical evidence and appointed experts.",
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
      "Coverage for specifically defined market and asset events where applicable.",
    icon: "depeg",
    strapline:
      "Trigger-based indemnity protection for scheduled assets and sustained qualifying depeg events.",
    designedFor: [
      "Stablecoin issuers",
      "Protocol treasuries",
      "Liquidity managers",
      "Institutional digital-asset platforms",
    ],
    indicativeTriggers: [
      "A scheduled stablecoin trades below the specified trigger price for the full observation period across approved data sources.",
      "The insured realizes a direct loss through a covered disposal or redemption event in the manner required by the policy.",
      "All trigger, liquidity, timing, custody and evidence conditions in the schedule are satisfied.",
    ],
    programExclusions: [
      "Price movement that does not meet the trigger level or continuous observation period.",
      "Unrealized mark-to-market loss, voluntary sale outside the permitted window or loss increased by delay or speculation.",
      "Issuer insolvency, fraud, reserve impairment, redemption suspension, sanctions or regulatory action unless specifically endorsed.",
      "Manipulated, stale, unavailable or anomalous prices and venues excluded by the valuation methodology.",
    ],
    requiredInformation: [
      "Asset and exposure schedule",
      "Custody and wallet evidence",
      "Approved price sources",
      "Liquidity and disposal plan",
      "Issuer and reserve analysis",
    ],
    terms: withCommon([
      {
        heading: "Indicative insuring agreement",
        paragraphs: [
          "Subject to all terms, Meridian Risk may indemnify a defined portion of direct realized loss on a scheduled stablecoin where the asset satisfies the trigger price and continuous observation period stated in the schedule and the insured complies with prescribed disposal, redemption and notice requirements.",
          "A depeg does not create automatic entitlement to payment. The insured must establish eligible holdings before the event, continuous ownership where required, the permitted realization transaction and net loss after all recoveries.",
        ],
      },
      {
        heading: "Price determination and anti-manipulation",
        paragraphs: [
          "The policy schedule controls eligible venues, price sources, time-weighting, outlier treatment and observation periods. If a source is unavailable, compromised or unrepresentative, Meridian Risk may disregard it and select a commercially reasonable replacement source.",
          "No coverage applies to loss influenced by the insured's trading, liquidity withdrawal, governance activity or other conduct intended or reasonably likely to affect the trigger or measured price.",
        ],
      },
    ]),
  },
  {
    index: "05",
    slug: "treasury-digital-asset-cover",
    title: "Treasury & Digital Asset Cover",
    shortTitle: "Treasury & Digital Asset",
    description: "Protection for eligible protocol-controlled digital assets.",
    icon: "treasury",
    strapline:
      "Scheduled protection for protocol-controlled assets held within approved custody arrangements.",
    designedFor: [
      "Protocol treasuries",
      "Foundations",
      "Digital-asset funds",
      "Institutional platforms",
    ],
    indicativeTriggers: [
      "Unauthorized external transfer of scheduled assets from an approved wallet caused by a covered compromise.",
      "Permanent destruction or loss of access caused by a covered event expressly stated in the schedule.",
      "The affected wallet, asset, custody configuration and control procedure are all scheduled and compliant.",
    ],
    programExclusions: [
      "Authorized, mistaken or socially engineered transfers approved through valid credentials or required signers unless endorsed.",
      "Loss, disclosure, backup failure or misuse of private keys, seed phrases or credentials contrary to represented controls.",
      "Market value decline, staking or restaking slashing, lockup, illiquidity, lending loss or protocol participation risk.",
      "Exchange, custodian, counterparty or issuer insolvency or failure unless the entity and risk are specifically scheduled.",
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
        heading: "Indicative insuring agreement",
        paragraphs: [
          "Subject to all terms, Meridian Risk may indemnify direct and irrecoverable loss of scheduled digital assets from an approved custody arrangement caused solely by a covered event during the policy period.",
          "Only the named insured's legally and beneficially owned interest is eligible. Assets held for users, customers, affiliates or third parties are excluded unless expressly declared and scheduled.",
        ],
      },
      {
        heading: "Custody, authority and valuation",
        paragraphs: [
          "Coverage depends on continuous compliance with the scheduled custody model, signer thresholds, transaction limits, allowlists, segregation, hardware requirements and approval procedures. A transfer executed with valid authority is presumed authorized unless the insured proves a covered compromise.",
          "Asset value will be determined net of recoveries and using the scheduled valuation source and time. No amount is payable for appreciation after the event or for value attributable to forks, airdrops, rewards or unvested rights unless expressly scheduled.",
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
      "Tailored underwriting for sophisticated or unconventional Web3 architectures.",
    icon: "custom",
    strapline:
      "Bespoke wording for complex architectures that do not fit a standard risk category.",
    designedFor: [
      "Novel protocol architectures",
      "Institutional infrastructure",
      "Complex risk programmes",
      "Multiline placements",
    ],
    indicativeTriggers: [
      "Only the events, causes, assets and losses affirmatively described in the negotiated insuring agreement.",
      "A covered event occurring within the scheduled architecture and policy period after satisfaction of all bespoke conditions.",
      "Direct and irrecoverable loss established using the evidence and valuation method specified in the endorsement.",
    ],
    programExclusions: [
      "Every risk, event, asset, dependency and loss category not affirmatively included in the negotiated wording.",
      "Any deviation from the represented architecture, controls, limits, use case or deployment without prior written approval.",
      "Correlation, accumulation and systemic events beyond the scenarios and sub-limits expressly accepted.",
      "Any standard or manuscript exclusion, warranty or condition stated in the issued policy and endorsements.",
    ],
    requiredInformation: [
      "Complete architecture and dependency map",
      "Loss scenarios and quantification",
      "Control and governance evidence",
      "Independent audits and opinions",
      "Requested triggers, limits and structure",
    ],
    terms: withCommon([
      {
        heading: "Bespoke insuring agreement",
        paragraphs: [
          "Custom Protocol Cover is available only through individually negotiated wording. No event is covered by implication, analogy, trade usage or marketing description. The policy responds solely to risks affirmatively accepted in the insuring agreement and schedule.",
          "Any example, indication, risk score, term sheet or preliminary discussion is non-binding. Meridian Risk may withdraw or revise proposed terms at any time before authorized execution of the policy and receipt of premium.",
        ],
      },
      {
        heading: "Manuscript wording and risk boundaries",
        paragraphs: [
          "The insured must provide a complete architecture, dependency, asset and control schedule. Unscheduled components and deviations are outside the risk accepted. Bespoke warranties, reporting duties, sub-limits, exclusions and termination events may be imposed to address concentration, novelty and correlation.",
          "Where a manuscript endorsement conflicts with standard wording, only the specific conflict is modified; all unaffected protections, exclusions, conditions and insurer rights remain in force.",
        ],
      },
    ]),
  },
];

export function getInsuranceProgram(slug: string) {
  return insurancePrograms.find((program) => program.slug === slug);
}
