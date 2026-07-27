-- v1.7 -> v1.7.2
-- 公告欄位與完整預設資料同步。可重複執行。
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS gm_announcements_v2 (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  announcement_type TEXT NOT NULL DEFAULT 'NOTICE',
  display_location TEXT NOT NULL DEFAULT 'HOME_AND_CENTER',
  image_url TEXT NOT NULL DEFAULT '',
  starts_at TEXT,
  ends_at TEXT,
  priority INTEGER NOT NULL DEFAULT 0,
  pinned INTEGER NOT NULL DEFAULT 0,
  active INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO gm_announcements_v2
(id,title,body,image_url,starts_at,ends_at,priority,active,created_at,updated_at)
SELECT id,title,body,image_url,starts_at,ends_at,priority,active,created_at,updated_at
FROM gm_announcements;

CREATE INDEX IF NOT EXISTS idx_gm_announcements_v2_live
ON gm_announcements_v2(active,priority,starts_at,ends_at);

CREATE TABLE IF NOT EXISTS gm_default_sync_log (
  sync_key TEXT PRIMARY KEY,
  synced_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
