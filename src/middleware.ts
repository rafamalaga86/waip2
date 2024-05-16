import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export function otherMiddleware(request: NextRequest) {
  console.log('Escupe: PUTIN');
  return NextResponse.next();
}
