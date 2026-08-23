import type { Metadata, Viewport } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/util/Reveal";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const SITE_NAME = "Meridian Risk";
const SITE_URL = "https://meridianrisk.example";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Meridian Risk — Insurance infrastructure for the decentralized economy",
    template: "%s — Meridian Risk",
  },
  description:
    "Institutional-grade insurance for Web3 protocols, DeFi applications, digital-asset infrastructure and treasuries. Underwriting informed by on-chain risk intelligence.",
  keywords: [
    "Web3 insurance",
    "DeFi insurance",
    "smart contract cover",
    "protocol insurance",
    "digital asset insurance",
    "on-chain risk",
    "institutional underwriting",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "Meridian Risk — Insurance for the decentralized economy",
    description:
      "Protecting protocols, digital assets and Web3 infrastructure against defined on-chain risks through institutional-grade underwriting.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Risk",
    description:
      "Insurance infrastructure for the decentralized economy. Institutional-grade underwriting for on-chain risk.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E2A47",
  colorScheme: "light",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: SITE_NAME,
  legalName: "Meridian Risk Underwriting Ltd.",
  description:
    "Institutional-grade insurance for Web3 protocols, DeFi applications, digital-asset infrastructure and treasuries.",
  url: SITE_URL,
  areaServed: "Global",
  serviceType: [
    "Smart Contract Cover",
    "Protocol Exploit Cover",
    "Cross-Chain & Bridge Cover",
    "Stablecoin & Depeg Cover",
    "Treasury & Digital Asset Cover",
    "Custom Protocol Cover",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-none focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-ivory"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Reveal />
      </body>
    </html>
  );
}
