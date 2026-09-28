type RecordValue = Record<string, any>;
const record = (value: unknown): RecordValue => value !== null && typeof value === 'object' && !Array.isArray(value) ? value as RecordValue : {};
const rows = (value: unknown): RecordValue[] => Array.isArray(value) ? value.filter(item => item !== null && typeof item === 'object' && !Array.isArray(item)) : [];
// Missing source metrics stay unknown; absent collections are safe to render.
export function normalizeDashboard(input: unknown, defaults: RecordValue): RecordValue {
 const raw=record(input);
 if(!raw.current || !raw.funnel || typeof raw.site!=='string') throw new Error('Invalid dashboard data');
 const result={...defaults,...raw};
 for(const key of ['baseline','current','change','funnel','ai']) result[key]={...defaults[key],...record(raw[key])};
 for(const key of ['queries','pages','opportunities','goals']) result[key]=rows(raw[key]);
 for(const key of ['topSources','topLandingPages','devices','countries']) result.funnel[key]=rows(result.funnel[key]);
 for(const key of ['groundingQueries','citedPages']) result.ai[key]=rows(result.ai[key]);
 const paths=(value: unknown): RecordValue[]=>rows(value).map(row=>({...row,path:row.path??row.page??'',page:row.page??row.path??''}));
 result.pages=paths(result.pages);
 result.funnel.topLandingPages=paths(result.funnel.topLandingPages);
 result.ai.citedPages=paths(result.ai.citedPages);
 // GA4 engagementRate is a fraction; the UI displays percentages.
 const percentage=(value: unknown)=>typeof value==='number'&&Number.isFinite(value)?value*100:null;
 result.funnel.engagementRate=percentage(result.funnel.engagementRate);
 result.funnel.topLandingPages=result.funnel.topLandingPages.map((row: RecordValue)=>({...row,engagementRate:percentage(row.engagementRate)}));
 result.periods=Object.fromEntries(Object.entries(record(raw.periods)).filter(([,value])=>value&&typeof value==='object').map(([key,value])=>{
  const period=record(value);
  return [key,{...defaults.current,...defaults.funnel,...period,engagementRate:percentage(period.engagementRate),topSources:rows(period.topSources),topLandingPages:paths(period.topLandingPages).map(row=>({...row,engagementRate:percentage(row.engagementRate)})),devices:rows(period.devices),countries:rows(period.countries),queries:rows(period.queries),pages:paths(period.pages)}];
 }));
 return result;
}
