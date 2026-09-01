import Image from 'next/image';
import Link from 'next/link';
import {ArrowUpRight, MoveUpRight, CalendarDays, CheckCircle2} from 'lucide-react';
import ContactForm from './ContactForm';

type Service = { id: string; title: string; body: string; mini: string[] };

const services: Service[] = [
  { id: '01 / Strategy', title: 'Find the sharpest path to growth.', body: 'Positioning, audience strategy, category thinking, GTM plans and growth roadmaps that connect marketing to business outcomes.', mini: ['Marketing strategy audit', 'Positioning & messaging review', 'Go-to-market blueprint'] },
  { id: '02 / Growth', title: 'Turn attention into action.', body: 'Acquisition, lifecycle marketing, experimentation, CRM and conversion systems designed around the customer journey.', mini: ['Landing page conversion review', 'Growth funnel audit', 'CRM / retention review'] },
  { id: '03 / Brand & Product', title: 'Make the product easier to choose.', body: 'Brand strategy, product marketing, launch planning and customer communication that turn good products into memorable businesses.', mini: ['Brand health check', 'Product launch review', 'Campaign / creative audit'] },
  { id: '04 / Fractional Advisory', title: 'Bring senior marketing thinking in.', body: 'A flexible senior marketing layer for founders and teams that need direction, prioritisation and hands-on problem solving without a full-time leadership hire.', mini: ['90-minute founder session', 'Monthly marketing advisory', 'Quarterly growth planning'] },
];

export default function Home() {
  return <main>
    <section className="container hero">
      <div className="hero-copy-wrap">
        <div className="eyebrow">Marketing leader · strategist · consultant</div>
        <h1 className="display">I turn marketing problems <span>into measurable growth.</span></h1>
        <p className="hero-copy">I&apos;m Siddharth Bhattacharjee, a marketing leader with 11+ years of experience across commerce, fintech, entertainment, consumer brands and technology. I help ambitious businesses turn marketing into measurable growth.</p>
        <div className="actions"><a className="button" href="#contact">Work with me <ArrowUpRight size={16}/></a><Link className="button alt" href="/blog">Read my thinking</Link></div>
        <div className="hero-proof"><span>Amazon</span><span>Commerce</span><span>Fintech</span><span>Entertainment</span><span>Consumer</span><span>11+ years</span></div>
      </div>
      <div className="portrait-wrap">
        <div className="portrait-frame">
          <Image src="/siddharth-bhattacharjee.jpg" alt="Siddharth Bhattacharjee, marketing leader and consultant" width={848} height={1264} priority className="portrait" />
          <div className="portrait-label"><span>SIDDHARTH BHATTACHARJEE</span><span>MARKETING / GROWTH / STRATEGY</span></div>
        </div>
        <div className="floating-stat"><strong>200M+</strong><span>customers reached through high-impact marketing programs</span></div>
      </div>
    </section>

    <div className="band"><div className="container ticker"><span>MARKETING STRATEGY</span><span>GROWTH</span><span>PRODUCT MARKETING</span><span>CRM</span><span>GO-TO-MARKET</span><span>SEO</span></div></div>

    <section className="container section" id="services">
      <div className="section-head"><h2 className="display">What I can<br/>help you solve.</h2><p>Strategy without execution is a presentation. Execution without strategy is expensive activity. I work across both.</p></div>
      <div className="services-grid">{services.map(service => <div className="service-card" key={service.id}><div className="num">{service.id}</div><h3>{service.title}</h3><p>{service.body}</p><div className="mini-services">{service.mini.map(item => <span key={item}><CheckCircle2 size={14}/>{item}</span>)}</div></div>)}</div>
      <div className="micro-offers"><div><div className="num">Quick wins</div><h3>Small problems. Senior thinking.</h3><p>You don&apos;t always need a six-week strategy project. Sometimes you need someone experienced to look at one important thing and tell you what to fix.</p></div><div className="micro-offer-list"><a href="#booking"><span>Landing page conversion review</span><b>Fixed-scope ↗</b></a><a href="#booking"><span>Marketing funnel teardown</span><b>Fixed-scope ↗</b></a><a href="#booking"><span>90-minute founder strategy session</span><b>Book ↗</b></a></div></div>
    </section>

    <section className="container section" id="work">
      <div className="section-head"><h2 className="display">Proof,<br/>not promises.</h2><p>My experience spans high-scale consumer platforms, fintech, entertainment, consumer brands and B2B technology. The common thread is building systems that make people act.</p></div>
      <div className="case"><div><h3>Amazon MX Player / Entertainment</h3><div className="tags"><span className="tag">Product marketing</span><span className="tag">Growth</span><span className="tag">Audience strategy</span></div></div><div><div className="metric">+173%</div><p>Grew streamer DAU between Aug 2023 and Mar 2024, while hours from existing streamers increased 89%+ and cross-viewership improved 180%+.</p></div></div>
      <div className="case"><div><h3>Amazon Pay / Fintech</h3><div className="tags"><span className="tag">GTM</span><span className="tag">Lifecycle</span><span className="tag">Product marketing</span></div></div><div><div className="metric">5+ launches</div><p>Supported the launch and adoption of new consumer services across travel, entertainment, bill payments, insurance and mobility.</p></div></div>
      <div className="case"><div><h3>Consumer brands & commerce</h3><div className="tags"><span className="tag">Brand</span><span className="tag">Retail</span><span className="tag">Category growth</span></div></div><div><div className="metric">200M+</div><p>Worked across customer-facing businesses and marketing programs reaching hundreds of millions of customers, with experience spanning brand building, marketplace growth and category expansion.</p></div></div>
      <div className="experience-strip"><div><strong>B2B technology</strong><span>Business development · Lead generation · Tech services</span></div><div><strong>Consumer health & personal care</strong><span>Brand management · Retail growth · Portfolio marketing</span></div><div><strong>Digital products</strong><span>Product marketing · CRM · Acquisition · Retention</span></div></div>
    </section>

    <section className="dark-section section" id="about"><div className="container"><div className="section-head"><h2 className="display">A marketer who<br/>thinks like an operator.</h2><p>I&apos;ve worked across Amazon, fintech, entertainment, commerce, health & personal care, B2B technology and digital products. That range taught me to start with the customer, then work backwards to the business.</p></div><div className="grid3"><div className="card"><div className="num">01</div><h3>Customer first</h3><p>Understand the job, friction and motivation before choosing the message or channel.</p></div><div className="card"><div className="num">02</div><h3>Commercially minded</h3><p>Marketing should move a business metric, not simply generate activity reports.</p></div><div className="card"><div className="num">03</div><h3>Data + judgement</h3><p>Use evidence to make decisions, then use judgement to see what the dashboard cannot.</p></div></div></div></section>

    <section className="container section"><div className="section-head"><h2 className="display">The marketing<br/>playbook.</h2><p>Long-form thinking on marketing, growth, brand, SEO and building businesses people actually want.</p></div><div className="blog-grid"><Link className="post featured" href="/blog/what-is-full-stack-marketing"><div className="num">Featured · Marketing Strategy</div><h3>Full-stack marketing: why modern marketers need to think beyond channels</h3><p>The modern marketer needs to connect brand, growth, product, CRM, data and distribution into one system.</p><div className="meta">7 min read <MoveUpRight size={14}/></div></Link><div style={{display:'grid',gap:16}}><Link className="post" href="/blog/how-to-build-a-marketing-strategy"><div className="num">Strategy</div><h3>How to build a marketing strategy that actually drives growth</h3><div className="meta">9 min read <MoveUpRight size={14}/></div></Link><Link className="post" href="/blog/when-to-hire-a-fractional-marketing-leader"><div className="num">Marketing Leadership</div><h3>When should you hire a fractional marketing leader?</h3><div className="meta">7 min read <MoveUpRight size={14}/></div></Link></div></div></section>

    <section className="container cta" id="contact"><div className="cta-box"><div><div className="eyebrow">Have a marketing problem?</div><h2>Let&apos;s make it a growth problem.</h2><p className="cta-note">Tell me what you&apos;re building, what is stuck and what outcome matters. I&apos;ll come prepared.</p></div><div><div className="contact-options"><a className="contact-option" href="#booking"><span><strong>Book a call</strong><small>Start with a short brief</small></span><CalendarDays size={17}/></a><a className="contact-option" href="https://wa.me/917093142389" target="_blank" rel="noreferrer"><span><strong>WhatsApp</strong><small>Message me directly</small></span><ArrowUpRight size={17}/></a><a className="contact-option" href="tel:+917093142389"><span><strong>Call</strong><small>+91 70931 42389</small></span><ArrowUpRight size={17}/></a><a className="contact-option" href="mailto:email@siddharthbhattacharjee.in"><span><strong>Email</strong><small>email@siddharthbhattacharjee.in</small></span><ArrowUpRight size={17}/></a></div></div></div></section>

    <section className="container booking" id="booking"><div className="booking-card"><div><div className="eyebrow">Send a brief</div><h2 className="display">A little context.<br/>Then we talk.</h2><p>Keep it short. This helps me understand whether I&apos;m the right person before we spend 30 minutes together.</p><div className="booking-points"><span>30-minute strategy call</span><span>No sales pitch</span><span>Practical next steps</span></div></div><ContactForm /></div></section>
  </main>;
}
