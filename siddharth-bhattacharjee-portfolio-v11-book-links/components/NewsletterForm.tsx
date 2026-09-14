'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';

export default function NewsletterForm({ source='newsletter', tag='Newsletter', compact=false, successHref }:{source?:string;tag?:string;compact?:boolean;successHref?:string}){
  const [status,setStatus]=useState<'idle'|'loading'|'success'|'error'>('idle');
  const [message,setMessage]=useState('');
  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault(); setStatus('loading'); setMessage('');
    const form=e.currentTarget;
    const data=new FormData(form);
    try{
      const res=await fetch('/api/subscribe',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:data.get('name'),email:data.get('email'),source,tag})});
      const json=await res.json();
      if(!res.ok) throw new Error(json.error||'Something went wrong');
      setStatus('success'); setMessage('You’re in. Check your inbox for the next email.'); form.reset();
    }catch(err){setStatus('error');setMessage(err instanceof Error?err.message:'Please try again.');}
  }
  if(status==='success') return <div className={`subscribe-success ${compact?'compact':''}`}><Check size={18}/><span>{message}{successHref && <a className="success-download" href={successHref} download>Download the resource ↗</a>}</span></div>;
  return <form className={`subscribe-form ${compact?'compact':''}`} onSubmit={submit}>
    {!compact && <input name="name" placeholder="First name" aria-label="First name"/>}
    <input name="email" type="email" required placeholder="Your email address" aria-label="Your email address"/>
    <button className="button" disabled={status==='loading'}>{status==='loading'?'Joining…':'Get the next issue'} <ArrowUpRight size={15}/></button>
    {status==='error' && <p className="form-note error-note">{message}</p>}
  </form>
}
