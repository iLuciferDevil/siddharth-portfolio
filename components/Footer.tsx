import Link from 'next/link';
import { BOOK, CONTACT } from '../lib/links';

export default function Footer() {
  return (
    <footer className="container footer">
      <div>
        <strong>Siddharth Bhattacharjee</strong>
        <span>Marketing consultant for B2B and B2C businesses</span>
        <span>{CONTACT.phoneLabel} · {CONTACT.email}</span>
      </div>
      <nav>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/case-studies">Proof of work</Link>
        <Link href="/memos">Marketing memos</Link>
        <Link href="/blog">Writing</Link>
        <Link href="/resources">Free resources</Link>
        <Link href="/book">The book</Link>
        <a href={BOOK.amazon} target="_blank" rel="noreferrer">Buy on Amazon</a>
      </nav>
    </footer>
  );
}
