import { useMemo } from "react";
import { RefreshCw } from "lucide-react";
import type { AnalysisReport, Quote } from "../types/analysis";
import StatsBar from "./StatsBar";
import InfoBanner from "./ui/InfoBanner";
import PainPointsSection from "./sections/PainPointsSection";
import UserSegmentsSection from "./sections/UserSegmentsSection";
import ListeningBehaviorsSection from "./sections/ListeningBehaviorsSection";
import RecommendationProblemsSection from "./sections/RecommendationProblemsSection";
import OpportunityAreasSection from "./sections/OpportunityAreasSection";
import QuotesSection from "./sections/QuotesSection";
import styles from "./ResultsView.module.css";

interface ResultsViewProps {
  report: AnalysisReport;
  isDemoData: boolean;
  demoReason: string | null;
  onReset: () => void;
}

const NAV_LINKS = [
  { href: "#pain-points", label: "Pain Points" },
  { href: "#user-segments", label: "User Segments" },
  { href: "#listening-behaviors", label: "Listening Behaviors" },
  { href: "#recommendation-problems", label: "Recommendation Problems" },
  { href: "#opportunity-areas", label: "Opportunity Areas" },
  { href: "#representative-quotes", label: "Quotes" },
];

export default function ResultsView({ report, isDemoData, demoReason, onReset }: ResultsViewProps) {
  const quotesById = useMemo(() => {
    const map = new Map<string, Quote>();
    report.representativeQuotes.forEach((quote) => map.set(quote.id, quote));
    return map;
  }, [report.representativeQuotes]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.topRow}>
        <div>
          <h2 className={styles.heading}>Analysis Results</h2>
          {report.metadata.model && <p className={styles.modelNote}>{report.metadata.model}</p>}
        </div>
        <button type="button" className={styles.resetButton} onClick={onReset}>
          <RefreshCw size={15} />
          Analyze another file
        </button>
      </div>

      {isDemoData && (
        <InfoBanner tone="warning">
          {demoReason ??
            "This file didn't include structured insights, so we're showing the bundled demo analysis instead."}
        </InfoBanner>
      )}

      <StatsBar report={report} />

      {report.metadata.notes && <p className={styles.notes}>{report.metadata.notes}</p>}

      <nav className={styles.subNav} aria-label="Jump to section">
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} className={styles.navLink}>
            {link.label}
          </a>
        ))}
      </nav>

      <PainPointsSection painPoints={report.painPoints} quotesById={quotesById} />
      <UserSegmentsSection segments={report.userSegments} quotesById={quotesById} />
      <ListeningBehaviorsSection behaviors={report.listeningBehaviors} quotesById={quotesById} />
      <RecommendationProblemsSection
        problems={report.recommendationProblems}
        quotesById={quotesById}
      />
      <OpportunityAreasSection opportunities={report.opportunityAreas} quotesById={quotesById} />
      <QuotesSection quotes={report.representativeQuotes} />
    </div>
  );
}
