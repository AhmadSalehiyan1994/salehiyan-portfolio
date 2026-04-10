-- Phase 3D: Backend hardening foundations
-- Purpose:
--   Add security/session, audit, distributed rate-limit, and job tracking tables.
-- Why needed:
--   Production backend requires revocable sessions, structured admin audit trails,
--   multi-instance-safe throttling, and periodic job observability.

create extension if not exists pgcrypto;

alter table members
  add column if not exists session_version int not null default 1,
  add column if not exists token_revoked_before timestamptz;

create table if not exists admin_audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_member_id uuid references members(id) on delete set null,
  actor_role text,
  action text not null,
  target_type text,
  target_id text,
  status text not null default 'success' check (status in ('success', 'failed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_admin_audit_logs_created_at
  on admin_audit_logs (created_at desc);
create index if not exists idx_admin_audit_logs_action
  on admin_audit_logs (action);
create index if not exists idx_admin_audit_logs_metadata_gin
  on admin_audit_logs using gin (metadata);

create table if not exists request_rate_limits (
  id bigserial primary key,
  route_key text not null,
  subject_key text not null,
  window_start timestamptz not null,
  hits int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (route_key, subject_key, window_start)
);

create index if not exists idx_request_rate_limits_lookup
  on request_rate_limits (route_key, subject_key, window_start desc);

create table if not exists backend_job_runs (
  id uuid primary key default gen_random_uuid(),
  job_name text not null,
  status text not null check (status in ('running', 'success', 'failed')),
  details jsonb not null default '{}'::jsonb,
  started_at timestamptz not null default now(),
  finished_at timestamptz
);

create index if not exists idx_backend_job_runs_name_started
  on backend_job_runs (job_name, started_at desc);
create index if not exists idx_backend_job_runs_details_gin
  on backend_job_runs using gin (details);
