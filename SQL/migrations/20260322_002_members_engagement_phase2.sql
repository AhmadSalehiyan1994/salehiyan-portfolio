-- Phase 2 foundation: members/auth/comments/notifications/badges

create extension if not exists pgcrypto;

create table if not exists members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  password_hash text not null,
  role text not null default 'member' check (role in ('member', 'admin')),
  preferred_language text not null default 'en' check (preferred_language in ('en', 'fa')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_members_role on members(role);

create table if not exists poll_comments (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls(id) on delete cascade,
  member_id uuid not null references members(id) on delete cascade,
  body text not null,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'hidden')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_poll_comments_poll on poll_comments(poll_id, created_at desc);
create index if not exists idx_poll_comments_status on poll_comments(status);

create table if not exists poll_topic_follows (
  member_id uuid not null references members(id) on delete cascade,
  topic_slug text not null,
  created_at timestamptz not null default now(),
  primary key (member_id, topic_slug)
);

create table if not exists poll_notifications (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references members(id) on delete cascade,
  type text not null check (type in ('new_poll', 'poll_result', 'badge_awarded', 'vote_recorded')),
  title text not null,
  body text,
  metadata jsonb not null default '{}'::jsonb,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists idx_poll_notifications_member on poll_notifications(member_id, created_at desc);

create table if not exists poll_badges (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text not null,
  created_at timestamptz not null default now()
);

create table if not exists member_badges (
  member_id uuid not null references members(id) on delete cascade,
  badge_id uuid not null references poll_badges(id) on delete cascade,
  awarded_at timestamptz not null default now(),
  reason text,
  primary key (member_id, badge_id)
);

insert into poll_badges (slug, name, description)
values
  ('early-voter', 'Early Voter', 'Participated in community polls early.'),
  ('top-contributor', 'Top Contributor', 'Consistently engaged with poll activity and feedback.')
on conflict (slug) do nothing;
