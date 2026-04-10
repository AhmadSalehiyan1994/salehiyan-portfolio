-- Phase 1 Poll System (PostgreSQL)
-- Safe to run in a migration pipeline once.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'poll_status') then
    create type poll_status as enum ('draft', 'scheduled', 'active', 'closed', 'archived');
  end if;

  if not exists (select 1 from pg_type where typname = 'poll_visibility') then
    create type poll_visibility as enum ('public', 'members');
  end if;

  if not exists (select 1 from pg_type where typname = 'poll_results_visibility') then
    create type poll_results_visibility as enum ('public', 'after_vote', 'after_close');
  end if;

  if not exists (select 1 from pg_type where typname = 'poll_target_type') then
    create type poll_target_type as enum ('global', 'article', 'topic');
  end if;
end $$;

create table if not exists polls (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  status poll_status not null default 'draft',
  visibility poll_visibility not null default 'members',
  results_visibility poll_results_visibility not null default 'after_vote',
  allow_multiple boolean not null default false,
  max_choices int,
  starts_at timestamptz,
  ends_at timestamptz,
  is_featured boolean not null default false,
  created_by uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (max_choices is null or max_choices > 0),
  check (ends_at is null or starts_at is null or ends_at > starts_at)
);

create index if not exists idx_polls_status_dates on polls(status, starts_at, ends_at);
create index if not exists idx_polls_featured on polls(is_featured) where is_featured = true;

create table if not exists poll_options (
  id bigserial primary key,
  poll_id uuid not null references polls(id) on delete cascade,
  label text not null,
  position int not null,
  created_at timestamptz not null default now(),
  unique (poll_id, position)
);

create index if not exists idx_poll_options_poll_id on poll_options(poll_id);

create table if not exists poll_targets (
  id bigserial primary key,
  poll_id uuid not null references polls(id) on delete cascade,
  target_type poll_target_type not null,
  target_key text not null,
  unique (poll_id, target_type, target_key)
);

create index if not exists idx_poll_targets_target on poll_targets(target_type, target_key);

create table if not exists poll_topics (
  id bigserial primary key,
  poll_id uuid not null references polls(id) on delete cascade,
  topic_slug text not null,
  unique (poll_id, topic_slug)
);

create index if not exists idx_poll_topics_slug on poll_topics(topic_slug);

create table if not exists poll_ballots (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls(id) on delete cascade,
  member_id uuid not null,
  created_at timestamptz not null default now(),
  unique (poll_id, member_id)
);

create index if not exists idx_poll_ballots_poll_id on poll_ballots(poll_id);
create index if not exists idx_poll_ballots_member_id on poll_ballots(member_id);

create table if not exists poll_ballot_choices (
  ballot_id uuid not null references poll_ballots(id) on delete cascade,
  poll_option_id bigint not null references poll_options(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (ballot_id, poll_option_id)
);

create index if not exists idx_poll_ballot_choices_option on poll_ballot_choices(poll_option_id);

-- Optional Phase 2+ tables (commented for now):
-- poll_comments, topic_follows, notifications, badges, badge_awards

-- Seed one active poll for immediate testing.
insert into polls (
  slug,
  title,
  description,
  status,
  visibility,
  results_visibility,
  allow_multiple,
  max_choices,
  starts_at,
  is_featured
)
values (
  'next-deep-dive-topic',
  'Which topic should be the next deep-dive article?',
  'Help prioritize the next long-form practical article for the community.',
  'active',
  'members',
  'after_vote',
  false,
  1,
  now(),
  true
)
on conflict (slug) do nothing;

with seeded as (
  select id from polls where slug = 'next-deep-dive-topic'
)
insert into poll_options (poll_id, label, position)
select seeded.id, options.label, options.position
from seeded
cross join (
  values
    ('Machine Learning for Reliability', 1),
    ('Integer Programming in Planning', 2),
    ('Maintenance KPI System Design', 3)
) as options(label, position)
on conflict (poll_id, position) do nothing;

with seeded as (
  select id from polls where slug = 'next-deep-dive-topic'
)
insert into poll_targets (poll_id, target_type, target_key)
select seeded.id, 'global', 'global'
from seeded
on conflict (poll_id, target_type, target_key) do nothing;

with seeded as (
  select id from polls where slug = 'next-deep-dive-topic'
)
insert into poll_topics (poll_id, topic_slug)
select seeded.id, topic.slug
from seeded
cross join (values ('machine-learning'), ('optimization'), ('maintenance')) as topic(slug)
on conflict (poll_id, topic_slug) do nothing;
