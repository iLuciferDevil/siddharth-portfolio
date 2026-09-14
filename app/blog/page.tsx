import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { posts } from '../../lib/posts';

export const metadata={title:'Marketing Insights | Siddharth Bhattacharjee',description:'Practical marketing articles on strategy, B2B, B2C, growth, brand, product marketing, CRM, SEO and AI.'};

export default function Blog(){return <main className="surface-pearl"><section className="container section-head" style={{paddingTop:96}}><div><p className="label">The Marketing Brief · Insights</p><h1 className="display h-lg">Useful marketing thinking.<br/><span>For people running businesses.</span></h1></div><p>Practical frameworks, examples and case studies for founders, business owners and marketing teams. No generic motivational content.</p></section><section className="container section"><div className="blog-grid">{posts.map((p,i)=><Link href={`/blog/${p.slug}`} className={`post ${i===0?'featured':''}`} key={p.slug}><div className="num">{p.category} · {p.readTime}</div><h3>{p.title}</h3><p>{p.excerpt}</p><div className="meta">Read the article <ArrowUpRight size={14}/></div></Link>)}</div></section></main>}