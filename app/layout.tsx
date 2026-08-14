import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://siddharthbhattacharjee.in'),
  title: { default: 'Siddharth Bhattacharjee | Marketing Leader & Consultant', template: '%s | Siddharth Bhattacharjee' },
  description: 'Siddharth Bhattacharjee is a marketing leader and consultant specialising in brand strategy, growth marketing, product marketing, CRM, go-to-market and SEO.',
  keywords: ['Siddharth Bhattacharjee','marketing consultant India','marketing leader','growth marketing consultant','brand strategy consultant','product marketing consultant','fractional marketing leader','SEO consultant India'],
  alternates: { canonical: 'https://siddharthbhattacharjee.in' },
  openGraph: { title: 'Siddharth Bhattacharjee | Marketing Leader & Consultant', description: 'Brand, growth, product marketing, CRM and go-to-market strategy.', url: 'https://siddharthbhattacharjee.in', siteName: 'Siddharth Bhattacharjee', type: 'website', images: ['/siddharth-bhattacharjee.jpg'] },
  twitter: { card: 'summary_large_image', title: 'Siddharth Bhattacharjee | Marketing Leader & Consultant', description: 'Brand, growth, product marketing, CRM and go-to-market strategy.', images: ['/siddharth-bhattacharjee.jpg'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><Header/>{children}<Footer/></body></html>;
}
