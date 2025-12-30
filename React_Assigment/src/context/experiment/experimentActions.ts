import type { Dispatch } from "react";
import type {
  ExperimentAction,
  ExperimentState,
  ButtonClick,
  CompletedExperiment,
} from "../../types/experiment.types";
import { getUTCTimestamp } from "../../utils/timestamp";
import { StorageService } from "../../services/storage.service";

/**
 * Creates all action functions for the experiment context
 * These are memoized in the provider to prevent unnecessary re-renders
 */
export function createExperimentActions(
  dispatch: Dispatch<ExperimentAction>,
  state: ExperimentState
) {
  return {
    // ----------------------------------------
    // Page Navigation Actions
    // ----------------------------------------
    startExperiment: () => {
      dispatch({ type: "START_EXPERIMENT" });
    },

    goToPage2: () => {
      dispatch({ type: "SET_STAGE", payload: "page2" });
    },

    goToPage3: () => {
      dispatch({ type: "SET_STAGE", payload: "page3" });
    },

    resetExperiment: () => {
      dispatch({ type: "RESET_EXPERIMENT" });
    },

    // ----------------------------------------
    // Page 1 Actions
    // ----------------------------------------
    recordPage1FirstClick: () => {
      dispatch({
        type: "RECORD_PAGE1_FIRST_CLICK",
        payload: getUTCTimestamp(),
      });
    },

    recordLikertClick: (value: string) => {
      const timestamp = getUTCTimestamp();
      const click: ButtonClick = { value, timestamp, type: "likert" };
      dispatch({ type: "RECORD_PAGE1_BUTTON_CLICK", payload: click });
      dispatch({ type: "SET_LIKERT_VALUE", payload: value });
    },

    recordWordClick: (word: string) => {
      const timestamp = getUTCTimestamp();
      const click: ButtonClick = { value: word, timestamp, type: "word" };
      dispatch({ type: "RECORD_PAGE1_BUTTON_CLICK", payload: click });
      dispatch({ type: "SET_SELECTED_WORD", payload: word });
    },

    recordPage1Submit: () => {
      const timestamp = getUTCTimestamp();
      const click: ButtonClick = { value: "submit", timestamp, type: "submit" };
      dispatch({ type: "RECORD_PAGE1_BUTTON_CLICK", payload: click });
    },

    // ----------------------------------------
    // Page 2 Actions
    // ----------------------------------------
    recordPage2FirstClick: () => {
      dispatch({
        type: "RECORD_PAGE2_FIRST_CLICK",
        payload: getUTCTimestamp(),
      });
    },

    recordBucketClick: () => {
      const timestamp = getUTCTimestamp();
      dispatch({ type: "RECORD_BUCKET_CLICK", payload: timestamp });
    },

    recordPage2Submit: () => {
      const { bucketClicks } = state.data.page2;

      // Calculate fill duration
      if (bucketClicks.length >= 2) {
        const firstClick = new Date(bucketClicks[0]).getTime();
        const lastClick = new Date(
          bucketClicks[bucketClicks.length - 1]
        ).getTime();
        const duration = lastClick - firstClick;
        dispatch({ type: "SET_FILL_DURATION", payload: duration });
      }

      dispatch({ type: "RECORD_PAGE2_SUBMIT", payload: getUTCTimestamp() });
    },

    // ----------------------------------------
    // Completion Actions
    // ----------------------------------------
    completeAndSaveExperiment: (): boolean => {
      dispatch({ type: "COMPLETE_EXPERIMENT" });

      // Create completed experiment object
      const completedExperiment: CompletedExperiment = {
        ...state.data,
        completedAt: getUTCTimestamp(),
      };

      // Save to localStorage
      return StorageService.saveExperiment(completedExperiment);
    },

    // ----------------------------------------
    // Validation
    // ----------------------------------------
    canProceedFromPage1: (): boolean => {
      const { selectedLikertValue, selectedWord } = state.data.page1;
      return selectedLikertValue !== null && selectedWord !== null;
    },

    canProceedFromPage2: (): boolean => {
      const { bucketClicks } = state.data.page2;
      return bucketClicks.length >= 10;
    },
  };
}

/**
 * Type for the actions object returned by createExperimentActions
 */
export type ExperimentActions = ReturnType<typeof createExperimentActions>;
