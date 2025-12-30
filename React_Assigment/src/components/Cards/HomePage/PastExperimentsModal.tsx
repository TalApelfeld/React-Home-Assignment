import { useState, useEffect } from "react";
import { StorageService } from "../../../services/storage.service";
import { formatDuration } from "../../../utils/timestamp";
import type { CompletedExperiment } from "../../../types/experiment.types";
import { ButtonClick } from "../../../styles/styles";

interface PastExperimentsModalProps {
  onClose: () => void;
}

export default function PastExperimentsModal({
  onClose,
}: PastExperimentsModalProps) {
  const [experiments, setExperiments] = useState<CompletedExperiment[]>([]);
  const [selectedExperiment, setSelectedExperiment] =
    useState<CompletedExperiment | null>(null);

  useEffect(() => {
    const data = StorageService.getExperiments();
    setExperiments(data);
  }, []);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-h1-xxsm text-text-Primary">Past Experiments</h2>
          <button
            onClick={onClose}
            className={`p-2 hover:bg-neutral-100 rounded-lg ${ButtonClick}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[60vh]">
          {experiments.length === 0 ? (
            <div className="text-center py-12 text-text-Secondary">
              <p className="text-h2-lg">No experiments completed yet</p>
              <p className="text-h2-sm mt-2">
                Complete an experiment to see your results here
              </p>
            </div>
          ) : selectedExperiment ? (
            // Detailed view of selected experiment
            <div>
              <button
                onClick={() => setSelectedExperiment(null)}
                className={`flex items-center gap-2 text-primary-Action-500 mb-4 ${ButtonClick}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Back to list
              </button>

              <h3 className="text-h2-lg font-semibold mb-4">
                Experiment Details
              </h3>

              {/* Page 1 Data */}
              <div className="mb-6 p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-h2-md font-semibold mb-2">
                  Page 1 - User Response
                </h4>
                <p className="text-h2-sm text-text-Secondary">
                  First Click:{" "}
                  {selectedExperiment.page1.firstClickTimestamp
                    ? selectedExperiment.page1.firstClickTimestamp
                    : "N/A"}
                </p>
                <p className="text-h2-sm text-text-Secondary">
                  Likert Value: {selectedExperiment.page1.selectedLikertValue}
                </p>
                <p className="text-h2-sm text-text-Secondary">
                  Selected Word: {selectedExperiment.page1.selectedWord}
                </p>

                {selectedExperiment.page1.clicks.length > 0 && (
                  <div className="mt-3">
                    <p className="text-h2-sm font-medium">Button Clicks:</p>
                    <ul className="text-h2-sm text-text-Secondary ml-4">
                      {selectedExperiment.page1.clicks.map((click, idx) => (
                        <li key={idx}>
                          [{click.type}] {click.value} - {click.timestamp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Page 2 Data */}
              <div className="p-4 bg-neutral-50 rounded-lg">
                <h4 className="text-h2-md font-semibold mb-2">
                  Page 2 - Bucket Counter
                </h4>
                <p className="text-h2-sm text-text-Secondary">
                  First Click:{" "}
                  {selectedExperiment.page2.firstClickTimestamp
                    ? selectedExperiment.page2.firstClickTimestamp
                    : "N/A"}
                </p>
                <p className="text-h2-sm text-text-Secondary">
                  Fill Duration:{" "}
                  {selectedExperiment.page2.fillDurationMs
                    ? formatDuration(selectedExperiment.page2.fillDurationMs)
                    : "N/A"}
                </p>
                <p className="text-h2-sm text-text-Secondary">
                  Submit Time:{" "}
                  {selectedExperiment.page2.submitTimestamp
                    ? selectedExperiment.page2.submitTimestamp
                    : "N/A"}
                </p>
                <p className="text-h2-sm text-text-Secondary">
                  Total Bucket Clicks:{" "}
                  {selectedExperiment.page2.bucketClicks.length}
                </p>
              </div>
            </div>
          ) : (
            // List view of all experiments
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 text-h2-sm font-semibold">#</th>
                  <th className="text-left pb-3 text-h2-sm font-semibold">
                    Completed At
                  </th>
                  <th className="text-left pb-3 text-h2-sm font-semibold">
                    Likert
                  </th>
                  <th className="text-left pb-3 text-h2-sm font-semibold">
                    Word
                  </th>
                  <th className="text-left pb-3 text-h2-sm font-semibold">
                    Bucket Duration
                  </th>
                  <th className="text-left pb-3 text-h2-sm font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {experiments.map((exp, idx) => (
                  <tr key={exp.id} className="hover:bg-neutral-50">
                    <td className="py-3 text-h2-sm">{idx + 1}</td>
                    <td className="py-3 text-h2-sm">{exp.completedAt}</td>
                    <td className="py-3 text-h2-sm">
                      {exp.page1.selectedLikertValue}
                    </td>
                    <td className="py-3 text-h2-sm">
                      {exp.page1.selectedWord}
                    </td>
                    <td className="py-3 text-h2-sm">
                      {exp.page2.fillDurationMs
                        ? formatDuration(exp.page2.fillDurationMs)
                        : "N/A"}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => setSelectedExperiment(exp)}
                        className={`text-primary-Action-500 hover:text-primary-Action-600 text-h2-sm ${ButtonClick}`}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
