import Link from 'next/link';
import {ArrowUpRight} from 'lucide-react';
import ResourceGate from '../../../components/ResourceGate';
import {resources,getResource} from '../../../lib/resources';

export async function generateStaticParams(){return resources.map(r=>({slug:r.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=getResource(slug);return {title:`${r?.title||'Marketing Resource'} | Siddharth Bhattacharjee`,description:r?.description};}

export default async function Resource({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const r=getResource(slug);if(!r)return null;
 return <main className="surface-pearl"><article className="container resource-detail"><div className="resource-detail-head"><div><p className="label">Free working resource</p><h1 className="display h-lg">{r.title}</h1><p className="resource-lead">{r.description}</p></div><aside className="resource-aside"><div className="eyebrow">What this helps you decide</div><p>{r.promise}</p><span>Created by Siddharth Bhattacharjee</span></aside></div><div className="resource-gate-wrap"><ResourceGate slug={slug} title={r.title}/></div><section className="resource-preview"><div><div className="eyebrow">Inside the resource</div><h2>Questions worth answering before you spend more money on marketing.</h2></div><div>{r.sections.map((section,i)=><div className="resource-section-preview" key={section.heading}><div className="num">{String(i+1).padStart(2,'0')}</div><div><h3>{section.heading}</h3>{section.items.map(item=><p key={item}>{item}</p>)}</div></div>)}</div></section><section className="resource-cta"><div><div className="eyebrow">If the framework exposes a bigger problem</div><h2>That is usually where I come in.</h2></div><div><p>I work with founders, business owners and marketing teams on strategy, positioning, growth and go-to-market problems that need senior thinking and practical execution.</p><Link className="button" href="/#booking">Talk about your business <ArrowUpRight size={16}/></Link></div></section></article></main>;
}
