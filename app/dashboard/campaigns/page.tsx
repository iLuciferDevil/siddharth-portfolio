import CampaignBuilder from './CampaignBuilder';
import './campaigns.css';

export const metadata = {
  title: 'Campaign Link Builder | Private Dashboard',
  description: 'Private UTM campaign builder for Siddharth Bhattacharjee.',
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = 'force-dynamic';

export default function CampaignsPage() {
  return <CampaignBuilder />;
}
