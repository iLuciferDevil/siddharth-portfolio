'use client';

import {FormEvent, useEffect, useState} from 'react';
import {ArrowRight, Check, Clock3, ShieldCheck} from 'lucide-react';
import {CONTACT} from '../../lib/links';
import './diagnostic.css';

const reasons = [
  'Marketing activity is high, but growth is not moving',
  'You are not sure what to fix first',
  'Acquisition is getting expensive',
  'The website or funnel is not converting enough',
  'Positioning, GTM or product marketing is unclear',
  'The team needs a practical 30-day marketing plan',
];

export default function MarketingGrowthDiagnosticPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fields: Record<string, string> = {};
    ['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].forEach((key) => {
      fields[key] = params.get(key) || '';
    });
    Object.entries(fields).forEach(([key, value]) => {
      const input = document.querySelector<HTMLInputElement>(`input[name="${key}"]`);
      if (input) input.value = value;
    });
  }, []);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    const form = e.currentTarget;
    fetch(form.action, {method: 'POST', body: new FormData(form), headers: {'Accept': 'application/json'}})
      .then((res) => {
        if (!res.ok) throw new Error('Submission failed');
        setSubmitted(true);
        form.reset();
      })
      .catch(() => setError(true));
  }

  return (
    <main className="diagnostic-page">
      <header className="diagnostic-nav">
        <a href="/" className="diagnostic-brand">Siddharth Bhattacharjee</a>
        <a href="#apply" className="diagnostic-nav-cta">Apply for the diagnostic <ArrowRight size={15}/></a>
      </header>

      <section className="diagnostic-hero">
        <div className="diagnostic-container diagnostic-hero-grid">
          <div>
            <p className="diagnostic-eyebrow">MARKETING GROWTH DIAGNOSTIC · LIMITED-TIME OFFER</p>
            <h1>Something in your marketing is not working. Find out what.</h1>
            <p className="diagnostic-lead">A focused 60-90 minute working session to identify the biggest marketing problem in the business, what is causing it, and what you should fix first.</p>
            <div className="diagnostic-price"><span className="diagnostic-original-price">₹7,500</span><strong>₹2,500</strong><span>Limited-time pricing</span></div>
            <a className="diagnostic-button" href="#apply">Apply for a diagnostic <ArrowRight size={17}/></a>
            <p className="diagnostic-micro">No long-term commitment. No 40-page audit. No generic recommendations.</p>
          </div>
          <div className="diagnostic-proof">
            <div className="diagnostic-proof-top"><span>Marketing experience</span><strong>11+ years</strong></div>
            <div className="diagnostic-proof-top"><span>Amazon</span><strong>9 years</strong></div>
            <div className="diagnostic-proof-top"><span>Documented growth programme</span><strong>+173%</strong></div>
            <p>Experience across product marketing, growth, acquisition, brand, CRM, retention and entertainment.</p>
          </div>
        </div>
      </section>

      <section className="diagnostic-section diagnostic-light">
        <div className="diagnostic-container">
          <div className="diagnostic-section-head"><p className="diagnostic-eyebrow">THIS IS FOR YOU IF</p><h2>You have a marketing problem, but you are not sure where the problem actually is.</h2></div>
          <div className="diagnostic-reasons">{reasons.map((reason) => <div key={reason}><Check size={18}/><span>{reason}</span></div>)}</div>
        </div>
      </section>

      <section className="diagnostic-section diagnostic-dark">
        <div className="diagnostic-container diagnostic-two-col">
          <div><p className="diagnostic-eyebrow">WHAT WE DO</p><h2>We diagnose the system before deciding what to change.</h2></div>
          <div className="diagnostic-steps">
            <div><span>01</span><div><strong>Context</strong><p>What are you trying to achieve? What have you already tried?</p></div></div>
            <div><span>02</span><div><strong>Diagnosis</strong><p>Where is the constraint: positioning, acquisition, conversion, lifecycle, measurement or execution?</p></div></div>
            <div><span>03</span><div><strong>Priorities</strong><p>What should happen first, what can wait, and what should you stop doing?</p></div></div>
            <div><span>04</span><div><strong>Action plan</strong><p>You leave with practical 30-day priorities you can take to the team.</p></div></div>
          </div>
        </div>
      </section>

      <section className="diagnostic-section diagnostic-light">
        <div className="diagnostic-container diagnostic-two-col">
          <div><p className="diagnostic-eyebrow">WHAT YOU GET</p><h2>A short diagnosis you can actually use.</h2></div>
          <div className="diagnostic-deliverables">
            <div><strong>1. The core problem</strong><p>What appears to be holding marketing back and the evidence behind the diagnosis.</p></div>
            <div><strong>2. The priority actions</strong><p>The 3-5 actions worth doing first, in order.</p></div>
            <div><strong>3. The 30-day plan</strong><p>A practical sequence for the first month, including what not to spend time or money on.</p></div>
          </div>
        </div>
      </section>

      <section className="diagnostic-section diagnostic-proof-section">
        <div className="diagnostic-container">
          <p className="diagnostic-eyebrow">WHY ME</p>
          <h2>I have operated the work, not just written the strategy.</h2>
          <div className="diagnostic-proof-grid">
            <div><strong>Amazon Pay</strong><span>Product marketing and launches across payments, travel, tickets, insurance and mobility.</span></div>
            <div><strong>Amazon MX Player</strong><span>Growth, acquisition, engagement and homepage/channel marketing.</span></div>
            <div><strong>Brand & commerce</strong><span>Marketplace brand management and category marketing across consumer businesses.</span></div>
          </div>
        </div>
      </section>

      <section className="diagnostic-apply" id="apply">
        <div className="diagnostic-container diagnostic-apply-grid">
          <div>
            <p className="diagnostic-eyebrow">LIMITED-TIME OFFER</p>
            <h2>Tell me what is stuck.</h2>
            <p>Send a short brief. I will review the problem before we speak. If the diagnostic is a sensible fit, I will send the payment details after reviewing your brief.</p>
            <div className="diagnostic-trust"><span><Clock3 size={16}/>60-90 minutes</span><span><ShieldCheck size={16}/>No long-term commitment</span></div>
          </div>
          <form id="diagnostic-form" className="diagnostic-form lead-form" action={`https://formsubmit.co/${CONTACT.email}`} method="POST" onSubmit={handleSubmit}>
            <input type="hidden" name="_subject" value="Marketing Growth Diagnostic enquiry" />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_template" value="table" />
            <input type="hidden" name="_next" value="https://siddharthbhattacharjee.in/marketing-growth-diagnostic?submitted=1" />
            {['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map((key) => <input key={key} type="hidden" name={key} />)}
            <label>Name<input name="name" required placeholder="Your name" /></label>
            <label>Work email<input type="email" name="email" required placeholder="you@company.com" /></label>
            <label>Company / website<input name="company" required placeholder="Company name or website" /></label>
            <label>What is stuck?<textarea name="message" required rows={5} placeholder="What are you trying to achieve, and what is getting in the way?" /></label>
            <button className="diagnostic-button" type="submit">Apply for the ₹2,500 diagnostic <ArrowRight size={17}/></button>
            {submitted && <p className="diagnostic-success">Thanks. Your brief has been sent. I will review it and get back to you personally.</p>}
            {error && <p className="diagnostic-error">Something went wrong while sending the form. Please email {CONTACT.email} directly.</p>}
            <p className="diagnostic-form-note">Your information is used only to respond to this enquiry.</p>
          </form>
        </div>
      </section>

      <footer className="diagnostic-footer"><a href="/">Siddharth Bhattacharjee</a><span>Marketing Growth Diagnostic · <s>₹7,500</s> ₹2,500 · Limited-time offer</span></footer>
    </main>
  );
}
