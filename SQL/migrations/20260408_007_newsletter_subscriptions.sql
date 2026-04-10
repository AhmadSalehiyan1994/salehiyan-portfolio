-- Phase 7: Newsletter Subscriptions (Double Opt-In)
-- Purpose:
--   Store newsletter subscriptions and confirmation tokens for `/api/newsletter/*`.
-- Notes:
--   - Idempotent migration (safe re-run)
--   - Tokens are stored as hashes (never store raw tokens)

create extension if not exists pgcrypto;

create table if not exists newsletter_subscriptions (
  email text primary key,
  status text not null default 'pending',
  confirmed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_newsletter_subscriptions_status
  on newsletter_subscriptions (status);

create table if not exists newsletter_confirmation_tokens (
  id uuid primary key default gen_random_uuid(),
  email text not null references newsletter_subscriptions(email) on delete cascade,
  token_hash text not null,
  expires_at timestamptz not null,
  consumed_at timestamptz,
  created_at timestamptz not null default now()
);

create unique index if not exists idx_newsletter_confirmation_tokens_token_hash
  on newsletter_confirmation_tokens (token_hash);

create index if not exists idx_newsletter_confirmation_tokens_email
  on newsletter_confirmation_tokens (email);
