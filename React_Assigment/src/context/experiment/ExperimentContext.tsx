import { createContext } from "react";
import type {
  ExperimentState,
  ExperimentStage,
  ExperimentData,
} from "../../types/experiment.types";
import { type ExperimentActions } from "./experimentActions";

export interface ExperimentContextValue extends ExperimentActions {
  state: ExperimentState;
  stage: ExperimentStage;
  data: ExperimentData;
}

export const ExperimentContext = createContext<ExperimentContextValue | null>(
  null
);
