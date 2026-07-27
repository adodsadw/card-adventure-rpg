PRAGMA defer_foreign_keys=TRUE;
CREATE TABLE players (
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
INSERT INTO "players" ("id","line_user_id","display_name","picture_url","gold","gems","energy","max_energy","stage_unlocked","team_json","inventory_json","created_at","updated_at","last_login_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','U0f407917e9337441318eb5541466a727','boo.cm','',814031,1002341,30,30,10,'["aria","mira","gorn"]','{"wood":3,"ore":6,"herb":9,"core":6,"potion":5,"energyPotion":0,"equipment":{"sword":1,"armor":1}}','2026-07-27 06:07:13','2026-07-27 11:46:53','2026-07-27 06:07:13');
CREATE TABLE game_saves (
  player_id TEXT PRIMARY KEY,
  state_json TEXT NOT NULL,
  save_version INTEGER NOT NULL DEFAULT 1,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "game_saves" ("player_id","state_json","save_version","updated_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','{"gold":814031,"gems":1002341,"energy":30,"maxEnergy":30,"stageUnlocked":10,"dailyClaimed":"2026-07-27","team":["aria","mira","gorn"],"owned":{"aria":{"level":12,"rank":1,"xp":15,"copies":4,"equipment":{},"skillLevel":1},"mira":{"level":37,"rank":2,"xp":275,"copies":3,"equipment":{},"skillLevel":16},"gorn":{"level":13,"rank":1,"xp":275,"copies":3,"equipment":{},"skillLevel":1},"elwyn":{"level":1,"xp":0,"copies":7,"equipment":{},"rank":1,"skillLevel":1},"kael":{"level":3,"xp":0,"copies":3,"equipment":{},"rank":1,"skillLevel":1},"nyx":{"level":1,"xp":0,"copies":1,"equipment":{},"rank":1,"skillLevel":1},"luna":{"level":1,"xp":0,"copies":3,"equipment":{},"rank":1,"skillLevel":1},"sol":{"level":1,"xp":0,"copies":1,"equipment":{},"rank":1,"skillLevel":1}},"inventory":{"wood":3,"ore":6,"herb":9,"core":6,"potion":5,"energyPotion":0,"equipment":{"sword":1,"armor":1}},"tutorialDone":true,"sound":true,"equipmentMeta":{"sword":{"level":1,"refine":2}}}',146,'2026-07-27 11:46:53');
CREATE TABLE player_heroes (
  player_id TEXT NOT NULL,
  hero_id TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  copies INTEGER NOT NULL DEFAULT 1,
  equipment_json TEXT NOT NULL DEFAULT '{}',
  PRIMARY KEY (player_id, hero_id),
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  player_id TEXT NOT NULL,
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  user_agent TEXT NOT NULL DEFAULT '',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "sessions" ("id","player_id","token_hash","expires_at","user_agent","created_at") VALUES('fb716f18-9f65-45ef-8f3d-c425e1f6f71c','30139025-5317-4dd0-9137-f843d173dd5a','fa5f9eb0a8dfea6e0fdca4fb212d7ea9344beb594723b8350bcf0a176c0a6a86','2026-08-26T06:30:49.697Z','','2026-07-27 06:30:49');
INSERT INTO "sessions" ("id","player_id","token_hash","expires_at","user_agent","created_at") VALUES('f093f1e9-2d0d-4a73-af13-cf1080459feb','30139025-5317-4dd0-9137-f843d173dd5a','ffdf77112e71cd09c468c6ba07a74bb667d08a6907284f2b499b8bf10207b0cf','2026-08-26T12:14:32.726Z','','2026-07-27 12:14:32');
CREATE TABLE oauth_states (
  state TEXT PRIMARY KEY,
  nonce TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "oauth_states" ("state","nonce","expires_at","created_at") VALUES('SK3yVL8FpTQZ8DrDUJzZQFcIWmtFnqJw','MNwglWbn1lRkMFDVCmK3XrzCNnnphq','2026-07-27T06:16:47.176Z','2026-07-27 06:06:47');
INSERT INTO "oauth_states" ("state","nonce","expires_at","created_at") VALUES('UIbPWhKutyYM6rPieqPHUlxvCdgMpj4','OooIdiVcw2M0Fpdcb0g8HNAQFeGxjo','2026-07-27T08:22:54.930Z','2026-07-27 08:12:54');
CREATE TABLE battle_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  stage_id INTEGER NOT NULL,
  result TEXT NOT NULL CHECK (result IN ('WIN','LOSE')),
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(1,'30139025-5317-4dd0-9137-f843d173dd5a',1,'WIN','{"gold":180,"xp":25,"wood":2}','2026-07-27 06:14:34');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(2,'30139025-5317-4dd0-9137-f843d173dd5a',1,'WIN','{"gold":180,"xp":25,"wood":2}','2026-07-27 07:12:15');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(3,'30139025-5317-4dd0-9137-f843d173dd5a',2,'WIN','{"gold":260,"xp":38,"ore":1}','2026-07-27 07:13:10');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(4,'30139025-5317-4dd0-9137-f843d173dd5a',3,'WIN','{"gold":360,"xp":52,"herb":2}','2026-07-27 07:14:05');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(5,'30139025-5317-4dd0-9137-f843d173dd5a',1,'WIN','{"gold":180,"xp":25,"wood":2}','2026-07-27 07:30:28');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(6,'30139025-5317-4dd0-9137-f843d173dd5a',4,'WIN','{"gold":700,"xp":110,"gems":80,"core":1}','2026-07-27 07:31:05');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(7,'30139025-5317-4dd0-9137-f843d173dd5a',5,'WIN','{"gold":1100,"xp":180,"gems":150,"core":2}','2026-07-27 07:32:23');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(8,'30139025-5317-4dd0-9137-f843d173dd5a',6,'WIN','{"gold":900,"xp":145,"ore":3}','2026-07-27 07:52:25');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(9,'30139025-5317-4dd0-9137-f843d173dd5a',7,'WIN','{"gold":1250,"xp":180,"gems":60}','2026-07-27 07:53:46');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(10,'30139025-5317-4dd0-9137-f843d173dd5a',8,'WIN','{"gold":1500,"xp":220,"herb":4}','2026-07-27 07:54:42');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(11,'30139025-5317-4dd0-9137-f843d173dd5a',9,'WIN','{"gold":1900,"xp":275,"gems":90,"core":2}','2026-07-27 07:55:47');
INSERT INTO "battle_records" ("id","player_id","stage_id","result","reward_json","created_at") VALUES(12,'30139025-5317-4dd0-9137-f843d173dd5a',10,'WIN','{"gold":3500,"xp":500,"gems":300,"core":5}','2026-07-27 11:20:35');
CREATE TABLE battle_tickets(id TEXT PRIMARY KEY,player_id TEXT NOT NULL,stage_id INTEGER NOT NULL,result TEXT,status TEXT NOT NULL DEFAULT 'OPEN',expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,settled_at TEXT,FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('367eb440-57f5-4b6c-88e4-a0c4e7ea3a11','30139025-5317-4dd0-9137-f843d173dd5a',1,'WIN','SETTLED','2026-07-27T06:34:22.718Z','2026-07-27 06:14:22','2026-07-27 06:14:34');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('6f203384-22e3-4e2a-8bd0-cb08e29f1f69','30139025-5317-4dd0-9137-f843d173dd5a',1,'WIN','SETTLED','2026-07-27T07:32:07.094Z','2026-07-27 07:12:07','2026-07-27 07:12:15');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('95061a83-2954-4787-bde7-5b268bdb2f24','30139025-5317-4dd0-9137-f843d173dd5a',2,'WIN','SETTLED','2026-07-27T07:32:52.171Z','2026-07-27 07:12:52','2026-07-27 07:13:10');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('5e5d76b0-4901-4622-a684-c214bb9f52f3','30139025-5317-4dd0-9137-f843d173dd5a',3,'WIN','SETTLED','2026-07-27T07:33:52.032Z','2026-07-27 07:13:52','2026-07-27 07:14:05');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('a1905061-3bfd-4ef2-b8e3-57317e5c9a00','30139025-5317-4dd0-9137-f843d173dd5a',1,'WIN','SETTLED','2026-07-27T07:50:24.579Z','2026-07-27 07:30:24','2026-07-27 07:30:28');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('63f5eaa9-4b19-441c-b890-566cd038f59e','30139025-5317-4dd0-9137-f843d173dd5a',4,'WIN','SETTLED','2026-07-27T07:50:52.060Z','2026-07-27 07:30:52','2026-07-27 07:31:05');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('ebc67721-9be1-4469-bae1-e429686c71d0','30139025-5317-4dd0-9137-f843d173dd5a',5,'WIN','SETTLED','2026-07-27T07:52:09.721Z','2026-07-27 07:32:09','2026-07-27 07:32:23');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('5ea5611e-3d81-45b5-8ebb-383f2e7426bd','30139025-5317-4dd0-9137-f843d173dd5a',6,'WIN','SETTLED','2026-07-27T08:12:16.760Z','2026-07-27 07:52:16','2026-07-27 07:52:25');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('c4644be0-b5f9-4d1d-8b92-b41666e9da05','30139025-5317-4dd0-9137-f843d173dd5a',7,'WIN','SETTLED','2026-07-27T08:13:33.091Z','2026-07-27 07:53:33','2026-07-27 07:53:46');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('af4d449b-5574-4184-893f-c84a796272e7','30139025-5317-4dd0-9137-f843d173dd5a',8,'WIN','SETTLED','2026-07-27T08:14:24.421Z','2026-07-27 07:54:24','2026-07-27 07:54:42');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('deebb204-87d2-4090-9659-d0f99dfb1357','30139025-5317-4dd0-9137-f843d173dd5a',9,'WIN','SETTLED','2026-07-27T08:15:31.132Z','2026-07-27 07:55:31','2026-07-27 07:55:47');
INSERT INTO "battle_tickets" ("id","player_id","stage_id","result","status","expires_at","created_at","settled_at") VALUES('b7f6971c-8a38-42dc-b85a-1c3c5315899a','30139025-5317-4dd0-9137-f843d173dd5a',10,'WIN','SETTLED','2026-07-27T11:40:17.941Z','2026-07-27 11:20:17','2026-07-27 11:20:35');
CREATE TABLE daily_claims(player_id TEXT NOT NULL,claim_date TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,PRIMARY KEY(player_id,claim_date),FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
INSERT INTO "daily_claims" ("player_id","claim_date","created_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','2026-07-27','2026-07-27 06:15:34');
CREATE TABLE daily_missions(player_id TEXT NOT NULL,mission_date TEXT NOT NULL,mission_id TEXT NOT NULL,progress INTEGER NOT NULL DEFAULT 0,claimed_at TEXT,PRIMARY KEY(player_id,mission_date,mission_id),FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
INSERT INTO "daily_missions" ("player_id","mission_date","mission_id","progress","claimed_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','2026-07-27','battle3',3,'2026-07-27 07:57:26');
INSERT INTO "daily_missions" ("player_id","mission_date","mission_id","progress","claimed_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','2026-07-27','win2',2,'2026-07-27 07:57:28');
INSERT INTO "daily_missions" ("player_id","mission_date","mission_id","progress","claimed_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','2026-07-27','summon1',1,'2026-07-27 07:57:29');
CREATE TABLE player_mail(id TEXT PRIMARY KEY,player_id TEXT NOT NULL,title TEXT NOT NULL,body TEXT NOT NULL,reward_json TEXT NOT NULL DEFAULT '{}',claimed_at TEXT,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,expires_at TEXT,FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE);
INSERT INTO "player_mail" ("id","player_id","title","body","reward_json","claimed_at","created_at","expires_at") VALUES('3d21027b-fd2b-43cc-bc85-cb39521e4e49','30139025-5317-4dd0-9137-f843d173dd5a','歡迎加入星界遠征','這是給新冒險者的見面禮。','{"gold":1000,"gems":100,"energy":10}','2026-07-27 06:12:53','2026-07-27 06:07:13',NULL);
CREATE TABLE admin_sessions(id TEXT PRIMARY KEY,token_hash TEXT NOT NULL UNIQUE,expires_at TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "admin_sessions" ("id","token_hash","expires_at","created_at") VALUES('d0716e2c-ded3-4c62-856d-19a8711d7439','cf5e58a6b377e9e32c0b9b5b23489a02a7af0c33835f508918adbebbe4cff7ee','2026-07-27T16:28:08.736Z','2026-07-27 08:28:08');
INSERT INTO "admin_sessions" ("id","token_hash","expires_at","created_at") VALUES('e927d82b-9f5d-4632-bf8b-db8028cb8293','88b5caaeb3fc76ed62eca7bdd54f970ddeb7c42b70a852fb0257599cae0d03a9','2026-07-27T16:28:31.458Z','2026-07-27 08:28:31');
INSERT INTO "admin_sessions" ("id","token_hash","expires_at","created_at") VALUES('29191a82-c943-4a4b-9fc0-c28833e0242b','5f0eb637aec3c1da06e390895bfaad9d568a9966520f339a8cffc84c1c700b76','2026-07-27T16:29:33.038Z','2026-07-27 08:29:33');
CREATE TABLE admin_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,action TEXT NOT NULL,target_player_id TEXT,delta_json TEXT NOT NULL DEFAULT '{}',reason TEXT NOT NULL DEFAULT '',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "admin_logs" ("id","action","target_player_id","delta_json","reason","created_at") VALUES(1,'RESOURCE_ADJUST','30139025-5317-4dd0-9137-f843d173dd5a','{"gold":999999,"gems":999999,"energy":100000}','','2026-07-27 06:12:43');
INSERT INTO "admin_logs" ("id","action","target_player_id","delta_json","reason","created_at") VALUES(2,'SUSPEND_PLAYER','30139025-5317-4dd0-9137-f843d173dd5a','{"until":null}','外掛','2026-07-27 06:30:13');
INSERT INTO "admin_logs" ("id","action","target_player_id","delta_json","reason","created_at") VALUES(3,'UNSUSPEND_PLAYER','30139025-5317-4dd0-9137-f843d173dd5a','{}','','2026-07-27 06:30:38');
INSERT INTO "admin_logs" ("id","action","target_player_id","delta_json","reason","created_at") VALUES(4,'RESOURCE_ADJUST','30139025-5317-4dd0-9137-f843d173dd5a','{"gold":1111,"gems":1111,"energy":1111}','1111','2026-07-27 11:32:56');
INSERT INTO "admin_logs" ("id","action","target_player_id","delta_json","reason","created_at") VALUES(5,'RESOURCE_ADJUST','30139025-5317-4dd0-9137-f843d173dd5a','{"gold":1111,"gems":1111,"energy":1111}','1111','2026-07-27 11:33:04');
INSERT INTO "admin_logs" ("id","action","target_player_id","delta_json","reason","created_at") VALUES(6,'RESOURCE_ADJUST','30139025-5317-4dd0-9137-f843d173dd5a','{"gold":0,"gems":0,"energy":0}','','2026-07-27 11:38:36');
CREATE TABLE shop_transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  gold_cost INTEGER NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(1,'30139025-5317-4dd0-9137-f843d173dd5a','potion',1,300,'2026-07-27 06:13:04');
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(2,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,600,'2026-07-27 06:13:10');
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(3,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,600,'2026-07-27 07:31:20');
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(4,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,600,'2026-07-27 07:31:20');
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(5,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,600,'2026-07-27 07:31:21');
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(6,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,600,'2026-07-27 07:31:22');
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(7,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,600,'2026-07-27 07:31:22');
INSERT INTO "shop_transactions" ("id","player_id","item_id","quantity","gold_cost","created_at") VALUES(8,'30139025-5317-4dd0-9137-f843d173dd5a','potion',1,300,'2026-07-27 09:54:18');
CREATE TABLE hero_growth_records (
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
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(1,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',1,2,'{"gold":150}','2026-07-27 07:13:20');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(2,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',1,2,'{"gold":800,"type":"SKILL"}','2026-07-27 07:13:23');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(3,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',2,3,'{"gold":1600,"type":"SKILL"}','2026-07-27 07:13:24');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(4,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',3,4,'{"gold":2400,"type":"SKILL"}','2026-07-27 07:13:26');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(5,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',2,3,'{"gold":300}','2026-07-27 07:13:27');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(6,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',3,4,'{"gold":450}','2026-07-27 07:13:28');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(7,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',4,5,'{"gold":600}','2026-07-27 07:13:29');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(8,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',5,6,'{"gold":750}','2026-07-27 07:13:30');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(9,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',6,7,'{"gold":900}','2026-07-27 07:13:30');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(10,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',7,8,'{"gold":1050}','2026-07-27 07:13:31');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(11,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',8,9,'{"gold":1200}','2026-07-27 07:13:32');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(12,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',1,2,'{"gold":150}','2026-07-27 07:13:33');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(13,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',2,3,'{"gold":300}','2026-07-27 07:13:33');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(14,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',3,4,'{"gold":450}','2026-07-27 07:13:34');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(15,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',4,5,'{"gold":600}','2026-07-27 07:13:35');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(16,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',5,6,'{"gold":750}','2026-07-27 07:13:35');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(17,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',6,7,'{"gold":900}','2026-07-27 07:13:36');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(18,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',7,8,'{"gold":1050}','2026-07-27 07:13:37');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(19,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',8,9,'{"gold":1200}','2026-07-27 07:13:37');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(20,'30139025-5317-4dd0-9137-f843d173dd5a','gorn','LEVEL_UP',9,10,'{"gold":1350}','2026-07-27 07:13:38');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(21,'30139025-5317-4dd0-9137-f843d173dd5a','aria','LEVEL_UP',1,2,'{"gold":150}','2026-07-27 07:13:39');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(22,'30139025-5317-4dd0-9137-f843d173dd5a','aria','LEVEL_UP',2,3,'{"gold":300}','2026-07-27 07:13:39');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(23,'30139025-5317-4dd0-9137-f843d173dd5a','aria','LEVEL_UP',3,4,'{"gold":450}','2026-07-27 07:13:40');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(24,'30139025-5317-4dd0-9137-f843d173dd5a','aria','LEVEL_UP',4,5,'{"gold":600}','2026-07-27 07:13:41');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(25,'30139025-5317-4dd0-9137-f843d173dd5a','aria','LEVEL_UP',5,6,'{"gold":750}','2026-07-27 07:13:42');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(26,'30139025-5317-4dd0-9137-f843d173dd5a','aria','LEVEL_UP',6,7,'{"gold":900}','2026-07-27 07:13:42');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(27,'30139025-5317-4dd0-9137-f843d173dd5a','aria','LEVEL_UP',7,8,'{"gold":1050}','2026-07-27 07:13:43');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(28,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',9,10,'{"gold":1350}','2026-07-27 07:13:44');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(29,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',10,11,'{"gold":1500}','2026-07-27 07:13:44');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(30,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',11,12,'{"gold":1650}','2026-07-27 07:13:45');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(31,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',12,13,'{"gold":1800}','2026-07-27 07:13:46');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(32,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',4,5,'{"gold":3200,"type":"SKILL"}','2026-07-27 07:29:36');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(33,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',5,6,'{"gold":4000,"type":"SKILL"}','2026-07-27 07:29:37');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(34,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',6,7,'{"gold":4800,"type":"SKILL"}','2026-07-27 07:29:43');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(35,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',7,8,'{"gold":5600,"type":"SKILL"}','2026-07-27 07:29:50');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(36,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',8,9,'{"gold":6400,"type":"SKILL"}','2026-07-27 07:29:53');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(37,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',13,14,'{"gold":1950}','2026-07-27 07:29:56');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(38,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',14,15,'{"gold":2100}','2026-07-27 07:29:57');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(39,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',15,16,'{"gold":2250}','2026-07-27 07:29:58');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(40,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',16,17,'{"gold":2400}','2026-07-27 07:29:59');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(41,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',17,18,'{"gold":2550}','2026-07-27 07:30:04');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(42,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',18,19,'{"gold":2700}','2026-07-27 07:30:05');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(43,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',19,20,'{"gold":2850}','2026-07-27 07:30:05');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(44,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',20,21,'{"gold":3000}','2026-07-27 07:30:06');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(45,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',21,22,'{"gold":3150}','2026-07-27 07:30:07');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(46,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',22,23,'{"gold":3300}','2026-07-27 07:30:08');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(47,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',23,24,'{"gold":3450}','2026-07-27 07:30:08');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(48,'30139025-5317-4dd0-9137-f843d173dd5a','kael','LEVEL_UP',1,2,'{"gold":150}','2026-07-27 07:46:51');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(49,'30139025-5317-4dd0-9137-f843d173dd5a','kael','LEVEL_UP',2,3,'{"gold":300}','2026-07-27 07:46:51');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(50,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',9,10,'{"gold":7200,"type":"SKILL"}','2026-07-27 07:54:52');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(51,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',10,11,'{"gold":8000,"type":"SKILL"}','2026-07-27 07:54:55');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(52,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',11,12,'{"gold":8800,"type":"SKILL"}','2026-07-27 07:54:56');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(53,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',12,13,'{"gold":9600,"type":"SKILL"}','2026-07-27 07:54:57');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(54,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',13,14,'{"gold":10400,"type":"SKILL"}','2026-07-27 07:54:58');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(55,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',14,15,'{"gold":11200,"type":"SKILL"}','2026-07-27 07:54:59');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(56,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',15,16,'{"gold":12000,"type":"SKILL"}','2026-07-27 07:55:00');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(57,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',24,25,'{"gold":3600}','2026-07-27 07:55:01');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(58,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',25,26,'{"gold":3750}','2026-07-27 07:55:02');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(59,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',26,27,'{"gold":3900}','2026-07-27 07:55:02');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(60,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',27,28,'{"gold":4050}','2026-07-27 07:55:03');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(61,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',28,29,'{"gold":4200}','2026-07-27 07:55:04');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(62,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',29,30,'{"gold":4350}','2026-07-27 07:55:04');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(63,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',30,31,'{"gold":4500}','2026-07-27 07:55:05');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(64,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',31,32,'{"gold":4650}','2026-07-27 07:55:06');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(65,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',32,33,'{"gold":4800}','2026-07-27 07:55:06');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(66,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',33,34,'{"gold":4950}','2026-07-27 07:55:07');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(67,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',34,35,'{"gold":5100}','2026-07-27 07:55:08');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(68,'30139025-5317-4dd0-9137-f843d173dd5a','mira','RANK_UP',1,2,'{"gold":1200,"core":1}','2026-07-27 07:57:04');
INSERT INTO "hero_growth_records" ("id","player_id","hero_id","action","old_value","new_value","cost_json","created_at") VALUES(69,'30139025-5317-4dd0-9137-f843d173dd5a','mira','LEVEL_UP',35,36,'{"gold":5250}','2026-07-27 09:44:11');
CREATE TABLE item_use_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  item_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  effect_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "item_use_records" ("id","player_id","item_id","quantity","effect_json","created_at") VALUES(1,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,'{"energyBefore":0,"energyAfter":10}','2026-07-27 07:30:45');
INSERT INTO "item_use_records" ("id","player_id","item_id","quantity","effect_json","created_at") VALUES(2,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,'{"energyBefore":2,"energyAfter":12}','2026-07-27 07:31:33');
INSERT INTO "item_use_records" ("id","player_id","item_id","quantity","effect_json","created_at") VALUES(3,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,'{"energyBefore":12,"energyAfter":22}','2026-07-27 07:31:34');
INSERT INTO "item_use_records" ("id","player_id","item_id","quantity","effect_json","created_at") VALUES(4,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,'{"energyBefore":22,"energyAfter":30}','2026-07-27 07:31:35');
INSERT INTO "item_use_records" ("id","player_id","item_id","quantity","effect_json","created_at") VALUES(5,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,'{"energyBefore":21,"energyAfter":30}','2026-07-27 07:47:00');
INSERT INTO "item_use_records" ("id","player_id","item_id","quantity","effect_json","created_at") VALUES(6,'30139025-5317-4dd0-9137-f843d173dd5a','energyPotion',1,'{"energyBefore":3,"energyAfter":13}','2026-07-27 07:55:26');
CREATE TABLE player_restrictions (
  player_id TEXT PRIMARY KEY,
  status TEXT NOT NULL CHECK(status IN ('SUSPENDED')),
  reason TEXT NOT NULL DEFAULT '',
  suspended_until TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE deleted_player_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  line_user_id TEXT NOT NULL DEFAULT '',
  display_name TEXT NOT NULL DEFAULT '',
  reason TEXT NOT NULL DEFAULT '',
  deleted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE equipment_progress (
  player_id TEXT NOT NULL,
  equipment_id TEXT NOT NULL,
  enhance_level INTEGER NOT NULL DEFAULT 0,
  refine_level INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,equipment_id),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "equipment_progress" ("player_id","equipment_id","enhance_level","refine_level","updated_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','sword',1,2,'2026-07-27 07:47:02');
CREATE TABLE shop_daily_purchases (
  player_id TEXT NOT NULL,
  purchase_date TEXT NOT NULL,
  item_id TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(player_id,purchase_date,item_id),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "shop_daily_purchases" ("player_id","purchase_date","item_id","quantity") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','2026-07-27','energyPotion',5);
INSERT INTO "shop_daily_purchases" ("player_id","purchase_date","item_id","quantity") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','2026-07-27','potion',1);
CREATE TABLE dungeon_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  dungeon_id TEXT NOT NULL,
  clear_date TEXT NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "dungeon_records" ("id","player_id","dungeon_id","clear_date","reward_json","created_at") VALUES(1,'30139025-5317-4dd0-9137-f843d173dd5a','gold','2026-07-27','{"gold":1800}','2026-07-27 07:11:42');
INSERT INTO "dungeon_records" ("id","player_id","dungeon_id","clear_date","reward_json","created_at") VALUES(2,'30139025-5317-4dd0-9137-f843d173dd5a','material','2026-07-27','{"wood":3,"ore":3,"herb":3}','2026-07-27 07:11:47');
INSERT INTO "dungeon_records" ("id","player_id","dungeon_id","clear_date","reward_json","created_at") VALUES(3,'30139025-5317-4dd0-9137-f843d173dd5a','gold','2026-07-27','{"gold":1800}','2026-07-27 11:33:48');
CREATE TABLE event_checkins (
  player_id TEXT NOT NULL,
  event_key TEXT NOT NULL,
  checkin_date TEXT NOT NULL,
  day_index INTEGER NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,event_key,checkin_date),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "event_checkins" ("player_id","event_key","checkin_date","day_index","reward_json","created_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','launch-7d','2026-07-27',1,'{"gold":500}','2026-07-27 08:18:04');
CREATE TABLE event_stage_records (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  player_id TEXT NOT NULL,
  event_key TEXT NOT NULL,
  stage_id TEXT NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE guild_assists (
  player_id TEXT NOT NULL,
  assist_date TEXT NOT NULL,
  helper_player_id TEXT NOT NULL,
  reward_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY(player_id,assist_date),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE player_runtime (
  player_id TEXT PRIMARY KEY,
  last_energy_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
INSERT INTO "player_runtime" ("player_id","last_energy_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a','2026-07-27 12:14:50');
CREATE TABLE gm_heroes(id TEXT PRIMARY KEY,name TEXT NOT NULL,rarity TEXT NOT NULL DEFAULT '稀有',element TEXT NOT NULL DEFAULT '',hero_class TEXT NOT NULL DEFAULT '',description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',base_hp INTEGER NOT NULL DEFAULT 300,base_atk INTEGER NOT NULL DEFAULT 80,base_def INTEGER NOT NULL DEFAULT 0,upgrade_base_cost INTEGER NOT NULL DEFAULT 150,upgrade_multiplier REAL NOT NULL DEFAULT 1,max_level INTEGER NOT NULL DEFAULT 100,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('aria','烈焰劍士・亞莉雅','稀有','火','戰士','前排劍士','/assets/heroes/aria.svg',360,104,18,150,1,100,1,'2026-07-27 07:45:01','2026-07-27 11:25:09');
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('mira','冰霜法師・米菈','史詩','水','法師','冰霜法師','/assets/heroes/mira.svg',390,118,10,150,1,100,1,'2026-07-27 07:45:01','2026-07-27 11:25:09');
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('gorn','鋼鐵守衛・戈恩','稀有','土','守衛','前排守衛','/assets/heroes/gorn.svg',520,86,28,150,1,100,1,'2026-07-27 07:45:01','2026-07-27 11:25:09');
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('luna','月光祭司・露娜','史詩','光','祭司','攻擊時有機會治療生命最低的隊友','/assets/heroes/luna.svg',470,92,14,180,1,100,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('kael','暗影刺客・凱爾','傳說','暗','刺客','擁有高攻擊與高暴擊的單體輸出','/assets/heroes/kael.svg',410,145,8,240,1.1,100,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('elwyn','森林弓手・艾爾雯','稀有','木','弓手','穩定且精準的遠程攻擊英雄','/assets/heroes/elwyn.svg',430,104,11,150,1,100,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('sol','聖光騎士・索爾','傳說','光','騎士','兼具生命與神聖傷害的傳說英雄','/assets/heroes/sol.svg',650,120,22,240,1.1,100,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_heroes" ("id","name","rarity","element","hero_class","description","image_url","base_hp","base_atk","base_def","upgrade_base_cost","upgrade_multiplier","max_level","active","created_at","updated_at") VALUES('nyx','夜語術士・妮克絲','史詩','暗','術士','以虛空魔法強化暴擊並侵蝕敵人','/assets/heroes/nyx.svg',420,128,9,180,1,100,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
CREATE TABLE gm_skills(id TEXT PRIMARY KEY,hero_id TEXT NOT NULL,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',icon_url TEXT NOT NULL DEFAULT '',base_multiplier REAL NOT NULL DEFAULT 1,level_growth REAL NOT NULL DEFAULT .1,upgrade_base_cost INTEGER NOT NULL DEFAULT 800,max_level INTEGER NOT NULL DEFAULT 20,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('aria-flame-slash','aria','烈焰斬','造成 135% 傷害，並有機會形成暴擊','',1.35,0.08,800,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('mira-frost-burst','mira','寒冰爆裂','造成 150% 冰霜魔法傷害','',1.5,0.1,800,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('gorn-shield-bash','gorn','盾牌猛擊','造成傷害並以高生命保護隊友','',1.2,0.07,800,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('luna-moon-heal','luna','月華治癒','攻擊時有 35% 機率治療生命最低隊友','',1.1,0.08,900,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('kael-shadow-strike','kael','影襲','高暴擊率的單體突襲','',1.7,0.12,1200,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('elwyn-wind-arrow','elwyn','穿風箭','精準遠程攻擊，傷害波動較小','',1.4,0.09,800,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('sol-holy-judgment','sol','神聖審判','造成 160% 神聖傷害','',1.6,0.11,1200,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_skills" ("id","hero_id","name","description","icon_url","base_multiplier","level_growth","upgrade_base_cost","max_level","active","created_at","updated_at") VALUES('nyx-void-corrosion','nyx','虛空侵蝕','造成 145% 傷害並強化暴擊','',1.45,0.1,900,20,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
CREATE TABLE gm_equipment(id TEXT PRIMARY KEY,name TEXT NOT NULL,slot TEXT NOT NULL,rarity TEXT NOT NULL DEFAULT '稀有',description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',base_atk INTEGER NOT NULL DEFAULT 0,base_hp INTEGER NOT NULL DEFAULT 0,base_def INTEGER NOT NULL DEFAULT 0,max_enhance INTEGER NOT NULL DEFAULT 20,max_refine INTEGER NOT NULL DEFAULT 5,enhance_gold_base INTEGER NOT NULL DEFAULT 500,dismantle_json TEXT NOT NULL DEFAULT '{}',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_equipment" ("id","name","slot","rarity","description","image_url","base_atk","base_hp","base_def","max_enhance","max_refine","enhance_gold_base","dismantle_json","active","created_at","updated_at") VALUES('sword','星鐵長劍','weapon','稀有','以星鐵打造的長劍','',22,0,0,20,5,500,'{"ore":2,"wood":2}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_equipment" ("id","name","slot","rarity","description","image_url","base_atk","base_hp","base_def","max_enhance","max_refine","enhance_gold_base","dismantle_json","active","created_at","updated_at") VALUES('staff','月光法杖','weapon','史詩','蘊含月光魔力的法杖','',28,0,0,20,5,650,'{"ore":3,"herb":2}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_equipment" ("id","name","slot","rarity","description","image_url","base_atk","base_hp","base_def","max_enhance","max_refine","enhance_gold_base","dismantle_json","active","created_at","updated_at") VALUES('armor','守衛胸甲','armor','稀有','守衛使用的厚重胸甲','',0,120,12,20,5,500,'{"ore":2,"wood":2}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_equipment" ("id","name","slot","rarity","description","image_url","base_atk","base_hp","base_def","max_enhance","max_refine","enhance_gold_base","dismantle_json","active","created_at","updated_at") VALUES('cloak','暗影斗篷','armor','史詩','適合暗影英雄的輕型斗篷','',8,70,5,20,5,600,'{"wood":3,"herb":2}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_equipment" ("id","name","slot","rarity","description","image_url","base_atk","base_hp","base_def","max_enhance","max_refine","enhance_gold_base","dismantle_json","active","created_at","updated_at") VALUES('ring','裂縫戒指','accessory','史詩','蘊含裂縫能量的戒指','',14,45,0,20,5,700,'{"core":1,"ore":3}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
CREATE TABLE gm_items(id TEXT PRIMARY KEY,name TEXT NOT NULL,category TEXT NOT NULL DEFAULT 'material',description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',stack_limit INTEGER NOT NULL DEFAULT 999,usable INTEGER NOT NULL DEFAULT 0,effect_json TEXT NOT NULL DEFAULT '{}',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_items" ("id","name","category","description","image_url","stack_limit","usable","effect_json","active","created_at","updated_at") VALUES('potion','治療藥水','consumable','戰鬥中恢復生命值','/media/uploads/631276cf-2aa0-4312-80d6-d201e968db6f.png',99,1,'{"healPercent":35}',1,'2026-07-27 08:07:41','2026-07-27 11:27:32');
INSERT INTO "gm_items" ("id","name","category","description","image_url","stack_limit","usable","effect_json","active","created_at","updated_at") VALUES('energyPotion','體力藥水','consumable','使用後恢復 10 點體力','',99,1,'{"energy":10}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_items" ("id","name","category","description","image_url","stack_limit","usable","effect_json","active","created_at","updated_at") VALUES('wood','古木碎片','material','裝備精煉與英雄培養素材','',999,0,'{}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_items" ("id","name","category","description","image_url","stack_limit","usable","effect_json","active","created_at","updated_at") VALUES('ore','星鐵礦石','material','裝備鍛造與強化素材','',999,0,'{}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_items" ("id","name","category","description","image_url","stack_limit","usable","effect_json","active","created_at","updated_at") VALUES('herb','月光藥草','material','煉金與活動交換素材','',999,0,'{}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_items" ("id","name","category","description","image_url","stack_limit","usable","effect_json","active","created_at","updated_at") VALUES('core','裂縫核心','material','英雄突破與裝備精煉的稀有素材','',999,0,'{}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
CREATE TABLE gm_shop_products(id TEXT PRIMARY KEY,name TEXT NOT NULL,item_id TEXT NOT NULL,image_url TEXT NOT NULL DEFAULT '',currency TEXT NOT NULL DEFAULT 'gold',price INTEGER NOT NULL DEFAULT 0,daily_limit INTEGER NOT NULL DEFAULT 0,weekly_limit INTEGER NOT NULL DEFAULT 0,lifetime_limit INTEGER NOT NULL DEFAULT 0,starts_at TEXT,ends_at TEXT,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_shop_products" ("id","name","item_id","image_url","currency","price","daily_limit","weekly_limit","lifetime_limit","starts_at","ends_at","active","created_at","updated_at") VALUES('shop-energy-potion','體力藥水','energyPotion','/assets/shop/energyPotion.svg','gold',600,5,0,0,NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_shop_products" ("id","name","item_id","image_url","currency","price","daily_limit","weekly_limit","lifetime_limit","starts_at","ends_at","active","created_at","updated_at") VALUES('shop-heal-potion','治療藥水','potion','/assets/shop/potion.svg','gold',300,5,0,0,NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_shop_products" ("id","name","item_id","image_url","currency","price","daily_limit","weekly_limit","lifetime_limit","starts_at","ends_at","active","created_at","updated_at") VALUES('shop-wood','古木碎片','wood','/assets/shop/wood.svg','gold',180,5,0,0,NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_shop_products" ("id","name","item_id","image_url","currency","price","daily_limit","weekly_limit","lifetime_limit","starts_at","ends_at","active","created_at","updated_at") VALUES('shop-ore','星鐵礦石','ore','/assets/shop/ore.svg','gold',260,5,0,0,NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_shop_products" ("id","name","item_id","image_url","currency","price","daily_limit","weekly_limit","lifetime_limit","starts_at","ends_at","active","created_at","updated_at") VALUES('shop-herb','月光藥草','herb','/assets/shop/herb.svg','gold',220,5,0,0,NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_shop_products" ("id","name","item_id","image_url","currency","price","daily_limit","weekly_limit","lifetime_limit","starts_at","ends_at","active","created_at","updated_at") VALUES('shop-sword','星鐵長劍','sword','/assets/shop/sword.svg','gold',1800,1,0,0,NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
INSERT INTO "gm_shop_products" ("id","name","item_id","image_url","currency","price","daily_limit","weekly_limit","lifetime_limit","starts_at","ends_at","active","created_at","updated_at") VALUES('shop-armor','守衛胸甲','armor','/assets/shop/armor.svg','gold',2200,1,0,0,NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 11:25:09');
CREATE TABLE gm_dungeons(id TEXT PRIMARY KEY,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',energy_cost INTEGER NOT NULL DEFAULT 0,daily_limit INTEGER NOT NULL DEFAULT 0,reward_json TEXT NOT NULL DEFAULT '{}',starts_at TEXT,ends_at TEXT,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_dungeons" ("id","name","description","image_url","energy_cost","daily_limit","reward_json","starts_at","ends_at","active","created_at","updated_at") VALUES('gold','黃金寶庫','每日最多挑戰 3 次，主要獲得大量金幣','',6,3,'{"gold":1800}',NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_dungeons" ("id","name","description","image_url","energy_cost","daily_limit","reward_json","starts_at","ends_at","active","created_at","updated_at") VALUES('material','星界礦坑','每日最多挑戰 3 次，獲得古木、礦石與藥草','',6,3,'{"wood":3,"ore":3,"herb":3}',NULL,NULL,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
CREATE TABLE gm_events(id TEXT PRIMARY KEY,name TEXT NOT NULL,description TEXT NOT NULL DEFAULT '',banner_url TEXT NOT NULL DEFAULT '',starts_at TEXT,ends_at TEXT,config_json TEXT NOT NULL DEFAULT '{}',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_events" ("id","name","description","banner_url","starts_at","ends_at","config_json","active","created_at","updated_at") VALUES('starlight-festival','星光祭典','挑戰活動關卡，獲得鑽石與裂縫核心','',NULL,NULL,'{"stages":[{"id":"starlight","energy":8,"reward":{"gems":40,"core":1}}]}',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
CREATE TABLE gm_login_rewards(id TEXT PRIMARY KEY,campaign_key TEXT NOT NULL,day_index INTEGER NOT NULL,reward_json TEXT NOT NULL DEFAULT '{}',icon_url TEXT NOT NULL DEFAULT '',active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_login_rewards" ("id","campaign_key","day_index","reward_json","icon_url","active","created_at","updated_at") VALUES('launch-day-1','launch-7d',1,'{"gold":500}','',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_login_rewards" ("id","campaign_key","day_index","reward_json","icon_url","active","created_at","updated_at") VALUES('launch-day-2','launch-7d',2,'{"gems":50}','',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_login_rewards" ("id","campaign_key","day_index","reward_json","icon_url","active","created_at","updated_at") VALUES('launch-day-3','launch-7d',3,'{"energy":10}','',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_login_rewards" ("id","campaign_key","day_index","reward_json","icon_url","active","created_at","updated_at") VALUES('launch-day-4','launch-7d',4,'{"core":1}','',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_login_rewards" ("id","campaign_key","day_index","reward_json","icon_url","active","created_at","updated_at") VALUES('launch-day-5','launch-7d',5,'{"gold":1000}','',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_login_rewards" ("id","campaign_key","day_index","reward_json","icon_url","active","created_at","updated_at") VALUES('launch-day-6','launch-7d',6,'{"gems":100}','',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_login_rewards" ("id","campaign_key","day_index","reward_json","icon_url","active","created_at","updated_at") VALUES('launch-day-7','launch-7d',7,'{"gold":1500,"gems":150,"core":2}','',1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
CREATE TABLE gm_announcements(id TEXT PRIMARY KEY,title TEXT NOT NULL,body TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',starts_at TEXT,ends_at TEXT,priority INTEGER NOT NULL DEFAULT 0,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_announcements" ("id","title","body","image_url","starts_at","ends_at","priority","active","created_at","updated_at") VALUES('v17','v1.7 GM 後台上線','英雄、技能、裝備、道具與活動可由後台管理。','',NULL,NULL,100,1,'2026-07-27 07:45:01','2026-07-27 07:45:01');
CREATE TABLE gm_banners(id TEXT PRIMARY KEY,title TEXT NOT NULL,subtitle TEXT NOT NULL DEFAULT '',image_url TEXT NOT NULL DEFAULT '',link_target TEXT NOT NULL DEFAULT '',starts_at TEXT,ends_at TEXT,sort_order INTEGER NOT NULL DEFAULT 0,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
INSERT INTO "gm_banners" ("id","title","subtitle","image_url","link_target","starts_at","ends_at","sort_order","active","created_at","updated_at") VALUES('ete','test','tes','/media/uploads/22be0d3d-b17d-4305-9087-2765efef580c.png','sdad',NULL,NULL,0,1,'2026-07-27 07:48:01','2026-07-27 11:50:41');
CREATE TABLE gm_audit_logs(id INTEGER PRIMARY KEY AUTOINCREMENT,admin_action TEXT NOT NULL,entity_type TEXT NOT NULL,entity_id TEXT NOT NULL,payload_json TEXT NOT NULL DEFAULT '{}',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE gm_announcements_v2 (
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
INSERT INTO "gm_announcements_v2" ("id","title","body","announcement_type","display_location","image_url","starts_at","ends_at","priority","pinned","active","created_at","updated_at") VALUES('v17','v1.7 GM 後台上線','英雄、技能、裝備、道具與活動可由後台管理。','NOTICE','HOME_AND_CENTER','',NULL,NULL,100,0,1,'2026-07-27 07:45:01','2026-07-27 07:45:01');
INSERT INTO "gm_announcements_v2" ("id","title","body","announcement_type","display_location","image_url","starts_at","ends_at","priority","pinned","active","created_at","updated_at") VALUES('welcome-172','v1.7.2 資料同步與公告中心','原有英雄、技能、裝備、道具、商城、副本與登入獎勵已可在 GM 後台管理。','UPDATE','HOME_AND_CENTER','',NULL,NULL,100,1,1,'2026-07-27 08:07:41','2026-07-27 08:07:41');
INSERT INTO "gm_announcements_v2" ("id","title","body","announcement_type","display_location","image_url","starts_at","ends_at","priority","pinned","active","created_at","updated_at") VALUES('tet','tet','et','NOTICE','HOME_AND_CENTER','tettt',NULL,NULL,1,0,1,'2026-07-27 09:44:44','2026-07-27 09:45:21');
CREATE TABLE gm_default_sync_log (
  sync_key TEXT PRIMARY KEY,
  synced_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "gm_default_sync_log" ("sync_key","synced_at") VALUES('defaults-v1.7.2','2026-07-27 08:07:41');
CREATE TABLE arena_profiles (
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
INSERT INTO "arena_profiles" ("player_id","rating","arena_coins","wins","losses","defense_team_json","season_key","updated_at") VALUES('30139025-5317-4dd0-9137-f843d173dd5a',1000,0,0,0,'["aria","mira","gorn"]','season-1','2026-07-27 12:14:50');
CREATE TABLE arena_daily_attempts (
  player_id TEXT NOT NULL,
  attempt_date TEXT NOT NULL,
  used_count INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY(player_id,attempt_date),
  FOREIGN KEY(player_id) REFERENCES players(id) ON DELETE CASCADE
);
CREATE TABLE arena_battles (
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
DELETE FROM sqlite_sequence;
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('admin_logs',6);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('shop_transactions',8);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('battle_records',12);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('dungeon_records',3);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('hero_growth_records',69);
INSERT INTO "sqlite_sequence" ("name","seq") VALUES('item_use_records',6);
CREATE INDEX idx_players_line_user_id ON players(line_user_id);
CREATE INDEX idx_sessions_hash ON sessions(token_hash);
CREATE INDEX idx_sessions_expiry ON sessions(expires_at);
CREATE INDEX idx_oauth_states_expiry ON oauth_states(expires_at);
CREATE INDEX idx_battle_records_player ON battle_records(player_id,created_at DESC);
CREATE INDEX idx_ticket_player ON battle_tickets(player_id,status);
CREATE INDEX idx_daily_mission_player ON daily_missions(player_id,mission_date);
CREATE INDEX idx_mail_player ON player_mail(player_id,claimed_at);
CREATE INDEX idx_admin_session_hash ON admin_sessions(token_hash);
CREATE INDEX idx_shop_transactions_player ON shop_transactions(player_id,created_at DESC);
CREATE INDEX idx_hero_growth_player ON hero_growth_records(player_id,created_at DESC);
CREATE INDEX idx_item_use_player ON item_use_records(player_id,created_at DESC);
CREATE INDEX idx_player_restrictions_status
ON player_restrictions(status,suspended_until);
CREATE INDEX idx_deleted_player_audit_deleted_at
ON deleted_player_audit(deleted_at DESC);
CREATE INDEX idx_dungeon_daily ON dungeon_records(player_id,dungeon_id,clear_date);
CREATE INDEX idx_event_stage_player ON event_stage_records(player_id,created_at DESC);
CREATE INDEX idx_gm_announcements_v2_live
ON gm_announcements_v2(active,priority,starts_at,ends_at);
CREATE INDEX idx_arena_rating ON arena_profiles(rating DESC);
CREATE INDEX idx_arena_battles_player ON arena_battles(player_id,created_at DESC);
