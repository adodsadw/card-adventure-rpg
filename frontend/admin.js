const $=s=>document.querySelector(s);async function call(path,opt={}){const r=await fetch(path,{credentials:"same-origin",headers:{"Content-Type":"application/json"},...opt});const d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.message||d.error);return d}
function note(t){adminToast.textContent=t;adminToast.classList.add("show");setTimeout(()=>adminToast.classList.remove("show"),1800)}
async function boot(){try{await call("/api/admin/me");loginPanel.classList.add("hidden");adminApp.classList.remove("hidden");load()}catch{}}
adminLogin.onclick=async()=>{try{await call("/api/admin/login",{method:"POST",body:JSON.stringify({password:adminPassword.value})});loginPanel.classList.add("hidden");adminApp.classList.remove("hidden");load()}catch(e){note("登入失敗")}}
async function load(){const r=await call("/api/admin/players");playerRows.innerHTML=r.players.map(p=>`<tr><td><b>${p.display_name}</b><small style="display:block">${p.id}</small></td><td>${p.gold}</td><td>${p.gems}</td><td>${p.energy}/${p.max_energy}</td><td>${p.stage_unlocked}</td><td>${p.suspended?`<span style="color:#ff9aaa">停權至 ${p.suspended_until||"永久"}</span>`:"正常"}</td><td><button class="secondary" data-player="${p.id}">選擇</button></td></tr>`).join("");const l=await call("/api/admin/logs");adminLogs.innerHTML=l.logs.map(x=>`<p><b>${x.action}</b>｜${x.reason||""}｜${x.created_at}</p>`).join("")}
document.addEventListener("click",e=>{const b=e.target.closest("[data-player]");if(b){targetPlayer.value=b.dataset.player;mailTarget.value=b.dataset.player;suspendPlayer.value=b.dataset.player;deletePlayer.value=b.dataset.player;note("已選擇玩家")}})
refreshPlayers.onclick=load;
submitAdjust.onclick=async()=>{try{await call("/api/admin/resources",{method:"POST",body:JSON.stringify({playerId:targetPlayer.value,gold:Number(deltaGold.value||0),gems:Number(deltaGems.value||0),energy:Number(deltaEnergy.value||0),reason:adjustReason.value})});note("資源調整完成");load()}catch(e){note(e.message)}}
sendMail.onclick=async()=>{try{await call("/api/admin/mail",{method:"POST",body:JSON.stringify({playerId:mailTarget.value||null,title:mailTitle.value,body:mailBody.value,reward:{gold:Number(mailGold.value||0),gems:Number(mailGems.value||0),energy:Number(mailEnergy.value||0)}})});note("信件已寄送");load()}catch(e){note(e.message)}}
boot();
adminLogout.onclick=async()=>{try{await call("/api/admin/logout",{method:"POST",body:"{}"})}catch{}adminApp.classList.add("hidden");loginPanel.classList.remove("hidden");adminPassword.value="";note("已安全登出管理後台")};

submitSuspend.onclick=async()=>{
  try{
    await call("/api/admin/suspend",{method:"POST",body:JSON.stringify({
      playerId:suspendPlayer.value,
      until:suspendUntil.value?new Date(suspendUntil.value).toISOString():null,
      reason:suspendReason.value
    })});
    note("玩家已停權");load();
  }catch(e){note(e.message)}
};
submitUnsuspend.onclick=async()=>{
  try{
    await call("/api/admin/unsuspend",{method:"POST",body:JSON.stringify({playerId:suspendPlayer.value})});
    note("已解除停權");load();
  }catch(e){note(e.message)}
};
submitDelete.onclick=async()=>{
  if(deleteConfirm.value!=="DELETE") return note("請輸入 DELETE 確認");
  if(!confirm("確定要永久刪除這位玩家的所有資料嗎？")) return;
  try{
    await call("/api/admin/player/delete",{method:"POST",body:JSON.stringify({
      playerId:deletePlayer.value,
      reason:deleteReason.value,
      confirmation:deleteConfirm.value
    })});
    note("玩家資料已刪除");
    targetPlayer.value=mailTarget.value=suspendPlayer.value=deletePlayer.value="";
    deleteConfirm.value="";
    load();
  }catch(e){note(e.message)}
};

const GM_SCHEMAS={
heroes:{title:"英雄管理",endpoint:"heroes",fields:[["id","英雄 ID","text","唯一英文代號"],["name","英雄名稱","text","玩家顯示名稱"],["rarity","稀有度","text","稀有／史詩／傳說"],["element","屬性","text","火、水、光、暗"],["hero_class","職業","text","戰士、法師、守衛"],["description","英雄介紹","textarea","建議 30～120 字"],["image_url","英雄圖片","media","建議 512×512 PNG/WebP、透明背景、500KB 以下"],["base_hp","初始生命","number","Lv.1 基礎生命"],["base_atk","初始攻擊","number","Lv.1 基礎攻擊"],["base_def","初始防禦","number","Lv.1 基礎防禦"],["upgrade_base_cost","升級基礎金幣","number","升級費用基準"],["upgrade_multiplier","升級倍率","number","例如 1.2"],["max_level","最高等級","number","建議 100"],["active","上架","checkbox","是否可取得"]]},
skills:{title:"技能管理",endpoint:"skills",fields:[["id","技能 ID","text","唯一英文代號"],["hero_id","英雄 ID","text","所屬英雄"],["name","技能名稱","text","玩家顯示名稱"],["description","技能描述","textarea","效果說明"],["icon_url","技能圖示","media","256×256 PNG/WebP、300KB 以下"],["base_multiplier","基礎倍率","number","1.5 代表 150%"],["level_growth","每級成長","number","例如 0.1"],["upgrade_base_cost","升級基礎金幣","number","由伺服器計算"],["max_level","最高等級","number","建議 20"],["active","啟用","checkbox","是否生效"]]},
equipment:{title:"裝備管理",endpoint:"equipment",fields:[["id","裝備 ID","text","唯一英文代號"],["name","裝備名稱","text","玩家顯示名稱"],["slot","欄位","text","weapon／armor／accessory"],["rarity","品質","text","普通至傳說"],["description","描述","textarea","裝備用途"],["image_url","裝備圖片","media","256×256 PNG/WebP、300KB 以下"],["base_atk","基礎攻擊","number","未強化加成"],["base_hp","基礎生命","number","未強化加成"],["base_def","基礎防禦","number","未強化加成"],["max_enhance","最高強化","number","例如 20"],["max_refine","最高精煉","number","例如 5"],["enhance_gold_base","強化基礎金幣","number","伺服器公式"],["dismantle_json","分解獎勵 JSON","textarea",'{"ore":2,"wood":2}'],["active","啟用","checkbox","是否生效"]]},
items:{title:"道具管理",endpoint:"items",fields:[["id","道具 ID","text","唯一英文代號"],["name","道具名稱","text","玩家顯示名稱"],["category","分類","text","material／consumable"],["description","描述","textarea","用途與效果"],["image_url","道具圖片","media","128×128 PNG/WebP、200KB 以下"],["stack_limit","堆疊上限","number","建議 999"],["usable","可使用","checkbox","顯示使用按鈕"],["effect_json","效果 JSON","textarea",'{"energy":10}'],["active","啟用","checkbox","是否顯示"]]},
shop:{title:"商城管理",endpoint:"shop-products",fields:[["id","商品 ID","text","唯一英文代號"],["name","商品名稱","text","商城顯示"],["item_id","對應內容 ID","text","道具或裝備 ID"],["image_url","商品圖片","media","512×512 PNG/WebP、500KB 以下"],["currency","貨幣","text","gold 或 gems"],["price","價格","number","伺服器扣除"],["daily_limit","每日限購","number","0 不限"],["weekly_limit","每週限購","number","0 不限"],["lifetime_limit","永久限購","number","0 不限"],["starts_at","開始時間","datetime-local","留空立即"],["ends_at","結束時間","datetime-local","留空永久"],["active","上架","checkbox","是否顯示"]]},
dungeons:{title:"副本管理",endpoint:"dungeons",fields:[["id","副本 ID","text","唯一英文代號"],["name","副本名稱","text","玩家顯示"],["description","描述","textarea","掉落與玩法"],["image_url","副本圖片","media","1280×720 JPG/WebP、1MB 以下"],["energy_cost","體力消耗","number","每次扣除"],["daily_limit","每日次數","number","0 不限"],["reward_json","獎勵 JSON","textarea",'{"gold":1800}'],["starts_at","開始時間","datetime-local","留空立即"],["ends_at","結束時間","datetime-local","留空永久"],["active","啟用","checkbox","是否開放"]]},
events:{title:"活動管理",endpoint:"events",fields:[["id","活動 ID","text","唯一英文代號"],["name","活動名稱","text","玩家顯示"],["description","描述","textarea","活動規則"],["banner_url","活動 Banner","media","1920×1080 JPG/WebP、2MB 以下"],["starts_at","開始時間","datetime-local","活動期間"],["ends_at","結束時間","datetime-local","活動期間"],["config_json","設定 JSON","textarea","關卡與掉落"],["active","啟用","checkbox","是否開放"]]},
loginRewards:{title:"登入獎勵",endpoint:"login-rewards",fields:[["id","規則 ID","text","唯一代號"],["campaign_key","活動代號","text","同一月曆相同"],["day_index","第幾天","number","1～30"],["reward_json","獎勵 JSON","textarea",'{"gems":100}'],["icon_url","獎勵圖片","media","256×256 PNG/WebP"],["active","啟用","checkbox","是否可領"]]},
announcements:{title:"公告系統",endpoint:"announcements",fields:[["id","公告 ID","text","唯一代號"],["title","標題","text","首頁顯示"],["body","內容","textarea","更新內容"],["announcement_type","公告類型","text","NOTICE／UPDATE／EVENT／MAINTENANCE"],["display_location","顯示位置","text","HOME_AND_CENTER／CENTER_ONLY／HOME_BAR_ONLY"],["image_url","公告圖片","media","1200×630 JPG/WebP、1MB 以下"],["starts_at","開始時間","datetime-local","留空立即"],["ends_at","結束時間","datetime-local","留空永久"],["priority","優先順序","number","越大越前"],["pinned","置頂","checkbox","置頂顯示"],["active","啟用","checkbox","是否顯示"]]},
banners:{title:"首頁 Banner",endpoint:"banners",fields:[["id","Banner ID","text","唯一代號"],["title","標題","text","Banner 標題"],["subtitle","副標題","text","簡短說明"],["image_url","圖片","media","1920×720 JPG/WebP、2MB 以下"],["link_target","點擊目標","text","例如 shopPage"],["starts_at","開始時間","datetime-local","留空立即"],["ends_at","結束時間","datetime-local","留空永久"],["sort_order","排序","number","越小越前"],["active","啟用","checkbox","是否顯示"]]}}
let currentGmTab="players";
gmTabs.onclick=e=>{const b=e.target.closest('[data-gm-tab]');if(!b)return;document.querySelectorAll('[data-gm-tab]').forEach(x=>x.classList.toggle('active',x===b));currentGmTab=b.dataset.gmTab;if(currentGmTab==='players'){gmWorkspace.classList.add('hidden');legacyAdminPanels.classList.remove('hidden')}else{legacyAdminPanels.classList.add('hidden');gmWorkspace.classList.remove('hidden');renderGmModule(currentGmTab)}};
async function renderGmModule(key){const s=GM_SCHEMAS[key],r=await call(`/api/admin/catalog/${s.endpoint}`);gmWorkspace.innerHTML=`<div style="display:flex;justify-content:space-between"><h2>${s.title}</h2><div class="gm-actions"><button class="secondary" id="gmSyncDefaults">補齊程式預設資料</button><button class="primary" id="gmNew">新增</button></div></div><div id="gmEditor"></div><div class="gm-list">${r.rows.map(x=>gmRow(key,x)).join('')||'<div class="info-box">目前沒有資料</div>'}</div>`;gmNew.onclick=()=>renderGmEditor(key,{});
 if(window.gmSyncDefaults) gmSyncDefaults.onclick=async()=>{try{const x=await call("/api/admin/catalog/sync-defaults",{method:"POST",body:"{}"});note(`已補齊 ${x.inserted||0} 筆預設資料`);renderGmModule(key)}catch(e){note(e.message)}};gmWorkspace.onclick=async e=>{const ed=e.target.closest('[data-gm-edit]');if(ed)renderGmEditor(key,r.rows.find(x=>x.id===ed.dataset.gmEdit));const del=e.target.closest('[data-gm-delete]');if(del&&confirm('確定刪除？')){await call(`/api/admin/catalog/${s.endpoint}/${encodeURIComponent(del.dataset.gmDelete)}`,{method:'DELETE'});renderGmModule(key)}}}
function gmRow(k,x){const img=x.image_url||x.icon_url||x.banner_url||'';return `<div class="gm-row">${img?`<img class="gm-media-preview" src="${img}">`:'<div class="gm-media-preview"></div>'}<div class="grow"><b>${x.name||x.title||x.id}</b><small style="display:block">${x.description||x.subtitle||x.id}</small></div><div class="gm-actions"><button class="secondary" data-gm-edit="${x.id}">修改</button><button class="admin-danger" data-gm-delete="${x.id}">刪除</button></div></div>`}
function renderGmEditor(k,row){const s=GM_SCHEMAS[k];gmEditor.innerHTML=`<div class="admin-panel"><h3>${row.id?'修改':'新增'}</h3><div class="gm-form">${s.fields.map(f=>gmField(f,row[f[0]])).join('')}<div class="full gm-actions"><button class="primary" id="gmSave">儲存</button><button class="secondary" id="gmCancel">取消</button></div></div></div>`;gmCancel.onclick=()=>gmEditor.innerHTML='';gmSave.onclick=async()=>{const d={};for(const [n,,t] of s.fields){const el=document.querySelector(`[name="${n}"]`);d[n]=t==='checkbox'?el.checked:t==='number'?Number(el.value||0):el.value}await call(`/api/admin/catalog/${s.endpoint}`,{method:'POST',body:JSON.stringify(d)});note('已儲存');renderGmModule(k)};document.querySelectorAll('[data-upload-for]').forEach(b=>b.onclick=()=>uploadMedia(b.dataset.uploadFor))}
function gmField(f,v){const[n,l,t,h]=f;if(t==='datetime-local'&&v)v=String(v).replace('Z','').slice(0,16);let i=t==='textarea'?`<textarea name="${n}" rows="4">${v??''}</textarea>`:t==='checkbox'?`<input name="${n}" type="checkbox" ${v?'checked':''}>`:t==='media'?`<div style="display:flex;gap:8px"><input name="${n}" value="${v??''}" placeholder="R2 圖片 URL"><button type="button" class="secondary" data-upload-for="${n}">上傳</button></div>`:`<input name="${n}" type="${t}" value="${v??''}">`;return `<label class="${t==='textarea'||t==='media'?'full':''}"><b>${l}</b>${i}<small class="gm-help">${h}</small></label>`}
async function uploadMedia(field){const i=document.createElement('input');i.type='file';i.accept='image/png,image/jpeg,image/webp';i.onchange=async()=>{const f=i.files[0],fd=new FormData();fd.append('file',f);const r=await fetch('/api/admin/media/upload',{method:'POST',credentials:'same-origin',body:fd}),d=await r.json();if(!r.ok)return note(d.message||'上傳失敗');document.querySelector(`[name="${field}"]`).value=d.url;note('已上傳')};i.click()}
