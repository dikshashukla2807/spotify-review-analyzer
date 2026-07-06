import { Lightbulb, Sparkles } from "lucide-react";
import type { OpportunityArea, Quote } from "../../types/analysis";
import Card from "../ui/Card";
import Badge, { toneForPriority } from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import QuoteExcerpt from "../ui/QuoteExcerpt";
import styles from "./sections.module.css";

interface OpportunityAreasSectionProps {
  opportunities: OpportunityArea[];
  quotesById: Map<string, Quote>;
}

export default function OpportunityAreasSection({
  opportunities,
  quotesById,
}: OpportunityAreasSectionProps) {
  return (
    <section className={styles.section} id="opportunity-areas">
      <SectionHeading
        icon={<Lightbulb size={20} />}
        title="Opportunity Areas"
        description="Prioritized product directions that respond directly to the pain points and problems above."
        count={opportunities.length}
      />

      {opportunities.length === 0 ? (
        <p className={styles.emptyState}>No opportunity areas were found in this dataset.</p>
      ) : (
        <div className={styles.grid}>
          {opportunities.map((opportunity) => {
            const firstQuoteId = opportunity.quoteIds?.[0];
            return (
              <Card key={opportunity.id} accentLeft>
                <h3 className={styles.cardTitle}>{opportunity.title}</h3>
                <div className={styles.badgeRow}>
                  <Badge tone={toneForPriority(opportunity.priority)}>
                    {opportunity.priority} priority
                  </Badge>
                </div>
                <p className={styles.description}>{opportunity.description}</p>
                {opportunity.aiAngle && (
                  <div className={styles.aiAngle}>
                    <Sparkles size={14} />
                    <span>{opportunity.aiAngle}</span>
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
