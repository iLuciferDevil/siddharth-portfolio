import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, ShoppingCart, Search, Sparkles, Users, MousePointerClick, CreditCard, IndianRupee } from 'lucide-react';
import '../dashboard.css';

export const metadata = {
  title: 'Private Book Growth Dashboard | The Sovereign Brand',
  description: 'Private SEO, AEO, GEO and purchase funnel dashboard for The Sovereign Brand.',
  robots: { index: false, follow: false, nocache: true },
};
export const dynamic = 'force-dynamic';

type BookData = {
  period: string | null;
  landingPageViews: number | null;
  uniqueLandingUsers: number | null;
  gumroadClicks: number | null;
  amazonClicks: number | null;
  checkoutStarts: number | null;
  purchases: number | null;
  revenue: number | null;
  currency: string | null;
  purchaseRate: number | null;
  clientConversions: number | null;
  clientConversionRate: number | null;
  seoSessions: number | null;
  aiSessions: number | null;
  topSources: { source: string; sessions: number | null; purchases?: number | null }[];
  topQueries: { query: string; clicks: number | null; impressions: number | null; position: number | null }[];
  notes?: string;
};

function readData() {
  const file = path.join(process.cwd(), 'public', 'data', 'search-dashboard.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')) as { updatedAt: string | null; book?: BookData };
}
function n(v: number | null) { return v === null ? 'Awaiting data' : v.toLocaleString(); }
function pct(v: number | null) { return v === null ? 'Awaiting data' : `${v.toFixed(1)}%`; }

export default function BookDashboard() {
  const d = readData();
  const b = d.book || {
    period: null, landingPageViews: null, uniqueLandingUsers: null, gumroadClicks: null, amazonClicks: null,
    checkoutStarts: null, purchases: null, revenue: null, currency: null, purchaseRate: null,
    clientConversions: null, clientConversionRate: null, seoSessions: null, aiSessions: null, topSources: [], topQueries: [],
  };
  const updated = d.updatedAt ? new Date(d.updatedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) : 'Not synced yet';

  return <main className="dashboard-page"><div className="dashboard-shell">
    <header className="dashboard-header">
      <div>
        <div className="dashboard-kicker">Private book growth intelligence</div>
        <h1>Build a separate growth engine for The Sovereign Brand.</h1>
        <p>This is a dedicated workstream. Book discovery and purchase are not treated as a consulting conversion until we have evidence that book purchasers later become clients.</p>
      </div>
      <div className="dashboard-status"><span className="status-dot pending"/><span>Last sync: {updated}</span></div>
    </header>

    <section className="dashboard-panel book-workstream-hero">
      <div className="panel-head"><div><div className="panel-kicker">BOOK PURCHASE FUNNEL</div><h2>Discovery → purchase</h2></div><span>{b.period || 'Awaiting first sync'}</span></div>
      <div className="book-funnel">
        <div><span><Users size={16}/> Landing-page visitors</span><strong>{n(b.uniqueLandingUsers)}</strong></div>
        <div><span><MousePointerClick size={16}/> Gumroad clicks</span><strong>{n(b.gumroadClicks)}</strong></div>
        <div><span><ShoppingCart size={16}/> Amazon clicks</span><strong>{n(b.amazonClicks)}</strong></div>
        <div><span><CreditCard size={16}/> Checkout starts</span><strong>{n(b.checkoutStarts)}</strong></div>
        <div><span><BookOpen size={16}/> Purchases</span><strong>{n(b.purchases)}</strong></div>
      </div>
      <p className="panel-note">Landing-page and outbound-click data comes from GA4. Verified purchases and revenue require transaction data from the selling platform, so the dashboard will never infer purchases from clicks.</p>
    </section>

    <section className="dashboard-cards">
      <article className="dashboard-card"><div className="card-icon"><BookOpen size={18}/></div><div className="card-label">Book landing views</div><div className="card-value">{n(b.landingPageViews)}</div><div className="card-change">Unique users: {n(b.uniqueLandingUsers)}</div></article>
      <article className="dashboard-card"><div className="card-icon"><MousePointerClick size={18}/></div><div className="card-label">Purchase clicks</div><div className="card-value">{n((b.gumroadClicks ?? 0) + (b.amazonClicks ?? 0))}</div><div className="card-change">Gumroad {n(b.gumroadClicks)} · Amazon {n(b.amazonClicks)}</div></article>
      <article className="dashboard-card"><div className="card-icon"><CreditCard size={18}/></div><div className="card-label">Verified purchases</div><div className="card-value">{n(b.purchases)}</div><div className="card-change">Purchase rate {pct(b.purchaseRate)}</div></article>
      <article className="dashboard-card"><div className="card-icon"><IndianRupee size={18}/></div><div className="card-label">Book revenue</div><div className="card-value">{b.revenue === null ? 'Awaiting data' : `${b.currency || ''} ${b.revenue.toLocaleString()}`}</div><div className="card-change">Transaction data only</div></article>
    </section>

    <section className="dashboard-grid">
      <article className="dashboard-panel"><div className="panel-kicker">SEARCH ACQUISITION</div><h2>Book discovery from search</h2><div className="mini-metrics"><div><span>SEO sessions</span><strong>{n(b.seoSessions)}</strong></div><div><span>AI sessions</span><strong>{n(b.aiSessions)}</strong></div><div><span>Landing users</span><strong>{n(b.uniqueLandingUsers)}</strong></div><div><span>Purchase rate</span><strong>{pct(b.purchaseRate)}</strong></div></div></article>

      <article className="dashboard-panel"><div className="panel-kicker">FUTURE CLIENT PATH</div><h2>Book → client</h2><div className="ai-stat"><strong>{n(b.clientConversions)}</strong><span>Book purchasers later converted to clients</span></div><div className="ai-stat"><strong>{pct(b.clientConversionRate)}</strong><span>Book-to-client conversion</span></div><p className="panel-note">This remains a separate downstream cohort. We will connect it later when a reliable source can establish the relationship without exposing individual identities.</p></article>

      <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">TRAFFIC SOURCES</div><h2>Where book buyers are coming from</h2></div></div><div className="rank-list">{b.topSources.length ? b.topSources.slice(0, 10).map(x => <div className="rank-row" key={x.source}><div><strong>{x.source}</strong><span>{n(x.sessions)} sessions</span></div><b>{x.purchases == null ? '' : `${n(x.purchases)} purchases`}</b></div>) : <div className="empty">Source-level book data will appear after the first GA4 sync.</div>}</div></article>

      <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">BOOK SEARCH DEMAND</div><h2>Queries to build around</h2></div><Link href="/book">Open book page <ArrowUpRight size={15}/></Link></div><div className="rank-list">{b.topQueries.length ? b.topQueries.slice(0, 10).map(q => <div className="rank-row" key={q.query}><div><strong>{q.query}</strong><span>{n(q.impressions)} impressions · {n(q.clicks)} clicks</span></div><b>{q.position == null ? 'Awaiting' : q.position.toFixed(1)}</b></div>) : <div className="empty">Book-specific search queries will appear after the first search sync.</div>}</div></article>

      <article className="dashboard-panel wide"><div className="panel-head"><div><div className="panel-kicker">SEO / AEO / GEO WORKSTREAM</div><h2>What this workstream should optimise</h2></div><Sparkles size={18}/></div><div className="opportunity-list">
        <div className="opportunity"><span>01</span><div><strong>Own the problem, not just the book title</strong><p>Build search content around the business questions the book answers: AI marketing strategy, brand strategy in the age of AI, marketing operating models, AI and brand differentiation, and practical AI marketing leadership.</p></div></div>
        <div className="opportunity"><span>02</span><div><strong>Build answer-first pages for AI discovery</strong><p>Create concise, evidence-backed answers that can earn citations and then lead readers to the deeper book framework.</p></div></div>
        <div className="opportunity"><span>03</span><div><strong>Measure the journey separately</strong><p>Keep book landing views, provider clicks, verified purchases and later client conversion distinct from the consulting funnel.</p></div></div>
      </div></article>
    </section>

    <footer className="dashboard-footer"><span>Private, noindex, no-cache. Book purchase analytics is a separate workstream.</span><Link href="/dashboard">Main dashboard</Link></footer>
  </div></main>;
}
