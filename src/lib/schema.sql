-- Southbank Alumni Network — Supabase Schema
-- Run this in the Supabase SQL Editor to set up your database

-- Alumni profiles table
create table if not exists alumni_profiles (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  undergraduate_degree text not null,
  university text not null,
  location_city text not null,
  location_country text not null,
  latitude float,
  longitude float,
  graduation_year integer,
  hl_subjects text[] not null default '{}',
  hl_teachers text[] not null default '{}',
  current_profession text not null,
  advice_to_students text not null,
  favourite_memory text not null,
  took_gap_year boolean not null default false,
  interesting_first_year_class text not null,
  linkedin_url text,
  open_to_contact boolean not null default false,
  open_to_mentoring boolean not null default false,
  consent_given boolean not null default false,
  consent_given_at timestamptz,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

-- Project posts table
create table if not exists project_posts (
  id uuid default gen_random_uuid() primary key,
  student_name text not null,
  project_title text not null,
  project_description text not null,
  related_subjects text[] not null default '{}',
  funding_needed text,
  logistics text not null,
  help_tags text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now()
);

-- Events table
create table if not exists events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  event_date timestamptz not null,
  location text,
  created_at timestamptz not null default now()
);

-- Indexes for common queries
create index if not exists idx_alumni_status on alumni_profiles(status);
create index if not exists idx_alumni_university on alumni_profiles(university);
create index if not exists idx_alumni_country on alumni_profiles(location_country);
create index if not exists idx_alumni_profession on alumni_profiles(current_profession);
create index if not exists idx_alumni_gap_year on alumni_profiles(took_gap_year);
create index if not exists idx_alumni_graduation_year on alumni_profiles(graduation_year);
create index if not exists idx_alumni_hl_subjects on alumni_profiles using gin (hl_subjects);
create index if not exists idx_projects_status on project_posts(status);
create index if not exists idx_events_date on events(event_date);

-- Row Level Security
alter table alumni_profiles enable row level security;
alter table project_posts enable row level security;
alter table events enable row level security;

-- Public can read approved alumni profiles
create policy "Public can view approved alumni"
  on alumni_profiles for select
  using (status = 'approved');

-- Public can insert new alumni profiles (submission form)
create policy "Public can submit alumni profiles"
  on alumni_profiles for insert
  with check (status = 'pending' and consent_given = true);

-- Public can read approved project posts
create policy "Public can view approved projects"
  on project_posts for select
  using (status = 'approved');

-- Public can insert new project posts
create policy "Public can submit projects"
  on project_posts for insert
  with check (status = 'pending');

-- Events: public can read all events
create policy "Public can view events"
  on events for select
  using (true);

-- Events: only service role can insert/update/delete (bypasses RLS automatically)
-- No additional policies needed — service role bypasses RLS,
-- and the absence of INSERT/UPDATE/DELETE policies for anon means
-- anonymous users cannot modify events.
