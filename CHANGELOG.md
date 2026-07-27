# CHANGELOG

## v1.7.4
- 修復公告結束時間留空卻被存成空字串，導致前台查詢排除新公告。
- 後台公告新增類型、顯示位置與置頂設定。
- 新增 8 張英雄與 7 張商城現代星界風格 SVG 預設圖片。
- 英雄卡片與英雄詳細頁支援顯示後台圖片。
- 「補齊程式預設資料」會補上空白圖片並修復公告時間。


## v1.7.4

### 修正
- 補回 `summon()`、`leaderboard()`、`daily()`。
- 補回 `battleStart()`、`battleSettle()`。
- 補回 `missions()`、`claimMission()`。
- 補回 `mailList()`、`claimMail()`。
- 補回 `catalogList()`、`catalogSave()`、`catalogDelete()`、`mediaUpload()`。
- 恢復 `/api/catalog` 公開資料 API。
- 恢復 `/api/admin/me`、`/api/admin/logout`、`/api/admin/players`。
- 將 Admin、Frontend、Worker 版本統一為 v1.7.4。

### 防止再次發生
- 新增 `scripts/check-worker.mjs`，檢查必要函式與路由。
- 新增 `docs/RELEASE_CHECKLIST.md` 與 `docs/API_CHECKLIST.md`。
