'use client';

import { useState } from 'react';
import styles from './MediaLogin.module.css';

export default function MediaLogin({ onSuccess }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.authenticated) {
        onSuccess();
      } else {
        setError('Incorrect password');
        setPassword('');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Media Services</h1>
        <p className={styles.subtitle}>Enter the password to access media server details.</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className={styles.input}
            autoFocus
          />
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.button} disabled={submitting}>
            {submitting ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
