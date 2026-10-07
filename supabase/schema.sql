-- The play log. Run this in the Supabase SQL editor. Safe to run again after changes.
-- One row per event: something the player said, a line from Juno, the player leaving
-- Juno's thread, the player coming back to it, or an answer in the look-back at the end.

create table if not exists turns (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),  -- server time
  client_at   text,          -- the player's clock, ISO string
  session_id  text not null, -- random per playthrough, not tied to a person
  turn        int,           -- order within the session
  kind        text not null, -- see turns_kind_check below
  step        int,           -- position in the day script

  player_text text,          -- kind = player: what they sent
  via         text,          -- player: 'chip' | 'typed'.  exit: 'leave' | 'back' | 'hint'
                             -- return: 'notification' | 'chats'.  juno: 'notification' or null
                             -- answer: 'helping' | 'keeping' (the player's guess in the look-back)

  reply       text,          -- kind = juno: the line shown
  intent      text,          -- juno: the Director's intent (null for fixed lines)
  rule        text,          -- juno: which rule chose it, or 'script'
  source      text,          -- juno: 'model' | 'fallback' | 'script'
  fact_ids    jsonb,         -- juno: ids from js/data/truth.js that were allowed

  state       jsonb          -- what the game saw: saved, deductions, flags, exits, signals;
                             -- return rows also carry awayMs; answer rows carry forTurn, side
);

-- Kept separate so re-running this file updates the allowed kinds on an existing table.
alter table turns drop constraint if exists turns_kind_check;
alter table turns add constraint turns_kind_check check (kind in ('player', 'juno', 'exit', 'return', 'answer'));

create index if not exists turns_session on turns (session_id, turn);

-- Nobody can read or write this table with the public key.
-- api/log.js writes with the secret key, which bypasses row level security.
alter table turns enable row level security;
