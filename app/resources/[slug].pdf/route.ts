import { NextResponse } from 'next/server';

const titles:Record<string,string>={
  'marketing-strategy-canvas':'Marketing Strategy Canvas',
  'landing-page-checklist':'Landing Page Checklist',
  'gtm-template':'GTM Planning Template',
  'brand-positioning-worksheet':'Brand Positioning Worksheet',
  'b2b-marketing-canvas':'B2B Marketing Canvas',
  'lifecycle-marketing-map':'Lifecycle Marketing Map',
};

function pdf(title:string){
  const esc=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)');
  const lines=[title,'Siddharth Bhattacharjee · siddharthbhattacharjee.in','Use this framework to work through the problem in your own business.'];
  const stream=`BT /F1 18 Tf 54 780 Td (${esc(lines[0])}) Tj /F1 10 Tf 0 -24 Td (${esc(lines[1])}) Tj 0 -34 Td (${esc(lines[2])}) Tj ET`;
  const objects=[`1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj`,`2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj`,`3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >> endobj`,`4 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj`,`5 0 obj << /Length ${stream.length} >> stream\n${stream}\nendstream endobj`];
  let out='%PDF-1.4\n'; const offsets=[0];
  for(const obj of objects){offsets.push(out.length);out+=obj+'\n';}
  const xref=out.length; out+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n`;
  for(let i=1;i<offsets.length;i++)out+=String(offsets[i]).padStart(10,'0')+' 00000 n \n';
  out+=`trailer << /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return out;
}

export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;const title=titles[slug];if(!title)return new NextResponse('Not found',{status:404});return new NextResponse(pdf(title),{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${slug}.pdf"`}});}
