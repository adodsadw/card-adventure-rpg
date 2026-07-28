# 星界遠征 v1.8.4：競技場搜尋、分頁與回放管理

## v1.8.4 修正與新增

- 修正好友代碼／玩家名稱「搜尋玩家」按鈕無反應。
- 支援 Enter 搜尋、搜尋中鎖定按鈕與錯誤提示。
- 最近戰鬥改為伺服器分頁，每頁 10 筆。
- API 回傳 `total`、`page`、`pageSize`、`totalPages`。
- 單場回放每頁 15 回合，切頁不重新載入競技場。
- 支援收藏 Replay、刪除單筆 Replay。
- 支援玩家名稱／好友代碼搜尋 Replay。
- 支援今天／本週／本月時間篩選。
- Arena GM Console 維持修改後即時刷新，不需 F5。

## 從 v1.8.3 升級

### 1. 進入 Worker 目錄

```bash
cd worker
```

### 2. 備份正式 D1

```bash
npx wrangler d1 export card-adventure-rpg-db --remote --output=backup-before-v1.8.4.sql --config wrangler.toml
```

### 3. 執行 Migration

```bash
npx wrangler d1 execute card-adventure-rpg-db --remote --file=./migrate-v1.8.3-to-v1.8.4.sql --config wrangler.toml
```

> `card-adventure-rpg-db` 是 D1 的 `database_name`。不是 Worker 名稱。請以 `wrangler.toml` 的實際 D1 名稱為準。

### 4. 部署

```bash
npx wrangler deploy --config wrangler.toml
```

### 5. 清除舊快取

Service Worker 快取名稱已更新為：

```text
starrealm-v1.8.4
```

部署後請強制重新整理或清除 PWA 快取。

## 驗證

```bash
node --check worker/src/index.js
node --check frontend/game.js
node --check frontend/admin.js
node scripts/check-worker.mjs
```
