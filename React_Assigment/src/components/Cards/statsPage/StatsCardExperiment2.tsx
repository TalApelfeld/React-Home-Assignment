import FirstClickCard from "../../Reusable/FirstClickCard";

export default function StatsCardExperiment2() {
  return (
    <div className="w-[90%] text-start border-2 border-neutral-300 rounded-lg p-4">
      <h2 className="text-text-Primary text-h2-lg mb-h2">
        Page 2 - Bucket Counter
      </h2>

      {/* First Click */}
      <FirstClickCard />

      {/* TODO: make a reusable card for the clicks */}
      {/* Duration */}
      <div className="w-[60%] mb-h2 border-2 border-neutral-300 rounded-lg p-4">
        <h2 className="text-text-Secondary text-h2-md">Fill Duration</h2>
        <span className="text-h2-sm">2025-12-30T07:55:50.538Z</span>
      </div>

      {/* Submit */}
      <div className="w-[60%] mb-h2 border-2 border-neutral-300 rounded-lg p-4">
        <h2 className="text-text-Secondary text-h2-md">Submit</h2>
        <span className="text-h2-sm">2025-12-30T07:55:50.538Z</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="pb-3 text-left font-semibold">Click</th>
              <th className="pb-3 text-left font-semibold">Timestamp (UTC)</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {/* {experimentData.page1.clicks.map((click, idx) => (
              <tr key={idx}>
                <td className="py-3 font-medium capitalize">{click.type}</td>
                <td className="py-3">{click.value}</td>
                <td className="py-3 font-mono text-xs">
                  {formatTimestamp(click.timestamp)}
                </td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
