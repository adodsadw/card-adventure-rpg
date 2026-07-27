-- v1.3 migration：只新增資料表與索引，可安全重複執行
PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS battle_tickets(id TEXT PRIMARY KEY,player_id TEXT NOT NULL,stage_id INTEGER NOT NULL,result TEXT,status TEXT NOT NULL DEFAULT 'OPEN',expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,settled_at TEXT,FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS daily_claims(player_id TEXT NOT NULL,claim_date TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(player_id,claim_date),FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS daily_missions(player_id TEXT NOT NULL,mission_date TEXT NOT NULL,mission_id TEXT NOT NULL,progress INTEGER NOT NULL DEFAULT 0,claimed_at TEXT,PRIMARY KEY(player_id,mission_date,mission_id),FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS player_mail(id TEXT PRIMARY KEY,player_id TEXT NOT NULL,title TEXT NOT NULL,body TEXT NOT NULL,reward_json TEXT NOT NULL DEFAULT '{}',claimed_at TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,expires_at TEXT,FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
CREATE TABLE IF NOT EXISTS admin_sessions(id TEXT PRIMARY KEY,token_hash TEXT NOT NULL UNIQUE,expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS admin_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,action TEXT NOT NULL,target_player_id TEXT,delta_json TEXT NOT NULL DEFAULT '{}',reason TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE INDEX IF NOT EXISTS idx_ticket_player ON battle_tickets(player_id,status);
CREATE INDEX IF NOT EXISTS idx_daily_mission_player ON daily_missions(player_id,mission_date);
CREATE INDEX IF NOT EXISTS idx_mail_player ON player_mail(player_id,claimed_at);
CREATE INDEX IF NOT EXISTS idx_admin_session_hash ON admin_sessions(token_hash);
