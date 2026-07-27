const HEROES = [
  {id:"aria",imageUrl:"/assets/heroes/aria.svg",name:"烈焰劍士・亞莉雅",emoji:"⚔️",element:"火",rarity:"稀有",baseHp:520,baseAtk:88,skill:"烈焰斬",skillEmoji:"🔥",skillDesc:"造成 135% 傷害，並有機會形成暴擊。",c1:"#b8402b",c2:"#ffb34c"},
  {id:"mira",imageUrl:"/assets/heroes/mira.svg",name:"冰霜法師・米菈",emoji:"🧙‍♀️",element:"水",rarity:"史詩",baseHp:390,baseAtk:118,skill:"寒冰爆裂",skillEmoji:"❄️",skillDesc:"造成 150% 魔法傷害。",c1:"#2465a8",c2:"#70dcff"},
  {id:"gorn",imageUrl:"/assets/heroes/gorn.svg",name:"鋼鐵守衛・戈恩",emoji:"🛡️",element:"土",rarity:"稀有",baseHp:760,baseAtk:62,skill:"盾牌猛擊",skillEmoji:"💥",skillDesc:"造成傷害並以高生命值保護隊友。",c1:"#4d566d",c2:"#aab4cb"},
  {id:"luna",imageUrl:"/assets/heroes/luna.svg",name:"月光祭司・露娜",emoji:"🌙",element:"光",rarity:"史詩",baseHp:470,baseAtk:92,skill:"月華治癒",skillEmoji:"🌟",skillDesc:"攻擊時有 35% 機率治療生命最低的隊友。",c1:"#634fb5",c2:"#d6beff"},
  {id:"kael",imageUrl:"/assets/heroes/kael.svg",name:"暗影刺客・凱爾",emoji:"🥷",element:"暗",rarity:"傳說",baseHp:410,baseAtk:145,skill:"影襲",skillEmoji:"🌑",skillDesc:"高暴擊率的單體突襲。",c1:"#211c45",c2:"#a050d8"},
  {id:"elwyn",imageUrl:"/assets/heroes/elwyn.svg",name:"森林弓手・艾爾雯",emoji:"🏹",element:"木",rarity:"稀有",baseHp:430,baseAtk:104,skill:"穿風箭",skillEmoji:"🍃",skillDesc:"精準遠程攻擊，傷害波動較小。",c1:"#21784d",c2:"#94d65c"},
  {id:"sol",imageUrl:"/assets/heroes/sol.svg",name:"聖光騎士・索爾",emoji:"✨",element:"光",rarity:"傳說",baseHp:650,baseAtk:120,skill:"神聖審判",skillEmoji:"☀️",skillDesc:"造成 160% 神聖傷害。",c1:"#aa7b20",c2:"#fff0a0"},
  {id:"nyx",imageUrl:"/assets/heroes/nyx.svg",name:"夜語術士・妮克絲",emoji:"🔮",element:"暗",rarity:"史詩",baseHp:420,baseAtk:128,skill:"虛空侵蝕",skillEmoji:"🌀",skillDesc:"造成 145% 傷害並強化暴擊。",c1:"#4b1c6e",c2:"#d84cff"}
];
const EQUIPMENT={
  sword:{name:"星鐵長劍",emoji:"🗡️",slot:"weapon",atk:22,hp:0},
  staff:{name:"月光法杖",emoji:"🪄",slot:"weapon",atk:28,hp:0},
  armor:{name:"守衛胸甲",emoji:"🥋",slot:"armor",atk:0,hp:120},
  cloak:{name:"暗影斗篷",emoji:"🧥",slot:"armor",atk:8,hp:70},
  ring:{name:"裂縫戒指",emoji:"💍",slot:"accessory",atk:14,hp:45}
};
const DUNGEONS=[
  {id:"gold",name:"黃金寶庫",icon:"🪙",desc:"每日 3 次，主要獲得大量金幣。",energy:6},
  {id:"material",name:"星界礦坑",icon:"⛏️",desc:"每日 3 次，獲得古木、礦石與藥草。",energy:6}
];
const EVENT_STAGES=[
  {id:"starlight",name:"星光祭典",icon:"🌠",desc:"活動期間挑戰，獲得鑽石與裂縫核心。",energy:8}
];
const SHOP_ITEMS=[
  {id:"energyPotion",imageUrl:"/assets/shop/energyPotion.svg",name:"體力藥水",emoji:"⚡",desc:"在背包使用後恢復 10 點體力。",price:600,kind:"item"},
  {id:"potion",imageUrl:"/assets/shop/potion.svg",name:"治療藥水",emoji:"🧪",desc:"未來戰鬥道具系統使用的恢復藥水。",price:300,kind:"item"},
  {id:"wood",imageUrl:"/assets/shop/wood.svg",name:"古木碎片",emoji:"🪵",desc:"裝備強化與英雄升階素材。",price:180,kind:"material"},
  {id:"ore",imageUrl:"/assets/shop/ore.svg",name:"星鐵礦石",emoji:"⛏️",desc:"鍛造武器所需素材。",price:260,kind:"material"},
  {id:"herb",imageUrl:"/assets/shop/herb.svg",name:"月光藥草",emoji:"🌿",desc:"煉金與補給製作素材。",price:220,kind:"material"},
  {id:"sword",imageUrl:"/assets/shop/sword.svg",name:"星鐵長劍",emoji:"🗡️",desc:"武器：攻擊力 +22。",price:1800,kind:"equipment"},
  {id:"armor",imageUrl:"/assets/shop/armor.svg",name:"守衛胸甲",emoji:"🥋",desc:"防具：生命值 +120。",price:2200,kind:"equipment"}
];
const STAGES=[
{id:1,name:"森林入口",desc:"驅逐盤踞在入口的史萊姆",icon:"🌲",energy:4,enemies:[["史萊姆","🟢",300,42],["史萊姆","🟢",300,42]],reward:{gold:180,xp:25,wood:2}},
{id:2,name:"哥布林哨站",desc:"阻止哥布林偵察隊",icon:"🏕️",energy:5,enemies:[["哥布林","👺",390,55],["哥布林射手","🏹",320,64],["哥布林","👺",390,55]],reward:{gold:260,xp:38,ore:1,equipment:"sword"}},
{id:3,name:"黑霧沼澤",desc:"消滅受到污染的魔物",icon:"🌫️",energy:6,enemies:[["毒液蛙","🐸",480,71],["腐化花妖","🌺",420,82],["毒液蛙","🐸",480,71]],reward:{gold:360,xp:52,herb:2,equipment:"cloak"}},
{id:4,name:"古樹守門者",desc:"首領戰：喚醒沉睡古樹",icon:"🌳",energy:8,boss:true,enemies:[["古樹守門者","🌳",1900,105]],reward:{gold:700,xp:110,gem:80,core:1,equipment:"armor"}},
{id:5,name:"裂縫前哨",desc:"第一章最終決戰",icon:"🌀",energy:10,boss:true,enemies:[["虛空獵犬","🐺",820,95],["裂縫祭司","👁️",1100,120]],reward:{gold:1100,xp:180,gem:150,core:2,equipment:"ring"}},
{id:6,name:"赤焰峽谷",desc:"第二章：穿越灼熱峽谷",icon:"🌋",energy:8,enemies:[["火焰蜥蜴","🦎",980,128],["熔岩精靈","🔥",720,154]],reward:{gold:900,xp:145,ore:3}},
{id:7,name:"盜賊營地",desc:"奪回被搶走的補給",icon:"⛺",energy:9,enemies:[["盜賊斥候","🥷",820,168],["盜賊首領","🗡️",1350,180]],reward:{gold:1250,xp:180,gem:60,equipment:"sword"}},
{id:8,name:"冰封神殿",desc:"解除遠古冰霜封印",icon:"🏛️",energy:10,enemies:[["寒霜守衛","🧊",1500,176],["冰晶法師","❄️",1050,205]],reward:{gold:1500,xp:220,herb:4,equipment:"staff"}},
{id:9,name:"天空之塔",desc:"攀登被雷雲包圍的高塔",icon:"🗼",energy:11,enemies:[["雷翼獸","🦅",1600,225],["塔之守衛","🤖",2100,198]],reward:{gold:1900,xp:275,gem:90,core:2}},
{id:10,name:"星蝕魔龍",desc:"第二章最終首領戰",icon:"🐉",energy:14,boss:true,enemies:[["星蝕魔龍","🐉",6200,285]],reward:{gold:3500,xp:500,gem:300,core:5,equipment:"ring"}}
];
const defaultState={gold:1200,gems:1200,energy:30,maxEnergy:30,stageUnlocked:1,dailyClaimed:"",team:["aria","mira","gorn"],owned:{aria:{level:1,xp:0,copies:1,equipment:{}},mira:{level:1,xp:0,copies:1,equipment:{}},gorn:{level:1,xp:0,copies:1,equipment:{}}},inventory:{wood:0,ore:0,herb:0,core:0,potion:3,equipment:{sword:1,armor:1}},tutorialDone:false,sound:true};
let state=loadState(),currentStage=null,battleTimer=null,speed=1,battleOver=false,players=[],enemies=[],selectedHeroId="aria";
function clone(x){return JSON.parse(JSON.stringify(x))}
function normalizeOwned(owned){Object.values(owned).forEach(o=>{o.level=o.level||1;o.xp=o.xp||0;o.copies=o.copies||1;o.equipment=o.equipment||{}});return owned}
function loadState(){try{const saved=JSON.parse(localStorage.getItem("starRealmRpgSave"));if(!saved)return clone(defaultState);return {...clone(defaultState),...saved,owned:normalizeOwned({...clone(defaultState.owned),...saved.owned}),inventory:{...clone(defaultState.inventory),...saved.inventory,equipment:{...clone(defaultState.inventory.equipment),...(saved.inventory?.equipment||{})}}}}catch{return clone(defaultState)}}
function saveState(){
  localStorage.setItem("starRealmRpgSave",JSON.stringify(state));
  renderAll();
  scheduleCloudSave();
}
const xpNeed=lv=>60+lv*40,upgradeCost=lv=>150*lv,rankCost=rank=>({gold:rank*1200,core:rank}) ;
function equipmentBonus(heroId){const eq=state.owned[heroId]?.equipment||{};return Object.values(eq).reduce((a,id)=>{const e=EQUIPMENT[id];if(e){a.atk+=e.atk;a.hp+=e.hp}return a},{atk:0,hp:0})}
function heroStats(id){const h=HEROES.find(x=>x.id===id),o=state.owned[id],lv=o?.level||1,b=equipmentBonus(id);return {...h,level:lv,hp:Math.round(h.baseHp*(1+(lv-1)*.11))+b.hp,atk:Math.round(h.baseAtk*(1+(lv-1)*.095))+b.atk}}
function applyXp(id,amount){const o=state.owned[id];if(!o)return 0;o.xp+=amount;let levels=0;while(o.xp>=xpNeed(o.level)){o.xp-=xpNeed(o.level);o.level++;levels++}return levels}
function showPage(id){if(id==="missionPage")loadMissions();if(id==="mailPage")loadMailbox();if(id==="rankingPage")loadRanking();if(id==="guildPage")loadAssists();if(id==="eventPage")loadEventCenter();if(id==="announcementPage")renderAnnouncements();document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.go===id));window.scrollTo({top:0,behavior:"smooth"});renderAll()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)showPage(b.dataset.go)});
function stars(r){return r==="傳說"?"★★★★★":r==="史詩"?"★★★★":"★★★"}
function heroCard(h,opt={}){const o=state.owned[h.id],st=heroStats(h.id),sel=state.team.includes(h.id),pct=Math.min(100,(o.xp/xpNeed(o.level))*100),rank=o.rank||1,rc=rankCost(rank);return `<article class="hero-card rarity-${h.rarity} ${opt.selectable&&sel?"selected":""}" ${opt.open?`data-open-hero="${h.id}"`:""}><div class="hero-art" style="--c1:${h.c1};--c2:${h.c2}">${h.imageUrl?`<img src="${escapeHtml(h.imageUrl)}" alt="${escapeHtml(h.name)}">`:`<span>${h.emoji}</span>`}</div><h4>${h.name}</h4><div class="stars">${stars(h.rarity)}</div><span class="rank-badge">突破 ${rank} 階</span><div class="hero-meta"><span>Lv.${st.level}</span><span>戰力 ${st.atk*10+st.hp}</span></div><div class="xp-wrap"><div class="xp-bar"><i style="width:${pct}%"></i></div><div class="xp-label"><span>EXP</span><span>${o.xp}/${xpNeed(o.level)}</span></div></div>${opt.actions?`<div class="hero-actions"><button data-upgrade="${h.id}">升級 🪙 ${upgradeCost(st.level)}</button><button data-rankup="${h.id}" ${rank>=5?"disabled":""}>${rank>=5?"已達最高突破":`突破 🪙 ${rc.gold}・🔮 ${rc.core}`}</button><button data-skill-upgrade="${h.id}">技能 Lv.${o.skillLevel||1} 🪙 ${(o.skillLevel||1)*800}</button></div><div class="growth-note">升級提高基礎能力；突破額外提高 8%；技能升級提高技能倍率。</div>`:""}${opt.selectable?`<div class="hero-actions"><button data-toggle-team="${h.id}">${sel?"移出隊伍":"加入隊伍"}</button></div>`:""}</article>`}
function renderHome(){goldValue.textContent=state.gold;gemValue.textContent=state.gems;energyValue.textContent=`${state.energy}/${state.maxEnergy}`;homeTeam.innerHTML=state.team.map(id=>heroCard(HEROES.find(h=>h.id===id))).join("");soundToggle.textContent=state.sound?"🔊":"🔇"}
function renderHeroes(){heroList.innerHTML=HEROES.filter(h=>state.owned[h.id]).map(h=>heroCard(h,{actions:true,open:true})).join("")||"<p>尚未擁有英雄</p>"}
function renderTeam(){teamEditor.innerHTML=HEROES.filter(h=>state.owned[h.id]).map(h=>heroCard(h,{selectable:true})).join("")}
function renderStages(){stageList.innerHTML=STAGES.map(s=>{const locked=s.id>state.stageUnlocked;return `<article class="stage-card ${locked?"locked":""}"><div class="stage-icon">${s.icon}</div><div class="stage-info"><h3>${s.id}. ${s.name}</h3><p>${s.desc}</p><div class="stage-stars">${s.id<state.stageUnlocked?"★★★":"☆☆☆"}</div></div><button class="${locked?"secondary":"primary"}" ${locked?"disabled":""} data-stage="${s.id}">${locked?"🔒":"挑戰 ⚡"+s.energy}</button></article>`}).join("")}
function renderInventory(){const rows=[["potion","治療藥水","🧪","戰鬥外恢復用途"],["energyPotion","體力藥水","⚡","使用後恢復 10 點體力"],["wood","古木碎片","🪵","用於裝備強化"],["ore","星鐵礦石","⛏️","用於鍛造武器"],["herb","月光藥草","🌿","用於煉金"],["core","裂縫核心","🔮","英雄突破素材"]];const normal=rows.map(([k,n,e,d])=>{const qty=state.inventory[k]||0;return `<div class="inventory-item"><div class="inventory-icon">${e}</div><div><h4>${n}</h4><p>${d}</p></div><div class="inventory-actions"><strong>× ${qty}</strong>${k==="energyPotion"?`<button class="secondary" data-use-item="${k}" ${qty<=0?"disabled":""}>使用</button>`:""}</div></div>`}).join("");const eq=Object.entries(EQUIPMENT).map(([id,e])=>`<div class="inventory-item"><div class="inventory-icon">${e.emoji}</div><div><h4>${e.name}</h4><p>${e.slot==="weapon"?"武器":e.slot==="armor"?"防具":"飾品"}・攻擊 +${e.atk}・生命 +${e.hp}</p></div><strong>× ${state.inventory.equipment[id]||0}</strong></div>`).join("");inventoryList.innerHTML=normal+eq}
function renderShop(){shopList.innerHTML=SHOP_ITEMS.map(x=>{const owned=x.kind==="equipment"?(state.inventory.equipment[x.id]||0):(state.inventory[x.id]||0);return `<article class="shop-card">${x.imageUrl?`<div class="shop-icon"><img src="${escapeHtml(x.imageUrl)}" alt="${escapeHtml(x.name)}" style="max-width:100%;max-height:100%;object-fit:contain"></div>`:`<div class="shop-icon">${x.emoji}</div>`}<h3>${x.name}</h3><p>${x.desc}</p><small>目前持有：${owned}</small><div class="shop-price">🪙 ${x.price}</div><small class="daily-limit">每日限購依伺服器紀錄</small><button class="primary" data-buy-item="${x.id}">購買</button></article>`}).join("")}
function renderHeroDetail(){const h=HEROES.find(x=>x.id===selectedHeroId);if(!h||!state.owned[h.id])return;const st=heroStats(h.id),o=state.owned[h.id],eq=o.equipment||{},slots=[["weapon","武器"],["armor","防具"],["accessory","飾品"]];heroDetail.innerHTML=`<div class="detail-panel"><div class="detail-main"><div class="hero-art" style="--c1:${h.c1};--c2:${h.c2}">${h.imageUrl?`<img src="${escapeHtml(h.imageUrl)}" alt="${escapeHtml(h.name)}">`:`<span>${h.emoji}</span>`}</div><h2>${h.name}</h2><div class="stars">${stars(h.rarity)}　${h.rarity}・${h.element}屬性</div><div class="skill-box"><b>${h.skillEmoji} ${h.skill}</b><p style="margin:8px 0 0;color:var(--muted)">${h.skillDesc}</p></div></div><div><div class="detail-stats"><h3>能力與成長</h3><div class="stat-grid"><div class="stat-box"><small>等級</small><b>Lv.${st.level}</b></div><div class="stat-box"><small>綜合戰力</small><b>${st.atk*10+st.hp}</b></div><div class="stat-box"><small>生命</small><b>${st.hp}</b></div><div class="stat-box"><small>攻擊</small><b>${st.atk}</b></div></div><div class="xp-wrap"><div class="xp-bar"><i style="width:${Math.min(100,o.xp/xpNeed(o.level)*100)}%"></i></div><div class="xp-label"><span>英雄經驗</span><span>${o.xp}/${xpNeed(o.level)}</span></div></div></div><div class="equipment-panel" style="margin-top:14px"><h3>裝備穿戴</h3><div class="equipment-list">${slots.map(([slot,label])=>{const eid=eq[slot],item=eid?EQUIPMENT[eid]:null;return `<div class="equipment-slot"><small>${label}</small><div style="font-size:35px">${item?item.emoji:"＋"}</div><b>${item?item.name:"尚未裝備"}</b><button data-equip-slot="${slot}" data-hero-id="${h.id}">${item?"更換":"選擇裝備"}</button></div>`}).join("")}</div></div></div></div>`}
function renderAll(){renderHome();renderHeroes();renderTeam();renderStages();renderInventory();renderShop();renderHeroDetail();renderEquipmentLab();renderDungeons();renderEventCenter()}
renderAll();
document.addEventListener("click",async e=>{
  const actionable=e.target.closest("[data-upgrade],[data-rankup],[data-skill-upgrade],[data-buy-item],[data-use-item],[data-toggle-team],[data-equip-slot],[data-forge],[data-refine],[data-dismantle],[data-dungeon],[data-event-stage],[data-assist]");
  if(actionable){e.preventDefault();e.stopPropagation()}
  const up=e.target.closest("[data-upgrade]");if(up){await upgradeHero(up.dataset.upgrade);return}
  const rank=e.target.closest("[data-rankup]");if(rank){await rankUpHero(rank.dataset.rankup);return}
  const skill=e.target.closest("[data-skill-upgrade]");if(skill){await upgradeSkill(skill.dataset.skillUpgrade);return}
  const buy=e.target.closest("[data-buy-item]");if(buy){await buyShopItem(buy.dataset.buyItem);return}
  const use=e.target.closest("[data-use-item]");if(use){await useItem(use.dataset.useItem);return}
  const forge=e.target.closest("[data-forge]");if(forge){await enhanceEquipment(forge.dataset.forge);return}
  const refine=e.target.closest("[data-refine]");if(refine){await refineEquipment(refine.dataset.refine);return}
  const dis=e.target.closest("[data-dismantle]");if(dis){await dismantleEquipment(dis.dataset.dismantle);return}
  const dungeon=e.target.closest("[data-dungeon]");if(dungeon){await runDungeon(dungeon.dataset.dungeon);return}
  const ev=e.target.closest("[data-event-stage]");if(ev){await runEventStage(ev.dataset.eventStage);return}
  const assist=e.target.closest("[data-assist]");if(assist){await claimAssist(assist.dataset.assist);return}
  const tog=e.target.closest("[data-toggle-team]");if(tog){const id=tog.dataset.toggleTeam;if(state.team.includes(id)){if(state.team.length<=1)return toast("隊伍至少保留 1 名英雄");state.team=state.team.filter(x=>x!==id)}else{if(state.team.length>=3)return toast("隊伍最多 3 名英雄");state.team.push(id)}saveState();return}
  const eq=e.target.closest("[data-equip-slot]");if(eq){chooseEquipment(eq.dataset.heroId,eq.dataset.equipSlot);return}
  const st=e.target.closest("[data-stage]");if(st){prepareBattle(Number(st.dataset.stage));return}
  const open=e.target.closest("[data-open-hero]");if(open){selectedHeroId=open.dataset.openHero;showPage("heroDetailPage");return}
});
async function upgradeHero(id){
  const o=state.owned[id];if(!o)return;
  if(CloudAccount.user){
    try{const r=await api(`/api/heroes/${id}/upgrade`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();playTone(520);toast(`升級成功，提升至 Lv.${r.level}`)}
    catch(e){toast(e.message==="GOLD_NOT_ENOUGH"?"金幣不足":"升級失敗："+e.message)}
    return;
  }
  const c=upgradeCost(o.level);if(state.gold<c)return toast("金幣不足");state.gold-=c;o.level++;saveState();playTone(520);toast("英雄升級成功！");
}
async function rankUpHero(id){
  const o=state.owned[id];if(!o)return;const rank=o.rank||1;
  if(CloudAccount.user){
    try{const r=await api(`/api/heroes/${id}/rank-up`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();playTone(760);modal("🌟","英雄突破成功",`突破至 ${r.rank} 階，生命與攻擊獲得額外成長。`)}
    catch(e){toast(e.message==="MATERIAL_NOT_ENOUGH"?"金幣或裂縫核心不足":e.message==="MAX_RANK"?"已達最高突破階級":"突破失敗："+e.message)}
    return;
  }
  const c=rankCost(rank);if(rank>=5)return toast("已達最高突破");if(state.gold<c.gold||(state.inventory.core||0)<c.core)return toast("金幣或裂縫核心不足");state.gold-=c.gold;state.inventory.core-=c.core;o.rank=rank+1;saveState();
}
async function buyShopItem(id){
  const item=SHOP_ITEMS.find(x=>x.id===id);if(!item)return;
  if(CloudAccount.user){
    try{const r=await api("/api/shop/buy",{method:"POST",body:JSON.stringify({itemId:id,quantity:1})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();playTone(610);toast(`已購買 ${item.name}`)}
    catch(e){toast(e.message==="GOLD_NOT_ENOUGH"?"金幣不足":"購買失敗："+e.message)}
    return;
  }
  if(state.gold<item.price)return toast("金幣不足");state.gold-=item.price;if(item.kind==="equipment")state.inventory.equipment[id]=(state.inventory.equipment[id]||0)+1;else state.inventory[id]=(state.inventory[id]||0)+1;saveState();toast(`已購買 ${item.name}`);
}
async function useItem(id){
  if(id!=="energyPotion")return;
  if(CloudAccount.user){
    try{const r=await api("/api/items/use",{method:"POST",body:JSON.stringify({itemId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();toast("已恢復 10 點體力")}
    catch(e){toast(e.message==="ITEM_NOT_ENOUGH"?"沒有足夠道具":e.message==="ENERGY_FULL"?"體力已滿":"使用失敗："+e.message)}
    return;
  }
  if((state.inventory[id]||0)<=0)return toast("沒有足夠道具");if(state.energy>=state.maxEnergy)return toast("體力已滿");state.inventory[id]--;state.energy=Math.min(state.maxEnergy,state.energy+10);saveState();
}
function chooseEquipment(heroId,slot){const available=Object.entries(EQUIPMENT).filter(([id,e])=>e.slot===slot&&(state.inventory.equipment[id]||0)>0);if(!available.length)return toast("背包沒有可用的此類裝備");const [newId,item]=available[0],o=state.owned[heroId],old=o.equipment[slot];if(old)state.inventory.equipment[old]=(state.inventory.equipment[old]||0)+1;o.equipment[slot]=newId;state.inventory.equipment[newId]--;saveState();playTone(660);toast(`已裝備 ${item.name}`)}
function prepareBattle(id){currentStage=STAGES.find(s=>s.id===id);if(state.energy<currentStage.energy)return toast("體力不足");battleOver=false;players=[];enemies=[];battleStageLabel.textContent=`STAGE ${currentStage.id}`;battleTitle.textContent=currentStage.name;battleLog.textContent="隊伍已就位，準備開始戰鬥";startBattleButton.classList.remove("hidden");battleContinueButton.classList.add("hidden");renderBattleRows();showPage("battlePage")}
function makePlayerUnits(){return state.team.map(id=>{const h=heroStats(id);return {...h,maxHp:h.hp,currentHp:h.hp,type:"player"}})}
function makeEnemyUnits(){return currentStage.enemies.map((e,i)=>({id:"enemy"+i,name:e[0],emoji:e[1],maxHp:e[2],currentHp:e[2],atk:e[3],c1:"#5e2637",c2:"#a45a45",type:"enemy",skill:"攻擊",skillEmoji:"💢"}))}
function renderBattleRows(){if(!players.length||battleOver){players=makePlayerUnits();enemies=makeEnemyUnits()}const unit=u=>`<div class="battle-unit ${u.currentHp<=0?"dead":""}" id="unit-${u.id}"><div class="battle-avatar" style="--c1:${u.c1};--c2:${u.c2}">${u.emoji}</div><h4>${u.name}</h4><div class="hp"><i style="width:${Math.max(0,u.currentHp/u.maxHp*100)}%"></i></div><div class="hp-label">${Math.max(0,u.currentHp)} / ${u.maxHp}</div></div>`;playerRow.innerHTML=players.map(unit).join("");enemyRow.innerHTML=enemies.map(unit).join("")}
let serverBattleTicket="";
startBattleButton.onclick=async()=>{
  if(CloudAccount.user){
    try{
      const r=await api("/api/battle/start",{method:"POST",body:JSON.stringify({stageId:currentStage.id})});
      state=r.state;serverBattleTicket=r.ticket;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();
    }catch(e){return toast(e.message==="ENERGY_NOT_ENOUGH"?"體力不足":"無法開始戰鬥："+e.message)}
  }else{
    state.energy-=currentStage.energy;saveState();
  }
  startBattleButton.classList.add("hidden");battlePotionButton.classList.remove("hidden");updateBattlePotionButton();runBattle()
};speedButton.onclick=()=>{speed=speed===1?2:1;speedButton.textContent=speed+"×"};leaveBattle.onclick=()=>{clearTimeout(battleTimer);showPage("stagePage")};battleContinueButton.onclick=()=>showPage("stagePage");
function runBattle(){players=makePlayerUnits();enemies=makeEnemyUnits();battleOver=false;renderBattleRows();let turn=0;const tick=()=>{const p=players.filter(x=>x.currentHp>0),en=enemies.filter(x=>x.currentHp>0);if(!p.length||!en.length)return finishBattle(p.length>0);const attackers=turn%2===0?p:en,targets=turn%2===0?en:p,a=attackers[turn%attackers.length],t=targets[Math.floor(Math.random()*targets.length)],crit=Math.random()<(a.id==="kael"?.28:.16),mult=a.type==="player"?1.15:1,damage=Math.round(a.atk*mult*(.84+Math.random()*.32)*(crit?1.65:1));battleLog.textContent=`${a.name} 使用 ${a.skill||"攻擊"}，對 ${t.name} 造成 ${damage}${crit?" 暴擊！":""}`;animateUnit(a.id,"attacking");showSkillFx(a.skillEmoji||"💢");playTone(a.type==="player"?480:180);setTimeout(()=>{t.currentHp-=damage;renderBattleRows();animateUnit(t.id,"hit");floatDamage(t.id,damage,crit);if(a.id==="luna"&&Math.random()<.35){const healTarget=p.sort((x,y)=>x.currentHp/x.maxHp-y.currentHp/y.maxHp)[0];if(healTarget){const heal=Math.round(a.atk*.65);healTarget.currentHp=Math.min(healTarget.maxHp,healTarget.currentHp+heal);battleLog.textContent+=`，並治療 ${healTarget.name} ${heal} 點生命`;renderBattleRows()}}},180/speed);turn++;battleTimer=setTimeout(tick,760/speed)};tick()}
function animateUnit(id,cls){requestAnimationFrame(()=>{const el=document.querySelector("#unit-"+id);if(!el)return;el.classList.add(cls);setTimeout(()=>el.classList.remove(cls),300/speed)})}
function showSkillFx(icon){skillFx.textContent=icon;skillFx.classList.remove("hidden");skillFx.style.animation="none";void skillFx.offsetWidth;skillFx.style.animation="skillBurst .5s ease-out";setTimeout(()=>skillFx.classList.add("hidden"),520/speed)}
function floatDamage(id,dmg,crit){const el=document.querySelector("#unit-"+id);if(!el)return;const r=el.getBoundingClientRect(),d=document.createElement("div");d.className="damage-float";d.textContent=`-${dmg}${crit?"!":""}`;d.style.left=`${r.left+r.width/2}px`;d.style.top=`${r.top+25}px`;d.style.color=crit?"#ffcf5c":"#fff";document.body.appendChild(d);setTimeout(()=>d.remove(),750)}
async function finishBattle(win){
  battleOver=true;clearTimeout(battleTimer);battlePotionButton.classList.add("hidden");battleContinueButton.classList.remove("hidden");
  if(CloudAccount.user){
    try{
      const r=await api("/api/battle/settle",{method:"POST",body:JSON.stringify({ticket:serverBattleTicket,result:win?"WIN":"LOSE"})});
      state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();
      battleLog.textContent=win?`勝利！伺服器已發放 ${r.reward.gold||0} 金幣`:"隊伍戰敗";
      modal(win?"🏆":"💥",win?"戰鬥勝利":"戰鬥失敗",win?`獎勵已由伺服器計算並寫入資料庫：${formatReward(r.reward)}`:"本次沒有獎勵，戰鬥紀錄已保存。");
      playTone(win?760:120);
      return;
    }catch(e){modal("⚠️","結算失敗","伺服器沒有發放獎勵，請返回後重新挑戰。");return}
  }
  if(win){
    const r=currentStage.reward;state.gold+=r.gold;if(r.gem)state.gems+=r.gem;
    ["wood","ore","herb","core"].forEach(k=>{if(r[k])state.inventory[k]=(state.inventory[k]||0)+r[k]});
    state.team.forEach(id=>applyXp(id,r.xp));
    if(currentStage.id===state.stageUnlocked&&state.stageUnlocked<STAGES.length)state.stageUnlocked++;
    saveState();modal("🏆","訪客模式勝利",`獲得 ${r.gold} 金幣與 ${r.xp} 經驗。`);
  }else modal("💥","戰鬥失敗","強化英雄後再次挑戰。");
}
function formatReward(r){return [`${r.gold||0} 金幣`,r.gems?`${r.gems} 鑽石`:"",r.xp?`${r.xp} 經驗`:"",r.energy?`${r.energy} 體力`:""].filter(Boolean).join("、")}
async function summon(count){
  if(CloudAccount.user){
    try{
      const r=await api("/api/summon",{method:"POST",body:JSON.stringify({count})});
      state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();
      summonResult.innerHTML=r.heroes.map(h=>{const x=HEROES.find(v=>v.id===h.id);return `<div class="mini-result"><div>${x?.emoji||"✨"}</div><small>${x?.name||h.id}</small><small style="color:var(--gold)">${h.rarity}</small></div>`}).join("");
      modal("✨","伺服器召喚完成",`鑽石已由伺服器扣除，獲得 ${count} 名英雄。`);playTone(700);
    }catch(e){toast(e.message==="GEMS_NOT_ENOUGH"?"鑽石不足":"召喚失敗："+e.message)}
    return;
  }
  const cost=count===10?900:100;if(state.gems<cost)return toast("鑽石不足");state.gems-=cost;
  const result=[];for(let i=0;i<count;i++){const roll=Math.random(),pool=HEROES.filter(h=>h.rarity===(roll<.05?"傳說":roll<.28?"史詩":"稀有")),h=pool[Math.floor(Math.random()*pool.length)];result.push(h);if(state.owned[h.id])state.owned[h.id].copies++;else state.owned[h.id]={level:1,xp:0,copies:1,equipment:{}}}
  saveState();summonResult.innerHTML=result.map(h=>`<div class="mini-result"><div>${h.emoji}</div><small>${h.name}</small><small>${h.rarity}</small></div>`).join("");
}
summonOne.onclick=()=>summon(1);summonTen.onclick=()=>summon(10);
dailyButton.onclick=async()=>{
  if(!CloudAccount.user){const today=new Date().toLocaleDateString("zh-TW");if(state.dailyClaimed===today)return toast("今天已領取");state.dailyClaimed=today;state.gold+=500;state.gems+=80;state.energy=Math.min(state.maxEnergy,state.energy+10);saveState();return modal("🎁","訪客每日補給","獲得 500 金幣、80 鑽石與 10 體力")}
  try{const r=await api("/api/daily",{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();modal("🎁","每日補給",formatReward(r.reward))}
  catch(e){toast(e.message==="ALREADY_CLAIMED"?"今天已經領取過了":"領取失敗："+e.message)}
};
soundToggle.onclick=()=>{state.sound=!state.sound;saveState();toast(state.sound?"音效已開啟":"音效已關閉")};
function playTone(freq){if(!state.sound)return;try{const ctx=new (window.AudioContext||window.webkitAudioContext)(),osc=ctx.createOscillator(),gain=ctx.createGain();osc.frequency.value=freq;gain.gain.setValueAtTime(.035,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+.13);osc.connect(gain);gain.connect(ctx.destination);osc.start();osc.stop(ctx.currentTime+.14)}catch{}}
function toast(text){toastEl.textContent=text;toastEl.classList.add("show");setTimeout(()=>toastEl.classList.remove("show"),1800)}
const toastEl=document.querySelector("#toast");function modal(icon,title,text){modalIcon.textContent=icon;modalTitle.textContent=title;modalText.textContent=text;document.querySelector("#modal").classList.remove("hidden")}modalClose.onclick=()=>document.querySelector("#modal").classList.add("hidden");
const tutorialSteps=[["🗺️","歡迎來到星界遠征","先從主線冒險挑戰森林關卡，勝利後會解鎖下一關。"],["🛡️","組成三人隊伍","前往英雄名冊培養角色，並在隊伍編成中選擇最多三名英雄。"],["🎒","穿戴冒險裝備","點擊英雄卡片查看詳情；通關可能獲得武器、防具與飾品。"],["✨","召喚新的英雄","使用免費測試鑽石召喚角色。本版本尚未接真實付費。"]];let tutorialIndex=0;
function showTutorial(){if(state.tutorialDone)return;document.querySelector("#tutorial").classList.remove("hidden");renderTutorial()}
function renderTutorial(){const x=tutorialSteps[tutorialIndex];tutorialStep.textContent=`${tutorialIndex+1} / ${tutorialSteps.length}`;tutorialIcon.textContent=x[0];tutorialTitle.textContent=x[1];tutorialText.textContent=x[2];tutorialNext.textContent=tutorialIndex===tutorialSteps.length-1?"開始遊戲":"下一步"}
function closeTutorial(){state.tutorialDone=true;saveState();document.querySelector("#tutorial").classList.add("hidden")}
tutorialNext.onclick=()=>{if(tutorialIndex<tutorialSteps.length-1){tutorialIndex++;renderTutorial()}else closeTutorial()};tutorialSkip.onclick=closeTutorial;setTimeout(showTutorial,350);


// ===== v1.3 LINE Login + Cloudflare D1 雲端存檔 =====
const CloudAccount = {
  user: null,
  mode: localStorage.getItem("starRealmAccountMode") || "",
  saveTimer: null,
  syncing: false,
  loaded: false
};

async function api(path, options={}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    headers: {"Content-Type":"application/json", ...(options.headers||{})},
    ...options
  });
  let data = {};
  try { data = await response.json(); } catch {}
  if (!response.ok) {
    const error = new Error(data.message || data.error || `HTTP_${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}

function setSyncIndicator(text="", status="") {
  syncIndicator.textContent = text;
  syncIndicator.classList.toggle("hidden", !text);
  syncIndicator.classList.toggle("cloud-ready", status==="ok");
  syncIndicator.classList.toggle("cloud-error", status==="error");
}

function updateAccountUi() {
  const loggedIn = !!CloudAccount.user;
  accountName.textContent = loggedIn ? CloudAccount.user.displayName : "訪客";
  if (loggedIn && CloudAccount.user.pictureUrl) {
    accountAvatar.innerHTML = `<img src="${escapeHtml(CloudAccount.user.pictureUrl)}" alt="">`;
    profileImage.src = CloudAccount.user.pictureUrl;
    profileImage.classList.remove("hidden");
    profileFallback.classList.add("hidden");
  } else {
    accountAvatar.textContent = "👤";
    profileImage.classList.add("hidden");
    profileFallback.classList.remove("hidden");
  }
  profileName.textContent = loggedIn ? CloudAccount.user.displayName : "訪客玩家";
  cloudStatusText.textContent = loggedIn ? "☁️ 已啟用 Cloudflare D1 雲端存檔" : "目前只使用這台裝置的本機存檔";
  accountLoginButton.classList.toggle("hidden", loggedIn);
  manualSyncButton.classList.toggle("hidden", !loggedIn);
  logoutButton.classList.toggle("hidden", !loggedIn);
}

function escapeHtml(value="") {
  return String(value).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}

async function initializeAccount() {
  const params = new URLSearchParams(location.search);
  if (params.get("login")==="success") {
    history.replaceState({}, "", location.pathname);
    toast("LINE 登入成功，正在載入雲端進度");
  } else if (params.get("login")==="error") {
    history.replaceState({}, "", location.pathname);
    modal("⚠️","LINE 登入失敗", params.get("message") || "請檢查 LINE Login 設定後重試。");
  }

  try {
    const result = await api("/api/me");
    CloudAccount.user = result.user;
    CloudAccount.mode = "line";
    localStorage.setItem("starRealmAccountMode","line");
    await loadCloudState();
    loginGate.classList.add("hidden");
  } catch (error) {
    CloudAccount.user = null;
    if (CloudAccount.mode !== "guest") loginGate.classList.remove("hidden");
    else loginGate.classList.add("hidden");
  }
  CloudAccount.loaded = true;
  updateAccountUi();
}

async function loadCloudState() {
  setSyncIndicator("☁️ 讀取雲端進度…");
  try {
    const result = await api("/api/game-state");
    if (result.state && typeof result.state === "object") {
      state = {
        ...clone(defaultState),
        ...result.state,
        owned: normalizeOwned({...clone(defaultState.owned), ...(result.state.owned||{})}),
        inventory: {
          ...clone(defaultState.inventory),
          ...(result.state.inventory||{}),
          equipment: {
            ...clone(defaultState.inventory.equipment),
            ...(result.state.inventory?.equipment||{})
          }
        }
      };
      localStorage.setItem("starRealmRpgSave", JSON.stringify(state));
      renderAll();
    } else {
      await cloudSaveNow();
    }
    setSyncIndicator("☁️ 雲端進度已載入","ok");
    setTimeout(()=>setSyncIndicator(),1400);
  } catch (error) {
    setSyncIndicator("⚠️ 雲端讀取失敗，保留本機進度","error");
    setTimeout(()=>setSyncIndicator(),2600);
  }
}

function scheduleCloudSave() {
  if (!CloudAccount.loaded || !CloudAccount.user) return;
  clearTimeout(CloudAccount.saveTimer);
  CloudAccount.saveTimer = setTimeout(cloudSaveNow, 900);
}

async function cloudSaveNow() {
  if (!CloudAccount.user || CloudAccount.syncing) return;
  CloudAccount.syncing = true;
  setSyncIndicator("☁️ 正在同步…");
  try {
    await api("/api/game-state", {method:"PUT", body:JSON.stringify({state})});
    setSyncIndicator("☁️ 已同步","ok");
    setTimeout(()=>setSyncIndicator(),1100);
  } catch (error) {
    setSyncIndicator("⚠️ 同步失敗，稍後重試","error");
    setTimeout(()=>setSyncIndicator(),2600);
  } finally {
    CloudAccount.syncing = false;
  }
}

lineLoginButton.onclick = accountLoginButton.onclick = () => {
  location.href = "/auth/line/start";
};
guestButton.onclick = () => {
  CloudAccount.mode = "guest";
  localStorage.setItem("starRealmAccountMode","guest");
  loginGate.classList.add("hidden");
  updateAccountUi();
};
accountButton.onclick = () => {
  updateAccountUi();
  accountModal.classList.remove("hidden");
};
accountCloseButton.onclick = () => accountModal.classList.add("hidden");
manualSyncButton.onclick = async () => {
  accountModal.classList.add("hidden");
  await cloudSaveNow();
};
logoutButton.onclick = async () => {
  try { await api("/api/logout",{method:"POST",body:"{}"}); } catch {}
  CloudAccount.user = null;
  CloudAccount.mode = "guest";
  localStorage.setItem("starRealmAccountMode","guest");
  accountModal.classList.add("hidden");
  updateAccountUi();
  toast("已登出 LINE，現在使用本機存檔");
};
window.addEventListener("online", () => {
  if (CloudAccount.user) cloudSaveNow();
});
window.addEventListener("beforeunload", () => {
  if (CloudAccount.user && navigator.sendBeacon) {
    navigator.sendBeacon("/api/game-state-beacon", new Blob([JSON.stringify({state})],{type:"application/json"}));
  }
});
initializeAccount();

async function loadMissions(){
  if(!CloudAccount.user){missionList.innerHTML='<div class="info-box">每日任務需要使用 LINE 登入。</div>';return}
  try{
    const r=await api("/api/missions");
    missionList.innerHTML=r.missions.map(m=>`<div class="mission-card"><div class="inventory-icon">${m.icon}</div><div class="grow"><b>${m.title}</b><small style="display:block">${m.progress}/${m.target}　獎勵：${formatReward(m.reward)}</small><div class="progress-mini"><i style="width:${Math.min(100,m.progress/m.target*100)}%"></i></div></div><button class="primary" data-claim-mission="${m.id}" ${m.progress<m.target||m.claimed?"disabled":""}>${m.claimed?"已領取":"領取"}</button></div>`).join("");
  }catch(e){missionList.innerHTML='<div class="info-box">任務讀取失敗</div>'}
}
async function loadMailbox(){
  if(!CloudAccount.user){mailList.innerHTML='<div class="info-box">冒險信箱需要使用 LINE 登入。</div>';return}
  try{
    const r=await api("/api/mail");
    mailList.innerHTML=r.mails.length?r.mails.map(m=>`<div class="mail-card ${m.claimed_at?"read":""}"><div class="inventory-icon">📨</div><div class="grow"><b>${m.title}</b> ${!m.claimed_at?'<span class="badge-new">NEW</span>':""}<small style="display:block">${m.body}</small><small class="server-note">${formatReward(m.reward)}</small></div><button class="primary" data-claim-mail="${m.id}" ${m.claimed_at?"disabled":""}>${m.claimed_at?"已領取":"領取"}</button></div>`).join(""):'<div class="info-box">目前沒有信件。</div>';
  }catch(e){mailList.innerHTML='<div class="info-box">信箱讀取失敗</div>'}
}
async function loadRanking(){
  try{
    const r=await api("/api/leaderboard");
    rankingList.innerHTML=r.rows.map((x,i)=>`<div class="ranking-row ${x.isMe?"me":""}"><div class="rank">${i<3?["🥇","🥈","🥉"][i]:i+1}</div><div class="grow"><b>${escapeHtml(x.displayName)}</b><small style="display:block">通關 ${x.stageUnlocked}　勝利 ${x.wins}</small></div><strong>${x.power}</strong></div>`).join("");
  }catch(e){rankingList.innerHTML='<div class="info-box">排行榜讀取失敗</div>'}
}
document.addEventListener("click",async e=>{
  const mb=e.target.closest("[data-claim-mission]");
  if(mb){try{const r=await api(`/api/missions/${mb.dataset.claimMission}/claim`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();loadMissions();toast("任務獎勵已領取")}catch(err){toast(err.message)}}
  const mail=e.target.closest("[data-claim-mail]");
  if(mail){try{const r=await api(`/api/mail/${mail.dataset.claimMail}/claim`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();loadMailbox();toast("信件獎勵已領取")}catch(err){toast(err.message)}}
});

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
}

function renderEquipmentLab(){
  if(!window.equipmentLabList)return;
  equipmentLabList.innerHTML=Object.entries(EQUIPMENT).map(([id,e])=>{
    const qty=state.inventory.equipment[id]||0,meta=state.equipmentMeta?.[id]||{level:0,refine:0};
    return `<div class="inventory-item"><div class="inventory-icon">${e.emoji}</div><div style="flex:1"><h4>${e.name} +${meta.level}</h4><p>精煉 ${meta.refine} 階・持有 ${qty} 件</p><div class="forge-actions"><button class="secondary" data-forge="${id}" ${qty<1?"disabled":""}>強化</button><button class="secondary" data-refine="${id}" ${qty<1?"disabled":""}>精煉</button><button class="danger-button" data-dismantle="${id}" ${qty<1?"disabled":""}>分解 1 件</button></div></div></div>`
  }).join("");
}
function renderDungeons(){
  if(!window.dungeonList)return;
  dungeonList.innerHTML=DUNGEONS.map(d=>`<button class="stage-card" data-dungeon="${d.id}"><span class="stage-icon">${d.icon}</span><div><b>${d.name}</b><small>${d.desc}</small></div><span>⚡ ${d.energy}</span></button>`).join("");
}
function renderEventCenter(){
  if(!window.checkinCalendar)return;
  const info=window.currentEventInfo||{claimedDays:[],todayIndex:0};
  checkinCalendar.innerHTML=Array.from({length:7},(_,i)=>`<div class="checkin-day ${info.claimedDays.includes(i+1)?"claimed":""} ${info.todayIndex===i+1?"today":""}"><b>第 ${i+1} 天</b><div>${["🪙500","💎50","⚡10","🔮1","🪙1000","💎100","🎁大禮"][i]}</div></div>`).join("");
  eventStageList.innerHTML=EVENT_STAGES.map(x=>`<button class="stage-card" data-event-stage="${x.id}"><span class="stage-icon">${x.icon}</span><div><b>${x.name}</b><small>${x.desc}</small></div><span>⚡ ${x.energy}</span></button>`).join("");
}
async function upgradeSkill(id){
  if(!CloudAccount.user)return toast("請先使用 LINE 登入");
  try{const r=await api(`/api/heroes/${id}/skill-upgrade`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();toast(`技能提升至 Lv.${r.skillLevel}`)}
  catch(e){toast(e.message==="GOLD_NOT_ENOUGH"?"金幣不足":"技能升級失敗："+e.message)}
}
async function enhanceEquipment(id){
  if(!CloudAccount.user)return toast("請先使用 LINE 登入");
  try{const r=await api("/api/equipment/enhance",{method:"POST",body:JSON.stringify({equipmentId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();toast(`強化成功 +${r.level}`)}
  catch(e){toast(e.message==="MATERIAL_NOT_ENOUGH"?"金幣或礦石不足":"強化失敗："+e.message)}
}
async function refineEquipment(id){
  if(!CloudAccount.user)return toast("請先使用 LINE 登入");
  try{const r=await api("/api/equipment/refine",{method:"POST",body:JSON.stringify({equipmentId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();toast(`精煉成功 ${r.refine} 階`)}
  catch(e){toast(e.message==="MATERIAL_NOT_ENOUGH"?"材料不足":"精煉失敗："+e.message)}
}
async function dismantleEquipment(id){
  if(!CloudAccount.user)return toast("請先使用 LINE 登入");
  if(!confirm("確定分解 1 件裝備？"))return;
  try{const r=await api("/api/equipment/dismantle",{method:"POST",body:JSON.stringify({equipmentId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();toast("分解完成，已取得素材")}
  catch(e){toast(e.message==="ITEM_NOT_ENOUGH"?"裝備不足":"分解失敗："+e.message)}
}
async function runDungeon(id){
  if(!CloudAccount.user)return toast("請先使用 LINE 登入");
  try{const r=await api("/api/dungeons/clear",{method:"POST",body:JSON.stringify({dungeonId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();modal("🗝️","副本通關",formatReward(r.reward))}
  catch(e){toast(e.message==="DAILY_LIMIT"?"今日挑戰次數已用完":e.message==="ENERGY_NOT_ENOUGH"?"體力不足":"副本失敗："+e.message)}
}
async function loadEventCenter(){
  if(!CloudAccount.user){renderEventCenter();return}
  try{window.currentEventInfo=await api("/api/events/status");renderEventCenter()}catch{}
}
eventCheckinButton.onclick=async()=>{
  if(!CloudAccount.user)return toast("請先使用 LINE 登入");
  try{const r=await api("/api/events/checkin",{method:"POST",body:"{}"});state=r.state;window.currentEventInfo=r.status;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();modal("📅","簽到成功",formatReward(r.reward))}
  catch(e){toast(e.message==="ALREADY_CLAIMED"?"今天已簽到":"簽到失敗："+e.message)}
};
async function runEventStage(id){
  if(!CloudAccount.user)return toast("請先使用 LINE 登入");
  try{const r=await api("/api/events/stage",{method:"POST",body:JSON.stringify({eventStageId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();modal("🌠","活動通關",formatReward(r.reward))}
  catch(e){toast(e.message==="ENERGY_NOT_ENOUGH"?"體力不足":"活動挑戰失敗："+e.message)}
}
async function loadAssists(){
  if(!CloudAccount.user){assistList.innerHTML='<div class="info-box">請先使用 LINE 登入。</div>';return}
  try{const r=await api("/api/guild/assists");assistList.innerHTML=r.players.map(x=>`<div class="ranking-row"><div class="rank">🤝</div><div class="grow"><b>${escapeHtml(x.displayName)}</b><small style="display:block">關卡 ${x.stageUnlocked}・助戰力 ${x.power}</small></div><button class="primary" data-assist="${x.id}" ${r.claimedToday?"disabled":""}>${r.claimedToday?"今日已助戰":"選擇助戰"}</button></div>`).join("")}catch(e){assistList.innerHTML='<div class="info-box">助戰名單讀取失敗。</div>'}
}
async function claimAssist(id){
  try{const r=await api("/api/guild/assist",{method:"POST",body:JSON.stringify({helperPlayerId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();loadAssists();modal("🤝","助戰完成",formatReward(r.reward))}
  catch(e){toast(e.message==="ALREADY_CLAIMED"?"今天已使用助戰":"助戰失敗："+e.message)}
}
function updateBattlePotionButton(){battlePotionButton.textContent=`🧪 使用治療藥水（${state.inventory.potion||0}）`;battlePotionButton.disabled=(state.inventory.potion||0)<=0}
battlePotionButton.onclick=async()=>{
  if(battleOver)return;
  try{
    if(CloudAccount.user){const r=await api("/api/items/use-battle",{method:"POST",body:JSON.stringify({itemId:"potion"})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state))}
    else{if((state.inventory.potion||0)<=0)return toast("治療藥水不足");state.inventory.potion--;saveState()}
    const target=players.filter(x=>x.hp>0).sort((a,b)=>a.hp/a.maxHp-b.hp/b.maxHp)[0];if(target){target.hp=Math.min(target.maxHp,target.hp+Math.round(target.maxHp*.35));drawBattle();toast(`${target.name} 恢復生命`)}
    updateBattlePotionButton();
  }catch(e){toast(e.message==="ITEM_NOT_ENOUGH"?"治療藥水不足":"使用失敗："+e.message)}
};

let SERVER_CATALOG=null,currentAnnouncementFilter="ALL",bannerIndex=0,bannerTimer=null;
async function loadPublicCatalog(){
  try{
    SERVER_CATALOG=await api("/api/catalog");
    applyCatalogDefaults(SERVER_CATALOG);
    renderLiveOps();
    renderAll();
  }catch(e){console.warn("catalog fallback",e)}
}
function applyCatalogDefaults(c){
  if(Array.isArray(c.heroes)&&c.heroes.length){
    HEROES.splice(0,HEROES.length,...c.heroes.map(h=>({
      id:h.id,name:h.name,rarity:h.rarity,element:h.element||"",heroClass:h.hero_class||"",
      emoji:h.emoji||"✨",imageUrl:h.image_url||`/assets/heroes/${h.id}.svg`,baseHp:Number(h.base_hp||300),
      baseAtk:Number(h.base_atk||80),baseDef:Number(h.base_def||0),
      skill:h.skill_name||"技能",skillDesc:h.skill_description||"",
      c1:h.color_1||"#3857a8",c2:h.color_2||"#66c7e9"
    })));
  }
  if(Array.isArray(c.equipment)&&c.equipment.length){
    for(const e of c.equipment) EQUIPMENT[e.id]={
      name:e.name,emoji:e.emoji||"🛡️",imageUrl:e.image_url||"",slot:e.slot,
      atk:Number(e.base_atk||0),hp:Number(e.base_hp||0),def:Number(e.base_def||0)
    };
  }
  if(Array.isArray(c.shopProducts)&&c.shopProducts.length){
    SHOP_ITEMS.splice(0,SHOP_ITEMS.length,...c.shopProducts.map(x=>({
      id:x.item_id,name:x.name,emoji:x.emoji||"📦",imageUrl:x.image_url||`/assets/shop/${x.item_id}.svg`,
      desc:x.description||"",price:Number(x.price||0),kind:x.product_kind||"item",
      dailyLimit:Number(x.daily_limit||0)
    })));
  }
}
function activeAnnouncements(){
  return (SERVER_CATALOG?.announcements||[]).filter(a=>a.active!==0);
}
function renderLiveOps(){
  const anns=activeAnnouncements();
  const homeAnn=anns.find(a=>["HOME_AND_CENTER","HOME_BAR_ONLY",null,""].includes(a.display_location));
  if(homeAnn){
    announcementBar.classList.remove("hidden");
    announcementBar.innerHTML=`📢 <b>${escapeHtml(homeAnn.title)}</b>　${escapeHtml((homeAnn.body||"").slice(0,80))}`;
    announcementBar.onclick=()=>showPage("announcementPage");
  }else announcementBar.classList.add("hidden");
  renderBanner();
  renderAnnouncements();
}
function renderBanner(){
  const banners=SERVER_CATALOG?.banners||[];
  clearInterval(bannerTimer);
  if(!banners.length){homeBanner.classList.add("hidden");return}
  bannerIndex=Math.min(bannerIndex,banners.length-1);
  const b=banners[bannerIndex];
  homeBanner.classList.remove("hidden");
  homeBanner.classList.toggle("no-image",!b.image_url);
  homeBanner.style.backgroundImage=b.image_url?`url("${b.image_url}")`:"";
  homeBanner.innerHTML=`<div class="home-banner-content"><h2>${escapeHtml(b.title)}</h2><p>${escapeHtml(b.subtitle||"")}</p></div><div class="home-banner-nav">${banners.map((_,i)=>`<button class="${i===bannerIndex?"active":""}" data-banner-index="${i}" aria-label="Banner ${i+1}"></button>`).join("")}</div>`;
  homeBanner.onclick=e=>{const dot=e.target.closest("[data-banner-index]");if(dot){bannerIndex=Number(dot.dataset.bannerIndex);renderBanner();return}if(b.link_target)showPage(b.link_target)};
  if(banners.length>1)bannerTimer=setInterval(()=>{bannerIndex=(bannerIndex+1)%banners.length;renderBanner()},6000);
}
function renderAnnouncements(){
  if(!window.announcementList)return;
  const rows=activeAnnouncements().filter(a=>a.display_location!=="HOME_BAR_ONLY").filter(a=>currentAnnouncementFilter==="ALL"||(a.announcement_type||"NOTICE")===currentAnnouncementFilter);
  announcementList.innerHTML=rows.length?rows.map(a=>`<article class="announcement-card ${a.pinned?"pinned":""}">${a.image_url?`<img class="announcement-cover" src="${escapeHtml(a.image_url)}" alt="">`:""}<div class="announcement-body"><div class="announcement-meta"><span class="announcement-type">${escapeHtml(a.announcement_type||"NOTICE")}</span>${a.pinned?'<span>📌 置頂</span>':""}<span>${formatAnnouncementDate(a.starts_at||a.created_at)}</span></div><h3>${escapeHtml(a.title)}</h3><p>${escapeHtml(a.body||"")}</p></div></article>`).join(""):'<div class="info-box">目前沒有符合條件的公告。</div>';
}
function formatAnnouncementDate(v){if(!v)return"";try{return new Intl.DateTimeFormat("zh-TW",{timeZone:"Asia/Taipei",dateStyle:"medium",timeStyle:"short"}).format(new Date(v))}catch{return v}}
document.addEventListener("click",e=>{const b=e.target.closest("[data-ann-filter]");if(!b)return;currentAnnouncementFilter=b.dataset.annFilter;document.querySelectorAll("[data-ann-filter]").forEach(x=>x.classList.toggle("active",x===b));renderAnnouncements()});
loadPublicCatalog();
