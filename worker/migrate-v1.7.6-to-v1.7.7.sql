-- v1.7.6 -> v1.7.7 非同步競技場
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS arena_profiles (
  player_id TEXT PRIMARY KEY,
  rating INTEGER NOT NULL DEFAULT 1000,
  arena_coins INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  defense_team_json TEXT NOT NULL DEFAULT '[]',
  season_key TEXT NOT NULL DEFAULT 'season-1',
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS arena_daily_attempts (
  player_id TEXT NOT NULL,
  attempt_date TEXT NOT NULL,
  used_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(player_id,attempt_date),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS arena_battles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  opponent_id TEXT NOT NULL,
  result TEXT NOT NULL CHECK(result IN ('WIN','LOSE')),
  rating_delta INTEGER NOT NULL DEFAULT 0,
  player_power INTEGER NOT NULL DEFAULT 0,
  opponent_power INTEGER NOT NULL DEFAULT 0,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_arena_rating ON arena_profiles(rating DESC);
CREATE INDEX IF NOT EXISTS idx_arena_battles_player ON arena_battles(player_id,created_at DESC);

INSERT OR IGNORE INTO arena_profiles(player_id,defense_team_json)
SELECT p.id,COALESCE(NULLIF(p.team_json,''),'["aria","mira","gorn"]') FROM players p;
