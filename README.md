# 星界遠征 v1.7.6：公告閱讀與首頁 Banner 改善版

本版以 v1.7.5 為基礎，修正公告內容過長造成頁面過度累積的問題，並補充首頁 Banner 顯示位置與後續遊戲模式規劃。

## v1.7.6 修正內容

- 公告預設只顯示前 180 字，長文需按「閱讀更多」展開。
- 展開後可按「收合內容」。
- 公告中心每頁最多顯示 6 篇，超過自動產生分頁。
- 切換公告分類或頁數時會自動清除展開狀態，避免 DOM 累積大量長文。
- 補充管理後台 Banner 欄位說明。
- Service Worker、前台、後台與 Worker 版本同步為 v1.7.6。
- 新增 `docs/GAME_MODE_ROADMAP.md`，規劃競技場、無盡塔、公會戰等後續玩法。

## 首頁 Banner 出現在哪裡？

Banner 顯示於：

```text
前台首頁 → 最上方公告提示列下方 → 玩家資源與功能卡片上方
```

Banner 必須符合以下條件才會顯示：

- 後台 Banner 的「啟用」已勾選。
- 開始時間留空，或開始時間已到。
- 結束時間留空，或尚未到期。
- Worker 已重新部署。
- 瀏覽器沒有仍在使用舊版 Service Worker Cache。

`link_target` 可填：

```text
shopPage
announcementPage
eventPage
heroPage
```

點擊 Banner 後會前往對應頁面。留空則只展示圖片與文字。

## 從 v1.7.5 升級

本版沒有新增 D1 資料表或欄位，不需要執行 Migration。

進入 Worker 資料夾：

```bash
cd card-adventure-rpg-v1.7.6/worker
```

安裝套件：

```bash
npm install
```

部署：

```bash
npx wrangler deploy --config wrangler.toml
```

部署後建議強制重新整理瀏覽器；若仍看到舊畫面，請清除網站資料或取消註冊舊 Service Worker 後再重新開啟。

## 部署前檢查

在專案根目錄執行：

```bash
node --check worker/src/index.js
node --check frontend/game.js
node --check frontend/admin.js
node scripts/check-worker.mjs
```

## 固定 Cloudflare 設定

Worker 名稱保持：

```toml
name = "card-adventure-rpg"
```

靜態與 API 路由保持：

```toml
run_worker_first = ["/api/*", "/auth/*", "/media/*"]
```

完整的後續玩法規劃請查看：

```text
docs/GAME_MODE_ROADMAP.md
```
