-- v1.8.4 Arena replay favorites and query indexes
ALTER TABLE arena_battles ADD COLUMN is_favorite INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS idx_arena_battles_player_created ON arena_battles(player_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_arena_battles_opponent_created ON arena_battles(opponent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_arena_battles_favorite_created ON arena_battles(is_favorite DESC, created_at DESC);
