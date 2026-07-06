import type { ReactNode } from "react";
import styles from "./Badge.module.css";

export type BadgeTone = "neutral" | "accent" | "danger" | "warning" | "info";

interface BadgeProps {
  children: ReactNode;
  tone?: BadgeTone;
}

const SEVERITY_TONE: Record<string, BadgeTone> = {
  low: "neutral",
  medium: "info",
  "medium-high": "warning",
  high: "warning",
  "very high": "danger",
};

const PRIORITY_TONE: Record<string, BadgeTone> = {
  low: "neutral",
  medium: "info",
  high: "accent",
};

export function toneForSeverity(value?: string): BadgeTone {
  if (!value) return "neutral";
  return SEVERITY_TONE[value.toLowerCase()] ?? "neutral";
}

export function toneForPriority(value?: string): BadgeTone {
  if (!value) return "neutral";
  return PRIORITY_TONE[value.toLowerCase()] ?? "neutral";
}

export default function Badge({ children, tone = "neutral" }: BadgeProps) {
  return <span className={`${styles.badge} ${styles[tone]}`}>{children}</span>;
}
