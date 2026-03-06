import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const authCookie = cookieStore.get('media_auth');

  if (authCookie && authCookie.value === 'authenticated') {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false });
}
