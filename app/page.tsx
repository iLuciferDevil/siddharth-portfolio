import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, MessageCircle, Phone, Mail, BookOpen, ShoppingCart } from 'lucide-react';
import Problems from '../components/Problems';
import { posts } from '../lib/posts';
import { BOOK, CONTACT } from '../lib/links';

// Only the three most recent articles live on the homepage.
// Everything else is one click away at /blog.
const featured = posts.slice(0, 3);

export default function Home() {
  return (
    <main className="snap">

      {/* 1 — Hero. Opens on the visitor's problem, not on a biography. */}
      <section className="surface-ink screen">
        <div className="container hero">
          <div className="hero-copy-wrap">
            <p className="label">Marketing consultant · B2B and B2C</p>
            <h1 className="display h-xl">Where is your growth actually stuck?</h1>
            <p className="hero-copy">
              Most businesses don&apos;t have one marketing problem. They have five, and they&apos;re
              spending on the wrong one. I help founders and CEOs find the problem that is costing
              the most right now, then fix it — with a plan the team can actually run.
            </p>
            <div className="actions">
              <a className="button" href="#booking">Tell me what&apos;s stuck <ArrowUpRight size={16} /></a>
              <a className="button alt" href={BOOK.gumroad} target="_blank" rel="noreferrer">
                <BookOpen size={16} /> Get the e-book
              </a>
            </div>
            <div className="hero-proof">
              <span><b>11+ yrs</b>Fintech, commerce, entertainment, consumer, B2B tech</span>
              <span><b>200M+</b>Customers reached across products and campaigns</span>
              <span><b>+173%</b>Daily active growth on a documented programme</span>
            </div>
          </div>

          <div className="portrait-wrap">
            <div className="portrait-frame">
              <Image
                src="/siddharth-bhattacharjee.jpg"
                alt="Siddharth Bhattacharjee, marketing consultant"
                width={1360}
                height={1700}
                priority
                className="portrait"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Self-diagnosis. The visitor finds their own sentence and sees how I'd think. */}
      <section className="surface-pearl screen" id="problems">
        <div className="container">
          <div className="section-head">
            <h2 className="display h-lg">Pick the one that sounds like your business.</h2>
            <p>
              Six situations I get called about most often. Open the one closest to yours and
              you&apos;ll see how I&apos;d approach it and what you&apos;d walk away with — before you
              speak to me at all.
            </p>
          </div>
          <Problems />
        </div>
      </section>

      {/* 3 — Proof. Numbers before narrative. */}
      <section className="surface-ink screen" id="proof">
        <div className="container">
          <div className="section-head">
            <h2 className="display h-lg">What changed for the businesses I worked with.</h2>
          </div>
          <div className="proof-grid">
            <div className="proof-big">
              <div className="num">Entertainment &amp; streaming</div>
              <div className="metric">+173%</div>
              <p>
                Streamer daily active growth between Aug 2023 and Mar 2024, alongside 89% growth in
                hours from existing streamers and a 180% improvement in cross-viewership.
              </p>
              <Link href="/case-studies/streamer-dau-growth">Read the case study <ArrowUpRight size={15} /></Link>
            </div>
            <div className="proof-list">
              <div><strong>5+ consumer launches</strong><span>Travel, entertainment, bill payments, insurance and mobility.</span></div>
              <div><strong>B2B technology</strong><span>Demand generation and business development for web, app and technology services.</span></div>
              <div><strong>Brands &amp; commerce</strong><span>Brand management, marketplace growth and category marketing.</span></div>
              <div><strong>CRM &amp; lifecycle</strong><span>Segmentation, messaging, acquisition, retention and engagement.</span></div>
            </div>
          </div>
          <div className="section-link"><Link href="/case-studies">See all case studies <ArrowUpRight size={15} /></Link></div>
        </div>
      </section>

      {/* 4 — Engagement ladder. Answers "what would this look like for me?" */}
      <section className="surface-pearl screen" id="services">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h-lg">Three ways to bring me in.</h2>
            <p>
              Sometimes you need one outside opinion. Sometimes a full strategy. Sometimes an
              experienced marketer in the room for a few months.
            </p>
          </div>
          <div className="service-levels">
            <Link href="/services#quick" className="service-level">
              <span className="num">Start here</span>
              <h3>Fix one important thing</h3>
              <p>Landing page and funnel reviews, positioning checks, and founder strategy sessions. Days, not months.</p>
              <b>See focused work <ArrowUpRight size={15} /></b>
            </Link>
            <Link href="/services#strategy" className="service-level">
              <span className="num">Project</span>
              <h3>Build the marketing system</h3>
              <p>Strategy, growth, B2B demand, product marketing, brand and retention — designed and handed over to your team.</p>
              <b>Explore projects <ArrowUpRight size={15} /></b>
            </Link>
            <Link href="/services#advisory" className="service-level dark-card">
              <span className="num">Ongoing</span>
              <h3>Senior marketing in the room</h3>
              <p>Fractional advisory for founders and teams who need direction, prioritisation and hands-on problem solving.</p>
              <b>Explore advisory <ArrowUpRight size={15} /></b>
            </Link>
          </div>
        </div>
      </section>

      {/* 5 — The book. Lowest-friction way to sample how I think. */}
      <section className="surface-ink screen" id="book">
        <div className="container book-feature">
          <div className="book-cover">
            <div className="book-small">Siddharth Bhattacharjee</div>
            <div>
              <div className="book-title">The Sovereign Brand</div>
              <div className="book-rule" />
              <div className="book-sub">The AI marketing playbook for the ambitious professional.</div>
            </div>
          </div>
          <div className="book-copy">
            <p className="label">The e-book</p>
            <h2 className="display h-lg">Want to see how I think before you hire me?</h2>
            <p>
              <i>The Sovereign Brand</i> is a practical playbook for using AI to build a brand with a
              point of view — instead of becoming interchangeable with everyone else in your category.
              It&apos;s the same thinking I bring to client work, for the price of a coffee.
            </p>
            <div className="book-actions">
              <a className="button" href={BOOK.gumroad} target="_blank" rel="noreferrer">
                <BookOpen size={16} /> Get it on Gumroad
              </a>
              <a className="button alt" href={BOOK.amazon} target="_blank" rel="noreferrer">
                <ShoppingCart size={16} /> Buy on Amazon Kindle
              </a>
            </div>
            <p className="book-note">
              Read it, use it, and if the thinking fits your business, we can talk about applying it properly.
            </p>
          </div>
        </div>
      </section>

      {/* 6 — Writing. Three articles only; the archive lives at /blog. */}
      <section className="surface-pearl screen" id="writing">
        <div className="container">
          <div className="section-head section-head--split">
            <h2 className="display h-lg">Marketing thinking you can use this week.</h2>
            <p>Frameworks and teardowns written for people running a business, not for other marketers.</p>
          </div>
          <div className="blog-grid">
            {featured.map((p, i) => (
              <Link className={`post ${i === 0 ? 'featured' : ''}`} href={`/blog/${p.slug}`} key={p.slug}>
                <div className="num">{p.category} · {p.readTime}</div>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <div className="meta">Read the article <ArrowUpRight size={14} /></div>
              </Link>
            ))}
          </div>
          <div className="section-link">
            <Link href="/blog">See all {posts.length} articles <ArrowUpRight size={15} /></Link>
            <Link href="/resources">Free templates and checklists <ArrowUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* 7 — Contact and brief, in one screen instead of two. */}
      <section className="surface-ink screen" id="booking">
        <div className="container">
          <div className="booking-card">
            <div>
              <p className="label">Start with the problem</p>
              <h2 className="display">Tell me what&apos;s stuck. I&apos;ll come prepared.</h2>
              <p>
                A short brief first, then a 30-minute call. It helps me work out whether I&apos;m the
                right person before either of us spends real time on it.
              </p>
              <div className="booking-points">
                <span>30-minute call</span><span>Practical next steps</span><span>No sales script</span>
              </div>
              <div className="contact-options" style={{ marginTop: 30 }}>
                <a className="contact-option" href={CONTACT.whatsapp} target="_blank" rel="noreferrer">
                  <span><strong>WhatsApp</strong><small>Message me directly</small></span><MessageCircle size={17} />
                </a>
                <a className="contact-option" href={`tel:${CONTACT.phone}`}>
                  <span><strong>Call</strong><small>{CONTACT.phoneLabel}</small></span><Phone size={17} />
                </a>
                <a className="contact-option" href={`mailto:${CONTACT.email}`}>
                  <span><strong>Email</strong><small>{CONTACT.email}</small></span><Mail size={17} />
                </a>
                <a className="contact-option" href="#problems">
                  <span><strong>Not sure yet?</strong><small>Find your situation first</small></span><CalendarDays size={17} />
                </a>
              </div>
            </div>

            <form className="lead-form" action={`https://formsubmit.co/${CONTACT.email}`} method="POST">
              <input type="hidden" name="_subject" value="New consulting enquiry from siddharthbhattacharjee.in" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value="https://siddharthbhattacharjee.in/#booking" />
              <label>Name<input name="name" required placeholder="Your name" /></label>
              <label>Email<input type="email" name="email" required placeholder="you@company.com" /></label>
              <label>Company or website<input name="company" placeholder="Company or URL" /></label>
              <label>What do you need help with?
                <select name="service" defaultValue="Marketing strategy">
                  <option>Marketing strategy</option>
                  <option>Landing page / conversion</option>
                  <option>B2B marketing and demand</option>
                  <option>B2C / ecommerce marketing</option>
                  <option>Growth / acquisition</option>
                  <option>Brand / positioning</option>
                  <option>Product marketing / GTM</option>
                  <option>CRM / retention</option>
                  <option>Fractional marketing advisory</option>
                  <option>Something else</option>
                </select>
              </label>
              <label>Briefly, what&apos;s the problem?
                <textarea name="message" rows={4} placeholder="What are you trying to achieve, and what is getting in the way?" />
              </label>
              <button className="button" type="submit">Send the brief <ArrowUpRight size={16} /></button>
              <p className="form-note">Goes straight to my inbox. I reply personally, usually within a working day.</p>
            </form>
          </div>
        </div>
      </section>

    </main>
  );
}
