import { NextRequest, NextResponse } from 'next/server';
import { configurationReady, RANGE_KEYS, SyncError, syncGoogle } from '../../../lib/google-sync';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export const maxDuration=60;
const headers={'Cache-Control':'private, no-store','X-Robots-Tag':'noindex, nofollow'};
// The deployment's existing Vercel access protection also covers this route.
export async function GET() {
 return NextResponse.json({configured:configurationReady()}, {headers});
}
export async function POST(request:NextRequest) {
 const origin=request.headers.get('origin');
 if(!origin || origin!==new URL(request.url).origin) return NextResponse.json({message:'Sync requests must come from this dashboard.'},{status:403,headers});
 let range:string;
 try {range=(await request.json()).range;} catch {return NextResponse.json({message:'Invalid sync request.'},{status:400,headers});}
 if(!RANGE_KEYS.includes(range)) return NextResponse.json({message:'Choose a valid reporting period.'},{status:400,headers});
 try {
  const result=await syncGoogle(range,AbortSignal.timeout(50000));
  return NextResponse.json(result,{headers});
 }catch(error){
  const known=error instanceof SyncError;
  return NextResponse.json({message:known?error.message:'Sync timed out or failed. Your previous data has been kept.'},{status:known?error.status:502,headers});
 }
}
