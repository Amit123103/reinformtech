import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(req: NextRequest) {
  // Only protect the /admin routes
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const basicAuth = req.headers.get('authorization');

    // Default password 'admin123' if not set in environment
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    // We use a hardcoded username 'admin'
    const expectedAuth = `Basic ${Buffer.from(`admin:${adminPassword}`).toString('base64')}`;

    if (basicAuth !== expectedAuth) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Admin Area"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
