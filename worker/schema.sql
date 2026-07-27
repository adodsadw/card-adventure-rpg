PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  line_user_id TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  picture_url TEXT NOT NULL DEFAULT '',
  gold INTEGER NOT NULL DEFAULT 1200,
  gems INTEGER NOT NULL DEFAULT 1200,
  energy INTEGER NOT NULL DEFAULT 30,
  max_energy INTEGER NOT NULL DEFAULT 30,
  stage_unlocked INTEGER NOT NULL DEFAULT 1,
  team_json TEXT NOT NULL DEFAULT '["aria","mira","gorn"]',
  inventory_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS game_saves (
  player_id TEXT PRIMARY KEY,
  state_json TEXT NOT NULL,
  save_version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS player_heroes (
  player_id TEXT NOT NULL,
  hero_id TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  copies INTEGER NOT NULL DEFAULT 1,
  equipment_json TEXT NOT NULL DEFAULT '{}',
  PRIMARY KEY (player_id, hero_id),
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

CREATE TABLE IF NOT EXISTS battle_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  stage_id INTEGER NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('WIN','LOSE')),
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_players_line_user_id ON players(line_user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_hash ON sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_oauth_states_expiry ON oauth_states(expires_at);
CREATE INDEX IF NOT EXISTS idx_battle_records_player ON battle_records(player_id,created_at DESC);


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

PRAGMA foreign_keys=ON;
CREATE TABLE IF NOT EXISTS gm_heroes(id TEXT PRIMARY KEY,name TEXT NOT NULL,rarity TEXT NOT NULL DEFAULT '稀有',element TEXT NOT NULL DEFAULT '',hero_class TEXT NOT NULL DEFAULT '',description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',base_hp INTEGER NOT NULL DEFAULT 300,base_atk INTEGER NOT NULL DEFAULT 80,base_def INTEGER NOT NULL DEFAULT 0,upgrade_base_cost INTEGER NOT NULL DEFAULT 150,upgrade_multiplier REAL NOT NULL DEFAULT 1,max_level INTEGER NOT NULL DEFAULT 100,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_skills(id TEXT PRIMARY KEY,hero_id TEXT NOT NULL,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',icon_url TEXT NOT NULL DEFAULT '',base_multiplier REAL NOT NULL DEFAULT 1,level_growth REAL NOT NULL DEFAULT .1,upgrade_base_cost INTEGER NOT NULL DEFAULT 800,max_level INTEGER NOT NULL DEFAULT 20,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_equipment(id TEXT PRIMARY KEY,name TEXT NOT NULL,slot TEXT NOT NULL,rarity TEXT NOT NULL DEFAULT '稀有',description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',base_atk INTEGER NOT NULL DEFAULT 0,base_hp INTEGER NOT NULL DEFAULT 0,base_def INTEGER NOT NULL DEFAULT 0,max_enhance INTEGER NOT NULL DEFAULT 20,max_refine INTEGER NOT NULL DEFAULT 5,enhance_gold_base INTEGER NOT NULL DEFAULT 500,dismantle_json TEXT NOT NULL DEFAULT '{}',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_items(id TEXT PRIMARY KEY,name TEXT NOT NULL,category TEXT NOT NULL DEFAULT 'material',description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',stack_limit INTEGER NOT NULL DEFAULT 999,usable INTEGER NOT NULL DEFAULT 0,effect_json TEXT NOT NULL DEFAULT '{}',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_shop_products(id TEXT PRIMARY KEY,name TEXT NOT NULL,item_id TEXT NOT NULL,image_url TEXT NOT NULL DEFAULT '',currency TEXT NOT NULL DEFAULT 'gold',price INTEGER NOT NULL DEFAULT 0,daily_limit INTEGER NOT NULL DEFAULT 0,weekly_limit INTEGER NOT NULL DEFAULT 0,lifetime_limit INTEGER NOT NULL DEFAULT 0,starts_at TEXT,ends_at TEXT,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_dungeons(id TEXT PRIMARY KEY,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',energy_cost INTEGER NOT NULL DEFAULT 0,daily_limit INTEGER NOT NULL DEFAULT 0,reward_json TEXT NOT NULL DEFAULT '{}',starts_at TEXT,ends_at TEXT,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_events(id TEXT PRIMARY KEY,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',banner_url TEXT NOT NULL DEFAULT '',starts_at TEXT,ends_at TEXT,config_json TEXT NOT NULL DEFAULT '{}',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_login_rewards(id TEXT PRIMARY KEY,campaign_key TEXT NOT NULL,day_index INTEGER NOT NULL,reward_json TEXT NOT NULL DEFAULT '{}',icon_url TEXT NOT NULL DEFAULT '',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_announcements(id TEXT PRIMARY KEY,title TEXT NOT NULL,body TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',starts_at TEXT,ends_at TEXT,priority INTEGER NOT NULL DEFAULT 0,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_banners(id TEXT PRIMARY KEY,title TEXT NOT NULL,subtitle TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',link_target TEXT NOT NULL DEFAULT '',starts_at TEXT,ends_at TEXT,sort_order INTEGER NOT NULL DEFAULT 0,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS gm_audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,admin_action TEXT NOT NULL,entity_type TEXT NOT NULL,entity_id TEXT NOT NULL,payload_json TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);


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
