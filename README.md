# 星界遠征 v1.8.5：版本統一與 GM 營運總覽

## v1.8.5 修正與新增

- 修正管理後台仍顯示 `v1.8.3` 的問題。
- 管理後台瀏覽器標題與登入頁面同步更新為 `v1.8.5`。
- 新增 **總覽** 頁籤，集中查看營運資訊。
- 顯示玩家總數、今日登入、近 7 日活躍、停權玩家與平均關卡。
- 顯示全服金幣／鑽石總量與最近管理操作。
- 顯示 Worker `/api/health` 回傳的伺服器版本，便於發現前後端版本不同步。
- Service Worker 快取名稱更新為 `starrealm-v1.8.5`。

## 從 v1.8.4 升級

本版目前沒有新增 D1 資料表，因此不需要執行 Migration。

### 1. 進入 Worker 目錄

```bash
cd worker
```

### 2. 部署

```bash
npx wrangler deploy --config wrangler.toml
```

### 3. 清除舊快取

Service Worker 快取名稱已更新為：

```text
starrealm-v1.8.5
```

部署後請強制重新整理，或清除瀏覽器／PWA 舊快取。

## GM 營運總覽

管理員登入後，切換至 **總覽** 頁籤即可查看：

- 玩家總數。
- 台灣時間今日登入人數。
- 近 7 日活躍玩家數與比例。
- 目前有效停權玩家數。
- 全體玩家平均關卡進度。
- 全服金幣與鑽石總量。
- 最近 8 筆管理操作。
- 後台介面版本與 Worker 伺服器版本。

總覽使用既有 `/api/admin/players`、`/api/admin/logs` 與 `/api/health`，不會修改玩家資料。

## 固定設定

Worker 名稱維持：

```toml
name = "card-adventure-rpg"
```

所有部署與 D1 指令都必須指定：

```bash
--config wrangler.toml
```

## 驗證

```bash
node --check worker/src/index.js
node --check frontend/game.js
node --check frontend/admin.js
node --check frontend/admin-dashboard.js
node scripts/check-worker.mjs
```
