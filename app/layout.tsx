import type { Metadata } from 'next';
import './globals.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://siddharthbhattacharjee.in'),
  title: { default: 'Siddharth Bhattacharjee | Marketing Consultant for B2B & B2C Businesses', template: '%s | Siddharth Bhattacharjee' },
  description: 'Marketing consultant helping founders and CEOs find the growth problem that is costing the most - then fix it. Strategy, demand, positioning, product marketing, CRM and SEO.',
  keywords: ['marketing consultant India','growth marketing consultant','B2B marketing consultant','fractional marketing leader','brand positioning consultant','product marketing consultant','Siddharth Bhattacharjee'],
  alternates: { canonical: 'https://siddharthbhattacharjee.in' },
  openGraph: { title: 'Siddharth Bhattacharjee | Marketing Consultant', description: 'Find the growth problem that is costing you the most - then fix it.', url: 'https://siddharthbhattacharjee.in', siteName: 'Siddharth Bhattacharjee', type: 'website', images: ['/siddharth-bhattacharjee.jpg'] },
  twitter: { card: 'summary_large_image', title: 'Siddharth Bhattacharjee | Marketing Consultant', description: 'Find the growth problem that is costing you the most - then fix it.', images: ['/siddharth-bhattacharjee.jpg'] },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const person = {'@context':'https://schema.org','@type':'Person','name':'Siddharth Bhattacharjee','url':'https://siddharthbhattacharjee.in','jobTitle':'Marketing Consultant','description':'Marketing consultant working with B2B and B2C businesses on strategy, growth, positioning, product marketing, GTM, CRM and SEO.','image':'https://siddharthbhattacharjee.in/siddharth-bhattacharjee.jpg','knowsAbout':['Marketing strategy','B2B marketing','B2C marketing','Growth marketing','Brand strategy','Product marketing','Go-to-market strategy','CRM','SEO']};
  const book = {'@context':'https://schema.org','@type':'Book','name':'The Sovereign Brand: The AI Marketing Playbook for the Ambitious Professional','author':{'@type':'Person','name':'Siddharth Bhattacharjee'},'bookFormat':'https://schema.org/EBook','url':'https://www.amazon.in/Sovereign-Brand-Marketing-Ambitious-Professional-ebook/dp/B0H1CPMBLN'};
  return <html lang="en"><body><Header />{children}<div className="site-foot"><Footer /></div><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(book) }} /></body></html>;
}
