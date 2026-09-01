import type { Metadata } from 'next';
import Link from 'next/link';
import {ArrowUpRight, BookOpen, BrainCircuit, ShieldCheck, Users, Zap} from 'lucide-react';
import './book.css';

export const metadata: Metadata = {
  title: 'The Sovereign Brand — The AI Marketing Playbook',
  description: 'The Sovereign Brand by Siddharth Bhattacharjee: Volume I of a four-volume series on AI marketing architecture, agentic systems, brand intelligence and the future of marketing.',
  keywords: ['The Sovereign Brand','AI marketing book','AI marketing strategy','agentic marketing','AI marketing architecture','Siddharth Bhattacharjee'],
  alternates: {canonical: 'https://siddharthbhattacharjee.in/book'},
  openGraph: {
    title: 'The Sovereign Brand — The AI Marketing Playbook for the Ambitious Professional',
    description: 'Volume I of The Sovereign Brand: a practical playbook for building AI-native marketing systems without losing human judgement, brand identity or strategic control.',
    url: 'https://siddharthbhattacharjee.in/book',
    siteName: 'Siddharth Bhattacharjee',
    type: 'book',
    images: ['/the-sovereign-brand-cover.svg'],
  },
};

const gumroad = 'https://siddster14.gumroad.com/l/sovereignbrand?ref=siddharth-portfolio';
const kindle = 'https://www.amazon.in/Sovereign-Brand-Marketing-Ambitious-Professional-ebook/dp/B0H1CPMBLN?ref_=siddharth-portfolio';

const chapters = [
  ['01', 'The Death of the Funnel'],
  ['02', 'The Sovereign Stack'],
  ['03', 'The Segment of One'],
  ['04', 'The Content Machine'],
  ['05', 'The Privacy Moat'],
  ['06', 'The Human 20%'],
  ['07', 'From India to the World'],
  ['08', 'Build Your Sovereign Brand'],
];

export default function BookPage(){
  return <main className="book-page">
    <section className="container book-hero">
      <div>
        <div className="book-kicker">Volume I · The Agentic Revolution</div>
        <h1>The <em>Sovereign</em> Brand.</h1>
        <p className="book-subtitle">The AI Marketing Playbook for the Ambitious Professional.</p>
        <p className="book-lead">Marketing is moving from campaigns to systems. This book is a practical framework for senior marketers, founders and business leaders who want to understand what changes when AI becomes part of the operating architecture — not just another tool in the stack.</p>
        <div className="book-actions">
          <a className="button gold" data-book-cta="gumroad" href={gumroad} target="_blank" rel="noreferrer">Get the book <ArrowUpRight size={16}/></a>
          <a className="button alt" data-book-cta="amazon" href={kindle} target="_blank" rel="noreferrer">Kindle edition <BookOpen size={16}/></a>
        </div>
        <div className="book-meta"><span>Volume I</span><span>8 chapters</span><span>127-page edition</span><span>Four-volume series</span></div>
      </div>
      <div className="book-visual">
        <div className="book-glow"/>
        <img className="book-cover-image" src="/the-sovereign-brand-cover.svg" alt="The Sovereign Brand by Siddharth Bhattacharjee, Volume I" />
        <div className="cover-badge">Volume I<br/>The Agentic Revolution</div>
      </div>
    </section>

    <div className="proof-band"><div className="container proof-band-inner"><strong>Not an AI-tools manual.</strong><span>A framework for rethinking marketing as an intelligent, continuously learning system — with architecture, governance, metrics and a 90-day implementation path.</span></div></div>

    <section className="container book-section">
      <div className="book-section-head"><h2>What the book<br/>actually teaches.</h2><p>The book starts with the changing customer journey and ends with a practical roadmap for building a Sovereign Brand. The emphasis is on operating models, not tool lists.</p></div>
      <div className="book-grid">
        <article className="book-card"><div className="book-num">01 / ARCHITECTURE</div><h3>Build the system, not the stack of tools.</h3><p>The Sovereign Stack connects Sensory, Cognition and Action layers. The Brand Soul sits at the centre, giving agents the context and guardrails they need to act intelligently.</p></article>
        <article className="book-card"><div className="book-num">02 / PERSONALISATION</div><h3>Move from segments to individual intelligence.</h3><p>The Segment of One chapter examines the data architecture, behavioural signals and value exchange required to make individual-level personalisation operational at scale.</p></article>
        <article className="book-card"><div className="book-num">03 / EXECUTION</div><h3>Automate the 80%. Protect the 20%.</h3><p>Content, analytics, SEO, CRM, media and monitoring can become agentic. Strategic direction, cultural judgement, relationships, ethics and vision remain human responsibilities.</p></article>
      </div>
    </section>

    <section className="book-section dark">
      <div className="container">
        <div className="book-section-head"><h2>The Sovereign<br/>Operating Model.</h2><p>The core idea is simple: AI should not sit beside the marketing organisation. It should become part of how the organisation senses, thinks, acts and learns.</p></div>
        <div className="stack">
          <article className="stack-panel"><div className="book-num">THE STACK</div><h3>Three layers. One operating system.</h3><p>The book defines a three-layer architecture for agentic marketing and shows how information should move through it.</p><div className="stack-list"><div><strong>Sensory</strong><span>Continuously detect customer, search, competitor, social and market signals.</span></div><div><strong>Cognition</strong><span>Use the Brand Soul, RAG, strategic context, guardrails and learning memory to interpret signals.</span></div><div><strong>Action</strong><span>Deploy specialised agents for content, media, CRM, SEO, analytics and social execution.</span></div></div></article>
          <article className="stack-panel"><div className="book-num">THE HUMAN 20%</div><h3>Automation changes the job. It does not erase the job.</h3><p>The book separates operational work from the human contribution that creates differentiation and protects the brand.</p><div className="stack-list"><div><strong>Strategy</strong><span>Decide where the brand goes and why.</span></div><div><strong>Judgement</strong><span>Bring cultural intuition, ethics and crisis judgement to decisions machines cannot own.</span></div><div><strong>Relationships</strong><span>Lead partnerships, stakeholders and high-value conversations where human trust matters.</span></div><div><strong>Vision</strong><span>Define the long-term narrative that gives the automated 80% its meaning.</span></div></div></article>
        </div>
      </div>
    </section>

    <section className="container book-section">
      <div className="book-section-head"><h2>Eight chapters.<br/>One transformation.</h2><p>Volume I moves from diagnosis to architecture to implementation. Each chapter includes frameworks, case studies, practical exercises and review questions.</p></div>
      <div className="book-toc">{chapters.map(([num,title]) => <div className="toc-item" key={num}><b>{num}</b><span>{title}</span></div>)}</div>
    </section>

    <section className="book-section dark">
      <div className="container book-author">
        <div><div className="book-num">ABOUT THE AUTHOR</div><h2>Written from inside the engine room of scale.</h2></div>
        <div className="book-author-copy"><p><strong>Siddharth Bhattacharjee</strong> is a Senior Brand Strategist and AI Marketing Architect. The book draws on his experience operating across Amazon, commerce, fintech, entertainment, consumer brands and digital products.</p><p>The author's note describes the central motivation directly: experienced marketers are not losing their value; the execution layer of their work is changing. The opportunity is to move up the value chain and become the architect of systems that combine human expertise with AI capability.</p><div className="book-note">“The Sovereign Brand is not a destination. It is a direction.”</div></div>
      </div>
    </section>

    <section className="container book-section">
      <div className="book-cta">
        <div><div className="book-num">START WITH VOLUME I</div><h2>Build the marketing system you will need next.</h2><p>Read the playbook, pressure-test the frameworks against your own organisation and decide where the first 90-day build should begin.</p></div>
        <div className="book-buy"><a className="button" data-book-cta="gumroad" href={gumroad} target="_blank" rel="noreferrer">Buy on Gumroad <ArrowUpRight size={16}/></a><a className="button alt" data-book-cta="amazon" href={kindle} target="_blank" rel="noreferrer">Read on Kindle <ArrowUpRight size={16}/></a><div className="book-small">Volume II, III and IV are planned as the series continues.</div></div>
      </div>
    </section>

    <section className="container book-section" id="work-with-me">
      <div className="book-section-head"><h2>Want to apply it<br/>to your business?</h2><p>The book is the framework. The consulting work is where the framework gets translated into your organisation's priorities, systems and metrics.</p></div>
      <div className="actions"><Link className="button" href="/#contact">Work with Siddharth <ArrowUpRight size={16}/></Link><Link className="button alt" href="/services">See consulting services <ArrowUpRight size={16}/></Link></div>
    </section>
  </main>
}
