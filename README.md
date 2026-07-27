# 星界遠征 v1.7.4

本版本以 v1.7.3 為基礎，修正公告顯示條件，並加入英雄與商城的預設 SVG 圖片。

## v1.7.4 主要修正

- 修正後台新增公告、已勾選啟用，但前台看不到的問題。
- 空白的開始時間與結束時間會正確視為 `NULL`。
- 前台公告 API 同時相容舊資料中的空字串。
- 新增 8 張英雄預設圖片。
- 新增 7 張商城商品預設圖片。
- 更新 Worker、前台、後台與 Service Worker 版本為 v1.7.4。

---

# 一、專案結構

```text
card-adventure-rpg-v1.7.4/
├── frontend/
├── worker/
│   ├── src/index.js
│   ├── wrangler.toml
│   ├── schema.sql
│   ├── migrate-v1.7.3-to-v1.7.4.sql
│   └── sync-defaults-v1.7.2.sql
├── README.md
└── CHANGELOG.md
```

---

# 二、安裝與登入 Cloudflare

先進入 Worker 資料夾：

```bash
cd card-adventure-rpg-v1.7.4/worker
```

安裝依賴：

```bash
npm install
```

登入 Cloudflare：

```bash
npx wrangler login
```

確認登入帳號：

```bash
npx wrangler whoami
```

---

# 三、確認 wrangler.toml

本專案固定 Worker 名稱：

```toml
name = "card-adventure-rpg"
```

正式 D1 設定目前是：

```toml
[[d1_databases]]
binding = "DB"
database_name = "card-adventure-rpg-db"
database_id = "5a7c4fc2-90d7-452c-9bc8-871ccdf1e7f9"
```

請勿把正式資料庫名稱自行改成：

```text
card-adventure-rpg-test
```

除非你已經真的建立測試資料庫，並且將它加入 `wrangler.toml`。

---

# 四、先備份正式 D1

```bash
npx wrangler d1 export card-adventure-rpg-db \
  --remote \
  --output=backup-before-v1.7.4.sql
```

備份完成後，請確認 Worker 資料夾內出現：

```text
backup-before-v1.7.4.sql
```

---

# 五、從 v1.7.3 升級到 v1.7.4

執行本版本 Migration：

```bash
npx wrangler d1 execute card-adventure-rpg-db \
  --remote \
  --file=./migrate-v1.7.3-to-v1.7.4.sql
```

這個 Migration 會：

- 將公告的空白 `starts_at` 改成 `NULL`。
- 將公告的空白 `ends_at` 改成 `NULL`。
- 補上英雄預設圖片路徑。
- 補上商城商品預設圖片路徑。
- 不覆蓋你已經手動設定的圖片。

---

# 六、尚未執行過 v1.7.2 預設資料同步時

只有在英雄、技能、裝備、道具、商城或副本資料仍是空白時，才需要執行：

```bash
npx wrangler d1 execute card-adventure-rpg-db \
  --remote \
  --file=./sync-defaults-v1.7.2.sql
```

此檔案名稱保留 `v1.7.2` 是正常的，因為它是建立 GM 預設資料的基礎 SQL；它不是代表目前版本仍是 v1.7.2。

---

# 七、測試 D1 是可選的

README 舊版曾使用：

```bash
npx wrangler d1 execute card-adventure-rpg-test --remote ...
```

這只有在你已經建立名為 `card-adventure-rpg-test` 的 D1 時才能使用。

若你沒有測試資料庫，請直接略過測試 D1 步驟，使用正式資料庫：

```text
card-adventure-rpg-db
```

若你真的想建立測試 D1：

```bash
npx wrangler d1 create card-adventure-rpg-test
```

Wrangler 會回傳新的 `database_id`。接著必須把測試資料庫加入 `wrangler.toml`，建議使用不同 binding：

```toml
[[d1_databases]]
binding = "DB_TEST"
database_name = "card-adventure-rpg-test"
database_id = "這裡填建立後得到的 ID"
```

但目前專案程式使用的 binding 是 `DB`，因此一般部署不需要建立測試 D1。

---

# 八、確認資料

確認公告：

```bash
npx wrangler d1 execute card-adventure-rpg-db \
  --remote \
  --command "SELECT id,title,active,starts_at,ends_at,display_location FROM gm_announcements_v2 ORDER BY created_at DESC;"
```

確認英雄圖片：

```bash
npx wrangler d1 execute card-adventure-rpg-db \
  --remote \
  --command "SELECT id,name,image_url FROM gm_heroes ORDER BY created_at;"
```

確認商城圖片：

```bash
npx wrangler d1 execute card-adventure-rpg-db \
  --remote \
  --command "SELECT id,name,image_url FROM gm_shop_products ORDER BY created_at;"
```

---

# 九、設定 Secrets

查看目前 Secrets：

```bash
npx wrangler secret list
```

應包含：

```text
ADMIN_PASSWORD
LINE_CHANNEL_ID
LINE_CHANNEL_SECRET
```

缺少時可個別設定：

```bash
npx wrangler secret put ADMIN_PASSWORD
npx wrangler secret put LINE_CHANNEL_ID
npx wrangler secret put LINE_CHANNEL_SECRET
```

---

# 十、部署

在 `worker` 資料夾執行：

```bash
npx wrangler deploy
```

部署後測試：

```text
https://你的網域/api/health
https://你的網域/api/catalog
```

`/api/health` 應顯示：

```json
{
  "ok": true,
  "version": "1.7.4"
}
```

---

# 十一、公告正確設定方式

在 GM 後台新增公告時，建議填寫：

```text
公告 ID：update-174
公告標題：v1.7.4 更新公告
公告類型：UPDATE
顯示位置：HOME_AND_CENTER
優先順序：100
置頂：勾選
啟用：勾選
開始時間：留空
結束時間：留空
```

顯示位置可用：

```text
HOME_AND_CENTER
CENTER_ONLY
HOME_BAR_ONLY
```

開始時間留空代表立即顯示；結束時間留空代表永久顯示。

---

# 十二、圖片說明

預設圖片位於：

```text
frontend/assets/heroes/
frontend/assets/shop/
```

這些圖片是專案內建 SVG，不依賴外部網站，因此不會因外部網址失效而消失。

若後台自行上傳圖片，必須先確認 `wrangler.toml` 的 R2 設定與 Cloudflare R2 Bucket 已存在：

```toml
[[r2_buckets]]
binding = "MEDIA"
bucket_name = "card-adventure-rpg-media"
```

---

# 十三、常見錯誤

## 錯誤：找不到 card-adventure-rpg-test

```text
Couldn't find a D1 DB with name or binding 'card-adventure-rpg-test'
```

原因：你執行了測試資料庫指令，但 Cloudflare 帳號中沒有這個 D1，而且 `wrangler.toml` 也沒有設定它。

最簡單修正：把指令中的：

```text
card-adventure-rpg-test
```

改成正式資料庫：

```text
card-adventure-rpg-db
```

例如：

```bash
npx wrangler d1 execute card-adventure-rpg-db \
  --remote \
  --file=./migrate-v1.7.3-to-v1.7.4.sql
```

## 錯誤：圖片上傳顯示 R2_NOT_CONFIGURED

請先建立 R2 Bucket：

```bash
npx wrangler r2 bucket create card-adventure-rpg-media
```

再重新部署 Worker。

## 部署後仍顯示舊版畫面

請：

1. 強制重新整理瀏覽器。
2. 清除網站資料或 PWA Cache。
3. 確認 `frontend/sw.js` 的 Cache 版本是 v1.7.4。
