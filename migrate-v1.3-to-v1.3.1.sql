-- v1.3 -> v1.3.1 原地升級
-- 本修正版不修改既有欄位，只確認 LINE Login 與管理後台所需資料表存在，可重複執行。
PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS oauth_states (state TEXT PRIMARY KEY,nonce TEXT NOT NULL,expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS admin_sessions (id TEXT PRIMARY KEY,token_hash TEXT NOT NULL UNIQUE,expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_oauth_states_expiry ON oauth_states(expires_at);
CREATE INDEX IF NOT EXISTS idx_admin_session_hash ON admin_sessions(token_hash);
