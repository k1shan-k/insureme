import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Meridian Risk",
    short_name: "Meridian",
    description:
      "Insurance infrastructure for the decentralized economy. Institutional-grade underwriting for Web3 and DeFi risk.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#0E2A47",
  };
}
