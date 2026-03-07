import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

const ALLOWED_EXTENSIONS = new Set([
  '.mp3', '.m4a', '.m4b', '.flac', '.ogg', '.opus', '.wav',
  '.mp4', '.mkv', '.avi', '.zip',
]);

const ALLOWED_TYPES = new Set(['audiobook', 'music', 'music-kids', 'movie', 'tv']);

export async function POST(request) {
  // Check auth
  const cookieStore = cookies();
  const authCookie = cookieStore.get('media_auth');
  if (!authCookie || authCookie.value !== 'authenticated') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const uploadUrl = process.env.UPLOAD_URL;
  const uploadToken = process.env.UPLOAD_TOKEN;

  if (!uploadUrl || !uploadToken) {
    return NextResponse.json({ error: 'Upload service not configured' }, { status: 502 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const type = formData.get('type');

    if (!file || !type) {
      return NextResponse.json({ error: 'Missing file or type' }, { status: 400 });
    }

    if (!ALLOWED_TYPES.has(type)) {
      return NextResponse.json({ error: `Invalid type: ${type}` }, { status: 400 });
    }

    const ext = '.' + file.name.split('.').pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.has(ext)) {
      return NextResponse.json({ error: `File extension ${ext} not allowed` }, { status: 400 });
    }

    // Forward to upload receiver
    const upstreamForm = new FormData();
    upstreamForm.append('file', file, file.name);
    upstreamForm.append('type', type);

    const res = await fetch(`${uploadUrl}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${uploadToken}`,
      },
      body: upstreamForm,
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Upload failed', detail: error.message },
      { status: 500 }
    );
  }
}
