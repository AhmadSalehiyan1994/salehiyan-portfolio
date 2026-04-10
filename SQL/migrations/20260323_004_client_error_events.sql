-- Phase 3B: Client Error Event Logging
-- Purpose:
--   Persist browser-side runtime errors sent to `/api/client-errors`.
-- Why needed:
--   Frontend error monitoring improves website reliability only if events are
--   queryable in backend storage.
-- Notes:
--   - Idempotent migration (safe re-run)
--   - Flexible metadata column for browser/context diagnostics

create extension if not exists pgcrypto;

create table if not exists client_error_events (
  id uuid primary key default gen_random_uuid(),
  error_type text,
  message text,
  url text,
  stack text,
  user_agent text,
  ip_address text,
  event_timestamp timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_client_error_events_created_at
  on client_error_events (created_at desc);

create index if not exists idx_client_error_events_type
  on client_error_events (error_type);

create index if not exists idx_client_error_events_url
  on client_error_events (url);

create index if not exists idx_client_error_events_metadata_gin
  on client_error_events using gin (metadata);
