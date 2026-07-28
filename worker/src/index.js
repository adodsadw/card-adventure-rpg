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
if(u.pathname==="/api/health")return J({ok:true,version:"1.8.2",serverAuthoritative:true,admin:true});
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
if(u.pathname==="/api/arena/status"&&req.method==="GET")return arenaStatus(req,env,a);
if(u.pathname==="/api/arena/defense"&&req.method==="POST")return arenaDefense(req,env,a);
if(u.pathname==="/api/arena/refresh"&&req.method==="POST")return arenaRefresh(req,env,a);
if(u.pathname==="/api/arena/challenge"&&req.method==="POST")return arenaChallenge(req,env,a);
if(u.pathname==="/api/arena/spar"&&req.method==="POST")return arenaSpar(req,env,a);
if(u.pathname==="/api/arena/friends"&&req.method==="POST")return arenaAddFriend(req,env,a);
if(u.pathname==="/api/arena/friend-search"&&req.method==="GET")return arenaFriendSearch(req,env,a);
if(u.pathname==="/api/arena/leaderboard"&&req.method==="GET")return arenaLeaderboard(req,env,a);
if(u.pathname==="/api/arena/rewards"&&req.method==="POST")return arenaClaimReward(req,env,a);
if(/^\/api\/arena\/replay\/[^/]+$/.test(u.pathname)&&req.method==="GET")return arenaReplay(env,a,u.pathname.split("/")[4]);
if(u.pathname.startsWith("/media/")&&env.MEDIA){const key=u.pathname.slice(7);const o=await env.MEDIA.get(key);if(!o)return new Response("Not found",{status:404,headers:{"Cache-Control":"no-store"}});const h=new Headers();o.writeHttpMetadata(h);h.set("Content-Type",o.httpMetadata?.contentType||h.get("Content-Type")||"application/octet-stream");h.set("Cache-Control","public, max-age=86400");h.set("X-Content-Type-Options","nosniff");if(o.httpEtag)h.set("ETag",o.httpEtag);return new Response(o.body,{headers:h})}
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
        AND (NULLIF(p.starts_at,'') IS NULL OR p.starts_at<=?)
        AND (NULLIF(p.ends_at,'') IS NULL OR p.ends_at>?)
      ORDER BY p.created_at`,[now,now]),
    dungeons:await rows(env,"SELECT * FROM gm_dungeons WHERE active=1 AND (NULLIF(starts_at,'') IS NULL OR starts_at<=?) AND (NULLIF(ends_at,'') IS NULL OR ends_at>?) ORDER BY created_at",[now,now]),
    events:await rows(env,"SELECT * FROM gm_events WHERE active=1 AND (NULLIF(starts_at,'') IS NULL OR starts_at<=?) AND (NULLIF(ends_at,'') IS NULL OR ends_at>?) ORDER BY created_at",[now,now]),
    loginRewards:await rows(env,"SELECT * FROM gm_login_rewards WHERE active=1 ORDER BY campaign_key,day_index"),
    announcements:await rows(env,"SELECT * FROM gm_announcements_v2 WHERE active=1 AND (NULLIF(starts_at,'') IS NULL OR starts_at<=?) AND (NULLIF(ends_at,'') IS NULL OR ends_at>?) ORDER BY pinned DESC,priority DESC,created_at DESC",[now,now]),
    banners:await rows(env,"SELECT * FROM gm_banners WHERE active=1 AND (NULLIF(starts_at,'') IS NULL OR starts_at<=?) AND (NULLIF(ends_at,'') IS NULL OR ends_at>?) ORDER BY sort_order,created_at DESC",[now,now]),
    version:"1.8.2"
  });
}
async function catalogList(env,e){const t=CATALOG_TABLES[e];if(!t)return J({error:"UNKNOWN_ENTITY"},404);return J({rows:await rows(env,`SELECT * FROM ${t} ORDER BY updated_at DESC`)})}
async function catalogSave(req,env,e){const t=CATALOG_TABLES[e];if(!t)return J({error:"UNKNOWN_ENTITY"},404);const d=await req.json();if(!d.id||!/^[a-zA-Z0-9_-]{1,80}$/.test(d.id))return J({error:"INVALID_ID"},400);const info=(await env.DB.prepare(`PRAGMA table_info(${t})`).all()).results,allow=info.map(x=>x.name).filter(x=>!["created_at","updated_at"].includes(x)),payload={};for(const k of allow)if(k in d){let v=typeof d[k]==="boolean"?(d[k]?1:0):d[k];if(["starts_at","ends_at"].includes(k)&&String(v??"").trim()==="")v=null;payload[k]=v}const cols=Object.keys(payload),vals=cols.map(k=>payload[k]),upd=cols.filter(k=>k!=="id").map(k=>`${k}=excluded.${k}`).join(",");await env.DB.prepare(`INSERT INTO ${t}(${cols.join(",")})VALUES(${cols.map(()=>"?").join(",")}) ON CONFLICT(id) DO UPDATE SET ${upd}${upd?",":""}updated_at=CURRENT_TIMESTAMP`).bind(...vals).run();return J({ok:true})}
async function catalogDelete(env,e,id){const t=CATALOG_TABLES[e];if(!t)return J({error:"UNKNOWN_ENTITY"},404);await env.DB.prepare(`DELETE FROM ${t} WHERE id=?`).bind(id).run();return J({ok:true})}
async function mediaUpload(req,env){if(!env.MEDIA)return J({error:"R2_NOT_CONFIGURED",message:"請先綁定 MEDIA R2 Bucket"},503);const f=(await req.formData()).get("file");if(!f||typeof f==="string")return J({error:"FILE_REQUIRED"},400);if(!["image/png","image/jpeg","image/webp"].includes(f.type)||f.size>2097152)return J({error:"INVALID_FILE",message:"僅支援 PNG/JPG/WebP，最大 2MB"},400);const ext=f.type==="image/png"?"png":f.type==="image/webp"?"webp":"jpg",key=`uploads/${crypto.randomUUID()}.${ext}`;await env.MEDIA.put(key,await f.arrayBuffer(),{httpMetadata:{contentType:f.type}});return J({ok:true,url:`/media/${key}`,storage:"cloudflare-r2",bucket:"card-adventure-rpg-media",key})}

async function catalogSyncStatus(env){
  const defaults={
    gm_heroes:{aria:"/assets/heroes/aria.svg",mira:"/assets/heroes/mira.svg",gorn:"/assets/heroes/gorn.svg",luna:"/assets/heroes/luna.svg",kael:"/assets/heroes/kael.svg",elwyn:"/assets/heroes/elwyn.svg",sol:"/assets/heroes/sol.svg",nyx:"/assets/heroes/nyx.svg"},
    gm_shop_products:{"shop-energy-potion":"/assets/shop/energyPotion.svg","shop-heal-potion":"/assets/shop/potion.svg","shop-wood":"/assets/shop/wood.svg","shop-ore":"/assets/shop/ore.svg","shop-herb":"/assets/shop/herb.svg","shop-sword":"/assets/shop/sword.svg","shop-armor":"/assets/shop/armor.svg"}
  };
  let updated=0;
  for(const [table,map] of Object.entries(defaults))for(const [id,url] of Object.entries(map)){
    const r=await env.DB.prepare(`UPDATE ${table} SET image_url=?,updated_at=CURRENT_TIMESTAMP WHERE id=? AND (image_url IS NULL OR TRIM(image_url)='')`).bind(url,id).run();
    updated+=Number(r.meta?.changes||0);
  }
  await env.DB.prepare("UPDATE gm_announcements_v2 SET starts_at=NULL WHERE starts_at='' ").run();
  await env.DB.prepare("UPDATE gm_announcements_v2 SET ends_at=NULL WHERE ends_at='' ").run();
  const tableNames=["gm_heroes","gm_skills","gm_equipment","gm_items","gm_shop_products","gm_dungeons"];
  const counts={};for(const table of tableNames)counts[table]=Number((await env.DB.prepare(`SELECT COUNT(*) AS count FROM ${table}`).first())?.count||0);
  const expected={gm_heroes:8,gm_skills:8,gm_equipment:5,gm_items:6,gm_shop_products:7,gm_dungeons:2};
  const missing=Object.entries(expected).filter(([key,value])=>counts[key]<value).map(([key,value])=>({table:key,current:counts[key],expected:value}));
  return J({ok:missing.length===0,inserted:updated,updated,counts,missing,message:missing.length?"仍有預設資料缺少，請執行 sync-defaults-v1.7.4.sql。":`已補齊 ${updated} 筆預設圖片並修復公告時間欄位。`},missing.length?409:200);
}

async function summon(req,env,a){const {count}=await req.json();if(![1,10].includes(count))return J({error:"INVALID_COUNT"},400);const s=await stateOf(env,a.id),cost=count===10?900:100;if(s.gems<cost)return J({error:"GEMS_NOT_ENOUGH",message:"GEMS_NOT_ENOUGH"},409);s.gems-=cost;const got=[];for(let i=0;i<count;i++){const r=Math.random(),rarity=r<.05?"傳說":r<.28?"史詩":"稀有",pool=HEROES.filter(x=>x.rarity===rarity),h=pool[Math.floor(Math.random()*pool.length)];got.push(h);if(s.owned[h.id])s.owned[h.id].copies=(s.owned[h.id].copies||1)+1;else s.owned[h.id]={level:1,xp:0,copies:1,equipment:{}}}await save(env,a.id,s);await progress(env,a.id,"summon",count);return J({heroes:got,state:s})}
async function daily(env,a){const d=taipeiDate();try{await env.DB.prepare("INSERT INTO daily_claims(player_id,claim_date) VALUES(?,?)").bind(a.id,d).run()}catch{return J({error:"ALREADY_CLAIMED",message:"ALREADY_CLAIMED"},409)}const s=await stateOf(env,a.id),r={gold:500,gems:80,energy:10};apply(s,r);s.dailyClaimed=d;await save(env,a.id,s);return J({reward:r,state:s})}
async function battleStart(req,env,a){const {stageId}=await req.json(),cfg=STAGES[stageId],s=await stateOf(env,a.id);if(!cfg||stageId>s.stageUnlocked)return J({error:"STAGE_LOCKED"},409);if(s.energy<cfg.energy)return J({error:"ENERGY_NOT_ENOUGH",message:"ENERGY_NOT_ENOUGH"},409);s.energy-=cfg.energy;await save(env,a.id,s);const id=crypto.randomUUID(),exp=new Date(Date.now()+20*60000).toISOString();await env.DB.prepare("INSERT INTO battle_tickets(id,player_id,stage_id,expires_at)VALUES(?,?,?,?)").bind(id,a.id,stageId,exp).run();return J({ticket:id,state:s})}
async function battleSettle(req,env,a){const {ticket,result}=await req.json();if(!["WIN","LOSE"].includes(result))return J({error:"INVALID_RESULT"},400);const t=await env.DB.prepare("SELECT * FROM battle_tickets WHERE id=? AND player_id=? AND status='OPEN'").bind(ticket,a.id).first();if(!t||new Date(t.expires_at)<new Date())return J({error:"INVALID_TICKET"},409);const s=await stateOf(env,a.id),reward={};if(result==="WIN"){Object.assign(reward,STAGES[t.stage_id]);delete reward.energy;apply(s,reward);for(const id of s.team||[])addXp(s.owned[id],reward.xp||0);if(t.stage_id===s.stageUnlocked&&s.stageUnlocked<10)s.stageUnlocked++;await progress(env,a.id,"battle",1);await progress(env,a.id,"win",1)}await env.DB.batch([env.DB.prepare("UPDATE battle_tickets SET status='SETTLED',result=?,settled_at=CURRENT_TIMESTAMP WHERE id=?").bind(result,ticket),env.DB.prepare("INSERT INTO battle_records(player_id,stage_id,result,reward_json)VALUES(?,?,?,?)").bind(a.id,t.stage_id,result,JSON.stringify(reward))]);await save(env,a.id,s);return J({reward,state:s})}
async function missions(env,a){const date=taipeiDate(),defs=missionDefs();await ensureMissions(env,a.id,date,defs);const rows=(await env.DB.prepare("SELECT * FROM daily_missions WHERE player_id=? AND mission_date=?").bind(a.id,date).all()).results;return J({missions:defs.map(d=>{const r=rows.find(x=>x.mission_id===d.id)||{};return {...d,progress:r.progress||0,claimed:!!r.claimed_at}})})}
async function claimMission(env,a,id){const date=taipeiDate(),def=missionDefs().find(x=>x.id===id);if(!def)return J({error:"NOT_FOUND"},404);await ensureMissions(env,a.id,date,missionDefs());const r=await env.DB.prepare("SELECT * FROM daily_missions WHERE player_id=? AND mission_date=? AND mission_id=?").bind(a.id,date,id).first();if(!r||r.progress<def.target||r.claimed_at)return J({error:"NOT_CLAIMABLE"},409);const s=await stateOf(env,a.id);apply(s,def.reward);await env.DB.prepare("UPDATE daily_missions SET claimed_at=CURRENT_TIMESTAMP WHERE player_id=? AND mission_date=? AND mission_id=?").bind(a.id,date,id).run();await save(env,a.id,s);return J({state:s,reward:def.reward})}
async function mailList(env,a){const rows=(await env.DB.prepare("SELECT * FROM player_mail WHERE player_id=? AND (expires_at IS NULL OR expires_at>CURRENT_TIMESTAMP) ORDER BY created_at DESC LIMIT 50").bind(a.id).all()).results;return J({mails:rows.map(x=>({...x,reward:parse(x.reward_json,{})}))})}
async function claimMail(env,a,id){const m=await env.DB.prepare("SELECT * FROM player_mail WHERE id=? AND player_id=? AND claimed_at IS NULL").bind(id,a.id).first();if(!m)return J({error:"NOT_CLAIMABLE"},409);const s=await stateOf(env,a.id),reward=parse(m.reward_json,{});apply(s,reward);await env.DB.prepare("UPDATE player_mail SET claimed_at=CURRENT_TIMESTAMP WHERE id=?").bind(id).run();await save(env,a.id,s);return J({state:s,reward})}

function arenaTier(rating){
  if(rating>=2200)return "傳奇";if(rating>=1900)return "星耀";if(rating>=1600)return "鑽石";if(rating>=1400)return "白金";if(rating>=1200)return "黃金";if(rating>=1050)return "白銀";return rating>=950?"青銅 I":rating>=850?"青銅 II":"青銅 III";
}
const ARENA_HERO_BASE={
 aria:{hp:1500,atk:235,def:95,spd:108,crit:.18,role:"DPS"},
 mira:{hp:1180,atk:255,def:70,spd:102,crit:.14,role:"DPS"},
 gorn:{hp:2100,atk:125,def:180,spd:82,crit:.06,role:"TANK"},
 luna:{hp:1420,atk:165,def:95,spd:105,crit:.10,role:"HEAL"},
 kael:{hp:1220,atk:285,def:72,spd:120,crit:.30,role:"DPS"},
 elwyn:{hp:1300,atk:220,def:82,spd:112,crit:.20,role:"DPS"},
 sol:{hp:1850,atk:220,def:135,spd:96,crit:.12,role:"BRUISER"},
 nyx:{hp:1280,atk:270,def:75,spd:110,crit:.25,role:"DPS"}
};
function arenaUnitStats(s,id){
 const h=s.owned?.[id]||{level:1,rank:1,skillLevel:1,equipment:{}},b=ARENA_HERO_BASE[id]||ARENA_HERO_BASE.aria;
 const lv=Math.max(1,Number(h.level||1)),rank=Math.max(1,Number(h.rank||1)),skill=Math.max(1,Number(h.skillLevel||1));
 let equipLv=0,refine=0;for(const eq of Object.values(h.equipment||{})){if(!eq)continue;const m=s.equipmentMeta?.[eq]||{};equipLv+=Number(m.level||0);refine+=Number(m.refine||0)}
 const mult=1+(lv-1)*.075+(rank-1)*.16+equipLv*.025+refine*.06;
 return{id,name:id,maxHp:Math.round(b.hp*mult),hp:Math.round(b.hp*mult),atk:Math.round(b.atk*mult*(1+(skill-1)*.025)),def:Math.round(b.def*mult),spd:Math.round(b.spd+(lv-1)*.25+rank*2),crit:Math.min(.65,b.crit+(skill-1)*.01+refine*.015),role:b.role,level:lv,rank,skill};
}
function arenaPower(s,team){return (team||[]).reduce((t,id)=>{const u=arenaUnitStats(s,id);return t+Math.round(u.maxHp*.34+u.atk*4.1+u.def*3.2+u.spd*2)},0)}
function seededRandom(seed){let h=2166136261;for(const c of seed)h=Math.imul(h^c.charCodeAt(0),16777619);return()=>{h+=0x6D2B79F5;let t=h;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function aliveUnits(team){return team.filter(x=>x.hp>0)}
function chooseTarget(units,strategy,rng){const alive=aliveUnits(units);if(!alive.length)return null;if(strategy==="FOCUS")return [...alive].sort((a,b)=>a.hp-b.hp)[0];if(strategy==="HEAL")return [...alive].sort((a,b)=>b.atk-a.atk)[0];return alive[Math.floor(rng()*alive.length)]}
function simulateArenaBattle(myState,myTeamIds,enemyState,enemyTeamIds,myStrategy,enemyStrategy,seed){
 const rng=seededRandom(seed),A=myTeamIds.map(id=>arenaUnitStats(myState,id)),D=enemyTeamIds.map(id=>arenaUnitStats(enemyState,id));
 const turns=[];let round=0;
 while(aliveUnits(A).length&&aliveUnits(D).length&&round<60){round++;const order=[...aliveUnits(A).map(u=>({u,side:"ATTACKER"})),...aliveUnits(D).map(u=>({u,side:"DEFENDER"}))].sort((x,y)=>y.u.spd-x.u.spd+(rng()-.5)*8);
  for(const entry of order){const actor=entry.u;if(actor.hp<=0)continue;const allies=entry.side==="ATTACKER"?A:D,enemies=entry.side==="ATTACKER"?D:A,strategy=entry.side==="ATTACKER"?myStrategy:enemyStrategy;
   if(!aliveUnits(enemies).length)break;
   const low=[...aliveUnits(allies)].sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp)[0];
   const canHeal=(actor.role==="HEAL"||strategy==="HEAL")&&low&&low.hp/low.maxHp<.62&&rng()<.58;
   if(canHeal){const before=low.hp,amount=Math.round(actor.atk*(1.1+actor.skill*.04));low.hp=Math.min(low.maxHp,low.hp+amount);turns.push({round,side:entry.side,actor:actor.id,target:low.id,action:"HEAL",value:low.hp-before,targetHp:low.hp,targetMaxHp:low.maxHp,critical:false});continue}
   const target=chooseTarget(enemies,strategy,rng);if(!target)break;const crit=rng()<actor.crit;const variance=.92+rng()*.16;const raw=actor.atk*(crit?1.75:1)*variance;const dmg=Math.max(1,Math.round(raw*100/(100+target.def)));target.hp=Math.max(0,target.hp-dmg);
   turns.push({round,side:entry.side,actor:actor.id,target:target.id,action:strategy==="FOCUS"?"FOCUS_ATTACK":"ATTACK",value:dmg,targetHp:target.hp,targetMaxHp:target.maxHp,critical:crit,defeated:target.hp<=0});
  }
 }
 const win=aliveUnits(A).length>0&&aliveUnits(D).length===0;turns.push({round:round+1,side:"SYSTEM",action:"RESULT",result:win?"WIN":"LOSE",attackerRemaining:aliveUnits(A).length,defenderRemaining:aliveUnits(D).length});
 return{win,turns,attackerPower:arenaPower(myState,myTeamIds),defenderPower:arenaPower(enemyState,enemyTeamIds)};
}
function arenaSeasonKey(){const d=new Date(),y=d.getUTCFullYear(),m=String(d.getUTCMonth()+1).padStart(2,"0");return `${y}-${m}`}
function arenaWeekKey(){const d=new Date(),first=new Date(Date.UTC(d.getUTCFullYear(),0,1)),days=Math.floor((d-first)/86400000),week=Math.ceil((days+first.getUTCDay()+1)/7);return `${d.getUTCFullYear()}-W${String(week).padStart(2,"0")}`}
async function ensureArenaProfile(env,a,s){
  let p=await env.DB.prepare("SELECT * FROM arena_profiles WHERE player_id=?").bind(a.id).first();
  if(!p){const code="SR-"+String(a.id).replace(/-/g,"").slice(0,8).toUpperCase();await env.DB.prepare("INSERT INTO arena_profiles(player_id,defense_team_json,season_key,friend_code)VALUES(?,?,?,?)").bind(a.id,JSON.stringify((s.team||[]).slice(0,3)),arenaSeasonKey(),code).run();p=await env.DB.prepare("SELECT * FROM arena_profiles WHERE player_id=?").bind(a.id).first()}
  if(!p.friend_code){const code="SR-"+String(a.id).replace(/-/g,"").slice(0,8).toUpperCase();await env.DB.prepare("UPDATE arena_profiles SET friend_code=? WHERE player_id=?").bind(code,a.id).run();p.friend_code=code}
  if(p.season_key!==arenaSeasonKey()){
    await env.DB.prepare("UPDATE arena_profiles SET rating=1000,wins=0,losses=0,current_streak=0,season_key=?,season_high_rating=1000,updated_at=CURRENT_TIMESTAMP WHERE player_id=?").bind(arenaSeasonKey(),a.id).run();
    p=await env.DB.prepare("SELECT * FROM arena_profiles WHERE player_id=?").bind(a.id).first();
  }
  return p;
}
function arenaProfileJson(p){const wins=Number(p.wins||0),losses=Number(p.losses||0),total=wins+losses;return{rating:Number(p.rating||1000),tier:arenaTier(Number(p.rating||1000)),arenaCoins:Number(p.arena_coins||0),wins,losses,winRate:total?Math.round(wins*1000/total)/10:0,defenseTeam:parse(p.defense_team_json,[]),defenseStrategy:p.defense_strategy||"BALANCED",highestRating:Number(p.highest_rating||p.rating||1000),highestTier:arenaTier(Number(p.highest_rating||p.rating||1000)),currentStreak:Number(p.current_streak||0),bestStreak:Number(p.best_streak||0),seasonKey:p.season_key||arenaSeasonKey(),friendCode:p.friend_code||""}}
function arenaStrategyLabel(v){return({BALANCED:"均衡",FOCUS:"優先集火",HEAL:"優先治療"})[v]||"均衡"}
function arenaRewardDefs(){return{daily:{target:3,reward:{arenaCoins:80,gems:30}},weekly:{target:10,reward:{arenaCoins:300,gems:120}},season:{target:1,reward:{arenaCoins:500,gems:200}}}}
async function arenaRewardState(env,a,p){
  const date=taipeiDate(),week=arenaWeekKey(),season=arenaSeasonKey();
  const dailyBattles=Number((await env.DB.prepare("SELECT COUNT(*) c FROM arena_battles WHERE player_id=? AND date(created_at)=?").bind(a.id,date).first())?.c||0);
  const weeklyBattles=Number((await env.DB.prepare("SELECT COUNT(*) c FROM arena_battles WHERE player_id=? AND created_at>=datetime('now','-7 days')").bind(a.id).first())?.c||0);
  const claims=(await env.DB.prepare("SELECT reward_type,period_key FROM arena_reward_claims WHERE player_id=?").bind(a.id).all()).results;
  const claimed=(type,key)=>claims.some(x=>x.reward_type===type&&x.period_key===key),defs=arenaRewardDefs();
  return{daily:{progress:dailyBattles,target:defs.daily.target,claimed:claimed('daily',date),reward:defs.daily.reward},weekly:{progress:weeklyBattles,target:defs.weekly.target,claimed:claimed('weekly',week),reward:defs.weekly.reward},season:{progress:1,target:1,claimed:claimed('season',season),reward:{arenaCoins:defs.season.reward.arenaCoins+Math.max(0,Math.floor((Number(p.rating||1000)-1000)/100))*50,gems:defs.season.reward.gems}}};
}
async function arenaPickOpponents(env,a,p,s){
  const myPower=arenaPower(s,(s.team||[]).slice(0,3));
  const candidates=(await env.DB.prepare(`SELECT p.id,p.display_name,ap.rating,ap.defense_team_json,ap.defense_strategy,gs.state_json
    FROM players p JOIN arena_profiles ap ON ap.player_id=p.id JOIN game_saves gs ON gs.player_id=p.id
    WHERE p.id<>? ORDER BY (ABS(ap.rating-?)*4 + ABS(p.stage_unlocked-?)*100) ASC,RANDOM() LIMIT 12`).bind(a.id,p.rating||1000,s.stageUnlocked||1).all()).results;
  return candidates.map(x=>{const os=parse(x.state_json,structuredClone(DEFAULT_STATE)),team=parse(x.defense_team_json,os.team||[]),power=arenaPower(os,team);return{id:x.id,displayName:x.display_name,rating:Number(x.rating||1000),tier:arenaTier(Number(x.rating||1000)),team,power,strategy:x.defense_strategy||"BALANCED",strategyLabel:arenaStrategyLabel(x.defense_strategy),matchScore:Math.abs(power-myPower)+Math.abs(Number(x.rating||1000)-Number(p.rating||1000))*3}}).sort((x,y)=>x.matchScore-y.matchScore).slice(0,3);
}
async function arenaStatus(req,env,a){
  const s=await stateOf(env,a.id),p=await ensureArenaProfile(env,a,s),date=taipeiDate();
  const used=Number((await env.DB.prepare("SELECT used_count FROM arena_daily_attempts WHERE player_id=? AND attempt_date=?").bind(a.id,date).first())?.used_count||0);
  let opponents=parse(p.opponent_ids_json,[]),rows=[];
  if(opponents.length){const qs=opponents.map(()=>'?').join(',');rows=(await env.DB.prepare(`SELECT p.id,p.display_name,ap.rating,ap.defense_team_json,ap.defense_strategy,gs.state_json FROM players p JOIN arena_profiles ap ON ap.player_id=p.id JOIN game_saves gs ON gs.player_id=p.id WHERE p.id IN (${qs})`).bind(...opponents).all()).results}
  if(rows.length<1){const picked=await arenaPickOpponents(env,a,p,s);opponents=picked.map(x=>x.id);await env.DB.prepare("UPDATE arena_profiles SET opponent_ids_json=?,next_free_refresh_at=datetime(CURRENT_TIMESTAMP,'+30 minutes') WHERE player_id=?").bind(JSON.stringify(opponents),a.id).run();rows=picked.map(x=>({...x,state_json:null,defense_team_json:JSON.stringify(x.team),defense_strategy:x.strategy}))}
  const list=rows.map(x=>{if(x.matchScore!==undefined)return x;const os=parse(x.state_json,structuredClone(DEFAULT_STATE)),team=parse(x.defense_team_json,os.team||[]);return{id:x.id,displayName:x.display_name,rating:Number(x.rating||1000),tier:arenaTier(Number(x.rating||1000)),team,power:arenaPower(os,team),strategy:x.defense_strategy||"BALANCED",strategyLabel:arenaStrategyLabel(x.defense_strategy)}});
  const logs=(await env.DB.prepare(`SELECT b.battle_key,b.result,b.rating_delta,b.created_at,b.player_id,b.opponent_id,b.battle_type,
      CASE WHEN b.player_id=? THEN op.display_name ELSE atk.display_name END opponent_name
    FROM arena_battles b LEFT JOIN players op ON op.id=b.opponent_id LEFT JOIN players atk ON atk.id=b.player_id WHERE b.player_id=? OR b.opponent_id=? ORDER BY b.id DESC LIMIT 20`).bind(a.id,a.id,a.id).all()).results;
  const friends=(await env.DB.prepare(`SELECT p.id,p.display_name,ap.friend_code FROM arena_friendships f JOIN players p ON p.id=f.friend_player_id LEFT JOIN arena_profiles ap ON ap.player_id=p.id WHERE f.player_id=? ORDER BY p.display_name LIMIT 50`).bind(a.id).all()).results;
  const rewards=await arenaRewardState(env,a,p);
  return J({profile:arenaProfileJson(p),remaining:Math.max(0,5-used),opponents:list,logs:logs.map(x=>({id:x.battle_key||String(x.id),result:x.opponent_id===a.id?(x.result==="WIN"?"LOSE":"WIN"):x.result,ratingDelta:x.opponent_id===a.id?-Number(x.rating_delta||0):Number(x.rating_delta||0),createdAt:x.created_at,opponentName:x.opponent_name||"未知玩家",battleType:x.battle_type||"RANKED",wasDefense:x.opponent_id===a.id})),friends,rewards,nextFreeRefreshAt:p.next_free_refresh_at||null,refreshGemCost:20})
}
async function arenaDefense(req,env,a){
  const b=await req.json(),s=await stateOf(env,a.id),team=Array.isArray(b.team)?b.team.filter(id=>s.owned?.[id]).slice(0,3):[],strategy=["BALANCED","FOCUS","HEAL"].includes(b.strategy)?b.strategy:"BALANCED";
  if(team.length<1)return J({error:"ARENA_TEAM_REQUIRED"},400);await ensureArenaProfile(env,a,s);
  await env.DB.prepare("UPDATE arena_profiles SET defense_team_json=?,defense_strategy=?,updated_at=CURRENT_TIMESTAMP WHERE player_id=?").bind(JSON.stringify(team),strategy,a.id).run();
  const p=await env.DB.prepare("SELECT * FROM arena_profiles WHERE player_id=?").bind(a.id).first();return J({ok:true,profile:arenaProfileJson(p)})
}
async function arenaRefresh(req,env,a){
  const b=await req.json().catch(()=>({})),s=await stateOf(env,a.id),p=await ensureArenaProfile(env,a,s),freeAt=p.next_free_refresh_at?new Date(p.next_free_refresh_at):new Date(0),free=Date.now()>=freeAt.getTime();
  if(!free){if(!b.useGems)return J({error:"ARENA_REFRESH_COOLDOWN",nextFreeRefreshAt:p.next_free_refresh_at,gemCost:20},409);if(s.gems<20)return J({error:"GEMS_NOT_ENOUGH"},409);s.gems-=20;await save(env,a.id,s)}
  const picked=await arenaPickOpponents(env,a,p,s);await env.DB.prepare("UPDATE arena_profiles SET opponent_ids_json=?,next_free_refresh_at=datetime(CURRENT_TIMESTAMP,'+30 minutes'),updated_at=CURRENT_TIMESTAMP WHERE player_id=?").bind(JSON.stringify(picked.map(x=>x.id)),a.id).run();return J({opponents:picked,nextFreeRefreshAt:new Date(Date.now()+1800000).toISOString(),state:s,paid:!free})
}
function arenaReplayTurns(myTeam,enemyTeam,myPower,enemyPower,myStrategy,enemyStrategy,win){
  const turns=[],rounds=6;for(let i=0;i<rounds;i++){const mine=i%2===0,team=mine?myTeam:enemyTeam,target=mine?enemyTeam:myTeam,actor=team[i%Math.max(1,team.length)]||"aria",victim=target[(i+1)%Math.max(1,target.length)]||"gorn",base=Math.round((mine?myPower:enemyPower)/Math.max(1,team.length)/8),strategy=mine?myStrategy:enemyStrategy;turns.push({round:i+1,side:mine?"ATTACKER":"DEFENDER",actor,target:victim,action:strategy==="HEAL"&&i%3===1?"HEAL":strategy==="FOCUS"?"FOCUS_ATTACK":"ATTACK",value:strategy==="HEAL"&&i%3===1?Math.round(base*.55):Math.round(base*(.85+Math.random()*.3))})}turns.push({round:rounds+1,side:"SYSTEM",action:"RESULT",result:win?"WIN":"LOSE"});return turns;
}
async function arenaChallenge(req,env,a){
 const {opponentId}=await req.json();if(!opponentId||opponentId===a.id)return J({error:"INVALID_OPPONENT"},400);
 const date=taipeiDate(),s=await stateOf(env,a.id),p=await ensureArenaProfile(env,a,s),daily=await env.DB.prepare("SELECT used_count FROM arena_daily_attempts WHERE player_id=? AND attempt_date=?").bind(a.id,date).first();
 if(Number(daily?.used_count||0)>=5)return J({error:"ARENA_DAILY_LIMIT",message:"ARENA_DAILY_LIMIT"},409);
 const o=await env.DB.prepare(`SELECT p.display_name,ap.rating,ap.defense_team_json,ap.defense_strategy,gs.state_json FROM players p JOIN arena_profiles ap ON ap.player_id=p.id JOIN game_saves gs ON gs.player_id=p.id WHERE p.id=?`).bind(opponentId).first();if(!o)return J({error:"OPPONENT_NOT_FOUND"},404);
 const os=parse(o.state_json,structuredClone(DEFAULT_STATE)),myTeam=(s.team||[]).filter(id=>s.owned?.[id]).slice(0,3),enemyTeam=parse(o.defense_team_json,os.team||[]).filter(id=>os.owned?.[id]).slice(0,3),myStrategy="BALANCED",enemyStrategy=o.defense_strategy||"BALANCED";
 const battleId=crypto.randomUUID(),sim=simulateArenaBattle(s,myTeam,os,enemyTeam,myStrategy,enemyStrategy,battleId),win=sim.win,result=win?"WIN":"LOSE",ratingDelta=win?25:-15,coins=win?30:10,newRating=Math.max(0,Number(p.rating||1000)+ratingDelta),streak=win?Number(p.current_streak||0)+1:0,high=Math.max(Number(p.highest_rating||1000),newRating),seasonHigh=Math.max(Number(p.season_high_rating||1000),newRating);
 const opponentNewRating=Math.max(0,Number(o.rating||1000)-ratingDelta),opponentStreak=win?0:1;
 await env.DB.batch([
  env.DB.prepare(`INSERT INTO arena_daily_attempts(player_id,attempt_date,used_count)VALUES(?,?,1) ON CONFLICT(player_id,attempt_date) DO UPDATE SET used_count=used_count+1`).bind(a.id,date),
  env.DB.prepare("UPDATE arena_profiles SET rating=?,arena_coins=arena_coins+?,wins=wins+?,losses=losses+?,current_streak=?,best_streak=MAX(best_streak,?),highest_rating=?,season_high_rating=?,updated_at=CURRENT_TIMESTAMP WHERE player_id=?").bind(newRating,coins,win?1:0,win?0:1,streak,streak,high,seasonHigh,a.id),
  env.DB.prepare("UPDATE arena_profiles SET rating=?,wins=wins+?,losses=losses+?,current_streak=?,best_streak=MAX(best_streak,?),highest_rating=MAX(highest_rating,?),season_high_rating=MAX(season_high_rating,?),updated_at=CURRENT_TIMESTAMP WHERE player_id=?").bind(opponentNewRating,win?0:1,win?1:0,opponentStreak,opponentStreak,opponentNewRating,opponentNewRating,opponentId),
  env.DB.prepare("INSERT INTO arena_battles(battle_key,player_id,opponent_id,result,rating_delta,player_power,opponent_power,reward_json,replay_json,battle_type)VALUES(?,?,?,?,?,?,?,?,?,?)").bind(battleId,a.id,opponentId,result,ratingDelta,sim.attackerPower,sim.defenderPower,JSON.stringify({arenaCoins:coins}),JSON.stringify(sim.turns),"RANKED")
 ]);return J({battleId,result,ratingDelta,arenaCoinsEarned:coins,playerPower:sim.attackerPower,opponentPower:sim.defenderPower,state:s,replay:sim.turns})
}
async function arenaSpar(req,env,a){const {targetPlayerId}=await req.json();if(!targetPlayerId||targetPlayerId===a.id)return J({error:"INVALID_OPPONENT"},400);const s=await stateOf(env,a.id),o=await env.DB.prepare(`SELECT p.display_name,ap.defense_team_json,ap.defense_strategy,gs.state_json FROM players p JOIN arena_profiles ap ON ap.player_id=p.id JOIN game_saves gs ON gs.player_id=p.id WHERE p.id=?`).bind(targetPlayerId).first();if(!o)return J({error:"OPPONENT_NOT_FOUND"},404);const os=parse(o.state_json,structuredClone(DEFAULT_STATE)),myTeam=(s.team||[]).filter(id=>s.owned?.[id]).slice(0,3),enemyTeam=parse(o.defense_team_json,os.team||[]).filter(id=>os.owned?.[id]).slice(0,3),id=crypto.randomUUID(),sim=simulateArenaBattle(s,myTeam,os,enemyTeam,"BALANCED",o.defense_strategy||"BALANCED",id),result=sim.win?"WIN":"LOSE";await env.DB.prepare("INSERT INTO arena_battles(battle_key,player_id,opponent_id,result,rating_delta,player_power,opponent_power,reward_json,replay_json,battle_type)VALUES(?,?,?,?,0,?,?,?,?,'SPAR')").bind(id,a.id,targetPlayerId,result,sim.attackerPower,sim.defenderPower,"{}",JSON.stringify(sim.turns)).run();return J({battleId:id,result,playerPower:sim.attackerPower,opponentPower:sim.defenderPower,replay:sim.turns})}
async function arenaFriendSearch(req,env,a){const q=String(new URL(req.url).searchParams.get("q")||"").trim();if(q.length<1)return J({rows:[]});const like=`%${q}%`;const rows=(await env.DB.prepare(`SELECT p.id,p.display_name,p.picture_url,ap.friend_code,ap.rating,ap.wins,ap.losses FROM players p LEFT JOIN arena_profiles ap ON ap.player_id=p.id WHERE p.id<>? AND (UPPER(COALESCE(ap.friend_code,''))=UPPER(?) OR p.display_name LIKE ?) ORDER BY CASE WHEN UPPER(COALESCE(ap.friend_code,''))=UPPER(?) THEN 0 ELSE 1 END,p.display_name LIMIT 10`).bind(a.id,q,like,q).all()).results;return J({rows:rows.map(x=>({id:x.id,displayName:x.display_name,pictureUrl:x.picture_url||"",friendCode:x.friend_code||"",rating:Number(x.rating||1000),tier:arenaTier(Number(x.rating||1000)),wins:Number(x.wins||0),losses:Number(x.losses||0)}))})}
async function arenaAddFriend(req,env,a){const b=await req.json(),input=String(b.friendCode||b.friendPlayerId||"").trim();if(!input)return J({error:"INVALID_FRIEND"},400);let friend=await env.DB.prepare("SELECT p.id,p.display_name FROM players p LEFT JOIN arena_profiles ap ON ap.player_id=p.id WHERE UPPER(ap.friend_code)=UPPER(?) OR p.id=?").bind(input,input).first();if(!friend)return J({error:"PLAYER_NOT_FOUND"},404);if(friend.id===a.id)return J({error:"INVALID_FRIEND"},400);await env.DB.batch([env.DB.prepare("INSERT OR IGNORE INTO arena_friendships(player_id,friend_player_id)VALUES(?,?)").bind(a.id,friend.id),env.DB.prepare("INSERT OR IGNORE INTO arena_friendships(player_id,friend_player_id)VALUES(?,?)").bind(friend.id,a.id)]);return J({ok:true,friend})}
async function arenaLeaderboard(req,env,a){const scope=new URL(req.url).searchParams.get('scope')||'global';let sql=`SELECT p.id,p.display_name,ap.rating,ap.wins,ap.losses,ap.highest_rating FROM arena_profiles ap JOIN players p ON p.id=ap.player_id`,bind=[];if(scope==='friends'){sql+=` WHERE p.id IN (SELECT friend_player_id FROM arena_friendships WHERE player_id=?)`;bind=[a.id]}else if(scope==='guild'){const me=await env.DB.prepare("SELECT guild_id FROM arena_profiles WHERE player_id=?").bind(a.id).first();if(!me?.guild_id)return J({scope,rows:[],message:"尚未加入公會"});sql+=` WHERE ap.guild_id=?`;bind=[me.guild_id]}sql+=` ORDER BY ap.rating DESC,ap.wins DESC LIMIT 100`;const rows=(await env.DB.prepare(sql).bind(...bind).all()).results;return J({scope,rows:rows.map((x,i)=>({rank:i+1,id:x.id,displayName:x.display_name,rating:Number(x.rating||1000),tier:arenaTier(Number(x.rating||1000)),wins:Number(x.wins||0),losses:Number(x.losses||0),highestTier:arenaTier(Number(x.highest_rating||x.rating||1000)),isMe:x.id===a.id}))})}
async function arenaReplay(env,a,id){const b=await env.DB.prepare("SELECT * FROM arena_battles WHERE (battle_key=? OR CAST(id AS TEXT)=?) AND (player_id=? OR opponent_id=?)").bind(id,id,a.id,a.id).first();if(!b)return J({error:"NOT_FOUND"},404);return J({id:b.battle_key||String(b.id),result:b.result,battleType:b.battle_type||"RANKED",replay:parse(b.replay_json,[])})}
async function arenaClaimReward(req,env,a){const {type}=await req.json(),s=await stateOf(env,a.id),p=await ensureArenaProfile(env,a,s),states=await arenaRewardState(env,a,p),r=states[type];if(!r)return J({error:"INVALID_REWARD"},400);if(r.claimed||r.progress<r.target)return J({error:"NOT_CLAIMABLE"},409);const key=type==='daily'?taipeiDate():type==='weekly'?arenaWeekKey():arenaSeasonKey();await env.DB.prepare("INSERT INTO arena_reward_claims(player_id,reward_type,period_key,reward_json)VALUES(?,?,?,?)").bind(a.id,type,key,JSON.stringify(r.reward)).run();if(r.reward.gems)s.gems+=r.reward.gems;await save(env,a.id,s);await env.DB.prepare("UPDATE arena_profiles SET arena_coins=arena_coins+? WHERE player_id=?").bind(Number(r.reward.arenaCoins||0),a.id).run();return J({ok:true,reward:r.reward,state:s})}

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
 const result={ok:true,version:"1.8.2",origin:new URL(req.url).origin,checks:{lineChannelId:!!env.LINE_CHANNEL_ID,lineChannelSecret:!!env.LINE_CHANNEL_SECRET,d1Binding:!!env.DB,oauthStatesTable:false}};
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
