'use client';

import { useState } from 'react';

type Snapshot = {
  period: string;
  clicks: number | null;
  impressions: number | null;
  ctr: number | null;
  position: number | null;
  users: number | null;
  sessions: number | null;
  engagementRate: number | null;
  bookClicks: number | null;
  queries: { query: string; impressions: number; position: number }[];
};

const DATA: Record<string, Snapshot> = {
  '7d': {
    period: '2026-09-08 to 2026-09-14',
    clicks: 0, impressions: 22, ctr: 0, position: 23.1,
    users: null, sessions: null, engagementRate: null, bookClicks: null,
    queries: []
  },
  '28d': {
    period: '2026-08-18 to 2026-09-14',
    clicks: 0, impressions: 44, ctr: 0, position: 26.3,
    users: 128, sessions: 156, engagementRate: 42.95, bookClicks: 3,
    queries: [
      { query: 'fractional marketing leader', impressions: 13, position: 34.2 },
      { query: 'siddharth bhattacharjee', impressions: 8, position: 7.6 },
      { query: 'full marketing stack', impressions: 2, position: 48.5 },
      { query: 'when to hire a fractional marketing director', impressions: 2, position: 87.5 }
    ]
  },
  '90d': {
    period: '2026-06-17 to 2026-09-14',
    clicks: 0, impressions: 44, ctr: 0, position: 26.3,
    users: null, sessions: null, engagementRate: null, bookClicks: null, queries: []
  },
  'month': {
    period: '2026-09-01 to 2026-09-14',
    clicks: 0, impressions: 44, ctr: 0, position: 26.3,
    users: null, sessions: null, engagementRate: null, bookClicks: null, queries: []
  },
  'prev-month': {
    period: '2026-08-01 to 2026-08-31',
    clicks: 0, impressions: 0, ctr: 0, position: 0,
    users: null, sessions: null, engagementRate: null, bookClicks: null, queries: []
  }
};

const sources = [
  ['(direct) / (none)', 123],
  ['linkedin.com / referral', 32],
  ['vercel.com / referral', 1]
];

const pages = [
  ['/', 140],
  ['/blog', 6],
  ['/services', 4],
  ['/blog/when-to-hire-a-fractional-marketing-leader', 1]
];

const devices = [['Mobile', 71], ['Desktop', 58]];
const countries = [['India', 99], ['United States', 21]];

function value(v: number | null, suffix = '') {
  return v === null ? 'Awaiting data' : `${v.toLocaleString()}${suffix}`;
}

export default function Page() {
  const [range, setRange] = useState('28d');
  const d = DATA[range];

  return (
    <main style={{ minHeight: '100vh', background: '#f7f4ee', color: '#10213a', padding: '36px 20px', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ maxWidth: 1180, margin: '0 auto' }}>
        <header style={{ marginBottom: 24 }}>
          <div style={{ letterSpacing: 2, fontWeight: 700, fontSize: 13, color: '#a46d20' }}>PRIVATE GROWTH INTELLIGENCE</div>
          <h1 style={{ fontSize: 38, margin: '8px 0' }}>How people find you, what they do, and where the funnel leaks.</h1>
          <p style={{ color: '#667085', fontSize: 17 }}>SEO, AEO, GEO and the measurable journey from discovery to resource lead or consulting enquiry.</p>
          <div style={{ fontSize: 13, color: '#667085' }}>Last sync: 17 Sep 2026 · Data through 14 Sep 2026</div>
        </header>

        <section style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
          {Object.entries({ '7d':'Last 7 days', '28d':'Last 28 days', '90d':'Last 90 days', month:'This month', 'prev-month':'Previous month' }).map(([key,label]) => (
            <button key={key} onClick={() => setRange(key)} style={{ border: '1px solid #d8d1c5', background: range === key ? '#10213a' : '#fff', color: range === key ? '#fff' : '#10213a', borderRadius: 999, padding: '9px 15px', cursor: 'pointer' }}>{label}</button>
          ))}
        </section>

        <div style={{ fontSize: 13, color: '#667085', marginBottom: 14 }}>Reporting period: <strong>{d.period}</strong></div>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, marginBottom: 18 }}>
          {[
            ['Organic clicks', value(d.clicks)],
            ['Search impressions', value(d.impressions)],
            ['People / users', value(d.users)],
            ['AI citations', 'Awaiting data']
          ].map(([label,val]) => (
            <article key={label} style={{ background:'#fff', border:'1px solid #ded8ce', borderRadius:18, padding:20 }}>
              <div style={{ color:'#667085', fontSize:13 }}>{label}</div>
              <div style={{ fontSize:30, fontWeight:700, marginTop:8 }}>{val}</div>
            </article>
          ))}
        </section>

        <section style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))', gap:18 }}>
          <article style={{ background:'#fff', border:'1px solid #ded8ce', borderRadius:18, padding:22 }}>
            <div style={{ color:'#a46d20', fontSize:12, fontWeight:700, letterSpacing:1.5 }}>SEARCH PERFORMANCE</div>
            <h2>SEO snapshot</h2>
            <p>CTR: <strong>{value(d.ctr, '%')}</strong></p>
            <p>Average position: <strong>{value(d.position)}</strong></p>
            <p>Non-branded clicks: <strong>Awaiting data</strong></p>
            <p>Non-branded impressions: <strong>Awaiting data</strong></p>
          </article>

          <article style={{ background:'#fff', border:'1px solid #ded8ce', borderRadius:18, padding:22 }}>
            <div style={{ color:'#a46d20', fontSize:12, fontWeight:700, letterSpacing:1.5 }}>TRAFFIC MIX</div>
            <h2>Acquisition</h2>
            {sources.map(([name,n]) => <p key={name as string} style={{display:'flex',justifyContent:'space-between',gap:10}}><span>{name}</span><strong>{n}</strong></p>)}
          </article>

          <article style={{ background:'#fff', border:'1px solid #ded8ce', borderRadius:18, padding:22 }}>
            <div style={{ color:'#a46d20', fontSize:12, fontWeight:700, letterSpacing:1.5 }}>AUDIENCE</div>
            <h2>Who is visiting</h2>
            <p>Users: <strong>{value(d.users)}</strong></p>
            <p>Sessions: <strong>{value(d.sessions)}</strong></p>
            <p>Engagement rate: <strong>{value(d.engagementRate, '%')}</strong></p>
            {devices.map(([name,n]) => <p key={name as string} style={{display:'flex',justifyContent:'space-between'}}><span>{name}</span><strong>{n}</strong></p>)}
          </article>

          <article style={{ background:'#fff', border:'1px solid #ded8ce', borderRadius:18, padding:22 }}>
            <div style={{ color:'#a46d20', fontSize:12, fontWeight:700, letterSpacing:1.5 }}>SEARCH DEMAND</div>
            <h2>Queries to watch</h2>
            {d.queries.length ? d.queries.map(q => <div key={q.query} style={{borderTop:'1px solid #eee',padding:'12px 0'}}><strong>{q.query}</strong><div style={{color:'#667085',fontSize:13}}>{q.impressions} impressions · position {q.position}</div></div>) : <p style={{color:'#667085'}}>No query rows for this reporting period.</p>}
          </article>

          <article style={{ background:'#fff', border:'1px solid #ded8ce', borderRadius:18, padding:22 }}>
            <div style={{ color:'#a46d20', fontSize:12, fontWeight:700, letterSpacing:1.5 }}>LANDING PAGES</div>
            <h2>Where visitors enter</h2>
            {pages.map(([name,n]) => <p key={name as string} style={{display:'flex',justifyContent:'space-between',gap:10}}><span>{name}</span><strong>{n}</strong></p>)}
          </article>

          <article style={{ background:'#fff', border:'1px solid #ded8ce', borderRadius:18, padding:22 }}>
            <div style={{ color:'#a46d20', fontSize:12, fontWeight:700, letterSpacing:1.5 }}>COMMERCIAL INTENT</div>
            <h2>Actions that matter</h2>
            <p>Book clicks: <strong>{value(d.bookClicks)}</strong></p>
            <p>Contact form submits: <strong>8</strong></p>
            <p>Contact CTA clicks: <strong>14</strong></p>
            <p>Contact email clicks: <strong>7</strong></p>
            <p>Purchases: <strong>0</strong></p>
          </article>
        </section>

        <footer style={{ marginTop:24, paddingTop:18, borderTop:'1px solid #d8d1c5', color:'#667085', fontSize:13 }}>
          Private, noindex, no-cache. Dashboard traffic is excluded from site analytics.
        </footer>
      </div>
    </main>
  );
}
