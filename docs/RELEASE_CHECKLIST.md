# Release Checklist

交付前必須完成：

- [x] `node --check worker/src/index.js`
- [x] 必要 Router 均有對應函式
- [x] `adminRoutes()` 完整包住 `/api/admin/*`
- [x] `/api/admin/players` 存在
- [x] `/api/catalog` 存在
- [x] Worker／Admin／Frontend／Service Worker 版本一致
- [x] README 與 CHANGELOG 已更新
- [x] 原有 Migration 與 D1 schema 保留
