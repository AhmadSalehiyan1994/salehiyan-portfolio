-- Phase 3A: Contact Submissions Persistence
-- Purpose:
--   Store validated contact form submissions from `/api/contact`.
-- Why needed:
--   The website contact form is a frontend feature, but reliable follow-up requires
--   backend persistence instead of console-only logging.
-- Notes:
--   - Idempotent migration (safe re-run)
--   - Includes query-friendly indexes for admin/backoffice usage

create extension if not exists pgcrypto;

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  subject text,
  message text not null,
  source text not null default 'website-contact-form',
  user_agent text,
  ip_address text,
  submitted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_contact_submissions_submitted_at
  on contact_submissions (submitted_at desc);

create index if not exists idx_contact_submissions_email
  on contact_submissions (email);

create index if not exists idx_contact_submissions_source
  on contact_submissions (source);
