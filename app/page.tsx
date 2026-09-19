import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BookOpen, ShoppingCart, MessageCircle, Phone, Mail } from 'lucide-react';
import Problems from '../components/Problems';
import { posts } from '../lib/posts';
import { BOOK, CONTACT } from '../lib/links';

const featured = posts.slice(0, 3);

export default function Home() {
  return (
    <main className="snap">
      <section className="surface-ink screen home-hero">
        <div className="container hero">
          <div className="hero-copy-wrap">
            <p className="label">Marketing consultant · B2B and B2C</p>
            <h1 className="display h-xl">Marketing has to do a job.</h1>
            <p className="hero-copy">If the team is busy but growth is not moving, I help find out why. I work with founders, CEOs and marketing leaders on strategy, growth, positioning, product marketing and retention, then turn the diagnosis into work the team can use.</p>
            <div className="actions">
              <a className="button" href="#booking">Start with the problem <ArrowUpRight size={16} /></a>
              <Link className="button alt" href="/book"><BookOpen size={16} /> Read The Sovereign Brand</Link>
            </div>
            <div className="hero-proof">
              <span><b>11+ yrs</b>Marketing across fintech, commerce, entertainment, consumer and B2B tech</span>
              <span><b>+173%</b>Streamer DAU growth on a documented programme</span>
              <span><b>5+ launches</b>Products launched across payments, travel, entertainment and mobility</span>
            </div>
          </div>
          <div className="portrait-wrap"><div className="portrait-frame"><Image src="/siddharth-bhattacharjee.jpg" alt="Siddharth Bhattacharjee, marketing consultant" width={1360} height={1700} priority className="portrait" /></div></div>
        </div>
      </section>

      <section className="surface-pearl screen home-problems" id="problems">
        <div className="container">
          <div className="section-head">
            <div><p className="label">Start with the business problem</p><h2 className="display h-lg">What are you trying to fix?</h2></div>
            <p>Pick the situation that is closest to yours. Open it for the approach and the work that would follow.</p>
          </div>
          <Problems />
        </div>
      </section>

      <section className="surface-ink screen" id="proof">
        <div className="container">
          <div className="section-head section-head--split">
            <div><p className="label">Proof of work</p><h2 className="display h-lg">The work matters more than the title.</h2></div>
            <p>Selected work from Amazon and earlier marketing roles. The cases explain the problem, the decisions, the measurement and what changed.</p>
          </div>
          <div className="proof-grid">
            <div className="proof-big">
              <div className="num">Amazon MX Player · Entertainment</div><div className="metric">+173%</div>
              <p>Streamer daily active growth between Aug 2023 and Mar 2024, with 89% growth in hours from existing streamers and 180% improvement in cross-viewership.</p>
              <Link href="/case-studies/streamer-dau-growth">Read the case study <ArrowUpRight size={15} /></Link>
            </div>
            <div className="proof-list">
              <div><strong>Product marketing</strong><span>Flight tickets, movie tickets, bill payments, insurance and bus tickets at Amazon Pay.</span></div>
              <div><strong>Growth and acquisition</strong><span>Acquisition, engagement and funnel work across digital products and consumer businesses.</span></div>
              <div><strong>Brand and commerce</strong><span>Marketplace brand management and category marketing across consumer brands.</span></div>
              <div><strong>CRM and lifecycle</strong><span>Push, email, segmentation, messaging and retention programmes.</span></div>
            </div>
          </div>
          <div className="section-link"><Link href="/case-studies">See the proof of work <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>

      <section className="surface-pearl screen" id="services">
        <div className="container">
          <div className="section-head section-head--split">
            <div><p className="label">Ways to work together</p><h2 className="display h-lg">Bring me the problem. We decide the scope after that.</h2></div>
            <p>I do not start with a package. The work depends on what is actually stuck, what evidence exists and how much change the business needs.</p>
          </div>
          <div className="service-levels">
            <Link href="/services#diagnostic" className="service-level"><span className="num">Start here</span><h3>Diagnose the problem</h3><p>A focused working session to understand the commercial constraint, the evidence and the highest-priority actions.</p><b>See the diagnostic <ArrowUpRight size={15} /></b></Link>
            <Link href="/services#strategy" className="service-level"><span className="num">Project</span><h3>Build the marketing plan</h3><p>Strategy, growth, B2B demand, product marketing, positioning or lifecycle work, with priorities your team can execute.</p><b>Explore project work <ArrowUpRight size={15} /></b></Link>
            <Link href="/services#advisory" className="service-level dark-card"><span className="num">Ongoing</span><h3>Bring in senior marketing support</h3><p>Fractional advisory for founders and teams that need experienced judgement without hiring a full-time leader immediately.</p><b>Explore advisory <ArrowUpRight size={15} /></b></Link>
          </div>
        </div>
      </section>

      <section className="surface-ink screen home-book" id="book">
        <div className="container book-feature">
          <div className="book-cover">
            <div className="book-small">Siddharth Bhattacharjee</div>
            <div><div className="book-title">The Sovereign Brand</div><div className="book-rule" /><div className="book-sub">Building Brands in the Age of AI</div></div>
            <div className="book-small">Volume I</div>
          </div>
          <div className="book-copy">
            <p className="label">The book</p><h2 className="display h-lg">See the thinking before you hire me.</h2>
            <p><i>The Sovereign Brand</i> is about how marketing teams should work when AI makes production cheaper but judgement still matters. It covers brand knowledge, customer understanding, decision-making, content, trust, operating models and the economics of recovered human attention.</p>
            <div className="book-actions"><a className="button" href={BOOK.gumroad} target="_blank" rel="noreferrer"><BookOpen size={16} /> Get the e-book</a><a className="button alt" href={BOOK.amazon} target="_blank" rel="noreferrer"><ShoppingCart size={16} /> Amazon Kindle</a></div>
            <p className="book-note">Read it, use the frameworks, and if the thinking is relevant to a problem in your business, we can discuss the work.</p>
          </div>
        </div>
      </section>

      <section className="surface-pearl screen" id="writing">
        <div className="container">
          <div className="section-head section-head--split">
            <div><p className="label">Writing</p><h2 className="display h-lg">Useful marketing thinking. No filler.</h2></div>
            <p>Long-form pieces on strategy, growth, positioning, GTM, AI and the commercial problems that sit underneath marketing activity.</p>
          </div>
          <div className="blog-grid">{featured.map((p, i) => <Link className={`post ${i === 0 ? 'featured' : ''}`} href={`/blog/${p.slug}`} key={p.slug}><div className="num">{p.category} · {p.readTime}</div><h3>{p.title}</h3><p>{p.excerpt}</p><div className="meta">Read the article <ArrowUpRight size={14} /></div></Link>)}</div>
          <div className="section-link"><Link href="/blog">Read all articles <ArrowUpRight size={15} /></Link><Link href="/resources">Use the free resources <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>

      <section className="surface-ink screen" id="booking">
        <div className="container booking-card">
          <div>
            <p className="label">Start with the problem</p><h2 className="display">Tell me what is stuck.</h2>
            <p>Send a short brief. I will look at the problem before the call so we can spend the conversation on the business, not a sales pitch.</p>
            <div className="booking-points"><span>30-minute call</span><span>Practical next steps</span><span>No sales script</span></div>
            <div className="contact-options">
              <a className="contact-option" href={CONTACT.whatsapp} target="_blank" rel="noreferrer"><span><strong>WhatsApp</strong><small>Message me directly</small></span><MessageCircle size={17} /></a>
              <a className="contact-option" href={`tel:${CONTACT.phone}`}><span><strong>Call</strong><small>{CONTACT.phoneLabel}</small></span><Phone size={17} /></a>
              <a className="contact-option" href={`mailto:${CONTACT.email}`}><span><strong>Email</strong><small>{CONTACT.email}</small></span><Mail size={17} /></a>
              <Link className="contact-option" href="/book"><span><strong>Read first</strong><small>The Sovereign Brand</small></span><BookOpen size={17} /></Link>
            </div>
          </div>
          <form className="lead-form" action={`https://formsubmit.co/${CONTACT.email}`} method="POST">
            <input type="hidden" name="_subject" value="New consulting enquiry from siddharthbhattacharjee.in" /><input type="hidden" name="_captcha" value="false" /><input type="hidden" name="_template" value="table" /><input type="hidden" name="_next" value="https://siddharthbhattacharjee.in/#booking" />
            <label>Name<input name="name" required placeholder="Your name" /></label>
            <label>Email<input type="email" name="email" required placeholder="you@company.com" /></label>
            <label>Company or website<input name="company" placeholder="Company or URL" /></label>
            <label>What do you need help with?<select name="service" defaultValue="Marketing strategy"><option>Marketing strategy</option><option>Growth / acquisition</option><option>B2B marketing and demand</option><option>B2C / ecommerce marketing</option><option>Brand / positioning</option><option>Product marketing / GTM</option><option>CRM / retention</option><option>Fractional marketing advisory</option><option>Something else</option></select></label>
            <label>Briefly, what is the problem?<textarea name="message" rows={4} placeholder="What are you trying to achieve, and what is getting in the way?" /></label>
            <button className="button" type="submit">Send the brief <ArrowUpRight size={16} /></button>
            <p className="form-note">Goes straight to my inbox. I reply personally, usually within a working day.</p>
          </form>
        </div>
      </section>
    </main>
  );
}