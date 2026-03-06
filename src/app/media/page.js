'use client';

import { useState, useEffect } from 'react';
import MediaLogin from './MediaLogin';
import MediaDashboard from './MediaDashboard';

export default function MediaPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/auth/check')
      .then((res) => res.json())
      .then((data) => {
        setAuthenticated(data.authenticated);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  if (!authenticated) {
    return <MediaLogin onSuccess={() => setAuthenticated(true)} />;
  }

  return <MediaDashboard />;
}
