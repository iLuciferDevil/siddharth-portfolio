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
  const person={
    '@context':'https://schema.org','@type':'Person','name':'Siddharth Bhattacharjee','url':'https://siddharthbhattacharjee.in','jobTitle':'Marketing Consultant','description':'Marketing consultant working with B2B and B2C businesses on strategy, growth, positioning, product marketing, GTM, CRM and SEO.','image':'https://siddharthbhattacharjee.in/siddharth-bhattacharjee.jpg','knowsAbout':['Marketing strategy','B2B marketing','B2C marketing','Growth marketing','Brand strategy','Product marketing','Go-to-market strategy','CRM','SEO']
  };
  return <html lang="en"><body><Header/>{children}<Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person)}}/></body></html>;
}
