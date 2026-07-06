import { AlertTriangle, Users } from "lucide-react";
import type { PainPoint, Quote } from "../../types/analysis";
import Card from "../ui/Card";
import Badge, { toneForSeverity } from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import QuoteExcerpt from "../ui/QuoteExcerpt";
import styles from "./sections.module.css";

interface PainPointsSectionProps {
  painPoints: PainPoint[];
  quotesById: Map<string, Quote>;
}

export default function PainPointsSection({ painPoints, quotesById }: PainPointsSectionProps) {
  return (
    <section className={styles.section} id="pain-points">
      <SectionHeading
        icon={<AlertTriangle size={20} />}
        title="Pain Points"
        description="The most frequently repeated frustrations across reviews, ranked by severity and how often they appear."
        count={painPoints.length}
      />

      {painPoints.length === 0 ? (
        <p className={styles.emptyState}>No pain points were found in this dataset.</p>
      ) : (
        <div className={styles.grid}>
          {painPoints.map((point) => {
            const firstQuoteId = point.quoteIds?.[0];
            return (
              <Card key={point.id} accentLeft>
                <h3 className={styles.cardTitle}>{point.title}</h3>
                <div className={styles.badgeRow}>
                  <Badge tone={toneForSeverity(point.severity)}>Severity: {point.severity}</Badge>
                  <Badge tone="neutral">Frequency: {point.frequency}</Badge>
                </div>
                <p className={styles.description}>{point.description}</p>
                {point.affectedSegment && (
                  <div className={styles.metaRow}>
                    <Users size={13} />
                    <span>{point.affectedSegment}</span>
                  </div>
                )}
                {firstQuoteId && <QuoteExcerpt quote={quotesById.get(firstQuoteId)} />}
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
