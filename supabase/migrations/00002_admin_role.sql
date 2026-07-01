-- Add role column to profiles
alter table profiles
  add column if not exists role text default 'user'
  check (role in ('user', 'admin'));

-- Admin RLS policies for profiles
create policy "Admins can view all profiles"
  on profiles for select
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can update all profiles"
  on profiles for update
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for roadmaps
create policy "Admins can insert roadmaps"
  on roadmaps for insert
  with check (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can update roadmaps"
  on roadmaps for update
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can delete roadmaps"
  on roadmaps for delete
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for nodes
create policy "Admins can insert nodes"
  on nodes for insert
  with check (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can update nodes"
  on nodes for update
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can delete nodes"
  on nodes for delete
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for resources
create policy "Admins can insert resources"
  on resources for insert
  with check (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can update resources"
  on resources for update
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can delete resources"
  on resources for delete
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for achievements
create policy "Admins can insert achievements"
  on achievements for insert
  with check (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can update achievements"
  on achievements for update
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

create policy "Admins can delete achievements"
  on achievements for delete
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for study_plans
create policy "Admins can view all study plans"
  on study_plans for select
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for user_progress
create policy "Admins can view all progress"
  on user_progress for select
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for user_achievements
create policy "Admins can view all user achievements"
  on user_achievements for select
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );

-- Admin RLS policies for bookmarks
create policy "Admins can view all bookmarks"
  on bookmarks for select
  using (
    auth.uid() in (
      select id from profiles where role = 'admin'
    )
  );
