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
 * Approved insurance partners displayed in the homepage partner marquee.
 */
export const insurancePartnerMarks: MarketMark[] = [
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
 * Insured DeFi projects and risk-management partners approved for display.
 */
export const insuredProjectMarks: MarketMark[] = [
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
