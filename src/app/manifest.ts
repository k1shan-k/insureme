import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prime Insurances",
    short_name: "Prime Insurances",
    description:
      "Information about preliminary underwriting review and potential insurance coverage for digital-asset protocols and infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#F7F4EE",
    theme_color: "#0E2A47",
  };
}
