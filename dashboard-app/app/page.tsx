import DashboardClient from './DashboardClient';
import rawDashboardData from './data/search-dashboard.json';

const dashboardData =
  rawDashboardData as unknown as Parameters<typeof DashboardClient>[0]['initialData'];

export default function Page() {
  return <DashboardClient initialData={dashboardData} />;
}
