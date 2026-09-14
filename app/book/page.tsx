import Link from 'next/link';
import { ArrowUpRight, BookOpen, ShoppingCart } from 'lucide-react';
import { BOOK } from '../../lib/links';

export const metadata = {
  title: 'The Sovereign Brand — The AI Marketing Playbook',
  description: 'The Sovereign Brand by Siddharth Bhattacharjee: a practical AI marketing playbook for building a brand with a point of view. Available on Gumroad and Amazon Kindle.',
};

export default function Book() {
  return (
    <main className="surface-pearl">
      <section className="container book-page-hero">
        <div className="book-cover large">
          <div className="book-small">Siddharth Bhattacharjee</div>
          <div>
            <div className="book-title">The Sovereign Brand</div>
            <div className="book-rule" />
            <div className="book-sub">The AI marketing playbook for the ambitious professional.</div>
          </div>
        </div>
        <div>
          <p className="eyebrow">The e-book</p>
          <h1 className="display">The Sovereign Brand</h1>
          <p className="book-lead">
            A practical playbook for using AI to build a brand with a clear point of view — instead of
            becoming interchangeable with everyone else in your category.
          </p>
          <div className="book-actions">
            <a className="button" href={BOOK.gumroad} target="_blank" rel="noreferrer"><BookOpen size={16} /> Get it on Gumroad</a>
            <a className="button alt" href={BOOK.amazon} target="_blank" rel="noreferrer"><ShoppingCart size={16} /> Buy on Amazon Kindle</a>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2 className="display h-lg">Why I wrote it.</h2>
          <p>Most marketing advice starts with channels and tools. I wanted to start somewhere more useful: what does this business want to stand for, and why should a customer care?</p>
        </div>
        <div className="grid3">
          <div className="card"><div className="num">Point of view</div><h3>Have something to say</h3><p>A brand becomes easier to choose when it makes deliberate choices instead of trying to please everyone.</p></div>
          <div className="card"><div className="num">Customer value</div><h3>Be useful, not just different</h3><p>Distinctiveness without customer value is noise. A strong position connects to a real problem someone has.</p></div>
          <div className="card"><div className="num">Consistency</div><h3>Make the choices hold</h3><p>Positioning, product, experience, content and communication should all reinforce the same idea.</p></div>
        </div>
      </section>

      <section className="dark-section section">
        <div className="container">
          <div className="section-head">
            <h2 className="display h-lg">The book and the consulting work.</h2>
            <p>The same thinking sits underneath both: understand the customer, make clear choices, and build a marketing system around them.</p>
          </div>
          <div className="book-bridge">
            <div>
              <span className="num">Read it first</span>
              <h3>Build the point of view.</h3>
              <a className="button" href={BOOK.gumroad} target="_blank" rel="noreferrer">Get the e-book <ArrowUpRight size={16} /></a>
            </div>
            <div>
              <span className="num">Then apply it</span>
              <h3>Put it to work in your business.</h3>
              <Link className="button alt" href="/#booking">Book a conversation <ArrowUpRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
