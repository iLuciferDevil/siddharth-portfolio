'use client';

import { useEffect, useMemo, useState } from 'react';

const PEOPLE = ['Sidd', 'Sagar', 'Tony', 'Sameer', 'Samyuktha', 'Satarupa'];
const INSTAGRAM = 'https://www.instagram.com/maargh.in/';

type ContentItem = { id: number; type: string; label: string; url: string; likes:number; comments:number; shares:number; saves:number; reach:number };\ntype PersonMetric = { clicks:number; follows:number };

export default function MaarghAttribution() {
  const [campaign, setCampaign] = useState('follower_growth');
  const [medium, setMedium] = useState('referral');
  const [content, setContent] = useState('share');
  const [copied, setCopied] = useState<string | null>(null);
  const [followersStart, setFollowersStart] = useState('');
  const [followersNow, setFollowersNow] = useState('');
  const [contentType, setContentType] = useState('reel');
  const [contentLabel, setContentLabel] = useState('');
  const [contentUrl, setContentUrl] = useState('');
  const [items, setItems] = useState<ContentItem[]>([]);
  const [itemId, setItemId] = useState(1);\n  const [metrics, setMetrics] = useState<Record<string, PersonMetric>>({});\n\n  useEffect(() => { try { const s=JSON.parse(localStorage.getItem('maargh-attribution-v2')||'null'); if(s){ setCampaign(s.campaign||'follower_growth'); setMedium(s.medium||'referral'); setContent(s.content||'share'); setFollowersStart(s.followersStart||''); setFollowersNow(s.followersNow||''); setItems(s.items||[]); setMetrics(s.metrics||{}); setItemId(s.itemId||1); } } catch {} }, []);\n  useEffect(() => { localStorage.setItem('maargh-attribution-v2', JSON.stringify({campaign,medium,content,followersStart,followersNow,items,metrics,itemId})); }, [campaign,medium,content,followersStart,followersNow,items,metrics,itemId]);\n\n  const getMetric = (person:string) => metrics[person] || {clicks:0,follows:0};\n  const updateMetric = (person:string,key:'clicks'|'follows',value:string) => setMetrics(prev=>({...prev,[person]:{...getMetric(person),[key]:Math.max(0,Number(value)||0)}}));

  const profileLinks = useMemo(() => PEOPLE.map(person => ({
    person, url: buildTrackedUrl(INSTAGRAM, person, medium, campaign, content)
  })), [campaign, medium, content]);

  const growth = Math.max(0, (Number(followersNow) || 0) - (Number(followersStart) || 0));

  const addContent = () => {
    const raw = contentUrl.trim();
    if (!raw) return;
    try {
      new URL(raw);
      setItems(prev => [...prev, { id: itemId, type: contentType, label: contentLabel.trim() || `${contentType} ${itemId}`, url: raw, likes:0, comments:0, shares:0, saves:0, reach:0 }]);
      setItemId(prev => prev + 1);
      setContentLabel('');
      setContentUrl('');
    } catch { setContentUrl(raw); }
  };

  const removeContent = (id: number) => setItems(prev => prev.filter(item => item.id !== id));\n  const updateContent = (id:number,key:'likes'|'comments'|'shares'|'saves'|'reach',value:string) => setItems(prev=>prev.map(x=>x.id===id?{...x,[key]:Math.max(0,Number(value)||0)}:x));\n  const totalClicks=PEOPLE.reduce((s,p)=>s+getMetric(p).clicks,0), totalFollows=PEOPLE.reduce((s,p)=>s+getMetric(p).follows,0);\n  const totalLikes=items.reduce((s,x)=>s+x.likes,0), totalComments=items.reduce((s,x)=>s+x.comments,0), totalShares=items.reduce((s,x)=>s+x.shares,0), totalSaves=items.reduce((s,x)=>s+x.saves,0);

  async function copy(key: string, url: string) {
    await navigator.clipboard.writeText(url);
    setCopied(key);
    setTimeout(() => setCopied(null), 1400);
  }

  return (
    <main className="ma-dashboard">
      <style>{`
        .ma-dashboard{min-height:100vh;background:#f4f1eb;color:#171717;padding:110px 28px 60px;font-family:Arial,sans-serif}
        .ma-wrap{max-width:1180px;margin:auto}.ma-kicker{font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#6b665e;font-weight:700}
        .ma-title{font-size:clamp(38px,6vw,72px);line-height:.96;margin:10px 0 14px;letter-spacing:-.045em}.ma-sub{max-width:780px;color:#666158;font-size:17px;line-height:1.6;margin-bottom:34px}
        .ma-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:18px;margin-bottom:18px}.ma-card{background:#fff;border:1px solid #ded9d0;border-radius:20px;padding:24px;box-shadow:0 8px 30px rgba(30,25,18,.05);margin-bottom:18px}
        .ma-card h2{font-size:20px;margin:0 0 18px}.ma-fields{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
        .ma-field label{display:block;font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#777168;margin-bottom:7px;font-weight:700}
        .ma-field input,.ma-field select{width:100%;box-sizing:border-box;border:1px solid #d5d0c8;border-radius:10px;padding:12px;background:#faf9f6;font-size:14px}
        .ma-stat{font-size:42px;font-weight:800;letter-spacing:-.04em;margin:5px 0}.ma-muted{font-size:13px;color:#777168}
        .ma-table{width:100%;border-collapse:collapse}.ma-table th{text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#777168;padding:10px 8px;border-bottom:1px solid #ddd7cf}
        .ma-table td{padding:14px 8px;border-bottom:1px solid #eeeae4;vertical-align:middle;font-size:14px}.ma-url{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11px;color:#625d56;word-break:break-all;max-width:620px}
        .ma-btn{border:0;border-radius:9px;background:#171717;color:white;padding:9px 12px;font-weight:700;cursor:pointer;white-space:nowrap}.ma-btn:hover{opacity:.86}.mini{max-width:105px}.ma-scroll{overflow:auto}
        .ma-note{background:#f7f3e8;border:1px solid #e2d8bd;border-radius:14px;padding:15px 16px;color:#5f5749;font-size:13px;line-height:1.55;margin-top:18px}
        .ma-content-form{display:grid;grid-template-columns:150px 1fr 2fr auto;gap:12px;align-items:end}.ma-content-preview{margin-top:22px}.ma-content-name{font-weight:700}
        @media(max-width:900px){.ma-grid{grid-template-columns:1fr}.ma-content-form{grid-template-columns:1fr}.ma-fields{grid-template-columns:1fr}}@media(max-width:800px){.ma-table{min-width:950px}.ma-scroll{overflow:auto}}
      `}</style>
      <div className="ma-wrap">
        <div className="ma-kicker">Maargh · Growth Attribution</div>
        <h1 className="ma-title">Who drove the followers?</h1>
        <p className="ma-sub">Track clicks and attributed follows by person, plus likes, comments, shares, saves and reach for every post or Reel. Data entered here persists in this browser.</p>

        <div className="ma-grid">
          <section className="ma-card"><h2>Campaign setup</h2><div className="ma-fields">
            <div className="ma-field"><label>Campaign</label><input value={campaign} onChange={e=>setCampaign(e.target.value.replace(/\\s+/g,'_').toLowerCase())}/></div>
            <div className="ma-field"><label>Medium</label><input value={medium} onChange={e=>setMedium(e.target.value.replace(/\\s+/g,'_').toLowerCase())}/></div>
            <div className="ma-field"><label>Default content</label><input value={content} onChange={e=>setContent(e.target.value.replace(/\\s+/g,'_').toLowerCase())}/></div>
          </div><div className="ma-note">UTM mapping: <b>utm_source</b> = person, <b>utm_medium</b> = channel, <b>utm_campaign</b> = campaign, <b>utm_content</b> = content/share label.</div></section>

          <section className="ma-card"><h2>Performance overview</h2><div className="ma-fields">
            <div className="ma-field"><label>Starting followers</label><input inputMode="numeric" value={followersStart} onChange={e=>setFollowersStart(e.target.value.replace(/\\D/g,''))} placeholder="e.g. 5000"/></div>
            <div className="ma-field"><label>Current followers</label><input inputMode="numeric" value={followersNow} onChange={e=>setFollowersNow(e.target.value.replace(/\\D/g,''))} placeholder="e.g. 5300"/></div>
            <div><div className="ma-muted">Net growth</div><div className="ma-stat">+{growth.toLocaleString('en-IN')}</div></div><div><div className="ma-muted">Tracked clicks</div><div className="ma-stat">{totalClicks.toLocaleString('en-IN')}</div></div><div><div className="ma-muted">Attributed follows</div><div className="ma-stat">{totalFollows.toLocaleString('en-IN')}</div></div>
          </div></section>
        </div>

        <section className="ma-card"><h2>Person-level attribution</h2><p className="ma-muted">Enter measured clicks and attributed follows for each person's tracked link.</p><div className="ma-scroll"><table className="ma-table"><thead><tr><th>Person</th><th>Clicks</th><th>Followed</th><th>Follow rate</th></tr></thead><tbody>{PEOPLE.map(p=>{const m=getMetric(p);const rate=m.clicks?m.follows/m.clicks*100:0;return <tr key={p}><td><b>{p}</b></td><td><input className="mini" inputMode="numeric" value={m.clicks||''} onChange={e=>updateMetric(p,'clicks',e.target.value)} placeholder="0"/></td><td><input className="mini" inputMode="numeric" value={m.follows||''} onChange={e=>updateMetric(p,'follows',e.target.value)} placeholder="0"/></td><td><b>{rate.toFixed(1)}%</b></td></tr>})}</tbody></table></div></section>\n\n        <section className="ma-card"><h2>Add a post / Reel / other link</h2><p className="ma-muted">Paste the original Instagram post or Reel URL. You only need to add it once.</p>
          <div className="ma-content-form">
            <div className="ma-field"><label>Type</label><select value={contentType} onChange={e=>setContentType(e.target.value)}><option value="reel">Reel</option><option value="post">Post</option><option value="story">Story</option><option value="video">Video</option><option value="other">Other</option></select></div>
            <div className="ma-field"><label>Label</label><input value={contentLabel} onChange={e=>setContentLabel(e.target.value)} placeholder="e.g. Founder story Reel"/></div>
            <div className="ma-field"><label>Original URL</label><input value={contentUrl} onChange={e=>setContentUrl(e.target.value)} placeholder="https://www.instagram.com/maargh.in/reel/..."/></div>
            <button className="ma-btn" onClick={addContent}>Generate links</button>
          </div>
          {items.length > 0 && <div className="ma-content-preview"><div className="ma-scroll"><table className="ma-table"><thead><tr><th>Content</th><th>Person</th><th>Tracked URL</th><th></th></tr></thead><tbody>
            {items.flatMap(item => PEOPLE.map(person => { const key=`${item.id}-${person}`; const url=buildTrackedUrl(item.url,person,medium,campaign,item.label); return <tr key={key}><td className="ma-content-name">{item.label}<br/><span className="ma-muted">{item.type}</span></td><td><b>{person}</b></td><td className="ma-url">{url}</td><td><button className="ma-btn" onClick={()=>copy(key,url)}>{copied===key?'Copied':'Copy'}</button></td></tr>; }))}
          </tbody></table></div><div className="ma-note">Changing campaign or medium updates all generated links. Each content item uses its label as <b>utm_content</b>, while <b>utm_source</b> remains the individual person's name.</div></div>}
        </section>

        {items.length > 0 && <section className="ma-card"><h2>Content performance</h2><p className="ma-muted">Enter the figures from Instagram Insights for each post/Reel.</p><div className="ma-scroll"><table className="ma-table"><thead><tr><th>Content</th><th>Likes</th><th>Comments</th><th>Shares</th><th>Saves</th><th>Reach</th><th></th></tr></thead><tbody>{items.map(item=><tr key={item.id}><td><b>{item.label}</b><br/><span className="ma-muted">{item.type}</span></td>{(['likes','comments','shares','saves','reach'] as const).map(k=><td key={k}><input className="mini" inputMode="numeric" value={item[k]||''} onChange={e=>updateContent(item.id,k,e.target.value)} placeholder="0"/></td>)}<td><button className="ma-btn" onClick={()=>removeContent(item.id)}>Remove</button></td></tr>)}</tbody></table></div></section>}\n\n        <section className="ma-card"><h2>Profile tracking links</h2><div className="ma-scroll"><table className="ma-table"><thead><tr><th>Person</th><th>Tracked profile URL</th><th></th></tr></thead><tbody>
          {profileLinks.map(({person,url})=><tr key={person}><td><b>{person}</b></td><td className="ma-url">{url}</td><td><button className="ma-btn" onClick={()=>copy(`profile-${person}`,url)}>{copied===`profile-${person}`?'Copied':'Copy link'}</button></td></tr>)}
        </tbody></table></div><div className="ma-note"><b>Attribution note:</b> Instagram engagement belongs to the content, not to the UTM source. “Followed” is the number you attribute to each person's tracked link from your available analytics. Likes, comments, shares, saves and reach are recorded at content level.</div></section>
      </div>
    </main>
  );
}

function buildTrackedUrl(rawUrl:string,person:string,medium:string,campaign:string,content:string){
  try{const url=new URL(rawUrl);url.searchParams.set('utm_source',person.toLowerCase());url.searchParams.set('utm_medium',medium);url.searchParams.set('utm_campaign',campaign);url.searchParams.set('utm_content',content);return url.toString();}catch{return rawUrl;}
}
