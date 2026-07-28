-- Star Realm v1.8.2 -> v1.8.3
-- Arena GM Console uses the existing arena tables and therefore needs no destructive schema change.
-- This index improves Admin Arena player search and leaderboard reset operations.
CREATE INDEX IF NOT EXISTS idx_arena_profiles_season_rating ON arena_profiles(season_key, rating DESC);
CREATE INDEX IF NOT EXISTS idx_arena_daily_attempts_date ON arena_daily_attempts(attempt_date, player_id);
CREATE INDEX IF NOT EXISTS idx_arena_battles_opponent ON arena_battles(opponent_id, created_at DESC);
