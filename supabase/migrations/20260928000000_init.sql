create extension if not exists pgcrypto;

create table if not exists public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('staff', 'client')),
  organization_id uuid references public.organizations (id) on delete set null,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  published_on date not null default current_date,
  excerpt text not null default '',
  body text not null default '',
  cover_path text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.indicators (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value text not null,
  period text not null default '',
  trend text not null default '',
  icon text not null default 'chart',
  sort integer not null default 0,
  source text not null default 'manual' check (source in ('live', 'manual')),
  series_code text,
  override_value text,
  as_of date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  bio text not null default '',
  photo_path text,
  sort integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organization text not null default '',
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  name text not null,
  summary text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  project_id uuid not null references public.projects (id) on delete cascade,
  name text not null,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  title text not null,
  amount_cents integer not null check (amount_cents >= 0),
  currency text not null default 'usd',
  status text not null default 'draft' check (status in ('draft', 'open', 'paid', 'void')),
  stripe_session_id text,
  stripe_payment_intent_id text,
  created_at timestamptz not null default now()
);

create table if not exists public.stripe_events (
  id text primary key,
  received_at timestamptz not null default now()
);

create table if not exists public.rate_limits (
  id bigint generated always as identity primary key,
  bucket text not null,
  key text not null,
  created_at timestamptz not null default now()
);

create index if not exists insights_published_idx on public.insights (published, published_on desc);
create index if not exists indicators_sort_idx on public.indicators (sort);
create index if not exists team_sort_idx on public.team_members (sort);
create index if not exists projects_org_idx on public.projects (organization_id);
create index if not exists files_org_idx on public.project_files (organization_id);
create index if not exists invoices_org_idx on public.invoices (organization_id);
create index if not exists contact_email_idx on public.contact_messages (email, created_at desc);
create index if not exists rate_limits_lookup_idx on public.rate_limits (bucket, key, created_at desc);

create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where user_id = auth.uid() and role = 'staff'
  );
$$;

create or replace function public.current_org()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id from public.profiles where user_id = auth.uid();
$$;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists insights_touch on public.insights;
create trigger insights_touch before update on public.insights
for each row execute function public.touch_updated_at();

drop trigger if exists indicators_touch on public.indicators;
create trigger indicators_touch before update on public.indicators
for each row execute function public.touch_updated_at();

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.insights enable row level security;
alter table public.indicators enable row level security;
alter table public.team_members enable row level security;
alter table public.contact_messages enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.projects enable row level security;
alter table public.project_files enable row level security;
alter table public.invoices enable row level security;
alter table public.stripe_events enable row level security;
alter table public.rate_limits enable row level security;

drop policy if exists profiles_read on public.profiles;
create policy profiles_read on public.profiles for select
using (user_id = auth.uid() or public.is_staff());

drop policy if exists profiles_staff_write on public.profiles;
create policy profiles_staff_write on public.profiles for all
using (public.is_staff()) with check (public.is_staff());

drop policy if exists org_staff on public.organizations;
create policy org_staff on public.organizations for all
using (public.is_staff()) with check (public.is_staff());

drop policy if exists org_client_read on public.organizations;
create policy org_client_read on public.organizations for select
using (id = public.current_org());

drop policy if exists insights_public_read on public.insights;
create policy insights_public_read on public.insights for select
using (published = true or public.is_staff());

drop policy if exists insights_staff_write on public.insights;
create policy insights_staff_write on public.insights for all
using (public.is_staff()) with check (public.is_staff());

drop policy if exists indicators_public_read on public.indicators;
create policy indicators_public_read on public.indicators for select using (true);

drop policy if exists indicators_staff_write on public.indicators;
create policy indicators_staff_write on public.indicators for all
using (public.is_staff()) with check (public.is_staff());

drop policy if exists team_public_read on public.team_members;
create policy team_public_read on public.team_members for select
using (published = true or public.is_staff());

drop policy if exists team_staff_write on public.team_members;
create policy team_staff_write on public.team_members for all
using (public.is_staff()) with check (public.is_staff());

drop policy if exists contact_insert on public.contact_messages;
create policy contact_insert on public.contact_messages for insert
with check (char_length(name) between 1 and 120 and char_length(message) between 1 and 4000);

drop policy if exists contact_staff_read on public.contact_messages;
create policy contact_staff_read on public.contact_messages for select
using (public.is_staff());

drop policy if exists newsletter_insert on public.newsletter_subscribers;
create policy newsletter_insert on public.newsletter_subscribers for insert
with check (position('@' in email) > 1);

drop policy if exists newsletter_staff on public.newsletter_subscribers;
create policy newsletter_staff on public.newsletter_subscribers for select
using (public.is_staff());

drop policy if exists projects_access on public.projects;
create policy projects_access on public.projects for select
using (public.is_staff() or organization_id = public.current_org());

drop policy if exists projects_staff_write on public.projects;
create policy projects_staff_write on public.projects for all
using (public.is_staff()) with check (public.is_staff());

drop policy if exists files_access on public.project_files;
create policy files_access on public.project_files for select
using (public.is_staff() or organization_id = public.current_org());

drop policy if exists files_staff_write on public.project_files;
create policy files_staff_write on public.project_files for all
using (public.is_staff()) with check (public.is_staff());

drop policy if exists invoices_access on public.invoices;
create policy invoices_access on public.invoices for select
using (public.is_staff() or organization_id = public.current_org());

drop policy if exists invoices_staff_write on public.invoices;
create policy invoices_staff_write on public.invoices for all
using (public.is_staff()) with check (public.is_staff());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('insights', 'insights', true, 5242880, array['image/jpeg','image/png','image/webp']),
  ('team', 'team', true, 5242880, array['image/jpeg','image/png','image/webp']),
  ('project-files', 'project-files', false, 20971520, array['application/pdf','image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit;

drop policy if exists insights_public_storage on storage.objects;
create policy insights_public_storage on storage.objects for select
using (bucket_id in ('insights', 'team'));

drop policy if exists insights_staff_storage on storage.objects;
create policy insights_staff_storage on storage.objects for all
using (bucket_id in ('insights', 'team') and public.is_staff())
with check (bucket_id in ('insights', 'team') and public.is_staff());

drop policy if exists project_files_read on storage.objects;
create policy project_files_read on storage.objects for select
using (
  bucket_id = 'project-files'
  and (public.is_staff() or split_part(name, '/', 1) = public.current_org()::text)
);

drop policy if exists project_files_staff_write on storage.objects;
create policy project_files_staff_write on storage.objects for all
using (bucket_id = 'project-files' and public.is_staff())
with check (bucket_id = 'project-files' and public.is_staff());

insert into public.indicators (label, value, period, trend, icon, sort, source, series_code)
select * from (values
  ('GDP Growth', '3.2%', '2024', 'up', 'chart', 1, 'live', 'NY.GDP.MKTP.KD.ZG'),
  ('Inflation', '3.5%', '2024', 'up', 'chart', 2, 'live', 'FP.CPI.TOTL.ZG'),
  ('Investment', '4.8%', '2024', 'up', 'briefcase', 3, 'manual', null),
  ('Employment', '65.1%', '2024', 'flat', 'users', 4, 'manual', null),
  ('Trade Growth', '2.7%', 'Global', 'up', 'globe', 5, 'live', 'NE.EXP.GNFS.KD.ZG'),
  ('Climate Risk', 'Medium', 'Global', 'flat', 'leaf', 6, 'manual', null),
  ('Biodiversity', 'Stable', 'Global', 'flat', 'leaf', 7, 'manual', null),
  ('SDG Progress', '72/100', '', 'up', 'sdg', 8, 'manual', null)
) as seed(label, value, period, trend, icon, sort, source, series_code)
where not exists (select 1 from public.indicators);

insert into public.insights (title, slug, published_on, excerpt, body, cover_path, published)
select * from (values
  (
    'Financing Nature: Innovative Solutions for Biodiversity Conservation',
    'financing-nature',
    date '2025-05-15',
    'How nature finance can fund conservation without separating it from livelihoods.',
    E'## Financing nature\n\nBiodiversity conservation needs capital that respects local stewardship. Eco Policy Nexus International helps governments and partners design finance that is evidence-based and implementable.\n\nWe connect policy design, investment screening, and measurement so nature finance can be tracked.',
    '/infographics/insight-nature.webp',
    true
  ),
  (
    'Inclusive Green Growth: Pathways for Developing Economies',
    'inclusive-green-growth',
    date '2025-04-28',
    'Pathways that keep jobs, equity, and environmental limits in the same decision.',
    E'## Inclusive green growth\n\nEconomic transformation changes employment and livelihoods. Climate risk changes investment. Social inclusion shapes whether growth lasts.\n\nOur work brings these questions into one advisory brief rather than three separate reports.',
    '/infographics/insight-terraces.webp',
    true
  ),
  (
    'Policy Coherence for a Just and Resilient Transition',
    'policy-coherence',
    date '2025-04-10',
    'Aligning climate, social, and economic policy so the transition is workable.',
    E'## Policy coherence\n\nA just transition fails when energy, labour, and fiscal policy point in different directions. Coherence is a practical design task.\n\nWe support governments and businesses to test whether a policy package can be delivered, financed, and explained.',
    '/infographics/insight-energy.webp',
    true
  )
) as seed(title, slug, published_on, excerpt, body, cover_path, published)
where not exists (select 1 from public.insights);
