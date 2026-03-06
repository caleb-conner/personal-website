import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function GET() {
  const baseUrl = process.env.UPTIME_KUMA_URL;
  const slug = process.env.UPTIME_KUMA_SLUG;

  if (!baseUrl || !slug) {
    return NextResponse.json(
      { error: 'Uptime Kuma not configured' },
      { status: 502 }
    );
  }

  try {
    const [statusRes, heartbeatRes] = await Promise.all([
      fetch(`${baseUrl}/status/${slug}`, { next: { revalidate: 60 } }),
      fetch(`${baseUrl}/status/heartbeat/${slug}`, { next: { revalidate: 60 } }),
    ]);

    if (!statusRes.ok || !heartbeatRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch status from Uptime Kuma' },
        { status: 502 }
      );
    }

    const statusData = await statusRes.json();
    const heartbeatData = await heartbeatRes.json();

    const services = {};

    // Build monitor ID -> name mapping from status page config
    const monitors = statusData.publicGroupList || [];
    const monitorMap = {};
    for (const group of monitors) {
      for (const monitor of group.monitorList || []) {
        monitorMap[monitor.id] = monitor.name;
      }
    }

    // Map heartbeat data to service names
    const heartbeatList = heartbeatData.heartbeatList || {};
    const uptimeList = heartbeatData.uptimeList || {};

    for (const [monitorId, heartbeats] of Object.entries(heartbeatList)) {
      const name = monitorMap[monitorId] || `Monitor ${monitorId}`;
      const latestHeartbeat = heartbeats[heartbeats.length - 1];
      const uptime = uptimeList[monitorId + '_24'] ?? null;

      services[name] = {
        status: latestHeartbeat?.status === 1 ? 'up' : 'down',
        uptime: uptime,
      };
    }

    return NextResponse.json({ services });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to connect to Uptime Kuma' },
      { status: 502 }
    );
  }
}
