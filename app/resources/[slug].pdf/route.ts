import {NextResponse} from 'next/server';

export async function GET(_:Request,{params}:{params:Promise<{slug:string}>}){const {slug}=await params;return NextResponse.redirect(new URL(`/api/resources/${slug}`,process.env.NEXT_PUBLIC_SITE_URL||'https://siddharthbhattacharjee.in'));}
