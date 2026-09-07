-- PixelProof user profiles and challenge performance tracking.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'PixelProof learner',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.challenge_attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  challenge_id text not null check (challenge_id ~ '^challenge(?:[1-9]|1[0-4])$'),
  visual_score smallint not null check (visual_score between 0 and 100),
  responsive_score smallint not null check (responsive_score between 0 and 100),
  accessibility_score smallint not null check (accessibility_score between 0 and 100),
  code_quality_score smallint not null check (code_quality_score between 0 and 100),
  overall_score smallint not null check (overall_score between 0 and 100),
  completed boolean generated always as (overall_score >= 70) stored,
  submitted_at timestamptz not null default now()
);

create index if not exists challenge_attempts_user_challenge_idx
  on public.challenge_attempts(user_id, challenge_id, submitted_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security invoker
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(
      nullif(new.raw_user_meta_data ->> 'display_name', ''),
      nullif(split_part(new.email, '@', 1), ''),
      'PixelProof learner'
    )
  );
  return new;
end;
$$;

drop trigger if exists create_profile_after_signup on auth.users;
create trigger create_profile_after_signup
after insert on auth.users
for each row execute function public.create_profile_for_new_user();

alter table public.profiles enable row level security;
alter table public.challenge_attempts enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.challenge_attempts from anon, authenticated;
grant select, update on table public.profiles to authenticated;
grant select on table public.challenge_attempts to authenticated;

drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
on public.profiles for select
to authenticated
using ((select auth.uid()) = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

drop policy if exists "Users can read their own attempts" on public.challenge_attempts;
create policy "Users can read their own attempts"
on public.challenge_attempts for select
to authenticated
using ((select auth.uid()) = user_id);

create or replace view public.user_challenge_progress
with (security_invoker = true)
as
select
  user_id,
  challenge_id,
  count(*)::integer as attempt_count,
  max(overall_score)::smallint as best_score,
  (array_agg(overall_score order by submitted_at desc))[1]::smallint as latest_score,
  bool_or(completed) as completed,
  min(submitted_at) filter (where completed) as completed_at,
  max(submitted_at) as last_attempted_at
from public.challenge_attempts
group by user_id, challenge_id;

create or replace view public.user_performance_summary
with (security_invoker = true)
as
select
  user_id,
  count(*)::integer as total_attempts,
  count(distinct challenge_id) filter (where completed)::integer as completed_challenges,
  round(avg(overall_score), 1) as average_score,
  max(overall_score)::smallint as best_score,
  round(avg(visual_score), 1) as visual_accuracy,
  round(avg(responsive_score), 1) as responsive_accuracy,
  round(avg(accessibility_score), 1) as accessibility_accuracy,
  round(avg(code_quality_score), 1) as code_quality_accuracy,
  max(submitted_at) as last_active_at
from public.challenge_attempts
group by user_id;

revoke all on table public.user_challenge_progress from anon, authenticated;
revoke all on table public.user_performance_summary from anon, authenticated;
grant select on table public.user_challenge_progress to authenticated;
grant select on table public.user_performance_summary to authenticated;
