const ADMIN_APP_VERSION="1.8.5";

function adminNumber(value){return new Intl.NumberFormat("zh-TW").format(Number(value||0))}
function adminDate(value){if(!value)return null;const d=new Date(value);return Number.isNaN(d.getTime())?null:d}
function isSameTaipeiDay(value){const d=adminDate(value);if(!d)return false;const fmt=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Taipei",year:"numeric",month:"2-digit",day:"2-digit"});return fmt.format(d)===fmt.format(new Date())}
function withinDays(value,days){const d=adminDate(value);return !!d&&(Date.now()-d.getTime())<=days*86400000}

async function renderAdminDashboard(){
  gmWorkspace.innerHTML='<div class="info-box">正在讀取營運總覽…</div>';
  try{
    const [playersResponse,logsResponse,healthResponse]=await Promise.all([
      call('/api/admin/players'),
      call('/api/admin/logs'),
      fetch('/api/health',{credentials:'same-origin'}).then(r=>r.json()).catch(()=>({version:ADMIN_APP_VERSION}))
    ]);
    const players=playersResponse.players||[];
    const logs=logsResponse.logs||[];
    const total=players.length;
    const todayActive=players.filter(p=>isSameTaipeiDay(p.last_login_at)).length;
    const active7=players.filter(p=>withinDays(p.last_login_at,7)).length;
    const suspended=players.filter(p=>p.suspended).length;
    const avgStage=total?Math.round(players.reduce((n,p)=>n+Number(p.stage_unlocked||0),0)*10/total)/10:0;
    const totalGold=players.reduce((n,p)=>n+Number(p.gold||0),0);
    const totalGems=players.reduce((n,p)=>n+Number(p.gems||0),0);
    const serverVersion=healthResponse.version||ADMIN_APP_VERSION;
    gmWorkspace.innerHTML=`
      <div class="dashboard-head"><div><h2>營運總覽</h2><p class="server-note">資料來自目前正式 D1；重新整理此頁籤即可取得最新狀態。</p></div><button class="secondary" id="dashboardRefresh">重新整理</button></div>
      <div class="dashboard-kpis">
        <article class="dashboard-kpi"><small>玩家總數</small><b>${adminNumber(total)}</b><span>目前資料庫帳號</span></article>
        <article class="dashboard-kpi"><small>今日登入</small><b>${adminNumber(todayActive)}</b><span>台灣時間今日</span></article>
        <article class="dashboard-kpi"><small>近 7 日活躍</small><b>${adminNumber(active7)}</b><span>${total?Math.round(active7*100/total):0}% 玩家</span></article>
        <article class="dashboard-kpi"><small>停權玩家</small><b>${adminNumber(suspended)}</b><span>目前有效停權</span></article>
        <article class="dashboard-kpi"><small>平均關卡</small><b>${avgStage}</b><span>所有玩家平均</span></article>
        <article class="dashboard-kpi"><small>伺服器版本</small><b>v${serverVersion}</b><span>後台介面 v${ADMIN_APP_VERSION}</span></article>
      </div>
      <div class="dashboard-columns">
        <section class="admin-panel"><h3>全服資源概況</h3><div class="dashboard-resource"><span>🪙 金幣總量</span><b>${adminNumber(totalGold)}</b></div><div class="dashboard-resource"><span>💎 鑽石總量</span><b>${adminNumber(totalGems)}</b></div><p class="server-note">此區僅統計 `/api/admin/players` 回傳的玩家資料，不會修改任何資源。</p></section>
        <section class="admin-panel"><h3>最近管理操作</h3><div class="dashboard-log-list">${logs.slice(0,8).map(x=>`<div class="dashboard-log"><b>${x.action||'UNKNOWN'}</b><small>${x.reason||'無備註'}・${x.created_at||''}</small></div>`).join('')||'<div class="info-box">尚無管理紀錄。</div>'}</div></section>
      </div>`;
    dashboardRefresh.onclick=renderAdminDashboard;
  }catch(e){gmWorkspace.innerHTML=`<div class="info-box">營運總覽讀取失敗：${String(e.message||e)}</div>`}
}

const adminDashboardTabsHandler=gmTabs.onclick;
gmTabs.onclick=e=>{
  const button=e.target.closest('[data-gm-tab]');
  if(!button)return;
  if(button.dataset.gmTab!=='dashboard'){adminDashboardTabsHandler(e);return}
  document.querySelectorAll('[data-gm-tab]').forEach(x=>x.classList.toggle('active',x===button));
  currentGmTab='dashboard';
  legacyAdminPanels.classList.add('hidden');
  gmWorkspace.classList.remove('hidden');
  renderAdminDashboard();
};
