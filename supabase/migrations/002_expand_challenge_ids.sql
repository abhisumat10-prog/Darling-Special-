-- Allow progress records for the complete, continuously numbered challenge set.
alter table public.challenge_attempts
  drop constraint if exists challenge_attempts_challenge_id_check;

alter table public.challenge_attempts
  add constraint challenge_attempts_challenge_id_check
  check (challenge_id ~ '^challenge(?:[1-9]|1[0-4])$');
