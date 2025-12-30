import type {
  ExperimentState,
  ExperimentData,
} from "../../types/experiment.types";
import { getUTCTimestamp, generateExperimentId } from "../../utils/timestamp";

/**
 * Creates a fresh ExperimentData object
 * Used when starting a new experiment
 */
export const createInitialData = (): ExperimentData => ({
  id: generateExperimentId(),
  startedAt: getUTCTimestamp(),
  completedAt: null,
  page1: {
    firstClickTimestamp: null,
    clicks: [],
    selectedLikertValue: null,
    selectedWord: null,
  },
  page2: {
    firstClickTimestamp: null,
    bucketClicks: [],
    fillDurationMs: null,
    submitTimestamp: null,
  },
});

/**
 * Initial state for the experiment context
 */
export const initialState: ExperimentState = {
  stage: "not_started",
  data: createInitialData(),
};
