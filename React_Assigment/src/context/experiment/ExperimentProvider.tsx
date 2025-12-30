import { useMemo, useReducer, useEffect, type ReactNode } from "react";
import { experimentReducer } from "./experimentReducer";
import { initialState } from "./experimentInitialState";
import { createExperimentActions } from "./experimentActions";
import {
  ExperimentContext,
  type ExperimentContextValue,
} from "./ExperimentContext";
import { StorageService } from "../../services/storage.service";

interface ExperimentProviderProps {
  children: ReactNode;
}

export default function ExperimentProvider({
  children,
}: ExperimentProviderProps) {
  // Initialize state from localStorage if available, otherwise use initialState
  const [state, dispatch] = useReducer(
    experimentReducer,
    initialState,
    (initial) => {
      const savedState = StorageService.getCurrentExperiment();
      return savedState || initial;
    }
  );

  // Save state to localStorage whenever it changes
  useEffect(() => {
    // Only save if experiment is in progress (not at initial state)
    if (state.stage !== "not_started") {
      StorageService.saveCurrentExperiment(state);
    }
  }, [state]);

  // Create memoized actions that don't change on every render
  const actions = useMemo(
    () => createExperimentActions(dispatch, state),
    [state]
  );

  // Combine state and actions into context value
  const value = useMemo<ExperimentContextValue>(
    () => ({
      state,
      stage: state.stage,
      data: state.data,
      ...actions,
    }),
    [state, actions]
  );

  return (
    <ExperimentContext.Provider value={value}>
      {children}
    </ExperimentContext.Provider>
  );
}
