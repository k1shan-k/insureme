-- Prime Insurances — risk assessment intake table.
--
-- Required by POST /api/risk-assessments (src/app/api/risk-assessments/route.ts).
-- The route writes directly to PostgREST with the server-only secret key and
-- relies on this exact shape:
--
--   * submission_id  UUID, unique  -- on_conflict target for idempotent retries
--   * reference      TEXT, unique  -- PI-<year>-<8 hex> issued by the route
--   * payload        JSONB         -- complete normalised submission
--   * received_at / response_due_at  -- receipt and the 24-hour response deadline
--
-- Run this against the project BEFORE setting SUPABASE_URL / SUPABASE_SECRET_KEY,
-- otherwise inserts fail with PGRST204 (missing column) or 42P10 (no unique
-- constraint on the conflict target).

create table if not exists public.risk_assessments (
  -- Idempotency key supplied by the browser. Primary key so that
  -- "on_conflict=submission_id" has a matching unique index.
  submission_id           uuid primary key,
  reference               text        not null unique,

  -- Workflow.
  status                  text        not null default 'new',

  -- Searchable summary columns. These duplicate part of payload so operations
  -- staff can filter in the Table Editor without opening the full JSON.
  protocol                text        not null,
  legal_name              text        not null,
  website                 text        not null,
  category                text        not null,
  jurisdiction            text        not null,
  contact_name            text        not null,
  contact_email           text        not null,
  contact_role            text        not null,
  contact_phone           text,
  preferred_contact       text        not null,
  requested_limit         text        not null,
  target_effective_date   date        not null,
  policy_period           text        not null,

  -- Complete normalised submission. Excludes the honeypot and all secrets.
  payload                 jsonb       not null,

  -- Receipt and deadline. received_at is captured once by the route and must
  -- never be rewritten by a retry; response_due_at is exactly 24 hours later.
  received_at             timestamptz not null,
  response_due_at         timestamptz not null,

  -- Manual-review queue fields, owned by operations rather than the website.
  assigned_to             text,
  first_responded_at      timestamptz,
  quoted_at               timestamptz,
  closed_at               timestamptz,
  internal_notes          text,

  -- Audit timestamps.
  created_at              timestamptz not null default now(),
  updated_at              timestamptz not null default now(),

  constraint risk_assessments_status_check check (
    status in (
      'new',
      'under_review',
      'more_information_required',
      'quoted',
      'declined',
      'closed'
    )
  ),
  -- The route always sets the deadline 24 hours after receipt.
  constraint risk_assessments_response_due_after_receipt check (
    response_due_at > received_at
  )
);

comment on table public.risk_assessments is
  'Prime Insurances assessment intake. Written only by the server route using the Supabase secret key. No browser-facing policy.';
comment on column public.risk_assessments.submission_id is
  'Browser-generated idempotency key. An unchanged retry must return the original reference.';
comment on column public.risk_assessments.payload is
  'Complete normalised submission. Never contains the honeypot or environment secrets.';

-- Indexes for the operations queue.
create index if not exists risk_assessments_status_due_idx
  on public.risk_assessments (status, response_due_at);
create index if not exists risk_assessments_received_at_idx
  on public.risk_assessments (received_at desc);
create index if not exists risk_assessments_contact_email_idx
  on public.risk_assessments (contact_email);
create index if not exists risk_assessments_assigned_to_idx
  on public.risk_assessments (assigned_to)
  where assigned_to is not null;

-- Keep updated_at honest without letting a retry disturb received_at.
create or replace function public.risk_assessments_touch_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists risk_assessments_touch_updated_at on public.risk_assessments;
create trigger risk_assessments_touch_updated_at
  before update on public.risk_assessments
  for each row execute function public.risk_assessments_touch_updated_at();

-- ---------------------------------------------------------------------------
-- Access control.
--
-- This table holds sensitive underwriting intake: contract addresses, security
-- controls, incident history and named contacts. Keep RLS enabled and define NO
-- policy, so the only way in is a role that bypasses RLS. The secret key used by
-- the server route maps to service_role, which does.
-- ---------------------------------------------------------------------------
alter table public.risk_assessments enable row level security;

revoke all on public.risk_assessments from anon, authenticated;
grant select, insert, update on public.risk_assessments to service_role;
