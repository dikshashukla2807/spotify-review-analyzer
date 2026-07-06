import type { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  icon: ReactNode;
  title: string;
  description?: string;
  count?: number;
}

export default function SectionHeading({ icon, title, description, count }: SectionHeadingProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.iconBadge}>{icon}</div>
      <div className={styles.text}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>{title}</h2>
          {typeof count === "number" && <span className={styles.count}>{count}</span>}
        </div>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}
