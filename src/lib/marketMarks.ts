export type MarketMark = {
  name: string;
  logo:
    | "lloyds"
    | "swiss-re"
    | "munich-re"
    | "hannover-re"
    | "allianz"
    | "aig"
    | "zurich"
    | "marsh"
    | "pendle"
    | "morpho"
    | "ethena"
    | "frax"
    | "convex"
    | "yearn"
    | "balancer"
    | "maple";
  descriptor: string;
  tone: "market" | "defi";
};

/**
 * Recognizable brand marks identify established insurance-market participants.
 * Display remains editorial context only and does not claim a Meridian
 * partnership, endorsement, capacity commitment or commercial relationship.
 */
export const insuranceMarketMarks: MarketMark[] = [
  {
    name: "Lloyd’s",
    logo: "lloyds",
    descriptor: "Insurance market",
    tone: "market",
  },
  {
    name: "Swiss Re",
    logo: "swiss-re",
    descriptor: "Reinsurance",
    tone: "market",
  },
  {
    name: "Munich Re",
    logo: "munich-re",
    descriptor: "Reinsurance",
    tone: "market",
  },
  {
    name: "Hannover Re",
    logo: "hannover-re",
    descriptor: "Reinsurance",
    tone: "market",
  },
  {
    name: "Allianz",
    logo: "allianz",
    descriptor: "Commercial insurance",
    tone: "market",
  },
  {
    name: "AIG",
    logo: "aig",
    descriptor: "Commercial insurance",
    tone: "market",
  },
  {
    name: "Zurich",
    logo: "zurich",
    descriptor: "Commercial insurance",
    tone: "market",
  },
  {
    name: "Marsh",
    logo: "marsh",
    descriptor: "Insurance broking",
    tone: "market",
  },
];

/**
 * Protocol references are deliberately limited to DeFi and adjacent projects.
 * Native layer-one assets and tier-one blockchain brands are excluded. Display
 * is not a statement that a token, protocol or position is currently insured.
 */
export const defiProjectMarks: MarketMark[] = [
  {
    name: "Pendle",
    logo: "pendle",
    descriptor: "Yield markets",
    tone: "defi",
  },
  {
    name: "Morpho",
    logo: "morpho",
    descriptor: "DeFi lending",
    tone: "defi",
  },
  {
    name: "Ethena",
    logo: "ethena",
    descriptor: "Synthetic dollar",
    tone: "defi",
  },
  {
    name: "Frax",
    logo: "frax",
    descriptor: "Stablecoin protocol",
    tone: "defi",
  },
  {
    name: "Convex",
    logo: "convex",
    descriptor: "Yield optimization",
    tone: "defi",
  },
  {
    name: "Yearn",
    logo: "yearn",
    descriptor: "DeFi vaults",
    tone: "defi",
  },
  {
    name: "Balancer",
    logo: "balancer",
    descriptor: "Liquidity protocol",
    tone: "defi",
  },
  {
    name: "Maple",
    logo: "maple",
    descriptor: "On-chain credit",
    tone: "defi",
  },
];
