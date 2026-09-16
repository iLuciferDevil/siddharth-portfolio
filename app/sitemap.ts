import type {MetadataRoute} from 'next';
import {posts} from '../lib/posts';
import {caseStudies} from '../lib/case-studies';
import {resources} from '../lib/resources';
import {memos} from '../lib/memos';
import {bookGuides} from '../lib/book-guides';

export default function sitemap():MetadataRoute.Sitemap{
 const base='https://siddharthbhattacharjee.in';
 const now=new Date();
 return [
  {url:base,lastModified:now,changeFrequency:'weekly',priority:1},
  {url:`${base}/about`,lastModified:now,changeFrequency:'monthly',priority:.9},
  {url:`${base}/services`,lastModified:now,changeFrequency:'monthly',priority:.9},
  {url:`${base}/case-studies`,lastModified:now,changeFrequency:'monthly',priority:.95},
  {url:`${base}/book`,lastModified:now,changeFrequency:'monthly',priority:.9},
  {url:`${base}/memos`,lastModified:now,changeFrequency:'weekly',priority:.85},
  {url:`${base}/blog`,lastModified:now,changeFrequency:'weekly',priority:.85},
  {url:`${base}/resources`,lastModified:now,changeFrequency:'monthly',priority:.75},
  ...posts.map(p=>({url:`${base}/blog/${p.slug}`,lastModified:new Date(p.updated),changeFrequency:'monthly' as const,priority:.8})),
  ...caseStudies.map(c=>({url:`${base}/case-studies/${c.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:.7})),
  ...memos.map(m=>({url:`${base}/memos/${m.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:.7})),
  ...bookGuides.map(g=>({url:`${base}/book/guides/${g.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:.75})),
  ...resources.map(r=>({url:`${base}/resources/${r.slug}`,lastModified:now,changeFrequency:'monthly' as const,priority:.65}))
 ];
}
