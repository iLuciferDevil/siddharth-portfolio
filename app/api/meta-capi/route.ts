import { createHash } from 'crypto';
import { NextResponse } from 'next/server';

function sha256(value: string) {
  return createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

export async function POST(request: Request) {
  const pixelId = process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!pixelId || !accessToken) {
    return NextResponse.json({ ok: true, configured: false });
  }

  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email : '';

    const payload = {
      data: [{
        event_name: body.event_name || 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: body.event_id,
        action_source: 'website',
        event_source_url: body.event_source_url,
        user_data: email ? { em: [sha256(email)] } : {},
        custom_data: {
          content_name: 'Marketing Growth Diagnostic',
          value: 2500,
          currency: 'INR',
        },
      }],
    };

    const response = await fetch(`https://graph.facebook.com/v23.0/${pixelId}/events?access_token=${encodeURIComponent(accessToken)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }

    return NextResponse.json({ ok: true, configured: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
