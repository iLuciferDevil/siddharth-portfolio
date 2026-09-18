import DashboardClient from './DashboardClient';

export const metadata = {
  title: 'Private Search & Funnel Dashboard | Siddharth Bhattacharjee',
  description: 'Private SEO, AEO, GEO and full-funnel performance dashboard.',
  robots: { index: false, follow: false, nocache: true },
};

export default function Dashboard() {
  return <DashboardClient />;
}
