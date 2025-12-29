import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasToken = req.cookies.get('accessToken');

  const isAuth = pathname.startsWith('/auth');
  const isPrivate = pathname.startsWith('/app');

  if (hasToken && isAuth) return NextResponse.redirect(new URL('/app/boards', req.url));

  if (!hasToken && isPrivate) return NextResponse.redirect(new URL('/auth/login', req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
