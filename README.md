# Prime Insurances

A Next.js website for **Prime Insurances** presenting general information about preliminary underwriting review and potential insurance coverage for digital-asset protocols and infrastructure. Public copy is intentionally non-binding: transaction documents control coverage.

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

Open [http://localhost:3000](http://localhost:3000). The site URL defaults to this local origin only when `NEXT_PUBLIC_SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, and `VERCEL_URL` are all blank outside production.

### Production build

```bash
npm run build
npm start
```

`NEXT_PUBLIC_SITE_URL` is the preferred production origin and must contain the verified public HTTPS origin only, without credentials, a path, query parameters, or a fragment. The canonical Prime Insurances origin is <https://primeinsurances.com>. On Vercel, builds fall back to `VERCEL_PROJECT_PRODUCTION_URL` and then `VERCEL_URL` when the explicit value is blank. The resolved origin supplies route-correct canonical metadata, the sitemap, and robots configuration. Non-Vercel production builds must set `NEXT_PUBLIC_SITE_URL`.

## Brand

The identity is an original Prime Insurances identity. Use "Prime Insurances" in prose; do not shorten it to "Prime Insurance" or "Prime". Page titles end in `Prime Insurances` via the root metadata template. The logo mark combines a protective shield with a geometric **P** and is defined inline in `src/components/ui/Logo.tsx`. Assessment references use the `PI-` prefix. The former "Meridian Risk" name must not be reintroduced in user-facing copy, code, examples, or documentation.

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

- `NEXT_PUBLIC_SITE_URL` is preferred in production and should be set to the verified public canonical origin. When it is blank on Vercel, the application uses `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`; ensure Vercel system environment variables are available to the build. Non-Vercel production builds must set `NEXT_PUBLIC_SITE_URL`.
- `NEXT_PUBLIC_CLIENT_PORTAL_URL` is optional and must be a credential-free HTTPS URL when set. Blank or invalid values are omitted outside production; invalid configured values fail clearly in production. `NEXT_PUBLIC_CLIENT_SERVICES_EMAIL` and other public entity or contact values are optional and omitted when blank.
- `SUPABASE_URL` is required for assessment intake and must be the hosted Supabase project origin (`https://<project-ref>.supabase.co`) with no credentials, custom port, path, query, or fragment. Development also permits an HTTP origin for a local Supabase instance.
- `SUPABASE_SECRET_KEY` is required for assessment intake. Use the server-side secret key from Supabase **Settings → API Keys** (prefer the current `sb_secret_*` format). Store it only in the deployment's encrypted server environment; never commit it, paste it into browser code, or expose it through a `NEXT_PUBLIC_*` variable. Secret and legacy service-role keys bypass row-level security. Publishable (`sb_publishable_*`) and legacy anon keys are rejected and cannot replace this credential.
- The assessment route does not read `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_KEY`, or similarly named browser variables. Configure the exact server-only names `SUPABASE_URL` and `SUPABASE_SECRET_KEY` for each deployment environment that should accept submissions.
- Assessment submissions are written directly from the server route to `public.risk_assessments`; browser clients receive neither database credentials nor direct table access. Keep RLS enabled with no anonymous insert/read policy for this sensitive intake data.
- `CLAIMS_NOTIFICATION_WEBHOOK_URL` must be HTTPS and its receiver must durably persist or enqueue accepted notifications before returning `2xx`.
- The claims receiver must deduplicate retries by the `Idempotency-Key` header.
- `CLAIMS_NOTIFICATION_WEBHOOK_TOKEN` is required for claims delivery and must remain server-side.

The application does not claim a deployment adapter. Validate the build, runtime, environment handling, Supabase persistence, claims-webhook behavior, and edge protections on the selected production platform.

## Deployment (Vercel / Netlify)

Both intake routes are Next.js route handlers, so on Vercel and Netlify they run as **serverless functions**. That constrains the design in ways worth stating explicitly.

### Why Supabase over HTTPS is the right store here

The assessment route talks to Supabase through PostgREST over `fetch`, not a TCP Postgres connection. This is deliberate and suits serverless: there is no connection pool to exhaust across cold starts, and no pooler to configure. Do not swap in a direct-Postgres client without adding a pooler.

### Rate limiting does not survive serverless — configure it at the edge

`src/lib/rateLimit.ts` keeps counters in module scope. On Vercel and Netlify that state does not persist between invocations.

**This was measured, not assumed.** Serving the Netlify build locally (`netlify serve`, which runs the real Functions runtime), 28 consecutive requests to `/api/claims/notifications` carrying a constant client IP returned `422` every time and never once returned `429`. The identical code under `next start` limits on the 5th request. Both `x-nf-client-connection-ip` and `x-forwarded-for` were tried. Treat the in-process limiter as providing **no** protection on Netlify.

Configure real protection on the platform before accepting live submissions:

- **Vercel** — Firewall / WAF rate-limiting rules scoped to `/api/risk-assessments` and `/api/claims/notifications`, or `@upstash/ratelimit` backed by a shared store.
- **Netlify** — function-level rate limiting, or an equivalent shared store.

Client IP is read only from headers a trusted platform edge writes: `cf-connecting-ip` (Cloudflare), `x-nf-client-connection-ip` (Netlify), `x-vercel-forwarded-for` (Vercel). Bare `x-forwarded-for` is trusted **only** when `VERCEL` or `NETLIFY` is set, because any client can send it. When no trusted header is present the routes do not apply per-IP limiting at all rather than collapsing every caller into one shared bucket, which would let a single client exhaust the quota for everyone.

### Function timeout budget

The assessment route creates one `AbortSignal.timeout(8_000)` and shares it across both the insert and the duplicate-lookup request, so the Supabase phase cannot exceed 8s in total. That fits the 10s default function limit on Vercel Hobby and Netlify. If you lower the platform timeout below 10s, lower the signal to match.

### Resolving the public origin

`NEXT_PUBLIC_SITE_URL` is preferred everywhere. When it is blank the origin is resolved in this order:

| Platform | Fallbacks used |
| --- | --- |
| Vercel | `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL` |
| Netlify | `URL`, then `DEPLOY_PRIME_URL` (read only when `NETLIFY` is set) |
| Anything else | none — the production build fails closed |

A production build with no resolvable origin throws by design, because the sitemap, robots and canonical metadata would otherwise be silently wrong.

### Environment variables per platform

Set these as **server-side** variables in the platform dashboard, scoped per context. Never prefix the Supabase or claims secrets with `NEXT_PUBLIC_`.

```
NEXT_PUBLIC_SITE_URL              https://primeinsurances.com
SUPABASE_URL                      https://<project-ref>.supabase.co
SUPABASE_SECRET_KEY               sb_secret_...
CLAIMS_NOTIFICATION_WEBHOOK_URL   https://<receiver>/...
CLAIMS_NOTIFICATION_WEBHOOK_TOKEN <bearer token>
```

Netlify configuration is committed in `netlify.toml`: build command, publish directory, `@netlify/plugin-nextjs` (pinned in `devDependencies`), `NODE_VERSION=20`, `NPM_FLAGS=--ci` so a lockfile mismatch fails the build, `Cache-Control: no-store` on `/api/*`, and baseline security headers. Deploy-preview and branch-deploy contexts blank `NEXT_PUBLIC_SITE_URL` so previews resolve their own deploy URL rather than advertising the production origin.

The route handlers are bundled into a single Node function (`___netlify-server-handler`). Do not move them to the Edge runtime: the assessment route decodes a legacy Supabase JWT with `Buffer`, which Edge does not provide.

**Preview deployments must not share production intake.** Leave `SUPABASE_URL`, `SUPABASE_SECRET_KEY` and the claims variables unset in the Preview/Deploy-Preview context so preview intake fails closed with a generic 503, or point previews at a separate staging project with the same schema and its own secret.

### Netlify Forms as an alternative intake sink

Set `NETLIFY_FORMS_ENABLED=true` to route intake to Netlify Forms instead of Supabase and the claims webhook. Submissions then appear under **Forms** in the Netlify UI with the usual notifications, and no Supabase project is needed.

Precedence is deliberate and not configurable:

| Route | Sink used |
| --- | --- |
| `/api/risk-assessments` | Supabase if configured, otherwise Netlify Forms |
| `/api/claims/notifications` | Webhook if configured, otherwise Netlify Forms |

**Submission still goes through the route handlers.** The documented Netlify Forms pattern posts straight from the browser to a static file, which would bypass every guarantee these routes provide: allowlisted fields, enum validation, size caps, honeypot rejection, real-calendar-date checks, the issued `PI-`/`CLM-` reference, and the 24-hour deadline. So the handlers validate exactly as before and only then forward a normalised payload from the server. The React components are unchanged.

**What you give up.** Netlify Forms has no upsert and no idempotency key. Supabase dedupes on `submission_id`, so an unchanged retry returns the original reference without creating a second record. Netlify Forms cannot: a retry creates a second submission carrying the same `reference`, and operations staff must dedupe on that value. This was measured, not assumed — submitting the same claim twice produced two submissions with reference `CLM-2026-6276B4EB`. Prefer Supabase when duplicate-free intake matters. Note also that free-plan submission quotas apply, and that submissions are then stored in the Netlify UI, a different data location with its own access controls, for material including contract addresses, security-control descriptions and incident history.

**`public/__forms.html` is load-bearing.** Netlify detects forms by scanning static HTML at deploy time, and accepts only the form and field names it detected. Next.js App Router pages are not emitted as static HTML for this purpose, so `data-netlify` attributes in React have no effect — and `@netlify/plugin-nextjs@5` intentionally fails the build if it finds them without a static detection file. Any field added to a payload must also be declared in `public/__forms.html`, or Netlify silently drops it.

### Database schema
`supabase/migrations/0001_risk_assessments.sql` creates `public.risk_assessments` with the unique `submission_id` conflict target the route requires, the workflow status constraint, the operations queue columns and indexes, RLS enabled with no policy, and privileges revoked from `anon`/`authenticated`. Run it in the Supabase SQL editor **before** setting the environment variables, or inserts fail with `PGRST204` (missing column) or `42P10` (no unique constraint on the conflict target).

### Exercising the forms locally

Neither form can submit without external infrastructure. For local work, `tools/dev-intake-receiver.mjs` stands in for both — a PostgREST-shaped store for assessments and an HTTPS claims webhook that deduplicates on `Idempotency-Key`:

```bash
./tools/dev-with-local-intake.sh      # receiver on loopback + next dev
```

It is **development only**. It writes submissions as JSON lines outside the repository, does not implement Postgres types, constraints or RLS, and must never receive production traffic. The assessment route only accepts an `http`/non-`supabase.co` origin when `NODE_ENV` is not `production`, so this wiring is deliberately unusable in a production build.

## Assessment intake and manual review

`/risk-assessment` is a five-step intake: Organization; Architecture & controls; Coverage request; Review details; Contact & submit. Step four is a read-only summary with edit controls. Client validation prevents incomplete steps from advancing, while `POST /api/risk-assessments` remains authoritative and accepts only an allowlisted JSON body of at most 128 KB. The expanded cap accommodates the bounded character limits after UTF-8 encoding and JSON escaping.

The structured submission includes:

- Organization: protocol name, legal name, public HTTP/HTTPS website, category, jurisdiction, protocol description, TVL range, and one or more deployed networks.
- Architecture and controls: public contract/deployment details, audit history and details, governance, admin/upgrade privileges, oracle model, external dependencies, security controls, incident history, and incident/remediation details when applicable.
- Coverage request: one or more existing insurance-program slugs, coverage objectives, requested limit, target effective date, and proposed policy period. The target date must be a real `YYYY-MM-DD` calendar date but is not required to be in the future.
- Contact and authority: name, valid email, role, optional telephone, preferred contact method, optional notes, and confirmation that the submitter is authorized and the information is accurate to their knowledge.

The `companySite` honeypot remains part of the browser payload but is never forwarded. The form does not accept uploads and warns users not to submit passwords, private keys, seed phrases, signing requests, privileged credentials, or confidential vulnerability or exploit material.

The browser creates a stable submission UUID when delivery begins, reuses it for an unchanged retry, and replaces it only after the user edits submitted data. The API normalizes every assessment field and adds `reference`, `receivedAt`, `reviewType: "manual"`, and `responseTargetHours: 24`. It inserts the submission directly into `public.risk_assessments` using the server-only secret key. The UUID is the database idempotency key: an unchanged retry returns the original stored reference without overwriting status, assignment, notes, or timestamps. Reusing a UUID with different assessment data returns `409`. Redirects are rejected, and the browser receives a reference only after a durable row exists.

New rows use database status `new`; the public API retains status `received_for_preliminary_review`. Searchable organization, contact, coverage, and date fields are stored in dedicated columns, while the complete normalized submission is retained in `payload`. `received_at` is captured once and `response_due_at` is exactly 24 hours later. The honeypot and all environment secrets are excluded from the stored payload.

The route requires the preconfigured `public.risk_assessments` schema: `submission_id` (UUID) and `reference` must each be unique, `payload` must be `jsonb`, and the summary, workflow, receipt, deadline, assignment, response, quotation, closure, and audit timestamp columns described below must remain available. Keep RLS enabled, revoke anonymous/authenticated table access, and define no browser-facing policy; the server secret is the only application credential authorized to persist or retrieve these records.

A human underwriter will review a complete submission and send the assessment and quotation within 24 hours. If more information is required, the submitter will receive a status update within that period. No automated score is produced. Any quotation remains subject to underwriting and authorized transaction documents and does not bind coverage.

Operations staff can retrieve submissions in Supabase from **Table Editor → risk_assessments**. The dedicated summary columns support filtering without opening the full `payload`; for example:

```sql
select
  reference,
  status,
  protocol,
  contact_name,
  contact_email,
  requested_limit,
  received_at,
  response_due_at,
  assigned_to
from public.risk_assessments
where status in ('new', 'under_review', 'more_information_required')
order by response_due_at asc;
```

The configured workflow statuses are `new`, `under_review`, `more_information_required`, `quoted`, `declined`, and `closed`. Operational processes should assign each new row, update its status, set `first_responded_at` on the first human response, and monitor `response_due_at` for escalation. The database stores the request; it does not by itself notify or assign an underwriter, so those queue procedures must be actively operated or automated separately.

Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` only for the production deployment that should accept live submissions. Do not point preview deployments at the production project. If preview submissions are needed, use a separate staging Supabase project with the same schema and separate secret; otherwise leave these variables unset so preview intake fails closed with a generic service-unavailable response.

Persistence failures remain generic to the browser. Vercel function logs include only a safe failure stage and, when Supabase returned a response, its HTTP status and validated PostgREST/SQLSTATE code; they never include credentials, assessment data, or the Supabase response message/body. `insert_response status=401` or `403` indicates an invalid/insufficient server credential. For `status=400`, `code=PGRST204` indicates a missing column or stale Data API schema cache, `code=42P10` indicates that the `submission_id` conflict target lacks a matching unique constraint, `code=23514` indicates a check-constraint violation, and `code=22P02` indicates an invalid database value/type. A stage ending in `_request` indicates a fetch, timeout, network, or rejected-redirect failure. A stage ending in `_representation` indicates an unexpected response body, body-consumption failure, or parse failure.

## Claims intake and sensitive data

`POST /api/claims/notifications` accepts an allowlisted, size-limited JSON payload and forwards it to the configured claims receiver. Discovery time is normalized to UTC while retaining the user's local value and timezone. A stable submission identifier is reused as the webhook `Idempotency-Key`; the receiver must deduplicate on that key. Redirects are rejected. The browser receives a reference only after the receiver returns a successful response.

Receipt confirms initial intake only. It does not determine insurance coverage or payment, satisfy every notice or proof-of-loss requirement, or waive a deadline. Users must follow the channels and requirements in issued documentation.

The form does not accept file uploads. It instructs users not to provide seed phrases, private keys, passwords, signing requests, privileged credentials, or confidential evidence. Sensitive evidence requires a separately authenticated channel. The route's process-local IP limiter is not distributed protection; production deployments need appropriate shared or edge rate limiting.

## Launch gate

Do not launch until all of the following are complete:

- Verify the resolved production origin: set `NEXT_PUBLIC_SITE_URL` to the approved canonical domain, or confirm the Vercel system-domain fallback is correct. Verify every configured public contact and portal value.
- Run `supabase/migrations/0001_risk_assessments.sql` against the production project, then verify direct assessment persistence in that project, including unchanged-retry deduplication by `submission_id`, original-reference retention, `new` status, and the 24-hour `response_due_at`; separately verify claims-webhook deduplication using `Idempotency-Key`.
- Enable platform-level rate limiting on both intake routes. The in-process limiter is per serverless instance and is not a substitute.
- Configure manual assessment assignment, queue monitoring, and escalation so every complete submission receives an assessment and quotation within 24 hours or a status update within that period.
- Approve all public legal, entity, regulatory, carrier, capacity, and transaction facts before publication.
- Obtain display approval for every partner, carrier, customer, insured-project name, logo, or relationship reference.
- Complete legal review of website copy, privacy handling, intake flows, and transaction-document disclaimers.
- Confirm that secrets are server-side only and that production logging, access controls, retention, monitoring, and incident procedures are appropriate for submitted data.

## Content boundary

Program and legal pages provide general, non-binding information. The assessment flow collects structured information for manual underwriting review and does not generate an automated score, eligibility decision, insurance coverage, or binding terms. A human underwriter will review a complete submission and send the assessment and quotation within 24 hours. If more information is required, the submitter will receive a status update within that period. Any quotation remains subject to underwriting and authorized transaction documents. Authorization, entity, carrier, administrator, product, jurisdiction, and coverage facts must come from verified transaction documentation. Transaction documents control coverage.
