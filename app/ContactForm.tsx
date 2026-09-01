'use client';

import {FormEvent, useState} from 'react';
import {ArrowUpRight} from 'lucide-react';

const confirmationStyles = `
  .form-success{display:flex;min-height:520px;position:relative;overflow:hidden;border-radius:20px;background:#171714;color:#fff;padding:48px;align-items:center;justify-content:center;text-align:center;animation:successIn .55s cubic-bezier(.2,.8,.2,1) both}
  .success-orbit{position:absolute;width:360px;height:360px;border:1px solid rgba(223,255,79,.22);border-radius:50%;animation:orbitSpin 16s linear infinite}
  .success-orbit:before,.success-orbit:after{content:"";position:absolute;width:7px;height:7px;border-radius:50%;background:#dfff4f;box-shadow:0 0 18px rgba(223,255,79,.7)}
  .success-orbit:before{left:18%;top:7%}.success-orbit:after{right:10%;bottom:18%}
  .success-core{position:relative;z-index:2;max-width:510px}
  .success-mark{width:76px;height:76px;border:1px solid #dfff4f;border-radius:50%;display:grid;place-items:center;margin:0 auto 28px;color:#dfff4f;font-size:34px;animation:markPop .65s .12s cubic-bezier(.2,1.4,.4,1) both}
  .success-kicker{font-size:11px;text-transform:uppercase;letter-spacing:.18em;color:#dfff4f;font-weight:700}
  .success-title{font:600 clamp(42px,6vw,70px)/.9 "Space Grotesk";letter-spacing:-.06em;margin:14px 0 16px}
  .success-copy{color:#aaa;line-height:1.6;max-width:460px;margin:0 auto}
  .success-next{display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin:26px 0 30px}.success-next span{border:1px solid #393933;border-radius:999px;padding:8px 11px;font-size:11px;text-transform:uppercase;letter-spacing:.07em;color:#ddd}
  .success-reset{border:1px solid #dfff4f;background:#dfff4f;color:#171714;border-radius:999px;padding:13px 18px;font:700 13px "DM Sans";cursor:pointer}
  .form-error{font-size:12px!important;color:#b33a2b!important;line-height:1.45!important;margin:0!important}
  .lead-form .button:disabled{opacity:.65;cursor:wait}
  @keyframes successIn{from{opacity:0;transform:translateY(18px) scale(.985)}to{opacity:1;transform:none}}
  @keyframes markPop{from{opacity:0;transform:scale(.4) rotate(-20deg)}to{opacity:1;transform:none}}
  @keyframes orbitSpin{to{transform:rotate(360deg)}}
  @media(max-width:700px){.form-success{min-height:500px;padding:30px 20px}.success-orbit{width:270px;height:270px}}
`;

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

  return (
    <>
      <style>{confirmationStyles}</style>
      {submitted ? (
        <div className="form-success">
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
      ) : (
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
      )}
    </>
  );
}
