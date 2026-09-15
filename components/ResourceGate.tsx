'use client';

import { FormEvent, useState } from 'react';
import { ArrowUpRight, Download, Loader2 } from 'lucide-react';

export default function ResourceGate({ slug, title }: { slug: string; title: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'error'>('idle');

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('https://formsubmit.co/ajax/email@siddharthbhattacharjee.in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...data,
          _subject: `Resource download: ${title}`,
          _url: window.location.href,
        }),
      });
      if (!response.ok) throw new Error('Submission failed');
      const link = document.createElement('a');
      link.href = `/resources/${slug}.pdf`;
      link.download = `${slug}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setOpen(false);
      setStatus('idle');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        <Download size={16} /> Download the resource <ArrowUpRight size={15} />
      </button>
      {open && (
        <div className="resource-gate" role="dialog" aria-modal="true" aria-labelledby="resource-gate-title">
          <button className="resource-gate-backdrop" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="resource-gate-card">
            <div className="eyebrow">Free resource</div>
            <h2 id="resource-gate-title">Where should I send your copy?</h2>
            <p>Enter your name and email and I&apos;ll send you the resource. You&apos;ll also receive occasional practical marketing thinking from me. No spam.</p>
            <form onSubmit={submit} className="resource-form">
              <label>Name<input name="name" type="text" autoComplete="name" placeholder="Your name" required /></label>
              <label>Email<input name="email" type="email" autoComplete="email" placeholder="you@company.com" required /></label>
              <input name="resource" type="hidden" value={title} readOnly />
              <button className="button" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? <><Loader2 size={16} className="spin" /> Preparing your resource...</> : <>Get the resource <ArrowUpRight size={16} /></>}
              </button>
              {status === 'error' && <p className="resource-error">Something went wrong. Please try again.</p>}
              <p className="resource-privacy">Your details are used to send the resource and relevant marketing updates. You can unsubscribe at any time.</p>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
