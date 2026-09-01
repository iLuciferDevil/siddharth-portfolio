'use client';

import {FormEvent, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const honeypot = String(data.get('website') || '');
    if (honeypot) return;

    setSending(true);
    setError('');

    try {
      const response = await fetch('https://formsubmit.co/ajax/email@siddharthbhattacharjee.in', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: data,
      });

      if (!response.ok) throw new Error('Submission failed');

      const result = await response.json().catch(() => ({ success: true }));
      if (result && result.success === false) throw new Error('Submission failed');

      setSubmitted(true);
      form.reset();
    } catch {
      setError('Something went wrong while sending. Please try again, or email me directly.');
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="form-success is-visible">
        <div className="success-orbit" aria-hidden="true" />
        <div className="success-core">
          <div className="success-mark" aria-hidden="true">✓</div>
          <div className="success-kicker">Brief received</div>
          <h3 className="success-title">Now we can talk about the interesting part.</h3>
          <p className="success-copy">
            Thanks. Your brief is in. I&apos;ll review the context first, then get back to you with the best way to take this forward.
          </p>
          <div className="success-next">
            <span>Reviewing your brief</span>
            <span>Practical next steps</span>
            <span>No sales pitch</span>
          </div>
          <button className="success-reset" type="button" onClick={() => setSubmitted(false)}>
            Send another brief
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={handleSubmit}>
      <input type="hidden" name="_subject" value="New consulting enquiry from siddharthbhattacharjee.in" />
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_url" value="https://siddharthbhattacharjee.in/#booking" />
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{position:'absolute',left:'-9999px',width:1,height:1,opacity:0}}
      />
      <label>Name<input name="name" required placeholder="Your name" /></label>
      <label>Email<input type="email" name="email" required placeholder="you@company.com" /></label>
      <label>Company / website<input name="company" placeholder="Company or URL" /></label>
      <label>What do you need help with?
        <select name="service">
          <option>Marketing strategy</option>
          <option>Landing page / conversion</option>
          <option>Growth / acquisition</option>
          <option>Brand / positioning</option>
          <option>Product marketing / GTM</option>
          <option>CRM / retention</option>
          <option>Fractional marketing advisory</option>
          <option>Something else</option>
        </select>
      </label>
      <label>Briefly describe the problem
        <textarea name="message" rows={4} placeholder="What are you trying to achieve? What is getting in the way?" />
      </label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={sending}>
        {sending ? 'Sending your brief…' : 'Send brief & request a call'} <ArrowUpRight size={16} />
      </button>
      <p className="form-note">After you submit, I&apos;ll review the brief and send the best time to connect.</p>
    </form>
  );
}
