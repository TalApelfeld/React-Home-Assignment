import { useContext } from "react";
import { ExperimentContext } from "../context/experiment/ExperimentContext";

/**
 * Custom hook to access the Experiment context
 * @throws Error if used outside of ExperimentProvider
 * @returns ExperimentContextValue with state and actions
 */
export function useExperiment() {
  const context = useContext(ExperimentContext);

  if (context === null) {
    throw new Error(
      "useExperiment must be used within an ExperimentProvider. " +
        "Make sure to wrap your component tree with <ExperimentProvider>."
    );
  }

  return context;
}
