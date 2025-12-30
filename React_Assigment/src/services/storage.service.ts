import type {
  CompletedExperiment,
  ExperimentState,
} from "../types/experiment.types";
import { STORAGE_KEYS } from "../utils/constants";

/**
 * Service for managing experiment data persistence in localStorage
 * Provides type-safe methods with error handling
 */
export const StorageService = {
  /**
   * Retrieves all completed experiments from localStorage
   * @returns Array of completed experiments (empty array if none or on error)
   */
  getExperiments: (): CompletedExperiment[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXPERIMENTS);
      if (!data) return [];

      const parsed = JSON.parse(data);

      // Validate that parsed data is an array
      if (!Array.isArray(parsed)) {
        console.warn("StorageService: Invalid data format, resetting storage");
        return [];
      }

      return parsed as CompletedExperiment[];
    } catch (error) {
      console.error("StorageService: Error reading experiments", error);
      return [];
    }
  },

  /**
   * Saves a completed experiment to localStorage
   * @param experiment - The completed experiment data to save
   * @returns boolean indicating success
   */
  saveExperiment: (experiment: CompletedExperiment): boolean => {
    try {
      const existing = StorageService.getExperiments();
      existing.push(experiment);
      localStorage.setItem(STORAGE_KEYS.EXPERIMENTS, JSON.stringify(existing));
      return true;
    } catch (error) {
      console.error("StorageService: Error saving experiment", error);
      return false;
    }
  },

  /**
   * Gets the count of completed experiments
   * @returns Number of completed experiments
   */
  getExperimentCount: (): number => {
    return StorageService.getExperiments().length;
  },

  /**
   * Retrieves a specific experiment by its ID
   * @param id - The experiment ID to find
   * @returns The experiment or null if not found
   */
  getExperimentById: (id: string): CompletedExperiment | null => {
    const experiments = StorageService.getExperiments();
    return experiments.find((exp) => exp.id === id) || null;
  },

  /**
   * Clears all experiment data from localStorage
   * @returns boolean indicating success
   */
  clearAllExperiments: (): boolean => {
    try {
      localStorage.removeItem(STORAGE_KEYS.EXPERIMENTS);
      return true;
    } catch (error) {
      console.error("StorageService: Error clearing experiments", error);
      return false;
    }
  },

  /**
   * Checks if localStorage is available
   * @returns boolean indicating availability
   */
  isAvailable: (): boolean => {
    try {
      const testKey = "__storage_test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Saves the current experiment state to localStorage
   * @param state - The current experiment state to persist
   * @returns boolean indicating success
   */
  saveCurrentExperiment: (state: ExperimentState): boolean => {
    try {
      localStorage.setItem(
        STORAGE_KEYS.CURRENT_EXPERIMENT,
        JSON.stringify(state)
      );
      return true;
    } catch (error) {
      console.error("StorageService: Error saving current experiment", error);
      return false;
    }
  },

  /**
   * Retrieves the current experiment state from localStorage
   * @returns The current experiment state or null if none exists
   */
  getCurrentExperiment: (): ExperimentState | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_EXPERIMENT);
      if (!data) return null;

      const parsed = JSON.parse(data);
      return parsed as ExperimentState;
    } catch (error) {
      console.error(
        "StorageService: Error reading current experiment",
        error
      );
      return null;
    }
  },

  /**
   * Clears the current experiment state from localStorage
   * @returns boolean indicating success
   */
  clearCurrentExperiment: (): boolean => {
    try {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_EXPERIMENT);
      return true;
    } catch (error) {
      console.error(
        "StorageService: Error clearing current experiment",
        error
      );
      return false;
    }
  },
};
