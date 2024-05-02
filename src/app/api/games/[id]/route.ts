import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const imageUrl =
    'https://cdn.pixabay.com/photo/2023/08/18/15/02/cat-8198720_960_720.jpg';

  const res = await fetch(imageUrl);
  const blob = await res.arrayBuffer();

  const headers = new Headers();
  headers.set('Content-Type', 'image/jpg');

  return new NextResponse(blob, { status: 200, statusText: 'OK', headers });
}
