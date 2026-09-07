-- Only the trusted grading server may insert authoritative scores.
-- Browser roles remain read-only and Row Level Security stays enabled.
grant usage on schema public to service_role;
grant select on table public.profiles to service_role;
grant select, insert on table public.challenge_attempts to service_role;
grant usage, select on sequence public.challenge_attempts_id_seq to service_role;
