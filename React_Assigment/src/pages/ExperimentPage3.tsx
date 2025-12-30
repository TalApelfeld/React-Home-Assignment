import { useEffect, useState } from "react";
import { Link } from "react-router";
import StatsCardExperiment1 from "../components/Cards/statsPage/StatsCardExperiment1";
import StatsCardExperiment2 from "../components/Cards/statsPage/StatsCardExperiment2";
import PrimaryActionButton from "../components/Reusable/PrimaryActionButton";
import { useExperiment } from "../hooks/useExperiment";
import { useBlockNavigation } from "../hooks/useBlockNavigation";

export default function ExperimentPage3() {
  const { data, completeAndSaveExperiment, resetExperiment } = useExperiment();
  const [saved, setSaved] = useState(false);

  // Block navigation - only allow Return Home (/)
  useBlockNavigation(["/"]);

  // Save experiment on mount (only once)
  useEffect(() => {
    if (!saved) {
      const success = completeAndSaveExperiment();
      setSaved(true);
      if (success) {
        console.log("Experiment saved successfully!");
      } else {
        console.error("Failed to save experiment");
      }
    }
  }, [completeAndSaveExperiment, saved]);

  const handleReturnHome = () => {
    resetExperiment();
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4">
        <img src="/checkCircle.svg" alt="check icon" className="w-12 h-12" />
        <h1 className="text-text-Primary text-h1-sm lg:text-h1-md">
          Experiment Complete!
        </h1>
        <h2 className="text-text-Secondary text-h2-md">
          Thank you for participating. Here's a summary of your collected data.
        </h2>
        {saved && (
          <span className="text-green-600 text-h2-sm mt-2">
            ✓ Data saved successfully
          </span>
        )}
      </div>

      {/* Stats Experiment 1 */}
      <StatsCardExperiment1 data={data.page1} />

      {/* Stats Experiment 2 */}
      <StatsCardExperiment2 data={data.page2} />

      {/* Return Home Button */}
      <div className="pb-12">
        <Link to="/" onClick={handleReturnHome}>
          <PrimaryActionButton
            variant="primary"
            text="Return to Home"
            icon="/experimentIcon.svg"
          />
        </Link>
      </div>
    </>
  );
}
