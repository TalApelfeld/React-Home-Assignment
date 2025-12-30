import { useMemo, useReducer, type ReactNode } from "react";
import { experimentReducer } from "./experimentReducer";
import { initialState } from "./experimentInitialState";
import { createExperimentActions } from "./experimentActions";
import {
  ExperimentContext,
  type ExperimentContextValue,
} from "./ExperimentContext";

interface ExperimentProviderProps {
  children: ReactNode;
}

export default function ExperimentProvider({
  children,
}: ExperimentProviderProps) {
  const [state, dispatch] = useReducer(experimentReducer, initialState);

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
