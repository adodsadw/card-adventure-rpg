-- v1.8 -> v1.8.2：好友代碼與競技場公平戰鬥修正
PRAGMA foreign_keys=ON;
ALTER TABLE arena_profiles ADD COLUMN friend_code TEXT;
UPDATE arena_profiles SET friend_code='SR-' || UPPER(SUBSTR(REPLACE(player_id,'-',''),1,8)) WHERE friend_code IS NULL OR friend_code='';
CREATE INDEX IF NOT EXISTS idx_arena_friend_code ON arena_profiles(friend_code);
