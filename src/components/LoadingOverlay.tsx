import { useEffect, useState } from "react";
import styles from "./LoadingOverlay.module.css";

const STATUS_MESSAGES = [
  "Reading review data...",
  "Detecting pain points...",
  "Segmenting user cohorts...",
  "Mapping listening behaviors...",
  "Auditing recommendation quality...",
  "Surfacing opportunity areas...",
  "Selecting representative quotes...",
];

export default function LoadingOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % STATUS_MESSAGES.length);
    }, 650);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.wrapper} role="status" aria-live="polite">
      <div className={styles.equalizer} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <span key={index} className={styles.bar} style={{ animationDelay: `${index * 0.12}s` }} />
        ))}
      </div>
      <p className={styles.title}>Analyzing reviews</p>
      <p className={styles.message}>{STATUS_MESSAGES[messageIndex]}</p>
    </div>
  );
}
