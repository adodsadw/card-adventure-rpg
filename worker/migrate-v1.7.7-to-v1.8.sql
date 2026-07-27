-- v1.7.7 -> v1.8 完整競技場系統
PRAGMA foreign_keys=ON;

ALTER TABLE arena_profiles ADD COLUMN defense_strategy TEXT NOT NULL DEFAULT 'BALANCED';
ALTER TABLE arena_profiles ADD COLUMN highest_rating INTEGER NOT NULL DEFAULT 1000;
ALTER TABLE arena_profiles ADD COLUMN season_high_rating INTEGER NOT NULL DEFAULT 1000;
ALTER TABLE arena_profiles ADD COLUMN current_streak INTEGER NOT NULL DEFAULT 0;
ALTER TABLE arena_profiles ADD COLUMN best_streak INTEGER NOT NULL DEFAULT 0;
ALTER TABLE arena_profiles ADD COLUMN opponent_ids_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE arena_profiles ADD COLUMN next_free_refresh_at TEXT;
ALTER TABLE arena_profiles ADD COLUMN guild_id TEXT;

ALTER TABLE arena_battles ADD COLUMN battle_key TEXT;
ALTER TABLE arena_battles ADD COLUMN replay_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE arena_battles ADD COLUMN battle_type TEXT NOT NULL DEFAULT 'RANKED';

CREATE UNIQUE INDEX IF NOT EXISTS idx_arena_battle_key ON arena_battles(battle_key);
CREATE INDEX IF NOT EXISTS idx_arena_profile_highest ON arena_profiles(highest_rating DESC);

CREATE TABLE IF NOT EXISTS arena_reward_claims (
  player_id TEXT NOT NULL,
  reward_type TEXT NOT NULL CHECK(reward_type IN ('daily','weekly','season')),
  period_key TEXT NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  claimed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,reward_type,period_key),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS arena_friendships (
  player_id TEXT NOT NULL,
  friend_player_id TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,friend_player_id),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE,
  FOREIGN KEY(friend_player_id) REFERENCES players(id) ON DELETE CASCADE
);

UPDATE arena_profiles
SET highest_rating=MAX(highest_rating,rating),
    season_high_rating=MAX(season_high_rating,rating),
    season_key=strftime('%Y-%m','now')
WHERE 1=1;
