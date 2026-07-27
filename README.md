# 星界遠征 v1.7.3：穩定修復版

> 本版直接由 v1.7.2 修復，補回遺失的 Worker API、GM 玩家列表與 Catalog CRUD，並同步前後台版本。

## v1.7.3 重要修正

- 修復 `summon is not defined`。
- 修復排行榜讀取失敗。
- 修復戰鬥開始／結算、每日任務與郵件 API。
- 修復 `/api/catalog`，前台可讀取英雄、技能、裝備、公告與 Banner。
- 修復 GM 玩家列表、管理員登入狀態與登出。
- 修復英雄、技能、裝備、道具、商城、副本、活動、登入獎勵、公告及 Banner CRUD。
- 管理後台、遊戲前台、Service Worker 與 Worker 版本統一為 v1.7.3。
- 新增靜態完整性檢查，避免 Router 呼叫不存在的函式。

## 修正內容

### 1. 原始預設資料可在 GM 後台編輯

v1.7 的前端仍有程式內建英雄與商城資料，但 GM 後台只會顯示 D1 的 `gm_*` 資料表。

v1.7.2 新增：

```text
sync-defaults-v1.7.2.sql
```

會補齊：

- 8 名英雄
- 8 組技能
- 5 件裝備
- 6 種道具
- 7 個商城商品
- 2 個資源副本
- 星光祭典活動
- 7 日登入獎勵
- 預設公告

全部使用 `INSERT OR IGNORE`：

- 缺少的資料會新增
- 已存在的資料不覆蓋
- GM 已修改的名稱、價格與圖片不會被重設
- 可安全重複執行

GM 每個分類也新增「補齊程式預設資料」按鈕。

### 2. 完整公告中心

前台新增：

```text
首頁 → 公告中心
```

公告支援：

- 更新公告
- 活動公告
- 維護公告
- 一般公告
- 顯示於首頁與公告中心
- 只顯示於公告中心
- 只顯示首頁跑馬／提示列
- 公告圖片
- 置頂
- 優先順序
- 開始時間
- 結束時間

### 3. Banner 顯示改善

- 沒有圖片時也會顯示漸層 Banner
- 支援多張 Banner 自動輪播
- 支援圓點切換
- 點擊可前往指定頁面
- 開始與結束時間由 Worker 過濾

---

# 從 v1.7／v1.7.1 原地升級

## 1. 固定 Worker 名稱

```toml
name = "card-adventure-rpg"
```

## 2. 保留原 D1 ID

將你正式的 `database_id` 填入 v1.7.2 `wrangler.toml`。

## 3. 備份正式 D1

```bash
cd card-adventure-rpg-v1.7.2/worker
npm install
npx wrangler d1 export card-adventure-rpg-db --remote --output=backup-before-v1.7.2.sql
```

## 4. 先在測試 D1 驗證

```bash
npx wrangler d1 execute card-adventure-rpg-test --remote --file=migrate-v1.7-to-v1.7.2.sql
npx wrangler d1 execute card-adventure-rpg-test --remote --file=sync-defaults-v1.7.2.sql
```

## 5. 正式 Migration

```bash
npx wrangler d1 execute card-adventure-rpg-db --remote --file=migrate-v1.7-to-v1.7.2.sql
```

## 6. 補齊原始預設資料

```bash
npx wrangler d1 execute card-adventure-rpg-db --remote --file=sync-defaults-v1.7.2.sql
```

這一步就是解決後台顯示「目前沒有資料」的關鍵。

## 7. 確認資料數量

```bash
npx wrangler d1 execute card-adventure-rpg-db --remote --command "SELECT 'heroes' type,COUNT(*) count FROM gm_heroes UNION ALL SELECT 'skills',COUNT(*) FROM gm_skills UNION ALL SELECT 'equipment',COUNT(*) FROM gm_equipment UNION ALL SELECT 'items',COUNT(*) FROM gm_items UNION ALL SELECT 'shop',COUNT(*) FROM gm_shop_products UNION ALL SELECT 'dungeons',COUNT(*) FROM gm_dungeons;"
```

至少應看到：

```text
heroes       8
skills       8
equipment    5
items        6
shop         7
dungeons     2
```

## 8. 確認 Secrets

```bash
npx wrangler secret list --name card-adventure-rpg
```

應包含：

```text
ADMIN_PASSWORD
LINE_CHANNEL_ID
LINE_CHANNEL_SECRET
```

## 9. 部署

```bash
npx wrangler deploy --config wrangler.toml
```

網址仍維持：

```text
https://card-adventure-rpg.你的-subdomain.workers.dev
```

---

# 公告發布設定範例

在 GM 後台「公告」新增：

```text
公告 ID：update-172
公告標題：v1.7.2 更新公告
公告類型：UPDATE
顯示位置：HOME_AND_CENTER
優先順序：100
置頂：勾選
啟用：勾選
```

開始時間留空代表立即顯示；結束時間留空代表永久顯示。

Banner 圖片網址若無法公開存取，前台會無法載入圖片；但 v1.7.2 即使圖片失效，也會保留 Banner 標題與漸層背景。