import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request) {
  const { password } = await request.json();

  if (password === process.env.MEDIA_PASSWORD) {
    const response = NextResponse.json({ authenticated: true });
    response.cookies.set('media_auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/',
    });
    return response;
  }

  return NextResponse.json({ authenticated: false, error: 'Invalid password' }, { status: 401 });
}
