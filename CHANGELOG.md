# CHANGELOG

## v1.7.3

### 修正
- 補回 `summon()`、`leaderboard()`、`daily()`。
- 補回 `battleStart()`、`battleSettle()`。
- 補回 `missions()`、`claimMission()`。
- 補回 `mailList()`、`claimMail()`。
- 補回 `catalogList()`、`catalogSave()`、`catalogDelete()`、`mediaUpload()`。
- 恢復 `/api/catalog` 公開資料 API。
- 恢復 `/api/admin/me`、`/api/admin/logout`、`/api/admin/players`。
- 將 Admin、Frontend、Worker 版本統一為 v1.7.3。

### 防止再次發生
- 新增 `scripts/check-worker.mjs`，檢查必要函式與路由。
- 新增 `docs/RELEASE_CHECKLIST.md` 與 `docs/API_CHECKLIST.md`。
