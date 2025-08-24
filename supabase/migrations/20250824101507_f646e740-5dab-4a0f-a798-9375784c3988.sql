
-- 1) Ensure RLS is enabled (safe to run multiple times)
alter table if exists public.profiles enable row level security;
alter table if exists public.jungle_wallet enable row level security;
alter table if exists public.wallet_transactions enable row level security;
alter table if exists public.user_roles enable row level security;

-- 2) Improve handle_new_user to use names from raw metadata (and still create wallet)
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  -- Create profile for new user, pulling first/last name from metadata when available
  insert into public.profiles (id, first_name, last_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  )
  on conflict (id) do nothing;

  -- Create wallet for new user (idempotent)
  insert into public.jungle_wallet (profile_id)
  values (new.id)
  on conflict do nothing;

  return new;
end;
$function$;

-- 3) Ensure role assignment uses provided initial_role, defaulting to 'student'
create or replace function public.handle_new_user_role()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  insert into public.user_roles (user_id, role)
  values (
    new.id,
    coalesce((new.raw_user_meta_data->>'initial_role')::app_role, 'student'::app_role)
  )
  on conflict (user_id, role) do nothing;

  return new;
end;
$function$;

-- 4) Create the missing triggers on auth.users (recreate safely)
drop trigger if exists on_auth_user_created_profile on auth.users;
create trigger on_auth_user_created_profile
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

drop trigger if exists on_auth_user_created_role on auth.users;
create trigger on_auth_user_created_role
  after insert on auth.users
  for each row
  execute function public.handle_new_user_role();
