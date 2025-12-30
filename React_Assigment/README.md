# Technion HCI Lab - Experiment Data Collection System

A React-based web application for conducting Human-Computer Interaction (HCI) research experiments. This system collects detailed user interaction data across three sequential experiment stages, capturing precise timestamps, reaction times, and decision-making patterns.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Running Locally](#running-locally)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Architectural Decisions](#architectural-decisions)
- [Key Features Implementation](#key-features-implementation)
- [Browser Compatibility](#browser-compatibility)

---

## Features

### Experiment Flow
1. **Page 1: Image Rating & Word Selection**
   - Users rate an image on a Likert scale (1-4)
   - Select one word from three randomly generated options
   - Tracks all button clicks with precise UTC timestamps

2. **Page 2: Interactive Bucket Task**
   - Users click a visual bucket element exactly 10 times
   - Real-time progress visualization
   - Duration calculation between first and last click

3. **Page 3: Results & Data Summary**
   - Displays complete interaction history
   - Shows all timestamps and metrics
   - Auto-saves experiment to browser localStorage

### Data Collection
- **Precise Timestamps**: All events captured in UTC ISO 8601 format
- **Interaction Logging**: Every button click recorded with metadata
- **Timing Metrics**: Duration calculations, first-click tracking
- **Data Persistence**: Browser localStorage with state recovery on page refresh
- **Experiment History**: View all past completed experiments

### User Experience
- **Navigation Protection**: Users cannot navigate backward during experiments
- **URL Lock**: Address bar navigation blocked during active experiments
- **State Persistence**: Experiment progress survives page refreshes
- **Responsive Design**: Mobile-first approach with tablet/desktop optimization

---

## Tech Stack

- **React 19.2.0** - UI framework with modern hooks
- **TypeScript 5.9.3** - Type safety and enhanced developer experience
- **Vite 7.2.4** - Fast build tool and development server
- **React Router 7.11.0** - Client-side routing with navigation guards
- **Tailwind CSS 4.1.18** - Utility-first styling with custom theme
- **Docker** - Containerization with multi-stage builds
- **Nginx** - Production web server with SPA routing support

---

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js**: Version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: Version 9.x or higher (comes with Node.js)
- **Docker** (optional, for containerized deployment): Version 20.x or higher ([Download](https://www.docker.com/get-started))
- **Docker Compose** (optional): Version 2.x or higher

---

## Running Locally

### 1. Clone the Repository

```bash
git clone <repository-url>
cd React_Assigment
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Start Development Server

```bash
npm run dev
```

The application will start at **`http://localhost:5173`** (default Vite port).

- Hot Module Replacement (HMR) is enabled for instant updates
- TypeScript compilation happens in the background
- Tailwind CSS processes styles on-the-fly

### 4. Build for Production (Optional)

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### 5. Preview Production Build (Optional)

```bash
npm run preview
```

Serves the production build locally to test before deployment.

### 6. Lint Code (Optional)

```bash
npm run lint
```

Runs ESLint to check for code quality issues.

---

## Docker Deployment

The project includes a **multi-stage Dockerfile** and **docker-compose** configuration for production deployment.

### Architecture

1. **Build Stage**: Uses Node.js Alpine image to compile the application
2. **Production Stage**: Uses Nginx Alpine image to serve static files
3. **Nginx Configuration**: Custom config with React Router support

### Option 1: Using Docker Compose (Recommended)

```bash
# Build and run the container
docker compose -f docker-compose.prod.yml up -d --build

# The application will be available at http://localhost:80
```

**Flags explained:**
- `-f docker-compose.prod.yml`: Specifies the production compose file
- `up`: Starts the services
- `-d`: Runs in detached mode (background)
- `--build`: Rebuilds the image before starting

### Option 2: Using Docker CLI Directly

```bash
# Build the Docker image
docker build -t technion-experiment-app .

# Run the container
docker run -d -p 80:80 --name experiment-app technion-experiment-app

# The application will be available at http://localhost:80
```

### Docker Management Commands

```bash
# Stop the container
docker compose -f docker-compose.prod.yml down

# View logs
docker compose -f docker-compose.prod.yml logs -f

# Rebuild after code changes
docker compose -f docker-compose.prod.yml up -d --build

# Remove container and image
docker compose -f docker-compose.prod.yml down --rmi all
```

### Dockerfile Breakdown

```dockerfile
# Build stage
FROM node:25.1-alpine as build
WORKDIR /app
COPY package*.json .
RUN npm ci                    # Clean install (faster, deterministic)
COPY . .
RUN npm run build             # TypeScript compilation + Vite build

# Production stage
FROM nginx:alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Why multi-stage builds?**
- Final image only contains production artifacts (no dev dependencies)
- Nginx Alpine image is ~23MB vs Node.js image ~170MB
- Faster deployments and reduced attack surface

### Nginx Configuration Highlights

The custom `nginx.conf` includes:
- **React Router Support**: `try_files $uri $uri/ /index.html` redirects all routes to index.html
- **MIME Type Support**: Ensures JS/CSS files are served with correct content types
- **Static Asset Caching**: 1-year cache for static files (optional optimization)

---

## Project Structure

```
src/
├── assets/                    # SVG and image assets
├── components/
│   ├── Buttons/
│   │   ├── Experiment1/       # Likert & Word buttons
│   │   └── ReturnHomeButton.tsx
│   ├── Cards/                 # Card components for each page
│   └── Reusable/              # Shared components
├── context/
│   └── experiment/            # State management (Context + Reducer)
│       ├── ExperimentContext.tsx
│       ├── ExperimentProvider.tsx
│       ├── experimentActions.ts
│       ├── experimentReducer.ts
│       └── experimentInitialState.ts
├── hooks/
│   ├── useExperiment.ts       # Main context hook
│   ├── useRandomWords.ts      # Fetch random words from API
│   ├── useFirstClick.ts       # Track first click on page
│   ├── useBlockNavigation.ts  # Navigation protection
│   └── index.ts
├── pages/
│   ├── HomePage.tsx           # Entry point
│   ├── Introductory.tsx       # Welcome & instructions
│   ├── ExperimentPage1.tsx    # Likert + words
│   ├── ExperimentPage2.tsx    # Bucket task
│   ├── ExperimentPage3.tsx    # Results
│   └── NotFound404.tsx
├── services/
│   └── storage.service.ts     # localStorage management
├── types/
│   └── experiment.types.ts    # TypeScript interfaces
├── utils/
│   ├── constants.ts           # Configuration constants
│   ├── timestamp.ts           # Timestamp utilities
│   └── index.ts
├── styles/
│   ├── styles.ts              # CSS class exports
│   └── index.css              # Tailwind config & theme
├── Layouts/
│   └── DefaultLayout.tsx      # Main layout wrapper
└── main.tsx                   # App entry point & routing
```

---

## Architectural Decisions

### 1. State Management: Context + Reducer Pattern

**Decision**: Use React Context with `useReducer` instead of external state libraries (Redux, Zustand, etc.)

**Rationale**:
- Application has centralized, predictable state flow
- No need for complex middleware or dev tools
- Reduces bundle size and external dependencies
- Built-in React patterns are sufficient for this use case

**Implementation**:
```typescript
// Centralized state with type-safe actions
const [state, dispatch] = useReducer(experimentReducer, initialState);

// Memoized actions to prevent unnecessary re-renders
const actions = useMemo(() => createExperimentActions(dispatch, state), [state]);
```

**Benefits**:
- Single source of truth for experiment data
- Time-travel debugging capability (all actions are logged)
- Easy to test reducers in isolation
- Type-safe action creators

### 2. Data Persistence Strategy

**Decision**: Dual localStorage strategy - separate storage for current and completed experiments

**Rationale**:
- Users must be able to continue experiments after page refresh
- Completed experiments need to be preserved independently
- Browser storage is sufficient (no backend required)

**Implementation**:
- **Current Experiment**: `technion_current_experiment` (single object)
  - Saved on every state change during active experiment
  - Restored on page load
  - Cleared when experiment completes or resets

- **Completed Experiments**: `technion_experiment_results` (array)
  - Append-only list of finished experiments
  - Used for "View Stats" feature
  - Persists indefinitely until manually cleared

**Benefits**:
- No data loss on accidental refresh
- Experiment history for researchers
- Works offline (no network dependency)
- Fast read/write operations

### 3. Navigation Protection System

**Decision**: Custom `useBlockNavigation` hook with allowlist-based routing

**Rationale**:
- Research experiments require strict navigation control
- Users accidentally pressing back button can invalidate data
- Address bar navigation needs to be blocked during active experiments

**Implementation**:
```typescript
// Lock user to current page, only allow specific paths
useBlockNavigation(["/ex2", "/"]);

// Blocks:
// - Browser back/forward buttons (popstate event)
// - URL typing in address bar (location monitoring)
// - Programmatic navigation (React Router interception)

// Allows:
// - Clicking "Continue" button → /ex2
// - Clicking "Return Home" button → /
```

**Benefits**:
- Data integrity (users can't skip or repeat stages)
- Controlled experiment flow
- Clear exit path (Return Home button)
- Works with browser history API and React Router

### 4. Timestamp Precision

**Decision**: Use UTC ISO 8601 format for all timestamps

**Rationale**:
- Research data must be timezone-agnostic
- ISO 8601 is universally parseable
- Millisecond precision for accurate timing

**Implementation**:
```typescript
export const getUTCTimestamp = (): string => {
  return new Date().toISOString(); // e.g., "2025-12-30T15:30:45.123Z"
};
```

**Benefits**:
- Consistent across different user timezones
- Easy to parse and analyze in research tools
- Human-readable while maintaining precision
- Compatible with databases and spreadsheets

### 5. Component Architecture

**Decision**: Composition over inheritance with small, focused components

**Rationale**:
- React's composition model is more flexible than class inheritance
- Easier to test and maintain small components
- Better code reusability

**Patterns Used**:
- **Container/Presentational**: Pages (containers) manage logic, Cards (presentational) handle UI
- **Custom Hooks**: Extract reusable logic (useFirstClick, useRandomWords, etc.)
- **Barrel Exports**: Clean imports via index.ts files

### 6. Type Safety

**Decision**: Full TypeScript coverage with strict mode enabled

**Rationale**:
- Catch errors at compile time, not runtime
- Better IDE autocomplete and refactoring
- Self-documenting code via interfaces

**Key Types**:
```typescript
interface ExperimentData {
  id: string;
  startedAt: string;
  completedAt: string | null;
  page1: Page1Data;
  page2: Page2Data;
}

interface ButtonClick {
  value: string;
  timestamp: string;
  type: "likert" | "word" | "submit";
}
```

### 7. API Integration

**Decision**: Use public Random Word API with error handling

**Rationale**:
- No backend setup required for word generation
- Free and reliable API (https://random-word-api.herokuapp.com)
- Fallback UI for loading/error states

**Implementation**:
```typescript
const { words, loading, error } = useRandomWords(3);

// UI handles all states:
// - loading: Show "Loading words..."
// - error: Show "Failed to load words. Please refresh."
// - success: Display WordButtons
```

### 8. Styling Approach

**Decision**: Tailwind CSS with custom theme configuration

**Rationale**:
- Utility-first CSS reduces CSS bloat
- Consistent design system via configuration
- No CSS-in-JS runtime overhead
- Vite plugin for optimal performance

**Custom Theme**:
```css
--color-background: #F8F9FA (off-white)
--color-primary-Action-500: #2F88DB (scientific blue)
--spacing-h2: 24px (consistent vertical rhythm)
--font-family: Inter (modern, readable)
```

### 9. Build Optimization

**Decision**: Vite for development and production builds

**Rationale**:
- Lightning-fast HMR during development (ESM-based)
- Optimized production builds with Rollup
- Better than Create React App for modern tooling

**Features**:
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Minification, compression, hashing

### 10. Docker Multi-Stage Build

**Decision**: Separate build and runtime stages with minimal final image

**Rationale**:
- Development dependencies not needed in production
- Nginx serves static files faster than Node.js
- Smaller image = faster deployments

**Image Sizes**:
- Node.js Alpine: ~170MB
- Final Nginx Alpine: ~23MB (87% reduction)

---

## Key Features Implementation

### State Persistence on Refresh

When users refresh the page during an experiment, they stay on the same page with all data intact.

**How it works**:
1. `ExperimentProvider` initializes state from localStorage if available
2. `useEffect` saves state to localStorage on every change
3. State is cleared when experiment completes or resets

```typescript
// Initialize from localStorage
const [state, dispatch] = useReducer(
  experimentReducer,
  initialState,
  (initial) => {
    const savedState = StorageService.getCurrentExperiment();
    return savedState || initial;
  }
);

// Save on every state change
useEffect(() => {
  if (state.stage !== "not_started") {
    StorageService.saveCurrentExperiment(state);
  }
}, [state]);
```

### Navigation Blocking

Users cannot navigate backward or type URLs during experiments.

**Implementation**:
```typescript
// In each experiment page
useBlockNavigation(["/ex2", "/"]); // Only allow these paths

// Hook monitors:
// 1. popstate event → Browser back/forward buttons
// 2. location.pathname → URL changes (typing in address bar)
// 3. Redirects back if unauthorized path detected
```

### First Click Tracking

Captures when user first interacts with each page for engagement metrics.

**Implementation**:
```typescript
export function useFirstClick(callback: () => void) {
  useEffect(() => {
    const handleFirstClick = () => {
      callback(); // Call once
      document.removeEventListener("click", handleFirstClick, true);
    };

    document.addEventListener("click", handleFirstClick, true);
    return () => document.removeEventListener("click", handleFirstClick, true);
  }, [callback]);
}
```

**Uses capture phase** (`true`) to catch clicks before they bubble.

### Random Word Fetching

Fetches 3 random words from an external API with loading/error states.

**Implementation**:
```typescript
export function useRandomWords(count = 3) {
  const [words, setWords] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const promises = Array(count)
          .fill(0)
          .map(() => fetch(API_URL).then((res) => res.json()));
        const results = await Promise.all(promises);
        setWords(results.flat());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, [count]);

  return { words, loading, error };
}
```

**Parallel fetching** with `Promise.all` for performance.

### Bucket Fill Visualization

Visual progress indicator for the 10-click task.

**Implementation**:
```typescript
const fillPercentage = (counter / BUCKET_MAX_CLICKS) * 100;

// Dynamic height with smooth transition
<div
  className="absolute bottom-0 left-0 right-0 bg-primary-Action-500 transition-all duration-300"
  style={{ height: `${fillPercentage}%` }}
/>
```

**CSS transition** for smooth animation without JavaScript.

---

## Browser Compatibility

- **Chrome/Edge**: 90+ (Recommended)
- **Firefox**: 88+
- **Safari**: 14+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+

**Note**: localStorage and modern JavaScript features are required.

---

## License

This project is developed for Technion's Human-Computer Interaction Lab research purposes.

---

## Support

For issues or questions, please contact the Technion HCI Lab team.

---

**Last Updated**: December 2025
