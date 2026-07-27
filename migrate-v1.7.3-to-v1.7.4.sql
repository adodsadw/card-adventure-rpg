-- v1.7.3 -> v1.7.4
-- 修復空白公告時間造成前台篩選不到，並補齊預設英雄與商城圖片。
UPDATE gm_announcements_v2 SET starts_at=NULL WHERE starts_at='';
UPDATE gm_announcements_v2 SET ends_at=NULL WHERE ends_at='';
UPDATE gm_heroes SET image_url='/assets/heroes/aria.svg',updated_at=CURRENT_TIMESTAMP WHERE id='aria' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_heroes SET image_url='/assets/heroes/mira.svg',updated_at=CURRENT_TIMESTAMP WHERE id='mira' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_heroes SET image_url='/assets/heroes/gorn.svg',updated_at=CURRENT_TIMESTAMP WHERE id='gorn' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_heroes SET image_url='/assets/heroes/luna.svg',updated_at=CURRENT_TIMESTAMP WHERE id='luna' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_heroes SET image_url='/assets/heroes/kael.svg',updated_at=CURRENT_TIMESTAMP WHERE id='kael' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_heroes SET image_url='/assets/heroes/elwyn.svg',updated_at=CURRENT_TIMESTAMP WHERE id='elwyn' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_heroes SET image_url='/assets/heroes/sol.svg',updated_at=CURRENT_TIMESTAMP WHERE id='sol' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_heroes SET image_url='/assets/heroes/nyx.svg',updated_at=CURRENT_TIMESTAMP WHERE id='nyx' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_shop_products SET image_url='/assets/shop/energyPotion.svg',updated_at=CURRENT_TIMESTAMP WHERE id='shop-energy-potion' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_shop_products SET image_url='/assets/shop/potion.svg',updated_at=CURRENT_TIMESTAMP WHERE id='shop-heal-potion' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_shop_products SET image_url='/assets/shop/wood.svg',updated_at=CURRENT_TIMESTAMP WHERE id='shop-wood' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_shop_products SET image_url='/assets/shop/ore.svg',updated_at=CURRENT_TIMESTAMP WHERE id='shop-ore' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_shop_products SET image_url='/assets/shop/herb.svg',updated_at=CURRENT_TIMESTAMP WHERE id='shop-herb' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_shop_products SET image_url='/assets/shop/sword.svg',updated_at=CURRENT_TIMESTAMP WHERE id='shop-sword' AND (image_url IS NULL OR TRIM(image_url)='');
UPDATE gm_shop_products SET image_url='/assets/shop/armor.svg',updated_at=CURRENT_TIMESTAMP WHERE id='shop-armor' AND (image_url IS NULL OR TRIM(image_url)='');
