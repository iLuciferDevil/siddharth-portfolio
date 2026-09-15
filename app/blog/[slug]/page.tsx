import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import ResourceGate from '../../../components/ResourceGate';
import {posts,getPost} from '../../../lib/posts';

export async function generateStaticParams(){return posts.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=getPost(slug);if(!p)return {title:'Marketing Insight'};
 return {title:p.title,description:p.excerpt,keywords:[p.primaryKeyword,...p.secondaryKeywords],alternates:{canonical:`https://siddharthbhattacharjee.in/blog/${p.slug}`},openGraph:{title:p.title,description:p.excerpt,type:'article',publishedTime:p.date,modifiedTime:p.updated,url:`https://siddharthbhattacharjee.in/blog/${p.slug}`}};
}

export default async function PostPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const p=getPost(slug);if(!p)return null;
 const resourceSlug={'Marketing Strategy Canvas':'marketing-strategy-canvas','B2B Marketing Canvas':'b2b-marketing-canvas','Landing Page Checklist':'landing-page-checklist','Brand Positioning Worksheet':'brand-positioning-worksheet','GTM Planning Template':'gtm-template','Lifecycle Marketing Map':'lifecycle-marketing-map'}[p.leadMagnet]||'marketing-strategy-canvas';
 const related=posts.filter(x=>x.slug!==p.slug&&(x.category===p.category||x.tag===p.tag)).slice(0,3);
 const articleSchema={'@context':'https://schema.org','@type':'Article',headline:p.title,description:p.excerpt,datePublished:p.date,dateModified:p.updated,author:{'@type':'Person',name:'Siddharth Bhattacharjee',url:'https://siddharthbhattacharjee.in'},publisher:{'@type':'Person',name:'Siddharth Bhattacharjee'},mainEntityOfPage:{'@type':'WebPage','@id':`https://siddharthbhattacharjee.in/blog/${p.slug}`},keywords:[p.primaryKeyword,...p.secondaryKeywords].join(', ')};
 const breadcrumbSchema={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Writing',item:'https://siddharthbhattacharjee.in/blog'},{'@type':'ListItem',position:2,name:p.title,item:`https://siddharthbhattacharjee.in/blog/${p.slug}`}]};
 return <main className="surface-pearl"><article className="container insight-article">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema)}} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumbSchema)}} />
  <header className="insight-header"><p className="label">{p.category} · {p.readTime}</p><h1 className="display">{p.title}</h1><p className="insight-deck">{p.excerpt}</p><div className="insight-questions"><strong>This article answers</strong>{p.questions.map(q=><span key={q}>{q}</span>)}</div><div className="insight-byline"><span>By Siddharth Bhattacharjee</span><span>{p.date}</span><span>Independent marketing consultant</span></div></header>
  <div className="insight-body">
   {p.content.map((block,i)=>block.type==='h2'?<h2 key={i}>{block.text}</h2>:block.type==='h3'?<h3 key={i}>{block.text}</h3>:block.type==='ul'?<ul key={i}>{block.text.split(';').map(x=><li key={x}>{x}</li>)}</ul>:<p key={i}>{block.text}</p>)}
   <div className="insight-framework-note"><div className="eyebrow">The working framework</div><h2>Now turn the thinking into a working document.</h2><p>This article gives you the reasoning first. If you want the framework in a format you can use with your team, I can send the <strong>{p.leadMagnet}</strong> to your inbox.</p></div>
   <ResourceGate slug={resourceSlug} title={p.leadMagnet}/>
   {related.length>0&&<section className="insight-related"><div className="eyebrow">Keep reading</div><div>{related.map(r=><Link key={r.slug} href={`/blog/${r.slug}`}><span>{r.category}</span><strong>{r.title}</strong><ArrowUpRight size={15}/></Link>)}</div></section>}
   <section className="insight-end"><div><div className="eyebrow">The next step</div><h2>If the problem is real, it is worth diagnosing properly.</h2></div><div><p>I help founders, business owners and marketing teams work through strategy, positioning, growth and go-to-market problems. No generic retainer pitch. Start with the problem.</p><Link className="button" href="/#booking">Talk about your business <ArrowUpRight size={16}/></Link></div></section>
  </div>
 </article></main>
}
