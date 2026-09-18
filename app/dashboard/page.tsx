import fs from 'node:fs';
import path from 'node:path';
import { ArrowUpRight, Search, Sparkles, Target, TrendingUp, Users, MousePointerClick, Download, CalendarCheck, Clock3, Globe2, Smartphone, UserRoundCheck } from 'lucide-react';
import './dashboard.css';

export const metadata = { title: 'Private Search & Funnel Dashboard | Siddharth Bhattacharjee', description: 'Private SEO, AEO, GEO and full-funnel performance dashboard.', robots: { index: false, follow: false, nocache: true } };
export const dynamic = 'force-dynamic';

type FunnelItem = { label: string; value: number | null; rate?: number | null };
type Snapshot = {
  period: string;
  clicks: number|null; impressions: number|null; ctr: number|null; position: number|null;
  nonBrandedClicks: number|null; nonBrandedImpressions: number|null; aiFeatureImpressions: number|null; aiCitations: number|null; citedPages: number|null;
  users: number|null; newUsers: number|null; returningUsers: number|null; sessions: number|null; engagedSessions: number|null; engagementRate: number|null;
  organicSessions: number|null; aiSessions: number|null; resourceViews: number|null; resourceDownloads: number|null; resourceLeads: number|null; consultingEnquiries: number|null;
  bookingStarts: number|null; bookingCompletions: number|null; bookClicks: number|null; conversionRate: number|null;
  topSources?: {source:string;sessions:number|null;conversions?:number|null}[]|null;
  topLandingPages?: {page:string;sessions:number|null;engagementRate?:number|null}[]|null;
  devices?: {device:string;users:number|null;sessions?:number|null;share?:number|null}[]|null;
  countries?: {country:string;users:number|null;sessions?:number|null;share?:number|null}[]|null;
  queries?: {query:string;clicks:number|null;impressions:number|null;position:number|null;change?:number|null}[];
  pages?: {page:string;clicks:number|null;impressions:number|null;position:number|null;change?:number|null}[];
};
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
 periods?:Record<string, Snapshot>;
};
function readData(){const file=path.join(process.cwd(),'public','data','search-dashboard.json');return JSON.parse(fs.readFileSync(file,'utf8')) as DashboardData;}
function n(v:number|null,s=''){return v===null?'Awaiting data':`${v.toLocaleString()}${s}`;}
function p(v:number|null){return v===null?'Awaiting data':`${v.toFixed(1)}%`;}
function pos(v:number|null){return v===null?'Awaiting data':v.toFixed(1);}
function Funnel({items}:{items:FunnelItem[]}){return <div className="funnel">{items.map((x,i)=><div className="funnel-step" key={x.label}><div className="funnel-bar" style={{width:`${Math.max(12,100-i*13)}%`}}><span>{x.label}</span><strong>{n(x.value)}</strong></div>{x.rate!==undefined&&x.rate!==null&&<small>{x.rate.toFixed(1)}% of previous stage</small>}</div>)}</div>}

const ranges=[['7d','Last 7 days'],['28d','Last 28 days'],['90d','Last 90 days'],['month','This month'],['prev-month','Previous month'],['baseline','Since baseline']];

export default async function Dashboard({searchParams}:{searchParams?:Promise<{range?:string}>}){
 const d=readData();
 const params=searchParams?await searchParams:{};
 const range=ranges.some(x=>x[0]===params.range)?(params.range as string):'28d';
 const snapshot=d.periods?.[range];
 const view=snapshot?{...d,
  current:{...d.current,period:snapshot.period,clicks:snapshot.clicks,impressions:snapshot.impressions,ctr:snapshot.ctr,position:snapshot.position,nonBrandedClicks:snapshot.nonBrandedClicks,nonBrandedImpressions:snapshot.nonBrandedImpressions,aiFeatureImpressions:snapshot.aiFeatureImpressions,aiCitations:snapshot.aiCitations,citedPages:snapshot.citedPages},
  change:{...d.change,clicks:snapshot.clicks,impressions:snapshot.impressions,ctr:snapshot.ctr,position:snapshot.position},
  funnel:{...d.funnel,period:snapshot.period,users:snapshot.users,newUsers:snapshot.newUsers,returningUsers:snapshot.returningUsers,sessions:snapshot.sessions,engagedSessions:snapshot.engagedSessions,engagementRate:snapshot.engagementRate,organicSessions:snapshot.organicSessions,aiSessions:snapshot.aiSessions,resourceViews:snapshot.resourceViews,resourceDownloads:snapshot.resourceDownloads,resourceLeads:snapshot.resourceLeads,consultingEnquiries:snapshot.consultingEnquiries,bookingStarts:snapshot.bookingStarts,bookingCompletions:snapshot.bookingCompletions,bookClicks:snapshot.bookClicks,conversionRate:snapshot.conversionRate,topSources:snapshot.topSources??d.funnel.topSources,topLandingPages:(snapshot.topLandingPages??[]).map(x=>({path:x.page,sessions:x.sessions,engagementRate:x.engagementRate})),devices:(snapshot.devices??[]).map(x=>({device:x.device,users:x.users,share:x.share})),countries:(snapshot.countries??[]).map(x=>({country:x.country,users:x.users,share:x.share}))},
  queries:snapshot.queries??d.queries,
  pages:(snapshot.pages??[]).map(x=>({path:x.page,clicks:x.clicks,impressions:x.impressions,position:x.position,change:x.change})),
  ai:{...d.ai}
}:{...d};
 const rangeLabel=ranges.find(x=>x[0]===range)?.[1]||'Last 28 days';
 const fresh=d.updatedAt?new Date(d.updatedAt).toLocaleString('en-IN',{dateStyle:'medium',timeStyle:'short'}):'Not synced yet';
 const c=[
  {label:'Organic clicks',value:n(view.current.clicks),change:view.change.clicks===null?'Awaiting data':`${view.change.clicks>0?'+':''}${view.change.clicks.toFixed(1)}%`,icon:Search},
  {label:'Search impressions',value:n(view.current.impressions),change:view.change.impressions===null?'Awaiting data':`${view.change.impressions>0?'+':''}${view.change.impressions.toFixed(1)}%`,icon:TrendingUp},
  {label:'People / users',value:n(view.funnel.users),change:view.funnel.newUsers===null?'Awaiting data':`${n(view.funnel.newUsers)} new`,icon:Users},
  {label:'AI citations',value:n(view.current.aiCitations),change:view.current.citedPages===null?'Awaiting data':`${n(view.current.citedPages)} cited pages`,icon:Sparkles},
 ];
 const hasRanges=Boolean(d.periods&&Object.keys(d.periods).length);
 return <main className="dashboard-page"><div className="dashboard-shell">
  <header className="dashboard-header"><div><div className="dashboard-kicker">Private growth intelligence</div><h1>How people find you, what they do, and where the funnel leaks.</h1><p>SEO, AEO, GEO and the measurable journey from discovery to resource lead or consulting enquiry.</p></div><div className="dashboard-status"><span className={d.status==='awaiting-first-sync'?'status-dot pending':'status-dot'}/><span>Last sync: {fresh}</span></div></header>

  <section className="dashboard-toolbar"><div><div className="toolbar-label">REPORTING PERIOD</div><strong>{rangeLabel}</strong><span>{hasRanges?'Live date-range snapshots are available.':'Date-range snapshots will activate after the first scheduled analytics sync.'}</span></div><form method="get" className="range-form"><label htmlFor="range">Date range</label><select id="range" name="range" defaultValue={range}>{ranges.map(([value,label])=><option value={value} key={value}>{label}</option>)}</select><button type="submit">Apply</button></form><a className="campaign-nav" href="/dashboard/campaigns">Campaign link builder →</a></section>

  <section className="dashboard-cards">{c.map(x=>{const I=x.icon;return <article className="dashboard-card" key={x.label}><div className="card-icon"><I size={18}/></div><div className="card-label">{x.label}</div><div className="card-value">{x.value}</div><div className="card-change">{x.change}</div></article>})}</section>

  {!snapshot&&<div className="range-notice"><Clock3 size={15}/><span>Showing the current dashboard values until the daily sync has stored the selected date-range snapshot. The filter is ready and will become data-driven automatically.</span></div>}

  <section className="dashboard-panel funnel-panel"><div className="panel-head"><div><div className="panel-kicker">FULL FUNNEL</div><h2>From discovery to commercial intent</h2></div><span>{view.funnel.period||rangeLabel}</span></div>
   <Funnel items={[
    {label:'Users',value:view.funnel.users},
    {label:'Engaged sessions',value:view.funnel.engagedSessions,rate:view.funnel.engagementRate},
    {label:'Organic sessions',value:view.funnel.organicSessions},
    {label:'Resource views',value:view.funnel.resourceViews},
    {label:'Resource downloads',value:view.funnel.resourceDownloads},
    {label:'Resource leads',value:view.funnel.resourceLeads},
    {label:'Consulting enquiries',value:view.funnel.consultingEnquiries},
    {label:'Booking completions',value:view.funnel.bookingCompletions},
   ]}/>
   <p className="panel-note">The dashboard uses aggregate and cohort-level analytics. Individual names, emails, IP addresses and individual browsing histories are intentionally excluded.</p>
  </section>

  <section className="dashboard-grid">
   <article className="dashboard-panel"><div className="panel-kicker">ACQUISITION</div><h2>Traffic mix</h2><div className="mini-metrics"><div><span>Total sessions</span><strong>{n(view.funnel.sessions)}</strong></div><div><span>Organic</span><strong>{n(view.funnel.organicSessions)}</strong></div><div><span>AI referred</span><strong>{n(view.funnel.aiSessions)}</strong></div><div><span>Engagement</span><strong>{p(view.funnel.engagementRate)}</strong></div></div><div className="subhead">Top sources</div><div className="rank-list">{view.funnel.topSources.length?view.funnel.topSources.slice(0,7).map(s=><div className="rank-row" key={s.source}><div><strong>{s.source}</strong><span>{n(s.sessions)} sessions</span></div><b>{s.conversions===null||s.conversions===undefined?'':n(s.conversions)}</b></div>):<div className="empty">Source data will appear after the first GA4 sync.</div>}</div></article>

   <article className="dashboard-panel"><div className="panel-kicker">AUDIENCE</div><h2>Who is visiting</h2><div className="audience-stats"><div><span>New users</span><strong>{n(view.funnel.newUsers)}</strong></div><div><span>Returning</span><strong>{n(view.funnel.returningUsers)}</strong></div></div><div className="subhead"><Smartphone size={12}/> Devices</div><div className="rank-list">{view.funnel.devices.length?view.funnel.devices.slice(0,5).map(x=><div className="rank-row" key={x.device}><div><strong>{x.device}</strong><span>{n(x.users)} users</span></div><b>{p(x.share??null)}</b></div>):<div className="empty">Device data will appear after the first sync.</div>}</div><div className="subhead"><Globe2 size={12}/> Countries</div><div className="rank-list">{view.funnel.countries.length?view.funnel.countries.slice(0,5).map(x=><div className="rank-row" key={x.country}><div><strong>{x.country}</strong><span>{n(x.users)} users</span></div><b>{p(x.share??null)}</b></div>):<div className="empty">Country data will appear after the first sync.</div>}</div></article>

   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">LANDING PAGES</div><h2>Where visitors enter</h2></div></div><div className="rank-list">{view.funnel.topLandingPages.length?view.funnel.topLandingPages.slice(0,10).map(x=><div className="rank-row" key={x.path}><div><strong>{x.path}</strong><span>{n(x.sessions)} sessions · {p(x.engagementRate??null)} engaged</span></div></div>):<div className="empty">Landing-page data will appear after the first sync.</div>}</div></article>

   <article className="dashboard-panel wide commercial-panel"><div className="panel-head"><div><div className="panel-kicker">COMMERCIAL INTENT</div><h2>Actions that matter</h2></div></div><div className="intent-grid"><div><MousePointerClick size={18}/><span>Book clicks</span><strong>{n(view.funnel.bookClicks)}</strong></div><div><Download size={18}/><span>Resource downloads</span><strong>{n(view.funnel.resourceDownloads)}</strong></div><div><CalendarCheck size={18}/><span>Booking completions</span><strong>{n(view.funnel.bookingCompletions)}</strong></div><div><Target size={18}/><span>Overall conversion</span><strong>{p(view.funnel.conversionRate)}</strong></div></div></article>

   <article className="dashboard-panel"><div className="panel-kicker">ENGAGEMENT</div><h2>Audience behaviour</h2><div className="behaviour-grid"><div><Clock3 size={16}/><span>Engaged sessions</span><strong>{n(view.funnel.engagedSessions)}</strong></div><div><UserRoundCheck size={16}/><span>New users</span><strong>{n(view.funnel.newUsers)}</strong></div><div><Users size={16}/><span>Returning</span><strong>{n(view.funnel.returningUsers)}</strong></div><div><TrendingUp size={16}/><span>Engagement rate</span><strong>{p(view.funnel.engagementRate)}</strong></div></div></article>

   <article className="dashboard-panel"><div className="panel-kicker">SEO</div><h2>Search performance</h2><div className="mini-metrics"><div><span>Non-branded clicks</span><strong>{n(view.current.nonBrandedClicks)}</strong></div><div><span>Non-branded impressions</span><strong>{n(view.current.nonBrandedImpressions)}</strong></div><div><span>CTR</span><strong>{view.current.ctr===null?'Awaiting data':`${view.current.ctr.toFixed(2)}%`}</strong></div><div><span>Position</span><strong>{pos(view.current.position)}</strong></div></div></article>

   <article className="dashboard-panel"><div className="panel-kicker">AEO / GEO</div><h2>AI visibility</h2><div className="ai-stat"><strong>{n(view.current.aiCitations)}</strong><span>AI citations</span></div><div className="ai-stat"><strong>{n(view.current.citedPages)}</strong><span>Cited pages</span></div><div className="ai-stat"><strong>{n(view.funnel.aiSessions)}</strong><span>AI-referred sessions</span></div><p className="panel-note">{view.ai.notes||'AI-search signals will appear when source data is available.'}</p></article>

   <article className="dashboard-panel"><div className="panel-kicker">SEARCH DEMAND</div><h2>Queries to watch</h2><div className="rank-list">{view.queries.length?view.queries.slice(0,8).map(q=><div className="rank-row" key={q.query}><div><strong>{q.query}</strong><span>{n(q.impressions)} impressions · {n(q.clicks)} clicks</span></div><b>{pos(q.position)}</b></div>):<div className="empty">The first sync will populate search queries.</div>}</div></article>

   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">CONTENT</div><h2>Pages creating search equity</h2></div><a href="/blog">Writing <ArrowUpRight size={15}/></a></div><div className="rank-list">{view.pages.length?view.pages.slice(0,10).map(x=><div className="rank-row" key={x.path}><div><strong>{x.path}</strong><span>{n(x.clicks)} clicks · {n(x.impressions)} impressions</span></div><b>{pos(x.position)}</b></div>):<div className="empty">Page data will appear after the first sync.</div>}</div></article>

   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">AI SEARCH</div><h2>Grounding queries and cited pages</h2></div></div><div className="ai-columns"><div><div className="subhead">Grounding queries</div><div className="rank-list">{view.ai.groundingQueries.length?view.ai.groundingQueries.slice(0,6).map(q=><div className="rank-row" key={q.query}><div><strong>{q.query}</strong></div><b>{q.citations??'?'}</b></div>):<div className="empty">AI grounding-query data will appear when available.</div>}</div></div><div><div className="subhead">Cited pages</div><div className="rank-list">{view.ai.citedPages.length?view.ai.citedPages.slice(0,6).map(q=><div className="rank-row" key={q.path}><div><strong>{q.path}</strong></div><b>{q.citations??'?'}</b></div>):<div className="empty">AI cited-page data will appear when available.</div>}</div></div></div></article>

   <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">OPPORTUNITIES</div><h2>What we should do next</h2></div></div><div className="opportunity-list">{d.opportunities.length?d.opportunities.slice(0,5).map((o,i)=><div className="opportunity" key={`${o.title}-${i}`}><span>{String(i+1).padStart(2,'0')}</span><div><strong>{o.title}</strong><p>{o.detail}</p></div></div>):<div className="empty">The dashboard will turn actual search and funnel data into specific actions.</div>}</div></article>

   <article className="dashboard-panel"><div className="panel-kicker">TARGETS</div><h2>90-day operating goals</h2><div className="goal-list">{d.goals.map(g=><div className="goal" key={g.label}><span>{g.cluster}</span><strong>{g.label}</strong><p>{g.target}</p></div>)}</div></article>
  </section>
  <footer className="dashboard-footer"><span>Private, noindex, no-cache. Dashboard traffic is excluded from site analytics.</span><a href="/">Back to site</a></footer>
 </div></main>;
}
