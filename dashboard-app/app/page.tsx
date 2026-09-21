import DashboardClient from './DashboardClient';
import dashboardData from './data/search-dashboard.json';

export default function Page() {
  return <DashboardClient initialData={dashboardData} />;
}
