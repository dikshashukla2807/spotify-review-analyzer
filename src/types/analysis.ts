/**
 * Shape of the structured insights JSON this app renders.
 *
 * This app never calls an AI model directly. Analysis is expected to have
 * been generated offline (e.g. via `analysis/analyze_reviews.py` in the
 * parent research project) and exported as JSON matching this schema.
 * If a file doesn't match, the app falls back to the bundled demo dataset.
 */

export type Severity = "Low" | "Medium" | "Medium-High" | "High" | "Very High";
export type Priority = "Low" | "Medium" | "High";
export type SegmentSize = "Small" | "Medium" | "Large";

export interface Quote {
  id: string;
  text: string;
  source?: string;
  rating?: number | null;
  tag?: string;
  author?: string;
}

export interface PainPoint {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  frequency: Severity;
  affectedSegment?: string;
  quoteIds?: string[];
}

export interface UserSegment {
  id: string;
  name: string;
  description: string;
  keySignal: string;
  size?: SegmentSize;
  riskLevel?: Priority;
  quoteIds?: string[];
}

export interface ListeningBehavior {
  id: string;
  title: string;
  description: string;
  context?: string;
  evidence?: string;
  quoteIds?: string[];
}

export interface RecommendationProblem {
  id: string;
  title: string;
  description: string;
  frequency: Severity;
  impact?: string;
  quoteIds?: string[];
}

export interface OpportunityArea {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  aiAngle?: string;
  quoteIds?: string[];
}

export interface ReportMetadata {
  appName?: string;
  generatedAt?: string;
  analysisDate?: string;
  datasetSize?: number;
  sources?: string[];
  model?: string;
  dateRange?: { earliest?: string | null; latest?: string | null };
  notes?: string;
}

export interface AnalysisReport {
  metadata: ReportMetadata;
  painPoints: PainPoint[];
  userSegments: UserSegment[];
  listeningBehaviors: ListeningBehavior[];
  recommendationProblems: RecommendationProblem[];
  opportunityAreas: OpportunityArea[];
  representativeQuotes: Quote[];
}

export const ANALYSIS_SECTION_KEYS = [
  "painPoints",
  "userSegments",
  "listeningBehaviors",
  "recommendationProblems",
  "opportunityAreas",
  "representativeQuotes",
] as const;
