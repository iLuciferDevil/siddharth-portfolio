import fs from 'node:fs';
import path from 'node:path';
import DashboardClient from './DashboardClient';

export default function Page() {
  const data = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'data', 'search-dashboard.json'), 'utf8')
  );
  return <DashboardClient initialData={data} />;
}
