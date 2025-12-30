import type { Page1Data } from "../../../types/experiment.types";

interface StatsCardExperiment1Props {
  data: Page1Data;
}

export default function StatsCardExperiment1({
  data,
}: StatsCardExperiment1Props) {
  return (
    <div className="w-[90%] lg:w-[60%] text-start border-2 border-neutral-300 rounded-lg p-4 mb-h2">
      <h2 className="text-text-Primary text-h2-lg mb-h2">
        Page 1 - User Response
      </h2>

      {/* First Click */}
      <div className="w-full lg:w-[60%] mb-h2 border-2 border-neutral-300 rounded-lg p-4">
        <h2 className="text-text-Secondary text-h2-md">First Click</h2>
        <span className="text-h2-sm font-mono">
          {data.firstClickTimestamp ? data.firstClickTimestamp : "N/A"}
        </span>
      </div>

      {/* Selected Values */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-h2">
        <div className="border-2 border-neutral-300 rounded-lg p-4">
          <h2 className="text-text-Secondary text-h2-md">
            Selected Likert Value
          </h2>
          <span className="text-h1-xxsm font-bold">
            {data.selectedLikertValue || "N/A"}
          </span>
        </div>
        <div className="border-2 border-neutral-300 rounded-lg p-4">
          <h2 className="text-text-Secondary text-h2-md">Selected Word</h2>
          <span className="text-h1-xxsm font-bold">
            {data.selectedWord || "N/A"}
          </span>
        </div>
      </div>

      {/* Button Clicks Table */}
      <h3 className="text-text-Primary text-h2-md mb-2">
        Button Click History
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left font-semibold">Type</th>
              <th className="pb-3 text-left font-semibold">Value</th>
              <th className="pb-3 text-left font-semibold">Timestamp (UTC)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.clicks.length > 0 ? (
              data.clicks.map((click, idx) => (
                <tr key={idx}>
                  <td className="py-3 capitalize">{click.type}</td>
                  <td className="py-3 font-medium">{click.value}</td>
                  <td className="py-3 font-mono text-xs">{click.timestamp}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-3 text-center text-text-Secondary"
                >
                  No clicks recorded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
