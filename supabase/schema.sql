-- The play log. Run this once in the Supabase SQL editor.
-- One row per event: something the player said, a line from Juno, or the player leaving Juno's thread.

create table if not exists turns (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),  -- server time
  client_at   text,          -- the player's clock, ISO string
  session_id  text not null, -- random per playthrough, not tied to a person
  turn        int,           -- order within the session
  kind        text not null check (kind in ('player', 'juno', 'exit')),
  step        int,           -- position in the day script

  player_text text,          -- kind = player: what they sent
  via         text,          -- player: 'chip' | 'typed'.  exit: 'leave' | 'back' | 'hint'

  reply       text,          -- kind = juno: the line shown
  intent      text,          -- juno: the Director's intent (null for fixed lines)
  rule        text,          -- juno: which rule chose it, or 'script'
  source      text,          -- juno: 'model' | 'fallback' | 'script'
  fact_ids    jsonb,         -- juno: ids from js/data/truth.js that were allowed

  state       jsonb          -- what the game saw: saved, deductions, flags, exits, signals
);

create index if not exists turns_session on turns (session_id, turn);

-- Nobody can read or write this table with the public key.
-- api/log.js writes with the secret key, which bypasses row level security.
alter table turns enable row level security;
