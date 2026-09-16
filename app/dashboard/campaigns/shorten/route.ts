import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

function makeAlias(value: unknown) {
  if (typeof value !== 'string') return '';
  return value.trim().toLowerCase().replace(/[^a-z0-9_]+/g, '_').replace(/^_+|_+$/g, '').slice(0, 30);
}

async function shorten(url: string, alias = '') {
  const params = new URLSearchParams({ format: 'json', url });
  if (alias.length >= 5) params.set('shorturl', alias);

  const response = await fetch(`https://is.gd/create.php?${params.toString()}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await response.json() as {
    shorturl?: string;
    errorcode?: number;
    errormessage?: string;
  };

  return { response, data };
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

    const requestedAlias = makeAlias(body?.alias);
    const derivedAlias = makeAlias([
      parsed.searchParams.get('utm_source'),
      parsed.searchParams.get('utm_campaign'),
      parsed.searchParams.get('utm_content'),
    ].filter(Boolean).join('_'));
    const alias = requestedAlias || derivedAlias;

    let result = await shorten(parsed.toString(), alias);

    if (!result.data.shorturl && alias && result.data.errorcode === 2) {
      result = await shorten(parsed.toString());
    }

    if (!result.response.ok || !result.data.shorturl) {
      return NextResponse.json(
        { error: result.data.errormessage || 'The shortener is temporarily unavailable.' },
        { status: 502 },
      );
    }

    return NextResponse.json({ shortUrl: result.data.shorturl, aliasUsed: alias || undefined });
  } catch {
    return NextResponse.json({ error: 'Unable to create a short URL right now.' }, { status: 500 });
  }
}
