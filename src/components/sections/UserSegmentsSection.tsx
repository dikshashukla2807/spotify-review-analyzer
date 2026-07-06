import { Radar, Users } from "lucide-react";
import type { Quote, UserSegment } from "../../types/analysis";
import Card from "../ui/Card";
import Badge, { toneForPriority } from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import QuoteExcerpt from "../ui/QuoteExcerpt";
import styles from "./sections.module.css";

interface UserSegmentsSectionProps {
  segments: UserSegment[];
  quotesById: Map<string, Quote>;
}

export default function UserSegmentsSection({ segments, quotesById }: UserSegmentsSectionProps) {
  return (
    <section className={styles.section} id="user-segments">
      <SectionHeading
        icon={<Users size={20} />}
        title="User Segments"
        description="Distinct groups of users identified from language patterns, behavior, and stated needs in the reviews."
        count={segments.length}
      />

      {segments.length === 0 ? (
        <p className={styles.emptyState}>No user segments were found in this dataset.</p>
      ) : (
        <div className={styles.grid}>
          {segments.map((segment) => {
            const firstQuoteId = segment.quoteIds?.[0];
            return (
              <Card key={segment.id}>
                <h3 className={styles.cardTitle}>{segment.name}</h3>
                <div className={styles.badgeRow}>
                  {segment.size && <Badge tone="neutral">{segment.size} segment</Badge>}
                  {segment.riskLevel && (
                    <Badge tone={toneForPriority(segment.riskLevel)}>{segment.riskLevel} risk</Badge>
                  )}
                </div>
                <p className={styles.description}>{segment.description}</p>
                <div className={styles.metaRow}>
                  <Radar size={13} />
                  <span>{segment.keySignal}</span>
                </div>
                {firstQuoteId && <QuoteExcerpt quote={quotesById.get(firstQuoteId)} />}
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
