import { AudioLines, Sparkles } from "lucide-react";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <AudioLines size={22} strokeWidth={2.5} />
          </div>
          <div className={styles.brandText}>
            <h1 className={styles.title}>Spotify Review Analyzer</h1>
            <p className={styles.subtitle}>AI-powered review insights &middot; Graduate PM project demo</p>
          </div>
        </div>
        <div className={styles.demoBadge}>
          <Sparkles size={14} />
          <span>Demo mode</span>
        </div>
      </div>
    </header>
  );
}
