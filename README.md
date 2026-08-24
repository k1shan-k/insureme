# Meridian Risk

A Next.js website presenting general information about preliminary underwriting review and potential insurance coverage for digital-asset protocols and infrastructure. Public copy is intentionally non-binding: transaction documents control coverage.

## Tech stack

- [Next.js 14](https://nextjs.org/) App Router
- TypeScript
- Tailwind CSS
- `next/font` with Source Serif 4 and Inter

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). In non-production environments, the site URL defaults to this local origin when `NEXT_PUBLIC_SITE_URL` is blank.

### Production build

```bash
npm run build
npm start
```

`NEXT_PUBLIC_SITE_URL` is required in production and must contain the verified public HTTPS origin only, without credentials, a path, query parameters, or a fragment. It supplies route-correct canonical metadata, the sitemap, and robots configuration.

## Design system

| Token         | Value                             | Usage                        |
| ------------- | --------------------------------- | ---------------------------- |
| Ivory         | `#F7F4EE`                         | Page background              |
| Navy          | `#0E2A47` / `#0A1F36` / `#07172A` | Primary brand, dark sections |
| Charcoal      | `#1C1F26`                         | Body typography              |
| Slate muted   | `#5C6672`                         | Secondary text               |
| Gold / bronze | `#A9852F` / `#C4A15A`             | Restrained accent            |

Source Serif 4 is used for editorial headings and Inter for body and interface copy. Motion is restrained and respects `prefers-reduced-motion`.

## Structure

```text
src/
  app/
    layout.tsx              Root layout, metadata, and JSON-LD
    page.tsx                Homepage
    risk-assessment/        Multi-step preliminary review intake
    claims/notify/          Initial incident-notification intake
    api/                    Webhook-backed intake routes
    insurance/              Program index and dynamic program overviews
    legal/                  Legal index and dynamic documents
    sitemap.ts, robots.ts, manifest.ts
  components/
    layout/                 Header and footer
    sections/               Homepage sections
    risk/                   RiskAssessmentFlow
    claims/                 ClaimNotificationForm
    ui/                     Shared interface components
    util/                   Scroll reveal behavior
  lib/
    config.ts               Public site and portal URL validation
    site.ts                 Site and navigation configuration
    programs.ts             Insurance program summaries
    legal.ts                Legal and disclosure content
```

## Public routes

- `/` — Homepage
- `/insurance` and `/insurance/[slug]` — Six non-binding program overviews
- `/risk-assessment` — Protocol information → information review → coverage interests → contact information
- `/claims/notify` — Initial incident-notification intake
- `/client-login` — Configured policyholder portal and client-services guidance
- `/company/[slug]` — General company information
- `/resources` and `/resources/[slug]` — Risk and assessment reference material
- `/legal` and `/legal/[slug]` — Website terms, disclosures, and general documentation

## Environment configuration

Copy `.env.example` into the deployment's environment configuration and set only verified values.

- `NEXT_PUBLIC_SITE_URL` is required in production.
- `NEXT_PUBLIC_CLIENT_PORTAL_URL` is optional and must be a credential-free HTTPS URL when set. Blank or invalid values are omitted outside production; invalid configured values fail clearly in production. `NEXT_PUBLIC_CLIENT_SERVICES_EMAIL` and other public entity or contact values are optional and omitted when blank.
- `RISK_ASSESSMENT_WEBHOOK_URL` must point to a production receiver that durably persists or enqueues accepted assessment submissions before returning `2xx`.
- `CLAIMS_NOTIFICATION_WEBHOOK_URL` must be HTTPS and its receiver must durably persist or enqueue accepted notifications before returning `2xx`.
- The claims receiver must deduplicate retries by the `Idempotency-Key` header.
- `CLAIMS_NOTIFICATION_WEBHOOK_TOKEN` is required for claims delivery. Keep it separate from `RISK_ASSESSMENT_WEBHOOK_TOKEN` and never expose either through `NEXT_PUBLIC_*`.

The application does not claim a deployment adapter. Validate the build, runtime, environment handling, webhook behavior, and edge protections on the selected production platform.

## Claims intake and sensitive data

`POST /api/claims/notifications` accepts an allowlisted, size-limited JSON payload and forwards it to the configured claims receiver. Discovery time is normalized to UTC while retaining the user's local value and timezone. A stable submission identifier is reused as the webhook `Idempotency-Key`; the receiver must deduplicate on that key. Redirects are rejected. The browser receives a reference only after the receiver returns a successful response.

Receipt confirms initial intake only. It does not determine insurance coverage or payment, satisfy every notice or proof-of-loss requirement, or waive a deadline. Users must follow the channels and requirements in issued documentation.

The form does not accept file uploads. It instructs users not to provide seed phrases, private keys, passwords, signing requests, privileged credentials, or confidential evidence. Sensitive evidence requires a separately authenticated channel. The route's process-local IP limiter is not distributed protection; production deployments need appropriate shared or edge rate limiting.

## Launch gate

Do not launch until all of the following are complete:

- Verify the production `NEXT_PUBLIC_SITE_URL` and every configured public contact and portal value.
- Deploy durable webhook receivers for both intake routes and verify claims idempotency using `Idempotency-Key`.
- Approve all public legal, entity, regulatory, carrier, capacity, and transaction facts before publication.
- Obtain display approval for every partner, carrier, customer, insured-project name, logo, or relationship reference.
- Complete legal review of website copy, privacy handling, intake flows, and transaction-document disclaimers.
- Confirm that secrets are server-side only and that production logging, access controls, retention, monitoring, and incident procedures are appropriate for submitted data.

## Content boundary

Program and legal pages provide general, non-binding information. The assessment flow does not generate a score, eligibility decision, insurance coverage, or terms. Authorization, entity, carrier, administrator, product, jurisdiction, and coverage facts must come from verified transaction documentation. Transaction documents control coverage.
