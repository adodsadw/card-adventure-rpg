# 星界遠征 v1.8.3：完整非同步競技場

本版由 v1.7.7 原地升級。前台不顯示內部版本號，版本僅保留於 GM 管理後台。

## v1.8.3 新增功能

- 3 名對手 MMR 配對：同時參考積分與隊伍戰力。
- 對手刷新：每 30 分鐘免費刷新；冷卻期間可花 20 鑽石刷新。
- 獨立防守隊伍：不影響冒險推圖隊伍。
- 防守 AI 策略：均衡、優先集火、優先治療。
- 離線防守：對方不必在線，登入後可查看防守結果。
- 戰鬥回放：以回合紀錄播放，不儲存影片。
- 每日、每週、賽季獎勵。
- 歷史最高段位、勝率、目前連勝、最佳連勝。
- 好友互加與切磋；切磋不影響積分。
- 全服、好友、公會排行榜。尚未加入公會時，公會榜會顯示提示。
- 攻擊方與防守方的競技積分、勝敗統計會同時更新。

## 從 v1.7.7 升級

### 1. 進入 Worker 目錄

```bash
cd card-adventure-rpg-v1.8.3/worker
```

### 2. 備份正式 D1

```bash
npx wrangler d1 export card-adventure-rpg-db --remote --output=backup-before-v1.8.3.sql --config wrangler.toml
```

### 3. 執行 v1.8.3 Migration

```bash
npx wrangler d1 execute card-adventure-rpg-db --remote --file=./migrate-v1.8-to-v1.8.3.sql --config wrangler.toml
```

Migration 新增競技場防守策略、最高積分、連勝、對手刷新、回放、好友及獎勵資料表。

### 4. 部署

```bash
npx wrangler deploy --config wrangler.toml
```

### 5. 強制重新整理

部署後請強制重新整理瀏覽器或清除舊 PWA 快取。Service Worker 快取名稱已更新為：

```text
starrealm-v1.8.3
```

## 測試方式

競技場至少需要兩個不同玩家帳號。對方玩家不需要在線，只要曾登入並建立競技場資料即可被配對。

1. 帳號 A 儲存防守隊伍與 AI 策略。
2. 帳號 B 進入競技場並挑戰 A。
3. 帳號 A 之後登入，可在戰鬥紀錄看到防守結果並開啟回放。
4. 使用玩家 ID 加入好友後，可進行不影響積分的好友切磋。

## 固定設定

Worker 名稱維持：

```toml
name = "card-adventure-rpg"
```

媒體路由必須由 Worker 優先處理：

```toml
run_worker_first = ["/api/*", "/auth/*", "/media/*"]
```


## v1.8 升級至 v1.8.3
```bash
cd worker
npx wrangler d1 execute card-adventure-rpg-db --remote --file=./migrate-v1.8-to-v1.8.3.sql --config wrangler.toml
npx wrangler deploy --config wrangler.toml
```

v1.8.3 將競技勝負改為同一份伺服器 HP 戰鬥模擬，並新增好友代碼與名稱搜尋。


## v1.8.3 競技場管理後台

管理員登入後切換至 **競技場** 頁籤，即可：

- 搜尋玩家名稱、玩家 ID、LINE User ID、好友代碼。
- 修改競技積分、競技幣、勝敗、連勝與最高積分。
- 重置今日挑戰，或增加 `+1`、`+5`、`+999` 場挑戰。
- 重置指定玩家賽季、清空其競技戰鬥紀錄。
- 重置全服排行榜或重置全服賽季。
- 修改成功後畫面會自動重新讀取，不需要按 F5。

升級既有 D1：

```bash
cd worker
npx wrangler d1 execute card-adventure-rpg --remote --file=migrate-v1.8.2-to-v1.8.3.sql --config wrangler.toml
```

部署：

```bash
cd worker
npx wrangler deploy --config wrangler.toml
```
