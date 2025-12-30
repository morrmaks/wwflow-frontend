import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

import { ROUTE_SEGMENTS, ROUTES } from './common/constants/routes';
import { COOKIE_KEYS } from './common/constants/storage';

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasToken = req.cookies.get(COOKIE_KEYS.accessToken);

  const isAuth = pathname.startsWith(ROUTE_SEGMENTS.auth);
  const isPrivate = pathname.startsWith(ROUTE_SEGMENTS.app);

  if (hasToken && isAuth) return NextResponse.redirect(new URL(ROUTES.appBoards, req.url));

  if (!hasToken && isPrivate) return NextResponse.redirect(new URL(ROUTES.authLogin, req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
