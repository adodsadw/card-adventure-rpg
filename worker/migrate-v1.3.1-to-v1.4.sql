-- v1.3.1 -> v1.4
-- 僅新增紀錄表與索引，可安全重複執行。
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS shop_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  gold_cost INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS hero_growth_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  hero_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK(action IN ('LEVEL_UP','RANK_UP')),
  old_value INTEGER NOT NULL,
  new_value INTEGER NOT NULL,
  cost_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS item_use_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  effect_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_shop_transactions_player ON shop_transactions(player_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hero_growth_player ON hero_growth_records(player_id,created_at DESC);
CREATE INDEX IF NOT EXISTS idx_item_use_player ON item_use_records(player_id,created_at DESC);
