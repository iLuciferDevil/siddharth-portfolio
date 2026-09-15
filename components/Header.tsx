'use client';

import Link from 'next/link';
import {useState} from 'react';
import {Menu,X,BookOpen} from 'lucide-react';

const links=[
 {href:'/#problems',label:'What I fix'},
 {href:'/#proof',label:'Results'},
 {href:'/services',label:'Services'},
 {href:'/case-studies',label:'Case studies'},
 {href:'/blog',label:'Writing'},
];

export default function Header(){
 const [open,setOpen]=useState(false);
 return <header className="nav"><div className="nav-inner"><Link href="/" className="logo" onClick={()=>setOpen(false)}>Siddharth <em>Bhattacharjee</em></Link><nav className="navlinks">{links.map(l=><Link key={l.href} href={l.href}>{l.label}</Link>)}</nav><div className="nav-cta"><Link className="pill" href="/book"><BookOpen size={15}/> The book</Link><Link className="pill ghost" href="/#booking">Book a call</Link><button className="nav-toggle" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label={open?'Close menu':'Open menu'}>{open?<X size={22}/>:<Menu size={22}/>}</button></div></div><div className={`nav-drawer container ${open?'is-open':''}`}>{links.map(l=><Link key={l.href} href={l.href} onClick={()=>setOpen(false)}>{l.label}</Link>)}<Link href="/book" onClick={()=>setOpen(false)}>The book</Link><Link href="/#booking" onClick={()=>setOpen(false)}>Book a call</Link></div></header>;
}
