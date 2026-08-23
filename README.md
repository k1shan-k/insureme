# Meridian Risk

**Insurance infrastructure for the decentralized economy.**

A premium, institutional marketing and lead-generation website for a Web3 / DeFi insurance
company. Built to communicate financial strength, institutional credibility, security and
sophisticated underwriting — closer in feel to a global insurer or private bank than a crypto
startup.

## Tech stack

- [Next.js 14](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- `next/font` (Source Serif 4 + Inter) — no external font requests at runtime

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm start
```

## Design system

| Token        | Value                          | Usage                          |
| ------------ | ------------------------------ | ------------------------------ |
| Ivory        | `#F7F4EE`                      | Page background                |
| Navy         | `#0E2A47` / `#0A1F36` / `#07172A` | Primary brand, dark sections |
| Charcoal     | `#1C1F26`                      | Body typography                |
| Slate muted  | `#5C6672`                      | Secondary text                 |
| Gold / bronze| `#A9852F` / `#C4A15A`          | Restrained accent              |

- **Serif** (Source Serif 4) for editorial headlines
- **Sans** (Inter) for body and UI
- Thin 1px borders, generous whitespace, small uppercase section labels, restrained motion
  (scroll reveal via a single IntersectionObserver, honoring `prefers-reduced-motion`).

## Structure

```
src/
  app/
    layout.tsx              Root layout, fonts, metadata, JSON-LD
    page.tsx                Homepage (composed from sections)
    risk-assessment/        Primary conversion flow (multi-step form)
    legal/                  Legal index + dynamic [slug] documents
    sitemap.ts, robots.ts, manifest.ts
  components/
    layout/                 Header, Footer
    sections/               Homepage sections
    risk/                   RiskAssessmentFlow
    charts/                 RiskGauge, RiskBar, HeroVisual
    ui/                     Button, Logo, SectionLabel, Cards, Icons
    util/                   Reveal (scroll animation)
  lib/
    site.ts                 Company + navigation config
    content.ts              Homepage content data
    legal.ts                Legal document content
```

## Pages

- `/` — Homepage
- `/risk-assessment` — Get a Risk Assessment (Protocol Info → Risk Review → Coverage Options → Contact Underwriting)
- `/legal` — Legal & policy index
- `/legal/[slug]` — Privacy, Terms, Policy Terms, Coverage Disclosures, Claims Procedure, Risk Disclosures, Regulatory Information

## Deployment

Deploys cleanly to any Node host or [Vercel](https://vercel.com/). No environment variables are
required. The risk-assessment form is front-end only; wire the submit handler in
`components/risk/RiskAssessmentFlow.tsx` to your CRM / underwriting intake endpoint.

## Content & compliance note

Marketing copy communicates value positively while avoiding unconditional promises of coverage or
payment. Coverage is consistently described as subject to underwriting, policy terms, limits,
deductibles, exclusions and conditions.
