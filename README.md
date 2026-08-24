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
- `/risk-assessment` — Organization → architecture & controls → coverage request → review details → contact & submit
- `/claims/notify` — Initial incident-notification intake
- `/client-login` — Configured policyholder portal and client-services guidance
- `/company/[slug]` — General company information
- `/resources` and `/resources/[slug]` — Risk and assessment reference material
- `/legal` and `/legal/[slug]` — Website terms, disclosures, and general documentation

## Environment configuration

Copy `.env.example` into the deployment's environment configuration and set only verified values.

- `NEXT_PUBLIC_SITE_URL` is required in production.
- `NEXT_PUBLIC_CLIENT_PORTAL_URL` is optional and must be a credential-free HTTPS URL when set. Blank or invalid values are omitted outside production; invalid configured values fail clearly in production. `NEXT_PUBLIC_CLIENT_SERVICES_EMAIL` and other public entity or contact values are optional and omitted when blank.
- `RISK_ASSESSMENT_WEBHOOK_URL` is required in production, must be credential-free HTTPS, and must point to a receiver that durably persists or enqueues accepted assessment submissions before returning `2xx`. HTTP is permitted only outside production.
- `RISK_ASSESSMENT_WEBHOOK_TOKEN` is required in production. Keep it separate from `CLAIMS_NOTIFICATION_WEBHOOK_TOKEN` and never expose either through `NEXT_PUBLIC_*`.
- The assessment receiver must deduplicate deliveries using `Idempotency-Key`, retain `X-Assessment-Reference`, assign every complete submission to a human underwriter, and track the 24-hour response target.
- `CLAIMS_NOTIFICATION_WEBHOOK_URL` must be HTTPS and its receiver must durably persist or enqueue accepted notifications before returning `2xx`.
- The claims receiver must deduplicate retries by the `Idempotency-Key` header.
- `CLAIMS_NOTIFICATION_WEBHOOK_TOKEN` is required for claims delivery and must remain server-side.

The application does not claim a deployment adapter. Validate the build, runtime, environment handling, webhook behavior, and edge protections on the selected production platform.

## Assessment intake and manual review

`/risk-assessment` is a five-step intake: Organization; Architecture & controls; Coverage request; Review details; Contact & submit. Step four is a read-only summary with edit controls. Client validation prevents incomplete steps from advancing, while `POST /api/risk-assessments` remains authoritative and accepts only an allowlisted JSON body of at most 128 KB. The expanded cap accommodates the bounded character limits after UTF-8 encoding and JSON escaping.

The structured submission includes:

- Organization: protocol name, legal name, public HTTP/HTTPS website, category, jurisdiction, protocol description, TVL range, and one or more deployed networks.
- Architecture and controls: public contract/deployment details, audit history and details, governance, admin/upgrade privileges, oracle model, external dependencies, security controls, incident history, and incident/remediation details when applicable.
- Coverage request: one or more existing insurance-program slugs, coverage objectives, requested limit, target effective date, and proposed policy period. The target date must be a real `YYYY-MM-DD` calendar date but is not required to be in the future.
- Contact and authority: name, valid email, role, optional telephone, preferred contact method, optional notes, and confirmation that the submitter is authorized and the information is accurate to their knowledge.

The `companySite` honeypot remains part of the browser payload but is never forwarded. The form does not accept uploads and warns users not to submit passwords, private keys, seed phrases, signing requests, privileged credentials, or confidential vulnerability or exploit material.

The browser creates a stable submission UUID when delivery begins, reuses it for an unchanged retry, and replaces it only after the user edits submitted data. The API normalizes every assessment field and adds `reference`, `receivedAt`, `reviewType: "manual"`, and `responseTargetHours: 24`. It sends the stable UUID in `Idempotency-Key` and the public reference in `X-Assessment-Reference`; the receiver must deduplicate on the idempotency key, preserve the reference, durably persist or enqueue the request, assign it to a human underwriter, and track the response target before returning `2xx`. Redirects are rejected. The browser receives a reference only after successful receiver acceptance.

A human underwriter will review a complete submission and send the assessment and quotation within 24 hours. If more information is required, the submitter will receive a status update within that period. No automated score is produced. Any quotation remains subject to underwriting and authorized transaction documents and does not bind coverage.

In production, the assessment webhook must be credential-free HTTPS and `RISK_ASSESSMENT_WEBHOOK_TOKEN` must be set. Missing or invalid receiver configuration fails closed with a generic service-unavailable response.

## Claims intake and sensitive data

`POST /api/claims/notifications` accepts an allowlisted, size-limited JSON payload and forwards it to the configured claims receiver. Discovery time is normalized to UTC while retaining the user's local value and timezone. A stable submission identifier is reused as the webhook `Idempotency-Key`; the receiver must deduplicate on that key. Redirects are rejected. The browser receives a reference only after the receiver returns a successful response.

Receipt confirms initial intake only. It does not determine insurance coverage or payment, satisfy every notice or proof-of-loss requirement, or waive a deadline. Users must follow the channels and requirements in issued documentation.

The form does not accept file uploads. It instructs users not to provide seed phrases, private keys, passwords, signing requests, privileged credentials, or confidential evidence. Sensitive evidence requires a separately authenticated channel. The route's process-local IP limiter is not distributed protection; production deployments need appropriate shared or edge rate limiting.

## Launch gate

Do not launch until all of the following are complete:

- Verify the production `NEXT_PUBLIC_SITE_URL` and every configured public contact and portal value.
- Deploy durable webhook receivers for both intake routes; verify assessment and claims deduplication using `Idempotency-Key`, and retain the assessment reference header.
- Configure manual assessment assignment, queue monitoring, and escalation so every complete submission receives an assessment and quotation within 24 hours or a status update within that period.
- Approve all public legal, entity, regulatory, carrier, capacity, and transaction facts before publication.
- Obtain display approval for every partner, carrier, customer, insured-project name, logo, or relationship reference.
- Complete legal review of website copy, privacy handling, intake flows, and transaction-document disclaimers.
- Confirm that secrets are server-side only and that production logging, access controls, retention, monitoring, and incident procedures are appropriate for submitted data.

## Content boundary

Program and legal pages provide general, non-binding information. The assessment flow collects structured information for manual underwriting review and does not generate an automated score, eligibility decision, insurance coverage, or binding terms. A human underwriter will review a complete submission and send the assessment and quotation within 24 hours. If more information is required, the submitter will receive a status update within that period. Any quotation remains subject to underwriting and authorized transaction documents. Authorization, entity, carrier, administrator, product, jurisdiction, and coverage facts must come from verified transaction documentation. Transaction documents control coverage.
