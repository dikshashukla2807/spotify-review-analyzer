import { useMemo, useState } from "react";
import { MessageSquareQuote, Quote as QuoteIcon, Star } from "lucide-react";
import type { Quote } from "../../types/analysis";
import Card from "../ui/Card";
import SectionHeading from "../ui/SectionHeading";
import sectionStyles from "./sections.module.css";
import styles from "./QuotesSection.module.css";

interface QuotesSectionProps {
  quotes: Quote[];
}

export default function QuotesSection({ quotes }: QuotesSectionProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = useMemo(() => {
    const unique = new Set<string>();
    quotes.forEach((quote) => {
      if (quote.tag) unique.add(quote.tag);
    });
    return Array.from(unique).sort();
  }, [quotes]);

  const visibleQuotes = activeTag ? quotes.filter((quote) => quote.tag === activeTag) : quotes;

  return (
    <section className={sectionStyles.section} id="representative-quotes">
      <SectionHeading
        icon={<MessageSquareQuote size={20} />}
        title="Representative Quotes"
        description="Direct excerpts from real reviews that ground each insight above in the user's own words."
        count={quotes.length}
      />

      {tags.length > 0 && (
        <div className={styles.filterRow}>
          <button
            type="button"
            className={`${styles.filterChip} ${activeTag === null ? styles.filterChipActive : ""}`}
            onClick={() => setActiveTag(null)}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={`${styles.filterChip} ${activeTag === tag ? styles.filterChipActive : ""}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {visibleQuotes.length === 0 ? (
        <p className={sectionStyles.emptyState}>No representative quotes were found in this dataset.</p>
      ) : (
        <div className={sectionStyles.grid}>
          {visibleQuotes.map((quote) => (
            <Card key={quote.id} className={styles.quoteCard}>
              <QuoteIcon size={20} className={styles.bigQuoteIcon} aria-hidden="true" />
              <p className={styles.quoteText}>{quote.text}</p>
              <div className={styles.quoteFooter}>
                <div className={styles.quoteSource}>
                  {quote.source && <span>{quote.source}</span>}
                  {typeof quote.rating === "number" && (
                    <span className={styles.rating}>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={index}
                          size={12}
                          fill={index < quote.rating! ? "currentColor" : "none"}
                        />
                      ))}
                    </span>
                  )}
                </div>
                {quote.tag && <span className={styles.quoteTag}>{quote.tag}</span>}
              </div>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
