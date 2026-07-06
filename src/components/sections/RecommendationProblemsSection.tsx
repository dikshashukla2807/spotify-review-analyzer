import { Compass, TrendingDown } from "lucide-react";
import type { Quote, RecommendationProblem } from "../../types/analysis";
import Card from "../ui/Card";
import Badge, { toneForSeverity } from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import QuoteExcerpt from "../ui/QuoteExcerpt";
import styles from "./sections.module.css";

interface RecommendationProblemsSectionProps {
  problems: RecommendationProblem[];
  quotesById: Map<string, Quote>;
}

export default function RecommendationProblemsSection({
  problems,
  quotesById,
}: RecommendationProblemsSectionProps) {
  return (
    <section className={styles.section} id="recommendation-problems">
      <SectionHeading
        icon={<Compass size={20} />}
        title="Recommendation Problems"
        description="Specific breakdowns in Spotify's discovery and personalization systems, as described by users."
        count={problems.length}
      />

      {problems.length === 0 ? (
        <p className={styles.emptyState}>No recommendation problems were found in this dataset.</p>
      ) : (
        <div className={styles.grid}>
          {problems.map((problem) => {
            const firstQuoteId = problem.quoteIds?.[0];
            return (
              <Card key={problem.id}>
                <h3 className={styles.cardTitle}>{problem.title}</h3>
                <div className={styles.badgeRow}>
                  <Badge tone={toneForSeverity(problem.frequency)}>
                    Frequency: {problem.frequency}
                  </Badge>
                </div>
                <p className={styles.description}>{problem.description}</p>
                {problem.impact && (
                  <div className={styles.metaRow}>
                    <TrendingDown size={13} />
                    <span>{problem.impact}</span>
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
