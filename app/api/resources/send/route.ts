import {NextResponse} from 'next/server';
import {getResource} from '../../../../lib/resources';
import {buildResourcePdf} from '../../../../lib/resource-pdf';

const EMAIL_RE=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SITE='https://siddharthbhattacharjee.in';

export async function POST(req:Request){
 try{
  const body=await req.json();
  const name=String(body.name||'').trim().slice(0,120);
  const email=String(body.email||'').trim().toLowerCase().slice(0,200);
  const slug=String(body.slug||'').trim();
  const resource=getResource(slug);
  if(!name||!EMAIL_RE.test(email)||!resource)return NextResponse.json({error:'Please enter a valid name and email.'},{status:400});
  const apiKey=process.env.RESEND_API_KEY;
  const from=process.env.RESEND_FROM_EMAIL;
  const notify=process.env.LEAD_NOTIFICATION_EMAIL||'email@siddharthbhattacharjee.in';
  if(!apiKey||!from)return NextResponse.json({error:'Email delivery is not configured yet.'},{status:503});

  const pdf=buildResourcePdf(resource);
  const base64=pdf.toString('base64');
  const downloadUrl=`${SITE}/api/resources/${resource.slug}`;
  const deliveryHtml=`<div style="background:#ECEFF3;padding:40px 20px;font-family:Arial,sans-serif;color:#0F1720"><div style="max-width:640px;margin:auto;background:#0A1018;color:#F2F5F8;padding:42px;border-radius:20px"><div style="font-size:12px;font-weight:700;letter-spacing:.08em;color:#C69B4E">SIDDHARTH BHATTACHARJEE</div><h1 style="font-size:34px;line-height:1.05;margin:28px 0 16px">Your ${resource.title} is ready.</h1><p style="font-size:16px;line-height:1.6;color:#AAB5C2">Hi ${escapeHtml(name)}, I hope this gives you a useful way to think through the problem. The PDF is attached, and you can also access it here:</p><p><a href="${downloadUrl}" style="display:inline-block;background:#C69B4E;color:#1A1206;text-decoration:none;font-weight:700;padding:13px 20px;border-radius:999px">Open the resource</a></p><p style="font-size:13px;line-height:1.6;color:#94A1B1;margin-top:32px">If the framework helps you identify a bigger growth, positioning, demand or retention problem, that is usually where a conversation becomes useful.</p><p style="font-size:13px;color:#94A1B1">siddharthbhattacharjee.in<br/>email@siddharthbhattacharjee.in<br/>+91 70931 42389</p></div></div>`;
  const notifyHtml=`<div style="font-family:Arial,sans-serif"><h2>New resource lead</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Resource:</strong> ${escapeHtml(resource.title)}</p><p><strong>Source:</strong> ${SITE}/resources/${resource.slug}</p></div>`;

  const send=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[email],subject:`Your ${resource.title}`,html:deliveryHtml,attachments:[{filename:`${resource.slug}.pdf`,content:base64}]})});
  if(!send.ok)return NextResponse.json({error:'We could not send the resource right now. Please try again.'},{status:502});
  await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json'},body:JSON.stringify({from,to:[notify],subject:`New resource lead: ${resource.title}`,html:notifyHtml})});
  return NextResponse.json({ok:true,message:'The resource has been sent to your inbox.'});
 }catch{return NextResponse.json({error:'Something went wrong. Please try again.'},{status:500});}
}
function escapeHtml(value:string){return value.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');}
