import type { MetadataRoute } from 'next';
import { posts } from '../lib/posts';
import { caseStudies } from '../lib/case-studies';
const base='https://siddharthbhattacharjee.in';
export default function sitemap():MetadataRoute.Sitemap{
 const staticPages=['','/services','/blog','/case-studies','/book','/resources','/marketing-consultant-bangalore'];
 const resourceSlugs=['marketing-strategy-canvas','landing-page-checklist','gtm-template','brand-positioning-worksheet','b2b-marketing-canvas','lifecycle-marketing-map'];
 return [
  ...staticPages.map((path,i)=>({url:base+path,lastModified:new Date(),changeFrequency:i<3?'weekly' as const:'monthly' as const,priority:i===0?1:.85})),
  ...resourceSlugs.map(slug=>({url:`${base}/resources/${slug}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.7})),
  ...posts.map(p=>({url:`${base}/blog/${p.slug}`,lastModified:new Date(p.date),changeFrequency:'monthly' as const,priority:.75})),
  ...caseStudies.map(c=>({url:`${base}/case-studies/${c.slug}`,lastModified:new Date(),changeFrequency:'monthly' as const,priority:.7})),
 ];
}
