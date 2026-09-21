import DashboardClient from './DashboardClient';

const initialData = {
  updatedAt: null,
  status: 'loading',
  site: 'siddharthbhattacharjee.in',
  baseline: { window: '', clicks: null, impressions: null, ctr: null, position: null },
  current: { period: null, clicks: null, impressions: null, ctr: null, position: null, nonBrandedClicks: null, nonBrandedImpressions: null, aiFeatureImpressions: null, aiCitations: null, citedPages: null },
  change: { clicks: null, impressions: null, ctr: null, position: null },
  funnel: {
    period: null, users: null, newUsers: null, returningUsers: null, sessions: null, engagedSessions: null, engagementRate: null,
    organicSessions: null, aiSessions: null, resourceViews: null, resourceDownloads: null, resourceLeads: null, consultingEnquiries: null,
    bookingStarts: null, bookingCompletions: null, bookClicks: null, conversionRate: null,
    topSources: [], topLandingPages: [], devices: [], countries: [], newVsReturning: { new: null, returning: null }
  },
  queries: [],
  pages: [],
  ai: { groundingQueries: [], citedPages: [] },
  opportunities: [],
  goals: []
} as Parameters<typeof DashboardClient>[0]['initialData'];

export default function Page() {
  return <DashboardClient initialData={initialData} />;
}
