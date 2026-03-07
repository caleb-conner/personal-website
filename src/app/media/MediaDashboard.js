'use client';

import { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import FileUpload from './FileUpload';
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
        instructions: [
          'Install "Jellyfin Mobile" from the App Store.',
          'Open the app and enter the server URL: https://conner-jellyfin.duckdns.org',
          'Sign in with your username and password.',
        ],
      },
      android: {
        name: 'Jellyfin',
        url: 'https://play.google.com/store/apps/details?id=org.jellyfin.mobile',
        instructions: [
          'Install "Jellyfin" from the Play Store.',
          'Open the app and enter the server URL: https://conner-jellyfin.duckdns.org',
          'Sign in with your username and password.',
        ],
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
        instructions: [
          'Install "Audiobookshelf" from the App Store.',
          'Open the app and tap "Connect to Server".',
          'Enter the server URL: http://conner-jellyfin.duckdns.org:13378',
          'Sign in with your username and password.',
        ],
      },
      android: {
        name: 'Audiobookshelf',
        url: 'https://play.google.com/store/apps/details?id=com.audiobookshelf.app',
        instructions: [
          'Install "Audiobookshelf" from the Play Store.',
          'Open the app and tap "Connect to Server".',
          'Enter the server URL: http://conner-jellyfin.duckdns.org:13378',
          'Sign in with your username and password.',
        ],
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
        instructions: [
          'Install "Amperfy" from the App Store.',
          'Open the app and go to Settings > Server.',
          'Select "Subsonic" as the server type.',
          'Enter the server URL: http://conner-jellyfin.duckdns.org:4533',
          'Enter your Navidrome username and password.',
        ],
      },
      android: {
        name: 'Symphonium (recommended, paid)',
        url: 'https://play.google.com/store/apps/details?id=music.symphonium.app',
        alt: 'Free alternatives: Subtracks, DSub.',
        instructions: [
          'Install "Symphonium" from the Play Store.',
          'Open the app and tap "Add Server".',
          'Select "Subsonic" as the server type.',
          'Enter the server URL: http://conner-jellyfin.duckdns.org:4533',
          'Enter your Navidrome username and password.',
          'Note: Symphonium is paid. Free alternatives like Subtracks or DSub use the same setup steps.',
        ],
      },
    },
    connection: {
      serverUrl: 'http://conner-jellyfin.duckdns.org:4533',
      notes:
        'Use any Subsonic-compatible app. When adding a server, enter the URL above with your username and password.',
    },
  },
  {
    name: 'D&D Campaigns',
    description: 'Campaign wiki with world lore, characters, and session notes.',
    url: 'https://dnd-companion-nu.vercel.app/wiki',
    logo: '/logos/dnd.svg',
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
      <FileUpload />
    </div>
  );
}
