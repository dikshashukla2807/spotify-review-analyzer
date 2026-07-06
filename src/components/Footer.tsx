import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p>
          Spotify Review Analyzer is a demonstration built for a graduate Product Management
          project. It is not affiliated with or endorsed by Spotify.
        </p>
      </div>
    </footer>
  );
}
