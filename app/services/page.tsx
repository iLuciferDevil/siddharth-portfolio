import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, CalendarDays } from 'lucide-react';

const services = [
  {k:'01', title:'Marketing strategy', desc:'A clear view of where to play, who to win, how to position and what to do next.', items:['Marketing strategy audit','Positioning & messaging review','Audience and customer journey mapping','Go-to-market blueprint']},
  {k:'02', title:'Growth & conversion', desc:'Find the leaks between attention, consideration, conversion and retention.', items:['Landing page conversion review','Growth funnel teardown','Acquisition strategy','CRM / retention review']},
  {k:'03', title:'Brand & product marketing', desc:'Make the product easier to understand, easier to choose and harder to forget.', items:['Brand health check','Product marketing review','Launch strategy','Campaign / creative audit']},
  {k:'04', title:'Fractional marketing advisory', desc:'Senior marketing thinking for founders and teams who need direction without a full-time leadership hire.', items:['90-minute founder session','Monthly marketing advisory','Quarterly growth planning','Marketing team / agency review']},
];

const quick = [
  ['Landing page conversion review','I review your landing page, proposition, hierarchy, proof and CTA flow, then give you a prioritised conversion teardown.'],
  ['Marketing funnel teardown','A practical review of where customers drop off and which changes are most likely to improve movement through the funnel.'],
  ['Positioning & messaging review','Pressure-test what you say, who you say it to and whether the message gives people a reason to choose you.'],
  ['Founder strategy session','Bring one messy marketing problem. Leave with a sharper diagnosis, priorities and an actionable next-step plan.'],
];

export const metadata = {title:'Marketing Services | Siddharth Bhattacharjee',description:'Marketing strategy, growth, conversion, brand, product marketing and fractional advisory services from Siddharth Bhattacharjee.'};

export default function Services(){return <main>
  <section className="container services-hero"><div className="eyebrow">Marketing services · strategy · growth · advisory</div><h1 className="display">Senior marketing thinking.<br/><span>Applied to the problem in front of you.</span></h1><p>Not every business needs a big agency engagement. Sometimes you need a strategic reset. Sometimes you need someone to tear down a landing page. Sometimes you need a senior marketer in the room for a few months.</p><div className="actions"><a className="button" href="/#booking">Book a conversation <CalendarDays size={16}/></a><Link className="button alt" href="/#work">See the work</Link></div></section>
  <section className="container section"><div className="services-page-grid">{services.map(s=><article className="service-card large" key={s.k}><div className="num">{s.k}</div><h2>{s.title}</h2><p>{s.desc}</p><div className="mini-services">{s.items.map(x=><span key={x}><CheckCircle2 size={14}/>{x}</span>)}</div></article>)}</div></section>
  <section className="dark-section section"><div className="container"><div className="section-head"><h2 className="display">Small scope.<br/>Real expertise.</h2><p>You can start with one high-value problem instead of committing to a large engagement. These are designed to be useful, focused and easy to say yes to.</p></div><div className="quick-grid">{quick.map(([title,desc])=><div className="quick-card" key={title}><div className="num">Fixed-scope service</div><h3>{title}</h3><p>{desc}</p><a href="/#booking">Start here <ArrowUpRight size={15}/></a></div>)}</div></div></section>
  <section className="container section services-fit"><div><div className="eyebrow">Best fit</div><h2 className="display">For founders, teams<br/>and ambitious products.</h2></div><div className="fit-list"><div><strong>Early-stage / growing businesses</strong><span>You have traction, but marketing feels fragmented or too dependent on founder intuition.</span></div><div><strong>Marketing teams</strong><span>You need an experienced outside perspective on strategy, funnel performance, positioning or prioritisation.</span></div><div><strong>Product & growth teams</strong><span>You need customer-led marketing thinking that works across product, acquisition, CRM and brand.</span></div></div></section>
  <section className="container cta"><div className="cta-box"><div><div className="eyebrow">Not sure what you need?</div><h2>Start with the problem, not the service.</h2></div><div><p>Send a short brief. I&apos;ll help you figure out whether the right answer is a quick audit, a strategy project, ongoing advisory or simply a conversation.</p><a className="button" href="/#booking">Tell me what&apos;s stuck <ArrowUpRight size={16}/></a></div></div></section>
</main>}
