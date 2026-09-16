import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function shortenCleanUri(url: string) {
  const response = await fetch('https://cleanuri.com/api/v1/shorten', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json',
    },
    body: new URLSearchParams({ url }),
  });

  const data = await response.json() as { result_url?: string; error?: string };
  return { shortUrl: data.result_url || '', error: data.error || '' };
}

async function shortenIsGd(url: string) {
  const params = new URLSearchParams({ format: 'simple', url });
  const response = await fetch(`https://is.gd/create.php?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: 'text/plain' },
  });

  const text = (await response.text()).trim();
  if (text.startsWith('https://is.gd/')) return { shortUrl: text, error: '' };
  return { shortUrl: '', error: text.replace(/^Error:\s*/i, '').trim() };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const url = typeof body?.url === 'string' ? body.url.trim() : '';

    if (!url) return NextResponse.json({ error: 'A URL is required.' }, { status: 400 });

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: 'The URL is invalid.' }, { status: 400 });
    }

    if (parsed.protocol !== 'https:') {
      return NextResponse.json({ error: 'Only HTTPS URLs can be shortened.' }, { status: 400 });
    }

    // CleanURI is the primary provider because it exposes a documented,
    // unauthenticated POST API. is.gd remains a fallback for resilience.
    const cleanUri = await shortenCleanUri(parsed.toString());
    if (cleanUri.shortUrl) {
      return NextResponse.json({ shortUrl: cleanUri.shortUrl, provider: 'cleanuri' });
    }

    const isGd = await shortenIsGd(parsed.toString());
    if (isGd.shortUrl) {
      return NextResponse.json({ shortUrl: isGd.shortUrl, provider: 'is.gd' });
    }

    return NextResponse.json(
      { error: 'The URL shortener services are currently unavailable. Please try again shortly.' },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Unable to create a short URL right now. Please try again shortly.' },
      { status: 502 },
    );
  }
}
