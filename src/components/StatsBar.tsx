import { Calendar, Database, Layers, Lightbulb } from "lucide-react";
import type { AnalysisReport } from "../types/analysis";
import styles from "./StatsBar.module.css";

interface StatsBarProps {
  report: AnalysisReport;
}

function formatDate(value?: string | null): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

export default function StatsBar({ report }: StatsBarProps) {
  const { metadata } = report;

  const stats = [
    {
      icon: <Database size={18} />,
      label: "Reviews analyzed",
      value: metadata.datasetSize ? metadata.datasetSize.toLocaleString() : "—",
    },
    {
      icon: <Layers size={18} />,
      label: "Sources",
      value: metadata.sources?.length ? String(metadata.sources.length) : "—",
    },
    {
      icon: <Lightbulb size={18} />,
      label: "Opportunity areas",
      value: String(report.opportunityAreas.length),
    },
    {
      icon: <Calendar size={18} />,
      label: "Date range",
      value:
        metadata.dateRange?.earliest || metadata.dateRange?.latest
          ? `${formatDate(metadata.dateRange?.earliest)} – ${formatDate(metadata.dateRange?.latest)}`
          : "—",
    },
  ];

  return (
    <div className={styles.grid}>
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <div className={styles.iconWrap}>{stat.icon}</div>
          <div>
            <p className={styles.value}>{stat.value}</p>
            <p className={styles.label}>{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
