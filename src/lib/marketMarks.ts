export type MarketMark = {
  name: string;
  short: string;
  descriptor: string;
  tone?: "market" | "asset";
};

/**
 * Organizations named here are established participants in the global insurance
 * market. Their display is editorial context only and does not claim a Meridian
 * partnership, endorsement, capacity commitment or commercial relationship.
 */
export const insuranceMarketMarks: MarketMark[] = [
  {
    name: "Lloyd’s",
    short: "L",
    descriptor: "Insurance market",
    tone: "market",
  },
  { name: "Swiss Re", short: "SR", descriptor: "Reinsurance", tone: "market" },
  { name: "Munich Re", short: "MR", descriptor: "Reinsurance", tone: "market" },
  {
    name: "Hannover Re",
    short: "HR",
    descriptor: "Reinsurance",
    tone: "market",
  },
  {
    name: "Allianz Commercial",
    short: "AC",
    descriptor: "Commercial insurance",
    tone: "market",
  },
  {
    name: "AIG",
    short: "AIG",
    descriptor: "Commercial insurance",
    tone: "market",
  },
  {
    name: "Zurich",
    short: "Z",
    descriptor: "Commercial insurance",
    tone: "market",
  },
  {
    name: "Marsh",
    short: "M",
    descriptor: "Insurance broking",
    tone: "market",
  },
];

/**
 * These are examples of widely used digital assets whose exposures may be
 * considered during underwriting. They are not represented as currently insured.
 */
export const digitalAssetMarks: MarketMark[] = [
  { name: "Bitcoin", short: "₿", descriptor: "BTC exposure", tone: "asset" },
  { name: "Ethereum", short: "Ξ", descriptor: "ETH exposure", tone: "asset" },
  { name: "USD Coin", short: "$", descriptor: "USDC exposure", tone: "asset" },
  { name: "Tether", short: "₮", descriptor: "USDT exposure", tone: "asset" },
  { name: "Dai", short: "D", descriptor: "DAI exposure", tone: "asset" },
  {
    name: "Lido Staked ETH",
    short: "st",
    descriptor: "stETH exposure",
    tone: "asset",
  },
  { name: "Solana", short: "S", descriptor: "SOL exposure", tone: "asset" },
];
