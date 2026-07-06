import type { ReactNode } from "react";
import { AlertCircle, Info } from "lucide-react";
import styles from "./InfoBanner.module.css";

interface InfoBannerProps {
  tone?: "info" | "warning";
  children: ReactNode;
}

export default function InfoBanner({ tone = "info", children }: InfoBannerProps) {
  return (
    <div className={`${styles.banner} ${styles[tone]}`}>
      {tone === "warning" ? <AlertCircle size={18} /> : <Info size={18} />}
      <p>{children}</p>
    </div>
  );
}
