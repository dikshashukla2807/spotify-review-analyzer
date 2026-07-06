import { useCallback, useRef, useState } from "react";
import type { AnalysisReport } from "../types/analysis";
import sampleAnalysis from "../data/sampleAnalysis.json";
import { parseAnalysisFile } from "../utils/parseAnalysis";

export type WorkflowStatus = "idle" | "ready" | "loading" | "success" | "error";

const MIN_LOADING_MS = 1600;
const SAMPLE_REPORT = sampleAnalysis as unknown as AnalysisReport;

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(reader.error ?? new Error("Failed to read file."));
    reader.readAsText(file);
  });
}

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function useAnalysisWorkflow() {
  const [status, setStatus] = useState<WorkflowStatus>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [report, setReport] = useState<AnalysisReport | null>(null);
  const [isDemoData, setIsDemoData] = useState(false);
  const [demoReason, setDemoReason] = useState<string | null>(null);

  const requestIdRef = useRef(0);

  const selectFile = useCallback((selected: File) => {
    setFile(selected);
    setErrorMessage(null);
    setStatus("ready");
  }, []);

  const clearFile = useCallback(() => {
    setFile(null);
    setErrorMessage(null);
    setStatus("idle");
  }, []);

  const reset = useCallback(() => {
    requestIdRef.current += 1;
    setFile(null);
    setErrorMessage(null);
    setReport(null);
    setIsDemoData(false);
    setDemoReason(null);
    setStatus("idle");
  }, []);

  const analyze = useCallback(async () => {
    if (!file) return;
    const requestId = ++requestIdRef.current;

    setStatus("loading");
    setErrorMessage(null);

    const startedAt = Date.now();

    try {
      const text = await readFileAsText(file);
      const outcome = parseAnalysisFile(text);
      const elapsed = Date.now() - startedAt;
      if (elapsed < MIN_LOADING_MS) {
        await wait(MIN_LOADING_MS - elapsed);
      }

      if (requestId !== requestIdRef.current) return;

      if (outcome.kind === "invalid-json") {
        setStatus("error");
        setErrorMessage(`This file isn't valid JSON: ${outcome.message}`);
        return;
      }

      if (outcome.kind === "valid") {
        setReport(outcome.report);
        setIsDemoData(false);
        setDemoReason(null);
        setStatus("success");
        return;
      }

      if (outcome.kind === "raw-reviews") {
        setReport(SAMPLE_REPORT);
        setIsDemoData(true);
        setDemoReason(
          `"${file.name}" looks like a raw, unanalyzed review export (${outcome.reviewCount.toLocaleString()} reviews). This demo doesn't call OpenAI live, so it's showing a bundled pre-generated analysis instead.`,
        );
        setStatus("success");
        return;
      }

      setReport(SAMPLE_REPORT);
      setIsDemoData(true);
      setDemoReason(
        `"${file.name}" didn't match the expected insights structure, so we're showing the bundled demo analysis instead.`,
      );
      setStatus("success");
    } catch (error) {
      if (requestId !== requestIdRef.current) return;
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong reading this file.");
    }
  }, [file]);

  const loadSample = useCallback(async () => {
    const requestId = ++requestIdRef.current;
    setStatus("loading");
    setErrorMessage(null);
    await wait(MIN_LOADING_MS);
    if (requestId !== requestIdRef.current) return;
    setReport(SAMPLE_REPORT);
    setIsDemoData(false);
    setDemoReason(null);
    setStatus("success");
  }, []);

  return {
    status,
    file,
    fileName: file?.name ?? null,
    fileSizeLabel: file ? formatFileSize(file.size) : null,
    errorMessage,
    report,
    isDemoData,
    demoReason,
    selectFile,
    clearFile,
    analyze,
    loadSample,
    reset,
  };
}
