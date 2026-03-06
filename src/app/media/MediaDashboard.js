'use client';

import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import styles from './MediaDashboard.module.css';

const SERVICES = [
  {
    name: 'Jellyfin',
    description: 'Movies, TV shows, and more.',
    url: 'https://conner-jellyfin.duckdns.org',
    logo: '/logos/jellyfin.svg',
    apps: {
      ios: {
        name: 'Jellyfin Mobile',
        url: 'https://apps.apple.com/app/jellyfin-mobile/id1480732753',
      },
      android: {
        name: 'Jellyfin',
        url: 'https://play.google.com/store/apps/details?id=org.jellyfin.mobile',
      },
    },
    connection: {
      serverUrl: 'https://conner-jellyfin.duckdns.org',
      notes: 'Use the server URL when prompted during app setup.',
    },
  },
  {
    name: 'Audiobookshelf',
    description: 'Audiobooks and podcasts.',
    url: 'http://conner-jellyfin.duckdns.org:13378',
    logo: '/logos/audiobookshelf.svg',
    apps: {
      ios: {
        name: 'Audiobookshelf',
        url: 'https://apps.apple.com/app/audiobookshelf/id1641378028',
      },
      android: {
        name: 'Audiobookshelf',
        url: 'https://play.google.com/store/apps/details?id=com.audiobookshelf.app',
      },
    },
    connection: {
      serverUrl: 'http://conner-jellyfin.duckdns.org:13378',
      notes: 'Enter the server URL in the app to connect.',
    },
  },
  {
    name: 'Navidrome',
    description: 'Music streaming via Subsonic-compatible apps.',
    url: 'http://conner-jellyfin.duckdns.org:4533',
    logo: '/logos/navidrome.png',
    apps: {
      ios: {
        name: 'Amperfy',
        url: 'https://apps.apple.com/app/amperfy-music/id1530145038',
        alt: 'Other Subsonic clients (Play:Sub, Substreamer) also work.',
      },
      android: {
        name: 'Symphonium (recommended, paid)',
        url: 'https://play.google.com/store/apps/details?id=music.symphonium.app',
        alt: 'Free alternatives: Subtracks, DSub.',
      },
    },
    connection: {
      serverUrl: 'http://conner-jellyfin.duckdns.org:4533',
      notes:
        'Use any Subsonic-compatible app. When adding a server, enter the URL above with your username and password.',
    },
  },
];

export default function MediaDashboard() {
  const [statuses, setStatuses] = useState({});

  const fetchStatuses = () => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        if (data.services) {
          setStatuses(data.services);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    fetchStatuses();
    const interval = setInterval(fetchStatuses, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Media Services</h1>
        <p className={styles.subtitle}>
          Connect to these services using the apps and instructions below.
        </p>
      </div>
      <div className={styles.grid}>
        {SERVICES.map((service) => (
          <ServiceCard
            key={service.name}
            service={service}
            status={statuses[service.name] || null}
          />
        ))}
      </div>
    </div>
  );
}
