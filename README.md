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

| Token         | Value                             | Usage                        |
| ------------- | --------------------------------- | ---------------------------- |
| Ivory         | `#F7F4EE`                         | Page background              |
| Navy          | `#0E2A47` / `#0A1F36` / `#07172A` | Primary brand, dark sections |
| Charcoal      | `#1C1F26`                         | Body typography              |
| Slate muted   | `#5C6672`                         | Secondary text               |
| Gold / bronze | `#A9852F` / `#C4A15A`             | Restrained accent            |

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
    claims/notify/          Initial claims-notification intake form
    api/                    Durable webhook-backed intake routes
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
- `/insurance` and `/insurance/[slug]` — Six insurance programs with detailed indicative terms
- `/risk-assessment` — Protocol Info → Risk Review → Coverage Options → Contact Underwriting
- `/claims/notify` — Initial incident notification with validated, durable webhook delivery
- `/client-login` — Invitation-based policyholder portal access
- `/company/[slug]` — About, leadership and careers
- `/resources` and `/resources/[slug]` — Insights, research and risk reports
- `/legal` and `/legal/[slug]` — Core legal documents and transparency statements

## Deployment

Deploy to any compatible Next.js host or Cloudflare using its Next.js adapter. Copy `.env.example`
to your deployment configuration. Both intake flows require server-side webhook destinations:

- `RISK_ASSESSMENT_WEBHOOK_URL` must durably persist or enqueue accepted assessment submissions.
- `CLAIMS_NOTIFICATION_WEBHOOK_URL` must be HTTPS and must durably persist or enqueue accepted
  incident notifications before returning `2xx`. It must deduplicate retries by the supplied
  `Idempotency-Key` header.
- `CLAIMS_NOTIFICATION_WEBHOOK_TOKEN` is required and authenticates claims delivery. Use a secret
  independent from `RISK_ASSESSMENT_WEBHOOK_TOKEN`; never expose either through `NEXT_PUBLIC_*`.
- `RISK_ASSESSMENT_WEBHOOK_TOKEN` remains optional for the assessment flow.

Set `NEXT_PUBLIC_CLIENT_PORTAL_URL` when a secure policyholder portal is available, and configure
`NEXT_PUBLIC_UNDERWRITING_EMAIL` / `NEXT_PUBLIC_CAREERS_EMAIL` for live contact actions.

Company contact values are environment-driven and are omitted as live actions when unconfigured.
Canonical-domain placeholders in `layout.tsx`, `sitemap.ts` and `robots.ts` must be replaced before
production launch.

## Claims intake and sensitive data

`POST /api/claims/notifications` accepts an allowlisted, size-limited JSON payload, validates
required fields, and forwards it to the configured claims webhook. Discovery time is normalized to
UTC while retaining the claimant's local value and timezone. A stable submission ID is reused as
the webhook `Idempotency-Key`; the receiver must deduplicate on that key. Redirects are rejected.
The browser receives a notification reference only after the webhook returns a successful response.
This confirms initial intake only: it does not accept coverage, constitute proof of loss, waive a
policy deadline or determine payment.

The form intentionally does not accept file uploads. Users are instructed never to provide seed
phrases, private keys, passwords, signing requests or privileged credentials. Sensitive evidence
should be transferred later through a separately authenticated channel. The route applies a small
process-local IP rate limit; this is not distributed protection and should be supplemented with
platform-level rate limiting or a shared store in multi-instance production deployments.

## Content & compliance note

Marketing copy communicates value positively while avoiding unconditional promises of coverage or
payment. Coverage is consistently described as subject to underwriting, policy terms, limits,
deductibles, exclusions and conditions.

The animated insurance-market and DeFi project rows use locally rendered, recognizable vector brand
marks for identification. The DeFi selection is intentionally limited to specialist protocols and
on-chain finance projects such as Pendle, Morpho, Ethena, Frax, Convex, Yearn, Balancer and Maple;
native layer-one assets such as BTC and ETH are excluded. All names and marks remain the property
of their respective owners.

Display is editorial context only and does not represent a partnership, endorsement, committed
capacity, active policy or guaranteed eligibility. Only named insureds, scheduled assets and
expressly covered risks in an issued policy are insured.
