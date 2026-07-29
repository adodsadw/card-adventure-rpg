# v1.8.5 版本統一與 GM 營運總覽

## 修正

- 管理後台頁面標題與登入畫面統一顯示 `v1.8.5`。
- Worker 改由 `worker/src/app.js` 作為單一版本入口，`/api/health` 回傳 `1.8.5`。
- Service Worker 快取名稱更新為 `starrealm-v1.8.5`。
- GM 總覽同時顯示後台介面版本與伺服器版本，版本不同時可立即發現。

## 新增

- GM「總覽」頁籤。
- 玩家總數、今日登入、近 7 日活躍、停權玩家及平均關卡。
- 全服金幣與鑽石總量。
- 最近管理操作摘要。

## 驗證

```bash
node --check worker/src/app.js
node --check worker/src/index.js
node --check frontend/game.js
node --check frontend/admin.js
node --check frontend/admin-dashboard.js
node scripts/check-worker.mjs
```

本版沒有 D1 結構變更，因此不需要執行 Migration。
