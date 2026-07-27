-- 僅供已經部署 v1.1 D1 的使用者執行。
-- 全新部署請直接執行 worker/schema.sql。

ALTER TABLE players ADD COLUMN line_user_id TEXT;
ALTER TABLE players ADD COLUMN picture_url TEXT NOT NULL DEFAULT '';
ALTER TABLE players ADD COLUMN last_login_at TEXT;

ALTER TABLE player_heroes ADD COLUMN equipment_json TEXT NOT NULL DEFAULT '{}';

CREATE UNIQUE INDEX IF NOT EXISTS idx_players_line_user_id ON players(line_user_id);

CREATE TABLE IF NOT EXISTS game_saves (
  player_id TEXT PRIMARY KEY,
  state_json TEXT NOT NULL,
  save_version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  user_agent TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS oauth_states (
  state TEXT PRIMARY KEY,
  nonce TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
