import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const user = process.env.DASHBOARD_USER_ID || '';
  const password = process.env.DASHBOARD_PASSWORD || '';
  const auth = request.headers.get('authorization') || '';
  const expected = user && password ? `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}` : '';

  if (!user || !password || auth !== expected) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Private Analytics Dashboard", charset="UTF-8"',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet',
      },
    });
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'private, no-store, no-cache, must-revalidate');
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
  return response;
}

export const config = { matcher: ['/dashboard/:path*'] };
