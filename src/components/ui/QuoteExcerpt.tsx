import { Quote as QuoteIcon } from "lucide-react";
import type { Quote } from "../../types/analysis";
import styles from "./QuoteExcerpt.module.css";

interface QuoteExcerptProps {
  quote?: Quote;
}

export default function QuoteExcerpt({ quote }: QuoteExcerptProps) {
  if (!quote) return null;

  return (
    <blockquote className={styles.excerpt}>
      <QuoteIcon size={14} className={styles.icon} aria-hidden="true" />
      <span>{quote.text}</span>
      {quote.source && <cite className={styles.source}>{quote.source}</cite>}
    </blockquote>
  );
}
