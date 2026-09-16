import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function shorten(url: string) {
  const params = new URLSearchParams({ format: 'simple', url });
  const response = await fetch(`https://is.gd/create.php?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: 'text/plain' },
  });

  const text = (await response.text()).trim();

  if (text.startsWith('https://is.gd/')) {
    return { response, shortUrl: text, error: '' };
  }

  const error = text.replace(/^Error:\s*/i, '').trim();
  return { response, shortUrl: '', error };
}

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

    const result = await shorten(parsed.toString());

    if (!result.shortUrl) {
      const status = result.error.toLowerCase().includes('rate limit') ? 429 : 502;
      return NextResponse.json(
        { error: result.error || 'The shortener is temporarily unavailable.' },
        { status },
      );
    }

    return NextResponse.json({ shortUrl: result.shortUrl });
  } catch {
    return NextResponse.json({ error: 'Unable to create a short URL right now. Please try again in a moment.' }, { status: 502 });
  }
}
