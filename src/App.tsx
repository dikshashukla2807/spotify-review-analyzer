import Header from "./components/Header";
import Footer from "./components/Footer";
import UploadPanel from "./components/UploadPanel";
import LoadingOverlay from "./components/LoadingOverlay";
import ResultsView from "./components/ResultsView";
import { useAnalysisWorkflow } from "./hooks/useAnalysisWorkflow";
import styles from "./App.module.css";

export default function App() {
  const {
    status,
    fileName,
    fileSizeLabel,
    errorMessage,
    report,
    isDemoData,
    demoReason,
    selectFile,
    clearFile,
    analyze,
    loadSample,
    reset,
  } = useAnalysisWorkflow();

  const showUpload = status === "idle" || status === "ready" || status === "error";
  const showLoading = status === "loading";

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {showUpload && (
            <section className={styles.intro}>
              <h2 className={styles.introTitle}>Turn raw reviews into product insight</h2>
              <p className={styles.introSubtitle}>
                Upload a review analysis JSON file, or a raw review export, then click{" "}
                <strong>Analyze Reviews</strong> to see structured, evidence-backed insights across
                six product-relevant categories.
              </p>
              <UploadPanel
                fileName={fileName}
                fileSizeLabel={fileSizeLabel}
                errorMessage={errorMessage}
                isBusy={false}
                onFileSelected={selectFile}
                onClearFile={clearFile}
                onAnalyze={analyze}
                onLoadSample={loadSample}
              />
            </section>
          )}

          {showLoading && <LoadingOverlay />}

          {status === "success" && report && (
            <ResultsView
              report={report}
              isDemoData={isDemoData}
              demoReason={demoReason}
              onReset={reset}
            />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
