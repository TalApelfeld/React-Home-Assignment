import type { Page2Data } from "../../../types/experiment.types";
import { formatTimestamp, formatDuration } from "../../../utils/timestamp";

interface StatsCardExperiment2Props {
  data: Page2Data;
}

export default function StatsCardExperiment2({
  data,
}: StatsCardExperiment2Props) {
  return (
    <div className="w-[90%] lg:w-[60%] text-start border-2 border-neutral-300 rounded-lg p-4 mb-h2">
      <h2 className="text-text-Primary text-h2-lg mb-h2">
        Page 2 - Bucket Counter
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-h2">
        {/* First Click */}
        <div className="border-2 border-neutral-300 rounded-lg p-4">
          <h2 className="text-text-Secondary text-h2-md">First Click</h2>
          <span className="text-h2-sm font-mono">
            {data.firstClickTimestamp
              ? formatTimestamp(data.firstClickTimestamp)
              : "N/A"}
          </span>
        </div>

        {/* Fill Duration */}
        <div className="border-2 border-neutral-300 rounded-lg p-4">
          <h2 className="text-text-Secondary text-h2-md">Fill Duration</h2>
          <span className="text-h1-xxsm font-bold">
            {data.fillDurationMs !== null
              ? formatDuration(data.fillDurationMs)
              : "N/A"}
          </span>
        </div>

        {/* Submit Time */}
        <div className="border-2 border-neutral-300 rounded-lg p-4">
          <h2 className="text-text-Secondary text-h2-md">Submit Time</h2>
          <span className="text-h2-sm font-mono">
            {data.submitTimestamp
              ? formatTimestamp(data.submitTimestamp)
              : "N/A"}
          </span>
        </div>
      </div>

      {/* Bucket Clicks Table */}
      <h3 className="text-text-Primary text-h2-md mb-2">
        Bucket Click Timestamps ({data.bucketClicks.length} clicks)
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left font-semibold">Click #</th>
              <th className="pb-3 text-left font-semibold">Timestamp (UTC)</th>
              <th className="pb-3 text-left font-semibold">
                Time Since First Click
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {data.bucketClicks.length > 0 ? (
              data.bucketClicks.map((timestamp, idx) => {
                const firstClickTime = new Date(data.bucketClicks[0]).getTime();
                const currentClickTime = new Date(timestamp).getTime();
                const timeSinceFirst = currentClickTime - firstClickTime;

                return (
                  <tr key={idx}>
                    <td className="py-3 font-medium">{idx + 1}</td>
                    <td className="py-3 font-mono text-xs">
                      {formatTimestamp(timestamp)}
                    </td>
                    <td className="py-3 font-mono text-xs">
                      {idx === 0 ? "0ms" : `+${timeSinceFirst}ms`}
                    </td>
                  </tr>
                );
              })
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
