-- Profiles (extends auth.users)
create table if not exists profiles (
  id uuid references auth.users primary key,
  username text unique,
  full_name text,
  avatar_url text,
  goals text[],
  study_minutes_daily int default 30,
  created_at timestamptz default now()
);

alter table profiles enable row level security;

create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Roadmaps
create table if not exists roadmaps (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  category text not null,
  icon text,
  sort_order int default 0
);

alter table roadmaps enable row level security;

create policy "Roadmaps are publicly readable"
  on roadmaps for select
  to authenticated, anon
  using (true);

-- Nodes
create table if not exists nodes (
  id uuid primary key default gen_random_uuid(),
  roadmap_id uuid references roadmaps not null,
  title text not null,
  description text,
  difficulty text check (difficulty in ('beginner', 'intermediate', 'advanced')),
  estimated_hours numeric,
  prerequisites jsonb default '[]'::jsonb,
  position jsonb default '{"x": 0, "y": 0}'::jsonb,
  sort_order int default 0,
  stage int
);

alter table nodes enable row level security;

create policy "Nodes are publicly readable"
  on nodes for select
  to authenticated, anon
  using (true);

-- Resources (books, videos, articles)
create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  node_id uuid references nodes not null,
  title text not null,
  type text check (type in ('book', 'video', 'article', 'course')),
  url text,
  author text,
  description text,
  is_verified boolean default true
);

alter table resources enable row level security;

create policy "Resources are publicly readable"
  on resources for select
  to authenticated, anon
  using (true);

-- User Progress
create table if not exists user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  node_id uuid references nodes not null,
  status text default 'locked' check (status in ('locked', 'available', 'in_progress', 'completed')),
  notes text,
  completed_at timestamptz,
  unique(user_id, node_id)
);

alter table user_progress enable row level security;

create policy "Users can view own progress"
  on user_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on user_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own progress"
  on user_progress for update
  using (auth.uid() = user_id);

-- Study Plans (AI-generated)
create table if not exists study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  title text,
  weekly_schedule jsonb not null default '[]'::jsonb,
  is_ai_generated boolean default false,
  created_at timestamptz default now()
);

alter table study_plans enable row level security;

create policy "Users can view own study plans"
  on study_plans for select
  using (auth.uid() = user_id);

create policy "Users can insert own study plans"
  on study_plans for insert
  with check (auth.uid() = user_id);

-- Achievements
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  icon text,
  criteria jsonb not null default '{}'::jsonb
);

alter table achievements enable row level security;

create policy "Achievements are publicly readable"
  on achievements for select
  to authenticated, anon
  using (true);

-- User Achievements
create table if not exists user_achievements (
  user_id uuid references profiles not null,
  achievement_id uuid references achievements not null,
  earned_at timestamptz default now(),
  primary key (user_id, achievement_id)
);

alter table user_achievements enable row level security;

create policy "Users can view own achievements"
  on user_achievements for select
  using (auth.uid() = user_id);

create policy "Users can earn achievements"
  on user_achievements for insert
  with check (auth.uid() = user_id);

-- Bookmarks
create table if not exists bookmarks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles not null,
  resource_id uuid references resources not null,
  created_at timestamptz default now(),
  unique(user_id, resource_id)
);

alter table bookmarks enable row level security;

create policy "Users can view own bookmarks"
  on bookmarks for select
  using (auth.uid() = user_id);

create policy "Users can insert own bookmarks"
  on bookmarks for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own bookmarks"
  on bookmarks for delete
  using (auth.uid() = user_id);

-- Seed achievements
insert into achievements (slug, title, description, icon, criteria) values
  ('the-beginner', 'The Beginner', 'Complete your first roadmap stage.', 'seedling', '{"type": "complete_roadmap", "count": 1}'),
  ('consistent-student', 'The Consistent Student', 'Maintain a 30-day study streak.', 'flame', '{"type": "streak", "count": 30}'),
  ('book-collector', 'Book Collector', 'Complete 10 books across all roadmaps.', 'books', '{"type": "complete_books", "count": 10}'),
  ('the-seeker', 'The Seeker', 'Join 3 study circles.', 'users', '{"type": "join_groups", "count": 3}')
on conflict (slug) do nothing;

-- Seed the Arabic roadmap
insert into roadmaps (slug, title, description, category, icon, sort_order) values
  ('arabic', 'Arabic Language', 'Learn Arabic from the alphabet to intermediate proficiency. Follow the renowned Madinah curriculum used at the Islamic University of Madinah.', 'arabic', 'book-open-text', 1);
