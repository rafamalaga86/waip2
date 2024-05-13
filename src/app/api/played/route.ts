import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  return new NextResponse(, { status: 200, statusText: 'OK', headers });
}
