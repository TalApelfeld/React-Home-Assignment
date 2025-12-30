export interface ButtonClick {
  value: string;
  timestamp: string;
  type: "likert" | "word" | "submit";
}

export interface Page1Data {
  firstClickTimestamp: string | null;
  clicks: ButtonClick[];
  selectedLikertValue: string | null;
  selectedWord: string | null;
}

export interface Page2Data {
  firstClickTimestamp: string | null;
  bucketClicks: string[];
  fillDurationMs: number | null;
  submitTimestamp: string | null;
}

export interface ExperimentData {
  id: string;
  startedAt: string;
  completedAt: string | null;
  page1: Page1Data;
  page2: Page2Data;
}

export interface CompletedExperiment extends ExperimentData {
  completedAt: string; // Override to make non-null
}

// ============================================
// Experiment State Management
// ============================================

/**
 * Current stage of the experiment flow
 */
export type ExperimentStage =
  | "not_started"
  | "page1"
  | "page2"
  | "page3"
  | "completed";

/**
 * Full experiment context state
 */
export interface ExperimentState {
  stage: ExperimentStage;
  data: ExperimentData;
}

// ============================================
// Reducer Action Types
// ============================================

export type ExperimentAction =
  | { type: "START_EXPERIMENT" }
  | { type: "SET_STAGE"; payload: ExperimentStage }
  | { type: "RECORD_PAGE1_FIRST_CLICK"; payload: string }
  | { type: "RECORD_PAGE1_BUTTON_CLICK"; payload: ButtonClick }
  | { type: "SET_LIKERT_VALUE"; payload: string }
  | { type: "SET_SELECTED_WORD"; payload: string }
  | { type: "RECORD_PAGE2_FIRST_CLICK"; payload: string }
  | { type: "RECORD_BUCKET_CLICK"; payload: string }
  | { type: "SET_FILL_DURATION"; payload: number }
  | { type: "RECORD_PAGE2_SUBMIT"; payload: string }
  | { type: "COMPLETE_EXPERIMENT" }
  | { type: "RESET_EXPERIMENT" };
