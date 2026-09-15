import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { posts,getPost } from '../../../lib/posts';

export async function generateStaticParams(){return posts.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getPost(slug);return {title:p?.title||'Marketing Insight',description:p?.excerpt};}

export default async function PostPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const p=getPost(slug); if(!p)return null;
  const resourceSlug={
    'Marketing Strategy Canvas':'marketing-strategy-canvas','B2B Marketing Canvas':'b2b-marketing-canvas','Landing Page Checklist':'landing-page-checklist','Brand Positioning Worksheet':'brand-positioning-worksheet','GTM Planning Template':'gtm-template','Lifecycle Marketing Map':'lifecycle-marketing-map'
  }[p.leadMagnet] || 'marketing-strategy-canvas';
  return <main className="surface-pearl"><article className="container insight-article"><header className="insight-header"><p className="label">{p.category} · {p.readTime}</p><h1 className="display">{p.title}</h1><p className="insight-deck">{p.excerpt}</p><div className="insight-byline"><span>By Siddharth Bhattacharjee</span><span>{p.date}</span><span>Independent marketing consultant</span></div></header><div className="insight-body">{p.content.map((block,i)=>block.type==='h2'?<h2 key={i}>{block.text}</h2>:block.type==='h3'?<h3 key={i}>{block.text}</h3>:block.type==='ul'?<ul key={i}>{block.text.split(';').map(x=><li key={x}>{x}</li>)}</ul>:<p key={i}>{block.text}</p>)}<section className="insight-resource"><div><div className="eyebrow">Use the thinking</div><h2>Want to work through this on your own business?</h2></div><div><p>The <strong>{p.leadMagnet}</strong> turns the ideas in this article into a practical working exercise.</p><Link className="button" href={`/resources/${resourceSlug}`}>Get the resource <ArrowUpRight size={16}/></Link></div></section><section className="insight-end"><div><div className="eyebrow">The next step</div><h2>If the problem is real, it is worth diagnosing properly.</h2></div><div><p>I help founders, business owners and marketing teams work through strategy, positioning, growth and go-to-market problems. No generic retainer pitch. Start with the problem.</p><Link className="button" href="/#booking">Talk about your business <ArrowUpRight size={16}/></Link></div></section></div></article></main>
}