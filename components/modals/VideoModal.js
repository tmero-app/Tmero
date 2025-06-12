'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import styles from '../../scss/VideoModal.module.scss';

export default function VideoModal({ isOpen, onClose, videoUrl, title }) {
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  // Extract video ID from various YouTube URL formats
  const getYouTubeVideoId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*).*/,
      /^[a-zA-Z0-9_-]{11}$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    // If the URL itself is exactly 11 characters, it might be just the ID
    if (url.length === 11) {
      return url;
    }

    return null;
  };

  const videoId = getYouTubeVideoId(videoUrl);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0` : null;

  const handleIframeError = () => {
    setError(true);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>{title}</h3>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        <div className={styles.videoContainer}>
          {error ? (
            <div className={styles.errorMessage}>
              <p>Sorry, this video is currently unavailable.</p>
              <p>Please try again later or contact support if the problem persists.</p>
            </div>
          ) : embedUrl ? (
            <iframe
              src={embedUrl}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onError={handleIframeError}
            />
          ) : (
            <div className={styles.errorMessage}>
              <p>Invalid video URL provided.</p>
              <p>Please check the URL and try again.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 