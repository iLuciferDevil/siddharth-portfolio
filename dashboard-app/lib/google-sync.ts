import { createSign } from 'node:crypto';

export const SITE = 'https://siddharthbhattacharjee.in/';
export const RANGE_KEYS = ['7d','28d','90d','month','prev-month','baseline'];
type Row = Record<string, any>;
export class SyncError extends Error {
 constructor(message: string, public status = 502) { super(message); }
}
export function configurationReady() {
 return Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_JSON && /^\d+$/.test(process.env.GA4_PROPERTY_ID || ''));
}
export function reportingRange(key: string, now = new Date()) {
 if(!RANGE_KEYS.includes(key)) throw new SyncError('Choose a valid reporting period.',400);
 // Report through yesterday in the portfolio reporting timezone. Recent results can change.
 const today = new Date(`${new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Kolkata',year:'numeric',month:'2-digit',day:'2-digit'}).format(now)}T00:00:00Z`);
 const end=new Date(today); end.setUTCDate(end.getUTCDate()-1);
 const start=new Date(end);
 if(key==='month') {start.setTime(today.getTime());start.setUTCDate(1);}
 else if(key==='prev-month') {end.setTime(today.getTime());end.setUTCDate(0);start.setTime(end.getTime());start.setUTCDate(1);}
 else if(key==='baseline') start.setTime(Date.parse('2026-09-16T00:00:00Z'));
 else start.setUTCDate(end.getUTCDate()-(Number(key.slice(0,-1))-1));
 if(start>end) throw new SyncError('There is no completed reporting day in this period yet.',400);
 return {startDate:start.toISOString().slice(0,10),endDate:end.toISOString().slice(0,10)};
}
async function accessToken(signal: AbortSignal) {
 if(!configurationReady()) throw new SyncError('Live sync is not connected yet. A Google Analytics and Search Console connection is required. Your saved data has not changed.',503);
 let account: Row;
 try {account=JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON!);} catch {throw new SyncError('The Google connection needs to be configured again.',503);}
 if(!account.client_email || !account.private_key) throw new SyncError('The Google connection is incomplete.',503);
 const now=Math.floor(Date.now()/1000);
 const encode=(value:unknown)=>Buffer.from(JSON.stringify(value)).toString('base64url');
 const claim=`${encode({alg:'RS256',typ:'JWT'})}.${encode({iss:account.client_email,scope:'https://www.googleapis.com/auth/analytics.readonly https://www.googleapis.com/auth/webmasters.readonly',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600})}`;
 let signature:string;
 try {signature=createSign('RSA-SHA256').update(claim).sign(account.private_key,'base64url');} catch {throw new SyncError('The Google connection credentials are invalid.',503);}
 const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:`${claim}.${signature}`}),signal,cache:'no-store'});
 if(!response.ok) throw new SyncError('Google could not authenticate the connection. Please reconnect it.',503);
 const result=await response.json();
 if(!result.access_token) throw new SyncError('Google did not return an access token.',503);
 return result.access_token as string;
}
async function google(url:string,body:Row,token:string,signal:AbortSignal) {
 const response=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(body),signal,cache:'no-store'});
 if(!response.ok) {
  if(response.status===401||response.status===403) throw new SyncError('Google denied access. Check the connection has read access to both portfolio properties.',503);
  if(response.status===429) throw new SyncError('Google is rate limiting requests. Please try again in a few minutes.',429);
  throw new SyncError('Google could not complete the sync. Your previous data has been kept.');
 }
 return response.json();
}
export function gaRows(report:Row):Row[] {
 return (report.rows||[]).map((row:Row)=>Object.fromEntries([
  ...(report.dimensionHeaders||[]).map((header:Row,index:number)=>[header.name,row.dimensionValues?.[index]?.value??'']),
  ...(report.metricHeaders||[]).map((header:Row,index:number)=>[header.name,Number(row.metricValues?.[index]?.value??0)])
 ]));
}
export async function syncGoogle(rangeKey:string,signal:AbortSignal) {
 const range=reportingRange(rangeKey);
 const token=await accessToken(signal);
 const property=`properties/${process.env.GA4_PROPERTY_ID}`;
 const report=(metrics:string[],dimension?:string)=>({dateRanges:[range],metrics:metrics.map(name=>({name})),...(dimension?{dimensions:[{name:dimension}],orderBys:[{metric:{metricName:metrics[0]},desc:true}],limit:'100'}:{})});
 const requests=[
  report(['activeUsers','newUsers','sessions','engagedSessions','engagementRate','keyEvents']),
  report(['sessions','keyEvents'],'sessionSourceMedium'),
  report(['sessions','engagementRate'],'landingPagePlusQueryString'),
  report(['activeUsers'],'deviceCategory'),
  report(['activeUsers'],'country'),
  report(['eventCount'],'eventName'),
  report(['sessions'],'sessionDefaultChannelGroup'),
  {...report(['sessions']),dimensionFilter:{filter:{fieldName:'sessionSource',stringFilter:{matchType:'PARTIAL_REGEXP',value:'chatgpt\\.com|chat\\.openai\\.com|perplexity\\.ai|claude\\.ai|gemini\\.google\\.com|copilot\\.microsoft\\.com',caseSensitive:false}}}}
 ];
 const gaUrl=`https://analyticsdata.googleapis.com/v1beta/${property}:batchRunReports`;
 const gscUrl=`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`;
 const search=(dimensions?:string[])=>google(gscUrl,{...range,type:'web',dataState:'all',rowLimit:dimensions?.[0]==='date'?25000:100,...(dimensions?{dimensions}:{})},token,signal);
 const [batch1,batch2,summary,queries,pages,dates]=await Promise.all([
  google(gaUrl,{requests:requests.slice(0,5)},token,signal),google(gaUrl,{requests:requests.slice(5)},token,signal),search(),search(['query']),search(['page']),search(['date'])
 ]);
 const reports=[...(batch1.reports||[]),...(batch2.reports||[])];
 if(reports.length!==8) throw new SyncError('Google returned an incomplete report. Your previous data has been kept.');
 const [totals,sources,landing,devices,countries,events,channels,ai]=reports.map(gaRows);
 const metrics=totals[0]||{activeUsers:0,newUsers:0,sessions:0,engagedSessions:0,engagementRate:0,keyEvents:0};
 const gsc=summary.rows?.[0]||{clicks:0,impressions:0,ctr:0,position:0};
 const event=(names:string[])=>{const matches=events.filter((row:Row)=>names.includes(row.eventName));return matches.length?matches.reduce((sum:number,row:Row)=>sum+row.eventCount,0):null;};
 // Outbound clicks and contact events are not treated as purchases or confirmed enquiries.
 const snapshot={
  period:`${range.startDate} to ${range.endDate}`,syncedAt:new Date().toISOString(),
  clicks:gsc.clicks,impressions:gsc.impressions,ctr:gsc.ctr*100,position:gsc.impressions?gsc.position:null,
  nonBrandedClicks:null,nonBrandedImpressions:null,aiFeatureImpressions:null,aiCitations:null,citedPages:null,
  users:metrics.activeUsers,newUsers:metrics.newUsers,returningUsers:null,sessions:metrics.sessions,engagedSessions:metrics.engagedSessions,engagementRate:metrics.engagementRate,
  organicSessions:channels.find((row:Row)=>row.sessionDefaultChannelGroup==='Organic Search')?.sessions??0,
  aiSessions:ai[0]?.sessions??0,
  resourceViews:event(['resource_view']),resourceDownloads:event(['resource_download']),resourceLeads:event(['resource_lead']),consultingEnquiries:null,
  bookingStarts:event(['booking_start']),bookingCompletions:event(['booking_complete','booking_completed']),bookClicks:event(['book_gumroad_click','book_amazon_click']),conversionRate:null,
  topSources:sources.map((row:Row)=>({source:row.sessionSourceMedium,sessions:row.sessions,conversions:row.keyEvents})),
  topLandingPages:landing.map((row:Row)=>({page:row.landingPagePlusQueryString,sessions:row.sessions,engagementRate:row.engagementRate})),
  devices:devices.map((row:Row)=>({device:row.deviceCategory,users:row.activeUsers})),countries:countries.map((row:Row)=>({country:row.country,users:row.activeUsers})),
  queries:(queries.rows||[]).map((row:Row)=>({query:row.keys[0],clicks:row.clicks,impressions:row.impressions,position:row.position})),
  pages:(pages.rows||[]).map((row:Row)=>({page:row.keys[0],clicks:row.clicks,impressions:row.impressions,position:row.position})),
  notes:'Fetched directly from Google. Recent dates may be incomplete. Missing event metrics remain unknown. AI referrals include identifiable assistant domains only.',
  firstIncompleteDate:dates.metadata?.first_incomplete_date??null,
  latestSearchDate:(dates.rows||[]).map((row:Row)=>row.keys[0]).sort().at(-1)??null,
  ga4TimeZone:reports[0].metadata?.timeZone??null
 };
 return {range:rangeKey,snapshot,syncedAt:snapshot.syncedAt,reportingPeriod:snapshot.period,message:'Google Analytics and Search Console synced. Recent dates may still be processing.'};
}
