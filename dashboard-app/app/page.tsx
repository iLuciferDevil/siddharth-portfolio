import DashboardClient from './DashboardClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function getDashboardData() {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const response = await fetch(`${base}/data/search-dashboard.json?t=${Date.now()}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Dashboard data request failed: ${response.status}`);
  }

  return response.json();
}

export default async function Page() {
  const initialData = await getDashboardData();
  return <DashboardClient initialData={initialData} />;
}
