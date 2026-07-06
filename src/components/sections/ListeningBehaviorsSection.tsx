import { Headphones, MapPin } from "lucide-react";
import type { ListeningBehavior, Quote } from "../../types/analysis";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import SectionHeading from "../ui/SectionHeading";
import QuoteExcerpt from "../ui/QuoteExcerpt";
import styles from "./sections.module.css";

interface ListeningBehaviorsSectionProps {
  behaviors: ListeningBehavior[];
  quotesById: Map<string, Quote>;
}

export default function ListeningBehaviorsSection({
  behaviors,
  quotesById,
}: ListeningBehaviorsSectionProps) {
  return (
    <section className={styles.section} id="listening-behaviors">
      <SectionHeading
        icon={<Headphones size={20} />}
        title="Listening Behaviors"
        description="Contexts and habits describing how, when, and why people actually listen, inferred from review evidence."
        count={behaviors.length}
      />

      {behaviors.length === 0 ? (
        <p className={styles.emptyState}>No listening behaviors were found in this dataset.</p>
      ) : (
        <div className={styles.grid}>
          {behaviors.map((behavior) => {
            const firstQuoteId = behavior.quoteIds?.[0];
            return (
              <Card key={behavior.id}>
                <h3 className={styles.cardTitle}>{behavior.title}</h3>
                {behavior.context && <Badge tone="info">{behavior.context}</Badge>}
                <p className={styles.description}>{behavior.description}</p>
                {behavior.evidence && (
                  <div className={styles.metaRow}>
                    <MapPin size={13} />
                    <span>{behavior.evidence}</span>
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
