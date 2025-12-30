import StatsCardExperiment1 from "../components/Cards/statsPage/StatsCardExperiment1";
import StatsCardExperiment2 from "../components/Cards/statsPage/StatsCardExperiment2";

export default function ExperimentPage3() {
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
      </div>

      {/* Stats Experiment 1 */}
      <StatsCardExperiment1 />

      {/* Stats Experiment 2 */}
      <StatsCardExperiment2 />
    </>
  );
}
