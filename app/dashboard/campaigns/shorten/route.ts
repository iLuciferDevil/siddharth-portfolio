import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = typeof body?.url === 'string' ? body.url.trim() : '';

    if (!url) {
      return NextResponse.json({ error: 'A URL is required.' }, { status: 400 });
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'The URL is invalid.' }, { status: 400 });
    }

    if (parsed.protocol !== 'https:') {
      return NextResponse.json({ error: 'Only HTTPS URLs can be shortened.' }, { status: 400 });
    }

    const response = await fetch(
      `https://is.gd/create.php?format=json&url=${encodeURIComponent(parsed.toString())}`,
      { method: 'GET', cache: 'no-store' },
    );

    if (!response.ok) {
      return NextResponse.json({ error: 'The shortener is temporarily unavailable.' }, { status: 502 });
    }

    const data = await response.json() as { shorturl?: string; errorcode?: number; errormessage?: string };

    if (!data.shorturl) {
      return NextResponse.json({ error: data.errormessage || 'The shortener did not return a short URL.' }, { status: 502 });
    }

    return NextResponse.json({ shortUrl: data.shorturl });
  } catch {
    return NextResponse.json({ error: 'Unable to create a short URL right now.' }, { status: 500 });
  }
}
