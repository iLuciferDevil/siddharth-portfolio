import Link from 'next/link';
import {ArrowUpRight,CheckCircle2} from 'lucide-react';
import {caseStudies} from '../../../lib/case-studies';
import styles from '../case-study.module.css';

export async function generateStaticParams(){return caseStudies.map(c=>({slug:c.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const c=caseStudies.find(x=>x.slug===slug);return {title:c?.title||'Case Study',description:c?.summary||'Marketing case study',alternates:{canonical:`https://siddharthbhattacharjee.in/case-studies/${slug}`}};}

export default async function CaseStudy({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const c=caseStudies.find(x=>x.slug===slug);if(!c)return null;
 const related=caseStudies.filter(x=>x.slug!==c.slug&&x.type===c.type).slice(0,3);
 const jsonLd={'@context':'https://schema.org','@type':'Article','headline':c.title,'description':c.summary,'author':{'@type':'Person','name':'Siddharth Bhattacharjee','url':'https://siddharthbhattacharjee.in/about'},'mainEntityOfPage':`https://siddharthbhattacharjee.in/case-studies/${c.slug}`,'about':c.category};
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem',position:1,name:'Proof of work',item:'https://siddharthbhattacharjee.in/case-studies'},{'@type':'ListItem',position:2,name:c.title,item:`https://siddharthbhattacharjee.in/case-studies/${c.slug}`}]};
 return <main className="surface-pearl commercial-page">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}} />
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}} />
  <article className={styles.detail}>
   <div className="container">
    <header className={styles.hero}>
     <div className={styles.kicker}><span>{c.category}</span><span className={c.type==='Illustrative strategy'?styles.illustrative:styles.experience}>{c.type==='Illustrative strategy'?'Illustrative strategy':'First-hand experience'}</span></div>
     <h1 className="display h-xl">{c.title}</h1>
     <p className={styles.lead}>{c.summary}</p>
     <div className={styles.proofBand}>
      <div><span className={styles.eyebrow}>Proof</span><p>{c.proof}</p></div>
      {c.type==='Illustrative strategy'&&<div><span className={styles.eyebrow}>Disclosure</span><p>Hypothetical case. Numbers are illustrative, not client results.</p></div>}
     </div>
    </header>
    <section className={styles.lesson}><div><span className={styles.eyebrow}>The strategic lesson</span><h2>{c.lesson}</h2></div><p>{c.caveat||'This case is written to show the problem, reasoning, operating choices and measurement logic behind the work. The objective is not to turn one outcome into a generic success story.'}</p></section>
    <section className={styles.twoCol}><div><span className={styles.eyebrow}>01 · The problem</span><h2>What was actually stuck?</h2></div><div><p>{c.problem}</p></div></section>
    <section className={styles.twoCol}><div><span className={styles.eyebrow}>02 · Diagnosis</span><h2>What did the evidence suggest?</h2></div><div><p>{c.diagnosis}</p></div></section>
    <section className={styles.workSection}><div><span className={styles.eyebrow}>03 · The work</span><h2 className="display h-lg">From diagnosis to intervention.</h2></div><div className={styles.steps}>{c.approach.map((item,i)=><div className={styles.step} key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div></section>
    <section className={styles.measureSection}><div><span className={styles.eyebrow}>04 · Measurement</span><h2>What should move if the strategy is working?</h2></div><div className={styles.measureList}>{c.measurement.map(item=><div key={item}><CheckCircle2 size={18}/><span>{item}</span></div>)}</div></section>
    <section className={styles.outcomeSection}><div><span className={styles.eyebrow}>05 · Outcome</span><h2>What changed?</h2></div><div>{c.outcome.map(item=><p key={item}>{item}</p>)}</div></section>
    <section className={styles.principles}><div><span className={styles.eyebrow}>06 · What I would carry forward</span><h2>Principles, not playbooks.</h2></div><div>{c.principles.map((item,i)=><div className={styles.principle} key={item}><span>0{i+1}</span><p>{item}</p></div>)}</div></section>
    <section className={styles.bottomNav}><div><span className={styles.eyebrow}>More proof of work</span><h2>See how the same thinking changes across different marketing problems.</h2></div><div className={styles.related}>{related.map(r=><Link href={`/case-studies/${r.slug}`} key={r.slug}><span>{r.category}</span><strong>{r.title}</strong><ArrowUpRight size={17}/></Link>)}</div></section>
   </div>
  </article>
  <section className="surface-ink commercial-close"><div className="container commercial-close-inner"><div><p className="label">Your problem</p><h2 className="display h-lg">The next case study could be yours.</h2></div><div><p>Bring the business problem first. I will diagnose the constraint before recommending a channel, package or campaign.</p><Link className="button" href="/#booking">Talk about the problem <ArrowUpRight size={16}/></Link></div></div></section>
 </main>
}
