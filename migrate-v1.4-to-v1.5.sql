-- v1.4 -> v1.5
-- 新增停權與刪除稽核資料表，可重複執行。
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS player_restrictions (
  player_id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK(status IN ('SUSPENDED')),
  reason TEXT NOT NULL DEFAULT '',
  suspended_until TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS deleted_player_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  line_user_id TEXT NOT NULL DEFAULT '',
  display_name TEXT NOT NULL DEFAULT '',
  reason TEXT NOT NULL DEFAULT '',
  deleted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_player_restrictions_status
ON player_restrictions(status,suspended_until);

CREATE INDEX IF NOT EXISTS idx_deleted_player_audit_deleted_at
ON deleted_player_audit(deleted_at DESC);
