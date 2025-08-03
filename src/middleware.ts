import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser, updateSession } from './lib/auth.server';

// Routes that stars with that will be protected with login
const nonAuthRoutesStarts: string[] = ['/api/v1/games/'];

// Routes that are these exact will be protected with login
const nonAuthRoutesExact: string[] = [];

export async function middleware(request: NextRequest) {
  const user = await getAuthUser();

  if (isAuthRoute(request) && !user) {
    return NextResponse.redirect(new URL('/log-in', request.url));
  }
  let res = await updateSession(request);

  return res;
}

function isAuthRoute(request: NextRequest): boolean {
  for (const route of nonAuthRoutesStarts) {
    if (request.nextUrl.pathname.startsWith(route)) {
      return true;
    }
  }
  for (const route of nonAuthRoutesExact) {
    if (request.nextUrl.pathname === route) {
      return true;
    }
  }
  return false;
}
