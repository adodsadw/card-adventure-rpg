# 星界遠征 v1.7.7：非同步競技場

本版直接由 v1.7.6 升級，前台不再顯示版本號；版本只保留在 GM 管理後台。新增第一階段非同步競技場 PvP。

## v1.7.7 更新內容

- 前台瀏覽器標題移除 `v1.x.x`，公開玩家不會看到內部版本。
- GM 管理後台版本更新為 `v1.7.7`。
- 新增「星界競技場」入口與競技場頁面。
- 每日 5 次免費挑戰。
- 伺服器配對積分相近的 3 位玩家。
- 玩家可儲存目前 3 人隊伍為防守隊伍。
- 對手由伺服器依存檔與防守隊伍計算戰力。
- 勝利：競技積分 `+25`、競技幣 `+30`。
- 失敗：競技積分 `-15`、競技幣 `+10`。
- 新增青銅、白銀、黃金、白金、鑽石、星耀、傳奇段位。
- 顯示最近 10 場競技紀錄。

> 本版是非同步 PvP：對方不需要同時在線，不使用 WebSocket，適合 Cloudflare Workers + D1。

## 專案固定設定

Worker 名稱固定：

```toml
name = "card-adventure-rpg"
```

請保留既有 `wrangler.toml` 中的 D1 `database_id`、R2 Bucket 與 Assets 設定。

## 從 v1.7.6 升級

### 1. 進入 Worker 資料夾

```bash
cd card-adventure-rpg-v1.7.7/worker
```

### 2. 安裝套件

```bash
npm install
```

### 3. 備份正式 D1

```bash
npx wrangler d1 export card-adventure-rpg-db --remote --output=backup-before-v1.7.7.sql --config wrangler.toml
```

### 4. 執行競技場 Migration

```bash
npx wrangler d1 execute card-adventure-rpg-db --remote --file=./migrate-v1.7.6-to-v1.7.7.sql --config wrangler.toml
```

Migration 會建立：

- `arena_profiles`
- `arena_daily_attempts`
- `arena_battles`

並為既有玩家建立初始競技資料，不會刪除原有存檔。

### 5. 部署

```bash
npx wrangler deploy --config wrangler.toml
```

### 6. 強制重新整理

部署後請在瀏覽器強制重新整理，避免舊 Service Worker 快取。v1.7.7 的快取名稱為：

```text
starrealm-v1.7.7
```

## 驗證方式

登入兩個以上玩家帳號後：

1. 在首頁點擊「星界競技場」。
2. 點擊「儲存目前隊伍」。
3. 確認畫面顯示 3 位或現有可配對玩家。
4. 挑戰一次後，確認剩餘次數由 `5 / 5` 變成 `4 / 5`。
5. 確認積分、勝敗場與競技幣更新。
6. 重新整理後，資料仍需保留。

如果只有一個玩家帳號，競技場會顯示目前沒有其他對手，這是正常情況。

## 部署前檢查

在專案根目錄執行：

```bash
node --check worker/src/index.js
node --check frontend/game.js
node --check frontend/admin.js
node scripts/check-worker.mjs
```

## 後續競技場規劃

下一階段建議加入：

- 賽季每週結算與信箱獎勵
- 競技幣商城
- 防守成功／被挑戰紀錄
- 復仇功能
- 每日刷新配對
- 段位排行榜
- 賽季重置
