import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

async function shortenIsGd(url: string) {
  const params = new URLSearchParams({ format: 'simple', url });
  const response = await fetch(`https://is.gd/create.php?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: 'text/plain' },
  });

  const text = (await response.text()).trim();

  if (text.startsWith('https://is.gd/')) {
    return { shortUrl: text, error: '' };
  }

  return { shortUrl: '', error: text.replace(/^Error:\s*/i, '').trim() };
}

async function shortenTinyUrl(url: string) {
  const endpoint = `https://tinyurl.com/create.php?source=indexpage&submit=Make+TinyURL%21&url=${encodeURIComponent(url)}`;
  const response = await fetch(endpoint, {
    method: 'GET',
    cache: 'no-store',
    headers: { Accept: 'text/html,application/xhtml+xml' },
  });

  const html = await response.text();
  const match = html.match(/https:\/\/tinyurl\.com\/[a-zA-Z0-9_-]+/);
  return {
    shortUrl: match?.[0] || '',
    error: match ? '' : 'TinyURL did not return a short URL.',
  };
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

    const isGd = await shortenIsGd(parsed.toString());
    if (isGd.shortUrl) {
      return NextResponse.json({ shortUrl: isGd.shortUrl, provider: 'is.gd' });
    }

    const tinyUrl = await shortenTinyUrl(parsed.toString());
    if (tinyUrl.shortUrl) {
      return NextResponse.json({ shortUrl: tinyUrl.shortUrl, provider: 'tinyurl' });
    }

    return NextResponse.json(
      { error: isGd.error || tinyUrl.error || 'No URL shortener is currently available.' },
      { status: 502 },
    );
  } catch {
    return NextResponse.json(
      { error: 'Unable to create a short URL right now. Please try again in a moment.' },
      { status: 502 },
    );
  }
}
