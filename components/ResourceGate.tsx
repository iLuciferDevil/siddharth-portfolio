'use client';

import {FormEvent,useState} from 'react';
import {ArrowUpRight,CheckCircle2,Mail} from 'lucide-react';

export default function ResourceGate({slug,title}:{slug:string;title:string}){
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [status,setStatus]=useState<'idle'|'sending'|'sent'|'error'>('idle');
 const [message,setMessage]=useState('');
 async function submit(e:FormEvent){e.preventDefault();setStatus('sending');setMessage('');try{const r=await fetch('/api/resources/send',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({slug,name,email})});const data=await r.json();if(!r.ok)throw new Error(data.error||'Something went wrong.');setStatus('sent');setMessage(data.message||'The resource is on its way.');}catch(err){setStatus('error');setMessage(err instanceof Error?err.message:'Something went wrong.');}}
 if(status==='sent')return <div className="resource-gate success"><CheckCircle2 size={25}/><div><div className="eyebrow">Sent</div><h2>Check your inbox.</h2><p>{message}</p><a className="button" href={`/api/resources/${slug}`} download>Download it now <ArrowUpRight size={16}/></a></div></div>;
 return <form className="resource-gate" onSubmit={submit}><div className="gate-copy"><div className="gate-icon"><Mail size={18}/></div><div><div className="eyebrow">Get the resource</div><h2>Where should I send it?</h2><p>Enter your name and email. I&apos;ll send the resource to your inbox, and you can download it immediately too.</p></div></div><div className="gate-fields"><label>Name<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" autoComplete="name"/></label><label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email"/></label><button className="button" disabled={status==='sending'} type="submit">{status==='sending'?'Sending...':'Send me the resource'} <ArrowUpRight size={16}/></button></div>{status==='error'&&<p className="gate-error">{message}</p>}<p className="gate-note">No newsletter spam. You&apos;ll receive this resource and occasional useful marketing thinking from Siddharth. You can unsubscribe from future emails.</p></form>;
}
