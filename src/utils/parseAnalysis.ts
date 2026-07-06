import type { AnalysisReport } from "../types/analysis";
import { ANALYSIS_SECTION_KEYS } from "../types/analysis";

export type ParseOutcome =
  | { kind: "valid"; report: AnalysisReport }
  | { kind: "raw-reviews"; reviewCount: number }
  | { kind: "unrecognized" }
  | { kind: "invalid-json"; message: string };

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Detects a raw scraper export (e.g. data/raw/spotify_reviews.json), which
 * contains review text but has not been analyzed yet. This app never calls
 * an AI model itself, so raw exports fall back to the bundled demo insights.
 */
function looksLikeRawReviewExport(value: Record<string, unknown>): number | null {
  const candidateArray = value.reviews ?? value.items;
  if (!Array.isArray(candidateArray) || candidateArray.length === 0) return null;

  const sample = candidateArray[0];
  if (!isPlainObject(sample)) return null;

  const hasReviewShape =
    "content" in sample || "text" in sample || "body" in sample || "score" in sample;

  return hasReviewShape ? candidateArray.length : null;
}

function countRecognizedSections(value: Record<string, unknown>): number {
  return ANALYSIS_SECTION_KEYS.reduce((count, key) => {
    const section = value[key];
    return Array.isArray(section) && section.length > 0 ? count + 1 : count;
  }, 0);
}

function coerceArray<T>(value: unknown): T[] {
  return Array.isArray(value) ? (value as T[]) : [];
}

function normalizeReport(value: Record<string, unknown>): AnalysisReport {
  const metadata = isPlainObject(value.metadata) ? value.metadata : {};
  return {
    metadata,
    painPoints: coerceArray(value.painPoints),
    userSegments: coerceArray(value.userSegments),
    listeningBehaviors: coerceArray(value.listeningBehaviors),
    recommendationProblems: coerceArray(value.recommendationProblems),
    opportunityAreas: coerceArray(value.opportunityAreas),
    representativeQuotes: coerceArray(value.representativeQuotes),
  };
}

/**
 * Parses raw file text and decides how the app should react:
 *  - a valid structured analysis report -> render it directly
 *  - a raw, unanalyzed review export -> fall back to bundled demo insights
 *  - anything else recognizable as JSON -> fall back to bundled demo insights
 *  - invalid JSON -> surface a clear error to the user
 */
export function parseAnalysisFile(rawText: string): ParseOutcome {
  let parsed: unknown;
  try {
    parsed = JSON.parse(rawText);
  } catch (error) {
    return {
      kind: "invalid-json",
      message: error instanceof Error ? error.message : "Could not parse this file as JSON.",
    };
  }

  if (!isPlainObject(parsed)) {
    return { kind: "unrecognized" };
  }

  const rawReviewCount = looksLikeRawReviewExport(parsed);
  if (rawReviewCount !== null && countRecognizedSections(parsed) === 0) {
    return { kind: "raw-reviews", reviewCount: rawReviewCount };
  }

  if (countRecognizedSections(parsed) >= 1) {
    return { kind: "valid", report: normalizeReport(parsed) };
  }

  return { kind: "unrecognized" };
}
