import { NextResponse } from 'next/server';
import { getResource } from '../../../../lib/resources';
import { buildResourcePdf } from '../../../../lib/resource-pdf';

export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const resource=getResource(slug);
  if(!resource)return new NextResponse('Not found',{status:404});
  const pdf=buildResourcePdf(resource);
  return new NextResponse(new Uint8Array(pdf),{status:200,headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${slug}.pdf"`,'Content-Length':String(pdf.length),'Cache-Control':'private, max-age=3600'}});
}
