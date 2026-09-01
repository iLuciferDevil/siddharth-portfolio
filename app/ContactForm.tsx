'use client';

import {FormEvent, useEffect, useState} from 'react';
import {ArrowUpRight, Check} from 'lucide-react';

const Required = () => <span className="required-mark" aria-hidden="true">*</span>;

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!submitted) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previousOverflow; };
  }, [submitted]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    if (String(data.get('website') || '')) return;
    setSending(true);
    setError('');
    try {
      const response = await fetch('https://formsubmit.co/ajax/email@siddharthbhattacharjee.in', {method:'POST',headers:{Accept:'application/json'},body:data});
      if (!response.ok) throw new Error('Submission failed');
      const result = await response.json().catch(() => ({success:true}));
      if (result && result.success === false) throw new Error('Submission failed');
      setSubmitted(true);
      form.reset();
    } catch {
      setError('Something went wrong while sending. Please try again, or email me directly.');
    } finally { setSending(false); }
  }

  return (
    <>
      <form className="lead-form" onSubmit={handleSubmit}>
        <input type="hidden" name="_subject" value="New consulting enquiry from siddharthbhattacharjee.in" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_url" value="https://siddharthbhattacharjee.in/#booking" />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{position:'absolute',left:'-9999px',width:1,height:1,opacity:0}} />
        <label>Name <Required /><input name="name" required placeholder="Your name" /></label>
        <label>Work email <Required /><input type="email" name="email" required placeholder="you@company.com" /></label>
        <label>Company / website <Required /><input name="company" required placeholder="Company or website URL" /></label>
        <label>What do you need help with? <Required />
          <select name="service" required defaultValue="">
            <option value="" disabled>Select an area</option>
            <option>Marketing strategy</option><option>Landing page / conversion</option><option>Growth / acquisition</option><option>Brand / positioning</option><option>Product marketing / GTM</option><option>CRM / retention</option><option>Fractional marketing advisory</option><option>Something else</option>
          </select>
        </label>
        <label>What are you trying to achieve, and what is getting in the way? <Required />
          <textarea name="message" rows={5} minLength={30} required placeholder="Give me enough context to understand the business problem, what you have tried and what you need to change." />
        </label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button" type="submit" disabled={sending}>{sending ? 'Sending your brief...' : 'Send brief & request a call'} <ArrowUpRight size={16} /></button>
        <p className="form-note">After you submit, I'll review the brief and send the best time to connect.</p>
      </form>

      {submitted && (
        <div role="dialog" aria-modal="true" aria-labelledby="brief-success-title" onClick={() => setSubmitted(false)} style={{position:'fixed',inset:0,zIndex:1000,display:'grid',placeItems:'center',padding:'20px',background:'rgba(17,17,15,.58)',backdropFilter:'blur(8px)'}}>
          <div onClick={event => event.stopPropagation()} style={{position:'relative',width:'min(560px,100%)',maxHeight:'calc(100vh - 40px)',overflowY:'auto',background:'#fff',border:'1px solid #11110f',borderRadius:'26px',padding:'clamp(30px,6vw,52px)',boxShadow:'0 28px 80px rgba(0,0,0,.24)'}}>
            <button type="button" aria-label="Close confirmation" onClick={() => setSubmitted(false)} style={{position:'absolute',top:18,right:18,width:36,height:36,border:'1px solid #d7d7d0',borderRadius:'50%',background:'#f5f5f1',fontSize:20,lineHeight:1,cursor:'pointer'}}>×</button>
            <div style={{width:46,height:46,borderRadius:'50%',background:'#dfff4f',border:'1px solid #11110f',display:'grid',placeItems:'center',marginBottom:24}}><Check size={22} strokeWidth={2.5} /></div>
            <div className="eyebrow" style={{marginBottom:12}}>Brief received</div>
            <h2 id="brief-success-title" className="display" style={{fontSize:'clamp(36px,7vw,58px)',lineHeight:'.95',margin:0,letterSpacing:'-.055em'}}>Now we can talk about the interesting part.</h2>
            <p style={{fontSize:17,lineHeight:1.6,color:'#696963',margin:'22px 0 0'}}>Thanks. Your brief is in. I'll review the context first, then get back to you with the best way to take this forward.</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:8,marginTop:26}}>
              <span style={{border:'1px solid #d7d7d0',borderRadius:999,padding:'8px 11px',fontSize:11,textTransform:'uppercase',letterSpacing:'.07em'}}>Reviewing your brief</span>
              <span style={{border:'1px solid #d7d7d0',borderRadius:999,padding:'8px 11px',fontSize:11,textTransform:'uppercase',letterSpacing:'.07em'}}>Practical next steps</span>
              <span style={{border:'1px solid #d7d7d0',borderRadius:999,padding:'8px 11px',fontSize:11,textTransform:'uppercase',letterSpacing:'.07em'}}>No sales pitch</span>
            </div>
            <button className="button" type="button" onClick={() => setSubmitted(false)} style={{marginTop:30}}>Done <Check size={16} /></button>
          </div>
        </div>
      )}
    </>
  );
}
