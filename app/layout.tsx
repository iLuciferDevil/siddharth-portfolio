import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import GoogleAnalytics from './GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://siddharthbhattacharjee.in'),
  title: { default: 'Siddharth Bhattacharjee | Marketing Leader & Consultant', template: '%s | Siddharth Bhattacharjee' },
  description: 'Siddharth Bhattacharjee is a marketing leader and consultant specialising in growth marketing, marketing strategy, product marketing, go-to-market and fractional marketing leadership.',
  keywords: ['Siddharth Bhattacharjee','marketing consultant India','marketing consultant Bangalore','marketing strategy consultant India','growth marketing consultant India','product marketing consultant India','fractional CMO India','fractional marketing leader India','go-to-market consultant India'],
  alternates: { canonical: 'https://siddharthbhattacharjee.in' },
  openGraph: { title: 'Siddharth Bhattacharjee | Marketing Leader & Consultant', description: 'Marketing strategy, growth, product marketing, go-to-market and fractional marketing leadership.', url: 'https://siddharthbhattacharjee.in', siteName: 'Siddharth Bhattacharjee', type: 'website', images: ['/siddharth-bhattacharjee.jpg'] },
  twitter: { card: 'summary_large_image', title: 'Siddharth Bhattacharjee | Marketing Leader & Consultant', description: 'Marketing strategy, growth, product marketing, go-to-market and fractional marketing leadership.', images: ['/siddharth-bhattacharjee.jpg'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body><GoogleAnalytics/><Header/>{children}<Footer/></body></html>;
}
