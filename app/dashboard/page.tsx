import fs from 'node:fs';
import path from 'node:path';
import { ArrowUpRight, Search, Sparkles, Target, TrendingUp } from 'lucide-react';
import './dashboard.css';

export const metadata = {
  title: 'Search Performance Dashboard | Siddharth Bhattacharjee',
  description: 'SEO, AEO and GEO performance dashboard for siddharthbhattacharjee.in.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

type DashboardData = {
  updatedAt: string | null;
  status: string;
  site: string;
  baseline: { window: string; clicks: number | null; impressions: number | null; ctr: number | null; position: number | null };
  current: { period: string | null; clicks: number | null; impressions: number | null; ctr: number | null; position: number | null; nonBrandedClicks: number | null; nonBrandedImpressions: number | null; aiFeatureImpressions: number | null; aiCitations: number | null; citedPages: number | null };
  change: { clicks: number | null; impressions: number | null; ctr: number | null; position: number | null };
  queries: { query: string; clicks: number | null; impressions: number | null; position: number | null; change?: number | null }[];
  pages: { path: string; clicks: number | null; impressions: number | null; position: number | null; change?: number | null }[];
  ai: { groundingQueries: { query: string; citations?: number | null }[]; citedPages: { path: string; citations?: number | null }[]; notes?: string };
  opportunities: { title: string; detail: string; type?: string }[];
  goals: { label: string; target: string; cluster: string }[];
};

function readData(): DashboardData {
  const file = path.join(process.cwd(), 'public', 'data', 'search-dashboard.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')) as DashboardData;
}

function num(value: number | null, suffix = '') { return value === null ? 'Awaiting data' : `${value.toLocaleString()}${suffix}`; }
function pct(value: number | null) { return value === null ? 'Awaiting data' : `${value > 0 ? '+' : ''}${value.toFixed(1)}%`; }
function position(value: number | null) { return value === null ? 'Awaiting data' : value.toFixed(1); }

export default function Dashboard() {
  const d = readData();
  const fresh = d.updatedAt ? new Date(d.updatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Not synced yet';
  const cards = [
    { label: 'Organic clicks', value: num(d.current.clicks), change: pct(d.change.clicks), icon: Search },
    { label: 'Search impressions', value: num(d.current.impressions), change: pct(d.change.impressions), icon: TrendingUp },
    { label: 'Average position', value: position(d.current.position), change: pct(d.change.position), icon: Target },
    { label: 'AI visibility', value: num(d.current.aiFeatureImpressions), change: d.current.aiCitations === null ? 'Awaiting Bing data' : `${d.current.aiCitations.toLocaleString()} citations`, icon: Sparkles },
  ];

  return <main className="dashboard-page">
    <div className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <div className="dashboard-kicker">Search authority · private dashboard</div>
          <h1>How the site is being found.</h1>
          <p>SEO, AEO and GEO performance for <strong>{d.site}</strong>, with business impact kept in view.</p>
        </div>
        <div className="dashboard-status"><span className={d.status === 'awaiting-first-sync' ? 'status-dot pending' : 'status-dot'} /> <span>Last sync: {fresh}</span></div>
      </header>

      <section className="dashboard-cards">{cards.map(c => { const Icon = c.icon; return <article className="dashboard-card" key={c.label}><div className="card-icon"><Icon size={18}/></div><div className="card-label">{c.label}</div><div className="card-value">{c.value}</div><div className="card-change">{c.change}</div></article> })}</section>

      <section className="dashboard-grid">
        <article className="dashboard-panel wide">
          <div className="panel-head"><div><div className="panel-kicker">SEO</div><h2>Search performance</h2></div><span>{d.current.period || 'Baseline will appear after first sync'}</span></div>
          <div className="mini-metrics">
            <div><span>Non-branded clicks</span><strong>{num(d.current.nonBrandedClicks)}</strong></div>
            <div><span>Non-branded impressions</span><strong>{num(d.current.nonBrandedImpressions)}</strong></div>
            <div><span>CTR</span><strong>{d.current.ctr === null ? 'Awaiting data' : `${d.current.ctr.toFixed(2)}%`}</strong></div>
            <div><span>Indexed / tracked</span><strong>{d.pages.length || 'Awaiting data'}</strong></div>
          </div>
        </article>

        <article className="dashboard-panel">
          <div className="panel-kicker">AEO / GEO</div><h2>AI visibility</h2>
          <div className="ai-stat"><strong>{num(d.current.aiCitations)}</strong><span>AI citations</span></div>
          <div className="ai-stat"><strong>{num(d.current.citedPages)}</strong><span>Cited pages</span></div>
          <p className="panel-note">{d.ai.notes || 'AI-search signals are updated as source data becomes available.'}</p>
        </article>

        <article className="dashboard-panel">
          <div className="panel-kicker">SEARCH DEMAND</div><h2>Queries to watch</h2>
          <div className="rank-list">{d.queries.length ? d.queries.slice(0, 7).map(q => <div className="rank-row" key={q.query}><div><strong>{q.query}</strong><span>{num(q.impressions)} impressions</span></div><b>{position(q.position)}</b></div>) : <div className="empty">The first daily sync will populate this section from Search Console.</div>}</div>
        </article>

        <article className="dashboard-panel wide">
          <div className="panel-head"><div><div className="panel-kicker">CONTENT</div><h2>Pages creating search equity</h2></div><a href="/blog">View writing <ArrowUpRight size={15}/></a></div>
          <div className="rank-list">{d.pages.length ? d.pages.slice(0, 8).map(p => <div className="rank-row" key={p.path}><div><strong>{p.path}</strong><span>{num(p.clicks)} clicks · {num(p.impressions)} impressions</span></div><b>{position(p.position)}</b></div>) : <div className="empty">No page-level data yet. It will appear after the first sync.</div>}</div>
        </article>

        <article className="dashboard-panel wide">
          <div className="panel-head"><div><div className="panel-kicker">OPPORTUNITIES</div><h2>What we should do next</h2></div></div>
          <div className="opportunity-list">{d.opportunities.length ? d.opportunities.slice(0, 5).map((o, i) => <div className="opportunity" key={`${o.title}-${i}`}><span>{String(i + 1).padStart(2, '0')}</span><div><strong>{o.title}</strong><p>{o.detail}</p></div></div>) : <div className="empty">The dashboard will turn search data into specific content and optimisation opportunities.</div>}</div>
        </article>

        <article className="dashboard-panel">
          <div className="panel-kicker">TARGETS</div><h2>90-day operating goals</h2>
          <div className="goal-list">{d.goals.map(g => <div className="goal" key={g.label}><span>{g.cluster}</span><strong>{g.label}</strong><p>{g.target}</p></div>)}</div>
        </article>
      </section>

      <footer className="dashboard-footer">Data is refreshed automatically. This dashboard is intentionally noindex. <a href="/">Back to site</a></footer>
    </div>
  </main>;
}
