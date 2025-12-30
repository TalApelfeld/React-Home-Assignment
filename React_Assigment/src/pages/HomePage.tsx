import { useState } from "react";
import { Link } from "react-router";
import PrimaryActionButton from "../components/Reusable/PrimaryActionButton";
import ExperimentCountCard from "../components/Cards/HomePage/Card";

// import { useExperiment } from "../hooks/useExperiment";
import PastExperimentsModal from "../components/Cards/HomePage/PastExperimentsModal";

export default function HomePage() {
  const [showPastExperiments, setShowPastExperiments] = useState(false);

  return (
    <>
      {/* Welcome Titles */}
      <h1 className="text-h1-sm md:text-h1-md lg:text-h1-lg">
        Experiment Data Collection System
      </h1>
      <h2 className="text-h2-lg text-text-Secondary mb-12">
        A multi-page experiment tracking user interactions and timing
      </h2>

      {/* Number Of Experiments Conducted Card */}
      <ExperimentCountCard />

      {/* Buttons */}
      <div className="flex flex-col items-center lg:flex-row lg:gap-4 mx-auto">
        <Link
          to="/About"
          // onClick={handleStartExperiment}
        >
          <PrimaryActionButton
            variant="primary"
            icon="/experimentIcon.svg"
            text="Start New Experiment"
          />
        </Link>
        <div onClick={() => setShowPastExperiments(true)}>
          <PrimaryActionButton
            variant="secondary"
            icon="/stats.svg"
            text="View Stats"
          />
        </div>
      </div>

      {/* Past Experiments Modal */}
      {showPastExperiments && (
        <PastExperimentsModal onClose={() => setShowPastExperiments(false)} />
      )}
    </>
  );
}
