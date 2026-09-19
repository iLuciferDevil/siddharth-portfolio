'use client';

import { useState } from 'react';
import { ArrowUpRight, Search, Sparkles, Target, TrendingUp, Users, MousePointerClick, Download, CalendarCheck, Clock3, Globe2, Smartphone, UserRoundCheck } from 'lucide-react';
import './dashboard.css';

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
const INITIAL_DATA = {
  "updatedAt": "2026-09-17",
  "status": "synced-gsc-bing-ga4",
  "site": "siddharthbhattacharjee.in",
  "baseline": {
    "window": "2026-09-16 onward",
    "clicks": null,
    "impressions": null,
    "ctr": null,
    "position": null,
    "notes": "Baseline preserved. No settled GSC data is available for 2026-09-16 onward; latest settled GSC date is 2026-09-14."
  },
  "current": {
    "period": "2026-08-18 to 2026-09-14",
    "clicks": 0,
    "impressions": 44,
    "ctr": 0,
    "position": 26.257638888888888,
    "nonBrandedClicks": null,
    "nonBrandedImpressions": null,
    "aiFeatureImpressions": null,
    "aiCitations": null,
    "citedPages": null,
    "bingClicks": 0,
    "bingImpressions": 0,
    "ga4Sessions": 156,
    "ga4Users": 128,
    "ga4EngagementRate": 0.42948717948717946,
    "ga4KeyEvents": 0,
    "aiAssistantSessions": 0
  },
  "change": {
    "clicks": 0,
    "impressions": 44,
    "ctr": 0,
    "position": 26.257638888888888
  },
  "funnel": {
    "period": "2026-08-18 to 2026-09-14",
    "users": 128,
    "newUsers": null,
    "returningUsers": null,
    "sessions": 156,
    "engagedSessions": null,
    "engagementRate": 0.42948717948717946,
    "organicSessions": 0,
    "aiSessions": 0,
    "resourceViews": null,
    "resourceDownloads": null,
    "resourceLeads": null,
    "consultingEnquiries": null,
    "contactFormSubmits": 8,
    "contactFormSubmitUsers": 3,
    "contactCtaClicks": 14,
    "contactEmailClicks": 7,
    "bookingStarts": null,
    "bookingCompletions": null,
    "bookClicks": 3,
    "conversionRate": null,
    "topSources": [
      {"source": "(direct) / (none)", "sessions": 123},
      {"source": "linkedin.com / referral", "sessions": 32},
      {"source": "vercel.com / referral", "sessions": 1}
    ],
    "topLandingPages": [
      {"page": "/", "sessions": 140},
      {"page": "/blog", "sessions": 6},
      {"page": "/services", "sessions": 4},
      {"page": "/blog/when-to-hire-a-fractional-marketing-leader", "sessions": 1}
    ],
    "devices": [
      {"device": "mobile", "sessions": 81, "users": 71},
      {"device": "desktop", "sessions": 76, "users": 58}
    ],
    "countries": [
      {"country": "India", "sessions": 126, "users": 99},
      {"country": "United States", "sessions": 21, "users": 21},
      {"country": "Canada", "sessions": 1, "users": 1},
      {"country": "China", "sessions": 1, "users": 1},
      {"country": "France", "sessions": 1, "users": 1},
      {"country": "Germany", "sessions": 1, "users": 1},
      {"country": "Netherlands", "sessions": 1, "users": 1},
      {"country": "Norway", "sessions": 1, "users": 1},
      {"country": "United Kingdom", "sessions": 1, "users": 1}
    ],
    "newVsReturning": {"new": null, "returning": null},
    "notes": "GA4 is now linked to the portfolio GSC Wizard site. Settled GA4 window returned 156 sessions, 128 active users, 42.95% engagement rate and 0 configured key events. Contact-form telemetry exists as regular events: 8 contact_form_submit events from 3 users, 14 contact_cta_click events and 7 contact_email_click events. These are not treated as consulting conversions because they are not configured as GA4 key events."
  },
  "book": {
    "period": "2026-08-18 to 2026-09-14",
    "landingPageViews": 12,
    "uniqueLandingUsers": 6,
    "gumroadClicks": 3,
    "amazonClicks": null,
    "checkoutStarts": null,
    "purchases": 0,
    "revenue": 0,
    "currency": "INR",
    "purchaseRate": 0,
    "clientConversions": null,
    "clientConversionRate": null,
    "seoSessions": 0,
    "aiSessions": 0,
    "topSources": [
      {"source": "(direct) / (none)", "sessions": 123},
      {"source": "linkedin.com / referral", "sessions": 32},
      {"source": "vercel.com / referral", "sessions": 1}
    ],
    "topQueries": [],
    "notes": "GA4 ecommerce reports no ecommerce activity in the settled window: 0 transactions, 0 purchasers and 0 revenue. The /book page recorded 12 views, 6 active users and 3 book_gumroad_click events. No Amazon click event was present in the returned event inventory. Purchases are not inferred from outbound clicks."
  },
  "periods": {
    "7d": {
      "period": "2026-09-08 to 2026-09-14",
      "clicks": 0,
      "impressions": 22,
      "ctr": 0,
      "position": 23.057142857142857,
      "nonBrandedClicks": null,
      "nonBrandedImpressions": null,
      "aiFeatureImpressions": null,
      "aiCitations": null,
      "citedPages": null,
      "bingClicks": 0,
      "bingImpressions": 0,
      "users": null,
      "newUsers": null,
      "returningUsers": null,
      "sessions": null,
      "engagedSessions": null,
      "engagementRate": null,
      "organicSessions": null,
      "aiSessions": null,
      "resourceViews": null,
      "resourceDownloads": null,
      "resourceLeads": null,
      "consultingEnquiries": null,
      "bookingStarts": null,
      "bookingCompletions": null,
      "bookClicks": null,
      "conversionRate": null,
      "topSources": null,
      "topLandingPages": null,
      "devices": null,
      "countries": null,
      "newVsReturning": {"new": null, "returning": null},
      "queries": [],
      "pages": [],
      "groundingQueries": null,
      "aiAssistantSessions": null,
      "notes": "GSC settled through 2026-09-14: 0 clicks and 22 impressions. Bing returned 0 clicks and 0 impressions. GA4 period-specific 7-day values are not populated because the connected GA4 reporting result currently resolves to its settled 28-day window."
    },
    "28d": {
      "period": "2026-08-18 to 2026-09-14",
      "clicks": 0,
      "impressions": 44,
      "ctr": 0,
      "position": 26.257638888888888,
      "nonBrandedClicks": null,
      "nonBrandedImpressions": null,
      "aiFeatureImpressions": null,
      "aiCitations": null,
      "citedPages": null,
      "bingClicks": 0,
      "bingImpressions": 0,
      "users": 128,
      "newUsers": null,
      "returningUsers": null,
      "sessions": 156,
      "engagedSessions": null,
      "engagementRate": 0.42948717948717946,
      "organicSessions": 0,
      "aiSessions": 0,
      "resourceViews": null,
      "resourceDownloads": null,
      "resourceLeads": null,
      "consultingEnquiries": null,
      "bookingStarts": null,
      "bookingCompletions": null,
      "bookClicks": 3,
      "conversionRate": null,
      "topSources": [
        {"source": "(direct) / (none)", "sessions": 123},
        {"source": "linkedin.com / referral", "sessions": 32},
        {"source": "vercel.com / referral", "sessions": 1}
      ],
      "topLandingPages": [
        {"page": "/", "sessions": 140},
        {"page": "/blog", "sessions": 6},
        {"page": "/services", "sessions": 4},
        {"page": "/blog/when-to-hire-a-fractional-marketing-leader", "sessions": 1}
      ],
      "devices": [
        {"device": "mobile", "sessions": 81, "users": 71},
        {"device": "desktop", "sessions": 76, "users": 58}
      ],
      "countries": [
        {"country": "India", "sessions": 126, "users": 99},
        {"country": "United States", "sessions": 21, "users": 21}
      ],
      "newVsReturning": {"new": null, "returning": null},
      "queries": [
        {"query": "fractional marketing leader", "clicks": 0, "impressions": 13, "ctr": 0, "position": 34.15384615384615},
        {"query": "siddharth bhattacharjee", "clicks": 0, "impressions": 8, "ctr": 0, "position": 7.625},
        {"query": "full marketing stack", "clicks": 0, "impressions": 2, "ctr": 0, "position": 48.5},
        {"query": "when to hire a fractional marketing director", "clicks": 0, "impressions": 2, "ctr": 0, "position": 87.5}
      ],
      "pages": [
        {"page": "https://www.siddharthbhattacharjee.in/blog/when-to-hire-a-fractional-marketing-leader", "clicks": 0, "impressions": 20, "ctr": 0, "position": 41.2},
        {"page": "https://www.siddharthbhattacharjee.in/", "clicks": 0, "impressions": 19, "ctr": 0, "position": 6.947368421052632},
        {"page": "https://www.siddharthbhattacharjee.in/blog/what-is-full-stack-marketing", "clicks": 0, "impressions": 5, "ctr": 0, "position": 53.4},
        {"page": "https://www.siddharthbhattacharjee.in/services", "clicks": 0, "impressions": 1, "ctr": 0, "position": 10}
      ],
      "groundingQueries": null,
      "aiAssistantSessions": 0,
      "notes": "GSC settled through 2026-09-14: 0 clicks and 44 impressions. Bing returned 0 clicks and 0 impressions. GA4 linked successfully and reports 156 sessions, 128 active users, 42.95% engagement rate and 0 configured key events."
    },
    "90d": {
      "period": "2026-06-17 to 2026-09-14",
      "clicks": 0,
      "impressions": 44,
      "ctr": 0,
      "position": 26.257638888888888,
      "nonBrandedClicks": null,
      "nonBrandedImpressions": null,
      "aiFeatureImpressions": null,
      "aiCitations": null,
      "citedPages": null,
      "bingClicks": 0,
      "bingImpressions": 0,
      "users": null,
      "newUsers": null,
      "returningUsers": null,
      "sessions": null,
      "engagedSessions": null,
      "engagementRate": null,
      "organicSessions": null,
      "aiSessions": null,
      "resourceViews": null,
      "resourceDownloads": null,
      "resourceLeads": null,
      "consultingEnquiries": null,
      "bookingStarts": null,
      "bookingCompletions": null,
      "bookClicks": null,
      "conversionRate": null,
      "topSources": null,
      "topLandingPages": null,
      "devices": null,
      "countries": null,
      "newVsReturning": {"new": null, "returning": null},
      "queries": [],
      "pages": [],
      "groundingQueries": null,
      "aiAssistantSessions": null,
      "notes": "GSC settled through 2026-09-14: 0 clicks and 44 impressions. Bing returned 0 clicks and 0 impressions. GA4 period-specific 90-day values are not populated because the connected GA4 reporting result currently resolves to its settled 28-day window."
    },
    "month": {
      "period": "2026-09-01 to 2026-09-14",
      "clicks": 0,
      "impressions": 44,
      "ctr": 0,
      "position": 26.257638888888888,
      "nonBrandedClicks": null,
      "nonBrandedImpressions": null,
      "aiFeatureImpressions": null,
      "aiCitations": null,
      "citedPages": null,
      "bingClicks": 0,
      "bingImpressions": 0,
      "users": null,
      "newUsers": null,
      "returningUsers": null,
      "sessions": null,
      "engagedSessions": null,
      "engagementRate": null,
      "organicSessions": null,
      "aiSessions": null,
      "resourceViews": null,
      "resourceDownloads": null,
      "resourceLeads": null,
      "consultingEnquiries": null,
      "bookingStarts": null,
      "bookingCompletions": null,
      "bookClicks": null,
      "conversionRate": null,
      "topSources": null,
      "topLandingPages": null,
      "devices": null,
      "countries": null,
      "newVsReturning": {"new": null, "returning": null},
      "queries": [],
      "pages": [],
      "groundingQueries": null,
      "aiAssistantSessions": null,
      "notes": "September-to-date settled GSC window through 2026-09-14: 0 clicks and 44 impressions. August had 0 GSC impressions. GA4 calendar-month values remain null because the connector currently resolves to the settled 28-day reporting window."
    },
    "prev-month": {
      "period": "2026-08-01 to 2026-08-31",
      "clicks": 0,
      "impressions": 0,
      "ctr": 0,
      "position": 0,
      "nonBrandedClicks": null,
      "nonBrandedImpressions": null,
      "aiFeatureImpressions": null,
      "aiCitations": null,
      "citedPages": null,
      "bingClicks": 0,
      "bingImpressions": 0,
      "users": null,
      "newUsers": null,
      "returningUsers": null,
      "sessions": null,
      "engagedSessions": null,
      "engagementRate": null,
      "organicSessions": null,
      "aiSessions": null,
      "resourceViews": null,
      "resourceDownloads": null,
      "resourceLeads": null,
      "consultingEnquiries": null,
      "bookingStarts": null,
      "bookingCompletions": null,
      "bookClicks": null,
      "conversionRate": null,
      "topSources": null,
      "topLandingPages": null,
      "devices": null,
      "countries": null,
      "newVsReturning": {"new": null, "returning": null},
      "queries": [],
      "pages": [],
      "groundingQueries": null,
      "aiAssistantSessions": null,
      "notes": "August 2026 GSC returned 0 clicks and 0 impressions for the checked calendar month. GA4 calendar-month values remain null because the connector currently resolves to the settled 28-day reporting window."
    },
    "baseline": {
      "period": "2026-09-16 onward",
      "clicks": null,
      "impressions": null,
      "ctr": null,
      "position": null,
      "nonBrandedClicks": null,
      "nonBrandedImpressions": null,
      "aiFeatureImpressions": null,
      "aiCitations": null,
      "citedPages": null,
      "bingClicks": null,
      "bingImpressions": null,
      "users": null,
      "newUsers": null,
      "returningUsers": null,
      "sessions": null,
      "engagedSessions": null,
      "engagementRate": null,
      "organicSessions": null,
      "aiSessions": null,
      "resourceViews": null,
      "resourceDownloads": null,
      "resourceLeads": null,
      "consultingEnquiries": null,
      "bookingStarts": null,
      "bookingCompletions": null,
      "bookClicks": null,
      "conversionRate": null,
      "topSources": null,
      "topLandingPages": null,
      "devices": null,
      "countries": null,
      "newVsReturning": {"new": null, "returning": null},
      "queries": [],
      "pages": [],
      "groundingQueries": null,
      "aiAssistantSessions": null,
      "notes": "Baseline window preserved. No settled GSC data is available for 2026-09-16 onward; latest settled GSC date is 2026-09-14."
    }
  },
  "queries": [
    {"query": "fractional marketing leader", "clicks": 0, "impressions": 13, "ctr": 0, "position": 34.15384615384615},
    {"query": "siddharth bhattacharjee", "clicks": 0, "impressions": 8, "ctr": 0, "position": 7.625},
    {"query": "full marketing stack", "clicks": 0, "impressions": 2, "ctr": 0, "position": 48.5},
    {"query": "full-stack marketing", "clicks": 0, "impressions": 1, "ctr": 0, "position": 41},
    {"query": "full stack marketer", "clicks": 0, "impressions": 1, "ctr": 0, "position": 88},
    {"query": "when to hire a fractional marketing director", "clicks": 0, "impressions": 2, "ctr": 0, "position": 87.5}
  ],
  "pages": [
    {"page": "https://www.siddharthbhattacharjee.in/blog/when-to-hire-a-fractional-marketing-leader", "clicks": 0, "impressions": 20, "ctr": 0, "position": 41.2},
    {"page": "https://www.siddharthbhattacharjee.in/", "clicks": 0, "impressions": 19, "ctr": 0, "position": 6.947368421052632},
    {"page": "https://www.siddharthbhattacharjee.in/blog/what-is-full-stack-marketing", "clicks": 0, "impressions": 5, "ctr": 0, "position": 53.4},
    {"page": "https://www.siddharthbhattacharjee.in/services", "clicks": 0, "impressions": 1, "ctr": 0, "position": 10}
  ],
  "ai": {
    "groundingQueries": null,
    "citedPages": null,
    "aiAssistantSessions": 0,
    "googleAiFeatureVisibility": null,
    "bingAiCitations": null,
    "notes": "GA4 reports 0 identifiable AI-assistant referral sessions in the settled 28-day window. Google AI Overviews/AI Mode are not separately attributable in GA4, so they remain unmeasured here. No Google AI-feature rows or citation data were returned by the connected Search Console sources."
  },
  "opportunities": [],
  "bookOpportunities": [],
  "goals": [
    {"label": "Non-branded visibility", "target": "+50% impressions in 90 days", "cluster": "SEO"},
    {"label": "Non-branded traffic", "target": "+30% clicks in 90 days", "cluster": "SEO"},
    {"label": "Priority queries", "target": "5+ top-10 queries in 90 days", "cluster": "SEO"},
    {"label": "AI visibility", "target": "Establish and grow measurable AI-feature visibility", "cluster": "AEO/GEO"},
    {"label": "AI citations", "target": "Build recurring citations for relevant business questions", "cluster": "GEO"},
    {"label": "Book growth", "target": "Build a measurable search-to-purchase journey for The Sovereign Brand", "cluster": "Book"},
    {"label": "Commercial outcome", "target": "Connect organic discovery to resource leads and consulting enquiries", "cluster": "Business"}
  ],
  "notes": "Verified sync after GA4 property mapping. The GA4 property Siddharth Bhattacharjee Portfolio is now linked to sc-domain:siddharthbhattacharjee.in in GSC Wizard. GSC settled through 2026-09-14 and Bing is configured; both returned zero clicks, with GSC showing 44 impressions in the 28-day window. GA4 settled reporting returned 156 sessions, 128 active users, 42.95% engagement rate, 0 configured key events, 3 Gumroad book-click events and no ecommerce purchases/revenue. No PII is stored and no values are inferred as purchases or consulting conversions."
} as unknown as DashboardData;
function n(v:number|null,s=''){return v===null?'Awaiting data':`${v.toLocaleString()}${s}`;}
function p(v:number|null){return v===null?'Awaiting data':`${v.toFixed(1)}%`;}
function pos(v:number|null){return v===null?'Awaiting data':v.toFixed(1);}
function Funnel({items}:{items:FunnelItem[]}){return <div className="funnel">{items.map((x,i)=><div className="funnel-step" key={x.label}><div className="funnel-bar" style={{width:`${Math.max(12,100-i*13)}%`}}><span>{x.label}</span><strong>{n(x.value)}</strong></div>{x.rate!==undefined&&x.rate!==null&&<small>{x.rate.toFixed(1)}% of previous stage</small>}</div>)}</div>}

const ranges=[['7d','Last 7 days'],['28d','Last 28 days'],['90d','Last 90 days'],['month','This month'],['prev-month','Previous month'],['baseline','Since baseline']];

export default function DashboardClient(){
 const [d]=useState<DashboardData>(INITIAL_DATA);
 const [range,setRange]=useState('28d');
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
