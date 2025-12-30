/**
 * Returns the current UTC timestamp in ISO format
 * @returns ISO string (e.g., "2025-12-30T10:30:00.000Z")
 */
export const getUTCTimestamp = (): string => {
  return new Date().toISOString();
};

/**
 * Calculates the duration between two ISO timestamps in milliseconds
 * @param startTimestamp - ISO start time
 * @param endTimestamp - ISO end time
 * @returns Duration in milliseconds
 */
export const calculateDurationMs = (
  startTimestamp: string,
  endTimestamp: string
): number => {
  const start = new Date(startTimestamp).getTime();
  const end = new Date(endTimestamp).getTime();
  return end - start;
};

/**
 * Formats an ISO timestamp for display
 * @param timestamp - ISO timestamp
 * @returns Formatted string (e.g., "Dec 30, 2025, 10:30:00 AM")
 */
export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
};

/**
 * Formats an ISO timestamp showing only the time portion
 * @param timestamp - ISO timestamp
 * @returns Time string (e.g., "10:30:00.123")
 */
export const formatTimeOnly = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toISOString().split("T")[1].replace("Z", "");
};

/**
 * Formats duration in milliseconds to a human-readable string
 * @param ms - Duration in milliseconds
 * @returns Formatted string (e.g., "2.5s" or "1500ms")
 */
export const formatDuration = (ms: number): string => {
  if (ms >= 1000) {
    return `${(ms / 1000).toFixed(2)}s`;
  }
  return `${ms}ms`;
};

/**
 * Generates a unique ID for experiment sessions
 * @returns Unique string ID
 */
export const generateExperimentId = (): string => {
  return `exp_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
};
