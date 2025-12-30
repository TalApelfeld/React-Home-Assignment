export const BUCKET_MAX_CLICKS = 10;

// Likert Scale Configuration
export const LIKERT_SCALE = {
  MIN: 1,
  MAX: 4,
  VALUES: ["1", "2", "3", "4"] as const,
} as const;

//  Random Words Configuration
export const RANDOM_WORDS = {
  COUNT: 3,
  API_URL: "https://random-word-api.herokuapp.com/word",
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  EXPERIMENTS: "technion_experiment_results",
  CURRENT_EXPERIMENT: "technion_current_experiment",
} as const;

// Route Paths
export const ROUTES = {
  HOME: "/",
  ABOUT: "/About",
  EXPERIMENT_1: "/ex1",
  EXPERIMENT_2: "/ex2",
  RESULTS: "/stats",
} as const;
