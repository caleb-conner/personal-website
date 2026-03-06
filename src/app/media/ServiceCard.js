'use client';

import { useState } from 'react';
import styles from './ServiceCard.module.css';

export default function ServiceCard({ service, status }) {
  const [expanded, setExpanded] = useState(false);

  const statusColor =
    status?.status === 'up'
      ? '#22c55e'
      : status?.status === 'down'
        ? '#ef4444'
        : '#9ca3af';

  const statusLabel =
    status?.status === 'up'
      ? 'Online'
      : status?.status === 'down'
        ? 'Offline'
        : 'Unknown';

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <img
          src={service.logo}
          alt={`${service.name} logo`}
          className={styles.logo}
        />
        <div className={styles.headerInfo}>
          <h3 className={styles.name}>{service.name}</h3>
          <div className={styles.status}>
            <span
              className={styles.statusDot}
              style={{ backgroundColor: statusColor }}
            />
            <span className={styles.statusLabel}>{statusLabel}</span>
            {status?.uptime != null && (
              <span className={styles.uptime}>
                {(status.uptime * 100).toFixed(1)}% uptime
              </span>
            )}
          </div>
        </div>
      </div>

      <p className={styles.description}>{service.description}</p>

      <a
        href={service.url}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.openLink}
      >
        Open {service.name}
      </a>

      <div className={styles.apps}>
        <div className={styles.appSection}>
          <div className={styles.appRow}>
            <span className={styles.appLabel}>iOS:</span>
            <a
              href={service.apps.ios.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.appLink}
            >
              {service.apps.ios.name}
            </a>
          </div>
          {service.apps.ios.alt && (
            <p className={styles.altText}>{service.apps.ios.alt}</p>
          )}
          {service.apps.ios.instructions && (
            <ol className={styles.instructions}>
              {service.apps.ios.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          )}
        </div>
        <div className={styles.appSection}>
          <div className={styles.appRow}>
            <span className={styles.appLabel}>Android:</span>
            <a
              href={service.apps.android.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.appLink}
            >
              {service.apps.android.name}
            </a>
          </div>
          {service.apps.android.alt && (
            <p className={styles.altText}>{service.apps.android.alt}</p>
          )}
          {service.apps.android.instructions && (
            <ol className={styles.instructions}>
              {service.apps.android.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          )}
        </div>
      </div>

      <button
        className={styles.expandButton}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? 'Hide' : 'Show'} connection instructions
      </button>

      {expanded && (
        <div className={styles.connectionInfo}>
          <div className={styles.serverUrl}>
            <span className={styles.urlLabel}>Server URL:</span>
            <code className={styles.urlValue}>{service.connection.serverUrl}</code>
          </div>
          <p className={styles.connectionNotes}>{service.connection.notes}</p>
        </div>
      )}
    </div>
  );
}
