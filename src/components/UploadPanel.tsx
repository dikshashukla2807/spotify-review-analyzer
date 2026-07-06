import { useCallback, useRef, useState } from "react";
import type { ChangeEvent, DragEvent } from "react";
import { FileJson, Sparkles, UploadCloud, X, Zap } from "lucide-react";
import styles from "./UploadPanel.module.css";

interface UploadPanelProps {
  fileName: string | null;
  fileSizeLabel: string | null;
  errorMessage: string | null;
  isBusy: boolean;
  onFileSelected: (file: File) => void;
  onClearFile: () => void;
  onAnalyze: () => void;
  onLoadSample: () => void;
}

export default function UploadPanel({
  fileName,
  fileSizeLabel,
  errorMessage,
  isBusy,
  onFileSelected,
  onClearFile,
  onAnalyze,
  onLoadSample,
}: UploadPanelProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleBrowseClick = () => {
    if (isBusy) return;
    inputRef.current?.click();
  };

  const handleFiles = useCallback(
    (fileList: FileList | null) => {
      if (!fileList || fileList.length === 0) return;
      const file = fileList[0];
      if (!file.name.toLowerCase().endsWith(".json") && file.type !== "application/json") {
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected],
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleFiles(event.target.files);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (isBusy) return;
    handleFiles(event.dataTransfer.files);
  };

  return (
    <section className={styles.panel} aria-label="Upload review data">
      <div
        className={`${styles.dropzone} ${isDragging ? styles.dragging : ""} ${
          fileName ? styles.hasFile : ""
        }`}
        onClick={fileName ? undefined : handleBrowseClick}
        onDragOver={(event) => {
          event.preventDefault();
          if (!isBusy) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if ((event.key === "Enter" || event.key === " ") && !fileName) {
            handleBrowseClick();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".json,application/json"
          className={styles.hiddenInput}
          onChange={handleInputChange}
          disabled={isBusy}
        />

        {!fileName ? (
          <div className={styles.dropzoneEmpty}>
            <div className={styles.uploadIcon}>
              <UploadCloud size={28} />
            </div>
            <p className={styles.dropzoneTitle}>Drag & drop your review JSON file here</p>
            <p className={styles.dropzoneHint}>or click to browse &middot; .json files only</p>
          </div>
        ) : (
          <div className={styles.fileRow}>
            <div className={styles.fileInfo}>
              <div className={styles.fileIcon}>
                <FileJson size={20} />
              </div>
              <div className={styles.fileMeta}>
                <span className={styles.fileName}>{fileName}</span>
                {fileSizeLabel && <span className={styles.fileSize}>{fileSizeLabel}</span>}
              </div>
            </div>
            <button
              type="button"
              className={styles.removeButton}
              onClick={(event) => {
                event.stopPropagation();
                onClearFile();
              }}
              disabled={isBusy}
              aria-label="Remove selected file"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={onAnalyze}
          disabled={!fileName || isBusy}
        >
          <Zap size={16} />
          Analyze Reviews
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onLoadSample}
          disabled={isBusy}
        >
          <Sparkles size={15} />
          Try sample data
        </button>
      </div>
    </section>
  );
}
