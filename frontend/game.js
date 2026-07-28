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
function showPage(id){if(id==="missionPage")loadMissions();if(id==="mailPage")loadMailbox();if(id==="rankingPage")loadRanking();if(id==="guildPage")loadAssists();if(id==="eventPage")loadEventCenter();if(id==="announcementPage")renderAnnouncements();if(id==="arenaPage")loadArena();document.querySelectorAll(".page").forEach(p=>p.classList.toggle("active",p.id===id));document.querySelectorAll(".bottom-nav button").forEach(b=>b.classList.toggle("active",b.dataset.go===id));window.scrollTo({top:0,behavior:"smooth"});renderAll()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)showPage(b.dataset.go)});
function stars(r){return r==="傳說"?"★★★★★":r==="史詩"?"★★★★":"★★★"}
function heroCard(h,opt={}){const o=state.owned[h.id],st=heroStats(h.id),sel=state.team.includes(h.id),pct=Math.min(100,(o.xp/xpNeed(o.level))*100),rank=o.rank||1,rc=rankCost(rank);return `<article class="hero-card rarity-${h.rarity} ${opt.selectable&&sel?"selected":""}" ${opt.open?`data-open-hero="${h.id}"`:""}><div class="hero-art" style="--c1:${h.c1};--c2:${h.c2}">${h.imageUrl?`<img src="${escapeHtml(h.imageUrl)}" alt="${escapeHtml(h.name)}">`:`<span>${h.emoji}</span>`}</div><h4>${h.name}</h4><div class="stars">${stars(h.rarity)}</div><span class="rank-badge">突破 ${rank} 階</span><div class="hero-meta"><span>Lv.${st.level}</span><span>ATK ${st.atk}</span></div><div class="xp-wrap"><div class="xp-bar"><i style="width:${pct}%"></i></div><div class="xp-label"><span>EXP</span><span>${o.xp}/${xpNeed(o.level)}</span></div></div>${opt.actions?`<div class="hero-actions"><button data-upgrade="${h.id}">升級 ${upgradeCost(o.level)}🪙</button><button data-toggle="${h.id}">${sel?"移出":"入隊"}</button></div>`:""}</article>`}
function renderAll(){goldValue.textContent=state.gold;gemValue.textContent=state.gems;energyValue.textContent=`${state.energy}/${state.maxEnergy}`;soundToggle.textContent=state.sound?"🔊":"🔇";homeTeam.innerHTML=state.team.map(id=>heroCard(HEROES.find(h=>h.id===id))).join("");heroList.innerHTML=HEROES.map(h=>state.owned[h.id]?heroCard(h,{actions:true,open:true}):`<article class="hero-card locked"><div class="hero-art" style="--c1:#222;--c2:#333">❔</div><h4>尚未獲得</h4><div class="stars">${stars(h.rarity)}</div></article>`).join("");teamEditor.innerHTML=HEROES.filter(h=>state.owned[h.id]).map(h=>heroCard(h,{selectable:true,actions:true,open:false})).join("");stageList.innerHTML=STAGES.map(s=>`<article class="stage-card ${s.id>state.stageUnlocked?"locked":""}"><div class="stage-icon">${s.icon}</div><div class="stage-info"><h3>${s.id}. ${s.name}</h3><p>${s.desc}</p><small>消耗 ⚡${s.energy}　獎勵 🪙${s.reward.gold}</small></div><button class="${s.id<=state.stageUnlocked?"primary":"secondary"}" data-stage="${s.id}" ${s.id>state.stageUnlocked?"disabled":""}>挑戰</button></article>`).join("");shopList.innerHTML=SHOP_ITEMS.map(i=>`<article class="shop-card"><div class="shop-icon">${i.imageUrl?`<img src="${i.imageUrl}" alt="${i.name}">`:i.emoji}</div><div><h4>${i.name}</h4><p>${i.desc}</p><b>🪙 ${i.price}</b></div><button class="secondary" data-buy="${i.id}">購買</button></article>`).join("");inventoryList.innerHTML=renderInventory();renderDungeonList();renderEventCenter();renderEquipmentLab();renderHeroDetail()}
function renderInventory(){const rows=[["🪵","古木碎片",state.inventory.wood],["⛏️","星鐵礦石",state.inventory.ore],["🌿","月光藥草",state.inventory.herb],["🔷","裂縫核心",state.inventory.core],["🧪","治療藥水",state.inventory.potion],["⚡","體力藥水",state.inventory.energyPotion||0]];for(const [id,n] of Object.entries(state.inventory.equipment||{})){const e=EQUIPMENT[id];if(e)rows.push([e.emoji,e.name,n,id])}return rows.map(x=>`<div class="inventory-item"><div class="inventory-icon">${x[0]}</div><div><b>${x[1]}</b><small>冒險物資</small></div><span class="qty">× ${x[2]}</span>${x[1]==="體力藥水"&&x[2]>0?'<button class="secondary" data-use="energyPotion">使用</button>':""}</div>`).join("")}
function renderDungeonList(){if(!window.dungeonList)return;const info=window.currentDungeonInfo||{};dungeonList.innerHTML=DUNGEONS.map(d=>{const left=info[d.id]?.remaining??3;return `<article class="stage-card"><div class="stage-icon">${d.icon}</div><div class="stage-info"><h3>${d.name}</h3><p>${d.desc}</p><small>⚡ ${d.energy}・今日剩餘 ${left}/3</small></div><button class="primary" data-dungeon="${d.id}" ${left<=0?'disabled':''}>挑戰</button></article>`}).join("")}
function renderEventCenter(){if(!window.checkinCalendar)return;const x=window.currentEventInfo||{claimedDays:[],todayDay:1,claimedToday:false};checkinCalendar.innerHTML=Array.from({length:7},(_,i)=>{const d=i+1,c=x.claimedDays?.includes(d),today=x.todayDay===d;return `<div class="checkin-day ${c?'claimed':''} ${today?'today':''}"><b>Day ${d}</b><span>${c?'✅':d===7?'💎':'🎁'}</span><small>${d===7?'壓軸獎勵':'登入獎勵'}</small></div>`}).join("");eventCheckinButton.disabled=!!x.claimedToday;eventCheckinButton.textContent=x.claimedToday?'今日已簽到':'今日簽到';eventStageList.innerHTML=EVENT_STAGES.map(e=>`<article class="stage-card"><div class="stage-icon">${e.icon}</div><div class="stage-info"><h3>${e.name}</h3><p>${e.desc}</p><small>⚡ ${e.energy}</small></div><button class="primary" data-event-stage="${e.id}">挑戰</button></article>`).join("")}
function renderEquipmentLab(){if(!window.equipmentLabList)return;const rows=Object.entries(state.inventory.equipment||{}).filter(([,n])=>n>0);equipmentLabList.innerHTML=rows.length?rows.map(([id,n])=>{const e=EQUIPMENT[id],m=state.equipmentMeta?.[id]||{level:0,refine:0};return `<div class="equipment-lab-card"><div class="inventory-icon">${e?.imageUrl?`<img src="${e.imageUrl}" alt="${e.name}">`:e?.emoji||'🛡️'}</div><div class="grow"><b>${e?.name||id}</b><small>持有 ${n}・強化 +${m.level||0}・精煉 ${m.refine||0}</small></div><button class="secondary" data-enhance="${id}">強化</button><button class="secondary" data-refine="${id}">精煉</button><button class="secondary" data-dismantle="${id}">分解</button></div>`).join(''):'<div class="info-box">目前沒有可鍛造的裝備。</div>'}
function renderHeroDetail(){if(!window.heroDetail||!selectedHeroId)return;const h=HEROES.find(x=>x.id===selectedHeroId),o=state.owned[selectedHeroId];if(!h||!o){heroDetail.innerHTML='<div class="info-box">尚未擁有此英雄。</div>';return}const st=heroStats(h.id),eq=o.equipment||{},rank=o.rank||1;heroDetail.innerHTML=`<div class="detail-panel"><div class="detail-main"><div class="hero-art" style="--c1:${h.c1};--c2:${h.c2}">${h.imageUrl?`<img src="${escapeHtml(h.imageUrl)}" alt="${escapeHtml(h.name)}">`:`<span>${h.emoji}</span>`}</div><h2>${h.name}</h2><div class="stars">${stars(h.rarity)}</div><p>${h.skillDesc}</p><button class="primary wide" data-detail-upgrade="${h.id}">升級英雄（${upgradeCost(o.level)} 金幣）</button><button class="secondary wide" data-rank-up="${h.id}" ${rank>=5?'disabled':''}>${rank>=5?'已達最高突破':`突破至 ${rank+1} 階（${rankCost(rank).gold} 金幣／${rankCost(rank).core} 核心）`}</button></div><div><div class="detail-stats"><h3>能力值</h3><div class="stat-grid"><div class="stat-box"><small>等級</small><b>Lv.${st.level}</b></div><div class="stat-box"><small>突破</small><b>${rank} 階</b></div><div class="stat-box"><small>生命</small><b>${st.hp}</b></div><div class="stat-box"><small>攻擊</small><b>${st.atk}</b></div></div><div class="skill-box"><b>${h.skillEmoji} ${h.skill}</b><p>${h.skillDesc}</p><small>技能等級 ${o.skillLevel||1}</small><button class="secondary" data-skill-upgrade="${h.id}">升級技能</button></div></div><div class="equipment-panel"><h3>裝備欄</h3><div class="equipment-list">${['weapon','armor','accessory'].map(slot=>{const id=eq[slot],e=EQUIPMENT[id];return `<div class="equipment-slot"><small>${slot}</small><div>${e?.emoji||'＋'}</div><b>${e?.name||'未裝備'}</b><button data-equip-slot="${slot}" data-hero="${h.id}">變更</button></div>`}).join('')}</div></div></div></div>`}
function chooseEquipment(heroId,slot){const available=Object.entries(state.inventory.equipment||{}).filter(([id,n])=>n>0&&EQUIPMENT[id]?.slot===slot);if(!available.length)return toast("沒有適合此欄位的裝備");const current=state.owned[heroId].equipment[slot],idx=Math.max(-1,available.findIndex(([id])=>id===current)),next=available[(idx+1)%available.length][0];state.owned[heroId].equipment[slot]=next;saveState();renderHeroDetail();toast(`已裝備 ${EQUIPMENT[next].name}`)}
document.addEventListener("click",e=>{const up=e.target.closest("[data-upgrade]");if(up){upgradeHero(up.dataset.upgrade);return}const t=e.target.closest("[data-toggle]");if(t){toggleTeam(t.dataset.toggle);return}const s=e.target.closest("[data-stage]");if(s){openStage(Number(s.dataset.stage));return}const buy=e.target.closest("[data-buy]");if(buy){buyItem(buy.dataset.buy);return}const use=e.target.closest("[data-use]");if(use){useItem(use.dataset.use);return}const open=e.target.closest("[data-open-hero]");if(open){selectedHeroId=open.dataset.openHero;showPage("heroDetailPage");return}const du=e.target.closest("[data-detail-upgrade]");if(du){upgradeHero(du.dataset.detailUpgrade);return}const ru=e.target.closest("[data-rank-up]");if(ru){rankUpHero(ru.dataset.rankUp);return}const eu=e.target.closest("[data-equip-slot]");if(eu){chooseEquipment(eu.dataset.hero,eu.dataset.equipSlot);return}const su=e.target.closest("[data-skill-upgrade]");if(su){upgradeSkill(su.dataset.skillUpgrade);return}const dg=e.target.closest("[data-dungeon]");if(dg){runDungeon(dg.dataset.dungeon);return}const ev=e.target.closest("[data-event-stage]");if(ev){runEventStage(ev.dataset.eventStage);return}const as=e.target.closest("[data-assist]");if(as){claimAssist(as.dataset.assist);return}const en=e.target.closest("[data-enhance]");if(en){enhanceEquipment(en.dataset.enhance);return}const rf=e.target.closest("[data-refine]");if(rf){refineEquipment(rf.dataset.refine);return}const dm=e.target.closest("[data-dismantle]");if(dm){dismantleEquipment(dm.dataset.dismantle)}});
function upgradeHero(id){const o=state.owned[id],cost=upgradeCost(o.level);if(CloudAccount.user)return serverHeroUpgrade(id);if(state.gold<cost)return toast("金幣不足");state.gold-=cost;o.level++;saveState();toast("英雄升級成功")}
function toggleTeam(id){const i=state.team.indexOf(id);if(i>=0){if(state.team.length===1)return toast("至少保留一名英雄");state.team.splice(i,1)}else{if(state.team.length>=3)return toast("隊伍最多三人");state.team.push(id)}saveState()}
async function serverHeroUpgrade(id){try{const r=await api(`/api/heroes/${encodeURIComponent(id)}/upgrade`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();renderHeroDetail();toast(`升級成功 Lv.${r.level}`)}catch(e){toast(e.message==="GOLD_NOT_ENOUGH"?"金幣不足":"升級失敗："+e.message)}}
async function rankUpHero(id){if(!CloudAccount.user)return toast("突破功能需要 LINE 登入");try{const r=await api(`/api/heroes/${encodeURIComponent(id)}/rank-up`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();renderHeroDetail();toast(`突破成功 ${r.rank} 階`)}catch(e){toast(e.message==="MATERIAL_NOT_ENOUGH"?"金幣或核心不足":e.message==="MAX_RANK"?"已達最高突破":"突破失敗："+e.message)}}
async function buyItem(id){if(CloudAccount.user){try{const r=await api("/api/shop/buy",{method:"POST",body:JSON.stringify({itemId:id,quantity:1})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();toast("購買成功")}catch(e){toast(e.message==="GOLD_NOT_ENOUGH"?"金幣不足":e.message==="DAILY_LIMIT"?"今日購買已達上限":"購買失敗："+e.message)}return}const item=SHOP_ITEMS.find(x=>x.id===id);if(state.gold<item.price)return toast("金幣不足");state.gold-=item.price;if(item.kind==="equipment")state.inventory.equipment[id]=(state.inventory.equipment[id]||0)+1;else state.inventory[id]=(state.inventory[id]||0)+1;saveState();toast("購買成功")}
async function useItem(id){if(CloudAccount.user){try{const r=await api("/api/items/use",{method:"POST",body:JSON.stringify({itemId:id})});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();toast("道具使用成功")}catch(e){toast(e.message==="ENERGY_FULL"?"體力已滿":"使用失敗："+e.message)}return}if(id==="energyPotion"&&(state.inventory.energyPotion||0)>0){state.inventory.energyPotion--;state.energy=Math.min(state.maxEnergy,state.energy+10);saveState();toast("恢復 10 體力")}}
function openStage(id){currentStage=STAGES.find(s=>s.id===id);battleTitle.textContent=currentStage.name;battleStageLabel.textContent=`STAGE ${id}`;showPage("battlePage");setupBattle()}
function setupBattle(){battleOver=false;startBattleButton.classList.remove("hidden");battleContinueButton.classList.add("hidden");battlePotionButton.classList.remove("hidden");players=state.team.map(id=>{const h=heroStats(id);return{id:h.id,name:h.name,emoji:h.emoji,hp:h.hp,maxHp:h.hp,atk:h.atk,c1:h.c1,c2:h.c2,skill:h.skill,skillEmoji:h.skillEmoji}});enemies=currentStage.enemies.map((x,i)=>({id:"e"+i,name:x[0],emoji:x[1],hp:x[2],maxHp:x[2],atk:x[3],c1:"#4b2b52",c2:"#a14458"}));battleLog.textContent="準備迎戰";drawBattle();updateBattlePotionButton()}
function drawBattle(){playerRow.innerHTML=players.map(unitHtml).join("");enemyRow.innerHTML=enemies.map(unitHtml).join("")}
function unitHtml(u){const p=Math.max(0,u.hp/u.maxHp*100);return `<div class="battle-unit ${u.hp<=0?"dead":""}" id="unit-${u.id}"><div class="battle-avatar" style="--c1:${u.c1};--c2:${u.c2}">${u.emoji}</div><h4>${u.name}</h4><div class="hp"><i style="width:${p}%"></i></div><div class="hp-label">${Math.max(0,u.hp)} / ${u.maxHp}</div></div>`}
startBattleButton.onclick=()=>{startBattleButton.classList.add("hidden");runBattle()};battleContinueButton.onclick=()=>showPage("stagePage");leaveBattle.onclick=()=>{clearTimeout(battleTimer);showPage("stagePage")};speedButton.onclick=()=>{speed=speed===1?2:1;speedButton.textContent=speed+"×"};
function alive(arr){return arr.filter(x=>x.hp>0)}
function runBattle(){const pa=alive(players),ea=alive(enemies);if(!pa.length||!ea.length)return finishBattle(pa.length>0);const p=pa[Math.floor(Math.random()*pa.length)],e=ea[Math.floor(Math.random()*ea.length)];attack(p,e,true,()=>{if(!alive(enemies).length)return finishBattle(true);const e2=alive(enemies)[Math.floor(Math.random()*alive(enemies).length)],p2=alive(players)[Math.floor(Math.random()*alive(players).length)];attack(e2,p2,false,()=>{if(!alive(players).length)return finishBattle(false);battleTimer=setTimeout(runBattle,500/speed)})})}
function attack(a,t,isHero,next){const skill=isHero&&Math.random()<.28,mult=skill?1.45:1,damage=Math.max(1,Math.round(a.atk*mult*(.8+Math.random()*.4)));battleLog.textContent=skill?`${a.name} 使用 ${a.skill}`:`${a.name} 攻擊 ${t.name}`;const ae=document.querySelector(`#unit-${a.id}`),te=document.querySelector(`#unit-${t.id}`);ae?.classList.add("attacking");if(skill)skillEffect(a);setTimeout(()=>{ae?.classList.remove("attacking");te?.classList.add("hit");t.hp-=damage;floatDamage(te,damage);drawBattle();setTimeout(()=>{document.querySelector(`#unit-${t.id}`)?.classList.remove("hit");next()},260/speed)},240/speed)}
function skillEffect(a){const fx=document.createElement("div");fx.className="skill-fx";fx.textContent=a.skillEmoji||"✨";fx.style.color=a.c2;document.body.appendChild(fx);setTimeout(()=>fx.remove(),520/speed);playTone(760)}
function floatDamage(el,damage){if(!el)return;const r=el.getBoundingClientRect(),d=document.createElement("div");d.className="damage-float";d.textContent=`-${damage}`;d.style.left=`${r.left+r.width/2}px`;d.style.top=`${r.top+20}px`;document.body.appendChild(d);setTimeout(()=>d.remove(),700)}
function finishBattle(win){battleOver=true;battlePotionButton.classList.add("hidden");battleContinueButton.classList.remove("hidden");battleLog.textContent=win?"戰鬥勝利！":"隊伍全滅…";if(CloudAccount.user){settleServerBattle(win);return}if(win){const r=currentStage.reward;state.gold+=r.gold;state.gems+=r.gem||0;state.inventory.wood+=(r.wood||0);state.inventory.ore+=(r.ore||0);state.inventory.herb+=(r.herb||0);state.inventory.core+=(r.core||0);if(r.equipment)state.inventory.equipment[r.equipment]=(state.inventory.equipment[r.equipment]||0)+1;state.team.forEach(id=>applyXp(id,r.xp));if(currentStage.id===state.stageUnlocked&&state.stageUnlocked<STAGES.length)state.stageUnlocked++;saveState();modal("🏆","訪客模式勝利",`獲得 ${r.gold} 金幣與 ${r.xp} 經驗。`);}else modal("💥","戰鬥失敗","強化英雄後再次挑戰。");}
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
    localStorage.setItem("starRealmAccountMode", "cloud");
    CloudAccount.mode = "cloud";
  }
  if (params.get("login")==="error") {
    const reason = params.get("reason") || "LINE_LOGIN_FAILED";
    history.replaceState({}, "", location.pathname);
    toast("LINE 登入失敗：" + reason);
  }

  try {
    const data = await api("/api/me");
    CloudAccount.user = data.user;
    CloudAccount.mode = "cloud";
    localStorage.setItem("starRealmAccountMode", "cloud");
    await loadCloudState();
    setSyncIndicator("☁️ 雲端存檔已連線", "ok");
  } catch (error) {
    CloudAccount.user = null;
    if (!CloudAccount.mode) {
      loginGate.classList.remove("hidden");
    }
  }
  CloudAccount.loaded = true;
  updateAccountUi();
}

async function loadCloudState() {
  const data = await api("/api/game-state");
  if (data && data.state) {
    state = {...clone(defaultState), ...data.state};
    state.owned = normalizeOwned({...clone(defaultState.owned), ...(data.state.owned||{})});
    state.inventory = {...clone(defaultState.inventory), ...(data.state.inventory||{})};
    state.inventory.equipment = {...clone(defaultState.inventory.equipment), ...(data.state.inventory?.equipment||{})};
    localStorage.setItem("starRealmRpgSave", JSON.stringify(state));
    renderAll();
  }
}

function scheduleCloudSave() {
  if (!CloudAccount.loaded || !CloudAccount.user || CloudAccount.syncing) return;
  clearTimeout(CloudAccount.saveTimer);
  CloudAccount.saveTimer = setTimeout(syncCloudState, 700);
}

async function syncCloudState() {
  if (!CloudAccount.user || CloudAccount.syncing) return;
  CloudAccount.syncing = true;
  setSyncIndicator("☁️ 儲存中…", "");
  try {
    const data = await api("/api/game-state", {
      method:"PUT",
      body: JSON.stringify({state})
    });
    if (data.state) state = data.state;
    localStorage.setItem("starRealmRpgSave", JSON.stringify(state));
    setSyncIndicator("☁️ 已同步", "ok");
  } catch (error) {
    setSyncIndicator("⚠️ 雲端同步失敗", "error");
  } finally {
    CloudAccount.syncing = false;
  }
}

async function serverDailyClaim() {
  const data = await api("/api/daily", {method:"POST"});
  state = data.state;
  localStorage.setItem("starRealmRpgSave", JSON.stringify(state));
  renderAll();
  modal("🎁", "每日補給", `獲得 ${formatReward(data.reward)}`);
}

async function serverSummon(count) {
  const data = await api("/api/summon", {method:"POST", body:JSON.stringify({count})});
  state = data.state;
  localStorage.setItem("starRealmRpgSave", JSON.stringify(state));
  renderAll();
  summonResult.innerHTML = data.heroes.map(h=>{
    const x=HEROES.find(v=>v.id===h.id);
    return `<div class="mini-result"><div>${x?.emoji||"✨"}</div><small>${x?.name||h.id}</small><small style="color:var(--gold)">${h.rarity}</small></div>`;
  }).join("");
  modal("✨", "伺服器召喚完成", `鑽石已由伺服器扣除，獲得 ${count} 名英雄。`);
}

async function requestServerBattle(stageId) {
  const data = await api("/api/battle/start", {method:"POST", body:JSON.stringify({stageId, team:state.team})});
  return data.battleId;
}

async function settleServerBattle(win) {
  if (!window.currentServerBattleId) return;
  try {
    const data = await api("/api/battle/settle", {
      method:"POST",
      body:JSON.stringify({battleId:window.currentServerBattleId, result:win?"WIN":"LOSE"})
    });
    state = data.state;
    localStorage.setItem("starRealmRpgSave", JSON.stringify(state));
    renderAll();
    if (win) modal("🏆", "伺服器結算完成", `獲得 ${formatReward(data.reward)}`);
    else modal("💥", "戰鬥失敗", "本次沒有發放獎勵。");
  } catch (error) {
    modal("⚠️", "結算失敗", error.message);
  } finally {
    window.currentServerBattleId = null;
  }
}

const originalOpenStage = openStage;
openStage = async function(id) {
  if (CloudAccount.user) {
    try {
      window.currentServerBattleId = await requestServerBattle(id);
    } catch (error) {
      if (error.message === "ENERGY_NOT_ENOUGH") return toast("體力不足");
      if (error.message === "BATTLE_PENDING") return toast("上一場戰鬥尚未結算，請稍後再試");
      return toast("無法開始戰鬥：" + error.message);
    }
  }
  originalOpenStage(id);
};

accountButton.onclick = ()=>accountModal.classList.remove("hidden");
accountModalClose.onclick = ()=>accountModal.classList.add("hidden");
lineLoginButton.onclick = ()=>location.href="/auth/line/start";
accountLoginButton.onclick = ()=>location.href="/auth/line/start";
guestButton.onclick = ()=>{
  localStorage.setItem("starRealmAccountMode", "guest");
  CloudAccount.mode = "guest";
  loginGate.classList.add("hidden");
  toast("已進入訪客模式");
};
manualSyncButton.onclick = async ()=>{
  accountModal.classList.add("hidden");
  await syncCloudState();
  toast("同步完成");
};
logoutButton.onclick = async ()=>{
  try { await api("/api/logout", {method:"POST"}); } catch {}
  CloudAccount.user = null;
  CloudAccount.mode = "";
  localStorage.removeItem("starRealmAccountMode");
  accountModal.classList.add("hidden");
  updateAccountUi();
  loginGate.classList.remove("hidden");
  toast("已登出雲端帳號");
};

window.addEventListener("beforeunload", ()=>{
  if (!CloudAccount.user) return;
  try {
    navigator.sendBeacon("/api/game-state-beacon", new Blob([JSON.stringify({state})], {type:"application/json"}));
  } catch {}
});

renderAll();
initializeAccount();


// ===== v1.3.1 mission + mail =====
async function loadMissions(){
  if(!CloudAccount.user){missionList.innerHTML='<div class="info-box">使用 LINE 登入後才會啟用伺服器每日任務。</div>';return}
  try{
    const data=await api("/api/missions");
    missionList.innerHTML=data.missions.map(m=>`<div class="mission-card ${m.claimed?"claimed":""}"><div class="mission-icon">${m.icon}</div><div class="mission-content"><b>${m.title}</b><small>${m.description}</small><div class="mission-progress"><i style="width:${Math.min(100,m.progress/m.target*100)}%"></i></div><small>${m.progress} / ${m.target}・${m.rewardLabel}</small></div><button class="${m.complete&&!m.claimed?"primary":"secondary"}" data-claim-mission="${m.id}" ${!m.complete||m.claimed?"disabled":""}>${m.claimed?"已領取":m.complete?"領取":"進行中"}</button></div>`).join("");
  }catch(e){missionList.innerHTML='<div class="info-box">每日任務讀取失敗。</div>'}
}
async function claimMission(id){try{const r=await api(`/api/missions/${id}/claim`,{method:"POST"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();loadMissions();modal("🎯","任務獎勵",formatReward(r.reward))}catch(e){toast(e.message==="ALREADY_CLAIMED"?"已領取":"尚未完成")}}
async function loadMailbox(){
  if(!CloudAccount.user){mailList.innerHTML='<div class="info-box">使用 LINE 登入後才會啟用冒險信箱。</div>';return}
  try{const data=await api("/api/mail");mailList.innerHTML=data.mail.length?data.mail.map(m=>`<div class="mail-card ${m.claimed_at?"claimed":""}"><div class="mail-icon">${m.claimed_at?"✅":"📨"}</div><div class="mail-content"><b>${escapeHtml(m.title)}</b><small>${escapeHtml(m.body)}</small><small>${m.rewardLabel}</small></div><button class="${m.claimed_at?"secondary":"primary"}" data-claim-mail="${m.id}" ${m.claimed_at?"disabled":""}>${m.claimed_at?"已領取":"領取"}</button></div>`).join(""):'<div class="info-box">目前沒有信件。</div>'}catch(e){mailList.innerHTML='<div class="info-box">信箱讀取失敗。</div>'}
}
async function claimMail(id){try{const r=await api(`/api/mail/${id}/claim`,{method:"POST"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();loadMailbox();modal("📬","已領取信件附件",formatReward(r.reward))}catch(e){toast(e.message==="ALREADY_CLAIMED"?"信件已領取":"領取失敗")}}
document.addEventListener("click",e=>{const m=e.target.closest("[data-claim-mission]");if(m)claimMission(m.dataset.claimMission);const x=e.target.closest("[data-claim-mail]");if(x)claimMail(x.dataset.claimMail)});
async function loadRanking(){try{const r=await api("/api/leaderboard");rankingList.innerHTML=r.rows.map((x,i)=>`<div class="ranking-row ${x.isMe?"me":""}"><div class="rank">${i+1}</div><div class="grow"><b>${escapeHtml(x.displayName)}</b><small style="display:block">關卡 ${x.stageUnlocked}・勝場 ${x.wins}</small></div><strong>${x.power}</strong></div>`).join("")}catch{rankingList.innerHTML='<div class="info-box">排行榜讀取失敗。</div>'}}


// ===== v1.4 skills/equipment/dungeon/event/guild =====
async function upgradeSkill(id){
  if(!CloudAccount.user)return toast("技能升級需要 LINE 登入");
  try{const r=await api(`/api/heroes/${encodeURIComponent(id)}/skill-upgrade`,{method:"POST",body:"{}"});state=r.state;localStorage.setItem("starRealmRpgSave",JSON.stringify(state));renderAll();renderHeroDetail();toast(`技能升級至 ${r.skillLevel}`)}
  catch(e){toast(e.message==="GOLD_NOT_ENOUGH"?"金幣不足":"技能升級失敗："+e.message)}
}
async function enhanceEquipment(id){
  if(!CloudAccount.user)return toast("裝備強化需要 LINE 登入");
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
let announcementPageIndex=1;
const ANNOUNCEMENTS_PER_PAGE=6;
const ANNOUNCEMENT_PREVIEW_LENGTH=180;
const expandedAnnouncements=new Set();
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
function announcementRows(){
  return activeAnnouncements()
    .filter(a=>a.display_location!=="HOME_BAR_ONLY")
    .filter(a=>currentAnnouncementFilter==="ALL"||(a.announcement_type||"NOTICE")===currentAnnouncementFilter);
}
function announcementExcerpt(body){
  const text=String(body||"");
  return text.length>ANNOUNCEMENT_PREVIEW_LENGTH?text.slice(0,ANNOUNCEMENT_PREVIEW_LENGTH).trimEnd()+"…":text;
}
function renderAnnouncementPagination(totalPages){
  if(!window.announcementPagination)return;
  if(totalPages<=1){announcementPagination.innerHTML="";return}
  const buttons=[];
  buttons.push(`<button class="secondary" data-ann-page="${announcementPageIndex-1}" ${announcementPageIndex<=1?"disabled":""}>上一頁</button>`);
  for(let i=1;i<=totalPages;i++)buttons.push(`<button class="secondary ${i===announcementPageIndex?"active":""}" data-ann-page="${i}">${i}</button>`);
  buttons.push(`<button class="secondary" data-ann-page="${announcementPageIndex+1}" ${announcementPageIndex>=totalPages?"disabled":""}>下一頁</button>`);
  announcementPagination.innerHTML=buttons.join("");
}
function renderAnnouncements(){
  if(!window.announcementList)return;
  const rows=announcementRows();
  const totalPages=Math.max(1,Math.ceil(rows.length/ANNOUNCEMENTS_PER_PAGE));
  announcementPageIndex=Math.min(Math.max(1,announcementPageIndex),totalPages);
  const start=(announcementPageIndex-1)*ANNOUNCEMENTS_PER_PAGE;
  const pageRows=rows.slice(start,start+ANNOUNCEMENTS_PER_PAGE);
  announcementList.innerHTML=pageRows.length?pageRows.map(a=>{
    const key=String(a.id||a.title||"");
    const body=String(a.body||"");
    const expandable=body.length>ANNOUNCEMENT_PREVIEW_LENGTH;
    const expanded=expandedAnnouncements.has(key);
    const visibleBody=expanded?body:announcementExcerpt(body);
    return `<article class="announcement-card ${a.pinned?"pinned":""}">${a.image_url?`<img class="announcement-cover" src="${escapeHtml(a.image_url)}" alt="">`:""}<div class="announcement-body"><div class="announcement-meta"><span class="announcement-type">${escapeHtml(a.announcement_type||"NOTICE")}</span>${a.pinned?'<span>📌 置頂</span>':""}<span>${formatAnnouncementDate(a.starts_at||a.created_at)}</span></div><h3>${escapeHtml(a.title)}</h3><p class="announcement-text">${escapeHtml(visibleBody)}</p>${expandable?`<button class="announcement-read-more secondary" data-ann-read="${escapeHtml(key)}">${expanded?"收合內容":"閱讀更多"}</button>`:""}</div></article>`
  }).join(""):'<div class="info-box">目前沒有符合條件的公告。</div>';
  renderAnnouncementPagination(rows.length?totalPages:0);
}
function formatAnnouncementDate(v){if(!v)return"";try{return new Intl.DateTimeFormat("zh-TW",{timeZone:"Asia/Taipei",dateStyle:"medium",timeStyle:"short"}).format(new Date(v))}catch{return v}}
document.addEventListener("click",e=>{
  const filter=e.target.closest("[data-ann-filter]");
  if(filter){currentAnnouncementFilter=filter.dataset.annFilter;announcementPageIndex=1;expandedAnnouncements.clear();document.querySelectorAll("[data-ann-filter]").forEach(x=>x.classList.toggle("active",x===filter));renderAnnouncements();return}
  const page=e.target.closest("[data-ann-page]");
  if(page&&!page.disabled){announcementPageIndex=Number(page.dataset.annPage)||1;expandedAnnouncements.clear();renderAnnouncements();window.scrollTo({top:0,behavior:"smooth"});return}
  const read=e.target.closest("[data-ann-read]");
  if(read){const key=read.dataset.annRead;expandedAnnouncements.has(key)?expandedAnnouncements.delete(key):expandedAnnouncements.add(key);renderAnnouncements();return}
});
loadPublicCatalog();


// v1.8.4 完整非同步競技場
let ARENA_DATA=null,ARENA_RANK_SCOPE='global',ARENA_LOG_PAGE=1,ARENA_LOG_QUERY='',ARENA_LOG_RANGE='all',ARENA_REPLAY_STATE={turns:[],result:'',page:1,pageSize:15,speed:1};
function arenaHeroBadge(id){const h=HEROES.find(x=>x.id===id);return h?`<span class="arena-hero-chip">${h.emoji||"✨"} ${escapeHtml(h.name)}</span>`:`<span class="arena-hero-chip">✨ 未知英雄</span>`}
function arenaRewardCard(type,label,data){const ready=data&&!data.claimed&&data.progress>=data.target;return `<article class="arena-reward-card"><b>${label}</b><small>${data?.progress||0} / ${data?.target||0}</small><p>💎 ${data?.reward?.gems||0}　🪙 ${data?.reward?.arenaCoins||0}</p><button class="secondary" data-arena-reward="${type}" ${ready?'':'disabled'}>${data?.claimed?'已領取':ready?'領取':'尚未達成'}</button></article>`}
async function loadArena(){if(!window.arenaOpponents)return;if(!CloudAccount.user){arenaOpponents.innerHTML='<div class="info-box">星界競技場需要使用 LINE 登入。</div>';return}arenaOpponents.innerHTML='<div class="info-box">正在搜尋對手…</div>';try{ARENA_DATA=await api('/api/arena/status');renderArena();await Promise.all([loadArenaLeaderboard(ARENA_RANK_SCOPE),loadArenaLogs(1)])}catch(e){arenaOpponents.innerHTML=`<div class="info-box">競技場讀取失敗：${escapeHtml(e.message)}</div>`}}
function renderArena(){if(!ARENA_DATA)return;const p=ARENA_DATA.profile||{};arenaTier.textContent=p.tier||'青銅 III';arenaRating.textContent=p.rating||1000;arenaCoins.textContent=p.arenaCoins||0;arenaRemaining.textContent=`${ARENA_DATA.remaining??0} / 5`;arenaWins.textContent=p.wins||0;arenaLosses.textContent=p.losses||0;arenaWinRate.textContent=`${p.winRate||0}%`;arenaHighestTier.textContent=p.highestTier||p.tier||'青銅 III';arenaStreak.textContent=p.currentStreak||0;arenaBestStreak.textContent=p.bestStreak||0;arenaSeason.textContent=p.seasonKey||'SEASON';if(window.arenaFriendCode)arenaFriendCode.textContent=p.friendCode||'尚未建立';arenaDefenseStrategy.value=p.defenseStrategy||'BALANCED';const defense=Array.isArray(p.defenseTeam)&&p.defenseTeam.length?p.defenseTeam:state.team;arenaDefense.innerHTML=defense.map(arenaHeroBadge).join('');const rewards=ARENA_DATA.rewards||{};arenaRewards.innerHTML=arenaRewardCard('daily','每日獎勵',rewards.daily)+arenaRewardCard('weekly','每週獎勵',rewards.weekly)+arenaRewardCard('season','賽季獎勵',rewards.season);const when=ARENA_DATA.nextFreeRefreshAt?formatAnnouncementDate(ARENA_DATA.nextFreeRefreshAt):'現在';arenaRefreshNote.textContent=`免費刷新時間：${when}；冷卻中可花費 ${ARENA_DATA.refreshGemCost||20} 鑽石刷新。`;const opponents=ARENA_DATA.opponents||[];arenaOpponents.innerHTML=opponents.length?opponents.map(o=>`<article class="arena-opponent"><div class="arena-opponent-head"><div><b>${escapeHtml(o.displayName)}</b><small>${escapeHtml(o.tier)}・積分 ${o.rating}・AI ${escapeHtml(o.strategyLabel||'均衡')}</small></div><strong>戰力 ${o.power}</strong></div><div class="arena-team">${(o.team||[]).map(arenaHeroBadge).join('')}</div><button class="primary" data-arena-challenge="${o.id}" ${(ARENA_DATA.remaining||0)<=0?'disabled':''}>挑戰</button></article>`).join(''):'<div class="info-box">目前沒有可挑戰的其他玩家。</div>';const friends=ARENA_DATA.friends||[];arenaFriends.innerHTML=friends.length?friends.map(f=>`<div class="arena-friend-card"><div><b>${escapeHtml(f.display_name||f.displayName||f.id)}</b><small>${escapeHtml(f.friend_code||f.friendCode||'')}</small></div><button class="primary" data-arena-friend="${f.id}">立即切磋</button></div>`).join(''):'<span class="server-note">尚未加入競技好友。</span>'}
async function saveArenaDefenseTeam(){try{const r=await api('/api/arena/defense',{method:'POST',body:JSON.stringify({team:state.team,strategy:arenaDefenseStrategy.value})});ARENA_DATA.profile=r.profile;renderArena();toast('獨立防守隊伍與 AI 策略已儲存')}catch(e){toast('儲存失敗：'+e.message)}}
async function refreshArenaOpponents(){try{let r;try{r=await api('/api/arena/refresh',{method:'POST',body:'{}'})}catch(e){if(e.message!=='ARENA_REFRESH_COOLDOWN'||!confirm(`免費刷新尚未完成，是否花費 ${ARENA_DATA.refreshGemCost||20} 鑽石刷新？`))throw e;r=await api('/api/arena/refresh',{method:'POST',body:JSON.stringify({useGems:true})})}if(r.state){state=r.state;localStorage.setItem('starRealmRpgSave',JSON.stringify(state));renderAll()}await loadArena();toast(r.paid?'已花費鑽石刷新':'已免費刷新')}catch(e){toast(e.message==='GEMS_NOT_ENOUGH'?'鑽石不足':'刷新失敗：'+e.message)}}
async function challengeArena(opponentId){try{const r=await api('/api/arena/challenge',{method:'POST',body:JSON.stringify({opponentId})});state=r.state||state;localStorage.setItem('starRealmRpgSave',JSON.stringify(state));showArenaReplay(r.replay,r.result);modal(r.result==='WIN'?'🏆':'⚔️',r.result==='WIN'?'競技勝利':'挑戰失敗',`競技幣 +${r.arenaCoinsEarned}，積分 ${r.ratingDelta>=0?'+':''}${r.ratingDelta}。`);await loadArena();renderAll()}catch(e){toast(e.message==='ARENA_DAILY_LIMIT'?'今日挑戰次數已用完':'挑戰失敗：'+e.message)}}
function renderArenaReplayPage(){const st=ARENA_REPLAY_STATE,totalPages=Math.max(1,Math.ceil(st.turns.length/st.pageSize));st.page=Math.min(Math.max(1,st.page),totalPages);const start=(st.page-1)*st.pageSize,pageRows=st.turns.slice(start,start+st.pageSize);const rows=pageRows.map(t=>{if(t.action==='RESULT')return `<div class="replay-turn replay-result">最終結果：${t.result==='WIN'?'勝利':'失敗'}・我方存活 ${t.attackerRemaining||0}／防守方存活 ${t.defenderRemaining||0}</div>`;const pct=Math.max(0,Math.round((t.targetHp||0)*100/Math.max(1,t.targetMaxHp||1)));return `<div class="replay-turn ${t.defeated?'replay-defeated':''}"><div class="replay-line"><b>Round ${t.round}</b><span>${t.side==='ATTACKER'?'我方':'防守方'}</span>${arenaHeroBadge(t.actor)}<strong>${t.action==='HEAL'?'治療':t.critical?'暴擊':'攻擊'} ${t.value}</strong>${arenaHeroBadge(t.target)}</div><div class="replay-hp"><i style="width:${pct}%"></i><span>${t.targetHp||0} / ${t.targetMaxHp||0}${t.defeated?'・倒下':''}</span></div></div>`}).join('');arenaReplay.innerHTML=`<div class="section-title"><h3>戰鬥回放・${st.result==='WIN'?'勝利':'失敗'}</h3><button class="text-btn" data-close-replay>關閉</button></div><div class="replay-toolbar"><button class="secondary ${st.speed===1?'active':''}" data-replay-speed="1">1×</button><button class="secondary ${st.speed===2?'active':''}" data-replay-speed="2">2×</button><small>每頁 15 回合；切頁不會重新載入競技場。</small></div>${rows}<div class="arena-pagination"><button class="secondary" data-replay-page="${st.page-1}" ${st.page<=1?'disabled':''}>上一頁</button><span>第 ${st.page} / ${totalPages} 頁</span><button class="secondary" data-replay-page="${st.page+1}" ${st.page>=totalPages?'disabled':''}>下一頁</button></div>`}
function showArenaReplay(turns,result){ARENA_REPLAY_STATE={turns:Array.isArray(turns)?turns:[],result:result||'',page:1,pageSize:15,speed:ARENA_REPLAY_STATE.speed||1};arenaReplay.classList.remove('hidden');renderArenaReplayPage();arenaReplay.scrollIntoView({behavior:'smooth'})}
async function loadArenaReplay(id){try{const r=await api(`/api/arena/replay/${encodeURIComponent(id)}`);showArenaReplay(r.replay,r.result)}catch(e){toast('回放讀取失敗：'+e.message)}}
async function searchArenaFriend(){const q=arenaFriendId.value.trim();if(!q)return toast('請輸入好友代碼或玩家名稱');const btn=window.searchArenaFriend;btn.disabled=true;const old=btn.textContent;btn.textContent='搜尋中…';arenaFriendSearchResults.innerHTML='<div class="info-box">搜尋中…</div>';try{const r=await api(`/api/arena/friend-search?q=${encodeURIComponent(q)}`);arenaFriendSearchResults.innerHTML=(r.rows||[]).length?r.rows.map(x=>`<div class="arena-search-card"><div><b>${escapeHtml(x.displayName)}</b><small>${escapeHtml(x.friendCode)}・${escapeHtml(x.tier)}・積分 ${x.rating}</small></div><button class="secondary" data-add-arena-friend="${x.friendCode}">加入好友</button><button class="primary" data-spar-search="${x.id}">切磋</button></div>`).join(''):'<div class="info-box">找不到玩家，請確認好友代碼或名稱。</div>'}catch(e){arenaFriendSearchResults.innerHTML=`<div class="info-box">搜尋失敗：${escapeHtml(e.message)}</div>`}finally{btn.disabled=false;btn.textContent=old}}
async function addArenaFriend(code){const friendCode=String(code||arenaFriendId.value).trim();if(!friendCode)return toast('請輸入好友代碼');try{await api('/api/arena/friends',{method:'POST',body:JSON.stringify({friendCode})});toast('已互相加入競技好友');arenaFriendSearchResults.innerHTML='';await loadArena()}catch(e){toast(e.message==='PLAYER_NOT_FOUND'?'找不到此玩家':'加入失敗：'+e.message)}}
async function sparArena(target){const id=String(target||'').trim();if(!id)return toast('請從好友列表或搜尋結果選擇玩家');try{const r=await api('/api/arena/spar',{method:'POST',body:JSON.stringify({targetPlayerId:id})});showArenaReplay(r.replay,r.result);toast(r.result==='WIN'?'切磋勝利（不影響積分）':'切磋失敗（不影響積分）');await loadArena()}catch(e){toast('切磋失敗：'+e.message)}}
async function loadArenaLeaderboard(scope='global'){ARENA_RANK_SCOPE=scope;try{const r=await api(`/api/arena/leaderboard?scope=${encodeURIComponent(scope)}`);arenaLeaderboard.innerHTML=(r.rows||[]).length?r.rows.map(x=>`<div class="ranking-row ${x.isMe?'me':''}"><div class="rank">${x.rank}</div><div class="grow"><b>${escapeHtml(x.displayName)}</b><small style="display:block">${escapeHtml(x.tier)}・最高 ${escapeHtml(x.highestTier)}・${x.wins} 勝</small></div><strong>${x.rating}</strong></div>`).join(''):`<div class="info-box">${escapeHtml(r.message||'此排行榜目前沒有資料。')}</div>`}catch(e){arenaLeaderboard.innerHTML='<div class="info-box">排行榜讀取失敗。</div>'}}
function arenaLogRow(x){return `<div class="ranking-row ${x.result==='WIN'?'arena-win':'arena-lose'}"><div class="rank">${x.result==='WIN'?'勝':'敗'}</div><div class="grow"><b>${x.wasDefense?'防守：':'挑戰：'}${escapeHtml(x.opponentName||'未知玩家')}</b><small style="display:block">${formatAnnouncementDate(x.createdAt)}・${x.battleType==='SPAR'?'好友切磋':'積分 '+(x.ratingDelta>=0?'+':'')+x.ratingDelta}</small></div><button class="text-btn ${x.favorite?'active':''}" data-arena-favorite="${x.id}">${x.favorite?'★':'☆'}</button><button class="text-btn" data-arena-replay="${x.id}">回放</button><button class="text-btn danger-text" data-arena-delete="${x.id}">刪除</button></div>`}
async function loadArenaLogs(page=1){ARENA_LOG_PAGE=Math.max(1,Number(page)||1);if(window.arenaLogs)arenaLogs.innerHTML='<div class="info-box">戰鬥紀錄讀取中…</div>';const qs=new URLSearchParams({page:String(ARENA_LOG_PAGE),pageSize:'10',q:ARENA_LOG_QUERY,range:ARENA_LOG_RANGE});try{const r=await api(`/api/arena/logs?${qs.toString()}`);ARENA_LOG_PAGE=r.page||1;arenaLogs.innerHTML=(r.rows||[]).length?r.rows.map(arenaLogRow).join(''):'<div class="info-box">沒有符合條件的戰鬥紀錄。</div>';arenaLogsPagination.innerHTML=`<button class="secondary" data-arena-log-page="${ARENA_LOG_PAGE-1}" ${ARENA_LOG_PAGE<=1?'disabled':''}>上一頁</button><span>第 ${r.page||1} / ${r.totalPages||1} 頁・共 ${r.total||0} 筆</span><button class="secondary" data-arena-log-page="${ARENA_LOG_PAGE+1}" ${ARENA_LOG_PAGE>=(r.totalPages||1)?'disabled':''}>下一頁</button>`}catch(e){arenaLogs.innerHTML=`<div class="info-box">戰鬥紀錄讀取失敗：${escapeHtml(e.message)}</div>`}}
async function toggleArenaFavorite(id){try{await api(`/api/arena/replay/${encodeURIComponent(id)}/favorite`,{method:'POST',body:'{}'});await loadArenaLogs(ARENA_LOG_PAGE)}catch(e){toast('收藏更新失敗：'+e.message)}}
async function deleteArenaReplay(id){if(!confirm('確定刪除這筆戰鬥紀錄與回放？'))return;try{await api(`/api/arena/replay/${encodeURIComponent(id)}`,{method:'DELETE'});toast('已刪除戰鬥紀錄');arenaReplay.classList.add('hidden');await loadArenaLogs(ARENA_LOG_PAGE)}catch(e){toast('刪除失敗：'+e.message)}}
async function claimArenaReward(type){try{const r=await api('/api/arena/rewards',{method:'POST',body:JSON.stringify({type})});state=r.state||state;localStorage.setItem('starRealmRpgSave',JSON.stringify(state));toast(`已領取：鑽石 ${r.reward.gems||0}、競技幣 ${r.reward.arenaCoins||0}`);await loadArena();renderAll()}catch(e){toast('目前尚不可領取')}}
if(window.saveArenaDefense)saveArenaDefense.onclick=saveArenaDefenseTeam;if(window.refreshArena)refreshArena.onclick=refreshArenaOpponents;if(window.searchArenaFriend)searchArenaFriend.onclick=searchArenaFriend;if(window.arenaFriendId)arenaFriendId.onkeydown=e=>{if(e.key==='Enter')searchArenaFriend()};if(window.addArenaFriend)addArenaFriend.onclick=addArenaFriend;if(window.sparArenaFriend)sparArenaFriend.onclick=()=>sparArena('');if(window.copyArenaFriendCode)copyArenaFriendCode.onclick=async()=>{const code=arenaFriendCode.textContent.trim();if(!code||code==='尚未建立')return toast('尚未建立好友代碼');try{await navigator.clipboard.writeText(code);toast('好友代碼已複製')}catch{toast('請長按複製好友代碼')}};if(window.arenaLogSearchBtn)arenaLogSearchBtn.onclick=()=>{ARENA_LOG_QUERY=arenaLogSearch.value.trim();loadArenaLogs(1)};if(window.arenaLogSearch)arenaLogSearch.onkeydown=e=>{if(e.key==='Enter'){ARENA_LOG_QUERY=arenaLogSearch.value.trim();loadArenaLogs(1)}};if(window.arenaLogRange)arenaLogRange.onchange=()=>{ARENA_LOG_RANGE=arenaLogRange.value;loadArenaLogs(1)};
document.addEventListener('click',e=>{const c=e.target.closest('[data-arena-challenge]');if(c){challengeArena(c.dataset.arenaChallenge);return}const rp=e.target.closest('[data-arena-replay]');if(rp){loadArenaReplay(rp.dataset.arenaReplay);return}const fr=e.target.closest('[data-arena-friend]');if(fr){sparArena(fr.dataset.arenaFriend);return}const add=e.target.closest('[data-add-arena-friend]');if(add){addArenaFriend(add.dataset.addArenaFriend);return}const ss=e.target.closest('[data-spar-search]');if(ss){sparArena(ss.dataset.sparSearch);return}const rank=e.target.closest('[data-arena-rank]');if(rank){document.querySelectorAll('[data-arena-rank]').forEach(x=>x.classList.toggle('active',x===rank));loadArenaLeaderboard(rank.dataset.arenaRank);return}const reward=e.target.closest('[data-arena-reward]');if(reward){claimArenaReward(reward.dataset.arenaReward);return}const lp=e.target.closest('[data-arena-log-page]');if(lp&&!lp.disabled){loadArenaLogs(lp.dataset.arenaLogPage);return}const fp=e.target.closest('[data-arena-favorite]');if(fp){toggleArenaFavorite(fp.dataset.arenaFavorite);return}const del=e.target.closest('[data-arena-delete]');if(del){deleteArenaReplay(del.dataset.arenaDelete);return}const rpg=e.target.closest('[data-replay-page]');if(rpg&&!rpg.disabled){ARENA_REPLAY_STATE.page=Number(rpg.dataset.replayPage)||1;renderArenaReplayPage();return}const speedBtn=e.target.closest('[data-replay-speed]');if(speedBtn){ARENA_REPLAY_STATE.speed=Number(speedBtn.dataset.replaySpeed)||1;renderArenaReplayPage();return}if(e.target.closest('[data-close-replay]'))arenaReplay.classList.add('hidden')});
