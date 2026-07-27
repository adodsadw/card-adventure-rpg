const COOKIE_NAME="starrealm_session",ADMIN_COOKIE="starrealm_admin",SESSION_DAYS=30;
const HEROES=[
{id:"aria",rarity:"稀有"},{id:"mira",rarity:"史詩"},{id:"gorn",rarity:"稀有"},{id:"luna",rarity:"史詩"},
{id:"kael",rarity:"傳說"},{id:"elwyn",rarity:"稀有"},{id:"sol",rarity:"傳說"},{id:"nyx",rarity:"史詩"}];
const STAGES={
1:{energy:4,gold:180,xp:25,wood:2},2:{energy:5,gold:260,xp:38,ore:1},3:{energy:6,gold:360,xp:52,herb:2},
4:{energy:8,gold:700,xp:110,gems:80,core:1},5:{energy:10,gold:1100,xp:180,gems:150,core:2},
6:{energy:8,gold:900,xp:145,ore:3},7:{energy:9,gold:1250,xp:180,gems:60},8:{energy:10,gold:1500,xp:220,herb:4},
9:{energy:11,gold:1900,xp:275,gems:90,core:2},10:{energy:14,gold:3500,xp:500,gems:300,core:5}};
const SHOP={energyPotion:{price:600,kind:"item"},potion:{price:300,kind:"item"},wood:{price:180,kind:"material"},ore:{price:260,kind:"material"},herb:{price:220,kind:"material"},sword:{price:1800,kind:"equipment"},armor:{price:2200,kind:"equipment"}};
const DEFAULT_STATE={gold:1200,gems:1200,energy:30,maxEnergy:30,stageUnlocked:1,dailyClaimed:"",team:["aria","mira","gorn"],owned:{aria:{level:1,rank:1,xp:0,copies:1,equipment:{}},mira:{level:1,rank:1,xp:0,copies:1,equipment:{}},gorn:{level:1,rank:1,xp:0,copies:1,equipment:{}}},inventory:{wood:0,ore:0,herb:0,core:0,potion:3,energyPotion:0,equipment:{sword:1,armor:1}},tutorialDone:false,sound:true};
export default{async fetch(req,env){const u=new URL(req.url);try{
if(u.pathname==="/api/health")return J({ok:true,version:"1.7.3",serverAuthoritative:true,admin:true});
if(u.pathname==="/api/diagnostics/line")return await lineDiagnostics(env,req);
if(u.pathname==="/auth/line/start")return await startLine(req,env);if(u.pathname==="/auth/line/callback")return await callback(req,env);
if(u.pathname==="/api/logout"&&req.method==="POST")return await logout(req,env);
if(u.pathname==="/api/admin/login"&&req.method==="POST")return await adminLogin(req,env);
if(u.pathname==="/api/catalog"&&req.method==="GET")return await publicCatalog(env);
if(u.pathname.startsWith("/api/admin/"))return await adminRoutes(req,env,u);
if(u.pathname==="/api/leaderboard")return await leaderboard(req,env);
const a=await auth(req,env);
if(u.pathname==="/api/me"){if(!a)return J({error:"UNAUTHORIZED"},401);return J({user:{id:a.id,displayName:a.display_name,pictureUrl:a.picture_url||""}})}
if(!a&&u.pathname.startsWith("/api/"))return J({error:"UNAUTHORIZED"},401);
if(u.pathname==="/api/game-state"&&req.method==="GET")return J({state:await stateOf(env,a.id)});
if(u.pathname==="/api/game-state"&&req.method==="PUT"){const body=await req.json(),old=await stateOf(env,a.id);old.team=Array.isArray(body.state?.team)?body.state.team.slice(0,3):old.team;old.sound=body.state?.sound!==false;old.tutorialDone=!!body.state?.tutorialDone;await save(env,a.id,old);return J({state:old})}
if(u.pathname==="/api/game-state-beacon"&&req.method==="POST")return J({ok:true});
if(/^\/api\/heroes\/[^/]+\/upgrade$/.test(u.pathname)&&req.method==="POST")return await heroUpgrade(env,a,u.pathname.split("/")[3]);
if(/^\/api\/heroes\/[^/]+\/rank-up$/.test(u.pathname)&&req.method==="POST")return await heroRankUp(env,a,u.pathname.split("/")[3]);
if(u.pathname==="/api/shop/buy"&&req.method==="POST")return await shopBuy(req,env,a);
if(u.pathname==="/api/items/use"&&req.method==="POST")return await useItem(req,env,a);
if(/^\/api\/heroes\/[^/]+\/skill-upgrade$/.test(u.pathname)&&req.method==="POST")return await skillUpgrade(env,a,u.pathname.split("/")[3]);
if(u.pathname==="/api/equipment/enhance"&&req.method==="POST")return await equipmentEnhance(req,env,a);
if(u.pathname==="/api/equipment/refine"&&req.method==="POST")return await equipmentRefine(req,env,a);
if(u.pathname==="/api/equipment/dismantle"&&req.method==="POST")return await equipmentDismantle(req,env,a);
if(u.pathname==="/api/items/use-battle"&&req.method==="POST")return await battleItem(req,env,a);
if(u.pathname==="/api/dungeons/clear"&&req.method==="POST")return await dungeonClear(req,env,a);
if(u.pathname==="/api/events/status"&&req.method==="GET")return await eventStatus(env,a);
if(u.pathname==="/api/events/checkin"&&req.method==="POST")return await eventCheckin(env,a);
if(u.pathname==="/api/events/stage"&&req.method==="POST")return await eventStage(req,env,a);
if(u.pathname==="/api/guild/assists"&&req.method==="GET")return await guildAssists(env,a);
if(u.pathname==="/api/guild/assist"&&req.method==="POST")return await guildAssist(req,env,a);
if(u.pathname==="/api/summon"&&req.method==="POST")return summon(req,env,a);
if(u.pathname==="/api/daily"&&req.method==="POST")return daily(env,a);
if(u.pathname==="/api/battle/start"&&req.method==="POST")return battleStart(req,env,a);
if(u.pathname==="/api/battle/settle"&&req.method==="POST")return battleSettle(req,env,a);
if(u.pathname==="/api/missions"&&req.method==="GET")return missions(env,a);
if(/^\/api\/missions\/[^/]+\/claim$/.test(u.pathname)&&req.method==="POST")return claimMission(env,a,u.pathname.split("/")[3]);
if(u.pathname==="/api/mail"&&req.method==="GET")return mailList(env,a);
if(/^\/api\/mail\/[^/]+\/claim$/.test(u.pathname)&&req.method==="POST")return claimMail(env,a,u.pathname.split("/")[3]);
if(u.pathname.startsWith("/media/")&&env.MEDIA){const o=await env.MEDIA.get(u.pathname.slice(7));if(!o)return new Response("Not found",{status:404});return new Response(o.body,{headers:{"Content-Type":o.httpMetadata?.contentType||"application/octet-stream"}})}
return env.ASSETS.fetch(req)}catch(e){console.error("Worker route failed",u.pathname,e);if(u.pathname.startsWith("/auth/line/"))return loginErrorPage(e,req);return u.pathname.startsWith("/api/")?J({error:"SERVER_ERROR",message:safeError(e)},500):new Response("Server Error",{status:500})}}};


async function heroUpgrade(env,a,heroId){
  const s=await stateOf(env,a.id),h=s.owned?.[heroId];if(!h)return J({error:"HERO_NOT_OWNED"},404);
  const old=h.level||1,cost=150*old;if(s.gold<cost)return J({error:"GOLD_NOT_ENOUGH",message:"GOLD_NOT_ENOUGH"},409);
  s.gold-=cost;h.level=old+1;h.rank=h.rank||1;
  await save(env,a.id,s);
  await env.DB.prepare("INSERT INTO hero_growth_records(player_id,hero_id,action,old_value,new_value,cost_json)VALUES(?,?,?,?,?,?)").bind(a.id,heroId,"LEVEL_UP",old,h.level,JSON.stringify({gold:cost})).run();
  return J({state:s,level:h.level,cost:{gold:cost}})
}
async function heroRankUp(env,a,heroId){
  const s=await stateOf(env,a.id),h=s.owned?.[heroId];if(!h)return J({error:"HERO_NOT_OWNED"},404);
  const old=h.rank||1;if(old>=5)return J({error:"MAX_RANK",message:"MAX_RANK"},409);
  const cost={gold:old*1200,core:old};if(s.gold<cost.gold||(s.inventory.core||0)<cost.core)return J({error:"MATERIAL_NOT_ENOUGH",message:"MATERIAL_NOT_ENOUGH"},409);
  s.gold-=cost.gold;s.inventory.core-=cost.core;h.rank=old+1;
  await save(env,a.id,s);
  await env.DB.prepare("INSERT INTO hero_growth_records(player_id,hero_id,action,old_value,new_value,cost_json)VALUES(?,?,?,?,?,?)").bind(a.id,heroId,"RANK_UP",old,h.rank,JSON.stringify(cost)).run();
  return J({state:s,rank:h.rank,cost})
}
async function shopBuy(req,env,a){
  const b=await req.json(),item=SHOP[b.itemId],qty=limit(b.quantity,1,20);if(!item)return J({error:"ITEM_NOT_FOUND"},404);
  const date=taipeiDate(),limitPerDay=item.kind==="equipment"?1:5;
const used=(await env.DB.prepare("SELECT quantity FROM shop_daily_purchases WHERE player_id=? AND purchase_date=? AND item_id=?").bind(a.id,date,b.itemId).first())?.quantity||0;
if(used+qty>limitPerDay)return J({error:"DAILY_LIMIT",message:"DAILY_LIMIT"},409);
const total=item.price*qty,s=await stateOf(env,a.id);if(s.gold<total)return J({error:"GOLD_NOT_ENOUGH",message:"GOLD_NOT_ENOUGH"},409);
  s.gold-=total;
  if(item.kind==="equipment")s.inventory.equipment[b.itemId]=(s.inventory.equipment[b.itemId]||0)+qty;
  else s.inventory[b.itemId]=(s.inventory[b.itemId]||0)+qty;
  await save(env,a.id,s);
  await env.DB.batch([
  env.DB.prepare("INSERT INTO shop_transactions(player_id,item_id,quantity,gold_cost)VALUES(?,?,?,?)").bind(a.id,b.itemId,qty,total),
  env.DB.prepare(`INSERT INTO shop_daily_purchases(player_id,purchase_date,item_id,quantity)VALUES(?,?,?,?)
    ON CONFLICT(player_id,purchase_date,item_id) DO UPDATE SET quantity=quantity+excluded.quantity`).bind(a.id,date,b.itemId,qty)
]);
  return J({state:s,itemId:b.itemId,quantity:qty,goldCost:total})
}
async function useItem(req,env,a){
  const {itemId}=await req.json(),s=await stateOf(env,a.id);
  if(itemId!=="energyPotion")return J({error:"ITEM_NOT_USABLE"},409);
  if((s.inventory.energyPotion||0)<1)return J({error:"ITEM_NOT_ENOUGH",message:"ITEM_NOT_ENOUGH"},409);
  if(s.energy>=s.maxEnergy)return J({error:"ENERGY_FULL",message:"ENERGY_FULL"},409);
  const before=s.energy;s.inventory.energyPotion--;s.energy=Math.min(s.maxEnergy,s.energy+10);
  await save(env,a.id,s);
  await env.DB.prepare("INSERT INTO item_use_records(player_id,item_id,quantity,effect_json)VALUES(?,?,1,?)").bind(a.id,itemId,JSON.stringify({energyBefore:before,energyAfter:s.energy})).run();
  return J({state:s,effect:{energy:s.energy-before}})
}


async function skillUpgrade(env,a,heroId){
  const s=await stateOf(env,a.id),h=s.owned?.[heroId];if(!h)return J({error:"HERO_NOT_OWNED"},404);
  const old=h.skillLevel||1,cost=old*800;if(s.gold<cost)return J({error:"GOLD_NOT_ENOUGH",message:"GOLD_NOT_ENOUGH"},409);
  s.gold-=cost;h.skillLevel=old+1;await save(env,a.id,s);
  await env.DB.prepare("INSERT INTO hero_growth_records(player_id,hero_id,action,old_value,new_value,cost_json)VALUES(?,?,?,?,?,?)").bind(a.id,heroId,"LEVEL_UP",old,h.skillLevel,JSON.stringify({gold:cost,type:"SKILL"})).run();
  return J({state:s,skillLevel:h.skillLevel})
}
async function equipmentEnhance(req,env,a){
  const {equipmentId}=await req.json(),s=await stateOf(env,a.id);if((s.inventory.equipment[equipmentId]||0)<1)return J({error:"ITEM_NOT_ENOUGH"},409);
  const m=s.equipmentMeta[equipmentId]||{level:0,refine:0},cost={gold:(m.level+1)*500,ore:m.level+1};
  if(s.gold<cost.gold||(s.inventory.ore||0)<cost.ore)return J({error:"MATERIAL_NOT_ENOUGH",message:"MATERIAL_NOT_ENOUGH"},409);
  s.gold-=cost.gold;s.inventory.ore-=cost.ore;m.level++;s.equipmentMeta[equipmentId]=m;await save(env,a.id,s);
  await env.DB.prepare(`INSERT INTO equipment_progress(player_id,equipment_id,enhance_level,refine_level)VALUES(?,?,?,?)
  ON CONFLICT(player_id,equipment_id) DO UPDATE SET enhance_level=excluded.enhance_level,refine_level=excluded.refine_level,updated_at=CURRENT_TIMESTAMP`).bind(a.id,equipmentId,m.level,m.refine).run();
  return J({state:s,level:m.level})
}
async function equipmentRefine(req,env,a){
  const {equipmentId}=await req.json(),s=await stateOf(env,a.id);if((s.inventory.equipment[equipmentId]||0)<1)return J({error:"ITEM_NOT_ENOUGH"},409);
  const m=s.equipmentMeta[equipmentId]||{level:0,refine:0},cost={core:m.refine+1,wood:(m.refine+1)*2};
  if((s.inventory.core||0)<cost.core||(s.inventory.wood||0)<cost.wood)return J({error:"MATERIAL_NOT_ENOUGH",message:"MATERIAL_NOT_ENOUGH"},409);
  s.inventory.core-=cost.core;s.inventory.wood-=cost.wood;m.refine++;s.equipmentMeta[equipmentId]=m;await save(env,a.id,s);
  await env.DB.prepare(`INSERT INTO equipment_progress(player_id,equipment_id,enhance_level,refine_level)VALUES(?,?,?,?)
  ON CONFLICT(player_id,equipment_id) DO UPDATE SET enhance_level=excluded.enhance_level,refine_level=excluded.refine_level,updated_at=CURRENT_TIMESTAMP`).bind(a.id,equipmentId,m.level,m.refine).run();
  return J({state:s,refine:m.refine})
}
async function equipmentDismantle(req,env,a){
  const {equipmentId}=await req.json(),s=await stateOf(env,a.id);if((s.inventory.equipment[equipmentId]||0)<1)return J({error:"ITEM_NOT_ENOUGH",message:"ITEM_NOT_ENOUGH"},409);
  s.inventory.equipment[equipmentId]--;s.inventory.ore=(s.inventory.ore||0)+2;s.inventory.wood=(s.inventory.wood||0)+2;await save(env,a.id,s);return J({state:s,reward:{ore:2,wood:2}})
}
async function battleItem(req,env,a){
  const {itemId}=await req.json(),s=await stateOf(env,a.id);if(itemId!=="potion"||(s.inventory.potion||0)<1)return J({error:"ITEM_NOT_ENOUGH",message:"ITEM_NOT_ENOUGH"},409);
  s.inventory.potion--;await save(env,a.id,s);await env.DB.prepare("INSERT INTO item_use_records(player_id,item_id,quantity,effect_json)VALUES(?,?,1,?)").bind(a.id,itemId,JSON.stringify({healPercent:35})).run();return J({state:s})
}
async function dungeonClear(req,env,a){
  const {dungeonId}=await req.json(),cfg={gold:{energy:6,reward:{gold:1800}},material:{energy:6,reward:{wood:3,ore:3,herb:3}}}[dungeonId];if(!cfg)return J({error:"NOT_FOUND"},404);
  const date=taipeiDate(),count=(await env.DB.prepare("SELECT COUNT(*) c FROM dungeon_records WHERE player_id=? AND dungeon_id=? AND clear_date=?").bind(a.id,dungeonId,date).first()).c;
  if(count>=3)return J({error:"DAILY_LIMIT",message:"DAILY_LIMIT"},409);
  const s=await stateOf(env,a.id);if(s.energy<cfg.energy)return J({error:"ENERGY_NOT_ENOUGH",message:"ENERGY_NOT_ENOUGH"},409);s.energy-=cfg.energy;apply(s,cfg.reward);await save(env,a.id,s);
  await env.DB.prepare("INSERT INTO dungeon_records(player_id,dungeon_id,clear_date,reward_json)VALUES(?,?,?,?)").bind(a.id,dungeonId,date,JSON.stringify(cfg.reward)).run();return J({state:s,reward:cfg.reward})
}
function eventReward(day){return [{gold:500},{gems:50},{energy:10},{core:1},{gold:1000},{gems:100},{gold:1500,gems:150,core:2}][day-1]||{gold:500}}
async function eventStatus(env,a){
  const key="launch-7d",rows=(await env.DB.prepare("SELECT day_index FROM event_checkins WHERE player_id=? AND event_key=? ORDER BY day_index").bind(a.id,key).all()).results;
  return J({eventKey:key,claimedDays:rows.map(x=>x.day_index),todayIndex:Math.min(7,rows.length+1)})
}
async function eventCheckin(env,a){
  const key="launch-7d",date=taipeiDate(),exists=await env.DB.prepare("SELECT 1 x FROM event_checkins WHERE player_id=? AND event_key=? AND checkin_date=?").bind(a.id,key,date).first();if(exists)return J({error:"ALREADY_CLAIMED",message:"ALREADY_CLAIMED"},409);
  const rows=(await env.DB.prepare("SELECT day_index FROM event_checkins WHERE player_id=? AND event_key=?").bind(a.id,key).all()).results,day=Math.min(7,rows.length+1),reward=eventReward(day),s=await stateOf(env,a.id);apply(s,reward);await save(env,a.id,s);
  await env.DB.prepare("INSERT INTO event_checkins(player_id,event_key,checkin_date,day_index,reward_json)VALUES(?,?,?,?,?)").bind(a.id,key,date,day,JSON.stringify(reward)).run();
  return J({state:s,reward,status:{eventKey:key,claimedDays:[...rows.map(x=>x.day_index),day],todayIndex:day}})
}
async function eventStage(req,env,a){
  const {eventStageId}=await req.json();if(eventStageId!=="starlight")return J({error:"NOT_FOUND"},404);
  const s=await stateOf(env,a.id);if(s.energy<8)return J({error:"ENERGY_NOT_ENOUGH",message:"ENERGY_NOT_ENOUGH"},409);const reward={gems:40,core:1};s.energy-=8;apply(s,reward);await save(env,a.id,s);
  await env.DB.prepare("INSERT INTO event_stage_records(player_id,event_key,stage_id,reward_json)VALUES(?,?,?,?)").bind(a.id,"launch-7d",eventStageId,JSON.stringify(reward)).run();return J({state:s,reward})
}
async function guildAssists(env,a){
  const date=taipeiDate(),claimed=!!await env.DB.prepare("SELECT 1 x FROM guild_assists WHERE player_id=? AND assist_date=?").bind(a.id,date).first();
  const rows=(await env.DB.prepare("SELECT id,display_name,stage_unlocked FROM players WHERE id<>? ORDER BY stage_unlocked DESC,last_login_at DESC LIMIT 20").bind(a.id).all()).results;
  return J({claimedToday:claimed,players:rows.map(x=>({id:x.id,displayName:x.display_name,stageUnlocked:x.stage_unlocked,power:x.stage_unlocked*1200}))})
}
async function guildAssist(req,env,a){
  const {helperPlayerId}=await req.json(),date=taipeiDate();try{await env.DB.prepare("INSERT INTO guild_assists(player_id,assist_date,helper_player_id,reward_json)VALUES(?,?,?,?)").bind(a.id,date,helperPlayerId,JSON.stringify({gold:600,energy:5})).run()}catch{return J({error:"ALREADY_CLAIMED",message:"ALREADY_CLAIMED"},409)}
  const s=await stateOf(env,a.id),reward={gold:600,energy:5};apply(s,reward);await save(env,a.id,s);return J({state:s,reward})
}


const CATALOG_TABLES={"heroes":"gm_heroes","skills":"gm_skills","equipment":"gm_equipment","items":"gm_items","shop-products":"gm_shop_products","dungeons":"gm_dungeons","events":"gm_events","login-rewards":"gm_login_rewards","announcements":"gm_announcements_v2","banners":"gm_banners"};
async function rows(env,sql,b=[]){return(await env.DB.prepare(sql).bind(...b).all()).results}
async function publicCatalog(env){
  const now=new Date().toISOString();
  return J({
    heroes:await rows(env,`SELECT h.*,s.name AS skill_name,s.description AS skill_description
      FROM gm_heroes h
      LEFT JOIN gm_skills s ON s.hero_id=h.id AND s.active=1
      WHERE h.active=1 ORDER BY h.created_at`),
    skills:await rows(env,"SELECT * FROM gm_skills WHERE active=1 ORDER BY created_at"),
    equipment:await rows(env,"SELECT * FROM gm_equipment WHERE active=1 ORDER BY created_at"),
    items:await rows(env,"SELECT * FROM gm_items WHERE active=1 ORDER BY created_at"),
    shopProducts:await rows(env,`SELECT p.*,i.description,
      CASE WHEN p.item_id IN (SELECT id FROM gm_equipment) THEN 'equipment' ELSE 'item' END AS product_kind
      FROM gm_shop_products p
      LEFT JOIN gm_items i ON i.id=p.item_id
      WHERE p.active=1
        AND (p.starts_at IS NULL OR p.starts_at<=?)
        AND (p.ends_at IS NULL OR p.ends_at>?)
      ORDER BY p.created_at`,[now,now]),
    dungeons:await rows(env,"SELECT * FROM gm_dungeons WHERE active=1 AND (starts_at IS NULL OR starts_at<=?) AND (ends_at IS NULL OR ends_at>?) ORDER BY created_at",[now,now]),
    events:await rows(env,"SELECT * FROM gm_events WHERE active=1 AND (starts_at IS NULL OR starts_at<=?) AND (ends_at IS NULL OR ends_at>?) ORDER BY created_at",[now,now]),
    loginRewards:await rows(env,"SELECT * FROM gm_login_rewards WHERE active=1 ORDER BY campaign_key,day_index"),
    announcements:await rows(env,"SELECT * FROM gm_announcements_v2 WHERE active=1 AND (starts_at IS NULL OR starts_at<=?) AND (ends_at IS NULL OR ends_at>?) ORDER BY pinned DESC,priority DESC,created_at DESC",[now,now]),
    banners:await rows(env,"SELECT * FROM gm_banners WHERE active=1 AND (starts_at IS NULL OR starts_at<=?) AND (ends_at IS NULL OR ends_at>?) ORDER BY sort_order,created_at DESC",[now,now]),
    version:"1.7.3"
  });
}
async function catalogList(env,e){const t=CATALOG_TABLES[e];if(!t)return J({error:"UNKNOWN_ENTITY"},404);return J({rows:await rows(env,`SELECT * FROM ${t} ORDER BY updated_at DESC`)})}
async function catalogSave(req,env,e){const t=CATALOG_TABLES[e];if(!t)return J({error:"UNKNOWN_ENTITY"},404);const d=await req.json();if(!d.id||!/^[a-zA-Z0-9_-]{1,80}$/.test(d.id))return J({error:"INVALID_ID"},400);const info=(await env.DB.prepare(`PRAGMA table_info(${t})`).all()).results,allow=info.map(x=>x.name).filter(x=>!["created_at","updated_at"].includes(x)),payload={};for(const k of allow)if(k in d)payload[k]=typeof d[k]==="boolean"?(d[k]?1:0):d[k];const cols=Object.keys(payload),vals=cols.map(k=>payload[k]),upd=cols.filter(k=>k!=="id").map(k=>`${k}=excluded.${k}`).join(",");await env.DB.prepare(`INSERT INTO ${t}(${cols.join(",")})VALUES(${cols.map(()=>"?").join(",")}) ON CONFLICT(id) DO UPDATE SET ${upd}${upd?",":""}updated_at=CURRENT_TIMESTAMP`).bind(...vals).run();return J({ok:true})}
async function catalogDelete(env,e,id){const t=CATALOG_TABLES[e];if(!t)return J({error:"UNKNOWN_ENTITY"},404);await env.DB.prepare(`DELETE FROM ${t} WHERE id=?`).bind(id).run();return J({ok:true})}
async function mediaUpload(req,env){if(!env.MEDIA)return J({error:"R2_NOT_CONFIGURED",message:"請先綁定 MEDIA R2 Bucket"},503);const f=(await req.formData()).get("file");if(!f||typeof f==="string")return J({error:"FILE_REQUIRED"},400);if(!["image/png","image/jpeg","image/webp"].includes(f.type)||f.size>2097152)return J({error:"INVALID_FILE",message:"僅支援 PNG/JPG/WebP，最大 2MB"},400);const ext=f.type==="image/png"?"png":f.type==="image/webp"?"webp":"jpg",key=`uploads/${crypto.randomUUID()}.${ext}`;await env.MEDIA.put(key,await f.arrayBuffer(),{httpMetadata:{contentType:f.type}});return J({ok:true,url:`/media/${key}`})}

async function catalogSyncStatus(env){
  const tableNames=["gm_heroes","gm_skills","gm_equipment","gm_items","gm_shop_products","gm_dungeons"];
  const counts={};
  for(const table of tableNames){
    counts[table]=Number((await env.DB.prepare(`SELECT COUNT(*) AS count FROM ${table}`).first())?.count||0);
  }
  const expected={gm_heroes:8,gm_skills:8,gm_equipment:5,gm_items:6,gm_shop_products:7,gm_dungeons:2};
  const missing=Object.entries(expected).filter(([key,value])=>counts[key]<value).map(([key,value])=>({table:key,current:counts[key],expected:value}));
  return J({ok:missing.length===0,inserted:0,counts,missing,message:missing.length?"請在 worker 資料夾執行 sync-defaults-v1.7.2.sql，以補齊程式預設資料。":"預設資料已完整存在。"},missing.length?409:200);
}

async function summon(req,env,a){const {count}=await req.json();if(![1,10].includes(count))return J({error:"INVALID_COUNT"},400);const s=await stateOf(env,a.id),cost=count===10?900:100;if(s.gems<cost)return J({error:"GEMS_NOT_ENOUGH",message:"GEMS_NOT_ENOUGH"},409);s.gems-=cost;const got=[];for(let i=0;i<count;i++){const r=Math.random(),rarity=r<.05?"傳說":r<.28?"史詩":"稀有",pool=HEROES.filter(x=>x.rarity===rarity),h=pool[Math.floor(Math.random()*pool.length)];got.push(h);if(s.owned[h.id])s.owned[h.id].copies=(s.owned[h.id].copies||1)+1;else s.owned[h.id]={level:1,xp:0,copies:1,equipment:{}}}await save(env,a.id,s);await progress(env,a.id,"summon",count);return J({heroes:got,state:s})}
async function daily(env,a){const d=taipeiDate();try{await env.DB.prepare("INSERT INTO daily_claims(player_id,claim_date) VALUES(?,?)").bind(a.id,d).run()}catch{return J({error:"ALREADY_CLAIMED",message:"ALREADY_CLAIMED"},409)}const s=await stateOf(env,a.id),r={gold:500,gems:80,energy:10};apply(s,r);s.dailyClaimed=d;await save(env,a.id,s);return J({reward:r,state:s})}
async function battleStart(req,env,a){const {stageId}=await req.json(),cfg=STAGES[stageId],s=await stateOf(env,a.id);if(!cfg||stageId>s.stageUnlocked)return J({error:"STAGE_LOCKED"},409);if(s.energy<cfg.energy)return J({error:"ENERGY_NOT_ENOUGH",message:"ENERGY_NOT_ENOUGH"},409);s.energy-=cfg.energy;await save(env,a.id,s);const id=crypto.randomUUID(),exp=new Date(Date.now()+20*60000).toISOString();await env.DB.prepare("INSERT INTO battle_tickets(id,player_id,stage_id,expires_at)VALUES(?,?,?,?)").bind(id,a.id,stageId,exp).run();return J({ticket:id,state:s})}
async function battleSettle(req,env,a){const {ticket,result}=await req.json();if(!["WIN","LOSE"].includes(result))return J({error:"INVALID_RESULT"},400);const t=await env.DB.prepare("SELECT * FROM battle_tickets WHERE id=? AND player_id=? AND status='OPEN'").bind(ticket,a.id).first();if(!t||new Date(t.expires_at)<new Date())return J({error:"INVALID_TICKET"},409);const s=await stateOf(env,a.id),reward={};if(result==="WIN"){Object.assign(reward,STAGES[t.stage_id]);delete reward.energy;apply(s,reward);for(const id of s.team||[])addXp(s.owned[id],reward.xp||0);if(t.stage_id===s.stageUnlocked&&s.stageUnlocked<10)s.stageUnlocked++;await progress(env,a.id,"battle",1);await progress(env,a.id,"win",1)}await env.DB.batch([env.DB.prepare("UPDATE battle_tickets SET status='SETTLED',result=?,settled_at=CURRENT_TIMESTAMP WHERE id=?").bind(result,ticket),env.DB.prepare("INSERT INTO battle_records(player_id,stage_id,result,reward_json)VALUES(?,?,?,?)").bind(a.id,t.stage_id,result,JSON.stringify(reward))]);await save(env,a.id,s);return J({reward,state:s})}
async function missions(env,a){const date=taipeiDate(),defs=missionDefs();await ensureMissions(env,a.id,date,defs);const rows=(await env.DB.prepare("SELECT * FROM daily_missions WHERE player_id=? AND mission_date=?").bind(a.id,date).all()).results;return J({missions:defs.map(d=>{const r=rows.find(x=>x.mission_id===d.id)||{};return {...d,progress:r.progress||0,claimed:!!r.claimed_at}})})}
async function claimMission(env,a,id){const date=taipeiDate(),def=missionDefs().find(x=>x.id===id);if(!def)return J({error:"NOT_FOUND"},404);await ensureMissions(env,a.id,date,missionDefs());const r=await env.DB.prepare("SELECT * FROM daily_missions WHERE player_id=? AND mission_date=? AND mission_id=?").bind(a.id,date,id).first();if(!r||r.progress<def.target||r.claimed_at)return J({error:"NOT_CLAIMABLE"},409);const s=await stateOf(env,a.id);apply(s,def.reward);await env.DB.prepare("UPDATE daily_missions SET claimed_at=CURRENT_TIMESTAMP WHERE player_id=? AND mission_date=? AND mission_id=?").bind(a.id,date,id).run();await save(env,a.id,s);return J({state:s,reward:def.reward})}
async function mailList(env,a){const rows=(await env.DB.prepare("SELECT * FROM player_mail WHERE player_id=? AND (expires_at IS NULL OR expires_at>CURRENT_TIMESTAMP) ORDER BY created_at DESC LIMIT 50").bind(a.id).all()).results;return J({mails:rows.map(x=>({...x,reward:parse(x.reward_json,{})}))})}
async function claimMail(env,a,id){const m=await env.DB.prepare("SELECT * FROM player_mail WHERE id=? AND player_id=? AND claimed_at IS NULL").bind(id,a.id).first();if(!m)return J({error:"NOT_CLAIMABLE"},409);const s=await stateOf(env,a.id),reward=parse(m.reward_json,{});apply(s,reward);await env.DB.prepare("UPDATE player_mail SET claimed_at=CURRENT_TIMESTAMP WHERE id=?").bind(id).run();await save(env,a.id,s);return J({state:s,reward})}
async function leaderboard(req,env){const me=await auth(req,env),rows=(await env.DB.prepare("SELECT p.id,p.display_name,p.stage_unlocked,COALESCE(SUM(CASE WHEN b.result='WIN' THEN 1 ELSE 0 END),0) wins FROM players p LEFT JOIN battle_records b ON b.player_id=p.id GROUP BY p.id ORDER BY p.stage_unlocked DESC,wins DESC,p.created_at ASC LIMIT 100").all()).results;return J({rows:rows.map(x=>({displayName:x.display_name,stageUnlocked:x.stage_unlocked,wins:x.wins,power:x.stage_unlocked*1000+x.wins*100,isMe:me?.id===x.id}))})}

async function adminRoutes(req,env,u){const ad=await adminAuth(req,env);if(!ad)return J({error:"ADMIN_UNAUTHORIZED"},401);if(u.pathname==="/api/admin/me")return J({ok:true});
if(u.pathname==="/api/admin/logout"&&req.method==="POST"){const t=getCookie(req,ADMIN_COOKIE);if(t)await env.DB.prepare("DELETE FROM admin_sessions WHERE token_hash=?").bind(await sha(t)).run();return J({ok:true},200,{"Set-Cookie":cookie(ADMIN_COOKIE,"",0)})}
if(u.pathname==="/api/admin/players"){
  const players=(await env.DB.prepare(
    `SELECT p.id,p.display_name,p.gold,p.gems,p.energy,p.max_energy,p.stage_unlocked,p.last_login_at,
            r.status AS restriction_status,r.reason AS restriction_reason,r.suspended_until
     FROM players p LEFT JOIN player_restrictions r ON r.player_id=p.id
     ORDER BY p.last_login_at DESC LIMIT 200`
  ).all()).results.map(x=>({...x,suspended:x.restriction_status==="SUSPENDED"&&(!x.suspended_until||new Date(x.suspended_until)>new Date())}));
  return J({players})
}
if(u.pathname==="/api/admin/resources"&&req.method==="POST"){const b=await req.json();if(!b.playerId)return J({error:"PLAYER_REQUIRED"},400);const s=await stateOf(env,b.playerId),d={gold:limit(b.gold,-1e7,1e7),gems:limit(b.gems,-1e7,1e7),energy:limit(b.energy,-1e5,1e5)};s.gold=Math.max(0,s.gold+d.gold);s.gems=Math.max(0,s.gems+d.gems);s.energy=Math.max(0,Math.min(100000,s.energy+d.energy));await save(env,b.playerId,s);await log(env,"RESOURCE_ADJUST",b.playerId,d,b.reason);return J({ok:true,state:s})}
if(u.pathname==="/api/admin/mail"&&req.method==="POST"){const b=await req.json(),reward={gold:Math.max(0,limit(b.reward?.gold,0,1e7)),gems:Math.max(0,limit(b.reward?.gems,0,1e7)),energy:Math.max(0,limit(b.reward?.energy,0,1e5))};let ids=b.playerId?[b.playerId]:(await env.DB.prepare("SELECT id FROM players").all()).results.map(x=>x.id);const q=ids.map(id=>env.DB.prepare("INSERT INTO player_mail(id,player_id,title,body,reward_json)VALUES(?,?,?,?,?)").bind(crypto.randomUUID(),id,String(b.title||"營運補償").slice(0,80),String(b.body||"請領取附件獎勵。").slice(0,500),JSON.stringify(reward)));for(let i=0;i<q.length;i+=50)await env.DB.batch(q.slice(i,i+50));await log(env,"SEND_MAIL",b.playerId||"ALL",{count:ids.length,reward},b.title);return J({ok:true,count:ids.length})}
if(u.pathname==="/api/admin/suspend"&&req.method==="POST"){
  const b=await req.json();
  if(!b.playerId||!String(b.reason||"").trim())return J({error:"PLAYER_AND_REASON_REQUIRED"},400);
  await env.DB.prepare(
    `INSERT INTO player_restrictions(player_id,status,reason,suspended_until,updated_at)
     VALUES(?,'SUSPENDED',?,?,CURRENT_TIMESTAMP)
     ON CONFLICT(player_id) DO UPDATE SET status='SUSPENDED',reason=excluded.reason,
     suspended_until=excluded.suspended_until,updated_at=CURRENT_TIMESTAMP`
  ).bind(b.playerId,String(b.reason).slice(0,300),b.until||null).run();
  await env.DB.prepare("DELETE FROM sessions WHERE player_id=?").bind(b.playerId).run();
  await log(env,"SUSPEND_PLAYER",b.playerId,{until:b.until||null},b.reason);
  return J({ok:true})
}
if(u.pathname==="/api/admin/unsuspend"&&req.method==="POST"){
  const b=await req.json();if(!b.playerId)return J({error:"PLAYER_REQUIRED"},400);
  await env.DB.prepare("DELETE FROM player_restrictions WHERE player_id=?").bind(b.playerId).run();
  await log(env,"UNSUSPEND_PLAYER",b.playerId,{},"");
  return J({ok:true})
}
if(u.pathname==="/api/admin/player/delete"&&req.method==="POST"){
  const b=await req.json();
  if(b.confirmation!=="DELETE"||!b.playerId)return J({error:"DELETE_CONFIRMATION_REQUIRED"},400);
  const player=await env.DB.prepare("SELECT id,line_user_id,display_name FROM players WHERE id=?").bind(b.playerId).first();
  if(!player)return J({error:"PLAYER_NOT_FOUND"},404);
  await env.DB.batch([
    env.DB.prepare("INSERT INTO deleted_player_audit(player_id,line_user_id,display_name,reason)VALUES(?,?,?,?)")
      .bind(player.id,player.line_user_id||"",player.display_name||"",String(b.reason||"").slice(0,300)),
    env.DB.prepare("DELETE FROM players WHERE id=?").bind(player.id)
  ]);
  await log(env,"DELETE_PLAYER",player.id,{lineUserId:player.line_user_id||""},b.reason);
  return J({ok:true})
}
if(u.pathname==="/api/admin/catalog/sync-defaults"&&req.method==="POST")return await catalogSyncStatus(env);
if(u.pathname==="/api/admin/media/upload"&&req.method==="POST")return await mediaUpload(req,env);
if(u.pathname.startsWith("/api/admin/catalog/")){const p=u.pathname.split("/").filter(Boolean),entity=p[3],id=p[4]||"";if(req.method==="GET")return await catalogList(env,entity);if(req.method==="POST")return await catalogSave(req,env,entity);if(req.method==="DELETE")return await catalogDelete(env,entity,id)}
if(u.pathname==="/api/admin/logs"){const logs=(await env.DB.prepare("SELECT * FROM admin_logs ORDER BY id DESC LIMIT 100").all()).results;return J({logs})}return J({error:"NOT_FOUND"},404)}
async function adminLogin(req,env){if(!env.ADMIN_PASSWORD)throw Error("ADMIN_PASSWORD_NOT_CONFIGURED");const b=await req.json();if(!await eq(String(b.password||""),env.ADMIN_PASSWORD))return J({error:"INVALID_PASSWORD"},401);const token=random(32),hash=await sha(token),exp=new Date(Date.now()+8*3600000).toISOString();await env.DB.prepare("INSERT INTO admin_sessions(id,token_hash,expires_at)VALUES(?,?,?)").bind(crypto.randomUUID(),hash,exp).run();return J({ok:true},200,{"Set-Cookie":cookie(ADMIN_COOKIE,token,8*3600)})}

function missionDefs(){return[{id:"battle3",icon:"⚔️",title:"完成 3 場戰鬥",type:"battle",target:3,reward:{gold:800}},{id:"win2",icon:"🏆",title:"取得 2 場勝利",type:"win",target:2,reward:{gems:60}},{id:"summon1",icon:"✨",title:"進行 1 次召喚",type:"summon",target:1,reward:{energy:8}}]}
async function ensureMissions(env,p,d,defs){await env.DB.batch(defs.map(x=>env.DB.prepare("INSERT OR IGNORE INTO daily_missions(player_id,mission_date,mission_id)VALUES(?,?,?)").bind(p,d,x.id)))}
async function progress(env,p,type,n){const d=taipeiDate(),defs=missionDefs().filter(x=>x.type===type);if(!defs.length)return;await ensureMissions(env,p,d,missionDefs());await env.DB.batch(defs.map(x=>env.DB.prepare("UPDATE daily_missions SET progress=MIN(?,progress+?) WHERE player_id=? AND mission_date=? AND mission_id=?").bind(x.target,n,p,d,x.id)))}
function apply(s,r){s.gold=Math.max(0,(s.gold||0)+(r.gold||0));s.gems=Math.max(0,(s.gems||0)+(r.gems||0));s.energy=Math.max(0,Math.min(s.maxEnergy||30,(s.energy||0)+(r.energy||0)));for(const k of ["wood","ore","herb","core"])if(r[k])s.inventory[k]=(s.inventory[k]||0)+r[k]}
function addXp(h,x){if(!h)return;h.xp=(h.xp||0)+x;while(h.xp>=60+(h.level||1)*40){h.xp-=60+h.level*40;h.level++}}
async function stateOf(env,id){
  const r=await env.DB.prepare("SELECT state_json FROM game_saves WHERE player_id=?").bind(id).first(),s=r?parse(r.state_json,structuredClone(DEFAULT_STATE)):structuredClone(DEFAULT_STATE);
  s.inventory=s.inventory||{};s.inventory.equipment=s.inventory.equipment||{};s.inventory.energyPotion=s.inventory.energyPotion||0;s.equipmentMeta=s.equipmentMeta||{};
  for(const h of Object.values(s.owned||{})){h.rank=h.rank||1;h.skillLevel=h.skillLevel||1}
  let rt=await env.DB.prepare("SELECT last_energy_at FROM player_runtime WHERE player_id=?").bind(id).first();
  if(!rt){await env.DB.prepare("INSERT OR IGNORE INTO player_runtime(player_id)VALUES(?)").bind(id).run();rt={last_energy_at:new Date().toISOString()}}
  if(s.energy<s.maxEnergy){
    const elapsed=Math.floor((Date.now()-new Date(rt.last_energy_at).getTime())/600000);
    if(elapsed>0){s.energy=Math.min(s.maxEnergy,s.energy+elapsed);await env.DB.prepare("UPDATE player_runtime SET last_energy_at=datetime(last_energy_at, '+' || ? || ' minutes') WHERE player_id=?").bind(elapsed*10,id).run();await save(env,id,s)}
  }else await env.DB.prepare("UPDATE player_runtime SET last_energy_at=CURRENT_TIMESTAMP WHERE player_id=?").bind(id).run();
  return s
}
async function save(env,id,s){await env.DB.batch([env.DB.prepare("INSERT INTO game_saves(player_id,state_json,save_version,updated_at)VALUES(?,?,1,CURRENT_TIMESTAMP) ON CONFLICT(player_id) DO UPDATE SET state_json=excluded.state_json,save_version=game_saves.save_version+1,updated_at=CURRENT_TIMESTAMP").bind(id,JSON.stringify(s)),env.DB.prepare("UPDATE players SET gold=?,gems=?,energy=?,max_energy=?,stage_unlocked=?,team_json=?,inventory_json=?,updated_at=CURRENT_TIMESTAMP WHERE id=?").bind(s.gold,s.gems,s.energy,s.maxEnergy,s.stageUnlocked,JSON.stringify(s.team),JSON.stringify(s.inventory),id)])}
async function auth(req,env){
  const t=getCookie(req,COOKIE_NAME);if(!t)return null;
  const p=await env.DB.prepare(
    `SELECT p.*,r.status AS restriction_status,r.reason AS restriction_reason,r.suspended_until
     FROM sessions s JOIN players p ON p.id=s.player_id
     LEFT JOIN player_restrictions r ON r.player_id=p.id
     WHERE s.token_hash=? AND s.expires_at>CURRENT_TIMESTAMP`
  ).bind(await sha(t)).first();
  if(!p)return null;
  if(p.restriction_status==="SUSPENDED"&&(!p.suspended_until||new Date(p.suspended_until)>new Date())){
    const err=new Error("ACCOUNT_SUSPENDED");
    err.code="ACCOUNT_SUSPENDED";
    err.reason=p.restriction_reason||"違反遊戲規範";
    err.until=p.suspended_until||null;
    throw err;
  }
  return p
}
async function adminAuth(req,env){const t=getCookie(req,ADMIN_COOKIE);if(!t)return null;return env.DB.prepare("SELECT id FROM admin_sessions WHERE token_hash=? AND expires_at>CURRENT_TIMESTAMP").bind(await sha(t)).first()}
async function startLine(req,env){
  const problems=[];
  if(!env.LINE_CHANNEL_ID)problems.push("LINE_CHANNEL_ID 尚未設定");
  if(!env.LINE_CHANNEL_SECRET)problems.push("LINE_CHANNEL_SECRET 尚未設定");
  if(!env.DB)problems.push("D1 binding DB 不存在");
  if(problems.length)throw Error("LINE_LOGIN_CONFIG_ERROR: "+problems.join("；"));
  try{await env.DB.prepare("SELECT state FROM oauth_states LIMIT 1").first()}catch(e){throw Error("OAUTH_STATES_TABLE_MISSING: 請先執行 v1.3.1 migration。原始錯誤："+safeError(e))}
  const state=random(24),nonce=random(24),exp=new Date(Date.now()+600000).toISOString();
  await env.DB.prepare("DELETE FROM oauth_states WHERE expires_at<CURRENT_TIMESTAMP").run();
  await env.DB.prepare("INSERT INTO oauth_states(state,nonce,expires_at)VALUES(?,?,?)").bind(state,nonce,exp).run();
  const redirect_uri=new URL("/auth/line/callback",req.url).toString();
  const lineUrl=new URL("https://access.line.me/oauth2/v2.1/authorize");
  lineUrl.search=new URLSearchParams({response_type:"code",client_id:String(env.LINE_CHANNEL_ID),redirect_uri,state,scope:"profile openid",nonce}).toString();
  return Response.redirect(lineUrl.toString(),302)
}
async function callback(req,env){const u=new URL(req.url),code=u.searchParams.get("code"),st=u.searchParams.get("state"),o=await env.DB.prepare("SELECT * FROM oauth_states WHERE state=?").bind(st).first();if(!o||!code)return Response.redirect(new URL("/?login=error",req.url).toString(),302);await env.DB.prepare("DELETE FROM oauth_states WHERE state=?").bind(st).run();const redirect_uri=new URL("/auth/line/callback",req.url).toString(),tr=await fetch("https://api.line.me/oauth2/v2.1/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"authorization_code",code,redirect_uri,client_id:env.LINE_CHANNEL_ID,client_secret:env.LINE_CHANNEL_SECRET})}),td=await tr.json(),vr=await fetch("https://api.line.me/oauth2/v2.1/verify",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({id_token:td.id_token,client_id:env.LINE_CHANNEL_ID,nonce:o.nonce})}),p=await vr.json();if(!p.sub)throw Error("LINE_VERIFY_FAILED");let player=await env.DB.prepare("SELECT * FROM players WHERE line_user_id=?").bind(p.sub).first();if(!player){const id=crypto.randomUUID();await env.DB.batch([env.DB.prepare("INSERT INTO players(id,line_user_id,display_name,picture_url)VALUES(?,?,?,?)").bind(id,p.sub,p.name||"玩家",p.picture||""),env.DB.prepare("INSERT INTO game_saves(player_id,state_json)VALUES(?,?)").bind(id,JSON.stringify(DEFAULT_STATE)),env.DB.prepare("INSERT INTO player_mail(id,player_id,title,body,reward_json)VALUES(?,?,?,?,?)").bind(crypto.randomUUID(),id,"歡迎加入星界遠征","這是給新冒險者的見面禮。",JSON.stringify({gold:1000,gems:100,energy:10}))]);player={id}}const restriction=await env.DB.prepare("SELECT * FROM player_restrictions WHERE player_id=?").bind(player.id).first();
if(restriction&&restriction.status==="SUSPENDED"&&(!restriction.suspended_until||new Date(restriction.suspended_until)>new Date())){
  return suspensionPage(restriction.reason||"違反遊戲規範",restriction.suspended_until);
}
const token=random(32),hash=await sha(token),exp=new Date(Date.now()+SESSION_DAYS*86400000).toISOString();await env.DB.prepare("INSERT INTO sessions(id,player_id,token_hash,expires_at)VALUES(?,?,?,?)").bind(crypto.randomUUID(),player.id,hash,exp).run();return new Response(null,{status:302,headers:{Location:new URL("/?login=success",req.url).toString(),"Set-Cookie":cookie(COOKIE_NAME,token,SESSION_DAYS*86400)}})}
async function logout(req,env){const t=getCookie(req,COOKIE_NAME);if(t)await env.DB.prepare("DELETE FROM sessions WHERE token_hash=?").bind(await sha(t)).run();return J({ok:true},200,{"Set-Cookie":cookie(COOKIE_NAME,"",0)})}
async function log(env,a,t,d,r){await env.DB.prepare("INSERT INTO admin_logs(action,target_player_id,delta_json,reason)VALUES(?,?,?,?)").bind(a,t,JSON.stringify(d),String(r||"").slice(0,300)).run()}
function taipeiDate(){return new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Taipei"}).format(new Date())}
function limit(v,min,max){v=Number(v)||0;return Math.max(min,Math.min(max,Math.trunc(v)))}
function parse(s,f){try{return JSON.parse(s)}catch{return f}}function random(n){const a=new Uint8Array(n);crypto.getRandomValues(a);return btoa(String.fromCharCode(...a)).replace(/[+/=]/g,"")}
async function sha(s){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
async function eq(a,b){const aa=new TextEncoder().encode(a),bb=new TextEncoder().encode(b);if(aa.length!==bb.length)return false;let x=0;for(let i=0;i<aa.length;i++)x|=aa[i]^bb[i];return x===0}
function getCookie(r,n){for(const x of (r.headers.get("Cookie")||"").split(";")){const [k,...v]=x.trim().split("=");if(k===n)return v.join("=")}return""}
function cookie(n,v,age){return`${n}=${v}; Path=/; Max-Age=${age}; HttpOnly; Secure; SameSite=Strict`}

async function lineDiagnostics(env,req){
 const result={ok:true,version:"1.7.3",origin:new URL(req.url).origin,checks:{lineChannelId:!!env.LINE_CHANNEL_ID,lineChannelSecret:!!env.LINE_CHANNEL_SECRET,d1Binding:!!env.DB,oauthStatesTable:false}};
 if(env.DB){try{await env.DB.prepare("SELECT state FROM oauth_states LIMIT 1").first();result.checks.oauthStatesTable=true}catch(e){result.ok=false;result.databaseError=safeError(e)}}
 if(!result.checks.lineChannelId||!result.checks.lineChannelSecret||!result.checks.d1Binding||!result.checks.oauthStatesTable)result.ok=false;
 result.callbackUrl=result.origin+"/auth/line/callback";
 return J(result,result.ok?200:503)
}
function safeError(e){return String(e?.message||e||"UNKNOWN_ERROR").slice(0,500)}
function loginErrorPage(e,req){const message=safeError(e);const origin=new URL(req.url).origin;const hint=message.includes("LINE_LOGIN_CONFIG_ERROR")?"請重新設定 LINE_CHANNEL_ID 與 LINE_CHANNEL_SECRET。":message.includes("OAUTH_STATES_TABLE_MISSING")?"請執行 migrate-v1.3-to-v1.3.1.sql。":"請查看 Worker Logs 與診斷 API。";return new Response(`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>LINE 登入設定錯誤</title><style>body{font-family:system-ui;background:#090b18;color:#fff;padding:28px}.box{max-width:760px;margin:auto;background:#151a32;border:1px solid #343b68;border-radius:20px;padding:24px}code{display:block;background:#090b18;padding:12px;border-radius:10px;overflow:auto;color:#ffb5c2}a{color:#8edcff}</style><div class="box"><h1>LINE 登入暫時無法使用</h1><p>${hint}</p><code>${message.replace(/[<&]/g,c=>c==="<"?"&lt;":"&amp;")}</code><p>診斷網址：</p><code>${origin}/api/diagnostics/line</code><p>LINE Callback 應設定為：</p><code>${origin}/auth/line/callback</code><p><a href="/">返回遊戲首頁</a></p></div></html>`,{status:500,headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"no-store"}})}
function suspensionPage(reason,until){
  const untilText=until?new Intl.DateTimeFormat("zh-TW",{timeZone:"Asia/Taipei",dateStyle:"full",timeStyle:"short"}).format(new Date(until)):"永久停權";
  return new Response(`<!doctype html><html lang="zh-Hant"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>帳戶已停權</title><style>body{margin:0;background:#080a16;color:#fff;font-family:system-ui;display:grid;place-items:center;min-height:100vh;padding:20px}.box{max-width:520px;background:#151a33;border:1px solid #ff667f66;border-radius:24px;padding:28px;box-shadow:0 20px 70px #0008}.icon{font-size:64px}p{color:#c8cbe0;line-height:1.7}.reason{background:#ff557711;border:1px solid #ff557744;border-radius:14px;padding:14px}</style><div class="box"><div class="icon">⛔</div><h1>帳戶目前已停權</h1><p class="reason"><b>停權原因：</b>${esc(reason)}<br><b>停權期限：</b>${esc(untilText)}</p><p>停權期間無法登入或使用遊戲功能。如認為有誤，請聯絡遊戲管理者。</p></div>`,{status:403,headers:{"Content-Type":"text/html;charset=utf-8","Cache-Control":"no-store"}})
}
function esc(s){return String(s||"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function J(d,s=200,h={}){return new Response(JSON.stringify(d),{status:s,headers:{"Content-Type":"application/json;charset=utf-8","Cache-Control":"no-store",...h}})}
