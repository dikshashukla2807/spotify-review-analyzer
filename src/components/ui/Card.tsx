import type { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  className?: string;
  accentLeft?: boolean;
}

export default function Card({ children, className = "", accentLeft = false }: CardProps) {
  const classes = [styles.card, accentLeft ? styles.accentLeft : "", className]
    .filter(Boolean)
    .join(" ");
  return <div className={classes}>{children}</div>;
}
