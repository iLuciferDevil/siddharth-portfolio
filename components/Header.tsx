import Link from 'next/link';

export default function Header(){
  return <>
    <header className="container nav">
      <Link href="/" className="logo">SIDDHARTH<span style={{fontWeight:400}}>.</span></Link>
      <nav className="navlinks">
        <a href="/#work">Work</a><Link href="/services">Services</Link><Link href="/blog">Writing</Link><Link href="/book">Book</Link><a href="/#about">About</a>
      </nav>
      <div className="nav-actions">
        <a className="pill" href="/#contact">Let&apos;s talk ↗</a>
        <details className="mobile-menu">
          <summary aria-label="Open navigation">Menu</summary>
          <div className="mobile-menu-panel">
            <a href="/#work">Work</a><Link href="/services">Services</Link><Link href="/blog">Writing</Link><Link href="/book">Book</Link><a href="/#about">About</a><a href="/#contact">Let&apos;s talk ↗</a>
          </div>
        </details>
      </div>
    </header>
    <style>{`
      .nav-actions{display:flex;align-items:center;gap:10px}
      .mobile-menu{display:none;position:relative}
      .mobile-menu summary{list-style:none;cursor:pointer;border:1px solid var(--ink);padding:10px 13px;border-radius:999px;font-size:12px;font-weight:700}
      .mobile-menu summary::-webkit-details-marker{display:none}
      .mobile-menu-panel{position:absolute;right:0;top:46px;z-index:50;min-width:190px;padding:8px;background:#fff;border:1px solid var(--ink);border-radius:16px;box-shadow:0 16px 35px rgba(0,0,0,.14)}
      .mobile-menu-panel a{display:block;padding:11px 12px;font-size:14px;border-radius:10px}
      .mobile-menu-panel a:hover{background:var(--bg)}
      @media(max-width:800px){.nav-actions .pill{display:none}.mobile-menu{display:block}}
    `}</style>
  </>
}
