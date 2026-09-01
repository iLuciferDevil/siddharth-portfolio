import Link from 'next/link';

export default function Header(){
  return <header className="container nav">
    <Link href="/" className="logo">SIDDHARTH<span style={{fontWeight:400}}>.</span></Link>
    <nav className="navlinks">
      <a href="/#work">Work</a><Link href="/services">Services</Link><Link href="/blog">Writing</Link><a href="/#about">About</a>
    </nav>
    <div className="nav-actions">
      <a className="pill" href="/#contact">Let&apos;s talk ↗</a>
      <details className="mobile-menu">
        <summary aria-label="Open navigation">Menu</summary>
        <div className="mobile-menu-panel">
          <a href="/#work">Work</a><Link href="/services">Services</Link><Link href="/blog">Writing</Link><a href="/#about">About</a><a href="/#contact">Let&apos;s talk ↗</a>
        </div>
      </details>
    </div>
  </header>
}
