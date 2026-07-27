-- v1.5 -> v1.6
-- 全部採新增資料表，可安全重複執行。
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS equipment_progress (
  player_id TEXT NOT NULL,
  equipment_id TEXT NOT NULL,
  enhance_level INTEGER NOT NULL DEFAULT 0,
  refine_level INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,equipment_id),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS shop_daily_purchases (
  player_id TEXT NOT NULL,
  purchase_date TEXT NOT NULL,
  item_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(player_id,purchase_date,item_id),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS dungeon_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  dungeon_id TEXT NOT NULL,
  clear_date TEXT NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS event_checkins (
  player_id TEXT NOT NULL,
  event_key TEXT NOT NULL,
  checkin_date TEXT NOT NULL,
  day_index INTEGER NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,event_key,checkin_date),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS event_stage_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  event_key TEXT NOT NULL,
  stage_id TEXT NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS guild_assists (
  player_id TEXT NOT NULL,
  assist_date TEXT NOT NULL,
  helper_player_id TEXT NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,assist_date),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS player_runtime (
  player_id TEXT PRIMARY KEY,
  last_energy_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_dungeon_daily ON dungeon_records(player_id,dungeon_id,clear_date);
CREATE INDEX IF NOT EXISTS idx_event_stage_player ON event_stage_records(player_id,created_at DESC);
