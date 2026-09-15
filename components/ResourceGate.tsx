'use client';

import {FormEvent, useEffect, useState} from 'react';
import {ArrowUpRight, CheckCircle2, Mail} from 'lucide-react';

const STORAGE_KEY = 'siddharth-resource-recipient';

type Recipient = {name: string; email: string};
type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function ResourceGate({slug, title}: {slug: string; title: string}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hasSavedRecipient, setHasSavedRecipient] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;
      const recipient: Recipient = JSON.parse(saved);
      if (recipient.name && recipient.email) {
        setName(recipient.name);
        setEmail(recipient.email);
        setHasSavedRecipient(true);
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  async function submit(e?: FormEvent) {
    e?.preventDefault();
    setStatus('sending');
    setMessage('');

    try {
      const r = await fetch('/api/resources/send', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({slug, name, email}),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || 'Something went wrong.');

      localStorage.setItem(STORAGE_KEY, JSON.stringify({name, email}));
      setHasSavedRecipient(true);
      setShowForm(false);
      setStatus('sent');
      setMessage(data.message || 'The resource is on its way.');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="resource-gate success">
        <CheckCircle2 size={22}/>
        <div>
          <div className="eyebrow">Sent</div>
          <h2>Check your inbox.</h2>
          <p>{message}</p>
          <a className="button" href={`/api/resources/${slug}`} download>
            Download it now <ArrowUpRight size={16}/>
          </a>
        </div>
      </div>
    );
  }

  if (hasSavedRecipient && !showForm) {
    return (
      <div className="resource-gate resource-gate-compact">
        <div className="gate-copy">
          <div className="gate-icon"><Mail size={17}/></div>
          <div>
            <div className="eyebrow">Get the resource</div>
            <h2>Send it to you?</h2>
            <p><strong>{name}</strong><br/>{email}</p>
          </div>
        </div>
        <div className="gate-actions">
          <button className="button" disabled={status === 'sending'} type="button" onClick={() => submit()}>
            {status === 'sending' ? 'Sending...' : 'Send me this resource'} <ArrowUpRight size={16}/>
          </button>
          <button className="gate-change" type="button" onClick={() => {setShowForm(true); setStatus('idle'); setMessage('');}}>
            Use different details
          </button>
        </div>
        {status === 'error' && <p className="gate-error">{message}</p>}
        <p className="gate-note">We&apos;ll use the details you already provided. You are not added to a marketing list unless you separately choose to subscribe.</p>
      </div>
    );
  }

  return (
    <form className="resource-gate resource-gate-form" onSubmit={submit}>
      <div className="gate-copy">
        <div className="gate-icon"><Mail size={17}/></div>
        <div>
          <div className="eyebrow">Get the resource</div>
          <h2>{hasSavedRecipient ? `Update details for ${title}` : 'Where should I send it?'}</h2>
          <p>Enter your name and email. I&apos;ll send the resource to your inbox, and you can download it immediately too.</p>
        </div>
      </div>
      <div className="gate-fields">
        <label>Name<input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name" autoComplete="name"/></label>
        <label>Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" autoComplete="email"/></label>
        <button className="button" disabled={status === 'sending'} type="submit">
          {status === 'sending' ? 'Sending...' : 'Send me the resource'} <ArrowUpRight size={16}/>
        </button>
      </div>
      {status === 'error' && <p className="gate-error">{message}</p>}
      <p className="gate-note">Your details are used to deliver this resource. You will not be added to a marketing list unless you separately choose to subscribe.</p>
    </form>
  );
}
