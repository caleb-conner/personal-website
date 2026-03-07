'use client';

import { useState, useRef } from 'react';
import styles from './FileUpload.module.css';

const MEDIA_TYPES = [
  { value: 'music', label: 'Music' },
  { value: 'music-kids', label: 'Music (Kids)' },
  { value: 'audiobook', label: 'Audiobook' },
  { value: 'movie', label: 'Movie' },
  { value: 'tv', label: 'TV Show' },
];

const ALLOWED_EXTENSIONS = [
  '.mp3', '.m4a', '.m4b', '.flac', '.ogg', '.opus', '.wav',
  '.mp4', '.mkv', '.avi', '.zip',
];

export default function FileUpload() {
  const [files, setFiles] = useState([]);
  const [type, setType] = useState('music');
  const [uploading, setUploading] = useState(false);
  const [results, setResults] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
    setResults([]);
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setResults([]);
    const uploadResults = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (res.ok) {
          uploadResults.push({ name: file.name, success: true, path: data.path });
        } else {
          uploadResults.push({ name: file.name, success: false, error: data.error });
        }
      } catch {
        uploadResults.push({ name: file.name, success: false, error: 'Network error' });
      }
    }

    setResults(uploadResults);
    setUploading(false);
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upload Media</h2>
      <p className={styles.subtitle}>
        Add files to the media server. Select a category and choose your files.
      </p>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="mediaType">Category</label>
          <select
            id="mediaType"
            className={styles.select}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {MEDIA_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="fileInput">Files</label>
          <input
            id="fileInput"
            ref={fileInputRef}
            type="file"
            multiple
            accept={ALLOWED_EXTENSIONS.join(',')}
            onChange={handleFileChange}
            className={styles.fileInput}
          />
        </div>

        {files.length > 0 && (
          <div className={styles.fileList}>
            <p className={styles.fileCount}>{files.length} file{files.length !== 1 ? 's' : ''} selected</p>
            <ul className={styles.fileNames}>
              {files.map((f, i) => (
                <li key={i}>{f.name} ({(f.size / (1024 * 1024)).toFixed(1)} MB)</li>
              ))}
            </ul>
          </div>
        )}

        <button
          className={styles.uploadButton}
          onClick={handleUpload}
          disabled={uploading || files.length === 0}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((r, i) => (
            <div
              key={i}
              className={`${styles.result} ${r.success ? styles.resultSuccess : styles.resultError}`}
            >
              <span className={styles.resultName}>{r.name}</span>
              <span className={styles.resultStatus}>
                {r.success ? `Uploaded to ${r.path}` : r.error}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
