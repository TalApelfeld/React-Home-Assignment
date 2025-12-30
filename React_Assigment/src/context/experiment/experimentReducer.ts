import type {
  ExperimentState,
  ExperimentAction,
} from "../../types/experiment.types";
import { getUTCTimestamp } from "../../utils/timestamp";
import { createInitialData, initialState } from "./experimentInitialState";

export function experimentReducer(
  state: ExperimentState,
  action: ExperimentAction
): ExperimentState {
  switch (action.type) {
    // ----------------------------------------
    // Experiment Flow Actions
    // ----------------------------------------
    case "START_EXPERIMENT":
      return {
        stage: "page1",
        data: createInitialData(),
      };

    case "SET_STAGE":
      return {
        ...state,
        stage: action.payload,
      };

    case "COMPLETE_EXPERIMENT":
      return {
        ...state,
        stage: "completed",
        data: {
          ...state.data,
          completedAt: getUTCTimestamp(),
        },
      };

    case "RESET_EXPERIMENT":
      return initialState;

    // ----------------------------------------
    // Page 1 Actions
    // ----------------------------------------
    case "RECORD_PAGE1_FIRST_CLICK":
      // Only record if not already recorded
      if (state.data.page1.firstClickTimestamp !== null) {
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          page1: {
            ...state.data.page1,
            firstClickTimestamp: action.payload,
          },
        },
      };

    case "RECORD_PAGE1_BUTTON_CLICK":
      return {
        ...state,
        data: {
          ...state.data,
          page1: {
            ...state.data.page1,
            clicks: [...state.data.page1.clicks, action.payload],
          },
        },
      };

    case "SET_LIKERT_VALUE":
      return {
        ...state,
        data: {
          ...state.data,
          page1: {
            ...state.data.page1,
            selectedLikertValue: action.payload,
          },
        },
      };

    case "SET_SELECTED_WORD":
      return {
        ...state,
        data: {
          ...state.data,
          page1: {
            ...state.data.page1,
            selectedWord: action.payload,
          },
        },
      };

    // ----------------------------------------
    // Page 2 Actions
    // ----------------------------------------
    case "RECORD_PAGE2_FIRST_CLICK":
      // Only record if not already recorded
      if (state.data.page2.firstClickTimestamp !== null) {
        return state;
      }
      return {
        ...state,
        data: {
          ...state.data,
          page2: {
            ...state.data.page2,
            firstClickTimestamp: action.payload,
          },
        },
      };

    case "RECORD_BUCKET_CLICK":
      return {
        ...state,
        data: {
          ...state.data,
          page2: {
            ...state.data.page2,
            bucketClicks: [...state.data.page2.bucketClicks, action.payload],
          },
        },
      };

    case "SET_FILL_DURATION":
      return {
        ...state,
        data: {
          ...state.data,
          page2: {
            ...state.data.page2,
            fillDurationMs: action.payload,
          },
        },
      };

    case "RECORD_PAGE2_SUBMIT":
      return {
        ...state,
        data: {
          ...state.data,
          page2: {
            ...state.data.page2,
            submitTimestamp: action.payload,
          },
        },
      };

    // ----------------------------------------
    // Default
    // ----------------------------------------
    default:
      return state;
  }
}
