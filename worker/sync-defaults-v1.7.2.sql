-- v1.7.2 完整程式預設資料
-- 使用 INSERT OR IGNORE：只補缺少資料，不覆蓋 GM 已修改內容。

INSERT OR IGNORE INTO gm_heroes
(id,name,rarity,element,hero_class,description,image_url,base_hp,base_atk,base_def,upgrade_base_cost,upgrade_multiplier,max_level,active)
VALUES
('aria','烈焰劍士・亞莉雅','稀有','火','戰士','擅長單體爆發與暴擊的前排劍士','',520,88,18,150,1.0,100,1),
('mira','冰霜法師・米菈','史詩','水','法師','使用寒冰魔法造成高額魔法傷害','',390,118,10,150,1.0,100,1),
('gorn','鋼鐵守衛・戈恩','稀有','土','守衛','以高生命與防禦保護隊伍','',760,62,28,150,1.0,100,1),
('luna','月光祭司・露娜','史詩','光','祭司','攻擊時有機會治療生命最低的隊友','',470,92,14,180,1.0,100,1),
('kael','暗影刺客・凱爾','傳說','暗','刺客','擁有高攻擊與高暴擊的單體輸出','',410,145,8,240,1.1,100,1),
('elwyn','森林弓手・艾爾雯','稀有','木','弓手','穩定且精準的遠程攻擊英雄','',430,104,11,150,1.0,100,1),
('sol','聖光騎士・索爾','傳說','光','騎士','兼具生命與神聖傷害的傳說英雄','',650,120,22,240,1.1,100,1),
('nyx','夜語術士・妮克絲','史詩','暗','術士','以虛空魔法強化暴擊並侵蝕敵人','',420,128,9,180,1.0,100,1);

INSERT OR IGNORE INTO gm_skills
(id,hero_id,name,description,icon_url,base_multiplier,level_growth,upgrade_base_cost,max_level,active)
VALUES
('aria-flame-slash','aria','烈焰斬','造成 135% 傷害，並有機會形成暴擊','',1.35,0.08,800,20,1),
('mira-frost-burst','mira','寒冰爆裂','造成 150% 冰霜魔法傷害','',1.50,0.10,800,20,1),
('gorn-shield-bash','gorn','盾牌猛擊','造成傷害並以高生命保護隊友','',1.20,0.07,800,20,1),
('luna-moon-heal','luna','月華治癒','攻擊時有 35% 機率治療生命最低隊友','',1.10,0.08,900,20,1),
('kael-shadow-strike','kael','影襲','高暴擊率的單體突襲','',1.70,0.12,1200,20,1),
('elwyn-wind-arrow','elwyn','穿風箭','精準遠程攻擊，傷害波動較小','',1.40,0.09,800,20,1),
('sol-holy-judgment','sol','神聖審判','造成 160% 神聖傷害','',1.60,0.11,1200,20,1),
('nyx-void-corrosion','nyx','虛空侵蝕','造成 145% 傷害並強化暴擊','',1.45,0.10,900,20,1);

INSERT OR IGNORE INTO gm_equipment
(id,name,slot,rarity,description,image_url,base_atk,base_hp,base_def,max_enhance,max_refine,enhance_gold_base,dismantle_json,active)
VALUES
('sword','星鐵長劍','weapon','稀有','以星鐵打造的長劍','',22,0,0,20,5,500,'{"ore":2,"wood":2}',1),
('staff','月光法杖','weapon','史詩','蘊含月光魔力的法杖','',28,0,0,20,5,650,'{"ore":3,"herb":2}',1),
('armor','守衛胸甲','armor','稀有','守衛使用的厚重胸甲','',0,120,12,20,5,500,'{"ore":2,"wood":2}',1),
('cloak','暗影斗篷','armor','史詩','適合暗影英雄的輕型斗篷','',8,70,5,20,5,600,'{"wood":3,"herb":2}',1),
('ring','裂縫戒指','accessory','史詩','蘊含裂縫能量的戒指','',14,45,0,20,5,700,'{"core":1,"ore":3}',1);

INSERT OR IGNORE INTO gm_items
(id,name,category,description,image_url,stack_limit,usable,effect_json,active)
VALUES
('potion','治療藥水','consumable','戰鬥中恢復生命值','',99,1,'{"healPercent":35}',1),
('energyPotion','體力藥水','consumable','使用後恢復 10 點體力','',99,1,'{"energy":10}',1),
('wood','古木碎片','material','裝備精煉與英雄培養素材','',999,0,'{}',1),
('ore','星鐵礦石','material','裝備鍛造與強化素材','',999,0,'{}',1),
('herb','月光藥草','material','煉金與活動交換素材','',999,0,'{}',1),
('core','裂縫核心','material','英雄突破與裝備精煉的稀有素材','',999,0,'{}',1);

INSERT OR IGNORE INTO gm_shop_products
(id,name,item_id,image_url,currency,price,daily_limit,weekly_limit,lifetime_limit,active)
VALUES
('shop-energy-potion','體力藥水','energyPotion','','gold',600,5,0,0,1),
('shop-heal-potion','治療藥水','potion','','gold',300,5,0,0,1),
('shop-wood','古木碎片','wood','','gold',180,5,0,0,1),
('shop-ore','星鐵礦石','ore','','gold',260,5,0,0,1),
('shop-herb','月光藥草','herb','','gold',220,5,0,0,1),
('shop-sword','星鐵長劍','sword','','gold',1800,1,0,0,1),
('shop-armor','守衛胸甲','armor','','gold',2200,1,0,0,1);

INSERT OR IGNORE INTO gm_dungeons
(id,name,description,image_url,energy_cost,daily_limit,reward_json,active)
VALUES
('gold','黃金寶庫','每日最多挑戰 3 次，主要獲得大量金幣','',6,3,'{"gold":1800}',1),
('material','星界礦坑','每日最多挑戰 3 次，獲得古木、礦石與藥草','',6,3,'{"wood":3,"ore":3,"herb":3}',1);

INSERT OR IGNORE INTO gm_events
(id,name,description,banner_url,config_json,active)
VALUES
('starlight-festival','星光祭典','挑戰活動關卡，獲得鑽石與裂縫核心','',
'{"stages":[{"id":"starlight","energy":8,"reward":{"gems":40,"core":1}}]}',1);

INSERT OR IGNORE INTO gm_login_rewards
(id,campaign_key,day_index,reward_json,icon_url,active)
VALUES
('launch-day-1','launch-7d',1,'{"gold":500}','',1),
('launch-day-2','launch-7d',2,'{"gems":50}','',1),
('launch-day-3','launch-7d',3,'{"energy":10}','',1),
('launch-day-4','launch-7d',4,'{"core":1}','',1),
('launch-day-5','launch-7d',5,'{"gold":1000}','',1),
('launch-day-6','launch-7d',6,'{"gems":100}','',1),
('launch-day-7','launch-7d',7,'{"gold":1500,"gems":150,"core":2}','',1);

INSERT OR IGNORE INTO gm_announcements_v2
(id,title,body,announcement_type,display_location,priority,pinned,active)
VALUES
('welcome-172','v1.7.2 資料同步與公告中心',
'原有英雄、技能、裝備、道具、商城、副本與登入獎勵已可在 GM 後台管理。',
'UPDATE','HOME_AND_CENTER',100,1,1);

INSERT OR IGNORE INTO gm_default_sync_log(sync_key) VALUES('defaults-v1.7.2');
