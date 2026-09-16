'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Copy, ExternalLink, Link2, RotateCcw, Share2, Trash2 } from 'lucide-react';

type Campaign = {
  id: string;
  createdAt: string;
  destination: string;
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
  sourcePlatform: string;
  creativeFormat: string;
  tactic: string;
  url: string;
};

type FormState = {
  destination: string;
  customDestination: string;
  source: string;
  medium: string;
  campaign: string;
  campaignId: string;
  content: string;
  term: string;
  sourcePlatform: string;
  creativeFormat: string;
  tactic: string;
};

const SITE = 'https://siddharthbhattacharjee.in';
const STORAGE_KEY = 'siddharth_campaign_links_v1';

const destinations = [
  ['/', 'Homepage'],
  ['/services', 'Services'],
  ['/book', 'The Sovereign Brand'],
  ['/case-studies', 'Case studies'],
  ['/blog', 'Blog'],
  ['/resources', 'Resources'],
  ['/about', 'About'],
  ['custom', 'Custom URL'],
] as const;

const sources = [
  ['linkedin', 'LinkedIn'],
  ['instagram', 'Instagram'],
  ['facebook', 'Facebook'],
  ['whatsapp', 'WhatsApp'],
  ['newsletter', 'Newsletter'],
  ['email', 'Email'],
  ['youtube', 'YouTube'],
  ['x', 'X'],
  ['google', 'Google'],
  ['referral', 'Partner / referral'],
] as const;

const mediums = [
  ['paid_social', 'Paid social'],
  ['organic_social', 'Organic social'],
  ['email', 'Email'],
  ['referral', 'Referral'],
  ['community', 'Community / private share'],
  ['paid_search', 'Paid search'],
  ['display', 'Display'],
  ['affiliate', 'Affiliate / partner'],
] as const;

const presets = [
  { label: 'LinkedIn ad', source: 'linkedin', medium: 'paid_social', campaign: 'consulting_leads', content: 'ceo_problem_ad' },
  { label: 'Instagram ad', source: 'instagram', medium: 'paid_social', campaign: 'consulting_leads', content: 'reel_ad_01' },
  { label: 'LinkedIn post', source: 'linkedin', medium: 'organic_social', campaign: 'linkedin_content', content: 'post_01' },
  { label: 'WhatsApp share', source: 'whatsapp', medium: 'community', campaign: 'consulting', content: 'personal_share' },
  { label: 'Newsletter', source: 'newsletter', medium: 'email', campaign: 'newsletter', content: 'cta_01' },
  { label: 'Book promotion', source: 'linkedin', medium: 'organic_social', campaign: 'sovereign_brand', content: 'book_post_01', destination: '/book' },
];

const initial: FormState = {
  destination: '/',
  customDestination: '',
  source: 'linkedin',
  medium: 'organic_social',
  campaign: 'linkedin_content',
  campaignId: '',
  content: '',
  term: '',
  sourcePlatform: 'manual',
  creativeFormat: '',
  tactic: '',
};

function slug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 100);
}

function destinationUrl(form: FormState) {
  if (form.destination === 'custom') return form.customDestination.trim();
  return `${SITE}${form.destination}`;
}

function buildUrl(form: FormState) {
  const base = destinationUrl(form);
  if (!base) return '';

  let url: URL;
  try {
    url = new URL(base, SITE);
  } catch {
    return '';
  }

  const values: [string, string][] = [
    ['utm_id', form.campaignId],
    ['utm_source', form.source],
    ['utm_medium', form.medium],
    ['utm_campaign', form.campaign],
    ['utm_content', form.content],
    ['utm_term', form.term],
    ['utm_source_platform', form.sourcePlatform],
    ['utm_creative_format', form.creativeFormat],
    ['utm_marketing_tactic', form.tactic],
  ];

  values.forEach(([key, value]) => {
    if (value.trim()) url.searchParams.set(key, value.trim());
  });

  return url.toString();
}

function labelFor(items: readonly (readonly [string, string])[], value: string) {
  return items.find(([key]) => key === value)?.[1] || value;
}

export default function CampaignBuilder() {
  const [form, setForm] = useState<FormState>(initial);
  const [history, setHistory] = useState<Campaign[]>([]);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setHistory(JSON.parse(raw));
    } catch {
      // Local history is optional. The builder remains fully functional without it.
    }
  }, []);

  const url = useMemo(() => buildUrl(form), [form]);

  function update(key: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }));
    setCopied(false);
    setSaved(false);
    setError('');
  }

  function applyPreset(preset: (typeof presets)[number]) {
    setForm((current) => ({
      ...current,
      source: preset.source,
      medium: preset.medium,
      campaign: preset.campaign,
      content: preset.content,
      destination: preset.destination || current.destination,
    }));
    setCopied(false);
    setSaved(false);
    setError('');
  }

  async function copyUrl() {
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setError('Your browser blocked clipboard access. Select and copy the URL manually.');
    }
  }

  function saveLink() {
    if (!url) return;
    if (!form.campaign.trim()) {
      setError('Add a campaign name before saving the link.');
      return;
    }
    const item: Campaign = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      destination: destinationUrl(form),
      source: form.source,
      medium: form.medium,
      campaign: form.campaign,
      content: form.content,
      term: form.term,
      sourcePlatform: form.sourcePlatform,
      creativeFormat: form.creativeFormat,
      tactic: form.tactic,
      url,
    };
    const next = [item, ...history].slice(0, 30);
    setHistory(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Saving in the browser is a convenience, not a dependency.
    }
    setSaved(true);
    setCopied(false);
  }

  function removeHistory(id: string) {
    const next = history.filter((item) => item.id !== id);
    setHistory(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage failures.
    }
  }

  function clearForm() {
    setForm(initial);
    setCopied(false);
    setSaved(false);
    setError('');
  }

  async function shareUrl() {
    if (!url) return;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Siddharth Bhattacharjee', url });
        return;
      } catch {
        return;
      }
    }
    await copyUrl();
  }

  const warning = [form.source, form.medium, form.campaign, form.content, form.term].some((value) => /[@\s]/.test(value));

  return (
    <main className="campaign-page">
      <div className="campaign-shell">
        <header className="campaign-header">
          <div>
            <div className="campaign-kicker">PRIVATE GROWTH INTELLIGENCE</div>
            <h1>Campaign Link Builder</h1>
            <p>Build consistent UTM links for LinkedIn, Instagram, ads, email, WhatsApp and personal shares. Every generated link is ready for GA4 acquisition reporting.</p>
          </div>
          <div className="campaign-header-actions">
            <Link href="/dashboard" className="quiet-link">← Dashboard</Link>
            <Link href="/dashboard/book" className="quiet-link">Book funnel</Link>
          </div>
        </header>

        <section className="campaign-presets">
          <div className="section-label">QUICK START</div>
          <div className="preset-row">
            {presets.map((preset) => (
              <button key={preset.label} type="button" className="preset" onClick={() => applyPreset(preset)}>{preset.label}</button>
            ))}
          </div>
        </section>

        <div className="campaign-layout">
          <section className="campaign-card builder-card">
            <div className="card-heading">
              <div><div className="section-label">01 · BUILD</div><h2>Where should the traffic come from?</h2></div>
              <button type="button" className="icon-button" onClick={clearForm} title="Reset form"><RotateCcw size={15} /></button>
            </div>

            <div className="field-grid">
              <label>
                <span>Destination</span>
                <select value={form.destination} onChange={(e) => update('destination', e.target.value)}>
                  {destinations.map(([value, label]) => <option value={value} key={value}>{label}</option>)}
                </select>
              </label>
              {form.destination === 'custom' && (
                <label className="full-field">
                  <span>Custom destination URL</span>
                  <input value={form.customDestination} onChange={(e) => update('customDestination', e.target.value)} placeholder="https://siddharthbhattacharjee.in/your-page" />
                </label>
              )}
              <label>
                <span>Source <b>utm_source</b></span>
                <select value={form.source} onChange={(e) => update('source', e.target.value)}>
                  {sources.map(([value, label]) => <option value={value} key={value}>{label} · {value}</option>)}
                </select>
              </label>
              <label>
                <span>Medium <b>utm_medium</b></span>
                <select value={form.medium} onChange={(e) => update('medium', e.target.value)}>
                  {mediums.map(([value, label]) => <option value={value} key={value}>{label} · {value}</option>)}
                </select>
              </label>
              <label>
                <span>Campaign <b>utm_campaign</b></span>
                <input value={form.campaign} onChange={(e) => update('campaign', slug(e.target.value))} placeholder="consulting_leads" />
              </label>
              <label>
                <span>Campaign ID <b>utm_id</b> <em>optional</em></span>
                <input value={form.campaignId} onChange={(e) => update('campaignId', slug(e.target.value))} placeholder="li_consult_001" />
              </label>
              <label>
                <span>Creative / placement <b>utm_content</b> <em>optional</em></span>
                <input value={form.content} onChange={(e) => update('content', slug(e.target.value))} placeholder="ceo_problem_ad" />
              </label>
              <label>
                <span>Term <b>utm_term</b> <em>optional</em></span>
                <input value={form.term} onChange={(e) => update('term', slug(e.target.value))} placeholder="marketing_consultant" />
              </label>
              <label>
                <span>Source platform <b>utm_source_platform</b></span>
                <select value={form.sourcePlatform} onChange={(e) => update('sourcePlatform', e.target.value)}>
                  <option value="manual">Manual</option>
                  <option value="linkedin_ads">LinkedIn Ads</option>
                  <option value="meta_ads">Meta Ads</option>
                  <option value="google_ads">Google Ads</option>
                  <option value="email_platform">Email platform</option>
                  <option value="creator_platform">Creator platform</option>
                </select>
              </label>
              <label>
                <span>Creative format <b>utm_creative_format</b> <em>optional</em></span>
                <select value={form.creativeFormat} onChange={(e) => update('creativeFormat', e.target.value)}>
                  <option value="">Not specified</option>
                  <option value="text">Text</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="carousel">Carousel</option>
                  <option value="display">Display</option>
                </select>
              </label>
              <label>
                <span>Marketing tactic <b>utm_marketing_tactic</b> <em>optional</em></span>
                <select value={form.tactic} onChange={(e) => update('tactic', e.target.value)}>
                  <option value="">Not specified</option>
                  <option value="prospecting">Prospecting</option>
                  <option value="remarketing">Remarketing</option>
                  <option value="content">Content</option>
                  <option value="launch">Launch</option>
                  <option value="partnership">Partnership</option>
                </select>
              </label>
            </div>

            {warning && <div className="form-warning">Use lowercase, underscore-separated values. Do not put names, email addresses or other personally identifiable information into UTM parameters.</div>}

            <div className="actions">
              <button type="button" className="primary-button" onClick={copyUrl} disabled={!url}>{copied ? <><Check size={16}/> Copied</> : <><Copy size={16}/> Copy URL</>}</button>
              <button type="button" className="secondary-button" onClick={saveLink} disabled={!url}><Link2 size={16}/> Save to history</button>
              <button type="button" className="secondary-button" onClick={shareUrl} disabled={!url}><Share2 size={16}/> Share</button>
            </div>
            {saved && <div className="success-message"><Check size={15}/> Saved locally in this browser.</div>}
            {error && <div className="error-message">{error}</div>}
          </section>

          <aside className="campaign-card preview-card">
            <div className="section-label">02 · PREVIEW</div>
            <h2>What GA4 will receive</h2>
            <div className="url-box">{url || 'Complete the destination and campaign fields to generate a link.'}</div>
            <div className="parameter-list">
              {[
                ['Source', form.source, 'Session source'],
                ['Medium', form.medium, 'Session medium'],
                ['Campaign', form.campaign, 'Session campaign'],
                ['Content', form.content || 'Not set', 'Creative variation'],
                ['ID', form.campaignId || 'Not set', 'Campaign ID'],
              ].map(([label, value, explanation]) => (
                <div className="parameter" key={label}><div><strong>{label}</strong><span>{explanation}</span></div><b>{value}</b></div>
              ))}
            </div>
            <div className="ga4-box">
              <strong>Where to read it in GA4</strong>
              <p>Reports → Acquisition → Traffic acquisition. Use Session source / medium and Session campaign as the primary dimensions.</p>
            </div>
            <a className="external-link" href={url || '#'} target="_blank" rel="noreferrer" aria-disabled={!url} onClick={(e) => !url && e.preventDefault()}>
              Open generated link <ExternalLink size={14}/>
            </a>
          </aside>
        </div>

        <section className="campaign-card rules-card">
          <div className="section-label">03 · OPERATING SYSTEM</div>
          <h2>Use one taxonomy everywhere</h2>
          <div className="rules-grid">
            <div><strong>LinkedIn paid</strong><code>linkedin / paid_social</code><span>Use campaign for the business objective and content for the creative.</span></div>
            <div><strong>Instagram paid</strong><code>instagram / paid_social</code><span>Keep the medium identical so paid social aggregates cleanly.</span></div>
            <div><strong>LinkedIn organic</strong><code>linkedin / organic_social</code><span>Use content to identify the post, article or CTA variant.</span></div>
            <div><strong>WhatsApp / private share</strong><code>whatsapp / community</code><span>Use non-identifying labels such as personal_share or prospect_group.</span></div>
          </div>
          <div className="privacy-note"><strong>Privacy rule:</strong> never put an individual’s name, email address, phone number or other PII into a UTM value. Use an internal non-identifying code if you need to distinguish a distribution.</div>
        </section>

        <section className="campaign-card history-card">
          <div className="card-heading"><div><div className="section-label">04 · HISTORY</div><h2>Recent links</h2></div><span className="history-count">{history.length} saved</span></div>
          {history.length === 0 ? (
            <p className="empty-history">Saved links will appear here. History is stored locally in this browser, so it does not require a database or expose your campaign list publicly.</p>
          ) : (
            <div className="history-list">
              {history.map((item) => (
                <div className="history-row" key={item.id}>
                  <div className="history-main"><strong>{item.campaign}</strong><span>{labelFor(sources, item.source)} · {labelFor(mediums, item.medium)} · {item.content || 'no content tag'}</span><code>{item.url}</code></div>
                  <div className="history-actions">
                    <button type="button" onClick={() => navigator.clipboard.writeText(item.url)} title="Copy"><Copy size={15}/></button>
                    <button type="button" onClick={() => removeHistory(item.id)} title="Delete"><Trash2 size={15}/></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <footer className="campaign-footer">
          <span>UTM values are campaign metadata. GA4 attribution still depends on the visitor arriving through the tagged URL and Analytics collecting the session.</span>
          <Link href="/dashboard">Back to private dashboard</Link>
        </footer>
      </div>
    </main>
  );
}
