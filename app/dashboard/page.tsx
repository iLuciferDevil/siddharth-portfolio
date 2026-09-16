import fs from 'node:fs';
import path from 'node:path';
import { ArrowUpRight, Search, Sparkles, Target, TrendingUp, Users, MousePointerClick, Download, CalendarCheck } from 'lucide-react';
import './dashboard.css';

export const metadata = { title: 'Private Search & Funnel Dashboard | Siddharth Bhattacharjee', description: 'Private SEO, AEO, GEO and full-funnel performance dashboard.', robots: { index: false, follow: false, nocache: true } };
export const dynamic = 'force-dynamic';

type FunnelItem = { label: string; value: number | null; rate?: number | null };
type DashboardData = {
 updatedAt:string|null; status:string; site:string;
 baseline:{window:string;clicks:number|null;impressions:number|null;ctr:number|null;position:number|null};
 current:{period:string|null;clicks:number|null;impressions:number|null;ctr:number|null;position:number|null;nonBrandedClicks:number|null;nonBrandedImpressions:number|null;aiFeatureImpressions:number|null;aiCitations:number|null;citedPages:number|null};
 change:{clicks:number|null;impressions:number|null;ctr:number|null;position:number|null};
 funnel:{period:string|null;users:number|null;newUsers:number|null;returningUsers:number|null;sessions:number|null;engagedSessions:number|null;engagementRate:number|null;organicSessions:number|null;aiSessions:number|null;resourceViews:number|null;resourceDownloads:number|null;resourceLeads:number|null;consultingEnquiries:number|null;bookingStarts:number|null;bookingCompletions:number|null;bookClicks:number|null;conversionRate:number|null;topSources:{source:string;sessions:number|null;conversions?:number|null}[];topLandingPages:{path:string;sessions:number|null;engagementRate?:number|null}[];devices:{device:string;users:number|null;share?:number|null}[];countries:{country:string;users:number|null;share?:number|null}[];newVsReturning:{new:number|null;returning:number|null};notes?:string};
 queries:{query:string;clicks:number|null;impressions:number|null;position:number|null;change?:number|null}[];
 pages:{path:string;clicks:number|null;impressions:number|null;position:number|null;change?:number|null}[];
 ai:{groundingQueries:{query:string;citations?:number|null}[];citedPages:{path:string;citations?:number|null}[];notes?:string};
 opportunities:{title:string;detail:string;type?:string}[]; goals:{label:string;target:string;cluster:string}[];
};
function readData(){const file=path.join(process.cwd(),'public','data','search-dashboard.json');return JSON.parse(fs.readFileSync(file,'utf8')) as DashboardData;}
function n(v:number|null,s=''){return v===null?'Awaiting data':`${v.toLocaleString()}${s}`;}
function p(v:number|null){return v===null?'Awaiting data':`${v.toFixed(1)}%`;}
function pos(v:number|null){return v===null?'Awaiting data':v.toFixed(1);}
function Funnel({items}:{items:FunnelItem[]}){return <div className="funnel">{items.map((x,i)=><div className="funnel-step" key={x.label}><div className="funnel-bar" style={{width:`${Math.max(12,100-i*13)}%`}}><span>{x.label}</span><strong>{n(x.value)}</strong></div>{x.rate!==undefined&&x.rate!==null&&<small>{x.rate.toFixed(1)}% of previous stage</small>}</div>)}</div>}

export default function Dashboard(){
 const d=readData();
 const fresh=d.updatedAt?new Date(d.updatedAt).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}):'Not synced yet';
 const c=[
  {label:'Organic clicks',value:n(d.current.clicks),change:d.change.clicks===null?'Awaiting data':`${d.change.clicks>0?'+':''}${d.change.clicks.toFixed(1)}%`,icon:Search},
  {label:'Search impressions',value:n(d.current.impressions),change:d.change.impressions===null?'Awaiting data':`${d.change.impressions>0?'+':''}${d.change.impressions.toFixed(1)}%`,icon:TrendingUp},
  {label:'People / users',value:n(d.funnel.users),change:d.funnel.newUsers===null?'Awaiting data':`${n(d.funnel.newUsers)} new`,icon:Users},
  {label:'AI citations',value:n(d.current.aiCitations),change:d.current.citedPages===null?'Awaiting data':`${n(d.current.citedPages)} cited pages`,icon:Sparkles},
 ];
 return <main className="dashboard-page"><div className="dashboard-shell">
  <header className="dashboard-header"><div><div className="dashboard-kicker">Private growth intelligence</div><h1>How people find you, what they do, and where the funnel leaks.</h1><p>SEO, AEO, GEO and the measurable journey from discovery to resource lead or consulting enquiry.</p></div><div className="dashboard-status"><span className={d.status==='awaiting-first-sync'?'status-dot pending':'status-dot'}/><span>Last sync: {fresh}</span></div></header>
  <section className="dashboard-cards">{c.map(x=>{const I=x.icon;return <article className="dashboard-card" key={x.label}><div className="card-icon"><I size={18}/></div><div className="card-label">{x.label}</div><div className="card-value">{x.value}</div><div className="card-change">{x.change}</div></article>})}</section>

  <section className="dashboard-panel funnel-panel"><div className="panel-head"><div><div className="panel-kicker">FULL FUNNEL</div><h2>From search to commercial intent</h2></div><span>{d.funnel.period||'Awaiting first analytics sync'}</span></div>
   <Funnel items={[
    {label:'Users',value:d.funnel.users},
    {label:'Engaged sessions',value:d.funnel.engagedSessions,rate:d.funnel.engagementRate},
    {label:'Organic sessions',value:d.funnel.organicSessions},
    {label:'Resource views',value:d.funnel.resourceViews},
    {label:'Resource downloads',value:d.funnel.resourceDownloads},
    {label:'Resource leads',value:d.funnel.resourceLeads},
    {label:'Consulting enquiries',value:d.funnel.consultingEnquiries},
    {label:'Booking completions',value:d.funnel.bookingCompletions},
   ]}/>
   <p className="panel-note">The funnel is designed around the site's actual commercial journey. Individual names, emails, IP addresses and other personally identifiable browsing records are intentionally excluded.</p>
  </section>

  <section className="dashboard-grid">
   <article className="dashboard-panel"><div className="panel-kicker">ACQUISITION</div><h2>Traffic mix</h2><div className="mini-metrics"><div><span>Total sessions</span><strong>{n(d.funnel.sessions)}</strong></div><div><span>Organic</span><strong>{n(d.funnel.organicSessions)}</strong></div><div><span>AI referred</span><strong>{n(d.funnel.aiSessions)}</strong></div><div><span>Engagement</span><strong>{p(d.funnel.engagementRate)}</strong></div></div><div className="subhead">Top sources</div><div className="rank-list">{d.funnel.topSources.length?d.funnel.topSources.slice(0,7).map(s=><div className="rank-row" key={s.source}><div><strong>{s.source}</strong><span>{n(s.sessions)} sessions</span></div><b>{s.conversions===null||s.conversions===undefined?'':n(s.conversions)}</b></div>):<div className="empty">Source data will appear after the first GA4 sync.</div>}</div></article>
   <article className="dashboard-panel"><div className="panel-kicker">AUDIENCE</div><h2>Who is visiting</h2><div className="audience-stats"><div><span>New users</span><strong>{n(d.funnel.newUsers)}</strong></div><div><span>Returning</span><strong>{n(d.funnel.returningUsers)}</strong></div></div><div className="subhead">Devices</div><div className="rank-list">{d.funnel.devices.length?d.funnel.devices.slice(0,5).map(x=><div className="rank-row" key={x.device}><div><strong>{x.device}</strong></div><b>{p(x.share??null)}</b></div>):<div className="empty">Device data will appear after the first sync.</div>}</div><div className="subhead">Countries</div><div className="rank-list">{d.funnel.countries.length?d.funnel.countries.slice(0,5).map(x=><div className="rank-row" key={x.country}><div><strong>{x.country}</strong></div><b>{p(x.share??null)}</b></div>):<div className="empty">Country data will appear after the first sync.</div>}</div></article>
   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">LANDING PAGES</div><h2>Where visitors enter</h2></div></div><div className="rank-list">{d.funnel.topLandingPages.length?d.funnel.topLandingPages.slice(0,10).map(x=><div className="rank-row" key={x.path}><div><strong>{x.path}</strong><span>{n(x.sessions)} sessions · {p(x.engagementRate??null)} engaged</span></div></div>):<div className="empty">Landing-page data will appear after the first sync.</div>}</div></article>
   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">COMMERCIAL INTENT</div><h2>Actions that matter</h2></div></div><div className="intent-grid"><div><MousePointerClick size={18}/><span>Book clicks</span><strong>{n(d.funnel.bookClicks)}</strong></div><div><Download size={18}/><span>Resource downloads</span><strong>{n(d.funnel.resourceDownloads)}</strong></div><div><CalendarCheck size={18}/><span>Booking completions</span><strong>{n(d.funnel.bookingCompletions)}</strong></div><div><Target size={18}/><span>Overall conversion</span><strong>{p(d.funnel.conversionRate)}</strong></div></div></article>
   <article className="dashboard-panel"><div className="panel-kicker">SEO</div><h2>Search performance</h2><div className="mini-metrics"><div><span>Non-branded clicks</span><strong>{n(d.current.nonBrandedClicks)}</strong></div><div><span>Non-branded impressions</span><strong>{n(d.current.nonBrandedImpressions)}</strong></div><div><span>CTR</span><strong>{d.current.ctr===null?'Awaiting data':`${d.current.ctr.toFixed(2)}%`}</strong></div><div><span>Position</span><strong>{pos(d.current.position)}</strong></div></div></article>
   <article className="dashboard-panel"><div className="panel-kicker">AEO / GEO</div><h2>AI visibility</h2><div className="ai-stat"><strong>{n(d.current.aiCitations)}</strong><span>AI citations</span></div><div className="ai-stat"><strong>{n(d.current.citedPages)}</strong><span>Cited pages</span></div><p className="panel-note">{d.ai.notes||'AI-search signals will appear when source data is available.'}</p></article>
   <article className="dashboard-panel"><div className="panel-kicker">SEARCH DEMAND</div><h2>Queries to watch</h2><div className="rank-list">{d.queries.length?d.queries.slice(0,8).map(q=><div className="rank-row" key={q.query}><div><strong>{q.query}</strong><span>{n(q.impressions)} impressions · {n(q.clicks)} clicks</span></div><b>{pos(q.position)}</b></div>):<div className="empty">The first sync will populate search queries.</div>}</div></article>
   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">CONTENT</div><h2>Pages creating search equity</h2></div><a href="/blog">Writing <ArrowUpRight size={15}/></a></div><div className="rank-list">{d.pages.length?d.pages.slice(0,10).map(x=><div className="rank-row" key={x.path}><div><strong>{x.path}</strong><span>{n(x.clicks)} clicks · {n(x.impressions)} impressions</span></div><b>{pos(x.position)}</b></div>):<div className="empty">Page data will appear after the first sync.</div>}</div></article>
   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">OPPORTUNITIES</div><h2>What we should do next</h2></div></div><div className="opportunity-list">{d.opportunities.length?d.opportunities.slice(0,5).map((o,i)=><div className="opportunity" key={`${o.title}-${i}`}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{o.title}</strong><p>{o.detail}</p></div></div>):<div className="empty">The dashboard will turn actual search and funnel data into specific actions.</div>}</div></article>
   <article className="dashboard-panel"><div className="panel-kicker">TARGETS</div><h2>90-day operating goals</h2><div className="goal-list">{d.goals.map(g=><div className="goal" key={g.label}><span>{g.cluster}</span><strong>{g.label}</strong><p>{g.target}</p></div>)}</div></article>
  </section>
  <footer className="dashboard-footer"><span>Private, noindex, no-cache. Dashboard traffic is excluded from site analytics.</span><a href="/">Back to site</a></footer>
 </div></main>;
}
